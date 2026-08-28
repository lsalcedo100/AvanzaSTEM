"use client"

import { useEffect, useMemo, useState } from "react"
import { useRoboticsProgress } from "@/components/ui/useRoboticsProgress"
import { useLanguage } from "@/components/providers/language-provider"
import type { Translations } from "@/i18n/translations"

/** The three parts of every robot system the student sorts components into. */
type Category = "input" | "processing" | "output"

type MapperStrings = Translations["courseUi"]["robotics"]["mapper"]

const categories = (M: MapperStrings): { id: Category; label: string }[] => [
  { id: "input", label: M.input },
  { id: "processing", label: M.processing },
  { id: "output", label: M.output },
]

type Component = {
  id: string
  name: string
  answer: Category
  /** Why it belongs where it does - read aloud whether the student is right or wrong. */
  why: string
}

/**
 * The eight components the student sorts. `why` always explains where the piece
 * really belongs, so a wrong placement gets told why it goes elsewhere.
 */
const components = (M: MapperStrings): Component[] => [
  { id: "touch-sensor", name: M.touchSensor, answer: "input", why: M.whyTouch },
  { id: "distance-sensor", name: M.distanceSensor, answer: "input", why: M.whyDistance },
  { id: "button", name: M.button, answer: "input", why: M.whyButton },
  { id: "color-sensor", name: M.colorSensor, answer: "input", why: M.whyColor },
  { id: "controller", name: M.controller, answer: "processing", why: M.whyController },
  { id: "motor", name: M.motor, answer: "output", why: M.whyMotor },
  { id: "speaker", name: M.speaker, answer: "output", why: M.whySpeaker },
  { id: "light", name: M.light, answer: "output", why: M.whyLight },
]

/**
 * The component ids, in display order. These are the saved-state keys, so they
 * are language-independent - the localized names come from `components(M)`.
 */
const COMPONENT_IDS = [
  "touch-sensor",
  "distance-sensor",
  "button",
  "color-sensor",
  "controller",
  "motor",
  "speaker",
  "light",
] as const

/** The student's sorting: component id -> chosen category (or unset). */
type MapperState = Record<string, Category | "">

function parseState(raw: string): MapperState {
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>
    const next: MapperState = {}
    for (const id of COMPONENT_IDS) {
      const v = parsed[id]
      next[id] = v === "input" || v === "processing" || v === "output" ? v : ""
    }
    return next
  } catch {
    return {}
  }
}

const emptyState = (): MapperState =>
  Object.fromEntries(COMPONENT_IDS.map((id) => [id, ""])) as MapperState

const toggleBase =
  "rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

/**
 * Robot System Mapper: students sort each robot component into Input, Processing,
 * or Output, then check their work. Every component shows the reasoning for where
 * it truly belongs. Real work is saved: the sorting is stored as it changes, and
 * once all eight are placed and checked the activity is recorded as complete.
 * No points or badges - just the sorting, the score, and the reasons.
 */
export function RobotSystemMapper({ activityId }: { activityId: string }) {
  const M = useLanguage().t.courseUi.robotics.mapper
  const COMPONENTS = components(M)
  const CATEGORIES = categories(M)
  const { loaded, progress, saveActivityData, saveActivityResult } = useRoboticsProgress()
  const key = `system-mapper:${activityId}`

  const [state, setState] = useState<MapperState>(emptyState)
  const [checked, setChecked] = useState(false)
  const [saved, setSaved] = useState(false)

  // Load the saved sorting once progress is ready (server + first render stay empty).
  useEffect(() => {
    if (!loaded) return
    setState({ ...emptyState(), ...parseState(progress.activityData[key] || "{}") })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, key])

  const setCategory = (componentId: string, category: Category) => {
    setState((prev) => {
      const next = { ...prev, [componentId]: category }
      saveActivityData(key, JSON.stringify(next))
      return next
    })
    setChecked(false)
    setSaved(false)
  }

  const allAssigned = useMemo(() => COMPONENTS.every((c) => state[c.id]), [state])
  const score = useMemo(
    () => COMPONENTS.filter((c) => state[c.id] === c.answer).length,
    [state],
  )

  const check = () => {
    if (!allAssigned) return
    setChecked(true)
    saveActivityResult(activityId, {
      pathId: progress.equipmentPath ?? null,
      completed: true,
    })
    setSaved(true)
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5 md:p-6">
      <p className="text-sm text-muted-foreground">
        {M.intro}
      </p>

      <ul className="mt-5 space-y-4">
        {COMPONENTS.map((c) => {
          const chosen = state[c.id]
          const isChecked = checked && !!chosen
          const isCorrect = isChecked && chosen === c.answer
          const groupId = `mapper-${activityId}-${c.id}`
          return (
            <li key={c.id} className="rounded-md border border-border bg-secondary p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span id={groupId} className="text-sm font-bold text-foreground">
                  {c.name}
                </span>
                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-labelledby={groupId}
                >
                  {CATEGORIES.map((cat) => {
                    const active = chosen === cat.id
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(c.id, cat.id)}
                        disabled={!loaded}
                        aria-pressed={active}
                        className={
                          toggleBase +
                          " " +
                          (active
                            ? "border-avanza-green bg-avanza-green/10 text-avanza-green-dark"
                            : "border-border text-foreground hover:border-avanza-green/60")
                        }
                      >
                        {cat.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {isChecked && (
                <div className="mt-3 rounded-md bg-card px-3 py-2 text-sm" aria-live="polite">
                  <p
                    className={
                      isCorrect
                        ? "font-semibold text-avanza-green-dark"
                        : "font-semibold text-avanza-orange-dark"
                    }
                  >
                    {isCorrect ? M.correct : M.notQuite}
                  </p>
                  <p className="mt-1 text-foreground/90">{c.why}</p>
                </div>
              )}
            </li>
          )
        })}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={check}
          disabled={!loaded || !allAssigned}
          className="inline-flex items-center rounded-md bg-avanza-green px-5 py-2.5 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
        >
          {M.checkAnswers}
        </button>

        <p className="text-sm text-muted-foreground" aria-live="polite">
          {checked
            ? M.scoreLine.replace("{score}", String(score)).replace("{total}", String(COMPONENTS.length))
            : allAssigned
              ? M.allSorted
              : M.sortedLine
                  .replace("{done}", String(COMPONENTS.filter((c) => state[c.id]).length))
                  .replace("{total}", String(COMPONENTS.length))}
        </p>
      </div>

      {checked && saved && (
        <p className="mt-2 text-xs text-muted-foreground" role="status">
          {M.savedNote}
        </p>
      )}
    </div>
  )
}
