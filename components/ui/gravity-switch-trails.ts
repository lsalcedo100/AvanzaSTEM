/**
 * Gravity Switch: Zero-G Lab — motion trails.
 *
 * A trail is the recent path of an object, sampled once per rendered frame.
 * It lives entirely on the rendering side: the store only ever reads object
 * snapshots, so turning trails on or off cannot change the simulation.
 */

import { TRAIL_LENGTH } from "./gravity-switch-config.ts"
import type { ObjectKind, ObjectState, Vec2 } from "./gravity-switch-types.ts"

export type Trail = {
  id: string
  kind: ObjectKind
  /** Oldest first. */
  points: Vec2[]
}

export class TrailStore {
  private trailsById = new Map<string, Trail>()
  private readonly maxPoints: number
  /** Points closer than this (room px) to the previous one are not recorded, so a resting object draws nothing. */
  private readonly minStep: number

  constructor(maxPoints = TRAIL_LENGTH, minStep = 1) {
    this.maxPoints = maxPoints
    this.minStep = minStep
  }

  /** Append each object's current position and forget objects that are gone. */
  record(objects: ObjectState[]): void {
    const seen = new Set<string>()
    for (const object of objects) {
      seen.add(object.id)
      let trail = this.trailsById.get(object.id)
      if (!trail) {
        trail = { id: object.id, kind: object.kind, points: [] }
        this.trailsById.set(object.id, trail)
      }
      const last = trail.points[trail.points.length - 1]
      const { x, y } = object.position
      if (last && Math.hypot(x - last.x, y - last.y) < this.minStep) continue
      trail.points.push({ x, y })
      if (trail.points.length > this.maxPoints) trail.points.splice(0, trail.points.length - this.maxPoints)
    }
    for (const id of this.trailsById.keys()) {
      if (!seen.has(id)) this.trailsById.delete(id)
    }
  }

  /** Trails with enough points to draw a line. */
  trails(): Trail[] {
    return [...this.trailsById.values()].filter((trail) => trail.points.length >= 2)
  }

  clear(): void {
    this.trailsById.clear()
  }

  get size(): number {
    return this.trailsById.size
  }
}
