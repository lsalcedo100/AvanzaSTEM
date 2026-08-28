"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  CANONICAL_TRAINING,
  experiments,
  localizeFruits,
  accuracyPercent,
  categoryPercentText,
  labelCounts,
  labelText,
  runExperiment,
  runModel,
  validateSplit,
  type ExperimentId,
  type ModelRun,
  type SpaceFruit,
} from "@/features/curriculums/intro-to-ai/activities/week2-activities"
import { useLanguage } from "@/components/providers/language-provider"

/** The Week 2 wording in the reader's language. */
function useS() {
  return useLanguage().t.courseUi.ai.week2
}
import type { ActivityComponentProps } from "@/components/pages/intro-to-ai/activity-registry"
import { ActivityFrame } from "@/components/pages/intro-to-ai/activity-frame"
import { CountBars, LabelBadge } from "@/components/pages/intro-to-ai/activities/week2-shared"

/** A 16-fruit pool (8 Safe, 8 Not-safe) the student splits into train/test. */
const SPLIT_POOL: SpaceFruit[] = [
  ...CANONICAL_TRAINING.filter((e) => e.canonicalLabel === "safe").slice(0, 8),
  ...CANONICAL_TRAINING.filter((e) => e.canonicalLabel === "unsafe").slice(0, 8),
]

type Assign = "train" | "test"
type ExpState = { prediction: string; ran: boolean }
type TTState = {
  assignment: Record<string, Assign>
  ranSplit: boolean
  splitPrediction: string
  experiments: Record<ExperimentId, ExpState>
  accuracyOpen: boolean
}

function suggestedSplit(): Record<string, Assign> {
  // ~75/25, keeping both categories in the test set.
  const a: Record<string, Assign> = {}
  const safe = SPLIT_POOL.filter((e) => e.canonicalLabel === "safe")
  const unsafe = SPLIT_POOL.filter((e) => e.canonicalLabel === "unsafe")
  safe.forEach((e, i) => (a[e.id] = i < 6 ? "train" : "test"))
  unsafe.forEach((e, i) => (a[e.id] = i < 6 ? "train" : "test"))
  return a
}

function emptyState(): TTState {
  return {
    assignment: suggestedSplit(),
    ranSplit: false,
    splitPrediction: "",
    experiments: {
      balanced: { prediction: "", ran: false },
      unbalanced: { prediction: "", ran: false },
      incorrect: { prediction: "", ran: false },
    },
    accuracyOpen: false,
  }
}

function parseState(raw: string | undefined): TTState {
  const base = emptyState()
  if (!raw) return base
  try {
    const d = JSON.parse(raw) as Partial<TTState>
    const assignment = { ...base.assignment }
    if (d.assignment && typeof d.assignment === "object") {
      for (const [k, v] of Object.entries(d.assignment)) if (v === "train" || v === "test") assignment[k] = v
    }
    const experiments = base.experiments
    if (d.experiments && typeof d.experiments === "object") {
      for (const id of ["balanced", "unbalanced", "incorrect"] as ExperimentId[]) {
        const e = (d.experiments as Record<string, unknown>)[id] as Partial<ExpState> | undefined
        if (e) experiments[id] = { prediction: typeof e.prediction === "string" ? e.prediction : "", ran: e.ran === true }
      }
    }
    return {
      assignment,
      ranSplit: d.ranSplit === true,
      splitPrediction: typeof d.splitPrediction === "string" ? d.splitPrediction : "",
      experiments,
      accuracyOpen: d.accuracyOpen === true,
    }
  } catch {
    return base
  }
}

export function TrainTestSplitActivity({ activity, progress }: ActivityComponentProps) {
  const S = useS()
  const [state, setState] = useState<TTState>(emptyState)
  const announceRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (progress.loaded) setState(parseState(progress.progress.activities[activity.id]))
  }, [progress.loaded, progress.progress.activities, activity.id])

  const persist = (next: TTState) => {
    setState(next)
    progress.saveActivity(activity.id, JSON.stringify(next))
  }
  const announce = (msg: string) => {
    if (announceRef.current) announceRef.current.textContent = msg
  }

  const POOL = useMemo(() => localizeFruits(SPLIT_POOL, S), [S])
  const trainFruits = POOL.filter((e) => state.assignment[e.id] === "train")
  const testFruits = POOL.filter((e) => state.assignment[e.id] === "test")
  const validation = validateSplit(trainFruits, testFruits, S)
  const trainCounts = labelCounts(trainFruits, true)
  const testCounts = labelCounts(testFruits, true)

  const splitRun = useMemo(
    () => (state.ranSplit && validation.ok ? runModel(trainFruits, testFruits, 3) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.ranSplit, state.assignment],
  )

  const toggle = (id: string) => {
    const next = state.assignment[id] === "train" ? "test" : "train"
    persist({ ...state, assignment: { ...state.assignment, [id]: next }, ranSplit: false })
  }

  return (
    <ActivityFrame
      title={activity.title}
      purpose={activity.goal}
      instructions={[S.ttInstr1, S.ttInstr2, S.ttInstr3]}
      status="ready"
      saveStatus={progress.saveStatus}
      onReset={() => {
        announce(S.ttActivityReset)
        persist(emptyState())
      }}
    >
      <p ref={announceRef} className="sr-only" role="status" aria-live="polite" />

      {/* Predict why examples must be hidden */}
      <div className="mt-4 rounded-md border border-avanza-purple/30 bg-avanza-purple/5 p-4">
        <label htmlFor="tt-split-pred" className="block text-sm font-semibold text-foreground">
          {S.ttPredictFirst}
        </label>
        <textarea
          id="tt-split-pred"
          key={`tt-split-pred:${progress.loaded}`}
          defaultValue={state.splitPrediction}
          onBlur={(e) => persist({ ...state, splitPrediction: e.target.value })}
          rows={2}
          className="mt-2 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
          placeholder={S.ttPredictPlaceholder}
        />
      </div>

      {/* Split controls */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-sm font-bold text-foreground">{S.ttAssignEach}</h4>
        <button
          type="button"
          onClick={() => {
            persist({ ...state, assignment: suggestedSplit(), ranSplit: false })
            announce(S.ttResetSplit)
          }}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-avanza-green/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1"
        >
          {S.ttSuggestedSplit}
        </button>
      </div>

      {/* Set summaries */}
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <SetSummary title={S.ttTrainingSet} total={trainFruits.length} counts={trainCounts} tone="green" />
        <SetSummary title={S.ttTestingSet} total={testFruits.length} counts={testCounts} tone="purple" />
      </div>

      {/* Assignment table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">{S.ttTableCaption}</caption>
          <thead>
            <tr className="text-left">
              <th scope="col" className="border-b border-border px-2 py-2 font-semibold text-foreground">{S.ttFruit}</th>
              <th scope="col" className="border-b border-border px-2 py-2 font-semibold text-foreground">{S.ttCorrectLabel}</th>
              <th scope="col" className="border-b border-border px-2 py-2 font-semibold text-foreground">{S.ttInWhichSet}</th>
            </tr>
          </thead>
          <tbody>
            {POOL.map((fruit) => {
              const set = state.assignment[fruit.id]
              return (
                <tr key={fruit.id}>
                  <th scope="row" className="border-b border-border/60 px-2 py-2 text-left font-medium text-foreground">
                    {fruit.name}
                    <span className="block text-xs font-normal text-muted-foreground">{fruit.description}</span>
                  </th>
                  <td className="border-b border-border/60 px-2 py-2">
                    <LabelBadge label={fruit.canonicalLabel} />
                  </td>
                  <td className="border-b border-border/60 px-2 py-2">
                    <button
                      type="button"
                      onClick={() => toggle(fruit.id)}
                      aria-label={S.ttToggleAria
                        .replace("{name}", fruit.name)
                        .replace("{set}", set === "train" ? S.ttTrainingWord : S.ttTestingWord)
                        .replace("{other}", set === "train" ? S.ttTestingWord : S.ttTrainingWord)}
                      className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${
                        set === "train"
                          ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark"
                          : "border-avanza-purple bg-avanza-purple/10 text-avanza-purple-dark"
                      }`}
                    >
                      {S.ttSwitch.replace("{set}", set === "train" ? S.ttTrainingShort : S.ttTestingShort)}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Validation */}
      {(validation.errors.length > 0 || validation.warnings.length > 0) && (
        <div
          className={`mt-4 rounded-md border p-3 text-sm ${
            validation.errors.length > 0 ? "border-avanza-orange/50 bg-avanza-orange/10" : "border-border bg-secondary"
          }`}
          role={validation.errors.length > 0 ? "alert" : "status"}
        >
          {validation.errors.map((e, i) => (
            <p key={`e${i}`} className="text-avanza-orange-dark">⚠ {e}</p>
          ))}
          {validation.warnings.map((w, i) => (
            <p key={`w${i}`} className="text-muted-foreground">{S.ttNotePrefix.replace("{text}", w)}</p>
          ))}
        </div>
      )}

      {/* Run the model on the split */}
      <div className="mt-5">
        <button
          type="button"
          onClick={() => {
            persist({ ...state, ranSplit: true })
            const r = runModel(trainFruits, testFruits, 3)
            announce(S.ttRunAnnounce.replace("{pct}", String(accuracyPercent(r))).replace("{n}", String(r.total)))
          }}
          disabled={!validation.ok}
          className="inline-flex items-center rounded-md bg-avanza-green px-4 py-2 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
        >
          {S.ttTrainThenTest}
        </button>
        {!validation.ok && <p className="mt-2 text-xs text-muted-foreground">{S.ttFixSplit}</p>}
      </div>

      {splitRun && <ModelResults run={splitRun} caption={S.ttResults} />}

      {/* Experiments (Change the Data) */}
      <div className="mt-8 border-t border-border pt-6">
        <h4 className="text-sm font-bold text-foreground">{S.ttExperimentTitle}</h4>
        <p className="mt-1 text-sm text-muted-foreground">
          {S.ttExperimentIntroFull.split("{same}")[0]}
          <strong>{S.ttSameTestFruits}</strong>
          {S.ttExperimentIntroFull.split("{same}")[1]}
        </p>
        <div className="mt-4 space-y-4">
          {experiments(S).map((exp) => (
            <ExperimentPanel
              key={exp.id}
              id={exp.id}
              label={exp.label}
              description={exp.description}
              state={state.experiments[exp.id]}
              loaded={progress.loaded}
              onPredict={(text) =>
                persist({ ...state, experiments: { ...state.experiments, [exp.id]: { ...state.experiments[exp.id], prediction: text } } })
              }
              onRun={() => {
                persist({ ...state, experiments: { ...state.experiments, [exp.id]: { ...state.experiments[exp.id], ran: true } } })
                const r = runExperiment(exp.id, 3)
                announce(S.ttExpRunAnnounce.replace("{label}", exp.label).replace("{pct}", String(accuracyPercent(r))))
              }}
            />
          ))}
        </div>
      </div>

      {/* Accuracy extension (grades 7–8) */}
      <div className="mt-8 border-t border-border pt-6">
        <button
          type="button"
          aria-expanded={state.accuracyOpen}
          onClick={() => persist({ ...state, accuracyOpen: !state.accuracyOpen })}
          className="inline-flex items-center gap-2 rounded-md border border-avanza-purple/40 bg-avanza-purple/5 px-3 py-2 text-sm font-semibold text-avanza-purple-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-purple focus-visible:ring-offset-2"
        >
          {state.accuracyOpen ? S.ttHideMath : S.ttShowMath}
        </button>
        {state.accuracyOpen && <AccuracyExtension run={splitRun ?? runExperiment("balanced", 3)} />}
      </div>

      <p className="mt-6 rounded-md bg-secondary px-3 py-2 text-xs text-muted-foreground">
        {S.ttModelNote.replace("{rule}", S.groundTruthRule)}
      </p>
    </ActivityFrame>
  )
}

function SetSummary({
  title,
  total,
  counts,
  tone,
}: {
  title: string
  total: number
  counts: { safe: number; unsafe: number }
  tone: "green" | "purple"
}) {
  const S = useS()
  return (
    <div className={`rounded-md border p-3 ${tone === "green" ? "border-avanza-green/40 bg-avanza-green/5" : "border-avanza-purple/40 bg-avanza-purple/5"}`}>
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{title}</p>
      <p className="mt-1 text-2xl font-extrabold tabular-nums text-foreground">{total}</p>
      <p className="text-xs text-muted-foreground">
        {S.ttSafeCount} <span className="font-semibold tabular-nums text-foreground">{counts.safe}</span> · {S.ttNotSafeLabel}{" "}
        <span className="font-semibold tabular-nums text-foreground">{counts.unsafe}</span>
      </p>
    </div>
  )
}

function ModelResults({ run, caption }: { run: ModelRun; caption: string }) {
  const S = useS()
  return (
    <div className="mt-4 rounded-md border border-border bg-card p-4" aria-live="polite">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-bold text-foreground">{caption}</p>
        <p className="text-sm">
          <span className="text-muted-foreground">{S.ttOverallAccuracy} </span>
          <span className="text-lg font-extrabold tabular-nums text-foreground">{accuracyPercent(run)}%</span>
          <span className="text-muted-foreground"> ({run.correct}/{run.total})</span>
        </p>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <CountBars
          title={S.ttAccuracyByCategory}
          unit={S.ttPercentUnit}
          bars={[
            { label: S.labelSafeShort, value: run.perCategory.safe.total === 0 ? 0 : Math.round((run.perCategory.safe.correct / run.perCategory.safe.total) * 100), tone: "safe" },
            { label: S.labelUnsafeShort, value: run.perCategory.unsafe.total === 0 ? 0 : Math.round((run.perCategory.unsafe.correct / run.perCategory.unsafe.total) * 100), tone: "unsafe" },
          ]}
        />
        <p className="text-xs text-muted-foreground">
          {S.ttPerCategoryNote
            .replace("{safe}", categoryPercentText(run, "safe", S))
            .replace("{unsafe}", categoryPercentText(run, "unsafe", S))}
        </p>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">{S.ttResultsCaption.replace("{caption}", caption)}</caption>
          <thead>
            <tr className="text-left">
              <th scope="col" className="border-b border-border px-2 py-2 font-semibold text-foreground">{S.ttTestFruit}</th>
              <th scope="col" className="border-b border-border px-2 py-2 font-semibold text-foreground">{S.ttPredicted}</th>
              <th scope="col" className="border-b border-border px-2 py-2 font-semibold text-foreground">{S.ttActual}</th>
              <th scope="col" className="border-b border-border px-2 py-2 font-semibold text-foreground">{S.ttResult}</th>
            </tr>
          </thead>
          <tbody>
            {run.results.map((r) => (
              <tr key={r.fruit.id}>
                <th scope="row" className="border-b border-border/60 px-2 py-2 text-left font-medium text-foreground">
                  {r.fruit.name}
                  <span className="mt-1 block text-xs font-normal text-muted-foreground">{r.prediction.explanation}</span>
                </th>
                <td className="border-b border-border/60 px-2 py-2"><LabelBadge label={r.predicted} /></td>
                <td className="border-b border-border/60 px-2 py-2"><LabelBadge label={r.actual} /></td>
                <td className="border-b border-border/60 px-2 py-2 font-semibold">
                  {r.correct ? (
                    <span className="text-avanza-green-dark">{S.ttCorrect}</span>
                  ) : (
                    <span className="text-avanza-orange-dark">{S.ttWrong}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const BASELINE = runExperiment("balanced", 3)

function ExperimentPanel({
  id,
  label,
  description,
  state,
  loaded,
  onPredict,
  onRun,
}: {
  id: ExperimentId
  label: string
  description: string
  state: ExpState
  loaded: boolean
  onPredict: (text: string) => void
  onRun: () => void
}) {
  const S = useS()
  const run = state.ran ? runExperiment(id, 3) : null
  // Test fruits whose prediction changed from the balanced baseline (what this data change affected).
  const affected =
    run && id !== "balanced"
      ? run.results.filter((r, i) => r.predicted !== BASELINE.results[i].predicted)
      : []

  return (
    <div className="rounded-md border border-border p-4">
      <p className="text-sm font-bold text-foreground">{label}</p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>

      <label htmlFor={`exp-${id}`} className="mt-3 block text-sm font-medium text-foreground">
        {S.ttPredictExperiment}
      </label>
      <textarea
        id={`exp-${id}`}
        key={`exp-${id}:${loaded}`}
        defaultValue={state.prediction}
        onBlur={(e) => onPredict(e.target.value)}
        rows={2}
        className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
        placeholder={id === "balanced" ? S.ttExpPlaceholderBalanced : S.ttExpPlaceholderOther}
      />
      <button
        type="button"
        onClick={onRun}
        disabled={state.prediction.trim().length === 0}
        className="mt-2 inline-flex items-center rounded-md bg-avanza-green px-3 py-1.5 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
      >
        {S.ttRunExperiment}
      </button>
      {state.prediction.trim().length === 0 && <p className="mt-1 text-xs text-muted-foreground">{S.ttWritePredictionFirst}</p>}

      {run && (
        <div className="mt-3 rounded-md bg-secondary px-3 py-3 text-sm" aria-live="polite">
          <p className="font-semibold text-foreground">
            {S.ttExpResult
              .replace("{pct}", String(accuracyPercent(run)))
              .replace("{correct}", String(run.correct))
              .replace("{total}", String(run.total))
              .replace("{safe}", categoryPercentText(run, "safe", S))
              .replace("{unsafe}", categoryPercentText(run, "unsafe", S))}
          </p>
          <p className="mt-1 text-muted-foreground">
            {S.ttYourPrediction} <span className="italic">“{state.prediction}”</span>
          </p>
          <p className="mt-1 text-muted-foreground">
            {id === "balanced"
              ? S.ttBalancedNote
              : id === "unbalanced"
                ? S.ttUnbalancedNoteFull
                : S.ttIncorrectNote}
          </p>
          {affected.length > 0 && (
            <div className="mt-2">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{S.ttFlippedFruit}</p>
              <ul className="mt-1 space-y-1">
                {affected.map((r) => (
                  <li key={r.fruit.id} className="text-xs text-foreground">
                    {S.ttFlippedLine
                      .replace("{name}", (S.fruitNames as Record<string, string>)[r.fruit.name] ?? r.fruit.name)
                      .replace("{predicted}", labelText(r.predicted, S))
                      .replace("{actual}", labelText(r.actual, S))
                      .replace("{status}", r.correct ? S.ttStillCorrect : S.ttNowWrong)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function AccuracyExtension({ run }: { run: ModelRun }) {
  const S = useS()
  const safe = run.perCategory.safe
  const unsafe = run.perCategory.unsafe
  const pct = accuracyPercent(run)
  return (
    <div className="mt-3 rounded-md border border-avanza-purple/30 bg-avanza-purple/5 p-4 text-sm">
      <p className="font-semibold text-foreground">{S.ttAccuracyFormula}</p>
      <ol className="mt-2 list-decimal space-y-1 pl-5 text-foreground/90">
        <li>{S.ttCountCorrect} <span className="font-semibold tabular-nums">{run.correct}</span></li>
        <li>{S.ttCountTotal} <span className="font-semibold tabular-nums">{run.total}</span></li>
        <li>
          {S.ttWriteFraction} <span className="font-semibold tabular-nums">{run.correct}/{run.total}</span>
        </li>
        <li>
          {S.ttConvertPercent} {run.correct} ÷ {run.total} = {run.total === 0 ? "—" : (run.correct / run.total).toFixed(2)} ={" "}
          <span className="font-semibold tabular-nums">{pct}%</span>
        </li>
      </ol>
      <p className="mt-3 text-muted-foreground">
        Now compare with the category results — Safe {safe.correct}/{safe.total} and Not safe {unsafe.correct}/{unsafe.total}. A high overall
        percent can still hide a category the model handles poorly, which is why we look at both.
      </p>
    </div>
  )
}
