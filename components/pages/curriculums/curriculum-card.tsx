import Image from "next/image"
import Link from "next/link"
import { JourneyDiagram } from "@/components/pages/intro-to-ai/journey-diagram"
import type { CurriculumCopy, CurriculumEntry } from "@/features/curriculums/catalog"

/**
 * A single curriculum in the catalog grid.
 *
 * The whole card is one link (no nested interactive elements), so it is fully
 * keyboard-operable and the visible "View curriculum" affordance is decorative
 * markup rather than a second focus stop. All content comes from the typed
 * catalog via {@link CurriculumCopy} — nothing is duplicated per course here.
 *
 * Design: moderate radius, a single restrained border, no heavy shadow, no
 * status badge, no topic pills, and no decorative icons. Cards use flex so a
 * short description and a long one still align their metadata and action row.
 */
export function CurriculumCard({
  entry,
  copy,
  ctaLabel,
}: {
  entry: CurriculumEntry
  copy: CurriculumCopy
  ctaLabel: string
}) {
  return (
    <Link
      href={entry.href}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors duration-200 hover:border-avanza-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
    >
      <div className="relative h-40 overflow-hidden bg-secondary/40">
        {entry.illustration === "ai-journey" ? (
          <div className="flex h-full w-full items-center justify-center p-5">
            <JourneyDiagram variant="card" className="h-full w-full" />
          </div>
        ) : (
          <Image
            src={entry.image}
            alt={copy.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-card-foreground">{copy.title}</h3>

        {/* Consistent, plain-text metadata line — not pills. */}
        <p className="mt-1.5 text-xs font-medium text-muted-foreground">{copy.meta}</p>

        {/* Concrete outcome. flex-1 pushes the "learn" line + action to the
            bottom so cards stay aligned regardless of text length. */}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-card-foreground/80">
          {copy.outcome}
        </p>

        <p className="mt-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{copy.learnLabel}:</span> {copy.learn}
        </p>

        <span className="mt-4 inline-flex items-center justify-center rounded-md border border-avanza-green px-4 py-2 text-sm font-bold text-avanza-green-dark transition-colors group-hover:bg-avanza-green group-hover:text-avanza-dark">
          {ctaLabel}
        </span>
      </div>
    </Link>
  )
}
