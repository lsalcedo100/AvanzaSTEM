"use client"

import { Lock, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { SANDBOX_LEVEL_ID } from "./levels"
import type { LogicGameCopy } from "./copy"
import type { Level, Progress } from "./types"

export function LevelSelector({
  activeLevelId,
  progress,
  isUnlocked,
  onSelect,
  levels,
  copy,
}: {
  activeLevelId: number
  progress: Progress
  isUnlocked: (id: number) => boolean
  onSelect: (id: number) => void
  levels: Level[]
  copy: LogicGameCopy
}) {
  const items = [...levels.map((l) => ({ id: l.id, label: `${l.id}` })), { id: SANDBOX_LEVEL_ID, label: copy.sandbox }]

  return (
    <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label={copy.levelsAria}>
      {items.map((item) => {
        const unlocked = isUnlocked(item.id)
        const solved = progress.levels[item.id]?.solved
        const active = item.id === activeLevelId
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            aria-disabled={!unlocked}
            disabled={!unlocked}
            onClick={() => unlocked && onSelect(item.id)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider transition",
              active
                ? "bg-avanza-purple text-white"
                : unlocked
                  ? "bg-avanza-dark/8 text-avanza-dark hover:bg-avanza-dark/15"
                  : "cursor-not-allowed bg-avanza-dark/5 text-avanza-dark/30",
            )}
          >
            {solved && <CheckCircle2 className="h-3.5 w-3.5 text-avanza-green" />}
            {!unlocked && <Lock className="h-3 w-3" />}
            {item.id === SANDBOX_LEVEL_ID ? item.label : `${copy.level} ${item.label}`}
          </button>
        )
      })}
    </div>
  )
}
