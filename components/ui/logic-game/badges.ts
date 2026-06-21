import type { Badge } from "./types"

export const TUTORIAL_BADGE: Badge = {
  id: "logic-starter",
  name: "Logic Starter",
  description: "Learned what ON/OFF and TRUE/FALSE mean for a circuit.",
}

export const BADGES_BY_LEVEL: Record<number, Badge> = {
  1: { id: "and-master", name: "AND Master", description: "Both conditions must be true." },
  2: { id: "or-explorer", name: "OR Explorer", description: "One true condition is enough." },
  3: { id: "not-flipper", name: "NOT Flipper", description: "Flips ON to OFF and OFF to ON." },
  4: { id: "xor-solver", name: "XOR Solver", description: "True only when inputs differ." },
  5: { id: "gate-inverter", name: "Gate Inverter", description: "AND, inverted." },
  6: { id: "nor-master", name: "NOR Master", description: "OR, inverted." },
  7: { id: "circuit-builder", name: "Circuit Builder", description: "Chained two gates together." },
  8: { id: "half-adder-hero", name: "Half-Adder Hero", description: "Built a tiny binary adder." },
  9: { id: "security-system-designer", name: "Security System Designer", description: "Turned a sentence into Boolean logic." },
  10: { id: "boolean-creator", name: "Boolean Creator", description: "Designed a circuit from scratch." },
}
