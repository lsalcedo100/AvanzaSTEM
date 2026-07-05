import {
  type BoardPoint,
  type BuildablePieceKind,
  type CourseSegment,
  type Direction,
  MARBLE_COLS,
  type MarbleLevel,
  MARBLE_ROWS,
  ORIENTATION_COUNTS,
  type PipeShape,
  type PlacedPiece,
  type SimulationResult,
  type TrackPiece,
} from "@/components/ui/marble-run-types"

const FAILURE_MESSAGES = {
  "left-board": "The marble missed the cup.",
  "hit-wall": "The marble hit a wall here.",
  stopped: "The pipe path is not connected.",
  "wrong-area": "The marble missed the cup.",
  hazard: "The marble fell into a hazard.",
  blocked: "The marble hit a wall here.",
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
  const spec = pipeSpec(orientation)
  if (!spec.openings.includes(entry)) return null
  return spec.openings.find((opening) => opening !== entry) ?? null
}

function pipeSpec(orientation: number): { openings: Direction[]; shape: PipeShape } {
  const specs: { openings: Direction[]; shape: PipeShape }[] = [
    { openings: ["top", "bottom"], shape: "vertical" },
    { openings: ["left", "right"], shape: "horizontal" },
    { openings: ["top", "right"], shape: "curve" },
    { openings: ["top", "left"], shape: "curve" },
    { openings: ["bottom", "right"], shape: "curve" },
    { openings: ["bottom", "left"], shape: "curve" },
  ]
  return specs[orientation] ?? specs[0]
}

function sampleQuadratic(from: BoardPoint, control: BoardPoint, to: BoardPoint): BoardPoint[] {
  return [0, 0.2, 0.4, 0.6, 0.8, 1].map((t) => {
    const a = (1 - t) * (1 - t)
    const b = 2 * (1 - t) * t
    const c = t * t
    return {
      x: a * from.x + b * control.x + c * to.x,
      y: a * from.y + b * control.y + c * to.y,
    }
  })
}

function pathForPipe(row: number, col: number, entry: Direction, exit: Direction): BoardPoint[] {
  const from = sidePoint(row, col, entry)
  const to = sidePoint(row, col, exit)
  const center = cellCenter(row, col)

  if (OPPOSITE[entry] === exit) return [from, center, to]
  return sampleQuadratic(from, center, to)
}

function pathForRamp(row: number, col: number, entry: Direction, exit: Direction): BoardPoint[] {
  return [sidePoint(row, col, entry), cellCenter(row, col), sidePoint(row, col, exit)]
}

function pathForBounce(row: number, col: number, entry: Direction, exit: Direction): BoardPoint[] {
  const from = sidePoint(row, col, entry)
  const center = cellCenter(row, col)
  const to = sidePoint(row, col, exit)
  const impulse: BoardPoint =
    exit === "right"
      ? { x: col + 0.82, y: row + 0.28 }
      : exit === "left"
        ? { x: col + 0.18, y: row + 0.28 }
        : exit === "top"
          ? { x: col + 0.5, y: row + 0.08 }
          : { x: col + 0.5, y: row + 0.92 }

  return [from, center, impulse, to]
}

function exitForPiece(piece: TrackPiece, entry: Direction): Direction | null {
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

  if (entry !== "top") return null
  const bounceExit: Direction[] = ["right", "bottom", "left", "top"]
  return bounceExit[orientation] ?? "right"
}

function segmentForCell(
  row: number,
  col: number,
  entry: Direction,
  piece: TrackPiece | null,
  exit: Direction,
): CourseSegment {
  if (!piece) {
    return {
      from: sidePoint(row, col, entry),
      to: sidePoint(row, col, exit),
      path: [sidePoint(row, col, entry), sidePoint(row, col, exit)],
      kind: "fall",
      row,
      col,
      entry,
      exit,
    }
  }

  if (piece.kind === "pipe") {
    const orientation = normalizeOrientation(piece.kind, piece.orientation)
    return {
      from: sidePoint(row, col, entry),
      to: sidePoint(row, col, exit),
      path: pathForPipe(row, col, entry, exit),
      kind: "pipe",
      row,
      col,
      entry,
      exit,
      pipeShape: pipeSpec(orientation).shape,
    }
  }

  if (piece.kind === "ramp") {
    return {
      from: sidePoint(row, col, entry),
      to: sidePoint(row, col, exit),
      path: pathForRamp(row, col, entry, exit),
      kind: "ramp",
      row,
      col,
      entry,
      exit,
    }
  }

  if (piece.kind === "bounce") {
    return {
      from: sidePoint(row, col, entry),
      to: sidePoint(row, col, exit),
      path: pathForBounce(row, col, entry, exit),
      kind: "bounce",
      row,
      col,
      entry,
      exit,
    }
  }

  return {
    from: sidePoint(row, col, entry),
    to: sidePoint(row, col, exit),
    path: [sidePoint(row, col, entry), sidePoint(row, col, exit)],
    kind: "fall",
    row,
    col,
    entry,
    exit,
  }
}

function failure(
  reason: Exclude<SimulationResult, { status: "success" }>["reason"],
  segments: CourseSegment[],
  failureCell: { row: number; col: number } | null,
): SimulationResult {
  return {
    status: "failure",
    reason,
    message: FAILURE_MESSAGES[reason],
    segments,
    failureCell,
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
    if (!inBounds(row, col)) return failure("left-board", segments, null)

    const visitKey = `${row}:${col}:${entry}`
    if (seen.has(visitKey)) return failure("stopped", segments, { row, col })
    seen.add(visitKey)

    if (row === level.goal.row && col === level.goal.col) {
      const from = sidePoint(row, col, entry)
      const to = cellCenter(row, col)
      segments.push({
        from,
        to,
        path: [from, to, { x: col + 0.5, y: row + 0.72 }],
        kind: "cup",
        row,
        col,
        entry,
      })
      return {
        status: "success",
        message: "The marble landed in the cup.",
        segments,
      }
    }

    const fixed = fixedMap.get(key(row, col))
    if (fixed?.kind === "wall") return failure("hit-wall", segments, { row, col })
    if (fixed?.kind === "hazard") return failure("hazard", segments, { row, col })
    if (fixed?.kind === "wrong") return failure("wrong-area", segments, { row, col })

    const fixedPiece = fixed?.kind === "piece" ? fixed.piece : null
    const piece = fixedPiece ?? placementMap.get(key(row, col)) ?? null
    const exit = piece ? exitForPiece(piece, entry) : "bottom"

    if (!exit) {
      return failure(piece?.kind === "blocker" ? "blocked" : "stopped", segments, { row, col })
    }

    segments.push(segmentForCell(row, col, entry, piece, exit))

    const next = nextCell(row, col, exit)
    if (!inBounds(next.row, next.col)) return failure("left-board", segments, { row, col })

    row = next.row
    col = next.col
    entry = next.entry
  }

  return failure("stopped", segments, { row, col })
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
