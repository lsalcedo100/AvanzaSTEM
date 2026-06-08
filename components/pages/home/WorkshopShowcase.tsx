"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"

function RealWorkshopCard({
  weekNumber,
  weekLabel,
  title,
  description,
  image,
  imageAlt,
  tone,
  tilt,
  cta,
}: {
  weekNumber: number
  weekLabel: string
  title: string
  description: string
  image: string
  imageAlt: string
  tone: string
  tilt: string
  cta: string
}) {
  return (
    <Link
      href="/workshops"
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_-30px_rgba(26,26,46,0.4)] ring-1 ring-avanza-dark/8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_64px_-28px_rgba(26,26,46,0.5)] ${tilt}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-avanza-dark/70 via-avanza-dark/0 to-transparent" />
        {/* Sticker week badge */}
        <span
          className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full ${tone} px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider ${tone === "bg-avanza-purple" ? "text-white" : "text-avanza-dark"} shadow-lg`}
        >
          {weekLabel} {weekNumber}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-xl font-extrabold leading-snug text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-extrabold text-avanza-dark transition-all duration-200 group-hover:gap-2.5">
          {cta}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}

export function WorkshopShowcase() {
  const { t } = useLanguage()
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-avanza-green">
            {t.home.realWorkshopsEyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
            {t.home.realWorkshopsTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t.home.realWorkshopsDesc}
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {[
            {
              week: 1,
              title: t.home.realWorkshopBuilding,
              desc: t.home.realWorkshopBuildingShort,
              image: "/images/workshops/Building Workshop Description.jpeg",
              tone: "bg-avanza-orange",
              tilt: "-rotate-[0.6deg] hover:rotate-0",
            },
            {
              week: 2,
              title: t.home.realWorkshopCoding,
              desc: t.home.realWorkshopCodingShort,
              image: "/images/workshops/Coding Workshop Description.png",
              tone: "bg-avanza-green",
              tilt: "rotate-[0.7deg] hover:rotate-0",
            },
            {
              week: 3,
              title: t.home.realWorkshopAi,
              desc: t.home.realWorkshopAiShort,
              image: "/images/workshops/AI Workshop Description.JPG",
              tone: "bg-avanza-purple",
              tilt: "-rotate-[0.4deg] hover:rotate-0",
            },
          ].map((card, i) => (
            <FadeIn key={card.title} delay={i * 90} className="h-full">
              <RealWorkshopCard
                weekNumber={card.week}
                weekLabel={t.home.realWorkshopWeekLabel}
                title={card.title}
                description={card.desc}
                image={card.image}
                imageAlt={`${t.home.realWorkshopBannerAlt} – ${card.title}`}
                tone={card.tone}
                tilt={card.tilt}
                cta={t.home.realWorkshopExplore}
              />
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12 flex justify-center">
          <Link
            href="/workshops"
            className="inline-flex items-center gap-2 rounded-full border-2 border-avanza-dark/15 bg-white px-6 py-3 text-sm font-bold text-avanza-dark transition-all duration-200 hover:border-avanza-dark/35 hover:bg-avanza-dark/5"
          >
            {t.home.findWorkshop}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
