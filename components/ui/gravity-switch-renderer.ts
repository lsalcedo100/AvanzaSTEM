/**
 * Gravity Switch: Zero-G Lab — canvas renderer.
 *
 * Pure drawing: given a room, the live object snapshots, optional trails and
 * effects, and a viewport, paint one frame. Nothing here touches Matter.js or
 * React. Everything is drawn in room px after `applyViewport`, so the same
 * code serves every canvas size and pixel density.
 *
 * The look: a dark lab deck with a metre grid, panel walls and a lit floor.
 * With gravity on the floor glows warm; with it off the room cools to violet
 * and a little dust hangs in the air. Objects are small illustrations drawn
 * inside their physics shapes; zones read as cups, targets and hazards.
 */

import { GRAVITY_PRESETS, OBJECT_SPECS, PIXELS_PER_METER, effectiveGravity } from "./gravity-switch-config.ts"
import { type Confetto, type Ripple, confettoProgress, rippleProgress } from "./gravity-switch-effects.ts"
import { objectExtent } from "./gravity-switch-interaction.ts"
import type { GravityState, Launcher, ObjectKind, ObjectState, Obstacle, Vec2, WorldConfig, Zone } from "./gravity-switch-types.ts"
import type { Trail } from "./gravity-switch-trails.ts"
import { type Viewport, applyViewport } from "./gravity-switch-viewport.ts"

/** The heads-up layer: what the player needs to notice beyond the objects themselves. */
export type SceneHud = {
  /** When the switch last changed and which way; drives the banner. */
  gravityFlash: { at: number; on: boolean } | null
  /** Current time on the same clock as `gravityFlash.at`. */
  now: number
  /** The object being dragged, if any, and where the pointer wants it. */
  grabbedId: string | null
  dragTarget: Vec2 | null
  labels: { gravityOn: string; gravityOff: string }
  fontFamily: string
  /** Skip decorative motion: dust drift, banner scaling, ripples and confetti still fade but do not animate. */
  reducedMotion: boolean
}

export type Scene = {
  room: WorldConfig
  objects: ObjectState[]
  trails: Trail[]
  gravity: GravityState
  viewport: Viewport
  hud?: SceneHud
  /** Simulated time since the room was built, ms; 0 while a briefing shows the spring compressed. */
  elapsedMs?: number
  ripples?: readonly Ripple[]
  confetti?: readonly Confetto[]
}

/** How long the gravity banner stays up after a flip, ms. */
export const GRAVITY_FLASH_MS = 1100
/** How long a released spring takes to extend, ms. */
const SPRING_RELEASE_MS = 140

const COLORS = {
  grid: "rgba(255,255,255,0.055)",
  wallFill: "rgba(71,85,105,0.55)",
  wallEdge: "rgba(148,163,184,0.5)",
  floorDeck: "rgba(148,163,184,0.14)",
  floorLine: "#94a3b8",
  openSide: "rgba(148,163,184,0.35)",
  obstacleFill: "#475569",
  obstacleTop: "#94a3b8",
  obstacleStroke: "#334155",
  bumperFill: "#f59e0b",
  bumperStripe: "rgba(255,255,255,0.28)",
  bumperStroke: "#b45309",
  objectStroke: "rgba(15,23,42,0.5)",
  objectMark: "rgba(15,23,42,0.35)",
  dust: "rgba(196,181,253,0.35)",
} as const

const ZONE_STYLE: Record<Zone["kind"], { stroke: string; fill: string }> = {
  goal: { stroke: "#2ecc71", fill: "rgba(46,204,113,0.10)" },
  target: { stroke: "#fbbf24", fill: "rgba(251,191,36,0.10)" },
  hazard: { stroke: "#ef4444", fill: "rgba(239,68,68,0.12)" },
}

const WALL_INSET = 6

// ---------------------------------------------------------------------------
// Frame
// ---------------------------------------------------------------------------

export function renderScene(ctx: CanvasRenderingContext2D, scene: Scene): void {
  const { room, viewport, hud } = scene
  const gravityOn = effectiveGravity(scene.gravity) > 0
  const now = scene.elapsedMs ?? 0
  applyViewport(ctx, viewport)
  drawRoom(ctx, room, gravityOn, now, hud?.reducedMotion ?? false)
  for (const zone of room.zones) drawZone(ctx, zone)
  for (const obstacle of room.obstacles) drawObstacle(ctx, obstacle)
  for (const launcher of room.launchers ?? []) drawLauncher(ctx, launcher, now)
  for (const trail of scene.trails) drawTrail(ctx, trail)
  for (const ripple of scene.ripples ?? []) drawRipple(ctx, ripple, now)
  for (const object of scene.objects) drawObject(ctx, object)
  for (const confetto of scene.confetti ?? []) drawConfetto(ctx, confetto, now)
  if (hud) {
    if (hud.grabbedId) {
      const grabbed = scene.objects.find((object) => object.id === hud.grabbedId)
      if (grabbed) drawGrab(ctx, grabbed, hud.dragTarget)
    }
    drawGravityIndicator(ctx, room, scene.gravity, hud)
    if (hud.gravityFlash) drawGravityBanner(ctx, room, hud)
  }
}

// ---------------------------------------------------------------------------
// Room
// ---------------------------------------------------------------------------

function drawRoom(ctx: CanvasRenderingContext2D, room: WorldConfig, gravityOn: boolean, now: number, still: boolean): void {
  const { width, height, walls } = room

  // Backdrop: a deep navy that cools toward violet when nothing is pulling.
  const sky = ctx.createLinearGradient(0, 0, 0, height)
  if (gravityOn) {
    sky.addColorStop(0, "#0e1a35")
    sky.addColorStop(1, "#13213d")
  } else {
    sky.addColorStop(0, "#161a3f")
    sky.addColorStop(1, "#111c33")
  }
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, width, height)

  // One grid line per metre.
  ctx.strokeStyle = COLORS.grid
  ctx.lineWidth = 1
  ctx.beginPath()
  for (let x = PIXELS_PER_METER; x < width; x += PIXELS_PER_METER) {
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
  }
  for (let y = PIXELS_PER_METER; y < height; y += PIXELS_PER_METER) {
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
  }
  ctx.stroke()

  // Dust hangs in the air when nothing pulls it down.
  if (!gravityOn) drawDust(ctx, room, still ? 0 : now)

  // The floor: a glow when gravity is on (things rest here), a deck strip, a solid edge with metre ticks.
  if (walls.floor) {
    const glow = ctx.createLinearGradient(0, height - 60, 0, height)
    glow.addColorStop(0, "rgba(46,204,113,0)")
    glow.addColorStop(1, gravityOn ? "rgba(46,204,113,0.16)" : "rgba(148,163,184,0.08)")
    ctx.fillStyle = glow
    ctx.fillRect(0, height - 60, width, 60)
    ctx.fillStyle = COLORS.floorDeck
    ctx.fillRect(0, height - 10, width, 10)
    ctx.fillStyle = COLORS.floorLine
    ctx.fillRect(0, height - 3, width, 3)
    ctx.strokeStyle = "rgba(148,163,184,0.5)"
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let x = PIXELS_PER_METER; x < width; x += PIXELS_PER_METER) {
      ctx.moveTo(x, height - 10)
      ctx.lineTo(x, height - 4)
    }
    ctx.stroke()
  }

  // Other closed sides are panels; open sides show a dashed edge.
  const panels: Array<[boolean, number, number, number, number]> = [
    [walls.ceiling, 0, 0, width, WALL_INSET],
    [walls.left, 0, 0, WALL_INSET, height],
    [walls.right, width - WALL_INSET, 0, WALL_INSET, height],
  ]
  for (const [closed, x, y, w, h] of panels) {
    if (!closed) continue
    ctx.fillStyle = COLORS.wallFill
    ctx.fillRect(x, y, w, h)
    ctx.fillStyle = COLORS.wallEdge
    if (h > w) ctx.fillRect(x === 0 ? w - 1 : x, y, 1, h)
    else ctx.fillRect(x, h - 1, w, 1)
  }
  ctx.strokeStyle = COLORS.openSide
  ctx.setLineDash([10, 8])
  ctx.lineWidth = 2
  ctx.beginPath()
  if (!walls.floor) {
    ctx.moveTo(0, height - 1)
    ctx.lineTo(width, height - 1)
  }
  if (!walls.ceiling) {
    ctx.moveTo(0, 1)
    ctx.lineTo(width, 1)
  }
  if (!walls.left) {
    ctx.moveTo(1, 0)
    ctx.lineTo(1, height)
  }
  if (!walls.right) {
    ctx.moveTo(width - 1, 0)
    ctx.lineTo(width - 1, height)
  }
  ctx.stroke()
  ctx.setLineDash([])
}

/** A sparse field of motes, drifting very slowly on a fixed pseudo-random layout. */
function drawDust(ctx: CanvasRenderingContext2D, room: WorldConfig, now: number): void {
  ctx.fillStyle = COLORS.dust
  const count = 34
  for (let i = 0; i < count; i++) {
    const seed = i * 97.31
    const baseX = ((Math.sin(seed) + 1) / 2) * room.width
    const baseY = ((Math.cos(seed * 1.7) + 1) / 2) * room.height
    const driftX = Math.sin(now / 4000 + i) * 8
    const driftY = Math.cos(now / 5200 + i * 0.5) * 6
    const r = 1 + (i % 3) * 0.5
    ctx.beginPath()
    ctx.arc(baseX + driftX, baseY + driftY, r, 0, Math.PI * 2)
    ctx.fill()
  }
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + w - radius, y)
  ctx.arcTo(x + w, y, x + w, y + radius, radius)
  ctx.lineTo(x + w, y + h - radius)
  ctx.arcTo(x + w, y + h, x + w - radius, y + h, radius)
  ctx.lineTo(x + radius, y + h)
  ctx.arcTo(x, y + h, x, y + h - radius, radius)
  ctx.lineTo(x, y + radius)
  ctx.arcTo(x, y, x + radius, y, radius)
  ctx.closePath()
}

// ---------------------------------------------------------------------------
// Zones, obstacles, launchers
// ---------------------------------------------------------------------------

function drawZone(ctx: CanvasRenderingContext2D, zone: Zone): void {
  const style = ZONE_STYLE[zone.kind]
  ctx.save()
  roundedRect(ctx, zone.x, zone.y, zone.width, zone.height, 8)
  ctx.fillStyle = style.fill
  ctx.fill()
  if (zone.kind === "hazard") {
    // Diagonal warning stripes, clipped to the zone.
    ctx.clip()
    ctx.strokeStyle = "rgba(239,68,68,0.35)"
    ctx.lineWidth = 3
    ctx.beginPath()
    for (let x = zone.x - zone.height; x < zone.x + zone.width + zone.height; x += 14) {
      ctx.moveTo(x, zone.y + zone.height)
      ctx.lineTo(x + zone.height, zone.y)
    }
    ctx.stroke()
    ctx.restore()
    ctx.save()
    roundedRect(ctx, zone.x, zone.y, zone.width, zone.height, 8)
  }
  ctx.strokeStyle = style.stroke
  ctx.lineWidth = 2
  ctx.setLineDash([8, 6])
  ctx.stroke()
  ctx.setLineDash([])

  const cx = zone.x + zone.width / 2
  if (zone.kind === "goal") {
    // A bullseye on the floor of the cup.
    const cy = zone.y + zone.height - 14
    const r = Math.min(10, zone.width / 4)
    ctx.strokeStyle = "rgba(46,204,113,0.6)"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.moveTo(cx + r * 0.45, cy)
    ctx.arc(cx, cy, r * 0.45, 0, Math.PI * 2)
    ctx.stroke()
  } else if (zone.kind === "target") {
    drawStar(ctx, cx, zone.y + zone.height / 2, Math.min(12, zone.height / 3), "rgba(251,191,36,0.85)")
  }
  ctx.restore()
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string): void {
  ctx.save()
  ctx.fillStyle = color
  ctx.beginPath()
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? r : r * 0.45
    const angle = -Math.PI / 2 + (i * Math.PI) / 5
    const x = cx + Math.cos(angle) * radius
    const y = cy + Math.sin(angle) * radius
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

function drawObstacle(ctx: CanvasRenderingContext2D, obstacle: Obstacle): void {
  const bumper = obstacle.kind === "bumper"
  const { width, height } = obstacle
  ctx.save()
  ctx.translate(obstacle.x + width / 2, obstacle.y + height / 2)
  ctx.rotate(obstacle.angle ?? 0)
  roundedRect(ctx, -width / 2, -height / 2, width, height, 3)
  ctx.fillStyle = bumper ? COLORS.bumperFill : COLORS.obstacleFill
  ctx.fill()
  if (bumper) {
    // Chevron stripes read as "springy".
    ctx.save()
    ctx.clip()
    ctx.strokeStyle = COLORS.bumperStripe
    ctx.lineWidth = 4
    ctx.beginPath()
    const span = Math.max(width, height)
    for (let s = -span; s < span; s += 14) {
      ctx.moveTo(-width / 2 - 2, s)
      ctx.lineTo(width / 2 + 2, s + width)
    }
    ctx.stroke()
    ctx.restore()
  } else {
    // A lit top edge so platforms read as surfaces to land on.
    ctx.fillStyle = COLORS.obstacleTop
    ctx.fillRect(-width / 2 + 1, -height / 2, width - 2, 2)
  }
  roundedRect(ctx, -width / 2, -height / 2, width, height, 3)
  ctx.strokeStyle = bumper ? COLORS.bumperStroke : COLORS.obstacleStroke
  ctx.lineWidth = 1.5
  ctx.stroke()
  ctx.restore()
}

/**
 * A spring on a base plate, drawn in the launcher's own frame so an angled
 * launcher leans the way it fires. Compressed until the room first advances,
 * then it springs to full height.
 */
function drawLauncher(ctx: CanvasRenderingContext2D, launcher: Launcher, elapsedMs: number): void {
  const release = Math.min(1, Math.max(0, elapsedMs / SPRING_RELEASE_MS))
  const h = launcher.height
  const w = launcher.width
  const compressedTop = -h
  const extendedTop = -h * 2.6
  const top = compressedTop + (extendedTop - compressedTop) * release
  const coilWidth = w * 0.5

  ctx.save()
  ctx.translate(launcher.x + w / 2, launcher.y + h)
  ctx.rotate(launcher.angle ?? 0)
  ctx.fillStyle = "#475569"
  roundedRect(ctx, -w / 2 - 6, -8, w + 12, 8, 2)
  ctx.fill()
  ctx.fillStyle = "#94a3b8"
  ctx.fillRect(-w / 2 - 5, -8, w + 10, 1.5)
  const coils = 6
  ctx.strokeStyle = "#cbd5e1"
  ctx.lineWidth = 3
  ctx.lineJoin = "round"
  ctx.lineCap = "round"
  ctx.beginPath()
  ctx.moveTo(0, -8)
  for (let i = 1; i <= coils; i++) {
    const y = -8 + ((top + 4 + 8) * i) / coils
    const x = i % 2 === 0 ? -coilWidth / 2 : coilWidth / 2
    ctx.lineTo(x, y)
  }
  ctx.lineTo(0, top + 4)
  ctx.stroke()
  ctx.fillStyle = "#f59e0b"
  roundedRect(ctx, -w / 2, top, w, 8, 3)
  ctx.fill()
  ctx.fillStyle = "rgba(255,255,255,0.35)"
  ctx.fillRect(-w / 2 + 2, top + 1, w - 4, 2)
  ctx.restore()
}

// ---------------------------------------------------------------------------
// Trails and effects
// ---------------------------------------------------------------------------

function drawTrail(ctx: CanvasRenderingContext2D, trail: Trail): void {
  const { points } = trail
  if (points.length < 2) return
  const color = OBJECT_SPECS[trail.kind].color
  ctx.save()
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  ctx.strokeStyle = color
  ctx.globalAlpha = 0.28
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y)
  ctx.stroke()
  const recent = Math.max(0, points.length - 16)
  ctx.globalAlpha = 0.7
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(points[recent].x, points[recent].y)
  for (let i = recent + 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y)
  ctx.stroke()
  ctx.restore()
}

function drawRipple(ctx: CanvasRenderingContext2D, ripple: Ripple, now: number): void {
  const t = rippleProgress(ripple, now)
  const eased = 1 - (1 - t) * (1 - t)
  ctx.save()
  ctx.globalAlpha = (1 - t) * 0.7
  ctx.strokeStyle = ripple.color
  ctx.lineWidth = 2.5 - t * 1.5
  ctx.beginPath()
  ctx.arc(ripple.x, ripple.y, 4 + eased * ripple.maxRadius, 0, Math.PI * 2)
  ctx.stroke()
  ctx.restore()
}

function drawConfetto(ctx: CanvasRenderingContext2D, confetto: Confetto, now: number): void {
  const t = confettoProgress(confetto, now)
  ctx.save()
  ctx.globalAlpha = t > 0.7 ? (1 - t) / 0.3 : 1
  ctx.translate(confetto.x, confetto.y)
  ctx.rotate(confetto.angle)
  ctx.fillStyle = confetto.color
  ctx.fillRect(-confetto.size / 2, -confetto.size / 4, confetto.size, confetto.size / 2)
  ctx.restore()
}

// ---------------------------------------------------------------------------
// Objects
// ---------------------------------------------------------------------------

function drawObject(ctx: CanvasRenderingContext2D, object: ObjectState): void {
  ctx.save()
  ctx.translate(object.position.x, object.position.y)
  ctx.rotate(object.angle)
  drawObjectShape(ctx, object.kind)
  ctx.restore()
}

/** The illustration for one object kind, centred on the origin at its physics size. */
function drawObjectShape(ctx: CanvasRenderingContext2D, kind: ObjectKind): void {
  const spec = OBJECT_SPECS[kind]
  switch (kind) {
    case "ball":
      drawBall(ctx, spec.shape.type === "circle" ? spec.shape.radius : 18, spec.color)
      break
    case "bowling":
      drawBowling(ctx, spec.shape.type === "circle" ? spec.shape.radius : 22, spec.color)
      break
    case "crate":
      if (spec.shape.type === "rectangle") drawCrate(ctx, spec.shape.width, spec.shape.height, spec.color)
      break
    case "feather":
      if (spec.shape.type === "rectangle") drawFeather(ctx, spec.shape.width, spec.shape.height, spec.color)
      break
    case "hammer":
      if (spec.shape.type === "rectangle") drawHammer(ctx, spec.shape.width, spec.shape.height, spec.color)
      break
  }
}

/** Tilt for the swatch, so the long thin objects read as a feather and a hammer, not bars. */
const ICON_TILT: Record<ObjectKind, number> = { ball: 0, bowling: 0, crate: 0, feather: -0.35, hammer: -0.45 }

/**
 * The same illustration the room uses, scaled to sit inside a `width`×`height`
 * box in CSS pixels (the caller sets the DPR transform). Used by the palette,
 * so what a child picks looks exactly like what drops in.
 */
export function drawObjectIcon(ctx: CanvasRenderingContext2D, kind: ObjectKind, width: number, height: number): void {
  const spec = OBJECT_SPECS[kind]
  const w = spec.shape.type === "circle" ? spec.shape.radius * 2 : spec.shape.width
  const h = spec.shape.type === "circle" ? spec.shape.radius * 2 : spec.shape.height
  const tilt = ICON_TILT[kind]
  const boxW = Math.abs(w * Math.cos(tilt)) + Math.abs(h * Math.sin(tilt))
  const boxH = Math.abs(w * Math.sin(tilt)) + Math.abs(h * Math.cos(tilt))
  const scale = Math.min(1, (width - 6) / boxW, (height - 6) / boxH)
  ctx.save()
  ctx.translate(width / 2, height / 2)
  ctx.scale(scale, scale)
  ctx.rotate(tilt)
  drawObjectShape(ctx, kind)
  ctx.restore()
}

function shade(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.max(0, Math.min(255, (n >> 16) + amount))
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + amount))
  const b = Math.max(0, Math.min(255, (n & 0xff) + amount))
  return `rgb(${r},${g},${b})`
}

function drawBall(ctx: CanvasRenderingContext2D, r: number, color: string): void {
  const fill = ctx.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.15, 0, 0, r)
  fill.addColorStop(0, shade(color, 70))
  fill.addColorStop(0.55, color)
  fill.addColorStop(1, shade(color, -50))
  ctx.fillStyle = fill
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = COLORS.objectStroke
  ctx.lineWidth = 1.5
  ctx.stroke()
  // A seam that turns with the ball, so rolling and spinning are visible.
  ctx.strokeStyle = COLORS.objectMark
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.62, Math.PI * 0.15, Math.PI * 0.85)
  ctx.stroke()
}

function drawBowling(ctx: CanvasRenderingContext2D, r: number, color: string): void {
  const fill = ctx.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.1, 0, 0, r)
  fill.addColorStop(0, shade(color, 60))
  fill.addColorStop(0.6, color)
  fill.addColorStop(1, shade(color, -60))
  ctx.fillStyle = fill
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = COLORS.objectStroke
  ctx.lineWidth = 1.5
  ctx.stroke()
  ctx.fillStyle = "rgba(15,23,42,0.6)"
  for (const [hx, hy] of [
    [-r * 0.3, -r * 0.25],
    [r * 0.3, -r * 0.25],
    [0, -r * 0.6],
  ]) {
    ctx.beginPath()
    ctx.arc(hx, hy, r * 0.13, 0, Math.PI * 2)
    ctx.fill()
  }
}

function drawCrate(ctx: CanvasRenderingContext2D, w: number, h: number, color: string): void {
  ctx.fillStyle = color
  roundedRect(ctx, -w / 2, -h / 2, w, h, 3)
  ctx.fill()
  // Planks and a frame.
  ctx.strokeStyle = shade(color, -55)
  ctx.lineWidth = 1.5
  ctx.beginPath()
  for (let i = 1; i < 3; i++) {
    const y = -h / 2 + (h * i) / 3
    ctx.moveTo(-w / 2 + 4, y)
    ctx.lineTo(w / 2 - 4, y)
  }
  ctx.stroke()
  ctx.lineWidth = 4
  roundedRect(ctx, -w / 2 + 2, -h / 2 + 2, w - 4, h - 4, 2)
  ctx.stroke()
  ctx.strokeStyle = COLORS.objectStroke
  ctx.lineWidth = 1.5
  roundedRect(ctx, -w / 2, -h / 2, w, h, 3)
  ctx.stroke()
}

function drawFeather(ctx: CanvasRenderingContext2D, w: number, h: number, color: string): void {
  const half = w / 2
  // The vane: a slim leaf shape filling the physics rectangle.
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(-half, 0)
  ctx.quadraticCurveTo(-half * 0.2, -h * 0.9, half, -h * 0.15)
  ctx.quadraticCurveTo(half * 0.2, h * 0.9, -half, 0)
  ctx.closePath()
  ctx.fill()
  ctx.strokeStyle = "rgba(148,163,184,0.8)"
  ctx.lineWidth = 1
  ctx.stroke()
  // Quill and a few barbs.
  ctx.strokeStyle = "rgba(100,116,139,0.8)"
  ctx.lineWidth = 1.2
  ctx.beginPath()
  ctx.moveTo(-half, 0)
  ctx.lineTo(half * 0.9, -h * 0.1)
  for (let i = 1; i <= 4; i++) {
    const x = -half + (w * i) / 5.5
    ctx.moveTo(x, -h * 0.05)
    ctx.lineTo(x + 5, -h * 0.5)
  }
  ctx.stroke()
}

function drawHammer(ctx: CanvasRenderingContext2D, w: number, h: number, color: string): void {
  // Wooden handle across most of the width, steel head on the right.
  const headW = w * 0.38
  ctx.fillStyle = "#b07a3b"
  roundedRect(ctx, -w / 2, -h * 0.2, w - headW + 4, h * 0.4, 2)
  ctx.fill()
  ctx.strokeStyle = "rgba(15,23,42,0.45)"
  ctx.lineWidth = 1
  ctx.stroke()
  const head = ctx.createLinearGradient(0, -h / 2, 0, h / 2)
  head.addColorStop(0, shade(color, 50))
  head.addColorStop(1, shade(color, -40))
  ctx.fillStyle = head
  roundedRect(ctx, w / 2 - headW, -h / 2, headW, h, 3)
  ctx.fill()
  ctx.strokeStyle = COLORS.objectStroke
  ctx.lineWidth = 1.5
  ctx.stroke()
}

// ---------------------------------------------------------------------------
// HUD
// ---------------------------------------------------------------------------

/** A dashed ring around the held object and a short arrow toward the pointer, so the throw direction is visible. */
function drawGrab(ctx: CanvasRenderingContext2D, object: ObjectState, target: Vec2 | null): void {
  const r = objectExtent(object.kind) + 8
  ctx.save()
  ctx.strokeStyle = "rgba(255,255,255,0.85)"
  ctx.lineWidth = 2
  ctx.setLineDash([6, 5])
  ctx.beginPath()
  ctx.arc(object.position.x, object.position.y, r, 0, Math.PI * 2)
  ctx.stroke()
  ctx.setLineDash([])
  if (target) {
    const dx = target.x - object.position.x
    const dy = target.y - object.position.y
    const length = Math.hypot(dx, dy)
    if (length > r + 6) {
      const ux = dx / length
      const uy = dy / length
      const from = { x: object.position.x + ux * r, y: object.position.y + uy * r }
      const to = { x: object.position.x + ux * Math.min(length, 120), y: object.position.y + uy * Math.min(length, 120) }
      ctx.strokeStyle = "rgba(255,255,255,0.6)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.stroke()
      ctx.fillStyle = "rgba(255,255,255,0.7)"
      ctx.beginPath()
      ctx.moveTo(to.x, to.y)
      ctx.lineTo(to.x - ux * 9 - uy * 5, to.y - uy * 9 + ux * 5)
      ctx.lineTo(to.x - ux * 9 + uy * 5, to.y - uy * 9 - ux * 5)
      ctx.closePath()
      ctx.fill()
    }
  }
  ctx.restore()
}

/** A down arrow whose length follows g, with the number beside it. Top-right corner. */
function drawGravityIndicator(ctx: CanvasRenderingContext2D, room: WorldConfig, gravity: GravityState, hud: SceneHud): void {
  const g = effectiveGravity(gravity)
  const accent = g > 0 ? GRAVITY_PRESETS[gravity.preset].accent : "#c4b5fd"
  const label = g > 0 ? `${g.toFixed(1)} m/s²` : "0 g"
  const x = room.width - 18
  const y = 18
  ctx.save()
  ctx.font = `700 15px ${hud.fontFamily}`
  ctx.textAlign = "right"
  ctx.textBaseline = "top"
  const textWidth = ctx.measureText(label).width
  const arrowLength = g > 0 ? 14 + 30 * Math.min(1, g / GRAVITY_PRESETS.jupiter.g) : 0
  const boxWidth = textWidth + 36
  const boxHeight = Math.max(30, arrowLength + 12)
  roundedRect(ctx, x - boxWidth, y - 6, boxWidth, boxHeight, 10)
  ctx.fillStyle = "rgba(15,23,42,0.72)"
  ctx.fill()
  ctx.fillStyle = "rgba(255,255,255,0.92)"
  ctx.fillText(label, x - 24, y + 2)
  const ax = x - 12
  ctx.strokeStyle = accent
  ctx.fillStyle = accent
  ctx.lineWidth = 3
  ctx.lineCap = "round"
  if (g > 0) {
    ctx.beginPath()
    ctx.moveTo(ax, y)
    ctx.lineTo(ax, y + arrowLength - 5)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(ax - 6, y + arrowLength - 8)
    ctx.lineTo(ax, y + arrowLength)
    ctx.lineTo(ax + 6, y + arrowLength - 8)
    ctx.closePath()
    ctx.fill()
  } else {
    ctx.lineWidth = 2.5
    ctx.beginPath()
    ctx.arc(ax, y + 9, 6, 0, Math.PI * 2)
    ctx.stroke()
  }
  ctx.restore()
}

/** "GRAVITY ON" / "GRAVITY OFF" across the top for a moment after each flip. */
function drawGravityBanner(ctx: CanvasRenderingContext2D, room: WorldConfig, hud: SceneHud): void {
  const flash = hud.gravityFlash
  if (!flash) return
  const t = (hud.now - flash.at) / GRAVITY_FLASH_MS
  if (t < 0 || t >= 1) return
  const fadeIn = Math.min(1, t * 6)
  const fadeOut = t > 0.7 ? 1 - (t - 0.7) / 0.3 : 1
  const alpha = fadeIn * fadeOut
  const scale = hud.reducedMotion ? 1 : 1 + 0.08 * (1 - fadeIn)
  const text = flash.on ? hud.labels.gravityOn : hud.labels.gravityOff
  const color = flash.on ? "#2ecc71" : "#c4b5fd"
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.translate(room.width / 2, 84)
  ctx.scale(scale, scale)
  ctx.font = `800 30px ${hud.fontFamily}`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  const width = ctx.measureText(text).width + 48
  roundedRect(ctx, -width / 2, -26, width, 52, 26)
  ctx.fillStyle = "rgba(15,23,42,0.82)"
  ctx.fill()
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.fillStyle = color
  ctx.fillText(text, 0, 1)
  ctx.restore()
}
