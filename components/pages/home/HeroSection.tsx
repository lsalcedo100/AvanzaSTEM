"use client"

import Link from "next/link"
import type { ComponentType } from "react"
import { ArrowRight, ArrowUpRight, HandHeart, Languages, MapPin, ShieldCheck, Sparkles } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { LightboxImage } from "@/components/ui/lightbox-image"
import { FadeIn } from "@/components/ui/animate"

function HeroBadge({
  icon: Icon,
  label,
  tilt,
  tone,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  tilt: string
  tone: "green" | "orange" | "purple"
}) {
  const toneClasses = {
    green: "bg-avanza-green text-avanza-dark",
    orange: "bg-avanza-orange text-avanza-dark",
    purple: "bg-avanza-purple text-white",
  }[tone]
  return (
    <span
      className={`group/badge inline-flex cursor-default items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider shadow-md transition-transform duration-300 hover:!rotate-0 hover:scale-110 hover:shadow-lg ${toneClasses} ${tilt}`}
    >
      <Icon className="h-3.5 w-3.5 transition-transform duration-500 group-hover/badge:rotate-[360deg]" />
      {label}
    </span>
  )
}

export function HeroSection() {
  const { t } = useLanguage()
  return (
    <section className="relative overflow-hidden bg-[#edffd6]">
      {/* Confetti dots */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(46,204,113,0.18) 0 6px, transparent 7px), radial-gradient(circle at 84% 26%, rgba(139,92,246,0.16) 0 5px, transparent 6px), radial-gradient(circle at 22% 78%, rgba(249,115,22,0.16) 0 4px, transparent 5px), radial-gradient(circle at 76% 84%, rgba(26,188,156,0.18) 0 5px, transparent 6px)",
        }}
      />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-20 md:flex-row md:py-28">
        <FadeIn className="flex-1" delay={0}>
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/30 bg-white/70 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-avanza-dark backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-avanza-orange" />
            {t.home.heroEyebrow}
          </span>
          <h1 className="mt-6 text-balance text-[2.7rem] font-extrabold italic leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
            {t.home.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80">
            {t.home.heroDescription}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 rounded-full bg-avanza-dark px-7 py-3.5 text-base font-bold text-primary-foreground shadow-[0_12px_32px_-10px_rgba(26,26,46,0.5)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_18px_40px_-10px_rgba(26,26,46,0.6)]"
            >
              {t.home.startLearning}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/find-a-workshop"
              className="inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-3.5 text-base font-bold text-avanza-dark ring-1 ring-avanza-dark/15 transition-all duration-200 hover:bg-white hover:ring-avanza-dark/30"
            >
              <MapPin className="h-4 w-4" />
              {t.home.finderTrigger}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-4 flex max-w-xl items-center gap-2 text-sm font-semibold leading-relaxed text-avanza-dark/70">
            <ShieldCheck className="h-4 w-4 shrink-0 text-avanza-green" />
            {t.home.heroTrustNote}
          </p>
          {/* Sticker badges */}
          <div className="mt-8 flex flex-wrap gap-2">
            <HeroBadge icon={HandHeart} label={t.home.heroBadgeFree} tilt="-rotate-2" tone="green" />
            <HeroBadge icon={Languages} label={t.home.heroBadgeAllAges} tilt="rotate-1" tone="orange" />
            <HeroBadge icon={MapPin} label={t.home.heroBadgeLocal} tilt="-rotate-1" tone="purple" />
          </div>
        </FadeIn>
        <FadeIn className="flex-1" delay={120}>
          <div className="relative">
            {/* Hand-drawn frame */}
            <div
              aria-hidden="true"
              className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(-1.4deg)]"
            />
            <div className="relative overflow-hidden rounded-[24px] shadow-2xl ring-1 ring-avanza-dark/10 transition-shadow duration-300 hover:shadow-[0_36px_72px_rgba(26,26,46,0.25)]">
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
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
