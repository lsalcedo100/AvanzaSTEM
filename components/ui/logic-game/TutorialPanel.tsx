"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatLogicText, type LogicGameCopy } from "./copy"
import { evalGate } from "./gates"
import type { GateType } from "./types"

function valueLabel(value: number, copy: LogicGameCopy): string {
  if (value === 1) return copy.on
  if (value === 0) return copy.off
  return "?"
}

function MiniSwitch({ label, value, onToggle, copy }: { label: string; value: number; onToggle: () => void; copy: LogicGameCopy }) {
  const on = value === 1
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      aria-label={formatLogicText(copy.toggleSwitchAria, { label, state: valueLabel(value, copy) })}
      className={cn(
        "flex flex-col items-center gap-1 rounded-2xl px-4 py-2.5 font-mono transition",
        on ? "bg-avanza-green text-avanza-dark shadow-[0_0_0_3px_rgba(46,204,113,0.25)]" : "bg-white text-avanza-dark ring-1 ring-avanza-dark/15",
      )}
    >
      <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-70">{formatLogicText(copy.switchLabel, { label })}</span>
      <span className="text-sm font-extrabold uppercase leading-none">{valueLabel(value, copy)}</span>
    </button>
  )
}

function MiniLight({ value, copy }: { value: number; copy: LogicGameCopy }) {
  const on = value === 1
  return (
    <div
      aria-label={formatLogicText(copy.lightAria, { state: valueLabel(value, copy) })}
      className={cn(
        "flex h-14 w-14 items-center justify-center rounded-full font-mono text-xl font-extrabold transition-all duration-300",
        on ? "bg-avanza-green text-avanza-dark shadow-[0_0_24px_6px_rgba(46,204,113,0.55)]" : "bg-avanza-dark/10 text-avanza-dark/40",
      )}
    >
      <span className="text-xs uppercase">{valueLabel(value, copy)}</span>
    </div>
  )
}

function MiniDemo({ gate, arity, copy }: { gate: GateType; arity: 1 | 2; copy: LogicGameCopy }) {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const out = evalGate(gate, a, arity === 1 ? a : b)

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-[#f7f0ff] p-4 ring-1 ring-avanza-purple/15">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-avanza-purple px-2.5 py-1 font-mono text-xs font-extrabold text-white">{gate}</span>
        <p className="text-xs leading-snug text-avanza-dark/70">{copy.gateInfo[gate]}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
        <MiniSwitch label="A" value={a} onToggle={() => setA((v) => (v ? 0 : 1))} copy={copy} />
        {arity === 2 && <MiniSwitch label="B" value={b} onToggle={() => setB((v) => (v ? 0 : 1))} copy={copy} />}
        <ArrowRight className="h-4 w-4 text-avanza-dark/30" aria-hidden="true" />
        <span className="rounded-xl bg-white px-3 py-2 font-mono text-xs font-extrabold text-avanza-purple ring-1 ring-avanza-purple/20">
          {gate}
        </span>
        <ArrowRight className="h-4 w-4 text-avanza-dark/30" aria-hidden="true" />
        <MiniLight value={out} copy={copy} />
      </div>
    </div>
  )
}

export function TutorialPanel({ onDone, copy }: { onDone: () => void; copy: LogicGameCopy }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-extrabold text-avanza-dark">{copy.tutorialTitle}</h3>
        <p className="text-sm leading-relaxed text-avanza-dark/75">
          {copy.tutorialP1}
        </p>
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 rounded-xl bg-avanza-green/10 px-3 py-2 text-sm font-bold text-avanza-green-dark">{copy.tutorialOnTrue}</div>
          <div className="flex-1 rounded-xl bg-avanza-dark/8 px-3 py-2 text-sm font-bold text-avanza-dark/70">{copy.tutorialOffFalse}</div>
        </div>
        <p className="text-sm leading-relaxed text-avanza-dark/75">
          {copy.tutorialP2}
        </p>
        <p className="text-sm leading-relaxed text-avanza-dark/75">
          {copy.tutorialP3}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-1">
        <MiniDemo gate="AND" arity={2} copy={copy} />
        <MiniDemo gate="OR" arity={2} copy={copy} />
        <MiniDemo gate="NOT" arity={1} copy={copy} />
      </div>

      <div className="rounded-xl bg-avanza-purple/10 px-4 py-3 text-sm text-avanza-dark/80">
        {copy.tutorialTip}
      </div>

      <button
        type="button"
        onClick={onDone}
        className="inline-flex w-fit items-center gap-2 self-center rounded-full bg-avanza-purple px-5 py-2.5 text-sm font-extrabold text-white shadow-md transition hover:bg-avanza-purple-dark"
      >
        {copy.startLevel1}
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  )
}
