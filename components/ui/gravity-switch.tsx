"use client"

import { useCallback, useEffect, useId, useMemo, useReducer, useRef, useState, type KeyboardEvent, type RefObject } from "react"
import {
  ArrowDown,
  Check,
  ChevronLeft,
  ChevronRight,
  Eraser,
  FlaskConical,
  Lightbulb,
  Lock,
  Minus,
  Pause,
  Play,
  RotateCcw,
  Settings,
  Volume2,
  VolumeX,
  Waypoints,
} from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import type { Language, Translations } from "@/i18n/translations"
import { formatTemplate } from "@/lib/format-template"
import { cn } from "@/lib/utils"
import {
  GRAVITY_PRESETS,
  GRAVITY_PRESET_ORDER,
  MAX_SANDBOX_OBJECTS,
  OBJECT_ORDER,
  OBJECT_SPECS,
  effectiveGravity,
} from "./gravity-switch-config"
import { EXPERIMENTS, getExperiment } from "./gravity-switch-experiments"
import type { Insight, InsightKind, PlayerEvent } from "./gravity-switch-insights"
import { DEV_MISSION, MISSIONS, getMission, missionIndex, nextMissionId } from "./gravity-switch-missions"
import type { TrackerEvent, TrackerSnapshot } from "./gravity-switch-objectives"
import { ACHIEVEMENT_IDS, earnedAchievements } from "./gravity-switch-achievements"
import { browserStorage, clearProgress, loadProgress, saveProgress } from "./gravity-switch-progress"
import { drawObjectIcon } from "./gravity-switch-renderer"
import { unlockAudio, useLabSound } from "./gravity-switch-sound"
import type { GravitySwitchWorld } from "./gravity-switch-physics"
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
} from "./gravity-switch-state"
import type {
  AchievementId,
  ExperimentDefinition,
  ExperimentId,
  FailReason,
  GamePhase,
  GameState,
  GravityPresetId,
  GravityState,
  MissionDefinition,
  MissionId,
  Objective,
  ObjectiveKind,
  ObjectKind,
  ProgressStats,
  WorldConfig,
} from "./gravity-switch-types"
import { type FrameSample, useGravitySwitchCanvas } from "./useGravitySwitchCanvas"
import { useMissionTracker } from "./useMissionTracker"
import { useSandboxInsights } from "./useSandboxInsights"
import { useReducedMotion } from "./useReducedMotion"
import { type WorldStatus, useGravitySwitchWorld } from "./useGravitySwitchWorld"

/**
 * Gravity Switch: Zero-G Lab.
 *
 * The React shell over the pure state machine (`gravity-switch-state`) and the
 * physics world (`gravity-switch-physics`, owned by `useGravitySwitchWorld`).
 * This file only lays out controls and dispatches actions; it never reaches
 * into Matter.js itself. The stage draws the live world and handles touch and
 * mouse through `useGravitySwitchCanvas`.
 */

type Msg = Translations["gamesPage"]
type Dispatch = (action: GameAction) => void

/** Everything the stage needs to draw the live world and run the big switch. */
type StageProps = {
  worldRef: RefObject<GravitySwitchWorld | null>
  readyKey: string | null
  status: WorldStatus
  room: WorldConfig | null
  trailsEnabled: boolean
  canDrag: boolean
  spawnKind: ObjectKind | null
  onObjectsChanged: () => void
  onSpawn: (objectId: string) => void
  onThrow: (objectId: string, speed: number) => void
  gravity: GravityState
  canFlip: boolean
  lockedHint: string | null
  onToggleGravity: () => void
  labels: { gravityOn: string; gravityOff: string }
  onFrame?: (sample: FrameSample) => void
  onImpact: (speed: number) => void
  reducedMotion: boolean
  celebrateToken: number
  muted: boolean
  onToggleMute: () => void
  /** First-use nudge: the room has not been flipped yet this session. */
  nudge: boolean
}

type PresetNameKey = "zerogPlanetEarth" | "zerogPlanetMoon" | "zerogPlanetMars" | "zerogPlanetJupiter" | "zerogPlanetZero"
const PRESET_NAME_KEY: Record<GravityPresetId, PresetNameKey> = {
  earth: "zerogPlanetEarth",
  moon: "zerogPlanetMoon",
  mars: "zerogPlanetMars",
  jupiter: "zerogPlanetJupiter",
  zero: "zerogPlanetZero",
}

type ObjectNameKey = "zerogObjBall" | "zerogObjBowling" | "zerogObjCrate" | "zerogObjFeather" | "zerogObjHammer"
const OBJECT_NAME_KEY: Record<ObjectKind, ObjectNameKey> = {
  ball: "zerogObjBall",
  bowling: "zerogObjBowling",
  crate: "zerogObjCrate",
  feather: "zerogObjFeather",
  hammer: "zerogObjHammer",
}

type FailKey =
  | "zerogFailOutOfBounds"
  | "zerogFailHazard"
  | "zerogFailTime"
  | "zerogFailSwitch"
  | "zerogFailLandedApart"
  | "zerogFailWrongAnswer"
const FAIL_KEY: Record<FailReason, FailKey> = {
  "out-of-bounds": "zerogFailOutOfBounds",
  "touch-hazard": "zerogFailHazard",
  "time-limit": "zerogFailTime",
  "switch-limit": "zerogFailSwitch",
  "landed-apart": "zerogFailLandedApart",
  "wrong-answer": "zerogFailWrongAnswer",
}

type ObjectiveLabelKey =
  | "zerogObjEnter"
  | "zerogObjRest"
  | "zerogObjHover"
  | "zerogObjBounce"
  | "zerogObjTogether"
  | "zerogObjExit"
  | "zerogObjAnswer"
  | "zerogObjMoving"
  | "zerogObjFlip"
const OBJECTIVE_LABEL_KEY: Record<ObjectiveKind, ObjectiveLabelKey> = {
  "enter-zone": "zerogObjEnter",
  "rest-in-zone": "zerogObjRest",
  "hover-in-zone": "zerogObjHover",
  "bounce-off": "zerogObjBounce",
  "land-together": "zerogObjTogether",
  exit: "zerogObjExit",
  answer: "zerogObjAnswer",
  moving: "zerogObjMoving",
  "gravity-flip": "zerogObjFlip",
}

function objectiveLabel(objective: Objective, language: Language, c: Msg): string {
  return objective.label?.[language] ?? c[OBJECTIVE_LABEL_KEY[objective.kind]]
}

const TIMED_OBJECTIVES: ReadonlySet<ObjectiveKind> = new Set(["hover-in-zone", "rest-in-zone"])

type InsightTitleKey =
  | "zerogInsightIdleTitle"
  | "zerogInsightGravityOffMovingTitle"
  | "zerogInsightGravityOffStillTitle"
  | "zerogInsightGravityOnTitle"
  | "zerogInsightPresetEarthTitle"
  | "zerogInsightPresetMoonTitle"
  | "zerogInsightPresetMarsTitle"
  | "zerogInsightPresetJupiterTitle"
  | "zerogInsightPresetZeroTitle"
  | "zerogInsightThrowZeroGTitle"
  | "zerogInsightThrowGravityTitle"
  | "zerogInsightSpawnZeroGTitle"
  | "zerogInsightHeavyLightTitle"
  | "zerogInsightCollisionTitle"
  | "zerogInsightBounceTitle"
  | "zerogInsightDriftingTitle"
type InsightBodyKey =
  | "zerogInsightIdleBody"
  | "zerogInsightGravityOffMovingBody"
  | "zerogInsightGravityOffStillBody"
  | "zerogInsightGravityOnBody"
  | "zerogInsightPresetEarthBody"
  | "zerogInsightPresetMoonBody"
  | "zerogInsightPresetMarsBody"
  | "zerogInsightPresetJupiterBody"
  | "zerogInsightPresetZeroBody"
  | "zerogInsightThrowZeroGBody"
  | "zerogInsightThrowGravityBody"
  | "zerogInsightSpawnZeroGBody"
  | "zerogInsightHeavyLightBody"
  | "zerogInsightCollisionBody"
  | "zerogInsightBounceBody"
  | "zerogInsightDriftingBody"
const INSIGHT_KEY: Record<InsightKind, { title: InsightTitleKey; body: InsightBodyKey; dot: string }> = {
  idle: { title: "zerogInsightIdleTitle", body: "zerogInsightIdleBody", dot: "#94a3b8" },
  "gravity-off-moving": { title: "zerogInsightGravityOffMovingTitle", body: "zerogInsightGravityOffMovingBody", dot: "#8b5cf6" },
  "gravity-off-still": { title: "zerogInsightGravityOffStillTitle", body: "zerogInsightGravityOffStillBody", dot: "#8b5cf6" },
  "gravity-on": { title: "zerogInsightGravityOnTitle", body: "zerogInsightGravityOnBody", dot: "#2ecc71" },
  "preset-earth": { title: "zerogInsightPresetEarthTitle", body: "zerogInsightPresetEarthBody", dot: "#2ecc71" },
  "preset-moon": { title: "zerogInsightPresetMoonTitle", body: "zerogInsightPresetMoonBody", dot: "#94a3b8" },
  "preset-mars": { title: "zerogInsightPresetMarsTitle", body: "zerogInsightPresetMarsBody", dot: "#f97316" },
  "preset-jupiter": { title: "zerogInsightPresetJupiterTitle", body: "zerogInsightPresetJupiterBody", dot: "#f59e0b" },
  "preset-zero": { title: "zerogInsightPresetZeroTitle", body: "zerogInsightPresetZeroBody", dot: "#8b5cf6" },
  "throw-zero-g": { title: "zerogInsightThrowZeroGTitle", body: "zerogInsightThrowZeroGBody", dot: "#1abc9c" },
  "throw-gravity": { title: "zerogInsightThrowGravityTitle", body: "zerogInsightThrowGravityBody", dot: "#1abc9c" },
  "spawn-zero-g": { title: "zerogInsightSpawnZeroGTitle", body: "zerogInsightSpawnZeroGBody", dot: "#1abc9c" },
  "heavy-light": { title: "zerogInsightHeavyLightTitle", body: "zerogInsightHeavyLightBody", dot: "#f59e0b" },
  collision: { title: "zerogInsightCollisionTitle", body: "zerogInsightCollisionBody", dot: "#f97316" },
  bounce: { title: "zerogInsightBounceTitle", body: "zerogInsightBounceBody", dot: "#f97316" },
  drifting: { title: "zerogInsightDriftingTitle", body: "zerogInsightDriftingBody", dot: "#1abc9c" },
}
/** Insights where a trail makes the point visible, so the panel adds the trail tip. */
const TRAIL_INSIGHTS: ReadonlySet<InsightKind> = new Set(["gravity-off-moving", "throw-gravity", "throw-zero-g", "gravity-on"])

type PhaseKey = "zerogPhaseBriefing" | "zerogPhaseRunning" | "zerogPhasePaused" | "zerogPhaseSuccess" | "zerogPhaseFailed"
const PHASE_KEY: Record<GamePhase, PhaseKey> = {
  briefing: "zerogPhaseBriefing",
  running: "zerogPhaseRunning",
  paused: "zerogPhasePaused",
  success: "zerogPhaseSuccess",
  failed: "zerogPhaseFailed",
}
const PHASE_DOT: Record<GamePhase, string> = {
  briefing: "bg-slate-400",
  running: "bg-avanza-green",
  paused: "bg-amber-400",
  success: "bg-avanza-green",
  failed: "bg-red-400",
}

const PANEL = "rounded-2xl bg-white p-5 ring-1 ring-avanza-dark/10"

type AchievementKey = "zerogAchFirstMission" | "zerogAchAllMissions" | "zerogAchScientist" | "zerogAchGoodGuess" | "zerogAchPlanetHopper"
const ACHIEVEMENT_KEY: Record<AchievementId, AchievementKey> = {
  "first-mission": "zerogAchFirstMission",
  "all-missions": "zerogAchAllMissions",
  scientist: "zerogAchScientist",
  "good-guess": "zerogAchGoodGuess",
  "planet-hopper": "zerogAchPlanetHopper",
}

function formatG(g: number) {
  return `${g.toFixed(1)} m/s²`
}

function formatMass(kg: number) {
  return kg < 0.1 ? `${Math.round(kg * 1000)} g` : `${kg} kg`
}

export function GravitySwitch() {
  const { t, language } = useLanguage()
  const c = t.gamesPage
  const [state, dispatch] = useReducer(gameReducer, initialGameState)
  const reducedMotion = useReducedMotion()
  const sound = useLabSound()
  // Trails: a mission can ask for them by default; the player's toggle
  // overrides that for the mission (or the sandbox) they pressed it in.
  const [trailsOverride, setTrailsOverride] = useState<{ context: string; value: boolean } | null>(null)

  const key = worldKey(state)
  const config = activeWorldConfig(state)
  const gravity = activeGravity(state)
  const { worldRef, status, objectCount, readyKey, refreshObjectCount } = useGravitySwitchWorld({
    worldKey: key,
    config,
    gravity,
    paused: !isSimulating(state),
  })

  const mission = state.mode === "missions" && state.missions.activeId ? getMission(state.missions.activeId) : null
  const experiment = state.mode === "sandbox" && state.sandbox.experiment ? getExperiment(state.sandbox.experiment.id) : null
  const trailsContext = mission ? mission.id : experiment ? `experiment:${experiment.id}` : "sandbox"
  const trailsEnabled =
    trailsOverride && trailsOverride.context === trailsContext
      ? trailsOverride.value
      : (mission?.trailsByDefault ?? experiment !== null)
  const missionRunning = mission !== null && state.missions.phase === "running"
  const onMissionEvent = useCallback((event: TrackerEvent) => {
    if (event.type === "mission-complete") dispatch({ type: "complete-mission" })
    else if (event.type === "mission-failed") dispatch({ type: "fail-mission", reason: event.reason })
  }, [])
  const trackerApi = useMissionTracker({
    scenario: mission,
    attemptKey: mission ? key : null,
    running: missionRunning,
    gravity: state.missions.gravity,
    flips: state.missions.flips,
    onEvent: onMissionEvent,
  })

  // Guided experiments reuse the same tracker; their one objective marks the moment to explain.
  const experimentRunning = experiment !== null && !state.sandbox.experiment!.observed && !state.sandbox.paused
  const onExperimentEvent = useCallback((event: TrackerEvent) => {
    if (event.type === "mission-complete") dispatch({ type: "experiment-observed" })
  }, [])
  const experimentApi = useMissionTracker({
    scenario: experiment,
    attemptKey: experiment ? key : null,
    running: experimentRunning,
    gravity: state.sandbox.gravity,
    flips: 0,
    onEvent: onExperimentEvent,
  })

  // Saved progress: read once after mount (never during render, so server and
  // client markup agree), then written whenever the completed list changes.
  const progressLoadedRef = useRef(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const loaded = loadProgress(browserStorage())
      dispatch({ type: "load-progress", completed: loaded.completed, stats: loaded.stats })
      progressLoadedRef.current = true
    })
    return () => cancelAnimationFrame(id)
  }, [])
  const completed = state.missions.completed
  const progress = state.progress
  useEffect(() => {
    if (progressLoadedRef.current) saveProgress(browserStorage(), completed, progress)
  }, [completed, progress])
  const resetProgress = () => {
    clearProgress(browserStorage())
    dispatch({ type: "reset-progress" })
  }

  const insights = useSandboxInsights({
    enabled: state.mode === "sandbox" && experiment === null,
    worldRef,
    readyKey,
    gravity,
  })
  const missionFrame = trackerApi.onFrame
  const experimentFrame = experimentApi.onFrame
  const insightFrame = insights.onFrame
  const onFrame = useCallback(
    (sample: FrameSample) => {
      missionFrame(sample)
      experimentFrame(sample)
      insightFrame(sample)
    },
    [missionFrame, experimentFrame, insightFrame],
  )
  const note = insights.note
  const noteIfSandbox = useCallback(
    (event: PlayerEvent) => {
      if (state.mode === "sandbox") note(event)
    },
    [state.mode, note],
  )
  const onSpawn = useCallback((objectId: string) => noteIfSandbox({ type: "spawn", objectId }), [noteIfSandbox])
  const onThrow = useCallback((objectId: string, speed: number) => noteIfSandbox({ type: "throw", objectId, speed }), [noteIfSandbox])

  const canFlip = canFlipSwitch(state)
  const canDrag = state.mode === "sandbox" || (mission?.allowPush === true && state.missions.phase === "running")
  const playSound = sound.play
  const [flippedOnce, setFlippedOnce] = useState(false)
  const toggleGravity = () => {
    if (!canFlip) return
    setFlippedOnce(true)
    unlockAudio()
    playSound(gravity.switchOn ? "switchOff" : "switchOn")
    noteIfSandbox({ type: "switch", on: !gravity.switchOn })
    dispatch({ type: "toggle-gravity" })
  }

  // A win bursts confetti and chimes; a loss hums softly. Derived from the
  // attempt so each outcome fires exactly once.
  const missionPhase = state.missions.phase
  const missionAttempt = state.missions.attempt
  const celebrateToken = missionPhase === "success" ? missionAttempt : 0
  useEffect(() => {
    if (missionPhase === "success") playSound("success")
    else if (missionPhase === "failed") playSound("fail")
  }, [missionPhase, missionAttempt, playSound])
  const experimentObserved = state.sandbox.experiment?.observed ?? false
  useEffect(() => {
    if (experimentObserved) playSound("success")
  }, [experimentObserved, playSound])
  const selectPreset = (preset: GravityPresetId) => {
    if (preset !== gravity.preset) noteIfSandbox({ type: "preset", preset })
    dispatch({ type: "set-preset", preset })
  }
  const labels = useMemo(
    () => ({
      gravityOn: `${c.zerogSwitchLabel} ${c.zerogSwitchOn}`.toUpperCase(),
      gravityOff: `${c.zerogSwitchLabel} ${c.zerogSwitchOff}`.toUpperCase(),
    }),
    [c],
  )

  const stage: StageProps = {
    worldRef,
    readyKey,
    status,
    room: config,
    trailsEnabled,
    canDrag,
    spawnKind: state.mode === "sandbox" ? state.sandbox.spawnKind : null,
    onObjectsChanged: refreshObjectCount,
    onSpawn,
    onThrow,
    gravity,
    canFlip,
    lockedHint: mission?.switchLocked ? c.zerogSwitchLocked : null,
    onToggleGravity: toggleGravity,
    labels,
    onFrame,
    onImpact: sound.impact,
    reducedMotion,
    celebrateToken,
    muted: sound.muted,
    onToggleMute: sound.toggleMute,
    nudge: !flippedOnce && state.mode === "sandbox" && canFlip,
  }
  const toggleTrails = () => setTrailsOverride({ context: trailsContext, value: !trailsEnabled })
  const settings = {
    muted: sound.muted,
    onToggleMute: sound.toggleMute,
    trailsEnabled,
    onToggleTrails: toggleTrails,
    onResetProgress: resetProgress,
  }
  const clearSpawned = () => {
    const world = worldRef.current
    if (world && !world.isDisposed) world.clearSpawned()
    refreshObjectCount()
  }

  /**
   * G flips gravity, but only while focus is somewhere inside the lab (a
   * button, the canvas), so typing elsewhere on the page is never hijacked.
   */
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return
    const target = event.target as HTMLElement | null
    if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return
    if (event.key === "g" || event.key === "G") {
      if (!canFlip) return
      event.preventDefault()
      toggleGravity()
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#f4f6fb] py-20 md:py-24">
      <div className="relative mx-auto max-w-6xl px-6" onKeyDown={onKeyDown} onPointerDownCapture={unlockAudio}>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-purple">{c.zerogEyebrow}</p>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            {c.zerogTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{c.zerogDesc}</p>

          <div className="mx-auto mt-8 inline-flex rounded-full bg-white p-1 shadow-sm ring-1 ring-avanza-dark/10">
            <ModeTab
              active={state.mode === "sandbox"}
              onClick={() => dispatch({ type: "select-mode", mode: "sandbox" })}
              label={c.zerogModeSandbox}
            />
            <ModeTab
              active={state.mode === "missions"}
              onClick={() => dispatch({ type: "select-mode", mode: "missions" })}
              label={c.zerogModeMissions}
            />
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-10">
            {state.mode === "sandbox" ? (
              <SandboxView
                state={state}
                dispatch={dispatch}
                stage={stage}
                objectCount={objectCount}
                experiment={experiment}
                insight={insights.insight}
                language={language}
                settings={settings}
                freshAchievements={state.freshAchievements}
                onSelectPreset={selectPreset}
                onToggleTrails={toggleTrails}
                onClear={clearSpawned}
                c={c}
              />
            ) : mission ? (
              <MissionView
                key={mission.id}
                state={state}
                mission={mission}
                language={language}
                dispatch={dispatch}
                stage={stage}
                snapshot={trackerApi.snapshot}
                question={trackerApi.question}
                onAnswer={trackerApi.answer}
                onSelectPreset={selectPreset}
                onTryExperiment={(experimentId) => dispatch({ type: "select-experiment", experimentId })}
                onToggleTrails={toggleTrails}
                settings={settings}
                freshAchievements={state.freshAchievements}
                c={c}
              />
            ) : (
              <MissionList
                completed={state.missions.completed}
                stats={state.progress}
                language={language}
                settings={settings}
                onPick={(missionId) => dispatch({ type: "select-mission", missionId })}
                c={c}
              />
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Views
// ---------------------------------------------------------------------------

function SandboxView({
  state,
  dispatch,
  stage,
  objectCount,
  experiment,
  insight,
  language,
  settings,
  freshAchievements,
  onSelectPreset,
  onToggleTrails,
  onClear,
  c,
}: {
  state: GameState
  dispatch: Dispatch
  stage: StageProps
  objectCount: number
  experiment: ExperimentDefinition | null
  insight: Insight | null
  language: Language
  settings: SettingsProps
  freshAchievements: AchievementId[]
  onSelectPreset: (preset: GravityPresetId) => void
  onToggleTrails: () => void
  onClear: () => void
  c: Msg
}) {
  const { gravity, paused, spawnKind } = state.sandbox
  return (
    <div className="grid gap-6 lg:grid-cols-[1.7fr_0.9fr] lg:items-start">
      <Stage {...stage} c={c} />
      <aside className="flex flex-col gap-4">
        {experiment && state.sandbox.experiment ? (
          <ExperimentPanel
            experiment={experiment}
            progress={state.sandbox.experiment}
            paused={paused}
            language={language}
            freshAchievements={freshAchievements}
            dispatch={dispatch}
            c={c}
          />
        ) : (
          <LearningPanel
            insight={insight}
            trailsEnabled={stage.trailsEnabled}
            language={language}
            freshAchievements={freshAchievements}
            onSelectExperiment={(experimentId) => dispatch({ type: "select-experiment", experimentId })}
            c={c}
          />
        )}
        <Palette
          selected={spawnKind}
          count={objectCount}
          onSelect={(kind) => dispatch({ type: "select-spawn-kind", kind })}
          c={c}
        />
        <PlanetPicker
          presets={selectablePresets(state)}
          selected={gravity.preset}
          enabled
          onSelect={onSelectPreset}
          c={c}
        />
        <div className="flex flex-wrap gap-2">
          {paused ? (
            <ActionButton primary onClick={() => dispatch({ type: "resume" })}>
              <Play className="h-4 w-4" />
              {c.zerogResume}
            </ActionButton>
          ) : (
            <ActionButton onClick={() => dispatch({ type: "pause" })}>
              <Pause className="h-4 w-4" />
              {c.zerogPause}
            </ActionButton>
          )}
          <ActionButton onClick={() => dispatch({ type: "reset" })}>
            <RotateCcw className="h-4 w-4" />
            {c.zerogReset}
          </ActionButton>
          <ActionButton onClick={onClear}>
            <Eraser className="h-4 w-4" />
            {c.zerogClear}
          </ActionButton>
          <ActionButton pressed={stage.trailsEnabled} onClick={onToggleTrails}>
            <Waypoints className="h-4 w-4" />
            {c.zerogTrails}
          </ActionButton>
        </div>
        <ScienceNotes c={c} />
        <SettingsPanel {...settings} onResetRoom={() => dispatch({ type: "reset" })} c={c} />
      </aside>
    </div>
  )
}

function MissionList({
  completed,
  stats,
  language,
  settings,
  onPick,
  c,
}: {
  completed: MissionId[]
  stats: ProgressStats
  language: Language
  settings: SettingsProps
  onPick: (missionId: MissionId) => void
  c: Msg
}) {
  const total = MISSIONS.length
  const done = MISSIONS.filter((mission) => completed.includes(mission.id)).length
  const nextUp = MISSIONS.find((mission) => !completed.includes(mission.id))?.id ?? null
  const rows = process.env.NODE_ENV !== "production" ? [...MISSIONS, DEV_MISSION] : MISSIONS
  const earned = earnedAchievements(completed, stats)

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-center text-base leading-relaxed text-muted-foreground">{c.zerogMissionsIntro}</p>
      <div className="mt-6 flex items-center gap-3" role="group" aria-label={c.zerogModeMissions}>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-avanza-dark/10" aria-hidden="true">
          <div
            className="h-2 rounded-full bg-avanza-green transition-[width] duration-500"
            style={{ width: `${(done / total) * 100}%` }}
          />
        </div>
        <p className="shrink-0 text-xs font-bold text-muted-foreground">
          {formatTemplate(c.zerogProgress, { done, total })}
        </p>
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1" aria-label={c.zerogAchievements} data-achievements>
        {ACHIEVEMENT_IDS.map((id) => {
          const has = earned.includes(id)
          return (
            <li key={id} data-achievement={id} data-earned={has ? "true" : "false"} className={cn("flex items-center gap-1.5 text-xs", has ? "font-bold text-avanza-green-dark" : "text-muted-foreground")}>
              <span aria-hidden="true" className={cn("flex h-4 w-4 items-center justify-center rounded-full", has ? "bg-avanza-green text-white" : "ring-1 ring-avanza-dark/20")}>
                {has && <Check className="h-3 w-3" strokeWidth={3} />}
              </span>
              {c[ACHIEVEMENT_KEY[id]]}
            </li>
          )
        })}
      </ul>
      <ol className="mt-4 divide-y divide-avanza-dark/10 overflow-hidden rounded-3xl bg-white ring-1 ring-avanza-dark/10">
        {rows.map((mission) => {
          const isDev = mission.id === DEV_MISSION.id
          const index = missionIndex(mission.id)
          const isDone = completed.includes(mission.id)
          const isNext = mission.id === nextUp
          const isLast = mission.id === stats.lastMissionId
          const times = stats.completions[mission.id] ?? 0
          return (
            <li
              key={mission.id}
              className={cn("flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-4 sm:px-6", isDone && "bg-avanza-green/[0.06]")}
              data-mission={mission.id}
              data-done={isDone ? "true" : "false"}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold",
                  isDone ? "bg-avanza-green text-white" : "bg-avanza-dark/5 text-muted-foreground",
                )}
              >
                {isDone ? <Check className="h-4 w-4" strokeWidth={3} /> : isDev ? "D" : String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1 basis-[12rem]">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-base font-extrabold text-foreground">
                  {mission.text.name[language]}
                  {isDone && (
                    <span className="text-xs font-bold text-avanza-green-dark">
                      {times > 1 ? formatTemplate(c.zerogDoneCount, { n: times }) : c.zerogDone}
                    </span>
                  )}
                  {isNext && !isDone && <span className="text-xs font-bold text-avanza-purple">{c.zerogNextUp}</span>}
                  {isLast && !isDev && <span className="text-xs font-bold text-muted-foreground">{c.zerogLastPlayed}</span>}
                  {isDev && <span className="text-xs font-bold text-amber-700">{c.zerogDevTag}</span>}
                </p>
                <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{mission.text.objective[language]}</p>
              </div>
              <ActionButton primary={!isDone} onClick={() => onPick(mission.id)}>
                {isDone ? c.zerogPlayAgain : c.zerogPlay}
                <ChevronRight className="h-4 w-4" />
              </ActionButton>
            </li>
          )
        })}
      </ol>
      <div className="mt-4">
        <SettingsPanel {...settings} c={c} />
      </div>
    </div>
  )
}

function MissionView({
  state,
  mission,
  language,
  dispatch,
  stage,
  snapshot,
  question,
  onAnswer,
  onSelectPreset,
  onTryExperiment,
  onToggleTrails,
  settings,
  freshAchievements,
  c,
}: {
  state: GameState
  mission: MissionDefinition
  language: Language
  dispatch: Dispatch
  stage: StageProps
  snapshot: TrackerSnapshot | null
  question: (Extract<Objective, { kind: "answer" }> & { index: number }) | null
  onAnswer: (choiceId: string) => void
  onSelectPreset: (preset: GravityPresetId) => void
  onTryExperiment: (experimentId: ExperimentId) => void
  onToggleTrails: () => void
  settings: SettingsProps
  freshAchievements: AchievementId[]
  c: Msg
}) {
  const ms = state.missions
  const terminal = ms.phase === "success" || ms.phase === "failed"
  const next = nextMissionId(mission.id)
  const [hintShown, setHintShown] = useState(false)
  const index = missionIndex(mission.id)
  const activeTimed = snapshot?.statuses.find((status) => status.state === "active" && TIMED_OBJECTIVES.has(status.kind)) ?? null
  const needsPrediction = awaitingPrediction(state)
  const predictedLabel =
    mission.prediction && ms.prediction
      ? (mission.prediction.choices.find((choice) => choice.id === ms.prediction)?.label[language] ?? null)
      : null

  return (
    <div className="grid gap-6 lg:grid-cols-[1.7fr_0.9fr] lg:items-start">
      <Stage {...stage} c={c}>
        {terminal && ms.result && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0f172a]/80 p-4 backdrop-blur-sm sm:p-6">
            <div className="w-full max-w-sm rounded-2xl bg-white p-5 text-center shadow-xl animate-in fade-in zoom-in-95 duration-300 motion-reduce:animate-none sm:p-6">
              <h3 className="text-xl font-extrabold text-foreground">
                {ms.result.kind === "success" ? c.zerogPhaseSuccess : c.zerogPhaseFailed}
              </h3>
              {ms.result.kind === "success" ? (
                <>
                  {predictedLabel && (
                    <p className="mt-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {formatTemplate(c.zerogPredicted, { choice: predictedLabel })}
                    </p>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-foreground">{mission.text.success[language]}</p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wider text-avanza-purple">{c.zerogConceptLabel}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{mission.text.concept[language]}</p>
                  <FreshAchievements ids={freshAchievements} c={c} />
                </>
              ) : (
                <>
                  <p className="mt-3 text-sm font-bold leading-relaxed text-foreground">{c[FAIL_KEY[ms.result.reason]]}</p>
                  {mission.text.failure && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{mission.text.failure[language]}</p>
                  )}
                </>
              )}
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {ms.result.kind === "success" && next && (
                  <ActionButton primary onClick={() => dispatch({ type: "next-mission" })}>
                    {c.zerogNextMission}
                    <ChevronRight className="h-4 w-4" />
                  </ActionButton>
                )}
                {ms.result.kind === "success" && mission.tryNext && (
                  <ActionButton onClick={() => onTryExperiment(mission.tryNext!)}>
                    <FlaskConical className="h-4 w-4" />
                    {formatTemplate(c.zerogTryExperiment, { name: getExperiment(mission.tryNext).text.name[language] })}
                  </ActionButton>
                )}
                <ActionButton primary={ms.result.kind === "failed"} onClick={() => dispatch({ type: "reset" })}>
                  <RotateCcw className="h-4 w-4" />
                  {c.zerogRetry}
                </ActionButton>
                <ActionButton onClick={() => dispatch({ type: "exit-mission" })}>
                  <ChevronLeft className="h-4 w-4" />
                  {c.zerogBackToMissions}
                </ActionButton>
              </div>
            </div>
          </div>
        )}
      </Stage>

      <aside className="flex flex-col gap-4">
        <div className={PANEL}>
          <p className="text-xs font-bold uppercase tracking-wider text-avanza-purple">
            {index >= 0 ? formatTemplate(c.zerogMissionNumber, { n: index + 1 }) : c.zerogDevTag}
          </p>
          <h3 className="mt-1 text-2xl font-extrabold leading-tight text-foreground">{mission.text.name[language]}</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-bold text-foreground">{c.zerogGoalLabel}</dt>
              <dd className="mt-0.5 leading-relaxed text-muted-foreground">{mission.text.objective[language]}</dd>
            </div>
            <div data-learning>
              <dt className="font-bold text-foreground">{c.zerogLearningLabel}</dt>
              <dd className="mt-0.5 leading-relaxed text-muted-foreground">{mission.text.learning[language]}</dd>
            </div>
          </dl>

          {snapshot && mission.objectives.length > 1 && (
            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{c.zerogStepsLabel}</p>
              <ol className="mt-2 space-y-1.5">
                {mission.objectives.map((objective, i) => {
                  const status = snapshot.statuses[i]
                  return (
                    <li
                      key={i}
                      data-step-state={status.state}
                      className={cn(
                        "flex items-center gap-2 text-sm",
                        status.state === "done"
                          ? "text-avanza-green-dark"
                          : status.state === "active"
                            ? "font-bold text-foreground"
                            : "text-muted-foreground",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                          status.state === "done"
                            ? "bg-avanza-green text-white"
                            : status.state === "active"
                              ? "bg-avanza-dark text-white"
                              : "bg-avanza-dark/10 text-muted-foreground",
                        )}
                      >
                        {status.state === "done" ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
                      </span>
                      <span className="flex-1 leading-snug">{objectiveLabel(objective, language, c)}</span>
                    </li>
                  )
                })}
              </ol>
            </div>
          )}

          {activeTimed && (
            <div
              className="mt-3 h-2 overflow-hidden rounded-full bg-avanza-dark/10"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(activeTimed.progress * 100)}
              aria-label={objectiveLabel(mission.objectives[activeTimed.index], language, c)}
            >
              <div className="h-2 rounded-full bg-avanza-green" style={{ width: `${activeTimed.progress * 100}%` }} />
            </div>
          )}

          {mission.prediction && ms.phase === "briefing" && (
            <div className="mt-4 rounded-xl bg-avanza-purple/10 p-3 ring-1 ring-avanza-purple/20" data-prediction>
              <p className="text-sm font-bold text-foreground">{mission.prediction.prompt[language]}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {mission.prediction.choices.map((choice) => (
                  <ActionButton
                    key={choice.id}
                    pressed={ms.prediction === choice.id}
                    onClick={() => dispatch({ type: "predict", choiceId: choice.id })}
                  >
                    {choice.label[language]}
                  </ActionButton>
                ))}
              </div>
            </div>
          )}

          {question && (
            <div className="mt-4 rounded-xl bg-avanza-purple/10 p-3 ring-1 ring-avanza-purple/20" data-question>
              <p className="text-sm font-bold text-foreground">{question.prompt[language]}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {question.choices.map((choice) => (
                  <ActionButton key={choice.id} onClick={() => onAnswer(choice.id)}>
                    {choice.label[language]}
                  </ActionButton>
                ))}
              </div>
            </div>
          )}

          <p className="mt-4 flex items-center gap-2 text-sm font-bold text-foreground" aria-live="polite">
            <span aria-hidden="true" className={cn("h-2.5 w-2.5 rounded-full", PHASE_DOT[ms.phase])} />
            {c[PHASE_KEY[ms.phase]]}
          </p>

          {needsPrediction && <p className="mt-2 text-xs font-bold text-avanza-purple-dark">{c.zerogPredictFirst}</p>}

          <button
            type="button"
            aria-expanded={hintShown}
            onClick={() => setHintShown((value) => !value)}
            className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-avanza-purple-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-purple/70"
          >
            <Lightbulb className="h-4 w-4" />
            {hintShown ? c.zerogHintHide : c.zerogHintShow}
          </button>
          {hintShown && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{mission.text.hint[language]}</p>}

          <div className="mt-4 flex flex-wrap gap-2">
            {ms.phase === "briefing" && (
              <ActionButton primary disabled={needsPrediction} onClick={() => dispatch({ type: "start" })}>
                <Play className="h-4 w-4" />
                {c.zerogStart}
              </ActionButton>
            )}
            {ms.phase === "running" && (
              <ActionButton onClick={() => dispatch({ type: "pause" })}>
                <Pause className="h-4 w-4" />
                {c.zerogPause}
              </ActionButton>
            )}
            {ms.phase === "paused" && (
              <ActionButton primary onClick={() => dispatch({ type: "resume" })}>
                <Play className="h-4 w-4" />
                {c.zerogResume}
              </ActionButton>
            )}
            <ActionButton onClick={() => dispatch({ type: "reset" })}>
              <RotateCcw className="h-4 w-4" />
              {c.zerogReset}
            </ActionButton>
            <ActionButton onClick={() => dispatch({ type: "exit-mission" })}>
              <ChevronLeft className="h-4 w-4" />
              {c.zerogBackToMissions}
            </ActionButton>
            <ActionButton pressed={stage.trailsEnabled} onClick={onToggleTrails}>
              <Waypoints className="h-4 w-4" />
              {c.zerogTrails}
            </ActionButton>
          </div>
        </div>

        <PlanetPicker
          presets={selectablePresets(state)}
          selected={ms.gravity.preset}
          enabled={!terminal}
          onSelect={onSelectPreset}
          c={c}
        />
        <SettingsPanel {...settings} c={c} />
      </aside>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Pieces
// ---------------------------------------------------------------------------

/**
 * "What's happening?": one short explanation of the latest meaningful thing in
 * free play, plus the three guided experiments to try.
 */
function LearningPanel({
  insight,
  trailsEnabled,
  language,
  freshAchievements,
  onSelectExperiment,
  c,
}: {
  insight: Insight | null
  trailsEnabled: boolean
  language: Language
  freshAchievements: AchievementId[]
  onSelectExperiment: (experimentId: ExperimentId) => void
  c: Msg
}) {
  const kind = insight?.kind ?? "idle"
  const keys = INSIGHT_KEY[kind]
  const trailTip = TRAIL_INSIGHTS.has(kind) ? (trailsEnabled ? c.zerogTrailTipOn : c.zerogTrailTipOff) : null
  return (
    <div className={PANEL} data-insight={kind}>
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        <span aria-hidden="true" className="inline-block h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: keys.dot }} />
        {c.zerogWhatsHappening}
      </p>
      <FreshAchievements ids={freshAchievements} c={c} />
      <div aria-live="polite">
        <p className="mt-2 text-base font-extrabold leading-snug text-foreground">{c[keys.title]}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {c[keys.body]}
          {trailTip && <span className="mt-1 block text-avanza-purple-dark">{trailTip}</span>}
        </p>
      </div>
      <div className="mt-4 border-t border-avanza-dark/10 pt-3">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{c.zerogExperimentsTitle}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {EXPERIMENTS.map((experiment) => (
            <ActionButton key={experiment.id} onClick={() => onSelectExperiment(experiment.id)}>
              <FlaskConical className="h-4 w-4" />
              {experiment.text.name[language]}
            </ActionButton>
          ))}
        </div>
      </div>
    </div>
  )
}

/** A guided experiment: guess (or skip), press Go, do the one thing, read what happened. */
function ExperimentPanel({
  experiment,
  progress,
  paused,
  language,
  freshAchievements,
  dispatch,
  c,
}: {
  experiment: ExperimentDefinition
  progress: NonNullable<GameState["sandbox"]["experiment"]>
  paused: boolean
  language: Language
  freshAchievements: AchievementId[]
  dispatch: Dispatch
  c: Msg
}) {
  const guessedLabel = progress.prediction
    ? (experiment.prediction.choices.find((choice) => choice.id === progress.prediction)?.label[language] ?? null)
    : null
  const guessedRight = progress.prediction !== null && progress.prediction === experiment.prediction.correctId
  return (
    <div className={PANEL} data-experiment={experiment.id} data-observed={progress.observed ? "true" : "false"}>
      <p className="text-xs font-bold uppercase tracking-wider text-avanza-purple">{c.zerogExperimentLabel}</p>
      <h3 className="mt-1 text-xl font-extrabold leading-tight text-foreground">{experiment.text.name[language]}</h3>

      {!progress.observed ? (
        <>
          {!progress.skipped && (
            <div className="mt-3 rounded-xl bg-avanza-purple/10 p-3 ring-1 ring-avanza-purple/20" data-prediction>
              <p className="text-sm font-bold text-foreground">{experiment.prediction.prompt[language]}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {experiment.prediction.choices.map((choice) => (
                  <ActionButton
                    key={choice.id}
                    pressed={progress.prediction === choice.id}
                    onClick={() => dispatch({ type: "experiment-predict", choiceId: choice.id })}
                  >
                    {choice.label[language]}
                  </ActionButton>
                ))}
              </div>
              <button
                type="button"
                onClick={() => dispatch({ type: "experiment-skip" })}
                className="mt-1 inline-flex min-h-11 items-center text-xs font-bold text-avanza-purple-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-purple/70"
              >
                {c.zerogSkipGuess}
              </button>
            </div>
          )}
          <p className="mt-3 text-sm font-bold leading-snug text-foreground">{experiment.text.instruction[language]}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {paused && (
              <ActionButton primary onClick={() => dispatch({ type: "resume" })}>
                <Play className="h-4 w-4" />
                {c.zerogGo}
              </ActionButton>
            )}
            <ActionButton onClick={() => dispatch({ type: "end-experiment" })}>
              <ChevronLeft className="h-4 w-4" />
              {c.zerogBackToPlay}
            </ActionButton>
          </div>
        </>
      ) : (
        <div className="mt-3" aria-live="polite" data-result>
          {guessedLabel && (
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {formatTemplate(c.zerogPredicted, { choice: guessedLabel })}
            </p>
          )}
          {guessedLabel && (
            <p className={cn("mt-1 text-sm font-bold", guessedRight ? "text-avanza-green-dark" : "text-avanza-orange-dark")}>
              {guessedRight ? c.zerogGuessRight : c.zerogGuessWrong}
            </p>
          )}
          <p className="mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{c.zerogWhatHappened}</p>
          <p className="mt-1 text-sm leading-relaxed text-foreground">{experiment.text.result[language]}</p>
          <FreshAchievements ids={freshAchievements} c={c} />
          <div className="mt-3 flex flex-wrap gap-2">
            <ActionButton onClick={() => dispatch({ type: "reset" })}>
              <RotateCcw className="h-4 w-4" />
              {c.zerogRestartExperiment}
            </ActionButton>
            <ActionButton primary onClick={() => dispatch({ type: "end-experiment" })}>
              <ChevronLeft className="h-4 w-4" />
              {c.zerogBackToPlay}
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * The room: a canvas painted every frame by `useGravitySwitchCanvas`, the big
 * gravity switch right under it so it is always within reach, and a one-line
 * caption with the current planet.
 */
function Stage({
  worldRef,
  readyKey,
  status,
  room,
  trailsEnabled,
  canDrag,
  spawnKind,
  onObjectsChanged,
  onSpawn,
  onThrow,
  gravity,
  canFlip,
  lockedHint,
  onToggleGravity,
  labels,
  onFrame,
  onImpact,
  reducedMotion,
  celebrateToken,
  muted,
  onToggleMute,
  nudge,
  c,
  children,
}: StageProps & {
  c: Msg
  children?: React.ReactNode
}) {
  const { canvasRef, containerRef } = useGravitySwitchCanvas({
    worldRef,
    readyKey,
    room,
    gravity,
    trailsEnabled,
    canDrag,
    spawnKind,
    onObjectsChanged,
    onSpawn,
    onThrow,
    labels,
    onFrame,
    onImpact,
    reducedMotion,
    celebrateToken,
  })
  const g = effectiveGravity(gravity)
  const captionId = useId()

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#0f172a] p-3 shadow-[0_28px_64px_-30px_rgba(15,23,42,0.6)] ring-1 ring-avanza-dark/10">
      <div ref={containerRef} className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#111c33]">
        <canvas
          ref={canvasRef}
          tabIndex={0}
          role="img"
          aria-label={c.zerogStageLabel}
          aria-describedby={captionId}
          className={cn(
            "block h-full w-full touch-none select-none outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-avanza-green/80",
            canDrag ? "cursor-grab active:cursor-grabbing" : "cursor-default",
          )}
        />
        {status !== "ready" && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#111c33]/80 p-6 text-center" aria-live="polite">
            <p className="max-w-sm text-sm font-bold leading-relaxed text-white/85">
              {status === "error" ? c.zerogLoadError : c.zerogLoading}
            </p>
          </div>
        )}
        {children}
      </div>

      <BigGravitySwitch gravity={gravity} enabled={canFlip} lockedHint={lockedHint} nudge={nudge} onToggle={onToggleGravity} c={c} />

      <div className="mt-2 flex items-center justify-between gap-3 px-1">
        <p id={captionId} className={cn("text-xs", nudge ? "font-bold text-white" : "text-white/70")} data-nudge={nudge ? "true" : undefined}>
          {nudge ? (
            c.zerogNudge
          ) : (
            <>
              {c[PRESET_NAME_KEY[gravity.preset]]} · {formatG(g)}
              <span className="hidden sm:inline"> · {c.zerogShortcut}</span>
            </>
          )}
        </p>
        <button
          type="button"
          onClick={onToggleMute}
          aria-pressed={!muted}
          aria-label={muted ? c.zerogSoundOn : c.zerogSoundOff}
          title={muted ? c.zerogSoundOn : c.zerogSoundOff}
          className={cn(
            "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-1 ring-white/15 transition hover:bg-white/10",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green/80",
            muted ? "text-white/45" : "text-white/85",
          )}
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      </div>
    </div>
  )
}

/** The central mechanic: one large switch, always directly under the room. */
function BigGravitySwitch({
  gravity,
  enabled,
  lockedHint,
  nudge = false,
  onToggle,
  c,
}: {
  gravity: GravityState
  enabled: boolean
  lockedHint: string | null
  /** Pulse the lever gently until the first flip, so a child knows where to start. */
  nudge?: boolean
  onToggle: () => void
  c: Msg
}) {
  const on = gravity.switchOn
  return (
    <div className="mt-3">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        disabled={!enabled}
        onClick={onToggle}
        onKeyDown={(event) => {
          // Flip on keydown for Space and Enter and swallow the key: another
          // lab on the page listens for Space at document level and cancels
          // it, which would otherwise stop the button's native activation.
          if (event.key === " " || event.key === "Enter") {
            event.preventDefault()
            if (enabled) onToggle()
          }
        }}
        className={cn(
          "group flex min-h-[72px] w-full items-center justify-between gap-4 rounded-2xl px-4 py-3 text-left ring-1 transition-colors duration-300 motion-reduce:transition-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green/80",
          on ? "bg-avanza-green/15 ring-avanza-green/40 shadow-[inset_0_0_0_1px_rgba(46,204,113,0.15)]" : "bg-white/[0.06] ring-white/10",
          enabled ? "cursor-pointer hover:bg-white/10" : "cursor-not-allowed opacity-60",
        )}
      >
        <span className="min-w-0">
          <span className="block text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/60">{c.zerogSwitchLabel}</span>
          <span
            className={cn(
              "mt-0.5 block text-3xl font-extrabold leading-none transition-colors duration-300 motion-reduce:transition-none",
              on ? "text-avanza-green" : "text-white",
            )}
          >
            {on ? c.zerogSwitchOn : c.zerogSwitchOff}
          </span>
        </span>
        {/* The lever: a wide track with the knob sliding to the lit side. */}
        <span
          aria-hidden="true"
          className={cn(
            "relative h-14 w-32 shrink-0 rounded-full ring-2 transition-colors duration-300 motion-reduce:transition-none",
            on ? "bg-avanza-green ring-avanza-green/40 shadow-[0_0_24px_rgba(46,204,113,0.45)]" : "bg-slate-600 ring-white/10",
          )}
        >
          {nudge && enabled && (
            <span className="pointer-events-none absolute -inset-2 rounded-full ring-2 ring-white/70 motion-safe:animate-pulse" />
          )}
          <span
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 text-[11px] font-extrabold tracking-wider transition-opacity duration-300 motion-reduce:transition-none",
              on ? "text-avanza-dark/70 opacity-100" : "opacity-0",
            )}
          >
            ON
          </span>
          <span
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-extrabold tracking-wider text-white/70 transition-opacity duration-300 motion-reduce:transition-none",
              on ? "opacity-0" : "opacity-100",
            )}
          >
            OFF
          </span>
          <span
            className={cn(
              "absolute left-1.5 top-1.5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-avanza-dark shadow-md transition-transform duration-300 ease-out group-active:scale-95 motion-reduce:transition-none",
              on && "translate-x-[72px]",
            )}
          >
            {on ? <ArrowDown className="h-5 w-5" strokeWidth={3} /> : <Minus className="h-5 w-5" strokeWidth={3} />}
          </span>
        </span>
      </button>
      {lockedHint && (
        <p className="mt-2 flex items-center gap-1.5 px-1 text-xs text-white/70">
          <Lock className="h-3.5 w-3.5" />
          {lockedHint}
        </p>
      )}
    </div>
  )
}

/** "New: …" lines for achievements earned by the latest action. */
function FreshAchievements({ ids, c }: { ids: AchievementId[]; c: Msg }) {
  if (ids.length === 0) return null
  return (
    <ul className="mt-3 space-y-1" data-fresh-achievements>
      {ids.map((id) => (
        <li key={id} className="flex items-center justify-center gap-1.5 text-sm font-bold text-avanza-green-dark">
          <Check className="h-4 w-4" strokeWidth={3} />
          {formatTemplate(c.zerogNewAchievement, { name: c[ACHIEVEMENT_KEY[id]] })}
        </li>
      ))}
    </ul>
  )
}

type SettingsProps = {
  muted: boolean
  onToggleMute: () => void
  trailsEnabled: boolean
  onToggleTrails: () => void
  onResetProgress: () => void
}

/** Compact settings: sound, trails, reset the room (sandbox only), and a two-step reset of saved progress. */
function SettingsPanel({
  muted,
  onToggleMute,
  trailsEnabled,
  onToggleTrails,
  onResetRoom,
  onResetProgress,
  c,
}: SettingsProps & { onResetRoom?: () => void; c: Msg }) {
  const [confirming, setConfirming] = useState(false)
  const row = "flex min-h-11 items-center justify-between gap-3 py-1.5"
  return (
    <div className={PANEL} data-settings>
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        <Settings className="h-3.5 w-3.5" />
        {c.zerogSettings}
      </p>
      <div className="mt-2 divide-y divide-avanza-dark/10 text-sm">
        <div className={row}>
          <span className="font-bold text-foreground">{c.zerogSettingSound}</span>
          <ActionButton pressed={!muted} label={c.zerogSettingSound} onClick={onToggleMute}>
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {muted ? c.zerogToggleOff : c.zerogToggleOn}
          </ActionButton>
        </div>
        <div className={row}>
          <span className="font-bold text-foreground">{c.zerogSettingTrails}</span>
          <ActionButton pressed={trailsEnabled} label={c.zerogSettingTrails} onClick={onToggleTrails}>
            <Waypoints className="h-4 w-4" />
            {trailsEnabled ? c.zerogToggleOn : c.zerogToggleOff}
          </ActionButton>
        </div>
        {onResetRoom && (
          <div className={row}>
            <span className="font-bold text-foreground">{c.zerogSettingResetRoom}</span>
            <ActionButton label={c.zerogSettingResetRoom} onClick={onResetRoom}>
              <RotateCcw className="h-4 w-4" />
              {c.zerogReset}
            </ActionButton>
          </div>
        )}
        <div className="py-1.5">
          {!confirming ? (
            <div className={cn(row, "py-0")}>
              <span className="font-bold text-foreground">{c.zerogSettingResetProgress}</span>
              <ActionButton label={c.zerogSettingResetProgress} onClick={() => setConfirming(true)}>
                <Eraser className="h-4 w-4" />
                {c.zerogReset}
              </ActionButton>
            </div>
          ) : (
            <div className="rounded-xl bg-red-50 p-3 ring-1 ring-red-200" data-reset-confirm>
              <p className="text-sm font-bold text-red-800">{c.zerogResetConfirm}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <ActionButton
                  primary
                  onClick={() => {
                    onResetProgress()
                    setConfirming(false)
                  }}
                >
                  {c.zerogResetYes}
                </ActionButton>
                <ActionButton onClick={() => setConfirming(false)}>{c.zerogResetNo}</ActionButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/** What a tap on the room drops in. Shows mass so weight and gravity stay distinct ideas. */
function Palette({
  selected,
  count,
  onSelect,
  c,
}: {
  selected: ObjectKind
  count: number
  onSelect: (kind: ObjectKind) => void
  c: Msg
}) {
  const full = count >= MAX_SANDBOX_OBJECTS
  return (
    <div className={PANEL}>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{c.zerogPaletteTitle}</p>
        <p className={cn("text-xs font-bold", full ? "text-avanza-orange-dark" : "text-muted-foreground")} aria-live="polite">
          {formatTemplate(c.zerogObjectLimit, { n: count, max: MAX_SANDBOX_OBJECTS })}
        </p>
      </div>
      <p className="mt-1 text-sm leading-snug text-muted-foreground">{c.zerogHowTo}</p>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-3" role="group" aria-label={c.zerogPaletteTitle}>
        {OBJECT_ORDER.map((kind) => {
          const active = kind === selected
          return (
            <button
              key={kind}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(kind)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl px-2 py-2.5 text-center ring-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-purple/70",
                active ? "bg-avanza-dark text-white ring-avanza-dark" : "bg-white text-foreground ring-avanza-dark/10 hover:bg-[#f4f6fb]",
              )}
            >
              <ObjectSwatch kind={kind} />
              <span className="text-xs font-bold leading-tight">{c[OBJECT_NAME_KEY[kind]]}</span>
              <span className={cn("font-mono text-[11px]", active ? "text-white/70" : "text-muted-foreground")}>
                {formatMass(OBJECT_SPECS[kind].mass)}
              </span>
            </button>
          )
        })}
      </div>
      {full && <p className="mt-3 text-xs font-bold text-avanza-orange-dark">{c.zerogRoomFull}</p>}
    </div>
  )
}

/** A tiny picture of the object, in the same colour and shape the canvas draws it. */
const SWATCH_WIDTH = 48
const SWATCH_HEIGHT = 34

/** A tiny canvas painted with the room's own illustration of the object. */
function ObjectSwatch({ kind }: { kind: ObjectKind }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const dpr = Math.min(3, window.devicePixelRatio || 1)
    canvas.width = Math.round(SWATCH_WIDTH * dpr)
    canvas.height = Math.round(SWATCH_HEIGHT * dpr)
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, SWATCH_WIDTH, SWATCH_HEIGHT)
    drawObjectIcon(ctx, kind, SWATCH_WIDTH, SWATCH_HEIGHT)
  }, [kind])
  return <canvas ref={ref} aria-hidden="true" width={SWATCH_WIDTH} height={SWATCH_HEIGHT} className="h-[34px] w-12" />
}

/** The two simplifications a child should know about, in plain words. */
function ScienceNotes({ c }: { c: Msg }) {
  return (
    <div className="rounded-2xl border border-avanza-dark/10 bg-white/60 p-4 text-sm">
      <p className="font-bold text-foreground">{c.zerogVacuumTitle}</p>
      <p className="mt-1 leading-relaxed text-muted-foreground">{c.zerogVacuumNote}</p>
      <p className="mt-3 font-bold text-foreground">{c.zerogMassTitle}</p>
      <p className="mt-1 leading-relaxed text-muted-foreground">{c.zerogMassNote}</p>
    </div>
  )
}

function PlanetPicker({
  presets,
  selected,
  enabled,
  onSelect,
  c,
}: {
  presets: GravityPresetId[]
  selected: GravityPresetId
  enabled: boolean
  onSelect: (preset: GravityPresetId) => void
  c: Msg
}) {
  if (presets.length < 2) return null
  const ordered = GRAVITY_PRESET_ORDER.filter((id) => presets.includes(id))
  return (
    <div className={PANEL}>
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{c.zerogPlanetLabel}</p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
        {ordered.map((id) => {
          const preset = GRAVITY_PRESETS[id]
          const active = id === selected
          return (
            <button
              key={id}
              type="button"
              aria-pressed={active}
              disabled={!enabled}
              onClick={() => onSelect(id)}
              className={cn(
                "flex min-h-11 items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm font-bold ring-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-purple/70",
                active
                  ? "bg-avanza-dark text-white ring-avanza-dark"
                  : "bg-white text-foreground ring-avanza-dark/10 hover:bg-[#f4f6fb]",
                !enabled && "cursor-not-allowed opacity-60",
              )}
            >
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: preset.accent }} />
                {c[PRESET_NAME_KEY[id]]}
              </span>
              <span className={cn("font-mono text-xs", active ? "text-white/70" : "text-muted-foreground")}>
                {formatG(preset.g)}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ModeTab({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-full px-5 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-purple/70",
        active ? "bg-avanza-dark text-white" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </button>
  )
}

function ActionButton({
  primary = false,
  disabled = false,
  pressed,
  label,
  onClick,
  children,
}: {
  primary?: boolean
  disabled?: boolean
  /** Renders as a toggle (aria-pressed) when set. */
  pressed?: boolean
  /** Accessible name when the visible text alone is ambiguous (two "Reset" rows). */
  label?: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={pressed}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition active:scale-[0.97] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-purple/70 focus-visible:ring-offset-2 motion-reduce:transition-none",
        primary
          ? "bg-avanza-dark text-white hover:bg-avanza-dark/90"
          : pressed
            ? "bg-avanza-purple/10 text-avanza-purple-dark ring-1 ring-avanza-purple/40"
            : "bg-white text-foreground ring-1 ring-avanza-dark/10 hover:bg-[#eef1f7]",
      )}
    >
      {children}
    </button>
  )
}
