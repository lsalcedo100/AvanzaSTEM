/**
 * Gravity Switch: Zero-G Lab — the game-state machine.
 *
 * A pure reducer over `GameState`. It knows nothing about Matter.js or React:
 * the component dispatches player actions into it, and the physics world is
 * rebuilt whenever `worldKey` changes. Every action that does not apply in the
 * current state returns the same state object, so callers can rely on
 * identity to know whether anything happened, and the tests can enumerate the
 * transitions.
 *
 * Only one physics world exists at a time. Leaving Missions mode mid-attempt
 * therefore returns that mission to its briefing rather than pretending it
 * kept running in the background.
 */

import {
  GRAVITY_PRESETS,
  OBJECT_SPECS,
  SANDBOX_DEFAULT_GRAVITY,
  SANDBOX_DEFAULT_SPAWN,
  SANDBOX_WORLD,
} from "./gravity-switch-config.ts"
import { earnedAchievements, newlyEarned } from "./gravity-switch-achievements.ts"
import { getExperiment, isExperimentId } from "./gravity-switch-experiments.ts"
import { getMission, isMissionId, nextMissionId } from "./gravity-switch-missions.ts"
import { emptyStats } from "./gravity-switch-progress.ts"
import type {
  ExperimentId,
  FailReason,
  GameMode,
  GamePhase,
  GameState,
  GravityPresetId,
  GravityState,
  MissionDefinition,
  MissionId,
  MissionsState,
  ObjectKind,
  ProgressStats,
  WorldConfig,
} from "./gravity-switch-types.ts"

export type GameAction =
  | { type: "select-mode"; mode: GameMode }
  | { type: "select-mission"; missionId: MissionId }
  | { type: "exit-mission" }
  | { type: "start" }
  | { type: "pause" }
  | { type: "resume" }
  | { type: "reset" }
  | { type: "toggle-gravity" }
  | { type: "set-preset"; preset: GravityPresetId }
  | { type: "select-spawn-kind"; kind: ObjectKind }
  /** The briefing prediction, for missions that ask one. Only valid before Start. */
  | { type: "predict"; choiceId: string }
  /** Sandbox experiments: open one (the room loads paused with its question), guess or skip, note the outcome, leave. */
  | { type: "select-experiment"; experimentId: ExperimentId }
  | { type: "experiment-predict"; choiceId: string }
  | { type: "experiment-skip" }
  | { type: "experiment-observed" }
  | { type: "end-experiment" }
  | { type: "complete-mission" }
  | { type: "fail-mission"; reason: FailReason }
  | { type: "next-mission" }
  /** Saved progress arriving from storage after mount; merged, never replacing. */
  | { type: "load-progress"; completed: MissionId[]; stats?: ProgressStats }
  /** The deliberate reset from settings: forget every completion and record. */
  | { type: "reset-progress" }

export const initialGameState: GameState = {
  mode: "sandbox",
  sandbox: { gravity: SANDBOX_DEFAULT_GRAVITY, paused: false, resetCount: 0, spawnKind: SANDBOX_DEFAULT_SPAWN, experiment: null },
  missions: {
    activeId: null,
    phase: "briefing",
    gravity: SANDBOX_DEFAULT_GRAVITY,
    flips: 0,
    prediction: null,
    attempt: 0,
    result: null,
    completed: [],
  },
  progress: emptyStats(),
  freshAchievements: [],
}

const TERMINAL_PHASES: ReadonlySet<GamePhase> = new Set(["success", "failed"])

function isTerminal(phase: GamePhase): boolean {
  return TERMINAL_PHASES.has(phase)
}

/** A fresh attempt at `mission`: briefing phase, the mission's own gravity, counters cleared. */
function freshAttempt(missions: MissionsState, mission: MissionDefinition): MissionsState {
  return {
    ...missions,
    activeId: mission.id,
    phase: "briefing",
    gravity: { ...mission.gravity },
    flips: 0,
    prediction: null,
    attempt: missions.attempt + 1,
    result: null,
  }
}

/** True when the mission wants a prediction and the player has not made one yet. */
export function awaitingPrediction(state: GameState): boolean {
  const mission = activeMission(state)
  return mission !== null && mission.prediction !== undefined && state.missions.prediction === null
}

function activeMission(state: GameState): MissionDefinition | null {
  return state.missions.activeId ? getMission(state.missions.activeId) : null
}

/** Anything newly earned by going from `before` to `after` joins the fresh list. */
function withFreshAchievements(before: GameState, after: GameState): GameState {
  const was = earnedAchievements(before.missions.completed, before.progress)
  const now = earnedAchievements(after.missions.completed, after.progress)
  const fresh = newlyEarned(was, now)
  if (fresh.length === 0) return after
  return { ...after, freshAchievements: [...new Set([...after.freshAchievements, ...fresh])] }
}

function clearFresh(state: GameState): GameState {
  return state.freshAchievements.length === 0 ? state : { ...state, freshAchievements: [] }
}

function unique<T>(items: T[]): T[] {
  return [...new Set(items)]
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "select-mode": {
      if (action.mode === state.mode) return state
      const { missions } = state
      const leavingLiveAttempt =
        state.mode === "missions" &&
        missions.activeId !== null &&
        (missions.phase === "running" || missions.phase === "paused")
      return {
        ...state,
        mode: action.mode,
        missions: leavingLiveAttempt ? freshAttempt(missions, getMission(missions.activeId as MissionId)) : missions,
      }
    }

    case "select-mission": {
      const mission = getMission(action.missionId)
      const progress =
        mission.id === "dev-check" || state.progress.lastMissionId === mission.id
          ? state.progress
          : { ...state.progress, lastMissionId: mission.id }
      return clearFresh({ ...state, mode: "missions", missions: freshAttempt(state.missions, mission), progress })
    }

    case "exit-mission": {
      if (state.mode !== "missions" || state.missions.activeId === null) return state
      return clearFresh({ ...state, missions: { ...state.missions, activeId: null, phase: "briefing", result: null } })
    }

    case "start": {
      if (state.mode !== "missions" || state.missions.activeId === null) return state
      if (state.missions.phase !== "briefing") return state
      if (awaitingPrediction(state)) return state
      return { ...state, missions: { ...state.missions, phase: "running" } }
    }

    case "select-experiment": {
      if (!isExperimentId(action.experimentId)) return state
      const experiment = getExperiment(action.experimentId)
      const attempt = (state.sandbox.experiment?.attempt ?? 0) + 1
      // Coming from a finished mission's card: leave that mission so the
      // Missions tab shows the list (and its progress) when the player returns.
      const missions =
        state.missions.activeId !== null
          ? { ...state.missions, activeId: null, phase: "briefing" as const, result: null }
          : state.missions
      return clearFresh({
        ...state,
        mode: "sandbox",
        missions,
        sandbox: {
          ...state.sandbox,
          gravity: { ...experiment.gravity },
          paused: true,
          experiment: { id: experiment.id, prediction: null, skipped: false, observed: false, attempt },
        },
      })
    }

    case "experiment-predict": {
      const { experiment } = state.sandbox
      if (state.mode !== "sandbox" || !experiment || experiment.observed) return state
      const definition = getExperiment(experiment.id)
      if (!definition.prediction.choices.some((choice) => choice.id === action.choiceId)) return state
      if (experiment.prediction === action.choiceId) return state
      return { ...state, sandbox: { ...state.sandbox, experiment: { ...experiment, prediction: action.choiceId, skipped: false } } }
    }

    case "experiment-skip": {
      const { experiment } = state.sandbox
      if (state.mode !== "sandbox" || !experiment || experiment.observed || experiment.skipped) return state
      return { ...state, sandbox: { ...state.sandbox, experiment: { ...experiment, prediction: null, skipped: true } } }
    }

    case "experiment-observed": {
      const { experiment } = state.sandbox
      if (state.mode !== "sandbox" || !experiment || experiment.observed) return state
      const definition = getExperiment(experiment.id)
      let progress = state.progress
      if (!progress.experimentsDone.includes(experiment.id)) {
        progress = { ...progress, experimentsDone: [...progress.experimentsDone, experiment.id] }
      }
      if (experiment.prediction !== null) {
        progress = {
          ...progress,
          predictionsTotal: progress.predictionsTotal + 1,
          predictionsRight: progress.predictionsRight + (experiment.prediction === definition.prediction.correctId ? 1 : 0),
        }
      }
      return withFreshAchievements(state, {
        ...state,
        sandbox: { ...state.sandbox, experiment: { ...experiment, observed: true } },
        progress,
      })
    }

    case "end-experiment": {
      if (!state.sandbox.experiment) return state
      return clearFresh({
        ...state,
        sandbox: {
          ...state.sandbox,
          gravity: SANDBOX_DEFAULT_GRAVITY,
          paused: false,
          resetCount: state.sandbox.resetCount + 1,
          experiment: null,
        },
      })
    }

    case "predict": {
      const mission = activeMission(state)
      if (state.mode !== "missions" || !mission || !mission.prediction) return state
      if (state.missions.phase !== "briefing") return state
      if (!mission.prediction.choices.some((choice) => choice.id === action.choiceId)) return state
      if (state.missions.prediction === action.choiceId) return state
      return { ...state, missions: { ...state.missions, prediction: action.choiceId } }
    }

    case "pause": {
      if (state.mode === "sandbox") {
        return state.sandbox.paused ? state : { ...state, sandbox: { ...state.sandbox, paused: true } }
      }
      if (state.missions.activeId === null || state.missions.phase !== "running") return state
      return { ...state, missions: { ...state.missions, phase: "paused" } }
    }

    case "resume": {
      if (state.mode === "sandbox") {
        return state.sandbox.paused ? { ...state, sandbox: { ...state.sandbox, paused: false } } : state
      }
      if (state.missions.activeId === null || state.missions.phase !== "paused") return state
      return { ...state, missions: { ...state.missions, phase: "running" } }
    }

    case "reset": {
      if (state.mode === "sandbox") {
        const { experiment } = state.sandbox
        if (experiment) {
          // Restart the experiment: fresh room, question asked again, paused until Go.
          return clearFresh({
            ...state,
            sandbox: {
              ...state.sandbox,
              gravity: { ...getExperiment(experiment.id).gravity },
              paused: true,
              experiment: { ...experiment, prediction: null, skipped: false, observed: false, attempt: experiment.attempt + 1 },
            },
          })
        }
        return clearFresh({
          ...state,
          sandbox: {
            ...state.sandbox,
            gravity: SANDBOX_DEFAULT_GRAVITY,
            paused: false,
            resetCount: state.sandbox.resetCount + 1,
          },
        })
      }
      const mission = activeMission(state)
      if (!mission) return state
      return clearFresh({ ...state, missions: freshAttempt(state.missions, mission) })
    }

    case "toggle-gravity": {
      if (state.mode === "sandbox") {
        const gravity = { ...state.sandbox.gravity, switchOn: !state.sandbox.gravity.switchOn }
        return { ...state, sandbox: { ...state.sandbox, gravity } }
      }
      const mission = activeMission(state)
      if (!mission || mission.switchLocked || isTerminal(state.missions.phase)) return state
      const gravity = { ...state.missions.gravity, switchOn: !state.missions.gravity.switchOn }
      return { ...state, missions: { ...state.missions, gravity, flips: state.missions.flips + 1 } }
    }

    case "set-preset": {
      if (!(action.preset in GRAVITY_PRESETS)) return state
      if (state.mode === "sandbox") {
        if (state.sandbox.gravity.preset === action.preset) return state
        // The planet being left counts too: the room opens on Earth without a pick.
        const planetsTried = unique([...state.progress.planetsTried, state.sandbox.gravity.preset, action.preset])
        const progress =
          planetsTried.length === state.progress.planetsTried.length ? state.progress : { ...state.progress, planetsTried }
        // A planet change is deliberate enough to retire the previous "New:" note.
        return withFreshAchievements(state, {
          ...clearFresh(state),
          sandbox: { ...state.sandbox, gravity: { ...state.sandbox.gravity, preset: action.preset } },
          progress,
        })
      }
      const mission = activeMission(state)
      if (!mission || isTerminal(state.missions.phase)) return state
      if (!mission.allowedPresets.includes(action.preset)) return state
      if (state.missions.gravity.preset === action.preset) return state
      return { ...state, missions: { ...state.missions, gravity: { ...state.missions.gravity, preset: action.preset } } }
    }

    case "select-spawn-kind": {
      if (!(action.kind in OBJECT_SPECS) || state.sandbox.spawnKind === action.kind) return state
      return { ...state, sandbox: { ...state.sandbox, spawnKind: action.kind } }
    }

    case "complete-mission": {
      const { missions } = state
      if (state.mode !== "missions" || missions.activeId === null || missions.phase !== "running") return state
      const id = missions.activeId
      const mission = getMission(id)
      const completed = missions.completed.includes(id) ? missions.completed : [...missions.completed, id]
      let progress = state.progress
      if (id !== "dev-check") {
        progress = { ...progress, completions: { ...progress.completions, [id]: (progress.completions[id] ?? 0) + 1 } }
        const correct = mission.prediction?.correctId
        if (correct !== undefined && missions.prediction !== null) {
          progress = {
            ...progress,
            predictionsTotal: progress.predictionsTotal + 1,
            predictionsRight: progress.predictionsRight + (missions.prediction === correct ? 1 : 0),
          }
        }
      }
      return withFreshAchievements(state, {
        ...state,
        missions: { ...missions, phase: "success", result: { kind: "success" }, completed },
        progress,
      })
    }

    case "fail-mission": {
      const { missions } = state
      if (state.mode !== "missions" || missions.activeId === null || missions.phase !== "running") return state
      return { ...state, missions: { ...missions, phase: "failed", result: { kind: "failed", reason: action.reason } } }
    }

    case "load-progress": {
      const merged = [...state.missions.completed]
      for (const id of action.completed) {
        if (isMissionId(id) && !merged.includes(id)) merged.push(id)
      }
      const loaded = action.stats
      let progress = state.progress
      if (loaded) {
        const completions = { ...state.progress.completions }
        for (const [id, times] of Object.entries(loaded.completions)) {
          if (isMissionId(id) && typeof times === "number") completions[id] = Math.max(completions[id] ?? 0, times)
        }
        progress = {
          completions,
          lastMissionId: state.progress.lastMissionId ?? loaded.lastMissionId,
          experimentsDone: unique([...state.progress.experimentsDone, ...loaded.experimentsDone]),
          predictionsRight: Math.max(state.progress.predictionsRight, loaded.predictionsRight),
          predictionsTotal: Math.max(state.progress.predictionsTotal, loaded.predictionsTotal),
          planetsTried: unique([...state.progress.planetsTried, ...loaded.planetsTried]),
        }
      }
      const sameCompleted = merged.length === state.missions.completed.length
      const sameProgress = JSON.stringify(progress) === JSON.stringify(state.progress)
      if (sameCompleted && sameProgress) return state
      // Loading never celebrates: these were earned in an earlier session.
      return { ...state, missions: { ...state.missions, completed: merged }, progress }
    }

    case "reset-progress": {
      return {
        ...state,
        missions: { ...state.missions, completed: [] },
        progress: emptyStats(),
        freshAchievements: [],
      }
    }

    case "next-mission": {
      const { missions } = state
      if (state.mode !== "missions" || missions.activeId === null || missions.phase !== "success") return state
      const next = nextMissionId(missions.activeId)
      if (!next) return state
      return clearFresh({
        ...state,
        missions: freshAttempt(missions, getMission(next)),
        progress: { ...state.progress, lastMissionId: next },
      })
    }
  }
}

// ---------------------------------------------------------------------------
// Selectors
// ---------------------------------------------------------------------------

/** The gravity setting the current view is driving. */
export function activeGravity(state: GameState): GravityState {
  return state.mode === "sandbox" ? state.sandbox.gravity : state.missions.gravity
}

/**
 * Identifies the physics world the current view needs. The component rebuilds
 * the world (disposing the old one first) whenever this string changes, and
 * tears it down when it is null, which is how old bodies never leak between
 * missions or survive a reset.
 */
export function worldKey(state: GameState): string | null {
  if (state.mode === "sandbox") {
    const { experiment, resetCount } = state.sandbox
    return experiment ? `experiment:${experiment.id}:${experiment.attempt}` : `sandbox:${resetCount}`
  }
  if (state.missions.activeId === null) return null
  return `mission:${state.missions.activeId}:${state.missions.attempt}`
}

/** The room to build for the current view, or null when the mission list is showing. */
export function activeWorldConfig(state: GameState): WorldConfig | null {
  if (state.mode === "sandbox") {
    return state.sandbox.experiment ? getExperiment(state.sandbox.experiment.id).world : SANDBOX_WORLD
  }
  const mission = activeMission(state)
  return mission ? mission.world : null
}

/** Whether the switch responds right now. */
export function canFlipSwitch(state: GameState): boolean {
  if (state.mode === "sandbox") return true
  const mission = activeMission(state)
  return mission !== null && !mission.switchLocked && !isTerminal(state.missions.phase)
}

/** Presets the planet picker should offer right now. */
export function selectablePresets(state: GameState): GravityPresetId[] {
  if (state.mode === "sandbox") return Object.keys(GRAVITY_PRESETS) as GravityPresetId[]
  const mission = activeMission(state)
  return mission ? mission.allowedPresets : []
}

/** True while the physics clock should be advancing. */
export function isSimulating(state: GameState): boolean {
  if (state.mode === "sandbox") return !state.sandbox.paused
  return state.missions.activeId !== null && state.missions.phase === "running"
}

export { activeMission }
