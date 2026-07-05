"use client"

import { useState } from "react"
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronLeft,
  FlaskConical,
  Lock,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
} from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { BADGES } from "@/components/ui/density-badges"
import {
  DENSITY_OBJECTS,
  OBJECT_BY_ID,
  ObjectArt,
  objectFloatsInWater,
  type ObjectKey,
} from "@/components/ui/density-objects"
import {
  LEVELS,
  LIQUIDS,
  type LiquidKey,
  ORDER_EXPLAIN,
  type Round,
  TOTAL_LEVELS,
  calcAnswer,
  calcOptions,
  layerAnswer,
  layerOptions,
  orderAnswer,
  orderOptions,
  roundPoints,
  sinkFloatAnswer,
} from "@/components/ui/density-levels"
import { type useDensitySound } from "@/components/ui/density-sound"
import { isoDay, useDensityProgress } from "@/components/ui/useDensityProgress"
import { useReducedMotion } from "@/components/ui/useReducedMotion"
import { cn } from "@/lib/utils"

type Progress = ReturnType<typeof useDensityProgress>
type Sound = ReturnType<typeof useDensitySound>
type Language = "en" | "es" | "zh"

type View =
  | { kind: "menu" }
  | { kind: "level"; levelId: number; playId: number }
  | { kind: "collection" }
  | { kind: "daily" }

/** Fill {placeholders} in a template string. */
function fill(tpl: string, vars: Record<string, string | number>) {
  return tpl.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""))
}

export function DensityChallenge({ progress, sound }: { progress: Progress; sound: Sound }) {
  const [view, setView] = useState<View>({ kind: "menu" })

  const playLevel = (levelId: number) => {
    setView((current) => ({
      kind: "level",
      levelId,
      playId: current.kind === "level" ? current.playId + 1 : 0,
    }))
  }

  if (view.kind === "collection") {
    return <Collection progress={progress} onBack={() => setView({ kind: "menu" })} />
  }
  if (view.kind === "daily") {
    return (
      <DailyChallenge
        progress={progress}
        sound={sound}
        onBack={() => setView({ kind: "menu" })}
      />
    )
  }
  if (view.kind === "level") {
    return (
      <LevelPlay
        key={`${view.levelId}-${view.playId}`}
        levelId={view.levelId}
        progress={progress}
        sound={sound}
        onExit={() => setView({ kind: "menu" })}
        onPlayLevel={playLevel}
      />
    )
  }
  return (
    <Menu
      progress={progress}
      onPlayLevel={playLevel}
      onCollection={() => setView({ kind: "collection" })}
      onDaily={() => setView({ kind: "daily" })}
    />
  )
}

// ---------------------------------------------------------------------------
// Menu — level select, badges, collection/daily entry points, reset
// ---------------------------------------------------------------------------

function Menu({
  progress,
  onPlayLevel,
  onCollection,
  onDaily,
}: {
  progress: Progress
  onPlayLevel: (id: number) => void
  onCollection: () => void
  onDaily: () => void
}) {
  const { t, language } = useLanguage()
  const [confirmReset, setConfirmReset] = useState(false)
  const g = t.gamesPage

  return (
    <div className="mt-10 space-y-8">
      {/* Header row: progress + secondary actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-avanza-teal/12 px-3 py-1.5 text-xs font-extrabold text-avanza-teal">
            <Trophy className="h-3.5 w-3.5" />
            {progress.completedCount}/{TOTAL_LEVELS} {g.densityLevelsLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-avanza-orange/12 px-3 py-1.5 text-xs font-extrabold text-avanza-orange">
            <Sparkles className="h-3.5 w-3.5" />
            {progress.progress.totalPoints} {g.densityPoints}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onCollection}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-extrabold text-avanza-dark shadow-sm ring-1 ring-avanza-dark/10 transition hover:-translate-y-0.5 hover:shadow"
          >
            <FlaskConical className="h-4 w-4 text-avanza-teal" />
            {g.densityCollectionBtn}
          </button>
          <button
            type="button"
            onClick={onDaily}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-extrabold text-avanza-dark shadow-sm ring-1 ring-avanza-dark/10 transition hover:-translate-y-0.5 hover:shadow"
          >
            <Calendar className="h-4 w-4 text-avanza-purple" />
            {g.densityDailyBtn}
          </button>
        </div>
      </div>

      {/* Level grid */}
      <div>
        <h3 className="mb-4 text-xl font-extrabold text-avanza-dark">{g.densityChooseLevel}</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {LEVELS.map((level) => {
            const unlocked = progress.isUnlocked(level.id)
            const record = progress.progress.levels[level.id]
            return (
              <button
                key={level.id}
                type="button"
                disabled={!unlocked}
                onClick={() => onPlayLevel(level.id)}
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
                      unlocked ? "text-avanza-teal" : "text-avanza-dark/30",
                    )}
                  >
                    {String(level.id).padStart(2, "0")}
                  </span>
                  {!unlocked ? (
                    <Lock className="h-4 w-4 text-avanza-dark/30" />
                  ) : record?.completed ? (
                    <span className="inline-flex items-center gap-0.5">
                      {record.perfect && <Sparkles className="h-4 w-4 text-amber-400" />}
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-avanza-green text-avanza-dark">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                    </span>
                  ) : null}
                </div>
                <div>
                  <span
                    className={cn(
                      "block text-sm font-extrabold leading-tight",
                      unlocked ? "text-avanza-dark" : "text-avanza-dark/35",
                    )}
                  >
                    {unlocked ? level.titleLoc[language] : g.densityLockedLabel}
                  </span>
                  {unlocked && record?.completed && (
                    <span className="mt-1 block font-mono text-[10px] font-bold text-avanza-dark/45">
                      {g.densityBest}: {Math.round(record.bestAccuracy * 100)}%
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Badges */}
      <div>
        <h3 className="mb-4 text-xl font-extrabold text-avanza-dark">{g.densityBadgesTitle}</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {BADGES.map((badge) => {
            const earned = progress.progress.badges.includes(badge.id)
            return (
              <div
                key={badge.id}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-2xl p-3 text-center ring-1 transition",
                  earned
                    ? "bg-white ring-avanza-dark/10 shadow-sm"
                    : "bg-avanza-dark/[0.04] ring-avanza-dark/8",
                )}
              >
                <span
                  className={cn(
                    "grid h-12 w-12 place-items-center rounded-full text-2xl",
                    earned ? badge.accent : "bg-avanza-dark/8 grayscale",
                  )}
                  aria-hidden="true"
                >
                  {earned ? badge.emoji : <Lock className="h-4 w-4 text-avanza-dark/30" />}
                </span>
                <span
                  className={cn(
                    "text-[11px] font-extrabold leading-tight",
                    earned ? "text-avanza-dark" : "text-avanza-dark/40",
                  )}
                >
                  {badge.nameLoc[language]}
                </span>
                <span className="text-[9px] leading-tight text-avanza-dark/45">
                  {badge.descLoc[language]}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Reset progress */}
      <div className="flex justify-center pt-2">
        {confirmReset ? (
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-white px-5 py-4 text-center shadow-sm ring-1 ring-avanza-dark/10">
            <p className="text-sm font-bold text-avanza-dark">{g.densityResetConfirm}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  progress.resetProgress()
                  setConfirmReset(false)
                }}
                className="rounded-full bg-red-500 px-4 py-1.5 text-xs font-extrabold text-white transition hover:bg-red-600"
              >
                {g.densityResetYes}
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="rounded-full bg-avanza-dark/10 px-4 py-1.5 text-xs font-extrabold text-avanza-dark transition hover:bg-avanza-dark/20"
              >
                {g.densityResetNo}
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="text-xs font-bold text-avanza-dark/45 underline underline-offset-2 transition hover:text-avanza-dark"
          >
            {g.densityResetProgress}
          </button>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Round model — turns a Round into a prompt, options and an explanation
// ---------------------------------------------------------------------------

type Option = { key: string; label: string; correct: boolean }
type BuiltRound = {
  prompt: string
  /** Liquids shown as coloured chips (layer / order rounds). */
  chips: LiquidKey[]
  options: Option[]
  /** Teaching explanation shown after answering. */
  explain: string
}

function liquidName(k: LiquidKey, language: Language) {
  return LIQUIDS[k].nameLoc[language]
}

function buildRound(
  round: Round,
  language: Language,
  g: ReturnType<typeof useLanguage>["t"]["gamesPage"],
): BuiltRound {
  switch (round.type) {
    case "sinkFloat": {
      const obj = OBJECT_BY_ID[round.objectId]
      const answer = sinkFloatAnswer(round.objectId)
      return {
        prompt: fill(g.densityQSinkFloat, { object: obj.nameLoc[language] }),
        chips: [],
        options: [
          { key: "float", label: g.densityOptFloat, correct: answer === "float" },
          { key: "sink", label: g.densityOptSink, correct: answer === "sink" },
        ],
        explain: obj.blurbLoc[language],
      }
    }
    case "layer": {
      const obj = OBJECT_BY_ID[round.objectId]
      const answer = layerAnswer(round.objectId, round.liquids)
      const options = layerOptions(round.liquids).map((v) => ({
        key: v,
        label:
          v === "bottom"
            ? g.densityOptBottom
            : fill(g.densityOptOnLiquid, { liquid: liquidName(v, language) }),
        correct: v === answer,
      }))
      return {
        prompt: fill(g.densityQLayer, { object: obj.nameLoc[language] }),
        chips: [...round.liquids].sort((a, b) => LIQUIDS[a].density - LIQUIDS[b].density),
        options,
        explain: obj.blurbLoc[language],
      }
    }
    case "order": {
      const answer = orderAnswer(round.liquids).join(",")
      const options = orderOptions(round.liquids).map((ord) => ({
        key: ord.join(","),
        label: ord.map((k) => liquidName(k, language)).join(" → "),
        correct: ord.join(",") === answer,
      }))
      return {
        prompt: g.densityQOrder,
        chips: round.liquids,
        options,
        explain: ORDER_EXPLAIN[language],
      }
    }
    case "calc": {
      const obj = OBJECT_BY_ID[round.objectId]
      const answer = calcAnswer(round.objectId)
      const options = calcOptions(round.objectId).map((n) => ({
        key: String(n),
        label: `${n} g/cm³`,
        correct: n === answer,
      }))
      return {
        prompt: fill(g.densityQCalc, {
          object: obj.nameLoc[language],
          mass: obj.mass,
          volume: obj.volume,
        }),
        chips: [],
        options,
        explain: `${fill(g.densityCalcExplain, {
          mass: obj.mass,
          volume: obj.volume,
          density: answer,
        })} ${obj.blurbLoc[language]}`,
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Level play
// ---------------------------------------------------------------------------

type Tally = {
  correct: number
  total: number
  streak: number
  maxStreak: number
  correctSinkFloat: number
  correctCalcs: number
  tested: Set<ObjectKey>
  score: number
}

function freshTally(): Tally {
  return {
    correct: 0,
    total: 0,
    streak: 0,
    maxStreak: 0,
    correctSinkFloat: 0,
    correctCalcs: 0,
    tested: new Set(),
    score: 0,
  }
}

type EndResult = {
  score: number
  accuracy: number
  perfect: boolean
  bestAccuracy: number
  newObjects: ObjectKey[]
  newBadges: string[]
}

function LevelPlay({
  levelId,
  progress,
  sound,
  onExit,
  onPlayLevel,
}: {
  levelId: number
  progress: Progress
  sound: Sound
  onExit: () => void
  onPlayLevel: (id: number) => void
}) {
  const { t, language } = useLanguage()
  const g = t.gamesPage
  const level = LEVELS.find((l) => l.id === levelId)!

  const [roundIdx, setRoundIdx] = useState(0)
  const [answered, setAnswered] = useState<{ chosen: string; correct: boolean } | null>(null)
  const [tally, setTally] = useState<Tally>(() => freshTally())
  const [end, setEnd] = useState<EndResult | null>(null)

  const round = level.rounds[roundIdx]
  const built = buildRound(round, language, g)

  function answer(opt: Option) {
    if (answered) return
    const correct = opt.correct
    sound.play(correct ? "correct" : "incorrect")
    setTally((prev) => {
      const streak = correct ? prev.streak + 1 : 0
      const tested = new Set(prev.tested)
      if (round.type !== "order") tested.add(round.objectId)
      return {
        correct: prev.correct + (correct ? 1 : 0),
        total: prev.total + 1,
        streak,
        maxStreak: Math.max(prev.maxStreak, streak),
        correctSinkFloat:
          prev.correctSinkFloat + (correct && round.type === "sinkFloat" ? 1 : 0),
        correctCalcs: prev.correctCalcs + (correct && round.type === "calc" ? 1 : 0),
        tested,
        score: prev.score + (correct ? roundPoints(streak) : 0),
      }
    })
    setAnswered({ chosen: opt.key, correct })
  }

  function next() {
    setAnswered(null)
    if (roundIdx + 1 < level.rounds.length) {
      setRoundIdx((i) => i + 1)
      return
    }
    // Finished — commit progress and show the end screen.
    const accuracy = tally.total > 0 ? tally.correct / tally.total : 0
    const perfect = tally.correct === level.rounds.length
    const { newObjects, newBadges } = progress.finishLevel({
      levelId,
      tower: level.tower ?? false,
      score: tally.score,
      accuracy,
      perfect,
      statDelta: {
        correctSinkFloat: tally.correctSinkFloat,
        correctPredictions: tally.correct,
        correctCalcs: tally.correctCalcs,
        maxStreak: tally.maxStreak,
        testedObjects: Array.from(tally.tested),
      },
    })
    const bestAccuracy = progress.progress.levels[levelId]?.bestAccuracy ?? 0
    setEnd({
      score: tally.score,
      accuracy,
      perfect,
      bestAccuracy: Math.max(bestAccuracy, accuracy),
      newObjects,
      newBadges,
    })
    sound.play("levelComplete")
    // A distinct flourish when there's something extra to celebrate.
    if (newBadges.length > 0) sound.play("badge")
    else if (newObjects.length > 0) sound.play("unlock")
  }

  function restartLevel() {
    setRoundIdx(0)
    setAnswered(null)
    setTally(freshTally())
    setEnd(null)
  }

  if (end) {
    const nextLevel = LEVELS.find((l) => l.id === levelId + 1)
    return (
      <LevelEnd
        result={end}
        title={level.titleLoc[language]}
        onReplay={restartLevel}
        onNext={nextLevel && progress.isUnlocked(nextLevel.id) ? () => onPlayLevel(nextLevel.id) : undefined}
        onExit={onExit}
      />
    )
  }

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_28px_64px_-30px_rgba(26,26,46,0.35)] ring-1 ring-avanza-dark/10 md:p-8">
        {/* Top bar */}
        <div className="mb-5 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onExit}
            className="inline-flex items-center gap-1 rounded-full bg-avanza-dark/8 px-3 py-1.5 text-xs font-bold text-avanza-dark transition hover:bg-avanza-dark/15"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            {g.densityBackToLevels}
          </button>
          <div className="flex items-center gap-2">
            {tally.streak >= 2 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-avanza-orange/15 px-2.5 py-1 text-[11px] font-extrabold text-avanza-orange">
                🔥 {tally.streak}
              </span>
            )}
            <span className="font-mono text-xs font-bold text-avanza-dark/50">
              {fill(g.densityQuestionOf, { n: roundIdx + 1, total: level.rounds.length })}
            </span>
          </div>
        </div>

        {/* Progress dots */}
        <div className="mb-6 flex gap-1.5">
          {level.rounds.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                i < roundIdx || (i === roundIdx && answered)
                  ? "bg-avanza-teal"
                  : i === roundIdx
                    ? "bg-avanza-teal/40"
                    : "bg-avanza-dark/10",
              )}
            />
          ))}
        </div>

        <h3 className="text-2xl font-extrabold leading-tight text-avanza-dark">{level.titleLoc[language]}</h3>
        <p className="mt-3 text-base leading-relaxed text-avanza-dark/80">{built.prompt}</p>

        {/* Liquid chips */}
        {built.chips.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {built.chips.map((k) => (
              <span
                key={k}
                className="inline-flex items-center gap-1.5 rounded-full bg-avanza-dark/5 px-3 py-1 text-xs font-bold text-avanza-dark"
              >
                <span
                  className="h-3 w-3 rounded-full ring-1 ring-black/10"
                  style={{ backgroundColor: LIQUIDS[k].color }}
                />
                {liquidName(k, language)}
                <span className="font-mono text-[10px] text-avanza-dark/45">{LIQUIDS[k].density}</span>
              </span>
            ))}
          </div>
        )}

        {/* Options */}
        <div className="mt-6 grid gap-2.5">
          {built.options.map((opt) => {
            const chosen = answered?.chosen === opt.key
            const reveal = answered != null
            return (
              <button
                key={opt.key}
                type="button"
                disabled={reveal}
                onClick={() => answer(opt)}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3.5 text-left text-sm font-bold transition",
                  !reveal && "border-avanza-dark/12 bg-white hover:border-avanza-teal hover:bg-avanza-teal/5",
                  reveal && opt.correct && "border-avanza-green bg-avanza-green/12 text-avanza-dark",
                  reveal && chosen && !opt.correct && "border-red-400 bg-red-50 text-avanza-dark",
                  reveal && !opt.correct && !chosen && "border-avanza-dark/10 bg-white opacity-50",
                )}
              >
                <span>{opt.label}</span>
                {reveal && opt.correct && (
                  <Check className="density-pop h-5 w-5 shrink-0 text-avanza-green" strokeWidth={3} />
                )}
                {reveal && chosen && !opt.correct && (
                  <X className="density-pop h-5 w-5 shrink-0 text-red-500" strokeWidth={3} />
                )}
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {answered && (
          <div
            key={`${roundIdx}-${answered.correct ? "c" : "i"}`}
            className={cn(
              "mt-5 rounded-2xl border-l-4 px-4 py-3",
              answered.correct
                ? "border-avanza-green bg-avanza-green/10 density-pop"
                : "border-avanza-orange bg-amber-50 density-shake",
            )}
          >
            <p className="text-sm font-extrabold text-avanza-dark">
              {answered.correct ? g.densityCorrect : g.densityNotQuite}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-avanza-dark/75">{built.explain}</p>
            <button
              type="button"
              onClick={next}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-avanza-teal px-5 py-2 text-sm font-extrabold text-white transition hover:bg-avanza-teal/90"
            >
              {roundIdx + 1 < level.rounds.length ? g.densityContinue : g.densitySeeResults}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Level end screen
// ---------------------------------------------------------------------------

function LevelEnd({
  result,
  title,
  onReplay,
  onNext,
  onExit,
}: {
  result: EndResult
  title: string
  onReplay: () => void
  onNext?: () => void
  onExit: () => void
}) {
  const { t, language } = useLanguage()
  const g = t.gamesPage
  const pct = Math.round(result.accuracy * 100)
  const reduced = useReducedMotion()

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <div className="relative overflow-hidden rounded-3xl bg-avanza-dark p-8 text-center text-primary-foreground shadow-[0_28px_64px_-30px_rgba(26,26,46,0.5)]">
        {!reduced && <Confetti />}
        <div className="density-pop mx-auto grid h-16 w-16 place-items-center rounded-full bg-avanza-green">
          <Trophy className="h-8 w-8 text-avanza-dark" />
        </div>
        <h3 className="mt-4 text-3xl font-extrabold">
          {result.perfect ? g.densityPerfectScore : g.densityLevelComplete}
        </h3>
        <p className="mt-1 text-sm text-white/60">{title}</p>

        {/* Score row */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <Stat label={g.densityScoreLabel} value={String(result.score)} />
          <Stat label={g.densityAccuracyLabel} value={`${pct}%`} />
          <Stat
            label={g.densityBestScoreLabel}
            value={`${Math.round(result.bestAccuracy * 100)}%`}
          />
        </div>

        {/* New unlocks */}
        <div className="mt-6 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
          {result.newObjects.length > 0 ? (
            <>
              <p className="text-sm font-extrabold text-avanza-orange">{g.densityNewUnlocks}</p>
              <div className="mt-3 flex flex-wrap justify-center gap-3">
                {result.newObjects.map((id, i) => (
                  <div
                    key={id}
                    className="density-reveal flex flex-col items-center gap-1"
                    style={{ animationDelay: `${150 + i * 120}ms` }}
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white">
                      <ObjectArt type={OBJECT_BY_ID[id].svgType} className="h-10 w-10" />
                    </span>
                    <span className="text-[11px] font-bold text-white/80">
                      {OBJECT_BY_ID[id].nameLoc[language]}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-white/60">{g.densityNoNewUnlocks}</p>
          )}
        </div>

        {/* Badges earned */}
        {result.newBadges.length > 0 && (
          <div className="mt-4 rounded-2xl bg-amber-400/15 p-4 ring-1 ring-amber-400/25">
            <p className="text-sm font-extrabold text-amber-300">{g.densityBadgesEarned}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-3">
              {result.newBadges.map((id, i) => {
                const badge = BADGES.find((b) => b.id === id)!
                return (
                  <div
                    key={id}
                    className="density-badge-glow flex flex-col items-center gap-1"
                    style={{ animationDelay: `${250 + i * 140}ms` }}
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-2xl shadow-[0_0_18px_rgba(251,191,36,0.55)]">
                      {badge.emoji}
                    </span>
                    <span className="text-[11px] font-bold text-white/85">{badge.nameLoc[language]}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {onNext && (
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-1.5 rounded-full bg-avanza-green px-5 py-2.5 text-sm font-extrabold text-avanza-dark transition hover:brightness-105"
            >
              {g.densityNextLevel}
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onReplay}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-white/20"
          >
            <RotateCcw className="h-4 w-4" />
            {g.densityReplay}
          </button>
          <button
            type="button"
            onClick={onExit}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-white/20"
          >
            {g.densityBackToLevels}
          </button>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/5 py-4 ring-1 ring-white/10">
      <p className="font-mono text-2xl font-extrabold text-white">{value}</p>
      <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-white/50">{label}</p>
    </div>
  )
}

/** A light one-shot celebration: a glow ring + a handful of confetti pieces.
 *  Deliberately small so it reads as a reward, not visual noise. Neutralised
 *  for reduced-motion users by the global stylesheet (and skipped upstream). */
function Confetti() {
  const pieces = ["#f97316", "#1abc9c", "#fbbf24", "#8b5cf6", "#38bdf8", "#22c55e"]
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
      <div className="density-burst-ring absolute left-1/2 top-8 h-24 w-24 -translate-x-1/2 rounded-full bg-avanza-green/40" />
      {pieces.map((color, i) => (
        <span
          key={i}
          className="density-confetti-piece absolute top-2 h-2 w-2 rounded-[1px]"
          style={{ left: `${12 + i * 14}%`, backgroundColor: color, animationDelay: `${i * 70}ms` }}
        />
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Collection
// ---------------------------------------------------------------------------

function Collection({ progress, onBack }: { progress: Progress; onBack: () => void }) {
  const { t, language } = useLanguage()
  const g = t.gamesPage
  const unlockedCount = DENSITY_OBJECTS.filter((o) => progress.isObjectUnlocked(o.id)).length

  return (
    <div className="mt-10">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-avanza-dark shadow-sm ring-1 ring-avanza-dark/10 transition hover:bg-avanza-dark/5"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          {g.densityBackToLevels}
        </button>
        <span className="rounded-full bg-avanza-teal/12 px-3 py-1.5 text-xs font-extrabold text-avanza-teal">
          {unlockedCount}/{DENSITY_OBJECTS.length}
        </span>
      </div>

      <h3 className="text-2xl font-extrabold text-avanza-dark">{g.densityCollectionTitle}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{g.densityCollectionSubtitle}</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {DENSITY_OBJECTS.map((o) => {
          const unlocked = progress.isObjectUnlocked(o.id)
          if (!unlocked) {
            return (
              <div
                key={o.id}
                className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl bg-avanza-dark/[0.04] p-4 text-center ring-1 ring-dashed ring-avanza-dark/12"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-avanza-dark/8">
                  <Lock className="h-6 w-6 text-avanza-dark/25" />
                </span>
                <span className="text-[11px] font-bold text-avanza-dark/35">{g.densityUnlockHint}</span>
              </div>
            )
          }
          const floats = objectFloatsInWater(o)
          return (
            <div
              key={o.id}
              className="flex flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-avanza-dark/10"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-avanza-teal/8 ring-1 ring-avanza-dark/5">
                  <ObjectArt type={o.svgType} className="h-10 w-10" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold text-avanza-dark">{o.nameLoc[language]}</p>
                  <p className="truncate text-xs text-muted-foreground">{o.materialLoc[language]}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className="rounded-full bg-avanza-dark/6 px-2 py-0.5 font-mono text-[11px] font-bold text-avanza-dark">
                  {o.density} g/cm³
                </span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-bold",
                    floats ? "bg-sky-100 text-sky-700" : "bg-slate-200 text-slate-600",
                  )}
                >
                  {floats ? g.densityFloatsLabel : g.densitySinksLabel}
                </span>
              </div>
              <p className="mt-2.5 text-[11px] leading-relaxed text-muted-foreground">{o.noteLoc[language]}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Daily challenge
// ---------------------------------------------------------------------------

/** Deterministic object pick for a given ISO day (no RNG → stable per day). */
function dailyObjectFor(day: string): ObjectKey {
  let hash = 0
  for (let i = 0; i < day.length; i++) hash = (hash * 31 + day.charCodeAt(i)) >>> 0
  return DENSITY_OBJECTS[hash % DENSITY_OBJECTS.length].id
}

function DailyChallenge({
  progress,
  sound,
  onBack,
}: {
  progress: Progress
  sound: Sound
  onBack: () => void
}) {
  const { t, language } = useLanguage()
  const g = t.gamesPage
  const day = isoDay()
  const objectId = dailyObjectFor(day)
  const obj = OBJECT_BY_ID[objectId]
  const answer = sinkFloatAnswer(objectId)

  const alreadyDone = progress.progress.daily.lastCompletedDate === day
  const [answered, setAnswered] = useState<{ correct: boolean } | null>(null)

  function choose(choice: "float" | "sink") {
    if (answered || alreadyDone) return
    const correct = choice === answer
    sound.play(correct ? "correct" : "incorrect")
    progress.completeDaily(day, correct)
    setAnswered({ correct })
  }

  const daily = progress.progress.daily
  const done = alreadyDone || answered != null

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <div className="mb-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-avanza-dark shadow-sm ring-1 ring-avanza-dark/10 transition hover:bg-avanza-dark/5"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          {g.densityBackToLevels}
        </button>
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-avanza-purple/12 px-3 py-1.5 text-xs font-extrabold text-avanza-purple">
            🔥 {daily.streak} {g.densityDailyStreak}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-avanza-dark/8 px-3 py-1.5 text-xs font-extrabold text-avanza-dark">
            ⭐ {daily.bestStreak} {g.densityDailyBest}
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-white p-6 text-center shadow-[0_28px_64px_-30px_rgba(26,26,46,0.35)] ring-1 ring-avanza-dark/10 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-avanza-purple/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-avanza-purple">
          <Calendar className="h-3.5 w-3.5" />
          {g.densityDailyTitle}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{g.densityDailySubtitle}</p>

        <div className="mt-6 grid h-24 w-24 mx-auto place-items-center rounded-3xl bg-avanza-teal/8 ring-1 ring-avanza-dark/5">
          <ObjectArt type={obj.svgType} className="h-16 w-16" />
        </div>
        <p className="mt-4 text-lg font-extrabold text-avanza-dark">
          {fill(g.densityQSinkFloat, { object: obj.nameLoc[language] })}
        </p>

        {done ? (
          <div className="mt-6">
            {answered && (
              <p
                className={cn(
                  "text-base font-extrabold",
                  answered.correct ? "text-avanza-green" : "text-avanza-orange",
                )}
              >
                {answered.correct ? g.densityCorrect : g.densityNotQuite}
              </p>
            )}
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              {obj.blurbLoc[language]}
            </p>
            <p className="mt-4 rounded-2xl bg-avanza-purple/8 px-4 py-3 text-sm font-bold text-avanza-purple">
              {g.densityDailyDoneToday} {g.densityComeBackTomorrow}
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => choose("float")}
              className="rounded-2xl border-2 border-avanza-dark/12 bg-white px-4 py-4 text-sm font-extrabold text-avanza-dark transition hover:border-avanza-teal hover:bg-avanza-teal/5"
            >
              {g.densityOptFloat}
            </button>
            <button
              type="button"
              onClick={() => choose("sink")}
              className="rounded-2xl border-2 border-avanza-dark/12 bg-white px-4 py-4 text-sm font-extrabold text-avanza-dark transition hover:border-avanza-teal hover:bg-avanza-teal/5"
            >
              {g.densityOptSink}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
