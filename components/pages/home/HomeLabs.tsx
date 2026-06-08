"use client"

import Link from "next/link"
import { ArrowRight, FlaskConical, Laptop, Lightbulb, Wrench } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"

const tones = [
  "bg-avanza-green/12 text-avanza-green ring-avanza-green/25",
  "bg-avanza-purple/12 text-avanza-purple ring-avanza-purple/25",
  "bg-avanza-orange/12 text-avanza-orange ring-avanza-orange/25",
  "bg-avanza-teal/12 text-avanza-teal ring-avanza-teal/25",
]

export function HomeLabs() {
  const { t } = useLanguage()
  const labs = [
    {
      icon: Wrench,
      label: t.home.compassBuildLabel,
      title: t.home.compassBuildProject,
      description: t.home.compassBuildProjectDesc,
      href: t.home.compassBuildHref,
    },
    {
      icon: Laptop,
      label: t.home.compassCodeLabel,
      title: t.home.compassCodeProject,
      description: t.home.compassCodeProjectDesc,
      href: t.home.compassCodeHref,
    },
    {
      icon: FlaskConical,
      label: t.home.compassDiscoverLabel,
      title: t.home.compassDiscoverProject,
      description: t.home.compassDiscoverProjectDesc,
      href: t.home.compassDiscoverHref,
    },
    {
      icon: Lightbulb,
      label: t.home.compassInventLabel,
      title: t.home.compassInventProject,
      description: t.home.compassInventProjectDesc,
      href: t.home.compassInventHref,
    },
  ]

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-avanza-green">
            {t.home.welcomeBadge}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
            {t.home.compassStartHere}
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {labs.map((lab, index) => (
            <FadeIn key={lab.href} delay={index * 80} className="h-full">
              <Link
                href={lab.href}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${tones[index]}`}>
                  <lab.icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  {lab.label}
                </p>
                <h3 className="mt-2 text-lg font-extrabold leading-snug text-card-foreground">
                  {lab.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {lab.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-avanza-green transition-all duration-200 group-hover:gap-2">
                  {t.home.learnMore}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
