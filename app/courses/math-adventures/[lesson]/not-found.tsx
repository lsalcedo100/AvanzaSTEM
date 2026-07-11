import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { mathAdventuresCurriculum, mathAdventuresPath } from "@/features/curriculums/math-adventures"

/**
 * Shown when a Math Adventures lesson slug does not match one of the ten weeks
 * (an old or mistyped URL). Instead of the generic site 404, it points students
 * straight back to the course hub and its first week.
 */
export default function MathLessonNotFound() {
  const first = mathAdventuresCurriculum.lessons[0]

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
      <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Math Adventures
      </p>
      <h1 className="mt-3 text-2xl font-extrabold text-foreground md:text-3xl">
        We couldn&apos;t find that week
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
        This lesson link doesn&apos;t match any of the ten weeks in the course. It may have moved or
        the address may be mistyped.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={mathAdventuresPath}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-avanza-teal px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-avanza-teal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-2"
        >
          Go to the course hub <ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
        <Link
          href={`${mathAdventuresPath}/${first.slug}`}
          className="inline-flex items-center justify-center rounded-md border border-border px-4 py-3 text-sm font-semibold text-avanza-teal-dark transition-colors hover:border-avanza-teal hover:bg-avanza-teal/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-2"
        >
          Start Week 1
        </Link>
      </div>
    </section>
  )
}
