"use client"

import { NewsletterSignup } from "@/components/blog/newsletter-signup"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { curriculumCatalog, resolveCurriculumCopy } from "@/features/curriculums/catalog"
import { Container, SectionHeader } from "@/components/pages/curriculums/section"
import { CurriculumCard } from "@/components/pages/curriculums/curriculum-card"
import { FeaturedCurriculum } from "@/components/pages/curriculums/featured-curriculum"
import { CurriculumComparison } from "@/components/pages/curriculums/curriculum-comparison"
import { LessonPreview } from "@/components/pages/curriculums/lesson-preview"
import { EducatorInfo } from "@/components/pages/curriculums/educator-info"

const CURRICULUM_SIGNUP_ID = "curriculum-launch-signup"

/**
 * Curriculums page. Restructured (Phase: page structure) from the old
 * centered-hero + identical-grid + "How These Paths Grow" layout into an
 * intentional sequence:
 *
 *   compact intro → featured path → catalog → comparison → lesson preview →
 *   parent/educator info → newsletter (moved to the bottom).
 *
 * Section content is driven by the typed catalog (`features/curriculums/catalog`)
 * and reusable section components in `components/pages/curriculums/`. Copy lives
 * in `t.curriculumsPage` across all three locales.
 */
export function CurriculumsPageContent() {
  const { t } = useLanguage()
  const c = t.curriculumsPage
  const s = c.sections

  return (
    <>
      {/* Compact, left-aligned intro — a resource entrance, not a landing hero.
          Reduced height and no top newsletter box, so the catalog is reachable
          with minimal scroll (the CTA also jumps straight to it). */}
      <section className="bg-background py-10 sm:py-12">
        <Container>
          <FadeIn className="max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {s.heroHeading}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {s.heroDesc}
            </p>
            {/* Plain-text info line — deliberately not pills or badges. */}
            <p className="mt-4 text-sm text-muted-foreground">{s.heroInfoLine}</p>
            <a
              href="#curriculum-catalog"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-avanza-green px-5 py-2.5 text-sm font-bold text-avanza-dark transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
            >
              {s.heroCta}
            </a>
          </FadeIn>
        </Container>
      </section>

      {/* Full catalog — placed directly after the hero so it's visible sooner */}
      <section id="curriculum-catalog" className="scroll-mt-20 bg-background pb-16 sm:pb-20">
        <Container>
          <FadeIn>
            <SectionHeader
              title={s.catalogHeading}
              description={s.catalogDesc}
            />
          </FadeIn>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {curriculumCatalog.map((entry, i) => (
              <FadeIn key={entry.id} delay={i * 60}>
                <CurriculumCard
                  entry={entry}
                  copy={resolveCurriculumCopy(entry, c)}
                  ctaLabel={s.viewCurriculum}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured path — moved below the catalog as an editorial deep-dive */}
      <FadeIn>
        <FeaturedCurriculum c={c} />
      </FadeIn>

      {/* Comparison */}
      <section className="bg-background py-16 sm:py-20">
        <Container>
          <FadeIn>
            <SectionHeader
              title={s.compareHeading}
              description={s.compareDesc}
            />
            <CurriculumComparison c={c} />
          </FadeIn>
        </Container>
      </section>

      {/* Lesson preview */}
      <section className="bg-secondary py-16 sm:py-20">
        <Container>
          <FadeIn>
            <SectionHeader
              eyebrow={s.previewEyebrow}
              title={s.previewHeading}
              description={s.previewDesc}
            />
            <LessonPreview c={c} />
          </FadeIn>
        </Container>
      </section>

      {/* Parent & educator info */}
      <section className="bg-background py-16 sm:py-20">
        <Container>
          <FadeIn>
            <SectionHeader
              eyebrow={s.educatorEyebrow}
              title={s.educatorHeading}
              description={s.educatorDesc}
            />
            <EducatorInfo c={c} />
          </FadeIn>
        </Container>
      </section>

      {/* Newsletter — moved to the bottom, no longer weighted at the top */}
      <FadeIn rootMargin="0px 0px -30px 0px">
        <NewsletterSignup
          sectionId={CURRICULUM_SIGNUP_ID}
          heading={c.newsletterTitle}
          description={c.newsletterDesc}
        />
      </FadeIn>
    </>
  )
}
