"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, Wrench, FlaskConical, Users } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-avanza-teal to-avanza-green">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-20 md:flex-row md:py-28">
          <div className="flex-1">
            <h1 className="text-balance text-5xl font-extrabold italic leading-tight text-primary-foreground md:text-6xl">
              {t.home.heroTitle}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-primary-foreground/85">
              {t.home.heroDescription}
            </p>
            <Link
              href="/curriculums"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary-foreground px-8 py-4 text-lg font-bold text-avanza-green shadow-lg transition-transform hover:scale-105"
            >
              {t.home.startLearning} <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="flex-1">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/home picture.png"
                alt="Young Hispanic youth collaborating on a popsicle stick engineering project at a workshop table"
                width={600}
                height={400}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 40C360 100 720 0 1080 50C1260 75 1380 60 1440 40V100H0V40Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {t.home.whatWeOffer}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t.home.whatWeOfferDescription}
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <OfferCard
              icon={<BookOpen className="h-8 w-8" />}
              title={t.home.onlineCurriculums}
              description={t.home.onlineCurriculumsDesc}
              href="/curriculums"
              color="bg-avanza-green"
              learnMore={t.home.learnMore}
            />
            <OfferCard
              icon={<Wrench className="h-8 w-8" />}
              title={t.home.diyProjects}
              description={t.home.diyProjectsDesc}
              href="/projects"
              color="bg-avanza-purple"
              learnMore={t.home.learnMore}
            />
            <OfferCard
              icon={<FlaskConical className="h-8 w-8" />}
              title={t.home.blogHowTos}
              description={t.home.blogHowTosDesc}
              href="/blog"
              color="bg-avanza-orange"
              learnMore={t.home.learnMore}
            />
            <OfferCard
              icon={<Users className="h-8 w-8" />}
              title={t.home.localWorkshops}
              description={t.home.localWorkshopsDesc}
              href="/workshops"
              color="bg-avanza-teal"
              learnMore={t.home.learnMore}
            />
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {t.home.featuredActivities}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t.home.featuredActivitiesDesc}
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <FeaturedCard
              image="/images/bridge building-EDIT.jpg"
              title={t.home.featuredBridge}
              description={t.home.featuredBridgeDesc}
            />
            <FeaturedCard
              image="/images/python.jpg"
              title={t.home.featuredCoding}
              description={t.home.featuredCodingDesc}
            />
            <FeaturedCard
              image="/images/coke pic.jpg"
              title={t.home.featuredMentos}
              description={t.home.featuredMentosDesc}
            />
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-gradient-to-br from-avanza-purple to-avanza-teal py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground md:text-4xl">
            {t.home.ourMission}
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-primary-foreground/90">
            {t.home.missionText}
          </p>
          <Link
            href="/workshops"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-primary-foreground px-8 py-4 text-lg font-bold text-avanza-purple shadow-lg transition-transform hover:scale-105"
          >
            {t.home.findWorkshop} <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 text-center md:grid-cols-4">
            <StatCard number="500+" label={t.home.studentsReached} />
            <StatCard number="12" label={t.home.curriculumTopics} />
            <StatCard number="25+" label={t.home.diyProjectsCount} />
            <StatCard number="10" label={t.home.workshopsHosted} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-avanza-dark py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground md:text-4xl">
            {t.home.readyTitle}
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/70">
            {t.home.readyDesc}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/curriculums"
              className="inline-flex items-center gap-2 rounded-full bg-avanza-green px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105"
            >
              {t.home.browseCurriculums} <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/30 px-8 py-4 text-lg font-bold text-primary-foreground transition-colors hover:border-primary-foreground/60"
            >
              {t.home.viewProjects}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function OfferCard({
  icon,
  title,
  description,
  href,
  color,
  learnMore,
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  color: string
  learnMore: string
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${color} text-primary-foreground`}>
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-bold text-card-foreground">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-avanza-green transition-colors group-hover:text-avanza-teal">
        {learnMore} <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  )
}

function FeaturedCard({
  image,
  title,
  description,
}: {
  image: string
  title: string
  description: string
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-card-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-8">
      <p className="text-4xl font-extrabold text-avanza-green">{number}</p>
      <p className="mt-2 text-sm font-semibold text-muted-foreground">{label}</p>
    </div>
  )
}
