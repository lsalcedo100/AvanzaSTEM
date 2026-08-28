"use client"

import { useEffect, useState } from "react"
import {
  DEFAULT_CHASSIS,
  evaluateChassis,
  type ChassisConfig,
  type FeedbackId,
  type NoteId,
  type Rating,
  type Surface,
  type TestId,
} from "@/components/ui/chassis-model"
import { useLanguage } from "@/components/providers/language-provider"
import type { Translations } from "@/i18n/translations"
import { useRoboticsProgress } from "@/components/ui/useRoboticsProgress"

type ChassisStrings = Translations["courseUi"]["robotics"]["chassis"]

/** Word labels for each 1..3 slider, so students read a level - never color alone. */
const levelWords = (
  C: ChassisStrings,
): Record<keyof Omit<ChassisConfig, "surface">, [string, string, string]> => ({
  wheelSize: [C.small, C.medium, C.large],
  wheelSpacing: [C.narrow, C.medium, C.wide],
  bodyWidth: [C.narrow, C.medium, C.wide],
  bodyHeight: [C.low, C.medium, C.tall],
  weightPlacement: [C.low, C.middle, C.high],
  motorPower: [C.low, C.medium, C.high],
})

const sliders = (C: ChassisStrings): { key: keyof Omit<ChassisConfig, "surface">; label: string }[] => [
  { key: "wheelSize", label: C.wheelSize },
  { key: "wheelSpacing", label: C.wheelSpacing },
  { key: "bodyWidth", label: C.bodyWidth },
  { key: "bodyHeight", label: C.bodyHeight },
  { key: "weightPlacement", label: C.weightPlacement },
  { key: "motorPower", label: C.motorPower },
]

const surfaces = (C: ChassisStrings): { id: Surface; label: string }[] => [
  { id: "smooth", label: C.smooth },
  { id: "carpet", label: C.carpet },
  { id: "slippery", label: C.slippery },
]

const ratingWord = (C: ChassisStrings): Record<Rating, string> => ({
  good: C.good,
  okay: C.okay,
  poor: C.poor,
})

/** Display names for the model's stable test / note / feedback ids. */
const testName = (C: ChassisStrings, id: TestId): string => C[id]
const noteText = (C: ChassisStrings, id: NoteId): string => C[id]
const feedbackText = (C: ChassisStrings, id: FeedbackId): string => C[id]

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
  const C = useLanguage().t.courseUi.robotics.chassis
  const LEVEL_WORDS = levelWords(C)
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

  const label = C.diagramAlt
    .replace("{bodyWidth}", LEVEL_WORDS.bodyWidth[config.bodyWidth - 1])
    .replace("{bodyHeight}", LEVEL_WORDS.bodyHeight[config.bodyHeight - 1])
    .replace("{wheelSize}", LEVEL_WORDS.wheelSize[config.wheelSize - 1])
    .replace("{wheelSpacing}", LEVEL_WORDS.wheelSpacing[config.wheelSpacing - 1])
    .replace("{weight}", LEVEL_WORDS.weightPlacement[config.weightPlacement - 1])
    .replace("{com}", String(centerOfMass))

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
  const C = useLanguage().t.courseUi.robotics.chassis
  const SLIDERS = sliders(C)
  const SURFACES = surfaces(C)
  const LEVEL_WORDS = levelWords(C)
  const RATING_WORD = ratingWord(C)
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
      <h3 className="text-lg font-bold text-foreground">{C.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {C.intro}
      </p>

      <div className="mt-5 grid gap-6 md:grid-cols-2">
        {/* Controls */}
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{C.yourDesign}</p>

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
            <p className="text-sm font-semibold text-foreground">{C.testSurface}</p>
            <p className="text-sm text-muted-foreground">
              {C.surface}{" "}
              <span className="font-semibold text-foreground">
                {SURFACES.find((x) => x.id === config.surface)?.label}
              </span>
            </p>
            <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={C.testSurface}>
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
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{C.liveResults}</p>

          <ChassisDiagram config={config} centerOfMass={report.centerOfMass} />

          <div className="space-y-3">
            <StatBar label={C.stability} value={report.stability} />
            <StatBar label={C.speed} value={report.speed} />
            <StatBar label={C.torque} value={report.torque} />
            <StatBar label={C.traction} value={report.traction} />
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">{C.testOutcomes}</p>
            <ul className="mt-2 space-y-2">
              {report.tests.map((t) => (
                <li key={t.test} className="rounded-md border border-border bg-secondary p-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold text-foreground">{testName(C, t.test)}</span>
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
                  <p className="mt-1 text-sm text-muted-foreground">{noteText(C, t.note)}</p>
                </li>
              ))}
            </ul>
          </div>

          <div aria-live="polite">
            <p className="text-sm font-semibold text-foreground">{C.whyHappened}</p>
            {report.feedback.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {report.feedback.map((line, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-green" />
                    <span>{feedbackText(C, line)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                {C.adjustForTips}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* What are you testing? */}
      <div className="mt-6 rounded-md border border-border bg-secondary p-4">
        <p className="text-sm font-bold text-foreground">{C.whatTesting}</p>
        <dl className="mt-2 space-y-1.5 text-sm">
          <div>
            <dt className="inline font-semibold text-foreground">{C.straightLine}: </dt>
            <dd className="inline text-muted-foreground">{C.straightLineQ}</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-foreground">{C.turning}: </dt>
            <dd className="inline text-muted-foreground">{C.turningQ}</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-foreground">{C.smallRamp}: </dt>
            <dd className="inline text-muted-foreground">{C.smallRampQ}</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-foreground">{C.slipperySurface}: </dt>
            <dd className="inline text-muted-foreground">{C.slipperyQ}</dd>
          </div>
        </dl>
      </div>

      {saved && (
        <p className="mt-4 text-sm font-semibold text-avanza-green-dark" aria-live="polite">
          {C.savedNote}
        </p>
      )}
    </div>
  )
}
