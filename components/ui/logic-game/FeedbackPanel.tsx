"use client"

import { cn } from "@/lib/utils"
import { formatLogicText, type LogicGameCopy } from "./copy"
import type { RowResult } from "./gates"

export type FeedbackState = "no-gate" | "partial" | "wrong" | "solved"

export function getFeedbackState(allSelected: boolean, results: RowResult[]): FeedbackState {
  if (!allSelected) return "no-gate"
  const matchCount = results.filter((r) => r.matches).length
  if (matchCount === results.length) return "solved"
  if (matchCount === 0) return "wrong"
  return "partial"
}

export function FeedbackPanel({ state, results, copy }: { state: FeedbackState; results: RowResult[]; copy: LogicGameCopy }) {
  const matchCount = results.filter((r) => r.matches).length

  const message = {
    "no-gate": copy.feedbackNoGate,
    partial: formatLogicText(copy.feedbackPartial, { matchCount, total: results.length }),
    wrong: copy.feedbackWrong,
    solved: copy.feedbackSolved,
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
