"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { createLevelUpSounds, playRandomLevelUpSound } from "@/components/ui/level-up-sounds"
import { CompletionModal } from "./CompletionModal"
import { logicGameCopy, type LogicGameCopy } from "./copy"
import { evalAgainstTarget } from "./gates"
import { GatePicker } from "./GatePicker"
import { FeedbackPanel, getFeedbackState } from "./FeedbackPanel"
import { HintPanel } from "./HintPanel"
import { LevelSelector } from "./LevelSelector"
import { getLogicLevels, SANDBOX_LEVEL_ID, TOTAL_LEVELS } from "./levels"
import { MissionCard } from "./MissionCard"
import { ProgressBar } from "./ProgressBar"
import { SandboxChallenge } from "./SandboxChallenge"
import { TruthTable } from "./TruthTable"
import { TutorialPanel } from "./TutorialPanel"
import { useLogicGameProgress } from "./useLogicGameProgress"
import type { GateType } from "./types"

function GuidedLevel({
  levelId,
  onSolved,
  onAdvance,
  hasNext,
  levels,
  copy,
}: {
  levelId: number
  onSolved: (attempts: number, hintsUsed: number) => void
  onAdvance: () => void
  hasNext: boolean
  levels: ReturnType<typeof getLogicLevels>
  copy: LogicGameCopy
}) {
  const level = levels.find((l) => l.id === levelId)!
  const [selections, setSelections] = useState<Record<string, GateType | undefined>>({})
  const [hintsRevealed, setHintsRevealed] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [completed, setCompleted] = useState(false)
  const lastSignature = useRef<string | null>(null)

  useEffect(() => {
    setSelections({})
    setHintsRevealed(0)
    setAttempts(0)
    setCompleted(false)
    lastSignature.current = null
  }, [levelId])

  const results = useMemo(() => evalAgainstTarget(level, selections), [level, selections])
  const allSelected = level.gates.every((g) => selections[g.id])
  const feedbackState = getFeedbackState(allSelected, results)

  useEffect(() => {
    if (!allSelected) return
    const signature = level.gates.map((g) => selections[g.id]).join(",")
    if (signature === lastSignature.current) return
    lastSignature.current = signature
    setAttempts((n) => n + 1)
  }, [allSelected, selections, level.gates])

  useEffect(() => {
    if (feedbackState === "solved" && !completed) {
      setCompleted(true)
      onSolved(attempts, hintsRevealed)
    }
  }, [feedbackState, completed, attempts, hintsRevealed, onSolved])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-extrabold text-avanza-dark">{level.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-avanza-dark/70">{level.behaviorDescription}</p>
      </div>

      <MissionCard level={level} copy={copy} />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="grid gap-3">
            {level.gates.map((g) => (
              <GatePicker
                key={g.id}
                slot={g}
                selected={selections[g.id]}
                onSelect={(gate) => setSelections((p) => ({ ...p, [g.id]: gate }))}
                copy={copy}
              />
            ))}
          </div>

          <FeedbackPanel state={feedbackState} results={results} copy={copy} />
          <HintPanel hints={level.hints} revealed={hintsRevealed} onReveal={() => setHintsRevealed((n) => Math.min(n + 1, level.hints.length))} copy={copy} />

          <button
            type="button"
            onClick={() => setSelections({})}
            className="inline-flex w-fit items-center gap-1.5 rounded-full bg-avanza-dark/8 px-3 py-1.5 text-xs font-bold text-avanza-dark/70 transition hover:bg-avanza-dark/15"
          >
            {copy.reset}
          </button>
        </div>

        <div className="rounded-3xl bg-avanza-dark p-7 text-primary-foreground">
          <TruthTable level={level} selections={selections} results={results} allSelected={allSelected} copy={copy} />
        </div>
      </div>

      {completed && (
        <CompletionModal
          level={level}
          attempts={attempts}
          hintsUsed={hintsRevealed}
          rowsMatched={results.filter((r) => r.matches).length}
          totalRows={results.length}
          onNext={onAdvance}
          hasNext={hasNext}
          copy={copy}
        />
      )}
    </div>
  )
}

export function BooleanLogicGame() {
  const { language, t } = useLanguage()
  const copy = logicGameCopy[language]
  const levels = getLogicLevels(language)
  const { progress, completeTutorial, completeLevel, isUnlocked, completedCount } = useLogicGameProgress()
  const [activeLevelId, setActiveLevelId] = useState(1)
  const levelUpSoundsRef = useRef<HTMLAudioElement[]>([])
  const completedLevelSoundIdsRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    levelUpSoundsRef.current = createLevelUpSounds(0.7)
  }, [])

  const handleSolved = useCallback((levelId: number, attempts: number, hintsUsed: number) => {
    if (!completedLevelSoundIdsRef.current.has(levelId)) {
      completedLevelSoundIdsRef.current.add(levelId)
      playRandomLevelUpSound(levelUpSoundsRef.current)
    }
    completeLevel(levelId, TOTAL_LEVELS, { attempts, hintsUsed })
  }, [completeLevel])

  const nextLevelId = activeLevelId + 1
  const hasNext = nextLevelId <= TOTAL_LEVELS

  return (
    <section className="relative overflow-hidden bg-[#f7f0ff] py-20 md:py-24">
      <div className="relative mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-purple">{t.gamesPage.logicEyebrow}</p>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            {t.gamesPage.logicTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.gamesPage.logicDesc}
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm font-bold text-avanza-purple">
            {t.gamesPage.logicPrompt}
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="relative mt-12">
            <div className="relative flex flex-col gap-6 overflow-visible rounded-3xl bg-white p-5 ring-1 ring-avanza-dark/10 md:p-7">
              {!progress.tutorialDone ? (
                <TutorialPanel onDone={completeTutorial} copy={copy} />
              ) : (
                <>
                  <ProgressBar completed={completedCount} total={TOTAL_LEVELS} copy={copy} />
                  <LevelSelector activeLevelId={activeLevelId} progress={progress} isUnlocked={isUnlocked} onSelect={setActiveLevelId} levels={levels} copy={copy} />

                  {activeLevelId === SANDBOX_LEVEL_ID ? (
                    <SandboxChallenge copy={copy} />
                  ) : (
                    <GuidedLevel
                      key={activeLevelId}
                      levelId={activeLevelId}
                      onSolved={(attempts, hintsUsed) => handleSolved(activeLevelId, attempts, hintsUsed)}
                      onAdvance={() => setActiveLevelId(nextLevelId)}
                      hasNext={hasNext}
                      levels={levels}
                      copy={copy}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
