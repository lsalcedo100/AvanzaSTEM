"use client"

import Link from "next/link"
import { ArrowRight, Camera, Library, Users, type LucideIcon } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"

function ImpactCard({
  icon: Icon,
  value,
  label,
  text,
  href,
  cta,
}: {
  icon: LucideIcon
  value: string
  label: string
  text: string
  href?: string
  cta?: string
}) {
  const content = (
    <>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-avanza-green/15 text-avanza-green">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div>
        <p className="text-4xl font-extrabold text-foreground">{value}</p>
        <p className="mt-2 text-base font-bold text-foreground">{label}</p>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
      {href && cta ? (
        <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-avanza-green">
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      ) : null}
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className="group flex h-full flex-col gap-5 rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        {content}
      </Link>
    )
  }

  return (
    <div className="flex h-full flex-col gap-5 rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {content}
    </div>
  )
}

export function ImpactSection() {
  const { t } = useLanguage()
  const impactCards = [
    {
      icon: Users,
      value: t.home.impactStudentsValue,
      label: t.home.impactStudentsLabel,
      text: t.home.impactStudentsText,
    },
    {
      icon: Library,
      value: t.home.impactLibrariesValue,
      label: t.home.impactLibrariesLabel,
      text: t.home.impactLibrariesText,
    },
    {
      icon: Camera,
      value: t.home.impactPhotosValue,
      label: t.home.impactPhotosLabel,
      text: t.home.impactPhotosText,
      href: "/gallery",
      cta: t.home.impactPhotosCta,
    },
  ]

  return (
    <section className="bg-background py-20" aria-labelledby="impact-heading">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-avanza-green">
            {t.home.statsAsOf}
          </p>
          <h2 id="impact-heading" className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl">
            {t.home.impactTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t.home.impactIntro}
          </p>
        </FadeIn>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {impactCards.map((card, i) => (
            <FadeIn key={card.label} delay={i * 100}>
              <ImpactCard {...card} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
