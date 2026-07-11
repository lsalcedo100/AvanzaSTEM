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
export type TestOutcome = { test: string; result: Rating; note: string }

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
  /** Specific, causal feedback the student can act on. */
  feedback: string[]
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

  const feedback: string[] = []
  const tests: TestOutcome[] = []

  // Straight-line test (chosen surface).
  if (traction < 45) {
    tests.push({ test: "Straight line", result: "poor", note: "The wheels slipped instead of gripping, so it drifted." })
  } else if (speed > 80 && config.wheelSpacing < 2) {
    tests.push({ test: "Straight line", result: "okay", note: "It was fast but a little twitchy on a narrow base." })
  } else {
    tests.push({ test: "Straight line", result: "good", note: "Drove straight and gripped the surface." })
  }

  // Turning test.
  if (config.motorPower >= 3 && config.wheelSpacing <= 1) {
    tests.push({ test: "Turning", result: "poor", note: "It spun out - too much speed on a narrow wheel base." })
  } else if (config.wheelSpacing >= 3) {
    tests.push({ test: "Turning", result: "okay", note: "It turned but a very wide base is slow to steer." })
  } else {
    tests.push({ test: "Turning", result: "good", note: "Turned cleanly using the two wheels." })
  }

  // Ramp / resistance test (needs torque + grip).
  if (torque < 45) {
    tests.push({ test: "Small ramp", result: "poor", note: "Not enough torque to climb - it stalled." })
  } else if (tractionOn(config, config.surface) < 45) {
    tests.push({ test: "Small ramp", result: "okay", note: "Strong enough, but it slipped near the top." })
  } else {
    tests.push({ test: "Small ramp", result: "good", note: "Climbed the ramp with power to spare." })
  }

  // Slippery-surface test (forced slippery).
  const slipperyTraction = tractionOn(config, "slippery")
  if (slipperyTraction < 40) {
    tests.push({ test: "Slippery surface", result: "poor", note: "The wheels spun in place with little grip." })
  } else {
    tests.push({ test: "Slippery surface", result: "okay", note: "It moved slowly but kept some grip." })
  }

  // Causal feedback tied to the design.
  if (centerOfMass >= 5) {
    feedback.push("High center of mass: the robot is tall or top-heavy, so it tips easily. Lower the body or move the weight down.")
  }
  if (config.wheelSpacing <= 1) {
    feedback.push("Narrow wheel spacing makes the base tippy and twitchy. Move the wheels farther apart.")
  }
  if (traction < 45) {
    feedback.push("Poor traction: the wheels slip. Try grippier or larger wheels, or add weight over the wheels.")
  }
  if (config.motorPower >= 3 && config.wheelSpacing <= 1) {
    feedback.push("Too much speed during turning on a narrow base makes it spin out. Slow down or widen the wheels.")
  }
  if (config.bodyWidth < config.wheelSpacing) {
    feedback.push("The wheels stick out past the body, which can misalign them. Widen the body or narrow the spacing.")
  }
  if (stability >= 70 && tests.every((t) => t.result !== "poor")) {
    feedback.push("Solid, stable design - low and wide with good grip.")
  }

  return { stability, speed, torque, traction, centerOfMass, tests, feedback }
}
