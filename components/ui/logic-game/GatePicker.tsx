"use client"

import { cn } from "@/lib/utils"
import type { LogicGameCopy } from "./copy"
import type { GateSlot, GateType } from "./types"

export function GatePicker({
  slot,
  selected,
  onSelect,
  copy,
}: {
  slot: GateSlot
  selected: GateType | undefined
  onSelect: (gate: GateType) => void
  copy: LogicGameCopy
}) {
  return (
    <div className="relative z-30 flex flex-wrap items-center gap-2 rounded-2xl bg-[#fbf7ff] p-3 ring-1 ring-avanza-purple/15">
      <div className="flex flex-wrap gap-2" role="group" aria-label={copy.chooseGate}>
        {slot.options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            aria-pressed={selected === opt}
            aria-label={`${opt}: ${copy.gateInfo[opt]}`}
            className={cn(
              "group relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs font-extrabold uppercase tracking-wider transition",
              selected === opt
                ? "bg-avanza-purple text-white shadow-md"
                : "bg-avanza-dark/8 text-avanza-dark hover:bg-avanza-dark/15",
            )}
          >
            <span>{opt}</span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-full z-[100] mt-2 w-56 -translate-x-1/2 translate-y-1 rounded-xl bg-avanza-dark px-3 py-2 text-left font-sans text-xs font-medium normal-case leading-snug tracking-normal text-white opacity-0 shadow-lg transition group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
            >
              <span className="mb-1 block font-mono text-[11px] font-extrabold uppercase tracking-wider text-avanza-green">
                {opt}
              </span>
              {copy.gateInfo[opt]}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
