/**
 * Gravity Switch: Zero-G Lab — shared types.
 *
 * Everything the game's modules agree on lives here: gravity presets and the
 * switch, the object catalogue, the static pieces of a room (obstacles and
 * zones), mission definitions with their objectives and fail conditions, and
 * the modes and phases of the pure game-state machine.
 *
 * This file has no runtime code, so physics, React and Node tests can all
 * import it without dragging a dependency along. Distances are in pixels of
 * the fixed-size room (see `gravity-switch-config.ts` for the metre scale),
 * speeds are in metres per second, angles in radians.
 */

import type { Language } from "../../i18n/translations.ts"

/** One string per supported site language. */
export type LocalizedText = Record<Language, string>

export type Vec2 = { x: number; y: number }

// ---------------------------------------------------------------------------
// Gravity
// ---------------------------------------------------------------------------

export type GravityPresetId = "earth" | "moon" | "mars" | "jupiter" | "zero"

export type GravityPreset = {
  id: GravityPresetId
  /** Surface gravity in m/s². */
  g: number
  /** Accent colour used wherever the preset is shown. */
  accent: string
}

/**
 * The player-facing gravity controls. The big switch and the planet picker are
 * independent: a preset is remembered while the switch is off, and flipping
 * the switch back on restores it.
 */
export type GravityState = {
  preset: GravityPresetId
  switchOn: boolean
}

// ---------------------------------------------------------------------------
// Objects
// ---------------------------------------------------------------------------

export type ObjectKind = "ball" | "bowling" | "crate" | "feather" | "hammer"

export type ObjectShape =
  | { type: "circle"; radius: number }
  | { type: "rectangle"; width: number; height: number }

/** The physical recipe for one kind of object. */
export type ObjectSpec = {
  kind: ObjectKind
  shape: ObjectShape
  /** Mass in kilograms. Collisions between objects respect the ratio. */
  mass: number
  /** 0 lands with a thud, 1 bounces back to the same height. */
  restitution: number
  /** Sliding friction against other bodies. */
  friction: number
  /** Per-step velocity damping, applied only in rooms with air. */
  frictionAir: number
  color: string
}

/** Where an object starts in a room. */
export type ObjectPlacement = {
  id: string
  kind: ObjectKind
  /** Centre position in px. */
  x: number
  y: number
  angle?: number
  /** Starting velocity in m/s, applied the moment the world is built. */
  velocity?: Vec2
  /** Radians per second. */
  angularVelocity?: number
}

/** A live object as read back from the physics world. */
export type ObjectState = {
  id: string
  kind: ObjectKind
  /** Centre position in px. */
  position: Vec2
  /** m/s */
  velocity: Vec2
  angle: number
  /** rad/s */
  angularVelocity: number
  /** kg */
  mass: number
  /** True for objects added after the room was built (sandbox spawns). */
  spawned: boolean
}

// ---------------------------------------------------------------------------
// Rooms: obstacles, zones, walls
// ---------------------------------------------------------------------------

/** Axis-aligned box given by its top-left corner, in px. */
export type Rect = { x: number; y: number; width: number; height: number }

export type ObstacleKind =
  /** Solid and dull: objects stop against it. */
  | "wall"
  /** A ledge objects can rest on. Physically the same as a wall. */
  | "platform"
  /** Solid and springy: objects bounce off it. */
  | "bumper"

export type Obstacle = Rect & {
  id: string
  kind: ObstacleKind
  angle?: number
}

export type ZoneKind =
  /** Where an object should end up. */
  | "goal"
  /** A target to touch or pass through. */
  | "target"
  /** Touching it fails the mission. */
  | "hazard"

/** A sensor region: objects pass through it, the game watches for them. */
export type Zone = Rect & {
  id: string
  kind: ZoneKind
}

export type RoomWalls = {
  floor: boolean
  ceiling: boolean
  left: boolean
  right: boolean
}

/**
 * Rooms are airless by default: no artificial drag, so a moving object keeps
 * moving (Newton's first law) and heavy and light objects fall together. A
 * level opts into "air" to get per-object drag, which is what makes a feather
 * flutter on Earth.
 */
export type AirMode = "vacuum" | "air"

/**
 * A spring pad. It is a solid platform the object rests on, and the moment
 * the simulation first advances it fires the object at `speed` straight up
 * (or along `angle`, radians from straight up, clockwise). Firing on the
 * first step rather than at build time means a mission's briefing shows the
 * spring compressed and Start releases it, and every reset fires identically.
 */
export type Launcher = Rect & {
  id: string
  /** The object sitting on the pad. */
  objectId: string
  /** m/s */
  speed: number
  angle?: number
}

/** Everything needed to build a physics world from scratch. */
export type WorldConfig = {
  width: number
  height: number
  walls: RoomWalls
  air: AirMode
  obstacles: Obstacle[]
  zones: Zone[]
  objects: ObjectPlacement[]
  launchers?: Launcher[]
}

// ---------------------------------------------------------------------------
// Missions
// ---------------------------------------------------------------------------

export type MissionId =
  | "drop-in"
  | "hang-time"
  | "straight-up"
  | "hammer-and-feather"
  | "bank-shot"
  | "moon-shot"
  /** Development-only scenario that exercises every objective kind. Never in the progression. */
  | "dev-check"

export type RoomSide = "floor" | "ceiling" | "left" | "right"

/** A condition on the gravity controls that must hold for an objective to count. */
export type GravityRequirement = {
  switchOn?: boolean
  presets?: GravityPresetId[]
}

/** Shared by every objective: an optional step label for the checklist. */
type ObjectiveBase = {
  /** Shown in the mission's step list. Falls back to a generic label per kind. */
  label?: LocalizedText
}

export type AnswerChoice = { id: string; label: LocalizedText }

export type Objective =
  /** The object is inside the zone and (nearly) still. */
  | (ObjectiveBase & { kind: "rest-in-zone"; objectId: string; zoneId: string; gravity?: GravityRequirement })
  /** The object touches or passes through the zone. */
  | (ObjectiveBase & { kind: "enter-zone"; objectId: string; zoneId: string; gravity?: GravityRequirement })
  /** The object stays inside the zone for the whole duration. */
  | (ObjectiveBase & {
      kind: "hover-in-zone"
      objectId: string
      zoneId: string
      durationMs: number
      gravity?: GravityRequirement
    })
  /** The object collides with the obstacle at least once. */
  | (ObjectiveBase & { kind: "bounce-off"; objectId: string; obstacleId: string })
  /** Both objects touch the floor within the tolerance of each other. */
  | (ObjectiveBase & { kind: "land-together"; objectIds: [string, string]; toleranceMs: number })
  /** The object leaves the room through an open side. */
  | (ObjectiveBase & { kind: "exit"; objectId: string; side: RoomSide; gravity?: GravityRequirement })
  /** An observation: the player answers a question about what they saw. */
  | (ObjectiveBase & { kind: "answer"; prompt: LocalizedText; choices: AnswerChoice[]; correctId: string })
  /** The object is moving at least this fast (m/s), with gravity as required. A throw, in practice. */
  | (ObjectiveBase & { kind: "moving"; objectId: string; minSpeed: number; gravity?: GravityRequirement })
  /**
   * The switch is flipped to `switchOn` at a moment when the object (if any)
   * is moving at least `minSpeed` m/s. Only the frame of the flip counts.
   */
  | (ObjectiveBase & { kind: "gravity-flip"; switchOn: boolean; objectId?: string; minSpeed?: number })

export type ObjectiveKind = Objective["kind"]

/**
 * What the tracker needs from a mission or an experiment: the room, the steps
 * and the ways to lose. Both `MissionDefinition` and `ExperimentDefinition`
 * satisfy it.
 */
export type TrackedScenario = {
  id: string
  world: WorldConfig
  objectives: Objective[]
  ordered: boolean
  failConditions: FailCondition[]
}

export type FailCondition =
  /** An object (or any object) leaves the room through an open side. */
  | { kind: "out-of-bounds"; objectId?: string }
  /** An object (or any object) touches a hazard zone. */
  | { kind: "touch-hazard"; zoneId: string; objectId?: string }
  /** The attempt runs longer than this. */
  | { kind: "time-limit"; ms: number }
  /** The switch is flipped more often than this. */
  | { kind: "switch-limit"; maxFlips: number }

/** Why an attempt ended: a configured fail condition, or an objective that can no longer be met. */
export type FailReason = FailCondition["kind"] | "landed-apart" | "wrong-answer"

export type MissionText = {
  name: LocalizedText
  /** One sentence telling the player what to do. */
  objective: LocalizedText
  /** The one thing this mission is about, phrased without giving the answer away. */
  learning: LocalizedText
  /** A nudge shown before and during the attempt. */
  hint: LocalizedText
  /** The idea the mission teaches, shown once it is done. */
  concept: LocalizedText
  /** What just happened, in one sentence, shown on success. */
  success: LocalizedText
  /** Why the attempt did not work and what to try, shown on failure in place of the generic reason. */
  failure?: LocalizedText
}

export type MissionDefinition = {
  id: MissionId
  text: MissionText
  world: WorldConfig
  /** Switch and planet when the mission starts, restored on every reset. */
  gravity: GravityState
  /** Presets the planet picker offers. One entry hides the picker. */
  allowedPresets: GravityPresetId[]
  /** When true the switch is shown but cannot be flipped. */
  switchLocked: boolean
  /** Whether the player may fling objects by dragging them. */
  allowPush: boolean
  /** Draw motion trails from the start, for missions about paths. */
  trailsByDefault?: boolean
  /**
   * A question asked in the briefing, before anything moves. Any choice is
   * accepted: it is a prediction to compare with what happens, not a test.
   * Start stays disabled until the player has committed to one.
   */
  prediction?: { prompt: LocalizedText; choices: AnswerChoice[]; correctId?: string }
  objectives: Objective[]
  /** When true the objectives must be met in order. */
  ordered: boolean
  failConditions: FailCondition[]
  /** A sandbox experiment worth trying after this mission, offered on the success card. */
  tryNext?: ExperimentId
}

// ---------------------------------------------------------------------------
// Saved progress and achievements
// ---------------------------------------------------------------------------

export type AchievementId = "first-mission" | "all-missions" | "scientist" | "good-guess" | "planet-hopper"

/** Everything remembered about a player beyond the list of completed missions. */
export type ProgressStats = {
  /** How many times each mission has been completed; replays count. */
  completions: Partial<Record<MissionId, number>>
  /** The mission most recently opened. */
  lastMissionId: MissionId | null
  experimentsDone: ExperimentId[]
  predictionsRight: number
  predictionsTotal: number
  planetsTried: GravityPresetId[]
}

// ---------------------------------------------------------------------------
// Sandbox experiments: predict, test, explain
// ---------------------------------------------------------------------------

export type ExperimentId = "falling-ball-off" | "heavy-light" | "zero-g-push"

export type ExperimentText = {
  name: LocalizedText
  /** What to do once the room is running. */
  instruction: LocalizedText
  /** What happened and why, shown once the objective fires. */
  result: LocalizedText
}

/**
 * A small guided experiment in the Zero-G Room: a room, a question to guess
 * at (skippable), one thing to do, and an explanation of what happened. The
 * room keeps running afterwards for free play.
 */
export type ExperimentDefinition = {
  id: ExperimentId
  text: ExperimentText
  world: WorldConfig
  gravity: GravityState
  prediction: { prompt: LocalizedText; choices: AnswerChoice[]; correctId: string }
  objectives: Objective[]
  ordered: boolean
  failConditions: FailCondition[]
}

export type SandboxExperimentState = {
  id: ExperimentId
  /** The guess, or null if none was made (skipped or not yet). */
  prediction: string | null
  /** True once the player chose to skip guessing. */
  skipped: boolean
  /** True once the experiment's objective fired. */
  observed: boolean
  /** Bumped on every restart so the room is rebuilt. */
  attempt: number
}

// ---------------------------------------------------------------------------
// Game state machine
// ---------------------------------------------------------------------------

export type GameMode = "sandbox" | "missions"

/**
 * Where an attempt at a mission is. The mission list itself is not a phase:
 * `MissionsState.activeId === null` means the list is showing.
 */
export type GamePhase = "briefing" | "running" | "paused" | "success" | "failed"

export type MissionResult = { kind: "success" } | { kind: "failed"; reason: FailReason }

export type SandboxState = {
  gravity: GravityState
  paused: boolean
  /** Bumped on every reset so the room is rebuilt from scratch. */
  resetCount: number
  /** The palette item a tap on the room drops in. */
  spawnKind: ObjectKind
  /** The guided experiment in progress, or null for free play. */
  experiment: SandboxExperimentState | null
}

export type MissionsState = {
  activeId: MissionId | null
  phase: GamePhase
  gravity: GravityState
  /** Switch flips during the current attempt. */
  flips: number
  /** The briefing prediction the player committed to, if the mission asks for one. */
  prediction: string | null
  /** Bumped whenever an attempt starts fresh so the world is rebuilt. */
  attempt: number
  result: MissionResult | null
  completed: MissionId[]
}

export type GameState = {
  mode: GameMode
  sandbox: SandboxState
  missions: MissionsState
  progress: ProgressStats
  /** Achievements earned by the latest action and not yet shown; cleared by the next move. */
  freshAchievements: AchievementId[]
}
