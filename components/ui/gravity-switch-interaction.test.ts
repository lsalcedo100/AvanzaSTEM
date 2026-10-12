// Gravity Switch: Zero-G Lab — pointer interaction tests.
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import {
  HIT_SLACK_PX,
  MAX_DRAG_SPEED_MPS,
  MAX_THROW_SPEED_MPS,
  PIXELS_PER_METER,
  SANDBOX_WORLD,
  SPAWN_BAND,
} from "./gravity-switch-config.ts"
import {
  PointerTracker,
  clampSpawnPoint,
  clampSpeed,
  dragVelocity,
  findSpawnSpot,
  hitTest,
  objectExtent,
  pointOnObject,
  spotIsFree,
} from "./gravity-switch-interaction.ts"
import type { ObjectKind, ObjectState } from "./gravity-switch-types.ts"

function obj(id: string, kind: ObjectKind, x: number, y: number, angle = 0): ObjectState {
  return { id, kind, position: { x, y }, velocity: { x: 0, y: 0 }, angle, angularVelocity: 0, mass: 1, spawned: false }
}

test("a point hits a ball inside its radius plus slack, and misses outside", () => {
  const ball = obj("b", "ball", 100, 100) // radius 18
  assert.ok(pointOnObject(ball, { x: 100, y: 100 }))
  assert.ok(pointOnObject(ball, { x: 117, y: 100 }))
  assert.ok(pointOnObject(ball, { x: 100 + 18 + HIT_SLACK_PX - 1, y: 100 }), "slack counts")
  assert.equal(pointOnObject(ball, { x: 100 + 18 + HIT_SLACK_PX + 1, y: 100 }), false)
  assert.equal(pointOnObject(ball, { x: 130, y: 100 }, 0), false, "no slack, no hit")
})

test("a rotated crate is hit in its own frame", () => {
  const crate = obj("c", "crate", 200, 200, Math.PI / 4) // 52 × 52, turned 45°
  assert.ok(pointOnObject(crate, { x: 200, y: 200 }, 0))
  // Along the rotated axis the half-diagonal (≈ 36.8 px) is inside; the unrotated corner is not.
  assert.ok(pointOnObject(crate, { x: 200 + 34, y: 200 + 0 }, 0), "the diagonal now points along x")
  assert.equal(pointOnObject(crate, { x: 200 + 26, y: 200 + 26 }, 0), false, "the old corner is now outside the square")
  const feather = obj("f", "feather", 300, 300, Math.PI / 2) // 44 × 12 standing upright
  assert.ok(pointOnObject(feather, { x: 300, y: 300 + 20 }, 0))
  assert.equal(pointOnObject(feather, { x: 300 + 20, y: 300 }, 0), false)
})

test("hitTest prefers the object drawn on top and returns null on empty space", () => {
  const under = obj("under", "crate", 100, 100)
  const over = obj("over", "ball", 110, 100)
  assert.equal(hitTest([under, over], { x: 110, y: 100 })?.id, "over")
  assert.equal(hitTest([over, under], { x: 110, y: 100 })?.id, "under")
  assert.equal(hitTest([under, over], { x: 500, y: 500 }), null)
})

test("spawn points are clamped so the object fits inside the room", () => {
  const room = SANDBOX_WORLD
  const ballExtent = objectExtent("ball")
  assert.deepEqual(clampSpawnPoint({ x: -50, y: -50 }, "ball", room), { x: ballExtent + 4, y: ballExtent + 4 })
  assert.deepEqual(clampSpawnPoint({ x: 5000, y: 5000 }, "crate", room), {
    x: room.width - objectExtent("crate") - 4,
    y: room.height - objectExtent("crate") - 4,
  })
  assert.deepEqual(clampSpawnPoint({ x: 480, y: 270 }, "hammer", room), { x: 480, y: 270 })
  assert.ok(objectExtent("hammer") > objectExtent("feather"))
})

test("a free spot keeps a gap from every object", () => {
  const objects = [obj("a", "ball", 100, 100)]
  assert.equal(spotIsFree({ x: 100, y: 100 }, "ball", objects), false)
  assert.equal(spotIsFree({ x: 130, y: 100 }, "ball", objects), false, "touching")
  assert.ok(spotIsFree({ x: 150, y: 100 }, "ball", objects))
  assert.ok(spotIsFree({ x: 400, y: 400 }, "crate", objects))
})

test("findSpawnSpot lands in the top band, avoids objects, and is deterministic for a given random", () => {
  const room = SANDBOX_WORLD
  const objects = [obj("a", "ball", 480, 110), obj("b", "crate", 300, 100)]
  const seq = [0.5, 0.5, 0.2, 0.3, 0.9, 0.1]
  let i = 0
  const random = () => seq[i++ % seq.length]
  const spot = findSpawnSpot("ball", objects, room, random)
  assert.ok(spot.y >= SPAWN_BAND.top && spot.y <= SPAWN_BAND.bottom)
  assert.ok(spot.x >= SPAWN_BAND.sideMargin && spot.x <= room.width - SPAWN_BAND.sideMargin)
  assert.ok(spotIsFree(spot, "ball", objects), "the first candidate (480, 110) was taken, so it moved on")
  i = 0
  assert.deepEqual(findSpawnSpot("ball", objects, room, random), spot)

  // A crowded band still returns something inside the room.
  const crowd: ObjectState[] = []
  for (let x = 60; x < room.width; x += 40) for (let y = 60; y <= 160; y += 40) crowd.push(obj(`c${x}-${y}`, "ball", x, y))
  const fallback = findSpawnSpot("ball", crowd, room, () => 0.5)
  assert.ok(fallback.x > 0 && fallback.x < room.width && fallback.y > 0 && fallback.y < room.height)
})

test("drag velocity points at the target and is capped", () => {
  const v = dragVelocity({ x: 100, y: 100 }, { x: 160, y: 100 })
  assert.ok(v.x > 0 && v.y === 0)
  assert.ok(Math.abs(v.x - (60 * 16) / PIXELS_PER_METER) < 1e-9, "16 gaps per second")
  const far = dragVelocity({ x: 0, y: 0 }, { x: 900, y: 500 })
  assert.ok(Math.abs(Math.hypot(far.x, far.y) - MAX_DRAG_SPEED_MPS) < 1e-9)
  assert.deepEqual(dragVelocity({ x: 5, y: 5 }, { x: 5, y: 5 }), { x: 0, y: 0 })
  assert.deepEqual(clampSpeed({ x: 0, y: 0 }, 1), { x: 0, y: 0 })
  assert.deepEqual(clampSpeed({ x: 3, y: 4 }, 10), { x: 3, y: 4 })
  const clamped = clampSpeed({ x: 30, y: 40 }, 10)
  assert.ok(Math.abs(clamped.x - 6) < 1e-9 && Math.abs(clamped.y - 8) < 1e-9)
})

test("a flick becomes a throw, a careful placement does not", () => {
  const tracker = new PointerTracker(100, 120)
  // 60 px to the right over 100 ms = 600 px/s = 10 m/s.
  for (let t = 0; t <= 100; t += 20) tracker.push(1000 + t, { x: 100 + t * 0.6, y: 200 })
  const throwV = tracker.velocity(1100)
  assert.ok(Math.abs(throwV.x - 10) < 1e-6, `${throwV.x} m/s`)
  assert.ok(Math.abs(throwV.y) < 1e-9)

  // Hold still for a while before letting go: no throw.
  assert.deepEqual(tracker.velocity(1100 + 200), { x: 0, y: 0 })

  // A very fast flick is capped.
  const fast = new PointerTracker()
  fast.push(0, { x: 0, y: 0 })
  fast.push(50, { x: 900, y: 0 })
  assert.ok(Math.abs(fast.velocity(50).x - MAX_THROW_SPEED_MPS) < 1e-9)

  // Only the recent window counts: an early sprint followed by a slow finish is a slow throw.
  const mixed = new PointerTracker(100, 120)
  mixed.push(0, { x: 0, y: 0 })
  mixed.push(50, { x: 600, y: 0 })
  for (let t = 100; t <= 300; t += 50) mixed.push(t, { x: 600 + (t - 50) * 0.05, y: 0 })
  assert.ok(mixed.velocity(300).x < 1, `${mixed.velocity(300).x} m/s`)

  const empty = new PointerTracker()
  assert.deepEqual(empty.velocity(10), { x: 0, y: 0 })
  tracker.reset()
  assert.deepEqual(tracker.velocity(1100), { x: 0, y: 0 })
})
