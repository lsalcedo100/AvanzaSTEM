"use client"

import { useEffect, useRef, useState } from "react"
import {
  TRAINING,
  TEST,
  ADDABLE,
  FEATURE_META,
  evaluate,
  flawedWeights,
  accuracyPercent,
  groupCounts,
  type Weights,
  type FeatureKey,
  type Evaluation,
  type StudentRecord,
} from "@/features/curriculums/intro-to-ai-week5-fairness"
import type { ActivityComponentProps } from "@/components/pages/intro-to-ai/activity-registry"
import { ActivityFrame } from "@/components/pages/intro-to-ai/activity-frame"

type FAState = { weights: Weights; added: string[] }

function emptyState(): FAState {
  return { weights: flawedWeights(), added: [] }
}
function parseState(raw: string | undefined): FAState {
  const base = emptyState()
  if (!raw) return base
  try {
    const d = JSON.parse(raw) as Partial<FAState>
    const weights = { ...base.weights }
    if (d.weights) for (const k of Object.keys(weights) as FeatureKey[]) if (typeof d.weights[k] === "number") weights[k] = d.weights[k]
    return { weights, added: Array.isArray(d.added) ? d.added.filter((x): x is string => typeof x === "string") : [] }
  } catch {
    return base
  }
}

const BASELINE = evaluate(TRAINING, TEST, flawedWeights())

export function FairnessAuditActivity({ activity, progress }: ActivityComponentProps) {
  const [state, setState] = useState<FAState>(emptyState)
  const announceRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (progress.loaded) setState(parseState(progress.progress.activities[activity.id]))
  }, [progress.loaded, progress.progress.activities, activity.id])

  const persist = (next: FAState) => {
    setState(next)
    progress.saveActivity(activity.id, JSON.stringify(next))
  }
  const announce = (msg: string) => {
    if (announceRef.current) announceRef.current.textContent = msg
  }

  const training: StudentRecord[] = [...TRAINING, ...ADDABLE.filter((r) => state.added.includes(r.id))]
  const evalr = evaluate(training, TEST, state.weights)
  const counts = groupCounts(training)

  const setWeight = (key: FeatureKey, v: number) => {
    persist({ ...state, weights: { ...state.weights, [key]: v } })
    announce(`${FEATURE_META.find((f) => f.key === key)!.label} weight set to ${v}. Metrics updated.`)
  }
  const toggleAdd = (id: string) => {
    const added = state.added.includes(id) ? state.added.filter((x) => x !== id) : [...state.added, id]
    persist({ ...state, added })
  }

  return (
    <ActivityFrame
      title={activity.title}
      purpose={activity.goal}
      instructions={[
        "Read the overall accuracy — then look at the accuracy for each group. They are not the same.",
        "The model leans on a misleading proxy feature. Lower its weight, and add examples for the under-represented group.",
        "Rerun the audit and compare with the flawed baseline. Improving fairness is progress, not a guarantee.",
      ]}
      status="ready"
      saveStatus={progress.saveStatus}
      onReset={() => {
        persist(emptyState())
        announce("Reset to the flawed baseline.")
      }}
    >
      <p ref={announceRef} className="sr-only" role="status" aria-live="polite" />

      <p className="mt-3 rounded-md bg-secondary px-3 py-2 text-xs text-muted-foreground">
        Fictional scenario: a school recommends after-school STEM programs. Every student, group, and neighborhood here is made up. Two groups: <strong>Hillside</strong> (larger, near campus) and <strong>Riverside</strong> (smaller, farther away).
      </p>

      {/* Overall vs group */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-md border border-border p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Overall accuracy</p>
          <p className="mt-1 text-3xl font-extrabold tabular-nums text-foreground">{accuracyPercent(evalr.overall)}%</p>
          <p className="text-xs text-muted-foreground">{evalr.overall.correct} of {evalr.overall.total} test students predicted correctly.</p>
        </div>
        <div className="rounded-md border border-border p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Accuracy by group</p>
          <div className="mt-2 space-y-2">
            {evalr.groups.map((g) => (
              <div key={g.group}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{g.group}</span>
                  <span className="tabular-nums text-muted-foreground">{accuracyPercent(g)}% ({g.correct}/{g.total})</span>
                </div>
                <span className="mt-0.5 block h-3 rounded-sm bg-secondary" aria-hidden>
                  <span className={`block h-3 rounded-sm ${g.accuracy < 0.6 ? "bg-avanza-orange" : "bg-avanza-green"}`} style={{ width: `${accuracyPercent(g)}%` }} />
                </span>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  False approvals: {g.falsePos} · Missed good-fit students: {g.falseNeg} · Training examples: {g.trainingCount}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            The overall number can look fine while one group does much worse — always read the group-level results.
          </p>
        </div>
      </div>

      {/* Feature weights */}
      <fieldset className="mt-5">
        <legend className="text-sm font-bold text-foreground">Which features does the model rely on?</legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {FEATURE_META.map((f) => (
            <div key={f.key} className={`rounded-md border p-3 ${f.proxy ? "border-avanza-orange/40 bg-avanza-orange/5" : "border-border"}`}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground">
                  {f.label} {f.proxy && <span className="text-xs font-bold uppercase text-avanza-orange-dark">proxy</span>}
                </span>
                <span className="tabular-nums text-muted-foreground">weight {state.weights[f.key]}</span>
              </div>
              <input type="range" min={0} max={2} step={1} value={state.weights[f.key]} onChange={(e) => setWeight(f.key, Number(e.target.value))} className="mt-1 w-full accent-avanza-green" aria-label={`${f.label} weight`} />
              <p className="mt-1 text-xs text-muted-foreground">{f.note}</p>
            </div>
          ))}
        </div>
      </fieldset>

      {/* Add examples */}
      <fieldset className="mt-5">
        <legend className="text-sm font-bold text-foreground">Add under-represented examples</legend>
        <p className="mt-1 text-xs text-muted-foreground">Training now has {counts.Hillside} Hillside and {counts.Riverside} Riverside students. These good-fit Riverside students were missing:</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {ADDABLE.map((r) => {
            const on = state.added.includes(r.id)
            return (
              <button
                key={r.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggleAdd(r.id)}
                className={`rounded-md border p-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${on ? "border-avanza-green bg-avanza-green/10" : "border-border hover:border-avanza-green/50"}`}
              >
                <span className="font-semibold text-foreground">{r.group} student</span> — {r.features.interest}, {r.features.scheduleFree ? "free after school" : "busy"}, {r.features.pastStem} past STEM · {on ? "added" : "add"}
              </button>
            )
          })}
        </div>
      </fieldset>

      {/* Before/after */}
      <div className="mt-5 rounded-md border border-border bg-card p-4">
        <p className="text-sm font-bold text-foreground">Before vs. after</p>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">Comparison of overall and group accuracy between the flawed baseline and your current audit settings.</caption>
            <thead>
              <tr className="text-left">
                <th className="border-b border-border px-2 py-1 font-semibold text-foreground">Measure</th>
                <th className="border-b border-border px-2 py-1 font-semibold text-foreground">Flawed baseline</th>
                <th className="border-b border-border px-2 py-1 font-semibold text-foreground">Your version</th>
              </tr>
            </thead>
            <tbody>
              <Row label="Overall accuracy" before={`${accuracyPercent(BASELINE.overall)}%`} after={`${accuracyPercent(evalr.overall)}%`} />
              {(["Hillside", "Riverside"] as const).map((grp) => (
                <Row
                  key={grp}
                  label={`${grp} accuracy`}
                  before={`${accuracyPercent(BASELINE.groups.find((g) => g.group === grp)!)}%`}
                  after={`${accuracyPercent(evalr.groups.find((g) => g.group === grp)!)}%`}
                />
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Lowering the proxy weight or adding Riverside examples raises Riverside&apos;s accuracy. Note that a change can also shift another group&apos;s result — improving representation is real progress, but it does not guarantee perfect fairness.
        </p>
      </div>
    </ActivityFrame>
  )
}

function Row({ label, before, after }: { label: string; before: string; after: string }) {
  return (
    <tr>
      <th scope="row" className="border-b border-border/60 px-2 py-1 text-left font-medium text-foreground">{label}</th>
      <td className="border-b border-border/60 px-2 py-1 tabular-nums text-muted-foreground">{before}</td>
      <td className="border-b border-border/60 px-2 py-1 tabular-nums text-foreground">{after}</td>
    </tr>
  )
}
