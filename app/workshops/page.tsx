"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { LightboxImage } from "@/components/ui/lightbox-image"

export default function WorkshopsPage() {
  const { t } = useLanguage()
  const workshops = [
    {
      week: t.workshopsPage.week1,
      title: t.workshopsPage.buildingTitle,
      description: t.workshopsPage.buildingDesc,
      image: "/images/workshops/Building Workshop Description.jpeg",
      imageAlt: "Students learning engineering concepts during a building workshop",
      accent: "bg-avanza-purple",
    },
    {
      week: t.workshopsPage.week2,
      title: t.workshopsPage.codingWorkshopTitle,
      description: t.workshopsPage.codingWorkshopDesc,
      image: "/images/workshops/Coding Workshop Description.png",
      imageAlt: "Students practicing Python during a coding workshop",
      accent: "bg-avanza-green",
      reverse: true,
    },
    {
      week: t.workshopsPage.week3,
      title: t.workshopsPage.aiWorkshopTitle,
      description: t.workshopsPage.aiWorkshopDesc,
      note: t.workshopsPage.responsibleAiNote,
      noteTitle: t.workshopsPage.responsibleAi,
      image: "/images/workshops/AI Workshop Description.JPG",
      imageAlt: "Students exploring artificial intelligence concepts in a workshop",
      accent: "bg-avanza-teal",
    },
  ]
  const approachPoints = [
    {
      title: t.workshopsPage.handsOnLearning,
      description: t.workshopsPage.handsOnShortDesc,
    },
    {
      title: t.workshopsPage.realWorldRelevance,
      description: t.workshopsPage.realWorldRelevanceDesc,
    },
    {
      title: t.workshopsPage.interactiveTeaching,
      description: t.workshopsPage.interactiveTeachingDesc,
    },
  ]

  return (
    <>
      <section className="bg-gradient-to-br from-avanza-teal to-avanza-green py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-primary-foreground/80">
            {t.workshopsPage.seriesEyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-primary-foreground md:text-6xl">
            {t.workshopsPage.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
            {t.workshopsPage.description}
          </p>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {t.workshopsPage.journeyTitle}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {t.workshopsPage.journeyDesc}
            </p>
          </div>

          <div className="mt-16 space-y-14">
            {workshops.map((workshop) => (
              <WorkshopSection key={workshop.title} {...workshop} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="max-w-xl">
              <p className="text-sm font-bold uppercase tracking-wider text-avanza-green">
                {t.workshopsPage.approachEyebrow}
              </p>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
                {t.workshopsPage.approachTitle}
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
                <p>{t.workshopsPage.approachP1}</p>
                <p>{t.workshopsPage.approachP2}</p>
              </div>
            </div>

            <div className="rounded-xl border border-avanza-green/15 bg-background/70 p-7 shadow-[0_18px_45px_rgba(26,26,46,0.07)] sm:p-8">
              <p className="text-sm font-bold uppercase tracking-wider text-avanza-teal">
                {t.workshopsPage.engagementEyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-extrabold leading-tight text-card-foreground">
                {t.workshopsPage.engagementTitle}
              </h3>
              <ul className="mt-7 space-y-4">
                {approachPoints.map((point) => (
                  <ApproachPoint
                    key={point.title}
                    title={point.title}
                    description={point.description}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function ApproachPoint({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <li className="group relative rounded-lg border border-border/70 bg-card/85 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-avanza-green/25 hover:bg-card hover:shadow-[0_12px_28px_rgba(26,26,46,0.06)]">
      <div className="absolute inset-y-5 left-0 w-1 rounded-r-full bg-avanza-green/60" />
      <div className="pl-4">
        <h4 className="font-bold leading-snug text-card-foreground">
          {title}
        </h4>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </li>
  )
}

function WorkshopSection({
  week,
  title,
  description,
  note,
  noteTitle,
  image,
  imageAlt,
  accent,
  reverse = false,
}: {
  week: string
  title: string
  description: string
  note?: string
  noteTitle?: string
  image: string
  imageAlt: string
  accent: string
  reverse?: boolean
}) {
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div
        className={`grid gap-0 lg:grid-cols-2 lg:items-stretch ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[460px]">
          <LightboxImage
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex items-center">
          <div className="p-8 sm:p-10 lg:p-14">
            <div className={`h-1.5 w-20 rounded-full ${accent}`} aria-hidden="true" />
            <p className="mt-8 text-sm font-bold uppercase tracking-wider text-muted-foreground">
              {week}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-card-foreground md:text-4xl">
              {title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>

            {note && (
              <div className="mt-8 border-l-4 border-avanza-teal bg-avanza-teal/10 p-5">
                <h3 className="text-base font-extrabold text-card-foreground">
                  {noteTitle}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {note}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
