// Gravity Switch: Zero-G Lab — guided experiment tests, on the real engine.
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import { PHYSICS_STEP_MS } from "./gravity-switch-config.ts"
import { EXPERIMENTS, EXPERIMENT_IDS, getExperiment, isExperimentId } from "./gravity-switch-experiments.ts"
import { MISSIONS, validateMission } from "./gravity-switch-missions.ts"
import { MissionTracker, type TrackerEvent } from "./gravity-switch-objectives.ts"
import { GravitySwitchWorld, resolveMatterModule } from "./gravity-switch-physics.ts"
import type { ExperimentDefinition, ExperimentId, GravityState } from "./gravity-switch-types.ts"

const Matter = resolveMatterModule(await import("matter-js"))
const LANGUAGES = ["en", "es", "zh", "pt"] as const

/** Run an experiment with a scripted player; `act` may change gravity or push things each frame. */
function run(def: ExperimentDefinition, act: (seconds: number, world: GravitySwitchWorld) => GravityState | null, maxSeconds = 10) {
  const world = new GravitySwitchWorld(Matter, def.world, def.gravity)
  const tracker = new MissionTracker(def)
  const log: TrackerEvent[] = []
  while (!tracker.finished && world.elapsedMs < maxSeconds * 1000) {
    const wanted = act(world.elapsedMs / 1000, world)
    if (wanted) world.setGravity(wanted)
    world.stepExactly(2)
    log.push(
      ...tracker.update(
        { objects: world.getObjects(), contacts: world.takeContacts(), gravity: world.getGravity(), elapsedMs: world.elapsedMs, flips: 0, room: def.world },
        PHYSICS_STEP_MS * 2,
      ),
    )
  }
  const seconds = world.elapsedMs / 1000
  world.dispose()
  return { log, seconds, won: log.some((event) => event.type === "mission-complete") }
}

test("every experiment validates, has a correct choice, and is translated", () => {
  assert.deepEqual(EXPERIMENT_IDS, ["falling-ball-off", "heavy-light", "zero-g-push"])
  for (const experiment of EXPERIMENTS) {
    assert.deepEqual(validateMission({ ...experiment, allowedPresets: [experiment.gravity.preset], switchLocked: false }), [], experiment.id)
    assert.ok(experiment.prediction.choices.some((choice) => choice.id === experiment.prediction.correctId), `${experiment.id} correct choice exists`)
    for (const language of LANGUAGES) {
      for (const field of ["name", "instruction", "result"] as const) assert.ok(experiment.text[field][language].trim().length, `${experiment.id}.${field}.${language}`)
      assert.ok(experiment.prediction.prompt[language].trim().length)
      for (const choice of experiment.prediction.choices) assert.ok(choice.label[language].trim().length)
    }
    assert.ok(isExperimentId(experiment.id))
    assert.equal(getExperiment(experiment.id), experiment)
  }
  assert.equal(isExperimentId("time-travel"), false)
  assert.throws(() => getExperiment("time-travel" as ExperimentId))
})

test("missions only point at experiments that exist", () => {
  for (const mission of MISSIONS) {
    if (mission.tryNext) assert.ok(isExperimentId(mission.tryNext), `${mission.id} → ${mission.tryNext}`)
  }
  assert.ok(MISSIONS.some((mission) => mission.tryNext), "at least one mission invites an experiment")
})

test("falling ball: the objective fires only when the switch goes off while the ball is really falling", () => {
  const def = getExperiment("falling-ball-off")
  const good = run(def, (seconds) => (seconds >= 0.6 ? { preset: "earth", switchOn: false } : null))
  assert.ok(good.won, JSON.stringify(good.log))
  assert.ok(good.seconds < 1, `fired at ${good.seconds.toFixed(2)} s`)

  const early = run(def, () => ({ preset: "earth", switchOn: false }), 3)
  assert.equal(early.won, false, "flipping before it has picked up speed does not count")

  const never = run(def, () => null, 3)
  assert.equal(never.won, false)
})

test("heavy and light: flipping gravity on lands the bowling ball and the feather together", () => {
  const def = getExperiment("heavy-light")
  const result = run(def, (seconds) => (seconds >= 0.3 ? { preset: "earth", switchOn: true } : null))
  assert.ok(result.won, JSON.stringify(result.log))
  const idle = run(def, () => null, 3)
  assert.equal(idle.won, false, "nothing lands while gravity stays off")
})

test("a push in zero-g: a throw completes it, a throw with gravity on does not", () => {
  const def = getExperiment("zero-g-push")
  const thrown = run(def, (seconds, world) => {
    if (seconds >= 0.3 && seconds < 0.32) world.setVelocity("ball", { x: 2.5, y: 0 })
    return null
  })
  assert.ok(thrown.won, JSON.stringify(thrown.log))
  const withGravity = run(def, (seconds, world) => {
    if (seconds >= 0.3 && seconds < 0.32) world.setVelocity("ball", { x: 2.5, y: 0 })
    return { preset: "earth", switchOn: true }
  }, 3)
  assert.equal(withGravity.won, false, "the experiment is about zero-g")
  const nudge = run(def, (seconds, world) => {
    if (seconds >= 0.3 && seconds < 0.32) world.setVelocity("ball", { x: 0.4, y: 0 })
    return null
  }, 3)
  assert.equal(nudge.won, false, "a tiny nudge is not a throw")
})
