"use client"

import Link from "next/link"
import { Clock, Users, ArrowRight } from "lucide-react"
import { NewsletterSignup } from "@/components/blog/newsletter-signup"
import { useLanguage } from "@/components/providers/language-provider"
import { LightboxImage } from "@/components/ui/lightbox-image"
import { FadeIn } from "@/components/ui/animate"

const CURRICULUM_SIGNUP_ID = "curriculum-launch-signup"

export function CurriculumsPageContent() {
  const { t } = useLanguage()

  const curriculums = [
    {
      title: t.curriculumsPage.pythonTitle,
      description: t.curriculumsPage.pythonDesc,
      image: "/images/curriculums/python.jpg",
      grades: t.curriculumsPage.grades36,
      duration: t.curriculumsPage.duration8Weeks,
      topics: t.curriculumsPage.pythonTopics,
      color: "bg-avanza-green",
      borderColor: "border-avanza-green",
      progress: 65,
      href: "/curriculums/intro-to-python",
    },
    {
      title: t.curriculumsPage.engineeringTitle,
      description: t.curriculumsPage.engineeringDesc,
      image: "/images/curriculums/engineering.jpg",
      grades: t.curriculumsPage.grades25,
      duration: t.curriculumsPage.duration6Weeks,
      topics: t.curriculumsPage.engineeringTopics,
      color: "bg-avanza-purple",
      borderColor: "border-avanza-purple",
      progress: 40,
      href: "/projects/popsicle-stick-bridge",
    },
    {
      title: t.curriculumsPage.scienceTitle,
      description: t.curriculumsPage.scienceDesc,
      image: "/images/curriculums/science.png",
      grades: t.curriculumsPage.grades24,
      duration: t.curriculumsPage.duration6Weeks,
      topics: t.curriculumsPage.scienceTopics,
      color: "bg-avanza-orange",
      borderColor: "border-avanza-orange",
      progress: 30,
      href: "/projects/baking-soda-volcano",
    },
    {
      title: t.curriculumsPage.mathTitle,
      description: t.curriculumsPage.mathDesc,
      image: "/images/curriculums/math.jpg",
      grades: t.curriculumsPage.grades25,
      duration: t.curriculumsPage.duration10Weeks,
      topics: t.curriculumsPage.mathTopics,
      color: "bg-avanza-teal",
      borderColor: "border-avanza-teal",
      progress: 20,
      href: "/projects",
    },
    {
      title: t.curriculumsPage.roboticsTitle,
      description: t.curriculumsPage.roboticsDesc,
      image: "/images/curriculums/robotics.jpg",
      grades: t.curriculumsPage.grades46,
      duration: t.curriculumsPage.duration8Weeks,
      topics: t.curriculumsPage.roboticsTopics,
      color: "bg-avanza-green",
      borderColor: "border-avanza-green",
      progress: 15,
      href: "/projects/lego-robot-builder",
    },
    {
      title: t.curriculumsPage.aiTitle,
      description: t.curriculumsPage.aiDesc,
      image: "/images/curriculums/ai.jpg",
      grades: t.curriculumsPage.grades58,
      duration: t.curriculumsPage.duration6Weeks,
      topics: t.curriculumsPage.aiTopics,
      color: "bg-avanza-purple",
      borderColor: "border-avanza-purple",
      progress: 10,
      href: "/blog/what-is-ai-explaining-to-kids",
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-avanza-green to-avanza-teal py-20">
        <FadeIn className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-avanza-dark md:text-5xl">
            {t.curriculumsPage.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-avanza-dark/80">
            {t.curriculumsPage.description}
          </p>
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border-2 border-avanza-dark/15 bg-primary-foreground/60 p-5 text-avanza-dark shadow-sm backdrop-blur">
            <p className="text-base font-bold leading-relaxed md:text-lg">
              {t.curriculumsPage.launchBanner}
            </p>
            <a
              href={`#${CURRICULUM_SIGNUP_ID}`}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-avanza-dark px-5 py-2.5 text-sm font-extrabold text-primary-foreground transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-dark focus-visible:ring-offset-2 focus-visible:ring-offset-avanza-green"
            >
              {t.curriculumsPage.launchCta} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </FadeIn>
      </section>

      {/* Curriculum Grid */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {curriculums.map((curriculum, i) => (
              <FadeIn key={curriculum.title} delay={i * 70}>
                <CurriculumCard
                  {...curriculum}
                  topicsCovered={t.curriculumsPage.topicsCovered}
                  launchUpdates={t.curriculumsPage.launchUpdates}
                  startLearning={t.curriculumsPage.startLearning}
                  statusAvailable={t.curriculumsPage.statusAvailable}
                  statusInDevelopment={t.curriculumsPage.statusInDevelopment}
                  statusComingSoon={t.curriculumsPage.statusComingSoon}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {t.curriculumsPage.howItWorks}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t.curriculumsPage.howItWorksDesc}
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { step: "1", title: t.curriculumsPage.step1, description: t.curriculumsPage.step1Desc },
              { step: "2", title: t.curriculumsPage.step2, description: t.curriculumsPage.step2Desc },
              { step: "3", title: t.curriculumsPage.step3, description: t.curriculumsPage.step3Desc },
            ].map((s, i) => (
              <FadeIn key={s.step} delay={i * 100}>
                <StepCard {...s} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <FadeIn rootMargin="0px 0px -30px 0px">
        <NewsletterSignup
          sectionId={CURRICULUM_SIGNUP_ID}
          heading={t.curriculumsPage.newsletterTitle}
          description={t.curriculumsPage.newsletterDesc}
        />
      </FadeIn>
    </>
  )
}

function CurriculumCard({
  title,
  description,
  image,
  grades,
  duration,
  topics,
  borderColor,
  topicsCovered,
  launchUpdates,
  startLearning,
  statusAvailable,
  statusInDevelopment,
  statusComingSoon,
  progress,
  href,
}: {
  title: string
  description: string
  image: string
  grades: string
  duration: string
  topics: string[]
  color: string
  borderColor: string
  topicsCovered: string
  launchUpdates: string
  startLearning: string
  statusAvailable: string
  statusInDevelopment: string
  statusComingSoon: string
  progress: number
  href?: string
}) {
  const status = href ? "available" : progress >= 25 ? "in-development" : "coming-soon"
  const statusLabel =
    status === "available" ? statusAvailable :
    status === "in-development" ? statusInDevelopment :
    statusComingSoon
  const statusStyle =
    status === "available"
      ? "border-avanza-green/40 bg-avanza-green/10 text-avanza-green"
      : status === "in-development"
        ? "border-avanza-orange/40 bg-avanza-orange/10 text-avanza-orange"
        : "border-border bg-secondary text-muted-foreground"

  return (
    <div className={`group overflow-hidden rounded-2xl border-2 ${borderColor}/30 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl`}>
      <div className="relative h-48 overflow-hidden">
        <LightboxImage
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-card-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {grades}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {duration}
          </span>
        </div>

        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{topicsCovered}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${statusStyle}`}>
            {statusLabel}
          </span>
          {status === "available" && href ? (
            <Link
              href={href}
              className="inline-flex items-center gap-1 text-xs font-semibold text-avanza-green transition-colors hover:text-avanza-teal"
            >
              {startLearning} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <a
              href={`#${CURRICULUM_SIGNUP_ID}`}
              className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-avanza-green hover:text-avanza-green"
            >
              {launchUpdates}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function StepCard({
  step,
  title,
  description,
}: {
  step: string
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-avanza-green text-2xl font-extrabold text-avanza-dark shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg">
        {step}
      </div>
      <h3 className="mt-4 text-xl font-bold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}
