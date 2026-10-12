// Gravity Switch: Zero-G Lab — objective detection tests.
//
// Unit tests feed hand-made samples to the tracker so every rule is spelled
// out; the physics-backed tests at the end run the real engine through the
// development scenario and through Drop In, which is how the framework is
// proven end to end without a browser.
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import { PHYSICS_STEP_MS, REST_HOLD_MS } from "./gravity-switch-config.ts"
import { DEV_MISSION, getMission } from "./gravity-switch-missions.ts"
import {
  MissionTracker,
  type TrackerEvent,
  type WorldSample,
  gravityMatches,
  objectInZone,
  sideLeftThrough,
} from "./gravity-switch-objectives.ts"
import { GravitySwitchWorld, resolveMatterModule } from "./gravity-switch-physics.ts"
import type {
  FailCondition,
  GravityState,
  MissionDefinition,
  Objective,
  ObjectState,
  WorldConfig,
} from "./gravity-switch-types.ts"

const Matter = resolveMatterModule(await import("matter-js"))

// --- fixtures ---------------------------------------------------------------

const ROOM: WorldConfig = {
  width: 960,
  height: 540,
  walls: { floor: true, ceiling: true, left: false, right: false },
  air: "vacuum",
  obstacles: [{ id: "bumper", kind: "bumper", x: 800, y: 100, width: 24, height: 300 }],
  zones: [
    { id: "goal", kind: "goal", x: 400, y: 400, width: 120, height: 120 },
    { id: "lava", kind: "hazard", x: 0, y: 0, width: 960, height: 30 },
  ],
  objects: [
    { id: "ball", kind: "ball", x: 100, y: 100 },
    { id: "hammer", kind: "hammer", x: 300, y: 100 },
    { id: "feather", kind: "feather", x: 500, y: 100 },
  ],
}
const OFF: GravityState = { preset: "earth", switchOn: false }
const ON: GravityState = { preset: "earth", switchOn: true }

function obj(id: string, x: number, y: number, vx = 0, vy = 0, kind: ObjectState["kind"] = "ball"): ObjectState {
  return { id, kind, position: { x, y }, velocity: { x: vx, y: vy }, angle: 0, angularVelocity: 0, mass: 1, spawned: false }
}

function mission(objectives: Objective[], extra: Partial<MissionDefinition> = {}): MissionDefinition {
  return {
    id: "dev-check",
    text: {
      name: { en: "t", es: "t", zh: "t", pt: "t" },
      objective: { en: "t", es: "t", zh: "t", pt: "t" },
      learning: { en: "t", es: "t", zh: "t", pt: "t" },
      hint: { en: "t", es: "t", zh: "t", pt: "t" },
      concept: { en: "t", es: "t", zh: "t", pt: "t" },
      success: { en: "t", es: "t", zh: "t", pt: "t" },
    },
    world: ROOM,
    gravity: OFF,
    allowedPresets: ["earth"],
    switchLocked: false,
    allowPush: true,
    objectives,
    ordered: true,
    failConditions: [],
    ...extra,
  }
}

function sample(partial: Partial<WorldSample> = {}): WorldSample {
  return { objects: [], contacts: [], gravity: OFF, elapsedMs: 0, flips: 0, room: ROOM, ...partial }
}

const types = (events: TrackerEvent[]) => events.map((event) => event.type)

// --- helpers ----------------------------------------------------------------

test("geometry helpers", () => {
  assert.ok(objectInZone(obj("b", 450, 450), ROOM.zones[0]))
  assert.equal(objectInZone(obj("b", 399, 450), ROOM.zones[0]), false)
  assert.equal(sideLeftThrough(obj("b", 10, 100), ROOM), null, "partly out is still in")
  assert.equal(sideLeftThrough(obj("b", -19, 100), ROOM), "left")
  assert.equal(sideLeftThrough(obj("b", 979, 100), ROOM), "right")
  assert.equal(sideLeftThrough(obj("b", 100, -19), ROOM), "ceiling")
  assert.equal(sideLeftThrough(obj("b", 100, 559), ROOM), "floor")
  assert.ok(gravityMatches(undefined, ON))
  assert.ok(gravityMatches({ switchOn: true }, ON))
  assert.equal(gravityMatches({ switchOn: false }, ON), false)
  assert.ok(gravityMatches({ presets: ["moon", "earth"] }, ON))
  assert.equal(gravityMatches({ presets: ["moon"] }, ON), false)
})

// --- objective kinds --------------------------------------------------------

test("enter-zone completes when the object's centre is inside or it touches the sensor", () => {
  const t = new MissionTracker(mission([{ kind: "enter-zone", objectId: "ball", zoneId: "goal" }]))
  assert.deepEqual(t.update(sample({ objects: [obj("ball", 100, 100)] }), 16), [])
  assert.deepEqual(t.snapshot().statuses[0].state, "active")
  const events = t.update(sample({ objects: [obj("ball", 460, 460)] }), 16)
  assert.deepEqual(types(events), ["objective-complete", "mission-complete"])
  assert.ok(t.finished)
  assert.deepEqual(t.update(sample({ objects: [obj("ball", 460, 460)] }), 16), [], "finished trackers are silent")

  const byContact = new MissionTracker(mission([{ kind: "enter-zone", objectId: "ball", zoneId: "goal" }]))
  const grazing = sample({ objects: [obj("ball", 395, 450)], contacts: [{ a: "zone:goal", b: "object:ball" }] })
  assert.deepEqual(types(byContact.update(grazing, 16)), ["objective-complete", "mission-complete"])
})

test("a gravity requirement on a zone objective must hold at the moment it completes", () => {
  const t = new MissionTracker(mission([{ kind: "enter-zone", objectId: "ball", zoneId: "goal", gravity: { switchOn: true } }]))
  assert.deepEqual(t.update(sample({ objects: [obj("ball", 460, 460)], gravity: OFF }), 16), [])
  assert.deepEqual(types(t.update(sample({ objects: [obj("ball", 460, 460)], gravity: ON }), 16)), ["objective-complete", "mission-complete"])
})

test("rest-in-zone needs the object inside and still for the hold time", () => {
  const t = new MissionTracker(mission([{ kind: "rest-in-zone", objectId: "ball", zoneId: "goal" }]))
  const still = sample({ objects: [obj("ball", 460, 500, 0.05, 0)] })
  assert.deepEqual(t.update(still, REST_HOLD_MS * 0.8), [])
  assert.ok(Math.abs(t.snapshot().statuses[0].progress - 0.8) < 1e-9, "progress reports the hold")
  const moving = sample({ objects: [obj("ball", 460, 500, 2, 0)] })
  assert.deepEqual(t.update(moving, 16), [])
  assert.equal(t.snapshot().statuses[0].progress, 0, "moving resets the hold")
  assert.deepEqual(t.update(still, REST_HOLD_MS * 0.6), [])
  assert.deepEqual(types(t.update(still, REST_HOLD_MS * 0.5)), ["objective-complete", "mission-complete"])

  const outside = new MissionTracker(mission([{ kind: "rest-in-zone", objectId: "ball", zoneId: "goal" }]))
  assert.deepEqual(outside.update(sample({ objects: [obj("ball", 100, 500)] }), REST_HOLD_MS * 2), [], "still but elsewhere")
})

test("hover-in-zone accumulates time inside and resets when the object leaves or gravity breaks the rule", () => {
  const t = new MissionTracker(
    mission([{ kind: "hover-in-zone", objectId: "ball", zoneId: "goal", durationMs: 1000, gravity: { switchOn: false } }]),
  )
  const inside = sample({ objects: [obj("ball", 460, 460, 3, 3)], gravity: OFF })
  assert.deepEqual(t.update(inside, 600), [])
  assert.ok(Math.abs(t.snapshot().statuses[0].progress - 0.6) < 1e-9)
  assert.deepEqual(t.update(sample({ objects: [obj("ball", 100, 100)] }), 16), [])
  assert.equal(t.snapshot().statuses[0].progress, 0, "leaving resets")
  assert.deepEqual(t.update(inside, 700), [])
  assert.deepEqual(t.update(sample({ objects: [obj("ball", 460, 460)], gravity: ON }), 16), [])
  assert.equal(t.snapshot().statuses[0].progress, 0, "gravity on breaks the hold")
  assert.deepEqual(t.update(inside, 700), [])
  assert.deepEqual(types(t.update(inside, 400)), ["objective-complete", "mission-complete"])
})

test("bounce-off fires on a contact with that obstacle and nothing else", () => {
  const t = new MissionTracker(mission([{ kind: "bounce-off", objectId: "ball", obstacleId: "bumper" }]))
  assert.deepEqual(t.update(sample({ contacts: [{ a: "object:ball", b: "zone:goal" }] }), 16), [])
  assert.deepEqual(t.update(sample({ contacts: [{ a: "object:hammer", b: "obstacle:bumper" }] }), 16), [], "wrong object")
  assert.deepEqual(t.update(sample({ contacts: [{ a: "object:ball", b: "obstacle:other" }] }), 16), [], "wrong obstacle")
  assert.deepEqual(types(t.update(sample({ contacts: [{ a: "obstacle:bumper", b: "object:ball" }] }), 16)), ["objective-complete", "mission-complete"])
})

test("land-together: within tolerance wins, apart loses", () => {
  const together = () => new MissionTracker(mission([{ kind: "land-together", objectIds: ["hammer", "feather"], toleranceMs: 150 }]))
  const floor = (...ids: string[]) => ids.map((id) => ({ a: "wall:floor", b: `object:${id}` }))

  const sameFrame = together()
  assert.deepEqual(types(sameFrame.update(sample({ contacts: floor("hammer", "feather"), elapsedMs: 1000 }), 16)), ["objective-complete", "mission-complete"])

  const close = together()
  assert.deepEqual(close.update(sample({ contacts: floor("hammer"), elapsedMs: 1000 }), 16), [])
  assert.deepEqual(close.update(sample({ contacts: floor("hammer"), elapsedMs: 1050 }), 16), [], "the first keeps touching")
  assert.deepEqual(types(close.update(sample({ contacts: floor("hammer", "feather"), elapsedMs: 1100 }), 16)), ["objective-complete", "mission-complete"])

  const late = together()
  assert.deepEqual(late.update(sample({ contacts: floor("feather"), elapsedMs: 1000 }), 16), [])
  assert.deepEqual(late.update(sample({ contacts: floor("feather"), elapsedMs: 1100 }), 16), [])
  assert.deepEqual(late.update(sample({ contacts: floor("feather"), elapsedMs: 1200 }), 16), [{ type: "mission-failed", reason: "landed-apart" }])
  assert.ok(late.finished)

  const apart = together()
  apart.update(sample({ contacts: floor("hammer"), elapsedMs: 1000 }), 16)
  assert.deepEqual(apart.update(sample({ contacts: floor("hammer", "feather"), elapsedMs: 1400 }), 16), [{ type: "mission-failed", reason: "landed-apart" }])
})

test("exit: leaving through the named open side wins; any other open side is out of bounds", () => {
  const def = mission([{ kind: "exit", objectId: "ball", side: "left", gravity: { switchOn: false } }], {
    failConditions: [{ kind: "out-of-bounds" }],
  })
  const t = new MissionTracker(def)
  assert.deepEqual(t.update(sample({ objects: [obj("ball", 5, 100)] }), 16), [], "still partly inside")
  assert.deepEqual(t.update(sample({ objects: [obj("ball", -30, 100)], gravity: ON }), 16), [{ type: "mission-failed", reason: "out-of-bounds" }], "left with gravity on is not the required exit, so it counts as escaping")

  const good = new MissionTracker(def)
  assert.deepEqual(types(good.update(sample({ objects: [obj("ball", -30, 100)], gravity: OFF }), 16)), ["objective-complete", "mission-complete"])

  const wrongSide = new MissionTracker(def)
  assert.deepEqual(wrongSide.update(sample({ objects: [obj("ball", 990, 100)] }), 16), [{ type: "mission-failed", reason: "out-of-bounds" }])

  const early = new MissionTracker(
    mission(
      [
        { kind: "bounce-off", objectId: "ball", obstacleId: "bumper" },
        { kind: "exit", objectId: "ball", side: "left" },
      ],
      { failConditions: [{ kind: "out-of-bounds" }] },
    ),
  )
  assert.deepEqual(early.update(sample({ objects: [obj("ball", -30, 100)] }), 16), [{ type: "mission-failed", reason: "out-of-bounds" }], "leaving before that step is live is an escape")

  const otherObject = new MissionTracker(def)
  assert.deepEqual(otherObject.update(sample({ objects: [obj("ball", 100, 100), obj("hammer", -40, 100, 0, 0, "hammer")] }), 16), [{ type: "mission-failed", reason: "out-of-bounds" }], "a different object escaping is still a loss")
})

test("answer: only the live question accepts an answer; wrong ends the attempt", () => {
  const def = mission([
    { kind: "enter-zone", objectId: "ball", zoneId: "goal" },
    { kind: "answer", prompt: { en: "?", es: "?", zh: "?", pt: "?" }, choices: [{ id: "a", label: { en: "a", es: "a", zh: "a", pt: "a" } }, { id: "b", label: { en: "b", es: "b", zh: "b", pt: "b" } }], correctId: "b" },
  ])
  const t = new MissionTracker(def)
  assert.equal(t.currentQuestion(), null)
  assert.deepEqual(t.answer("b"), [], "no question yet")
  assert.deepEqual(types(t.update(sample({ objects: [obj("ball", 460, 460)] }), 16)), ["objective-complete"])
  assert.equal(t.currentQuestion()?.index, 1)
  assert.equal(t.currentIndex, 1)
  assert.deepEqual(t.answer("zzz"), [], "unknown choices are ignored")
  assert.deepEqual(t.update(sample({ objects: [obj("ball", 460, 460)] }), 5000), [], "physics cannot complete a question")
  assert.deepEqual(types(t.answer("b")), ["objective-complete", "mission-complete"])

  const wrong = new MissionTracker(def)
  wrong.update(sample({ objects: [obj("ball", 460, 460)] }), 16)
  assert.deepEqual(wrong.answer("a"), [{ type: "mission-failed", reason: "wrong-answer" }])
  assert.equal(wrong.currentQuestion(), null)
})

test("moving: fires once the object is fast enough under the required gravity", () => {
  const t = new MissionTracker(mission([{ kind: "moving", objectId: "ball", minSpeed: 1, gravity: { switchOn: false } }]))
  assert.deepEqual(t.update(sample({ objects: [obj("ball", 100, 100, 0.5, 0)] }), 16), [])
  assert.deepEqual(t.update(sample({ objects: [obj("ball", 100, 100, 2, 0)], gravity: ON }), 16), [], "gravity on does not count here")
  assert.deepEqual(types(t.update(sample({ objects: [obj("ball", 100, 100, 0, -2)], gravity: OFF }), 16)), ["objective-complete", "mission-complete"])
})

test("gravity-flip: only the frame of the flip counts, and the object must be moving fast enough then", () => {
  const t = new MissionTracker(mission([{ kind: "gravity-flip", switchOn: false, objectId: "ball", minSpeed: 1.5 }]))
  assert.deepEqual(t.update(sample({ objects: [obj("ball", 100, 100, 0, 3)], gravity: OFF }), 16), [], "already off on the first frame is not a flip")
  assert.deepEqual(t.update(sample({ objects: [obj("ball", 100, 100, 0, 3)], gravity: ON }), 16), [])
  assert.deepEqual(t.update(sample({ objects: [obj("ball", 100, 100, 0, 0.5)], gravity: OFF }), 16), [], "flipped, but the ball was hardly moving")
  assert.deepEqual(t.update(sample({ objects: [obj("ball", 100, 100, 0, 3)], gravity: ON }), 16), [])
  assert.deepEqual(types(t.update(sample({ objects: [obj("ball", 100, 100, 0, 3)], gravity: OFF }), 16)), ["objective-complete", "mission-complete"])

  const any = new MissionTracker(mission([{ kind: "gravity-flip", switchOn: true }]))
  any.update(sample({ gravity: OFF }), 16)
  assert.deepEqual(types(any.update(sample({ gravity: ON }), 16)), ["objective-complete", "mission-complete"])
})

// --- ordering, fails, snapshots --------------------------------------------

test("ordered missions take steps one at a time; unordered ones in any order", () => {
  const steps: Objective[] = [
    { kind: "bounce-off", objectId: "ball", obstacleId: "bumper" },
    { kind: "enter-zone", objectId: "ball", zoneId: "goal" },
  ]
  const ordered = new MissionTracker(mission(steps, { ordered: true }))
  assert.deepEqual(ordered.snapshot().statuses.map((status) => status.state), ["active", "pending"])
  assert.deepEqual(ordered.update(sample({ objects: [obj("ball", 460, 460)] }), 16), [], "step 2 cannot complete before step 1")
  assert.deepEqual(types(ordered.update(sample({ contacts: [{ a: "object:ball", b: "obstacle:bumper" }] }), 16)), ["objective-complete"])
  assert.deepEqual(ordered.snapshot().statuses.map((status) => status.state), ["done", "active"])
  assert.equal(ordered.currentIndex, 1)
  assert.deepEqual(types(ordered.update(sample({ objects: [obj("ball", 460, 460)] }), 16)), ["objective-complete", "mission-complete"])

  const anyOrder = new MissionTracker(mission(steps, { ordered: false }))
  assert.deepEqual(anyOrder.snapshot().statuses.map((status) => status.state), ["active", "active"])
  assert.equal(anyOrder.currentIndex, null)
  assert.deepEqual(types(anyOrder.update(sample({ objects: [obj("ball", 460, 460)] }), 16)), ["objective-complete"])
  assert.deepEqual(anyOrder.snapshot().statuses.map((status) => status.state), ["active", "done"])
  assert.deepEqual(types(anyOrder.update(sample({ contacts: [{ a: "object:ball", b: "obstacle:bumper" }] }), 16)), ["objective-complete", "mission-complete"])
})

test("fail conditions: time limit, switch limit, hazards", () => {
  const withFails = (failConditions: FailCondition[]) =>
    new MissionTracker(mission([{ kind: "enter-zone", objectId: "ball", zoneId: "goal" }], { failConditions }))

  const timed = withFails([{ kind: "time-limit", ms: 5000 }])
  assert.deepEqual(timed.update(sample({ elapsedMs: 5000 }), 16), [], "exactly the limit is still fine")
  assert.deepEqual(timed.update(sample({ elapsedMs: 5001 }), 16), [{ type: "mission-failed", reason: "time-limit" }])

  const flips = withFails([{ kind: "switch-limit", maxFlips: 2 }])
  assert.deepEqual(flips.update(sample({ flips: 2 }), 16), [])
  assert.deepEqual(flips.update(sample({ flips: 3 }), 16), [{ type: "mission-failed", reason: "switch-limit" }])

  const lava = withFails([{ kind: "touch-hazard", zoneId: "lava" }])
  assert.deepEqual(lava.update(sample({ contacts: [{ a: "object:hammer", b: "zone:lava" }] }), 16), [{ type: "mission-failed", reason: "touch-hazard" }])

  const onlyBall = withFails([{ kind: "touch-hazard", zoneId: "lava", objectId: "ball" }])
  assert.deepEqual(onlyBall.update(sample({ contacts: [{ a: "object:hammer", b: "zone:lava" }] }), 16), [], "the hammer may touch it")
  assert.deepEqual(onlyBall.update(sample({ contacts: [{ a: "zone:lava", b: "object:ball" }] }), 16), [{ type: "mission-failed", reason: "touch-hazard" }])

  const winFirst = withFails([{ kind: "time-limit", ms: 100 }])
  assert.deepEqual(types(winFirst.update(sample({ objects: [obj("ball", 460, 460)], elapsedMs: 999 }), 16)), ["objective-complete", "mission-complete"], "a win on the same frame beats the clock")
})

// --- physics-backed ---------------------------------------------------------

/** Run a mission on the real engine, feeding the tracker every frame. */
function runOnEngine(
  def: MissionDefinition,
  gravity: GravityState,
  maxSeconds: number,
  /** Reacts to an event the way a player would; any events it causes are logged right after. */
  onEvent?: (event: TrackerEvent, world: GravitySwitchWorld, tracker: MissionTracker) => TrackerEvent[] | void,
) {
  const world = new GravitySwitchWorld(Matter, def.world, gravity)
  const tracker = new MissionTracker(def)
  const log: TrackerEvent[] = []
  const frameMs = PHYSICS_STEP_MS * 2
  let frames = 0
  while (!tracker.finished && world.elapsedMs < maxSeconds * 1000) {
    world.stepExactly(2)
    frames += 1
    const events = tracker.update(
      {
        objects: world.getObjects(),
        contacts: world.takeContacts(),
        gravity: world.getGravity(),
        elapsedMs: world.elapsedMs,
        flips: 0,
        room: def.world,
      },
      frameMs,
    )
    for (const event of events) {
      log.push(event)
      const caused = onEvent?.(event, world, tracker)
      if (caused) log.push(...caused)
    }
  }
  const seconds = world.elapsedMs / 1000
  world.dispose()
  return { log, seconds, frames }
}

test("the development scenario completes every objective kind in order on the real engine", () => {
  const { log, seconds } = runOnEngine(DEV_MISSION, DEV_MISSION.gravity, 25, (event, _world, tracker) => {
    // The question becomes live right after the bumper; a human would answer it here.
    if (event.type === "objective-complete" && event.index === 1) return tracker.answer("left")
  })
  assert.deepEqual(
    log,
    [
      { type: "objective-complete", index: 0 },
      { type: "objective-complete", index: 1 },
      { type: "objective-complete", index: 2 },
      { type: "objective-complete", index: 3 },
      { type: "objective-complete", index: 4 },
      { type: "mission-complete" },
    ],
    `events: ${JSON.stringify(log)} after ${seconds.toFixed(1)}s`,
  )
  assert.ok(seconds < 15, `took ${seconds.toFixed(1)} s`)
})

test("the development scenario fails cleanly on a wrong answer", () => {
  const { log } = runOnEngine(DEV_MISSION, DEV_MISSION.gravity, 25, (event, _world, tracker) => {
    if (event.type === "objective-complete" && event.index === 1) return tracker.answer("right")
  })
  assert.deepEqual(log.slice(-1), [{ type: "mission-failed", reason: "wrong-answer" }])
})

test("Drop In is won by physics alone once gravity is on", () => {
  const dropIn = getMission("drop-in")
  const { log, seconds } = runOnEngine(dropIn, { preset: "earth", switchOn: true }, 15)
  assert.deepEqual(types(log), ["objective-complete", "mission-complete"])
  assert.ok(seconds < 8, `the ball settled after ${seconds.toFixed(1)} s`)
  assert.ok(seconds > 1, "it did have to fall first")
})

test("Drop In is not won while gravity stays off", () => {
  const dropIn = getMission("drop-in")
  const { log } = runOnEngine(dropIn, dropIn.gravity, 5)
  assert.deepEqual(log, [])
})

test("Hammer and Feather lands together on the Moon", () => {
  const def = getMission("hammer-and-feather")
  const { log } = runOnEngine(def, { preset: "moon", switchOn: true }, 15)
  assert.deepEqual(types(log), ["objective-complete", "mission-complete"])
})
