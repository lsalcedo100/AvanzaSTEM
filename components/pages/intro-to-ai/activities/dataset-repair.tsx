"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import {
  FLAWED_TRAINING,
  REPAIR_POOL,
  localizeFruits,
  duplicateIds,
  findDuplicateGroups,
  incorrectLabelIds,
  labelCounts,
  labelText,
  repairComparison,
  groundTruthReason,
  type SpaceFruit,
  type SpaceFruitLabel,
} from "@/features/curriculums/intro-to-ai/activities/week2-activities"
import { useLanguage } from "@/components/providers/language-provider"
import type { ActivityComponentProps } from "@/components/pages/intro-to-ai/activity-registry"
import { ActivityFrame } from "@/components/pages/intro-to-ai/activity-frame"
import { FlagChip, FruitDataTable, LabelPicker, type FruitRow } from "@/components/pages/intro-to-ai/activities/week2-shared"

type RepairState = {
  removed: string[]
  labels: Record<string, SpaceFruitLabel>
  added: string[]
  featureNote: string
  checked: boolean
}

function emptyState(): RepairState {
  return { removed: [], labels: {}, added: [], featureNote: "", checked: false }
}

function parseState(raw: string | undefined): RepairState {
  const base = emptyState()
  if (!raw) return base
  try {
    const d = JSON.parse(raw) as Partial<RepairState>
    const labels: Record<string, SpaceFruitLabel> = {}
    if (d.labels && typeof d.labels === "object") {
      for (const [k, v] of Object.entries(d.labels)) if (v === "safe" || v === "unsafe") labels[k] = v
    }
    return {
      removed: Array.isArray(d.removed) ? d.removed.filter((x): x is string => typeof x === "string") : [],
      labels,
      added: Array.isArray(d.added) ? d.added.filter((x): x is string => typeof x === "string") : [],
      featureNote: typeof d.featureNote === "string" ? d.featureNote : "",
      checked: d.checked === true,
    }
  } catch {
    return base
  }
}

export function DatasetRepairActivity({ activity, progress }: ActivityComponentProps) {
  const S = useLanguage().t.courseUi.ai.week2
  const FLAWED = useMemo(() => localizeFruits(FLAWED_TRAINING, S), [S])
  const POOL = useMemo(() => localizeFruits(REPAIR_POOL, S), [S])
  const [state, setState] = useState<RepairState>(emptyState)
  const announceRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (progress.loaded) setState(parseState(progress.progress.activities[activity.id]))
  }, [progress.loaded, progress.progress.activities, activity.id])

  const persist = (next: RepairState) => {
    setState(next)
    progress.saveActivity(activity.id, JSON.stringify(next))
  }
  const announce = (msg: string) => {
    if (announceRef.current) announceRef.current.textContent = msg
  }

  // Current working dataset = flawed rows (minus removed, with label edits) + added pool rows.
  const working: SpaceFruit[] = useMemo(() => {
    const kept = FLAWED.filter((e) => !state.removed.includes(e.id)).map((e) => ({ ...e, label: state.labels[e.id] ?? e.label }))
    const extra = POOL.filter((e) => state.added.includes(e.id)).map((e) => ({ ...e, label: state.labels[e.id] ?? e.label }))
    return [...kept, ...extra]
  }, [state.removed, state.labels, state.added, FLAWED, POOL])

  const dupIds = duplicateIds(working)
  const dupGroups = findDuplicateGroups(working)
  const badLabelIds = incorrectLabelIds(working)
  const counts = labelCounts(working, false)
  const comparison = state.checked ? repairComparison(FLAWED, working, S) : null

  const setLabel = (id: string, label: SpaceFruitLabel | "") => {
    if (!label) return
    persist({ ...state, labels: { ...state.labels, [id]: label }, checked: false })
  }
  const remove = (id: string) => persist({ ...state, removed: [...state.removed, id], checked: false })
  const add = (id: string) => persist({ ...state, added: [...state.added, id], checked: false })

  const dupPartner = (fruit: SpaceFruit): string => {
    const g = dupGroups.find((grp) => grp.ids.includes(fruit.id))
    if (!g) return ""
    return g.ids.filter((x) => x !== fruit.id).map((x) => working.find((w) => w.id === x)?.name ?? x).join(", ")
  }

  const rows: FruitRow[] = working.map((fruit) => {
    const isDup = dupIds.has(fruit.id)
    const isBad = state.checked && badLabelIds.has(fruit.id)
    return {
      fruit,
      highlighted: false,
      flags: (
        <>
          {isDup && <FlagChip tone="warn">{S.wsDuplicateOf.replace("{names}", dupPartner(fruit))}</FlagChip>}
          {isBad && <FlagChip tone="warn">{S.drLabelWrong}</FlagChip>}
        </>
      ),
      controls: (
        <div className="flex flex-wrap items-center gap-2">
          <LabelPicker value={fruit.label ?? ""} onChange={(l) => setLabel(fruit.id, l)} idBase={`rp-${fruit.id}`} />
          <button
            type="button"
            onClick={() => remove(fruit.id)}
            aria-label={S.drRemoveFruit.replace("{name}", fruit.name)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-avanza-orange/60 hover:text-avanza-orange-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-orange focus-visible:ring-offset-1"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      ),
      note:
        isBad ? (
          <span className="block rounded-md bg-avanza-orange/10 px-2 py-1 text-xs text-avanza-orange-dark">
            {S.drAnswerKey.replace("{label}", labelText(fruit.canonicalLabel, S))} {groundTruthReason(fruit.features, S)}
          </span>
        ) : undefined,
    }
  })

  const poolAvailable = POOL.filter((e) => !state.added.includes(e.id))

  return (
    <ActivityFrame
      title={activity.title}
      purpose={activity.goal}
      instructions={[S.drInstr1, S.drInstr2, S.drInstr3]}
      status="ready"
      saveStatus={progress.saveStatus}
      onReset={() => {
        announce(S.drReset)
        persist(emptyState())
      }}
    >
      <p ref={announceRef} className="sr-only" role="status" aria-live="polite" />

      {/* Live health */}
      <div className="mt-4 grid gap-2 rounded-md border border-border bg-secondary/40 p-4 text-sm sm:grid-cols-4">
        <Stat label={S.cmpSize} value={working.length} />
        <Stat label={S.cmpCounts} value={`${counts.safe} / ${counts.unsafe}`} />
        <Stat label={S.cmpDuplicates} value={dupIds.size} warn={dupIds.size > 0} />
        <Stat label={S.cmpIncorrect} value={state.checked ? badLabelIds.size : "?"} warn={state.checked && badLabelIds.size > 0} />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{S.drDetectNote}</p>

      {/* Working table */}
      <div className="mt-4">
        <FruitDataTable
          caption={S.drTableCaption}
          rows={rows}
          controlHeader={S.drLabelRemove}
        />
      </div>

      {/* Add examples for balance */}
      <div className="mt-6 border-t border-border pt-5">
        <h4 className="text-sm font-bold text-foreground">{S.drAddExamples}</h4>
        <p className="mt-1 text-sm text-muted-foreground">{S.drAddIntro}</p>
        {poolAvailable.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">{S.drAllAdded}</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {poolAvailable.map((fruit) => (
              <li key={fruit.id} className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border p-2 text-sm">
                <span className="text-foreground">
                  <span className="font-semibold">{fruit.name}</span>{" "}
                  {S.drPoolLine.replace("{name}", "").replace("{label}", labelText(fruit.canonicalLabel, S))}{" "}
                  <span className="text-muted-foreground">{fruit.description}</span>
                </span>
                <button
                  type="button"
                  onClick={() => add(fruit.id)}
                  className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-semibold text-foreground transition-colors hover:border-avanza-green/60 hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden /> {S.drAdd}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Feature usefulness note */}
      <div className="mt-6">
        <label htmlFor="rp-note" className="block text-sm font-medium text-foreground">
          {S.drWhichFeatures}
        </label>
        <textarea
          id="rp-note"
          key={`rp-note:${progress.loaded}`}
          defaultValue={state.featureNote}
          onBlur={(e) => persist({ ...state, featureNote: e.target.value })}
          rows={2}
          className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
          placeholder={S.drNotesPlaceholder}
        />
      </div>

      {/* Check + re-run */}
      <div className="mt-6 border-t border-border pt-5">
        <button
          type="button"
          onClick={() => {
            persist({ ...state, checked: true })
            const cmp = repairComparison(FLAWED, working, S)
            const overall = cmp.rows.find((r) => r.metric === S.cmpAccuracy)
            announce(
              S.drRerunAnnounce
                .replace("{before}", overall?.before ?? "")
                .replace("{after}", overall?.after ?? ""),
            )
          }}
          className="inline-flex items-center rounded-md bg-avanza-green px-4 py-2 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
        >
          {S.drCheckRerun}
        </button>
      </div>

      {comparison && <Comparison comparison={comparison} />}

      <p className="mt-6 rounded-md bg-secondary px-3 py-2 text-xs text-muted-foreground">
        {S.drRuleNote.replace("{rule}", S.groundTruthRule)}
      </p>
    </ActivityFrame>
  )
}

function Stat({ label, value, warn }: { label: string; value: string | number; warn?: boolean }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={`text-lg font-extrabold tabular-nums ${warn ? "text-avanza-orange-dark" : "text-foreground"}`}>{value}</p>
    </div>
  )
}

function Comparison({ comparison }: { comparison: ReturnType<typeof repairComparison> }) {
  const S = useLanguage().t.courseUi.ai.week2
  const { rows, beforeRun, afterRun } = comparison
  const remainingWrong = afterRun.results.filter((r) => !r.correct)
  return (
    <div className="mt-4 rounded-md border border-border bg-card p-4" aria-live="polite">
      <p className="text-sm font-bold text-foreground">{S.drBeforeAfter}</p>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">{S.drComparisonCaption}</caption>
          <thead>
            <tr className="text-left">
              <th scope="col" className="border-b border-border px-2 py-2 font-semibold text-foreground">{S.drMeasure}</th>
              <th scope="col" className="border-b border-border px-2 py-2 font-semibold text-foreground">{S.drBefore}</th>
              <th scope="col" className="border-b border-border px-2 py-2 font-semibold text-foreground">{S.drAfter}</th>
              <th scope="col" className="border-b border-border px-2 py-2 font-semibold text-foreground">{S.drChange}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.metric}>
                <th scope="row" className="border-b border-border/60 px-2 py-2 text-left font-medium text-foreground">{r.metric}</th>
                <td className="border-b border-border/60 px-2 py-2 tabular-nums text-muted-foreground">{r.before}</td>
                <td className="border-b border-border/60 px-2 py-2 tabular-nums text-foreground">{r.after}</td>
                <td className="border-b border-border/60 px-2 py-2 text-xs font-semibold">
                  {r.improved === null ? (
                    <span className="text-muted-foreground">{S.dash}</span>
                  ) : r.improved ? (
                    <span className="text-avanza-green-dark">{S.drBetter}</span>
                  ) : (
                    <span className="text-muted-foreground">{S.drNoBetter}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        {S.drAccuracyMoved
          .replace("{before}", String(Math.round(beforeRun.accuracy * 100)))
          .replace("{after}", String(Math.round(afterRun.accuracy * 100)))}{" "}
        {remainingWrong.length === 0
          ? S.drAllCorrect
          : S.drStillWrong.replace(
              "{names}",
              remainingWrong.map((r) => (S.fruitNames as Record<string, string>)[r.fruit.name] ?? r.fruit.name).join(", "),
            )}
      </p>
    </div>
  )
}
