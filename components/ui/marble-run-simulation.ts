import {
  type BoardPoint,
  type BuildablePieceKind,
  type CourseSegment,
  type Direction,
  MARBLE_COLS,
  type MarbleLevel,
  MARBLE_ROWS,
  ORIENTATION_COUNTS,
  type PlacedPiece,
  type SimulationResult,
  type TrackPiece,
} from "@/components/ui/marble-run-types"

const FAILURE_MESSAGES = {
  "left-board": "The marble left the board.",
  "hit-wall": "The marble hit a wall.",
  stopped: "The marble stopped before reaching the cup.",
  "wrong-area": "The marble reached the wrong area.",
  hazard: "The marble fell into a hazard.",
  blocked: "The path is blocked.",
} as const

const OPPOSITE: Record<Direction, Direction> = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right",
}

function key(row: number, col: number) {
  return `${row}:${col}`
}

export function pieceKey(piece: Pick<PlacedPiece, "row" | "col">) {
  return key(piece.row, piece.col)
}

export function normalizeOrientation(kind: BuildablePieceKind, orientation: number) {
  const count = ORIENTATION_COUNTS[kind]
  return ((orientation % count) + count) % count
}

export function sidePoint(row: number, col: number, side: Direction): BoardPoint {
  if (side === "top") return { x: col + 0.5, y: row }
  if (side === "right") return { x: col + 1, y: row + 0.5 }
  if (side === "bottom") return { x: col + 0.5, y: row + 1 }
  return { x: col, y: row + 0.5 }
}

export function cellCenter(row: number, col: number): BoardPoint {
  return { x: col + 0.5, y: row + 0.5 }
}

function nextCell(row: number, col: number, exit: Direction) {
  if (exit === "top") return { row: row - 1, col, entry: "bottom" as Direction }
  if (exit === "right") return { row, col: col + 1, entry: "left" as Direction }
  if (exit === "bottom") return { row: row + 1, col, entry: "top" as Direction }
  return { row, col: col - 1, entry: "right" as Direction }
}

function inBounds(row: number, col: number) {
  return row >= 0 && row < MARBLE_ROWS && col >= 0 && col < MARBLE_COLS
}

function pipeExit(orientation: number, entry: Direction): Direction | null {
  const openingsByOrientation: Direction[][] = [
    ["top", "bottom"],
    ["left", "right"],
    ["top", "right"],
    ["top", "left"],
    ["bottom", "right"],
    ["bottom", "left"],
  ]
  const openings = openingsByOrientation[orientation] ?? openingsByOrientation[0]
  if (!openings.includes(entry)) return null
  return openings.find((opening) => opening !== entry) ?? null
}

function pieceExit(piece: TrackPiece, entry: Direction): Direction | null {
  const orientation = normalizeOrientation(piece.kind, piece.orientation)

  if (piece.kind === "blocker") return null

  if (piece.kind === "ramp") {
    if (orientation === 0) {
      if (entry === "top") return "right"
      if (entry === "left") return "bottom"
      return null
    }
    if (entry === "top") return "left"
    if (entry === "right") return "bottom"
    return null
  }

  if (piece.kind === "pipe") {
    return pipeExit(orientation, entry)
  }

  const bounceExit: Direction[] = ["right", "bottom", "left", "top"]
  return bounceExit[orientation] ?? "right"
}

function segmentKindForPiece(piece: TrackPiece | null): CourseSegment["kind"] {
  if (!piece) return "fall"
  if (piece.kind === "bounce") return "bounce"
  if (piece.kind === "pipe") return "pipe"
  if (piece.kind === "ramp") return "ramp"
  return "fall"
}

function failure(
  reason: Exclude<SimulationResult, { status: "success" }>["reason"],
  segments: CourseSegment[],
): SimulationResult {
  return {
    status: "failure",
    reason,
    message: FAILURE_MESSAGES[reason],
    segments,
  }
}

export function simulateCourse(level: MarbleLevel, placements: PlacedPiece[]): SimulationResult {
  const placementMap = new Map<string, PlacedPiece>()
  for (const placement of placements) {
    placementMap.set(key(placement.row, placement.col), placement)
  }

  const fixedMap = new Map<string, MarbleLevel["fixed"][number]>()
  for (const fixed of level.fixed) {
    fixedMap.set(key(fixed.row, fixed.col), fixed)
  }

  const segments: CourseSegment[] = []
  const seen = new Set<string>()
  let row = level.start.row
  let col = level.start.col
  let entry: Direction = "top"

  for (let step = 0; step < 240; step++) {
    if (!inBounds(row, col)) return failure("left-board", segments)

    const visitKey = `${row}:${col}:${entry}`
    if (seen.has(visitKey)) return failure("stopped", segments)
    seen.add(visitKey)

    if (row === level.goal.row && col === level.goal.col) {
      segments.push({
        from: sidePoint(row, col, entry),
        to: cellCenter(row, col),
        kind: "cup",
        row,
        col,
      })
      return {
        status: "success",
        message: "The marble settled into the cup.",
        segments,
      }
    }

    const fixed = fixedMap.get(key(row, col))
    if (fixed?.kind === "wall") return failure("hit-wall", segments)
    if (fixed?.kind === "hazard") return failure("hazard", segments)
    if (fixed?.kind === "wrong") return failure("wrong-area", segments)

    const fixedPiece = fixed?.kind === "piece" ? fixed.piece : null
    const piece = fixedPiece ?? placementMap.get(key(row, col)) ?? null
    const exit = piece ? pieceExit(piece, entry) : "bottom"

    if (!exit) {
      return failure(piece?.kind === "blocker" ? "blocked" : "stopped", segments)
    }

    segments.push({
      from: sidePoint(row, col, entry),
      to: sidePoint(row, col, exit),
      kind: segmentKindForPiece(piece),
      row,
      col,
    })

    const next = nextCell(row, col, exit)
    if (!inBounds(next.row, next.col)) return failure("left-board", segments)

    row = next.row
    col = next.col
    entry = next.entry
  }

  return failure("stopped", segments)
}

export function countPieces(placements: PlacedPiece[]) {
  const counts: Record<BuildablePieceKind, number> = {
    ramp: 0,
    pipe: 0,
    blocker: 0,
    bounce: 0,
  }

  for (const placement of placements) {
    counts[placement.kind] += 1
  }

  return counts
}

export function validateKnownSolution(level: MarbleLevel): string[] {
  const errors: string[] = []
  const occupied = new Set<string>()
  const counts = countPieces(level.knownSolution)

  for (const placement of level.knownSolution) {
    const placementKey = key(placement.row, placement.col)
    if (!inBounds(placement.row, placement.col)) {
      errors.push(`Level ${level.id}: solution piece outside board at ${placementKey}.`)
    }
    if (placement.row === level.start.row && placement.col === level.start.col) {
      errors.push(`Level ${level.id}: solution overlaps the start at ${placementKey}.`)
    }
    if (placement.row === level.goal.row && placement.col === level.goal.col) {
      errors.push(`Level ${level.id}: solution overlaps the cup at ${placementKey}.`)
    }
    if (occupied.has(placementKey)) {
      errors.push(`Level ${level.id}: solution has duplicate pieces at ${placementKey}.`)
    }
    occupied.add(placementKey)
    if (level.fixed.some((fixed) => fixed.row === placement.row && fixed.col === placement.col)) {
      errors.push(`Level ${level.id}: solution overlaps a fixed cell at ${placementKey}.`)
    }
  }

  for (const [kind, count] of Object.entries(counts) as [BuildablePieceKind, number][]) {
    const allowed = level.inventory[kind] ?? 0
    if (count > allowed) {
      errors.push(`Level ${level.id}: solution uses ${count} ${kind} pieces but only ${allowed} are available.`)
    }
  }

  const result = simulateCourse(level, level.knownSolution)
  if (result.status !== "success") {
    errors.push(`Level ${level.id}: known solution fails with "${result.message}"`)
  }

  return errors
}

export function validateMarbleRunLevels(levels: MarbleLevel[]) {
  return levels.flatMap(validateKnownSolution)
}

export function rotatePiece(piece: TrackPiece): TrackPiece {
  return {
    ...piece,
    orientation: normalizeOrientation(piece.kind, piece.orientation + 1),
  }
}

export { OPPOSITE }
