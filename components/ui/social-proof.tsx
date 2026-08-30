"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import type { Language } from "@/i18n/translations"
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
 * Public statements about the series from partner venues and community groups.
 *
 * Every quote here is traceable to a post the source published under its own
 * name; see features/workshops/testimonials.ts for the attribution rules.
 */
export function SocialProof({ className }: { className?: string }) {
  const { t, language } = useLanguage()
  const copy = t.socialProof

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(DATE_LOCALES[language], {
      year: "numeric",
      month: "long",
      timeZone: "UTC",
    }).format(new Date(`${iso}T00:00:00Z`))

  return (
    <section className={cn("bg-background py-16", className)}>
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
        <div className="mt-10 gap-6 md:columns-2">
          {TESTIMONIALS.map((quote, i) => (
            <FadeIn
              key={quote.id}
              delay={i * 100}
              rootMargin="0px 0px -60px 0px"
              className="mb-6 break-inside-avoid"
            >
              <figure className="relative h-full overflow-hidden rounded-xl border border-avanza-green/20 bg-card p-6 shadow-sm">
                <div
                  className="absolute inset-y-0 left-0 w-1 bg-avanza-green"
                  aria-hidden="true"
                />
                <blockquote className="text-sm leading-relaxed text-card-foreground sm:text-base">
                  {copy.quotes[quote.id]}
                </blockquote>
                <figcaption className="mt-5 border-t border-border/70 pt-4">
                  <cite className="block not-italic text-sm font-extrabold text-card-foreground">
                    {quote.source}
                  </cite>
                  <span className="mt-1 block text-xs text-muted-foreground">
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
      </div>
    </section>
  )
}
