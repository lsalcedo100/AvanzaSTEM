"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Eraser,
  Hand,
  HelpCircle,
  Lightbulb,
  Lock,
  Power,
  Clock,
  RotateCcw,
  RotateCw,
  Sparkles,
  Star,
  Undo2,
  X,
  Zap,
} from "lucide-react"
import type { ComponentType } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import {
  type Cell,
  type Level,
  type Loc,
  type Side,
  type Tool,
  checkSolved,
  clone,
  computeStars,
  countKind,
  emptyGrid,
  LEVELS,
  openSidesForCell,
  partsUsed,
  SIDES,
  simulate,
} from "@/components/ui/circuit-levels"
import { createLevelUpSounds, playRandomLevelUpSound } from "@/components/ui/level-up-sounds"
import { type SolveResult, useCircuitProgress } from "@/components/ui/useCircuitProgress"
import { cn } from "@/lib/utils"

// Sandbox (free-play) board: a fully wired starter loop the player can rebuild.
const SANDBOX_COLS = 7
const SANDBOX_ROWS = 5

function sandboxGrid(): Cell[][] {
  const g = emptyGrid(SANDBOX_ROWS, SANDBOX_COLS)
  g[2][1] = { kind: "battery", orientation: "v" }
  g[1][1] = { kind: "wire" }
  g[0][1] = { kind: "wire" }
  g[0][2] = { kind: "wire" }
  g[0][3] = { kind: "switch", closed: true }
  g[0][4] = { kind: "wire" }
  g[0][5] = { kind: "wire" }
  g[1][5] = { kind: "wire" }
  g[2][5] = { kind: "wire" }
  g[3][5] = { kind: "wire" }
  g[4][5] = { kind: "wire" }
  g[4][4] = { kind: "wire" }
  g[4][3] = { kind: "bulb" }
  g[4][2] = { kind: "wire" }
  g[4][1] = { kind: "wire" }
  g[3][1] = { kind: "wire" }
  return g
}

const SANDBOX_TOOLS: Tool[] = ["hand", "wire", "bulb", "switch", "battery", "eraser"]

// Optional sandbox challenges. Each maps to a live condition read straight from
// the simulation, so they tick off as the player explores — they never gate the
// board (sandbox is free play first).
const SANDBOX_CHALLENGES: { id: string; labelKey: keyof ReturnType<typeof useLanguage>["t"]["gamesPage"] }[] = [
  { id: "light", labelKey: "circuitChallengeLight" },
  { id: "switch", labelKey: "circuitChallengeSwitch" },
  { id: "series", labelKey: "circuitChallengeSeries" },
  { id: "parallel", labelKey: "circuitChallengeParallel" },
  { id: "short", labelKey: "circuitChallengeShort" },
]

/** Which optional challenges the current board satisfies right now. */
function metSandboxChallenges(sim: ReturnType<typeof simulate>, grid: Cell[][]): string[] {
  const hit: string[] = []
  if (sim.litBulbs.size >= 1) hit.push("light")
  if (sim.state === "working" && countKind(grid, "switch") >= 1) hit.push("switch")
  if (sim.circuitType === "series") hit.push("series")
  if (sim.circuitType === "parallel") hit.push("parallel")
  if (sim.shorted) hit.push("short")
  return hit
}

// The game is split into a puzzle track (Levels) and a free experiment area
// (Sandbox), reached from a small home menu. Keeping them separate screens is
// deliberate: Levels should feel like a progression, Sandbox like a playground.
type Screen =
  | { kind: "home" }
  | { kind: "levels" }
  | { kind: "howto" }
  | { kind: "sandbox" }
  | { kind: "play"; level: Level }

export function CircuitBuilder() {
  const { t, language } = useLanguage()
  const progress = useCircuitProgress()
  const [screen, setScreen] = useState<Screen>({ kind: "home" })

  return (
    <section id="circuit-game" className="relative overflow-hidden bg-[#fff7ec] py-20 md:py-24">
      <div className="relative mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-orange">
            {t.gamesPage.circuitEyebrow}
          </p>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            {t.gamesPage.circuitTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.gamesPage.circuitDesc}
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          {screen.kind === "home" ? (
            <HomeMenu
              progress={progress}
              onLevels={() => setScreen({ kind: "levels" })}
              onSandbox={() => setScreen({ kind: "sandbox" })}
              onHowTo={() => setScreen({ kind: "howto" })}
            />
          ) : screen.kind === "howto" ? (
            <HowToPlay onBack={() => setScreen({ kind: "home" })} onStart={() => setScreen({ kind: "levels" })} />
          ) : screen.kind === "sandbox" ? (
            <Sandbox onExit={() => setScreen({ kind: "home" })} />
          ) : screen.kind === "levels" ? (
            <LevelSelect
              progress={progress}
              language={language}
              onPlay={(level) => setScreen({ kind: "play", level })}
              onBack={() => setScreen({ kind: "home" })}
            />
          ) : (
            <LevelPlay
              key={screen.level.id}
              level={screen.level}
              language={language}
              progress={progress}
              onExit={() => setScreen({ kind: "levels" })}
              onNext={(next) => setScreen({ kind: "play", level: next })}
            />
          )}
        </FadeIn>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Home menu — the three entry points: Levels (the main game), Sandbox, How to Play
// ---------------------------------------------------------------------------

function HomeMenu({
  progress,
  onLevels,
  onSandbox,
  onHowTo,
}: {
  progress: ReturnType<typeof useCircuitProgress>
  onLevels: () => void
  onSandbox: () => void
  onHowTo: () => void
}) {
  const { t } = useLanguage()
  const g = t.gamesPage
  const solvedPct = Math.round((progress.completedCount / LEVELS.length) * 100)

  return (
    <div className="mt-12 grid gap-4 md:grid-cols-3">
      {/* Start Levels — the primary, puzzle-mode call to action. */}
      <button
        type="button"
        onClick={onLevels}
        className="group relative flex flex-col justify-between gap-6 overflow-hidden rounded-3xl bg-avanza-dark p-7 text-left text-white shadow-[0_28px_64px_-30px_rgba(26,26,46,0.45)] ring-1 ring-avanza-dark/12 transition hover:-translate-y-1 hover:shadow-xl md:min-h-[15rem]"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-avanza-orange text-avanza-dark">
          <Zap className="h-6 w-6" />
        </span>
        <div>
          <h3 className="text-2xl font-extrabold leading-tight">{g.circuitStartLevels}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/70">{g.circuitStartLevelsDesc}</p>
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs font-bold text-white/60">
            <span>
              {progress.completedCount}/{LEVELS.length} {g.circuitSolvedOfLabel}
            </span>
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {progress.totalStars}/{LEVELS.length * 3}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15">
            <div className="h-full rounded-full bg-avanza-green transition-all" style={{ width: `${solvedPct}%` }} />
          </div>
        </div>
      </button>

      {/* Sandbox — free experiment area. */}
      <button
        type="button"
        onClick={onSandbox}
        className="group relative flex flex-col justify-between gap-6 overflow-hidden rounded-3xl bg-white p-7 text-left shadow-[0_20px_50px_-30px_rgba(26,26,46,0.4)] ring-1 ring-avanza-dark/12 transition hover:-translate-y-1 hover:shadow-xl md:min-h-[15rem]"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-avanza-orange/15 text-avanza-orange">
          <Sparkles className="h-6 w-6" />
        </span>
        <div>
          <h3 className="text-2xl font-extrabold leading-tight text-avanza-dark">{g.circuitSandboxTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-avanza-dark/65">{g.circuitSandboxDesc}</p>
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-extrabold text-avanza-orange">
          {g.circuitSandboxTitle} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </span>
      </button>

      {/* How to Play. */}
      <button
        type="button"
        onClick={onHowTo}
        className="group relative flex flex-col justify-between gap-6 overflow-hidden rounded-3xl bg-white p-7 text-left shadow-[0_20px_50px_-30px_rgba(26,26,46,0.4)] ring-1 ring-avanza-dark/12 transition hover:-translate-y-1 hover:shadow-xl md:min-h-[15rem]"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-avanza-green/15 text-avanza-green">
          <HelpCircle className="h-6 w-6" />
        </span>
        <div>
          <h3 className="text-2xl font-extrabold leading-tight text-avanza-dark">{g.circuitHowToPlay}</h3>
          <p className="mt-2 text-sm leading-relaxed text-avanza-dark/65">{g.circuitHowToPlayDesc}</p>
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-extrabold text-avanza-green">
          {g.circuitHowToPlay} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </span>
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// How to Play — a first-class explainer screen (distinct from the quick in-game
// tutorial overlay): the goal, the tools, the live read-out, and the two modes.
// ---------------------------------------------------------------------------

function HowToPlay({ onBack, onStart }: { onBack: () => void; onStart: () => void }) {
  const { t } = useLanguage()
  const g = t.gamesPage
  const gp = g as unknown as Record<string, string>
  // Ordered so the parts a beginner places first come first.
  const tools: Tool[] = ["wire", "bulb", "switch", "battery", "hand", "eraser"]

  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 rounded-full bg-avanza-dark/8 px-3 py-1.5 text-xs font-bold text-avanza-dark transition hover:bg-avanza-dark/15"
      >
        ← {g.circuitBackToMenu}
      </button>

      <div className="mt-4 overflow-hidden rounded-3xl bg-white p-7 shadow-[0_28px_64px_-30px_rgba(26,26,46,0.35)] ring-1 ring-avanza-dark/10 md:p-9">
        <span className="inline-flex items-center gap-2 rounded-full bg-avanza-orange/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-avanza-orange">
          <HelpCircle className="h-3.5 w-3.5" />
          {g.circuitHowToTitle}
        </span>
        <p className="mt-4 text-base leading-relaxed text-avanza-dark/80">{g.circuitHowToIntro}</p>

        {/* The goal */}
        <h4 className="mt-7 text-lg font-extrabold text-avanza-dark">{g.circuitHowToGoalTitle}</h4>
        <p className="mt-1.5 text-sm leading-relaxed text-avanza-dark/70">{g.circuitHowToGoalBody}</p>

        {/* The tools */}
        <h4 className="mt-7 text-lg font-extrabold text-avanza-dark">{g.circuitHowToToolsTitle}</h4>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {tools.map((tl) => {
            const Icon = TOOL_ICON[tl]
            return (
              <li
                key={tl}
                className="flex items-start gap-3 rounded-2xl bg-avanza-dark/[0.03] px-3.5 py-3 ring-1 ring-avanza-dark/8"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-avanza-dark ring-1 ring-avanza-dark/10">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-extrabold text-avanza-dark">{gp[TOOL_LABEL[tl]]}</p>
                  <p className="text-xs leading-relaxed text-avanza-dark/65">{gp[TOOL_DESC[tl]]}</p>
                </div>
              </li>
            )
          })}
        </ul>

        {/* The live read-out */}
        <h4 className="mt-7 text-lg font-extrabold text-avanza-dark">{g.circuitHowToStatesTitle}</h4>
        <p className="mt-1.5 text-sm leading-relaxed text-avanza-dark/70">{g.circuitHowToStatesBody}</p>

        {/* Two modes */}
        <h4 className="mt-7 text-lg font-extrabold text-avanza-dark">{g.circuitHowToModesTitle}</h4>
        <ul className="mt-3 space-y-2">
          <li className="flex items-start gap-2.5 text-sm leading-relaxed text-avanza-dark/75">
            <Zap className="mt-0.5 h-4 w-4 shrink-0 text-avanza-orange" />
            {g.circuitHowToLevelsMode}
          </li>
          <li className="flex items-start gap-2.5 text-sm leading-relaxed text-avanza-dark/75">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-avanza-orange" />
            {g.circuitHowToSandboxMode}
          </li>
        </ul>

        <button
          type="button"
          onClick={onStart}
          className="mt-7 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-avanza-orange px-5 py-2.5 text-sm font-extrabold text-avanza-dark shadow-md transition hover:brightness-105"
        >
          {g.circuitHowToStart} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Level select
// ---------------------------------------------------------------------------

function LevelSelect({
  progress,
  language,
  onPlay,
  onBack,
}: {
  progress: ReturnType<typeof useCircuitProgress>
  language: "en" | "es" | "zh"
  onPlay: (level: Level) => void
  onBack: () => void
}) {
  const { t } = useLanguage()
  return (
    <div className="mt-12">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded-full bg-avanza-dark/8 px-3 py-1.5 text-xs font-bold text-avanza-dark transition hover:bg-avanza-dark/15"
          >
            ← {t.gamesPage.circuitBackToMenu}
          </button>
          <h3 className="text-xl font-extrabold text-avanza-dark">{t.gamesPage.circuitChooseLevel}</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-avanza-dark/8 px-3 py-1 font-mono text-xs font-bold text-avanza-dark">
            {progress.completedCount}/{LEVELS.length} {t.gamesPage.circuitSolvedOfLabel}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-3 py-1 font-mono text-xs font-bold text-avanza-dark">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {progress.totalStars}/{LEVELS.length * 3}
          </span>
          {progress.completedCount > 0 && (
            <button
              type="button"
              onClick={progress.resetProgress}
              className="text-xs font-bold text-avanza-dark/60 underline underline-offset-2 transition hover:text-avanza-dark"
            >
              {t.gamesPage.circuitResetProgress}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {LEVELS.map((level) => {
          const unlocked = progress.isUnlocked(level.id)
          const state = progress.progress.levels[level.id]
          return (
            <button
              key={level.id}
              type="button"
              disabled={!unlocked}
              onClick={() => onPlay(level)}
              className={cn(
                "group relative flex aspect-[4/3] flex-col justify-between rounded-2xl p-4 text-left ring-1 transition",
                unlocked
                  ? "bg-white ring-avanza-dark/12 hover:-translate-y-0.5 hover:shadow-lg"
                  : "cursor-not-allowed bg-avanza-dark/5 ring-avanza-dark/8",
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "font-mono text-sm font-extrabold",
                    unlocked ? "text-avanza-orange" : "text-avanza-dark/30",
                  )}
                >
                  {String(level.id).padStart(2, "0")}
                </span>
                {!unlocked ? (
                  <Lock className="h-4 w-4 text-avanza-dark/30" />
                ) : (
                  <StarRow earned={state?.stars ?? 0} className="h-4 w-4" />
                )}
              </div>
              <span
                className={cn(
                  "text-sm font-extrabold leading-tight",
                  unlocked ? "text-avanza-dark" : "text-avanza-dark/35",
                )}
              >
                {unlocked ? level.title[language] : t.gamesPage.circuitLockedLabel}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Level play
// ---------------------------------------------------------------------------

function LevelPlay({
  level,
  language,
  progress,
  onExit,
  onNext,
}: {
  level: Level
  language: "en" | "es" | "zh"
  progress: ReturnType<typeof useCircuitProgress>
  onExit: () => void
  onNext: (next: Level) => void
}) {
  const { t } = useLanguage()
  const { grid, set: setGrid, undo, canUndo, reset } = useGridHistory(() => level.build())
  const [tool, setTool] = useState<Tool>(() => level.tools[0])
  const [hovered, setHovered] = useState<{ r: number; c: number } | null>(null)
  const [flash, setFlash] = useState<string | null>(null)
  const [hintsShown, setHintsShown] = useState(0)
  const [showTutorial, setShowTutorial] = useState(false)
  // Bumped each time the level is freshly solved to retrigger the celebration.
  const [celebrateKey, setCelebrateKey] = useState(0)
  // The score locked in when this attempt was first solved (parts, time, stars)
  // — shown on the complete screen. Null until solved.
  const [solveStats, setSolveStats] = useState<SolveResult | null>(null)
  // Live stopwatch, counting up from the attempt's start until the solve.
  const [elapsedMs, setElapsedMs] = useState(0)

  const soundsRef = useRef<HTMLAudioElement[]>([])
  const celebratedRef = useRef(false)
  const startRef = useRef(0)

  // Auto-show the one-time onboarding overlay on the very first level.
  useEffect(() => {
    if (level.id !== 1) return
    try {
      if (!window.localStorage.getItem(TUTORIAL_SEEN_KEY)) setShowTutorial(true)
    } catch {
      // localStorage may be blocked — just skip the auto-open.
    }
  }, [level.id])

  const closeTutorial = useCallback(() => {
    setShowTutorial(false)
    try {
      window.localStorage.setItem(TUTORIAL_SEEN_KEY, "1")
    } catch {
      // ignore
    }
  }, [])

  const sim = useMemo(() => simulate(grid), [grid])
  const solved = useMemo(() => checkSolved(level, sim, grid), [level, sim, grid])

  useEffect(() => {
    soundsRef.current = createLevelUpSounds(0.6)
    startRef.current = performance.now()
  }, [])

  // Tick the stopwatch about 4×/second while the level is still unsolved.
  useEffect(() => {
    if (solved) return
    const id = window.setInterval(() => {
      setElapsedMs(performance.now() - startRef.current)
    }, 250)
    return () => window.clearInterval(id)
  }, [solved])

  // Fire the solve exactly once per solve: score it, save progress, play a
  // sound and celebrate. The first solve's score is locked in, so fiddling with
  // an already-solved board can never lower the stars you just earned. Reset
  // when the circuit is broken again so a genuine re-solve re-scores cleanly.
  useEffect(() => {
    if (solved) {
      if (!celebratedRef.current) {
        celebratedRef.current = true
        const timeMs = Math.round(performance.now() - startRef.current)
        const result: SolveResult = {
          stars: computeStars(level, grid, hintsShown > 0),
          parts: partsUsed(grid),
          timeMs,
        }
        setSolveStats(result)
        setElapsedMs(timeMs)
        progress.completeLevel(level.id, LEVELS.length, result)
        setCelebrateKey((k) => k + 1)
        playRandomLevelUpSound(soundsRef.current)
      }
    } else {
      celebratedRef.current = false
      setSolveStats(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solved, level.id])

  function editCell(r: number, c: number) {
    // Explain the block instead of silently ignoring a locked-tile click — but
    // a locked switch is still fair game (you can always flip a switch).
    if (grid[r][c].locked && tool !== "hand" && grid[r][c].kind !== "switch") {
      setFlash(t.gamesPage.circuitPlaceFixed)
      return
    }
    setFlash(null)
    setGrid((prev) => applyTool(prev, r, c, tool))
  }

  const eraseCell = useCallback(
    (r: number, c: number) => {
      setFlash(null)
      setGrid((prev) => applyTool(prev, r, c, "eraser"))
    },
    [setGrid],
  )

  const rotate = useCallback(() => setGrid((prev) => rotateGrid(prev, hovered)), [setGrid, hovered])

  useCircuitKeyboard({ hovered, onRotate: rotate, onErase: eraseCell })

  // Full restart of the attempt: rebuild the board and reset hints, the
  // stopwatch and the solve so the player can try again for a better score.
  function resetLevel() {
    reset(level.build())
    setTool(level.tools[0])
    setFlash(null)
    setHintsShown(0)
    setSolveStats(null)
    celebratedRef.current = false
    startRef.current = performance.now()
    setElapsedMs(0)
  }

  const nextLevel = LEVELS.find((l) => l.id === level.id + 1)
  const record = progress.progress.levels[level.id]
  const cols = grid[0].length
  const bulbCount = countKind(grid, "bulb")

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      {/* Board card */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(-0.5deg)]"
        />
        <div className="relative overflow-hidden rounded-3xl bg-white p-5 shadow-[0_28px_64px_-30px_rgba(26,26,46,0.35)] ring-1 ring-avanza-dark/10 md:p-7">
          {solved && <Celebration key={celebrateKey} label={t.gamesPage.circuitSuccessBanner} />}
          {showTutorial && <TutorialOverlay t={t} onClose={closeTutorial} />}
          <div className="mb-4 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onExit}
              className="inline-flex items-center gap-1.5 rounded-full bg-avanza-dark/8 px-3 py-1.5 text-xs font-bold text-avanza-dark transition hover:bg-avanza-dark/15"
            >
              ← {t.gamesPage.circuitBackToLevels}
            </button>
            <span className="font-mono text-xs font-bold text-avanza-dark/50">
              {t.gamesPage.circuitLevelWord} {level.id} / {LEVELS.length}
            </span>
          </div>

          <Toolbar
            tools={level.tools}
            tool={tool}
            onSelect={setTool}
            onUndo={undo}
            canUndo={canUndo}
            onRotate={rotate}
            onHelp={() => setShowTutorial(true)}
            t={t}
          />

          <BoardGrid
            grid={grid}
            sim={sim}
            cols={cols}
            tool={tool}
            hovered={hovered}
            onHover={setHovered}
            onCellClick={editCell}
            onErase={eraseCell}
          />

          <ExplanationBar sim={sim} t={t} flash={flash} />

          <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill sim={sim} t={t} />
              <span className="rounded-full bg-avanza-dark/8 px-3 py-1 font-mono text-xs font-bold text-avanza-dark">
                {sim.litBulbs.size}/{bulbCount} {t.gamesPage.circuitLitLabel}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-avanza-dark/8 px-3 py-1 font-mono text-xs font-bold text-avanza-dark tabular-nums">
                <Clock className="h-3.5 w-3.5" />
                {formatTime(elapsedMs)}
              </span>
            </div>
            <button
              type="button"
              onClick={resetLevel}
              className="inline-flex items-center gap-1.5 rounded-full bg-avanza-dark/8 px-3 py-1.5 text-xs font-bold text-avanza-dark transition hover:bg-avanza-dark/15"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {t.gamesPage.circuitResetLevel}
            </button>
          </div>
        </div>
      </div>

      {/* Goal / solved card */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(0.6deg)]"
        />
        <div
          className={cn(
            "relative flex h-full flex-col gap-4 rounded-3xl p-7 shadow-[0_28px_64px_-30px_rgba(26,26,46,0.4)] transition-colors",
            solved ? "bg-avanza-green text-avanza-dark" : "bg-avanza-dark text-primary-foreground",
          )}
        >
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold",
                solved ? "bg-avanza-dark text-white" : "bg-avanza-orange text-avanza-dark",
              )}
            >
              {level.id}
            </span>
            <h3 className="text-2xl font-extrabold leading-tight">{level.title[language]}</h3>
          </div>

          {solved ? (
            <>
              <p className="flex items-center gap-2 text-lg font-extrabold">
                <Check className="h-5 w-5" strokeWidth={3} /> {t.gamesPage.circuitSolvedTitle}
              </p>

              {/* Stars earned this solve, with an encouraging one-line reason. */}
              <div className="flex flex-col gap-1.5">
                <StarRow earned={solveStats?.stars ?? 3} className="h-7 w-7" />
                <p className="text-sm font-bold text-avanza-dark/70">
                  {t.gamesPage[STAR_REASON[solveStats?.stars ?? 3]]}
                </p>
              </div>

              {/* This attempt's parts + time, plus the player's best so far. */}
              <div className="flex flex-wrap items-center gap-2">
                <StatChip label={t.gamesPage.circuitPartsLabel} value={`${solveStats?.parts ?? partsUsed(grid)}`} />
                <StatChip icon={Clock} label={t.gamesPage.circuitTimeLabel} value={formatTime(solveStats?.timeMs ?? elapsedMs)} />
              </div>
              {record?.bestParts != null && (
                <p className="flex items-center gap-1.5 text-xs font-bold text-avanza-dark/55">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {t.gamesPage.circuitBestLabel}: {record.bestParts} {t.gamesPage.circuitPartsLabel}
                  {record.bestTimeMs != null && ` · ${formatTime(record.bestTimeMs)}`}
                </p>
              )}

              {level.challenge && (
                <p className="flex items-start gap-2 rounded-xl bg-avanza-dark/8 px-3 py-2 text-sm font-bold text-avanza-dark/80">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-avanza-orange" /> {level.challenge[language]}
                </p>
              )}

              <div className="mt-auto flex flex-wrap gap-2">
                {nextLevel && (
                  <button
                    type="button"
                    onClick={() => onNext(nextLevel)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-avanza-dark px-4 py-2 text-sm font-extrabold text-white transition hover:bg-avanza-dark/85"
                  >
                    {t.gamesPage.circuitNextLevel} <ArrowRight className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={resetLevel}
                  className="inline-flex items-center gap-1.5 rounded-full bg-avanza-dark/12 px-4 py-2 text-sm font-extrabold text-avanza-dark transition hover:bg-avanza-dark/20"
                >
                  <RotateCcw className="h-4 w-4" />
                  {t.gamesPage.circuitReplay}
                </button>
                <button
                  type="button"
                  onClick={onExit}
                  className="inline-flex items-center gap-1.5 rounded-full bg-avanza-dark/12 px-4 py-2 text-sm font-extrabold text-avanza-dark transition hover:bg-avanza-dark/20"
                >
                  {t.gamesPage.circuitBackToLevels}
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                {t.gamesPage.circuitGoalLabel}
              </p>
              <p className="text-base leading-relaxed text-white/85">{level.goal[language]}</p>
              {level.challenge && (
                <p className="mt-1 flex items-start gap-2 rounded-xl bg-white/8 px-3 py-2 text-sm text-white/80">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <span>
                    <span className="font-bold text-amber-300">{t.gamesPage.circuitChallengeLabel}: </span>
                    {level.challenge[language]}
                  </span>
                </p>
              )}

              {/* Live status mirror so the right panel reacts as you build. */}
              <LiveStatus sim={sim} t={t} />

              {level.hints && (
                <HintPanel
                  hints={level.hints}
                  language={language}
                  shown={hintsShown}
                  onReveal={() => setHintsShown((n) => Math.min(n + 1, level.hints!.length))}
                  t={t}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sandbox / free play
// ---------------------------------------------------------------------------

function Sandbox({ onExit }: { onExit: () => void }) {
  const { t } = useLanguage()
  const { grid, set: setGrid, undo, canUndo, reset } = useGridHistory(sandboxGrid)
  const [tool, setTool] = useState<Tool>("hand")
  const [hovered, setHovered] = useState<{ r: number; c: number } | null>(null)
  const [showTutorial, setShowTutorial] = useState(false)

  const sim = useMemo(() => simulate(grid), [grid])
  const bulbCount = countKind(grid, "bulb")

  const editCell = useCallback(
    (r: number, c: number) => setGrid((prev) => applyTool(prev, r, c, tool)),
    [setGrid, tool],
  )
  const eraseCell = useCallback(
    (r: number, c: number) => setGrid((prev) => applyTool(prev, r, c, "eraser")),
    [setGrid],
  )
  const rotate = useCallback(() => setGrid((prev) => rotateGrid(prev, hovered)), [setGrid, hovered])

  useCircuitKeyboard({ hovered, onRotate: rotate, onErase: eraseCell })

  // Track which optional challenges have been achieved this session. Once ticked
  // they stay ticked, so breaking the board doesn't punish exploration.
  const [challengesDone, setChallengesDone] = useState<Set<string>>(() => new Set())
  useEffect(() => {
    const hit = metSandboxChallenges(sim, grid)
    if (hit.length === 0) return
    setChallengesDone((prev) => {
      let changed = false
      const next = new Set(prev)
      for (const id of hit) if (!next.has(id)) { next.add(id); changed = true }
      return changed ? next : prev
    })
  }, [sim, grid])

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(-0.5deg)]"
        />
        <div className="relative overflow-hidden rounded-3xl bg-white p-5 shadow-[0_28px_64px_-30px_rgba(26,26,46,0.35)] ring-1 ring-avanza-dark/10 md:p-7">
          {showTutorial && <TutorialOverlay t={t} onClose={() => setShowTutorial(false)} />}
          <div className="mb-4 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onExit}
              className="inline-flex items-center gap-1.5 rounded-full bg-avanza-dark/8 px-3 py-1.5 text-xs font-bold text-avanza-dark transition hover:bg-avanza-dark/15"
            >
              ← {t.gamesPage.circuitBackToMenu}
            </button>
            <span className="font-mono text-xs font-bold text-avanza-dark/50">
              {t.gamesPage.circuitSandboxTitle}
            </span>
          </div>

          <Toolbar
            tools={SANDBOX_TOOLS}
            tool={tool}
            onSelect={setTool}
            onUndo={undo}
            canUndo={canUndo}
            onRotate={rotate}
            onHelp={() => setShowTutorial(true)}
            t={t}
          />

          <BoardGrid
            grid={grid}
            sim={sim}
            cols={SANDBOX_COLS}
            tool={tool}
            hovered={hovered}
            onHover={setHovered}
            onCellClick={editCell}
            onErase={eraseCell}
          />

          <ExplanationBar sim={sim} t={t} flash={null} />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill sim={sim} t={t} />
              <span className="rounded-full bg-avanza-dark/8 px-3 py-1 font-mono text-xs font-bold text-avanza-dark">
                {sim.litBulbs.size}/{bulbCount} {t.gamesPage.circuitLitLabel}
              </span>
            </div>
            <div className="flex gap-2">
              {/* Clear Board wipes everything — a sandbox-only action. */}
              <button
                type="button"
                onClick={() => {
                  reset(emptyGrid(SANDBOX_ROWS, SANDBOX_COLS))
                  setTool("battery")
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-avanza-dark/8 px-3 py-1.5 text-xs font-bold text-avanza-dark transition hover:bg-avanza-dark/15"
              >
                <Eraser className="h-3.5 w-3.5" />
                {t.gamesPage.circuitClear}
              </button>
              <button
                type="button"
                onClick={() => {
                  reset(sandboxGrid())
                  setTool("hand")
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-avanza-dark/8 px-3 py-1.5 text-xs font-bold text-avanza-dark transition hover:bg-avanza-dark/15"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {t.gamesPage.circuitReset}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info card */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(0.6deg)]"
        />
        <div className="relative flex h-full flex-col gap-5 rounded-3xl bg-avanza-dark p-7 text-primary-foreground shadow-[0_28px_64px_-30px_rgba(26,26,46,0.4)]">
          <h3 className="text-2xl font-extrabold leading-tight md:text-3xl">
            {t.gamesPage.circuitFactTitle}
          </h3>
          <p className="text-base leading-relaxed text-white/80">{t.gamesPage.circuitFactBody}</p>
          <ul className="mt-2 space-y-2 text-sm text-white/85">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-avanza-orange" />
              {t.gamesPage.circuitTip1}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-avanza-green" />
              {t.gamesPage.circuitTip2}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-avanza-purple" />
              {t.gamesPage.circuitTip3}
            </li>
          </ul>

          {/* Optional challenges — a gentle checklist, never a requirement. */}
          <div className="mt-auto rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-avanza-orange" />
              <p className="text-sm font-extrabold text-white">{t.gamesPage.circuitSandboxChallengesTitle}</p>
            </div>
            <p className="mt-1 text-xs text-white/55">{t.gamesPage.circuitSandboxChallengesHint}</p>
            <ul className="mt-3 space-y-1.5">
              {SANDBOX_CHALLENGES.map((ch) => {
                const done = challengesDone.has(ch.id)
                return (
                  <li key={ch.id} className="flex items-center gap-2.5 text-sm">
                    <span
                      className={cn(
                        "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition",
                        done ? "bg-avanza-green text-avanza-dark" : "bg-white/10 text-white/40",
                      )}
                    >
                      {done ? (
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      )}
                    </span>
                    <span className={cn("font-bold", done ? "text-white" : "text-white/70")}>
                      {t.gamesPage[ch.labelKey]}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Shared pieces
// ---------------------------------------------------------------------------

const TOOL_ICON: Record<Tool, ComponentType<{ className?: string }>> = {
  hand: Hand,
  wire: WireIcon,
  bulb: Lightbulb,
  switch: Power,
  battery: BatteryIcon,
  eraser: Eraser,
}

const TOOL_LABEL: Record<Tool, keyof ReturnType<typeof useLanguage>["t"]["gamesPage"]> = {
  hand: "circuitToolHand",
  wire: "circuitToolWire",
  bulb: "circuitToolBulb",
  switch: "circuitToolSwitch",
  battery: "circuitToolBattery",
  eraser: "circuitToolErase",
}

/** One-line "what does this do" text for each tool, shown under the toolbar and
 *  as a hover tooltip so beginners always know what the selected tool places. */
const TOOL_DESC: Record<Tool, keyof ReturnType<typeof useLanguage>["t"]["gamesPage"]> = {
  hand: "circuitToolHandDesc",
  wire: "circuitToolWireDesc",
  bulb: "circuitToolBulbDesc",
  switch: "circuitToolSwitchDesc",
  battery: "circuitToolBatteryDesc",
  eraser: "circuitToolEraseDesc",
}

/** Apply the active tool to a cell, respecting level-locked cells. */
function applyTool(prev: Cell[][], r: number, c: number, tool: Tool): Cell[][] {
  const current = prev[r][c]

  // A direct click on a switch flips it — with any tool except the eraser, and
  // even on a level-fixed switch. This makes "close the switch" beginner-obvious
  // and means you can toggle a switch without first picking the Hand tool.
  if (current.kind === "switch" && tool !== "eraser") {
    const next = clone(prev)
    next[r][c] = { ...current, closed: !current.closed }
    return next
  }

  // The Hand tool only ever flips switches (handled above) — never places.
  if (tool === "hand") return prev

  // Locked scaffolding can't be replaced or erased.
  if (current.locked) return prev

  if (tool === "eraser") {
    if (current.kind === "empty") return prev
    const next = clone(prev)
    next[r][c] = { kind: "empty" }
    return next
  }

  const next = clone(prev)
  if (tool === "battery") {
    if (current.kind === "battery") {
      next[r][c] = { kind: "battery", orientation: current.orientation === "h" ? "v" : "h" }
    } else {
      // Only one battery allowed on the board.
      for (const row of next) for (const cell of row) if (cell.kind === "battery") cell.kind = "empty"
      next[r][c] = { kind: "battery", orientation: "h" }
    }
  } else if (tool === "switch") {
    // (An existing switch is flipped earlier; here we only drop a new one.)
    next[r][c] = { kind: "switch", closed: true }
  } else if (tool === "wire") {
    next[r][c] = { kind: "wire" }
  } else if (tool === "bulb") {
    next[r][c] = { kind: "bulb" }
  }
  return next
}

/** Rotate a battery 90°. Targets the hovered battery when the cursor is over
 *  one, otherwise every editable battery on the board. Locked (level-fixed)
 *  batteries are left alone so a puzzle's supply can't be knocked out of place. */
function rotateGrid(prev: Cell[][], hovered: { r: number; c: number } | null): Cell[][] {
  const flip = (cell: Cell): boolean => {
    if (cell.kind !== "battery" || cell.locked) return false
    cell.orientation = cell.orientation === "v" ? "h" : "v"
    return true
  }
  const next = clone(prev)
  let changed = false
  const hot = hovered && next[hovered.r]?.[hovered.c]
  if (hot && hot.kind === "battery" && !hot.locked) {
    changed = flip(hot)
  } else {
    for (const row of next) for (const cell of row) if (flip(cell)) changed = true
  }
  return changed ? next : prev
}

/**
 * Grid state with a bounded undo stack. `set` records history only when the
 * grid actually changes (applyTool returns the same reference on a no-op), so
 * the Undo button steps back one real edit at a time. `reset` clears history.
 */
function useGridHistory(initial: () => Cell[][]) {
  const [grid, setGridState] = useState<Cell[][]>(initial)
  const historyRef = useRef<Cell[][][]>([])
  const [canUndo, setCanUndo] = useState(false)

  const set = useCallback((updater: (prev: Cell[][]) => Cell[][]) => {
    setGridState((prev) => {
      const next = updater(prev)
      if (next === prev) return prev
      historyRef.current.push(prev)
      if (historyRef.current.length > 60) historyRef.current.shift()
      setCanUndo(true)
      return next
    })
  }, [])

  const undo = useCallback(() => {
    setGridState((prev) => {
      const last = historyRef.current.pop()
      setCanUndo(historyRef.current.length > 0)
      return last ?? prev
    })
  }, [])

  const reset = useCallback((g: Cell[][]) => {
    historyRef.current = []
    setCanUndo(false)
    setGridState(g)
  }, [])

  return { grid, set, undo, canUndo, reset }
}

/** Keyboard shortcuts shared by both play modes: R / Space rotate the battery,
 *  Delete / Backspace remove the part under the cursor. */
function useCircuitKeyboard({
  hovered,
  onRotate,
  onErase,
}: {
  hovered: { r: number; c: number } | null
  onRotate: () => void
  onErase: (r: number, c: number) => void
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = e.target as HTMLElement | null
      const tag = el?.tagName
      if (tag === "INPUT" || tag === "TEXTAREA" || el?.isContentEditable) return
      if (e.key === "r" || e.key === "R" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault()
        onRotate()
      } else if (e.key === "Delete" || e.key === "Backspace") {
        if (hovered) {
          e.preventDefault()
          onErase(hovered.r, hovered.c)
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [hovered, onRotate, onErase])
}

/** Can the active tool act on this cell? Used for highlighting & prevention. */
function canPlace(cell: Cell, tool: Tool): boolean {
  // Any non-eraser tool can flip a switch by clicking it — even a locked one.
  if (cell.kind === "switch" && tool !== "eraser") return true
  if (tool === "hand") return false // hand only flips switches (handled above)
  if (cell.locked) return false // fixed scaffolding can't be edited
  if (tool === "eraser") return cell.kind !== "empty"
  return true // wire / bulb / switch / battery can drop on any editable cell
}

/** During a click-and-drag paint, should we keep applying to this cell? Limited
 *  to the "continuous" tools and to cells where it makes a real change, so a
 *  drag never re-toggles switches or rewrites identical cells. */
function shouldPaint(cell: Cell, tool: Tool): boolean {
  if (cell.locked) return false
  if (tool === "wire" || tool === "bulb") return cell.kind === "empty"
  if (tool === "eraser") return cell.kind !== "empty"
  return false
}

/** The cell a tool would create — used to preview a ghost before placing. */
function toolCell(tool: Tool): Cell | null {
  switch (tool) {
    case "wire":
      return { kind: "wire" }
    case "bulb":
      return { kind: "bulb" }
    case "switch":
      return { kind: "switch", closed: true }
    case "battery":
      return { kind: "battery", orientation: "h" }
    default:
      return null
  }
}

/**
 * Which sides a freshly-placed piece would actually connect on, given its
 * neighbours right now. Lets the ghost preview show real connections so the
 * player can see whether a placement will "take" before committing.
 */
function previewConnections(grid: Cell[][], r: number, c: number, cell: Cell): Set<Side> {
  const rows = grid.length
  const cols = grid[0]?.length ?? 0
  const self = openSidesForCell(cell.kind === "switch" ? { ...cell, closed: true } : cell)
  const out = new Set<Side>()
  for (const side of SIDES) {
    if (!self.has(side)) continue
    const delta: Record<Side, [number, number]> = { N: [0, -1], S: [0, 1], E: [1, 0], W: [-1, 0] }
    const [dx, dy] = delta[side]
    const nx = c + dx
    const ny = r + dy
    if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue
    const nb = grid[ny][nx]
    if (nb.kind === "empty") continue
    const opposite: Record<Side, Side> = { N: "S", S: "N", E: "W", W: "E" }
    if (openSidesForCell(nb).has(opposite[side])) out.add(side)
  }
  return out
}

function BoardGrid({
  grid,
  sim,
  cols,
  tool,
  hovered,
  onHover,
  onCellClick,
  onErase,
}: {
  grid: Cell[][]
  sim: ReturnType<typeof simulate>
  cols: number
  tool: Tool
  hovered: { r: number; c: number } | null
  onHover: (cell: { r: number; c: number } | null) => void
  onCellClick: (r: number, c: number) => void
  onErase: (r: number, c: number) => void
}) {
  const ghost = toolCell(tool)
  // The circuit is "live" (worth animating) when a real load is powered.
  const active = sim.closed && !sim.shorted && sim.litBulbs.size > 0

  // Click-and-drag painting: press to place, then drag across cells to keep
  // laying wire (or erasing). Works with mouse and touch via pointer events.
  const painting = useRef(false)
  useEffect(() => {
    const stop = () => {
      painting.current = false
    }
    window.addEventListener("pointerup", stop)
    window.addEventListener("pointercancel", stop)
    return () => {
      window.removeEventListener("pointerup", stop)
      window.removeEventListener("pointercancel", stop)
    }
  }, [])

  return (
    <div className="mx-auto max-w-md">
      <div
        className="grid touch-none select-none gap-1.5 rounded-2xl bg-[#1a1a2e]/6 p-2.5"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        onMouseLeave={() => onHover(null)}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => {
            const id = `${r},${c}`
            const valid = canPlace(cell, tool)
            const isHovered = hovered?.r === r && hovered?.c === c
            // Show a ghost only when dropping a new piece on an empty, valid cell.
            const showGhost = ghost != null && isHovered && valid && cell.kind === "empty"
            return (
              <CircuitCell
                key={id}
                cell={cell}
                tool={tool}
                connected={sim.connections.get(id) ?? EMPTY_SIDES}
                potential={sim.potentialConnections.get(id) ?? EMPTY_SIDES}
                lit={sim.litBulbs.has(id)}
                brightness={sim.bulbBrightness.get(id) ?? 0}
                powered={sim.poweredCells.has(id)}
                shorted={sim.shorted && sim.poweredCells.has(id)}
                bypassed={sim.bypassedBulbs.has(id)}
                deadEnd={sim.deadEndCells.has(id)}
                // Only flag the break while the circuit isn't already working.
                breaking={sim.breakPoints.has(id) && sim.state !== "working"}
                active={active}
                valid={valid}
                hovered={isHovered}
                ghost={showGhost ? ghost : null}
                ghostSides={showGhost ? previewConnections(grid, r, c, ghost!) : EMPTY_SIDES}
                onDown={() => {
                  painting.current = true
                  onCellClick(r, c)
                }}
                onEnter={() => {
                  onHover({ r, c })
                  if (painting.current && shouldPaint(cell, tool)) onCellClick(r, c)
                }}
                onActivate={() => onCellClick(r, c)}
                onErase={() => onErase(r, c)}
              />
            )
          }),
        )}
      </div>
    </div>
  )
}

const EMPTY_SIDES: Set<Side> = new Set()

// --- scoring UI ------------------------------------------------------------

/** Translation key for the encouraging "why you got this many stars" line. */
const STAR_REASON: Record<number, keyof ReturnType<typeof useLanguage>["t"]["gamesPage"]> = {
  1: "circuitStars1",
  2: "circuitStars2",
  3: "circuitStars3",
}

/** Format a millisecond duration as a friendly "12s" or "1:05". */
function formatTime(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000))
  const m = Math.floor(total / 60)
  const s = total % 60
  return m > 0 ? `${m}:${String(s).padStart(2, "0")}` : `${s}s`
}

/** Three stars, the earned ones filled amber. Used on the select and complete
 *  screens so progress reads at a glance. */
function StarRow({ earned, className = "h-5 w-5" }: { earned: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${earned} of 3 stars`}>
      {[1, 2, 3].map((i) => (
        <Star
          key={i}
          className={cn(className, i <= earned ? "fill-amber-400 text-amber-400" : "fill-none text-avanza-dark/25")}
        />
      ))}
    </span>
  )
}

/** A small labelled stat pill (parts used, solve time) for the complete screen. */
function StatChip({
  icon: Icon,
  label,
  value,
}: {
  icon?: ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-avanza-dark/10 px-3 py-1 text-xs font-bold text-avanza-dark">
      {Icon && <Icon className="h-3.5 w-3.5" />}
      <span className="text-avanza-dark/60">{label}</span>
      <span className="font-mono font-extrabold tabular-nums">{value}</span>
    </span>
  )
}

// Map each circuit state to its translation-key suffix and a colour tone.
const STATE_SUFFIX: Record<string, string> = {
  working: "Working",
  open: "Open",
  short: "Short",
  incomplete: "Incomplete",
  "bulb-disconnected": "BulbDisconnected",
  "bulb-bypassed": "BulbBypassed",
  "switch-open": "SwitchOpen",
  "no-battery": "NoBattery",
  "no-load": "NoLoad",
  invalid: "Invalid",
}

/**
 * A plain-language read-out of what the circuit is doing and why — the
 * educational heart of the game. It reads straight from the simulation, so the
 * words always match the picture and the lit/not-lit result.
 */
function ExplanationBar({
  sim,
  t,
  flash,
}: {
  sim: ReturnType<typeof simulate>
  t: ReturnType<typeof useLanguage>["t"]
  flash: string | null
}) {
  const gp = t.gamesPage as unknown as Record<string, string>
  const suffix = STATE_SUFFIX[sim.state] ?? "Invalid"
  const title = gp[`circuitState${suffix}Title`]
  const body = gp[`circuitState${suffix}Body`]

  const success = sim.state === "working"
  const danger = sim.state === "short"
  // Three visually distinct moods: success (green), danger (red), warning (amber).
  const tone = success
    ? "border-avanza-green bg-avanza-green/12"
    : danger
      ? "border-red-400 bg-red-50"
      : "border-avanza-orange/60 bg-amber-50"
  const Icon = success ? Check : danger ? Zap : AlertTriangle
  const iconTone = success ? "text-avanza-green" : danger ? "text-red-500" : "text-avanza-orange"

  // A dead-end stub is worth calling out even when the main loop works.
  const showDeadEnd = sim.deadEndCells.size > 0 && success
  // When the circuit works with more than one bulb, explain how those bulbs are
  // wired to each other — the series vs parallel lesson at the heart of the game.
  const typeSuffix = CIRCUIT_TYPE_SUFFIX[sim.circuitType]
  const typeExplainer = success && typeSuffix ? gp[`circuit${typeSuffix}Body`] : null

  return (
    <div
      // Re-key on state so the warning "shake" replays each time it changes.
      key={danger ? "danger" : "calm"}
      className={cn("mt-4 flex items-start gap-2.5 rounded-2xl border-l-4 px-4 py-3", tone, danger && "circuit-shake")}
    >
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", iconTone)} strokeWidth={2.6} />
      <div className="min-w-0">
        <p className="text-sm font-extrabold text-avanza-dark">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-avanza-dark/70">{flash ?? body}</p>
        {typeExplainer && !flash && (
          <p className="mt-1 flex items-start gap-1.5 text-xs font-bold leading-relaxed text-avanza-dark/75">
            <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-avanza-orange" />
            {typeExplainer}
          </p>
        )}
        {showDeadEnd && !flash && (
          <p className="mt-1 text-xs leading-relaxed text-avanza-dark/60">{gp.circuitDeadEndHint}</p>
        )}
      </div>
    </div>
  )
}

/** Maps a detected circuit topology to its translation-key fragment (the series
 *  / parallel explanation shown once a multi-bulb circuit is working). */
const CIRCUIT_TYPE_SUFFIX: Record<string, string | null> = {
  none: null,
  single: null,
  series: "TypeSeries",
  parallel: "TypeParallel",
  mixed: "TypeMixed",
}

/** A compact colour-coded status chip for the right-hand panel — mirrors the
 *  circuit state so the panel reacts live as the player builds. */
function LiveStatus({
  sim,
  t,
}: {
  sim: ReturnType<typeof simulate>
  t: ReturnType<typeof useLanguage>["t"]
}) {
  const gp = t.gamesPage as unknown as Record<string, string>
  const title = gp[`circuitState${STATE_SUFFIX[sim.state] ?? "Invalid"}Title`]
  const success = sim.state === "working"
  const danger = sim.state === "short"
  return (
    <div className="mt-2 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2">
      <span
        className={cn(
          "h-2.5 w-2.5 rounded-full",
          success ? "bg-avanza-green" : danger ? "bg-red-400" : "bg-amber-400",
        )}
      />
      <span className="text-sm font-bold text-white/90">{title}</span>
    </div>
  )
}

/** Progressive hints: general → points at the problem → close to the solution.
 *  Nothing is revealed until the player asks, one step at a time. */
function HintPanel({
  hints,
  language,
  shown,
  onReveal,
  t,
}: {
  hints: [Loc, Loc, Loc]
  language: "en" | "es" | "zh"
  shown: number
  onReveal: () => void
  t: ReturnType<typeof useLanguage>["t"]
}) {
  return (
    <div className="mt-auto pt-4">
      <div className="space-y-2">
        {hints.slice(0, shown).map((hint, i) => (
          <div key={i} className="flex items-start gap-2 rounded-xl bg-amber-400/15 px-3 py-2">
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400 text-[11px] font-extrabold text-avanza-dark">
              {i + 1}
            </span>
            <p className="text-sm leading-relaxed text-white/90">{hint[language]}</p>
          </div>
        ))}
      </div>
      {shown < hints.length ? (
        <button
          type="button"
          onClick={onReveal}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-4 py-2 text-sm font-extrabold text-avanza-dark transition hover:bg-amber-300"
        >
          <Lightbulb className="h-4 w-4" />
          {shown === 0 ? t.gamesPage.circuitHintCta : t.gamesPage.circuitHintNext}
        </button>
      ) : (
        <p className="mt-3 text-xs font-bold text-white/50">{t.gamesPage.circuitHintsDone}</p>
      )}
    </div>
  )
}

/** Lightweight one-shot celebration: a glow burst, a few confetti pieces, and a
 *  "Circuit complete!" banner. Kept small so it reads as a reward, not noise. */
function Celebration({ label }: { label: string }) {
  const pieces = ["#f97316", "#1abc9c", "#fbbf24", "#8b5cf6", "#ef4444", "#22c55e"]
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {/* glow burst */}
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-avanza-green/40 circuit-burst-ring" />
      {/* confetti */}
      {pieces.map((color, i) => (
        <span
          key={i}
          className="absolute top-2 h-2 w-2 rounded-[1px] circuit-confetti-piece"
          style={{
            left: `${12 + i * 14}%`,
            backgroundColor: color,
            animationDelay: `${i * 70}ms`,
          }}
        />
      ))}
      {/* banner */}
      <div className="absolute left-1/2 top-4 -translate-x-1/2 circuit-success-pop">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-avanza-green px-4 py-1.5 text-sm font-extrabold text-avanza-dark shadow-lg">
          <Sparkles className="h-4 w-4" /> {label}
        </span>
      </div>
    </div>
  )
}

function StatusPill({
  sim,
  t,
}: {
  sim: ReturnType<typeof simulate>
  t: ReturnType<typeof useLanguage>["t"]
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider shadow-sm",
        sim.shorted
          ? "bg-red-500 text-white"
          : sim.closed
            ? "bg-avanza-green text-avanza-dark"
            : "bg-avanza-dark/12 text-avanza-dark",
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white" />
      {sim.shorted
        ? t.gamesPage.circuitShortStatus
        : sim.closed
          ? t.gamesPage.circuitClosedStatus
          : t.gamesPage.circuitOpenStatus}
    </span>
  )
}

function ToolBtn({
  active,
  onClick,
  icon: Icon,
  label,
  title,
}: {
  active: boolean
  onClick: () => void
  icon: ComponentType<{ className?: string }>
  label: string
  title?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-pressed={active}
      aria-label={title ? `${label} — ${title}` : label}
      className={cn(
        // Min height keeps every tool an easy tap target on touch screens.
        "inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-extrabold transition",
        active
          ? "scale-105 bg-avanza-orange text-avanza-dark shadow-md ring-2 ring-avanza-dark/70"
          : "bg-avanza-dark/8 text-avanza-dark ring-1 ring-transparent hover:-translate-y-0.5 hover:bg-avanza-dark/15",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
      {/* A check makes the selected tool unmistakable — not colour alone. */}
      {active && <Check className="h-3.5 w-3.5" strokeWidth={3.5} />}
    </button>
  )
}

/** A compact icon control (Undo / Rotate / Help) with an always-present label
 *  on wider screens and a tooltip everywhere. */
function ControlBtn({
  icon: Icon,
  label,
  onClick,
  disabled,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-extrabold transition",
        disabled
          ? "cursor-not-allowed bg-avanza-dark/5 text-avanza-dark/30"
          : "bg-avanza-dark/8 text-avanza-dark hover:-translate-y-0.5 hover:bg-avanza-dark/15",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}

/** Toolbar: the tools plus the Undo / Rotate / Help controls, and a one-line
 *  description of the selected tool so beginners always know what it does. */
function Toolbar({
  tools,
  tool,
  onSelect,
  onUndo,
  canUndo,
  onRotate,
  onHelp,
  t,
}: {
  tools: Tool[]
  tool: Tool
  onSelect: (tool: Tool) => void
  onUndo: () => void
  canUndo: boolean
  onRotate: () => void
  onHelp: () => void
  t: ReturnType<typeof useLanguage>["t"]
}) {
  const gp = t.gamesPage as unknown as Record<string, string>
  const DescIcon = TOOL_ICON[tool]
  const showRotate = tools.includes("battery")
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-2">
          {tools.map((tl) => (
            <ToolBtn
              key={tl}
              active={tool === tl}
              onClick={() => onSelect(tl)}
              icon={TOOL_ICON[tl]}
              label={gp[TOOL_LABEL[tl]]}
              title={gp[TOOL_DESC[tl]]}
            />
          ))}
        </div>
        <div className="ml-auto flex flex-wrap gap-2">
          <ControlBtn icon={Undo2} label={gp.circuitUndo} onClick={onUndo} disabled={!canUndo} />
          {showRotate && <ControlBtn icon={RotateCw} label={gp.circuitRotate} onClick={onRotate} />}
          <ControlBtn icon={HelpCircle} label={gp.circuitHelp} onClick={onHelp} />
        </div>
      </div>
      {/* Selected-tool explainer. Icon + bold label + plain description, so the
          current tool is clear from text and icon, never colour alone. */}
      <div className="mt-2.5 flex items-center gap-2 rounded-xl bg-avanza-orange/10 px-3 py-2 text-xs leading-snug text-avanza-dark">
        <DescIcon className="h-4 w-4 shrink-0 text-avanza-orange" />
        <span>
          <span className="font-extrabold">{gp[TOOL_LABEL[tool]]}:</span>{" "}
          <span className="text-avanza-dark/75">{gp[TOOL_DESC[tool]]}</span>
        </span>
      </div>
    </div>
  )
}

/** Beginner onboarding: a short, skippable overlay that names the four parts
 *  and what each one does. Auto-shows once on level 1, reopenable via the ? key
 *  button. Kept to one screen so it reads as help, not a wall of text. */
function TutorialOverlay({
  t,
  onClose,
}: {
  t: ReturnType<typeof useLanguage>["t"]
  onClose: () => void
}) {
  const gp = t.gamesPage as unknown as Record<string, string>
  const parts: { icon: ComponentType<{ className?: string }>; chip: string; text: string }[] = [
    { icon: BatteryIcon, chip: "bg-amber-400 text-avanza-dark", text: gp.circuitTutorialBattery },
    { icon: WireIcon, chip: "bg-avanza-dark text-white", text: gp.circuitTutorialWire },
    { icon: Lightbulb, chip: "bg-avanza-orange text-avanza-dark", text: gp.circuitTutorialBulb },
    { icon: Power, chip: "bg-avanza-green text-avanza-dark", text: gp.circuitTutorialSwitch },
  ]
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-avanza-dark/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-avanza-dark/10">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-lg font-extrabold leading-tight text-avanza-dark">
            {gp.circuitTutorialTitle}
          </h4>
          <button
            type="button"
            onClick={onClose}
            title={gp.circuitTutorialSkip}
            aria-label={gp.circuitTutorialSkip}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-avanza-dark/8 text-avanza-dark transition hover:bg-avanza-dark/15"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-avanza-dark/75">{gp.circuitTutorialIntro}</p>
        <ul className="mt-3 space-y-2">
          {parts.map((p, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span
                className={cn(
                  "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                  p.chip,
                )}
              >
                <p.icon className="h-4 w-4" />
              </span>
              <p className="text-sm leading-snug text-avanza-dark/85">{p.text}</p>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full bg-avanza-orange px-4 py-2 text-sm font-extrabold text-avanza-dark shadow-md transition hover:brightness-105"
        >
          {gp.circuitTutorialStart}
        </button>
      </div>
    </div>
  )
}

const TUTORIAL_SEEN_KEY = "avanza-circuit-tutorial-seen"

function WireIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
      <path d="M3 12 H21" />
      <circle cx="3" cy="12" r="1.6" fill="currentColor" />
      <circle cx="21" cy="12" r="1.6" fill="currentColor" />
    </svg>
  )
}

function BatteryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <rect x="3" y="8" width="16" height="8" rx="1.6" />
      <rect x="19" y="10" width="2.5" height="4" rx="0.5" fill="currentColor" />
      <line x1="8" y1="11" x2="8" y2="13" />
      <line x1="14" y1="10.5" x2="14" y2="13.5" />
      <line x1="13" y1="11.5" x2="15" y2="11.5" />
    </svg>
  )
}

function CircuitCell({
  cell,
  tool,
  connected,
  potential,
  lit,
  brightness,
  powered,
  shorted,
  bypassed,
  deadEnd,
  breaking,
  active,
  valid,
  hovered,
  ghost,
  ghostSides,
  onDown,
  onActivate,
  onEnter,
  onErase,
}: {
  cell: Cell
  tool: Tool
  connected: Set<Side>
  potential: Set<Side>
  lit: boolean
  brightness: number
  powered: boolean
  shorted: boolean
  bypassed: boolean
  deadEnd: boolean
  breaking: boolean
  active: boolean
  valid: boolean
  hovered: boolean
  ghost: Cell | null
  ghostSides: Set<Side>
  onDown: () => void
  onActivate: () => void
  onEnter: () => void
  onErase: () => void
}) {
  // Highlight the tiles the current tool can actually act on.
  const highlight =
    valid &&
    (cell.kind === "switch" ||
      (tool !== "hand" && tool !== "eraser" && cell.kind === "empty") ||
      (tool === "eraser" && cell.kind !== "empty"))

  return (
    <button
      type="button"
      // Pointer events drive placement so click-and-drag works on mouse & touch.
      onPointerDown={(e) => {
        e.preventDefault()
        onDown()
      }}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      // Keyboard users still place/flip with Enter; right-click deletes a part.
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          onActivate()
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault()
        onErase()
      }}
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-md ring-1 transition active:scale-[0.97]",
        cell.locked ? "bg-amber-50/70" : "bg-white",
        lit && "bg-amber-50",
        // Ring reflects the circuit health of a placed piece.
        shorted
          ? "ring-red-400"
          : cell.kind === "empty"
            ? "ring-avanza-dark/8"
            : "ring-avanza-dark/15",
        // Fault / success halos (animated via globals.css).
        shorted && "circuit-short-ring ring-red-400",
        breaking && !shorted && "circuit-break-ring ring-amber-400",
        // Placement affordances take priority on hover.
        highlight && !hovered && "ring-avanza-orange/40",
        hovered && valid && "ring-2 ring-avanza-orange",
        hovered && !valid && "ring-2 ring-red-400",
        !valid && hovered && "cursor-not-allowed",
      )}
      aria-label={`Cell ${cell.kind}${
        cell.kind === "switch" ? (cell.closed ? " (closed)" : " (open)") : ""
      }${cell.locked ? " (fixed)" : ""}${lit ? " (lit)" : ""}`}
    >
      {/* A faint dot keeps empty cells feeling like a board, not a void. */}
      {cell.kind === "empty" && !ghost && (
        <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-avanza-dark/12" />
      )}
      {ghost ? (
        <span className="opacity-40">
          <CellGlyph
            cell={ghost}
            connected={ghostSides}
            potential={ghostSides}
            lit={false}
            brightness={0}
            powered={false}
            shorted={false}
            bypassed={false}
            deadEnd={false}
            breaking={false}
            active={false}
          />
        </span>
      ) : (
        <CellGlyph
          cell={cell}
          connected={connected}
          potential={potential}
          lit={lit}
          brightness={brightness}
          powered={powered}
          shorted={shorted}
          bypassed={bypassed}
          deadEnd={deadEnd}
          breaking={breaking}
          active={active}
        />
      )}
    </button>
  )
}

// --- glyph geometry --------------------------------------------------------

// Where each side meets the cell edge (in a 40×40 viewBox). Drawing a lead from
// the centre (20,20) to these points makes neighbouring leads meet exactly at
// the shared border, so wires visually join only where they truly connect.
const SIDE_POINT: Record<Side, [number, number]> = {
  N: [20, 0],
  S: [20, 40],
  E: [40, 20],
  W: [0, 20],
}
const DARK = "#1a1a2e"
const LIVE = "#1abc9c"
const SHORT = "#ef4444"

/** Colour a conductor by whether it carries current (and whether that's a short). */
function wireColor(powered: boolean, shorted: boolean): string {
  if (shorted) return SHORT
  return powered ? LIVE : DARK
}

type GlyphProps = {
  cell: Cell
  connected: Set<Side>
  potential: Set<Side>
  lit: boolean
  brightness: number
  powered: boolean
  shorted: boolean
  bypassed: boolean
  deadEnd: boolean
  breaking: boolean
  active: boolean
}

/** A path that threads through the centre to every connected side — the track
 *  the current-flow dashes animate along. */
function throughPath(sides: Side[]): string {
  if (sides.length === 0) return ""
  const p = (s: Side) => SIDE_POINT[s]
  if (sides.length === 1) {
    const [x, y] = p(sides[0])
    return `M20,20 L${x},${y}`
  }
  let d = `M${p(sides[0])[0]},${p(sides[0])[1]}`
  for (let i = 1; i < sides.length; i++) d += ` L20,20 L${p(sides[i])[0]},${p(sides[i])[1]}`
  return d
}

/** Leads to each connected side, with a soft wide "glow" pass when powered. */
function Leads({ sides, color, glow }: { sides: Side[]; color: string; glow: boolean }) {
  return (
    <>
      {glow &&
        sides.map((s) => {
          const [x, y] = SIDE_POINT[s]
          return (
            <line key={`g${s}`} x1="20" y1="20" x2={x} y2={y} stroke={color} strokeWidth="7" strokeLinecap="round" opacity="0.18" />
          )
        })}
      {sides.map((s) => {
        const [x, y] = SIDE_POINT[s]
        return <line key={s} x1="20" y1="20" x2={x} y2={y} stroke={color} strokeWidth="3.4" strokeLinecap="round" />
      })}
    </>
  )
}

/** Current travelling through this cell: a faint marching-dash track plus a
 *  couple of discrete particles gliding along it, so the flow reads literally
 *  as charge moving (and races when shorted). Kept to two dots to stay light. */
function Flow({ sides, shorted }: { sides: Side[]; shorted: boolean }) {
  const d = throughPath(sides)
  if (!d) return null
  const color = shorted ? "#fff5f5" : "#ffffff"
  const period = shorted ? 0.45 : 0.9
  return (
    <>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity="0.55"
        className={cn("circuit-flow-line", shorted && "circuit-flow-fast")}
      />
      {/* Two evenly-spaced current particles riding the same track. Negative
          begins phase them apart and start them mid-path on the first frame. */}
      {[0, period / 2].map((offset, i) => (
        <circle key={i} r={shorted ? 1.9 : 1.5} fill={color}>
          <animateMotion
            dur={`${period}s`}
            repeatCount="indefinite"
            path={d}
            begin={`-${offset}s`}
          />
        </circle>
      ))}
    </>
  )
}

/** Flickering spark to make a short circuit feel dangerous. */
function Spark() {
  return (
    <g className="circuit-spark" stroke="#fff" strokeWidth="1.3" strokeLinecap="round">
      <line x1="20" y1="14.5" x2="20" y2="25.5" />
      <line x1="14.5" y1="20" x2="25.5" y2="20" />
    </g>
  )
}

/**
 * Draws a cell using its *actual* connections, so the picture can never claim
 * a connection the simulation doesn't have. Wires derive their shape (straight,
 * corner, T, cross, end-cap) entirely from which sides connect; components show
 * their terminals and orient themselves along the axis they're wired on.
 */
export function CellGlyph(props: GlyphProps) {
  const { cell } = props
  if (cell.kind === "empty") return null
  if (cell.kind === "wire") return <WireGlyph {...props} />
  if (cell.kind === "bulb") return <BulbGlyph {...props} />
  if (cell.kind === "switch") return <SwitchGlyph {...props} />
  if (cell.kind === "battery") return <BatteryGlyph {...props} />
  return null
}

/** Lines from the centre to each connected side → straight / corner / T / cross. */
function WireGlyph({ connected, powered, shorted, deadEnd }: GlyphProps) {
  const color = wireColor(powered, shorted)
  const sides = Array.from(connected)
  const live = powered || shorted
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full">
      <Leads sides={sides} color={color} glow={live} />
      {/* Junction dot makes T / cross intersections read clearly. */}
      {sides.length >= 3 && <circle cx="20" cy="20" r="3.2" fill={color} />}
      {/* End-cap for a lone lead (a dead-end stub) or a fully isolated wire. */}
      {sides.length === 1 && (
        <circle cx="20" cy="20" r="3" fill="none" stroke={deadEnd ? SHORT : color} strokeWidth="1.6" />
      )}
      {sides.length === 0 && <circle cx="20" cy="20" r="3" fill="none" stroke={DARK} strokeWidth="1.6" />}
      {live && sides.length >= 1 && <Flow sides={sides} shorted={shorted} />}
      {shorted && <Spark />}
    </svg>
  )
}

/** A bulb: leads only to connected sides + a glow that scales with brightness. */
function BulbGlyph({ connected, lit, brightness, powered, shorted, bypassed }: GlyphProps) {
  const color = wireColor(powered, shorted)
  const sides = Array.from(connected)
  const live = powered || shorted
  // Brightness is a 0–3 level (1 = dim, 2 = medium, 3 = bright). Normalise to
  // 0–1 so a brighter bulb glows bigger and warmer and a dim series bulb stays
  // visibly smaller — the whole point of the series/parallel lesson.
  const b = Math.max(0, Math.min(3, brightness)) / 3
  const glowR = 8 + 11 * b
  const glowO = 0.16 + 0.52 * b
  // The glass itself deepens from pale amber (dim) to a saturated gold (bright).
  const fill = !lit ? "#fff" : brightness >= 3 ? "#fcd34d" : brightness === 2 ? "#fde68a" : "#fef3c7"
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full">
      <Leads sides={sides} color={color} glow={live} />
      {live && sides.length >= 1 && <Flow sides={sides} shorted={shorted} />}
      {lit && (
        <circle cx="20" cy="20" r={glowR} fill="#fde68a" opacity={glowO}>
          <animate
            attributeName="opacity"
            values={`${glowO * 0.6};${Math.min(1, glowO + 0.2)};${glowO * 0.6}`}
            dur="1.6s"
            repeatCount="indefinite"
          />
        </circle>
      )}
      <circle
        cx="20"
        cy="20"
        r="9"
        fill={fill}
        stroke={bypassed ? SHORT : DARK}
        strokeWidth="1.6"
        strokeDasharray={bypassed ? "2 2" : undefined}
      />
      {/* A small highlight makes the glass feel rounded rather than flat. */}
      <circle cx="16.5" cy="16.5" r="2.4" fill="#fff" opacity={lit ? 0.8 : 0.55} />
      {lit && (
        <g stroke={DARK} strokeWidth="1.4" strokeLinecap="round">
          <line x1="20" y1="6" x2="20" y2="10" />
          <line x1="32" y1="20" x2="36" y2="20" />
          <line x1="20" y1="32" x2="20" y2="34" />
          <line x1="8" y1="20" x2="4" y2="20" />
        </g>
      )}
    </svg>
  )
}

/** A switch: oriented along the axis it's wired on, animating open ⇄ closed. */
function SwitchGlyph({ cell, potential, powered }: GlyphProps) {
  const closed = cell.kind === "switch" ? cell.closed : false
  // Orient vertically only when the switch faces up/down (and not left/right).
  const vertical =
    (potential.has("N") || potential.has("S")) && !potential.has("E") && !potential.has("W")
  // A closed switch that is carrying current lights up.
  const color = closed && powered ? LIVE : DARK
  const flowSides: Side[] = ["W", "E"]
  const body = (
    <g>
      {/* fixed leads to the two contacts, with a glow when live */}
      {closed && powered && (
        <>
          <line x1="0" y1="20" x2="13" y2="20" stroke={color} strokeWidth="7" strokeLinecap="round" opacity="0.18" />
          <line x1="27" y1="20" x2="40" y2="20" stroke={color} strokeWidth="7" strokeLinecap="round" opacity="0.18" />
        </>
      )}
      <line x1="0" y1="20" x2="13" y2="20" stroke={color} strokeWidth="3.4" strokeLinecap="round" />
      <line x1="27" y1="20" x2="40" y2="20" stroke={color} strokeWidth="3.4" strokeLinecap="round" />
      {/* the moving lever pivots on the left contact; CSS animates the toggle */}
      <g
        style={{
          transformBox: "view-box",
          transformOrigin: "13px 20px",
          transform: closed ? "rotate(0deg)" : "rotate(-34deg)",
          transition: "transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <line x1="13" y1="20" x2="27" y2="20" stroke={DARK} strokeWidth="3.2" strokeLinecap="round" />
      </g>
      <circle cx="13" cy="20" r="2.4" fill={DARK} />
      <circle cx="27" cy="20" r="2.4" fill={closed ? color : "#fff"} stroke={DARK} strokeWidth="1.4" />
      {closed && powered && <Flow sides={flowSides} shorted={false} />}
    </g>
  )
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full">
      {vertical ? <g transform="rotate(90 20 20)">{body}</g> : body}
    </svg>
  )
}

/** A battery: obvious + / − terminals; pulses while the circuit is live. */
function BatteryGlyph({ cell, connected, powered, shorted, active }: GlyphProps) {
  const horizontal = cell.orientation !== "v"
  const color = wireColor(powered, shorted)
  // Draw a terminal lead solid when it's wired, dashed when it dangles — so a
  // loose terminal never looks connected. Wired leads glow when powered.
  const lead = (side: Side, x1: number, y1: number, x2: number, y2: number) => {
    const wired = connected.has(side)
    return (
      <>
        {wired && powered && (
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="7" strokeLinecap="round" opacity="0.18" />
        )}
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={wired ? color : "#c96f00"}
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeDasharray={wired ? undefined : "3 3"}
        />
      </>
    )
  }
  const pulse = active ? "circuit-battery-live" : undefined
  if (horizontal) {
    return (
      <svg viewBox="0 0 40 40" className="h-full w-full">
        {lead("W", 0, 20, 6, 20)}
        {lead("E", 34, 20, 40, 20)}
        <g className={pulse}>
          <rect x="6" y="13" width="28" height="14" rx="2.5" fill="#fbbf24" stroke={DARK} strokeWidth="1.5" />
          <rect x="7.5" y="14.5" width="25" height="3.5" rx="1.5" fill="#fff" opacity="0.35" />
          {/* − on the west terminal, + on the east terminal */}
          <text x="10" y="24" fontFamily="monospace" fontSize="13" fontWeight="800" fill={DARK}>
            −
          </text>
          <text x="25" y="25" fontFamily="monospace" fontSize="14" fontWeight="800" fill={DARK}>
            +
          </text>
        </g>
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full">
      {lead("N", 20, 0, 20, 6)}
      {lead("S", 20, 34, 20, 40)}
      <g className={pulse}>
        <rect x="13" y="6" width="14" height="28" rx="2.5" fill="#fbbf24" stroke={DARK} strokeWidth="1.5" />
        <rect x="14.5" y="7.5" width="3.5" height="25" rx="1.5" fill="#fff" opacity="0.35" />
        {/* − on the north terminal, + on the south terminal */}
        <text x="16" y="15" fontFamily="monospace" fontSize="13" fontWeight="800" fill={DARK}>
          −
        </text>
        <text x="16" y="33" fontFamily="monospace" fontSize="14" fontWeight="800" fill={DARK}>
          +
        </text>
      </g>
    </svg>
  )
}
