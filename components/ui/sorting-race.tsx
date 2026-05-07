"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowDown, BarChart3, Pause, Play, RotateCcw, Sparkles } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { cn } from "@/lib/utils"

const N = 28
const MAX_VAL = 100

type SortEvent =
  | { type: "compare"; indices: number[]; arr: number[] }
  | { type: "swap"; indices: number[]; arr: number[] }
  | { type: "done"; arr: number[] }

function* bubbleSort(input: number[]): Generator<SortEvent> {
  const a = input.slice()
  for (let i = 0; i < a.length; i++) {
    let swapped = false
    for (let j = 0; j < a.length - i - 1; j++) {
      yield { type: "compare", indices: [j, j + 1], arr: a.slice() }
      if (a[j] > a[j + 1]) {
        const tmp = a[j]
        a[j] = a[j + 1]
        a[j + 1] = tmp
        swapped = true
        yield { type: "swap", indices: [j, j + 1], arr: a.slice() }
      }
    }
    if (!swapped) break
  }
  yield { type: "done", arr: a.slice() }
}

function* insertionSort(input: number[]): Generator<SortEvent> {
  const a = input.slice()
  for (let i = 1; i < a.length; i++) {
    let j = i
    while (j > 0) {
      yield { type: "compare", indices: [j - 1, j], arr: a.slice() }
      if (a[j - 1] > a[j]) {
        const tmp = a[j - 1]
        a[j - 1] = a[j]
        a[j] = tmp
        yield { type: "swap", indices: [j - 1, j], arr: a.slice() }
        j--
      } else {
        break
      }
    }
  }
  yield { type: "done", arr: a.slice() }
}

function* quickSort(input: number[]): Generator<SortEvent> {
  const a = input.slice()
  const stack: Array<[number, number]> = [[0, a.length - 1]]
  while (stack.length) {
    const [lo, hi] = stack.pop()!
    if (lo < hi) {
      const pivot = a[hi]
      let i = lo - 1
      for (let j = lo; j < hi; j++) {
        yield { type: "compare", indices: [j, hi], arr: a.slice() }
        if (a[j] <= pivot) {
          i++
          if (i !== j) {
            const tmp = a[i]
            a[i] = a[j]
            a[j] = tmp
            yield { type: "swap", indices: [i, j], arr: a.slice() }
          }
        }
      }
      const tmp = a[i + 1]
      a[i + 1] = a[hi]
      a[hi] = tmp
      yield { type: "swap", indices: [i + 1, hi], arr: a.slice() }
      stack.push([lo, i])
      stack.push([i + 2, hi])
    }
  }
  yield { type: "done", arr: a.slice() }
}

function* selectionSort(input: number[]): Generator<SortEvent> {
  const a = input.slice()
  for (let i = 0; i < a.length - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < a.length; j++) {
      yield { type: "compare", indices: [minIdx, j], arr: a.slice() }
      if (a[j] < a[minIdx]) minIdx = j
    }
    if (minIdx !== i) {
      const tmp = a[i]
      a[i] = a[minIdx]
      a[minIdx] = tmp
      yield { type: "swap", indices: [i, minIdx], arr: a.slice() }
    }
  }
  yield { type: "done", arr: a.slice() }
}

type AlgoKey = "bubble" | "insertion" | "selection" | "quick"

const ALGOS: Record<AlgoKey, (input: number[]) => Generator<SortEvent>> = {
  bubble: bubbleSort,
  insertion: insertionSort,
  selection: selectionSort,
  quick: quickSort,
}

const ALGO_COLOR: Record<AlgoKey, string> = {
  bubble: "#f97316",
  insertion: "#8b5cf6",
  selection: "#06b6d4",
  quick: "#22c55e",
}

// Deterministic seed for SSR; replaced on client mount with a real random shuffle.
function seededArray(): number[] {
  const a: number[] = []
  for (let i = 0; i < N; i++) {
    // Pseudo-shuffled but deterministic
    a.push(((i * 37 + 11) % MAX_VAL) + 6)
  }
  return a
}

function randomArray(): number[] {
  const a: number[] = []
  for (let i = 0; i < N; i++) {
    a.push(Math.floor(Math.random() * MAX_VAL) + 6)
  }
  return a
}

type LaneState = {
  arr: number[]
  highlight: number[]
  swapped: number[]
  comparisons: number
  swaps: number
  done: boolean
}

function emptyLane(arr: number[]): LaneState {
  return {
    arr,
    highlight: [],
    swapped: [],
    comparisons: 0,
    swaps: 0,
    done: false,
  }
}

export function SortingRace() {
  const { t } = useLanguage()
  const [base, setBase] = useState<number[]>(() => seededArray())
  const [running, setRunning] = useState(false)
  const [speed, setSpeed] = useState(60) // higher = faster (steps/sec)
  const [lanes, setLanes] = useState<Record<AlgoKey, LaneState>>(() => ({
    bubble: emptyLane(base),
    insertion: emptyLane(base),
    selection: emptyLane(base),
    quick: emptyLane(base),
  }))
  const itersRef = useRef<Record<AlgoKey, Generator<SortEvent>> | null>(null)
  const lanesRef = useRef<Record<AlgoKey, LaneState>>({
    bubble: emptyLane(base),
    insertion: emptyLane(base),
    selection: emptyLane(base),
    quick: emptyLane(base),
  })
  const animRef = useRef<number | null>(null)
  const lastTickRef = useRef<number>(0)
  const [winner, setWinner] = useState<AlgoKey | null>(null)
  const [finishOrder, setFinishOrder] = useState<AlgoKey[]>([])

  // Reset lanes when base changes
  useEffect(() => {
    const fresh = {
      bubble: emptyLane(base),
      insertion: emptyLane(base),
      selection: emptyLane(base),
      quick: emptyLane(base),
    }
    lanesRef.current = fresh
    setLanes(fresh)
    setWinner(null)
    setFinishOrder([])
    itersRef.current = null
  }, [base])

  // Once mounted on the client, replace the seeded array with a real random one.
  useEffect(() => {
    setBase(randomArray())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function start() {
    // Initialize generators
    itersRef.current = {
      bubble: bubbleSort(base),
      insertion: insertionSort(base),
      selection: selectionSort(base),
      quick: quickSort(base),
    }
    const fresh = {
      bubble: emptyLane(base),
      insertion: emptyLane(base),
      selection: emptyLane(base),
      quick: emptyLane(base),
    }
    lanesRef.current = fresh
    setLanes(fresh)
    setWinner(null)
    setFinishOrder([])
    lastTickRef.current = 0
    setRunning(true)
  }

  useEffect(() => {
    if (!running) return
    const tick = (now: number) => {
      const interval = 1000 / Math.max(1, speed)
      if (now - lastTickRef.current >= interval) {
        lastTickRef.current = now
        const iters = itersRef.current
        if (!iters) {
          setRunning(false)
          return
        }
        const newOrder: AlgoKey[] = []
        let anyActive = false
        const next = { ...lanesRef.current }
        for (const k of Object.keys(iters) as AlgoKey[]) {
          const lane = next[k]
          if (lane.done) continue
          const r = iters[k].next()
          if (r.done) {
            next[k] = { ...lane, done: true, highlight: [], swapped: [] }
            newOrder.push(k)
            continue
          }
          anyActive = true
          const ev = r.value
          if (ev.type === "compare") {
            next[k] = {
              ...lane,
              arr: ev.arr,
              highlight: ev.indices,
              swapped: [],
              comparisons: lane.comparisons + 1,
            }
          } else if (ev.type === "swap") {
            next[k] = {
              ...lane,
              arr: ev.arr,
              highlight: lane.highlight,
              swapped: ev.indices,
              swaps: lane.swaps + 1,
            }
          } else if (ev.type === "done") {
            next[k] = {
              ...lane,
              arr: ev.arr,
              done: true,
              highlight: [],
              swapped: [],
            }
            newOrder.push(k)
          }
        }
        lanesRef.current = next
        setLanes(next)
        if (newOrder.length > 0) {
          setFinishOrder((prev) => {
            const updated = [...prev]
            for (const k of newOrder) if (!updated.includes(k)) updated.push(k)
            return updated
          })
          if (winner === null) setWinner(newOrder[0])
        }
        if (!anyActive) {
          setRunning(false)
          return
        }
      }
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [running, speed, winner])

  function stop() {
    setRunning(false)
    if (animRef.current) cancelAnimationFrame(animRef.current)
  }

  function shuffle() {
    stop()
    setBase(randomArray())
  }

  const allDone = (Object.keys(lanes) as AlgoKey[]).every((k) => lanes[k].done)

  return (
    <section className="relative overflow-hidden bg-[#fffaf0] py-20 md:py-24">
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
            <BarChart3 className="h-3.5 w-3.5 text-avanza-orange" />
            {t.gamesPage.sortEyebrow}
          </span>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            {t.gamesPage.sortTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.gamesPage.sortDesc}
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-12 grid gap-6">
            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-avanza-dark/10">
              <button
                type="button"
                onClick={running ? stop : start}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-extrabold text-white transition hover:scale-[1.04]",
                  running ? "bg-avanza-orange" : "bg-avanza-green",
                )}
              >
                {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {running ? t.gamesPage.sortPause : t.gamesPage.sortStart}
              </button>
              <button
                type="button"
                onClick={shuffle}
                className="inline-flex items-center gap-1.5 rounded-full bg-avanza-dark/8 px-4 py-2 text-sm font-bold text-avanza-dark transition hover:bg-avanza-dark/15"
              >
                <RotateCcw className="h-4 w-4" />
                {t.gamesPage.sortShuffle}
              </button>
              <div className="flex flex-1 items-center gap-3 sm:max-w-xs">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                  {t.gamesPage.sortSpeed}
                </span>
                <input
                  type="range"
                  min={5}
                  max={200}
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="flex-1 accent-avanza-orange"
                />
                <span className="font-mono text-xs text-muted-foreground">{speed}/s</span>
              </div>
              {winner && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-avanza-green px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow">
                  <Sparkles className="h-3 w-3" />
                  {t.gamesPage.sortWinner}: {algoName(t, winner)}
                </span>
              )}
            </div>

            {/* Lanes */}
            <div className="grid gap-4 md:grid-cols-2">
              {(Object.keys(ALGOS) as AlgoKey[]).map((k) => (
                <Lane
                  key={k}
                  algo={k}
                  state={lanes[k]}
                  finishedAt={finishOrder.indexOf(k) >= 0 ? finishOrder.indexOf(k) + 1 : null}
                  label={algoName(t, k)}
                  hint={algoHint(t, k)}
                />
              ))}
            </div>

            {/* Footer fact */}
            <div className="rounded-2xl bg-avanza-dark p-6 text-primary-foreground">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-avanza-green">
                {t.gamesPage.sortFactEyebrow}
              </p>
              <p className="mt-2 text-base leading-relaxed text-white/85">
                {allDone ? t.gamesPage.sortFactAfter : t.gamesPage.sortFactBefore}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function Lane({
  algo,
  state,
  finishedAt,
  label,
  hint,
}: {
  algo: AlgoKey
  state: LaneState
  finishedAt: number | null
  label: string
  hint: string
}) {
  const color = ALGO_COLOR[algo]
  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-avanza-dark/10">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-3 w-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm font-extrabold text-foreground">{label}</span>
          {finishedAt && (
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white",
                finishedAt === 1
                  ? "bg-avanza-green"
                  : finishedAt === 2
                    ? "bg-avanza-orange"
                    : "bg-avanza-dark/40",
              )}
            >
              #{finishedAt}
            </span>
          )}
        </div>
        <div className="flex gap-3 font-mono text-[10px] text-muted-foreground">
          <span>≷ {state.comparisons}</span>
          <span>↔ {state.swaps}</span>
        </div>
      </div>
      <p className="mb-2 text-[11px] font-bold text-muted-foreground">{hint}</p>
      <BarChart state={state} color={color} />
    </div>
  )
}

function BarChart({ state, color }: { state: LaneState; color: string }) {
  const max = MAX_VAL + 6
  const highlightSet = useMemo(() => new Set(state.highlight), [state.highlight])
  const swappedSet = useMemo(() => new Set(state.swapped), [state.swapped])
  return (
    <div className="flex h-32 items-end gap-[2px]">
      {state.arr.map((v, i) => {
        const isHi = highlightSet.has(i)
        const isSwap = swappedSet.has(i)
        return (
          <div
            key={i}
            className="flex-1 rounded-t-sm transition-all duration-100"
            style={{
              height: `${(v / max) * 100}%`,
              backgroundColor: state.done
                ? "#22c55e"
                : isSwap
                  ? "#ef4444"
                  : isHi
                    ? "#f59e0b"
                    : color + "cc",
              minWidth: "3px",
            }}
          />
        )
      })}
    </div>
  )
}

function algoName(t: ReturnType<typeof useLanguage>["t"], a: AlgoKey) {
  const map: Record<AlgoKey, string> = {
    bubble: t.gamesPage.sortBubble,
    insertion: t.gamesPage.sortInsertion,
    selection: t.gamesPage.sortSelection,
    quick: t.gamesPage.sortQuick,
  }
  return map[a]
}

function algoHint(t: ReturnType<typeof useLanguage>["t"], a: AlgoKey) {
  const map: Record<AlgoKey, string> = {
    bubble: t.gamesPage.sortBubbleHint,
    insertion: t.gamesPage.sortInsertionHint,
    selection: t.gamesPage.sortSelectionHint,
    quick: t.gamesPage.sortQuickHint,
  }
  return map[a]
}

// avoid unused-import warning if unused
void ArrowDown
