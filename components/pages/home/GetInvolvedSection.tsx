"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { NewsletterSignup } from "@/components/blog/newsletter-signup"

export function GetInvolvedSection() {
  const { t } = useLanguage()

  return (
    <>
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {t.home.getInvolvedTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t.home.getInvolvedSubhead}
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <FadeIn>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 shadow-sm">
                <h3 className="text-xl font-extrabold text-card-foreground">
                  {t.home.getInvolvedStudentsTitle}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground">
                  {t.home.getInvolvedStudentsDesc}
                </p>
                <Link
                  href="/find-a-workshop"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-avanza-green px-6 py-3 text-sm font-bold text-avanza-dark transition-transform duration-200 hover:scale-[1.02]"
                >
                  {t.home.findWorkshop}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={80}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 shadow-sm">
                <h3 className="text-xl font-extrabold text-card-foreground">
                  {t.home.getInvolvedSchoolsTitle}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground">
                  {t.home.getInvolvedSchoolsDesc}
                </p>
                <Link
                  href="/host"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-avanza-dark px-6 py-3 text-sm font-bold text-primary-foreground transition-transform duration-200 hover:scale-[1.02]"
                >
                  {t.home.trustHostCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      <NewsletterSignup
        heading={t.home.newsletterStayInLoop}
        description={t.home.newsletterGetNotified}
      />
    </>
  )
}
