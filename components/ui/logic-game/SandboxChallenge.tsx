"use client"

import { useMemo, useState } from "react"
import { formatLogicText, type LogicGameCopy } from "./copy"
import { evalAgainstTarget } from "./gates"
import { GatePicker } from "./GatePicker"
import { TruthTable } from "./TruthTable"
import { FeedbackPanel, getFeedbackState } from "./FeedbackPanel"
import { ALL_GATES, type GateType, type Level, type TruthRow } from "./types"

const SANDBOX_INPUTS = ["A", "B", "C"]
const SANDBOX_GATES = [
  { id: "g1", inputs: ["A", "B"], arity: 2 as const, options: ALL_GATES },
  { id: "g2", inputs: [{ gate: "g1" }, "C"], arity: 2 as const, options: ALL_GATES },
]

function allRows(): TruthRow[] {
  const rows: TruthRow[] = []
  for (const a of [0, 1]) for (const b of [0, 1]) for (const c of [0, 1]) rows.push({ inputs: [a, b, c], outputs: [0] })
  return rows
}

function valueLabel(value: number, copy: LogicGameCopy): string {
  if (value === 1) return copy.on
  if (value === 0) return copy.off
  return "?"
}

export function SandboxChallenge({ copy }: { copy: LogicGameCopy }) {
  const [targetOutputs, setTargetOutputs] = useState<number[]>(() => Array(8).fill(0))
  const [selections, setSelections] = useState<Record<string, GateType | undefined>>({})

  const level: Level = useMemo(() => {
    const rows = allRows().map((r, i) => ({ ...r, outputs: [targetOutputs[i]] }))
    return {
      id: 10,
      title: copy.sandboxLevelTitle,
      concept: copy.sandboxConcept,
      missionTitle: copy.sandboxMissionTitle,
      missionStory: copy.sandboxMissionStory,
      plainGoal: copy.sandboxPlainGoal,
      behaviorDescription: copy.sandboxBehavior,
      inputs: SANDBOX_INPUTS,
      gates: SANDBOX_GATES,
      outputs: [{ name: "Y", label: copy.sandboxOutputLabel, source: { gate: "g2" } }],
      truthTable: {
        inputNames: { A: copy.sandboxInputA, B: copy.sandboxInputB, C: copy.sandboxInputC },
        outputs: [{ name: "Y", label: copy.sandboxOutputQuestion, onText: copy.sandboxOutputOn, offText: copy.sandboxOutputOff }],
        helperText: copy.sandboxHelper,
      },
      target: rows,
      hints: [],
      successExplanation: copy.sandboxSuccess,
      realWorldConnection: copy.sandboxConnection,
      badge: { id: "boolean-creator", name: copy.sandboxBadgeName, description: copy.sandboxBadgeDescription },
    }
  }, [copy, targetOutputs])

  const results = useMemo(() => evalAgainstTarget(level, selections), [level, selections])
  const allSelected = level.gates.every((g) => selections[g.id])
  const feedbackState = getFeedbackState(allSelected, results)

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1.4fr_1fr] lg:gap-6">
      <div className="flex flex-col gap-4 rounded-3xl bg-white p-5 ring-1 ring-avanza-dark/10 md:p-7">
        <div>
          <h3 className="text-lg font-extrabold text-avanza-dark">{copy.sandboxTitle}</h3>
          <p className="mt-1 text-sm leading-relaxed text-avanza-dark/70">
            {copy.sandboxDesc}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {targetOutputs.map((v, i) => (
            <button
              key={i}
              type="button"
              onClick={() =>
                setTargetOutputs((prev) => prev.map((p, j) => (j === i ? (p ? 0 : 1) : p)))
              }
              aria-label={formatLogicText(copy.sandboxRowAria, { number: i + 1, state: valueLabel(v, copy) })}
              className="flex flex-col items-center gap-1 rounded-xl bg-avanza-dark/5 px-2 py-2 font-mono text-xs"
            >
              <span className="text-avanza-dark/50">{allRows()[i].inputs.map((input) => valueLabel(input, copy)).join(", ")}</span>
              <span className={v ? "font-extrabold text-avanza-green" : "font-extrabold text-avanza-dark/40"}>
                {valueLabel(v, copy)}
              </span>
            </button>
          ))}
        </div>

        <div className="grid gap-3">
          <GatePicker slot={SANDBOX_GATES[0]} selected={selections.g1} onSelect={(g) => setSelections((p) => ({ ...p, g1: g }))} copy={copy} />
          <GatePicker slot={SANDBOX_GATES[1]} selected={selections.g2} onSelect={(g) => setSelections((p) => ({ ...p, g2: g }))} copy={copy} />
        </div>

        <FeedbackPanel state={feedbackState} results={results} copy={copy} />

        <button
          type="button"
          onClick={() => setSelections({})}
          className="inline-flex w-fit items-center gap-1.5 rounded-full bg-avanza-dark/8 px-3 py-1.5 text-xs font-bold text-avanza-dark/70 transition hover:bg-avanza-dark/15"
        >
          {copy.resetGates}
        </button>
      </div>

      <div className="rounded-3xl bg-avanza-dark p-7 text-primary-foreground">
        <TruthTable level={level} selections={selections} results={results} allSelected={allSelected} copy={copy} />
      </div>
    </div>
  )
}
