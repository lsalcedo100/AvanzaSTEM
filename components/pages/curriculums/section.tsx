import { cn } from "@/lib/utils"

/**
 * Shared width container for the Curriculums page. Extracted from the repeated
 * `mx-auto max-w-* px-6` utility strings so every section lines up on the same
 * grid. Slightly narrower than the old `max-w-7xl` for a calmer reading measure.
 */
export function Container({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn("mx-auto max-w-6xl px-6", className)}>{children}</div>
}

/**
 * Left-aligned section heading (eyebrow + title + optional description). Replaces
 * the page's centered `text-center` heading blocks — the redesign deliberately
 * breaks the symmetric, centered look flagged as "generic".
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  id?: string
  className?: string
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p className="text-sm font-bold uppercase tracking-wider text-avanza-green-dark">
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className="mt-2 text-2xl font-extrabold text-foreground sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  )
}
