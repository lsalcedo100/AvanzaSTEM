"use client"

import { useEffect, useRef, useState } from "react"
import {
  topics,
  getTopic,
  trainingPool,
  testSet,
  getImage,
  featuresFor,
  classify,
  compareModels,
  accuracyPercent,
  categoryName,
  edgeCases,
  type ImageRecord,
  type Topic,
  type Evaluation,
} from "@/features/curriculums/intro-to-ai/activities/week3-images"
import type { ActivityComponentProps } from "@/components/pages/intro-to-ai/activity-registry"
import { ActivityFrame } from "@/components/pages/intro-to-ai/activity-frame"
import { CategoryAccuracy, ConfusionMatrix, PixelImage, ResultBadge } from "@/components/pages/intro-to-ai/activities/image-shared"
import { useLanguage } from "@/components/providers/language-provider"

/** The Week 3 wording in the reader's language. */
function useS() {
  return useLanguage().t.courseUi.ai.week3
}

// Weak start: the model has only ever seen circles and squares — never a triangle.
// It therefore misses every triangle until the student adds some.
const FIRST_TRAINING_IDS = ["sh-circle-1", "sh-circle-2", "sh-sq-1", "sh-sq-2"]
// Ids only, so the list is the same in every language.
const ADDABLE_IDS = trainingPool("shapes")
  .map((im) => im.id)
  .filter((id) => !FIRST_TRAINING_IDS.includes(id))
const ADD_LIMIT = 4

type Disposition = "train" | "test" | "neither" | ""
type EdgeEntry = { prediction: string; ran: boolean; disposition: Disposition }
type CIState = {
  edges: Record<string, EdgeEntry>
  added: string[]
  explanation: string
  compared: boolean
}

function emptyState(): CIState {
  return { edges: {}, added: [], explanation: "", compared: false }
}

function parseState(raw: string | undefined): CIState {
  const base = emptyState()
  if (!raw) return base
  try {
    const d = JSON.parse(raw) as Partial<CIState>
    const edges: Record<string, EdgeEntry> = {}
    if (d.edges && typeof d.edges === "object") {
      for (const [k, v] of Object.entries(d.edges as Record<string, Partial<EdgeEntry>>)) {
        edges[k] = {
          prediction: typeof v.prediction === "string" ? v.prediction : "",
          ran: v.ran === true,
          disposition: (["train", "test", "neither", ""] as Disposition[]).includes(v.disposition as Disposition) ? (v.disposition as Disposition) : "",
        }
      }
    }
    return {
      edges,
      added: Array.isArray(d.added) ? d.added.filter((x): x is string => typeof x === "string").slice(0, ADD_LIMIT) : [],
      explanation: typeof d.explanation === "string" ? d.explanation : "",
      compared: d.compared === true,
    }
  } catch {
    return base
  }
}

export function ConfuseImproveActivity({ activity, progress }: ActivityComponentProps) {
  const S = useS()
  const SHAPES = topics(S)[0]
  const SHAPES_TEST = testSet("shapes", S)
  const [state, setState] = useState<CIState>(emptyState)
  const announceRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (progress.loaded) setState(parseState(progress.progress.activities[activity.id]))
  }, [progress.loaded, progress.progress.activities, activity.id])

  const persist = (next: CIState) => {
    setState(next)
    progress.saveActivity(activity.id, JSON.stringify(next))
  }
  const announce = (msg: string) => {
    if (announceRef.current) announceRef.current.textContent = msg
  }

  const improvedTraining = [...FIRST_TRAINING_IDS, ...state.added].map((id) => getImage(id, S)!).filter(Boolean)
  const firstTraining = FIRST_TRAINING_IDS.map((id) => getImage(id, S)!)
  const comparison = state.compared ? compareModels(SHAPES, firstTraining, improvedTraining, SHAPES_TEST, 3) : null

  const setEdge = (id: string, patch: Partial<EdgeEntry>) => {
    const prev: EdgeEntry = state.edges[id] ?? { prediction: "", ran: false, disposition: "" }
    persist({ ...state, edges: { ...state.edges, [id]: { ...prev, ...patch } } })
  }

  const toggleAdd = (id: string) => {
    const has = state.added.includes(id)
    if (!has && state.added.length >= ADD_LIMIT) return
    persist({ ...state, added: has ? state.added.filter((x) => x !== id) : [...state.added, id], compared: false })
  }

  return (
    <ActivityFrame
      title={activity.title}
      purpose={activity.goal}
      instructions={[
        S.ciInstr1,
        S.ciInstr2,
        S.ciInstr3,
      ]}
      status="ready"
      saveStatus={progress.saveStatus}
      onReset={() => {
        announce(S.ciActivityReset)
        persist(emptyState())
      }}
    >
      <p ref={announceRef} className="sr-only" role="status" aria-live="polite" />

      {/* Part 1 — Confuse the model */}
      <h4 className="mt-4 text-sm font-bold text-foreground">{S.ciPart1}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{S.ciPart1Intro}</p>
      <ul className="mt-3 space-y-4">
        {edgeCases(S).map((ec) => {
          const topic = getTopic(ec.topic) as Topic
          const entry = state.edges[ec.id] ?? { prediction: "", ran: false, disposition: "" as Disposition }
          const result = entry.ran ? classify(trainingPool(ec.topic, S), featuresFor(ec), 3) : null
          return (
            <li key={ec.id} className="rounded-md border border-border p-3">
              <div className="flex flex-wrap items-start gap-3">
                <PixelImage spec={ec.spec} alt={ec.description} size={72} />
                <div className="min-w-[12rem] flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{topic.name}:</span> {ec.description}
                  </p>
                  <p className="mt-0.5 text-xs uppercase tracking-wide text-muted-foreground">Edge case: {ec.tag}</p>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <label htmlFor={`pred-${ec.id}`} className="text-xs font-semibold text-muted-foreground">
                      {S.ciYourPrediction}
                    </label>
                    <select
                      id={`pred-${ec.id}`}
                      value={entry.prediction}
                      onChange={(e) => setEdge(ec.id, { prediction: e.target.value })}
                      className="rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
                    >
                      <option value="">{S.ciChoose}</option>
                      {topic.categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        setEdge(ec.id, { ran: true })
                        const r = classify(trainingPool(ec.topic, S), featuresFor(ec), 3)
                        announce(
                          S.ciModelAnnounce
                            .replace("{name}", categoryName(topic, r.predicted))
                            .replace("{tag}", ec.tag),
                        )
                      }}
                      disabled={!entry.prediction}
                      className="rounded-md bg-avanza-green px-3 py-1 text-xs font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1"
                    >
                      {S.ciRunIt}
                    </button>
                  </div>

                  {result && (
                    <div className="mt-2 rounded-md bg-secondary px-3 py-2 text-sm" aria-live="polite">
                      <p>
                        {S.ciModelSaid
                          .replace("{predicted}", categoryName(topic, result.predicted))
                          .replace("{pct}", String(Math.round(result.confidence * 100)))
                          .replace("{actual}", categoryName(topic, ec.label))}{" "}
                        · <ResultBadge correct={result.predicted === ec.label} />
                      </p>
                      <p className="mt-1 text-muted-foreground">
                        {S.ciYouPredicted
                          .replace("{name}", entry.prediction ? categoryName(topic, entry.prediction) : S.ciDash)
                          .replace("{why}", ec.why)}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-muted-foreground">{S.ciShouldBeAdded}</span>
                        {(["train", "test", "neither"] as Disposition[]).map((d) => (
                          <button
                            key={d}
                            type="button"
                            aria-pressed={entry.disposition === d}
                            onClick={() => setEdge(ec.id, { disposition: d })}
                            className={`rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${
                              entry.disposition === d ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark" : "border-border text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {d === "train" ? S.ciTraining : d === "test" ? S.ciTesting : S.ciNeither}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      {/* Part 2 — Improve */}
      <h4 className="mt-8 border-t border-border pt-6 text-sm font-bold text-foreground">{S.ciPart2}</h4>
      <p className="mt-1 text-sm text-muted-foreground">
        The starter model has only ever seen circles and squares — it has never seen a triangle, so it misses every one. Add up to {ADD_LIMIT} more varied pictures
        (try some triangles!) and retrain to see if it improves.
      </p>

      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        Add pictures ({state.added.length}/{ADD_LIMIT} used)
      </p>
      <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {ADDABLE_IDS.map((id) => {
          const im = getImage(id) as ImageRecord
          const on = state.added.includes(id)
          const atLimit = !on && state.added.length >= ADD_LIMIT
          return (
            <button
              key={id}
              type="button"
              aria-pressed={on}
              disabled={atLimit}
              aria-label={S.ciImageAria
                .replace("{name}", categoryName(SHAPES, im.label))
                .replace("{description}", im.description)
                .replace("{state}", on ? S.ciAdded : atLimit ? S.ciAddLimit : S.ciActivateToAdd)}
              onClick={() => toggleAdd(id)}
              className={`flex flex-col items-center gap-1 rounded-md border p-1.5 transition-colors disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${
                on ? "border-avanza-green bg-avanza-green/10" : "border-border hover:border-avanza-green/50"
              }`}
            >
              <PixelImage spec={im.spec} alt="" size={44} />
              <span className="text-[10px] font-semibold text-foreground">{categoryName(SHAPES, im.label)}</span>
              <span className="text-[10px] text-muted-foreground">{on ? "Added" : "Add"}</span>
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => {
          persist({ ...state, compared: true })
          const cmp = compareModels(SHAPES, firstTraining, improvedTraining, SHAPES_TEST, 3)
          announce(`Retrained. Accuracy went from ${accuracyPercent(cmp.first)} to ${accuracyPercent(cmp.improved)} percent.`)
        }}
        disabled={state.added.length === 0}
        className="mt-4 inline-flex items-center rounded-md bg-avanza-green px-4 py-2 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
      >
        {S.ciRetrain}
      </button>
      {state.added.length === 0 && <p className="mt-1 text-xs text-muted-foreground">{S.ciAddAtLeastOne}</p>}

      {comparison && (
        <div className="mt-5 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ModelCard title={S.ciFirstModel} training={firstTraining} evaluation={comparison.first} />
            <ModelCard title={S.ciImprovedModel.replace("{n}", String(state.added.length))} training={improvedTraining} evaluation={comparison.improved} />
          </div>

          <div className="rounded-md border border-border bg-card p-4 text-sm">
            <p className="font-semibold text-foreground">
              {S.ciOverallAccuracy
                .replace("{before}", String(accuracyPercent(comparison.first)))
                .replace("{after}", String(accuracyPercent(comparison.improved)))}{" "}
              <span className={comparison.overallDelta >= 0 ? "text-avanza-green-dark" : "text-avanza-orange-dark"}>
                {S.ciPoints
                  .replace("{sign}", comparison.overallDelta >= 0 ? "+" : "")
                  .replace("{n}", String(Math.round(comparison.overallDelta * 100)))}
              </span>
            </p>
            <p className="mt-1 text-muted-foreground">
              {S.ciFixed
                .replace("{n}", String(comparison.fixed.length))
                .replace("{list}", comparison.fixed.map((id) => getImage(id, S)?.description ?? id).join("; ") || S.ciNone)}
            </p>
            <p className="mt-0.5 text-muted-foreground">
              {S.ciBroke
                .replace("{n}", String(comparison.broke.length))
                .replace("{list}", comparison.broke.map((id) => getImage(id, S)?.description ?? id).join("; ") || S.ciNone)}
            </p>
          </div>

          <div>
            <label htmlFor="ci-explain" className="block text-sm font-semibold text-foreground">
              {S.ciExplain}
            </label>
            <textarea
              id="ci-explain"
              key={`ci-explain:${progress.loaded}`}
              defaultValue={state.explanation}
              onBlur={(e) => persist({ ...state, explanation: e.target.value })}
              rows={2}
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
              placeholder={S.ciExplainPlaceholder}
            />
          </div>
        </div>
      )}
    </ActivityFrame>
  )
}

function ModelCard({ title, training, evaluation }: { title: string; training: ImageRecord[]; evaluation: Evaluation }) {
  const S = useS()
  const SHAPES = topics(S)[0]
  const counts = SHAPES.categories.map((c) => ({ c, n: training.filter((im) => im.label === c.id).length }))
  return (
    <div className="rounded-md border border-border p-3">
      <p className="text-sm font-bold text-foreground">{title}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Training per category: {counts.map(({ c, n }) => `${c.name} ${n}`).join(" · ")}
      </p>
      <p className="mt-1 text-sm">
        {S.ciAccuracy
          .replace("{pct}", String(accuracyPercent(evaluation)))
          .replace("{correct}", String(evaluation.correct))
          .replace("{total}", String(evaluation.total))}
      </p>
      <div className="mt-2">
        <ConfusionMatrix topic={SHAPES} evaluation={evaluation} />
      </div>
      <div className="mt-2">
        <CategoryAccuracy topic={SHAPES} evaluation={evaluation} />
      </div>
    </div>
  )
}
