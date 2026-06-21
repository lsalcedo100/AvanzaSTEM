"use client"

import { cn } from "@/lib/utils"
import type { RowResult } from "./gates"

export type FeedbackState = "no-gate" | "partial" | "wrong" | "solved"

export function getFeedbackState(allSelected: boolean, results: RowResult[]): FeedbackState {
  if (!allSelected) return "no-gate"
  const matchCount = results.filter((r) => r.matches).length
  if (matchCount === results.length) return "solved"
  if (matchCount === 0) return "wrong"
  return "partial"
}

export function FeedbackPanel({ state, results }: { state: FeedbackState; results: RowResult[] }) {
  const matchCount = results.filter((r) => r.matches).length

  const message = {
    "no-gate": "Pick a gate to test your circuit.",
    partial: `${matchCount} of ${results.length} rows match. Check the rows marked Try again.`,
    wrong: "Not quite. Compare the rows where your output differs from the target.",
    solved: "All rows match. Your circuit works!",
  }[state]

  return (
    <div
      role="status"
      className={cn(
        "rounded-xl px-3 py-2 text-xs font-bold",
        state === "solved" && "bg-avanza-green/15 text-avanza-green",
        state === "wrong" && "bg-avanza-orange/15 text-avanza-orange",
        state === "partial" && "bg-avanza-orange/10 text-avanza-orange",
        state === "no-gate" && "bg-white/10 text-white/70",
      )}
    >
      {message}
    </div>
  )
}
