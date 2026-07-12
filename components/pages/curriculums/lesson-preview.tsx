import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { featuredCurriculum } from "@/features/curriculums/catalog"
import type { Translations } from "@/i18n/translations"

/**
 * A concrete preview of what a week actually looks like: the shared five-step
 * lesson rhythm every path follows (learn → try → fix/test → build → reflect).
 * This is real — it mirrors the `lessonFlow` in every course's data — and links
 * to a live lesson so the preview isn't a dead end.
 *
 * A later phase can swap this ordered list for a rendered excerpt/screenshot of
 * a specific lesson; the structure (heading, numbered flow, CTA) stays.
 */
export function LessonPreview({
  c,
}: {
  c: Translations["curriculumsPage"]
}) {
  const s = c.sections

  return (
    <ol className="mt-8 space-y-3">
      {s.flowSteps.map((step, i) => (
        <li
          key={step.title}
          className="flex gap-4 rounded-lg border border-border bg-card p-4"
        >
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-secondary text-sm font-bold text-avanza-green-dark"
          >
            {i + 1}
          </span>
          <div>
            <h3 className="font-bold text-card-foreground">{step.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
          </div>
        </li>
      ))}
      <li className="pt-2">
        <Link
          href={featuredCurriculum.href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-avanza-green-dark transition-colors hover:text-avanza-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
        >
          {s.previewCta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </li>
    </ol>
  )
}
