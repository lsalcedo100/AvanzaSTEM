// Gravity Switch: Zero-G Lab — mission and configuration validation.
//
// The six shipped missions must pass their own validator, every mission string
// must exist in all four languages, and the validator must actually catch the
// mistakes it claims to.
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import {
  GRAVITY_PRESETS,
  GRAVITY_PRESET_ORDER,
  OBJECT_ORDER,
  OBJECT_SPECS,
  PIXELS_PER_METER,
  ROOM_HEIGHT,
  ROOM_WIDTH,
  SANDBOX_DEFAULT_GRAVITY,
  SANDBOX_WORLD,
  effectiveGravity,
  isGravityPresetId,
  isObjectKind,
} from "./gravity-switch-config.ts"
import {
  DEV_MISSION,
  MISSIONS,
  MISSION_IDS,
  getMission,
  isMissionId,
  missionIndex,
  nextMissionId,
  validateMission,
  validateMissions,
} from "./gravity-switch-missions.ts"
import type { MissionDefinition, MissionId } from "./gravity-switch-types.ts"

const LANGUAGES = ["en", "es", "zh", "pt"] as const
const EXPECTED_ORDER: MissionId[] = ["drop-in", "hang-time", "straight-up", "hammer-and-feather", "bank-shot", "moon-shot"]

/** A deep-enough copy of a mission to break on purpose. */
function clone(mission: MissionDefinition): MissionDefinition {
  return structuredClone(mission)
}

test("the six missions ship in the expected order and all validate", () => {
  assert.deepEqual(MISSION_IDS, EXPECTED_ORDER)
  assert.deepEqual(validateMissions(), [])
  for (const mission of MISSIONS) assert.deepEqual(validateMission(mission), [], mission.id)
})

test("every mission string exists in every language", () => {
  for (const mission of MISSIONS) {
    for (const field of ["name", "objective", "learning", "hint", "concept", "success"] as const) {
      for (const language of LANGUAGES) {
        const value = mission.text[field][language]
        assert.equal(typeof value, "string", `${mission.id}.${field}.${language}`)
        assert.ok(value.trim().length > 0, `${mission.id}.${field}.${language} is empty`)
      }
    }
  }
})

test("mission lookups", () => {
  for (const [index, id] of MISSION_IDS.entries()) {
    assert.equal(getMission(id).id, id)
    assert.equal(missionIndex(id), index)
    assert.equal(nextMissionId(id), MISSION_IDS[index + 1] ?? null)
    assert.ok(isMissionId(id))
  }
  assert.equal(isMissionId("drop-out"), false)
  assert.throws(() => getMission("drop-out" as MissionId), /Unknown Gravity Switch mission/)
})

test("mission worlds share the room size and keep every object inside it", () => {
  for (const mission of MISSIONS) {
    assert.equal(mission.world.width, ROOM_WIDTH, mission.id)
    assert.equal(mission.world.height, ROOM_HEIGHT, mission.id)
    assert.ok(mission.world.objects.length > 0, `${mission.id} has no objects`)
    for (const object of mission.world.objects) {
      assert.ok(isObjectKind(object.kind), `${mission.id}: ${object.kind}`)
    }
  }
})

test("the progression gets harder: later missions add interaction and choice", () => {
  const dropIn = getMission("drop-in")
  assert.equal(dropIn.allowPush, false)
  assert.deepEqual(dropIn.allowedPresets, ["earth"])
  assert.equal(dropIn.gravity.switchOn, false, "the first mission is solved by flipping the switch on")

  const hammer = getMission("hammer-and-feather")
  assert.equal(hammer.world.air, "vacuum", "the Moon has no air")
  assert.equal(hammer.gravity.preset, "moon")

  assert.ok(hammer.prediction, "it asks for a guess before the drop")

  const bankShot = getMission("bank-shot")
  assert.equal(bankShot.ordered, true)
  assert.deepEqual(bankShot.objectives.map((objective) => objective.kind), ["bounce-off", "enter-zone"])
  assert.ok(bankShot.world.obstacles.some((obstacle) => obstacle.kind === "bumper" && obstacle.angle), "an angled bumper")

  const moonShot = getMission("moon-shot")
  assert.ok(moonShot.allowedPresets.length > 1, "the last mission lets the player choose a planet")
  assert.equal(moonShot.switchLocked, true)
  assert.ok(moonShot.world.launchers?.[0].angle, "an angled launcher")
})

test("the validator catches a dangling object reference", () => {
  const broken = clone(getMission("drop-in"))
  broken.objectives = [{ kind: "rest-in-zone", objectId: "balloon", zoneId: "basket" }]
  const problems = validateMission(broken)
  assert.equal(problems.length, 1)
  assert.match(problems[0], /missing object "balloon"/)
})

test("the validator catches a dangling zone or obstacle reference and wrong zone kinds", () => {
  const noZone = clone(getMission("drop-in"))
  noZone.objectives = [{ kind: "enter-zone", objectId: "ball", zoneId: "hoop" }]
  assert.match(validateMission(noZone).join("\n"), /missing zone "hoop"/)

  const noBumper = clone(getMission("bank-shot"))
  noBumper.objectives = [{ kind: "bounce-off", objectId: "ball", obstacleId: "trampoline" }]
  assert.match(validateMission(noBumper).join("\n"), /missing obstacle "trampoline"/)

  const wrongKind = clone(getMission("drop-in"))
  wrongKind.world.zones[0].kind = "hazard"
  assert.match(validateMission(wrongKind).join("\n"), /needs a goal or target zone/)
})

test("the validator catches gravity settings that disagree with themselves", () => {
  const notAllowed = clone(getMission("drop-in"))
  notAllowed.gravity.preset = "moon"
  assert.match(validateMission(notAllowed).join("\n"), /starting preset "moon" is not in allowedPresets/)

  const empty = clone(getMission("drop-in"))
  empty.allowedPresets = []
  assert.match(validateMission(empty).join("\n"), /allowedPresets must not be empty/)

  const duplicated = clone(getMission("moon-shot"))
  duplicated.allowedPresets = ["moon", "moon"]
  assert.match(validateMission(duplicated).join("\n"), /duplicate allowed preset "moon"/)
})

test("the validator catches duplicate ids and geometry outside the room", () => {
  const dupe = clone(getMission("hammer-and-feather"))
  dupe.world.objects[1].id = "hammer"
  assert.match(validateMission(dupe).join("\n"), /duplicate object id "hammer"/)

  const outside = clone(getMission("drop-in"))
  outside.world.objects[0].y = -20
  assert.match(validateMission(outside).join("\n"), /starts outside the room/)

  const zoneOutside = clone(getMission("drop-in"))
  zoneOutside.world.zones[0].x = ROOM_WIDTH - 10
  assert.match(validateMission(zoneOutside).join("\n"), /zone "basket" is not inside the room/)

  const obstacleOutside = clone(getMission("bank-shot"))
  obstacleOutside.world.obstacles[0].height = 10_000
  assert.match(validateMission(obstacleOutside).join("\n"), /obstacle "bumper" is not inside the room/)
})

test("the validator catches objectives and fail conditions that can never work", () => {
  const noObjectives = clone(getMission("drop-in"))
  noObjectives.objectives = []
  assert.match(validateMission(noObjectives).join("\n"), /at least one objective/)

  const zeroHover = clone(getMission("hang-time"))
  zeroHover.objectives = [{ kind: "hover-in-zone", objectId: "ball", zoneId: "ring", durationMs: 0 }]
  assert.match(validateMission(zeroHover).join("\n"), /positive duration/)

  const sameObject = clone(getMission("hammer-and-feather"))
  sameObject.objectives = [{ kind: "land-together", objectIds: ["hammer", "hammer"], toleranceMs: 100 }]
  assert.match(validateMission(sameObject).join("\n"), /two different objects/)

  const closedRoomEscape = clone(getMission("drop-in"))
  closedRoomEscape.failConditions = [{ kind: "out-of-bounds" }]
  assert.match(validateMission(closedRoomEscape).join("\n"), /fully closed room/)

  const openRoomEscape = clone(closedRoomEscape)
  openRoomEscape.world.walls = { ...openRoomEscape.world.walls, ceiling: false }
  assert.deepEqual(validateMission(openRoomEscape), [], "an open side makes out-of-bounds reachable")

  const lockedLimit = clone(getMission("moon-shot"))
  lockedLimit.failConditions = [{ kind: "switch-limit", maxFlips: 2 }]
  assert.match(validateMission(lockedLimit).join("\n"), /pointless when the switch is locked/)

  const badTime = clone(getMission("drop-in"))
  badTime.failConditions = [{ kind: "time-limit", ms: -5 }]
  assert.match(validateMission(badTime).join("\n"), /positive time/)

  const hazardMissing = clone(getMission("drop-in"))
  hazardMissing.failConditions = [{ kind: "touch-hazard", zoneId: "lava" }]
  assert.match(validateMission(hazardMissing).join("\n"), /missing zone "lava"/)
})

test("the development scenario validates, resolves by id, and stays out of the progression", () => {
  assert.deepEqual(validateMission(DEV_MISSION), [])
  assert.equal(getMission("dev-check"), DEV_MISSION)
  assert.ok(isMissionId("dev-check"))
  assert.equal(MISSION_IDS.includes("dev-check"), false)
  assert.equal(missionIndex("dev-check"), -1)
  assert.equal(nextMissionId("dev-check"), null)
  assert.deepEqual(
    DEV_MISSION.objectives.map((objective) => objective.kind),
    ["enter-zone", "bounce-off", "answer", "hover-in-zone", "exit"],
    "it covers every objective kind except the two Drop In and Hammer and Feather already cover",
  )
  for (const mission of MISSIONS) {
    for (const objective of mission.objectives) {
      if (objective.label) for (const language of LANGUAGES) assert.ok(objective.label[language].trim().length > 0)
      if (objective.kind === "answer") {
        for (const language of LANGUAGES) assert.ok(objective.prompt[language].trim().length > 0)
        for (const choice of objective.choices) for (const language of LANGUAGES) assert.ok(choice.label[language].trim().length > 0)
      }
    }
  }
})

test("the validator checks launchers: inside the room, a real object, resting on the pad", () => {
  const base = clone(getMission("straight-up"))
  const spring = base.world.launchers![0]

  const outside = clone(base)
  outside.world.launchers![0].x = 2000
  assert.match(validateMission(outside).join("\n"), /launcher "spring" is not inside the room/)

  const ghost = clone(base)
  ghost.world.launchers![0].objectId = "rocket"
  assert.match(validateMission(ghost).join("\n"), /missing object "rocket"/)

  const floating = clone(base)
  floating.world.objects[0].y = spring.y - 60
  assert.match(validateMission(floating).join("\n"), /does not rest on launcher "spring"/)

  const beside = clone(base)
  beside.world.objects[0].x = spring.x - 50
  assert.match(validateMission(beside).join("\n"), /is not above launcher "spring"/)

  const limp = clone(base)
  limp.world.launchers![0].speed = 0
  assert.match(validateMission(limp).join("\n"), /needs a positive speed/)
})

test("the validator catches exits through closed sides and malformed questions", () => {
  const closedExit = clone(DEV_MISSION)
  closedExit.world.walls = { ...closedExit.world.walls, left: true }
  closedExit.failConditions = closedExit.failConditions.filter((condition) => condition.kind !== "out-of-bounds")
  assert.match(validateMission(closedExit).join("\n"), /needs the left side to be open/)

  const oneChoice = clone(DEV_MISSION)
  const question = oneChoice.objectives[2]
  assert.equal(question.kind, "answer")
  if (question.kind === "answer") question.choices = [question.choices[0]]
  assert.match(validateMission(oneChoice).join("\n"), /at least two choices/)

  const badCorrect = clone(DEV_MISSION)
  const q2 = badCorrect.objectives[2]
  if (q2.kind === "answer") q2.correctId = "nope"
  assert.match(validateMission(badCorrect).join("\n"), /no choice matching correctId "nope"/)

  const dupChoice = clone(DEV_MISSION)
  const q3 = dupChoice.objectives[2]
  if (q3.kind === "answer") q3.choices[1].id = q3.choices[0].id
  assert.match(validateMission(dupChoice).join("\n"), /duplicate choice/)

  const onePrediction = clone(getMission("hammer-and-feather"))
  onePrediction.prediction!.choices = [onePrediction.prediction!.choices[0]]
  assert.match(validateMission(onePrediction).join("\n"), /prediction needs at least two choices/)

  const unpickable = clone(getMission("hang-time"))
  const glide = unpickable.objectives[0]
  if (glide.kind === "enter-zone") glide.gravity = { presets: ["jupiter"] }
  assert.match(validateMission(unpickable).join("\n"), /requires preset "jupiter" the player cannot pick/)
})

test("validateMissions also reports duplicate mission ids", () => {
  const twice = [getMission("drop-in"), getMission("drop-in")]
  assert.deepEqual(validateMissions(twice), ['duplicate mission id "drop-in"'])
})

test("gravity presets are the real surface gravities and the switch zeroes them", () => {
  assert.deepEqual(Object.keys(GRAVITY_PRESETS).sort(), [...GRAVITY_PRESET_ORDER].sort())
  assert.equal(GRAVITY_PRESETS.earth.g, 9.81)
  assert.equal(GRAVITY_PRESETS.moon.g, 1.62)
  assert.equal(GRAVITY_PRESETS.mars.g, 3.71)
  assert.equal(GRAVITY_PRESETS.jupiter.g, 24.79)
  assert.equal(GRAVITY_PRESETS.zero.g, 0)
  for (const preset of GRAVITY_PRESET_ORDER) {
    assert.ok(GRAVITY_PRESETS[preset].g >= 0)
    assert.equal(GRAVITY_PRESETS[preset].id, preset)
    assert.equal(effectiveGravity({ preset, switchOn: true }), GRAVITY_PRESETS[preset].g)
    assert.equal(effectiveGravity({ preset, switchOn: false }), 0)
    assert.ok(isGravityPresetId(preset))
  }
  assert.equal(isGravityPresetId("pluto"), false)
  assert.ok(GRAVITY_PRESETS.moon.g < GRAVITY_PRESETS.mars.g)
  assert.ok(GRAVITY_PRESETS.mars.g < GRAVITY_PRESETS.earth.g)
  assert.ok(GRAVITY_PRESETS.earth.g < GRAVITY_PRESETS.jupiter.g)
})

test("the object catalogue is complete and physically sensible", () => {
  assert.deepEqual([...OBJECT_ORDER].sort(), Object.keys(OBJECT_SPECS).sort())
  assert.equal(new Set(OBJECT_ORDER).size, OBJECT_ORDER.length)
  for (const kind of OBJECT_ORDER) {
    const spec = OBJECT_SPECS[kind]
    assert.equal(spec.kind, kind)
    assert.ok(spec.mass > 0, `${kind} mass`)
    assert.ok(spec.restitution >= 0 && spec.restitution <= 1, `${kind} restitution`)
    assert.ok(spec.friction >= 0, `${kind} friction`)
    assert.ok(spec.frictionAir >= 0 && spec.frictionAir < 1, `${kind} air drag`)
    if (spec.shape.type === "circle") assert.ok(spec.shape.radius > 0)
    else assert.ok(spec.shape.width > 0 && spec.shape.height > 0)
  }
  assert.ok(OBJECT_SPECS.feather.frictionAir > OBJECT_SPECS.hammer.frictionAir, "a feather feels the air more")
  assert.ok(OBJECT_SPECS.ball.restitution > OBJECT_SPECS.crate.restitution, "a ball bounces, a crate thuds")
})

test("the Zero-G Room starts closed, airless, with gravity on and something already moving", () => {
  assert.deepEqual(SANDBOX_WORLD.walls, { floor: true, ceiling: true, left: true, right: true })
  assert.equal(SANDBOX_WORLD.air, "vacuum")
  assert.equal(SANDBOX_DEFAULT_GRAVITY.switchOn, true)
  assert.ok(SANDBOX_WORLD.objects.length >= 3)
  assert.ok(
    SANDBOX_WORLD.objects.some((object) => object.velocity && Math.hypot(object.velocity.x, object.velocity.y) > 0),
    "at least one object starts with a velocity",
  )
  assert.ok(
    SANDBOX_WORLD.objects.some((object) => object.y < SANDBOX_WORLD.height / 2),
    "at least one object starts high enough to visibly fall",
  )
  for (const object of SANDBOX_WORLD.objects) {
    assert.ok(isObjectKind(object.kind))
    assert.ok(object.x > 0 && object.x < SANDBOX_WORLD.width)
    assert.ok(object.y > 0 && object.y < SANDBOX_WORLD.height)
  }
  assert.equal(ROOM_WIDTH / PIXELS_PER_METER, 16, "the room is 16 m wide")
  assert.equal(ROOM_HEIGHT / PIXELS_PER_METER, 9, "the room is 9 m tall")
})
