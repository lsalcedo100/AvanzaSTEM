"use client"

import { BookOpen, Clock, Users, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { LightboxImage } from "@/components/ui/lightbox-image"
import { FadeIn } from "@/components/ui/animate"

export default function CurriculumsPage() {
  const { t } = useLanguage()

  const curriculums = [
    {
      title: t.curriculumsPage.pythonTitle,
      description: t.curriculumsPage.pythonDesc,
      image: "/images/curriculums/python.jpg",
      grades: "Grades 3-6",
      duration: "8 weeks",
      topics: ["Variables & Data Types", "Loops & Conditionals", "Simple Functions", "Build a Mini Game"],
      color: "bg-avanza-green",
      borderColor: "border-avanza-green",
    },
    {
      title: t.curriculumsPage.engineeringTitle,
      description: t.curriculumsPage.engineeringDesc,
      image: "/images/curriculums/engineering.jpg",
      grades: "Grades 2-5",
      duration: "6 weeks",
      topics: ["Types of Structures", "Forces & Loads", "Building with Materials", "Design Challenges"],
      color: "bg-avanza-purple",
      borderColor: "border-avanza-purple",
    },
    {
      title: t.curriculumsPage.scienceTitle,
      description: t.curriculumsPage.scienceDesc,
      image: "/images/curriculums/science.png",
      grades: "Grades 2-4",
      duration: "6 weeks",
      topics: ["Chemical Reactions", "States of Matter", "Simple Machines", "Life Sciences"],
      color: "bg-avanza-orange",
      borderColor: "border-avanza-orange",
    },
    {
      title: t.curriculumsPage.mathTitle,
      description: t.curriculumsPage.mathDesc,
      image: "/images/curriculums/math.jpg",
      grades: "Grades 2-5",
      duration: "10 weeks",
      topics: ["Number Patterns", "Geometry Basics", "Measurement Fun", "Problem Solving"],
      color: "bg-avanza-teal",
      borderColor: "border-avanza-teal",
    },
    {
      title: t.curriculumsPage.roboticsTitle,
      description: t.curriculumsPage.roboticsDesc,
      image: "/images/curriculums/robotics.jpg",
      grades: "Grades 4-6",
      duration: "8 weeks",
      topics: ["Robot Components", "Sensors & Motors", "Basic Programming", "Robot Challenges"],
      color: "bg-avanza-green",
      borderColor: "border-avanza-green",
    },
    {
      title: t.curriculumsPage.aiTitle,
      description: t.curriculumsPage.aiDesc,
      image: "/images/curriculums/ai.png",
      grades: "Grades 5-8",
      duration: "6 weeks",
      topics: ["What is AI?", "Training a Model", "Image Recognition", "AI Ethics"],
      color: "bg-avanza-purple",
      borderColor: "border-avanza-purple",
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-avanza-green to-avanza-teal py-20">
        <FadeIn className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">
            {t.curriculumsPage.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/85">
            {t.curriculumsPage.description}
          </p>
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

      {/* CTA */}
      <section className="bg-gradient-to-br from-avanza-purple to-avanza-teal py-16">
        <FadeIn className="mx-auto max-w-4xl px-6 text-center" rootMargin="0px 0px -30px 0px">
          <h2 className="text-3xl font-extrabold text-primary-foreground">
            {t.curriculumsPage.cantFind}
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/85">
            {t.curriculumsPage.cantFindDesc}
          </p>
          <a
            href="mailto:liam@avanzastem.org"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-8 py-4 text-lg font-bold text-avanza-purple transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            {t.curriculumsPage.suggestTopic} <ArrowRight className="h-5 w-5" />
          </a>
        </FadeIn>
      </section>
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
  color,
  borderColor,
  topicsCovered,
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
}) {
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

        <span className={`mt-6 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full opacity-60 ${color} px-6 py-3 text-sm font-bold text-primary-foreground`}>
          <BookOpen className="h-4 w-4" /> Coming Soon
        </span>
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
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-avanza-green text-2xl font-extrabold text-primary-foreground shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg">
        {step}
      </div>
      <h3 className="mt-4 text-xl font-bold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}
