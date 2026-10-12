// Gravity Switch: Zero-G Lab — trail store tests.
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import { SANDBOX_WORLD, TRAIL_LENGTH } from "./gravity-switch-config.ts"
import { GravitySwitchWorld, resolveMatterModule } from "./gravity-switch-physics.ts"
import { TrailStore } from "./gravity-switch-trails.ts"
import type { ObjectState } from "./gravity-switch-types.ts"

const Matter = resolveMatterModule(await import("matter-js"))

function snapshot(id: string, x: number, y: number): ObjectState {
  return {
    id,
    kind: "ball",
    position: { x, y },
    velocity: { x: 0, y: 0 },
    angle: 0,
    angularVelocity: 0,
    mass: 1,
    spawned: false,
  }
}

test("a trail grows as an object moves and is capped in length", () => {
  const store = new TrailStore(5)
  for (let i = 0; i < 8; i++) store.record([snapshot("a", i * 10, 0)])
  const [trail] = store.trails()
  assert.equal(trail.id, "a")
  assert.equal(trail.points.length, 5)
  assert.deepEqual(trail.points[0], { x: 30, y: 0 }, "the oldest points fall off the front")
  assert.deepEqual(trail.points[4], { x: 70, y: 0 })
  assert.equal(TRAIL_LENGTH, new TrailStore()["maxPoints"])
})

test("a resting object records nothing new, and a lone point is not a trail", () => {
  const store = new TrailStore()
  store.record([snapshot("a", 10, 10)])
  assert.equal(store.size, 1)
  assert.deepEqual(store.trails(), [], "one point cannot be drawn")
  for (let i = 0; i < 20; i++) store.record([snapshot("a", 10.2, 10.1)])
  assert.equal(store.trails().length, 0, "sub-pixel jitter is ignored")
  store.record([snapshot("a", 40, 10)])
  assert.equal(store.trails()[0].points.length, 2)
})

test("objects that disappear take their trails with them, and clear empties everything", () => {
  const store = new TrailStore()
  store.record([snapshot("a", 0, 0), snapshot("b", 0, 0)])
  store.record([snapshot("a", 5, 0), snapshot("b", 5, 0)])
  assert.equal(store.trails().length, 2)
  store.record([snapshot("a", 10, 0)])
  assert.deepEqual(store.trails().map((trail) => trail.id), ["a"])
  store.clear()
  assert.equal(store.size, 0)
  assert.deepEqual(store.trails(), [])
})

test("recording trails copies positions and never affects the simulation", () => {
  const withTrails = new GravitySwitchWorld(Matter, SANDBOX_WORLD, { preset: "earth", switchOn: true })
  const without = new GravitySwitchWorld(Matter, SANDBOX_WORLD, { preset: "earth", switchOn: true })
  const store = new TrailStore()
  for (let frame = 0; frame < 120; frame++) {
    withTrails.stepExactly(2)
    const objects = withTrails.getObjects()
    store.record(objects)
    // Mutating what the store was handed must not reach back into it.
    objects[0].position.x = -999
    without.stepExactly(2)
  }
  assert.deepEqual(withTrails.getObjects(), without.getObjects())
  const trail = store.trails().find((candidate) => candidate.id === "ball-1")!
  assert.ok(trail.points.length > 10)
  assert.ok(trail.points.every((point) => point.x > 0), "stored points are copies")
  assert.ok(trail.points[trail.points.length - 1].y > trail.points[0].y, "the ball fell")
  withTrails.dispose()
  without.dispose()
})
