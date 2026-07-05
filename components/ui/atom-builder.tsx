"use client"

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  AlertTriangle,
  Award,
  CheckCircle2,
  CircleDot,
  Info,
  Lock,
  Minus,
  MinusCircle,
  Plus,
  PlusCircle,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
} from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import {
  MAX_ELECTRONS,
  MAX_NEUTRONS,
  MAX_PROTONS,
  type AtomAnalysis,
  analyzeAtom,
  sanitizeParticleCount,
} from "@/lib/atom-analysis"
import {
  ACHIEVEMENTS,
  CHALLENGE_LEVELS,
  type AtomGameMode,
  type AtomGameProgress,
  type LevelCompletion,
  type ParticleCounts,
  completeLevel,
  evaluateLevel,
  getDefaultProgress,
  getLevelById,
  isLevelCompleted,
  isLevelUnlocked,
  loadAtomGameProgress,
  saveAtomGameProgress,
  updateProgress,
} from "@/lib/atom-game"
import { cn } from "@/lib/utils"

type ParticleKind = "proton" | "neutron" | "electron"

const SHELL_CAPACITIES = [2, 8, 18, 32, 32, 18, 8]

const TERM_TOOLTIPS = {
  proton:
    "A positive particle in the nucleus. The number of protons determines the element.",
  neutron:
    "A neutral particle in the nucleus. Neutrons change the isotope and mass number.",
  electron:
    "A negative particle outside the nucleus. Electrons change the atom's charge.",
  atomicNumber: "The number of protons.",
  massNumber: "Protons plus neutrons.",
  isotope: "The same element with a different number of neutrons.",
  ion: "An atom with unequal numbers of protons and electrons.",
  charge: "Protons minus electrons.",
  neutralAtom: "An atom with equal numbers of protons and electrons.",
  stableIsotope: "An isotope whose nucleus does not quickly break apart.",
}

export function AtomBuilder() {
  const { t } = useLanguage()
  const [protons, setProtons] = useState(1)
  const [neutrons, setNeutrons] = useState(0)
  const [electrons, setElectrons] = useState(1)
  const [reduced, setReduced] = useState(false)
  const [changeMessage, setChangeMessage] = useState(
    "Start with neutral Hydrogen-1: 1 proton, 0 neutrons, and 1 electron.",
  )
  const [mode, setMode] = useState<AtomGameMode>("sandbox")
  const [progress, setProgress] = useState<AtomGameProgress>(() =>
    getDefaultProgress(),
  )
  const [selectedLevelId, setSelectedLevelId] = useState(CHALLENGE_LEVELS[0].id)
  const [moves, setMoves] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [missionFeedback, setMissionFeedback] = useState(
    "Choose a mission and build the atom described.",
  )
  const [completion, setCompletion] = useState<LevelCompletion | null>(null)
  const [anim, setAnim] = useState<{
    token: number
    kind: ParticleKind | null
    delta: number
    elementChanged: boolean
  }>({ token: 0, kind: null, delta: 0, elementChanged: false })
  const [discovery, setDiscovery] = useState<string | null>(null)
  const discoveryTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (discoveryTimer.current) window.clearTimeout(discoveryTimer.current)
    }
  }, [])

  function setCounts(counts: ParticleCounts) {
    setProtons(counts.protons)
    setNeutrons(counts.neutrons)
    setElectrons(counts.electrons)
  }

  function startLevel(level: typeof CHALLENGE_LEVELS[number], message: string) {
    setCounts(level.start)
    setMoves(0)
    setMistakes(0)
    setCompletion(null)
    setMissionFeedback(level.mission)
    setChangeMessage(message)
  }

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener?.("change", update)
    return () => mq.removeEventListener?.("change", update)
  }, [])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const loaded = loadAtomGameProgress()
      const firstUnlocked =
        CHALLENGE_LEVELS.find((level) =>
          loaded.unlockedLevelIds.includes(level.id),
        ) ?? CHALLENGE_LEVELS[0]

      setProgress(loaded)
      setMode(loaded.lastSelectedMode)
      setSelectedLevelId(firstUnlocked.id)

      if (loaded.lastSelectedMode === "sandbox") {
        setCounts(loaded.lastSandboxAtom)
        setChangeMessage("Restored your last sandbox atom.")
        return
      }

      startLevel(firstUnlocked, "Level loaded. Build the mission atom.")
    }, 0)

    return () => window.clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const analysis = useMemo(
    () => analyzeAtom(protons, neutrons, electrons),
    [protons, neutrons, electrons],
  )
  const visualState = useMemo(() => getVisualState(analysis), [analysis])
  const currentLevel = useMemo(
    () => getLevelById(selectedLevelId),
    [selectedLevelId],
  )

  const applyParticleChange = (kind: ParticleKind, delta: number) => {
    if (mode === "challenge" && completion) return

    const before = { protons, neutrons, electrons }
    const max =
      kind === "proton"
        ? MAX_PROTONS
        : kind === "neutron"
          ? MAX_NEUTRONS
          : MAX_ELECTRONS
    const previousValue = before[`${kind}s` as keyof ParticleCounts]
    const nextValue = sanitizeParticleCount(previousValue + delta, max)

    if (nextValue === previousValue) return

    const after = { ...before, [`${kind}s`]: nextValue } as ParticleCounts
    const beforeAnalysis = analyzeAtom(
      before.protons,
      before.neutrons,
      before.electrons,
    )
    const afterAnalysis = analyzeAtom(
      after.protons,
      after.neutrons,
      after.electrons,
    )

    if (kind === "proton") setProtons(nextValue)
    if (kind === "neutron") setNeutrons(nextValue)
    if (kind === "electron") setElectrons(nextValue)

    const elementChanged =
      afterAnalysis.atomicNumber !== beforeAnalysis.atomicNumber &&
      afterAnalysis.elementName !== ""
    setAnim((prev) => ({
      token: prev.token + 1,
      kind,
      delta,
      elementChanged,
    }))
    if (elementChanged) {
      setDiscovery(`New element discovered: ${afterAnalysis.elementName}`)
      if (discoveryTimer.current) window.clearTimeout(discoveryTimer.current)
      discoveryTimer.current = window.setTimeout(() => setDiscovery(null), 2800)
    }

    setChangeMessage(
      getChangeMessage(kind, delta, before, after, beforeAnalysis, afterAnalysis),
    )

    if (mode === "sandbox") {
      const nextProgress = {
        ...progress,
        lastSandboxAtom: after,
        lastSelectedMode: "sandbox" as const,
      }
      setProgress(nextProgress)
      saveAtomGameProgress(nextProgress)
      return
    }

    if (completion) return

    const nextMoves = moves + 1
    const beforeDistance = getClosestGoalDistance(currentLevel, before)
    const afterDistance = getClosestGoalDistance(currentLevel, after)
    const nextMistakes =
      afterDistance > beforeDistance || afterAnalysis.validStatus === "invalid"
        ? mistakes + 1
        : mistakes
    const result = evaluateLevel(currentLevel, after, afterAnalysis)

    setMoves(nextMoves)
    setMistakes(nextMistakes)
    setMissionFeedback(result.feedback)

    if (result.complete) {
      const completed = completeLevel(
        progress,
        currentLevel,
        nextMoves,
        nextMistakes,
      )
      setProgress(completed.progress)
      setCompletion(completed)
    }
  }

  const reset = () => {
    if (mode === "challenge") {
      startLevel(currentLevel, "Mission reset. Try a clean build.")
      return
    }

    setProtons(1)
    setNeutrons(0)
    setElectrons(1)
    setChangeMessage(
      "Reset to neutral Hydrogen-1: 1 proton makes hydrogen, 0 neutrons makes Hydrogen-1, and 1 electron balances the charge.",
    )
    const sandboxAtom = { protons: 1, neutrons: 0, electrons: 1 }
    const nextProgress = {
      ...progress,
      lastSandboxAtom: sandboxAtom,
      lastSelectedMode: "sandbox" as const,
    }
    setProgress(nextProgress)
    saveAtomGameProgress(nextProgress)
  }

  const chooseMode = (nextMode: AtomGameMode) => {
    setMode(nextMode)
    setCompletion(null)
    const nextProgress = updateProgress(progress, (current) => ({
      ...current,
      lastSelectedMode: nextMode,
      lastSandboxAtom:
        mode === "sandbox" ? { protons, neutrons, electrons } : current.lastSandboxAtom,
    }))
    setProgress(nextProgress)

    if (nextMode === "sandbox") {
      setCounts(nextProgress.lastSandboxAtom)
      setChangeMessage("Sandbox Mode restored your saved atom.")
      return
    }

    const unlockedLevel = isLevelUnlocked(nextProgress, currentLevel)
      ? currentLevel
      : CHALLENGE_LEVELS.find((level) => isLevelUnlocked(nextProgress, level)) ??
        CHALLENGE_LEVELS[0]
    setSelectedLevelId(unlockedLevel.id)
    startLevel(unlockedLevel, "Challenge Mode ready. Build the mission atom.")
  }

  const chooseLevel = (levelId: string) => {
    const level = getLevelById(levelId)
    if (!isLevelUnlocked(progress, level)) return
    setSelectedLevelId(level.id)
    startLevel(level, `Level ${level.number} loaded. Build the mission atom.`)
  }

  const goToNextLevel = () => {
    const nextLevel = CHALLENGE_LEVELS[currentLevel.number]
    if (!nextLevel || !isLevelUnlocked(progress, nextLevel)) return
    chooseLevel(nextLevel.id)
  }

  // Distribute electrons across shells.
  const shells = useMemo(() => {
    const out: number[] = []
    let remaining = electrons
    for (const cap of SHELL_CAPACITIES) {
      const take = Math.min(cap, remaining)
      out.push(take)
      remaining -= take
      if (remaining <= 0) break
    }
    return out
  }, [electrons])

  return (
    <section className="relative overflow-hidden bg-[#fbf6ff] py-16 sm:py-20">
      {/* Soft lab grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,26,46,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,46,0.045) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, #000 55%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, #000 55%, transparent 100%)",
        }}
      />
      {/* Floating particles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 14% 14%, rgba(139,92,246,0.18) 0 5px, transparent 6px), radial-gradient(circle at 86% 22%, rgba(46,204,113,0.16) 0 4px, transparent 5px), radial-gradient(circle at 18% 84%, rgba(249,115,22,0.16) 0 4px, transparent 5px), radial-gradient(circle at 84% 88%, rgba(26,188,156,0.18) 0 5px, transparent 6px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-teal">
            {t.home.atomEyebrow}
          </p>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            {t.home.atomTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.home.atomDesc}
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mx-auto mt-9 flex w-fit rounded-full bg-white p-1 shadow-sm ring-1 ring-avanza-dark/10">
            <ModeButton
              active={mode === "sandbox"}
              label="Sandbox Mode"
              onClick={() => chooseMode("sandbox")}
            />
            <ModeButton
              active={mode === "challenge"}
              label="Challenge Mode"
              onClick={() => chooseMode("challenge")}
            />
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            {/* Atom visual */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(-0.7deg)]"
              />
              <div
                className={cn(
                  "relative overflow-hidden rounded-3xl bg-white p-4 shadow-[0_28px_64px_-30px_rgba(26,26,46,0.35)] ring-1 sm:p-6 md:p-8",
                  visualState === "invalid"
                    ? "ring-avanza-orange/40"
                    : visualState === "unstable"
                      ? "ring-avanza-purple/35"
                      : visualState === "stable"
                        ? "ring-avanza-green/40"
                        : "ring-avanza-dark/10",
                )}
                style={
                  reduced
                    ? undefined
                    : {
                        animation:
                          visualState === "invalid" || visualState === "unstable"
                            ? "atom-warn-glow 1.8s ease-in-out infinite"
                            : visualState === "stable"
                              ? "atom-stable-glow 2.4s ease-in-out infinite"
                              : undefined,
                      }
                }
              >
                {/* Element discovery banner */}
                {discovery && (
                  <div
                    key={discovery}
                    className="pointer-events-none absolute inset-x-3 top-3 z-10 flex items-center justify-center"
                    role="status"
                  >
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full bg-avanza-dark px-4 py-2 text-xs font-extrabold text-white shadow-lg ring-1 ring-white/15 sm:text-sm"
                      style={
                        reduced
                          ? undefined
                          : { animation: "atom-banner-in 0.5s ease-out both" }
                      }
                    >
                      <Sparkles className="h-4 w-4 text-avanza-green" />
                      {discovery}
                    </span>
                  </div>
                )}
                <div className="aspect-square w-full">
                  <AtomSVG
                    protons={protons}
                    neutrons={neutrons}
                    shells={shells}
                    reduced={reduced}
                    analysis={analysis}
                    animToken={anim.token}
                    animKind={anim.kind}
                    animDelta={anim.delta}
                    elementChanged={anim.elementChanged}
                  />
                </div>

                {/* Always-visible science feedback strip */}
                <div
                  className={cn(
                    "mt-4 flex items-start gap-3 rounded-2xl p-4 ring-1",
                    visualState === "invalid"
                      ? "bg-avanza-orange/12 ring-avanza-orange/25"
                      : visualState === "unstable"
                        ? "bg-avanza-purple/10 ring-avanza-purple/25"
                        : visualState === "stable"
                          ? "bg-avanza-green/12 ring-avanza-green/25"
                          : "bg-avanza-dark/5 ring-avanza-dark/10",
                  )}
                >
                  <StatusIcon state={visualState} />
                  <div className="min-w-0">
                    <p className="text-[11px] font-extrabold uppercase tracking-widest text-avanza-dark/60">
                      {getStabilityStatusLabel(analysis)}
                      {" · "}
                      {getIonStatusLabel(analysis)}
                    </p>
                    <p className="mt-1 text-sm font-bold leading-relaxed text-avanza-dark">
                      {analysis.shortExplanation}
                    </p>
                    {analysis.warningMessage && (
                      <p className="mt-1.5 flex items-start gap-1.5 text-xs font-bold leading-relaxed text-avanza-orange-dark">
                        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        {analysis.warningMessage}
                      </p>
                    )}
                  </div>
                </div>
                {mode === "challenge" && (
                  <div className="mt-5 rounded-2xl bg-avanza-dark p-4 text-white">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-widest text-white/55">
                          Challenge progress
                        </p>
                        <p className="mt-1 text-sm font-bold">
                          Moves: {moves} · Mistakes: {mistakes}
                        </p>
                      </div>
                      <StarRating count={completion?.stars ?? 0} />
                    </div>
                    <p
                      className={cn(
                        "mt-3 rounded-xl px-3 py-2 text-sm font-bold",
                        completion
                          ? "animate-pulse bg-avanza-green text-avanza-dark"
                          : "bg-white/8 text-white/85",
                      )}
                    >
                      {completion
                        ? `Mission complete! ${completion.stars} star${completion.stars === 1 ? "" : "s"} · ${completion.score} points.`
                        : missionFeedback}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(0.6deg)]"
              />
              <div className="relative flex h-full flex-col gap-5 rounded-3xl bg-avanza-dark p-5 text-primary-foreground shadow-[0_28px_64px_-30px_rgba(26,26,46,0.4)] sm:p-7">
                {mode === "challenge" ? (
                  <ChallengePanel
                    currentLevel={currentLevel}
                    progress={progress}
                    completion={completion}
                    missionFeedback={missionFeedback}
                    onChooseLevel={chooseLevel}
                    onNextLevel={goToNextLevel}
                  />
                ) : (
                  <div className="rounded-2xl bg-white/8 p-4 text-sm text-white/82 ring-1 ring-white/10">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-white/55">
                      Sandbox Mode
                    </p>
                    <p className="mt-1 font-bold text-white">
                      Explore freely. Every atom still uses the same validation
                      as Challenge Mode.
                    </p>
                  </div>
                )}

                {/* Element card */}
                <div
                  key={anim.elementChanged ? anim.token : "element-card"}
                  className="rounded-2xl bg-white p-5 text-avanza-dark shadow-inner ring-1 ring-white/5"
                  style={
                    reduced || !anim.elementChanged
                      ? undefined
                      : { animation: "atom-card-pop 0.5s ease-out" }
                  }
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "flex h-16 w-16 shrink-0 items-center justify-center rounded-xl font-mono text-2xl font-extrabold",
                        visualState === "invalid"
                          ? "bg-avanza-orange/15 text-avanza-orange-dark"
                          : "bg-avanza-purple/15 text-avanza-purple",
                      )}
                    >
                      {analysis.elementSymbol || "?"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
                        {t.home.atomElementLabel}
                      </p>
                      <p className="truncate text-2xl font-extrabold">
                        {analysis.elementName || t.home.atomNoElement}
                      </p>
                      {analysis.isotopeName && (
                        <p className="mt-0.5 truncate text-xs font-bold text-avanza-dark/70">
                          {analysis.isotopeName}
                        </p>
                      )}
                    </div>
                    <span
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider",
                        visualState === "invalid"
                          ? "bg-avanza-orange/15 text-avanza-orange-dark"
                          : visualState === "stable"
                            ? "bg-avanza-green/15 text-avanza-green-dark"
                            : visualState === "unstable"
                              ? "bg-avanza-purple/15 text-avanza-purple-dark"
                              : "bg-avanza-dark/8 text-avanza-dark/75",
                      )}
                    >
                      <StatusIcon state={visualState} className="h-3.5 w-3.5" />
                      {getStabilityStatusLabel(analysis)}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <ElementStat
                      label="Atomic no."
                      value={analysis.atomicNumber}
                      tooltip={TERM_TOOLTIPS.atomicNumber}
                    />
                    <ElementStat
                      label={t.home.atomMassNumber}
                      value={analysis.massNumber}
                      tooltip={TERM_TOOLTIPS.massNumber}
                    />
                    <ElementStat
                      label={t.home.atomCharge}
                      value={analysis.chargeLabel}
                      tooltip={TERM_TOOLTIPS.charge}
                    />
                    <ElementStat
                      label="Type"
                      value={getIonShortLabel(analysis)}
                      tooltip={
                        analysis.neutralIonStatus === "neutral"
                          ? TERM_TOOLTIPS.neutralAtom
                          : TERM_TOOLTIPS.ion
                      }
                    />
                  </div>
                </div>

                <ParticleRow
                  label={t.home.atomProtons}
                  hint={t.home.atomProtonHint}
                  tooltip={TERM_TOOLTIPS.proton}
                  count={protons}
                  onInc={() => applyParticleChange("proton", 1)}
                  onDec={() => applyParticleChange("proton", -1)}
                  incDisabled={
                    protons >= MAX_PROTONS || (mode === "challenge" && Boolean(completion))
                  }
                  decDisabled={
                    protons <= 0 || (mode === "challenge" && Boolean(completion))
                  }
                  dotClass="bg-avanza-orange"
                  noun="proton"
                />
                <ParticleRow
                  label={t.home.atomNeutrons}
                  hint={t.home.atomNeutronHint}
                  tooltip={TERM_TOOLTIPS.neutron}
                  count={neutrons}
                  onInc={() => applyParticleChange("neutron", 1)}
                  onDec={() => applyParticleChange("neutron", -1)}
                  incDisabled={
                    neutrons >= MAX_NEUTRONS || (mode === "challenge" && Boolean(completion))
                  }
                  decDisabled={
                    neutrons <= 0 || (mode === "challenge" && Boolean(completion))
                  }
                  dotClass="bg-white/70"
                  noun="neutron"
                />
                <ParticleRow
                  label={t.home.atomElectrons}
                  hint={t.home.atomElectronHint}
                  tooltip={TERM_TOOLTIPS.electron}
                  count={electrons}
                  onInc={() => applyParticleChange("electron", 1)}
                  onDec={() => applyParticleChange("electron", -1)}
                  incDisabled={
                    electrons >= MAX_ELECTRONS || (mode === "challenge" && Boolean(completion))
                  }
                  decDisabled={
                    electrons <= 0 || (mode === "challenge" && Boolean(completion))
                  }
                  dotClass="bg-avanza-teal"
                  noun="electron"
                />

                <div className="rounded-2xl bg-white/8 p-4 text-sm leading-relaxed text-white/82 ring-1 ring-white/10">
                  <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-white/55">
                    <Sparkles className="h-3.5 w-3.5" />
                    What changed?
                  </p>
                  <p className="mt-1 font-bold text-white">{changeMessage}</p>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    {t.home.atomReset}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function ParticleRow({
  label,
  hint,
  tooltip,
  count,
  onInc,
  onDec,
  incDisabled,
  decDisabled,
  dotClass,
  noun,
}: {
  label: string
  hint: string
  tooltip: string
  count: number
  onInc: () => void
  onDec: () => void
  incDisabled: boolean
  decDisabled: boolean
  dotClass: string
  noun: string
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10 sm:p-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className={cn("h-3 w-3 shrink-0 rounded-full shadow", dotClass)} />
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-sm font-extrabold uppercase tracking-wider">
            {label}
            <InfoTooltip label={label} tooltip={tooltip} />
          </p>
          <p className="truncate text-xs text-white/65">{hint}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <HoldButton
          onActivate={onDec}
          disabled={decDisabled}
          ariaLabel={`Remove ${noun}`}
          variant="dec"
        >
          <Minus className="h-4 w-4" />
        </HoldButton>
        <span className="w-9 text-center font-mono text-xl font-extrabold tabular-nums sm:w-11">
          {count}
        </span>
        <HoldButton
          onActivate={onInc}
          disabled={incDisabled}
          ariaLabel={`Add ${noun}`}
          variant="inc"
        >
          <Plus className="h-4 w-4" />
        </HoldButton>
      </div>
    </div>
  )
}

function HoldButton({
  onActivate,
  disabled,
  ariaLabel,
  variant,
  children,
}: {
  onActivate: () => void
  disabled: boolean
  ariaLabel: string
  variant: "inc" | "dec"
  children: ReactNode
}) {
  // Keep the latest callback so hold-to-repeat always sees fresh state.
  const activateRef = useRef(onActivate)
  useEffect(() => {
    activateRef.current = onActivate
  }, [onActivate])
  const intervalRef = useRef<number | null>(null)
  const delayRef = useRef<number | null>(null)

  const stopRepeat = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (delayRef.current) {
      window.clearTimeout(delayRef.current)
      delayRef.current = null
    }
  }

  useEffect(() => stopRepeat, [])

  // First activation comes from onClick (keyboard + pointer). Pointer-hold only
  // schedules the *repeat*, so validation runs on every single step.
  const startHold = () => {
    if (disabled) return
    stopRepeat()
    delayRef.current = window.setTimeout(() => {
      intervalRef.current = window.setInterval(() => activateRef.current(), 130)
    }, 380)
  }

  return (
    <button
      type="button"
      onClick={() => activateRef.current()}
      onPointerDown={startHold}
      onPointerUp={stopRepeat}
      onPointerLeave={stopRepeat}
      onPointerCancel={stopRepeat}
      disabled={disabled}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full shadow-sm transition-[transform,background-color] duration-100 active:scale-90 disabled:cursor-not-allowed disabled:opacity-30 disabled:active:scale-100",
        variant === "inc"
          ? "bg-avanza-green text-avanza-dark hover:bg-emerald-400 disabled:hover:bg-avanza-green"
          : "bg-white/12 text-white hover:bg-white/22 disabled:hover:bg-white/12",
      )}
    >
      {children}
    </button>
  )
}

function ModeButton({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-5 py-2 text-sm font-extrabold transition-colors",
        active
          ? "bg-avanza-dark text-white shadow-sm"
          : "text-avanza-dark/70 hover:bg-avanza-dark/8 hover:text-avanza-dark",
      )}
    >
      {label}
    </button>
  )
}

function ChallengePanel({
  currentLevel,
  progress,
  completion,
  missionFeedback,
  onChooseLevel,
  onNextLevel,
}: {
  currentLevel: (typeof CHALLENGE_LEVELS)[number]
  progress: AtomGameProgress
  completion: LevelCompletion | null
  missionFeedback: string
  onChooseLevel: (levelId: string) => void
  onNextLevel: () => void
}) {
  const nextLevel = CHALLENGE_LEVELS[currentLevel.number]
  const unlockedAchievements = ACHIEVEMENTS.filter((achievement) =>
    progress.achievementIds.includes(achievement.id),
  )

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-white/55">
              <Target className="h-3.5 w-3.5" />
              Level {currentLevel.number}
            </p>
            <h3 className="mt-1 text-xl font-extrabold text-white">
              {currentLevel.title}
            </h3>
          </div>
          <StarRating count={progress.starsByLevel[currentLevel.id] ?? 0} />
        </div>
        <p className="mt-3 text-sm font-bold leading-relaxed text-white">
          {currentLevel.mission}
        </p>
        {currentLevel.clue && (
          <p className="mt-2 rounded-xl bg-avanza-purple/20 px-3 py-2 text-sm font-bold text-white">
            Clue: {currentLevel.clue}
          </p>
        )}
        <p className="mt-2 text-xs font-bold leading-relaxed text-white/65">
          {currentLevel.lesson}
        </p>
        <p
          className={cn(
            "mt-3 rounded-xl px-3 py-2 text-sm font-bold leading-relaxed",
            completion
              ? "animate-pulse bg-avanza-green text-avanza-dark"
              : "bg-white/8 text-white/82",
          )}
        >
          {completion ? currentLevel.successMessage : missionFeedback}
        </p>
        {completion && (
          <div className="mt-3 rounded-xl bg-white p-3 text-avanza-dark">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="flex items-center gap-1.5 text-sm font-extrabold">
                  <CheckCircle2 className="h-4 w-4 text-avanza-green" />
                  Level complete
                </p>
                <p className="mt-1 text-xs font-bold text-avanza-dark/65">
                  Score {completion.score} · {completion.stars} star
                  {completion.stars === 1 ? "" : "s"}
                </p>
              </div>
              {nextLevel && isLevelUnlocked(progress, nextLevel) && (
                <button
                  type="button"
                  onClick={onNextLevel}
                  className="rounded-full bg-avanza-dark px-4 py-2 text-xs font-extrabold text-white transition-colors hover:bg-avanza-purple"
                >
                  Next level
                </button>
              )}
            </div>
            {completion.achievementIds.length > 0 && (
              <p className="mt-2 text-xs font-bold text-avanza-purple">
                Achievement unlocked:{" "}
                {completion.achievementIds
                  .map(
                    (id) =>
                      ACHIEVEMENTS.find((achievement) => achievement.id === id)
                        ?.name ?? id,
                  )
                  .join(", ")}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
        <p className="text-[10px] font-extrabold uppercase tracking-widest text-white/55">
          Missions
        </p>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {CHALLENGE_LEVELS.map((level) => {
            const unlocked = isLevelUnlocked(progress, level)
            const completed = isLevelCompleted(progress, level)
            const selected = level.id === currentLevel.id
            return (
              <button
                key={level.id}
                type="button"
                onClick={() => onChooseLevel(level.id)}
                disabled={!unlocked}
                title={unlocked ? level.title : "Complete earlier levels to unlock this."}
                className={cn(
                  "flex h-11 items-center justify-center rounded-xl text-sm font-extrabold transition-colors ring-1",
                  selected
                    ? "bg-avanza-green text-avanza-dark ring-avanza-green"
                    : completed
                      ? "bg-white text-avanza-dark ring-white"
                      : unlocked
                        ? "bg-white/10 text-white ring-white/15 hover:bg-white/16"
                        : "bg-white/5 text-white/35 ring-white/8",
                )}
              >
                {unlocked ? (
                  completed ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    level.number
                  )
                ) : (
                  <Lock className="h-4 w-4" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
        <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-white/55">
          <Award className="h-3.5 w-3.5" />
          Achievements
        </p>
        {unlockedAchievements.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {unlockedAchievements.map((achievement) => (
              <span
                key={achievement.id}
                title={achievement.description}
                className="rounded-full bg-white px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-avanza-dark"
              >
                {achievement.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-xs font-bold text-white/60">
            Complete missions to unlock achievements.
          </p>
        )}
      </div>
    </div>
  )
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} stars`}>
      {[1, 2, 3].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-4 w-4",
            star <= count
              ? "fill-avanza-orange text-avanza-orange"
              : "text-white/28",
          )}
        />
      ))}
    </div>
  )
}

function InfoTooltip({
  label,
  tooltip,
  dark = false,
}: {
  label: string
  tooltip: string
  dark?: boolean
}) {
  return (
    <span
      tabIndex={0}
      title={tooltip}
      aria-label={`${label}: ${tooltip}`}
      className={cn(
        "inline-flex h-4 w-4 items-center justify-center rounded-full ring-1",
        dark
          ? "bg-avanza-dark/10 text-avanza-dark/70 ring-avanza-dark/15"
          : "bg-white/12 text-white/80 ring-white/15",
      )}
    >
      <Info className="h-3 w-3" />
    </span>
  )
}

function getStabilityStatusLabel(analysis: AtomAnalysis): string {
  if (analysis.neutralIonStatus === "not-an-atom") return "Not an atom"
  if (analysis.validStatus === "invalid") return "Invalid isotope"
  if (analysis.stabilityStatus === "stable") return "Known stable isotope"
  if (analysis.stabilityStatus === "unstable") return "Unstable isotope"
  return "Stability not labeled"
}

function getIonStatusLabel(analysis: AtomAnalysis): string {
  if (analysis.neutralIonStatus === "not-an-atom") return "No ion status"
  if (analysis.neutralIonStatus === "neutral") return "Neutral atom"
  if (analysis.ionChargeStatus === "cation") return "Positive ion / cation"
  return "Negative ion / anion"
}

type VisualState =
  | "invalid"
  | "stable"
  | "unstable"
  | "neutral"
  | "cation"
  | "anion"

function getVisualState(analysis: AtomAnalysis): VisualState {
  if (
    analysis.neutralIonStatus === "not-an-atom" ||
    analysis.validStatus === "invalid"
  ) {
    return "invalid"
  }
  if (analysis.stabilityStatus === "unstable") return "unstable"
  if (analysis.neutralIonStatus === "ion") {
    return analysis.ionChargeStatus === "cation" ? "cation" : "anion"
  }
  if (analysis.stabilityStatus === "stable") return "stable"
  return "neutral"
}

function StatusIcon({
  state,
  className = "mt-0.5 h-5 w-5",
}: {
  state: VisualState
  className?: string
}) {
  const base = cn("shrink-0", className)
  if (state === "invalid")
    return <AlertTriangle className={cn(base, "text-avanza-orange")} />
  if (state === "stable")
    return <ShieldCheck className={cn(base, "text-avanza-green")} />
  if (state === "unstable")
    return <Sparkles className={cn(base, "text-avanza-purple")} />
  if (state === "cation")
    return <PlusCircle className={cn(base, "text-avanza-orange")} />
  if (state === "anion")
    return <MinusCircle className={cn(base, "text-avanza-teal")} />
  return <CircleDot className={cn(base, "text-avanza-dark/70")} />
}

function getIonShortLabel(analysis: AtomAnalysis): string {
  if (analysis.neutralIonStatus === "not-an-atom") return "—"
  if (analysis.neutralIonStatus === "neutral") return "Neutral"
  return analysis.ionChargeStatus === "cation" ? "Cation +" : "Anion −"
}

function ElementStat({
  label,
  value,
  tooltip,
}: {
  label: string
  value: string | number
  tooltip?: string
}) {
  return (
    <div className="rounded-xl bg-avanza-dark/5 px-3 py-2">
      <p className="flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-widest text-avanza-dark/55">
        {label}
        {tooltip && <InfoTooltip label={label} tooltip={tooltip} dark />}
      </p>
      <p className="mt-0.5 truncate font-mono text-sm font-extrabold text-avanza-dark">
        {value}
      </p>
    </div>
  )
}

function getChangeMessage(
  kind: ParticleKind,
  delta: number,
  before: ParticleCounts,
  after: ParticleCounts,
  beforeAnalysis: AtomAnalysis,
  afterAnalysis: AtomAnalysis,
): string {
  if (kind === "proton") {
    if (after.protons === 0) {
      return `You changed the proton count from ${before.protons} to 0, so there is no element yet. Add at least 1 proton to create an atom.`
    }

    return `You changed the proton count from ${before.protons} to ${after.protons}, so the element changed from ${elementLabel(beforeAnalysis)} to ${elementLabel(afterAnalysis)}.`
  }

  if (kind === "neutron") {
    if (after.protons === 0) {
      return `You ${changeVerb(delta)} a neutron, but neutrons without protons do not make an atom.`
    }

    return `You ${changeVerb(delta)} a neutron, so the isotope changed from ${isotopeLabel(beforeAnalysis)} to ${isotopeLabel(afterAnalysis)}.`
  }

  if (after.protons === 0) {
    return `You ${changeVerb(delta)} an electron, but electrons without protons are not an atom or an ion.`
  }

  return `You ${changeVerb(delta)} an electron, so the charge changed from ${beforeAnalysis.chargeLabel} to ${afterAnalysis.chargeLabel}.`
}

function changeVerb(delta: number): string {
  return delta > 0 ? "added" : "removed"
}

function elementLabel(analysis: AtomAnalysis): string {
  return analysis.elementName || "no element"
}

function isotopeLabel(analysis: AtomAnalysis): string {
  return analysis.isotopeName || "no isotope"
}

function getClosestGoalDistance(
  level: (typeof CHALLENGE_LEVELS)[number],
  counts: ParticleCounts,
): number {
  return level.acceptedAnswers.reduce((best, answer) => {
    const distance =
      Math.abs(answer.protons - counts.protons) +
      Math.abs(answer.neutrons - counts.neutrons) +
      Math.abs(answer.electrons - counts.electrons)
    return Math.min(best, distance)
  }, Number.POSITIVE_INFINITY)
}

const SHELL_RADII = [52, 74, 96, 118, 140, 162, 184]

function AtomSVG({
  protons,
  neutrons,
  shells,
  reduced,
  analysis,
  animToken,
  animKind,
  animDelta,
  elementChanged,
}: {
  protons: number
  neutrons: number
  shells: number[]
  reduced: boolean
  analysis: AtomAnalysis
  animToken: number
  animKind: ParticleKind | null
  animDelta: number
  elementChanged: boolean
}) {
  const size = 400
  const cx = size / 2
  const cy = size / 2
  const nucleusR = 38

  const state = getVisualState(analysis)
  const total = protons + neutrons
  const nucleusUnstable =
    total > 0 && (state === "invalid" || state === "unstable")

  // Which nucleon was just added, so it can fly in.
  const nucleonAdded = animDelta > 0 && (animKind === "proton" || animKind === "neutron")
  const justAddedNucleon = nucleonAdded
    ? animKind === "proton"
      ? protons - 1
      : total - 1
    : -1
  const nucleonRemoved =
    animDelta < 0 && (animKind === "proton" || animKind === "neutron") && total >= 0

  const electronAdded = animDelta > 0 && animKind === "electron"
  const electronRemoved = animDelta < 0 && animKind === "electron"
  const outerShellIdx = shells.length - 1

  // Generate proton/neutron positions inside nucleus on a small spiral.
  const nucleons = Array.from({ length: total }).map((_, i) => {
    if (total === 1) return { x: cx, y: cy, kind: i < protons ? "p" : "n" }
    const angle = i * 2.4
    const radius = Math.min(nucleusR - 8, 4 + Math.sqrt(i) * 8)
    return {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
      kind: i < protons ? "p" : "n",
    }
  })

  const glowColor =
    state === "stable"
      ? "rgba(46,204,113,0.4)"
      : state === "unstable"
        ? "rgba(139,92,246,0.4)"
        : state === "invalid"
          ? "rgba(249,115,22,0.42)"
          : "rgba(249,115,22,0.3)"
  const pulseColor = state === "invalid" ? "#f97316" : state === "stable" ? "#2ecc71" : "#8b5cf6"

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="h-full w-full"
      role="img"
      aria-label={`Atom diagram: ${
        analysis.elementName ? analysis.isotopeName : "no element yet"
      }, charge ${analysis.chargeLabel}, ${getStabilityStatusLabel(analysis)}`}
    >
      <defs>
        <radialGradient id="atomBg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#f6efff" />
          <stop offset="100%" stopColor="#ffffff" />
        </radialGradient>
        <radialGradient id="nucleusGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={glowColor} />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width={size} height={size} fill="url(#atomBg)" rx="20" />

      {/* Electron shells */}
      {shells.map((count, idx) => {
        const r = SHELL_RADII[idx]
        return (
          <g key={idx}>
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="rgba(26,26,46,0.18)"
              strokeWidth={1.4}
              strokeDasharray="4 6"
            />
            <g
              style={{
                transformOrigin: `${cx}px ${cy}px`,
                animation: reduced
                  ? undefined
                  : `${idx % 2 === 0 ? "atom-spin-cw" : "atom-spin-ccw"} ${14 + idx * 4}s linear infinite`,
              }}
            >
              {Array.from({ length: count }).map((_, i) => {
                const angle = (i / count) * Math.PI * 2
                const x = cx + Math.cos(angle) * r
                const y = cy + Math.sin(angle) * r
                const isNewest =
                  electronAdded && idx === outerShellIdx && i === count - 1
                const inner = (
                  <g
                    style={
                      isNewest && !reduced
                        ? {
                            transformOrigin: `${x}px ${y}px`,
                            animation: "atom-particle-in 0.5s ease-out both",
                          }
                        : undefined
                    }
                  >
                    <circle cx={x} cy={y} r={9} fill="#1abc9c" />
                    <text
                      x={x}
                      y={y + 3}
                      textAnchor="middle"
                      fontFamily="monospace"
                      fontSize="10"
                      fontWeight="800"
                      fill="#fff"
                    >
                      e
                    </text>
                  </g>
                )
                return <g key={isNewest ? `e-${animToken}` : i}>{inner}</g>
              })}
            </g>
          </g>
        )
      })}

      {/* Electron leaving */}
      {electronRemoved && !reduced && outerShellIdx >= 0 && (
        <g key={`e-out-${animToken}`}>
          <circle
            cx={cx}
            cy={cy - (SHELL_RADII[outerShellIdx] ?? 52)}
            r={9}
            fill="#1abc9c"
            style={{
              transformOrigin: `${cx}px ${cy - (SHELL_RADII[outerShellIdx] ?? 52)}px`,
              animation: "atom-particle-out 0.45s ease-out both",
            }}
          />
        </g>
      )}

      {/* Nucleus glow + change pulse */}
      {total > 0 && (
        <circle cx={cx} cy={cy} r={nucleusR + 14} fill="url(#nucleusGlow)" />
      )}
      {total > 0 && !reduced && (
        <circle
          key={`pulse-${animToken}`}
          cx={cx}
          cy={cy}
          r={nucleusR + 6}
          fill="none"
          stroke={pulseColor}
          strokeWidth={3}
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            animation: "atom-nucleus-pulse 0.7s ease-out both",
          }}
        />
      )}

      {/* Warning outline for unstable / invalid nucleus (non-color cue too) */}
      {nucleusUnstable && (
        <circle
          cx={cx}
          cy={cy}
          r={nucleusR + 3}
          fill="none"
          stroke={state === "invalid" ? "#f97316" : "#8b5cf6"}
          strokeWidth={2.5}
          strokeDasharray="5 5"
        />
      )}

      {/* Nucleons (shake as a group when unstable/invalid) */}
      <g
        style={
          nucleusUnstable && !reduced
            ? {
                transformOrigin: `${cx}px ${cy}px`,
                animation: "atom-nucleus-shake 0.4s ease-in-out infinite",
              }
            : undefined
        }
      >
        {nucleons.map((n, i) => {
          const isNewest = i === justAddedNucleon
          const jitter =
            !reduced && total > 1
              ? {
                  // Deterministic per-index gentle drift.
                  "--jx": `${(((i * 7) % 5) - 2) * 0.5}px`,
                  "--jy": `${(((i * 3) % 5) - 2) * 0.5}px`,
                  animation: `atom-nucleon-jitter ${2.4 + (i % 4) * 0.5}s ease-in-out infinite`,
                } as CSSProperties
              : undefined
          const body = (
            <>
              <circle
                cx={n.x}
                cy={n.y}
                r={9}
                fill={n.kind === "p" ? "#f97316" : "#cbd5e1"}
                stroke="#1a1a2e"
                strokeWidth={1.2}
              />
              <text
                x={n.x}
                y={n.y + 3.5}
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="10"
                fontWeight="800"
                fill={n.kind === "p" ? "#fff" : "#1a1a2e"}
              >
                {n.kind === "p" ? "+" : "n"}
              </text>
            </>
          )
          return (
            <g key={i} style={jitter}>
              {isNewest && !reduced ? (
                <g
                  key={`in-${animToken}`}
                  style={{
                    transformOrigin: `${n.x}px ${n.y}px`,
                    animation: "atom-particle-in 0.5s ease-out both",
                  }}
                >
                  {body}
                </g>
              ) : (
                body
              )}
            </g>
          )
        })}
      </g>

      {/* Nucleon leaving */}
      {nucleonRemoved && total > 0 && !reduced && (
        <circle
          key={`n-out-${animToken}`}
          cx={cx}
          cy={cy}
          r={9}
          fill={animKind === "proton" ? "#f97316" : "#cbd5e1"}
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            animation: "atom-particle-out 0.45s ease-out both",
          }}
        />
      )}

      {/* Element-change burst */}
      {elementChanged && !reduced && (
        <g key={`burst-${animToken}`}>
          <circle
            cx={cx}
            cy={cy}
            r={nucleusR}
            fill="none"
            stroke="#f97316"
            strokeWidth={3}
            style={{
              transformOrigin: `${cx}px ${cy}px`,
              animation: "atom-burst-ring 0.7s ease-out both",
            }}
          />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={4}
                fill="#8b5cf6"
                style={
                  {
                    "--sx": `${Math.cos(angle) * 60}px`,
                    "--sy": `${Math.sin(angle) * 60}px`,
                    animation: "atom-spark-fly 0.7s ease-out both",
                  } as CSSProperties
                }
              />
            )
          })}
        </g>
      )}

      {/* Empty state */}
      {total === 0 && (
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fontFamily="sans-serif"
          fontSize="13"
          fontWeight="700"
          fill="#9ca3af"
        >
          Add a proton to begin
        </text>
      )}
    </svg>
  )
}
