export type GateType = "AND" | "OR" | "NOT" | "XOR" | "NAND" | "NOR"

export const ALL_GATES: GateType[] = ["AND", "OR", "NOT", "XOR", "NAND", "NOR"]

/** A single gate slot in a circuit. Inputs reference an input variable name
 * (e.g. "A") or another gate's id, so circuits can chain. */
export type GateSlot = {
  id: string
  inputs: Array<string | { gate: string }>
  /** NOT takes one input; every other gate takes two. */
  arity: 1 | 2
  options: GateType[]
}

export type TruthRow = {
  inputs: number[]
  outputs: number[]
}

export type Badge = {
  id: string
  name: string
  description: string
}

export type TruthTableOutputText = {
  name: string
  label: string
  onText: string
  offText: string
}

export type TruthTableText = {
  inputNames: Record<string, string>
  inputOnText?: string
  inputOffText?: string
  outputs: TruthTableOutputText[]
  helperText: string
}

export type Level = {
  id: number
  title: string
  concept: string
  missionTitle: string
  missionStory: string
  plainGoal: string
  /** Plain-English description of the target behavior, shown under the title. */
  behaviorDescription: string
  inputs: string[]
  gates: GateSlot[]
  outputs: Array<{ name: string; label: string; source: string | { gate: string } }>
  truthTable: TruthTableText
  target: TruthRow[]
  hints: string[]
  successExplanation: string
  realWorldConnection: string
  badge: Badge
}

export type LevelProgress = {
  solved: boolean
  attempts: number
  hintsUsed: number
}

export type Progress = {
  tutorialDone: boolean
  unlockedUpTo: number
  levels: Record<number, LevelProgress>
}
