import {
  type BuildablePieceKind,
  type FixedCell,
  type Inventory,
  type MarbleLevel,
  type PlacedPiece,
} from "@/components/ui/marble-run-types"

function piece(row: number, col: number, kind: BuildablePieceKind, orientation = 0): PlacedPiece {
  return { row, col, kind, orientation }
}

function wall(row: number, col: number): FixedCell {
  return { row, col, kind: "wall" }
}

function hazard(row: number, col: number): FixedCell {
  return { row, col, kind: "hazard" }
}

function wrong(row: number, col: number): FixedCell {
  return { row, col, kind: "wrong" }
}

function lockedPiece(row: number, col: number, kind: BuildablePieceKind, orientation = 0): FixedCell {
  return {
    row,
    col,
    kind: "piece",
    locked: true,
    piece: { kind, orientation },
  }
}

function inventory(values: Inventory): Inventory {
  return {
    ramp: values.ramp ?? 0,
    pipe: values.pipe ?? 0,
    blocker: values.blocker ?? 0,
    bounce: values.bounce ?? 0,
  }
}

export const MARBLE_RUN_LEVELS: MarbleLevel[] = [
  {
    id: 1,
    name: "First Turn",
    objective: "Place one ramp so the falling marble rolls across and drops into the cup.",
    start: { row: 0, col: 2 },
    goal: { row: 6, col: 3 },
    fixed: [],
    inventory: inventory({ ramp: 1 }),
    knownSolution: [piece(3, 2, "ramp", 0)],
    bestKnown: 1,
  },
  {
    id: 2,
    name: "Two-Step Chain",
    objective: "Chain two ramps. The marble has to change columns twice before the lower wall line.",
    start: { row: 0, col: 1 },
    goal: { row: 7, col: 3 },
    fixed: [wall(5, 1), wall(5, 2), wall(6, 1), wall(6, 2)],
    inventory: inventory({ ramp: 2 }),
    knownSolution: [piece(2, 1, "ramp", 0), piece(4, 2, "ramp", 0)],
    bestKnown: 2,
  },
  {
    id: 3,
    name: "Clean Drop",
    objective: "Use a ramp near the top, then let empty space do the rest of the work.",
    start: { row: 0, col: 6 },
    goal: { row: 7, col: 5 },
    fixed: [wall(5, 6), wall(6, 6)],
    inventory: inventory({ ramp: 1 }),
    knownSolution: [piece(2, 6, "ramp", 1)],
    bestKnown: 1,
  },
  {
    id: 4,
    name: "Blocked Shaft",
    objective: "Steer around the fixed wall. The blocker is a spare wall, not a bridge.",
    start: { row: 0, col: 2 },
    goal: { row: 7, col: 3 },
    fixed: [wall(4, 2), wall(5, 2), wall(6, 2)],
    inventory: inventory({ ramp: 1, blocker: 1 }),
    knownSolution: [piece(2, 2, "ramp", 0)],
    bestKnown: 1,
  },
  {
    id: 5,
    name: "Pipe Span",
    objective: "Build a short pipe run so the marble travels sideways before it falls.",
    start: { row: 0, col: 3 },
    goal: { row: 7, col: 6 },
    fixed: [wall(4, 3), wall(4, 4), wall(5, 4)],
    inventory: inventory({ pipe: 3 }),
    knownSolution: [
      piece(2, 3, "pipe", 2),
      piece(2, 4, "pipe", 1),
      piece(2, 5, "pipe", 1),
    ],
    bestKnown: 3,
  },
  {
    id: 6,
    name: "Ramp To Pipe",
    objective: "Catch the marble with a ramp, then keep it moving through three pipe sections.",
    start: { row: 0, col: 1 },
    goal: { row: 7, col: 5 },
    fixed: [wall(5, 1), wall(6, 1), wall(6, 3)],
    inventory: inventory({ ramp: 1, pipe: 3 }),
    knownSolution: [
      piece(2, 1, "ramp", 0),
      piece(2, 2, "pipe", 1),
      piece(2, 3, "pipe", 1),
      piece(2, 4, "pipe", 1),
    ],
    bestKnown: 4,
  },
  {
    id: 7,
    name: "Exact Count",
    objective: "You have exactly three ramps. Every turn has to earn its place.",
    start: { row: 0, col: 7 },
    goal: { row: 7, col: 4 },
    fixed: [wall(4, 7), wall(6, 6), wall(6, 5)],
    inventory: inventory({ ramp: 3 }),
    knownSolution: [
      piece(2, 7, "ramp", 1),
      piece(4, 6, "ramp", 1),
      piece(5, 5, "ramp", 1),
    ],
    bestKnown: 3,
  },
  {
    id: 8,
    name: "Hazard Line",
    objective: "Carry the marble over the hazard cells, then let it drop in a safe column.",
    start: { row: 0, col: 2 },
    goal: { row: 7, col: 5 },
    fixed: [hazard(4, 3), hazard(5, 4), wrong(7, 3), wall(6, 2)],
    inventory: inventory({ ramp: 1, pipe: 2 }),
    knownSolution: [
      piece(2, 2, "ramp", 0),
      piece(2, 3, "pipe", 1),
      piece(2, 4, "pipe", 1),
    ],
    bestKnown: 3,
  },
  {
    id: 9,
    name: "Spring Launch",
    objective: "Use the bounce pad to launch sideways into the pipe.",
    start: { row: 0, col: 4 },
    goal: { row: 7, col: 6 },
    fixed: [wall(5, 4), hazard(6, 5)],
    inventory: inventory({ pipe: 1, bounce: 1 }),
    knownSolution: [piece(3, 4, "bounce", 0), piece(3, 5, "pipe", 1)],
    bestKnown: 2,
  },
  {
    id: 10,
    name: "Left Launch",
    objective: "Launch left, bridge the gap with pipes, then turn downward before the hazard.",
    start: { row: 0, col: 7 },
    goal: { row: 7, col: 3 },
    fixed: [hazard(6, 4), wall(3, 7), wall(4, 7), wrong(7, 5)],
    inventory: inventory({ ramp: 1, pipe: 2, bounce: 1 }),
    knownSolution: [
      piece(2, 7, "bounce", 2),
      piece(2, 6, "pipe", 1),
      piece(2, 5, "pipe", 1),
      piece(5, 4, "ramp", 1),
    ],
    bestKnown: 4,
  },
  {
    id: 11,
    name: "Pipe Elbow",
    objective: "Send the marble through a vertical pipe and turn it into a horizontal run.",
    start: { row: 0, col: 0 },
    goal: { row: 7, col: 4 },
    fixed: [wall(4, 0), wall(5, 0), hazard(6, 2)],
    inventory: inventory({ pipe: 5 }),
    knownSolution: [
      piece(1, 0, "pipe", 0),
      piece(2, 0, "pipe", 2),
      piece(2, 1, "pipe", 1),
      piece(2, 2, "pipe", 1),
      piece(2, 3, "pipe", 1),
    ],
    bestKnown: 5,
  },
  {
    id: 12,
    name: "False Cups",
    objective: "Avoid the wrong catch area. Turn left early and pipe the marble over to the real cup.",
    start: { row: 0, col: 5 },
    goal: { row: 7, col: 1 },
    fixed: [wrong(7, 4), wrong(7, 5), wall(5, 5), wall(6, 5)],
    inventory: inventory({ ramp: 1, pipe: 3, blocker: 1 }),
    knownSolution: [
      piece(2, 5, "ramp", 1),
      piece(2, 4, "pipe", 1),
      piece(2, 3, "pipe", 1),
      piece(2, 2, "pipe", 1),
    ],
    bestKnown: 4,
  },
  {
    id: 13,
    name: "High Bridge",
    objective: "Use the bounce pad and pipes to cross above a dangerous lower channel.",
    start: { row: 0, col: 3 },
    goal: { row: 7, col: 8 },
    fixed: [hazard(4, 4), hazard(5, 5), hazard(6, 6), wall(5, 3)],
    inventory: inventory({ pipe: 4, bounce: 1 }),
    knownSolution: [
      piece(2, 3, "bounce", 0),
      piece(2, 4, "pipe", 1),
      piece(2, 5, "pipe", 1),
      piece(2, 6, "pipe", 1),
      piece(2, 7, "pipe", 1),
    ],
    bestKnown: 5,
  },
  {
    id: 14,
    name: "Locked Chute",
    objective: "Use the fixed pipe as part of the track, then add the missing turn and pipe.",
    start: { row: 0, col: 4 },
    goal: { row: 7, col: 2 },
    fixed: [lockedPiece(2, 4, "pipe", 0), wall(5, 4), wall(6, 4), hazard(6, 3)],
    inventory: inventory({ ramp: 1, pipe: 1 }),
    knownSolution: [piece(4, 4, "ramp", 1), piece(4, 3, "pipe", 1)],
    bestKnown: 2,
  },
  {
    id: 15,
    name: "Final Course",
    objective: "Launch from the springboard, ride the pipe bridge, and stay above the hazards.",
    start: { row: 0, col: 1 },
    goal: { row: 7, col: 6 },
    fixed: [hazard(4, 3), hazard(5, 4), hazard(6, 5), wall(5, 1), wrong(7, 3)],
    inventory: inventory({ pipe: 4, bounce: 1 }),
    knownSolution: [
      piece(2, 1, "bounce", 0),
      piece(2, 2, "pipe", 1),
      piece(2, 3, "pipe", 1),
      piece(2, 4, "pipe", 1),
      piece(2, 5, "pipe", 1),
    ],
    bestKnown: 5,
  },
]
