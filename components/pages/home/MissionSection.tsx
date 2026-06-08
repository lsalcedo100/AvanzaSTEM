"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"

export function MissionSection() {
  const { t } = useLanguage()
  return (
    <section className="bg-gradient-to-br from-avanza-purple to-avanza-teal py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <div>
              <div className="text-8xl font-black leading-none text-primary-foreground/20">&ldquo;</div>
              <blockquote className="text-2xl font-bold italic leading-relaxed text-primary-foreground">
                {t.home.missionQuote}
              </blockquote>
              <p className="mt-4 text-sm text-primary-foreground/70">
                - {t.home.missionQuoteAttribution}
              </p>
              <hr className="mt-6 border-primary-foreground/20" />
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <h2 className="text-3xl font-extrabold text-primary-foreground md:text-4xl">
              {t.home.ourMission}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/90">
              {t.home.missionText}
            </p>
            <Link
              href="/workshops"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-primary-foreground px-8 py-4 text-lg font-bold text-avanza-purple shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {t.home.findWorkshop} <ArrowRight className="h-5 w-5" />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
