/**
 * Gravity Switch: Zero-G Lab — the physics world.
 *
 * `GravitySwitchWorld` owns one Matter.js engine and everything in it. It is
 * built from a `WorldConfig`, driven with `step`, and torn down with
 * `dispose`. Rebuilding is the reset strategy: `reset()` recreates every body
 * from the stored config inside the same engine, which restores the exact
 * starting state (positions, angles, starting velocities) and throws away
 * anything spawned since, with no bookkeeping of "what changed" to get wrong.
 *
 * Physics choices, all deliberate:
 * - Rooms are airless unless a level asks for air, so nothing slows down on
 *   its own and heavy and light objects fall together.
 * - Sleeping is off. A floating object has zero velocity for a long time and
 *   would otherwise doze off and ignore the switch being flipped back on.
 * - Speeds are capped (`MAX_SPEED_MPS`) because Matter has no continuous
 *   collision detection; the cap keeps every object slower than its own size
 *   per sub-step so it cannot pass through a wall or a thin lip.
 * - A containment pass after each frame catches the remaining impossible
 *   case of an object outside a closed room and puts it back.
 *
 * Units: the room is in px; gravity presets are real m/s² converted through
 * `PIXELS_PER_METER`; velocities cross the boundary of this module in m/s and
 * masses in kg. Matter itself stores velocity as px per 16.67 ms base step,
 * which the two conversion helpers hide.
 *
 * Matter.js is injected rather than imported so the browser can load it
 * lazily (see `useGravitySwitchWorld`) and Node tests can hand in the real
 * module.
 */

import {
  CIRCLE_SIDES,
  MAX_FRAME_MS,
  MAX_SANDBOX_OBJECTS,
  MAX_SPEED_MPS,
  OBJECT_SPECS,
  PHYSICS_STEP_MS,
  PIXELS_PER_METER,
  WALL_THICKNESS,
  effectiveGravity,
} from "./gravity-switch-config.ts"
import type {
  GravityState,
  Launcher,
  ObjectKind,
  ObjectPlacement,
  ObjectState,
  Obstacle,
  Vec2,
  WorldConfig,
  Zone,
} from "./gravity-switch-types.ts"

export type MatterModule = typeof import("matter-js")

import type { Body, Engine } from "matter-js"

/** Matter's base step: velocities are stored as px per this many ms. */
const BASE_DELTA_MS = 1000 / 60

/** How springy a bumper is: nearly all of the speed comes back. */
export const BUMPER_RESTITUTION = 0.95

/**
 * Bundlers and Node disagree on whether a CommonJS module arrives as the
 * namespace itself or wrapped in `default`. Accept either.
 */
export function resolveMatterModule(loaded: unknown): MatterModule {
  const candidate = loaded as { default?: MatterModule; Engine?: unknown }
  if (candidate && typeof candidate.Engine === "object") return candidate as MatterModule
  if (candidate?.default && typeof candidate.default.Engine === "object") return candidate.default
  throw new Error("matter-js did not load")
}

/** m/s → Matter velocity (px per base step). */
export function metersPerSecondToMatter(v: number): number {
  return (v * PIXELS_PER_METER * BASE_DELTA_MS) / 1000
}

/** Matter velocity (px per base step) → m/s. */
export function matterToMetersPerSecond(v: number): number {
  return (v * 1000) / (BASE_DELTA_MS * PIXELS_PER_METER)
}

/** Matter applies `gravity.y × scale` px/ms² to every body, so this makes gravity.y read in m/s². */
export const GRAVITY_SCALE = PIXELS_PER_METER / 1_000_000

/** Collision labels, so later evaluators can tell walls, obstacles and zones apart. */
export const LABEL = {
  wall: "wall:",
  obstacle: "obstacle:",
  zone: "zone:",
  object: "object:",
  launcher: "launcher:",
} as const

type ObjectRecord = {
  id: string
  kind: ObjectKind
  body: Body
  spawned: boolean
}

/** Two body labels that touched during a step; `started` when the touch began in this batch. */
export type Contact = { a: string; b: string; started: boolean }

export type SpawnOptions = {
  angle?: number
  /** m/s */
  velocity?: Vec2
  /** rad/s */
  angularVelocity?: number
}

export class GravitySwitchWorld {
  /** Worlds built and not yet disposed, across the whole page. For leak checks. */
  static liveCount = 0

  readonly engine: Engine

  private readonly M: MatterModule
  private config: WorldConfig
  private initialGravity: GravityState
  private gravity: GravityState
  private objects = new Map<string, ObjectRecord>()
  private obstacleBodies = new Map<string, Body>()
  private zoneBodies = new Map<string, Body>()
  private wallBodies: Body[] = []
  private spawnCounter = 0
  private accumulatorMs = 0
  private paused = false
  private disposed = false
  /** Contacts since the last `takeContacts()`, keyed to drop duplicates within a frame. */
  private contacts = new Map<string, Contact>()
  private launcherBodies: Body[] = []
  private launched = false

  /** Simulated time since the world was (re)built, in ms. */
  elapsedMs = 0
  /** Times the containment pass had to put an object back into the room. */
  recoveries = 0

  constructor(Matter: MatterModule, config: WorldConfig, gravity: GravityState) {
    this.M = Matter
    this.config = config
    this.initialGravity = { ...gravity }
    this.gravity = { ...gravity }
    this.engine = Matter.Engine.create({
      enableSleeping: false,
      positionIterations: 8,
      velocityIterations: 6,
      gravity: { x: 0, y: 0, scale: GRAVITY_SCALE },
    })
    GravitySwitchWorld.liveCount += 1
    // Collision bookkeeping for objective detection. Registered once per engine;
    // `dispose()` removes every listener.
    const record = (started: boolean) => (event: { pairs: Array<{ bodyA: Body; bodyB: Body }> }) => {
      for (const { bodyA, bodyB } of event.pairs) {
        const a = bodyA.label
        const b = bodyB.label
        const key = a < b ? `${a}|${b}` : `${b}|${a}`
        const existing = this.contacts.get(key)
        if (!existing) this.contacts.set(key, { a, b, started })
        else if (started) existing.started = true
      }
    }
    Matter.Events.on(this.engine, "collisionStart", record(true))
    Matter.Events.on(this.engine, "collisionActive", record(false))
    this.build()
  }

  /**
   * Every pair of bodies that started or kept touching since the last call,
   * then forget them. Walls, obstacles, zones and objects are told apart by
   * their label prefixes (see `LABEL`).
   */
  takeContacts(): Contact[] {
    const out = [...this.contacts.values()]
    this.contacts.clear()
    return out
  }

  // -- lifecycle -----------------------------------------------------------

  /** Replace the room with a different one, reusing the engine. Nothing from the old room survives. */
  load(config: WorldConfig, gravity: GravityState): void {
    this.assertLive()
    this.config = config
    this.initialGravity = { ...gravity }
    this.gravity = { ...gravity }
    this.build()
  }

  /** Back to the exact starting state of the current room, spawned objects removed. */
  reset(): void {
    this.assertLive()
    this.gravity = { ...this.initialGravity }
    this.build()
  }

  /** Release everything. The instance is unusable afterwards. */
  dispose(): void {
    if (this.disposed) return
    // An empty name clears every listener on the engine (Matter treats it as "all").
    this.M.Events.off(this.engine, "")
    this.clear()
    this.disposed = true
    GravitySwitchWorld.liveCount -= 1
  }

  get isDisposed(): boolean {
    return this.disposed
  }

  private assertLive(): void {
    if (this.disposed) throw new Error("GravitySwitchWorld has been disposed")
  }

  private clear(): void {
    const { Composite, Engine } = this.M
    Composite.clear(this.engine.world, false, true)
    Engine.clear(this.engine)
    this.engine.timing.timestamp = 0
    this.objects.clear()
    this.obstacleBodies.clear()
    this.zoneBodies.clear()
    this.wallBodies = []
    this.launcherBodies = []
    this.launched = false
    this.spawnCounter = 0
    this.accumulatorMs = 0
    this.elapsedMs = 0
    this.recoveries = 0
    this.paused = false
    this.contacts.clear()
  }

  private build(): void {
    this.clear()
    const { Composite } = this.M
    const { config } = this

    this.wallBodies = this.createWalls()
    for (const obstacle of config.obstacles) {
      this.obstacleBodies.set(obstacle.id, this.createObstacle(obstacle))
    }
    for (const zone of config.zones) {
      this.zoneBodies.set(zone.id, this.createZone(zone))
    }
    this.launcherBodies = (config.launchers ?? []).map((launcher) => this.createLauncherPad(launcher))
    Composite.add(this.engine.world, [
      ...this.wallBodies,
      ...this.obstacleBodies.values(),
      ...this.zoneBodies.values(),
      ...this.launcherBodies,
    ])
    for (const placement of config.objects) {
      this.addObject(placement, false)
    }
    this.applyGravity()
  }

  // -- construction --------------------------------------------------------

  private createWalls(): Body[] {
    const { Bodies } = this.M
    const { width, height, walls } = this.config
    const t = WALL_THICKNESS
    const options = {
      isStatic: true,
      restitution: 0,
      friction: 0.5,
    }
    const bodies: Body[] = []
    const make = (name: string, x: number, y: number, w: number, h: number) =>
      Bodies.rectangle(x, y, w, h, { ...options, label: `${LABEL.wall}${name}` })
    // Side walls overlap the floor and ceiling so there is never a gap at a corner.
    if (walls.floor) bodies.push(make("floor", width / 2, height + t / 2, width + 2 * t, t))
    if (walls.ceiling) bodies.push(make("ceiling", width / 2, -t / 2, width + 2 * t, t))
    if (walls.left) bodies.push(make("left", -t / 2, height / 2, t, height + 2 * t))
    if (walls.right) bodies.push(make("right", width + t / 2, height / 2, t, height + 2 * t))
    return bodies
  }

  private createObstacle(obstacle: Obstacle): Body {
    const { Bodies } = this.M
    const body = Bodies.rectangle(
      obstacle.x + obstacle.width / 2,
      obstacle.y + obstacle.height / 2,
      obstacle.width,
      obstacle.height,
      {
        isStatic: true,
        angle: obstacle.angle ?? 0,
        label: `${LABEL.obstacle}${obstacle.id}`,
      },
    )
    // Matter's static-body setup resets restitution to 0 and friction to 1 no
    // matter what the options said, so surface feel is set afterwards. A pair
    // takes the larger restitution and the smaller friction of its two bodies:
    // dull surfaces stay at 0 and let the object decide how much it bounces,
    // while a bumper's 0.95 wins over any object and is frictionless so the
    // bounce leaves at the mirrored angle.
    body.restitution = obstacle.kind === "bumper" ? BUMPER_RESTITUTION : 0
    body.friction = obstacle.kind === "bumper" ? 0 : 0.5
    return body
  }

  /** The solid pad of a spring launcher. */
  private createLauncherPad(launcher: Launcher): Body {
    const { Bodies } = this.M
    return Bodies.rectangle(
      launcher.x + launcher.width / 2,
      launcher.y + launcher.height / 2,
      launcher.width,
      launcher.height,
      { isStatic: true, restitution: 0, friction: 0.6, label: `${LABEL.launcher}${launcher.id}` },
    )
  }

  /** Fire every launcher: the spring releases. Runs once, on the first sub-step after a build. */
  private fireLaunchers(): void {
    this.launched = true
    for (const launcher of this.config.launchers ?? []) {
      const angle = launcher.angle ?? 0
      this.setVelocity(launcher.objectId, { x: Math.sin(angle) * launcher.speed, y: -Math.cos(angle) * launcher.speed })
    }
  }

  /** True once the spring pads have fired (the simulation has advanced at least once). */
  get hasLaunched(): boolean {
    return this.launched
  }

  private createZone(zone: Zone): Body {
    const { Bodies } = this.M
    return Bodies.rectangle(zone.x + zone.width / 2, zone.y + zone.height / 2, zone.width, zone.height, {
      isStatic: true,
      isSensor: true,
      label: `${LABEL.zone}${zone.id}`,
    })
  }

  private addObject(placement: ObjectPlacement, spawned: boolean): ObjectRecord {
    const { Bodies, Body, Composite } = this.M
    const spec = OBJECT_SPECS[placement.kind]
    const options = {
      restitution: spec.restitution,
      friction: spec.friction,
      // Matter's default is 0.01 per step, which would be a permanent headwind.
      frictionAir: this.config.air === "air" ? spec.frictionAir : 0,
      angle: placement.angle ?? 0,
      label: `${LABEL.object}${placement.id}`,
    }
    const body =
      spec.shape.type === "circle"
        ? this.createCircle(placement.x, placement.y, spec.shape.radius, options)
        : Bodies.rectangle(placement.x, placement.y, spec.shape.width, spec.shape.height, {
            ...options,
            chamfer: { radius: 3 },
          })
    Body.setMass(body, spec.mass)
    if (placement.velocity) {
      Body.setVelocity(body, {
        x: metersPerSecondToMatter(placement.velocity.x),
        y: metersPerSecondToMatter(placement.velocity.y),
      })
    }
    if (placement.angularVelocity) {
      Body.setAngularVelocity(body, (placement.angularVelocity * BASE_DELTA_MS) / 1000)
    }
    Composite.add(this.engine.world, body)
    const record: ObjectRecord = { id: placement.id, kind: placement.kind, body, spawned }
    this.objects.set(placement.id, record)
    return record
  }

  /** A round body with enough sides to bounce straight; see `CIRCLE_SIDES`. */
  private createCircle(x: number, y: number, radius: number, options: object): Body {
    const body = this.M.Bodies.polygon(x, y, CIRCLE_SIDES, radius, options)
    body.circleRadius = radius
    return body
  }

  // -- objects -------------------------------------------------------------

  /**
   * Drop a new object into the room. Returns its id, or null when the room is
   * full. Spawned objects disappear on `reset()`.
   */
  spawn(kind: ObjectKind, x: number, y: number, options: SpawnOptions = {}): string | null {
    this.assertLive()
    if (this.objects.size >= MAX_SANDBOX_OBJECTS) return null
    this.spawnCounter += 1
    const id = `spawn-${kind}-${this.spawnCounter}`
    this.addObject({ id, kind, x, y, ...options }, true)
    return id
  }

  remove(id: string): boolean {
    this.assertLive()
    const record = this.objects.get(id)
    if (!record) return false
    this.M.Composite.remove(this.engine.world, record.body)
    this.objects.delete(id)
    return true
  }

  /** Remove every object added since the room was built. Returns how many went. */
  clearSpawned(): number {
    this.assertLive()
    let removed = 0
    for (const [id, record] of [...this.objects]) {
      if (!record.spawned) continue
      this.M.Composite.remove(this.engine.world, record.body)
      this.objects.delete(id)
      removed += 1
    }
    return removed
  }

  hasObject(id: string): boolean {
    return this.objects.has(id)
  }

  /** How many more objects the room can take. */
  get freeSlots(): number {
    return Math.max(0, MAX_SANDBOX_OBJECTS - this.objects.size)
  }

  get objectCount(): number {
    return this.objects.size
  }

  /** Every body in the engine, statics and sensors included. For leak checks. */
  get bodyCount(): number {
    return this.M.Composite.allBodies(this.engine.world).length
  }

  getObject(id: string): ObjectState | null {
    const record = this.objects.get(id)
    return record ? this.snapshot(record) : null
  }

  getObjects(): ObjectState[] {
    return [...this.objects.values()].map((record) => this.snapshot(record))
  }

  /** Overwrite an object's velocity, in m/s. The primitive behind pushes and launches. */
  setVelocity(id: string, velocity: Vec2): boolean {
    this.assertLive()
    const record = this.objects.get(id)
    if (!record) return false
    this.M.Sleeping.set(record.body, false)
    this.M.Body.setVelocity(record.body, {
      x: metersPerSecondToMatter(velocity.x),
      y: metersPerSecondToMatter(velocity.y),
    })
    return true
  }

  /** Overwrite an object's spin, in rad/s. */
  setAngularVelocity(id: string, radiansPerSecond: number): boolean {
    this.assertLive()
    const record = this.objects.get(id)
    if (!record) return false
    this.M.Body.setAngularVelocity(record.body, (radiansPerSecond * BASE_DELTA_MS) / 1000)
    return true
  }

  /**
   * Teleport an object, keeping its velocity. For arranging things while the
   * room is paused; while it runs, drive objects with `setVelocity` instead so
   * they still collide on the way.
   */
  setPosition(id: string, position: Vec2): boolean {
    this.assertLive()
    const record = this.objects.get(id)
    if (!record) return false
    this.M.Body.setPosition(record.body, { x: position.x, y: position.y })
    return true
  }

  /** Add to an object's velocity, in m/s: an instantaneous kick. */
  addVelocity(id: string, delta: Vec2): boolean {
    const current = this.getObject(id)
    if (!current) return false
    return this.setVelocity(id, { x: current.velocity.x + delta.x, y: current.velocity.y + delta.y })
  }

  private snapshot(record: ObjectRecord): ObjectState {
    const { Body } = this.M
    const { body } = record
    const velocity = Body.getVelocity(body)
    return {
      id: record.id,
      kind: record.kind,
      position: { x: body.position.x, y: body.position.y },
      velocity: { x: matterToMetersPerSecond(velocity.x), y: matterToMetersPerSecond(velocity.y) },
      angle: body.angle,
      angularVelocity: (Body.getAngularVelocity(body) * 1000) / BASE_DELTA_MS,
      mass: body.mass,
      spawned: record.spawned,
    }
  }

  // -- gravity -------------------------------------------------------------

  setGravity(gravity: GravityState): void {
    this.assertLive()
    this.gravity = { ...gravity }
    this.applyGravity()
  }

  getGravity(): GravityState {
    return { ...this.gravity }
  }

  /** The acceleration currently applied, in m/s². */
  get gravityMagnitude(): number {
    return effectiveGravity(this.gravity)
  }

  private applyGravity(): void {
    this.engine.gravity.x = 0
    this.engine.gravity.y = effectiveGravity(this.gravity)
    this.engine.gravity.scale = GRAVITY_SCALE
    // Sleeping is disabled, but should that ever change, a gravity change
    // must still reach every body: a resting object has to notice.
    for (const { body } of this.objects.values()) {
      this.M.Sleeping.set(body, false)
    }
  }

  // -- time ----------------------------------------------------------------

  pause(): void {
    this.paused = true
  }

  resume(): void {
    this.paused = false
  }

  get isPaused(): boolean {
    return this.paused
  }

  /**
   * Advance by a frame's worth of wall-clock time using fixed sub-steps, so
   * the simulation is identical at any frame rate. A long frame (a hidden
   * tab coming back) is clamped rather than caught up on. Does nothing while
   * paused. Returns how many sub-steps ran.
   */
  step(frameMs: number): number {
    this.assertLive()
    if (this.paused || !(frameMs > 0)) return 0
    this.accumulatorMs += Math.min(frameMs, MAX_FRAME_MS)
    let steps = 0
    while (this.accumulatorMs >= PHYSICS_STEP_MS) {
      this.subStep()
      this.accumulatorMs -= PHYSICS_STEP_MS
      steps += 1
    }
    if (steps > 0) this.containObjects()
    return steps
  }

  /** Run exactly `count` fixed sub-steps regardless of the accumulator or pause. For tests and tools. */
  stepExactly(count: number): void {
    this.assertLive()
    for (let i = 0; i < count; i++) this.subStep()
    if (count > 0) this.containObjects()
  }

  private subStep(): void {
    if (!this.launched) this.fireLaunchers()
    this.M.Engine.update(this.engine, PHYSICS_STEP_MS)
    this.elapsedMs += PHYSICS_STEP_MS
    this.enforceSpeedLimit()
  }

  private enforceSpeedLimit(): void {
    const { Body } = this.M
    const cap = metersPerSecondToMatter(MAX_SPEED_MPS)
    for (const { body } of this.objects.values()) {
      const velocity = Body.getVelocity(body)
      const speed = Math.hypot(velocity.x, velocity.y)
      if (speed > cap) {
        const k = cap / speed
        Body.setVelocity(body, { x: velocity.x * k, y: velocity.y * k })
      }
    }
  }

  /**
   * Put back any object that has somehow ended up fully outside a closed
   * side. With the speed cap this should never fire; it is the last line of
   * defence so a tunnelled object can never fall forever.
   */
  private containObjects(): void {
    const { Body } = this.M
    const { width, height, walls } = this.config
    const margin = 2
    for (const { body } of this.objects.values()) {
      const { bounds } = body
      let dx = 0
      let dy = 0
      if (walls.left && bounds.max.x < 0) dx = margin - bounds.min.x
      else if (walls.right && bounds.min.x > width) dx = width - margin - bounds.max.x
      if (walls.ceiling && bounds.max.y < 0) dy = margin - bounds.min.y
      else if (walls.floor && bounds.min.y > height) dy = height - margin - bounds.max.y
      if (dx !== 0 || dy !== 0) {
        Body.setPosition(body, { x: body.position.x + dx, y: body.position.y + dy })
        Body.setVelocity(body, { x: 0, y: 0 })
        this.recoveries += 1
      }
    }
  }

  // -- read-only geometry for renderers ------------------------------------

  get room(): WorldConfig {
    return this.config
  }
}
