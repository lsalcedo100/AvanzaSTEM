"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { curriculumsInGroup, resolveCurriculumCopy } from "@/features/curriculums/catalog"
import { Container, SectionHeader } from "@/components/pages/curriculums/section"
import { CurriculumCard } from "@/components/pages/curriculums/curriculum-card"
import { FeaturedCurriculum } from "@/components/pages/curriculums/featured-curriculum"
import { CurriculumComparison } from "@/components/pages/curriculums/curriculum-comparison"
import { CurriculumFlow } from "@/components/pages/curriculums/curriculum-flow"
import { EducatorInfo } from "@/components/pages/curriculums/educator-info"
import { CurriculumNewsletter } from "@/components/pages/curriculums/curriculum-newsletter"

const CURRICULUM_SIGNUP_ID = "curriculum-launch-signup"

/**
 * Curriculums page. Restructured from the old centered-hero + identical-grid +
 * "How These Paths Grow" layout into an intentional sequence:
 *
 *   compact intro → featured course → grouped catalog (hands-on / technology) →
 *   comparison → what you'll do (+ real lesson preview) → parent/educator FAQ →
 *   compact newsletter.
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
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-avanza-green px-5 py-2.5 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
            >
              {s.heroCta}
            </a>
          </FadeIn>
        </Container>
      </section>

      {/* Featured path — the most complete course, above the full catalog */}
      <FadeIn>
        <FeaturedCurriculum c={c} />
      </FadeIn>

      {/* Full catalog, organized into two content groups with plain headings */}
      <section id="curriculum-catalog" className="scroll-mt-20 bg-background py-16 sm:py-20">
        <Container>
          {[
            { key: "hands-on" as const, heading: s.groupHandsOnHeading, desc: s.groupHandsOnDesc },
            { key: "technology" as const, heading: s.groupTechHeading, desc: s.groupTechDesc },
          ].map((group, gi) => (
            <div key={group.key} className={gi > 0 ? "mt-16" : undefined}>
              <FadeIn>
                <SectionHeader title={group.heading} description={group.desc} />
              </FadeIn>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {curriculumsInGroup(group.key).map((entry, i) => (
                  <FadeIn key={entry.id} delay={i * 60}>
                    <CurriculumCard
                      entry={entry}
                      copy={resolveCurriculumCopy(entry, c)}
                      ctaLabel={s.viewCurriculum}
                    />
                  </FadeIn>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* Comparison */}
      <section className="bg-secondary py-16 sm:py-20">
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

      {/* Section 1 — What you'll do in each curriculum (+ a real lesson preview) */}
      <section className="bg-background py-16 sm:py-20">
        <Container>
          <FadeIn>
            <SectionHeader
              eyebrow={s.flowEyebrow}
              title={s.flowHeading}
              description={s.flowIntro}
            />
            <CurriculumFlow c={c} />
          </FadeIn>
        </Container>
      </section>

      {/* Section 2 — For parents and educators */}
      <section className="bg-secondary py-16 sm:py-20">
        <Container>
          <FadeIn>
            <SectionHeader
              eyebrow={s.faqEyebrow}
              title={s.faqHeading}
            />
            <EducatorInfo c={c} />
          </FadeIn>
        </Container>
      </section>

      {/* Compact newsletter — a smaller secondary action near the footer */}
      <FadeIn rootMargin="0px 0px -30px 0px">
        <CurriculumNewsletter
          sectionId={CURRICULUM_SIGNUP_ID}
          heading={c.newsletterTitle}
          description={c.newsletterDesc}
        />
      </FadeIn>
    </>
  )
}
