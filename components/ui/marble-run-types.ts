export const MARBLE_COLS = 9
export const MARBLE_ROWS = 8

export type Direction = "top" | "right" | "bottom" | "left"

export type BuildablePieceKind = "ramp" | "pipe" | "blocker" | "bounce"

export type FixedCellKind = "wall" | "hazard" | "wrong"

export type TrackPiece = {
  kind: BuildablePieceKind
  orientation: number
}

export type PlacedPiece = TrackPiece & {
  row: number
  col: number
}

export type FixedCell =
  | {
      kind: FixedCellKind
      row: number
      col: number
    }
  | {
      kind: "piece"
      row: number
      col: number
      piece: TrackPiece
      locked?: boolean
    }

export type Inventory = Partial<Record<BuildablePieceKind, number>>

export type MarbleLevel = {
  id: number
  name: string
  objective: string
  start: { row: number; col: number }
  goal: { row: number; col: number }
  fixed: FixedCell[]
  inventory: Inventory
  knownSolution: PlacedPiece[]
  bestKnown: number
}

export type BoardPoint = {
  x: number
  y: number
}

export type PipeShape = "vertical" | "horizontal" | "curve"

export type SegmentKind = "fall" | "ramp" | "pipe" | "bounce" | "cup"

export type CourseSegment = {
  from: BoardPoint
  to: BoardPoint
  path: BoardPoint[]
  kind: SegmentKind
  row: number
  col: number
  entry?: Direction
  exit?: Direction
  pipeShape?: PipeShape
}

export type SimulationFailureReason =
  | "left-board"
  | "hit-wall"
  | "stopped"
  | "wrong-area"
  | "hazard"
  | "blocked"

export type SimulationResult =
  | {
      status: "success"
      message: string
      segments: CourseSegment[]
    }
  | {
      status: "failure"
      reason: SimulationFailureReason
      message: string
      segments: CourseSegment[]
      failureCell: { row: number; col: number } | null
    }

export const PIECE_LABELS: Record<BuildablePieceKind, string> = {
  ramp: "Ramp",
  pipe: "Pipe",
  blocker: "Blocker",
  bounce: "Bounce pad",
}

export const ORIENTATION_COUNTS: Record<BuildablePieceKind, number> = {
  ramp: 2,
  pipe: 6,
  blocker: 1,
  bounce: 4,
}
