import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { JourneyDiagram } from "@/components/pages/intro-to-ai/journey-diagram"
import {
  featuredCurriculum,
  resolveCurriculumCopy,
} from "@/features/curriculums/catalog"
import type { Translations } from "@/i18n/translations"
import { Container } from "./section"

/**
 * Editorial spotlight on one path (currently Intro to AI, which ships with the
 * authentic in-course JourneyDiagram instead of stock art — so the featured
 * block avoids the generated cover imagery flagged in the audit).
 */
export function FeaturedCurriculum({
  c,
}: {
  c: Translations["curriculumsPage"]
}) {
  const entry = featuredCurriculum
  const copy = resolveCurriculumCopy(entry, c)
  const s = c.sections

  return (
    <section className="bg-secondary py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="order-2 md:order-1">
            <p className="text-sm font-bold uppercase tracking-wider text-avanza-green-dark">
              {s.featuredEyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-foreground sm:text-3xl">
              {copy.title}
            </h2>
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              {copy.grades} · {copy.duration} · {copy.settingLabel}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {copy.description}
            </p>
            <Link
              href={entry.href}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-avanza-green px-5 py-2.5 text-sm font-bold text-avanza-dark transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
            >
              {s.featuredCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="order-1 flex justify-center md:order-2">
            {entry.illustration === "ai-journey" ? (
              <JourneyDiagram variant="full" className="w-full max-w-md" />
            ) : (
              <div className="relative aspect-4/3 w-full max-w-md overflow-hidden rounded-xl">
                <Image
                  src={entry.image}
                  alt={copy.title}
                  fill
                  sizes="(min-width: 768px) 28rem, 100vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
