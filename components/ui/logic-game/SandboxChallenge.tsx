"use client"

import { useMemo, useState } from "react"
import { evalAgainstTarget } from "./gates"
import { GatePicker } from "./GatePicker"
import { TruthTable } from "./TruthTable"
import { FeedbackPanel, getFeedbackState } from "./FeedbackPanel"
import { ALL_GATES, type GateType, type Level, type TruthRow } from "./types"
import { compactSignalList, onOffLabel } from "./valueLabels"

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

export function SandboxChallenge() {
  const [targetOutputs, setTargetOutputs] = useState<number[]>(() => Array(8).fill(0))
  const [selections, setSelections] = useState<Record<string, GateType | undefined>>({})

  const level: Level = useMemo(() => {
    const rows = allRows().map((r, i) => ({ ...r, outputs: [targetOutputs[i]] }))
    return {
      id: 10,
      title: "Level 10: Design Your Own",
      concept: "Any decision can be built from gates.",
      missionTitle: "Boolean Creator Challenge",
      missionStory: "Design your own target table, then build a circuit that matches it.",
      plainGoal: "Choose what each row of the output should be, then wire up gates to match your own design.",
      behaviorDescription: "You decide the rule — the circuit must match whatever target you set.",
      inputs: SANDBOX_INPUTS,
      gates: SANDBOX_GATES,
      outputs: [{ name: "Y", label: "Y (your output)", source: { gate: "g2" } }],
      truthTable: {
        inputNames: { A: "First switch?", B: "Second switch?", C: "Third switch?" },
        outputs: [{ name: "Y", label: "Custom output?", onText: "Output turns on", offText: "Output stays off" }],
        helperText: "Design every switch combination, then see whether your circuit follows your custom rule.",
      },
      target: rows,
      hints: [],
      successExplanation: "You designed a Boolean rule from scratch and built the circuit to match it.",
      realWorldConnection: "Engineers do this exact thing: start from a desired behavior and build the logic to produce it.",
      badge: { id: "boolean-creator", name: "Boolean Creator", description: "Designed a circuit from scratch." },
    }
  }, [targetOutputs])

  const results = useMemo(() => evalAgainstTarget(level, selections), [level, selections])
  const allSelected = level.gates.every((g) => selections[g.id])
  const feedbackState = getFeedbackState(allSelected, results)

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1.4fr_1fr] lg:gap-6">
      <div className="flex flex-col gap-4 rounded-3xl bg-white p-5 ring-1 ring-avanza-dark/10 md:p-7">
        <div>
          <h3 className="text-lg font-extrabold text-avanza-dark">Sandbox: design your own truth table</h3>
          <p className="mt-1 text-sm leading-relaxed text-avanza-dark/70">
            Tap the target outputs below to design your own rule for inputs A, B, and C. Then choose gates to build a
            circuit that matches it.
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
              aria-label={`Row ${i + 1} target output, currently ${onOffLabel(v)}`}
              className="flex flex-col items-center gap-1 rounded-xl bg-avanza-dark/5 px-2 py-2 font-mono text-xs"
            >
              <span className="text-avanza-dark/50">{compactSignalList(allRows()[i].inputs)}</span>
              <span className={v ? "font-extrabold text-avanza-green" : "font-extrabold text-avanza-dark/40"}>
                {onOffLabel(v)}
              </span>
            </button>
          ))}
        </div>

        <div className="grid gap-3">
          <GatePicker slot={SANDBOX_GATES[0]} selected={selections.g1} onSelect={(g) => setSelections((p) => ({ ...p, g1: g }))} />
          <GatePicker slot={SANDBOX_GATES[1]} selected={selections.g2} onSelect={(g) => setSelections((p) => ({ ...p, g2: g }))} />
        </div>

        <FeedbackPanel state={feedbackState} results={results} />

        <button
          type="button"
          onClick={() => setSelections({})}
          className="inline-flex w-fit items-center gap-1.5 rounded-full bg-avanza-dark/8 px-3 py-1.5 text-xs font-bold text-avanza-dark/70 transition hover:bg-avanza-dark/15"
        >
          Reset gates
        </button>
      </div>

      <div className="rounded-3xl bg-avanza-dark p-7 text-primary-foreground">
        <TruthTable level={level} selections={selections} results={results} allSelected={allSelected} />
      </div>
    </div>
  )
}
