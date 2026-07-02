"use client"

import { formatLogicText, type LogicGameCopy } from "./copy"

export function HintPanel({
  hints,
  revealed,
  onReveal,
  copy,
}: {
  hints: string[]
  revealed: number
  onReveal: () => void
  copy: LogicGameCopy
}) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-avanza-dark/5 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-avanza-dark/70">{copy.needHint}</span>
        {revealed < hints.length && (
          <button
            type="button"
            onClick={onReveal}
            className="inline-flex items-center gap-1.5 rounded-full bg-avanza-purple/15 px-3 py-1 text-xs font-bold text-avanza-purple transition hover:bg-avanza-purple/25"
          >
            {revealed === 0 ? copy.showHint : copy.showNextHint}
          </button>
        )}
      </div>
      {revealed > 0 && (
        <ol className="flex flex-col gap-1.5">
          {hints.slice(0, revealed).map((hint, i) => (
            <li key={i} className="rounded-lg bg-white px-3 py-2 text-xs leading-relaxed text-avanza-dark/80 ring-1 ring-avanza-dark/10">
              <span className="font-extrabold text-avanza-purple">{formatLogicText(copy.hintLabel, { number: i + 1 })} </span>
              {hint}
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
