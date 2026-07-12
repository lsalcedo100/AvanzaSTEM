"use client"

import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"
import {
  SCENARIOS,
  FIELDS,
  CLASSIFICATIONS,
  guidanceFor,
  evaluateChoice,
  scoreScenario,
  type Classification,
} from "@/features/curriculums/intro-to-ai-week5-privacy"
import type { ActivityComponentProps } from "@/components/pages/intro-to-ai/activity-registry"
import { ActivityFrame } from "@/components/pages/intro-to-ai/activity-frame"

type PVState = { scenarioId: string; choices: Record<string, Record<string, Classification>>; revealed: Record<string, boolean> }

function emptyState(): PVState {
  return { scenarioId: SCENARIOS[0].id, choices: {}, revealed: {} }
}
function parseState(raw: string | undefined): PVState {
  const base = emptyState()
  if (!raw) return base
  try {
    const d = JSON.parse(raw) as Partial<PVState>
    return {
      scenarioId: SCENARIOS.some((s) => s.id === d.scenarioId) ? d.scenarioId! : base.scenarioId,
      choices: d.choices && typeof d.choices === "object" ? (d.choices as PVState["choices"]) : {},
      revealed: d.revealed && typeof d.revealed === "object" ? (d.revealed as Record<string, boolean>) : {},
    }
  } catch {
    return base
  }
}

export function PrivacyMinimizeActivity({ activity, progress }: ActivityComponentProps) {
  const [state, setState] = useState<PVState>(emptyState)
  const announceRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (progress.loaded) setState(parseState(progress.progress.activities[activity.id]))
  }, [progress.loaded, progress.progress.activities, activity.id])

  const persist = (next: PVState) => {
    setState(next)
    progress.saveActivity(activity.id, JSON.stringify(next))
  }
  const announce = (msg: string) => {
    if (announceRef.current) announceRef.current.textContent = msg
  }

  const scenario = SCENARIOS.find((s) => s.id === state.scenarioId)!
  const choices = state.choices[scenario.id] ?? {}
  const revealed = state.revealed[scenario.id] ?? false

  const setChoice = (fieldId: string, c: Classification) =>
    persist({ ...state, choices: { ...state.choices, [scenario.id]: { ...choices, [fieldId]: c } } })
  const reveal = () => {
    persist({ ...state, revealed: { ...state.revealed, [scenario.id]: true } })
    const s = scoreScenario(scenario.id, choices)
    announce(`Feedback shown. ${s.matched} of ${s.total} match the recommendation.`)
  }

  const score = scoreScenario(scenario.id, choices)
  const answeredCount = FIELDS.filter((f) => choices[f.id]).length

  return (
    <ActivityFrame
      title={activity.title}
      purpose={activity.goal}
      instructions={[
        "Pick an app scenario. For each data field, decide: required, helpful, unnecessary, or too sensitive.",
        "Aim to collect only what the app truly needs — data minimization.",
        "Reveal the guidance to compare, and see safer alternatives, consent, and how long to keep each field.",
      ]}
      status="ready"
      saveStatus={progress.saveStatus}
    >
      <p ref={announceRef} className="sr-only" role="status" aria-live="polite" />

      <p className="mt-3 rounded-md bg-secondary px-3 py-2 text-xs text-muted-foreground">These are made-up apps. Don&apos;t enter any of your own personal details — just classify the fields.</p>

      {/* Scenario */}
      <fieldset className="mt-4">
        <legend className="text-sm font-bold text-foreground">Choose an app</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={s.id === scenario.id}
              onClick={() => persist({ ...state, scenarioId: s.id })}
              className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${s.id === scenario.id ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark" : "border-border text-muted-foreground hover:border-avanza-green/50 hover:text-foreground"}`}
            >
              {s.name}
            </button>
          ))}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{scenario.purpose}</p>
      </fieldset>

      {/* Fields */}
      <ul className="mt-4 space-y-2">
        {FIELDS.map((field) => {
          const choice = choices[field.id]
          const evalr = revealed && choice ? evaluateChoice(scenario.id, field.id, choice) : null
          return (
            <li key={field.id} className="rounded-md border border-border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold text-foreground">{field.label}</span>
                <div className="flex flex-wrap gap-1" role="group" aria-label={`Classify ${field.label}`}>
                  {CLASSIFICATIONS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      aria-pressed={choice === c.id}
                      onClick={() => setChoice(field.id, c.id)}
                      className={`rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${choice === c.id ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark" : "border-border text-muted-foreground hover:text-foreground"}`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
              {evalr && (
                <div className="mt-2 rounded-md bg-secondary px-3 py-2 text-xs" aria-live="polite">
                  <p className="font-semibold text-foreground">
                    {evalr.matches ? (
                      <span className="inline-flex items-center gap-1 text-avanza-green-dark"><Check className="h-3 w-3" aria-hidden /> Matches the recommendation ({CLASSIFICATIONS.find((c) => c.id === evalr.recommended)!.label})</span>
                    ) : (
                      <span className="text-avanza-orange-dark">Recommended: {CLASSIFICATIONS.find((c) => c.id === evalr.recommended)!.label}</span>
                    )}
                  </p>
                  <p className="mt-0.5 text-muted-foreground">{evalr.guidance.why}</p>
                  <p className="mt-0.5 text-muted-foreground"><span className="font-semibold">Safer alternative:</span> {evalr.guidance.saferAlternative}</p>
                  <p className="mt-0.5 text-muted-foreground">
                    <span className="font-semibold">Consent:</span> {evalr.guidance.consentNeeded ? "needed" : "not needed"} · <span className="font-semibold">Keep:</span> {evalr.guidance.retention} · <span className="font-semibold">On-device:</span> {evalr.guidance.localProcessing ? "reduces risk" : "n/a"}
                  </p>
                </div>
              )}
            </li>
          )
        })}
      </ul>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={reveal}
          disabled={answeredCount === 0}
          className="inline-flex items-center rounded-md bg-avanza-green px-4 py-2 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
        >
          Show the guidance
        </button>
        {revealed && (
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {score.matched} of {score.total} match. {score.unnecessaryOrSensitiveKept > 0 ? `You chose to collect ${score.unnecessaryOrSensitiveKept} field(s) that are unnecessary or too sensitive — collecting less is safer.` : "You avoided collecting unnecessary or sensitive data — good data minimization."}
          </p>
        )}
      </div>
    </ActivityFrame>
  )
}
