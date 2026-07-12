"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  CANONICAL_TRAINING,
  EXPERIMENTS,
  GROUND_TRUTH_RULE,
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
} from "@/features/curriculums/intro-to-ai-week2-activities"
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

  const trainFruits = SPLIT_POOL.filter((e) => state.assignment[e.id] === "train")
  const testFruits = SPLIT_POOL.filter((e) => state.assignment[e.id] === "test")
  const validation = validateSplit(trainFruits, testFruits)
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
      instructions={[
        "Split the 16 fruits into a training set (to learn from) and a testing set (held back to check the model).",
        "Every fruit goes in exactly one set. Keep some of each category in the test set.",
        "Run the model, read its accuracy, then try the three data experiments below.",
      ]}
      status="ready"
      saveStatus={progress.saveStatus}
      onReset={() => {
        announce("Activity reset.")
        persist(emptyState())
      }}
    >
      <p ref={announceRef} className="sr-only" role="status" aria-live="polite" />

      {/* Predict why examples must be hidden */}
      <div className="mt-4 rounded-md border border-avanza-purple/30 bg-avanza-purple/5 p-4">
        <label htmlFor="tt-split-pred" className="block text-sm font-semibold text-foreground">
          Predict first: why must some examples be hidden from training?
        </label>
        <textarea
          id="tt-split-pred"
          key={`tt-split-pred:${progress.loaded}`}
          defaultValue={state.splitPrediction}
          onBlur={(e) => persist({ ...state, splitPrediction: e.target.value })}
          rows={2}
          className="mt-2 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
          placeholder="e.g. If the model is tested on fruit it already studied, it could just repeat memorized answers."
        />
      </div>

      {/* Split controls */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-sm font-bold text-foreground">Assign each fruit</h4>
        <button
          type="button"
          onClick={() => {
            persist({ ...state, assignment: suggestedSplit(), ranSplit: false })
            announce("Reset to a suggested split of 12 training and 4 testing.")
          }}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-avanza-green/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1"
        >
          Use a suggested 12 / 4 split
        </button>
      </div>

      {/* Set summaries */}
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <SetSummary title="Training set" total={trainFruits.length} counts={trainCounts} tone="green" />
        <SetSummary title="Testing set (held back)" total={testFruits.length} counts={testCounts} tone="purple" />
      </div>

      {/* Assignment table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">
            Sixteen space fruits. For each, a toggle assigns it to the training set or the testing set, and its correct label is shown.
          </caption>
          <thead>
            <tr className="text-left">
              <th scope="col" className="border-b border-border px-2 py-2 font-semibold text-foreground">Fruit</th>
              <th scope="col" className="border-b border-border px-2 py-2 font-semibold text-foreground">Correct label</th>
              <th scope="col" className="border-b border-border px-2 py-2 font-semibold text-foreground">In which set?</th>
            </tr>
          </thead>
          <tbody>
            {SPLIT_POOL.map((fruit) => {
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
                      aria-label={`${fruit.name} is in the ${set === "train" ? "training" : "testing"} set. Activate to move it to the ${set === "train" ? "testing" : "training"} set.`}
                      className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${
                        set === "train"
                          ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark"
                          : "border-avanza-purple bg-avanza-purple/10 text-avanza-purple-dark"
                      }`}
                    >
                      {set === "train" ? "Training" : "Testing"} · switch
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
            <p key={`w${i}`} className="text-muted-foreground">Note: {w}</p>
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
            announce(`Model run complete. Accuracy ${accuracyPercent(r)} percent on ${r.total} test fruits.`)
          }}
          disabled={!validation.ok}
          className="inline-flex items-center rounded-md bg-avanza-green px-4 py-2 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
        >
          Train on the training set, then test
        </button>
        {!validation.ok && <p className="mt-2 text-xs text-muted-foreground">Fix the split problems above to run a fair test.</p>}
      </div>

      {splitRun && <ModelResults run={splitRun} caption="Results on your held-back testing set" />}

      {/* Experiments (Change the Data) */}
      <div className="mt-8 border-t border-border pt-6">
        <h4 className="text-sm font-bold text-foreground">Experiment: change the data, keep the test the same</h4>
        <p className="mt-1 text-sm text-muted-foreground">
          Each experiment trains on a different version of the data and is checked on the <strong>same 8 held-back test fruits</strong>. Predict what will
          happen, then run it.
        </p>
        <div className="mt-4 space-y-4">
          {EXPERIMENTS.map((exp) => (
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
                announce(`${exp.label} run complete. Accuracy ${accuracyPercent(r)} percent.`)
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
          {state.accuracyOpen ? "Hide" : "Show"} the accuracy math (grades 7–8, optional)
        </button>
        {state.accuracyOpen && <AccuracyExtension run={splitRun ?? runExperiment("balanced", 3)} />}
      </div>

      <p className="mt-6 rounded-md bg-secondary px-3 py-2 text-xs text-muted-foreground">
        This is a simplified classroom model (k-nearest neighbors). It compares a new fruit to the most similar training fruits and copies the
        most common label. Real AI systems are far larger — but the same ideas about good data still apply. The made-up rule is: {GROUND_TRUTH_RULE}
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
  return (
    <div className={`rounded-md border p-3 ${tone === "green" ? "border-avanza-green/40 bg-avanza-green/5" : "border-avanza-purple/40 bg-avanza-purple/5"}`}>
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{title}</p>
      <p className="mt-1 text-2xl font-extrabold tabular-nums text-foreground">{total}</p>
      <p className="text-xs text-muted-foreground">
        Safe: <span className="font-semibold tabular-nums text-foreground">{counts.safe}</span> · Not safe:{" "}
        <span className="font-semibold tabular-nums text-foreground">{counts.unsafe}</span>
      </p>
    </div>
  )
}

function ModelResults({ run, caption }: { run: ModelRun; caption: string }) {
  return (
    <div className="mt-4 rounded-md border border-border bg-card p-4" aria-live="polite">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-bold text-foreground">{caption}</p>
        <p className="text-sm">
          <span className="text-muted-foreground">Overall accuracy: </span>
          <span className="text-lg font-extrabold tabular-nums text-foreground">{accuracyPercent(run)}%</span>
          <span className="text-muted-foreground"> ({run.correct}/{run.total})</span>
        </p>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <CountBars
          title="Accuracy by category"
          unit="percent"
          bars={[
            { label: "Safe", value: run.perCategory.safe.total === 0 ? 0 : Math.round((run.perCategory.safe.correct / run.perCategory.safe.total) * 100), tone: "safe" },
            { label: "Not safe", value: run.perCategory.unsafe.total === 0 ? 0 : Math.round((run.perCategory.unsafe.correct / run.perCategory.unsafe.total) * 100), tone: "unsafe" },
          ]}
        />
        <p className="text-xs text-muted-foreground">
          Safe: {categoryPercentText(run, "safe")} · Not safe: {categoryPercentText(run, "unsafe")}. Overall accuracy alone can hide a weak
          category — always read the per-category results too.
        </p>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">{caption}: each test fruit&apos;s predicted label, actual label, whether it was correct, and why.</caption>
          <thead>
            <tr className="text-left">
              <th scope="col" className="border-b border-border px-2 py-2 font-semibold text-foreground">Test fruit</th>
              <th scope="col" className="border-b border-border px-2 py-2 font-semibold text-foreground">Predicted</th>
              <th scope="col" className="border-b border-border px-2 py-2 font-semibold text-foreground">Actual</th>
              <th scope="col" className="border-b border-border px-2 py-2 font-semibold text-foreground">Result</th>
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
                    <span className="text-avanza-green-dark">Correct ✓</span>
                  ) : (
                    <span className="text-avanza-orange-dark">Wrong ✕</span>
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
        Predict: how will accuracy compare to the balanced data, and why?
      </label>
      <textarea
        id={`exp-${id}`}
        key={`exp-${id}:${loaded}`}
        defaultValue={state.prediction}
        onBlur={(e) => onPredict(e.target.value)}
        rows={2}
        className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
        placeholder={id === "balanced" ? "e.g. This is the fair baseline, so it should do well." : "e.g. Fewer Not-safe examples means the model will miss Not-safe fruit."}
      />
      <button
        type="button"
        onClick={onRun}
        disabled={state.prediction.trim().length === 0}
        className="mt-2 inline-flex items-center rounded-md bg-avanza-green px-3 py-1.5 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
      >
        Run this experiment
      </button>
      {state.prediction.trim().length === 0 && <p className="mt-1 text-xs text-muted-foreground">Write a prediction first.</p>}

      {run && (
        <div className="mt-3 rounded-md bg-secondary px-3 py-3 text-sm" aria-live="polite">
          <p className="font-semibold text-foreground">
            Result: {accuracyPercent(run)}% overall ({run.correct}/{run.total}). Safe {categoryPercentText(run, "safe")} · Not safe{" "}
            {categoryPercentText(run, "unsafe")}.
          </p>
          <p className="mt-1 text-muted-foreground">
            Your prediction: <span className="italic">“{state.prediction}”</span>
          </p>
          <p className="mt-1 text-muted-foreground">
            {id === "balanced"
              ? "With balanced, correct data the model learns both categories and generalizes well."
              : id === "unbalanced"
                ? "Because the Not-safe category had very few examples, the model rarely predicts Not safe — so its mistakes land on Not-safe test fruit. That is why overall accuracy can look okay while one category collapses."
                : "The flipped labels taught the model a false pattern near those fruits, so nearby test fruit get the wrong label."}
          </p>
          {affected.length > 0 && (
            <div className="mt-2">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Test fruit this change flipped</p>
              <ul className="mt-1 space-y-1">
                {affected.map((r) => (
                  <li key={r.fruit.id} className="text-xs text-foreground">
                    <span className="font-semibold">{r.fruit.name}</span>: now predicted {labelText(r.predicted)}, actually {labelText(r.actual)}{" "}
                    {r.correct ? "(still correct)" : "(now wrong)"}
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
  const safe = run.perCategory.safe
  const unsafe = run.perCategory.unsafe
  const pct = accuracyPercent(run)
  return (
    <div className="mt-3 rounded-md border border-avanza-purple/30 bg-avanza-purple/5 p-4 text-sm">
      <p className="font-semibold text-foreground">accuracy = correct predictions ÷ total predictions</p>
      <ol className="mt-2 list-decimal space-y-1 pl-5 text-foreground/90">
        <li>Count the correct predictions: <span className="font-semibold tabular-nums">{run.correct}</span></li>
        <li>Count the total predictions: <span className="font-semibold tabular-nums">{run.total}</span></li>
        <li>
          Write the fraction: <span className="font-semibold tabular-nums">{run.correct}/{run.total}</span>
        </li>
        <li>
          Convert to a percent: {run.correct} ÷ {run.total} = {run.total === 0 ? "—" : (run.correct / run.total).toFixed(2)} ={" "}
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
