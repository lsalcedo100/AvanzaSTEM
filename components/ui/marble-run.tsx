"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Eraser, Play, RotateCcw, Sparkles, Wrench } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { cn } from "@/lib/utils"

const COLS = 7
const ROWS = 7

type PieceType = "empty" | "wall" | "ramp-r" | "ramp-l" | "pipe-v" | "goal" | "drop"

type Side = "top" | "right" | "bottom" | "left"
type Cell = PieceType
type Tool = "ramp-r" | "ramp-l" | "pipe-v" | "eraser"

type Level = {
  id: number
  cells: Cell[][] // ROWS x COLS, contains preset walls/drop/goal
}

function defaultGrid(): Cell[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => "empty" as Cell),
  )
}

function buildLevel1(): Level {
  const g = defaultGrid()
  g[0][1] = "drop"
  g[6][5] = "goal"
  return { id: 1, cells: g }
}

function buildLevel2(): Level {
  const g = defaultGrid()
  g[0][1] = "drop"
  g[6][5] = "goal"
  g[3][2] = "wall"
  g[3][3] = "wall"
  return { id: 2, cells: g }
}

function buildLevel3(): Level {
  const g = defaultGrid()
  g[0][0] = "drop"
  g[6][6] = "goal"
  g[2][3] = "wall"
  g[4][2] = "wall"
  g[4][5] = "wall"
  return { id: 3, cells: g }
}

const LEVELS_BUILDERS = [buildLevel1, buildLevel2, buildLevel3]

type Step = {
  col: number
  row: number
  entry: Side
  // computed exit
  exit: Side | null
}

function nextCell(col: number, row: number, exit: Side): { col: number; row: number; entry: Side } {
  if (exit === "top") return { col, row: row - 1, entry: "bottom" }
  if (exit === "bottom") return { col, row: row + 1, entry: "top" }
  if (exit === "left") return { col: col - 1, row, entry: "right" }
  return { col: col + 1, row, entry: "left" }
}

function pieceExit(piece: Cell, entry: Side): Side | null {
  if (piece === "empty" || piece === "drop") {
    // gravity: drops to bottom regardless of side entry (free fall)
    return "bottom"
  }
  if (piece === "wall") return null
  if (piece === "goal") return null // ball arrives, doesn't exit
  if (piece === "ramp-r") {
    // ╲: top↔right, left↔bottom
    if (entry === "top") return "right"
    if (entry === "left") return "bottom"
    return null
  }
  if (piece === "ramp-l") {
    // ╱: top↔left, right↔bottom
    if (entry === "top") return "left"
    if (entry === "right") return "bottom"
    return null
  }
  if (piece === "pipe-v") {
    if (entry === "top") return "bottom"
    return null
  }
  return null
}

function simulate(grid: Cell[][]): Step[] {
  // Find drop
  let startCol = -1
  let startRow = -1
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === "drop") {
        startCol = c
        startRow = r
        break
      }
    }
    if (startCol >= 0) break
  }
  if (startCol < 0) return []
  const path: Step[] = []
  let { col, row, entry } = { col: startCol, row: startRow, entry: "top" as Side }
  const seen = new Set<string>()
  let safety = 0
  while (safety++ < 200) {
    if (row < 0 || row >= ROWS || col < 0 || col >= COLS) {
      break
    }
    const piece = grid[row][col]
    const exit = pieceExit(piece, entry)
    path.push({ col, row, entry, exit })
    if (piece === "goal") break
    if (exit === null) break
    const nxt = nextCell(col, row, exit)
    const key = `${nxt.col},${nxt.row},${nxt.entry}`
    if (seen.has(key)) break // cycle
    seen.add(key)
    col = nxt.col
    row = nxt.row
    entry = nxt.entry
  }
  return path
}

const STEP_MS = 320

export function MarbleRun() {
  const { t } = useLanguage()
  const [levelIdx, setLevelIdx] = useState(0)
  const baseLevel = useMemo(() => LEVELS_BUILDERS[levelIdx](), [levelIdx])
  const [grid, setGrid] = useState<Cell[][]>(baseLevel.cells.map((r) => [...r]))
  const [tool, setTool] = useState<Tool>("ramp-r")
  const [running, setRunning] = useState(false)
  const [stepIdx, setStepIdx] = useState(-1)
  const [result, setResult] = useState<"none" | "win" | "lose">("none")
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Reset when level changes
  useEffect(() => {
    setGrid(baseLevel.cells.map((r) => [...r]))
    setRunning(false)
    setStepIdx(-1)
    setResult("none")
    if (timerRef.current) clearTimeout(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelIdx])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  function placeOrErase(r: number, c: number) {
    if (running) return
    setGrid((prev) => {
      const cell = prev[r][c]
      if (cell === "drop" || cell === "goal" || cell === "wall") return prev
      const next = prev.map((row) => [...row])
      next[r][c] = tool === "eraser" ? "empty" : tool
      return next
    })
    setResult("none")
    setStepIdx(-1)
  }

  function play() {
    if (running) return
    if (timerRef.current) clearTimeout(timerRef.current)
    const path = simulate(grid)
    if (path.length === 0) return
    setRunning(true)
    setStepIdx(0)
    setResult("none")

    const lastStep = path[path.length - 1]
    const reachedGoal = grid[lastStep.row]?.[lastStep.col] === "goal"

    let i = 0
    const tick = () => {
      i++
      setStepIdx(i)
      if (i >= path.length - 1) {
        setRunning(false)
        setResult(reachedGoal ? "win" : "lose")
        return
      }
      timerRef.current = setTimeout(tick, STEP_MS)
    }
    timerRef.current = setTimeout(tick, STEP_MS)
  }

  function reset() {
    if (timerRef.current) clearTimeout(timerRef.current)
    setGrid(baseLevel.cells.map((r) => [...r]))
    setRunning(false)
    setStepIdx(-1)
    setResult("none")
  }

  // Compute path for animation
  const path = useMemo(() => simulate(grid), [grid])
  const ballStep = stepIdx >= 0 && stepIdx < path.length ? path[stepIdx] : null

  return (
    <section className="relative overflow-hidden bg-[#fef3c7] py-20 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(26,26,46,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,46,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-avanza-dark">
            <Wrench className="h-3.5 w-3.5 text-avanza-orange" />
            {t.gamesPage.marbleEyebrow}
          </span>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            {t.gamesPage.marbleTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.gamesPage.marbleDesc}
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* Grid */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(-0.5deg)]"
              />
              <div className="relative overflow-hidden rounded-3xl bg-white p-5 shadow-[0_28px_64px_-30px_rgba(26,26,46,0.35)] ring-1 ring-avanza-dark/10 md:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {LEVELS_BUILDERS.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setLevelIdx(i)}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider transition",
                          i === levelIdx
                            ? "bg-avanza-orange text-avanza-dark"
                            : "bg-avanza-dark/8 text-avanza-dark hover:bg-avanza-dark/15",
                        )}
                      >
                        {t.gamesPage.marbleLevel} {i + 1}
                      </button>
                    ))}
                  </div>
                  {result === "win" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-avanza-green px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-avanza-dark shadow-sm">
                      <Sparkles className="h-3 w-3" />
                      {t.gamesPage.marbleWin}
                    </span>
                  )}
                  {result === "lose" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-avanza-orange px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-avanza-dark shadow-sm">
                      {t.gamesPage.marbleTryAgain}
                    </span>
                  )}
                </div>

                {/* Toolbox */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <ToolBtn
                    active={tool === "ramp-r"}
                    onClick={() => setTool("ramp-r")}
                    label={t.gamesPage.marbleRampRight}
                    glyph="╲"
                  />
                  <ToolBtn
                    active={tool === "ramp-l"}
                    onClick={() => setTool("ramp-l")}
                    label={t.gamesPage.marbleRampLeft}
                    glyph="╱"
                  />
                  <ToolBtn
                    active={tool === "pipe-v"}
                    onClick={() => setTool("pipe-v")}
                    label={t.gamesPage.marblePipe}
                    glyph="│"
                  />
                  <ToolBtn
                    active={tool === "eraser"}
                    onClick={() => setTool("eraser")}
                    label={t.gamesPage.marbleErase}
                    glyph={<Eraser className="h-4 w-4" />}
                  />
                </div>

                {/* Grid render */}
                <div
                  className="mt-4 grid select-none gap-1 rounded-2xl bg-amber-100/60 p-2"
                  style={{
                    gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                  }}
                >
                  {grid.map((row, r) =>
                    row.map((cell, c) => {
                      const isBall = ballStep?.col === c && ballStep?.row === r
                      const onPath = path.findIndex((p) => p.col === c && p.row === r) >= 0
                      return (
                        <button
                          key={`${r},${c}`}
                          type="button"
                          onClick={() => placeOrErase(r, c)}
                          className={cn(
                            "relative aspect-square w-full overflow-hidden rounded-md transition active:scale-[0.96]",
                            cell === "wall"
                              ? "bg-avanza-dark"
                              : cell === "drop"
                                ? "bg-amber-200 ring-2 ring-amber-400"
                                : cell === "goal"
                                  ? "bg-avanza-green/30 ring-2 ring-avanza-green"
                                  : cell === "empty"
                                    ? "bg-white ring-1 ring-avanza-dark/10 hover:bg-amber-50"
                                    : "bg-white ring-1 ring-avanza-dark/15",
                            running ? "cursor-default" : cell === "wall" || cell === "drop" || cell === "goal" ? "cursor-default" : "cursor-pointer",
                          )}
                        >
                          <CellGlyph cell={cell} />
                          {isBall && (
                            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                              <span className="h-3 w-3 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.7)] ring-2 ring-white" />
                            </span>
                          )}
                          {!isBall && onPath && stepIdx >= 0 && (
                            <span className="pointer-events-none absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-orange-300/70" />
                          )}
                        </button>
                      )
                    }),
                  )}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={play}
                    disabled={running}
                    className="inline-flex items-center gap-1.5 rounded-full bg-avanza-orange px-4 py-2 text-sm font-extrabold text-avanza-dark transition disabled:cursor-not-allowed disabled:opacity-50 hover:enabled:scale-[1.04]"
                  >
                    <Play className="h-4 w-4" />
                    {t.gamesPage.marbleDrop}
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-1.5 rounded-full bg-avanza-dark/8 px-3 py-1.5 text-xs font-bold text-avanza-dark transition hover:bg-avanza-dark/15"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    {t.gamesPage.marbleReset}
                  </button>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(0.6deg)]"
              />
              <div className="relative flex h-full flex-col gap-4 rounded-3xl bg-avanza-dark p-7 text-primary-foreground shadow-[0_28px_64px_-30px_rgba(26,26,46,0.4)]">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white/85">
                  <Sparkles className="h-3.5 w-3.5 text-avanza-green" />
                  {t.gamesPage.marbleFactEyebrow}
                </div>
                <h3 className="text-2xl font-extrabold leading-tight md:text-3xl">
                  {t.gamesPage.marbleFactTitle}
                </h3>
                <p className="text-base leading-relaxed text-white/80">
                  {t.gamesPage.marbleFactBody}
                </p>
                <ul className="mt-2 space-y-2 text-sm text-white/85">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                    {t.gamesPage.marbleTip1}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-avanza-green" />
                    {t.gamesPage.marbleTip2}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-avanza-orange" />
                    {t.gamesPage.marbleTip3}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function ToolBtn({
  active,
  onClick,
  label,
  glyph,
}: {
  active: boolean
  onClick: () => void
  label: string
  glyph: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold transition",
        active
          ? "bg-avanza-orange text-avanza-dark shadow-md"
          : "bg-avanza-dark/8 text-avanza-dark hover:bg-avanza-dark/15",
      )}
    >
      <span className="font-mono text-base leading-none">{glyph}</span>
      <span>{label}</span>
    </button>
  )
}

function CellGlyph({ cell }: { cell: Cell }) {
  if (cell === "drop") {
    return (
      <span className="absolute inset-0 flex items-center justify-center text-2xl">
        ⬇
      </span>
    )
  }
  if (cell === "goal") {
    return (
      <span className="absolute inset-0 flex items-center justify-center text-2xl">
        🏆
      </span>
    )
  }
  if (cell === "wall") return null
  if (cell === "ramp-r") {
    return (
      <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full">
        <line x1="6" y1="6" x2="34" y2="34" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  }
  if (cell === "ramp-l") {
    return (
      <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full">
        <line x1="34" y1="6" x2="6" y2="34" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  }
  if (cell === "pipe-v") {
    return (
      <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full">
        <line x1="20" y1="0" x2="20" y2="40" stroke="#1a1a2e" strokeWidth="4" strokeLinecap="round" />
      </svg>
    )
  }
  return null
}
