"use client"

import { useMemo, useState } from "react"
import { Hammer, RotateCcw } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { cn } from "@/lib/utils"

const MAX_LOAD_KG = 50
const BREAK_THRESHOLD = 38

export function BridgeLoadDemo() {
  const { t } = useLanguage()
  const [load, setLoad] = useState(8)

  const broken = load >= BREAK_THRESHOLD
  // Scale deformation up to break threshold; freeze visually after break.
  const ratio = Math.min(load / BREAK_THRESHOLD, 1)
  // Deck sags by up to 18px before break.
  const sag = ratio * 18
  // Truss members compress: angle change up to 4 degrees.
  const memberStress = ratio

  const status = useMemo<"safe" | "stress" | "broken">(() => {
    if (broken) return "broken"
    if (load > BREAK_THRESHOLD * 0.7) return "stress"
    return "safe"
  }, [load, broken])

  const statusCopy = {
    safe: { label: t.home.bridgeStatusSafe, tone: "bg-avanza-green text-white" },
    stress: { label: t.home.bridgeStatusStress, tone: "bg-avanza-orange text-white" },
    broken: { label: t.home.bridgeStatusBroken, tone: "bg-red-500 text-white" },
  }[status]

  const trussColor = broken
    ? "stroke-red-500"
    : memberStress > 0.75
      ? "stroke-avanza-orange"
      : "stroke-avanza-dark"

  return (
    <section className="relative overflow-hidden bg-[#f1fff7] py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(26,26,46,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,46,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-avanza-dark">
            <Hammer className="h-3.5 w-3.5 text-avanza-orange" />
            {t.home.bridgeEyebrow}
          </span>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            {t.home.bridgeTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.home.bridgeDesc}
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="relative mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* Bridge SVG card */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(-0.6deg)]"
              />
              <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_28px_64px_-30px_rgba(26,26,46,0.35)] ring-1 ring-avanza-dark/10 md:p-8">
                <div className="aspect-[16/9] w-full">
                  <BridgeSVG
                    sag={sag}
                    memberStress={memberStress}
                    broken={broken}
                    load={load}
                    trussColor={trussColor}
                    weightLabel={t.home.bridgeWeightLabel}
                  />
                </div>

                {/* Slider */}
                <div className="mt-6">
                  <label
                    htmlFor="bridge-load"
                    className="flex items-center justify-between text-sm font-extrabold text-avanza-dark"
                  >
                    <span>{t.home.bridgeSliderLabel}</span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-xs font-extrabold tracking-wide",
                        broken
                          ? "bg-red-500/15 text-red-600"
                          : load > BREAK_THRESHOLD * 0.7
                            ? "bg-avanza-orange/15 text-avanza-orange"
                            : "bg-avanza-green/15 text-avanza-green",
                      )}
                    >
                      {load} kg
                    </span>
                  </label>
                  <input
                    id="bridge-load"
                    type="range"
                    min={0}
                    max={MAX_LOAD_KG}
                    step={1}
                    value={load}
                    onChange={(e) => setLoad(Number(e.target.value))}
                    aria-valuetext={`${load} kg`}
                    className="mt-3 w-full accent-avanza-orange"
                  />
                  <div className="mt-1.5 flex justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    <span>0</span>
                    <span>{BREAK_THRESHOLD} kg · {t.home.bridgeBreakMark}</span>
                    <span>{MAX_LOAD_KG}</span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider shadow-sm",
                      statusCopy.tone,
                    )}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    {statusCopy.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => setLoad(0)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-avanza-dark/8 px-3 py-1 text-xs font-bold text-avanza-dark transition-colors hover:bg-avanza-dark/15"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    {t.home.bridgeReset}
                  </button>
                </div>
              </div>
            </div>

            {/* Explanation card */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(0.7deg)]"
              />
              <div className="relative flex h-full flex-col gap-4 rounded-3xl bg-avanza-dark p-7 text-primary-foreground shadow-[0_28px_64px_-30px_rgba(26,26,46,0.4)]">
                <h3 className="text-2xl font-extrabold leading-tight md:text-3xl">
                  {broken
                    ? t.home.bridgeFactBrokenTitle
                    : load > BREAK_THRESHOLD * 0.7
                      ? t.home.bridgeFactStressTitle
                      : t.home.bridgeFactSafeTitle}
                </h3>
                <p className="text-base leading-relaxed text-white/80">
                  {broken
                    ? t.home.bridgeFactBroken
                    : load > BREAK_THRESHOLD * 0.7
                      ? t.home.bridgeFactStress
                      : t.home.bridgeFactSafe}
                </p>
                <dl className="mt-auto grid grid-cols-3 gap-3">
                  <Stat label={t.home.bridgeStatLoad} value={`${load} kg`} />
                  <Stat label={t.home.bridgeStatLimit} value={`${BREAK_THRESHOLD} kg`} />
                  <Stat
                    label={t.home.bridgeStatHeadroom}
                    value={
                      broken
                        ? "0%"
                        : `${Math.max(0, Math.round(((BREAK_THRESHOLD - load) / BREAK_THRESHOLD) * 100))}%`
                    }
                  />
                </dl>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/8 p-3 ring-1 ring-white/10">
      <dt className="text-[10px] font-extrabold uppercase tracking-wider text-white/60">
        {label}
      </dt>
      <dd className="mt-0.5 font-mono text-base font-extrabold text-white">
        {value}
      </dd>
    </div>
  )
}

function BridgeSVG({
  sag,
  memberStress,
  broken,
  load,
  trussColor,
  weightLabel,
}: {
  sag: number
  memberStress: number
  broken: boolean
  load: number
  trussColor: string
  weightLabel: string
}) {
  // Base coordinates
  const W = 800
  const H = 360
  const deckY = 220
  const topY = 120
  // Bridge spans from x=80 to x=720
  const left = 80
  const right = 720
  const bays = 4
  const bayWidth = (right - left) / bays

  // Sag affects deck mid points — deepest at center, less at supports.
  const sagAt = (i: number) => {
    const t = i / bays
    // parabola, max at t=0.5
    return sag * 4 * t * (1 - t)
  }

  const deckPoints = Array.from({ length: bays + 1 }).map((_, i) => ({
    x: left + i * bayWidth,
    y: deckY + (broken ? 0 : sagAt(i)),
  }))
  const topPoints = Array.from({ length: bays + 1 }).map((_, i) => ({
    x: left + i * bayWidth,
    y: topY + (broken ? 0 : sagAt(i) * 0.5),
  }))

  // Box weight position
  const weightW = 60
  const weightH = 38
  const centerIdx = Math.floor(bays / 2)
  const wx = deckPoints[centerIdx].x - weightW / 2
  const wyTop = deckPoints[centerIdx].y - weightH

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      role="img"
      aria-label="Truss bridge load demo"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff8e8" />
          <stop offset="100%" stopColor="#f1fff7" />
        </linearGradient>
        <pattern id="grass" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="#dff5dc" />
          <path d="M0 14 L14 14 M3 12 L3 14 M7 11 L7 14 M11 12 L11 14" stroke="#a4d199" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Sky */}
      <rect x="0" y="0" width={W} height={H - 50} fill="url(#sky)" />
      {/* Ground */}
      <rect x="0" y={H - 50} width={W} height={50} fill="url(#grass)" />

      {/* River */}
      <rect x={left + 40} y={H - 50} width={right - left - 80} height={50} fill="#bde6ef" />
      <path
        d={`M${left + 50} ${H - 38} q 12 -4 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0`}
        fill="none"
        stroke="#88ccd6"
        strokeWidth="2"
      />

      {/* Abutments */}
      <rect x={left - 30} y={deckY} width={30} height={H - deckY - 50} fill="#1a1a2e" />
      <rect x={right} y={deckY} width={30} height={H - deckY - 50} fill="#1a1a2e" />

      {/* Truss */}
      <g
        className={cn("transition-[stroke,opacity] duration-300", trussColor)}
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={broken ? 0.55 : 1}
      >
        {/* Top chord */}
        <polyline points={topPoints.map((p) => `${p.x},${p.y}`).join(" ")} />
        {/* Bottom chord (deck top edge) */}
        <polyline points={deckPoints.map((p) => `${p.x},${p.y}`).join(" ")} />
        {/* Verticals */}
        {topPoints.map((p, i) => (
          <line key={`v${i}`} x1={p.x} y1={p.y} x2={deckPoints[i].x} y2={deckPoints[i].y} />
        ))}
        {/* Diagonals — alternate direction for X pattern feel */}
        {Array.from({ length: bays }).map((_, i) => {
          const a = topPoints[i]
          const b = deckPoints[i + 1]
          return <line key={`d${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
        })}
        {Array.from({ length: bays }).map((_, i) => {
          const a = deckPoints[i]
          const b = topPoints[i + 1]
          return <line key={`d2${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
        })}
      </g>

      {/* Deck plate */}
      <g>
        <polygon
          points={[
            ...deckPoints.map((p) => `${p.x},${p.y}`),
            ...deckPoints
              .slice()
              .reverse()
              .map((p) => `${p.x},${p.y + 14}`),
          ].join(" ")}
          fill={broken ? "#fde2e2" : "#fff8e8"}
          stroke={broken ? "#ef4444" : "#1a1a2e"}
          strokeWidth={2}
          opacity={broken ? 0.7 : 1}
        />
      </g>

      {/* Crack on break */}
      {broken && (
        <g stroke="#ef4444" strokeWidth={3} fill="none" strokeLinecap="round">
          <path
            d={`M${deckPoints[centerIdx].x - 12} ${deckPoints[centerIdx].y - 6}
                L${deckPoints[centerIdx].x - 4} ${deckPoints[centerIdx].y + 4}
                L${deckPoints[centerIdx].x + 6} ${deckPoints[centerIdx].y - 4}
                L${deckPoints[centerIdx].x + 14} ${deckPoints[centerIdx].y + 8}`}
          />
        </g>
      )}

      {/* Weight box */}
      <g
        className="transition-transform duration-300 motion-reduce:transition-none"
        style={{
          transform: `translateY(${broken ? 36 : 0}px) rotate(${broken ? 6 : 0}deg)`,
          transformOrigin: `${wx + weightW / 2}px ${wyTop + weightH / 2}px`,
        }}
      >
        <rect
          x={wx}
          y={wyTop}
          width={weightW}
          height={weightH}
          rx={6}
          fill={broken ? "#ef4444" : "#1a1a2e"}
        />
        <text
          x={wx + weightW / 2}
          y={wyTop + weightH / 2 + 5}
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="14"
          fontWeight="800"
          fill="#fff"
        >
          {load}kg
        </text>
        <text
          x={wx + weightW / 2}
          y={wyTop - 8}
          textAnchor="middle"
          fontFamily="sans-serif"
          fontSize="10"
          fontWeight="700"
          fill="#1a1a2e"
          opacity={0.6}
        >
          {weightLabel}
        </text>
      </g>
    </svg>
  )
}
