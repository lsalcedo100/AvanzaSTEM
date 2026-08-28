"use client"

import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"
import {
  SCENARIOS,
  scenarios,
  fields,
  classifications,
  guidanceFor,
  evaluateChoice,
  scoreScenario,
  type Classification,
} from "@/features/curriculums/intro-to-ai/activities/week5-privacy"
import { useLanguage } from "@/components/providers/language-provider"

/** The Week 5 privacy wording in the reader's language. */
function useS() {
  return useLanguage().t.courseUi.ai.week5Privacy
}
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
  const S = useS()
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

  const SCEN = scenarios(S)
  const FIELD_LIST = fields(S)
  const CLASSES = classifications(S)
  const scenario = SCEN.find((s) => s.id === state.scenarioId)!
  const choices = state.choices[scenario.id] ?? {}
  const revealed = state.revealed[scenario.id] ?? false

  const setChoice = (fieldId: string, c: Classification) =>
    persist({ ...state, choices: { ...state.choices, [scenario.id]: { ...choices, [fieldId]: c } } })
  const reveal = () => {
    persist({ ...state, revealed: { ...state.revealed, [scenario.id]: true } })
    const sc = scoreScenario(scenario.id, choices)
    announce(
      S.pmFeedbackAnnounce.replace("{matched}", String(sc.matched)).replace("{total}", String(sc.total)),
    )
  }

  const score = scoreScenario(scenario.id, choices)
  const answeredCount = FIELD_LIST.filter((f) => choices[f.id]).length

  return (
    <ActivityFrame
      title={activity.title}
      purpose={activity.goal}
      instructions={[
        S.pmInstr1,
        S.pmInstr2,
        S.pmInstr3,
      ]}
      status="ready"
      saveStatus={progress.saveStatus}
    >
      <p ref={announceRef} className="sr-only" role="status" aria-live="polite" />

      <p className="mt-3 rounded-md bg-secondary px-3 py-2 text-xs text-muted-foreground">{S.pmMadeUpNote}</p>

      {/* Scenario */}
      <fieldset className="mt-4">
        <legend className="text-sm font-bold text-foreground">{S.pmChooseApp}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {SCEN.map((s) => (
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
        {FIELD_LIST.map((field) => {
          const choice = choices[field.id]
          const evalr = revealed && choice ? evaluateChoice(scenario.id, field.id, choice, S) : null
          return (
            <li key={field.id} className="rounded-md border border-border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold text-foreground">{field.label}</span>
                <div className="flex flex-wrap gap-1" role="group" aria-label={`Classify ${field.label}`}>
                  {CLASSES.map((c) => (
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
                      <span className="inline-flex items-center gap-1 text-avanza-green-dark">
                        <Check className="h-3 w-3" aria-hidden />{" "}
                        {S.pmMatches.replace("{label}", CLASSES.find((c) => c.id === evalr.recommended)!.label)}
                      </span>
                    ) : (
                      <span className="text-avanza-orange-dark">
                        {S.pmRecommended.replace("{label}", CLASSES.find((c) => c.id === evalr.recommended)!.label)}
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-muted-foreground">{evalr.guidance.why}</p>
                  <p className="mt-0.5 text-muted-foreground"><span className="font-semibold">{S.pmSaferAlternative}</span> {evalr.guidance.saferAlternative}</p>
                  <p className="mt-0.5 text-muted-foreground">
                    <span className="font-semibold">{S.pmConsent}</span>{" "}
                    {evalr.guidance.consentNeeded ? S.pmConsentNeeded : S.pmConsentNotNeeded} ·{" "}
                    <span className="font-semibold">{S.pmKeep}</span> {evalr.guidance.retention} ·{" "}
                    <span className="font-semibold">{S.pmOnDevice}</span>{" "}
                    {evalr.guidance.localProcessing ? S.pmReducesRisk : S.pmNotApplicable}
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
          {S.pmShowGuidance}
        </button>
        {revealed && (
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {S.pmMatchLine.replace("{matched}", String(score.matched)).replace("{total}", String(score.total))}{" "}
            {score.unnecessaryOrSensitiveKept > 0
              ? S.pmKeptRisky.replace("{n}", String(score.unnecessaryOrSensitiveKept))
              : S.pmGoodMinimization}
          </p>
        )}
      </div>
    </ActivityFrame>
  )
}
