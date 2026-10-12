/**
 * Gravity Switch: Zero-G Lab — objective detection.
 *
 * `MissionTracker` turns what the physics world reports each frame (object
 * states, collision contacts, the gravity setting, running time) into mission
 * events: a step completed, the mission won, or the attempt lost. It is pure:
 * no Matter, no React, no timers of its own, so every rule here is unit-tested
 * with hand-made samples and the whole thing is run headlessly against the
 * real engine in the physics-backed tests.
 *
 * Success is always a physical outcome (an object is somewhere, touched
 * something, stayed still) except for the `answer` objective, which is an
 * observation challenge by design.
 */

import { REST_HOLD_MS, REST_SPEED_MPS } from "./gravity-switch-config.ts"
import { objectExtent } from "./gravity-switch-interaction.ts"
import { LABEL } from "./gravity-switch-physics.ts"
import type {
  FailReason,
  GravityRequirement,
  GravityState,
  Objective,
  ObjectiveKind,
  ObjectState,
  Rect,
  RoomSide,
  TrackedScenario,
  Vec2,
  WorldConfig,
} from "./gravity-switch-types.ts"

/** Two body labels that touched during the last step, e.g. "object:ball" and "zone:basket". */
export type Contact = { a: string; b: string; started?: boolean }

/** One frame's worth of truth from the physics world. */
export type WorldSample = {
  objects: ObjectState[]
  contacts: Contact[]
  gravity: GravityState
  /** Mission running time, ms. */
  elapsedMs: number
  /** Switch flips so far this attempt. */
  flips: number
  room: WorldConfig
}

export type ObjectiveState = "pending" | "active" | "done"

export type ObjectiveStatus = {
  index: number
  kind: ObjectiveKind
  state: ObjectiveState
  /** 0..1 for timed objectives (hover, rest); 0 or 1 for the rest. */
  progress: number
}

export type TrackerEvent =
  | { type: "objective-complete"; index: number }
  | { type: "mission-complete" }
  | { type: "mission-failed"; reason: FailReason }

export type TrackerSnapshot = {
  statuses: ObjectiveStatus[]
  /** The step the player is on (ordered missions), or null. */
  currentIndex: number | null
  finished: boolean
}

// ---------------------------------------------------------------------------
// Geometry and label helpers
// ---------------------------------------------------------------------------

export function pointInRect(point: Vec2, rect: Rect): boolean {
  return point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height
}

/** True when the object's centre is inside the zone. */
export function objectInZone(object: ObjectState, zone: Rect): boolean {
  return pointInRect(object.position, zone)
}

export function speedOf(object: ObjectState): number {
  return Math.hypot(object.velocity.x, object.velocity.y)
}

/** The side of the room an object has fully left through, or null while it is inside. */
export function sideLeftThrough(object: ObjectState, room: WorldConfig): RoomSide | null {
  const extent = objectExtent(object.kind)
  const { x, y } = object.position
  if (x + extent < 0) return "left"
  if (x - extent > room.width) return "right"
  if (y + extent < 0) return "ceiling"
  if (y - extent > room.height) return "floor"
  return null
}

export function gravityMatches(requirement: GravityRequirement | undefined, gravity: GravityState): boolean {
  if (!requirement) return true
  if (requirement.switchOn !== undefined && gravity.switchOn !== requirement.switchOn) return false
  if (requirement.presets && !requirement.presets.includes(gravity.preset)) return false
  return true
}

/** The object ids touching a body with this exact label, from a contact list. */
function objectsTouching(contacts: Contact[], label: string): Set<string> {
  const ids = new Set<string>()
  for (const { a, b } of contacts) {
    const other = a === label ? b : b === label ? a : null
    if (other && other.startsWith(LABEL.object)) ids.add(other.slice(LABEL.object.length))
  }
  return ids
}

function touching(contacts: Contact[], objectId: string, label: string): boolean {
  return objectsTouching(contacts, label).has(objectId)
}

// ---------------------------------------------------------------------------
// The tracker
// ---------------------------------------------------------------------------

type Memory = {
  /** hover / rest: ms accumulated inside and (for rest) still. */
  heldMs: number
  /** land-together: when each object first touched the floor. */
  landedAt: Map<string, number>
}

export class MissionTracker {
  readonly mission: TrackedScenario
  /** An opaque tag the caller uses to tell attempts apart. */
  readonly attemptKey: string

  private states: ObjectiveState[]
  private memory: Memory[]
  private progressValues: number[]
  private done = false
  /** The switch position seen last frame, for spotting a flip. */
  private lastSwitchOn: boolean | null = null

  constructor(mission: TrackedScenario, attemptKey = "") {
    this.mission = mission
    this.attemptKey = attemptKey
    this.states = mission.objectives.map(() => "pending")
    this.memory = mission.objectives.map(() => ({ heldMs: 0, landedAt: new Map() }))
    this.progressValues = mission.objectives.map(() => 0)
    this.activate()
  }

  get finished(): boolean {
    return this.done
  }

  /** Ordered missions have one live step at a time; unordered ones keep every unfinished step live. */
  get currentIndex(): number | null {
    if (!this.mission.ordered) return null
    const index = this.states.findIndex((state) => state !== "done")
    return index === -1 ? null : index
  }

  snapshot(): TrackerSnapshot {
    return {
      statuses: this.mission.objectives.map((objective, index) => ({
        index,
        kind: objective.kind,
        state: this.states[index],
        progress: this.states[index] === "done" ? 1 : this.progressValues[index],
      })),
      currentIndex: this.currentIndex,
      finished: this.done,
    }
  }

  /** The live `answer` objective, if the player should be shown a question right now. */
  currentQuestion(): (Extract<Objective, { kind: "answer" }> & { index: number }) | null {
    if (this.done) return null
    for (const [index, objective] of this.mission.objectives.entries()) {
      if (objective.kind === "answer" && this.states[index] === "active") return { ...objective, index }
    }
    return null
  }

  private activate(): void {
    if (this.mission.ordered) {
      const index = this.currentIndex
      if (index !== null) this.states[index] = "active"
    } else {
      this.states = this.states.map((state) => (state === "done" ? "done" : "active"))
    }
  }

  private complete(index: number, events: TrackerEvent[]): void {
    this.states[index] = "done"
    this.progressValues[index] = 1
    events.push({ type: "objective-complete", index })
    if (this.states.every((state) => state === "done")) {
      this.done = true
      events.push({ type: "mission-complete" })
    } else {
      this.activate()
    }
  }

  private fail(reason: FailReason, events: TrackerEvent[]): void {
    this.done = true
    events.push({ type: "mission-failed", reason })
  }

  /** Feed one frame. Returns the events it produced, in order. Does nothing once finished. */
  update(sample: WorldSample, dtMs: number): TrackerEvent[] {
    const events: TrackerEvent[] = []
    if (this.done) return events

    // Objectives first, so an object leaving through its exit counts as a win, not an escape.
    const exitedThrough = new Map<string, RoomSide>()
    for (const object of sample.objects) {
      const side = sideLeftThrough(object, sample.room)
      if (side) exitedThrough.set(object.id, side)
    }

    const flipped = this.lastSwitchOn !== null && this.lastSwitchOn !== sample.gravity.switchOn
    this.lastSwitchOn = sample.gravity.switchOn

    for (const [index, objective] of this.mission.objectives.entries()) {
      if (this.done) break
      if (this.states[index] !== "active") continue
      if (this.evaluate(objective, index, sample, dtMs, exitedThrough, flipped, events)) {
        this.complete(index, events)
      }
    }
    if (this.done) return events

    // Then the ways to lose.
    const byId = new Map(sample.objects.map((object) => [object.id, object]))
    for (const condition of this.mission.failConditions) {
      if (this.done) break
      switch (condition.kind) {
        case "time-limit":
          if (sample.elapsedMs > condition.ms) this.fail("time-limit", events)
          break
        case "switch-limit":
          if (sample.flips > condition.maxFlips) this.fail("switch-limit", events)
          break
        case "touch-hazard": {
          const touched = objectsTouching(sample.contacts, `${LABEL.zone}${condition.zoneId}`)
          if (condition.objectId ? touched.has(condition.objectId) : touched.size > 0) this.fail("touch-hazard", events)
          break
        }
        case "out-of-bounds": {
          const candidates = condition.objectId ? [condition.objectId] : [...byId.keys()]
          for (const id of candidates) {
            const side = exitedThrough.get(id)
            if (side && !this.isExitFor(id, side, sample.gravity)) {
              this.fail("out-of-bounds", events)
              break
            }
          }
          break
        }
      }
    }
    return events
  }

  /**
   * Whether leaving through this side is the intended exit right now: there is
   * an exit objective for it that is live (or already met) and whose gravity
   * requirement holds. Leaving early, or with the wrong gravity, is an escape.
   */
  private isExitFor(objectId: string, side: RoomSide, gravity: GravityState): boolean {
    return this.mission.objectives.some(
      (objective, index) =>
        objective.kind === "exit" &&
        objective.objectId === objectId &&
        objective.side === side &&
        this.states[index] !== "pending" &&
        gravityMatches(objective.gravity, gravity),
    )
  }

  /** Returns true when the objective is met this frame. May also push a fail event. */
  private evaluate(
    objective: Objective,
    index: number,
    sample: WorldSample,
    dtMs: number,
    exitedThrough: Map<string, RoomSide>,
    flipped: boolean,
    events: TrackerEvent[],
  ): boolean {
    const byId = new Map(sample.objects.map((object) => [object.id, object]))
    const zoneById = new Map(sample.room.zones.map((zone) => [zone.id, zone]))
    const memory = this.memory[index]

    switch (objective.kind) {
      case "enter-zone": {
        const object = byId.get(objective.objectId)
        const zone = zoneById.get(objective.zoneId)
        if (!object || !zone) return false
        const inside = objectInZone(object, zone) || touching(sample.contacts, object.id, `${LABEL.zone}${zone.id}`)
        return inside && gravityMatches(objective.gravity, sample.gravity)
      }

      case "rest-in-zone": {
        const object = byId.get(objective.objectId)
        const zone = zoneById.get(objective.zoneId)
        if (!object || !zone) return false
        const settling =
          objectInZone(object, zone) &&
          speedOf(object) < REST_SPEED_MPS &&
          gravityMatches(objective.gravity, sample.gravity)
        memory.heldMs = settling ? memory.heldMs + dtMs : 0
        this.progressValues[index] = Math.min(1, memory.heldMs / REST_HOLD_MS)
        return memory.heldMs >= REST_HOLD_MS
      }

      case "hover-in-zone": {
        const object = byId.get(objective.objectId)
        const zone = zoneById.get(objective.zoneId)
        if (!object || !zone) return false
        const holding = objectInZone(object, zone) && gravityMatches(objective.gravity, sample.gravity)
        memory.heldMs = holding ? memory.heldMs + dtMs : 0
        this.progressValues[index] = Math.min(1, memory.heldMs / objective.durationMs)
        return memory.heldMs >= objective.durationMs
      }

      case "bounce-off":
        return touching(sample.contacts, objective.objectId, `${LABEL.obstacle}${objective.obstacleId}`)

      case "land-together": {
        const onFloor = objectsTouching(sample.contacts, `${LABEL.wall}floor`)
        for (const id of objective.objectIds) {
          if (onFloor.has(id) && !memory.landedAt.has(id)) memory.landedAt.set(id, sample.elapsedMs)
        }
        const [a, b] = objective.objectIds
        const ta = memory.landedAt.get(a)
        const tb = memory.landedAt.get(b)
        if (ta !== undefined && tb !== undefined) {
          if (Math.abs(ta - tb) <= objective.toleranceMs) return true
          this.fail("landed-apart", events)
          return false
        }
        const first = ta ?? tb
        if (first !== undefined && sample.elapsedMs - first > objective.toleranceMs) {
          this.fail("landed-apart", events)
        }
        return false
      }

      case "exit": {
        const side = exitedThrough.get(objective.objectId)
        return side === objective.side && gravityMatches(objective.gravity, sample.gravity)
      }

      case "answer":
        // Only `answer()` can complete this one.
        return false

      case "moving": {
        const object = byId.get(objective.objectId)
        if (!object) return false
        return speedOf(object) >= objective.minSpeed && gravityMatches(objective.gravity, sample.gravity)
      }

      case "gravity-flip": {
        if (!flipped || sample.gravity.switchOn !== objective.switchOn) return false
        if (!objective.objectId) return true
        const object = byId.get(objective.objectId)
        return object !== undefined && speedOf(object) >= (objective.minSpeed ?? 0)
      }
    }
  }

  /** The player picked a choice for the live question. Wrong answers end the attempt. */
  answer(choiceId: string): TrackerEvent[] {
    const events: TrackerEvent[] = []
    if (this.done) return events
    const question = this.currentQuestion()
    if (!question) return events
    if (!question.choices.some((choice) => choice.id === choiceId)) return events
    if (choiceId === question.correctId) this.complete(question.index, events)
    else this.fail("wrong-answer", events)
    return events
  }
}
