"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"

function OfferCard({
  categoryWord,
  title,
  description,
  href,
  accentBar,
  accentGlow,
  categoryWordColor,
  learnMore,
}: {
  categoryWord: string
  title: string
  description: string
  href: string
  accentBar: string
  accentGlow: string
  categoryWordColor: string
  learnMore: string
}) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-[320px] flex-col overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    >
      <div className={`absolute inset-x-0 top-0 h-1 ${accentBar}`} />
      <div className={`absolute inset-0 bg-gradient-to-br ${accentGlow} via-transparent to-transparent`} />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute right-8 top-8 text-right text-[2.75rem] font-black uppercase leading-[0.82] tracking-[0.08em] ${categoryWordColor} transition-transform duration-300 group-hover:-translate-y-1`}
      >
        {categoryWord}
      </span>
      <div className="relative mt-24 flex flex-1 flex-col">
        <h3 className="text-xl font-bold text-card-foreground">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-avanza-green transition-all duration-200 group-hover:gap-2 group-hover:text-avanza-teal">
          {learnMore} <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}

export function OfferCards() {
  const { t } = useLanguage()
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="text-center">
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
            {t.home.whatWeOffer}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t.home.whatWeOfferDescription}
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            { categoryWord: t.home.onlineCurriculumsWord, title: t.home.onlineCurriculums, description: t.home.onlineCurriculumsDesc, href: "/curriculums", accentBar: "bg-avanza-green", accentGlow: "from-avanza-green/10", categoryWordColor: "text-avanza-green/35" },
            { categoryWord: t.home.diyProjectsWord, title: t.home.diyProjects, description: t.home.diyProjectsDesc, href: "/projects", accentBar: "bg-avanza-purple", accentGlow: "from-avanza-purple/10", categoryWordColor: "text-avanza-purple/35" },
            { categoryWord: t.home.blogHowTosWord, title: t.home.blogHowTos, description: t.home.blogHowTosDesc, href: "/blog", accentBar: "bg-avanza-orange", accentGlow: "from-avanza-orange/10", categoryWordColor: "text-avanza-orange/35" },
            { categoryWord: t.home.localWorkshopsWord, title: t.home.localWorkshops, description: t.home.localWorkshopsDesc, href: "/workshops", accentBar: "bg-avanza-teal", accentGlow: "from-avanza-teal/10", categoryWordColor: "text-avanza-teal/35" },
          ].map((card, i) => (
            <FadeIn key={card.href} delay={i * 80}>
              <OfferCard {...card} learnMore={t.home.learnMore} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
