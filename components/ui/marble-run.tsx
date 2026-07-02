"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { MARBLE_RUN_LEVELS } from "@/components/ui/marble-run-levels"
import {
  type BoardPoint,
  type BuildablePieceKind,
  type CourseSegment,
  MARBLE_COLS,
  MARBLE_ROWS,
  type MarbleLevel,
  PIECE_LABELS,
  type PlacedPiece,
  type SimulationResult,
  type TrackPiece,
} from "@/components/ui/marble-run-types"
import {
  countPieces,
  normalizeOrientation,
  pieceKey,
  rotatePiece,
  sidePoint,
  simulateCourse,
  validateMarbleRunLevels,
} from "@/components/ui/marble-run-simulation"
import { cn } from "@/lib/utils"

type Tool = BuildablePieceKind | "erase"
type RunState = "editing" | "running" | "success" | "failure"

const BUILD_TOOLS: BuildablePieceKind[] = ["ramp", "pipe", "blocker", "bounce"]

const DEFAULT_ORIENTATIONS: Record<BuildablePieceKind, number> = {
  ramp: 0,
  pipe: 0,
  blocker: 0,
  bounce: 0,
}

const RUN_STATE_LABELS: Record<RunState, string> = {
  editing: "Editing",
  running: "Running",
  success: "Success",
  failure: "Failure",
}

function cellKey(row: number, col: number) {
  return `${row}:${col}`
}

function formatLevelNumber(index: number) {
  return String(index + 1).padStart(2, "0")
}

export function MarbleRun() {
  const { t } = useLanguage()
  const [levelIndex, setLevelIndex] = useState(0)
  const level = MARBLE_RUN_LEVELS[levelIndex]
  const [placements, setPlacements] = useState<PlacedPiece[]>([])
  const [tool, setTool] = useState<Tool>("ramp")
  const [toolOrientations, setToolOrientations] =
    useState<Record<BuildablePieceKind, number>>(DEFAULT_ORIENTATIONS)
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null)
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null)
  const [runState, setRunState] = useState<RunState>("editing")
  const [statusMessage, setStatusMessage] = useState(MARBLE_RUN_LEVELS[0].objective)
  const [boardSize, setBoardSize] = useState({ width: 0, height: 0 })

  const boardRef = useRef<HTMLDivElement | null>(null)
  const marbleRef = useRef<HTMLDivElement | null>(null)
  const trailRef = useRef<SVGPathElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const marbleBaseTransformRef = useRef("")

  const setBoardNode = useCallback((node: HTMLDivElement | null) => {
    boardRef.current = node
  }, [])

  const setMarbleNode = useCallback((node: HTMLDivElement | null) => {
    marbleRef.current = node
  }, [])

  const setTrailNode = useCallback((node: SVGPathElement | null) => {
    trailRef.current = node
  }, [])

  const placedByKey = useMemo(() => {
    const map = new Map<string, PlacedPiece>()
    for (const placement of placements) map.set(pieceKey(placement), placement)
    return map
  }, [placements])

  const fixedByKey = useMemo(() => {
    const map = new Map<string, (typeof level.fixed)[number]>()
    for (const fixed of level.fixed) map.set(cellKey(fixed.row, fixed.col), fixed)
    return map
  }, [level])

  const usedCounts = useMemo(() => countPieces(placements), [placements])

  const remaining = useMemo(() => {
    return BUILD_TOOLS.reduce(
      (acc, kind) => {
        acc[kind] = Math.max(0, (level.inventory[kind] ?? 0) - usedCounts[kind])
        return acc
      },
      {} as Record<BuildablePieceKind, number>,
    )
  }, [level.inventory, usedCounts])

  const selectedPiece = selectedCell
    ? placedByKey.get(cellKey(selectedCell.row, selectedCell.col)) ?? null
    : null

  const marbleDiameter = boardSize.width
    ? Math.max(15, Math.min(28, (boardSize.width / MARBLE_COLS) * 0.36))
    : 20

  const pointToPixel = useCallback(
    (point: BoardPoint) => {
      const width = boardSize.width
      const height =
        boardSize.height ||
        (width ? Math.round((width * MARBLE_ROWS) / MARBLE_COLS) : 0)

      return {
        x: (point.x / MARBLE_COLS) * width,
        y: (point.y / MARBLE_ROWS) * height,
      }
    },
    [boardSize.height, boardSize.width],
  )

  const applyMarbleTransform = useCallback(
    (point: BoardPoint, rotation = 0, scale = 1) => {
      const marble = marbleRef.current
      if (!marble) return
      const pixel = pointToPixel(point)
      const base = `translate(${pixel.x}px, ${pixel.y}px) translate(-50%, -50%) rotate(${rotation}rad)`
      marbleBaseTransformRef.current = base
      marble.style.transform = `${base} scale(${scale})`
    },
    [pointToPixel],
  )

  const clearTrail = useCallback(() => {
    if (trailRef.current) trailRef.current.setAttribute("d", "")
  }, [])

  const stopAnimation = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }, [])

  const resetMarbleVisuals = useCallback(() => {
    stopAnimation()
    clearTrail()
    applyMarbleTransform(sidePoint(level.start.row, level.start.col, "top"), 0)
  }, [applyMarbleTransform, clearTrail, level.start.col, level.start.row, stopAnimation])

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const errors = validateMarbleRunLevels(MARBLE_RUN_LEVELS)
      if (errors.length) {
        console.warn(`Marble run level validation failed:\n${errors.join("\n")}`)
      }
    }
  }, [])

  useEffect(() => {
    const board = boardRef.current
    if (!board) return

    const observer = new ResizeObserver(([entry]) => {
      const rect = entry.contentRect
      setBoardSize({ width: rect.width, height: rect.height })
    })

    observer.observe(board)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (runState === "editing") resetMarbleVisuals()
  }, [boardSize.height, boardSize.width, levelIndex, resetMarbleVisuals, runState])

  useEffect(() => {
    return () => stopAnimation()
  }, [stopAnimation])

  const getPlacementProblem = useCallback(
    (row: number, col: number, kind: BuildablePieceKind) => {
      if (runState === "running") return "Editing is locked while the marble is running."
      if (row === level.start.row && col === level.start.col) {
        return "The release point is fixed."
      }
      if (row === level.goal.row && col === level.goal.col) {
        return "The cup is fixed."
      }

      const fixed = fixedByKey.get(cellKey(row, col))
      if (fixed?.kind === "wall") return "Fixed walls cannot be replaced."
      if (fixed?.kind === "hazard") return "Hazard cells cannot hold pieces."
      if (fixed?.kind === "wrong") return "That catch area is fixed."
      if (fixed?.kind === "piece") return "That piece is locked into the level."
      if (placedByKey.has(cellKey(row, col))) {
        return "Select the existing piece, rotate it, or erase it first."
      }
      if (remaining[kind] <= 0) return `No ${PIECE_LABELS[kind].toLowerCase()} pieces left.`
      return null
    },
    [fixedByKey, level.goal.col, level.goal.row, level.start.col, level.start.row, placedByKey, remaining, runState],
  )

  const rotateActive = useCallback(() => {
    if (runState === "running") return

    if (selectedPiece) {
      setPlacements((current) =>
        current.map((placement) =>
          placement.row === selectedPiece.row && placement.col === selectedPiece.col
            ? { ...placement, ...rotatePiece(placement) }
            : placement,
        ),
      )
      setStatusMessage(`${PIECE_LABELS[selectedPiece.kind]} rotated.`)
      setRunState("editing")
      clearTrail()
      return
    }

    if (tool === "erase") return
    setToolOrientations((current) => ({
      ...current,
      [tool]: normalizeOrientation(tool, current[tool] + 1),
    }))
    setStatusMessage(`${PIECE_LABELS[tool]} preview rotated.`)
    setRunState("editing")
    clearTrail()
  }, [clearTrail, runState, selectedPiece, tool])

  const eraseSelected = useCallback(() => {
    if (runState === "running" || !selectedCell) return
    const selectedKey = cellKey(selectedCell.row, selectedCell.col)
    if (!placedByKey.has(selectedKey)) return
    setPlacements((current) => current.filter((placement) => pieceKey(placement) !== selectedKey))
    setSelectedCell(null)
    setRunState("editing")
    setStatusMessage("Piece removed.")
    clearTrail()
  }, [clearTrail, placedByKey, runState, selectedCell])

  const chooseTool = useCallback(
    (nextTool: Tool) => {
      if (runState === "running") return
      setTool(nextTool)
      setSelectedCell(null)
      setRunState("editing")
      clearTrail()
    },
    [clearTrail, runState],
  )

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (runState === "running") return

      const clickedKey = cellKey(row, col)
      const existing = placedByKey.get(clickedKey)

      if (tool === "erase") {
        if (!existing) {
          setStatusMessage("There is no placed piece in that cell.")
          return
        }
        setPlacements((current) => current.filter((placement) => pieceKey(placement) !== clickedKey))
        setSelectedCell(null)
        setRunState("editing")
        setStatusMessage("Piece removed.")
        clearTrail()
        return
      }

      if (existing) {
        setSelectedCell({ row, col })
        setTool(existing.kind)
        setToolOrientations((current) => ({
          ...current,
          [existing.kind]: normalizeOrientation(existing.kind, existing.orientation),
        }))
        setStatusMessage(`${PIECE_LABELS[existing.kind]} selected. Press R to rotate it.`)
        return
      }

      const problem = getPlacementProblem(row, col, tool)
      if (problem) {
        setStatusMessage(problem)
        return
      }

      const placement: PlacedPiece = {
        row,
        col,
        kind: tool,
        orientation: normalizeOrientation(tool, toolOrientations[tool]),
      }
      setPlacements((current) => [...current, placement])
      setSelectedCell({ row, col })
      setRunState("editing")
      setStatusMessage(`${PIECE_LABELS[tool]} placed.`)
      clearTrail()
    },
    [clearTrail, getPlacementProblem, placedByKey, runState, tool, toolOrientations],
  )

  const animateSimulation = useCallback(
    (result: SimulationResult) => {
      stopAnimation()

      const segments = result.segments
      if (!boardSize.width || !boardSize.height || segments.length === 0) {
        setRunState(result.status === "success" ? "success" : "failure")
        setStatusMessage(result.message)
        return
      }

      const trail = trailRef.current
      const marble = marbleRef.current
      const completedPoints: BoardPoint[] = [segments[0].from]
      let segmentIndex = 0
      let progress = 0
      let velocity = 1.9
      let rotation = 0
      let lastTime = performance.now()

      const accelerationFor = (kind: CourseSegment["kind"]) => {
        if (kind === "fall") return 5.5
        if (kind === "ramp") return 3.2
        if (kind === "pipe") return 1.2
        if (kind === "bounce") return 7.5
        return -1.5
      }

      const speedLimitFor = (kind: CourseSegment["kind"]) => {
        if (kind === "bounce") return 5.8
        if (kind === "fall") return 5.2
        if (kind === "pipe") return 3.6
        return 4.5
      }

      const segmentLength = (segment: CourseSegment) =>
        Math.hypot(segment.to.x - segment.from.x, segment.to.y - segment.from.y)

      const pointOnSegment = (segment: CourseSegment, amount: number) => {
        const length = segmentLength(segment) || 1
        const tValue = Math.min(1, Math.max(0, amount / length))
        return {
          point: {
            x: segment.from.x + (segment.to.x - segment.from.x) * tValue,
            y: segment.from.y + (segment.to.y - segment.from.y) * tValue,
          },
          tValue,
        }
      }

      const setTrailPath = (currentPoint: BoardPoint) => {
        if (!trail) return
        const points = [...completedPoints, currentPoint].map(pointToPixel)
        const d = points
          .map((point, index) =>
            `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`,
          )
          .join(" ")
        trail.setAttribute("d", d)
      }

      const finish = () => {
        animationRef.current = null
        const lastSegment = segments[segments.length - 1]
        applyMarbleTransform(lastSegment.to, rotation, result.status === "success" ? 0.88 : 1)
        setTrailPath(lastSegment.to)

        if (result.status === "failure" && marble && marbleBaseTransformRef.current) {
          marble.animate(
            [
              { transform: `${marbleBaseTransformRef.current} scale(1)` },
              { transform: `${marbleBaseTransformRef.current} scale(0.9)` },
              { transform: `${marbleBaseTransformRef.current} scale(1)` },
            ],
            { duration: 180, easing: "cubic-bezier(.2,.8,.2,1)" },
          )
        }

        setRunState(result.status === "success" ? "success" : "failure")
        setStatusMessage(result.message)
      }

      const frame = (now: number) => {
        const dt = Math.min(0.034, Math.max(0.001, (now - lastTime) / 1000))
        lastTime = now

        let activeSegment = segments[segmentIndex]
        if (!activeSegment) {
          finish()
          return
        }

        velocity = Math.max(
          0.85,
          Math.min(speedLimitFor(activeSegment.kind), velocity + accelerationFor(activeSegment.kind) * dt),
        )
        if (activeSegment.kind === "bounce") velocity = Math.max(velocity, 4.1)

        let distanceLeft = velocity * dt
        while (distanceLeft > 0 && activeSegment) {
          const length = segmentLength(activeSegment)
          const remainingDistance = length - progress
          const advance = Math.min(distanceLeft, remainingDistance)
          progress += advance
          distanceLeft -= advance

          const averageCellPx = (boardSize.width / MARBLE_COLS + boardSize.height / MARBLE_ROWS) / 2
          rotation += (advance * averageCellPx) / (marbleDiameter / 2)

          if (progress >= length - 0.0001) {
            completedPoints.push(activeSegment.to)
            segmentIndex += 1
            progress = 0
            activeSegment = segments[segmentIndex]
            if (activeSegment?.kind === "pipe") velocity *= 0.92
            if (activeSegment?.kind === "bounce") velocity = Math.max(velocity, 4.2)
          } else {
            break
          }
        }

        activeSegment = segments[segmentIndex]
        if (!activeSegment) {
          finish()
          return
        }

        const { point, tValue } = pointOnSegment(activeSegment, progress)
        const scale =
          activeSegment.kind === "bounce"
            ? 1 + Math.sin(tValue * Math.PI) * 0.08
            : activeSegment.kind === "cup"
              ? 1 - tValue * 0.12
              : 1

        applyMarbleTransform(point, rotation, scale)
        setTrailPath(point)
        animationRef.current = requestAnimationFrame(frame)
      }

      clearTrail()
      applyMarbleTransform(segments[0].from, 0)
      animationRef.current = requestAnimationFrame(frame)
    },
    [
      applyMarbleTransform,
      boardSize.height,
      boardSize.width,
      clearTrail,
      marbleDiameter,
      pointToPixel,
      stopAnimation,
    ],
  )

  const runSimulation = useCallback(() => {
    if (runState === "running") return
    setSelectedCell(null)
    setHoveredCell(null)
    const result = simulateCourse(level, placements)
    setRunState("running")
    setStatusMessage("Running the marble.")
    animateSimulation(result)
  }, [animateSimulation, level, placements, runState])

  const resetMarble = useCallback(() => {
    setRunState("editing")
    setSelectedCell(null)
    setStatusMessage("Marble reset. Your placed pieces are still on the board.")
    resetMarbleVisuals()
  }, [resetMarbleVisuals])

  const clearBoard = useCallback(() => {
    setPlacements([])
    setSelectedCell(null)
    setRunState("editing")
    setStatusMessage("Board cleared.")
    resetMarbleVisuals()
  }, [resetMarbleVisuals])

  const restartLevel = useCallback(() => {
    setPlacements([])
    setSelectedCell(null)
    setTool("ramp")
    setToolOrientations(DEFAULT_ORIENTATIONS)
    setRunState("editing")
    setStatusMessage(level.objective)
    resetMarbleVisuals()
  }, [level.objective, resetMarbleVisuals])

  const loadLevel = useCallback(
    (index: number) => {
      stopAnimation()
      clearTrail()
      setLevelIndex(index)
      setPlacements([])
      setSelectedCell(null)
      setHoveredCell(null)
      setTool("ramp")
      setToolOrientations(DEFAULT_ORIENTATIONS)
      setRunState("editing")
      setStatusMessage(MARBLE_RUN_LEVELS[index].objective)
    },
    [clearTrail, stopAnimation],
  )

  const goToLevel = useCallback(
    (index: number) => {
      if (runState === "running") return
      loadLevel(index)
    },
    [loadLevel, runState],
  )

  const goNext = useCallback(() => {
    if (runState !== "success") return
    if (levelIndex >= MARBLE_RUN_LEVELS.length - 1) {
      setStatusMessage("All levels solved.")
      return
    }
    loadLevel(levelIndex + 1)
  }, [levelIndex, loadLevel, runState])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return
      }

      if (event.key.toLowerCase() === "r") {
        event.preventDefault()
        rotateActive()
      } else if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault()
        eraseSelected()
      } else if (event.key === " " || event.key === "Enter") {
        event.preventDefault()
        runSimulation()
      } else if (event.key === "Escape") {
        event.preventDefault()
        setSelectedCell(null)
        setHoveredCell(null)
        setStatusMessage("Selection cleared.")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [eraseSelected, rotateActive, runSimulation])

  const hoverProblem =
    hoveredCell && tool !== "erase"
      ? getPlacementProblem(hoveredCell.row, hoveredCell.col, tool)
      : null

  return (
    <section className="bg-[#eee8dc] py-14 text-[#2b261f] md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <FadeIn className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f6251]">
            {t.gamesPage.marbleEyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
            {t.gamesPage.marbleTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#615748]">
            {t.gamesPage.marbleDesc}
          </p>
        </FadeIn>

        <FadeIn delay={90}>
          <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-end justify-between gap-3 border-b border-[#cdbfaa] pb-3">
                <div>
                  <p className="text-sm font-semibold text-[#6a5840]">
                    Level {formatLevelNumber(levelIndex)} / {MARBLE_RUN_LEVELS.length}
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold leading-tight">{level.name}</h3>
                </div>
                <p className="text-sm text-[#6a5840]">State: {RUN_STATE_LABELS[runState]}</p>
              </div>

              <p className="mb-4 max-w-3xl text-sm leading-relaxed text-[#544a3d]">
                {level.objective}
              </p>

              <div className="relative border border-[#342f29] bg-[#3a3027] p-2 shadow-[0_18px_40px_-28px_rgba(31,24,18,0.55)] md:p-3">
                <div
                  ref={setBoardNode}
                  className="relative grid aspect-[9/8] overflow-hidden border border-[#342f29] bg-[#f8f2e8]"
                  style={{ gridTemplateColumns: `repeat(${MARBLE_COLS}, minmax(0, 1fr))` }}
                >
                  <MarbleBoardCells
                    fixedByKey={fixedByKey}
                    hoverProblem={hoverProblem}
                    hoveredCell={hoveredCell}
                    level={level}
                    onCellClick={handleCellClick}
                    onHoverCell={setHoveredCell}
                    placedByKey={placedByKey}
                    runState={runState}
                    selectedCell={selectedCell}
                    tool={tool}
                    toolOrientations={toolOrientations}
                  />

                  <svg
                    className="pointer-events-none absolute inset-0 z-20 h-full w-full"
                    viewBox={`0 0 ${boardSize.width || MARBLE_COLS * 80} ${
                      boardSize.height || MARBLE_ROWS * 80
                    }`}
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      ref={setTrailNode}
                      d=""
                      fill="none"
                      stroke="#7f684a"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      opacity="0.34"
                    />
                  </svg>

                  <div
                    ref={setMarbleNode}
                    className="pointer-events-none absolute left-0 top-0 z-30 rounded-full border border-[#7c4d2b] bg-[radial-gradient(circle_at_32%_28%,#fff5d2_0_13%,#d39145_14%_47%,#874b2c_78%)] shadow-[0_5px_9px_rgba(45,31,18,0.28)]"
                    style={{ width: marbleDiameter, height: marbleDiameter }}
                    aria-hidden="true"
                  >
                    <span className="absolute left-[18%] top-1/2 h-[2px] w-[64%] -translate-y-1/2 rounded-sm bg-[#5d3523]/55" />
                    <span className="absolute left-1/2 top-[18%] h-[64%] w-[2px] -translate-x-1/2 rounded-sm bg-[#5d3523]/35" />
                  </div>
                </div>
              </div>

              <div className="mt-3 min-h-16 border border-[#cdbfaa] bg-[#f7efe3] px-4 py-3 text-sm leading-relaxed text-[#493f33]">
                <p>{hoverProblem ?? statusMessage}</p>
                <p className="mt-1 text-xs text-[#756753]">
                  Press R to rotate. Press Backspace or Delete to erase a selected piece. Press Space or Enter to run.
                </p>
              </div>
            </div>

            <aside className="border border-[#c7b79f] bg-[#f7efe3] p-4">
              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#6a5840]">
                  Levels
                </h3>
                <div className="mt-3 grid grid-cols-5 gap-x-2 gap-y-1">
                  {MARBLE_RUN_LEVELS.map((candidate, index) => (
                    <button
                      key={candidate.id}
                      type="button"
                      disabled={runState === "running"}
                      onClick={() => goToLevel(index)}
                      className={cn(
                        "border-b px-1 py-1.5 text-left text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                        index === levelIndex
                          ? "border-[#2f2922] bg-[#eadcc8] text-[#2f2922]"
                          : "border-[#c7b79f] text-[#6a5840] hover:bg-[#efe4d3]",
                      )}
                    >
                      {formatLevelNumber(index)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-[#cdbfaa] pt-5">
                <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#6a5840]">
                  Inventory
                </h3>
                <div className="mt-3 grid gap-2">
                  {BUILD_TOOLS.map((kind) => (
                    <button
                      key={kind}
                      type="button"
                      disabled={runState === "running" || (remaining[kind] <= 0 && tool !== kind)}
                      onClick={() => chooseTool(kind)}
                      className={cn(
                        "flex items-center justify-between border px-3 py-2 text-left text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-45",
                        tool === kind
                          ? "border-[#2f2922] bg-[#eadcc8] text-[#2f2922]"
                          : "border-[#c7b79f] bg-[#fcf7ee] text-[#493f33] hover:bg-[#efe4d3]",
                      )}
                    >
                      <span>
                        {PIECE_LABELS[kind]} {remaining[kind]}
                      </span>
                      <span className="font-mono text-xs text-[#756753]">
                        {orientationLabel(kind, toolOrientations[kind])}
                      </span>
                    </button>
                  ))}
                  <button
                    type="button"
                    disabled={runState === "running"}
                    onClick={() => chooseTool("erase")}
                    className={cn(
                      "border px-3 py-2 text-left text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-45",
                      tool === "erase"
                        ? "border-[#2f2922] bg-[#eadcc8] text-[#2f2922]"
                        : "border-[#c7b79f] bg-[#fcf7ee] text-[#493f33] hover:bg-[#efe4d3]",
                    )}
                  >
                    Erase
                  </button>
                </div>
              </div>

              <div className="mt-6 border-t border-[#cdbfaa] pt-5">
                <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#6a5840]">
                  Controls
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <ControlButton disabled={runState === "running"} onClick={runSimulation}>
                    Run
                  </ControlButton>
                  <ControlButton disabled={runState === "running"} onClick={resetMarble}>
                    Reset
                  </ControlButton>
                  <ControlButton disabled={runState === "running"} onClick={clearBoard}>
                    Clear
                  </ControlButton>
                  <ControlButton disabled={runState === "running"} onClick={restartLevel}>
                    Restart level
                  </ControlButton>
                  <ControlButton disabled={runState === "running"} onClick={rotateActive}>
                    Rotate
                  </ControlButton>
                  <ControlButton disabled={runState === "running" || !selectedPiece} onClick={eraseSelected}>
                    Erase selected
                  </ControlButton>
                </div>
                {runState === "success" && levelIndex < MARBLE_RUN_LEVELS.length - 1 && (
                  <button
                    type="button"
                    onClick={goNext}
                    className="mt-3 w-full border border-[#2f2922] bg-[#2f2922] px-3 py-2.5 text-sm font-extrabold text-[#f8f2e8] transition-colors hover:bg-[#453c32]"
                  >
                    Next
                  </button>
                )}
              </div>

              <div className="mt-6 border-t border-[#cdbfaa] pt-5 text-sm leading-relaxed text-[#544a3d]">
                <p>Best known: {level.bestKnown} pieces</p>
                <p className="mt-2">
                  Pipes show their openings. Empty cells let the marble fall. Bounce pads launch in the direction shown by their face.
                </p>
              </div>
            </aside>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function ControlButton({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="border border-[#c7b79f] bg-[#fcf7ee] px-3 py-2 text-sm font-semibold text-[#493f33] transition-colors hover:bg-[#efe4d3] disabled:cursor-not-allowed disabled:opacity-45"
    >
      {children}
    </button>
  )
}

function MarbleBoardCells({
  fixedByKey,
  hoverProblem,
  hoveredCell,
  level,
  onCellClick,
  onHoverCell,
  placedByKey,
  runState,
  selectedCell,
  tool,
  toolOrientations,
}: {
  fixedByKey: Map<string, MarbleLevel["fixed"][number]>
  hoverProblem: string | null
  hoveredCell: { row: number; col: number } | null
  level: MarbleLevel
  onCellClick: (row: number, col: number) => void
  onHoverCell: (cell: { row: number; col: number } | null) => void
  placedByKey: Map<string, PlacedPiece>
  runState: RunState
  selectedCell: { row: number; col: number } | null
  tool: Tool
  toolOrientations: Record<BuildablePieceKind, number>
}) {
  return (
    <>
      {Array.from({ length: MARBLE_ROWS }).map((_, row) =>
        Array.from({ length: MARBLE_COLS }).map((__, col) => {
          const key = cellKey(row, col)
          const fixed = fixedByKey.get(key)
          const placed = placedByKey.get(key) ?? null
          const isStart = row === level.start.row && col === level.start.col
          const isGoal = row === level.goal.row && col === level.goal.col
          const isSelected = selectedCell?.row === row && selectedCell.col === col
          const isHovered = hoveredCell?.row === row && hoveredCell.col === col
          const activeHoverProblem = isHovered ? hoverProblem : null
          const previewKind: BuildablePieceKind | null = tool === "erase" ? null : tool
          const canPreview = isHovered && previewKind !== null && !placed && !activeHoverProblem
          const previewPiece: TrackPiece | null =
            canPreview && previewKind
              ? { kind: previewKind, orientation: toolOrientations[previewKind] }
              : null
          const invalidHover = isHovered && previewKind !== null && Boolean(activeHoverProblem)

          return (
            <button
              key={key}
              type="button"
              disabled={runState === "running"}
              onClick={() => onCellClick(row, col)}
              onMouseEnter={() => onHoverCell({ row, col })}
              onMouseLeave={() => onHoverCell(null)}
              onFocus={() => onHoverCell({ row, col })}
              onBlur={() => onHoverCell(null)}
              aria-label={cellAriaLabel(row, col, {
                fixed,
                placed,
                isStart,
                isGoal,
              })}
              className={cn(
                "relative aspect-square overflow-hidden border border-[#d9ccb8] bg-[#f8f2e8] transition-colors focus-visible:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#38566c]",
                runState === "running" ? "cursor-default" : "cursor-pointer",
                fixed?.kind === "wall" && "bg-[#3a342e]",
                fixed?.kind === "hazard" && "bg-[#27231f]",
                fixed?.kind === "wrong" && "bg-[#eee0cf]",
                fixed?.kind === "piece" && "bg-[#f2eadc]",
                isStart && "bg-[#efe4d3]",
                isGoal && "bg-[#efe1cc]",
                isSelected && "z-10 outline outline-2 outline-[#34536a]",
                invalidHover && "outline outline-2 outline-[#9b4d2f]",
              )}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.14]"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, transparent 0 48%, #8f806b 49% 51%, transparent 52% 100%)",
                  backgroundSize: "22px 22px",
                }}
              />
              {fixed && <FixedCellArtwork fixed={fixed} />}
              {isStart && <StartArtwork />}
              {isGoal && <CupArtwork />}
              {placed && <TrackPieceArtwork piece={placed} />}
              {previewPiece && <TrackPieceArtwork piece={previewPiece} preview />}
            </button>
          )
        }),
      )}
    </>
  )
}

function cellAriaLabel(
  row: number,
  col: number,
  cell: {
    fixed: (typeof MARBLE_RUN_LEVELS)[number]["fixed"][number] | undefined
    placed: PlacedPiece | null
    isStart: boolean
    isGoal: boolean
  },
) {
  if (cell.isStart) return `Release point at row ${row + 1}, column ${col + 1}`
  if (cell.isGoal) return `Cup at row ${row + 1}, column ${col + 1}`
  if (cell.placed) return `${PIECE_LABELS[cell.placed.kind]} at row ${row + 1}, column ${col + 1}`
  if (cell.fixed?.kind === "wall") return `Fixed wall at row ${row + 1}, column ${col + 1}`
  if (cell.fixed?.kind === "hazard") return `Hazard at row ${row + 1}, column ${col + 1}`
  if (cell.fixed?.kind === "wrong") return `Wrong catch area at row ${row + 1}, column ${col + 1}`
  if (cell.fixed?.kind === "piece") return `Locked ${cell.fixed.piece.kind} at row ${row + 1}, column ${col + 1}`
  return `Empty cell at row ${row + 1}, column ${col + 1}`
}

function orientationLabel(kind: BuildablePieceKind, orientation: number) {
  const normalized = normalizeOrientation(kind, orientation)
  if (kind === "ramp") return normalized === 0 ? "down right" : "down left"
  if (kind === "bounce") return ["right", "down", "left", "up"][normalized]
  if (kind === "pipe") {
    return ["vertical", "horizontal", "top-right", "top-left", "bottom-right", "bottom-left"][
      normalized
    ]
  }
  return "wall"
}

function FixedCellArtwork({ fixed }: { fixed: (typeof MARBLE_RUN_LEVELS)[number]["fixed"][number] }) {
  if (fixed.kind === "wall") {
    return (
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <rect x="0" y="0" width="48" height="48" fill="#3a342e" />
        <path d="M4 16H44M4 31H44M16 4V16M31 16V31M14 31V44" stroke="#6a5d4f" strokeWidth="1.5" />
      </svg>
    )
  }

  if (fixed.kind === "hazard") {
    return (
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <rect x="0" y="0" width="48" height="48" fill="#2b2722" />
        <ellipse cx="24" cy="25" rx="15" ry="11" fill="#12100e" />
        <ellipse cx="24" cy="21" rx="12" ry="7" fill="#3b332a" opacity="0.45" />
      </svg>
    )
  }

  if (fixed.kind === "wrong") {
    return (
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M13 30H35L31 38H17Z" fill="#d1b996" stroke="#6a5840" strokeWidth="2" />
        <path d="M16 27H32" stroke="#6a5840" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M18 33H30" stroke="#9b4d2f" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (fixed.kind === "piece") {
    return (
      <>
        <TrackPieceArtwork piece={fixed.piece} locked />
        <span className="absolute bottom-1 right-1 h-1.5 w-1.5 border border-[#6a5840] bg-[#2f2922]" />
      </>
    )
  }

  return null
}

function StartArtwork() {
  return (
    <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <path d="M18 0H30V28C30 31.5 27.5 34 24 34C20.5 34 18 31.5 18 28Z" fill="#d8c2a1" stroke="#5a4835" strokeWidth="2" />
      <path d="M15 34H33" stroke="#5a4835" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 8V27" stroke="#5a4835" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function CupArtwork() {
  return (
    <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <path d="M14 24H34L31 39H17Z" fill="#d7bc8d" stroke="#4f3f2e" strokeWidth="2.4" />
      <path d="M12 22H36" stroke="#4f3f2e" strokeWidth="3" strokeLinecap="round" />
      <path d="M18 39H30" stroke="#4f3f2e" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M18 28H30" stroke="#fff3d7" strokeWidth="1.4" strokeLinecap="round" opacity="0.65" />
    </svg>
  )
}

function TrackPieceArtwork({
  piece,
  preview,
  locked,
}: {
  piece: TrackPiece
  preview?: boolean
  locked?: boolean
}) {
  const orientation = normalizeOrientation(piece.kind, piece.orientation)

  return (
    <span
      className={cn(
        "pointer-events-none absolute inset-[8%] block [animation:block-pop-in_150ms_ease-out]",
        preview && "opacity-45",
        locked && "opacity-90",
      )}
      aria-hidden="true"
    >
      {piece.kind === "ramp" && <RampSvg orientation={orientation} />}
      {piece.kind === "pipe" && <PipeSvg orientation={orientation} />}
      {piece.kind === "blocker" && <BlockerSvg />}
      {piece.kind === "bounce" && <BounceSvg orientation={orientation} />}
    </span>
  )
}

function RampSvg({ orientation }: { orientation: number }) {
  const slash = orientation === 1
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full">
      <path
        d={slash ? "M40 10L8 38" : "M8 10L40 38"}
        stroke="#5c4128"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d={slash ? "M40 10L8 38" : "M8 10L40 38"}
        stroke="#c79a61"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d={slash ? "M34 15L13 33" : "M14 15L35 34"}
        stroke="#7b5836"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PipeSvg({ orientation }: { orientation: number }) {
  const paths = [
    "M24 0V48",
    "M0 24H48",
    "M24 0C24 15 33 24 48 24",
    "M24 0C24 15 15 24 0 24",
    "M24 48C24 33 33 24 48 24",
    "M24 48C24 33 15 24 0 24",
  ]
  const d = paths[orientation] ?? paths[0]

  return (
    <svg viewBox="0 0 48 48" className="h-full w-full">
      <path d={d} fill="none" stroke="#4f3f2e" strokeWidth="15" strokeLinecap="round" />
      <path d={d} fill="none" stroke="#d7c3a5" strokeWidth="10" strokeLinecap="round" />
      <path d={d} fill="none" stroke="#f4e7d2" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
    </svg>
  )
}

function BlockerSvg() {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full">
      <rect x="8" y="8" width="32" height="32" fill="#3d352d" stroke="#1f1a16" strokeWidth="2.5" />
      <path d="M12 19H36M12 30H36M23 9V19M30 19V30M19 30V39" stroke="#716251" strokeWidth="1.5" />
    </svg>
  )
}

function BounceSvg({ orientation }: { orientation: number }) {
  const rotation = orientation * 90
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full">
      <g transform={`rotate(${rotation} 24 24)`}>
        <path d="M9 32C17 18 31 18 39 32" fill="none" stroke="#3d352d" strokeWidth="5" strokeLinecap="round" />
        <path d="M12 31C19 22 29 22 36 31" fill="none" stroke="#c78f45" strokeWidth="3" strokeLinecap="round" />
        <path d="M17 33V39M24 32V40M31 33V39" stroke="#6a4a2b" strokeWidth="2" strokeLinecap="round" />
        <path d="M34 17L41 24L34 31" fill="none" stroke="#3d352d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}
