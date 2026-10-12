// Gravity Switch: Zero-G Lab — game-state machine tests.
//
// Exercises every action from every phase so the transitions are spelled out
// in one place, and checks the selectors the component relies on (which world
// to build, whether the switch responds, which presets are offered).
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import { GRAVITY_PRESET_ORDER, SANDBOX_DEFAULT_GRAVITY, SANDBOX_DEFAULT_SPAWN } from "./gravity-switch-config.ts"
import { getExperiment } from "./gravity-switch-experiments.ts"
import { MISSION_IDS, getMission } from "./gravity-switch-missions.ts"
import { emptyStats } from "./gravity-switch-progress.ts"
import {
  type GameAction,
  activeGravity,
  activeWorldConfig,
  awaitingPrediction,
  canFlipSwitch,
  gameReducer,
  initialGameState,
  isSimulating,
  selectablePresets,
  worldKey,
} from "./gravity-switch-state.ts"
import type { GamePhase, GameState, MissionId } from "./gravity-switch-types.ts"

function run(actions: GameAction[], from: GameState = initialGameState): GameState {
  return actions.reduce(gameReducer, from)
}

const inMission = (id: MissionId = "drop-in") => run([{ type: "select-mission", missionId: id }])
const running = (id: MissionId = "drop-in") => run([{ type: "start" }], inMission(id))

test("starts in the Zero-G Room with Earth gravity on, a ball selected, and no mission", () => {
  assert.equal(initialGameState.mode, "sandbox")
  assert.deepEqual(initialGameState.sandbox.gravity, SANDBOX_DEFAULT_GRAVITY)
  assert.equal(initialGameState.sandbox.gravity.switchOn, true, "the room opens with things falling")
  assert.equal(initialGameState.sandbox.spawnKind, SANDBOX_DEFAULT_SPAWN)
  assert.equal(initialGameState.missions.activeId, null)
  assert.equal(worldKey(initialGameState), "sandbox:0")
  assert.equal(isSimulating(initialGameState), true)
})

test("select-mode switches views and is a no-op for the current mode", () => {
  const missions = gameReducer(initialGameState, { type: "select-mode", mode: "missions" })
  assert.equal(missions.mode, "missions")
  assert.equal(worldKey(missions), null, "the mission list has no world")
  assert.equal(activeWorldConfig(missions), null)
  assert.equal(gameReducer(missions, { type: "select-mode", mode: "missions" }), missions)
  assert.equal(gameReducer(initialGameState, { type: "select-mode", mode: "sandbox" }), initialGameState)
})

test("select-mission opens a fresh briefing with the mission's own gravity", () => {
  const state = inMission("hang-time")
  const mission = getMission("hang-time")
  assert.equal(state.mode, "missions")
  assert.equal(state.missions.activeId, "hang-time")
  assert.equal(state.missions.phase, "briefing")
  assert.deepEqual(state.missions.gravity, mission.gravity)
  assert.notEqual(state.missions.gravity, mission.gravity, "gravity is copied, not shared")
  assert.equal(state.missions.flips, 0)
  assert.equal(state.missions.attempt, 1)
  assert.equal(state.missions.result, null)
  assert.equal(worldKey(state), "mission:hang-time:1")
  assert.equal(activeWorldConfig(state), mission.world)
  assert.equal(isSimulating(state), false, "briefing does not run the clock")
})

test("start, pause and resume only move between their own phases", () => {
  const briefing = inMission()
  assert.equal(gameReducer(briefing, { type: "pause" }), briefing)
  assert.equal(gameReducer(briefing, { type: "resume" }), briefing)

  const live = gameReducer(briefing, { type: "start" })
  assert.equal(live.missions.phase, "running")
  assert.equal(isSimulating(live), true)
  assert.equal(gameReducer(live, { type: "start" }), live, "start is idempotent once running")
  assert.equal(gameReducer(live, { type: "resume" }), live)

  const paused = gameReducer(live, { type: "pause" })
  assert.equal(paused.missions.phase, "paused")
  assert.equal(isSimulating(paused), false)
  assert.equal(gameReducer(paused, { type: "pause" }), paused)
  assert.equal(gameReducer(paused, { type: "start" }), paused)

  const resumed = gameReducer(paused, { type: "resume" })
  assert.equal(resumed.missions.phase, "running")
  assert.equal(worldKey(resumed), worldKey(briefing), "pausing never rebuilds the world")
})

test("reset restarts the attempt: new world key, mission gravity back, counters cleared", () => {
  const messy = run([{ type: "toggle-gravity" }, { type: "toggle-gravity" }, { type: "toggle-gravity" }], running())
  assert.equal(messy.missions.flips, 3)
  assert.equal(messy.missions.gravity.switchOn, true)

  const fresh = gameReducer(messy, { type: "reset" })
  assert.equal(fresh.missions.phase, "briefing")
  assert.equal(fresh.missions.flips, 0)
  assert.deepEqual(fresh.missions.gravity, getMission("drop-in").gravity)
  assert.equal(fresh.missions.attempt, messy.missions.attempt + 1)
  assert.notEqual(worldKey(fresh), worldKey(messy))
  assert.equal(fresh.missions.result, null)
})

test("the switch counts flips in a mission and refuses when locked or finished", () => {
  const flipped = gameReducer(running(), { type: "toggle-gravity" })
  assert.equal(flipped.missions.gravity.switchOn, true)
  assert.equal(flipped.missions.flips, 1)
  assert.equal(worldKey(flipped), worldKey(running()), "flipping never rebuilds the world")

  const locked = inMission("moon-shot")
  assert.equal(getMission("moon-shot").switchLocked, true)
  assert.equal(canFlipSwitch(locked), false)
  assert.equal(gameReducer(locked, { type: "toggle-gravity" }), locked)

  const won = gameReducer(running(), { type: "complete-mission" })
  assert.equal(canFlipSwitch(won), false)
  assert.equal(gameReducer(won, { type: "toggle-gravity" }), won)

  const briefing = inMission()
  assert.equal(canFlipSwitch(briefing), true, "players may set the switch before starting")
  assert.equal(gameReducer(briefing, { type: "toggle-gravity" }).missions.flips, 1)
})

test("the sandbox switch and planet picker are unrestricted", () => {
  let state = gameReducer(initialGameState, { type: "toggle-gravity" })
  assert.equal(state.sandbox.gravity.switchOn, !initialGameState.sandbox.gravity.switchOn)
  assert.equal(gameReducer(state, { type: "toggle-gravity" }).sandbox.gravity.switchOn, initialGameState.sandbox.gravity.switchOn)
  assert.equal(canFlipSwitch(initialGameState), true)
  assert.deepEqual(selectablePresets(initialGameState).sort(), [...GRAVITY_PRESET_ORDER].sort())
  for (const preset of GRAVITY_PRESET_ORDER) {
    state = gameReducer(state, { type: "set-preset", preset })
    assert.equal(state.sandbox.gravity.preset, preset)
    assert.equal(activeGravity(state).preset, preset)
  }
  assert.equal(gameReducer(state, { type: "set-preset", preset: state.sandbox.gravity.preset }), state)
  assert.equal(worldKey(state), "sandbox:0", "gravity changes never rebuild the room")
})

test("missions only offer their allowed presets", () => {
  const moonShot = inMission("moon-shot")
  assert.deepEqual(selectablePresets(moonShot), getMission("moon-shot").allowedPresets)
  const onJupiter = gameReducer(moonShot, { type: "set-preset", preset: "jupiter" })
  assert.equal(onJupiter.missions.gravity.preset, "jupiter")
  assert.equal(gameReducer(moonShot, { type: "set-preset", preset: "zero" }), moonShot, "zero is not allowed here")

  const dropIn = inMission("drop-in")
  assert.deepEqual(selectablePresets(dropIn), ["earth"])
  assert.equal(gameReducer(dropIn, { type: "set-preset", preset: "moon" }), dropIn)

  const bogus = { type: "set-preset", preset: "pluto" } as unknown as GameAction
  assert.equal(gameReducer(initialGameState, bogus), initialGameState)
})

test("completing a mission records it once and unlocks next-mission", () => {
  const won = gameReducer(running("drop-in"), { type: "complete-mission" })
  assert.equal(won.missions.phase, "success")
  assert.deepEqual(won.missions.result, { kind: "success" })
  assert.deepEqual(won.missions.completed, ["drop-in"])
  assert.equal(gameReducer(won, { type: "complete-mission" }), won, "cannot complete twice")

  const next = gameReducer(won, { type: "next-mission" })
  assert.equal(next.missions.activeId, "hang-time")
  assert.equal(next.missions.phase, "briefing")
  assert.deepEqual(next.missions.completed, ["drop-in"], "progress carries over")
  assert.deepEqual(next.missions.gravity, getMission("hang-time").gravity)

  const replayed = run([{ type: "select-mission", missionId: "drop-in" }, { type: "start" }, { type: "complete-mission" }], next)
  assert.deepEqual(replayed.missions.completed, ["drop-in"], "replaying does not duplicate the record")
})

test("next-mission does nothing at the end of the list or before winning", () => {
  const last = MISSION_IDS[MISSION_IDS.length - 1]
  const wonLast = gameReducer(running(last), { type: "complete-mission" })
  assert.equal(gameReducer(wonLast, { type: "next-mission" }), wonLast)
  const live = running()
  assert.equal(gameReducer(live, { type: "next-mission" }), live)
  const briefing = inMission()
  assert.equal(gameReducer(briefing, { type: "next-mission" }), briefing)
})

test("failing records the reason and only reset or leaving gets out", () => {
  const lost = gameReducer(running(), { type: "fail-mission", reason: "time-limit" })
  assert.equal(lost.missions.phase, "failed")
  assert.deepEqual(lost.missions.result, { kind: "failed", reason: "time-limit" })
  assert.deepEqual(lost.missions.completed, [])
  assert.equal(gameReducer(lost, { type: "start" }), lost)
  assert.equal(gameReducer(lost, { type: "complete-mission" }), lost)
  assert.equal(gameReducer(lost, { type: "next-mission" }), lost)
  const briefing = inMission()
  assert.equal(gameReducer(briefing, { type: "fail-mission", reason: "time-limit" }), briefing, "cannot fail before starting")

  const retry = gameReducer(lost, { type: "reset" })
  assert.equal(retry.missions.phase, "briefing")
  assert.equal(retry.missions.result, null)

  const list = gameReducer(lost, { type: "exit-mission" })
  assert.equal(list.missions.activeId, null)
  assert.equal(worldKey(list), null)
  assert.equal(gameReducer(list, { type: "exit-mission" }), list)
  assert.equal(gameReducer(list, { type: "reset" }), list, "nothing to reset on the list")
  assert.equal(gameReducer(list, { type: "start" }), list)
})

test("leaving Missions mode mid-attempt returns that mission to its briefing", () => {
  const paused = gameReducer(running(), { type: "pause" })
  const away = gameReducer(paused, { type: "select-mode", mode: "sandbox" })
  assert.equal(away.mode, "sandbox")
  assert.equal(away.missions.activeId, "drop-in", "the mission stays selected")
  assert.equal(away.missions.phase, "briefing")
  assert.equal(away.missions.attempt, paused.missions.attempt + 1)
  assert.equal(worldKey(away), "sandbox:0")

  const back = gameReducer(away, { type: "select-mode", mode: "missions" })
  assert.equal(back.missions.phase, "briefing")
  assert.equal(worldKey(back), `mission:drop-in:${away.missions.attempt}`)

  const won = gameReducer(running(), { type: "complete-mission" })
  const awayAfterWin = gameReducer(won, { type: "select-mode", mode: "sandbox" })
  assert.equal(awayAfterWin.missions.phase, "success", "finished attempts are kept")
})

test("sandbox pause, resume and reset", () => {
  const paused = gameReducer(initialGameState, { type: "pause" })
  assert.equal(paused.sandbox.paused, true)
  assert.equal(isSimulating(paused), false)
  assert.equal(gameReducer(paused, { type: "pause" }), paused)
  assert.equal(worldKey(paused), "sandbox:0")
  const resumed = gameReducer(paused, { type: "resume" })
  assert.equal(resumed.sandbox.paused, false)
  assert.equal(gameReducer(resumed, { type: "resume" }), resumed)

  const changed = run([{ type: "toggle-gravity" }, { type: "set-preset", preset: "mars" }, { type: "pause" }])
  const reset = gameReducer(changed, { type: "reset" })
  assert.deepEqual(reset.sandbox.gravity, SANDBOX_DEFAULT_GRAVITY)
  assert.equal(reset.sandbox.paused, false)
  assert.equal(worldKey(reset), "sandbox:1")
})

test("the palette selection changes what a tap drops in and survives a reset", () => {
  const hammer = gameReducer(initialGameState, { type: "select-spawn-kind", kind: "hammer" })
  assert.equal(hammer.sandbox.spawnKind, "hammer")
  assert.equal(worldKey(hammer), worldKey(initialGameState), "choosing a palette item never rebuilds the room")
  assert.equal(gameReducer(hammer, { type: "select-spawn-kind", kind: "hammer" }), hammer)
  const bogus = { type: "select-spawn-kind", kind: "anvil" } as unknown as GameAction
  assert.equal(gameReducer(hammer, bogus), hammer)
  const reset = gameReducer(hammer, { type: "reset" })
  assert.equal(reset.sandbox.spawnKind, "hammer", "reset clears the room, not the player's choice")
  assert.deepEqual(reset.sandbox.gravity, SANDBOX_DEFAULT_GRAVITY)
  const inMissions = gameReducer(hammer, { type: "select-mode", mode: "missions" })
  assert.equal(inMissions.sandbox.spawnKind, "hammer")
})

test("sandbox actions never touch mission progress and vice versa", () => {
  const won = gameReducer(running(), { type: "complete-mission" })
  const sandbox = run([{ type: "select-mode", mode: "sandbox" }, { type: "toggle-gravity" }, { type: "reset" }], won)
  assert.deepEqual(sandbox.missions, won.missions)
  const backInMissions = gameReducer(sandbox, { type: "select-mode", mode: "missions" })
  assert.deepEqual(backInMissions.sandbox, sandbox.sandbox)
})

test("every action from every phase lands in a valid state", () => {
  const phases: Record<GamePhase, GameState> = {
    briefing: inMission(),
    running: running(),
    paused: gameReducer(running(), { type: "pause" }),
    success: gameReducer(running(), { type: "complete-mission" }),
    failed: gameReducer(running(), { type: "fail-mission", reason: "out-of-bounds" }),
  }
  const actions: GameAction[] = [
    { type: "select-mode", mode: "sandbox" },
    { type: "select-mode", mode: "missions" },
    { type: "select-mission", missionId: "bank-shot" },
    { type: "exit-mission" },
    { type: "start" },
    { type: "pause" },
    { type: "resume" },
    { type: "reset" },
    { type: "toggle-gravity" },
    { type: "set-preset", preset: "earth" },
    { type: "complete-mission" },
    { type: "fail-mission", reason: "touch-hazard" },
    { type: "next-mission" },
  ]
  const validPhases = new Set<GamePhase>(["briefing", "running", "paused", "success", "failed"])
  for (const [phase, state] of Object.entries(phases) as [GamePhase, GameState][]) {
    assert.equal(state.missions.phase, phase)
    for (const action of actions) {
      const next = gameReducer(state, action)
      assert.ok(validPhases.has(next.missions.phase), `${phase} + ${action.type}`)
      assert.ok(next.missions.flips >= 0)
      assert.ok(next.missions.attempt >= state.missions.attempt)
      assert.ok(["sandbox", "missions"].includes(next.mode))
      if (next.missions.phase === "success") assert.equal(next.missions.result?.kind, "success")
      if (next.missions.phase === "failed") assert.equal(next.missions.result?.kind, "failed")
      if (next.missions.phase === "briefing" || next.missions.phase === "running" || next.missions.phase === "paused") {
        assert.equal(next.missions.result, null, `${phase} + ${action.type} should clear the result`)
      }
      if (next.mode === "missions" && next.missions.activeId === null) assert.equal(worldKey(next), null)
    }
  }
})

test("a mission that asks for a prediction will not start until one is made", () => {
  const briefing = inMission("hammer-and-feather")
  assert.ok(getMission("hammer-and-feather").prediction)
  assert.equal(awaitingPrediction(briefing), true)
  assert.equal(gameReducer(briefing, { type: "start" }), briefing, "no prediction, no start")
  assert.equal(gameReducer(briefing, { type: "predict", choiceId: "rock" }), briefing, "unknown choices are ignored")
  const guessed = gameReducer(briefing, { type: "predict", choiceId: "feather" })
  assert.equal(guessed.missions.prediction, "feather")
  assert.equal(awaitingPrediction(guessed), false)
  assert.equal(gameReducer(guessed, { type: "predict", choiceId: "feather" }), guessed)
  const changed = gameReducer(guessed, { type: "predict", choiceId: "same" })
  assert.equal(changed.missions.prediction, "same", "the guess can be changed before starting")
  const live = gameReducer(changed, { type: "start" })
  assert.equal(live.missions.phase, "running")
  assert.equal(gameReducer(live, { type: "predict", choiceId: "hammer" }), live, "no changing your mind once it runs")
  assert.equal(gameReducer(live, { type: "reset" }).missions.prediction, null, "a fresh attempt asks again")

  const noQuestion = inMission("drop-in")
  assert.equal(awaitingPrediction(noQuestion), false)
  assert.equal(gameReducer(noQuestion, { type: "predict", choiceId: "same" }), noQuestion)
  assert.equal(gameReducer(noQuestion, { type: "start" }).missions.phase, "running")
})

test("a sandbox experiment loads its room paused with its gravity, and leaves cleanly", () => {
  const won = gameReducer(running("drop-in"), { type: "complete-mission" })
  const opened = gameReducer(won, { type: "select-experiment", experimentId: "falling-ball-off" })
  const def = getExperiment("falling-ball-off")
  assert.equal(opened.mode, "sandbox", "opening an experiment from a mission switches to the room")
  assert.equal(opened.sandbox.paused, true, "the room waits for Go")
  assert.deepEqual(opened.sandbox.gravity, def.gravity)
  assert.equal(opened.sandbox.experiment?.id, "falling-ball-off")
  assert.equal(opened.sandbox.experiment?.attempt, 1)
  assert.equal(worldKey(opened), "experiment:falling-ball-off:1")
  assert.equal(activeWorldConfig(opened), def.world)
  assert.deepEqual(opened.missions.completed, ["drop-in"], "mission progress is untouched")
  assert.equal(opened.missions.activeId, null, "the finished mission is left so the Missions tab shows the list")
  assert.equal(opened.missions.result, null)
  assert.equal(isSimulating(opened), false)

  const bogus = { type: "select-experiment", experimentId: "time-travel" } as unknown as GameAction
  assert.equal(gameReducer(opened, bogus), opened)

  const guessed = gameReducer(opened, { type: "experiment-predict", choiceId: "down" })
  assert.equal(guessed.sandbox.experiment?.prediction, "down")
  assert.equal(gameReducer(guessed, { type: "experiment-predict", choiceId: "sideways" }), guessed, "unknown choices are ignored")
  const skipped = gameReducer(guessed, { type: "experiment-skip" })
  assert.equal(skipped.sandbox.experiment?.prediction, null)
  assert.equal(skipped.sandbox.experiment?.skipped, true)
  assert.equal(gameReducer(skipped, { type: "experiment-skip" }), skipped)

  const going = gameReducer(skipped, { type: "resume" })
  assert.equal(going.sandbox.paused, false)
  assert.equal(worldKey(going), worldKey(opened), "Go does not rebuild the room")
  const observed = gameReducer(going, { type: "experiment-observed" })
  assert.equal(observed.sandbox.experiment?.observed, true)
  assert.equal(gameReducer(observed, { type: "experiment-observed" }), observed)
  assert.equal(gameReducer(observed, { type: "experiment-predict", choiceId: "down" }), observed, "no guessing after the fact")

  const restarted = gameReducer(observed, { type: "reset" })
  assert.equal(restarted.sandbox.experiment?.attempt, 2)
  assert.equal(restarted.sandbox.experiment?.observed, false)
  assert.equal(restarted.sandbox.experiment?.prediction, null)
  assert.equal(restarted.sandbox.paused, true, "a restarted experiment waits for Go again")
  assert.equal(worldKey(restarted), "experiment:falling-ball-off:2")

  const done = gameReducer(restarted, { type: "end-experiment" })
  assert.equal(done.sandbox.experiment, null)
  assert.deepEqual(done.sandbox.gravity, SANDBOX_DEFAULT_GRAVITY)
  assert.equal(done.sandbox.paused, false)
  assert.equal(worldKey(done), "sandbox:1", "free play gets a fresh room")
  assert.equal(gameReducer(done, { type: "end-experiment" }), done)
  assert.equal(gameReducer(done, { type: "experiment-predict", choiceId: "down" }), done)
})

test("load-progress merges saved completions without clobbering or duplicating", () => {
  const loaded = gameReducer(initialGameState, { type: "load-progress", completed: ["hang-time", "drop-in"] })
  assert.deepEqual(loaded.missions.completed, ["hang-time", "drop-in"])
  assert.equal(gameReducer(loaded, { type: "load-progress", completed: ["drop-in"] }), loaded, "nothing new is a no-op")
  const bogus = gameReducer(loaded, { type: "load-progress", completed: ["made-up" as MissionId] })
  assert.equal(bogus, loaded, "unknown ids are ignored")
  const won = run([{ type: "select-mission", missionId: "moon-shot" }, { type: "start" }, { type: "complete-mission" }], loaded)
  assert.deepEqual(won.missions.completed, ["hang-time", "drop-in", "moon-shot"])
  const lateLoad = gameReducer(won, { type: "load-progress", completed: ["bank-shot"] })
  assert.deepEqual(lateLoad.missions.completed, ["hang-time", "drop-in", "moon-shot", "bank-shot"], "a late load keeps what was won meanwhile")
})

test("completing a mission is counted, the opened mission is remembered, and achievements arrive fresh", () => {
  const opened = inMission("drop-in")
  assert.equal(opened.progress.lastMissionId, "drop-in")
  assert.deepEqual(opened.freshAchievements, [])
  const won = gameReducer(run([{ type: "start" }], opened), { type: "complete-mission" })
  assert.deepEqual(won.progress.completions, { "drop-in": 1 })
  assert.deepEqual(won.freshAchievements, ["first-mission"])
  const replayed = run([{ type: "reset" }, { type: "start" }, { type: "complete-mission" }], won)
  assert.deepEqual(replayed.progress.completions, { "drop-in": 2 }, "replays count")
  assert.deepEqual(replayed.missions.completed, ["drop-in"], "but the completed list does not duplicate")
  assert.deepEqual(replayed.freshAchievements, [], "reset cleared the fresh list and nothing new was earned")
  const next = gameReducer(replayed, { type: "next-mission" })
  assert.equal(next.progress.lastMissionId, "hang-time")
  const dev = run([{ type: "select-mission", missionId: "dev-check" }, { type: "start" }, { type: "complete-mission" }], next)
  assert.equal(dev.progress.lastMissionId, "hang-time", "the dev scenario is not remembered")
  assert.equal(dev.progress.completions["dev-check" as MissionId], undefined)
})

test("predictions are scored when the mission has a right answer, and experiments are recorded", () => {
  const hf = run([{ type: "select-mission", missionId: "hammer-and-feather" }, { type: "predict", choiceId: "hammer" }, { type: "start" }, { type: "complete-mission" }])
  assert.equal(hf.progress.predictionsTotal, 1)
  assert.equal(hf.progress.predictionsRight, 0)
  const right = run([{ type: "select-mission", missionId: "hammer-and-feather" }, { type: "predict", choiceId: "same" }, { type: "start" }, { type: "complete-mission" }], hf)
  assert.equal(right.progress.predictionsTotal, 2)
  assert.equal(right.progress.predictionsRight, 1)
  assert.ok(right.freshAchievements.includes("good-guess"))

  const exp = run([{ type: "select-experiment", experimentId: "zero-g-push" }, { type: "experiment-predict", choiceId: "same" }, { type: "resume" }, { type: "experiment-observed" }])
  assert.deepEqual(exp.progress.experimentsDone, ["zero-g-push"])
  assert.equal(exp.progress.predictionsRight, 1)
  const again = run([{ type: "reset" }, { type: "resume" }, { type: "experiment-observed" }], exp)
  assert.deepEqual(again.progress.experimentsDone, ["zero-g-push"], "no duplicates")
  assert.equal(again.progress.predictionsTotal, 1, "a skipped guess is not scored")
  const all = run(
    [
      { type: "select-experiment", experimentId: "heavy-light" },
      { type: "resume" },
      { type: "experiment-observed" },
      { type: "select-experiment", experimentId: "falling-ball-off" },
      { type: "resume" },
      { type: "experiment-observed" },
    ],
    again,
  )
  assert.ok(all.freshAchievements.includes("scientist"))
})

test("trying every planet in the room earns planet hopper, once", () => {
  let state = initialGameState
  for (const preset of ["moon", "mars", "jupiter"] as const) state = gameReducer(state, { type: "set-preset", preset })
  assert.deepEqual(state.progress.planetsTried, ["earth", "moon", "mars", "jupiter"], "the room opened on Earth, so Earth counts")
  assert.deepEqual(state.freshAchievements, [])
  state = gameReducer(state, { type: "set-preset", preset: "zero" })
  assert.deepEqual(state.freshAchievements, ["planet-hopper"])
  state = gameReducer(state, { type: "set-preset", preset: "earth" })
  assert.deepEqual(state.freshAchievements, [], "the next planet change retires the note")
  const again = run([{ type: "reset" }, { type: "set-preset", preset: "moon" }], state)
  assert.deepEqual(again.freshAchievements, [], "earned once")
  const inMissionPreset = run([{ type: "select-mission", missionId: "moon-shot" }, { type: "set-preset", preset: "jupiter" }])
  assert.deepEqual(inMissionPreset.progress.planetsTried, [], "mission planet pickers do not count as exploring")
})

test("load-progress merges the whole record without celebrating, and reset-progress forgets everything", () => {
  const stats = { ...emptyStats(), completions: { "drop-in": 2 as number }, lastMissionId: "bank-shot" as MissionId, experimentsDone: ["heavy-light" as const], predictionsRight: 1, predictionsTotal: 1, planetsTried: ["moon" as const] }
  const loaded = gameReducer(initialGameState, { type: "load-progress", completed: ["drop-in"], stats })
  assert.deepEqual(loaded.missions.completed, ["drop-in"])
  assert.deepEqual(loaded.progress, stats)
  assert.deepEqual(loaded.freshAchievements, [], "old achievements are not re-announced")
  const local = run([{ type: "select-mission", missionId: "moon-shot" }, { type: "start" }, { type: "complete-mission" }])
  const merged = gameReducer(local, { type: "load-progress", completed: ["drop-in"], stats })
  assert.equal(merged.progress.lastMissionId, "moon-shot", "what happened this session wins")
  assert.deepEqual(merged.progress.completions, { "moon-shot": 1, "drop-in": 2 })
  assert.equal(gameReducer(merged, { type: "load-progress", completed: ["drop-in"], stats }), merged, "loading the same record again is a no-op")

  const wiped = gameReducer(merged, { type: "reset-progress" })
  assert.deepEqual(wiped.missions.completed, [])
  assert.deepEqual(wiped.progress, emptyStats())
  assert.deepEqual(wiped.freshAchievements, [])
  assert.equal(wiped.missions.activeId, "moon-shot", "the current attempt is left alone")
})

test("the mission progression covers every mission exactly once", () => {
  let state = inMission(MISSION_IDS[0])
  const visited: MissionId[] = [state.missions.activeId as MissionId]
  for (;;) {
    // A prediction is a no-op for missions that do not ask one.
    state = run([{ type: "predict", choiceId: "same" }, { type: "start" }, { type: "complete-mission" }, { type: "next-mission" }], state)
    if (state.missions.phase === "success") break
    visited.push(state.missions.activeId as MissionId)
  }
  assert.deepEqual(visited, MISSION_IDS)
  assert.deepEqual(state.missions.completed, MISSION_IDS)
})
