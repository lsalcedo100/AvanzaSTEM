import type { GateSlot, GateType, Level } from "./types"

export function evalGate(type: GateType, a: number, b: number): number {
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

export const GATE_INFO: Record<GateType, { description: string }> = {
  AND: { description: "Output turns On only when A and B are both On." },
  OR: { description: "Output turns On when A or B, or both, are On." },
  NOT: { description: "Output is the opposite of the input." },
  XOR: { description: "Output turns On when exactly one input is On." },
  NAND: { description: "Opposite of AND. Output turns Off only when both inputs are On." },
  NOR: { description: "Opposite of OR. Output turns On only when both inputs are Off." },
}

/** -1 means "not yet selected / unknown". */
const UNKNOWN = -1

/** Evaluates every gate in a circuit, resolving chains of any depth (a gate
 * can take another gate's output as input, which can itself depend on
 * another gate). Returns -1 for any gate whose type hasn't been picked yet,
 * or whose inputs are still unresolved. */
export function resolveGateValues(
  gates: GateSlot[],
  inputValues: Record<string, number>,
  selections: Record<string, GateType | undefined>,
): Record<string, number> {
  const byId = new Map(gates.map((g) => [g.id, g]))
  const cache = new Map<string, number>()

  function resolve(gateId: string, seen: Set<string>): number {
    if (cache.has(gateId)) return cache.get(gateId)!
    if (seen.has(gateId)) return UNKNOWN // guards against cyclic configs
    const slot = byId.get(gateId)
    const type = slot ? selections[slot.id] : undefined
    if (!slot || !type) {
      cache.set(gateId, UNKNOWN)
      return UNKNOWN
    }
    const nextSeen = new Set(seen).add(gateId)
    const resolved = slot.inputs.map((inp) =>
      typeof inp === "string" ? inputValues[inp] ?? 0 : resolve(inp.gate, nextSeen),
    )
    const a = resolved[0] ?? 0
    const b = slot.arity === 1 ? a : resolved[1] ?? 0
    const value = a === UNKNOWN || b === UNKNOWN ? UNKNOWN : evalGate(type, a, b)
    cache.set(gateId, value)
    return value
  }

  const values: Record<string, number> = {}
  for (const g of gates) values[g.id] = resolve(g.id, new Set())
  return values
}

export function evalCircuit(
  level: Level,
  inputValues: Record<string, number>,
  selections: Record<string, GateType | undefined>,
): Record<string, number> {
  const gateValues = resolveGateValues(level.gates, inputValues, selections)
  const outputs: Record<string, number> = {}
  for (const out of level.outputs) {
    outputs[out.name] =
      typeof out.source === "string"
        ? inputValues[out.source] ?? 0
        : gateValues[out.source.gate] ?? UNKNOWN
  }
  return outputs
}

export type RowResult = {
  row: { inputs: number[]; outputs: number[] }
  got: number[]
  matches: boolean
}

export function evalAgainstTarget(
  level: Level,
  selections: Record<string, GateType | undefined>,
): RowResult[] {
  return level.target.map((row) => {
    const inMap: Record<string, number> = {}
    level.inputs.forEach((name, i) => (inMap[name] = row.inputs[i]))
    const outs = evalCircuit(level, inMap, selections)
    const got = level.outputs.map((o) => outs[o.name])
    const matches = row.outputs.every((expected, i) => got[i] === expected)
    return { row, got, matches }
  })
}

/** A friendly, gate-aware explanation for why a single truth-table row is
 * right or wrong. Used by FeedbackPanel/TruthTable instead of a bare ✓/✗. */
export function explainRow(
  level: Level,
  selections: Record<string, GateType | undefined>,
  result: RowResult,
): string {
  const inputDescr = level.inputs
    .map((name, i) => {
      const label = level.truthTable.inputNames[name] ?? name
      const friendlyLabel = label.endsWith("?") ? label.slice(0, -1).toLowerCase() : label.toLowerCase()
      const value = result.row.inputs[i] ? level.truthTable.inputOnText ?? "Yes" : level.truthTable.inputOffText ?? "No"
      return `${friendlyLabel} is ${value}`
    })
    .join(" and ")
  const output = level.outputs[0]
  const outputText = output ? level.truthTable.outputs.find((o) => o.name === output.name) : undefined
  const outName = outputText?.label ?? output?.label ?? "the output"
  const lastGate = level.gates[level.gates.length - 1]
  const gateType = lastGate ? selections[lastGate.id] : undefined

  if (!gateType) return `Pick a gate to see what happens when ${inputDescr}.`

  const got = result.got[0]
  const expected = result.row.outputs[0]
  const gotText = got ? outputText?.onText ?? "Yes" : outputText?.offText ?? "No"
  const expectedText = expected ? outputText?.onText ?? "Yes" : outputText?.offText ?? "No"
  if (result.matches) {
    return `Correct. When ${inputDescr}, your ${gateType} gate makes ${gotText}, matching ${outName}.`
  }
  return `When ${inputDescr}, your ${gateType} gate makes ${gotText}, but the goal is: ${expectedText}.`
}
