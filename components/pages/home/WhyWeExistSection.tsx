"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { LightboxImage } from "@/components/ui/lightbox-image"
import { FadeIn } from "@/components/ui/animate"

export function WhyWeExistSection() {
  const { t } = useLanguage()
  const values = [
    {
      title: t.home.valuesAccessTitle,
      desc: t.home.valuesAccessDesc,
      accent: "bg-avanza-green",
    },
    {
      title: t.home.valuesCuriosityTitle,
      desc: t.home.valuesCuriosityDesc,
      accent: "bg-avanza-purple",
    },
    {
      title: t.home.valuesCommunityTitle,
      desc: t.home.valuesCommunityDesc,
      accent: "bg-avanza-orange",
    },
  ]

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {t.home.whyExistTitle}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {t.home.whyExistP1}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {t.home.whyExistP2}
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-avanza-green transition-colors duration-200 hover:text-avanza-teal"
            >
              {t.home.whyExistLink}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="relative h-72 overflow-hidden rounded-2xl shadow-xl lg:h-96">
              <LightboxImage
                src="/images/workshops/past-science.jpg"
                alt={t.home.whyExistImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {values.map((value, i) => (
            <FadeIn key={value.title} delay={i * 80}>
              <div className={`h-1 w-12 rounded-full ${value.accent}`} />
              <h3 className="mt-4 text-lg font-extrabold text-foreground">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {value.desc}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
