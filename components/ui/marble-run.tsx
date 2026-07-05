"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { createLevelUpSounds, playRandomLevelUpSound } from "@/components/ui/level-up-sounds"
import { MARBLE_RUN_LEVELS } from "@/components/ui/marble-run-levels"
import {
  Check,
  Eraser,
  Lock,
  Play,
  RotateCcw,
  Sparkles,
  Target,
  Trash2,
  Trophy,
  Wrench,
} from "lucide-react"
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
type MarbleRunProgress = {
  version: 1
  highestUnlockedLevel: number
  completedLevels: number[]
  bestPiecesByLevel: Record<string, number>
}

const BUILD_TOOLS: BuildablePieceKind[] = ["ramp", "pipe", "blocker", "bounce"]
const ROLLING_SOUND_PATH = "/audio/freesound_community-rolling-cart-002-86702.mp3"
const PROGRESS_STORAGE_KEY = "avanza:marble-run-progress:v1"

const DEFAULT_ORIENTATIONS: Record<BuildablePieceKind, number> = {
  ramp: 0,
  pipe: 0,
  blocker: 0,
  bounce: 0,
}

function cellKey(row: number, col: number) {
  return `${row}:${col}`
}

function formatLevelNumber(index: number) {
  return String(index + 1).padStart(2, "0")
}

function defaultProgress(): MarbleRunProgress {
  return {
    version: 1,
    highestUnlockedLevel: MARBLE_RUN_LEVELS[0]?.id ?? 1,
    completedLevels: [],
    bestPiecesByLevel: {},
  }
}

function indexForLevelId(levelId: number) {
  return MARBLE_RUN_LEVELS.findIndex((candidate) => candidate.id === levelId)
}

function levelIdForIndex(index: number) {
  return MARBLE_RUN_LEVELS[Math.min(Math.max(index, 0), MARBLE_RUN_LEVELS.length - 1)]?.id ?? 1
}

function highestUnlockedIndex(progress: MarbleRunProgress) {
  const index = indexForLevelId(progress.highestUnlockedLevel)
  return index >= 0 ? index : 0
}

function normalizeSavedProgress(value: unknown): MarbleRunProgress {
  if (!value || typeof value !== "object") return defaultProgress()

  const record = value as Record<string, unknown>
  const validLevelIds = new Set(MARBLE_RUN_LEVELS.map((candidate) => candidate.id))
  const completedLevels = Array.isArray(record.completedLevels)
    ? Array.from(
        new Set(
          record.completedLevels.filter(
            (levelId): levelId is number => Number.isInteger(levelId) && validLevelIds.has(levelId),
          ),
        ),
      ).sort((a, b) => a - b)
    : []

  const savedHighest =
    typeof record.highestUnlockedLevel === "number"
      ? record.highestUnlockedLevel
      : typeof record.highestUnlockedLevelId === "number"
        ? record.highestUnlockedLevelId
        : null

  let highestIndex = savedHighest === null ? 0 : indexForLevelId(savedHighest)
  if (highestIndex < 0) {
    highestIndex = savedHighest === null ? 0 : Math.min(Math.max(Math.floor(savedHighest) - 1, 0), MARBLE_RUN_LEVELS.length - 1)
  }

  if (savedHighest === null) {
    let derivedIndex = 0
    while (
      derivedIndex < MARBLE_RUN_LEVELS.length - 1 &&
      completedLevels.includes(MARBLE_RUN_LEVELS[derivedIndex]?.id)
    ) {
      derivedIndex += 1
    }
    highestIndex = derivedIndex
  }

  const bestPiecesByLevel: Record<string, number> = {}
  const rawBests = record.bestPiecesByLevel
  if (rawBests && typeof rawBests === "object" && !Array.isArray(rawBests)) {
    for (const [levelId, best] of Object.entries(rawBests as Record<string, unknown>)) {
      const numericLevelId = Number(levelId)
      if (Number.isInteger(numericLevelId) && validLevelIds.has(numericLevelId) && Number.isFinite(best)) {
        bestPiecesByLevel[levelId] = Math.max(0, Math.floor(best as number))
      }
    }
  }

  return {
    version: 1,
    highestUnlockedLevel: levelIdForIndex(highestIndex),
    completedLevels,
    bestPiecesByLevel,
  }
}

export function MarbleRun() {
  const { t } = useLanguage()
  const [levelIndex, setLevelIndex] = useState(0)
  const level = MARBLE_RUN_LEVELS[levelIndex]
  const [progress, setProgress] = useState<MarbleRunProgress>(() => defaultProgress())
  const [progressLoaded, setProgressLoaded] = useState(false)
  const [placements, setPlacements] = useState<PlacedPiece[]>([])
  const [tool, setTool] = useState<Tool>("ramp")
  const [toolOrientations, setToolOrientations] =
    useState<Record<BuildablePieceKind, number>>(DEFAULT_ORIENTATIONS)
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null)
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null)
  const [failureCell, setFailureCell] = useState<{ row: number; col: number } | null>(null)
  const [activeBounceCell, setActiveBounceCell] = useState<{ row: number; col: number } | null>(null)
  const [runState, setRunState] = useState<RunState>("editing")
  const [statusMessage, setStatusMessage] = useState(MARBLE_RUN_LEVELS[0].objective)
  const [boardSize, setBoardSize] = useState({ width: 0, height: 0 })

  const boardRef = useRef<HTMLDivElement | null>(null)
  const marbleRef = useRef<HTMLDivElement | null>(null)
  const trailRef = useRef<SVGPathElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const marbleBaseTransformRef = useRef("")
  const rollingSoundRef = useRef<HTMLAudioElement | null>(null)
  const levelUpSoundsRef = useRef<HTMLAudioElement[]>([])

  const completedLevelIds = useMemo(() => new Set(progress.completedLevels), [progress.completedLevels])
  const highestAvailableIndex = highestUnlockedIndex(progress)
  const currentBestPieces = progress.bestPiecesByLevel[String(level.id)]
  const completedCount = completedLevelIds.size
  const isFinalLevel = levelIndex === MARBLE_RUN_LEVELS.length - 1
  const isFinalComplete = runState === "success" && isFinalLevel

  const isLevelUnlocked = useCallback(
    (index: number) => {
      const candidate = MARBLE_RUN_LEVELS[index]
      if (!candidate) return false
      return index <= highestAvailableIndex || completedLevelIds.has(candidate.id)
    },
    [completedLevelIds, highestAvailableIndex],
  )

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

  const stopRollingSound = useCallback(() => {
    const sound = rollingSoundRef.current
    if (!sound) return

    sound.pause()
    sound.currentTime = 0
  }, [])

  const playRollingSound = useCallback(() => {
    const sound = rollingSoundRef.current
    if (!sound || !sound.paused) return

    sound.currentTime = 0
    void sound.play().catch(() => {
      // Browsers can block audio if the run was not started by a user gesture.
    })
  }, [])

  const stopAnimation = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    stopRollingSound()
  }, [stopRollingSound])

  const resetMarbleVisuals = useCallback(() => {
    stopAnimation()
    clearTrail()
    if (marbleRef.current) {
      marbleRef.current.style.opacity = "1"
      marbleRef.current.style.zIndex = "30"
    }
    applyMarbleTransform(sidePoint(level.start.row, level.start.col, "top"), 0)
  }, [applyMarbleTransform, clearTrail, level.start.col, level.start.row, stopAnimation])

  const recordSuccessfulRun = useCallback(
    (resultMessage: string) => {
      const nextLevel = MARBLE_RUN_LEVELS[levelIndex + 1]
      const nextWasLocked = nextLevel ? !isLevelUnlocked(levelIndex + 1) : false
      const placedPieceCount = placements.length

      setProgress((current) => {
        const completed = new Set(current.completedLevels)
        completed.add(level.id)

        const nextUnlockedIndex = nextLevel
          ? Math.max(highestUnlockedIndex(current), levelIndex + 1)
          : highestUnlockedIndex(current)

        const previousBest = current.bestPiecesByLevel[String(level.id)]
        const bestPieces =
          previousBest === undefined ? placedPieceCount : Math.min(previousBest, placedPieceCount)

        return {
          version: 1,
          highestUnlockedLevel: levelIdForIndex(nextUnlockedIndex),
          completedLevels: Array.from(completed).sort((a, b) => a - b),
          bestPiecesByLevel: {
            ...current.bestPiecesByLevel,
            [String(level.id)]: bestPieces,
          },
        }
      })

      const pieceLabel = placedPieceCount === 1 ? "piece" : "pieces"
      if (!nextLevel) {
        setStatusMessage(`${resultMessage} Final course complete. You solved every marble run.`)
        return
      }

      if (nextWasLocked) {
        setStatusMessage(
          `${resultMessage} Level ${formatLevelNumber(levelIndex + 1)} unlocked. You used ${placedPieceCount} ${pieceLabel}.`,
        )
        return
      }

      setStatusMessage(`${resultMessage} You used ${placedPieceCount} ${pieceLabel}.`)
    },
    [isLevelUnlocked, level.id, levelIndex, placements.length],
  )

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const errors = validateMarbleRunLevels(MARBLE_RUN_LEVELS)
      if (errors.length) {
        console.warn(`Marble run level validation failed:\n${errors.join("\n")}`)
      }
    }
  }, [])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(PROGRESS_STORAGE_KEY)
        setProgress(saved ? normalizeSavedProgress(JSON.parse(saved)) : defaultProgress())
      } catch {
        setProgress(defaultProgress())
      } finally {
        setProgressLoaded(true)
      }
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (!progressLoaded) return

    try {
      window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress))
    } catch {
      // Storage can be unavailable in private modes; progression should still work in memory.
    }
  }, [progress, progressLoaded])

  useEffect(() => {
    const audio = new Audio(ROLLING_SOUND_PATH)
    audio.preload = "auto"
    audio.loop = true
    audio.volume = 0.45
    rollingSoundRef.current = audio
    levelUpSoundsRef.current = createLevelUpSounds(0.7)

    return () => {
      audio.pause()
      rollingSoundRef.current = null
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
      if (fixed?.kind === "wrong") return "That miss marker is fixed."
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
      setFailureCell(null)
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
    setFailureCell(null)
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
    setFailureCell(null)
    setStatusMessage("Piece removed.")
    clearTrail()
  }, [clearTrail, placedByKey, runState, selectedCell])

  const chooseTool = useCallback(
    (nextTool: Tool) => {
      if (runState === "running") return
      setTool(nextTool)
      setSelectedCell(null)
      setFailureCell(null)
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
        setFailureCell(null)
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
      setFailureCell(null)
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
        if (result.status === "success") {
          recordSuccessfulRun(result.message)
        } else {
          setFailureCell(result.failureCell)
          setStatusMessage(result.message)
        }
        return
      }

      const trail = trailRef.current
      const marble = marbleRef.current
      const completedTrailPoints: BoardPoint[] = []
      let segmentIndex = 0
      let progress = 0
      let velocity = 1.9
      let rotation = 0
      let lastTime = performance.now()
      let activeBounceKey: string | null = null

      const accelerationFor = (kind: CourseSegment["kind"]) => {
        if (kind === "fall") return 5.5
        if (kind === "ramp") return 3.2
        if (kind === "pipe") return 0.8
        if (kind === "bounce") return 12
        return -1.5
      }

      const speedLimitFor = (kind: CourseSegment["kind"]) => {
        if (kind === "bounce") return 7.2
        if (kind === "fall") return 5.2
        if (kind === "pipe") return 3.1
        return 4.5
      }

      const pointsForSegment = (segment: CourseSegment) =>
        segment.path.length >= 2 ? segment.path : [segment.from, segment.to]

      const segmentLength = (segment: CourseSegment) => {
        const points = pointsForSegment(segment)
        return points.slice(1).reduce((total, point, index) => {
          const previous = points[index]
          return total + Math.hypot(point.x - previous.x, point.y - previous.y)
        }, 0)
      }

      const pointOnSegment = (segment: CourseSegment, amount: number) => {
        const length = segmentLength(segment) || 1
        const tValue = Math.min(1, Math.max(0, amount / length))
        const points = pointsForSegment(segment)
        let remaining = Math.min(amount, length)

        for (let index = 1; index < points.length; index++) {
          const previous = points[index - 1]
          const point = points[index]
          const legLength = Math.hypot(point.x - previous.x, point.y - previous.y)
          if (remaining <= legLength || index === points.length - 1) {
            const legT = legLength ? Math.min(1, remaining / legLength) : 1
            return {
              point: {
                x: previous.x + (point.x - previous.x) * legT,
                y: previous.y + (point.y - previous.y) * legT,
              },
              tValue,
            }
          }
          remaining -= legLength
        }

        return { point: segment.to, tValue }
      }

      const setTrailPath = (currentPoint: BoardPoint | null, activeSegment: CourseSegment | null) => {
        if (!trail) return
        const shouldShowCurrent = activeSegment && activeSegment.kind !== "pipe" && currentPoint
        const points = [
          ...completedTrailPoints,
          ...(shouldShowCurrent ? [currentPoint] : []),
        ].map(pointToPixel)
        const d = points
          .map((point, index) =>
            `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`,
          )
          .join(" ")
        trail.setAttribute("d", d)
      }

      const finish = () => {
        animationRef.current = null
        stopRollingSound()
        const lastSegment = segments[segments.length - 1]
        applyMarbleTransform(lastSegment.to, rotation, result.status === "success" ? 0.88 : 1)
        setActiveBounceCell(null)
        if (marble) {
          marble.style.opacity = "1"
          marble.style.zIndex = "30"
        }
        setTrailPath(lastSegment.kind === "pipe" ? null : lastSegment.to, lastSegment)

        if (result.status === "failure" && marble && marbleBaseTransformRef.current) {
          setFailureCell(result.failureCell)
          marble.animate(
            [
              { transform: `${marbleBaseTransformRef.current} scale(1)` },
              { transform: `${marbleBaseTransformRef.current} scale(0.9)` },
              { transform: `${marbleBaseTransformRef.current} scale(1)` },
            ],
            { duration: 180, easing: "cubic-bezier(.2,.8,.2,1)" },
          )
        }

        if (result.status === "success") {
          playRandomLevelUpSound(levelUpSoundsRef.current)
        }
        setRunState(result.status === "success" ? "success" : "failure")
        if (result.status === "success") {
          recordSuccessfulRun(result.message)
        } else {
          setStatusMessage(result.message)
        }
      }

      const frame = (now: number) => {
        const dt = Math.min(0.034, Math.max(0.001, (now - lastTime) / 1000))
        lastTime = now

        let activeSegment = segments[segmentIndex]
        if (!activeSegment) {
          finish()
          return
        }

        const nextBounceKey =
          activeSegment.kind === "bounce" ? cellKey(activeSegment.row, activeSegment.col) : null
        if (nextBounceKey !== activeBounceKey) {
          activeBounceKey = nextBounceKey
          setActiveBounceCell(
            activeSegment.kind === "bounce"
              ? { row: activeSegment.row, col: activeSegment.col }
              : null,
          )
        }

        velocity = Math.max(
          0.85,
          Math.min(speedLimitFor(activeSegment.kind), velocity + accelerationFor(activeSegment.kind) * dt),
        )
        if (activeSegment.kind === "bounce") velocity = Math.max(velocity, 5.4)

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
            if (activeSegment.kind !== "pipe") {
              if (completedTrailPoints.length === 0) completedTrailPoints.push(activeSegment.from)
              completedTrailPoints.push(...pointsForSegment(activeSegment).slice(1))
            } else {
              completedTrailPoints.length = 0
            }
            segmentIndex += 1
            progress = 0
            activeSegment = segments[segmentIndex]
            if (activeSegment?.kind === "pipe") velocity *= 0.92
            if (activeSegment?.kind === "bounce") velocity = Math.max(velocity, 5.6)
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
            ? 1 + Math.sin(tValue * Math.PI) * 0.16
            : activeSegment.kind === "cup"
              ? 1 - tValue * 0.18
              : activeSegment.kind === "pipe"
                ? 0.78
                : 1

        if (marble) {
          marble.style.opacity = activeSegment.kind === "pipe" ? "0.42" : "1"
          marble.style.zIndex = activeSegment.kind === "pipe" ? "12" : "30"
        }

        applyMarbleTransform(point, rotation, scale)
        setTrailPath(point, activeSegment)
        animationRef.current = requestAnimationFrame(frame)
      }

      clearTrail()
      applyMarbleTransform(segments[0].from, 0)
      playRollingSound()
      animationRef.current = requestAnimationFrame(frame)
    },
    [
      applyMarbleTransform,
      boardSize.height,
      boardSize.width,
      clearTrail,
      marbleDiameter,
      playRollingSound,
      pointToPixel,
      recordSuccessfulRun,
      stopAnimation,
      stopRollingSound,
    ],
  )

  const runSimulation = useCallback(() => {
    if (runState === "running") return
    setSelectedCell(null)
    setHoveredCell(null)
    setFailureCell(null)
    setActiveBounceCell(null)
    const result = simulateCourse(level, placements)
    setRunState("running")
    setStatusMessage("Running the marble.")
    animateSimulation(result)
  }, [animateSimulation, level, placements, runState])

  const resetMarble = useCallback(() => {
    setRunState("editing")
    setSelectedCell(null)
    setFailureCell(null)
    setActiveBounceCell(null)
    setStatusMessage("Marble reset. Your placed pieces are still on the board.")
    resetMarbleVisuals()
  }, [resetMarbleVisuals])

  const clearBoard = useCallback(() => {
    setPlacements([])
    setSelectedCell(null)
    setRunState("editing")
    setFailureCell(null)
    setActiveBounceCell(null)
    setStatusMessage("Board cleared.")
    resetMarbleVisuals()
  }, [resetMarbleVisuals])

  const restartLevel = useCallback(() => {
    setPlacements([])
    setSelectedCell(null)
    setTool("ramp")
    setToolOrientations(DEFAULT_ORIENTATIONS)
    setRunState("editing")
    setFailureCell(null)
    setActiveBounceCell(null)
    setStatusMessage(level.objective)
    resetMarbleVisuals()
  }, [level.objective, resetMarbleVisuals])

  const replayLevel = useCallback(() => {
    restartLevel()
  }, [restartLevel])

  const loadLevel = useCallback(
    (index: number, options?: { force?: boolean }) => {
      const nextLevel = MARBLE_RUN_LEVELS[index]
      if (!nextLevel) return false

      if (!options?.force && !isLevelUnlocked(index)) {
        setStatusMessage("Complete the previous level to unlock this course.")
        return false
      }

      stopAnimation()
      clearTrail()
      setLevelIndex(index)
      setPlacements([])
      setSelectedCell(null)
      setHoveredCell(null)
      setFailureCell(null)
      setActiveBounceCell(null)
      setTool("ramp")
      setToolOrientations(DEFAULT_ORIENTATIONS)
      setRunState("editing")
      setStatusMessage(nextLevel.objective)
      return true
    },
    [clearTrail, isLevelUnlocked, stopAnimation],
  )

  const goToLevel = useCallback(
    (index: number) => {
      if (runState === "running") return
      loadLevel(index)
    },
    [loadLevel, runState],
  )

  const replayFromStart = useCallback(() => {
    if (runState === "running") return
    loadLevel(0, { force: true })
  }, [loadLevel, runState])

  const goNext = useCallback(() => {
    if (runState !== "success") return
    if (levelIndex >= MARBLE_RUN_LEVELS.length - 1) {
      setStatusMessage("Final course complete. You solved every marble run.")
      return
    }
    if (!isLevelUnlocked(levelIndex + 1)) {
      setStatusMessage("Complete this course to unlock the next one.")
      return
    }
    loadLevel(levelIndex + 1)
  }, [isLevelUnlocked, levelIndex, loadLevel, runState])

  const resetProgress = useCallback(() => {
    if (runState === "running") return

    const confirmed = window.confirm(
      "Reset marble run progress? This will lock every level except Level 1 and clear your saved bests.",
    )
    if (!confirmed) return

    const freshProgress = defaultProgress()
    setProgress(freshProgress)
    try {
      window.localStorage.removeItem(PROGRESS_STORAGE_KEY)
    } catch {
      // Ignore storage failures; the in-memory reset still applies immediately.
    }
    loadLevel(0, { force: true })
    setStatusMessage("Progress reset. Level 1 is unlocked.")
  }, [loadLevel, runState])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return
      }

      const key = event.key.toLowerCase()

      if (key === "n") {
        event.preventDefault()
        goNext()
      } else if (event.key === "Escape") {
        event.preventDefault()
        resetMarble()
      } else if (runState === "running") {
        return
      } else if (key === "r" && event.shiftKey) {
        event.preventDefault()
        restartLevel()
      } else if (key === "r") {
        event.preventDefault()
        rotateActive()
      } else if (key === "c") {
        event.preventDefault()
        clearBoard()
      } else if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault()
        eraseSelected()
      } else if (event.key === " " || event.key === "Enter") {
        event.preventDefault()
        runSimulation()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [clearBoard, eraseSelected, goNext, resetMarble, restartLevel, rotateActive, runSimulation, runState])

  const hoverProblem =
    hoveredCell && tool !== "erase"
      ? getPlacementProblem(hoveredCell.row, hoveredCell.col, tool)
      : null

  return (
    <section className="overflow-hidden bg-[#f4ead7] py-10 text-[#26313a] md:py-16">
      <div className="mx-auto max-w-7xl px-3 sm:px-5 md:px-6">
        <FadeIn className="max-w-3xl">
          <p className="inline-flex rounded-full border border-[#caa66b] bg-[#fff7e6] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[#7a5524] shadow-sm">
            {t.gamesPage.marbleEyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#24323d] md:text-4xl">
            {t.gamesPage.marbleTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#5f6d74]">
            {t.gamesPage.marbleDesc}
          </p>
        </FadeIn>

        <FadeIn delay={90}>
          <div className="mt-6 grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="min-w-0 max-lg:w-[calc(100vw-1.5rem)] max-lg:max-w-[calc(100vw-1.5rem)]">
              <div className="min-w-0 overflow-hidden rounded-t-lg border border-[#d5b77f] bg-[#fff7e8] px-4 py-3 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#7a5524]">
                      Level {formatLevelNumber(levelIndex)} / {MARBLE_RUN_LEVELS.length}
                    </p>
                    <h3 className="mt-1 text-xl font-extrabold leading-tight text-[#24323d]">
                      {level.name}
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c08b] bg-white px-3 py-1.5 text-xs font-bold text-[#5b6267]">
                    <Target className="h-4 w-4 text-[#d49421]" aria-hidden="true" />
                    <span>Par {level.bestKnown}</span>
                    {currentBestPieces !== undefined && <span>Your best {currentBestPieces}</span>}
                  </div>
                </div>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5b6267]">
                  {level.objective}
                </p>
              </div>

              <div className="relative min-w-0 overflow-hidden rounded-b-xl border-x border-b border-[#b88443] bg-[#c8914d] p-2 shadow-[0_22px_50px_-30px_rgba(42,28,13,0.75)] sm:p-3">
                <div className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-white/30" aria-hidden="true" />
                <div
                  ref={setBoardNode}
                  className="relative grid aspect-[9/8] w-full min-w-0 max-w-full overflow-hidden rounded-lg border border-[#80a8b6] bg-[#e8f6f8] shadow-[inset_0_2px_8px_rgba(30,75,92,0.18)]"
                  style={{ gridTemplateColumns: `repeat(${MARBLE_COLS}, minmax(0, 1fr))` }}
                >
                  <MarbleBoardCells
                    activeBounceCell={activeBounceCell}
                    failureCell={failureCell}
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
                      stroke="#1e9ca7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      strokeDasharray="1 10"
                      opacity="0.42"
                    />
                  </svg>

                  {runState === "success" && <CelebrationBurst final={isFinalLevel} />}

                  <div
                    ref={setMarbleNode}
                    className="pointer-events-none absolute left-0 top-0 z-30 rounded-full border border-[#6d3e22] bg-[radial-gradient(circle_at_32%_26%,#fffad0_0_14%,#f6bc45_15%_48%,#b65a2d_76%)] shadow-[0_7px_12px_rgba(45,31,18,0.3)]"
                    style={{ width: marbleDiameter, height: marbleDiameter }}
                    aria-hidden="true"
                  >
                    <span className="absolute left-[18%] top-1/2 h-[2px] w-[64%] -translate-y-1/2 rounded-sm bg-[#6f3a21]/55" />
                    <span className="absolute left-1/2 top-[18%] h-[64%] w-[2px] -translate-x-1/2 rounded-sm bg-[#6f3a21]/35" />
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  "mt-3 rounded-lg border px-4 py-3 text-sm leading-relaxed shadow-sm",
                  runState === "failure"
                    ? "border-[#e28b7a] bg-[#fff0ec] text-[#7c2c22]"
                    : runState === "success"
                      ? "border-[#94c678] bg-[#f0fbeb] text-[#315f2b]"
                      : "border-[#bfdbc4] bg-[#f9fff4] text-[#425258]",
                )}
              >
                {runState === "success" ? (
                  <LevelCompleteCard
                    completedCount={completedCount}
                    final={isFinalComplete}
                    levelCount={MARBLE_RUN_LEVELS.length}
                    onNext={goNext}
                    onReplay={isFinalComplete ? replayFromStart : replayLevel}
                    onResetProgress={resetProgress}
                  />
                ) : runState === "failure" ? (
                  <FailureCard message={statusMessage} onTryAgain={resetMarble} />
                ) : (
                  <>
                    <p className="font-semibold">{hoverProblem ?? statusMessage}</p>
                    <p className="mt-1 text-xs text-[#6b7478]">
                      Rotate with R, erase with Delete, then launch the marble.
                    </p>
                  </>
                )}
              </div>
            </div>

            <aside className="min-w-0 rounded-xl border border-[#d5b77f] bg-[#fff8ea] p-3 shadow-[0_18px_40px_-32px_rgba(42,28,13,0.65)] max-lg:w-[calc(100vw-1.5rem)] max-lg:max-w-[calc(100vw-1.5rem)] sm:p-4 lg:sticky lg:top-24">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#7a5524]">
                    Levels
                  </h3>
                  <button
                    type="button"
                    disabled={runState === "running"}
                    onClick={resetProgress}
                    className="text-xs font-bold text-[#7b6247] underline decoration-[#c6ad80] underline-offset-4 transition-colors hover:text-[#3f3328] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    Reset progress
                  </button>
                </div>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
                  {MARBLE_RUN_LEVELS.map((candidate, index) => {
                    const unlocked = isLevelUnlocked(index)
                    const completed = completedLevelIds.has(candidate.id)
                    const current = index === levelIndex

                    return (
                      <button
                        key={candidate.id}
                        type="button"
                        disabled={runState === "running" || !unlocked}
                        aria-label={
                          unlocked
                            ? `Level ${formatLevelNumber(index)}${completed ? ", completed" : ""}`
                            : `Level ${formatLevelNumber(index)} locked`
                        }
                        onClick={() => goToLevel(index)}
                        className={cn(
                          "inline-flex h-11 min-w-11 items-center justify-center gap-1 rounded-md border px-2 text-xs font-extrabold transition disabled:cursor-not-allowed",
                          current
                            ? "border-[#d49421] bg-[#ffd66f] text-[#3d2a09] shadow-[0_4px_0_#b88424]"
                            : completed
                              ? "border-[#7eb667] bg-[#e6f7db] text-[#315f2b] hover:bg-[#d8f0c9]"
                              : unlocked
                                ? "border-[#9fc9d2] bg-white text-[#35515b] hover:bg-[#eaf8fb]"
                                : "border-[#d7d2c7] bg-[#e9e3d7] text-[#8b8375] opacity-75",
                        )}
                      >
                        {!unlocked ? (
                          <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                        ) : completed ? (
                          <>
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>{formatLevelNumber(index)}</span>
                          </>
                        ) : (
                          <span>{formatLevelNumber(index)}</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mt-5 border-t border-[#e4c98e] pt-4">
                <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#7a5524]">
                  Tool Tray
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
                  {BUILD_TOOLS.map((kind) => {
                    const available = remaining[kind] > 0
                    const active = tool === kind && available

                    return (
                      <button
                        key={kind}
                        type="button"
                        disabled={runState === "running" || !available}
                        onClick={() => chooseTool(kind)}
                        className={cn(
                          "flex min-h-16 items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-xs font-extrabold transition disabled:cursor-not-allowed",
                          active
                            ? "border-[#2f74c0] bg-[#e7f1ff] text-[#153f73] shadow-[0_0_0_2px_rgba(47,116,192,0.18)]"
                            : available
                              ? "border-[#c9b179] bg-white text-[#37444c] hover:border-[#73b68a] hover:bg-[#f2fbef]"
                              : "border-[#ddd5c8] bg-[#eee8dd] text-[#958b7d] opacity-65",
                        )}
                      >
                        <PieceToolIcon kind={kind} orientation={toolOrientations[kind]} />
                        <span className="min-w-0 flex-1">
                          <span className="block leading-tight">{PIECE_LABELS[kind]}</span>
                          <span className="mt-0.5 block font-mono text-[11px] font-bold opacity-70">
                            {remaining[kind]} left
                          </span>
                        </span>
                      </button>
                    )
                  })}
                  <button
                    type="button"
                    disabled={runState === "running"}
                    onClick={() => chooseTool("erase")}
                    className={cn(
                      "flex min-h-16 items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-xs font-extrabold transition disabled:cursor-not-allowed disabled:opacity-45",
                      tool === "erase"
                        ? "border-[#2f74c0] bg-[#e7f1ff] text-[#153f73]"
                        : "border-[#c9b179] bg-white text-[#37444c] hover:bg-[#f7f0df]",
                    )}
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#f2efe8] text-[#6f5840]">
                      <Eraser className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>Erase</span>
                  </button>
                </div>
              </div>

              <div className="mt-5 border-t border-[#e4c98e] pt-4">
                <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#7a5524]">
                  Launch Controls
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <ControlButton primary disabled={runState === "running"} icon={Play} onClick={runSimulation}>
                    Run
                  </ControlButton>
                  <ControlButton disabled={runState === "running"} icon={RotateCcw} onClick={resetMarble}>
                    Reset
                  </ControlButton>
                  <ControlButton disabled={runState === "running"} icon={Trash2} onClick={clearBoard}>
                    Clear
                  </ControlButton>
                  <ControlButton disabled={runState === "running"} icon={Wrench} onClick={restartLevel}>
                    Restart
                  </ControlButton>
                  <ControlButton disabled={runState === "running"} icon={RotateCcw} onClick={rotateActive}>
                    Rotate
                  </ControlButton>
                  <ControlButton disabled={runState === "running" || !selectedPiece} icon={Eraser} onClick={eraseSelected}>
                    Erase
                  </ControlButton>
                </div>
              </div>

              <div className="mt-5 rounded-lg border border-[#d9c48e] bg-white/70 p-3 text-sm leading-relaxed text-[#4d5a60]">
                <p className="font-extrabold text-[#28353c]">Workshop Notes</p>
                <p className="mt-1">
                  Blue is selected, green is a valid build spot, red marks trouble, and gold marks the cup.
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
  icon: Icon,
  onClick,
  primary,
}: {
  children: React.ReactNode
  disabled?: boolean
  icon?: React.ComponentType<{ className?: string }>
  onClick: () => void
  primary?: boolean
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-extrabold transition disabled:cursor-not-allowed disabled:opacity-45",
        primary
          ? "border-[#1e7c55] bg-[#2eb66c] text-white shadow-[0_4px_0_#176642] hover:bg-[#28a761]"
          : "border-[#c9b179] bg-white text-[#37444c] hover:bg-[#f7f0df]",
      )}
    >
      {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
      {children}
    </button>
  )
}

function PieceToolIcon({
  kind,
  orientation,
}: {
  kind: BuildablePieceKind
  orientation: number
}) {
  return (
    <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#c8d9dc] bg-[#edf8fa] shadow-inner">
      <span className="absolute inset-1">
        <TrackPieceArtwork piece={{ kind, orientation }} />
      </span>
    </span>
  )
}

function LevelCompleteCard({
  completedCount,
  final,
  levelCount,
  onNext,
  onReplay,
  onResetProgress,
}: {
  completedCount: number
  final: boolean
  levelCount: number
  onNext: () => void
  onReplay: () => void
  onResetProgress: () => void
}) {
  if (final) {
    return (
      <div className="relative overflow-hidden rounded-lg border border-[#88bd6d] bg-[#f3fde9] p-4 [animation:win-banner-pop_260ms_ease-out]">
        <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true">
          <span className="absolute right-6 top-4 h-2 w-2 rounded-full bg-[#ffd66f]" />
          <span className="absolute right-14 top-10 h-2 w-2 rounded-full bg-[#56c7d6]" />
          <span className="absolute bottom-5 left-10 h-2 w-2 rounded-full bg-[#2eb66c]" />
        </div>
        <div className="relative flex items-start gap-3">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffd66f] text-[#563b0b] shadow-[0_4px_0_#c9931b]">
            <Trophy className="h-6 w-6" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-extrabold text-[#275322]">Challenge Complete!</p>
            <p className="mt-1 text-sm text-[#3f6c37]">
              You finished {completedCount} of {levelCount} marble machine levels.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onReplay}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#88bd6d] bg-white px-3 py-2 text-sm font-extrabold text-[#315f2b] hover:bg-[#ecf9e5]"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Replay Levels
              </button>
              <button
                type="button"
                onClick={onResetProgress}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#d3bb82] bg-[#fff8ea] px-3 py-2 text-sm font-extrabold text-[#6d4a16] hover:bg-[#fff1c8]"
              >
                Reset Progress
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-[#88bd6d] bg-[#f3fde9] p-4 [animation:win-banner-pop_240ms_ease-out]">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2eb66c] text-white shadow-[0_4px_0_#1d7547]">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-extrabold text-[#275322]">Level Complete!</p>
          <p className="mt-1 text-sm text-[#3f6c37]">Nice build. The next marble course is ready.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onNext}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#1e7c55] bg-[#2eb66c] px-3 py-2 text-sm font-extrabold text-white shadow-[0_4px_0_#176642] hover:bg-[#28a761]"
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              Next Level
            </button>
            <button
              type="button"
              onClick={onReplay}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#d3bb82] bg-white px-3 py-2 text-sm font-extrabold text-[#5f4b25] hover:bg-[#fff8ea]"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Improve Score
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function FailureCard({ message, onTryAgain }: { message: string; onTryAgain: () => void }) {
  return (
    <div className="rounded-lg border border-[#e28b7a] bg-[#fff0ec] p-4 [animation:win-banner-pop_180ms_ease-out]">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d94d39] text-white shadow-[0_4px_0_#9e2d21]">
          <Target className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-base font-extrabold text-[#7c2c22]">Try a New Route</p>
          <p className="mt-1 text-sm font-semibold text-[#7c2c22]">{message}</p>
          <button
            type="button"
            onClick={onTryAgain}
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#d94d39] bg-white px-3 py-2 text-sm font-extrabold text-[#7c2c22] hover:bg-[#fff8f5]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}

function CelebrationBurst({ final }: { final: boolean }) {
  const pieces = final ? 18 : 10

  return (
    <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden" aria-hidden="true">
      {Array.from({ length: pieces }).map((_, index) => (
        <span
          key={index}
          className="absolute top-[-10%] h-2.5 w-2 rounded-sm [animation:confetti-fall_1100ms_ease-out_forwards]"
          style={{
            left: `${8 + ((index * 17) % 84)}%`,
            animationDelay: `${index * 45}ms`,
            backgroundColor: ["#2eb66c", "#ffd66f", "#56c7d6", "#f06b4f"][index % 4],
            "--confetti-spin": `${index % 2 === 0 ? 360 : -360}deg`,
          } as React.CSSProperties}
        />
      ))}
      <span className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#ffd66f]/70 [animation:marble-goal-ring_650ms_ease-out_forwards]" />
    </div>
  )
}

function MarbleBoardCells({
  activeBounceCell,
  failureCell,
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
  activeBounceCell: { row: number; col: number } | null
  failureCell: { row: number; col: number } | null
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
          const isFailure = failureCell?.row === row && failureCell.col === col
          const isActiveBounce = activeBounceCell?.row === row && activeBounceCell.col === col
          const isGoalComplete = isGoal && runState === "success"
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
                "relative aspect-square min-w-0 overflow-hidden border border-[#b7d4dc] bg-[#eaf8fb] transition focus-visible:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2f74c0]",
                runState === "running" ? "cursor-default" : "cursor-pointer",
                fixed?.kind === "wall" && "bg-[#4b4037]",
                fixed?.kind === "hazard" && "bg-[#29211f]",
                fixed?.kind === "wrong" && "bg-[#f0e2d2]",
                fixed?.kind === "piece" && "bg-[#edf6f7]",
                isStart && "bg-[#fff1c8]",
                isGoal && "bg-[#fff4c9]",
                canPreview && "bg-[#e8f8df] ring-2 ring-inset ring-[#68b95b]",
                isSelected && "z-10 ring-2 ring-inset ring-[#2f74c0] shadow-[inset_0_0_0_2px_rgba(47,116,192,0.18)]",
                isFailure && "z-10 ring-2 ring-inset ring-[#d94d39] [animation:marble-cell-shake_260ms_ease-out]",
                invalidHover && "ring-2 ring-inset ring-[#d94d39]",
                isGoalComplete && "z-10 [animation:marble-cup-wobble_520ms_ease-out]",
              )}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.2]"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(58,125,148,.16) 1px, transparent 1px), linear-gradient(0deg, rgba(58,125,148,.16) 1px, transparent 1px)",
                  backgroundSize: "12px 12px",
                }}
              />
              {fixed && <FixedCellArtwork fixed={fixed} />}
              {isStart && <StartArtwork />}
              {isGoal && <CupArtwork active={isGoalComplete} />}
              {isFailure && <FailureMarker />}
              {placed && <TrackPieceArtwork piece={placed} active={isActiveBounce} />}
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
  if (cell.fixed?.kind === "wrong") return `Miss marker at row ${row + 1}, column ${col + 1}`
  if (cell.fixed?.kind === "piece") return `Locked ${cell.fixed.piece.kind} at row ${row + 1}, column ${col + 1}`
  return `Empty cell at row ${row + 1}, column ${col + 1}`
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
        <rect x="0" y="0" width="48" height="48" fill="#271f1d" />
        <path d="M6 39L14 18L22 39M20 39L28 14L38 39" fill="none" stroke="#d65735" strokeWidth="5" strokeLinejoin="round" />
        <path d="M7 40H41" stroke="#120f0d" strokeWidth="5" strokeLinecap="round" />
        <path d="M14 28L18 39M29 25L35 39" stroke="#ffb35c" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      </svg>
    )
  }

  if (fixed.kind === "wrong") {
    return (
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <rect x="0" y="0" width="48" height="48" fill="#efe1d1" />
        <path d="M12 12L36 36M36 12L12 36" stroke="#9b3f2c" strokeWidth="5" strokeLinecap="round" />
        <path d="M14 39H34" stroke="#6a5840" strokeWidth="3" strokeLinecap="round" opacity="0.65" />
      </svg>
    )
  }

  if (fixed.kind === "piece") {
    return <TrackPieceArtwork piece={fixed.piece} locked />
  }

  return null
}

function FailureMarker() {
  return (
    <span
      className="pointer-events-none absolute inset-1 z-20 rounded-md border-2 border-[#d94d39] bg-[#d94d39]/10"
      aria-hidden="true"
    >
      <span className="absolute left-1/2 top-1/2 h-6 w-1 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-[#d94d39]" />
      <span className="absolute left-1/2 top-1/2 h-6 w-1 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-[#d94d39]" />
      <span className="absolute left-1 top-1 h-1.5 w-1.5 rounded-full bg-[#ffb35c] [animation:marble-impact-pop_480ms_ease-out_forwards]" />
      <span className="absolute bottom-2 right-1 h-1.5 w-1.5 rounded-full bg-[#ffb35c] [animation:marble-impact-pop_520ms_ease-out_forwards]" />
    </span>
  )
}

function StartArtwork() {
  return (
    <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
      <path d="M17 2H31V26C31 30.4 28.2 33.4 24 33.4C19.8 33.4 17 30.4 17 26Z" fill="#f2d18c" stroke="#5a4835" strokeWidth="2" />
      <path d="M14 35H34" stroke="#5a4835" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 8V26" stroke="#5a4835" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="28" r="4" fill="#f6bc45" stroke="#6d3e22" strokeWidth="1.5" />
    </svg>
  )
}

function CupArtwork({ active }: { active?: boolean }) {
  return (
    <span className="pointer-events-none absolute inset-0" aria-hidden="true">
      <span
        className={cn(
          "absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#ffd66f]/70 bg-[#ffd66f]/20",
          active && "[animation:marble-goal-ring_680ms_ease-out_forwards]",
        )}
      />
      <svg
        viewBox="0 0 48 48"
        className={cn("absolute inset-0 h-full w-full", active && "[animation:marble-cup-wobble_520ms_ease-out]")}
      >
        <path d="M11 21H37L33 39H15Z" fill="#f1c35b" stroke="#4f3f2e" strokeWidth="2.6" />
        <path d="M9 19H39" stroke="#4f3f2e" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M17 39H31" stroke="#4f3f2e" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M18 27H30" stroke="#fff3d7" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
        <path d="M15 22C18 26 30 26 33 22" fill="none" stroke="#a16b16" strokeWidth="1.6" opacity="0.5" />
      </svg>
    </span>
  )
}

function TrackPieceArtwork({
  piece,
  active,
  preview,
  locked,
}: {
  piece: TrackPiece
  active?: boolean
  preview?: boolean
  locked?: boolean
}) {
  const orientation = normalizeOrientation(piece.kind, piece.orientation)

  return (
    <span
      className={cn(
        "pointer-events-none absolute inset-[8%] block drop-shadow-[0_3px_2px_rgba(39,49,58,0.18)] [animation:block-pop-in_150ms_ease-out]",
        preview && "opacity-45",
        locked && "opacity-90",
      )}
      aria-hidden="true"
    >
      {piece.kind === "ramp" && <RampSvg orientation={orientation} />}
      {piece.kind === "pipe" && <PipeSvg orientation={orientation} />}
      {piece.kind === "blocker" && <BlockerSvg />}
      {piece.kind === "bounce" && <BounceSvg orientation={orientation} active={active} />}
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

function BounceSvg({ orientation, active }: { orientation: number; active?: boolean }) {
  const rotation = orientation * 90
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full">
      <g
        transform={`rotate(${rotation} 24 24) ${active ? "translate(0 2) scale(1.04 0.9)" : ""}`}
        className={active ? "[transform-origin:center] [animation:block-pop-in_180ms_ease-out]" : undefined}
      >
        <path d="M8 34H40" stroke="#3d352d" strokeWidth="5" strokeLinecap="round" />
        <path d="M13 34L18 25L23 34L28 25L33 34" fill="none" stroke="#6a4a2b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 22H31" stroke="#c78f45" strokeWidth="6" strokeLinecap="round" />
        <path d="M27 13L39 22L27 31" fill="#f2b24f" stroke="#3d352d" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M7 18H16M5 24H15M7 30H16" stroke="#f6d596" strokeWidth="2" strokeLinecap="round" opacity={active ? "1" : "0.55"} />
      </g>
    </svg>
  )
}
