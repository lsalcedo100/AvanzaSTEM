"use client"

import { useEffect, useRef, useState } from "react"
import {
  topics,
  getTopic,
  trainingPool,
  testSet,
  featuresFor,
  evaluate,
  validateTraining,
  accuracyPercent,
  binaryOutcome,
  categoryName,
  explainResult,
  type Evaluation,
  type ImageRecord,
  type Topic,
  type TopicId,
} from "@/features/curriculums/intro-to-ai/activities/week3-images"
import { useLanguage } from "@/components/providers/language-provider"

/** The Week 3 wording in the reader's language. */
function useS() {
  return useLanguage().t.courseUi.ai.week3
}
import type { ActivityComponentProps } from "@/components/pages/intro-to-ai/activity-registry"
import { ActivityFrame } from "@/components/pages/intro-to-ai/activity-frame"
import {
  CategoryAccuracy,
  ConfidenceBars,
  ConfusionMatrix,
  PixelImage,
  ResultBadge,
} from "@/components/pages/intro-to-ai/activities/image-shared"

type LabState = {
  topic: TopicId
  training: Partial<Record<TopicId, string[]>>
  prediction: string
  focus: string
}

type TrainState = "idle" | "preparing" | "computing" | "building" | "ready" | "error"

function defaultTraining(topic: TopicId): string[] {
  return trainingPool(topic).map((im) => im.id)
}

function emptyState(): LabState {
  return { topic: "shapes", training: {}, prediction: "", focus: "" }
}

function parseState(raw: string | undefined): LabState {
  const base = emptyState()
  if (!raw) return base
  try {
    const d = JSON.parse(raw) as Partial<LabState>
    const training: Partial<Record<TopicId, string[]>> = {}
    if (d.training && typeof d.training === "object") {
      for (const t of topics()) {
        const arr = (d.training as Record<string, unknown>)[t.id]
        if (Array.isArray(arr)) training[t.id] = arr.filter((x): x is string => typeof x === "string")
      }
    }
    return {
      topic: topics().some((t) => t.id === d.topic) ? (d.topic as TopicId) : "shapes",
      training,
      prediction: typeof d.prediction === "string" ? d.prediction : "",
      focus: typeof d.focus === "string" ? d.focus : "",
    }
  } catch {
    return base
  }
}

function nextFrame(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof requestAnimationFrame === "function") requestAnimationFrame(() => resolve())
    else resolve()
  })
}

export function ImageClassifierLabActivity({ activity, progress }: ActivityComponentProps) {
  const S = useS()
  const [state, setState] = useState<LabState>(emptyState)
  const [trainState, setTrainState] = useState<TrainState>("idle")
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null)
  const announceRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (progress.loaded) setState(parseState(progress.progress.activities[activity.id]))
  }, [progress.loaded, progress.progress.activities, activity.id])

  const persist = (next: LabState) => {
    setState(next)
    progress.saveActivity(activity.id, JSON.stringify(next))
  }
  const announce = (msg: string) => {
    if (announceRef.current) announceRef.current.textContent = msg
  }

  const topic = getTopic(state.topic, S) as Topic
  const pool = trainingPool(topic.id, S)
  const test = testSet(topic.id, S)
  const focus = state.focus || topic.categories[0].id
  const selectedIds = state.training[topic.id] ?? defaultTraining(topic.id)
  const trainingImages = pool.filter((im) => selectedIds.includes(im.id))
  const validation = validateTraining(topic, trainingImages, test, S)
  const counts = topic.categories.map((c) => ({ c, n: trainingImages.filter((im) => im.label === c.id).length }))

  const setTopic = (t: TopicId) => {
    setEvaluation(null)
    setTrainState("idle")
    persist({ ...state, topic: t })
    announce(S.lbTopicAnnounce.replace("{name}", getTopic(t, S)!.name))
  }
  const toggleImage = (id: string) => {
    setEvaluation(null)
    setTrainState("idle")
    const next = selectedIds.includes(id) ? selectedIds.filter((x) => x !== id) : [...selectedIds, id]
    persist({ ...state, training: { ...state.training, [topic.id]: next } })
  }

  const train = async () => {
    if (!validation.ok) return
    try {
      setEvaluation(null)
      setTrainState("preparing")
      await nextFrame()
      setTrainState("computing")
      for (const im of [...trainingImages, ...test]) featuresFor(im) // real feature computation
      await nextFrame()
      setTrainState("building")
      const ev = evaluate(topic, trainingImages, test, 3)
      await nextFrame()
      setEvaluation(ev)
      setTrainState("ready")
      announce(`Training complete. Accuracy ${accuracyPercent(ev)} percent on ${ev.total} unseen pictures.`)
    } catch {
      setTrainState("error")
    }
  }

  const fpCount = evaluation ? evaluation.results.filter((r) => binaryOutcome(r.actual, r.predicted, focus) === "false-positive").length : 0
  const fnCount = evaluation ? evaluation.results.filter((r) => binaryOutcome(r.actual, r.predicted, focus) === "false-negative").length : 0

  return (
    <ActivityFrame
      title={activity.title}
      purpose={activity.goal}
      instructions={[
        S.lbInstr1,
        S.lbInstr2,
        S.lbInstr3,
      ]}
      status="ready"
      saveStatus={progress.saveStatus}
    >
      <p ref={announceRef} className="sr-only" role="status" aria-live="polite" />

      {/* Topic */}
      <fieldset className="mt-4">
        <legend className="text-sm font-bold text-foreground">{S.lbStep1}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {topics(S).map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={t.id === topic.id}
              onClick={() => setTopic(t.id)}
              className={`rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${
                t.id === topic.id ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark" : "border-border text-muted-foreground hover:border-avanza-green/50 hover:text-foreground"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Category definitions */}
      <div className="mt-4 rounded-md border border-border bg-secondary/40 p-3">
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{S.lbStep2}</p>
        <dl className="mt-1 grid gap-x-4 gap-y-1 sm:grid-cols-3">
          {topic.categories.map((c) => (
            <div key={c.id} className="text-sm">
              <dt className="font-semibold text-foreground">{c.name}</dt>
              <dd className="text-muted-foreground">{c.definition}</dd>
            </div>
          ))}
        </dl>
        {topic.note && <p className="mt-2 text-xs italic text-avanza-orange-dark">{topic.note}</p>}
      </div>

      {/* Training selection */}
      <fieldset className="mt-5">
        <legend className="text-sm font-bold text-foreground">{S.lbStep3}</legend>
        <p className="mt-1 text-xs text-muted-foreground">{S.lbSelectedNote}</p>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {pool.map((im) => {
            const on = selectedIds.includes(im.id)
            return (
              <button
                key={im.id}
                type="button"
                aria-pressed={on}
                aria-label={S.lbImageAria
                  .replace("{name}", categoryName(topic, im.label))
                  .replace("{description}", im.description)
                  .replace("{state}", on ? S.lbInTraining : S.lbNotInTraining)}
                onClick={() => toggleImage(im.id)}
                className={`flex flex-col items-center gap-1 rounded-md border p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${
                  on ? "border-avanza-green bg-avanza-green/10" : "border-border opacity-60 hover:opacity-100"
                }`}
              >
                <PixelImage spec={im.spec} alt="" size={48} />
                <span className="text-[10px] font-semibold text-foreground">{categoryName(topic, im.label)}</span>
                <span className="text-[10px] text-muted-foreground">{on ? "In" : "Out"}</span>
              </button>
            )
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{S.lbPerCategory}</span>
          {counts.map(({ c, n }) => (
            <span key={c.id} className={n === 0 ? "text-avanza-orange-dark" : "text-foreground"}>
              {c.name}: <span className="font-semibold tabular-nums">{n}</span>
            </span>
          ))}
        </div>
      </fieldset>

      {/* Validation */}
      {(validation.errors.length > 0 || validation.warnings.length > 0) && (
        <div className={`mt-3 rounded-md border p-3 text-sm ${validation.errors.length > 0 ? "border-avanza-orange/50 bg-avanza-orange/10" : "border-border bg-secondary"}`} role={validation.errors.length > 0 ? "alert" : "status"}>
          {validation.errors.map((e, i) => (
            <p key={`e${i}`} className="text-avanza-orange-dark">⚠ {e}</p>
          ))}
          {validation.warnings.map((w, i) => (
            <p key={`w${i}`} className="text-muted-foreground">Note: {w}</p>
          ))}
        </div>
      )}

      {/* Predict + train */}
      <div className="mt-5 rounded-md border border-avanza-purple/30 bg-avanza-purple/5 p-4">
        <label htmlFor="lab-pred" className="block text-sm font-semibold text-foreground">
          {S.lbStep4}
        </label>
        <textarea
          id="lab-pred"
          key={`lab-pred:${progress.loaded}:${topic.id}`}
          defaultValue={state.prediction}
          onBlur={(e) => persist({ ...state, prediction: e.target.value })}
          rows={2}
          className="mt-2 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
          placeholder={S.lbPredictPlaceholder}
        />
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={train}
          disabled={!validation.ok || trainState === "preparing" || trainState === "computing" || trainState === "building"}
          className="inline-flex items-center rounded-md bg-avanza-green px-4 py-2 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
        >
          {S.lbStep5}
        </button>
        <TrainStatus state={trainState} onRetry={train} />
      </div>

      {/* Results */}
      {evaluation && trainState === "ready" && (
        <div className="mt-6 space-y-6">
          <div className="rounded-md border border-border bg-card p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm font-bold text-foreground">{S.lbResultsOn.replace("{n}", String(evaluation.total))}</p>
              <p className="text-sm">
                <span className="text-muted-foreground">{S.lbOverallAccuracy} </span>
                <span className="text-lg font-extrabold tabular-nums text-foreground">{accuracyPercent(evaluation)}%</span>
                <span className="text-muted-foreground"> ({evaluation.correct}/{evaluation.total})</span>
              </p>
            </div>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <ConfusionMatrix topic={topic} evaluation={evaluation} />
              <CategoryAccuracy topic={topic} evaluation={evaluation} />
            </div>
          </div>

          {/* False positive / negative focus */}
          <div className="rounded-md border border-border p-4">
            <div className="flex flex-wrap items-center gap-2">
              <label htmlFor="lab-focus" className="text-sm font-semibold text-foreground">
                {S.lbFpFnFor}
              </label>
              <select
                id="lab-focus"
                value={focus}
                onChange={(e) => persist({ ...state, focus: e.target.value })}
                className="rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
              >
                {topic.categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {S.lbFpLine.replace("{n}", String(fpCount)).replace("{name}", categoryName(topic, focus))} ·{" "}
              {S.lbFnLine.replace("{n}", String(fnCount)).replace("{name}", categoryName(topic, focus))}
            </p>
          </div>

          {/* Per-image review */}
          <div>
            <p className="text-sm font-bold text-foreground">{S.lbEveryTestPicture}</p>
            <ul className="mt-3 space-y-3">
              {evaluation.results.map((r) => {
                const outcome = binaryOutcome(r.actual, r.predicted, focus)
                return (
                  <li key={r.image.id} className="flex flex-wrap items-start gap-3 rounded-md border border-border p-3">
                    <PixelImage spec={r.image.spec} alt={r.image.description} size={72} />
                    <div className="min-w-[12rem] flex-1 text-sm">
                      <p className="text-muted-foreground">{r.image.description}</p>
                      <p className="mt-1">
                        {S.lbPredictedWord} <span className="font-semibold text-foreground">{categoryName(topic, r.predicted)}</span> · {S.lbActualWord}{" "}
                        <span className="font-semibold text-foreground">{categoryName(topic, r.actual)}</span> ·{" "}
                        {S.lbConfidenceWord.replace("{pct}", String(Math.round(r.confidence * 100)))} ·{" "}
                        <ResultBadge correct={r.correct} />
                      </p>
                      {(outcome === "false-positive" || outcome === "false-negative") && (
                        <p className="mt-0.5 text-xs font-semibold text-avanza-orange-dark">
                          {(outcome === "false-positive" ? S.lbFalsePositive : S.lbFalseNegative).replace(
                            "{name}",
                            categoryName(topic, focus),
                          )}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-muted-foreground">{explainResult(topic, r.result, S)}</p>
                    </div>
                    <div className="w-full sm:w-48">
                      <ConfidenceBars topic={topic} result={r.result} />
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}

      <p className="mt-6 rounded-md bg-secondary px-3 py-2 text-xs text-muted-foreground">{S.lbModelNote}</p>
    </ActivityFrame>
  )
}

function TrainStatus({ state, onRetry }: { state: TrainState; onRetry: () => void }) {
  const S = useS()
  if (state === "idle" || state === "ready") return null
  const text: Record<Exclude<TrainState, "idle" | "ready">, string> = {
    preparing: S.lbPreparing,
    computing: S.lbComputing,
    building: S.lbBuilding,
    error: S.lbTrainError,
  }
  return (
    <p className="mt-2 inline-flex items-center gap-2 text-sm" aria-live="polite">
      {state === "error" ? (
        <>
          <span className="text-avanza-orange-dark">{text.error}</span>
          <button type="button" onClick={onRetry} className="rounded-md border border-border px-2 py-0.5 text-xs font-semibold text-foreground hover:border-avanza-green/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1">
            {S.lbTryAgain}
          </button>
        </>
      ) : (
        <span className="text-muted-foreground">{text[state]}</span>
      )}
    </p>
  )
}
