"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import type { Language } from "@/i18n/translations"
import { LIBRARIES, INTERNATIONAL_PARTNERS } from "@/features/workshops/locations"
import { TESTIMONIALS } from "@/features/workshops/testimonials"
import { cn } from "@/lib/utils"

/** BCP 47 tags for date formatting. "pt" is Brazilian Portuguese sitewide. */
const DATE_LOCALES: Record<Language, string> = {
  en: "en-US",
  es: "es",
  zh: "zh-CN",
  pt: "pt-BR",
}

/**
 * Public statements about the series from partner venues and community groups,
 * plus reach figures.
 *
 * The figures are derived from LIBRARIES / INTERNATIONAL_PARTNERS rather than
 * written down, so adding a venue updates them and there is no second copy of
 * the counts to drift out of date. `placeholder` entries are planning areas
 * rather than venues, so they are excluded from every figure here.
 */
export function SocialProof({
  showStats = true,
  className,
}: {
  showStats?: boolean
  className?: string
}) {
  const { t, language } = useLanguage()
  const copy = t.socialProof

  const realVenues = LIBRARIES.filter((l) => l.status !== "placeholder")
  const stats = [
    {
      value: LIBRARIES.filter((l) => l.status === "active").length,
      label: copy.statHosted,
    },
    {
      value: LIBRARIES.filter((l) => l.status === "upcoming").length,
      label: copy.statScheduled,
    },
    {
      value: new Set(realVenues.map((l) => l.city)).size,
      label: copy.statTowns,
    },
    {
      value: INTERNATIONAL_PARTNERS.filter((p) => p.status === "hosted").length,
      label: copy.statInternational,
    },
  ]

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(DATE_LOCALES[language], {
      year: "numeric",
      month: "long",
      timeZone: "UTC",
    }).format(new Date(`${iso}T00:00:00Z`))

  return (
    <section className={cn("bg-background py-20", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-green">
            {copy.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {copy.description}
          </p>
        </FadeIn>

        {/* CSS columns rather than a grid: the quotes differ a lot in length,
            and a grid would stretch every card in a row to match the tallest. */}
        <div className="mt-12 gap-8 md:columns-2">
          {TESTIMONIALS.map((quote, i) => (
            <FadeIn
              key={quote.id}
              delay={i * 100}
              rootMargin="0px 0px -60px 0px"
              className="mb-8 break-inside-avoid"
            >
              <figure className="relative h-full overflow-hidden rounded-2xl border border-avanza-green/20 bg-card p-7 shadow-sm sm:p-8">
                <div
                  className="absolute inset-y-0 left-0 w-1.5 bg-avanza-green"
                  aria-hidden="true"
                />
                <blockquote className="leading-relaxed text-card-foreground sm:text-lg">
                  {copy.quotes[quote.id]}
                </blockquote>
                <figcaption className="mt-6 border-t border-border/70 pt-5">
                  <cite className="block not-italic text-base font-extrabold text-card-foreground">
                    {quote.source}
                  </cite>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    <a
                      href={quote.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-avanza-teal underline underline-offset-4 transition-colors hover:text-avanza-green"
                    >
                      {quote.handle ??
                        (quote.platform === "facebook"
                          ? copy.postedOnFacebook
                          : copy.postedOnInstagram)}
                    </a>
                    {quote.handle && (
                      <>
                        {" "}
                        {quote.platform === "facebook"
                          ? copy.postedOnFacebook
                          : copy.postedOnInstagram}
                      </>
                    )}
                    <span className="mx-2" aria-hidden="true">
                      ·
                    </span>
                    <time dateTime={quote.date}>{formatDate(quote.date)}</time>
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>

        {showStats && (
          <FadeIn delay={120}>
            <div className="mt-6 rounded-2xl border border-border bg-secondary/60 p-8 sm:p-10">
              <p className="text-center text-sm font-bold uppercase tracking-wider text-avanza-teal">
                {copy.statsEyebrow}
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-8 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block text-4xl font-extrabold leading-none text-avanza-green md:text-5xl">
                        {stat.value}
                      </span>
                      <span className="mt-3 block text-sm leading-snug text-muted-foreground">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 border-t border-border/70 pt-6 text-center text-sm leading-relaxed text-muted-foreground">
                {copy.statsNote}
              </p>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  )
}
