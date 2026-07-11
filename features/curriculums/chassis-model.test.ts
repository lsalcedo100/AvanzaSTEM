// Tests for the deterministic Virtual Chassis Lab model (Week 2).
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import { DEFAULT_CHASSIS, evaluateChassis, type ChassisConfig } from "../../components/ui/chassis-model.ts"

test("the model is deterministic - same design gives the same report", () => {
  const a = evaluateChassis(DEFAULT_CHASSIS)
  const b = evaluateChassis(DEFAULT_CHASSIS)
  assert.deepEqual(a, b)
})

test("a low, wide, low-weight design is stable; a tall, narrow, top-heavy one is not", () => {
  const stable = evaluateChassis({ ...DEFAULT_CHASSIS, wheelSpacing: 3, bodyHeight: 1, weightPlacement: 1 })
  const tippy = evaluateChassis({ ...DEFAULT_CHASSIS, wheelSpacing: 1, bodyHeight: 3, weightPlacement: 3 })
  assert.ok(stable.stability > tippy.stability)
  assert.ok(tippy.feedback.some((f) => f.toLowerCase().includes("center of mass") || f.toLowerCase().includes("tippy")))
})

test("a slippery surface hurts traction and shows up in the straight-line test", () => {
  const slippery: ChassisConfig = { ...DEFAULT_CHASSIS, surface: "slippery", wheelSize: 1, weightPlacement: 3 }
  const report = evaluateChassis(slippery)
  assert.ok(report.traction < evaluateChassis({ ...slippery, surface: "carpet" }).traction)
  assert.ok(report.feedback.some((f) => f.toLowerCase().includes("traction")))
})

test("high speed on a narrow base spins out on the turning test", () => {
  const report = evaluateChassis({ ...DEFAULT_CHASSIS, motorPower: 3, wheelSpacing: 1 })
  const turning = report.tests.find((t) => t.test === "Turning")
  assert.equal(turning?.result, "poor")
  assert.ok(report.feedback.some((f) => f.toLowerCase().includes("spin out")))
})

test("small wheels plus power give torque to climb the ramp", () => {
  const strong = evaluateChassis({ ...DEFAULT_CHASSIS, wheelSize: 1, motorPower: 3 })
  const weak = evaluateChassis({ ...DEFAULT_CHASSIS, wheelSize: 3, motorPower: 1 })
  assert.ok(strong.torque > weak.torque)
  assert.equal(weak.tests.find((t) => t.test === "Small ramp")?.result, "poor")
})

test("every design produces all four named tests", () => {
  const report = evaluateChassis(DEFAULT_CHASSIS)
  assert.deepEqual(
    report.tests.map((t) => t.test),
    ["Straight line", "Turning", "Small ramp", "Slippery surface"],
  )
})
