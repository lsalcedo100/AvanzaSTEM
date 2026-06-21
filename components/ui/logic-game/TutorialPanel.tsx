"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { evalGate, GATE_INFO } from "./gates"
import type { GateType } from "./types"
import { onOffLabel } from "./valueLabels"

function MiniSwitch({ label, value, onToggle }: { label: string; value: number; onToggle: () => void }) {
  const on = value === 1
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      aria-label={`Toggle switch ${label}, currently ${on ? "ON" : "OFF"}`}
      className={cn(
        "flex flex-col items-center gap-1 rounded-2xl px-4 py-2.5 font-mono transition",
        on ? "bg-avanza-green text-avanza-dark shadow-[0_0_0_3px_rgba(46,204,113,0.25)]" : "bg-white text-avanza-dark ring-1 ring-avanza-dark/15",
      )}
    >
      <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-70">Switch {label}</span>
      <span className="text-sm font-extrabold uppercase leading-none">{onOffLabel(value)}</span>
    </button>
  )
}

function MiniLight({ value }: { value: number }) {
  const on = value === 1
  return (
    <div
      aria-label={`Light is ${on ? "ON" : "OFF"}`}
      className={cn(
        "flex h-14 w-14 items-center justify-center rounded-full font-mono text-xl font-extrabold transition-all duration-300",
        on ? "bg-avanza-green text-avanza-dark shadow-[0_0_24px_6px_rgba(46,204,113,0.55)]" : "bg-avanza-dark/10 text-avanza-dark/40",
      )}
    >
      <span className="text-xs uppercase">{onOffLabel(value)}</span>
    </div>
  )
}

function MiniDemo({ gate, arity }: { gate: GateType; arity: 1 | 2 }) {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const out = evalGate(gate, a, arity === 1 ? a : b)

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-[#f7f0ff] p-4 ring-1 ring-avanza-purple/15">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-avanza-purple px-2.5 py-1 font-mono text-xs font-extrabold text-white">{gate}</span>
        <p className="text-xs leading-snug text-avanza-dark/70">{GATE_INFO[gate].description}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
        <MiniSwitch label="A" value={a} onToggle={() => setA((v) => (v ? 0 : 1))} />
        {arity === 2 && <MiniSwitch label="B" value={b} onToggle={() => setB((v) => (v ? 0 : 1))} />}
        <ArrowRight className="h-4 w-4 text-avanza-dark/30" aria-hidden="true" />
        <span className="rounded-xl bg-white px-3 py-2 font-mono text-xs font-extrabold text-avanza-purple ring-1 ring-avanza-purple/20">
          {gate}
        </span>
        <ArrowRight className="h-4 w-4 text-avanza-dark/30" aria-hidden="true" />
        <MiniLight value={out} />
      </div>
    </div>
  )
}

export function TutorialPanel({ onDone }: { onDone: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-extrabold text-avanza-dark">How Logic Gates Work</h3>
        <p className="text-sm leading-relaxed text-avanza-dark/75">
          Boolean logic is how computers make yes/no decisions. Every signal in a circuit is either ON or OFF — and
          each signal can also mean TRUE or FALSE.
        </p>
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 rounded-xl bg-avanza-green/10 px-3 py-2 text-sm font-bold text-avanza-green-dark">ON means TRUE</div>
          <div className="flex-1 rounded-xl bg-avanza-dark/8 px-3 py-2 text-sm font-bold text-avanza-dark/70">OFF means FALSE</div>
        </div>
        <p className="text-sm leading-relaxed text-avanza-dark/75">
          A circuit has <strong>inputs</strong> (switches you control) and an <strong>output</strong> (a light that
          reacts). A <strong>logic gate</strong> is a small rule that looks at the inputs and decides what the
          output should be.
        </p>
        <p className="text-sm leading-relaxed text-avanza-dark/75">
          Try the switches below. Toggle them and watch how each gate decides the light&apos;s output.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-1">
        <MiniDemo gate="AND" arity={2} />
        <MiniDemo gate="OR" arity={2} />
        <MiniDemo gate="NOT" arity={1} />
      </div>

      <div className="rounded-xl bg-avanza-purple/10 px-4 py-3 text-sm text-avanza-dark/80">
        Try to predict the answer first. Then test your circuit.
      </div>

      <button
        type="button"
        onClick={onDone}
        className="inline-flex w-fit items-center gap-2 self-center rounded-full bg-avanza-purple px-5 py-2.5 text-sm font-extrabold text-white shadow-md transition hover:bg-avanza-purple-dark"
      >
        Start Level 1
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  )
}
