"use client"

import { useMemo, useState } from "react"
import {
  Eraser,
  Lightbulb,
  Power,
  RotateCcw,
  ToggleRight,
} from "lucide-react"
import type { ComponentType } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { cn } from "@/lib/utils"

const COLS = 7
const ROWS = 5

type Side = "N" | "E" | "S" | "W"
const SIDES: Side[] = ["N", "E", "S", "W"]
const OPPOSITE: Record<Side, Side> = { N: "S", S: "N", E: "W", W: "E" }
const DELTA: Record<Side, [number, number]> = {
  N: [0, -1],
  S: [0, 1],
  E: [1, 0],
  W: [-1, 0],
}

type CellKind = "empty" | "wire" | "bulb" | "switch" | "battery"
type Cell = {
  kind: CellKind
  // For battery: "h" = + east / − west, "v" = + south / − north
  orientation?: "h" | "v"
  // For switch
  closed?: boolean
}
type Tool = "hand" | "wire" | "bulb" | "switch" | "battery" | "eraser"

function emptyGrid(): Cell[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ kind: "empty" as const })),
  )
}

function clone(grid: Cell[][]): Cell[][] {
  return grid.map((row) => row.map((c) => ({ ...c })))
}

// Sample starter circuit: a closed rectangle loop with battery on the left,
// bulb at the bottom, switch up top.
function starterGrid(): Cell[][] {
  const g = emptyGrid()
  // Battery at (2, 1), vertical: + south, − north
  g[2][1] = { kind: "battery", orientation: "v" }
  // Up the left side back to battery's − terminal
  g[1][1] = { kind: "wire" }
  g[0][1] = { kind: "wire" }
  // Across the top, with a switch in the middle
  g[0][2] = { kind: "wire" }
  g[0][3] = { kind: "switch", closed: true }
  g[0][4] = { kind: "wire" }
  g[0][5] = { kind: "wire" }
  // Down the right side
  g[1][5] = { kind: "wire" }
  g[2][5] = { kind: "wire" }
  g[3][5] = { kind: "wire" }
  g[4][5] = { kind: "wire" }
  // Across the bottom with a bulb in the middle
  g[4][4] = { kind: "wire" }
  g[4][3] = { kind: "bulb" }
  g[4][2] = { kind: "wire" }
  g[4][1] = { kind: "wire" }
  // (3,1) wire connects bottom row up to battery's + (south) terminal
  g[3][1] = { kind: "wire" }
  return g
}

function openSidesForCell(c: Cell): Set<Side> {
  if (c.kind === "wire" || c.kind === "bulb") return new Set(SIDES)
  if (c.kind === "switch") return c.closed ? new Set(SIDES) : new Set()
  if (c.kind === "battery") {
    if (c.orientation === "v") return new Set<Side>(["N", "S"])
    return new Set<Side>(["E", "W"])
  }
  return new Set()
}

// Battery terminal sides
function batteryTerminals(c: Cell): { plus: Side; minus: Side } {
  if (c.orientation === "v") return { plus: "S", minus: "N" }
  return { plus: "E", minus: "W" }
}

type SimResult = {
  closed: boolean
  litBulbs: Set<string> // "r,c"
  shorted: boolean
}

function simulate(grid: Cell[][]): SimResult {
  // Union-find over port keys "r,c,side"
  const parent = new Map<string, string>()
  const find = (k: string): string => {
    if (!parent.has(k)) {
      parent.set(k, k)
      return k
    }
    let cur = k
    while (parent.get(cur) !== cur) cur = parent.get(cur)!
    // path compression
    let walk = k
    while (parent.get(walk) !== cur) {
      const next = parent.get(walk)!
      parent.set(walk, cur)
      walk = next
    }
    return cur
  }
  const union = (a: string, b: string) => {
    const ra = find(a)
    const rb = find(b)
    if (ra !== rb) parent.set(ra, rb)
  }

  // 1. Internal connections inside each cell
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = grid[r][c]
      if (cell.kind === "empty") continue
      const open = openSidesForCell(cell)
      const sidesArr = Array.from(open)
      if (cell.kind === "battery") {
        // Battery does NOT internally connect + and −
        // (each terminal is its own node; we'll union all OTHER open sides, none in this case)
        // Skip
      } else {
        // wire, bulb, closed switch: union all open sides
        for (let i = 1; i < sidesArr.length; i++) {
          union(`${r},${c},${sidesArr[0]}`, `${r},${c},${sidesArr[i]}`)
        }
      }
    }
  }

  // 2. External connections between adjacent cells
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = grid[r][c]
      if (cell.kind === "empty") continue
      const open = openSidesForCell(cell)
      for (const side of SIDES) {
        if (!open.has(side)) continue
        const [dx, dy] = DELTA[side]
        const nx = c + dx
        const ny = r + dy
        if (nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS) continue
        const nb = grid[ny][nx]
        if (nb.kind === "empty") continue
        const nbOpen = openSidesForCell(nb)
        if (!nbOpen.has(OPPOSITE[side])) continue
        union(`${r},${c},${side}`, `${ny},${nx},${OPPOSITE[side]}`)
      }
    }
  }

  // 3. Find battery + and − terminals
  let plusKey: string | null = null
  let minusKey: string | null = null
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c].kind === "battery") {
        const { plus, minus } = batteryTerminals(grid[r][c])
        plusKey = `${r},${c},${plus}`
        minusKey = `${r},${c},${minus}`
        break
      }
    }
    if (plusKey) break
  }
  if (!plusKey || !minusKey) {
    return { closed: false, litBulbs: new Set(), shorted: false }
  }

  const plusRoot = find(plusKey)
  const minusRoot = find(minusKey)
  const closed = plusRoot === minusRoot

  if (!closed) {
    return { closed: false, litBulbs: new Set(), shorted: false }
  }

  // 4. Find bulbs in the same set
  const lit = new Set<string>()
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c].kind === "bulb") {
        // any open side will do
        const root = find(`${r},${c},N`)
        if (root === plusRoot) lit.add(`${r},${c}`)
      }
    }
  }

  // Short circuit detection: closed but no bulb on path
  const shorted = lit.size === 0

  return { closed, litBulbs: lit, shorted }
}

export function CircuitBuilder() {
  const { t } = useLanguage()
  const [grid, setGrid] = useState<Cell[][]>(starterGrid())
  const [tool, setTool] = useState<Tool>("hand")

  const sim = useMemo(() => simulate(grid), [grid])

  function handleCellClick(r: number, c: number) {
    setGrid((prev) => {
      const current = prev[r][c]
      if (tool === "hand") {
        if (current.kind !== "switch") return prev
        const next = clone(prev)
        next[r][c] = { ...current, closed: !current.closed }
        return next
      }
      if (tool === "eraser") {
        if (current.kind === "empty") return prev
        const next = clone(prev)
        next[r][c] = { kind: "empty" }
        return next
      }
      const next = clone(prev)
      if (tool === "battery") {
        if (current.kind === "battery") {
          next[r][c] = {
            kind: "battery",
            orientation: current.orientation === "h" ? "v" : "h",
          }
        } else {
          for (let rr = 0; rr < ROWS; rr++) {
            for (let cc = 0; cc < COLS; cc++) {
              if (next[rr][cc].kind === "battery") next[rr][cc] = { kind: "empty" }
            }
          }
          next[r][c] = { kind: "battery", orientation: "h" }
        }
      } else if (tool === "switch") {
        next[r][c] = {
          kind: "switch",
          closed: current.kind === "switch" ? !current.closed : true,
        }
      } else if (tool === "wire") {
        next[r][c] = { kind: "wire" }
      } else if (tool === "bulb") {
        next[r][c] = { kind: "bulb" }
      }
      return next
    })
  }

  function reset() {
    setGrid(starterGrid())
    setTool("hand")
  }
  function clearAll() {
    setGrid(emptyGrid())
    setTool("battery")
  }

  const litCount = sim.litBulbs.size
  const bulbCount = useMemo(() => {
    let n = 0
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) if (grid[r][c].kind === "bulb") n++
    return n
  }, [grid])

  return (
    <section className="relative overflow-hidden bg-[#fff7ec] py-20 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(26,26,46,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,46,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-orange">
            {t.gamesPage.circuitEyebrow}
          </p>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            {t.gamesPage.circuitTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.gamesPage.circuitDesc}
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* Grid card */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(-0.5deg)]"
              />
              <div className="relative overflow-hidden rounded-3xl bg-white p-5 shadow-[0_28px_64px_-30px_rgba(26,26,46,0.35)] ring-1 ring-avanza-dark/10 md:p-7">
                {/* Toolbar */}
                <div className="mb-4 flex flex-wrap gap-2">
                  <ToolBtn
                    active={tool === "hand"}
                    onClick={() => setTool("hand")}
                    icon={ToggleRight}
                    label={t.gamesPage.circuitToolHand}
                  />
                  <ToolBtn
                    active={tool === "wire"}
                    onClick={() => setTool("wire")}
                    icon={WireIcon}
                    label={t.gamesPage.circuitToolWire}
                  />
                  <ToolBtn
                    active={tool === "bulb"}
                    onClick={() => setTool("bulb")}
                    icon={Lightbulb}
                    label={t.gamesPage.circuitToolBulb}
                  />
                  <ToolBtn
                    active={tool === "switch"}
                    onClick={() => setTool("switch")}
                    icon={Power}
                    label={t.gamesPage.circuitToolSwitch}
                  />
                  <ToolBtn
                    active={tool === "battery"}
                    onClick={() => setTool("battery")}
                    icon={BatteryIcon}
                    label={t.gamesPage.circuitToolBattery}
                  />
                  <ToolBtn
                    active={tool === "eraser"}
                    onClick={() => setTool("eraser")}
                    icon={Eraser}
                    label={t.gamesPage.circuitToolErase}
                  />
                </div>

                {/* Grid */}
                <div
                  className="grid select-none gap-1 rounded-2xl bg-[#1a1a2e]/5 p-2"
                  style={{
                    gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                  }}
                >
                  {grid.map((row, r) =>
                    row.map((cell, c) => (
                      <CircuitCell
                        key={`${r},${c}`}
                        cell={cell}
                        onClick={() => handleCellClick(r, c)}
                        lit={sim.litBulbs.has(`${r},${c}`)}
                        closed={sim.closed}
                      />
                    )),
                  )}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider shadow-sm",
                        sim.shorted
                          ? "bg-red-500 text-white"
                          : sim.closed
                            ? "bg-avanza-green text-avanza-dark"
                            : "bg-avanza-dark/12 text-avanza-dark",
                      )}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      {sim.shorted
                        ? t.gamesPage.circuitShortStatus
                        : sim.closed
                          ? t.gamesPage.circuitClosedStatus
                          : t.gamesPage.circuitOpenStatus}
                    </span>
                    <span className="rounded-full bg-avanza-dark/8 px-3 py-1 font-mono text-xs font-bold text-avanza-dark">
                      {litCount}/{bulbCount} {t.gamesPage.circuitLitLabel}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={clearAll}
                      className="inline-flex items-center gap-1.5 rounded-full bg-avanza-dark/8 px-3 py-1.5 text-xs font-bold text-avanza-dark transition hover:bg-avanza-dark/15"
                    >
                      {t.gamesPage.circuitClear}
                    </button>
                    <button
                      type="button"
                      onClick={reset}
                      className="inline-flex items-center gap-1.5 rounded-full bg-avanza-dark/8 px-3 py-1.5 text-xs font-bold text-avanza-dark transition hover:bg-avanza-dark/15"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      {t.gamesPage.circuitReset}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Info card */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(0.6deg)]"
              />
              <div className="relative flex h-full flex-col gap-5 rounded-3xl bg-avanza-dark p-7 text-primary-foreground shadow-[0_28px_64px_-30px_rgba(26,26,46,0.4)]">
                <h3 className="text-2xl font-extrabold leading-tight md:text-3xl">
                  {t.gamesPage.circuitFactTitle}
                </h3>
                <p className="text-base leading-relaxed text-white/80">
                  {t.gamesPage.circuitFactBody}
                </p>
                <ul className="mt-2 space-y-2 text-sm text-white/85">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-avanza-orange" />
                    {t.gamesPage.circuitTip1}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-avanza-green" />
                    {t.gamesPage.circuitTip2}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-avanza-purple" />
                    {t.gamesPage.circuitTip3}
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
  icon: Icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: ComponentType<{ className?: string }>
  label: string
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
      <Icon className="h-4 w-4" />
      {label}
    </button>
  )
}

function WireIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
      <path d="M3 12 H21" />
      <circle cx="3" cy="12" r="1.6" fill="currentColor" />
      <circle cx="21" cy="12" r="1.6" fill="currentColor" />
    </svg>
  )
}

function BatteryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <rect x="3" y="8" width="16" height="8" rx="1.6" />
      <rect x="19" y="10" width="2.5" height="4" rx="0.5" fill="currentColor" />
      <line x1="8" y1="11" x2="8" y2="13" />
      <line x1="14" y1="10.5" x2="14" y2="13.5" />
      <line x1="13" y1="11.5" x2="15" y2="11.5" />
    </svg>
  )
}

function CircuitCell({
  cell,
  onClick,
  lit,
  closed,
}: {
  cell: Cell
  onClick: () => void
  lit: boolean
  closed: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-md bg-white transition hover:bg-amber-50 active:scale-[0.97]",
        cell.kind === "empty" ? "ring-1 ring-avanza-dark/8" : "ring-1 ring-avanza-dark/15",
      )}
      aria-label={`Cell ${cell.kind}`}
    >
      <CellGlyph cell={cell} lit={lit} closed={closed} />
    </button>
  )
}

function CellGlyph({ cell, lit, closed }: { cell: Cell; lit: boolean; closed: boolean }) {
  // Active line color: bright green if part of closed circuit, else dim gray
  const lineActive = closed ? "#1abc9c" : "#1a1a2e"
  if (cell.kind === "empty") return null
  if (cell.kind === "wire") {
    return (
      <svg viewBox="0 0 40 40" className="h-full w-full">
        <line x1="0" y1="20" x2="40" y2="20" stroke={lineActive} strokeWidth="3" strokeLinecap="round" />
        <line x1="20" y1="0" x2="20" y2="40" stroke={lineActive} strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  }
  if (cell.kind === "bulb") {
    return (
      <svg viewBox="0 0 40 40" className="h-full w-full">
        <line x1="0" y1="20" x2="40" y2="20" stroke={lineActive} strokeWidth="3" strokeLinecap="round" />
        <line x1="20" y1="0" x2="20" y2="40" stroke={lineActive} strokeWidth="3" strokeLinecap="round" />
        {lit && (
          <circle cx="20" cy="20" r="16" fill="#fde68a" opacity="0.7">
            <animate
              attributeName="opacity"
              values="0.4;0.85;0.4"
              dur="1.6s"
              repeatCount="indefinite"
            />
          </circle>
        )}
        <circle
          cx="20"
          cy="20"
          r="9"
          fill={lit ? "#fcd34d" : "#fff"}
          stroke="#1a1a2e"
          strokeWidth="1.6"
        />
        {lit ? (
          <g stroke="#1a1a2e" strokeWidth="1.4" strokeLinecap="round">
            <line x1="20" y1="6" x2="20" y2="10" />
            <line x1="32" y1="20" x2="36" y2="20" />
            <line x1="20" y1="32" x2="20" y2="34" />
            <line x1="8" y1="20" x2="4" y2="20" />
          </g>
        ) : null}
      </svg>
    )
  }
  if (cell.kind === "switch") {
    return (
      <svg viewBox="0 0 40 40" className="h-full w-full">
        <line x1="0" y1="20" x2="13" y2="20" stroke={cell.closed ? lineActive : "#1a1a2e"} strokeWidth="3" strokeLinecap="round" />
        <line x1="27" y1="20" x2="40" y2="20" stroke={cell.closed ? lineActive : "#1a1a2e"} strokeWidth="3" strokeLinecap="round" />
        {/* Switch lever */}
        <line
          x1="13"
          y1="20"
          x2={cell.closed ? "27" : "25"}
          y2={cell.closed ? "20" : "8"}
          stroke="#1a1a2e"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="13" cy="20" r="2" fill="#1a1a2e" />
        <circle cx="27" cy="20" r="2" fill="#1a1a2e" />
      </svg>
    )
  }
  if (cell.kind === "battery") {
    const horizontal = cell.orientation === "h" || !cell.orientation
    if (horizontal) {
      return (
        <svg viewBox="0 0 40 40" className="h-full w-full">
          <rect x="6" y="14" width="28" height="12" rx="2" fill="#fbbf24" stroke="#1a1a2e" strokeWidth="1.5" />
          <line x1="0" y1="20" x2="6" y2="20" stroke={lineActive} strokeWidth="3" strokeLinecap="round" />
          <line x1="34" y1="20" x2="40" y2="20" stroke={lineActive} strokeWidth="3" strokeLinecap="round" />
          {/* − on left, + on right */}
          <text x="11" y="23" fontFamily="monospace" fontSize="11" fontWeight="800" fill="#1a1a2e">
            −
          </text>
          <text x="26" y="24" fontFamily="monospace" fontSize="12" fontWeight="800" fill="#1a1a2e">
            +
          </text>
        </svg>
      )
    }
    return (
      <svg viewBox="0 0 40 40" className="h-full w-full">
        <rect x="14" y="6" width="12" height="28" rx="2" fill="#fbbf24" stroke="#1a1a2e" strokeWidth="1.5" />
        <line x1="20" y1="0" x2="20" y2="6" stroke={lineActive} strokeWidth="3" strokeLinecap="round" />
        <line x1="20" y1="34" x2="20" y2="40" stroke={lineActive} strokeWidth="3" strokeLinecap="round" />
        <text x="17" y="14" fontFamily="monospace" fontSize="11" fontWeight="800" fill="#1a1a2e">
          −
        </text>
        <text x="17" y="32" fontFamily="monospace" fontSize="12" fontWeight="800" fill="#1a1a2e">
          +
        </text>
      </svg>
    )
  }
  return null
}
