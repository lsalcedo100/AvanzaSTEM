/**
 * Gravity Switch: Zero-G Lab — pointer interaction maths.
 *
 * Everything the canvas needs to turn taps and drags into physics, kept pure
 * so it can be unit-tested: which object is under a point, how fast the
 * pointer was moving when it let go, where a palette drop should land, and
 * what velocity drives a held object toward the finger.
 */

import {
  DRAG_GAIN_PER_SECOND,
  HIT_SLACK_PX,
  MAX_DRAG_SPEED_MPS,
  MAX_THROW_SPEED_MPS,
  OBJECT_SPECS,
  PIXELS_PER_METER,
  SPAWN_BAND,
  THROW_STILL_MS,
  THROW_WINDOW_MS,
} from "./gravity-switch-config.ts"
import type { ObjectKind, ObjectState, Vec2, WorldConfig } from "./gravity-switch-types.ts"

/** Half the largest dimension of an object, in px: a safe "radius" for spacing. */
export function objectExtent(kind: ObjectKind): number {
  const { shape } = OBJECT_SPECS[kind]
  return shape.type === "circle" ? shape.radius : Math.hypot(shape.width, shape.height) / 2
}

/** True when `point` lies on the object, allowing `slack` px around its edge. */
export function pointOnObject(object: ObjectState, point: Vec2, slack = HIT_SLACK_PX): boolean {
  const { shape } = OBJECT_SPECS[object.kind]
  const dx = point.x - object.position.x
  const dy = point.y - object.position.y
  if (shape.type === "circle") {
    return Math.hypot(dx, dy) <= shape.radius + slack
  }
  // Rotate the point into the rectangle's own frame.
  const cos = Math.cos(-object.angle)
  const sin = Math.sin(-object.angle)
  const localX = dx * cos - dy * sin
  const localY = dx * sin + dy * cos
  return Math.abs(localX) <= shape.width / 2 + slack && Math.abs(localY) <= shape.height / 2 + slack
}

/** The object under a point, preferring the one drawn last (on top). */
export function hitTest(objects: ObjectState[], point: Vec2, slack = HIT_SLACK_PX): ObjectState | null {
  for (let i = objects.length - 1; i >= 0; i--) {
    if (pointOnObject(objects[i], point, slack)) return objects[i]
  }
  return null
}

/** Keep a point far enough inside the room that an object of `kind` fits. */
export function clampSpawnPoint(point: Vec2, kind: ObjectKind, room: WorldConfig, margin = 4): Vec2 {
  const extent = objectExtent(kind) + margin
  return {
    x: Math.min(room.width - extent, Math.max(extent, point.x)),
    y: Math.min(room.height - extent, Math.max(extent, point.y)),
  }
}

/** True when an object of `kind` centred at `point` would overlap any existing object. */
export function spotIsFree(point: Vec2, kind: ObjectKind, objects: ObjectState[], gap = 6): boolean {
  const extent = objectExtent(kind)
  return objects.every((object) => {
    const needed = extent + objectExtent(object.kind) + gap
    return Math.hypot(object.position.x - point.x, object.position.y - point.y) >= needed
  })
}

/**
 * A spot near the top of the room where a palette drop will not land on
 * anything. Tries a handful of random spots and falls back to the centre of
 * the band, where Matter will simply nudge things apart.
 */
export function findSpawnSpot(
  kind: ObjectKind,
  objects: ObjectState[],
  room: WorldConfig,
  random: () => number = Math.random,
  attempts = 12,
): Vec2 {
  const { top, bottom, sideMargin } = SPAWN_BAND
  for (let i = 0; i < attempts; i++) {
    const candidate = clampSpawnPoint(
      {
        x: sideMargin + random() * (room.width - 2 * sideMargin),
        y: top + random() * (bottom - top),
      },
      kind,
      room,
    )
    if (spotIsFree(candidate, kind, objects)) return candidate
  }
  return clampSpawnPoint({ x: room.width / 2, y: (top + bottom) / 2 }, kind, room)
}

/**
 * The velocity, in m/s, that moves a held object from `position` toward
 * `target` briskly but without overshooting into a wall.
 */
export function dragVelocity(position: Vec2, target: Vec2): Vec2 {
  const vx = ((target.x - position.x) * DRAG_GAIN_PER_SECOND) / PIXELS_PER_METER
  const vy = ((target.y - position.y) * DRAG_GAIN_PER_SECOND) / PIXELS_PER_METER
  return clampSpeed({ x: vx, y: vy }, MAX_DRAG_SPEED_MPS)
}

export function clampSpeed(velocity: Vec2, max: number): Vec2 {
  const speed = Math.hypot(velocity.x, velocity.y)
  if (speed <= max || speed === 0) return velocity
  const k = max / speed
  return { x: velocity.x * k, y: velocity.y * k }
}

type Sample = { t: number; x: number; y: number }

/**
 * Remembers where the pointer has been over the last fraction of a second so
 * a release can turn into a throw. Positions are room px, times are ms.
 */
export class PointerTracker {
  private samples: Sample[] = []
  private readonly windowMs: number
  private readonly stillMs: number

  constructor(windowMs = THROW_WINDOW_MS, stillMs = THROW_STILL_MS) {
    this.windowMs = windowMs
    this.stillMs = stillMs
  }

  reset(): void {
    this.samples = []
  }

  push(t: number, point: Vec2): void {
    this.samples.push({ t, x: point.x, y: point.y })
    const cutoff = t - this.windowMs * 3
    while (this.samples.length > 2 && this.samples[0].t < cutoff) this.samples.shift()
  }

  /**
   * Pointer velocity in m/s at time `now`, from the samples inside the
   * window. Zero when the pointer has been resting, so a careful placement
   * does not turn into a flick.
   */
  velocity(now: number, max = MAX_THROW_SPEED_MPS): Vec2 {
    const last = this.samples[this.samples.length - 1]
    if (!last || now - last.t > this.stillMs) return { x: 0, y: 0 }
    const first = this.samples.find((sample) => sample.t >= last.t - this.windowMs) ?? this.samples[0]
    const dt = last.t - first.t
    if (dt <= 0) return { x: 0, y: 0 }
    const pxPerMs = { x: (last.x - first.x) / dt, y: (last.y - first.y) / dt }
    return clampSpeed({ x: (pxPerMs.x * 1000) / PIXELS_PER_METER, y: (pxPerMs.y * 1000) / PIXELS_PER_METER }, max)
  }
}
