// Gravity Switch: Zero-G Lab — physics world lifecycle tests.
//
// Runs the real Matter.js engine headlessly to check the promises the game
// depends on: a reset restores the exact starting state, switching rooms
// leaves nothing behind, gravity presets produce the right accelerations, and
// the same room always simulates the same way.
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import {
  GRAVITY_PRESETS,
  MAX_SANDBOX_OBJECTS,
  MAX_SPEED_MPS,
  PHYSICS_STEP_MS,
  PIXELS_PER_METER,
  SANDBOX_DEFAULT_GRAVITY,
  SANDBOX_WORLD,
} from "./gravity-switch-config.ts"
import { getMission } from "./gravity-switch-missions.ts"
import {
  GRAVITY_SCALE,
  GravitySwitchWorld,
  matterToMetersPerSecond,
  metersPerSecondToMatter,
  resolveMatterModule,
} from "./gravity-switch-physics.ts"
import type { GravityState, WorldConfig } from "./gravity-switch-types.ts"

const Matter = resolveMatterModule(await import("matter-js"))

const STEPS_PER_SECOND = Math.round(1000 / PHYSICS_STEP_MS)

/** A tall, airless room with one ball near the ceiling: a clean free-fall rig. Tall enough that a second of Jupiter gravity never reaches the floor. */
const FREE_FALL: WorldConfig = {
  width: 960,
  height: 1600,
  walls: { floor: true, ceiling: true, left: true, right: true },
  air: "vacuum",
  obstacles: [],
  zones: [],
  objects: [{ id: "ball", kind: "ball", x: 480, y: 60 }],
}

const earthOn: GravityState = { preset: "earth", switchOn: true }
const earthOff: GravityState = { preset: "earth", switchOn: false }

function fallAfterOneSecond(gravity: GravityState, config: WorldConfig = FREE_FALL, id = "ball"): number {
  const world = new GravitySwitchWorld(Matter, config, gravity)
  const startY = world.getObject(id)!.position.y
  world.stepExactly(STEPS_PER_SECOND)
  const fallen = world.getObject(id)!.position.y - startY
  world.dispose()
  return fallen
}

test("resolveMatterModule accepts the namespace or a default-wrapped module and rejects junk", () => {
  assert.equal(resolveMatterModule(Matter), Matter)
  assert.equal(resolveMatterModule({ default: Matter }), Matter)
  assert.throws(() => resolveMatterModule({}), /did not load/)
  assert.throws(() => resolveMatterModule(null), /did not load/)
})

test("velocity conversions round-trip and gravity scale reads in m/s²", () => {
  for (const v of [-4, 0, 0.5, 12]) {
    assert.ok(Math.abs(matterToMetersPerSecond(metersPerSecondToMatter(v)) - v) < 1e-12)
  }
  assert.ok(Math.abs(metersPerSecondToMatter(60 / PIXELS_PER_METER) - 1) < 1e-12, "1 m/s is 1 px per base step at 60 px/m")
  assert.equal(GRAVITY_SCALE, PIXELS_PER_METER / 1_000_000)
})

test("building the Zero-G Room creates exactly its walls and objects", () => {
  const world = new GravitySwitchWorld(Matter, SANDBOX_WORLD, SANDBOX_DEFAULT_GRAVITY)
  assert.equal(world.objectCount, SANDBOX_WORLD.objects.length)
  assert.equal(world.bodyCount, 4 + SANDBOX_WORLD.objects.length)
  assert.deepEqual(
    world.getObjects().map((object) => object.id).sort(),
    SANDBOX_WORLD.objects.map((object) => object.id).sort(),
  )
  assert.equal(world.gravityMagnitude, GRAVITY_PRESETS.earth.g, "the room opens with Earth gravity on")
  assert.equal(world.engine.gravity.y, GRAVITY_PRESETS.earth.g)
  assert.equal(world.engine.enableSleeping, false, "floating objects must never fall asleep")
  world.dispose()
})

test("building a mission creates its walls, obstacles, zones and objects", () => {
  const mission = getMission("drop-in")
  const world = new GravitySwitchWorld(Matter, mission.world, mission.gravity)
  const walls = Object.values(mission.world.walls).filter(Boolean).length
  assert.equal(world.bodyCount, walls + mission.world.obstacles.length + mission.world.zones.length + mission.world.objects.length)
  assert.equal(world.objectCount, 1)
  const ball = world.getObject("ball")!
  assert.deepEqual(ball.position, { x: 480, y: 110 })
  assert.deepEqual(ball.velocity, { x: 0, y: 0 })
  assert.equal(ball.spawned, false)
  world.dispose()
})

test("loading another mission leaves nothing from the previous one behind", () => {
  const first = getMission("hammer-and-feather")
  const second = getMission("bank-shot")
  const world = new GravitySwitchWorld(Matter, first.world, first.gravity)
  world.spawn("crate", 300, 300)
  world.stepExactly(30)
  assert.ok(world.hasObject("hammer"))

  world.load(second.world, second.gravity)
  const walls = Object.values(second.world.walls).filter(Boolean).length
  assert.equal(world.bodyCount, walls + second.world.obstacles.length + second.world.zones.length + second.world.objects.length)
  assert.equal(world.hasObject("hammer"), false)
  assert.equal(world.hasObject("feather"), false)
  assert.equal(world.objectCount, 1)
  assert.equal(world.elapsedMs, 0)
  assert.deepEqual(world.getGravity(), second.gravity)
  assert.equal(world.gravityMagnitude, 0, "bank shot starts weightless")

  const labels = Matter.Composite.allBodies(world.engine.world).map((body) => body.label)
  assert.ok(labels.includes("obstacle:bumper"))
  assert.ok(labels.includes("zone:cup"))
  assert.ok(!labels.some((label) => label.startsWith("object:spawn")))
  world.dispose()
})

test("reset restores the exact starting state and removes spawned objects", () => {
  const mission = {
    world: { ...FREE_FALL, objects: [{ id: "ball", kind: "ball" as const, x: 480, y: 500, velocity: { x: 0, y: -4 } }] },
    gravity: earthOn,
  }
  const world = new GravitySwitchWorld(Matter, mission.world, mission.gravity)
  const initial = world.getObjects()
  assert.ok(Math.abs(initial[0].velocity.y - -4) < 1e-9, "the ball starts moving up at 4 m/s")

  world.setGravity({ preset: "earth", switchOn: false })
  world.spawn("ball", 200, 200)
  world.stepExactly(STEPS_PER_SECOND * 2)
  assert.notDeepEqual(world.getObject("ball")!.position, initial[0].position)
  assert.equal(world.objectCount, 2)

  world.reset()
  assert.deepEqual(world.getObjects(), initial)
  assert.equal(world.objectCount, 1)
  assert.equal(world.elapsedMs, 0)
  assert.deepEqual(world.getGravity(), mission.gravity, "reset restores the mission's gravity, not the player's last setting")
  assert.equal(world.isPaused, false)
  world.dispose()
})

test("with the switch off a resting object does not move at all", () => {
  const world = new GravitySwitchWorld(Matter, FREE_FALL, earthOff)
  const before = world.getObjects()
  world.stepExactly(STEPS_PER_SECOND * 3)
  assert.deepEqual(world.getObjects(), before)
  world.dispose()
})

test("free fall matches ½·g·t² for every planet", () => {
  for (const preset of ["earth", "moon", "mars", "jupiter"] as const) {
    const expected = 0.5 * GRAVITY_PRESETS[preset].g * PIXELS_PER_METER
    const actual = fallAfterOneSecond({ preset, switchOn: true })
    const error = Math.abs(actual - expected) / expected
    assert.ok(error < 0.02, `${preset}: fell ${actual.toFixed(1)} px, expected ${expected.toFixed(1)} px (${(error * 100).toFixed(2)}% off)`)
  }
  assert.equal(fallAfterOneSecond({ preset: "zero", switchOn: true }), 0)
})

test("flipping the switch mid-flight stops the acceleration but keeps the velocity", () => {
  const world = new GravitySwitchWorld(Matter, FREE_FALL, earthOn)
  world.stepExactly(STEPS_PER_SECOND / 2)
  const speedWhenFlipped = world.getObject("ball")!.velocity.y
  assert.ok(speedWhenFlipped > 4 && speedWhenFlipped < 5.2, `falling at ${speedWhenFlipped.toFixed(2)} m/s after half a second`)

  world.setGravity(earthOff)
  const y1 = world.getObject("ball")!.position.y
  world.stepExactly(STEPS_PER_SECOND / 2)
  const after = world.getObject("ball")!
  assert.ok(Math.abs(after.velocity.y - speedWhenFlipped) < 1e-9, "no gravity, no change in speed")
  const expectedTravel = (speedWhenFlipped * PIXELS_PER_METER) / 2
  assert.ok(Math.abs(after.position.y - y1 - expectedTravel) < 1, "coasts at constant speed")
  world.dispose()
})

test("hammer and feather land together in a vacuum and apart in air", () => {
  const mission = getMission("hammer-and-feather")
  const moonOn: GravityState = { preset: "moon", switchOn: true }
  const vacuum = new GravitySwitchWorld(Matter, mission.world, moonOn)
  const hammerStart = vacuum.getObject("hammer")!.position.y
  const featherStart = vacuum.getObject("feather")!.position.y
  vacuum.stepExactly(STEPS_PER_SECOND)
  const hammerFall = vacuum.getObject("hammer")!.position.y - hammerStart
  const featherFall = vacuum.getObject("feather")!.position.y - featherStart
  assert.ok(Math.abs(hammerFall - featherFall) < 1e-6, `vacuum: hammer ${hammerFall}, feather ${featherFall}`)
  assert.ok(hammerFall > 40, "they do fall")
  vacuum.dispose()

  const air = new GravitySwitchWorld(Matter, { ...mission.world, air: "air" }, earthOn)
  air.stepExactly(STEPS_PER_SECOND)
  const hammerInAir = air.getObject("hammer")!.position.y - hammerStart
  const featherInAir = air.getObject("feather")!.position.y - featherStart
  assert.ok(featherInAir < hammerInAir * 0.8, `air: hammer ${hammerInAir.toFixed(1)}, feather ${featherInAir.toFixed(1)}`)
  air.dispose()
})

test("the stepper runs fixed sub-steps from frame time and skips while paused", () => {
  const world = new GravitySwitchWorld(Matter, FREE_FALL, earthOn)
  assert.equal(world.step(1000 / 60), 2, "a 60 Hz frame is two sub-steps")
  assert.equal(world.step(0), 0)
  assert.equal(world.step(-5), 0)
  assert.ok(Math.abs(world.elapsedMs - 2 * PHYSICS_STEP_MS) < 1e-9)

  const bigFrame = world.step(5000)
  assert.ok(bigFrame <= Math.ceil(50 / PHYSICS_STEP_MS), "a stalled tab does not trigger a catch-up avalanche")

  world.pause()
  const y = world.getObject("ball")!.position.y
  assert.equal(world.step(100), 0)
  assert.equal(world.getObject("ball")!.position.y, y)
  world.resume()
  assert.ok(world.step(100) > 0)
  world.dispose()
})

test("the same room simulates identically every time", () => {
  const a = new GravitySwitchWorld(Matter, SANDBOX_WORLD, { preset: "mars", switchOn: true })
  const b = new GravitySwitchWorld(Matter, SANDBOX_WORLD, { preset: "mars", switchOn: true })
  a.stepExactly(STEPS_PER_SECOND * 4)
  b.stepExactly(STEPS_PER_SECOND * 4)
  assert.deepEqual(a.getObjects(), b.getObjects())
  assert.ok(a.getObject("ball-1")!.position.y > 250, "the ball has dropped from its start by now")
  a.dispose()
  b.dispose()
})

test("spawning respects the room limit, removal works, and spawned ids are unique", () => {
  const world = new GravitySwitchWorld(Matter, SANDBOX_WORLD, earthOff)
  const ids = new Set<string>()
  while (world.objectCount < MAX_SANDBOX_OBJECTS) {
    const id = world.spawn("ball", 100 + world.objectCount * 30, 100)
    assert.ok(id)
    ids.add(id!)
  }
  assert.equal(ids.size, MAX_SANDBOX_OBJECTS - SANDBOX_WORLD.objects.length)
  assert.equal(world.spawn("crate", 400, 400), null, "the room is full")
  const someId = [...ids][0]
  assert.equal(world.getObject(someId)!.spawned, true)
  assert.equal(world.remove(someId), true)
  assert.equal(world.remove(someId), false)
  assert.equal(world.objectCount, MAX_SANDBOX_OBJECTS - 1)
  assert.ok(world.spawn("feather", 400, 400), "there is room again")
  world.dispose()
})

test("dispose empties the engine and makes the world refuse further use", () => {
  const world = new GravitySwitchWorld(Matter, SANDBOX_WORLD, earthOn)
  world.dispose()
  assert.equal(world.isDisposed, true)
  assert.equal(world.bodyCount, 0)
  assert.throws(() => world.step(16), /disposed/)
  assert.throws(() => world.spawn("ball", 1, 1), /disposed/)
  assert.throws(() => world.reset(), /disposed/)
  world.dispose()
})

// ---------------------------------------------------------------------------
// Stage 2 acceptance: the seven required behaviours, each in its own test.
// ---------------------------------------------------------------------------

/** Two circles of very different mass, side by side, in an airless room. */
const HEAVY_AND_LIGHT: WorldConfig = {
  ...FREE_FALL,
  objects: [
    { id: "ball", kind: "ball", x: 380, y: 60 },
    { id: "bowling", kind: "bowling", x: 580, y: 60 },
  ],
}

/** A crate already sitting on the floor of a closed, airless room. */
const RESTING_CRATE: WorldConfig = {
  ...FREE_FALL,
  height: 540,
  objects: [{ id: "crate", kind: "crate", x: 480, y: 540 - 26 }],
}

test("1. an object accelerates downward under gravity", () => {
  const world = new GravitySwitchWorld(Matter, FREE_FALL, earthOn)
  const speeds: number[] = []
  for (let quarter = 0; quarter < 4; quarter++) {
    world.stepExactly(STEPS_PER_SECOND / 4)
    speeds.push(world.getObject("ball")!.velocity.y)
  }
  for (let i = 1; i < speeds.length; i++) {
    assert.ok(speeds[i] > speeds[i - 1], `speed keeps increasing: ${speeds.map((s) => s.toFixed(2)).join(" → ")}`)
  }
  assert.ok(speeds[0] > 0, "positive y is downward")
  const error = Math.abs(speeds[3] - GRAVITY_PRESETS.earth.g) / GRAVITY_PRESETS.earth.g
  assert.ok(error < 0.02, `after one second the ball falls at ${speeds[3].toFixed(2)} m/s, expected ${GRAVITY_PRESETS.earth.g}`)
  world.dispose()
})

test("2. an object with existing velocity keeps moving when gravity becomes zero", () => {
  const world = new GravitySwitchWorld(Matter, SANDBOX_WORLD, earthOff)
  // Low in the room, clear of the two objects that start in it.
  const id = world.spawn("ball", 120, 460, { velocity: { x: 3, y: 0 } })!
  const start = world.getObject(id)!.position
  world.stepExactly(STEPS_PER_SECOND * 2)
  const after = world.getObject(id)!
  assert.ok(Math.abs(after.velocity.x - 3) < 1e-9, `still 3 m/s, got ${after.velocity.x}`)
  assert.ok(Math.abs(after.velocity.y) < 1e-9, "no sideways drift")
  const expected = 3 * 2 * PIXELS_PER_METER
  assert.ok(Math.abs(after.position.x - start.x - expected) < 1, `travelled ${(after.position.x - start.x).toFixed(1)} px, expected ${expected}`)

  // And the mid-air case: falling fast, then the switch goes off.
  const fall = new GravitySwitchWorld(Matter, FREE_FALL, earthOn)
  fall.stepExactly(STEPS_PER_SECOND / 2)
  const speed = fall.getObject("ball")!.velocity.y
  fall.setGravity(earthOff)
  fall.stepExactly(STEPS_PER_SECOND / 2)
  assert.ok(Math.abs(fall.getObject("ball")!.velocity.y - speed) < 1e-9, "velocity is kept, only the acceleration stops")
  world.dispose()
  fall.dispose()
})

test("3. a stationary object does not start moving just because gravity is disabled", () => {
  // Floating in mid-air with nothing acting on it: exactly still.
  const floating = new GravitySwitchWorld(Matter, FREE_FALL, earthOff)
  const floatingStart = floating.getObject("ball")!
  floating.stepExactly(STEPS_PER_SECOND * 3)
  assert.deepEqual(floating.getObject("ball")!.position, floatingStart.position)
  assert.deepEqual(floating.getObject("ball")!.velocity, { x: 0, y: 0 })
  floating.dispose()

  // Resting on the floor under gravity, then the switch goes off: it stays put.
  const resting = new GravitySwitchWorld(Matter, RESTING_CRATE, earthOn)
  resting.stepExactly(STEPS_PER_SECOND * 2)
  const settled = resting.getObject("crate")!
  assert.ok(Math.hypot(settled.velocity.x, settled.velocity.y) < 0.01, "the crate has settled")
  resting.setGravity(earthOff)
  resting.stepExactly(STEPS_PER_SECOND * 3)
  const later = resting.getObject("crate")!
  const drift = Math.hypot(later.position.x - settled.position.x, later.position.y - settled.position.y)
  assert.ok(drift < 0.5, `the crate drifted ${drift.toFixed(3)} px after gravity went off`)
  assert.ok(Math.hypot(later.velocity.x, later.velocity.y) < 0.01, "and it is not moving")
  resting.dispose()
})

test("4. without air, objects of different mass fall exactly together", () => {
  const world = new GravitySwitchWorld(Matter, HEAVY_AND_LIGHT, earthOn)
  const ball = world.getObject("ball")!
  const bowling = world.getObject("bowling")!
  assert.ok(bowling.mass > ball.mass * 10, `bowling ${bowling.mass} kg vs ball ${ball.mass} kg`)
  world.stepExactly(STEPS_PER_SECOND)
  const ballFall = world.getObject("ball")!.position.y - ball.position.y
  const bowlingFall = world.getObject("bowling")!.position.y - bowling.position.y
  assert.ok(Math.abs(ballFall - bowlingFall) < 1e-9, `ball fell ${ballFall}, bowling ball fell ${bowlingFall}`)
  assert.ok(ballFall > 250, "and they did fall a long way")
  world.dispose()
})

test("5. Moon gravity produces less downward acceleration than Earth gravity", () => {
  const onEarth = fallAfterOneSecond({ preset: "earth", switchOn: true })
  const onMoon = fallAfterOneSecond({ preset: "moon", switchOn: true })
  assert.ok(onMoon < onEarth)
  const expectedRatio = GRAVITY_PRESETS.moon.g / GRAVITY_PRESETS.earth.g
  const ratio = onMoon / onEarth
  assert.ok(Math.abs(ratio - expectedRatio) < 0.01, `moon/earth fall ratio ${ratio.toFixed(3)}, expected ${expectedRatio.toFixed(3)}`)
  // Mars sits between the two, and Jupiter above Earth.
  const onMars = fallAfterOneSecond({ preset: "mars", switchOn: true })
  const onJupiter = fallAfterOneSecond({ preset: "jupiter", switchOn: true })
  assert.ok(onMoon < onMars && onMars < onEarth && onEarth < onJupiter)
})

test("6. reset restores the original simulation configuration", () => {
  const mission = getMission("drop-in")
  const world = new GravitySwitchWorld(Matter, mission.world, mission.gravity)
  const original = { objects: world.getObjects(), gravity: world.getGravity(), bodies: world.bodyCount }

  world.setGravity({ preset: "earth", switchOn: true })
  world.spawn("bowling", 300, 100)
  world.spawn("feather", 600, 100)
  world.stepExactly(STEPS_PER_SECOND * 3)
  assert.notDeepEqual(world.getObject("ball")!.position, original.objects[0].position, "the ball has fallen")

  world.reset()
  assert.deepEqual(world.getObjects(), original.objects)
  assert.deepEqual(world.getGravity(), original.gravity)
  assert.equal(world.bodyCount, original.bodies)
  assert.equal(world.elapsedMs, 0)

  // Running again from the reset state replays the same simulation.
  world.setGravity({ preset: "earth", switchOn: true })
  world.stepExactly(STEPS_PER_SECOND)
  const replay = world.getObject("ball")!.position
  const fresh = new GravitySwitchWorld(Matter, mission.world, { preset: "earth", switchOn: true })
  fresh.stepExactly(STEPS_PER_SECOND)
  assert.deepEqual(replay, fresh.getObject("ball")!.position)
  world.dispose()
  fresh.dispose()
})

test("7. restarting does not duplicate the physics engine", () => {
  const before = GravitySwitchWorld.liveCount
  const world = new GravitySwitchWorld(Matter, SANDBOX_WORLD, earthOn)
  assert.equal(GravitySwitchWorld.liveCount, before + 1)
  const { engine } = world

  world.stepExactly(30)
  world.reset()
  assert.equal(world.engine, engine, "reset reuses the engine")
  assert.equal(GravitySwitchWorld.liveCount, before + 1)

  const mission = getMission("bank-shot")
  world.load(mission.world, mission.gravity)
  assert.equal(world.engine, engine, "loading another room reuses the engine")
  assert.equal(GravitySwitchWorld.liveCount, before + 1)
  const walls = Object.values(mission.world.walls).filter(Boolean).length
  assert.equal(world.bodyCount, walls + mission.world.obstacles.length + mission.world.zones.length + mission.world.objects.length, "no bodies accumulate")

  world.dispose()
  assert.equal(GravitySwitchWorld.liveCount, before)
  world.dispose()
  assert.equal(GravitySwitchWorld.liveCount, before, "disposing twice does not go negative")
})

// ---------------------------------------------------------------------------
// Safeguards
// ---------------------------------------------------------------------------

test("a long rest never puts a body to sleep, so a gravity change always takes effect", () => {
  const resting = new GravitySwitchWorld(Matter, RESTING_CRATE, earthOn)
  resting.stepExactly(STEPS_PER_SECOND * 6)
  assert.equal(resting.engine.enableSleeping, false)
  for (const body of Matter.Composite.allBodies(resting.engine.world)) {
    assert.equal(body.isSleeping, false, body.label)
  }
  resting.setGravity(earthOff)
  assert.ok(resting.addVelocity("crate", { x: 0, y: -2 }))
  resting.stepExactly(STEPS_PER_SECOND / 2)
  assert.ok(resting.getObject("crate")!.position.y < 540 - 26 - 40, "a kick after a long rest moves the crate")
  resting.dispose()

  const floating = new GravitySwitchWorld(Matter, FREE_FALL, earthOff)
  floating.stepExactly(STEPS_PER_SECOND * 6)
  floating.setGravity(earthOn)
  floating.stepExactly(STEPS_PER_SECOND / 2)
  assert.ok(floating.getObject("ball")!.position.y > 60 + 50, "a floating object falls as soon as gravity returns")
  floating.dispose()
})

test("speed is capped so a fast object cannot leave a closed room", () => {
  const world = new GravitySwitchWorld(Matter, SANDBOX_WORLD, earthOff)
  assert.ok(world.setVelocity("ball-1", { x: 400, y: -300 }))
  world.stepExactly(1)
  const speed = Math.hypot(world.getObject("ball-1")!.velocity.x, world.getObject("ball-1")!.velocity.y)
  assert.ok(speed <= MAX_SPEED_MPS + 1e-9, `capped to ${speed.toFixed(2)} m/s`)
  assert.ok(speed > MAX_SPEED_MPS * 0.99, "and no slower than the cap")

  const { width, height } = SANDBOX_WORLD
  for (let i = 0; i < STEPS_PER_SECOND * 5; i += 10) {
    world.stepExactly(10)
    for (const object of world.getObjects()) {
      const { x, y } = object.position
      assert.ok(x > 0 && x < width && y > 0 && y < height, `${object.id} at (${x.toFixed(0)}, ${y.toFixed(0)}) after ${i} steps`)
    }
  }
  assert.equal(world.recoveries, 0, "the cap alone kept everything inside")
  world.dispose()
})

test("containment puts an object that is somehow outside a closed room back inside", () => {
  const world = new GravitySwitchWorld(Matter, SANDBOX_WORLD, earthOff)
  const id = world.spawn("ball", -300, 270, { velocity: { x: -5, y: 0 } })!
  world.stepExactly(1)
  const { position, velocity } = world.getObject(id)!
  assert.ok(position.x > 0 && position.x < 60, `moved back to x=${position.x.toFixed(1)}`)
  assert.deepEqual(velocity, { x: 0, y: 0 })
  assert.equal(world.recoveries, 1)
  world.dispose()
})

test("velocity primitives work in m/s and report mass in kg", () => {
  const world = new GravitySwitchWorld(Matter, SANDBOX_WORLD, earthOff)
  assert.equal(world.setVelocity("nobody", { x: 1, y: 0 }), false)
  assert.ok(world.setVelocity("crate-1", { x: 1.5, y: -0.5 }))
  const crate = world.getObject("crate-1")!
  assert.ok(Math.abs(crate.velocity.x - 1.5) < 1e-9 && Math.abs(crate.velocity.y + 0.5) < 1e-9)
  assert.ok(world.addVelocity("crate-1", { x: 0.5, y: 0.5 }))
  const kicked = world.getObject("crate-1")!
  assert.ok(Math.abs(kicked.velocity.x - 2) < 1e-9 && Math.abs(kicked.velocity.y) < 1e-9)
  assert.ok(Math.abs(crate.mass - 4) < 1e-9, `crate mass ${crate.mass} kg`)
  assert.ok(Math.abs(world.getObject("ball-1")!.mass - 0.45) < 1e-9)
  world.dispose()
})

test("air drag only exists in rooms that ask for it", () => {
  const vacuum = new GravitySwitchWorld(Matter, SANDBOX_WORLD, earthOff)
  for (const body of Matter.Composite.allBodies(vacuum.engine.world)) {
    if (body.label.startsWith("object:")) assert.equal(body.frictionAir, 0, body.label)
  }
  vacuum.dispose()
  const airy = new GravitySwitchWorld(Matter, { ...SANDBOX_WORLD, air: "air" }, earthOff)
  const ball = Matter.Composite.allBodies(airy.engine.world).find((body) => body.label === "object:ball-1")!
  assert.ok(ball.frictionAir > 0)
  airy.dispose()
})

test("a ball dropped straight down bounces straight up: no sideways drift, no spin", () => {
  const mission = getMission("drop-in")
  const world = new GravitySwitchWorld(Matter, mission.world, { preset: "earth", switchOn: true })
  let maxSpin = 0
  let maxSideways = 0
  for (let i = 0; i < STEPS_PER_SECOND * 8; i += 10) {
    world.stepExactly(10)
    const ball = world.getObject("ball")!
    maxSpin = Math.max(maxSpin, Math.abs(ball.angularVelocity))
    maxSideways = Math.max(maxSideways, Math.abs(ball.velocity.x))
  }
  const ball = world.getObject("ball")!
  assert.ok(Math.abs(ball.position.x - 480) < 0.5, `drifted to x=${ball.position.x.toFixed(2)}`)
  assert.ok(maxSpin < 0.05, `picked up ${maxSpin.toFixed(3)} rad/s of spin`)
  assert.ok(maxSideways < 0.01, `moved sideways at ${maxSideways.toFixed(3)} m/s`)
  assert.ok(ball.position.y > 515, "and it came to rest on the basket floor")
  assert.ok(Math.hypot(ball.velocity.x, ball.velocity.y) < 0.01, "at rest")
  world.dispose()
})

test("the room opens with motion: the ball drops and the bowling ball rolls", () => {
  const world = new GravitySwitchWorld(Matter, SANDBOX_WORLD, SANDBOX_DEFAULT_GRAVITY)
  const bowling = world.getObject("bowling-1")!
  assert.ok(Math.abs(bowling.velocity.x - -2.5) < 1e-9, "rolling left at 2.5 m/s from the first frame")
  const ballStart = world.getObject("ball-1")!.position.y
  world.stepExactly(STEPS_PER_SECOND / 2)
  assert.ok(world.getObject("ball-1")!.position.y > ballStart + 50, "the ball is falling")
  assert.ok(world.getObject("bowling-1")!.position.x < bowling.position.x - 60, "the bowling ball has rolled")
  world.dispose()
})

test("clearSpawned removes only what was added, and frees the slots", () => {
  const world = new GravitySwitchWorld(Matter, SANDBOX_WORLD, earthOff)
  const initial = world.getObjects().map((object) => object.id).sort()
  assert.equal(world.freeSlots, MAX_SANDBOX_OBJECTS - initial.length)
  world.spawn("feather", 100, 100)
  world.spawn("hammer", 200, 100)
  world.spawn("crate", 300, 100)
  assert.equal(world.objectCount, initial.length + 3)
  assert.equal(world.clearSpawned(), 3)
  assert.deepEqual(world.getObjects().map((object) => object.id).sort(), initial)
  assert.equal(world.freeSlots, MAX_SANDBOX_OBJECTS - initial.length)
  assert.equal(world.clearSpawned(), 0)
  assert.equal(world.bodyCount, 4 + initial.length, "no stray bodies left in the engine")
  world.dispose()
})

test("setPosition teleports and setAngularVelocity spins, both in real units", () => {
  const world = new GravitySwitchWorld(Matter, SANDBOX_WORLD, earthOff)
  assert.ok(world.setPosition("crate-1", { x: 200, y: 200 }))
  assert.deepEqual(world.getObject("crate-1")!.position, { x: 200, y: 200 })
  assert.equal(world.setPosition("nobody", { x: 1, y: 1 }), false)
  assert.ok(world.setAngularVelocity("crate-1", Math.PI))
  assert.ok(Math.abs(world.getObject("crate-1")!.angularVelocity - Math.PI) < 1e-9)
  const angleBefore = world.getObject("crate-1")!.angle
  world.stepExactly(STEPS_PER_SECOND / 2)
  const turned = world.getObject("crate-1")!.angle - angleBefore
  assert.ok(Math.abs(turned - Math.PI / 2) < 0.05, `turned ${turned.toFixed(3)} rad in half a second`)
  world.dispose()
})
