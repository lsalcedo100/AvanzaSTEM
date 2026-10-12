/**
 * Gravity Switch: Zero-G Lab — the "What's happening?" engine.
 *
 * Watches the free-play room and picks one short explanation at a time:
 * a flip of the switch while something is moving, a planet change, a throw,
 * a heavy and a light object falling side by side, a bump, a bounce, or an
 * object drifting along in zero-g. It is pure: the component feeds it frames
 * and the things the player did, and reads back a single `InsightKind` to
 * look up in the dictionary.
 *
 * Only one insight shows at a time and each stays up for a moment, so the
 * panel reads like a calm narrator rather than a ticker.
 */

import { OBJECT_SPECS } from "./gravity-switch-config.ts"
import { LABEL } from "./gravity-switch-physics.ts"
import type { Contact } from "./gravity-switch-objectives.ts"
import type { GravityPresetId, GravityState, ObjectState } from "./gravity-switch-types.ts"

export type InsightKind =
  | "idle"
  | "gravity-off-moving"
  | "gravity-off-still"
  | "gravity-on"
  | "preset-earth"
  | "preset-moon"
  | "preset-mars"
  | "preset-jupiter"
  | "preset-zero"
  | "throw-zero-g"
  | "throw-gravity"
  | "spawn-zero-g"
  | "heavy-light"
  | "collision"
  | "bounce"
  | "drifting"

/** Something the player just did, reported by the UI rather than seen in a frame. */
export type PlayerEvent =
  | { type: "switch"; on: boolean }
  | { type: "preset"; preset: GravityPresetId }
  | { type: "throw"; objectId: string; speed: number }
  | { type: "spawn"; objectId: string }

export type InsightFrame = {
  objects: ObjectState[]
  contacts: Contact[]
  gravity: GravityState
  /** Simulated time, ms. */
  elapsedMs: number
}

export type Insight = { kind: InsightKind; at: number; token: number }

/** How long a frame-detected insight keeps the panel before another may replace it, ms. */
export const INSIGHT_HOLD_MS = 3500
/** The same frame-detected insight is not repeated within this long, ms. */
export const INSIGHT_REPEAT_MS = 9000
/** An object moving this long in zero-g, m/s and ms, earns the "still going" note. */
export const DRIFT_SPEED_MPS = 0.6
export const DRIFT_AFTER_MS = 3000
/** Heavy and light: at least this mass ratio, both falling faster than this. */
export const HEAVY_LIGHT_RATIO = 5
export const HEAVY_LIGHT_FALL_MPS = 1.5

const PRESET_INSIGHT: Record<GravityPresetId, InsightKind> = {
  earth: "preset-earth",
  moon: "preset-moon",
  mars: "preset-mars",
  jupiter: "preset-jupiter",
  zero: "preset-zero",
}

function speedOf(object: ObjectState): number {
  return Math.hypot(object.velocity.x, object.velocity.y)
}

export class InsightEngine {
  private current: Insight = { kind: "idle", at: 0, token: 0 }
  private lastShown = new Map<InsightKind, number>()
  private driftingSince = new Map<string, number>()
  private previousVy = new Map<string, number>()
  private token = 0

  /** The insight to show right now. A new `token` means the panel should refresh. */
  get insight(): Insight {
    return this.current
  }

  private show(kind: InsightKind, now: number): void {
    this.token += 1
    this.current = { kind, at: now, token: this.token }
    this.lastShown.set(kind, now)
  }

  /** Frame-detected insights wait their turn and do not repeat too soon. */
  private offer(kind: InsightKind, now: number): void {
    if (this.current.kind === kind) return
    if (now - this.current.at < INSIGHT_HOLD_MS && this.current.kind !== "idle") return
    const last = this.lastShown.get(kind)
    if (last !== undefined && now - last < INSIGHT_REPEAT_MS) return
    this.show(kind, now)
  }

  /** What the player did takes the panel at once. `objects` is the room at that moment. */
  note(event: PlayerEvent, objects: ObjectState[], now: number): void {
    switch (event.type) {
      case "switch": {
        if (event.on) return this.show("gravity-on", now)
        const anythingMoving = objects.some((object) => speedOf(object) > 0.5)
        return this.show(anythingMoving ? "gravity-off-moving" : "gravity-off-still", now)
      }
      case "preset":
        return this.show(PRESET_INSIGHT[event.preset], now)
      case "throw": {
        if (event.speed < 0.8) return
        const gravityOn = this.lastGravityOn
        return this.show(gravityOn ? "throw-gravity" : "throw-zero-g", now)
      }
      case "spawn":
        if (!this.lastGravityOn) this.offer("spawn-zero-g", now)
        return
    }
  }

  private lastGravityOn = false

  /** One physics frame. Returns true when the insight changed. */
  update(frame: InsightFrame): boolean {
    const before = this.current.token
    const now = frame.elapsedMs
    const gravityOn = frame.gravity.switchOn && frame.gravity.preset !== "zero"
    this.lastGravityOn = gravityOn
    const byId = new Map(frame.objects.map((object) => [object.id, object]))

    // A heavy and a light object falling side by side, gravity on.
    if (gravityOn) {
      const falling = frame.objects.filter((object) => object.velocity.y > HEAVY_LIGHT_FALL_MPS)
      for (let i = 0; i < falling.length && this.current.kind !== "heavy-light"; i++) {
        for (let j = i + 1; j < falling.length; j++) {
          const a = OBJECT_SPECS[falling[i].kind].mass
          const b = OBJECT_SPECS[falling[j].kind].mass
          if (Math.max(a, b) / Math.min(a, b) >= HEAVY_LIGHT_RATIO) {
            this.offer("heavy-light", now)
            break
          }
        }
      }
    }

    // Bumps between objects, and bounces off the floor.
    for (const contact of frame.contacts) {
      if (!contact.started) continue
      const aObject = contact.a.startsWith(LABEL.object)
      const bObject = contact.b.startsWith(LABEL.object)
      if (aObject && bObject) {
        const a = byId.get(contact.a.slice(LABEL.object.length))
        const b = byId.get(contact.b.slice(LABEL.object.length))
        if (a && b && Math.hypot(a.velocity.x - b.velocity.x, a.velocity.y - b.velocity.y) > 0.4) {
          this.offer("collision", now)
        }
      } else if ((aObject || bObject) && (contact.a === `${LABEL.wall}floor` || contact.b === `${LABEL.wall}floor`)) {
        const id = (aObject ? contact.a : contact.b).slice(LABEL.object.length)
        const vyBefore = this.previousVy.get(id) ?? 0
        if (gravityOn && vyBefore > 2) this.offer("bounce", now)
      }
    }

    // Still going: an object that has been moving through zero-g for a while.
    for (const object of frame.objects) {
      this.previousVy.set(object.id, object.velocity.y)
      if (!gravityOn && speedOf(object) > DRIFT_SPEED_MPS) {
        const since = this.driftingSince.get(object.id)
        if (since === undefined) this.driftingSince.set(object.id, now)
        else if (now - since > DRIFT_AFTER_MS) this.offer("drifting", now)
      } else {
        this.driftingSince.delete(object.id)
      }
    }
    for (const id of [...this.driftingSince.keys()]) if (!byId.has(id)) this.driftingSince.delete(id)

    return this.current.token !== before
  }

  reset(): void {
    this.current = { kind: "idle", at: 0, token: this.token + 1 }
    this.token += 1
    this.lastShown.clear()
    this.driftingSince.clear()
    this.previousVy.clear()
  }
}
