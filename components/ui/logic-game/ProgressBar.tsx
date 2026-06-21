export function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const pct = Math.round((completed / total) * 100)
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-avanza-dark/60">
        <span>Progress</span>
        <span>
          {completed} of {total} circuits completed
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={completed}
        aria-valuemin={0}
        aria-valuemax={total}
        className="h-2.5 w-full overflow-hidden rounded-full bg-avanza-dark/10"
      >
        <div className="h-full rounded-full bg-avanza-green transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
