import Image from "next/image"
import Link from "next/link"
import {
  featuredCurriculum,
  featuredImage,
  resolveCurriculumCopy,
} from "@/features/curriculums/catalog"
import type { Translations } from "@/i18n/translations"
import { Container } from "./section"

/**
 * Editorial spotlight on the most complete course (Intro to AI). Deliberately
 * restrained — no gradient panel, promo banner, or oversized rounded card: a
 * hairline-bordered two-column block that reads like the lead item in a course
 * catalog. Horizontal on desktop, stacked on mobile.
 *
 * Uses a real Avanza AI-workshop photo (not the AI card's in-course diagram, and
 * not the AI-generated cover) so the featured treatment is clearly its own.
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
    <section className="bg-secondary py-14 sm:py-16">
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="order-2 md:order-1">
            <p className="text-sm font-bold uppercase tracking-wider text-avanza-green-dark">
              {s.featuredEyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-foreground sm:text-3xl">
              {copy.title}
            </h2>
            <p className="mt-1.5 text-sm font-medium text-muted-foreground">{copy.meta}</p>
            <p className="mt-4 text-base leading-relaxed text-card-foreground/80">
              {copy.outcome}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{copy.learnLabel}:</span>{" "}
              {copy.learn}
            </p>
            {/* Primary action — solid, so the featured course is the clearest
                starting point vs. the outlined per-card actions. */}
            <Link
              href={entry.href}
              className="mt-6 inline-flex items-center justify-center rounded-md bg-avanza-green px-5 py-2.5 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
            >
              {s.featuredCta}
            </Link>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg">
              <Image
                src={featuredImage}
                alt={s.featuredImageAlt}
                fill
                sizes="(min-width: 768px) 32rem, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
