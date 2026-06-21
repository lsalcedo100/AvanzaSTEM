"use client"

import { useMemo } from "react"
import type { Level } from "./types"

const CONFETTI_COLORS = ["#a78bfa", "#fb923c", "#2dd4bf", "#facc15", "#34d399", "#f472b6"]

function seededUnit(seed: number) {
  const x = Math.sin(seed * 999) * 10000
  return x - Math.floor(x)
}

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
          spin: (seededUnit(seed + 60) > 0.5 ? 1 : -1) * Math.round(240 + seededUnit(seed + 80) * 240),
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

export function CompletionModal({
  level,
  attempts,
  hintsUsed,
  rowsMatched,
  totalRows,
  onNext,
  hasNext,
}: {
  level: Level
  attempts: number
  hintsUsed: number
  rowsMatched: number
  totalRows: number
  onNext: () => void
  hasNext: boolean
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-avanza-dark p-5 text-white shadow-[0_28px_64px_-30px_rgba(26,26,46,0.5)]">
      <Confetti />
      <div className="relative flex flex-col gap-3">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-avanza-green px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-avanza-dark">
          Circuit complete!
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2">
          <span className="text-sm font-extrabold">Badge earned: {level.badge.name}</span>
        </div>

        <dl className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-lg bg-white/5 px-2 py-2">
            <dt className="text-white/60">Rows matched</dt>
            <dd className="font-mono text-base font-extrabold">
              {rowsMatched}/{totalRows}
            </dd>
          </div>
          <div className="rounded-lg bg-white/5 px-2 py-2">
            <dt className="text-white/60">Attempts</dt>
            <dd className="font-mono text-base font-extrabold">{attempts}</dd>
          </div>
          <div className="rounded-lg bg-white/5 px-2 py-2">
            <dt className="text-white/60">Hints used</dt>
            <dd className="font-mono text-base font-extrabold">{hintsUsed}</dd>
          </div>
        </dl>

        <div className="rounded-xl bg-white/5 px-3 py-2.5 text-sm leading-relaxed text-white/85">
          <span className="font-extrabold text-avanza-green">What you learned: </span>
          {level.successExplanation}
        </div>
        <p className="text-xs leading-relaxed text-white/55">{level.realWorldConnection}</p>

        {hasNext && (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex w-fit items-center gap-2 self-end rounded-full bg-avanza-green px-4 py-2 text-sm font-extrabold text-avanza-dark transition hover:brightness-95"
          >
            Next level
          </button>
        )}
      </div>
    </div>
  )
}
