/**
 * Gravity Switch: Zero-G Lab — tuning constants and catalogues.
 *
 * The room is a fixed-size box measured in pixels; `PIXELS_PER_METER` is what
 * turns the real surface gravities below into on-screen accelerations, so the
 * game can quote true m/s² figures and still feel right. Changing a number here
 * never requires touching physics, rendering or mission code.
 */

import type {
  GravityPreset,
  GravityPresetId,
  GravityState,
  ObjectKind,
  ObjectSpec,
  WorldConfig,
} from "./gravity-switch-types.ts"

// ---------------------------------------------------------------------------
// Room and simulation
// ---------------------------------------------------------------------------

/** Room size in px. The canvas scales this to fit, keeping the aspect ratio. */
export const ROOM_WIDTH = 960
export const ROOM_HEIGHT = 540

/** 60 px per metre makes the room 16 m wide and 9 m tall. */
export const PIXELS_PER_METER = 60

/** Fixed physics sub-step, two per 60 Hz frame. */
export const PHYSICS_STEP_MS = 1000 / 120

/** Longest frame the stepper will try to catch up on before dropping time. */
export const MAX_FRAME_MS = 50

/** Thickness of the invisible boundary walls, placed just outside the room. */
export const WALL_THICKNESS = 80

/**
 * Hard speed limit in m/s. Matter has no continuous collision detection, so a
 * body moving more than its own size in one sub-step could pass through a
 * thin obstacle. At 120 Hz this cap is 12.5 px per step, well under the
 * smallest object-plus-obstacle extent in any room, and still above the
 * fastest natural fall (a ceiling drop on Jupiter reaches about 21 m/s).
 */
export const MAX_SPEED_MPS = 25

/** Trail points kept per object; at one per frame this is about two seconds. */
export const TRAIL_LENGTH = 120

/**
 * Circles are polygons in Matter. Its own `Bodies.circle` uses as many sides
 * as the radius (18 for the ball), with a vertex pointing straight down, so a
 * ball dropped dead vertically lands on a point, the contact normal tilts,
 * and it bounces off sideways with spin. Forty sides put an edge at the
 * bottom and keep every contact normal within 4.5° of true.
 */
export const CIRCLE_SIDES = 40

/** Objects a sandbox room may hold at once, spawned ones included. */
export const MAX_SANDBOX_OBJECTS = 24

// ---------------------------------------------------------------------------
// Gravity
// ---------------------------------------------------------------------------

/** Real surface gravities, rounded to two decimals. */
export const GRAVITY_PRESETS: Record<GravityPresetId, GravityPreset> = {
  earth: { id: "earth", g: 9.81, accent: "#2ecc71" },
  moon: { id: "moon", g: 1.62, accent: "#94a3b8" },
  mars: { id: "mars", g: 3.71, accent: "#f97316" },
  jupiter: { id: "jupiter", g: 24.79, accent: "#f59e0b" },
  zero: { id: "zero", g: 0, accent: "#8b5cf6" },
}

/** Display order for the planet picker. */
export const GRAVITY_PRESET_ORDER: GravityPresetId[] = ["earth", "moon", "mars", "jupiter", "zero"]

export function isGravityPresetId(value: unknown): value is GravityPresetId {
  return typeof value === "string" && value in GRAVITY_PRESETS
}

/** The acceleration actually applied, in m/s²: the preset's g, or 0 when the switch is off. */
export function effectiveGravity(state: GravityState): number {
  return state.switchOn ? GRAVITY_PRESETS[state.preset].g : 0
}

// ---------------------------------------------------------------------------
// Objects
// ---------------------------------------------------------------------------

/**
 * The object catalogue. Masses are real kilograms, so a bowling ball shoves a
 * crate around and a feather barely nudges anything, which matters for
 * collisions but, deliberately, not for how fast things fall. `frictionAir`
 * only applies in rooms with air; everywhere else it is zero.
 */
export const OBJECT_SPECS: Record<ObjectKind, ObjectSpec> = {
  ball: {
    kind: "ball",
    shape: { type: "circle", radius: 18 },
    mass: 0.45,
    // Tennis-ball bouncy: lively, but it settles in a couple of seconds so a
    // "rest in the basket" goal does not keep a child waiting.
    restitution: 0.6,
    friction: 0.05,
    frictionAir: 0.004,
    color: "#f97316",
  },
  bowling: {
    kind: "bowling",
    shape: { type: "circle", radius: 22 },
    mass: 6.5,
    restitution: 0.12,
    friction: 0.4,
    frictionAir: 0.001,
    // A deep purple rather than black: a black ball vanishes against the dark room.
    color: "#6d28d9",
  },
  crate: {
    kind: "crate",
    shape: { type: "rectangle", width: 52, height: 52 },
    mass: 4,
    restitution: 0.08,
    friction: 0.7,
    frictionAir: 0.006,
    color: "#d4a056",
  },
  feather: {
    kind: "feather",
    shape: { type: "rectangle", width: 44, height: 12 },
    mass: 0.02,
    restitution: 0.05,
    friction: 0.3,
    frictionAir: 0.06,
    color: "#f8fafc",
  },
  hammer: {
    kind: "hammer",
    shape: { type: "rectangle", width: 46, height: 22 },
    mass: 1.2,
    restitution: 0.05,
    friction: 0.6,
    frictionAir: 0.001,
    color: "#64748b",
  },
}

/** Display order for the spawn tray. */
export const OBJECT_ORDER: ObjectKind[] = ["ball", "bowling", "crate", "feather", "hammer"]

export function isObjectKind(value: unknown): value is ObjectKind {
  return typeof value === "string" && value in OBJECT_SPECS
}

// ---------------------------------------------------------------------------
// Zero-G Room (sandbox)
// ---------------------------------------------------------------------------

/**
 * The room opens with Earth gravity on and things already moving, so the very
 * first flip of the switch visibly changes something: the bouncing ball
 * stops curving and sails off in a straight line.
 */
export const SANDBOX_DEFAULT_GRAVITY: GravityState = { preset: "earth", switchOn: true }

/** What the palette drops in by default. */
export const SANDBOX_DEFAULT_SPAWN: ObjectKind = "ball"

/** A closed, airless room: a ball mid-drop, a bowling ball rolling, a crate at rest. */
export const SANDBOX_WORLD: WorldConfig = {
  width: ROOM_WIDTH,
  height: ROOM_HEIGHT,
  walls: { floor: true, ceiling: true, left: true, right: true },
  air: "vacuum",
  obstacles: [],
  zones: [],
  objects: [
    { id: "ball-1", kind: "ball", x: 300, y: 140 },
    // Spin matches the roll (ω = v / r) so it rolls instead of skidding to a halt.
    { id: "bowling-1", kind: "bowling", x: 760, y: ROOM_HEIGHT - 22, velocity: { x: -2.5, y: 0 }, angularVelocity: -6.8 },
    { id: "crate-1", kind: "crate", x: 540, y: ROOM_HEIGHT - 26 },
  ],
}

// ---------------------------------------------------------------------------
// Pointer interaction
// ---------------------------------------------------------------------------

/** Extra px around an object that still counts as touching it. Fingers are wide. */
export const HIT_SLACK_PX = 10

/** A dragged object moves toward the pointer at this fraction of the gap per second. */
export const DRAG_GAIN_PER_SECOND = 16

/** Fastest a dragged object is driven, m/s. Below the global cap so a drag can never tunnel. */
export const MAX_DRAG_SPEED_MPS = 18

/** Fastest throw a release can give, m/s. */
export const MAX_THROW_SPEED_MPS = 14

/** Pointer movement older than this does not count toward a throw. */
export const THROW_WINDOW_MS = 100

/** A pointer that has not moved for this long releases the object gently. */
export const THROW_STILL_MS = 120

// ---------------------------------------------------------------------------
// Objective detection
// ---------------------------------------------------------------------------

/** Slower than this counts as "still", m/s. */
export const REST_SPEED_MPS = 0.15

/** How long an object must stay still inside a goal before it has "settled". */
export const REST_HOLD_MS = 500

/** Objects dropped in from the palette appear in this band near the top. */
export const SPAWN_BAND = { top: 70, bottom: 150, sideMargin: 90 }
