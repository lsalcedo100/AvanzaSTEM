"use client"

import { useState } from "react"
import type { DebuggingMission, TestRecord } from "@/features/curriculums/robotics"
import { useRoboticsProgress } from "@/components/ui/useRoboticsProgress"

const cellClass =
  "w-full rounded-md border border-border bg-card px-2 py-1.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green disabled:opacity-50"

const textareaClass =
  "mt-2 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green disabled:opacity-50"

/**
 * An editable testing table the student fills in during a trial. Every cell
 * saves the full rows grid through `useRoboticsProgress`, keyed by the record
 * id. Progress loads only after mount, so the server and first client render use
 * the neutral empty state (no hydration mismatch); inputs stay disabled and the
 * editable table is re-keyed on `loaded` so saved values appear once hydrated.
 */
export function RoboticsTestRecord({ record }: { record: TestRecord }) {
  const { loaded, progress, saveTestRecord } = useRoboticsProgress()

  // Seed the table from saved progress (used to initialise the child
  // component's local state; the child is re-keyed on `loaded`).
  const savedRows = progress.testRecords[record.id]?.rows ?? []
  const initialRows: string[][] = Array.from({ length: record.rows }, (_, r) =>
    Array.from({ length: record.columns.length }, (_, c) => savedRows[r]?.[c] ?? ""),
  )

  return (
    <div>
      <h3 className="text-lg font-bold text-foreground">{record.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{record.instructions}</p>
      <p className="mt-2 text-sm text-foreground/90">
        <span className="font-semibold text-foreground">Measure: </span>
        {record.measure}
      </p>
      <TestRecordTable
        key={String(loaded)}
        columns={record.columns}
        rows={record.rows}
        initialRows={initialRows}
        disabled={!loaded}
        onSave={(rows) => saveTestRecord(record.id, rows)}
      />
    </div>
  )
}

/**
 * The editable test table. Owns its own row state (seeded from saved progress)
 * so cell edits never write a ref during render. The parent re-keys it on
 * `loaded`, which re-seeds the state once progress has hydrated. Each edit saves
 * the full rows grid through `onSave`.
 */
function TestRecordTable({
  columns,
  rows,
  initialRows,
  disabled,
  onSave,
}: {
  columns: string[]
  rows: number
  initialRows: string[][]
  disabled: boolean
  onSave: (rows: string[][]) => void
}) {
  const [cells, setCells] = useState<string[][]>(initialRows)

  const updateCell = (r: number, c: number, value: string) => {
    const next = cells.map((row) => [...row])
    if (!next[r]) next[r] = Array.from({ length: columns.length }, () => "")
    next[r][c] = value
    setCells(next)
    onSave(next)
  }

  return (
    <div className="mt-5 overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-secondary">
            {columns.map((col) => (
              <th
                key={col}
                className="border-b border-border px-3 py-2 text-xs font-bold uppercase tracking-wide text-muted-foreground"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, r) => (
            <tr key={r} className="align-top">
              {columns.map((col, c) => (
                <td key={c} className="border-b border-border px-3 py-2">
                  <input
                    type="text"
                    defaultValue={cells[r]?.[c] ?? ""}
                    onBlur={(e) => updateCell(r, c, e.target.value)}
                    disabled={disabled}
                    aria-label={`${col} for trial ${r + 1}`}
                    className={cellClass}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * A find-and-fix debugging mission. Shows the scenario, symptom, and hint, then
 * asks the student to reason about the bug (saved as they type) before revealing
 * the fix and likely causes. The saved textarea is re-keyed on `loaded` so saved
 * text appears once progress has hydrated; it stays disabled until then.
 */
export function RoboticsDebugMission({ mission }: { mission: DebuggingMission }) {
  const { loaded, progress, saveDebugFinding } = useRoboticsProgress()

  const finding = progress.debugFindings[mission.id]
  const saved = loaded && Boolean(finding)

  return (
    <div className="rounded-lg border border-border p-5 md:p-6">
      <h3 className="text-lg font-bold text-foreground">{mission.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{mission.scenario}</p>

      <div className="mt-4 rounded-md border border-border bg-secondary p-4">
        <p className="text-sm text-foreground/90">
          <span className="font-semibold text-foreground">Symptom: </span>
          {mission.symptom}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Hint: </span>
          {mission.hint}
        </p>
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between gap-2">
          <label htmlFor={`debug-${mission.id}`} className="block text-sm font-semibold text-foreground">
            What kind of bug do you think it is, and why?
          </label>
          {saved && (
            <span className="text-xs font-semibold uppercase tracking-wide text-avanza-green-dark">Saved</span>
          )}
        </div>
        <textarea
          key={`${mission.id}:${loaded}`}
          id={`debug-${mission.id}`}
          defaultValue={finding?.revisionMade ?? ""}
          onBlur={(e) =>
            saveDebugFinding(mission.id, {
              bugIdentified: e.target.value.trim().length > 0,
              revisionMade: e.target.value,
            })
          }
          disabled={!loaded}
          rows={3}
          placeholder="Write your thinking..."
          className={textareaClass}
        />
      </div>

      <details className="mt-5 rounded-md border border-border bg-card p-4">
        <summary className="cursor-pointer text-sm font-semibold text-foreground">Show the fix</summary>
        <p className="mt-3 text-sm leading-relaxed text-foreground/90">
          <span className="font-semibold text-foreground">Fix: </span>
          {mission.fix}
        </p>
        {mission.likelyCauses.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Likely causes</p>
            <ol className="mt-2 space-y-1.5">
              {mission.likelyCauses.map((cause, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[1.5rem_1fr] gap-2 text-sm leading-relaxed text-foreground/90"
                >
                  <span className="font-mono text-xs font-semibold text-muted-foreground">{i + 1}</span>
                  <span>{cause}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </details>
    </div>
  )
}
