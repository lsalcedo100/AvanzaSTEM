"use client"

import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react"
import { Minus, Plus, RotateCcw } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { cn } from "@/lib/utils"

const MIN_RANDOM_LIMIT_KG = 30
const MAX_RANDOM_LIMIT_KG = 45
const MIN_WARNING_GAP_KG = 8
const MAX_WARNING_GAP_KG = 12
const DISPLAY_HEADROOM_KG = 8
const KG_PER_WEIGHT_BLOCK = 4

type BridgeStage = "safe" | "warning" | "failed"
type BridgeAttempt = {
  bridgeLimit: number
  warningStart: number
  weightBlockColors: string[]
}

const HYDRATION_SAFE_ATTEMPT: BridgeAttempt = {
  bridgeLimit: MIN_RANDOM_LIMIT_KG,
  warningStart: MIN_RANDOM_LIMIT_KG - MIN_WARNING_GAP_KG,
  weightBlockColors: Array.from(
    { length: Math.ceil((MIN_RANDOM_LIMIT_KG + DISPLAY_HEADROOM_KG) / KG_PER_WEIGHT_BLOCK) },
    (_, index) => `hsl(${index * 47}, 80%, 58%)`,
  ),
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomHexColor() {
  return `#${randomInteger(0, 0xffffff).toString(16).padStart(6, "0")}`
}

function createBridgeAttempt(): BridgeAttempt {
  const bridgeLimit = randomInteger(MIN_RANDOM_LIMIT_KG, MAX_RANDOM_LIMIT_KG)
  const warningStart = bridgeLimit - randomInteger(MIN_WARNING_GAP_KG, MAX_WARNING_GAP_KG)
  const blockCount = Math.ceil((bridgeLimit + DISPLAY_HEADROOM_KG) / KG_PER_WEIGHT_BLOCK)
  const weightBlockColors = Array.from({ length: blockCount }, randomHexColor)

  return { bridgeLimit, warningStart, weightBlockColors }
}

export function BridgeLoadDemo() {
  const { language, t } = useLanguage()
  const [attempt, setAttempt] = useState<BridgeAttempt>(HYDRATION_SAFE_ATTEMPT)
  const [load, setLoad] = useState(0)
  const [maxTestedLoad, setMaxTestedLoad] = useState(0)
  const [bestSafeLoad, setBestSafeLoad] = useState(0)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAttempt(createBridgeAttempt())
  }, [])

  const { bridgeLimit, warningStart, weightBlockColors } = attempt
  const displayMaxKg = bridgeLimit + DISPLAY_HEADROOM_KG

  const stage = useMemo<BridgeStage>(() => {
    if (load >= bridgeLimit) return "failed"
    if (load >= warningStart) return "warning"
    return "safe"
  }, [bridgeLimit, load, warningStart])

  const failed = stage === "failed"
  const hasDiscoveredFailure = maxTestedLoad >= bridgeLimit
  const overLimit = Math.max(load - bridgeLimit, 0)
  const safetyLeft = Math.max(bridgeLimit - load, 0)
  const loadRatio = Math.min(load / bridgeLimit, 1.18)

  function updateLoad(nextLoad: number) {
    const clampedLoad = Math.max(0, Math.min(displayMaxKg, nextLoad))
    setLoad(clampedLoad)
    setMaxTestedLoad((max) => Math.max(max, clampedLoad))
    if (clampedLoad < bridgeLimit) {
      setBestSafeLoad((best) => Math.max(best, clampedLoad))
    }
  }

  function resetAttempt() {
    setAttempt(createBridgeAttempt())
    setLoad(0)
    setMaxTestedLoad(0)
    setBestSafeLoad(0)
  }

  const explanation =
    failed
      ? {
          title: t.home.bridgeFactBrokenTitle,
          body: t.home.bridgeFactBroken,
        }
      : stage === "safe"
        ? {
            title: t.home.bridgeFactSafeTitle,
            body: t.home.bridgeFactSafe,
          }
        : {
            title: t.home.bridgeFactStressTitle,
            body: t.home.bridgeFactStress,
          }

  const statusCopy = {
    safe: {
      label: t.home.bridgeStatusSafe,
      tone: "border-avanza-green/35 bg-avanza-green/12 text-avanza-green-dark",
      dot: "bg-avanza-green",
    },
    warning: {
      label: t.home.bridgeStatusStress,
      tone: "border-avanza-orange/35 bg-avanza-orange/12 text-avanza-orange-dark",
      dot: "bg-avanza-orange",
    },
    failed: {
      label: t.home.bridgeStatusBroken,
      tone: "border-red-600 bg-red-600 text-white",
      dot: "bg-white",
    },
  }[stage]

  const resultSummary = formatResultSummary(language, load, bridgeLimit, overLimit)

  return (
    <section className="relative overflow-hidden bg-[#f5fbf3] py-14 md:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.34]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(26,26,46,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,46,0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <FadeIn className="grid gap-5 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <h2 className="text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
              {t.home.bridgeTitle}
            </h2>
            <p className="mt-4 hidden max-w-3xl text-lg leading-relaxed text-muted-foreground md:block">
              {t.home.bridgeDesc}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:hidden">
              {t.home.bridgeDescShort}
            </p>
          </div>

          <div className="rounded-lg border border-avanza-dark/10 bg-white/82 p-4 shadow-[0_18px_44px_-32px_rgba(26,26,46,0.36)]">
            <p className="text-xs font-extrabold uppercase tracking-wider text-avanza-orange-dark">
              {t.home.bridgeChallengeLabel}
            </p>
            <p className="mt-1 text-sm font-bold leading-relaxed text-avanza-dark">
              {t.home.bridgeChallengeText}
            </p>
            <p className="mt-3 font-mono text-lg font-extrabold text-avanza-green-dark">
              {t.home.bridgeBestSafeLoad}: {bestSafeLoad} kg
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.8fr)]">
            <div className="rounded-lg border border-avanza-dark/10 bg-white p-4 shadow-[0_24px_56px_-32px_rgba(26,26,46,0.4)] md:p-5">
              <div className="overflow-hidden rounded-lg border border-avanza-dark/10 bg-[#f8fcf8]">
                <div className="aspect-[16/10] w-full sm:aspect-[16/8.6]">
                  <BridgeSVG
                    stage={stage}
                    load={load}
                    loadRatio={loadRatio}
                    bridgeLimit={bridgeLimit}
                    warningStart={warningStart}
                    weightBlockColors={weightBlockColors}
                  />
                </div>
              </div>

              <BridgeControls
                load={load}
                maxTestedLoad={maxTestedLoad}
                stage={stage}
                bridgeLimit={bridgeLimit}
                warningStart={warningStart}
                displayMaxKg={displayMaxKg}
                onChange={updateLoad}
                onReset={resetAttempt}
              />
            </div>

            <div className="grid gap-5">
              <aside
                className="rounded-lg bg-avanza-dark p-5 text-primary-foreground shadow-[0_24px_56px_-34px_rgba(26,26,46,0.52)] md:p-6"
                aria-live="polite"
              >
                <div
                  className={cn(
                    "inline-flex rounded-md border px-2.5 py-1 text-xs font-extrabold uppercase tracking-wider",
                    statusCopy.tone,
                  )}
                >
                  {statusCopy.label}
                </div>

                <h3 className="mt-4 text-2xl font-extrabold leading-tight md:text-3xl">
                  {explanation.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-white/82">
                  {explanation.body}
                </p>
              </aside>

              <dl className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {hasDiscoveredFailure ? (
                  <>
                    <Stat label={t.home.bridgeStatLoad} value={`${load} kg`} />
                    <Stat label={t.home.bridgeStatLimit} value={`${bridgeLimit} kg`} />
                    {failed ? (
                      <Stat label={t.home.bridgeStatOverLimit} value={`${overLimit} kg`} tone="danger" />
                    ) : (
                      <Stat label={t.home.bridgeStatHeadroom} value={`${safetyLeft} kg`} />
                    )}
                  </>
                ) : (
                  <>
                    <Stat label={t.home.bridgeStatLoad} value={`${load} kg`} />
                    <Stat label={t.home.bridgeStatLimit} value="? kg" />
                    <Stat label={t.home.bridgeStatHeadroom} value="? kg" />
                  </>
                )}
              </dl>

              {failed && (
                <p
                  className="rounded-lg border border-red-200 bg-white p-4 text-sm font-bold leading-relaxed text-red-700 shadow-[0_18px_44px_-34px_rgba(26,26,46,0.36)]"
                  aria-live="polite"
                >
                  {resultSummary}
                </p>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function BridgeControls({
  load,
  maxTestedLoad,
  stage,
  bridgeLimit,
  warningStart,
  displayMaxKg,
  onChange,
  onReset,
}: {
  load: number
  maxTestedLoad: number
  stage: BridgeStage
  bridgeLimit: number
  warningStart: number
  displayMaxKg: number
  onChange: (load: number) => void
  onReset: () => void
}) {
  const { language, t } = useLanguage()
  const progress = (load / displayMaxKg) * 100
  const revealedProgress = (maxTestedLoad / displayMaxKg) * 100
  const warningPosition = (warningStart / displayMaxKg) * 100
  const limitPosition = (bridgeLimit / displayMaxKg) * 100
  const failed = stage === "failed"
  const warning = stage === "warning"
  const hasDiscoveredWarning = maxTestedLoad >= warningStart
  const hasDiscoveredFailure = maxTestedLoad >= bridgeLimit
  const trackBackground = `linear-gradient(to right, #2ecc71 0%, #2ecc71 ${warningPosition}%, #f97316 ${warningPosition}%, #f97316 ${limitPosition}%, #ef4444 ${limitPosition}%, #ef4444 100%)`
  const meterTooltip = formatMeterTooltip(language, load, warningStart, bridgeLimit, stage)

  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
            {t.home.bridgeSliderLabel}
          </p>
          <p className="mt-1 font-mono text-3xl font-extrabold leading-none text-avanza-dark">
            {load} kg
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <StepButton
            label="5 kg"
            ariaLabel={t.home.bridgeMinusFive}
            onClick={() => onChange(load - 5)}
            disabled={load <= 0}
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
          </StepButton>
          <StepButton
            label="1 kg"
            ariaLabel={t.home.bridgePlusOne}
            onClick={() => onChange(load + 1)}
            disabled={load >= displayMaxKg}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </StepButton>
          <StepButton
            label="5 kg"
            ariaLabel={t.home.bridgePlusFive}
            onClick={() => onChange(load + 5)}
            disabled={load >= displayMaxKg || failed}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </StepButton>
          <button
            type="button"
            onClick={onReset}
            className={cn(
              "inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 text-sm font-extrabold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-avanza-green",
              failed
                ? "border-red-600 bg-red-600 text-white hover:bg-red-700"
                : "border-avanza-dark/12 bg-white text-avanza-dark hover:bg-avanza-dark/6",
            )}
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {t.home.bridgeReset}
          </button>
        </div>
      </div>

      <div className="mt-8 pb-8">
        <div
          role="meter"
          aria-label={t.home.bridgeSliderAria}
          aria-valuemin={0}
          aria-valuemax={displayMaxKg}
          aria-valuenow={load}
          aria-valuetext={meterTooltip}
          aria-describedby="bridge-load-help"
          title={meterTooltip}
          className="relative h-5 rounded-full bg-white"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 overflow-hidden rounded-full border border-avanza-dark/10"
            style={{
              background:
                "repeating-linear-gradient(to right, rgba(26,26,46,0.1) 0 2px, rgba(26,26,46,0.03) 2px 16px)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 overflow-hidden rounded-full border border-avanza-dark/10 transition-[clip-path] duration-300"
            style={{
              background: trackBackground,
              clipPath: `inset(0 ${Math.max(0, 100 - revealedProgress)}% 0 0)`,
            }}
          />
          {hasDiscoveredFailure && (
            <>
              <div
                aria-hidden="true"
                className="absolute top-1/2 z-10 h-5 w-1 -translate-y-1/2 rounded-full bg-avanza-dark shadow-sm"
                style={{ left: `calc(${limitPosition}% - 2px)` }}
              />
              <span
                aria-hidden="true"
                className="absolute -top-6 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-avanza-dark px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white"
                style={{ left: `${limitPosition}%` }}
              >
                {bridgeLimit} KG {t.home.bridgeBreakMark}
              </span>
            </>
          )}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-avanza-dark bg-white shadow-[0_4px_12px_rgba(26,26,46,0.22)]"
            style={{ left: `${progress}%` }}
          />
        </div>
        <div className="relative mt-2 min-h-5 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
          <span className="absolute left-0">{t.home.bridgeRangeSafe}</span>
          {hasDiscoveredWarning && (
            <span className="absolute -translate-x-1/2 text-center" style={{ left: `${warningPosition}%` }}>
              Danger!
            </span>
          )}
          {hasDiscoveredFailure && (
            <span className="absolute -translate-x-1/2 text-center" style={{ left: `${limitPosition}%` }}>
              {t.home.bridgeRangeFailure}
            </span>
          )}
          <span className="absolute right-0">{displayMaxKg} kg</span>
        </div>
        <p
          id="bridge-load-help"
          className={cn(
            "mt-3 rounded-lg border p-3 text-sm font-bold leading-relaxed",
            failed
              ? "border-red-200 bg-red-50 text-red-700"
              : warning
                ? "border-avanza-orange/25 bg-avanza-orange/10 text-avanza-orange-dark"
                : "border-avanza-green/20 bg-avanza-green/10 text-avanza-green-dark",
          )}
        >
          {failed
            ? t.home.bridgeControlFailed
            : warning
              ? t.home.bridgeControlNearLimit
              : t.home.bridgeControlHint}
        </p>
      </div>
    </div>
  )
}

function StepButton({
  label,
  ariaLabel,
  onClick,
  disabled,
  children,
}: {
  label: string
  ariaLabel: string
  onClick: () => void
  disabled: boolean
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-avanza-dark/12 bg-white px-3 text-sm font-extrabold text-avanza-dark transition-colors hover:bg-avanza-green/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-avanza-green disabled:cursor-not-allowed disabled:opacity-45"
    >
      {children}
      {label}
    </button>
  )
}

function Stat({
  label,
  value,
  tone = "default",
}: {
  label: string
  value: string
  tone?: "default" | "danger"
}) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-white p-4 shadow-[0_18px_44px_-36px_rgba(26,26,46,0.35)]",
        tone === "danger" ? "border-red-200" : "border-avanza-dark/10",
      )}
    >
      <dt className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd
        className={cn(
          "mt-1 font-mono text-2xl font-extrabold",
          tone === "danger" ? "text-red-600" : "text-avanza-dark",
        )}
      >
        {value}
      </dd>
    </div>
  )
}

function BridgeSVG({
  stage,
  load,
  loadRatio,
  bridgeLimit,
  warningStart,
  weightBlockColors,
}: {
  stage: BridgeStage
  load: number
  loadRatio: number
  bridgeLimit: number
  warningStart: number
  weightBlockColors: string[]
}) {
  const W = 900
  const H = 430
  const deckY = 293
  const topY = 167
  const waterY = 332
  const left = 84
  const right = 816
  const bays = 6
  const bayWidth = (right - left) / bays
  const failed = stage === "failed"
  const sag = failed ? 34 : loadRatio * 24
  const centerIndex = bays / 2

  const sagAt = (i: number, amount = sag) => {
    const t = i / bays
    return amount * 4 * t * (1 - t)
  }

  const lowerPoints = Array.from({ length: bays + 1 }).map((_, i) => {
    const centerPull = failed ? Math.max(0, 1 - Math.abs(i - centerIndex) / 1.7) * 40 : 0
    return {
      x: left + i * bayWidth,
      y: deckY + sagAt(i) + centerPull,
    }
  })

  const topPoints = Array.from({ length: bays + 1 }).map((_, i) => {
    const centerPull = failed ? Math.max(0, 1 - Math.abs(i - centerIndex) / 1.7) * 28 : 0
    return {
      x: left + i * bayWidth,
      y: topY + sagAt(i, sag * 0.55) + centerPull,
    }
  })

  const centerPoint = lowerPoints[centerIndex]
  const stressOpacity = stage === "safe" ? 0 : stage === "warning" ? 0.58 : 0.9
  const warningProgress =
    stage === "warning"
      ? Math.max(0, Math.min((load - warningStart) / (bridgeLimit - warningStart), 1))
      : 0
  const shakeStyle: CSSProperties =
    stage === "warning"
      ? {
          animation: `bridge-load-shake ${0.52 - warningProgress * 0.18}s ease-in-out infinite`,
          "--bridge-shake-x": `${0.45 + warningProgress * 1.1}px`,
          "--bridge-shake-y": `${1.2 + warningProgress * 6.8}px`,
        } as CSSProperties
      : {}
  const waterPath = buildWavePath(W, waterY + 29, 32, 5)
  const waterPath2 = buildWavePath(W, waterY + 54, 36, 4)
  const blockCount = load === 0 ? 0 : Math.min(weightBlockColors.length, Math.ceil(load / KG_PER_WEIGHT_BLOCK))
  const weightDrop = failed ? 58 : 0

  function memberColor(index: number, kind: "outer" | "center" | "outer-diagonal" = "outer") {
    if (failed && Math.abs(index - centerIndex) <= 1.5) return "#dc2626"
    if (failed && kind === "outer-diagonal") return "#f97316"
    if (stage === "warning" && kind === "center") return "#f97316"
    if (stage === "warning" && kind === "outer-diagonal") return "#fbbf24"
    return "#1a1a2e"
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      role="img"
      aria-label={`Bridge load test. Current weight ${load} kilograms. Bridge limit ${bridgeLimit} kilograms. State ${stage}.`}
    >
      <defs>
        <linearGradient id="bridgeLabSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff8e8" />
          <stop offset="100%" stopColor="#ecfbf4" />
        </linearGradient>
        <linearGradient id="bridgeLabWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bdeefa" />
          <stop offset="100%" stopColor="#7ccbdc" />
        </linearGradient>
        <linearGradient id="bridgeLabSteel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2b3048" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>
        <pattern id="bridgeLabGrid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" fill="none" stroke="#1a1a2e" strokeOpacity="0.08" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width={W} height={H} fill="url(#bridgeLabSky)" />
      <rect width={W} height={waterY} fill="url(#bridgeLabGrid)" opacity="0.55" />
      <rect x="0" y={waterY} width={W} height={H - waterY} fill="url(#bridgeLabWater)" />
      <path d={waterPath} fill="none" stroke="#e8fbff" strokeOpacity="0.72" strokeWidth="4" strokeLinecap="round" />
      <path d={waterPath2} fill="none" stroke="#4caec1" strokeOpacity="0.34" strokeWidth="3" strokeLinecap="round" />

      <g aria-hidden="true">
        <rect x="0" y="306" width="150" height="26" fill="#d5d0bf" />
        <rect x="750" y="306" width="150" height="26" fill="#d5d0bf" />
        <rect x="0" y="326" width="134" height="104" fill="#bcb4a0" />
        <rect x="766" y="326" width="134" height="104" fill="#bcb4a0" />
        {[0, 1, 2, 3].map((row) => (
          <g key={`left-stones-${row}`} stroke="#938b79" strokeOpacity="0.55" strokeWidth="2">
            <line x1="0" y1={348 + row * 20} x2="134" y2={348 + row * 20} />
            <line x1={row % 2 ? 34 : 64} y1={328 + row * 20} x2={row % 2 ? 34 : 64} y2={348 + row * 20} />
          </g>
        ))}
        {[0, 1, 2, 3].map((row) => (
          <g key={`right-stones-${row}`} stroke="#938b79" strokeOpacity="0.55" strokeWidth="2">
            <line x1="766" y1={348 + row * 20} x2="900" y2={348 + row * 20} />
            <line x1={row % 2 ? 804 : 838} y1={328 + row * 20} x2={row % 2 ? 804 : 838} y2={348 + row * 20} />
          </g>
        ))}
      </g>

      <g className="motion-reduce:animate-none" style={shakeStyle}>
        <g className="transition-all duration-500 ease-out motion-reduce:transition-none">
          <g strokeLinecap="round" strokeLinejoin="round" fill="none">
            <polyline
              points={topPoints.map((p) => `${p.x},${p.y}`).join(" ")}
              stroke="#1a1a2e"
              strokeWidth="12"
              opacity={failed ? 0.82 : 1}
            />
            <polyline
              points={lowerPoints.map((p) => `${p.x},${p.y}`).join(" ")}
              stroke="#1a1a2e"
              strokeWidth="13"
              opacity={failed ? 0.82 : 1}
            />
            {topPoints.map((p, i) => (
              <line
                key={`vertical-${i}`}
                x1={p.x}
                y1={p.y}
                x2={lowerPoints[i].x}
                y2={lowerPoints[i].y}
                stroke={memberColor(i, Math.abs(i - centerIndex) <= 1 ? "center" : "outer")}
                strokeWidth="8"
              />
            ))}
            {Array.from({ length: bays }).map((_, i) => {
              const central = Math.abs(i + 0.5 - centerIndex) <= 1.5
              return (
                <line
                  key={`diag-a-${i}`}
                  x1={topPoints[i].x}
                  y1={topPoints[i].y}
                  x2={lowerPoints[i + 1].x}
                  y2={lowerPoints[i + 1].y}
                  stroke={memberColor(i + 0.5, central ? "center" : "outer-diagonal")}
                  strokeWidth="7"
                  opacity={failed && central ? 0.86 : 1}
                />
              )
            })}
            {Array.from({ length: bays }).map((_, i) => {
              const central = Math.abs(i + 0.5 - centerIndex) <= 1.5
              return (
                <line
                  key={`diag-b-${i}`}
                  x1={lowerPoints[i].x}
                  y1={lowerPoints[i].y}
                  x2={topPoints[i + 1].x}
                  y2={topPoints[i + 1].y}
                  stroke={memberColor(i + 0.5, central ? "center" : "outer-diagonal")}
                  strokeWidth="7"
                  opacity={failed && central ? 0.86 : 1}
                />
              )
            })}
          </g>

          <g opacity={stressOpacity} className="transition-opacity duration-300 motion-reduce:transition-none">
            {Array.from({ length: 3 }).map((_, i) => {
              const idx = i + 2
              return (
                <circle
                  key={`stress-${idx}`}
                  cx={lowerPoints[idx].x}
                  cy={lowerPoints[idx].y}
                  r={failed ? 12 : 8}
                  fill={failed ? "#ef4444" : "#f97316"}
                  opacity={0.32}
                />
              )
            })}
          </g>

          <g>
            <polygon
              points={[
                ...lowerPoints.map((p) => `${p.x},${p.y - 9}`),
                ...lowerPoints
                  .slice()
                  .reverse()
                  .map((p) => `${p.x},${p.y + 13}`),
              ].join(" ")}
              fill={failed ? "#fee2e2" : "#fff4d8"}
              stroke={failed ? "#dc2626" : "#1a1a2e"}
              strokeWidth="3"
              opacity={failed ? 0.9 : 1}
            />
            {Array.from({ length: 14 }).map((_, i) => {
              const x = left + 28 + i * 52
              const closest = Math.round((x - left) / bayWidth)
              const y = lowerPoints[Math.max(0, Math.min(bays, closest))].y
              return (
                <line
                  key={`deck-plank-${i}`}
                  x1={x}
                  y1={y - 8}
                  x2={x}
                  y2={y + 12}
                  stroke="#a66a26"
                  strokeOpacity="0.26"
                  strokeWidth="3"
                />
              )
            })}
          </g>

          {failed && (
            <g fill="none" stroke="#dc2626" strokeLinecap="round" strokeLinejoin="round">
              <path
                d={`M${centerPoint.x - 22} ${centerPoint.y - 34} L${centerPoint.x - 7} ${centerPoint.y - 14} L${centerPoint.x - 18} ${centerPoint.y + 2} L${centerPoint.x + 10} ${centerPoint.y + 24}`}
                strokeWidth="5"
              />
              <path
                d={`M${centerPoint.x + 24} ${centerPoint.y - 30} L${centerPoint.x + 8} ${centerPoint.y - 10} L${centerPoint.x + 20} ${centerPoint.y + 7}`}
                strokeWidth="4"
                opacity="0.75"
              />
            </g>
          )}
        </g>

        <g
          className="transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{
            transform: `translateY(${weightDrop}px) rotate(${failed ? 8 : 0}deg)`,
            transformOrigin: `${centerPoint.x}px ${centerPoint.y}px`,
          }}
        >
          {blockCount === 0 ? (
            <g opacity="0.52">
              <rect x={centerPoint.x - 45} y={centerPoint.y - 42} width="90" height="28" rx="4" fill="#ffffff" stroke="#1a1a2e" strokeWidth="2" strokeDasharray="6 6" />
              <text x={centerPoint.x} y={centerPoint.y - 23} textAnchor="middle" fontSize="11" fontWeight="800" fill="#1a1a2e">
                0 kg
              </text>
            </g>
          ) : (
            <g>
              {Array.from({ length: blockCount }).map((_, i) => {
                const boxW = 76
                const boxH = 25
                const x = centerPoint.x - boxW / 2 + (i % 2 === 0 ? -4 : 4)
                const y = centerPoint.y - 16 - (i + 1) * boxH
                return (
                  <g key={`weight-block-${i}`}>
                    <rect
                      x={x}
                      y={y}
                      width={boxW}
                      height={boxH}
                      rx="4"
                      fill={weightBlockColors[i]}
                      stroke="#1a1a2e"
                      strokeWidth="2"
                    />
                  </g>
                )
              })}
              <text
                x={centerPoint.x}
                y={centerPoint.y + 1 - blockCount * 25}
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="16"
                fontWeight="900"
                fill="#ffffff"
                stroke="#1a1a2e"
                strokeWidth="2.8"
                paintOrder="stroke"
              >
                {load} kg
              </text>
            </g>
          )}
        </g>
      </g>

    </svg>
  )
}

function buildWavePath(width: number, y: number, step: number, amp: number) {
  let path = `M-20 ${y}`
  for (let x = -20; x <= width + step; x += step) {
    path += ` q ${step / 2} ${-amp} ${step} 0`
  }
  return path
}

function formatMeterTooltip(language: string, load: number, warningStart: number, limit: number, stage: BridgeStage) {
  if (language === "es") {
    if (stage === "failed") {
      return `${load} kg. El puente fallo en ${limit} kg.`
    }
    if (stage === "warning") {
      return `${load} kg. La zona de advertencia empezo en ${warningStart} kg. Sigue con cuidado para encontrar el limite.`
    }
    return `${load} kg. Sigue agregando peso para mapear el puente.`
  }
  if (language === "zh") {
    if (stage === "failed") {
      return `${load} 千克。桥在 ${limit} 千克时失败。`
    }
    if (stage === "warning") {
      return `${load} 千克。警告区从 ${warningStart} 千克开始。继续小心测试来找到极限。`
    }
    return `${load} 千克。继续增加重量来测试这座桥。`
  }
  if (stage === "failed") {
    return `${load} kg. The bridge failed at ${limit} kg.`
  }
  if (stage === "warning") {
    return `${load} kg. Warning started at ${warningStart} kg. Keep testing carefully to find the limit.`
  }
  return `${load} kg. Keep adding weight to map the bridge.`
}

function formatResultSummary(language: string, load: number, limit: number, overLimit: number) {
  if (language === "es") {
    return `Probaste ${load} kg, pero el limite del puente era ${limit} kg. Eso fue ${overLimit} kg por encima del limite.`
  }
  if (language === "zh") {
    return `你测试了 ${load} 千克，但桥的极限是 ${limit} 千克。这超出了 ${overLimit} 千克。`
  }
  return `You're testing ${load} kg, but the bridge limit was ${limit} kg. You're ${overLimit} kg over what the bridge can hold.`
}
