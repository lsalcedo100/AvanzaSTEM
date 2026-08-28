"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { Container, SectionHeader } from "@/components/pages/curriculums/section"
import { FadeIn } from "@/components/ui/animate"
import {
  RESOURCE_ITEMS,
  TEACHER_LINKS,
  type ResourceCounts,
} from "@/features/resources/catalog"
import { formatTemplate } from "@/lib/format-template"

/**
 * The /resources hub.
 *
 * Deliberately built from the same `Container` / `SectionHeader` primitives and
 * the same card treatment as the Curriculums page rather than a new visual
 * language: this is an index, and it should read as one more entrance into the
 * site, not as a second landing page competing with the home hero.
 *
 * Counts come in as a prop because the data they are derived from (the full
 * project and curriculum modules) is far too large to ship to the browser just
 * to render six numbers.
 */
export function ResourcesPageContent({ counts }: { counts: ResourceCounts }) {
  const { t } = useLanguage()
  const r = t.resourcesPage

  return (
    <>
      {/* Compact, left-aligned intro, matching the Curriculums entrance. */}
      <section className="border-b border-emerald-200 bg-gradient-to-br from-[#f6fff0] via-emerald-100 to-emerald-200 py-10 sm:py-12">
        <Container>
          <FadeIn className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-avanza-green-dark">
              {r.heroEyebrow}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {r.heroTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {r.heroDesc}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">{r.heroInfoLine}</p>
            <a
              href="#resource-catalog"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-avanza-green px-5 py-2.5 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
            >
              {r.heroCta}
            </a>
          </FadeIn>
        </Container>
      </section>

      <section id="resource-catalog" className="scroll-mt-20 bg-background py-16 sm:py-20">
        <Container>
          <FadeIn>
            <SectionHeader title={r.catalogHeading} description={r.catalogDesc} />
          </FadeIn>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RESOURCE_ITEMS.map((item, index) => {
              const copy = r.items[item.id]
              const meta = item.countKey
                ? formatTemplate(copy.meta, { count: counts[item.countKey] })
                : copy.meta

              return (
                <li key={item.id}>
                  <FadeIn delay={index * 60}>
                    {/* One link per card, so the card is a single focus stop and
                        the arrow is decoration rather than a second tab target. */}
                    <Link
                      href={item.href}
                      className="group flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-colors duration-200 hover:border-avanza-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
                    >
                      <h3 className="text-lg font-bold text-card-foreground">{copy.name}</h3>
                      <p className="mt-1.5 text-xs font-medium text-muted-foreground">{meta}</p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-card-foreground/80">
                        {copy.desc}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-avanza-green-dark">
                        {r.browseLabel}
                        <ArrowRight
                          aria-hidden="true"
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </span>
                    </Link>
                  </FadeIn>
                </li>
              )
            })}
          </ul>
        </Container>
      </section>

      <section className="bg-secondary py-16 sm:py-20">
        <Container>
          <FadeIn>
            <SectionHeader title={r.teachersHeading} description={r.teachersDesc} />
          </FadeIn>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TEACHER_LINKS.map((link, index) => (
              <li key={link.id}>
                <FadeIn delay={index * 40}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between gap-3 rounded-md border border-border bg-card px-4 py-3 text-sm font-semibold text-card-foreground transition-colors hover:border-avanza-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
                  >
                    {r.teachersLinks[link.id]}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-avanza-green-dark transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                </FadeIn>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
