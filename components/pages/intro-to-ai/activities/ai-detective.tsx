"use client"

import { useEffect, useRef, useState } from "react"
import { Check, HelpCircle, Info } from "lucide-react"
import {
  AI_DETECTIVE_SYSTEMS,
  DETECTIVE_CATEGORIES,
  evaluateDetective,
  type DetectiveCategory,
  type DetectiveSystem,
  type DetectiveVerdict,
} from "@/features/curriculums/intro-to-ai-week1-activities"
import type { ActivityComponentProps } from "@/components/pages/intro-to-ai/activity-registry"
import { ActivityFrame } from "@/components/pages/intro-to-ai/activity-frame"

type Answer = { category: DetectiveCategory | ""; evidence: string[] }
type DetectiveState = { answers: Record<string, Answer>; submitted: boolean }

const EMPTY: DetectiveState = { answers: {}, submitted: false }

function parseState(raw: string | undefined): DetectiveState {
  if (!raw) return EMPTY
  try {
    const data = JSON.parse(raw) as Partial<DetectiveState>
    const answers: Record<string, Answer> = {}
    if (data.answers && typeof data.answers === "object") {
      for (const s of AI_DETECTIVE_SYSTEMS) {
        const a = (data.answers as Record<string, Answer>)[s.id]
        if (a && typeof a === "object") {
          answers[s.id] = {
            category: typeof a.category === "string" ? (a.category as DetectiveCategory) : "",
            evidence: Array.isArray(a.evidence) ? a.evidence.filter((e) => typeof e === "string") : [],
          }
        }
      }
    }
    return { answers, submitted: data.submitted === true }
  } catch {
    return EMPTY
  }
}

const categoryLabel = (id: DetectiveCategory) => DETECTIVE_CATEGORIES.find((c) => c.id === id)?.label ?? id

export function AiDetectiveActivity({ activity, progress }: ActivityComponentProps) {
  const [state, setState] = useState<DetectiveState>(EMPTY)
  const [error, setError] = useState("")
  const resultsRef = useRef<HTMLDivElement>(null)

  // Load saved state once progress is available (keyed remount avoids hydration mismatch).
  useEffect(() => {
    if (progress.loaded) setState(parseState(progress.progress.activities[activity.id]))
  }, [progress.loaded, progress.progress.activities, activity.id])

  const persist = (next: DetectiveState) => {
    setState(next)
    progress.saveActivity(activity.id, JSON.stringify(next))
  }

  const setCategory = (systemId: string, category: DetectiveCategory) => {
    const prev = state.answers[systemId] ?? { category: "", evidence: [] }
    persist({ ...state, answers: { ...state.answers, [systemId]: { ...prev, category } } })
  }

  const toggleEvidence = (systemId: string, evidenceId: string) => {
    const prev = state.answers[systemId] ?? { category: "", evidence: [] }
    const has = prev.evidence.includes(evidenceId)
    const evidence = has ? prev.evidence.filter((e) => e !== evidenceId) : [...prev.evidence, evidenceId]
    persist({ ...state, answers: { ...state.answers, [systemId]: { ...prev, evidence } } })
  }

  const answeredCount = AI_DETECTIVE_SYSTEMS.filter((s) => state.answers[s.id]?.category).length
  const missingEvidence = AI_DETECTIVE_SYSTEMS.filter(
    (s) => state.answers[s.id]?.category && (state.answers[s.id]?.evidence.length ?? 0) === 0,
  )

  const submit = () => {
    if (answeredCount < AI_DETECTIVE_SYSTEMS.length) {
      setError("Choose a category for every system before submitting.")
      return
    }
    if (missingEvidence.length > 0) {
      setError("Pick at least one piece of evidence for each system.")
      return
    }
    setError("")
    persist({ ...state, submitted: true })
    // Move focus to the results summary for screen-reader users.
    window.setTimeout(() => resultsRef.current?.focus(), 0)
  }

  const retry = () => {
    setError("")
    persist({ ...state, submitted: false })
  }

  return (
    <ActivityFrame
      title={activity.title}
      purpose={activity.goal}
      instructions={[
        "For each system, choose the category you think fits best.",
        "Pick at least one piece of evidence for your choice.",
        "Review your answers, then submit to see an explanation for each.",
      ]}
      status="ready"
      saveStatus={progress.saveStatus}
      onReset={() => persist(EMPTY)}
    >
      <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
        {answeredCount} of {AI_DETECTIVE_SYSTEMS.length} classified
      </p>

      <div className="mt-4 space-y-4">
        {AI_DETECTIVE_SYSTEMS.map((system, i) => (
          <SystemCard
            key={system.id}
            index={i}
            system={system}
            answer={state.answers[system.id] ?? { category: "", evidence: [] }}
            submitted={state.submitted}
            onCategory={(c) => setCategory(system.id, c)}
            onEvidence={(e) => toggleEvidence(system.id, e)}
          />
        ))}
      </div>

      {error && (
        <p className="mt-4 text-sm font-medium text-avanza-orange-dark" role="alert">
          {error}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {!state.submitted ? (
          <button
            type="button"
            onClick={submit}
            disabled={!progress.loaded}
            className="inline-flex items-center rounded-md bg-avanza-green px-5 py-2.5 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
          >
            Submit and see explanations
          </button>
        ) : (
          <button
            type="button"
            onClick={retry}
            className="inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-avanza-green-dark transition-colors hover:border-avanza-green hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
          >
            Change my answers
          </button>
        )}
        <div ref={resultsRef} tabIndex={-1} aria-live="polite" className="text-sm text-muted-foreground focus-visible:outline-none">
          {state.submitted ? "Explanations are shown below each system." : ""}
        </div>
      </div>
    </ActivityFrame>
  )
}

function SystemCard({
  index,
  system,
  answer,
  submitted,
  onCategory,
  onEvidence,
}: {
  index: number
  system: DetectiveSystem
  answer: Answer
  submitted: boolean
  onCategory: (c: DetectiveCategory) => void
  onEvidence: (e: string) => void
}) {
  return (
    <div className="rounded-lg border border-border p-4">
      <p className="text-sm font-bold text-foreground">
        <span className="text-muted-foreground">{index + 1}. </span>
        {system.name}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{system.description}</p>

      <fieldset className="mt-3">
        <legend className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Your classification</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {DETECTIVE_CATEGORIES.map((cat) => {
            const checked = answer.category === cat.id
            return (
              <label
                key={cat.id}
                className={`flex cursor-pointer items-start gap-2 rounded-md border p-2.5 text-sm transition-colors ${
                  checked ? "border-avanza-green bg-avanza-green/5" : "border-border hover:border-avanza-green/50"
                }`}
              >
                <input
                  type="radio"
                  name={`cat-${system.id}`}
                  checked={checked}
                  onChange={() => onCategory(cat.id)}
                  className="mt-0.5 h-4 w-4 flex-none text-avanza-green focus-visible:ring-avanza-green"
                />
                <span>
                  <span className="font-medium text-foreground">{cat.label}</span>
                  <span className="block text-xs text-muted-foreground">{cat.short}</span>
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <fieldset className="mt-3">
        <legend className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Evidence for your choice</legend>
        <div className="mt-2 space-y-1.5">
          {system.evidence.map((ev) => (
            <label key={ev.id} className="flex items-start gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={answer.evidence.includes(ev.id)}
                onChange={() => onEvidence(ev.id)}
                className="mt-0.5 h-4 w-4 flex-none rounded border-border text-avanza-green focus-visible:ring-avanza-green"
              />
              <span>{ev.text}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {submitted && answer.category && <Feedback system={system} chosen={answer.category as DetectiveCategory} />}
    </div>
  )
}

function Feedback({ system, chosen }: { system: DetectiveSystem; chosen: DetectiveCategory }) {
  const verdict: DetectiveVerdict = evaluateDetective(system, chosen)
  const tone =
    verdict === "best"
      ? { icon: <Check className="h-4 w-4" aria-hidden />, label: "Strong choice", cls: "border-avanza-green/40 bg-avanza-green/10 text-avanza-green-dark" }
      : verdict === "reasonable"
        ? { icon: <Info className="h-4 w-4" aria-hidden />, label: "Reasonable", cls: "border-avanza-teal/40 bg-avanza-teal/10 text-avanza-teal-dark" }
        : { icon: <HelpCircle className="h-4 w-4" aria-hidden />, label: "Worth reconsidering", cls: "border-avanza-orange/40 bg-avanza-orange/10 text-avanza-orange-dark" }

  return (
    <div className="mt-4 rounded-md border border-border bg-secondary/40 p-4 text-sm" aria-live="polite">
      <p className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold ${tone.cls}`}>
        {tone.icon} {tone.label}
      </p>
      <dl className="mt-3 grid gap-2 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Most appropriate</dt>
          <dd className="text-foreground">{categoryLabel(system.bestCategory)}</dd>
        </div>
        {system.alsoReasonable.length > 0 && (
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Also reasonable</dt>
            <dd className="text-foreground">{system.alsoReasonable.map(categoryLabel).join(", ")}</dd>
          </div>
        )}
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Input</dt>
          <dd className="text-foreground">{system.input}</dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Output</dt>
          <dd className="text-foreground">{system.output}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Rule or learned pattern</dt>
          <dd className="text-foreground">{system.ruleOrPattern}</dd>
        </div>
        {system.infoNeeded && (
          <div className="sm:col-span-2">
            <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">If unsure, you&apos;d need to know</dt>
            <dd className="text-foreground">{system.infoNeeded}</dd>
          </div>
        )}
      </dl>
      <p className="mt-3 text-foreground">{system.reasoning}</p>
    </div>
  )
}
