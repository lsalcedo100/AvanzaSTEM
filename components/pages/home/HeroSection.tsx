"use client"

import Link from "next/link"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { HeroCarousel } from "@/components/pages/home/HeroCarousel"

export function HeroSection() {
  const { t } = useLanguage()
  return (
    <section className="bg-[#edffd6]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-20 md:flex-row md:gap-8 md:py-28">
        <FadeIn className="flex-1" delay={0}>
          {/* Steps down at md, where the row splits into two columns and the
              headline loses roughly half its width, then back up as the column
              grows. At 60px it broke "hands-on" across six lines. */}
          <h1 className="text-balance text-[2.6rem] font-extrabold leading-[1.1] text-foreground sm:text-5xl md:text-[2.6rem] lg:text-[3rem] xl:text-[3.25rem]">
            {t.home.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80">
            {t.home.heroDescription}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/find-a-workshop"
              className="inline-flex h-12 items-center justify-center rounded-md bg-avanza-dark px-6 text-base font-bold text-primary-foreground transition-colors duration-150 hover:bg-avanza-dark/90"
            >
              {t.home.finderTrigger}
            </Link>
            <Link
              href="/projects"
              className="inline-flex h-12 items-center justify-center rounded-md border-2 border-avanza-dark px-6 text-base font-bold text-avanza-dark transition-colors duration-150 hover:bg-avanza-dark/5"
            >
              {t.home.startLearning}
            </Link>
          </div>
          <p className="mt-6 text-sm font-semibold leading-relaxed text-avanza-dark/70">
            {t.home.heroTrustLine}
          </p>
        </FadeIn>
        <FadeIn className="w-full md:flex-[1.25] lg:flex-[1.43]" delay={120}>
          <HeroCarousel />
        </FadeIn>
      </div>
    </section>
  )
}
