// Gravity Switch: Zero-G Lab — "What's happening?" engine tests.
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import {
  DRIFT_AFTER_MS,
  INSIGHT_HOLD_MS,
  INSIGHT_REPEAT_MS,
  InsightEngine,
  type InsightFrame,
} from "./gravity-switch-insights.ts"
import type { Contact } from "./gravity-switch-objectives.ts"
import type { GravityState, ObjectKind, ObjectState } from "./gravity-switch-types.ts"

const ON: GravityState = { preset: "earth", switchOn: true }
const OFF: GravityState = { preset: "earth", switchOn: false }

function obj(id: string, kind: ObjectKind, vx = 0, vy = 0): ObjectState {
  return { id, kind, position: { x: 100, y: 100 }, velocity: { x: vx, y: vy }, angle: 0, angularVelocity: 0, mass: 1, spawned: false }
}
function frame(partial: Partial<InsightFrame> = {}): InsightFrame {
  return { objects: [], contacts: [], gravity: OFF, elapsedMs: 0, ...partial }
}
const started = (a: string, b: string): Contact => ({ a, b, started: true })

test("starts idle and tells apart a flip with things moving from a flip with everything still", () => {
  const engine = new InsightEngine()
  assert.equal(engine.insight.kind, "idle")
  engine.note({ type: "switch", on: false }, [obj("a", "ball", 0, 3)], 1000)
  assert.equal(engine.insight.kind, "gravity-off-moving")
  engine.note({ type: "switch", on: false }, [obj("a", "ball", 0, 0)], 2000)
  assert.equal(engine.insight.kind, "gravity-off-still")
  engine.note({ type: "switch", on: true }, [], 3000)
  assert.equal(engine.insight.kind, "gravity-on")
})

test("planet changes name the planet", () => {
  const engine = new InsightEngine()
  for (const preset of ["moon", "mars", "jupiter", "zero", "earth"] as const) {
    engine.note({ type: "preset", preset }, [], 100)
    assert.equal(engine.insight.kind, `preset-${preset}`)
  }
})

test("a throw reads differently with gravity on and off, and a tiny nudge says nothing", () => {
  const engine = new InsightEngine()
  engine.update(frame({ gravity: OFF }))
  engine.note({ type: "throw", objectId: "a", speed: 3 }, [], 500)
  assert.equal(engine.insight.kind, "throw-zero-g")
  engine.update(frame({ gravity: ON, elapsedMs: 600 }))
  engine.note({ type: "throw", objectId: "a", speed: 3 }, [], 700)
  assert.equal(engine.insight.kind, "throw-gravity")
  const before = engine.insight.token
  engine.note({ type: "throw", objectId: "a", speed: 0.2 }, [], 800)
  assert.equal(engine.insight.token, before, "a nudge is not a throw")
})

test("dropping an object into zero-g gets a note, into gravity it does not", () => {
  const engine = new InsightEngine()
  engine.update(frame({ gravity: OFF }))
  engine.note({ type: "spawn", objectId: "a" }, [], 100)
  assert.equal(engine.insight.kind, "spawn-zero-g")
  const other = new InsightEngine()
  other.update(frame({ gravity: ON }))
  other.note({ type: "spawn", objectId: "a" }, [], 100)
  assert.equal(other.insight.kind, "idle")
})

test("a heavy and a light object falling side by side is noticed, two balls are not", () => {
  const engine = new InsightEngine()
  assert.equal(engine.update(frame({ gravity: ON, objects: [obj("h", "hammer", 0, 3), obj("f", "feather", 0, 3)], elapsedMs: 100 })), true)
  assert.equal(engine.insight.kind, "heavy-light")
  const plain = new InsightEngine()
  assert.equal(plain.update(frame({ gravity: ON, objects: [obj("a", "ball", 0, 3), obj("b", "ball", 0, 3)], elapsedMs: 100 })), false)
  assert.equal(plain.insight.kind, "idle")
  const slow = new InsightEngine()
  assert.equal(slow.update(frame({ gravity: ON, objects: [obj("h", "hammer", 0, 0.5), obj("f", "feather", 0, 0.5)], elapsedMs: 100 })), false, "not yet falling")
})

test("a bump between objects and a bounce off the floor are told apart", () => {
  const engine = new InsightEngine()
  engine.update(frame({ objects: [obj("a", "ball", 2, 0), obj("b", "crate", 0, 0)], contacts: [started("object:a", "object:b")], elapsedMs: 100 }))
  assert.equal(engine.insight.kind, "collision")

  const floor = new InsightEngine()
  floor.update(frame({ gravity: ON, objects: [obj("a", "ball", 0, 5)], elapsedMs: 100 }))
  floor.update(frame({ gravity: ON, objects: [obj("a", "ball", 0, -3)], contacts: [started("wall:floor", "object:a")], elapsedMs: 120 }))
  assert.equal(floor.insight.kind, "bounce")

  const resting = new InsightEngine()
  resting.update(frame({ gravity: ON, objects: [obj("a", "ball", 0, 0)], elapsedMs: 100 }))
  resting.update(frame({ gravity: ON, objects: [obj("a", "ball", 0, 0)], contacts: [{ a: "wall:floor", b: "object:a", started: false }], elapsedMs: 120 }))
  assert.equal(resting.insight.kind, "idle", "a resting contact is not a bounce")
})

test("an object drifting through zero-g for a while earns 'still going'", () => {
  const engine = new InsightEngine()
  for (let t = 0; t <= DRIFT_AFTER_MS; t += 500) {
    engine.update(frame({ gravity: OFF, objects: [obj("a", "ball", 2, 0)], elapsedMs: t }))
  }
  assert.equal(engine.insight.kind, "idle", "not yet")
  engine.update(frame({ gravity: OFF, objects: [obj("a", "ball", 2, 0)], elapsedMs: DRIFT_AFTER_MS + 600 }))
  assert.equal(engine.insight.kind, "drifting")
  const interrupted = new InsightEngine()
  interrupted.update(frame({ gravity: OFF, objects: [obj("a", "ball", 2, 0)], elapsedMs: 0 }))
  interrupted.update(frame({ gravity: OFF, objects: [obj("a", "ball", 0, 0)], elapsedMs: 2000 }))
  interrupted.update(frame({ gravity: OFF, objects: [obj("a", "ball", 2, 0)], elapsedMs: 2100 }))
  interrupted.update(frame({ gravity: OFF, objects: [obj("a", "ball", 2, 0)], elapsedMs: 4000 }))
  assert.equal(interrupted.insight.kind, "idle", "stopping resets the drift clock")
})

test("frame insights wait for the current one to hold, and do not repeat too soon; player actions cut in", () => {
  const engine = new InsightEngine()
  engine.note({ type: "switch", on: true }, [], 1000)
  assert.equal(engine.insight.kind, "gravity-on")
  engine.update(frame({ gravity: ON, objects: [obj("h", "hammer", 0, 3), obj("f", "feather", 0, 3)], elapsedMs: 1000 + INSIGHT_HOLD_MS - 100 }))
  assert.equal(engine.insight.kind, "gravity-on", "still holding")
  engine.update(frame({ gravity: ON, objects: [obj("h", "hammer", 0, 3), obj("f", "feather", 0, 3)], elapsedMs: 1000 + INSIGHT_HOLD_MS + 100 }))
  assert.equal(engine.insight.kind, "heavy-light")
  const token = engine.insight.token
  engine.note({ type: "preset", preset: "moon" }, [], 1000 + INSIGHT_HOLD_MS + 200)
  assert.equal(engine.insight.kind, "preset-moon", "the player's action shows at once")
  assert.notEqual(engine.insight.token, token)
  const later = 1000 + INSIGHT_HOLD_MS + 200 + INSIGHT_HOLD_MS + 100
  engine.update(frame({ gravity: ON, objects: [obj("h", "hammer", 0, 3), obj("f", "feather", 0, 3)], elapsedMs: later }))
  assert.equal(engine.insight.kind, "preset-moon", "heavy-light was shown recently, so it does not come back yet")
  engine.update(frame({ gravity: ON, objects: [obj("h", "hammer", 0, 3), obj("f", "feather", 0, 3)], elapsedMs: 1000 + INSIGHT_HOLD_MS + 100 + INSIGHT_REPEAT_MS + 50 }))
  assert.equal(engine.insight.kind, "heavy-light")
})

test("reset returns to idle with a fresh token", () => {
  const engine = new InsightEngine()
  engine.note({ type: "switch", on: true }, [], 10)
  const token = engine.insight.token
  engine.reset()
  assert.equal(engine.insight.kind, "idle")
  assert.ok(engine.insight.token > token)
})
