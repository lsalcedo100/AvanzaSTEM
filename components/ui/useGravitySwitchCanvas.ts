"use client"

import { useEffect, useRef, type RefObject } from "react"
import { OBJECT_SPECS, PHYSICS_STEP_MS, effectiveGravity } from "./gravity-switch-config"
import { reportDebug } from "./gravity-switch-debug"
import { EffectsStore } from "./gravity-switch-effects"
import { unlockAudio } from "./gravity-switch-sound"
import {
  PointerTracker,
  clampSpawnPoint,
  dragVelocity,
  hitTest,
} from "./gravity-switch-interaction"
import { LABEL, type Contact, type GravitySwitchWorld } from "./gravity-switch-physics"
import { renderScene, type SceneHud } from "./gravity-switch-renderer"
import { TrailStore } from "./gravity-switch-trails"
import type { GravityState, ObjectKind, ObjectState, Vec2, WorldConfig } from "./gravity-switch-types"
import { createViewport, resizeCanvas, sameViewport, toRoom, type Viewport } from "./gravity-switch-viewport"

/** Render loops alive on the page. Exactly one per mounted stage. */
let activeLoops = 0

type Drag = {
  id: string
  pointerId: number
  /** Object centre minus pointer, so a grab off-centre does not jump. */
  offset: Vec2
  target: Vec2
  tracker: PointerTracker
}

/** What the loop hands out after each frame in which the world advanced. */
export type FrameSample = {
  objects: ObjectState[]
  contacts: Contact[]
  /** Simulated time since the world was built, ms. */
  elapsedMs: number
  /** Simulated time this frame, ms. */
  dtMs: number
}

type Args = {
  worldRef: RefObject<GravitySwitchWorld | null>
  /** Changes whenever a fresh world has been built; trails are cleared on it. */
  readyKey: string | null
  /** The room to draw while the world is still loading. */
  room: WorldConfig | null
  gravity: GravityState
  trailsEnabled: boolean
  /** Whether objects respond to being grabbed right now. */
  canDrag: boolean
  /** What a tap on empty room drops in, or null when tapping spawns nothing. */
  spawnKind: ObjectKind | null
  /** Called after a tap adds an object, so counters can refresh. */
  onObjectsChanged?: () => void
  /** Called with the new object's id after a tap drops one in. */
  onSpawn?: (objectId: string) => void
  /** Called when a drag ends in a throw, with the speed given in m/s. */
  onThrow?: (objectId: string, speed: number) => void
  /** Banner text for a flip, already localised. */
  labels: { gravityOn: string; gravityOff: string }
  /** Called after every frame in which the world stepped; mission tracking hangs off this. */
  onFrame?: (sample: FrameSample) => void
  /** Called for each impact worth a sound, with the speed in m/s. */
  onImpact?: (speed: number) => void
  /** Skip decorative motion. */
  reducedMotion: boolean
  /** Changes when something worth celebrating happened; triggers a confetti burst. */
  celebrateToken: number
}

/** Impacts slower than this (relative speed, m/s) draw no ripple. */
const RIPPLE_MIN_SPEED = 1.2

/**
 * Owns the canvas: one requestAnimationFrame loop that steps the live world
 * by real elapsed time (the world itself turns that into fixed sub-steps),
 * records trails, and paints. A ResizeObserver keeps the backing store
 * matched to the element's CSS size and the screen's pixel density.
 *
 * Pointer events on the canvas grab and throw objects, or drop a new one in
 * on empty space. Mouse, pen and touch all arrive as pointer events, so they
 * behave identically; the canvas uses `touch-action: none` so a drag never
 * scrolls the page.
 *
 * The loop is started once per mounted canvas and torn down with it, so React
 * re-renders never stack a second loop; everything the loop needs from render
 * state arrives through refs.
 */
export function useGravitySwitchCanvas({
  worldRef,
  readyKey,
  room,
  gravity,
  trailsEnabled,
  canDrag,
  spawnKind,
  onObjectsChanged,
  onSpawn,
  onThrow,
  labels,
  onFrame,
  onImpact,
  reducedMotion,
  celebrateToken,
}: Args) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const trailsRef = useRef<TrailStore | null>(null)
  const dragRef = useRef<Drag | null>(null)
  const flashRef = useRef<SceneHud["gravityFlash"]>(null)
  const previousGravityRef = useRef<number | null>(null)
  const effectsRef = useRef<EffectsStore | null>(null)
  const celebrateRef = useRef(celebrateToken)
  const sceneRef = useRef({ room, gravity, trailsEnabled, canDrag, spawnKind, onObjectsChanged, onSpawn, onThrow, labels, onFrame, onImpact, reducedMotion })

  useEffect(() => {
    sceneRef.current = { room, gravity, trailsEnabled, canDrag, spawnKind, onObjectsChanged, onSpawn, onThrow, labels, onFrame, onImpact, reducedMotion }
  }, [room, gravity, trailsEnabled, canDrag, spawnKind, onObjectsChanged, onSpawn, onThrow, labels, onFrame, onImpact, reducedMotion])

  // A new token means a win: burst confetti from the middle of the room.
  useEffect(() => {
    if (celebrateToken === celebrateRef.current) return
    celebrateRef.current = celebrateToken
    if (celebrateToken <= 0) return
    const world = worldRef.current
    const effects = effectsRef.current
    if (!world || world.isDisposed || !effects || sceneRef.current.reducedMotion) return
    effects.celebrate({ x: world.room.width / 2, y: world.room.height * 0.55 }, world.elapsedMs)
  }, [celebrateToken, worldRef])

  useEffect(() => {
    const g = effectiveGravity(gravity)
    const previous = previousGravityRef.current
    previousGravityRef.current = g
    if (previous !== null && previous !== g) {
      flashRef.current = { at: performance.now(), on: g > 0 }
    }
  }, [gravity])

  useEffect(() => {
    if (!trailsEnabled) trailsRef.current?.clear()
  }, [trailsEnabled])

  useEffect(() => {
    trailsRef.current?.clear()
    effectsRef.current?.clear()
    dragRef.current = null
  }, [readyKey])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const trails = new TrailStore()
    trailsRef.current = trails
    const effects = new EffectsStore()
    effectsRef.current = effects
    const lastSpeeds = new Map<string, number>()
    let viewport: Viewport = createViewport(container.clientWidth, window.devicePixelRatio)
    resizeCanvas(canvas, viewport)
    const fontFamily = window.getComputedStyle(canvas).fontFamily || "system-ui, sans-serif"

    const fit = () => {
      const next = createViewport(container.clientWidth, window.devicePixelRatio)
      if (sameViewport(next, viewport)) return
      viewport = next
      resizeCanvas(canvas, viewport)
    }
    const observer = new ResizeObserver(fit)
    observer.observe(container)

    // -- pointer input -----------------------------------------------------

    const roomPoint = (event: PointerEvent): Vec2 => {
      const rect = canvas.getBoundingClientRect()
      return toRoom(viewport, event.clientX - rect.left, event.clientY - rect.top)
    }

    const liveWorld = () => {
      const world = worldRef.current
      return world && !world.isDisposed ? world : null
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return
      const world = liveWorld()
      if (!world) return
      // A tap is a gesture: sound may start from here on.
      unlockAudio()
      // Focus the canvas so the keyboard shortcut works after a tap, without scrolling to it.
      canvas.focus({ preventScroll: true })
      const scene = sceneRef.current
      const point = roomPoint(event)
      const objects = world.getObjects()
      let hit: ObjectState | null = hitTest(objects, point)
      if (!hit && scene.spawnKind) {
        const spot = clampSpawnPoint(point, scene.spawnKind, world.room)
        const id = world.spawn(scene.spawnKind, spot.x, spot.y)
        if (id) {
          hit = world.getObject(id)
          scene.onObjectsChanged?.()
          scene.onSpawn?.(id)
        }
      }
      if (!hit || !scene.canDrag) return
      event.preventDefault()
      try {
        canvas.setPointerCapture(event.pointerId)
      } catch {
        // Some browsers refuse capture for synthetic pointers; dragging still works while over the canvas.
      }
      const tracker = new PointerTracker()
      tracker.push(event.timeStamp, hit.position)
      dragRef.current = {
        id: hit.id,
        pointerId: event.pointerId,
        offset: { x: hit.position.x - point.x, y: hit.position.y - point.y },
        target: { ...hit.position },
        tracker,
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const drag = dragRef.current
      if (!drag || drag.pointerId !== event.pointerId) return
      const world = liveWorld()
      if (!world) return
      event.preventDefault()
      const point = roomPoint(event)
      const object = world.getObject(drag.id)
      const kind = object?.kind ?? "ball"
      drag.target = clampSpawnPoint({ x: point.x + drag.offset.x, y: point.y + drag.offset.y }, kind, world.room, 0)
      drag.tracker.push(event.timeStamp, drag.target)
    }

    const endDrag = (event: PointerEvent, throwIt: boolean) => {
      const drag = dragRef.current
      if (!drag || drag.pointerId !== event.pointerId) return
      dragRef.current = null
      try {
        canvas.releasePointerCapture(event.pointerId)
      } catch {
        // Already released.
      }
      const world = liveWorld()
      if (!world || !world.hasObject(drag.id)) return
      if (world.isPaused) return
      const velocity = throwIt ? drag.tracker.velocity(event.timeStamp) : { x: 0, y: 0 }
      world.setVelocity(drag.id, velocity)
      const speed = Math.hypot(velocity.x, velocity.y)
      if (speed > 0) sceneRef.current.onThrow?.(drag.id, speed)
    }
    const onPointerUp = (event: PointerEvent) => endDrag(event, true)
    const onPointerCancel = (event: PointerEvent) => endDrag(event, false)

    canvas.addEventListener("pointerdown", onPointerDown)
    canvas.addEventListener("pointermove", onPointerMove)
    canvas.addEventListener("pointerup", onPointerUp)
    canvas.addEventListener("pointercancel", onPointerCancel)

    // -- the loop ----------------------------------------------------------

    let frameId = 0
    let last = performance.now()
    let running = false
    let frames = 0
    activeLoops += 1
    reportDebug({ loops: activeLoops })

    const frame = (now: number) => {
      frameId = requestAnimationFrame(frame)
      const dt = now - last
      last = now
      frames += 1
      reportDebug({ frames })
      if (window.devicePixelRatio !== viewport.dpr) fit()

      const scene = sceneRef.current
      const world = liveWorld()
      let objects: ObjectState[] = []
      let room = scene.room
      let elapsedMs = 0
      if (world) {
        const drag = dragRef.current
        if (drag) {
          const held = world.getObject(drag.id)
          if (!held) {
            dragRef.current = null
          } else if (world.isPaused) {
            world.setPosition(drag.id, drag.target)
          } else {
            world.setVelocity(drag.id, dragVelocity(held.position, drag.target))
            world.setAngularVelocity(drag.id, held.angularVelocity * 0.9)
          }
        }
        const steps = world.step(dt)
        objects = world.getObjects()
        room = world.room
        elapsedMs = world.elapsedMs
        if (steps > 0) {
          const contacts = world.takeContacts()
          const stepMs = steps * PHYSICS_STEP_MS
          noteImpacts(effects, contacts, objects, lastSpeeds, elapsedMs, scene.reducedMotion, scene.onImpact)
          effects.update(elapsedMs, stepMs)
          scene.onFrame?.({ objects, contacts, elapsedMs, dtMs: stepMs })
        }
        if (scene.trailsEnabled) trails.record(objects)
      }
      if (!room) return
      const hud: SceneHud = {
        gravityFlash: flashRef.current,
        now,
        grabbedId: dragRef.current?.id ?? null,
        dragTarget: dragRef.current?.target ?? null,
        labels: scene.labels,
        fontFamily,
        reducedMotion: scene.reducedMotion,
      }
      renderScene(ctx, {
        room,
        objects,
        trails: scene.trailsEnabled ? trails.trails() : [],
        gravity: scene.gravity,
        viewport,
        hud,
        elapsedMs,
        ripples: effects.liveRipples(),
        confetti: effects.liveConfetti(),
      })
    }
    const start = () => {
      if (running) return
      running = true
      last = performance.now()
      frameId = requestAnimationFrame(frame)
    }
    const stop = () => {
      if (!running) return
      running = false
      cancelAnimationFrame(frameId)
    }
    // Thirteen labs share the Activities page, so a room scrolled well out of
    // view neither simulates nor paints. Its clocks pause with it: nothing a
    // child cannot see is allowed to happen, and nothing costs CPU off screen.
    const visibility =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            (entries) => {
              if (entries.some((entry) => entry.isIntersecting)) start()
              else stop()
            },
            { rootMargin: "25%" },
          )
    if (visibility) visibility.observe(canvas)
    else start()

    return () => {
      stop()
      visibility?.disconnect()
      observer.disconnect()
      canvas.removeEventListener("pointerdown", onPointerDown)
      canvas.removeEventListener("pointermove", onPointerMove)
      canvas.removeEventListener("pointerup", onPointerUp)
      canvas.removeEventListener("pointercancel", onPointerCancel)
      dragRef.current = null
      trails.clear()
      trailsRef.current = null
      effects.clear()
      effectsRef.current = null
      activeLoops -= 1
      reportDebug({ loops: activeLoops })
    }
  }, [worldRef])

  return { canvasRef, containerRef }
}

/**
 * Turn the frame's new contacts into impact ripples: one per object that just
 * touched something while moving, sized by how fast it was going a frame ago.
 */
function noteImpacts(
  effects: EffectsStore,
  contacts: Contact[],
  objects: ObjectState[],
  lastSpeeds: Map<string, number>,
  nowMs: number,
  reducedMotion: boolean,
  onImpact?: (speed: number) => void,
): void {
  const byId = new Map(objects.map((object) => [object.id, object]))
  let loudest = 0
  for (const contact of contacts) {
    if (!contact.started) continue
    for (const label of [contact.a, contact.b]) {
      if (!label.startsWith(LABEL.object)) continue
      const object = byId.get(label.slice(LABEL.object.length))
      if (!object) continue
      const speed = lastSpeeds.get(object.id) ?? 0
      if (speed < RIPPLE_MIN_SPEED) continue
      loudest = Math.max(loudest, speed)
      if (!reducedMotion) effects.addRipple(object.position, speed, OBJECT_SPECS[object.kind].color, nowMs)
    }
  }
  if (loudest > 0) onImpact?.(loudest)
  for (const object of objects) lastSpeeds.set(object.id, Math.hypot(object.velocity.x, object.velocity.y))
  for (const id of [...lastSpeeds.keys()]) if (!byId.has(id)) lastSpeeds.delete(id)
}
