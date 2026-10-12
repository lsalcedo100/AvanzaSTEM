// Gravity Switch: Zero-G Lab — release-audit physics tests.
//
// Long, messy sessions on the real engine: hundreds of switch flips, planet
// changes, spawns, throws and removals, then a reset that must give back the
// exact opening room. Pausing must freeze time, and collisions must pass
// momentum along the way a child expects.
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import {
  GRAVITY_PRESETS,
  GRAVITY_PRESET_ORDER,
  MAX_SANDBOX_OBJECTS,
  MAX_SPEED_MPS,
  OBJECT_ORDER,
  ROOM_HEIGHT,
  ROOM_WIDTH,
  SANDBOX_DEFAULT_GRAVITY,
  SANDBOX_WORLD,
} from "./gravity-switch-config.ts"
import { GravitySwitchWorld, resolveMatterModule } from "./gravity-switch-physics.ts"
import type { GravityState } from "./gravity-switch-types.ts"

const Matter = resolveMatterModule(await import("matter-js"))

/** Deterministic pseudo-random numbers so a failure replays exactly. */
function lcg(seed: number) {
  let state = seed
  return () => {
    state = (state * 1103515245 + 12345) % 2147483648
    return state / 2147483648
  }
}

test("hundreds of flips, planet changes, spawns, throws and removals never break the room, and reset gives it back exactly", () => {
  const world = new GravitySwitchWorld(Matter, SANDBOX_WORLD, SANDBOX_DEFAULT_GRAVITY)
  const pristine = new GravitySwitchWorld(Matter, SANDBOX_WORLD, SANDBOX_DEFAULT_GRAVITY)
  const rnd = lcg(7)
  const spawned: string[] = []
  let refused = 0
  for (let i = 0; i < 400; i++) {
    const gravity = world.getGravity()
    const preset = i % 7 === 0 ? GRAVITY_PRESET_ORDER[Math.floor(rnd() * GRAVITY_PRESET_ORDER.length)] : gravity.preset
    world.setGravity({ preset, switchOn: !gravity.switchOn })
    if (i % 3 === 0) {
      const id = world.spawn(OBJECT_ORDER[i % OBJECT_ORDER.length], 60 + rnd() * (ROOM_WIDTH - 120), 40 + rnd() * 220)
      if (id) spawned.push(id)
      else refused += 1
    }
    if (i % 11 === 0 && spawned.length > 0) {
      const [id] = spawned.splice(Math.floor(rnd() * spawned.length), 1)
      assert.equal(world.remove(id), true)
    }
    for (const object of world.getObjects()) {
      if (rnd() < 0.2) world.setVelocity(object.id, { x: (rnd() - 0.5) * 30, y: (rnd() - 0.5) * 30 })
    }
    // Ordinary frames and the occasional long, janky one.
    world.step(16.7 * (1 + Math.floor(rnd() * 5)))
    world.takeContacts()
    for (const object of world.getObjects()) {
      const { x, y } = object.position
      assert.ok(Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(object.angle), `${object.id} went non-finite at step ${i}`)
      assert.ok(x > -1 && x < ROOM_WIDTH + 1 && y > -1 && y < ROOM_HEIGHT + 1, `${object.id} left the room at step ${i}: ${JSON.stringify(object.position)}`)
      assert.ok(Math.hypot(object.velocity.x, object.velocity.y) <= MAX_SPEED_MPS + 0.5, `${object.id} broke the speed cap at step ${i}`)
    }
    assert.ok(world.objectCount <= MAX_SANDBOX_OBJECTS, `too many objects at step ${i}`)
  }
  assert.equal(world.objectCount, SANDBOX_WORLD.objects.length + spawned.length)
  assert.ok(refused > 0, "the room filled up at some point, so the limit was exercised")
  assert.equal(world.bodyCount, world.objectCount + 4, "only the four walls besides the objects: no leaked bodies")

  // The deliberate reset: the very same opening room, then the very same future.
  world.reset()
  world.setGravity(SANDBOX_DEFAULT_GRAVITY)
  assert.deepEqual(world.getObjects(), pristine.getObjects())
  world.stepExactly(240)
  pristine.stepExactly(240)
  assert.deepEqual(world.getObjects(), pristine.getObjects())
  world.dispose()
  pristine.dispose()
})

test("pausing freezes the room exactly and resuming continues as if no time had passed", () => {
  const paused = new GravitySwitchWorld(Matter, SANDBOX_WORLD, SANDBOX_DEFAULT_GRAVITY)
  const control = new GravitySwitchWorld(Matter, SANDBOX_WORLD, SANDBOX_DEFAULT_GRAVITY)
  paused.stepExactly(30)
  control.stepExactly(30)
  const frozen = paused.getObjects()
  paused.pause()
  assert.equal(paused.isPaused, true)
  for (let i = 0; i < 40; i++) assert.equal(paused.step(16.7), 0, "no sub-steps run while paused")
  paused.step(5000)
  assert.deepEqual(paused.getObjects(), frozen)
  assert.equal(paused.elapsedMs, control.elapsedMs, "the clock does not run while paused")
  paused.resume()
  paused.stepExactly(90)
  control.stepExactly(90)
  assert.deepEqual(paused.getObjects(), control.getObjects())
  paused.dispose()
  control.dispose()
})

test("rapid flips while falling: only the time with gravity on counts toward the speed", () => {
  const world = new GravitySwitchWorld(
    Matter,
    { ...SANDBOX_WORLD, height: 4000, objects: [{ id: "ball", kind: "ball", x: 480, y: 100 }] },
    { preset: "earth", switchOn: true },
  )
  let onMs = 0
  for (let i = 0; i < 40; i++) {
    const on = i % 2 === 0
    world.setGravity({ preset: "earth", switchOn: on })
    world.stepExactly(6) // 50 ms per leg
    if (on) onMs += 50
  }
  const ball = world.getObject("ball")!
  const expected = (GRAVITY_PRESETS.earth.g * onMs) / 1000
  assert.ok(Math.abs(ball.velocity.y - expected) / expected < 0.03, `after ${onMs} ms of gravity: ${ball.velocity.y.toFixed(3)} m/s vs ${expected.toFixed(3)} m/s`)
  assert.equal(ball.velocity.x, 0, "no sideways drift from switching")
  world.dispose()
})

test("planet presets fall in the published ratios", () => {
  const measured: Record<string, number> = {}
  for (const preset of ["earth", "moon", "mars", "jupiter"] as const) {
    const gravity: GravityState = { preset, switchOn: true }
    const world = new GravitySwitchWorld(Matter, { ...SANDBOX_WORLD, height: 6000, objects: [{ id: "ball", kind: "ball", x: 480, y: 100 }] }, gravity)
    world.stepExactly(120)
    measured[preset] = world.getObject("ball")!.velocity.y
    world.dispose()
  }
  for (const preset of ["moon", "mars", "jupiter"] as const) {
    const ratio = measured[preset] / measured.earth
    const published = GRAVITY_PRESETS[preset].g / GRAVITY_PRESETS.earth.g
    assert.ok(Math.abs(ratio - published) < 0.01, `${preset}/earth measured ${ratio.toFixed(3)} vs ${published.toFixed(3)}`)
  }
})

test("a head-on hit in zero-g passes momentum along: the light ball leaves faster than the heavy one arrived", () => {
  const world = new GravitySwitchWorld(
    Matter,
    {
      ...SANDBOX_WORLD,
      objects: [
        { id: "heavy", kind: "bowling", x: 300, y: 270, velocity: { x: 3, y: 0 } },
        { id: "light", kind: "ball", x: 520, y: 270 },
      ],
    },
    { preset: "zero", switchOn: true },
  )
  const heavyMass = world.getObject("heavy")!.mass
  const lightMass = world.getObject("light")!.mass
  const before = heavyMass * 3
  let hit = false
  for (let i = 0; i < 120 * 4 && !hit; i++) {
    world.stepExactly(1)
    hit = world.takeContacts().some((contact) => [contact.a, contact.b].includes("object:light") && [contact.a, contact.b].includes("object:heavy"))
  }
  assert.ok(hit, "the bowling ball reaches the ball")
  world.stepExactly(6)
  const heavy = world.getObject("heavy")!
  const light = world.getObject("light")!
  const after = heavyMass * heavy.velocity.x + lightMass * light.velocity.x
  assert.ok(light.velocity.x > heavy.velocity.x && heavy.velocity.x > 0, `light ${light.velocity.x.toFixed(2)} m/s, heavy ${heavy.velocity.x.toFixed(2)} m/s`)
  assert.ok(light.velocity.x > 3, `the light ball is sent off faster than the heavy one arrived: ${light.velocity.x.toFixed(2)} m/s`)
  assert.ok(Math.abs(after - before) / before < 0.1, `momentum ${before.toFixed(2)} → ${after.toFixed(2)} kg·m/s`)
  world.dispose()
})
