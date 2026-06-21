"use client"

import { useMemo, useState, type ReactNode } from "react"
import { Minus, Plus, RotateCcw } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { cn } from "@/lib/utils"

const MAX_LOAD_KG = 50
const BRIDGE_LIMIT_KG = 38
const WARNING_START_KG = 27
const DANGER_START_KG = 34

type BridgeStage = "safe" | "warning" | "danger" | "failed"

export function BridgeLoadDemo() {
  const { language, t } = useLanguage()
  const [load, setLoad] = useState(0)
  const [bestSafeLoad, setBestSafeLoad] = useState(0)
  const [hasMappedLimit, setHasMappedLimit] = useState(false)

  const stage = useMemo<BridgeStage>(() => {
    if (load > BRIDGE_LIMIT_KG) return "failed"
    if (load >= DANGER_START_KG) return "danger"
    if (load >= WARNING_START_KG) return "warning"
    return "safe"
  }, [load])

  const failed = stage === "failed"
  const safetyLeft = Math.max(BRIDGE_LIMIT_KG - load, 0)
  const overLimit = Math.max(load - BRIDGE_LIMIT_KG, 0)
  const loadRatio = Math.min(load / BRIDGE_LIMIT_KG, 1.18)

  function updateLoad(nextLoad: number) {
    const clampedLoad = Math.max(0, Math.min(MAX_LOAD_KG, nextLoad))
    setLoad(clampedLoad)
    if (clampedLoad <= BRIDGE_LIMIT_KG) {
      setBestSafeLoad((best) => Math.max(best, clampedLoad))
    } else {
      setHasMappedLimit(true)
    }
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
    danger: {
      label: t.home.bridgeStatusDanger,
      tone: "border-red-500/35 bg-red-500/10 text-red-700",
      dot: "bg-red-500",
    },
    failed: {
      label: t.home.bridgeStatusBroken,
      tone: "border-red-600 bg-red-600 text-white",
      dot: "bg-white",
    },
  }[stage]
  const visibleStatusCopy =
    hasMappedLimit || failed
      ? statusCopy
      : {
          label: t.home.bridgeStatusTesting,
          tone: "border-white/20 bg-white/10 text-white",
          dot: "bg-white/70",
        }

  const failureMessage = formatFailureMessage(language, load, BRIDGE_LIMIT_KG)
  const resultSummary = formatResultSummary(language, load, BRIDGE_LIMIT_KG, overLimit)

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
            <p className="text-sm font-bold uppercase tracking-wider text-avanza-orange">
              {t.home.bridgeEyebrow}
            </p>
            <h2 className="mt-3 text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
              {t.home.bridgeTitle}
            </h2>
            <p className="mt-4 hidden max-w-3xl text-lg leading-relaxed text-muted-foreground md:block">
              {t.home.bridgeDesc}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:hidden">
              {t.home.bridgeDescShort}
            </p>
          </div>

          <div className="rounded-lg border border-avanza-dark/10 bg-white/82 p-4 shadow-[0_18px_44px_-32px_rgba(26,26,46,0.38)]">
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
                    hasMappedLimit={hasMappedLimit}
                  />
                </div>
              </div>

              <BridgeControls
                load={load}
                stage={stage}
                hasMappedLimit={hasMappedLimit}
                onChange={updateLoad}
                onReset={() => updateLoad(0)}
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
                    visibleStatusCopy.tone,
                  )}
                >
                  {visibleStatusCopy.label}
                </div>

                <h3 className="mt-4 text-2xl font-extrabold leading-tight md:text-3xl">
                  {explanation.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-white/82">
                  {explanation.body}
                </p>
                {failed && (
                  <p className="mt-4 rounded-lg border border-red-300/35 bg-red-500/16 p-3 text-sm font-bold leading-relaxed text-white">
                    {failureMessage}
                  </p>
                )}
              </aside>

              <dl className={cn("grid gap-3 lg:grid-cols-1", failed || !hasMappedLimit ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
                {failed ? (
                  <>
                    <Stat label={t.home.bridgeStatLoad} value={`${load} kg`} />
                    <Stat label={t.home.bridgeStatLimit} value={`${BRIDGE_LIMIT_KG} kg`} />
                    <Stat label={t.home.bridgeStatOverLimit} value={`${overLimit} kg`} tone="danger" />
                  </>
                ) : hasMappedLimit ? (
                  <>
                    <Stat label={t.home.bridgeStatLoad} value={`${load} kg`} />
                    <Stat label={t.home.bridgeStatLimit} value={`${BRIDGE_LIMIT_KG} kg`} />
                    <Stat label={t.home.bridgeStatHeadroom} value={`${safetyLeft} kg`} />
                  </>
                ) : (
                  <>
                    <Stat label={t.home.bridgeStatLoad} value={`${load} kg`} />
                    <Stat label={t.home.bridgeBestSafeLoad} value={`${bestSafeLoad} kg`} />
                    <Stat label={t.home.bridgeStatLimit} value={t.home.bridgeLimitUnknown} />
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
  stage,
  hasMappedLimit,
  onChange,
  onReset,
}: {
  load: number
  stage: BridgeStage
  hasMappedLimit: boolean
  onChange: (load: number) => void
  onReset: () => void
}) {
  const { t } = useLanguage()
  const progress = (load / MAX_LOAD_KG) * 100
  const limitPosition = (BRIDGE_LIMIT_KG / MAX_LOAD_KG) * 100
  const failed = stage === "failed"
  const nearLimit = hasMappedLimit && stage === "danger"

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
            disabled={load >= MAX_LOAD_KG}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </StepButton>
          <StepButton
            label="5 kg"
            ariaLabel={t.home.bridgePlusFive}
            onClick={() => onChange(load + 5)}
            disabled={load >= MAX_LOAD_KG || stage === "danger" || failed}
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
          aria-valuemax={MAX_LOAD_KG}
          aria-valuenow={load}
          aria-valuetext={`${load} kg`}
          aria-describedby="bridge-load-help"
          className="relative h-5 rounded-full bg-white"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 overflow-hidden rounded-full border border-avanza-dark/10"
            style={{
              background: hasMappedLimit
                ? "linear-gradient(to right, #2ecc71 0%, #2ecc71 54%, #f97316 54%, #f97316 76%, #ef4444 76%, #ef4444 100%)"
                : "repeating-linear-gradient(to right, rgba(26,26,46,0.1) 0 2px, rgba(26,26,46,0.03) 2px 16px)",
            }}
          />
          {hasMappedLimit && (
            <>
              <div
                aria-hidden="true"
                className="absolute top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-avanza-dark shadow-sm"
                style={{ left: `calc(${limitPosition}% - 2px)` }}
              />
              <span
                aria-hidden="true"
                className="absolute -top-6 -translate-x-1/2 whitespace-nowrap rounded-md bg-avanza-dark px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white"
                style={{ left: `${limitPosition}%` }}
              >
                {BRIDGE_LIMIT_KG} kg {t.home.bridgeBreakMark}
              </span>
            </>
          )}
          <div
            aria-hidden="true"
            className={cn(
              "absolute top-1/2 h-3 -translate-y-1/2 rounded-l-full",
              hasMappedLimit ? "bg-white/42" : "bg-avanza-green/80",
            )}
            style={{ width: `${progress}%` }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-avanza-dark bg-white shadow-[0_4px_12px_rgba(26,26,46,0.22)]"
            style={{ left: `${progress}%` }}
          />
        </div>
        {hasMappedLimit ? (
          <div className="mt-2 grid grid-cols-3 relative text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
            <span className="col-start-1">{t.home.bridgeRangeSafe}</span>
            <span className="absolute left-[54%] -translate-x-1/2 text-center">
              {t.home.bridgeRangeWarning}
            </span>
            <span className="col-start-3 text-right">{t.home.bridgeRangeFailure}</span>
          </div>
        ) : (
          <div className="mt-2 flex justify-between text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
            <span>0 kg</span>
            <span>{t.home.bridgeRangeUnmapped}</span>
            <span>{MAX_LOAD_KG} kg</span>
          </div>
        )}
        <p
          id="bridge-load-help"
          className={cn(
            "mt-3 rounded-lg border p-3 text-sm font-bold leading-relaxed",
            failed
              ? "border-red-200 bg-red-50 text-red-700"
              : nearLimit
                ? "border-avanza-orange/25 bg-avanza-orange/10 text-avanza-orange-dark"
                : "border-avanza-green/20 bg-avanza-green/10 text-avanza-green-dark",
          )}
        >
          {failed
            ? t.home.bridgeControlFailed
            : nearLimit
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
  hasMappedLimit,
}: {
  stage: BridgeStage
  load: number
  loadRatio: number
  hasMappedLimit: boolean
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
    const centerPull = failed ? Math.max(0, 1 - Math.abs(i - centerIndex) / 1.7) * 38 : 0
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
  const shakeClass = stage === "danger" ? "animate-[bridge-load-shake_0.48s_ease-in-out_infinite] motion-reduce:animate-none" : ""
  const waterPath = buildWavePath(W, waterY + 29, 32, 5)
  const waterPath2 = buildWavePath(W, waterY + 54, 38, 4)
  const blockCount = load === 0 ? 0 : Math.min(5, Math.ceil(load / 10))
  const weightDrop = failed ? 58 : 0

  function memberColor(index: number, kind: "outer" | "center" = "outer") {
    if (failed && Math.abs(index - centerIndex) <= 1.5) return "#dc2626"
    if (stage === "danger" && Math.abs(index - centerIndex) <= 1.5) return "#ef4444"
    if (stage === "warning" && kind === "center") return "#f97316"
    return "#1a1a2e"
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      role="img"
      aria-label={
        hasMappedLimit
          ? `Bridge load test. Current weight ${load} kilograms. Bridge limit ${BRIDGE_LIMIT_KG} kilograms. State ${stage}.`
          : `Bridge load test. Current weight ${load} kilograms. State ${stage}.`
      }
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

      <g className={shakeClass}>
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
                  stroke={memberColor(i + 0.5, central ? "center" : "outer")}
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
                  stroke={memberColor(i + 0.5, central ? "center" : "outer")}
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
                  r={stage === "danger" || failed ? 12 : 8}
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
                      fill={failed ? "#ef4444" : i % 2 === 0 ? "#f97316" : "#fbbf24"}
                      stroke="#1a1a2e"
                      strokeWidth="2"
                    />
                    <path d={`M${x + 11} ${y + 4} L${x + boxW - 11} ${y + boxH - 4} M${x + boxW - 11} ${y + 4} L${x + 11} ${y + boxH - 4}`} stroke="#1a1a2e" strokeOpacity="0.18" strokeWidth="2" />
                  </g>
                )
              })}
              <rect
                x={centerPoint.x - 31}
                y={centerPoint.y - 12 - blockCount * 25}
                width="62"
                height="18"
                rx="4"
                fill="#1a1a2e"
              />
              <text
                x={centerPoint.x}
                y={centerPoint.y + 1 - blockCount * 25}
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="12"
                fontWeight="900"
                fill="#ffffff"
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

function formatFailureMessage(language: string, load: number, limit: number) {
  if (language === "es") {
    return `El puente fallo con ${load} kg. Su limite seguro era ${limit} kg. Intenta de nuevo y mira que tan cerca puedes llegar sin romperlo.`
  }
  if (language === "zh") {
    return `桥在 ${load} 千克时失败。安全极限是 ${limit} 千克。再试一次，看看不压断时你能多接近极限。`
  }
  return `The bridge failed at ${load} kg. Its safe limit was ${limit} kg. Try again and see how close you can get without breaking it.`
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
