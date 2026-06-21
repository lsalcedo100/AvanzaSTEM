import type { Level } from "./types"

export function MissionCard({ level }: { level: Level }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-avanza-teal/10 p-4 ring-1 ring-avanza-teal/20">
      <span className="text-[11px] font-extrabold uppercase tracking-wider text-avanza-teal-dark">{level.missionTitle}</span>
      <p className="text-sm leading-relaxed text-avanza-dark/85">{level.missionStory}</p>
      <p className="text-xs font-bold text-avanza-dark/60">Goal: {level.plainGoal}</p>
      <p className="text-xs text-avanza-dark/50">Boolean concept: {level.concept}</p>
    </div>
  )
}
