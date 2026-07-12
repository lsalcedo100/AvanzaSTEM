"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  WORKSPACE_EXAMPLES,
  SPACE_FRUIT_FEATURES,
  GROUND_TRUTH_RULE,
  groundTruthReason,
  duplicateIds,
  findDuplicateGroups,
  incompleteIds,
  labelCounts,
  featureValueCounts,
  labelText,
  type FeatureKey,
  type SpaceFruit,
  type SpaceFruitLabel,
} from "@/features/curriculums/intro-to-ai-week2-activities"
import type { ActivityComponentProps } from "@/components/pages/intro-to-ai/activity-registry"
import { ActivityFrame } from "@/components/pages/intro-to-ai/activity-frame"
import { CountBars, FlagChip, FruitDataTable, LabelPicker, type FruitRow } from "@/components/pages/intro-to-ai/activities/week2-shared"

type Filter = "all" | "safe" | "unsafe" | "unlabeled" | "flagged"
type WSState = { labels: Record<string, SpaceFruitLabel | ""> }
const EMPTY: WSState = { labels: {} }

function parseState(raw: string | undefined): WSState {
  if (!raw) return EMPTY
  try {
    const d = JSON.parse(raw) as Partial<WSState>
    const labels: Record<string, SpaceFruitLabel | ""> = {}
    if (d.labels && typeof d.labels === "object") {
      for (const [k, v] of Object.entries(d.labels)) if (v === "safe" || v === "unsafe" || v === "") labels[k] = v
    }
    return { labels }
  } catch {
    return EMPTY
  }
}

// Duplicate + missing flags are static (features never change here).
const DUP_IDS = duplicateIds(WORKSPACE_EXAMPLES)
const DUP_GROUPS = findDuplicateGroups(WORKSPACE_EXAMPLES)
const MISSING_IDS = incompleteIds(WORKSPACE_EXAMPLES)

function dupPartnerNames(fruit: SpaceFruit): string {
  const group = DUP_GROUPS.find((g) => g.ids.includes(fruit.id))
  if (!group) return ""
  return group.ids
    .filter((id) => id !== fruit.id)
    .map((id) => WORKSPACE_EXAMPLES.find((e) => e.id === id)?.name ?? id)
    .join(", ")
}

export function DatasetWorkspaceActivity({ activity, progress }: ActivityComponentProps) {
  const [state, setState] = useState<WSState>(EMPTY)
  const [filter, setFilter] = useState<Filter>("all")
  const [sortKey, setSortKey] = useState<FeatureKey | "name">("name")
  const [revealed, setRevealed] = useState(false)
  const announceRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (progress.loaded) setState(parseState(progress.progress.activities[activity.id]))
  }, [progress.loaded, progress.progress.activities, activity.id])

  const persist = (next: WSState) => {
    setState(next)
    progress.saveActivity(activity.id, JSON.stringify(next))
  }

  const setLabel = (id: string, label: SpaceFruitLabel | "") =>
    persist({ labels: { ...state.labels, [id]: label } })

  const labeledFruits: SpaceFruit[] = useMemo(
    () => WORKSPACE_EXAMPLES.map((f) => ({ ...f, label: state.labels[f.id] || undefined })),
    [state.labels],
  )

  const counts = labelCounts(labeledFruits, false)
  const textureCounts = featureValueCounts(WORKSPACE_EXAMPLES, "texture")

  const visible = useMemo(() => {
    let list = labeledFruits
    if (filter === "safe" || filter === "unsafe") list = list.filter((f) => f.label === filter)
    else if (filter === "unlabeled") list = list.filter((f) => !f.label)
    else if (filter === "flagged") list = list.filter((f) => DUP_IDS.has(f.id) || MISSING_IDS.has(f.id))
    const sorted = [...list].sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name)
      const meta = SPACE_FRUIT_FEATURES.find((m) => m.key === sortKey)!
      const av = a.features[sortKey]
      const bv = b.features[sortKey]
      if (meta.type === "number") return (av as number) - (bv as number)
      return String(av).localeCompare(String(bv))
    })
    return sorted
  }, [labeledFruits, filter, sortKey])

  const incompleteCount = MISSING_IDS.size
  const remaining = labeledFruits.filter((f) => !f.label).length

  // After-reveal accuracy against the answer key.
  const revealChecked = revealed ? labeledFruits.filter((f) => f.label) : []
  const revealCorrect = revealChecked.filter((f) => f.label === f.canonicalLabel).length

  const announce = (msg: string) => {
    if (announceRef.current) announceRef.current.textContent = msg
  }

  const rows: FruitRow[] = visible.map((fruit) => {
    const isDup = DUP_IDS.has(fruit.id)
    const isMissing = MISSING_IDS.has(fruit.id)
    const studentLabel = fruit.label
    const mismatched = revealed && studentLabel && studentLabel !== fruit.canonicalLabel
    return {
      fruit,
      flags: (
        <>
          {isDup && <FlagChip tone="warn">Duplicate of {dupPartnerNames(fruit)}</FlagChip>}
          {isMissing && <FlagChip tone="info">Missing {fruit.incomplete?.join(", ")}</FlagChip>}
          {mismatched && <FlagChip tone="warn">Reconsider</FlagChip>}
        </>
      ),
      controls: (
        <LabelPicker value={studentLabel ?? ""} onChange={(l) => setLabel(fruit.id, l)} idBase={`ws-${fruit.id}`} />
      ),
      note:
        revealed && studentLabel ? (
          <span
            className={`block rounded-md px-2 py-1 text-xs ${
              studentLabel === fruit.canonicalLabel
                ? "bg-avanza-green/10 text-avanza-green-dark"
                : "bg-avanza-orange/10 text-avanza-orange-dark"
            }`}
          >
            {studentLabel === fruit.canonicalLabel ? "Matches the answer key. " : `Answer key says ${labelText(fruit.canonicalLabel)}. `}
            {groundTruthReason(fruit.features)}
          </span>
        ) : undefined,
    }
  })

  return (
    <ActivityFrame
      title={activity.title}
      purpose={activity.goal}
      instructions={[
        "Inspect each space fruit's features in the table.",
        "Assign a label — Safe or Not safe — to as many as you can. Watch for duplicate rows and missing values.",
        "Use the filter and sort controls to investigate. Then check your labels against the answer key.",
      ]}
      status="ready"
      saveStatus={progress.saveStatus}
      onReset={() => {
        setRevealed(false)
        setFilter("all")
        setSortKey("name")
        persist(EMPTY)
      }}
    >
      <p ref={announceRef} className="sr-only" role="status" aria-live="polite" />

      {/* Live counts */}
      <div className="mt-4 grid gap-4 rounded-md border border-border bg-secondary/40 p-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Dataset at a glance</p>
          <ul className="mt-2 space-y-0.5 text-sm text-foreground">
            <li>Total examples: <span className="font-semibold tabular-nums">{labeledFruits.length}</span></li>
            <li>Your labels — Safe: <span className="font-semibold tabular-nums">{counts.safe}</span>, Not safe: <span className="font-semibold tabular-nums">{counts.unsafe}</span>, left to do: <span className="font-semibold tabular-nums">{remaining}</span></li>
            <li>Duplicate rows found: <span className="font-semibold tabular-nums">{DUP_IDS.size}</span> · Missing values: <span className="font-semibold tabular-nums">{incompleteCount}</span></li>
          </ul>
        </div>
        <CountBars
          title="Count by texture"
          unit="examples"
          bars={textureCounts.map((c) => ({ label: c.value, value: c.count, tone: "neutral" as const }))}
        />
      </div>

      {(DUP_IDS.size > 0 || incompleteCount > 0) && (
        <div className="mt-3 rounded-md border border-avanza-orange/40 bg-avanza-orange/5 p-3 text-sm text-foreground">
          <p className="font-semibold text-avanza-orange-dark">Heads up before you trust this data:</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5 text-muted-foreground">
            {DUP_IDS.size > 0 && <li>{DUP_IDS.size} rows are duplicates (same features as another row). Counting a fruit twice over-weights it.</li>}
            {incompleteCount > 0 && <li>{incompleteCount} rows have a missing feature value, shown as “—”. A missing value can make a fruit hard to label.</li>}
            <li className="text-xs">Remember: two fruits that are merely similar are not duplicates — only rows with identical features are.</li>
          </ul>
        </div>
      )}

      {/* Filter + sort controls */}
      <div className="mt-5 flex flex-wrap items-end gap-4">
        <div>
          <span className="block text-xs font-bold uppercase tracking-wide text-muted-foreground">Filter</span>
          <div className="mt-1 flex flex-wrap gap-1" role="group" aria-label="Filter examples">
            {(
              [
                ["all", "All"],
                ["safe", "Labeled Safe"],
                ["unsafe", "Labeled Not safe"],
                ["unlabeled", "Unlabeled"],
                ["flagged", "Flagged"],
              ] as [Filter, string][]
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={filter === id}
                onClick={() => {
                  setFilter(id)
                  announce(`Filter: ${label}.`)
                }}
                className={`rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${
                  filter === id ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark" : "border-border text-muted-foreground hover:border-avanza-green/50 hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="ws-sort" className="block text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Sort by
          </label>
          <select
            id="ws-sort"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as FeatureKey | "name")}
            className="mt-1 rounded-md border border-border bg-card px-2 py-1.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
          >
            <option value="name">Fruit name</option>
            {SPACE_FRUIT_FEATURES.map((f) => (
              <option key={f.key} value={f.key}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
        <p className="text-xs text-muted-foreground" aria-live="polite">
          Showing {visible.length} of {labeledFruits.length}
        </p>
      </div>

      {/* Data table */}
      <div className="mt-4">
        <FruitDataTable
          caption="Space fruit dataset. Each row is one example fruit with eight feature columns and a label you assign."
          rows={rows}
          controlHeader="Your label"
        />
        {visible.length === 0 && <p className="mt-3 text-sm text-muted-foreground">No fruits match this filter.</p>}
      </div>

      {/* Reveal / check */}
      <div className="mt-6 border-t border-border pt-5">
        {!revealed ? (
          <>
            <button
              type="button"
              onClick={() => {
                setRevealed(true)
                announce("Answer key revealed. Each labeled fruit now shows whether it matches.")
              }}
              disabled={counts.safe + counts.unsafe === 0}
              className="inline-flex items-center rounded-md bg-avanza-green px-4 py-2 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
            >
              Check my labels against the answer key
            </button>
            <p className="mt-2 text-xs text-muted-foreground">
              Label a few fruits first. The answer key stays hidden until you choose to check — investigate before you reveal.
            </p>
          </>
        ) : (
          <div className="rounded-md bg-secondary px-4 py-3 text-sm" aria-live="polite">
            <p className="font-semibold text-foreground">
              {revealCorrect} of {revealChecked.length} of your labels match the answer key.
            </p>
            <p className="mt-1 text-muted-foreground">
              The classroom rule is: {GROUND_TRUTH_RULE} Because this is a made-up dataset, “correct” means “matches the lesson’s rule,” not a real-world fact.
            </p>
            <button
              type="button"
              onClick={() => setRevealed(false)}
              className="mt-2 rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-avanza-green/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1"
            >
              Hide the answer key
            </button>
          </div>
        )}
      </div>
    </ActivityFrame>
  )
}
