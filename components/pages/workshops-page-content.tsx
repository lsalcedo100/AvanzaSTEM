"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { useLanguage } from "@/components/providers/language-provider"
import { LightboxImage } from "@/components/ui/lightbox-image"
import { FadeIn } from "@/components/ui/animate"
import { SocialProof } from "@/components/ui/social-proof"
import { ScheduledVenues } from "@/components/ui/scheduled-venues"
import {
  Gallery,
  codingFeatureImage,
  galleryPhoto,
} from "@/components/ui/gallery"

const buildingWorkshopImage =
  "https://res.cloudinary.com/dw4uprmkk/image/upload/f_auto,q_auto:good,w_1600/c_crop,x_0,y_290,w_1600,h_2110/gallery-00174.jpg"
const codingThumbnailImage = codingFeatureImage.full
// Pinned to fixed Cloudinary numbers, not gallery positions, so future uploads
// never swap these out from under the cards.
const veronaWorkshopImage = galleryPhoto(319).full
const littleFallsWorkshopImage = galleryPhoto(357).full
// September 2026 series venues, chosen from the gallery by their position in
// the newest-first lightbox (17, 3 and 13 of 393) and pinned here by number.
const westOrangeWorkshopImage = galleryPhoto(377).full
const cedarGroveWorkshopImage = galleryPhoto(391).full
const berkeleyHeightsWorkshopImage = galleryPhoto(381).full
// A room shot rather than a session photo: the Shanghai venues do not allow
// photography while a program is running. Wenbo Shuijing has no photo at all,
// so its card renders without an image.
const lanyuWorkshopImage = "/images/workshops/Lanyu Books.jpeg"

export function WorkshopsPageContent() {
  const { t } = useLanguage()
  const workshops = [
    {
      week: t.workshopsPage.week1,
      title: t.workshopsPage.buildingTitle,
      description: t.workshopsPage.buildingDesc,
      image: buildingWorkshopImage,
      imageAlt: t.workshopsPage.buildingImageAlt,
      imageLayout: "portraitFeature" as const,
      accent: "bg-avanza-purple",
    },
    {
      week: t.workshopsPage.week2,
      title: t.workshopsPage.codingWorkshopTitle,
      description: t.workshopsPage.codingWorkshopDesc,
      image: codingThumbnailImage,
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
  const translationCredit = (
    <>
      {t.workshopsPage.translationCreditPre}
      <Link
        href="/about#team"
        className="font-bold text-avanza-green underline underline-offset-4 transition-colors hover:text-avanza-teal"
      >
        {t.workshopsPage.translationCreditName}
      </Link>
      {t.workshopsPage.translationCreditPost}
    </>
  )
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

  // Two fixed columns rather than a grid or CSS columns. A grid row is as
  // tall as its tallest cell, which left large gaps under shorter cards, and
  // CSS columns let the browser choose the split, which stranded the short
  // Llano Grande card at the bottom of the right column. Each column stacks
  // its cards directly under the previous one, and the split keeps the two
  // columns ending close together. New Jersey libraries first, then partner
  // venues abroad.
  const pastProgramColumns: PastProgramCardProps[][] = [
    [
      {
        name: t.workshopsPage.cliftonLibrary,
        image: "/images/workshops/past-science.jpg",
        imageAlt: t.workshopsPage.cliftonImageAlt,
        description: t.workshopsPage.cliftonDesc,
      },
      {
        name: t.workshopsPage.allwoodLibrary,
        image: "/images/workshops/past-coding.jpg",
        imageAlt: t.workshopsPage.allwoodImageAlt,
        description: t.workshopsPage.allwoodDesc,
      },
      {
        name: t.workshopsPage.chathamsLibrary,
        image: galleryPhoto(156).full,
        imageAlt: t.workshopsPage.chathamsImageAlt,
        imageBoxClassName: "h-80 sm:h-[28rem]",
        description: t.workshopsPage.chathamsDesc,
      },
      {
        name: t.workshopsPage.roselandLibrary,
        image: "/images/workshops/roseland-free-public-library-coding.jpeg",
        imageAlt: t.workshopsPage.roselandImageAlt,
        imageBoxClassName: "aspect-[3794/2846]",
        imageClassName: "object-contain",
        description: t.workshopsPage.roselandDesc,
      },
      {
        name: t.workshopsPage.wayneLibrary,
        image: "/images/workshops/wayne-public-library.png",
        imageAlt: t.workshopsPage.wayneImageAlt,
        imageBoxClassName: "aspect-[1448/1086]",
        imageClassName: "object-contain",
        description: t.workshopsPage.wayneDesc,
      },
      {
        name: t.workshopsPage.veronaLibrary,
        image: veronaWorkshopImage,
        imageAlt: t.workshopsPage.veronaImageAlt,
        description: t.workshopsPage.veronaDesc,
      },
      // Partner venue abroad. No photo chosen yet; add `image: galleryPhoto(n).full`
      // and an `imageAlt`.
      {
        name: t.workshopsPage.llanoGrandeLibrary,
        description: t.workshopsPage.llanoGrandeDesc,
      },
    ],
    [
      {
        name: t.workshopsPage.littleFallsLibrary,
        image: littleFallsWorkshopImage,
        imageAlt: t.workshopsPage.littleFallsImageAlt,
        imageBoxClassName: "aspect-[4/3]",
        imageClassName: "object-contain",
        description: t.workshopsPage.littleFallsDesc,
      },
      // September 2026 series venues. The photos are 4:3, so the box matches
      // that ratio to show them uncropped.
      {
        name: t.workshopsPage.westOrangeLibrary,
        image: westOrangeWorkshopImage,
        imageAlt: t.workshopsPage.westOrangeImageAlt,
        imageBoxClassName: "aspect-[4/3]",
        description: t.workshopsPage.westOrangeDesc,
      },
      {
        name: t.workshopsPage.cedarGroveLibrary,
        image: cedarGroveWorkshopImage,
        imageAlt: t.workshopsPage.cedarGroveImageAlt,
        imageBoxClassName: "aspect-[4/3]",
        description: t.workshopsPage.cedarGroveDesc,
      },
      {
        name: t.workshopsPage.berkeleyHeightsLibrary,
        image: berkeleyHeightsWorkshopImage,
        imageAlt: t.workshopsPage.berkeleyHeightsImageAlt,
        imageBoxClassName: "aspect-[4/3]",
        description: t.workshopsPage.berkeleyHeightsDesc,
      },
      // Partner venues abroad. Wenbo Shuijing has no photo and Lanyu Books only
      // a room shot, so each card carries its own note explaining why.
      {
        name: t.workshopsPage.wenboLibrary,
        description: t.workshopsPage.wenboDesc,
        credit: translationCredit,
        note: t.workshopsPage.wenboPhotoNote,
      },
      {
        name: t.workshopsPage.lanyuLibrary,
        image: lanyuWorkshopImage,
        imageAlt: t.workshopsPage.lanyuImageAlt,
        imageBoxClassName: "aspect-[4/3]",
        description: t.workshopsPage.lanyuDesc,
        credit: translationCredit,
        note: t.workshopsPage.lanyuPhotoNote,
      },
    ],
  ]

  return (
    <>
      <section className="bg-gradient-to-br from-avanza-teal to-avanza-green py-20">
        <FadeIn className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-dark/70">
            {t.workshopsPage.seriesEyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-avanza-dark md:text-6xl">
            {t.workshopsPage.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-avanza-dark/80 md:text-xl">
            {t.workshopsPage.description}
          </p>
          <p className="mx-auto mt-5 max-w-3xl rounded-lg border border-avanza-dark/20 bg-white/25 px-4 py-3 text-sm font-semibold leading-relaxed text-avanza-dark/80">
            {t.workshopsPage.finderConnection}{" "}
            <Link href="/find-a-workshop" className="font-extrabold underline underline-offset-4">
              {t.workshopsPage.finderLink}
            </Link>
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

      <section className="bg-background pb-20">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="rounded-lg border border-avanza-green/20 bg-card p-7 shadow-sm sm:p-9">
              <p className="text-sm font-bold uppercase tracking-wider text-avanza-green">
                {t.workshopsPage.upcoming}
              </p>
              <div className="mt-4 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                <h2 className="text-3xl font-extrabold leading-tight text-card-foreground md:text-4xl">
                  {t.workshopsPage.whenCanAttend}
                </h2>
                <div>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {t.workshopsPage.noScheduledWorkshops}
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/find-a-workshop"
                      className="inline-flex items-center justify-center rounded-lg bg-avanza-green px-5 py-3 text-sm font-extrabold text-avanza-dark transition-colors hover:bg-avanza-green/90"
                    >
                      {t.workshopsPage.finderLink}
                    </Link>
                    <Link
                      href="/host"
                      className="inline-flex items-center justify-center rounded-lg border border-avanza-green/40 px-5 py-3 text-sm font-extrabold text-avanza-green transition-colors hover:bg-avanza-green/10"
                    >
                      {t.workshopsPage.hostSeriesLink}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-5xl">
              {t.workshopsPage.pastProgramsHeadingPre}{" "}
              <span className="text-avanza-green">
                {t.workshopsPage.pastProgramsHeadingAccent}
              </span>
            </h2>
          </FadeIn>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 sm:items-start">
            {pastProgramColumns.map((column, c) => (
              <div key={c} className="flex flex-col gap-8">
                {column.map((program, i) => (
                  <FadeIn key={program.name} delay={i * 100}>
                    <PastProgramCard {...program} />
                  </FadeIn>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venues with sessions scheduled: the same schedule the Host page shows,
          from the data the finder reads. The copy is shared with that page. */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-wider text-avanza-green">
                  {t.hostPage.calendarEyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
                  {t.hostPage.calendarTitle}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {t.hostPage.calendarLead}
                </p>
              </div>
              <Link
                href="/find-a-workshop"
                className="shrink-0 border-b-2 border-avanza-green pb-0.5 text-sm font-bold text-avanza-dark transition-colors hover:border-avanza-green-dark"
              >
                {t.hostPage.calendarLink}
              </Link>
            </div>
            <div className="mt-8">
              <ScheduledVenues />
            </div>
          </FadeIn>
        </div>
      </section>

      <SocialProof />

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
  imageLayout = "standard",
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
  imageLayout?: "standard" | "portraitFeature"
  accent: string
  reverse?: boolean
}) {
  const isPortraitFeature = imageLayout === "portraitFeature"

  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div
        className={`grid gap-0 lg:items-stretch ${
          isPortraitFeature
            ? "lg:grid-cols-[minmax(420px,0.9fr)_minmax(0,0.75fr)]"
            : "lg:grid-cols-2"
        } ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div
          className={
            isPortraitFeature
              ? "relative aspect-[1600/2110] overflow-hidden"
              : "relative min-h-[280px] overflow-hidden sm:min-h-[360px] lg:min-h-[460px]"
          }
        >
          <LightboxImage
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={
              isPortraitFeature
                ? "object-cover"
                : "object-cover transition-transform duration-700 hover:scale-[1.02]"
            }
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

type PastProgramCardProps = {
  name: string
  // Optional: venues that do not allow photography get a text-only card.
  image?: string
  imageAlt?: string
  gradeRange?: string
  duration?: string
  location?: string
  description?: string
  credit?: ReactNode
  note?: string
  imageBoxClassName?: string
  imageClassName?: string
}

function PastProgramCard({
  name,
  image,
  imageAlt,
  gradeRange,
  duration,
  location,
  description,
  credit,
  note,
  imageBoxClassName = "h-56 sm:h-64",
  imageClassName = "object-cover",
}: PastProgramCardProps) {
  const meta = [gradeRange, duration, location].filter(Boolean).join(" · ")
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      {image && (
        <div className={`relative w-full overflow-hidden ${imageBoxClassName}`}>
          <LightboxImage
            src={image}
            alt={imageAlt ?? ""}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className={`${imageClassName} transition-transform duration-500 group-hover:scale-105`}
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-extrabold leading-snug text-card-foreground">
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
        {credit && (
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {credit}
          </p>
        )}
        {note && (
          <p className="mt-4 border-t border-border/70 pt-4 text-sm leading-relaxed text-muted-foreground/90">
            {note}
          </p>
        )}
      </div>
    </article>
  )
}
