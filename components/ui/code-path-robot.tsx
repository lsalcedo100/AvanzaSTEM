"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import {
  Check,
  Lightbulb,
  Lock,
  Play,
  Redo2,
  RotateCcw,
  Trash2,
  Undo2,
  X,
} from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { cn } from "@/lib/utils"

type Dir = 0 | 1 | 2 | 3 // 0 = up, 1 = right, 2 = down, 3 = left
type Block = "forward" | "left" | "right"
type ProgramBlock = { id: string; kind: Block }
type RobotPalette = { top: string; bottom: string; soft: string; ring: string }
type RobotProgressCookie = {
  levelId: number
  completedLevelIds: number[]
  program: Block[]
  starsTipDismissed: boolean
}

type Level = {
  id: number
  cols: number
  rows: number
  start: { x: number; y: number; dir: Dir }
  walls: Array<{ x: number; y: number }>
  stars: Array<{ x: number; y: number }>
  goal: { x: number; y: number }
}

// Returns every cell in a cols x rows grid except the ones listed in `keep`.
// Used to carve a single-width corridor out of an otherwise solid block of walls.
function wallsAround(cols: number, rows: number, keep: Array<{ x: number; y: number }>) {
  const keepSet = new Set(keep.map((p) => `${p.x},${p.y}`))
  const out: Array<{ x: number; y: number }> = []
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (!keepSet.has(`${x},${y}`)) out.push({ x, y })
    }
  }
  return out
}

const L7_CORRIDOR = (() => {
  const keep: Array<{ x: number; y: number }> = []
  for (let x = 0; x <= 6; x++) keep.push({ x, y: 6 })
  for (let y = 6; y >= 3; y--) keep.push({ x: 6, y })
  for (let x = 6; x >= 0; x--) keep.push({ x, y: 3 })
  for (let y = 3; y >= 0; y--) keep.push({ x: 0, y })
  for (let x = 0; x <= 6; x++) keep.push({ x, y: 0 })
  return keep
})()

const L8_MAIN = [
  { x: 0, y: 6 }, { x: 1, y: 6 }, { x: 2, y: 6 }, { x: 2, y: 5 }, { x: 2, y: 4 },
  { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 4, y: 3 }, { x: 4, y: 2 }, { x: 5, y: 2 },
  { x: 6, y: 2 }, { x: 6, y: 1 }, { x: 6, y: 0 },
]
const L8_ALCOVES = [{ x: 1, y: 5 }, { x: 5, y: 3 }]

const L10_MAIN = [
  { x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 2, y: 6 }, { x: 2, y: 5 },
  { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 4, y: 6 }, { x: 4, y: 7 }, { x: 5, y: 7 },
  { x: 6, y: 7 }, { x: 6, y: 6 }, { x: 6, y: 5 }, { x: 6, y: 4 }, { x: 6, y: 3 },
  { x: 6, y: 2 }, { x: 7, y: 2 }, { x: 7, y: 1 }, { x: 7, y: 0 },
]
const L10_ALCOVES = [{ x: 0, y: 6 }, { x: 3, y: 4 }, { x: 5, y: 4 }]

// Every level below is verified solvable with a breadth-first search over
// (x, y, dir, starsCollected) before shipping — see the level design notes.
// Levels 4-10 are each a distinct layout (pillars, a diagonal barrier, two
// rooms with a door, a sweeping corridor, a staircase with alcoves, three
// chained rooms, a sawtooth maze) rather than the same shape resized.
const LEVELS: Level[] = [
  {
    id: 1,
    cols: 5,
    rows: 5,
    start: { x: 0, y: 4, dir: 1 },
    walls: [],
    stars: [],
    goal: { x: 4, y: 0 },
  },
  {
    id: 2,
    cols: 5,
    rows: 5,
    start: { x: 0, y: 4, dir: 1 },
    walls: [{ x: 2, y: 4 }, { x: 2, y: 3 }, { x: 2, y: 2 }],
    stars: [],
    goal: { x: 4, y: 0 },
  },
  {
    id: 3,
    cols: 5,
    rows: 5,
    start: { x: 0, y: 4, dir: 1 },
    walls: [{ x: 2, y: 1 }, { x: 3, y: 3 }],
    stars: [{ x: 4, y: 4 }, { x: 0, y: 0 }],
    goal: { x: 4, y: 0 },
  },
  // Pillar courtyard — a few scattered single-cell obstacles in an open room.
  {
    id: 4,
    cols: 5,
    rows: 5,
    start: { x: 0, y: 4, dir: 1 },
    walls: [{ x: 2, y: 3 }, { x: 1, y: 1 }, { x: 3, y: 1 }],
    stars: [],
    goal: { x: 4, y: 0 },
  },
  // Diagonal barrier — a slanted wall splits the room; go around one end.
  {
    id: 5,
    cols: 6,
    rows: 6,
    start: { x: 0, y: 5, dir: 1 },
    walls: [{ x: 1, y: 4 }, { x: 2, y: 3 }, { x: 3, y: 2 }, { x: 4, y: 1 }],
    stars: [{ x: 0, y: 0 }],
    goal: { x: 5, y: 0 },
  },
  // Two rooms, one door — a divider with a single gap; collect a star on each side.
  {
    id: 6,
    cols: 6,
    rows: 6,
    start: { x: 0, y: 5, dir: 1 },
    walls: [{ x: 3, y: 0 }, { x: 3, y: 1 }, { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }],
    stars: [{ x: 1, y: 1 }, { x: 4, y: 4 }],
    goal: { x: 5, y: 0 },
  },
  // Long sweeping corridor — three big turns, longer straight runs to count carefully.
  {
    id: 7,
    cols: 7,
    rows: 7,
    start: { x: 0, y: 6, dir: 1 },
    walls: wallsAround(7, 7, L7_CORRIDOR),
    stars: [],
    goal: { x: 6, y: 0 },
  },
  // Staircase with alcoves — a tight zigzag with two dead-end pockets to detour into.
  {
    id: 8,
    cols: 7,
    rows: 7,
    start: { x: 0, y: 6, dir: 1 },
    walls: wallsAround(7, 7, [...L8_MAIN, ...L8_ALCOVES]),
    stars: L8_ALCOVES,
    goal: { x: 6, y: 0 },
  },
  // Three chained rooms — two doors in sequence, a star tucked in each of the first two.
  {
    id: 9,
    cols: 8,
    rows: 8,
    start: { x: 0, y: 7, dir: 1 },
    walls: [
      { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 }, { x: 2, y: 6 }, { x: 2, y: 7 },
      { x: 5, y: 0 }, { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 5, y: 4 }, { x: 5, y: 6 }, { x: 5, y: 7 },
    ],
    stars: [{ x: 1, y: 1 }, { x: 4, y: 4 }],
    goal: { x: 7, y: 0 },
  },
  // Sawtooth maze — the longest, most twisting path with three alcove detours.
  {
    id: 10,
    cols: 8,
    rows: 8,
    start: { x: 0, y: 7, dir: 1 },
    walls: wallsAround(8, 8, [...L10_MAIN, ...L10_ALCOVES]),
    stars: L10_ALCOVES,
    goal: { x: 7, y: 0 },
  },
]

// Offset (from robot center) and triangle points for the direction arrow,
// keyed by facing. Moving the arrow between fixed edge positions sidesteps
// the rotation-wraparound spin you'd get animating a single rotated marker.
const ARROW_CONFIG: Record<Dir, (cellSize: number) => { tx: number; ty: number; points: string }> = {
  0: (c) => ({ tx: 0, ty: -c * 0.34, points: `0,${-c * 0.12} ${c * 0.12},${c * 0.12} ${-c * 0.12},${c * 0.12}` }),
  1: (c) => ({ tx: c * 0.34, ty: 0, points: `${c * 0.12},0 ${-c * 0.12},${c * 0.12} ${-c * 0.12},${-c * 0.12}` }),
  2: (c) => ({ tx: 0, ty: c * 0.34, points: `0,${c * 0.12} ${c * 0.12},${-c * 0.12} ${-c * 0.12},${-c * 0.12}` }),
  3: (c) => ({ tx: -c * 0.34, ty: 0, points: `${-c * 0.12},0 ${c * 0.12},${c * 0.12} ${c * 0.12},${-c * 0.12}` }),
}

const STEP_MS = 380
// Level 10's shortest solution needs 43 blocks (corridor turns plus
// in-and-out detours to each of its 3 alcove stars), so the cap must
// clear that with some room, not just the ~30 the easier levels need.
const MAX_BLOCKS = 50
const STAR_SOUND_PATHS = [
  "/audio/games/code-path-robot/collect-1.mp3",
  "/audio/games/code-path-robot/collect-2.mp3",
  "/audio/games/code-path-robot/collect-3.mp3",
]
const ROBOT_PROGRESS_COOKIE = "avanza_code_path_robot_progress"
const ROBOT_PROGRESS_MAX_AGE = 60 * 60 * 24 * 365
const CONFETTI_COLORS = ["#a78bfa", "#fb923c", "#2dd4bf", "#facc15", "#34d399", "#f472b6"]

function seededUnit(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

function randomRobotPalette(): RobotPalette {
  const topHue = Math.floor(Math.random() * 360)
  const bottomHue = Math.floor(Math.random() * 360)
  const accentHue = Math.floor(Math.random() * 360)
  return {
    top: `hsl(${topHue} ${Math.floor(62 + Math.random() * 28)}% ${Math.floor(56 + Math.random() * 24)}%)`,
    bottom: `hsl(${bottomHue} ${Math.floor(66 + Math.random() * 26)}% ${Math.floor(42 + Math.random() * 20)}%)`,
    soft: `hsl(${accentHue} ${Math.floor(60 + Math.random() * 24)}% ${Math.floor(70 + Math.random() * 16)}% / 0.18)`,
    ring: `hsl(${accentHue} ${Math.floor(58 + Math.random() * 28)}% ${Math.floor(46 + Math.random() * 20)}% / 0.3)`,
  }
}

function readRobotProgressCookie(): RobotProgressCookie | null {
  if (typeof document === "undefined") return null
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${ROBOT_PROGRESS_COOKIE}=`))
  if (!cookie) return null

  try {
    const raw = decodeURIComponent(cookie.slice(ROBOT_PROGRESS_COOKIE.length + 1))
    const parsed = JSON.parse(raw) as Partial<RobotProgressCookie>
    if (
      typeof parsed.levelId !== "number" ||
      !Array.isArray(parsed.completedLevelIds)
    ) {
      return null
    }

    return {
      levelId: parsed.levelId,
      completedLevelIds: parsed.completedLevelIds.filter(
        (id): id is number => typeof id === "number",
      ),
      program: Array.isArray(parsed.program)
        ? parsed.program.filter((block): block is Block =>
            block === "forward" || block === "left" || block === "right",
          )
        : [],
      starsTipDismissed: parsed.starsTipDismissed === true,
    }
  } catch {
    return null
  }
}

function blocksToProgram(blocks: Block[]): ProgramBlock[] {
  return blocks.slice(0, MAX_BLOCKS).map((kind) => ({ id: makeBlockId(), kind }))
}

function writeRobotProgressCookie(progress: RobotProgressCookie) {
  if (typeof document === "undefined") return
  const value = encodeURIComponent(JSON.stringify(progress))
  document.cookie = `${ROBOT_PROGRESS_COOKIE}=${value}; Max-Age=${ROBOT_PROGRESS_MAX_AGE}; Path=/; SameSite=Lax`
}

function getUnlockedLevelIdx(completedLevelIds: Set<number>) {
  return LEVELS.reduce((highestUnlockedIdx, level, idx) => {
    if (!completedLevelIds.has(level.id)) return highestUnlockedIdx
    return Math.max(highestUnlockedIdx, Math.min(idx + 1, LEVELS.length - 1))
  }, 0)
}

let blockIdCounter = 0
function makeBlockId() {
  blockIdCounter += 1
  return `block-${blockIdCounter}`
}

function rectContains(el: HTMLElement, x: number, y: number, margin = 0) {
  const r = el.getBoundingClientRect()
  return (
    x >= r.left - margin &&
    x <= r.right + margin &&
    y >= r.top - margin &&
    y <= r.bottom + margin
  )
}

function computeDropIndex(container: HTMLElement, clientX: number, clientY: number) {
  const items = Array.from(container.querySelectorAll<HTMLElement>("[data-block-index]"))
  if (items.length === 0) return 0

  const rows: Array<{
    top: number
    bottom: number
    centerY: number
    items: Array<{ el: HTMLElement; rect: DOMRect }>
  }> = []

  for (const el of items) {
    const rect = el.getBoundingClientRect()
    const centerY = rect.top + rect.height / 2
    const row = rows.find((r) => centerY >= r.top - 4 && centerY <= r.bottom + 4)

    if (row) {
      row.top = Math.min(row.top, rect.top)
      row.bottom = Math.max(row.bottom, rect.bottom)
      row.centerY = (row.top + row.bottom) / 2
      row.items.push({ el, rect })
    } else {
      rows.push({
        top: rect.top,
        bottom: rect.bottom,
        centerY,
        items: [{ el, rect }],
      })
    }
  }

  rows.sort((a, b) => a.centerY - b.centerY)
  const activeRow = rows.reduce((best, row) => {
    const bestDist = Math.abs(clientY - best.centerY)
    const rowDist = Math.abs(clientY - row.centerY)
    return rowDist < bestDist ? row : best
  }, rows[0])

  const rowItems = activeRow.items.sort((a, b) => a.rect.left - b.rect.left)
  for (const item of rowItems) {
    const centerX = item.rect.left + item.rect.width / 2
    if (clientX < centerX) {
      return Number(item.el.dataset.blockIndex)
    }
  }

  return Number(rowItems[rowItems.length - 1].el.dataset.blockIndex) + 1
}

const BLOCK_STYLE: Record<Block, { color: string; glyph: string }> = {
  forward: { color: "bg-[#036bfc]", glyph: "↑" },
  left: { color: "bg-[#f2b24b]", glyph: "↺" },
  right: { color: "bg-[#b15bba]", glyph: "↻" },
}

type DragPayload =
  | { kind: "palette"; block: Block }
  | { kind: "program"; block: Block; id: string; fromIndex: number }

type DragState = DragPayload & { x: number; y: number }

export function CodePathRobot() {
  const { t } = useLanguage()
  const [levelIdx, setLevelIdx] = useState(0)
  const [program, setProgram] = useState<ProgramBlock[]>([])
  const [history, setHistory] = useState<ProgramBlock[][]>([[]])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [running, setRunning] = useState(false)
  const [pc, setPc] = useState(-1)
  const [pos, setPos] = useState<{ x: number; y: number; dir: Dir }>(
    LEVELS[0].start,
  )
  const [collected, setCollected] = useState<Set<string>>(new Set())
  const [status, setStatus] = useState<"idle" | "win" | "fail" | "running">(
    "idle",
  )
  const [robotPalette, setRobotPalette] = useState<RobotPalette | null>(null)
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set())
  const [starsTipDismissed, setStarsTipDismissed] = useState(false)
  const [drag, setDrag] = useState<DragState | null>(null)
  const [overIndex, setOverIndex] = useState<number | null>(null)
  const [overDelete, setOverDelete] = useState(false)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const listRef = useRef<HTMLOListElement | null>(null)
  const deleteZoneRef = useRef<HTMLDivElement | null>(null)
  const suppressClickRef = useRef(false)
  const overIndexRef = useRef<number | null>(null)
  const overDeleteRef = useRef(false)
  const starSoundsRef = useRef<HTMLAudioElement[]>([])
  const progressReadyRef = useRef(false)
  const restoredProgramRef = useRef<ProgramBlock[] | null>(null)

  const level = LEVELS[levelIdx]
  const isDragging = drag !== null
  const unlockedLevelIdx = useMemo(
    () => getUnlockedLevelIdx(completedLevels),
    [completedLevels],
  )

  useEffect(() => {
    window.setTimeout(() => {
      setRobotPalette(randomRobotPalette())
    }, 0)
  }, [])

  useEffect(() => {
    if (!isDragging || typeof document === "undefined") return

    const { body } = document
    const prevCursor = body.style.cursor
    const prevUserSelect = body.style.userSelect
    const prevTouchAction = body.style.touchAction

    body.style.cursor = "grabbing"
    body.style.userSelect = "none"
    body.style.touchAction = "none"

    return () => {
      body.style.cursor = prevCursor
      body.style.userSelect = prevUserSelect
      body.style.touchAction = prevTouchAction
    }
  }, [isDragging])

  useEffect(() => {
    const progress = readRobotProgressCookie()
    window.setTimeout(() => {
      if (progress) {
        const restoredLevelIdx = LEVELS.findIndex((lv) => lv.id === progress.levelId)
        const validLevelIds = new Set(LEVELS.map((lv) => lv.id))
        const restoredCompletedLevels = new Set(
          progress.completedLevelIds.filter((id) => validLevelIds.has(id)),
        )
        const restoredProgram = blocksToProgram(progress.program)
        setStarsTipDismissed(progress.starsTipDismissed)
        setCompletedLevels(restoredCompletedLevels)
        if (restoredLevelIdx >= 0) {
          const restoredUnlockedLevelIdx = getUnlockedLevelIdx(restoredCompletedLevels)
          const safeLevelIdx = Math.min(restoredLevelIdx, restoredUnlockedLevelIdx)
          restoredProgramRef.current = restoredLevelIdx === safeLevelIdx ? restoredProgram : []
          setLevelIdx(safeLevelIdx)
          if (safeLevelIdx === 0) {
            const safeProgram = restoredLevelIdx === safeLevelIdx ? restoredProgram : []
            setProgram(safeProgram)
            setHistory([safeProgram])
            setHistoryIndex(0)
            restoredProgramRef.current = null
          }
        }
      }
      progressReadyRef.current = true
    }, 0)
  }, [])

  useEffect(() => {
    starSoundsRef.current = STAR_SOUND_PATHS.map((src) => {
      const audio = new Audio(src)
      audio.preload = "auto"
      audio.volume = 0.75
      return audio
    })
  }, [])

  useEffect(() => {
    resetRun()
    const restoredProgram = restoredProgramRef.current
    restoredProgramRef.current = null
    setProgram(restoredProgram ?? [])
    setHistory([restoredProgram ?? []])
    setHistoryIndex(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelIdx])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  useEffect(() => {
    if (status === "win") {
      setCompletedLevels((prev) => {
        if (prev.has(level.id)) return prev
        const next = new Set(prev)
        next.add(level.id)
        return next
      })
    }
  }, [status, level.id])

  useEffect(() => {
    if (!progressReadyRef.current) return
    writeRobotProgressCookie({
      levelId: level.id,
      completedLevelIds: Array.from(completedLevels).sort((a, b) => a - b),
      program: program.map((block) => block.kind),
      starsTipDismissed,
    })
  }, [completedLevels, level.id, program, starsTipDismissed])

  function resetRun() {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = null
    setRunning(false)
    setPc(-1)
    setPos(level.start)
    setCollected(new Set())
    setStatus("idle")
  }

  function playStarSound() {
    const sounds = starSoundsRef.current
    if (sounds.length === 0) return
    const sound = sounds[Math.floor(Math.random() * sounds.length)]
    sound.currentTime = 0
    void sound.play().catch(() => {
      // Browsers can block audio if the run was not started by a user gesture.
    })
  }

  function commit(next: ProgramBlock[]) {
    setProgram(next)
    setHistory((h) => [...h.slice(0, historyIndex + 1), next])
    setHistoryIndex((i) => i + 1)
  }

  function undo() {
    if (running || historyIndex === 0) return
    const ni = historyIndex - 1
    setHistoryIndex(ni)
    setProgram(history[ni])
  }

  function redo() {
    if (running || historyIndex >= history.length - 1) return
    const ni = historyIndex + 1
    setHistoryIndex(ni)
    setProgram(history[ni])
  }

  function addBlockAt(kind: Block, index: number) {
    if (running || program.length >= MAX_BLOCKS) return
    const next = [...program]
    next.splice(index, 0, { id: makeBlockId(), kind })
    commit(next)
  }

  function removeBlock(id: string) {
    if (running) return
    commit(program.filter((b) => b.id !== id))
  }

  function moveBlock(from: number, to: number) {
    const insertAt = to > from ? to - 1 : to
    if (insertAt === from) return
    const next = [...program]
    const [item] = next.splice(from, 1)
    next.splice(insertAt, 0, item)
    commit(next)
  }

  function clearProgram() {
    if (running) return
    commit([])
    resetRun()
  }

  function isBlocked(x: number, y: number): boolean {
    if (x < 0 || y < 0 || x >= level.cols || y >= level.rows) return true
    return level.walls.some((w) => w.x === x && w.y === y)
  }

  function step(curr: typeof pos, block: Block) {
    let { x, y, dir } = curr
    if (block === "left") {
      dir = ((dir + 3) % 4) as Dir
    } else if (block === "right") {
      dir = ((dir + 1) % 4) as Dir
    } else {
      const dx = dir === 1 ? 1 : dir === 3 ? -1 : 0
      const dy = dir === 0 ? -1 : dir === 2 ? 1 : 0
      const nx = x + dx
      const ny = y + dy
      if (!isBlocked(nx, ny)) {
        x = nx
        y = ny
      }
    }
    return { x, y, dir }
  }

  function run() {
    if (program.length === 0) return
    resetRun()
    setRunning(true)
    setStatus("running")
    let i = 0
    let current = level.start
    let collectedSet = new Set<string>()
    setPc(0)

    const tick = () => {
      if (i >= program.length) {
        const reachedGoal = current.x === level.goal.x && current.y === level.goal.y
        const collectedAll = level.stars.every((s) =>
          collectedSet.has(`${s.x},${s.y}`),
        )
        const win = reachedGoal && collectedAll
        setRunning(false)
        setStatus(win ? "win" : "fail")
        setPc(-1)
        return
      }
      current = step(current, program[i].kind)
      const onStar = level.stars.find((s) => s.x === current.x && s.y === current.y)
      if (onStar) {
        const key = `${onStar.x},${onStar.y}`
        if (!collectedSet.has(key)) {
          collectedSet = new Set(collectedSet)
          collectedSet.add(key)
          setCollected(collectedSet)
          playStarSound()
        }
      }
      setPos(current)
      i += 1
      setPc(i)
      timerRef.current = setTimeout(tick, STEP_MS)
    }
    timerRef.current = setTimeout(tick, STEP_MS)
  }

  function beginDrag(e: React.PointerEvent, payload: DragPayload) {
    if (running) return
    e.preventDefault()
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.setPointerCapture(e.pointerId)
    }
    const startX = e.clientX
    const startY = e.clientY
    let moved = false
    const initialOverIndex = payload.kind === "program" ? payload.fromIndex : null
    overIndexRef.current = initialOverIndex
    overDeleteRef.current = false
    setDrag({ ...payload, x: startX, y: startY })
    setOverIndex(initialOverIndex)
    setOverDelete(false)

    function onMove(ev: PointerEvent) {
      ev.preventDefault()
      if (Math.hypot(ev.clientX - startX, ev.clientY - startY) > 4) moved = true
      setDrag((d) => (d ? { ...d, x: ev.clientX, y: ev.clientY } : d))

      const zoneEl = deleteZoneRef.current
      if (payload.kind === "program" && zoneEl && rectContains(zoneEl, ev.clientX, ev.clientY, 12)) {
        overDeleteRef.current = true
        overIndexRef.current = null
        setOverDelete(true)
        setOverIndex(null)
        return
      }
      overDeleteRef.current = false
      setOverDelete(false)
      const listEl = listRef.current
      if (listEl && rectContains(listEl, ev.clientX, ev.clientY, 18)) {
        const idx = computeDropIndex(listEl, ev.clientX, ev.clientY)
        overIndexRef.current = idx
        setOverIndex(idx)
      } else {
        overIndexRef.current = null
        setOverIndex(null)
      }
    }

    function cleanup() {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onCancel)
    }

    function onUp(ev: PointerEvent) {
      ev.preventDefault()
      cleanup()
      finishDrag(payload, moved)
      if (payload.kind === "palette") suppressClickRef.current = true
    }

    function onCancel() {
      cleanup()
      overIndexRef.current = null
      overDeleteRef.current = false
      setDrag(null)
      setOverIndex(null)
      setOverDelete(false)
    }

    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    window.addEventListener("pointercancel", onCancel)
  }

  function finishDrag(payload: DragPayload, moved: boolean) {
    const targetIndex = overIndexRef.current
    const isOverDelete = overDeleteRef.current

    if (payload.kind === "palette") {
      if (targetIndex !== null) {
        addBlockAt(payload.block, targetIndex)
      } else if (!moved) {
        addBlockAt(payload.block, program.length)
      }
    } else if (isOverDelete) {
      removeBlock(payload.id)
    } else if (targetIndex !== null) {
      moveBlock(payload.fromIndex, targetIndex)
    }

    overIndexRef.current = null
    overDeleteRef.current = false
    setDrag(null)
    setOverIndex(null)
    setOverDelete(false)
  }

  function paletteClick(block: Block) {
    if (suppressClickRef.current) {
      suppressClickRef.current = false
      return
    }
    addBlockAt(block, program.length)
  }

  const nextLevel = levelIdx < LEVELS.length - 1 ? LEVELS[levelIdx + 1] : null
  const placeholderIndex =
    drag && overIndex !== null
      ? overIndex
      : drag?.kind === "program"
        ? drag.fromIndex
        : null
  const winMessage = t.gamesPage.robotWinMovesMessage.replace(
    "{moves}",
    String(program.length),
  )
  const nextLevelLabel = nextLevel
    ? t.gamesPage.robotNextLevel.replace("{level}", String(nextLevel.id))
    : ""

  function blockLabel(kind: Block) {
    return kind === "forward"
      ? t.gamesPage.robotForward
      : kind === "left"
        ? t.gamesPage.robotLeft
        : t.gamesPage.robotRight
  }

  return (
    <section className="relative overflow-hidden bg-[#eef9ff] py-20 md:py-24">
      <div className="relative mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-purple">
            {t.gamesPage.robotEyebrow}
          </p>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            {t.gamesPage.robotTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.gamesPage.robotDesc}
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            {/* Grid card */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-tl-[2.75rem] rounded-tr-3xl rounded-br-[2.75rem] rounded-bl-3xl bg-white p-6 ring-1 ring-avanza-dark/10 md:p-8">
                <div className="inline-flex max-w-full overflow-x-auto rounded-md bg-avanza-dark/8 p-1 ring-1 ring-avanza-dark/10">
                  {LEVELS.map((lv, i) => {
                    const isCurrent = i === levelIdx
                    const isBeforeCurrent = i + 1 === levelIdx
                    const isDone = completedLevels.has(lv.id)
                    const isUnlocked = i <= unlockedLevelIdx
                    return (
                      <button
                        key={lv.id}
                        type="button"
                        onClick={() => isUnlocked && setLevelIdx(i)}
                        aria-label={`${isUnlocked ? t.gamesPage.robotLevel : t.gamesPage.robotLockedLevel} ${lv.id}`}
                        aria-disabled={!isUnlocked}
                        disabled={!isUnlocked}
                        style={{
                          backgroundColor: isCurrent ? robotPalette?.bottom : undefined,
                        }}
                        className={cn(
                          "relative flex h-9 w-9 shrink-0 items-center justify-center text-sm font-extrabold transition after:absolute after:right-0 after:top-1/2 after:h-5 after:w-px after:-translate-y-1/2 after:bg-avanza-dark/10 last:after:hidden",
                          isBeforeCurrent && "after:hidden",
                          isCurrent
                            ? "z-10 rounded-md text-white after:hidden"
                            : isUnlocked
                              ? isDone
                                ? "text-avanza-green-dark hover:bg-white/45"
                                : "text-avanza-dark hover:bg-white/45"
                              : "cursor-not-allowed text-avanza-dark/30 hover:bg-transparent",
                        )}
                      >
                        {!isUnlocked ? (
                          <Lock className="h-3.5 w-3.5" />
                        ) : isDone && !isCurrent ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          lv.id
                        )}
                      </button>
                    )
                  })}
                </div>

                {level.stars.length > 0 && !starsTipDismissed && (
                  <div
                    className="mt-4 flex items-center gap-3 rounded-lg border px-4 py-2 text-sm font-bold"
                    style={{
                      backgroundColor: robotPalette?.soft,
                      borderColor: robotPalette?.ring,
                      color: robotPalette?.bottom,
                    }}
                  >
                    <p className="min-w-0 flex-1">{t.gamesPage.robotStarsMessage}</p>
                    <button
                      type="button"
                      onClick={() => setStarsTipDismissed(true)}
                      aria-label="Dismiss stars tip"
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition hover:bg-white/50"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                <div className="mt-5 aspect-square w-full">
                  <RobotGridSVG
                    level={level}
                    pos={pos}
                    collected={collected}
                    win={status === "win"}
                    failed={status === "fail"}
                    robotPalette={robotPalette}
                  />
                </div>

                {status === "win" && <Confetti key={level.id} />}

                {(status === "win" || status === "fail") && (
                  <div
                    className={cn(
                      "mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition",
                      status === "win"
                        ? "animate-[win-banner-pop_320ms_ease-out] bg-[#e3f2e8] text-[#166534] ring-1 ring-[#a8d8b8]"
                        : "bg-avanza-orange/15 text-avanza-orange-dark ring-1 ring-avanza-orange/30",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {status === "fail" && (
                        <Lightbulb className="h-4 w-4 shrink-0" />
                      )}
                      {status === "win" ? winMessage : t.gamesPage.robotFailMessage}
                    </span>
                    {status === "win" && nextLevel && (
                      <button
                        type="button"
                        onClick={() => setLevelIdx(levelIdx + 1)}
                        className="rounded-md bg-[#247a4a] px-3 py-1.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-[#1d643d]"
                      >
                        {nextLevelLabel} →
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Program panel */}
            <div className="relative">
              <div className="relative flex h-full flex-col gap-3.5 rounded-tl-3xl rounded-tr-[2.75rem] rounded-br-3xl rounded-bl-[2.75rem] bg-avanza-dark p-7 text-primary-foreground">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/65">
                    {t.gamesPage.robotProgram}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-white/55">
                      {program.length}/{MAX_BLOCKS} blocks used
                    </span>
                    <div className="flex items-center gap-1 rounded-full bg-white/10 p-1">
                      <IconBtn
                        onClick={undo}
                        disabled={running || historyIndex === 0}
                        label={t.gamesPage.robotUndo}
                      >
                        <Undo2 className="h-3.5 w-3.5" />
                      </IconBtn>
                      <IconBtn
                        onClick={redo}
                        disabled={running || historyIndex >= history.length - 1}
                        label={t.gamesPage.robotRedo}
                      >
                        <Redo2 className="h-3.5 w-3.5" />
                      </IconBtn>
                    </div>
                  </div>
                </div>

                {/* Block list (drop target) — shows a live placeholder preview while dragging */}
                <ol
                  ref={listRef}
                  style={{ touchAction: "none" }}
                  className={cn(
                    "relative flex min-h-[112px] flex-wrap items-start gap-2 rounded-[1.5rem] p-3 transition select-none",
                    drag && overIndex !== null && !overDelete
                      ? "bg-white/10 ring-2 ring-avanza-green/60"
                      : "bg-white/5 ring-1 ring-white/10",
                  )}
                >
                  {program.length === 0 && !drag && (
                    <p className="pointer-events-none w-full py-7 text-center text-xs font-bold uppercase tracking-wider text-white/45">
                      {t.gamesPage.robotEmpty}
                    </p>
                  )}
                  {program.flatMap((b, i) => {
                    const nodes: React.ReactNode[] = []
                    if (drag && placeholderIndex === i) {
                      nodes.push(
                        <PlaceholderChip
                          key={`ph-${i}`}
                          block={drag.block}
                          label={blockLabel(drag.block)}
                        />,
                      )
                    }
                    const isBeingDragged = drag?.kind === "program" && drag.id === b.id
                    if (!isBeingDragged) {
                      const style = BLOCK_STYLE[b.kind]
                      const isActive = i === pc - 1 && running
                      const label = blockLabel(b.kind)
                      nodes.push(
                        <li
                          key={b.id}
                          data-block-index={i}
                          onPointerDown={(e) =>
                            beginDrag(e, { kind: "program", block: b.kind, id: b.id, fromIndex: i })
                          }
                          style={{ touchAction: "none", animationDuration: "180ms" }}
                          className={cn(
                            "group flex min-h-8 min-w-[5.75rem] items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-extrabold transition select-none cursor-grab active:cursor-grabbing",
                            "animate-[block-pop-in_180ms_ease-out]",
                            isActive
                              ? "bg-avanza-green text-avanza-dark ring-2 ring-white/40"
                              : cn(style.color, "text-white"),
                          )}
                        >
                          <span className="font-mono text-[10px] opacity-65">{i + 1}</span>
                          <span>{style.glyph}</span>
                          <span>{label}</span>
                          <button
                            type="button"
                            disabled={running}
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={() => removeBlock(b.id)}
                            aria-label={t.gamesPage.robotRemoveBlock}
                            className="ml-0.5 rounded-full p-0.5 text-white/70 opacity-0 transition group-hover:opacity-100 hover:bg-black/15 hover:text-white disabled:opacity-0"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </li>,
                      )
                    }
                    return nodes
                  })}
                  {drag && placeholderIndex === program.length && (
                    <PlaceholderChip
                      key="ph-end"
                      block={drag.block}
                      label={blockLabel(drag.block)}
                    />
                  )}
                </ol>

                {drag?.kind === "program" ? (
                  /* Large delete drop zone — replaces the palette/run controls only while
                     dragging an existing program block, so it's impossible to miss. */
                  <div
                    ref={deleteZoneRef}
                    className={cn(
                      "flex flex-1 min-h-[200px] flex-col items-center justify-center gap-2 rounded-[1.75rem] border-[3px] border-dashed text-sm font-extrabold uppercase tracking-wider transition-all",
                      overDelete
                        ? "scale-[1.01] border-red-300 bg-red-500/30 text-red-50"
                        : "border-red-400/50 bg-red-500/10 text-red-200/80",
                    )}
                  >
                    <Trash2 className={cn("transition-transform", overDelete ? "h-9 w-9 scale-110" : "h-7 w-7")} />
                    {t.gamesPage.robotDeleteZone}
                  </div>
                ) : (
                  <>
                    {/* Block palette */}
                    <div className="grid grid-cols-3 gap-2.5">
                      {(["forward", "left", "right"] as Block[]).map((kind) => {
                        const style = BLOCK_STYLE[kind]
                        const label =
                          kind === "forward"
                            ? t.gamesPage.robotForward
                            : kind === "left"
                              ? t.gamesPage.robotLeft
                              : t.gamesPage.robotRight
                        return (
                          <button
                            key={kind}
                            type="button"
                            disabled={running}
                            onPointerDown={(e) => beginDrag(e, { kind: "palette", block: kind })}
                            onClick={() => paletteClick(kind)}
                            style={{ touchAction: "none" }}
                            className={cn(
                              "group flex flex-col items-center gap-1 rounded-2xl px-3 py-3 text-white shadow-[0_8px_0_rgba(0,0,0,0.18)] transition select-none cursor-grab disabled:cursor-not-allowed disabled:opacity-50 hover:enabled:-translate-y-0.5 active:enabled:translate-y-0.5 active:enabled:cursor-grabbing active:enabled:shadow-none",
                              style.color,
                            )}
                          >
                            <span className="font-mono text-2xl font-extrabold leading-none">
                              {style.glyph}
                            </span>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider">
                              {label}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                    <button
                      type="button"
                      onClick={run}
                      disabled={running || program.length === 0}
                      className="relative flex w-full items-center justify-center gap-2 rounded-[1.4rem] bg-gradient-to-b from-avanza-green to-avanza-green-dark px-5 py-3.5 text-base font-extrabold text-white shadow-[0_10px_0_rgba(27,126,68,0.55),0_18px_30px_-12px_rgba(46,204,113,0.55)] transition disabled:cursor-not-allowed disabled:bg-avanza-green disabled:bg-none disabled:text-white/65 disabled:opacity-55 disabled:shadow-none hover:enabled:-translate-y-0.5 active:enabled:translate-y-0.5 active:enabled:shadow-[0_4px_0_rgba(27,126,68,0.55)]"
                    >
                      <Play className="h-5 w-5" />
                      {t.gamesPage.robotRun}
                    </button>

                    <div className="mt-auto flex items-center gap-2 pt-2">
                      <SecondaryBtn
                        onClick={clearProgram}
                        disabled={running || program.length === 0}
                        label={t.gamesPage.robotClear}
                      >
                        <Trash2 className="h-5 w-5" />
                      </SecondaryBtn>
                      <SecondaryBtn onClick={resetRun} label={t.gamesPage.robotReset}>
                        <RotateCcw className="h-5 w-5" />
                      </SecondaryBtn>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {drag && (
        <DragPreview
          drag={drag}
          label={blockLabel(drag.block)}
          index={drag.kind === "program" ? drag.fromIndex + 1 : undefined}
        />
      )}
    </section>
  )
}

function IconBtn({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void
  disabled?: boolean
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white/85 transition disabled:opacity-30 hover:enabled:bg-white/15"
    >
      {children}
    </button>
  )
}

function PlaceholderChip({ block, label }: { block: Block; label: string }) {
  const style = BLOCK_STYLE[block]
  return (
    <li
      aria-hidden="true"
      data-robot-placeholder="true"
      className="flex min-h-8 min-w-[5.75rem] items-center gap-1 rounded-lg border-2 border-dashed border-white/65 bg-white/10 px-2 py-1.5 text-xs font-extrabold text-white/65 shadow-inner"
    >
      <span className="font-mono text-[10px] opacity-70">{style.glyph}</span>
      <span>{label}</span>
    </li>
  )
}

function DragPreview({
  drag,
  label,
  index,
}: {
  drag: DragState
  label: string
  index?: number
}) {
  if (typeof document === "undefined") return null

  const style = BLOCK_STYLE[drag.block]
  return createPortal(
    <div
      data-robot-drag-preview="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex min-h-9 min-w-[6.5rem] items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-extrabold text-white opacity-90 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.65)] ring-2 ring-white/55 will-change-transform"
      style={{
        backgroundColor:
          drag.block === "forward"
            ? "#036bfc"
            : drag.block === "left"
              ? "#f2b24b"
              : "#b15bba",
        transform: `translate3d(${drag.x}px, ${drag.y}px, 0) translate(-50%, -50%) scale(1.06)`,
      }}
    >
      {index !== undefined && (
        <span className="font-mono text-[10px] opacity-70">{index}</span>
      )}
      <span>{style.glyph}</span>
      <span>{label}</span>
    </div>,
    document.body,
  )
}

// One-shot confetti burst, contained inside whatever ancestor has the
// "relative overflow-hidden" pair (the grid card). Re-randomizes on every
// mount, so a fresh celebration plays each time the win state is entered.
function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => {
        const seed = i + 1
        return {
          id: i,
          left: seededUnit(seed) * 100,
          color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          delay: Math.round(seededUnit(seed + 20) * 200),
          duration: Math.round(900 + seededUnit(seed + 40) * 500),
          spin:
            (seededUnit(seed + 60) > 0.5 ? 1 : -1) *
            Math.round(240 + seededUnit(seed + 80) * 240),
          width: Math.round(5 + seededUnit(seed + 100) * 4),
          height: Math.round(8 + seededUnit(seed + 120) * 5),
        }
      }),
    [],
  )

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-[1px]"
          style={{
            left: `${p.left}%`,
            top: "-8%",
            width: p.width,
            height: p.height,
            backgroundColor: p.color,
            ["--confetti-spin" as string]: `${p.spin}deg`,
            animation: `confetti-fall ${p.duration}ms ease-in ${p.delay}ms forwards`,
          }}
        />
      ))}
    </div>
  )
}

function SecondaryBtn({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void
  disabled?: boolean
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-extrabold text-white/90 transition disabled:cursor-not-allowed disabled:opacity-40 hover:enabled:bg-white/20"
    >
      {children}
      {label}
    </button>
  )
}

function RobotGridSVG({
  level,
  pos,
  collected,
  win,
  failed,
  robotPalette,
}: {
  level: Level
  pos: { x: number; y: number; dir: Dir }
  collected: Set<string>
  win: boolean
  failed: boolean
  robotPalette: RobotPalette | null
}) {
  const size = 360
  const cellSize = size / Math.max(level.cols, level.rows)
  const W = cellSize * level.cols
  const H = cellSize * level.rows
  const padX = (size - W) / 2
  const padY = (size - H) / 2

  const arrow = ARROW_CONFIG[pos.dir](cellSize)

  const rx = padX + pos.x * cellSize + cellSize / 2
  const ry = padY + pos.y * cellSize + cellSize / 2

  const gx = padX + level.goal.x * cellSize + cellSize / 2
  const gy = padY + level.goal.y * cellSize + cellSize / 2

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="h-full w-full"
      role="img"
      aria-label="Code-the-path grid"
    >
      <defs>
        <pattern id="rgridChecker" width={cellSize * 2} height={cellSize * 2} patternUnits="userSpaceOnUse">
          <rect width={cellSize * 2} height={cellSize * 2} fill="#fbfdff" />
          <rect x={0} y={0} width={cellSize} height={cellSize} fill="#eef5fb" />
          <rect x={cellSize} y={cellSize} width={cellSize} height={cellSize} fill="#eef5fb" />
        </pattern>
        <linearGradient id="flagGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2ecc71" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
        <radialGradient id="starGradient" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
        <linearGradient id="robotGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={robotPalette?.top ?? "transparent"} />
          <stop offset="100%" stopColor={robotPalette?.bottom ?? "transparent"} />
        </linearGradient>
      </defs>

      <rect
        x={padX}
        y={padY}
        width={W}
        height={H}
        fill="url(#rgridChecker)"
        stroke="#1a1a2e"
        strokeOpacity={0.18}
        strokeWidth={1.5}
        rx={10}
      />

      {level.walls.map((w, i) => (
        <g key={`w${i}`}>
          <rect
            x={padX + w.x * cellSize + 4}
            y={padY + w.y * cellSize + 4}
            width={cellSize - 8}
            height={cellSize - 8}
            fill="#1a1a2e"
            rx={6}
          />
          <line
            x1={padX + w.x * cellSize + 10}
            y1={padY + w.y * cellSize + 10}
            x2={padX + (w.x + 1) * cellSize - 10}
            y2={padY + (w.y + 1) * cellSize - 10}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={2}
          />
        </g>
      ))}

      {level.stars.map((s, i) => {
        const taken = collected.has(`${s.x},${s.y}`)
        const cx = padX + s.x * cellSize + cellSize / 2
        const cy = padY + s.y * cellSize + cellSize / 2
        return (
          <g key={`s${i}`} opacity={taken ? 0.25 : 1}>
            <Star cx={cx} cy={cy} r={cellSize * 0.32} fill="url(#starGradient)" />
          </g>
        )
      })}

      <Flag x={gx} y={gy} cellSize={cellSize} win={win} />

      {/* Robot: outer group handles grid position; the body never rotates,
          only the small direction arrow slides to the facing edge. */}
      <g
        opacity={robotPalette ? 1 : 0}
        style={{
          transform: `translate(${rx}px, ${ry}px)`,
          transition: "transform 280ms cubic-bezier(.4,.0,.2,1)",
        }}
      >
        <ellipse
          cx={0}
          cy={cellSize * 0.34}
          rx={cellSize * 0.26}
          ry={cellSize * 0.07}
          fill="#1a1a2e"
          opacity={0.18}
        />
        <g className={win ? "animate-[robot-win-bounce_700ms_ease-in-out]" : undefined}>
          <g transform={`translate(${-cellSize * 0.32}, ${-cellSize * 0.32})`}>
            <rect
              x={0}
              y={0}
              width={cellSize * 0.64}
              height={cellSize * 0.64}
              rx={cellSize * 0.18}
              fill="url(#robotGradient)"
              stroke="#1a1a2e"
              strokeWidth={2}
            />
            <circle
              cx={cellSize * 0.32}
              cy={-cellSize * 0.06}
              r={cellSize * 0.045}
              fill="#1a1a2e"
            />
            <line
              x1={cellSize * 0.32}
              y1={-cellSize * 0.02}
              x2={cellSize * 0.32}
              y2={cellSize * 0.04}
              stroke="#1a1a2e"
              strokeWidth={2}
            />
            <circle cx={cellSize * 0.22} cy={cellSize * 0.26} r={cellSize * 0.075} fill="#fff" />
            <circle cx={cellSize * 0.42} cy={cellSize * 0.26} r={cellSize * 0.075} fill="#fff" />
            <circle cx={cellSize * 0.24} cy={cellSize * 0.27} r={cellSize * 0.032} fill="#1a1a2e" />
            <circle cx={cellSize * 0.44} cy={cellSize * 0.27} r={cellSize * 0.032} fill="#1a1a2e" />
            {failed && (
              <>
                <line
                  x1={cellSize * 0.15}
                  y1={cellSize * 0.15}
                  x2={cellSize * 0.29}
                  y2={cellSize * 0.2}
                  stroke="#1a1a2e"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
                <line
                  x1={cellSize * 0.49}
                  y1={cellSize * 0.15}
                  x2={cellSize * 0.35}
                  y2={cellSize * 0.2}
                  stroke="#1a1a2e"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </>
            )}
            <path
              d={
                failed
                  ? `M ${cellSize * 0.2} ${cellSize * 0.52} Q ${cellSize * 0.32} ${cellSize * 0.42} ${cellSize * 0.44} ${cellSize * 0.52}`
                  : `M ${cellSize * 0.2} ${cellSize * 0.46} Q ${cellSize * 0.32} ${cellSize * 0.54} ${cellSize * 0.44} ${cellSize * 0.46}`
              }
              fill="none"
              stroke="#fff"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          </g>
        </g>
        <g
          style={{
            transform: `translate(${arrow.tx}px, ${arrow.ty}px)`,
            transition: "transform 280ms cubic-bezier(.4,.0,.2,1)",
          }}
        >
          <polygon points={arrow.points} fill="#fff" stroke="#1a1a2e" strokeWidth={1.5} />
        </g>
      </g>
    </svg>
  )
}

function Flag({ x, y, cellSize, win }: { x: number; y: number; cellSize: number; win: boolean }) {
  const poleH = cellSize * 0.62
  const baseY = y + cellSize * 0.34
  const topY = baseY - poleH

  return (
    <g>
      <ellipse cx={x} cy={baseY + cellSize * 0.04} rx={cellSize * 0.22} ry={cellSize * 0.06} fill="#1a1a2e" opacity={0.14} />
      <rect x={x - 2} y={topY} width={4} height={poleH} rx={2} fill="#5b5b73" />
      <circle cx={x} cy={topY} r={cellSize * 0.035} fill="#f4c542" stroke="#1a1a2e" strokeWidth={1} />
      <g
        style={{
          transformOrigin: `${x}px ${topY + cellSize * 0.07}px`,
          animation: `flag-wave ${win ? "0.9s" : "2.6s"} ease-in-out infinite`,
        }}
      >
        <path
          d={`M ${x} ${topY + cellSize * 0.05}
              L ${x + cellSize * 0.36} ${topY + cellSize * 0.14}
              L ${x + cellSize * 0.22} ${topY + cellSize * 0.21}
              L ${x + cellSize * 0.36} ${topY + cellSize * 0.28}
              L ${x} ${topY + cellSize * 0.36} Z`}
          fill="url(#flagGradient)"
          stroke="#1b7e44"
          strokeWidth={1}
          strokeLinejoin="round"
        />
        <line
          x1={x + cellSize * 0.05}
          y1={topY + cellSize * 0.08}
          x2={x + cellSize * 0.05}
          y2={topY + cellSize * 0.32}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={1.5}
        />
      </g>
    </g>
  )
}

function Star({
  cx,
  cy,
  r,
  fill,
}: {
  cx: number
  cy: number
  r: number
  fill: string
}) {
  const points = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i < 10; i++) {
      const angle = (Math.PI * 2 * i) / 10 - Math.PI / 2
      const rad = i % 2 === 0 ? r : r * 0.45
      pts.push(`${cx + Math.cos(angle) * rad},${cy + Math.sin(angle) * rad}`)
    }
    return pts.join(" ")
  }, [cx, cy, r])
  return <polygon points={points} fill={fill} stroke="#1a1a2e" strokeWidth={1.5} />
}
