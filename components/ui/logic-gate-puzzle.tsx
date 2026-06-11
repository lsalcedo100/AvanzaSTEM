"use client"

import { useEffect, useMemo, useState } from "react"
import { Cpu, RotateCcw, Sparkles } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { cn } from "@/lib/utils"

type GateType = "AND" | "OR" | "NOT" | "XOR" | "NAND" | "NOR"
const ALL_GATES: GateType[] = ["AND", "OR", "NOT", "XOR", "NAND", "NOR"]

function evalGate(type: GateType, a: number, b: number): number {
  switch (type) {
    case "AND":
      return a & b
    case "OR":
      return a | b
    case "NOT":
      return a ? 0 : 1
    case "XOR":
      return a ^ b
    case "NAND":
      return a & b ? 0 : 1
    case "NOR":
      return a | b ? 0 : 1
  }
}

type GateSlot = {
  id: string
  // Each input is either an "input variable" name (A, B) or a previous gate's id
  inputs: Array<string | { gate: string }>
  // Allowed gate types for this slot
  options: GateType[]
}

type Level = {
  id: number
  inputs: string[] // e.g., ["A", "B"]
  gates: GateSlot[]
  outputs: Array<{ name: string; source: string | { gate: string } }>
  // Target output value(s) per input row
  target: Array<{ inputs: number[]; outputs: number[] }>
  hint: string
}

function buildLevels(t: ReturnType<typeof useLanguage>["t"]): Level[] {
  const allTwoInput = (cb: (a: number, b: number) => number[]) => {
    const rows = []
    for (const a of [0, 1]) {
      for (const b of [0, 1]) {
        rows.push({ inputs: [a, b], outputs: cb(a, b) })
      }
    }
    return rows
  }
  return [
    {
      id: 1,
      inputs: ["A", "B"],
      gates: [
        {
          id: "g1",
          inputs: ["A", "B"],
          options: ["AND", "OR", "XOR", "NAND", "NOR"],
        },
      ],
      outputs: [{ name: "Y", source: { gate: "g1" } }],
      target: allTwoInput((a, b) => [a & b]),
      hint: t.gamesPage.logicHint1,
    },
    {
      id: 2,
      inputs: ["A", "B"],
      gates: [
        {
          id: "g1",
          inputs: ["A", "B"],
          options: ["AND", "OR", "XOR", "NAND", "NOR"],
        },
      ],
      outputs: [{ name: "Y", source: { gate: "g1" } }],
      target: allTwoInput((a, b) => [a | b]),
      hint: t.gamesPage.logicHint2,
    },
    {
      id: 3,
      inputs: ["A", "B"],
      gates: [
        {
          id: "g1",
          inputs: ["A", "B"],
          options: ["AND", "OR", "XOR", "NAND", "NOR"],
        },
      ],
      outputs: [{ name: "Y", source: { gate: "g1" } }],
      target: allTwoInput((a, b) => [a ^ b]),
      hint: t.gamesPage.logicHint3,
    },
    {
      id: 4,
      inputs: ["A", "B"],
      gates: [
        {
          id: "g1",
          inputs: ["A", "B"],
          options: ["AND", "OR", "XOR", "NAND", "NOR"],
        },
        {
          id: "g2",
          inputs: [{ gate: "g1" }, { gate: "g1" }],
          // Single-input form: NOT (we'll treat the second input as ignored)
          options: ["NOT"],
        },
      ],
      outputs: [{ name: "Y", source: { gate: "g2" } }],
      target: allTwoInput((a, b) => [(a & b) ? 0 : 1]),
      hint: t.gamesPage.logicHint4,
    },
    {
      id: 5,
      inputs: ["A", "B"],
      gates: [
        {
          id: "g1",
          inputs: ["A", "B"],
          options: ["AND", "OR", "XOR", "NAND", "NOR"],
        },
        {
          id: "g2",
          inputs: ["A", "B"],
          options: ["AND", "OR", "XOR", "NAND", "NOR"],
        },
      ],
      outputs: [
        { name: "S", source: { gate: "g1" } },
        { name: "C", source: { gate: "g2" } },
      ],
      target: allTwoInput((a, b) => [a ^ b, a & b]),
      hint: t.gamesPage.logicHint5,
    },
  ]
}

function evalCircuit(
  level: Level,
  inputValues: Record<string, number>,
  selections: Record<string, GateType>,
): Record<string, number> {
  const gateValues: Record<string, number> = {}
  for (const g of level.gates) {
    const type = selections[g.id]
    if (!type) {
      gateValues[g.id] = -1 // unselected = unknown
      continue
    }
    const resolved = g.inputs.map((inp) => {
      if (typeof inp === "string") return inputValues[inp] ?? 0
      return gateValues[inp.gate] ?? 0
    })
    const a = resolved[0] ?? 0
    const b = resolved[1] ?? 0
    gateValues[g.id] = evalGate(type, a, b)
  }
  const outputs: Record<string, number> = {}
  for (const out of level.outputs) {
    if (typeof out.source === "string") {
      outputs[out.name] = inputValues[out.source] ?? 0
    } else {
      outputs[out.name] = gateValues[out.source.gate] ?? -1
    }
  }
  return outputs
}

export function LogicGatePuzzle() {
  const { t } = useLanguage()
  const levels = useMemo(() => buildLevels(t), [t])
  const [levelIdx, setLevelIdx] = useState(0)
  const level = levels[levelIdx]
  const [selections, setSelections] = useState<Record<string, GateType>>({})
  const [inputs, setInputs] = useState<Record<string, number>>({})

  // Reset state on level change
  useEffect(() => {
    setSelections({})
    const initial: Record<string, number> = {}
    for (const inp of level.inputs) initial[inp] = 0
    setInputs(initial)
  }, [levelIdx, level.inputs])

  const currentOutputs = useMemo(
    () => evalCircuit(level, inputs, selections),
    [level, inputs, selections],
  )

  const allSelected = level.gates.every((g) => selections[g.id])

  // Verify against full target table
  const tableResults = useMemo(() => {
    return level.target.map((row) => {
      const inMap: Record<string, number> = {}
      for (let i = 0; i < level.inputs.length; i++) {
        inMap[level.inputs[i]] = row.inputs[i]
      }
      const outs = evalCircuit(level, inMap, selections)
      const expected = row.outputs
      const got = level.outputs.map((o) => outs[o.name])
      const matches = expected.every((e, i) => got[i] === e)
      return { row, expected, got, matches }
    })
  }, [level, selections])

  const allMatch = allSelected && tableResults.every((r) => r.matches)

  return (
    <section className="relative overflow-hidden bg-[#f7f0ff] py-20 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(139,92,246,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,92,246,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-avanza-dark">
            <Cpu className="h-3.5 w-3.5 text-avanza-purple" />
            {t.gamesPage.logicEyebrow}
          </span>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            {t.gamesPage.logicTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.gamesPage.logicDesc}
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* Circuit visualization */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(-0.5deg)]"
              />
              <div className="relative flex flex-col gap-4 overflow-hidden rounded-3xl bg-white p-5 shadow-[0_28px_64px_-30px_rgba(26,26,46,0.35)] ring-1 ring-avanza-dark/10 md:p-7">
                {/* Level picker */}
                <div className="flex flex-wrap items-center gap-2">
                  {levels.map((lv, i) => (
                    <button
                      key={lv.id}
                      type="button"
                      onClick={() => setLevelIdx(i)}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider transition",
                        i === levelIdx
                          ? "bg-avanza-purple text-white"
                          : "bg-avanza-dark/8 text-avanza-dark hover:bg-avanza-dark/15",
                      )}
                    >
                      {t.gamesPage.logicLevel} {lv.id}
                    </button>
                  ))}
                  <span className="ml-auto rounded-full bg-avanza-dark/8 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-avanza-dark/70">
                    {level.hint}
                  </span>
                </div>

                {/* Inputs row */}
                <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-[#f7f0ff] p-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-avanza-purple">
                    {t.gamesPage.logicInputsLabel}
                  </span>
                  {level.inputs.map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() =>
                        setInputs((p) => ({ ...p, [name]: p[name] ? 0 : 1 }))
                      }
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-extrabold transition",
                        inputs[name]
                          ? "bg-avanza-green text-avanza-dark shadow-md"
                          : "bg-avanza-dark/12 text-avanza-dark",
                      )}
                    >
                      <span className="font-mono text-xs">{name}</span>
                      <span className="font-mono text-base">{inputs[name] ?? 0}</span>
                    </button>
                  ))}
                </div>

                {/* Gate slots */}
                <div className="grid gap-3">
                  {level.gates.map((g) => {
                    const inputDescr = g.inputs.map((inp) => {
                      if (typeof inp === "string") return inp
                      return `(${inp.gate.toUpperCase()})`
                    })
                    const inputVals = g.inputs.map((inp) => {
                      if (typeof inp === "string") return inputs[inp] ?? 0
                      // refer to its current value
                      const sub = level.gates.find((gg) => gg.id === inp.gate)
                      if (!sub) return 0
                      const subType = selections[sub.id]
                      if (!subType) return -1
                      const subInputs = sub.inputs.map((s) => {
                        if (typeof s === "string") return inputs[s] ?? 0
                        return 0 // shallow: only one level deep used in current levels
                      })
                      return evalGate(subType, subInputs[0] ?? 0, subInputs[1] ?? 0)
                    })
                    const a = inputVals[0]
                    const b = inputVals[1]
                    const type = selections[g.id]
                    const out = type
                      ? evalGate(type, a < 0 ? 0 : a, b < 0 ? 0 : b)
                      : -1
                    const isUnique = g.options.length === 1
                    return (
                      <div
                        key={g.id}
                        className="flex flex-wrap items-center gap-3 rounded-2xl bg-[#fbf7ff] p-3 ring-1 ring-avanza-purple/15"
                      >
                        <span className="rounded-full bg-avanza-purple/15 px-2 py-0.5 font-mono text-[11px] font-extrabold text-avanza-purple">
                          {g.id.toUpperCase()}
                        </span>
                        <span className="text-xs font-bold text-muted-foreground">
                          {inputDescr.join(", ")}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {inputVals.map((v) => (v < 0 ? "?" : v)).join(",")}
                        </span>
                        <span className="text-avanza-dark/40">→</span>
                        <div className="flex flex-wrap gap-1.5">
                          {g.options.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() =>
                                setSelections((p) => ({ ...p, [g.id]: opt }))
                              }
                              className={cn(
                                "rounded-full px-2.5 py-1 font-mono text-[11px] font-extrabold uppercase tracking-wider transition",
                                type === opt || isUnique
                                  ? "bg-avanza-purple text-white"
                                  : "bg-avanza-dark/8 text-avanza-dark hover:bg-avanza-dark/15",
                              )}
                              disabled={isUnique && type === opt}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                        <span
                          className={cn(
                            "ml-auto rounded-full px-2.5 py-1 font-mono text-[11px] font-extrabold",
                            out < 0
                              ? "bg-avanza-dark/8 text-avanza-dark/50"
                              : out
                                ? "bg-avanza-green/15 text-avanza-green"
                                : "bg-avanza-dark/8 text-avanza-dark",
                          )}
                        >
                          {t.gamesPage.logicOut}: {out < 0 ? "?" : out}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Outputs row */}
                <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-[#1a1a2e] p-4 text-white">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/60">
                    {t.gamesPage.logicOutputs}
                  </span>
                  {level.outputs.map((o) => {
                    const v = currentOutputs[o.name]
                    return (
                      <span
                        key={o.name}
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-sm font-extrabold",
                          v < 0
                            ? "bg-white/10 text-white/40"
                            : v
                              ? "bg-avanza-green text-avanza-dark shadow"
                              : "bg-white/15 text-white/85",
                        )}
                      >
                        {o.name} = {v < 0 ? "?" : v}
                      </span>
                    )
                  })}
                  <span className="ml-auto text-[11px] text-white/55">
                    {allMatch
                      ? t.gamesPage.logicAllMatch
                      : t.gamesPage.logicTryGates}
                  </span>
                </div>
              </div>
            </div>

            {/* Truth table card */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(0.7deg)]"
              />
              <div className="relative flex h-full flex-col gap-4 rounded-3xl bg-avanza-dark p-7 text-primary-foreground shadow-[0_28px_64px_-30px_rgba(26,26,46,0.4)]">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white/85">
                  <Sparkles className="h-3.5 w-3.5 text-avanza-green" />
                  {t.gamesPage.logicTruthTable}
                </div>
                <div className="overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <table className="w-full text-sm">
                    <thead className="bg-white/5 text-[10px] uppercase tracking-wider text-white/60">
                      <tr>
                        {level.inputs.map((n) => (
                          <th key={n} className="px-3 py-2 text-left font-extrabold">
                            {n}
                          </th>
                        ))}
                        {level.outputs.map((o) => (
                          <th key={o.name} className="px-3 py-2 text-left font-extrabold">
                            {o.name}
                          </th>
                        ))}
                        <th className="px-3 py-2 text-left font-extrabold">✓</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono">
                      {tableResults.map((res, i) => {
                        const isCurrent = level.inputs.every(
                          (n, j) => (inputs[n] ?? 0) === res.row.inputs[j],
                        )
                        return (
                          <tr
                            key={i}
                            className={cn(
                              "border-t border-white/5",
                              isCurrent ? "bg-avanza-purple/25" : "",
                            )}
                          >
                            {res.row.inputs.map((v, j) => (
                              <td key={j} className="px-3 py-2 text-white/80">
                                {v}
                              </td>
                            ))}
                            {res.expected.map((v, j) => (
                              <td key={j} className="px-3 py-2 text-white/80">
                                {v}
                              </td>
                            ))}
                            <td className="px-3 py-2">
                              {allSelected ? (
                                res.matches ? (
                                  <span className="text-avanza-green">✓</span>
                                ) : (
                                  <span className="text-avanza-orange">✗</span>
                                )
                              ) : (
                                <span className="text-white/30">·</span>
                              )}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {allMatch && (
                  <div className="inline-flex items-center gap-2 self-start rounded-full bg-avanza-green px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-avanza-dark shadow-sm">
                    <Sparkles className="h-3.5 w-3.5" />
                    {t.gamesPage.logicSolved}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setSelections({})
                    const initial: Record<string, number> = {}
                    for (const inp of level.inputs) initial[inp] = 0
                    setInputs(initial)
                  }}
                  className="mt-auto inline-flex items-center justify-center gap-1.5 self-start rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/85 transition hover:bg-white/20"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  {t.gamesPage.logicReset}
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
