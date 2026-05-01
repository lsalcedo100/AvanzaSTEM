"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { LightboxImage } from "@/components/ui/lightbox-image"
import { FadeIn } from "@/components/ui/animate"
import { Gallery } from "@/components/ui/gallery"

export default function WorkshopsPage() {
  const { t } = useLanguage()
  const workshops = [
    {
      week: t.workshopsPage.week1,
      title: t.workshopsPage.buildingTitle,
      description: t.workshopsPage.buildingDesc,
      image: "/images/workshops/Building Workshop Description.jpeg",
      imageAlt: t.workshopsPage.buildingImageAlt,
      accent: "bg-avanza-purple",
    },
    {
      week: t.workshopsPage.week2,
      title: t.workshopsPage.codingWorkshopTitle,
      description: t.workshopsPage.codingWorkshopDesc,
      image: "/images/workshops/Coding Workshop Description.png",
      imageAlt: t.workshopsPage.codingImageAlt,
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
      imageAlt: t.workshopsPage.aiImageAlt,
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
        <FadeIn className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-primary-foreground/80">
            {t.workshopsPage.seriesEyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-primary-foreground md:text-6xl">
            {t.workshopsPage.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
            {t.workshopsPage.description}
          </p>
        </FadeIn>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {t.workshopsPage.journeyTitle}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {t.workshopsPage.journeyDesc}
            </p>
          </FadeIn>

          <div className="mt-16 space-y-14">
            {workshops.map((workshop, i) => (
              <FadeIn key={workshop.title} delay={i * 60} rootMargin="0px 0px -80px 0px">
                <WorkshopSection {...workshop} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-avanza-green">
              {t.workshopsPage.completedProgramsEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-foreground md:text-5xl">
              {t.workshopsPage.pastProgramsHeadingPre}{" "}
              <span className="text-avanza-green">
                {t.workshopsPage.pastProgramsHeadingAccent}
              </span>
            </h2>
          </FadeIn>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <FadeIn delay={0}>
              <PastProgramCard
                name={t.workshopsPage.cliftonLibrary}
                badge={t.workshopsPage.completedBadge}
                image="/images/workshops/past-science.jpg"
                imageAlt={t.workshopsPage.cliftonImageAlt}
                description={t.workshopsPage.cliftonDesc}
              />
            </FadeIn>
            <FadeIn delay={100}>
              <PastProgramCard
                name={t.workshopsPage.allwoodLibrary}
                badge={t.workshopsPage.completedBadge}
                image="/images/workshops/past-coding.jpg"
                imageAlt={t.workshopsPage.allwoodImageAlt}
                description={t.workshopsPage.allwoodDesc}
              />
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <FadeIn>
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
            </FadeIn>

            <FadeIn delay={120}>
              <div className="rounded-xl border border-avanza-green/15 bg-background/70 p-7 shadow-[0_18px_45px_rgba(26,26,46,0.07)] sm:p-8">
                <p className="text-sm font-bold uppercase tracking-wider text-avanza-teal">
                  {t.workshopsPage.engagementEyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-extrabold leading-tight text-card-foreground">
                  {t.workshopsPage.engagementTitle}
                </h3>
                <ul className="mt-7 space-y-4">
                  {approachPoints.map((point, i) => (
                    <FadeIn key={point.title} as="li" delay={i * 80} rootMargin="0px 0px -20px 0px">
                      <ApproachPoint title={point.title} description={point.description} />
                    </FadeIn>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Gallery limit={12} />
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
    <div className="group relative rounded-lg border border-border/70 bg-card/85 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-avanza-green/25 hover:bg-card hover:shadow-[0_12px_28px_rgba(26,26,46,0.06)]">
      <div className="absolute inset-y-5 left-0 w-1 rounded-r-full bg-avanza-green/60" />
      <div className="pl-4">
        <h4 className="font-bold leading-snug text-card-foreground">
          {title}
        </h4>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
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
    <article className="overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div
        className={`grid gap-0 lg:grid-cols-2 lg:items-stretch ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[460px] overflow-hidden">
          <LightboxImage
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 hover:scale-[1.02]"
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

function PastProgramCard({
  name,
  badge,
  image,
  imageAlt,
  gradeRange,
  duration,
  location,
  description,
}: {
  name: string
  badge: string
  image: string
  imageAlt: string
  gradeRange?: string
  duration?: string
  location?: string
  description?: string
}) {
  const meta = [gradeRange, duration, location].filter(Boolean).join(" · ")
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative h-56 w-full overflow-hidden sm:h-64">
        <LightboxImage
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <span className="inline-block rounded-full border border-avanza-green/40 bg-avanza-green/10 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-avanza-green">
          {badge}
        </span>
        <h3 className="mt-3 text-xl font-extrabold leading-snug text-card-foreground">
          {name}
        </h3>
        {meta && (
          <p className="mt-1 text-sm font-bold uppercase tracking-wide text-avanza-green">
            {meta}
          </p>
        )}
        {description && (
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </article>
  )
}
