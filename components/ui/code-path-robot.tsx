"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Bot, Play, RotateCcw, Sparkles, Trash2, Undo2 } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { cn } from "@/lib/utils"

type Dir = 0 | 1 | 2 | 3 // 0 = up, 1 = right, 2 = down, 3 = left
type Cell = "empty" | "wall" | "goal" | "star"
type Block = "forward" | "left" | "right"

type Level = {
  id: number
  cols: number
  rows: number
  start: { x: number; y: number; dir: Dir }
  walls: Array<{ x: number; y: number }>
  stars: Array<{ x: number; y: number }>
  goal: { x: number; y: number }
  parTitle: string
}

const LEVELS: Level[] = [
  // Level 1: simple right + up
  {
    id: 1,
    cols: 5,
    rows: 5,
    start: { x: 0, y: 4, dir: 1 },
    walls: [],
    stars: [],
    goal: { x: 4, y: 0 },
    parTitle: "Level 1 · Reach the flag",
  },
  // Level 2: zig with walls
  {
    id: 2,
    cols: 5,
    rows: 5,
    start: { x: 0, y: 4, dir: 1 },
    walls: [
      { x: 2, y: 4 },
      { x: 2, y: 3 },
      { x: 2, y: 2 },
    ],
    stars: [],
    goal: { x: 4, y: 0 },
    parTitle: "Level 2 · Around the wall",
  },
  // Level 3: collect stars before goal
  {
    id: 3,
    cols: 5,
    rows: 5,
    start: { x: 0, y: 4, dir: 1 },
    walls: [
      { x: 2, y: 1 },
      { x: 3, y: 3 },
    ],
    stars: [
      { x: 4, y: 4 },
      { x: 0, y: 0 },
    ],
    goal: { x: 4, y: 0 },
    parTitle: "Level 3 · Collect the stars",
  },
]

const STEP_MS = 380

export function CodePathRobot() {
  const { t } = useLanguage()
  const [levelIdx, setLevelIdx] = useState(0)
  const [program, setProgram] = useState<Block[]>([])
  const [running, setRunning] = useState(false)
  const [pc, setPc] = useState(-1) // program counter while running
  const [pos, setPos] = useState<{ x: number; y: number; dir: Dir }>(
    LEVELS[0].start,
  )
  const [collected, setCollected] = useState<Set<string>>(new Set())
  const [status, setStatus] = useState<"idle" | "win" | "fail" | "running">(
    "idle",
  )
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const level = LEVELS[levelIdx]

  // Reset robot when level changes
  useEffect(() => {
    resetRun()
    setProgram([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelIdx])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  function resetRun() {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = null
    setRunning(false)
    setPc(-1)
    setPos(level.start)
    setCollected(new Set())
    setStatus("idle")
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
        // End of program — check win
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
      current = step(current, program[i])
      // Star pickup
      const onStar = level.stars.find((s) => s.x === current.x && s.y === current.y)
      if (onStar) {
        const key = `${onStar.x},${onStar.y}`
        if (!collectedSet.has(key)) {
          collectedSet = new Set(collectedSet)
          collectedSet.add(key)
          setCollected(collectedSet)
        }
      }
      setPos(current)
      i += 1
      setPc(i)
      timerRef.current = setTimeout(tick, STEP_MS)
    }
    timerRef.current = setTimeout(tick, STEP_MS)
  }

  function addBlock(b: Block) {
    if (running) return
    if (program.length >= 30) return
    setProgram((p) => [...p, b])
  }
  function popBlock() {
    if (running) return
    setProgram((p) => p.slice(0, -1))
  }
  function clearProgram() {
    if (running) return
    setProgram([])
    resetRun()
  }

  return (
    <section className="relative overflow-hidden bg-[#eef9ff] py-20 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(26,26,46,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,46,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-avanza-dark">
            <Bot className="h-3.5 w-3.5 text-avanza-purple" />
            {t.gamesPage.robotEyebrow}
          </span>
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
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(-0.6deg)]"
              />
              <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_28px_64px_-30px_rgba(26,26,46,0.35)] ring-1 ring-avanza-dark/10 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {LEVELS.map((lv, i) => (
                      <button
                        key={lv.id}
                        type="button"
                        onClick={() => setLevelIdx(i)}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider transition",
                          i === levelIdx
                            ? "bg-avanza-purple text-white"
                            : "bg-avanza-dark/8 text-avanza-dark hover:bg-avanza-dark/15",
                        )}
                      >
                        {t.gamesPage.robotLevel} {lv.id}
                      </button>
                    ))}
                  </div>
                  {status === "win" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-avanza-green px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-avanza-dark shadow-sm">
                      <Sparkles className="h-3 w-3" />
                      {t.gamesPage.robotWin}
                    </span>
                  )}
                  {status === "fail" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-avanza-orange px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-avanza-dark shadow-sm">
                      {t.gamesPage.robotTryAgain}
                    </span>
                  )}
                </div>
                <div className="mt-5 aspect-square w-full">
                  <RobotGridSVG
                    level={level}
                    pos={pos}
                    collected={collected}
                  />
                </div>
              </div>
            </div>

            {/* Program panel */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(0.5deg)]"
              />
              <div className="relative flex h-full flex-col gap-4 rounded-3xl bg-avanza-dark p-7 text-primary-foreground shadow-[0_28px_64px_-30px_rgba(26,26,46,0.4)]">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/65">
                    {t.gamesPage.robotProgram}
                  </p>
                  <p className="font-mono text-xs text-white/55">
                    {program.length}/30
                  </p>
                </div>

                {/* Block list */}
                <div className="min-h-[110px] rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
                  {program.length === 0 ? (
                    <p className="py-6 text-center text-xs font-bold uppercase tracking-wider text-white/45">
                      {t.gamesPage.robotEmpty}
                    </p>
                  ) : (
                    <ol className="flex flex-wrap gap-1.5">
                      {program.map((b, i) => (
                        <li
                          key={i}
                          className={cn(
                            "inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-extrabold transition",
                            i === pc - 1 && running
                              ? "bg-avanza-green text-avanza-dark ring-2 ring-white/40"
                              : b === "forward"
                                ? "bg-avanza-purple/85 text-white"
                                : b === "left"
                                  ? "bg-avanza-orange text-avanza-dark"
                                  : "bg-avanza-teal/85 text-white",
                          )}
                        >
                          <span className="font-mono text-[10px] opacity-65">
                            {i + 1}
                          </span>
                          {b === "forward"
                            ? "↑"
                            : b === "left"
                              ? "↺"
                              : "↻"}
                          <span>
                            {b === "forward"
                              ? t.gamesPage.robotForward
                              : b === "left"
                                ? t.gamesPage.robotLeft
                                : t.gamesPage.robotRight}
                          </span>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>

                {/* Block palette */}
                <div className="grid grid-cols-3 gap-2">
                  <PaletteBtn
                    onClick={() => addBlock("forward")}
                    disabled={running}
                    color="bg-avanza-purple"
                    label={t.gamesPage.robotForward}
                    glyph="↑"
                  />
                  <PaletteBtn
                    onClick={() => addBlock("left")}
                    disabled={running}
                    color="bg-avanza-orange"
                    label={t.gamesPage.robotLeft}
                    glyph="↺"
                  />
                  <PaletteBtn
                    onClick={() => addBlock("right")}
                    disabled={running}
                    color="bg-avanza-teal"
                    label={t.gamesPage.robotRight}
                    glyph="↻"
                  />
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={run}
                    disabled={running || program.length === 0}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-avanza-green px-4 py-2.5 text-sm font-extrabold text-avanza-dark transition disabled:cursor-not-allowed disabled:opacity-50 hover:enabled:bg-emerald-400"
                  >
                    <Play className="h-4 w-4" />
                    {t.gamesPage.robotRun}
                  </button>
                  <button
                    type="button"
                    onClick={popBlock}
                    disabled={running || program.length === 0}
                    aria-label={t.gamesPage.robotUndo}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/85 transition disabled:opacity-40 hover:enabled:bg-white/20"
                  >
                    <Undo2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={clearProgram}
                    disabled={running || program.length === 0}
                    aria-label={t.gamesPage.robotClear}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/85 transition disabled:opacity-40 hover:enabled:bg-white/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={resetRun}
                    aria-label={t.gamesPage.robotReset}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/85 transition hover:bg-white/20"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-auto rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-avanza-green">
                    {t.gamesPage.robotLessonTitle}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/80">
                    {t.gamesPage.robotLessonText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function PaletteBtn({
  onClick,
  disabled,
  color,
  label,
  glyph,
}: {
  onClick: () => void
  disabled?: boolean
  color: string
  label: string
  glyph: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group flex flex-col items-center gap-0.5 rounded-2xl px-3 py-2.5 text-white transition disabled:cursor-not-allowed disabled:opacity-50 hover:enabled:scale-[1.04] active:enabled:scale-[0.97]",
        color,
      )}
    >
      <span className="font-mono text-xl font-extrabold leading-none">
        {glyph}
      </span>
      <span className="text-[10px] font-extrabold uppercase tracking-wider">
        {label}
      </span>
    </button>
  )
}

function RobotGridSVG({
  level,
  pos,
  collected,
}: {
  level: Level
  pos: { x: number; y: number; dir: Dir }
  collected: Set<string>
}) {
  const size = 360
  const cellSize = size / Math.max(level.cols, level.rows)
  const W = cellSize * level.cols
  const H = cellSize * level.rows
  const padX = (size - W) / 2
  const padY = (size - H) / 2

  // Robot rotation: 0 (up) = -90, 1 (right) = 0, 2 (down) = 90, 3 (left) = 180
  const rotMap = [-90, 0, 90, 180]
  const rotation = rotMap[pos.dir]

  // Robot center pixel (animates via transition)
  const rx = padX + pos.x * cellSize + cellSize / 2
  const ry = padY + pos.y * cellSize + cellSize / 2

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
      </defs>

      {/* Board background */}
      <rect
        x={padX}
        y={padY}
        width={W}
        height={H}
        fill="url(#rgridChecker)"
        stroke="#1a1a2e"
        strokeOpacity={0.18}
        strokeWidth={1.5}
        rx={8}
      />

      {/* Walls */}
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

      {/* Stars */}
      {level.stars.map((s, i) => {
        const taken = collected.has(`${s.x},${s.y}`)
        const cx = padX + s.x * cellSize + cellSize / 2
        const cy = padY + s.y * cellSize + cellSize / 2
        return (
          <g key={`s${i}`} opacity={taken ? 0.25 : 1}>
            <Star cx={cx} cy={cy} r={cellSize * 0.32} fill="#f59e0b" />
          </g>
        )
      })}

      {/* Goal flag */}
      {(() => {
        const gx = padX + level.goal.x * cellSize + cellSize / 2
        const gy = padY + level.goal.y * cellSize + cellSize / 2
        return (
          <g>
            <circle cx={gx} cy={gy} r={cellSize * 0.4} fill="#2ecc71" opacity={0.18} />
            <line
              x1={gx - cellSize * 0.05}
              y1={gy + cellSize * 0.32}
              x2={gx - cellSize * 0.05}
              y2={gy - cellSize * 0.32}
              stroke="#1a1a2e"
              strokeWidth={2}
              strokeLinecap="round"
            />
            <polygon
              points={`${gx - cellSize * 0.05},${gy - cellSize * 0.32}
                       ${gx + cellSize * 0.28},${gy - cellSize * 0.18}
                       ${gx - cellSize * 0.05},${gy - cellSize * 0.05}`}
              fill="#2ecc71"
            />
          </g>
        )
      })()}

      {/* Robot */}
      <g
        style={{
          transform: `translate(${rx}px, ${ry}px) rotate(${rotation}deg)`,
          transformBox: "fill-box",
          transformOrigin: "center",
          transition: "transform 280ms cubic-bezier(.4,.0,.2,1)",
        }}
      >
        <g transform={`translate(${-cellSize * 0.32}, ${-cellSize * 0.32})`}>
          <rect
            x={0}
            y={0}
            width={cellSize * 0.64}
            height={cellSize * 0.64}
            rx={cellSize * 0.16}
            fill="#8b5cf6"
            stroke="#1a1a2e"
            strokeWidth={2}
          />
          {/* eyes */}
          <circle
            cx={cellSize * 0.22}
            cy={cellSize * 0.26}
            r={cellSize * 0.07}
            fill="#fff"
          />
          <circle
            cx={cellSize * 0.42}
            cy={cellSize * 0.26}
            r={cellSize * 0.07}
            fill="#fff"
          />
          <circle
            cx={cellSize * 0.24}
            cy={cellSize * 0.27}
            r={cellSize * 0.03}
            fill="#1a1a2e"
          />
          <circle
            cx={cellSize * 0.44}
            cy={cellSize * 0.27}
            r={cellSize * 0.03}
            fill="#1a1a2e"
          />
          {/* arrow showing facing direction */}
          <polygon
            points={`${cellSize * 0.32},${cellSize * 0.42}
                     ${cellSize * 0.44},${cellSize * 0.5}
                     ${cellSize * 0.32},${cellSize * 0.58}`}
            fill="#fff"
          />
        </g>
      </g>
    </svg>
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
  // 5-point star
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
