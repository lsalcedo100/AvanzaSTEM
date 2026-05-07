"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Crosshair, Play, RotateCcw, Sparkles, Target } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { cn } from "@/lib/utils"

const G = 9.81
const SCALE = 6 // px per meter
const ORIGIN_X = 80
const ORIGIN_Y = 320
const SVG_W = 800
const SVG_H = 360

type Target = { x: number; y: number; r: number; hit: boolean; id: number }

const INITIAL_TARGETS: Omit<Target, "id" | "hit">[] = [
  { x: 70, y: 0, r: 12 },
  { x: 95, y: 22, r: 10 },
  { x: 50, y: 30, r: 14 },
]

export function CatapultLab() {
  const { t } = useLanguage()
  const [angle, setAngle] = useState(45) // degrees
  const [power, setPower] = useState(40) // m/s
  const [mass, setMass] = useState(2) // kg (for educational display)
  const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([])
  const [running, setRunning] = useState(false)
  const [score, setScore] = useState(0)
  const [shots, setShots] = useState(0)
  const [targets, setTargets] = useState<Target[]>(() =>
    INITIAL_TARGETS.map((t, i) => ({ ...t, id: i, hit: false })),
  )
  const animRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const trailRef = useRef<Array<{ x: number; y: number }>>([])
  const lastResultRef = useRef<"miss" | "hit" | null>(null)

  // Predicted apex/range for label (assumes flat ground)
  const predicted = useMemo(() => {
    const rad = (angle * Math.PI) / 180
    const vx = power * Math.cos(rad)
    const vy = power * Math.sin(rad)
    const range = (power * power * Math.sin(2 * rad)) / G
    const apex = (vy * vy) / (2 * G)
    const flightTime = (2 * vy) / G
    return { vx, vy, range, apex, flightTime }
  }, [angle, power])

  // Predicted trajectory line
  const predictedPath = useMemo(() => {
    const points: Array<{ x: number; y: number }> = []
    const steps = 50
    const tMax = predicted.flightTime
    if (!isFinite(tMax) || tMax <= 0) return points
    for (let i = 0; i <= steps; i++) {
      const time = (i / steps) * tMax
      const xm = predicted.vx * time
      const ym = predicted.vy * time - 0.5 * G * time * time
      points.push({ x: xm, y: ym })
    }
    return points
  }, [predicted])

  function launch() {
    if (running) return
    cancelAnimationFrame(animRef.current ?? 0)
    setTrail([])
    trailRef.current = []
    setRunning(true)
    setShots((s) => s + 1)
    lastResultRef.current = null
    startTimeRef.current = performance.now()

    const rad = (angle * Math.PI) / 180
    const vx = power * Math.cos(rad)
    const vy = power * Math.sin(rad)

    const anyHitOnce = new Set<number>()

    const tick = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000
      const x = vx * elapsed
      const y = vy * elapsed - 0.5 * G * elapsed * elapsed

      const point = { x, y }
      trailRef.current = [...trailRef.current, point].slice(-260)
      setTrail(trailRef.current)

      // Hit detection
      let hitThisFrame: number | null = null
      setTargets((prev) =>
        prev.map((t) => {
          if (t.hit || anyHitOnce.has(t.id)) return t
          const dx = x - t.x
          const dy = y - t.y
          if (Math.hypot(dx, dy) <= t.r) {
            anyHitOnce.add(t.id)
            hitThisFrame = t.id
            return { ...t, hit: true }
          }
          return t
        }),
      )
      if (hitThisFrame !== null) {
        lastResultRef.current = "hit"
        setScore((s) => s + 1)
      }

      if (y < 0 && elapsed > 0.05) {
        // landed
        setRunning(false)
        if (lastResultRef.current === null) lastResultRef.current = "miss"
        return
      }
      if (x > 900 / SCALE) {
        setRunning(false)
        return
      }
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
  }

  function reset() {
    cancelAnimationFrame(animRef.current ?? 0)
    setRunning(false)
    setTrail([])
    trailRef.current = []
    setScore(0)
    setShots(0)
    setTargets(INITIAL_TARGETS.map((t, i) => ({ ...t, id: i, hit: false })))
    lastResultRef.current = null
  }

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  const allHit = targets.every((t) => t.hit)

  // Convert meters to SVG coords
  const toSvgX = (xm: number) => ORIGIN_X + xm * SCALE
  const toSvgY = (ym: number) => ORIGIN_Y - ym * SCALE

  // Catapult arm angle
  const armRad = (angle * Math.PI) / 180

  return (
    <section className="relative overflow-hidden bg-[#f5fbf3] py-20 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 14% 14%, rgba(46,204,113,0.12) 0 5px, transparent 6px), radial-gradient(circle at 86% 22%, rgba(249,115,22,0.12) 0 4px, transparent 5px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-avanza-dark">
            <Crosshair className="h-3.5 w-3.5 text-avanza-orange" />
            {t.gamesPage.catapultEyebrow}
          </span>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            {t.gamesPage.catapultTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.gamesPage.catapultDesc}
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* Scene */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(-0.6deg)]"
              />
              <div className="relative overflow-hidden rounded-3xl bg-white p-5 shadow-[0_28px_64px_-30px_rgba(26,26,46,0.35)] ring-1 ring-avanza-dark/10 md:p-7">
                <div className="aspect-[16/8] w-full overflow-hidden rounded-2xl">
                  <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="h-full w-full">
                    <defs>
                      <linearGradient id="catSky" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#dceffd" />
                        <stop offset="100%" stopColor="#f5fbf3" />
                      </linearGradient>
                      <pattern id="catGrass" width="14" height="14" patternUnits="userSpaceOnUse">
                        <rect width="14" height="14" fill="#cce8c2" />
                        <path d="M0 14 L14 14 M3 12 L3 14 M7 11 L7 14 M11 12 L11 14" stroke="#8cbe7c" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width={SVG_W} height={ORIGIN_Y} fill="url(#catSky)" />
                    <rect y={ORIGIN_Y} width={SVG_W} height={SVG_H - ORIGIN_Y} fill="url(#catGrass)" />

                    {/* Predicted trajectory ghost */}
                    {!running && predictedPath.length > 0 && (
                      <polyline
                        points={predictedPath
                          .filter((p) => p.y >= 0)
                          .map((p) => `${toSvgX(p.x)},${toSvgY(p.y)}`)
                          .join(" ")}
                        fill="none"
                        stroke="#1a1a2e"
                        strokeOpacity="0.18"
                        strokeWidth="2"
                        strokeDasharray="3 5"
                      />
                    )}

                    {/* Trail */}
                    {trail.length > 1 && (
                      <polyline
                        points={trail.map((p) => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(" ")}
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    )}

                    {/* Targets */}
                    {targets.map((tgt) => (
                      <g key={tgt.id} opacity={tgt.hit ? 0.4 : 1}>
                        <circle
                          cx={toSvgX(tgt.x)}
                          cy={toSvgY(tgt.y)}
                          r={tgt.r * 1.2}
                          fill="#ef4444"
                        />
                        <circle
                          cx={toSvgX(tgt.x)}
                          cy={toSvgY(tgt.y)}
                          r={tgt.r * 0.8}
                          fill="#ffffff"
                        />
                        <circle
                          cx={toSvgX(tgt.x)}
                          cy={toSvgY(tgt.y)}
                          r={tgt.r * 0.4}
                          fill="#ef4444"
                        />
                        {tgt.hit && (
                          <text
                            x={toSvgX(tgt.x)}
                            y={toSvgY(tgt.y) + 4}
                            textAnchor="middle"
                            fontFamily="monospace"
                            fontSize="14"
                            fontWeight="800"
                            fill="#1a1a2e"
                          >
                            ✓
                          </text>
                        )}
                      </g>
                    ))}

                    {/* Catapult */}
                    <g transform={`translate(${ORIGIN_X}, ${ORIGIN_Y})`}>
                      {/* Base */}
                      <rect x={-22} y={-4} width={44} height={14} fill="#92400e" />
                      <rect x={-26} y={6} width={52} height={6} fill="#78350f" />
                      {/* Pivot */}
                      <circle cx={0} cy={-2} r={5} fill="#1a1a2e" />
                      {/* Arm */}
                      <g transform={`rotate(${-angle})`}>
                        <rect x={-4} y={-50} width={8} height={50} fill="#1a1a2e" rx={2} />
                        {!running && (
                          <circle cx={0} cy={-50} r={7} fill="#f97316" stroke="#1a1a2e" strokeWidth="1.6" />
                        )}
                      </g>
                      {/* Angle arc indicator */}
                      <path
                        d={`M 30 0 A 30 30 0 0 0 ${30 * Math.cos(armRad)} ${-30 * Math.sin(armRad)}`}
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="2"
                        strokeOpacity="0.4"
                      />
                      <text
                        x={Math.max(34, 36 * Math.cos(armRad / 2))}
                        y={Math.min(-2, -36 * Math.sin(armRad / 2))}
                        fontFamily="monospace"
                        fontSize="11"
                        fontWeight="800"
                        fill="#f97316"
                      >
                        {angle}°
                      </text>
                    </g>

                    {/* Projectile */}
                    {running && trail.length > 0 && (
                      <circle
                        cx={toSvgX(trail[trail.length - 1].x)}
                        cy={toSvgY(trail[trail.length - 1].y)}
                        r={6}
                        fill="#f97316"
                        stroke="#1a1a2e"
                        strokeWidth="1.5"
                      />
                    )}
                  </svg>
                </div>

                {/* Sliders */}
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <ControlSlider
                    label={t.gamesPage.catapultAngle}
                    value={angle}
                    min={5}
                    max={85}
                    unit="°"
                    onChange={setAngle}
                    disabled={running}
                  />
                  <ControlSlider
                    label={t.gamesPage.catapultPower}
                    value={power}
                    min={10}
                    max={70}
                    unit=" m/s"
                    onChange={setPower}
                    disabled={running}
                  />
                  <ControlSlider
                    label={t.gamesPage.catapultMass}
                    value={mass}
                    min={1}
                    max={10}
                    unit=" kg"
                    onChange={setMass}
                    disabled={running}
                  />
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={launch}
                    disabled={running}
                    className="inline-flex items-center gap-2 rounded-full bg-avanza-orange px-5 py-2.5 text-sm font-extrabold text-white shadow-md transition disabled:cursor-not-allowed disabled:opacity-50 hover:enabled:scale-[1.04]"
                  >
                    <Play className="h-4 w-4" />
                    {t.gamesPage.catapultFire}
                  </button>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-avanza-green/15 px-3 py-1 font-mono text-xs font-extrabold text-avanza-green">
                      {t.gamesPage.catapultHits}: {score}/{targets.length}
                    </span>
                    <span className="rounded-full bg-avanza-dark/8 px-3 py-1 font-mono text-xs font-bold text-avanza-dark">
                      {t.gamesPage.catapultShots}: {shots}
                    </span>
                    <button
                      type="button"
                      onClick={reset}
                      className="inline-flex items-center gap-1.5 rounded-full bg-avanza-dark/8 px-3 py-1.5 text-xs font-bold text-avanza-dark transition hover:bg-avanza-dark/15"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      {t.gamesPage.catapultReset}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats / fact card */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(0.7deg)]"
              />
              <div className="relative flex h-full flex-col gap-4 rounded-3xl bg-avanza-dark p-7 text-primary-foreground shadow-[0_28px_64px_-30px_rgba(26,26,46,0.4)]">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white/85">
                  <Sparkles className="h-3.5 w-3.5 text-avanza-green" />
                  {t.gamesPage.catapultFactEyebrow}
                </div>
                <h3 className="text-2xl font-extrabold leading-tight md:text-3xl">
                  {t.gamesPage.catapultFactTitle}
                </h3>
                <p className="text-base leading-relaxed text-white/80">
                  {t.gamesPage.catapultFactBody}
                </p>
                <dl className="mt-2 grid grid-cols-2 gap-3">
                  <Stat label={t.gamesPage.catapultRange} value={`${predicted.range.toFixed(1)} m`} />
                  <Stat label={t.gamesPage.catapultApex} value={`${predicted.apex.toFixed(1)} m`} />
                  <Stat label={t.gamesPage.catapultFlightTime} value={`${predicted.flightTime.toFixed(2)} s`} />
                  <Stat label={t.gamesPage.catapultEnergy} value={`${(0.5 * mass * power * power).toFixed(0)} J`} />
                </dl>
                {allHit && shots > 0 && (
                  <div className="mt-2 inline-flex items-center gap-2 self-start rounded-full bg-avanza-green px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">
                    <Target className="h-3.5 w-3.5" />
                    {t.gamesPage.catapultAllHit}
                  </div>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function ControlSlider({
  label,
  value,
  min,
  max,
  unit,
  onChange,
  disabled,
}: {
  label: string
  value: number
  min: number
  max: number
  unit: string
  onChange: (n: number) => void
  disabled?: boolean
}) {
  return (
    <div>
      <label className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-avanza-dark">
        <span>{label}</span>
        <span className="rounded-full bg-avanza-orange/15 px-2 py-0.5 font-mono text-[11px] text-avanza-orange">
          {value}
          {unit}
        </span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn("mt-1.5 w-full accent-avanza-orange", disabled && "opacity-60")}
      />
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/8 p-3 ring-1 ring-white/10">
      <dt className="text-[10px] font-extrabold uppercase tracking-wider text-white/60">{label}</dt>
      <dd className="mt-0.5 font-mono text-base font-extrabold text-white">{value}</dd>
    </div>
  )
}
