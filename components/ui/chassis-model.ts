/**
 * A deterministic (no-randomness) model of a rolling robot chassis, used by the
 * Week 2 Virtual Chassis Lab. It turns the student's design choices into
 * predictable test outcomes and specific, causal feedback - no physics engine,
 * and the same choices always give the same result, so students can debug their
 * design logically. Pure and unit-testable.
 */

export type Surface = "smooth" | "carpet" | "slippery"

/** One design configuration. Each slider is 1..3 (low..high) unless noted. */
export type ChassisConfig = {
  wheelSize: number // 1 small .. 3 large
  wheelSpacing: number // 1 narrow .. 3 wide
  bodyWidth: number // 1 narrow .. 3 wide
  bodyHeight: number // 1 low .. 3 tall
  weightPlacement: number // 1 low .. 3 high
  motorPower: number // 1 low .. 3 high
  surface: Surface
}

export const DEFAULT_CHASSIS: ChassisConfig = {
  wheelSize: 2,
  wheelSpacing: 2,
  bodyWidth: 2,
  bodyHeight: 2,
  weightPlacement: 2,
  motorPower: 2,
  surface: "smooth",
}

const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n))
const SURFACE_GRIP: Record<Surface, number> = { smooth: 2, carpet: 3, slippery: 1 }

export type Rating = "good" | "okay" | "poor"

/** The four fixed tests, as stable ids. Display names live in the translations. */
export type TestId = "straightLine" | "turning" | "smallRamp" | "slipperySurface"

/**
 * A stable id for one test outcome note. The model stays pure and
 * language-independent; the Virtual Chassis Lab maps these to
 * `t.courseUi.robotics.chassis` for display.
 */
export type NoteId =
  | "straightSlipped"
  | "straightTwitchy"
  | "straightGood"
  | "turnSpunOut"
  | "turnWide"
  | "turnGood"
  | "rampStalled"
  | "rampSlipped"
  | "rampGood"
  | "slipperyPoor"
  | "slipperyOkay"

/** A stable id for one piece of causal design feedback. */
export type FeedbackId =
  | "highCenterOfMass"
  | "narrowSpacing"
  | "poorTraction"
  | "spinOut"
  | "wheelsStickOut"
  | "solidDesign"

export type TestOutcome = { test: TestId; result: Rating; note: NoteId }

export type ChassisReport = {
  /** 0-100, higher = harder to tip. */
  stability: number
  /** 0-100 relative scores for context. */
  speed: number
  torque: number
  traction: number
  /** Center-of-mass height 2-6 (lower is better). */
  centerOfMass: number
  tests: TestOutcome[]
  /** Specific, causal feedback the student can act on, as stable ids. */
  feedback: FeedbackId[]
}

function tractionOn(config: ChassisConfig, surface: Surface): number {
  // Grip from the surface, bigger contact wheels, and weight pressing down.
  const grip = SURFACE_GRIP[surface] + (config.wheelSize >= 2 ? 1 : 0) + (config.weightPlacement <= 2 ? 1 : 0)
  return clamp(grip * 18)
}

/** Turn a design into scores, per-test outcomes, and causal feedback. */
export function evaluateChassis(config: ChassisConfig): ChassisReport {
  const centerOfMass = config.bodyHeight + config.weightPlacement // 2..6
  const speed = clamp((config.motorPower + config.wheelSize) * 14)
  const torque = clamp((4 - config.wheelSize + config.motorPower) * 16)
  const traction = tractionOn(config, config.surface)
  const stability = clamp(config.wheelSpacing * 22 + (6 - centerOfMass) * 12 + 10)

  const feedback: FeedbackId[] = []
  const tests: TestOutcome[] = []

  // Straight-line test (chosen surface).
  if (traction < 45) {
    tests.push({ test: "straightLine", result: "poor", note: "straightSlipped" })
  } else if (speed > 80 && config.wheelSpacing < 2) {
    tests.push({ test: "straightLine", result: "okay", note: "straightTwitchy" })
  } else {
    tests.push({ test: "straightLine", result: "good", note: "straightGood" })
  }

  // Turning test.
  if (config.motorPower >= 3 && config.wheelSpacing <= 1) {
    tests.push({ test: "turning", result: "poor", note: "turnSpunOut" })
  } else if (config.wheelSpacing >= 3) {
    tests.push({ test: "turning", result: "okay", note: "turnWide" })
  } else {
    tests.push({ test: "turning", result: "good", note: "turnGood" })
  }

  // Ramp / resistance test (needs torque + grip).
  if (torque < 45) {
    tests.push({ test: "smallRamp", result: "poor", note: "rampStalled" })
  } else if (tractionOn(config, config.surface) < 45) {
    tests.push({ test: "smallRamp", result: "okay", note: "rampSlipped" })
  } else {
    tests.push({ test: "smallRamp", result: "good", note: "rampGood" })
  }

  // Slippery-surface test (forced slippery).
  const slipperyTraction = tractionOn(config, "slippery")
  if (slipperyTraction < 40) {
    tests.push({ test: "slipperySurface", result: "poor", note: "slipperyPoor" })
  } else {
    tests.push({ test: "slipperySurface", result: "okay", note: "slipperyOkay" })
  }

  // Causal feedback tied to the design.
  if (centerOfMass >= 5) {
    feedback.push("highCenterOfMass")
  }
  if (config.wheelSpacing <= 1) {
    feedback.push("narrowSpacing")
  }
  if (traction < 45) {
    feedback.push("poorTraction")
  }
  if (config.motorPower >= 3 && config.wheelSpacing <= 1) {
    feedback.push("spinOut")
  }
  if (config.bodyWidth < config.wheelSpacing) {
    feedback.push("wheelsStickOut")
  }
  if (stability >= 70 && tests.every((t) => t.result !== "poor")) {
    feedback.push("solidDesign")
  }

  return { stability, speed, torque, traction, centerOfMass, tests, feedback }
}
