"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { HeroCarousel } from "@/components/pages/home/HeroCarousel"

export function HeroSection() {
  const { t } = useLanguage()
  return (
    <section className="bg-[#edffd6]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-20 md:flex-row md:py-28">
        <FadeIn className="flex-1" delay={0}>
          <h1 className="text-balance text-[2.7rem] font-extrabold leading-[1.1] text-foreground sm:text-5xl md:text-6xl">
            {t.home.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80">
            {t.home.heroDescription}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/find-a-workshop"
              className="group inline-flex items-center gap-3 rounded-lg bg-avanza-dark px-7 py-3.5 text-base font-bold text-primary-foreground shadow-[0_12px_32px_-10px_rgba(26,26,46,0.5)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_18px_40px_-10px_rgba(26,26,46,0.6)]"
            >
              {t.home.finderTrigger}
            </Link>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-white/80 px-5 py-3.5 text-base font-bold text-avanza-dark ring-1 ring-avanza-dark/15 transition-all duration-200 hover:bg-white hover:ring-avanza-dark/30"
            >
              {t.home.startLearning}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
          <p className="mt-6 text-sm font-semibold leading-relaxed text-avanza-dark/70">
            {t.home.heroTrustLine}
          </p>
        </FadeIn>
        <FadeIn className="w-full md:flex-[1.15] lg:flex-[1.3]" delay={120}>
          <HeroCarousel />
        </FadeIn>
      </div>
    </section>
  )
}
