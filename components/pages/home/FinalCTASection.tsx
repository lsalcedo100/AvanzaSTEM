"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"

export function FinalCTASection() {
  const { t } = useLanguage()
  return (
    <section className="bg-avanza-dark py-20">
      <FadeIn className="mx-auto max-w-4xl px-6 text-center" rootMargin="0px 0px -30px 0px">
        <h2 className="text-3xl font-extrabold text-primary-foreground md:text-4xl">
          {t.home.readyTitle}
        </h2>
        <p className="mt-4 text-lg text-primary-foreground/70">
          {t.home.readyDesc}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/curriculums"
            className="inline-flex items-center gap-2 rounded-full bg-avanza-green px-8 py-4 text-lg font-bold text-avanza-dark shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            {t.home.browseCurriculums} <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/30 px-8 py-4 text-lg font-bold text-primary-foreground transition-all duration-300 hover:border-primary-foreground/60 hover:bg-primary-foreground/8"
          >
            {t.home.viewProjects}
          </Link>
        </div>
      </FadeIn>
    </section>
  )
}
