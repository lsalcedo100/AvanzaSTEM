"use client"

import { useEffect, useRef, useState } from "react"
import {
  TRAINING,
  TEST,
  ADDABLE,
  featureMeta,
  groupLabel,
  interestLabel,
  evaluate,
  flawedWeights,
  accuracyPercent,
  groupCounts,
  type Weights,
  type FeatureKey,
  type Evaluation,
  type StudentRecord,
} from "@/features/curriculums/intro-to-ai/activities/week5-fairness"
import { useLanguage } from "@/components/providers/language-provider"

/** The Week 5 fairness wording in the reader's language. */
function useS() {
  return useLanguage().t.courseUi.ai.week5Fairness
}
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
  const S = useS()
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
    announce(
      S.faWeightAnnounce
        .replace("{label}", featureMeta(S).find((f) => f.key === key)!.label)
        .replace("{n}", String(v)),
    )
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
        S.faInstr1,
        S.faInstr2,
        S.faInstr3,
      ]}
      status="ready"
      saveStatus={progress.saveStatus}
      onReset={() => {
        persist(emptyState())
        announce(S.faResetBaseline)
      }}
    >
      <p ref={announceRef} className="sr-only" role="status" aria-live="polite" />

      <p className="mt-3 rounded-md bg-secondary px-3 py-2 text-xs text-muted-foreground">
        {S.faScenarioNote
          .replace("{a}", groupLabel("Hillside", S))
          .replace("{b}", groupLabel("Riverside", S))}
      </p>

      {/* Overall vs group */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-md border border-border p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{S.faOverallAccuracy}</p>
          <p className="mt-1 text-3xl font-extrabold tabular-nums text-foreground">{accuracyPercent(evalr.overall)}%</p>
          <p className="text-xs text-muted-foreground">{evalr.overall.correct} of {evalr.overall.total} test students predicted correctly.</p>
        </div>
        <div className="rounded-md border border-border p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{S.faAccuracyByGroup}</p>
          <div className="mt-2 space-y-2">
            {evalr.groups.map((g) => (
              <div key={g.group}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{groupLabel(g.group, S)}</span>
                  <span className="tabular-nums text-muted-foreground">{accuracyPercent(g)}% ({g.correct}/{g.total})</span>
                </div>
                <span className="mt-0.5 block h-3 rounded-sm bg-secondary" aria-hidden>
                  <span className={`block h-3 rounded-sm ${g.accuracy < 0.6 ? "bg-avanza-orange" : "bg-avanza-green"}`} style={{ width: `${accuracyPercent(g)}%` }} />
                </span>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {S.faGroupLine
                    .replace("{fp}", String(g.falsePos))
                    .replace("{fn}", String(g.falseNeg))
                    .replace("{n}", String(g.trainingCount))}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {S.faGroupNote}
          </p>
        </div>
      </div>

      {/* Feature weights */}
      <fieldset className="mt-5">
        <legend className="text-sm font-bold text-foreground">{S.faWhichFeatures}</legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {featureMeta(S).map((f) => (
            <div key={f.key} className={`rounded-md border p-3 ${f.proxy ? "border-avanza-orange/40 bg-avanza-orange/5" : "border-border"}`}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground">
                  {f.label} {f.proxy && <span className="text-xs font-bold uppercase text-avanza-orange-dark">proxy</span>}
                </span>
                <span className="tabular-nums text-muted-foreground">{S.faWeight.replace("{n}", String(state.weights[f.key]))}</span>
              </div>
              <input type="range" min={0} max={2} step={1} value={state.weights[f.key]} onChange={(e) => setWeight(f.key, Number(e.target.value))} className="mt-1 w-full accent-avanza-green" aria-label={`${f.label} weight`} />
              <p className="mt-1 text-xs text-muted-foreground">{f.note}</p>
            </div>
          ))}
        </div>
      </fieldset>

      {/* Add examples */}
      <fieldset className="mt-5">
        <legend className="text-sm font-bold text-foreground">{S.faAddUnderrepresented}</legend>
        <p className="mt-1 text-xs text-muted-foreground">
          {S.faTrainingNow
            .replace("{a}", String(counts.Hillside))
            .replace("{b}", String(counts.Riverside))
            .replaceAll("{groupA}", groupLabel("Hillside", S))
            .replaceAll("{groupB}", groupLabel("Riverside", S))}
        </p>
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
                <span className="font-semibold text-foreground">
                  {S.faStudentBtn.replace("{group}", groupLabel(r.group, S))}
                </span>{" "}
                —{" "}
                {S.faStudentDetail
                  .replace("{interest}", interestLabel(r.features.interest, S))
                  .replace("{schedule}", r.features.scheduleFree ? S.faFree : S.faBusy)
                  .replace("{stem}", String(r.features.pastStem))
                  .replace("{action}", on ? S.faAddedLower : S.faAddLower)}
              </button>
            )
          })}
        </div>
      </fieldset>

      {/* Before/after */}
      <div className="mt-5 rounded-md border border-border bg-card p-4">
        <p className="text-sm font-bold text-foreground">{S.faBeforeAfter}</p>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">{S.faComparisonCaption}</caption>
            <thead>
              <tr className="text-left">
                <th className="border-b border-border px-2 py-1 font-semibold text-foreground">{S.faMeasure}</th>
                <th className="border-b border-border px-2 py-1 font-semibold text-foreground">{S.faFlawedBaseline}</th>
                <th className="border-b border-border px-2 py-1 font-semibold text-foreground">{S.faYourVersion}</th>
              </tr>
            </thead>
            <tbody>
              <Row label={S.faOverallAccuracy} before={`${accuracyPercent(BASELINE.overall)}%`} after={`${accuracyPercent(evalr.overall)}%`} />
              {(["Hillside", "Riverside"] as const).map((grp) => (
                <Row
                  key={grp}
                  label={S.faGroupAccuracy.replace("{group}", groupLabel(grp, S))}
                  before={`${accuracyPercent(BASELINE.groups.find((g) => g.group === grp)!)}%`}
                  after={`${accuracyPercent(evalr.groups.find((g) => g.group === grp)!)}%`}
                />
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {S.faClosingNote.replaceAll("{group}", groupLabel("Riverside", S))}
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
