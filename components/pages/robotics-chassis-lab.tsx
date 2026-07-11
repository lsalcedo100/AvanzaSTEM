"use client"

import { useEffect, useState } from "react"
import {
  DEFAULT_CHASSIS,
  evaluateChassis,
  type ChassisConfig,
  type Rating,
  type Surface,
} from "@/components/ui/chassis-model"
import { useRoboticsProgress } from "@/components/ui/useRoboticsProgress"

/** Word labels for each 1..3 slider, so students read a level - never color alone. */
const LEVEL_WORDS: Record<keyof Omit<ChassisConfig, "surface">, [string, string, string]> = {
  wheelSize: ["small", "medium", "large"],
  wheelSpacing: ["narrow", "medium", "wide"],
  bodyWidth: ["narrow", "medium", "wide"],
  bodyHeight: ["low", "medium", "tall"],
  weightPlacement: ["low", "middle", "high"],
  motorPower: ["low", "medium", "high"],
}

const SLIDERS: { key: keyof Omit<ChassisConfig, "surface">; label: string }[] = [
  { key: "wheelSize", label: "Wheel size" },
  { key: "wheelSpacing", label: "Wheel spacing" },
  { key: "bodyWidth", label: "Body width" },
  { key: "bodyHeight", label: "Body height" },
  { key: "weightPlacement", label: "Weight placement" },
  { key: "motorPower", label: "Motor power" },
]

const SURFACES: { id: Surface; label: string }[] = [
  { id: "smooth", label: "Smooth floor" },
  { id: "carpet", label: "Carpet" },
  { id: "slippery", label: "Slippery" },
]

const RATING_WORD: Record<Rating, string> = { good: "Good", okay: "Okay", poor: "Poor" }

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"

/** A labelled 1..3 slider with its chosen level shown as words. */
function LevelSlider({
  id,
  label,
  value,
  words,
  disabled,
  onChange,
}: {
  id: string
  label: string
  value: number
  words: [string, string, string]
  disabled: boolean
  onChange: (n: number) => void
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-sm font-semibold text-foreground">
          {label}
        </label>
        <span className="text-sm text-muted-foreground">
          {label}: <span className="font-semibold text-foreground">{words[value - 1]}</span>
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={1}
        max={3}
        step={1}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className={
          "mt-2 w-full accent-avanza-green disabled:cursor-not-allowed disabled:opacity-50 " + focusRing
        }
      />
      <div className="mt-1 flex justify-between text-xs text-muted-foreground" aria-hidden>
        <span>{words[0]}</span>
        <span>{words[2]}</span>
      </div>
    </div>
  )
}

/** A simple text-labelled bar for a 0-100 score. */
function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-semibold text-foreground">{label}</span>
        <span className="text-muted-foreground">{value} / 100</span>
      </div>
      <div className="mt-1 h-2 w-full rounded-full bg-secondary" aria-hidden>
        <div
          className="h-2 rounded-full bg-avanza-green"
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  )
}

/** Side-view drawing of the chassis so students can SEE the center of mass. */
function ChassisDiagram({ config, centerOfMass }: { config: ChassisConfig; centerOfMass: number }) {
  // Map 1..3 choices onto a 240 x 140 canvas.
  const wheelR = 12 + config.wheelSize * 6 // 18..30
  const halfSpan = 26 + config.wheelSpacing * 20 // 46..86 (half distance between wheels)
  const bodyW = 60 + config.bodyWidth * 30 // 90..150
  const bodyH = 16 + config.bodyHeight * 12 // 28..52

  const cx = 120
  const groundY = 120
  const axleY = groundY - wheelR
  const bodyBottom = axleY - 4
  const bodyTop = bodyBottom - bodyH
  const bodyLeft = cx - bodyW / 2

  // Weight dot: high placement (3) sits near the top of the body, low (1) near the bottom.
  const weightY = bodyBottom - ((config.weightPlacement - 1) / 2) * (bodyH - 12) - 6

  const leftWheelX = cx - halfSpan
  const rightWheelX = cx + halfSpan

  const label = `Side view of the robot: ${LEVEL_WORDS.bodyWidth[config.bodyWidth - 1]} body, ${LEVEL_WORDS.bodyHeight[config.bodyHeight - 1]} height, ${LEVEL_WORDS.wheelSize[config.wheelSize - 1]} wheels spaced ${LEVEL_WORDS.wheelSpacing[config.wheelSpacing - 1]}, with the weight placed ${LEVEL_WORDS.weightPlacement[config.weightPlacement - 1]}. Center of mass height is ${centerOfMass} out of 6.`

  return (
    <svg
      viewBox="0 0 240 140"
      role="img"
      aria-label={label}
      className="h-auto w-full rounded-md border border-border bg-secondary"
    >
      <title>{label}</title>
      {/* Ground line */}
      <line x1={10} y1={groundY} x2={230} y2={groundY} stroke="currentColor" strokeWidth={2} className="text-border" />
      {/* Body */}
      <rect
        x={bodyLeft}
        y={bodyTop}
        width={bodyW}
        height={bodyH}
        rx={6}
        className="fill-card stroke-foreground"
        strokeWidth={2}
      />
      {/* Wheels */}
      <circle cx={leftWheelX} cy={axleY} r={wheelR} className="fill-secondary stroke-foreground" strokeWidth={3} />
      <circle cx={rightWheelX} cy={axleY} r={wheelR} className="fill-secondary stroke-foreground" strokeWidth={3} />
      <circle cx={leftWheelX} cy={axleY} r={3} className="fill-foreground" />
      <circle cx={rightWheelX} cy={axleY} r={3} className="fill-foreground" />
      {/* Weight dot (center of mass) */}
      <circle cx={cx} cy={weightY} r={7} className="fill-avanza-green stroke-foreground" strokeWidth={2} />
      <text x={cx + 12} y={weightY + 4} className="fill-muted-foreground" fontSize={10}>
        weight
      </text>
    </svg>
  )
}

/**
 * Virtual Chassis Lab: students adjust a rolling-robot design and watch the four
 * deterministic tests and causal feedback update live. The physics lives in
 * `chassis-model.ts`; this component is only the UI and saves the design as the
 * student's real work.
 */
export function VirtualChassisLab({ activityId }: { activityId: string }) {
  const { loaded, progress, saveActivityData, saveActivityResult } = useRoboticsProgress()
  const key = `chassis-lab:${activityId}`

  const [config, setConfig] = useState<ChassisConfig>(DEFAULT_CHASSIS)
  const [ready, setReady] = useState(false)
  const [saved, setSaved] = useState(false)

  // Load the saved design once progress is available (server render used the default).
  useEffect(() => {
    if (!loaded) return
    let stored: ChassisConfig | null = null
    try {
      stored = JSON.parse(progress.activityData[key] || "null") as ChassisConfig | null
    } catch {
      stored = null
    }
    if (stored) setConfig(stored)
    setReady(true)
    // Load once; activityData changing later is our own save echo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded])

  // Persist the design whenever it changes (after the initial load).
  useEffect(() => {
    if (!ready) return
    saveActivityData(key, JSON.stringify(config))
    const isDefault =
      JSON.stringify(config) === JSON.stringify(DEFAULT_CHASSIS)
    if (!isDefault) {
      saveActivityResult(activityId, { pathId: progress.equipmentPath ?? null, completed: true })
      setSaved(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, ready])

  const report = evaluateChassis(config)
  const disabled = !loaded || !ready
  const set = (patch: Partial<ChassisConfig>) => setConfig((c) => ({ ...c, ...patch }))

  return (
    <div className="rounded-lg border border-border bg-card p-5 md:p-6">
      <h3 className="text-lg font-bold text-foreground">Virtual Chassis Lab</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Design a rolling robot, then watch how it does on four tests. Change one thing at a time and
        read the tips to figure out <em>why</em> a design works or fails.
      </p>

      <div className="mt-5 grid gap-6 md:grid-cols-2">
        {/* Controls */}
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Your design</p>

          {SLIDERS.map((s) => (
            <LevelSlider
              key={`${s.key}-${ready}`}
              id={`chassis-${activityId}-${s.key}`}
              label={s.label}
              value={config[s.key]}
              words={LEVEL_WORDS[s.key]}
              disabled={disabled}
              onChange={(n) => set({ [s.key]: n } as Partial<ChassisConfig>)}
            />
          ))}

          <div>
            <p className="text-sm font-semibold text-foreground">Test surface</p>
            <p className="text-sm text-muted-foreground">
              Surface: <span className="font-semibold text-foreground">{SURFACES.find((x) => x.id === config.surface)?.label}</span>
            </p>
            <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Test surface">
              {SURFACES.map((s) => {
                const active = config.surface === s.id
                return (
                  <button
                    key={s.id}
                    type="button"
                    disabled={disabled}
                    aria-pressed={active}
                    onClick={() => set({ surface: s.id })}
                    className={
                      "rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 " +
                      focusRing +
                      " " +
                      (active
                        ? "border-avanza-green bg-avanza-green/10 text-avanza-green-dark"
                        : "border-border text-foreground hover:border-avanza-green/60")
                    }
                  >
                    {s.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-5">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Live results</p>

          <ChassisDiagram config={config} centerOfMass={report.centerOfMass} />

          <div className="space-y-3">
            <StatBar label="Stability" value={report.stability} />
            <StatBar label="Speed" value={report.speed} />
            <StatBar label="Torque (climbing power)" value={report.torque} />
            <StatBar label="Traction (grip)" value={report.traction} />
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Test outcomes</p>
            <ul className="mt-2 space-y-2">
              {report.tests.map((t) => (
                <li key={t.test} className="rounded-md border border-border bg-secondary p-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold text-foreground">{t.test}</span>
                    <span
                      className={
                        "text-sm font-bold " +
                        (t.result === "good"
                          ? "text-avanza-green-dark"
                          : t.result === "okay"
                            ? "text-foreground"
                            : "text-muted-foreground")
                      }
                    >
                      {RATING_WORD[t.result]}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{t.note}</p>
                </li>
              ))}
            </ul>
          </div>

          <div aria-live="polite">
            <p className="text-sm font-semibold text-foreground">Why this happened</p>
            {report.feedback.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {report.feedback.map((line, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-green" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                Adjust the design to see tips about what helps and what hurts.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* What are you testing? */}
      <div className="mt-6 rounded-md border border-border bg-secondary p-4">
        <p className="text-sm font-bold text-foreground">What are you testing?</p>
        <dl className="mt-2 space-y-1.5 text-sm">
          <div>
            <dt className="inline font-semibold text-foreground">Straight line: </dt>
            <dd className="inline text-muted-foreground">Can it roll straight without slipping or wobbling?</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-foreground">Turning: </dt>
            <dd className="inline text-muted-foreground">Can it turn cleanly without spinning out or being too slow?</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-foreground">Small ramp: </dt>
            <dd className="inline text-muted-foreground">Does it have enough power and grip to climb a slope or push through resistance?</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-foreground">Slippery surface: </dt>
            <dd className="inline text-muted-foreground">Can it still move when the floor has almost no grip?</dd>
          </div>
        </dl>
      </div>

      {saved && (
        <p className="mt-4 text-sm font-semibold text-avanza-green-dark" aria-live="polite">
          Saved. Your design is stored with your course work.
        </p>
      )}
    </div>
  )
}
