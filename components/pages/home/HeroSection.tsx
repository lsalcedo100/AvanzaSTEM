"use client"

import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { LightboxImage } from "@/components/ui/lightbox-image"
import { FadeIn } from "@/components/ui/animate"

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
              className="group inline-flex items-center gap-3 rounded-full bg-avanza-dark px-7 py-3.5 text-base font-bold text-primary-foreground shadow-[0_12px_32px_-10px_rgba(26,26,46,0.5)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_18px_40px_-10px_rgba(26,26,46,0.6)]"
            >
              <MapPin className="h-4 w-4" />
              {t.home.finderTrigger}
            </Link>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-3.5 text-base font-bold text-avanza-dark ring-1 ring-avanza-dark/15 transition-all duration-200 hover:bg-white hover:ring-avanza-dark/30"
            >
              {t.home.startLearning}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
          <p className="mt-6 text-sm font-semibold leading-relaxed text-avanza-dark/70">
            {t.home.heroTrustLine}
          </p>
        </FadeIn>
        <FadeIn className="flex-1" delay={120}>
          <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-avanza-dark/10">
            <LightboxImage
              src="/images/home/hero.avif"
              alt={t.home.heroImageAlt}
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) calc(100vw - 48px), (max-width: 1280px) 48vw, 600px"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
