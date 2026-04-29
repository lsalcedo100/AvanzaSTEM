"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { LightboxImage } from "@/components/ui/lightbox-image"
import { FadeIn } from "@/components/ui/animate"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#e7f5fe]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-20 md:flex-row md:py-28">
          <FadeIn className="flex-1" delay={0}>
            <h1 className="text-balance text-5xl font-extrabold italic leading-tight text-foreground md:text-6xl">
              {t.home.heroTitle}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-foreground/80">
              {t.home.heroDescription}
            </p>
            <Link
              href="/curriculums"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary-foreground px-8 py-4 text-lg font-bold text-avanza-green shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {t.home.startLearning} <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </FadeIn>
          <FadeIn className="flex-1" delay={120}>
            <div className="overflow-hidden rounded-2xl shadow-2xl transition-shadow duration-300 hover:shadow-[0_32px_64px_rgba(26,26,46,0.15)]">
              <LightboxImage
                src="/images/home/hero.png"
                alt="Young Hispanic youth collaborating on a popsicle stick engineering project at a workshop table"
                width={600}
                height={400}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </FadeIn>
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
              { categoryWord: t.home.onlineCurriculumsWord, title: t.home.onlineCurriculums, description: t.home.onlineCurriculumsDesc, href: "/curriculums", accentBar: "bg-avanza-green", accentGlow: "from-avanza-green/10", categoryWordColor: "text-avanza-green/20" },
              { categoryWord: t.home.diyProjectsWord, title: t.home.diyProjects, description: t.home.diyProjectsDesc, href: "/projects", accentBar: "bg-avanza-purple", accentGlow: "from-avanza-purple/10", categoryWordColor: "text-avanza-purple/20" },
              { categoryWord: t.home.blogHowTosWord, title: t.home.blogHowTos, description: t.home.blogHowTosDesc, href: "/blog", accentBar: "bg-avanza-orange", accentGlow: "from-avanza-orange/10", categoryWordColor: "text-avanza-orange/20" },
              { categoryWord: t.home.localWorkshopsWord, title: t.home.localWorkshops, description: t.home.localWorkshopsDesc, href: "/workshops", accentBar: "bg-avanza-teal", accentGlow: "from-avanza-teal/10", categoryWordColor: "text-avanza-teal/20" },
            ].map((card, i) => (
              <FadeIn key={card.href} delay={i * 80}>
                <OfferCard {...card} learnMore={t.home.learnMore} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {t.home.featuredActivities}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t.home.featuredActivitiesDesc}
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { image: "/images/home/featured-bridge.jpg", title: t.home.featuredBridge, description: t.home.featuredBridgeDesc },
              { image: "/images/home/featured-python.jpg", title: t.home.featuredCoding, description: t.home.featuredCodingDesc },
              { image: "/images/home/coke-mentos-science-experiment-kids.png", alt: "Coke and Mentos chemical reaction science experiment for kids", title: t.home.featuredMentos, description: t.home.featuredMentosDesc },
            ].map((card, i) => (
              <FadeIn key={card.title} delay={i * 100}>
                <FeaturedCard {...card} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-gradient-to-br from-avanza-purple to-avanza-teal py-20">
        <FadeIn className="mx-auto max-w-4xl px-6 text-center" rootMargin="0px 0px -30px 0px">
          <h2 className="text-3xl font-extrabold text-primary-foreground md:text-4xl">
            {t.home.ourMission}
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-primary-foreground/90">
            {t.home.missionText}
          </p>
          <Link
            href="/workshops"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-primary-foreground px-8 py-4 text-lg font-bold text-avanza-purple shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            {t.home.findWorkshop} <ArrowRight className="h-5 w-5" />
          </Link>
        </FadeIn>
      </section>

      {/* Stats */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 text-center md:grid-cols-4">
            {[
              { number: "70+", label: t.home.studentsReached },
              { number: "6", label: t.home.curriculumTopics },
              { number: "6", label: t.home.diyProjectsCount },
              { number: "4", label: t.home.workshopsHosted },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 80}>
                <StatCard number={stat.number} label={stat.label} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-avanza-dark py-20">
        <FadeIn className="mx-auto max-w-4xl px-6 text-center" rootMargin="0px 0px -30px 0px">
          <h2 className="text-3xl font-extrabold text-primary-foreground md:text-4xl">
            {t.home.readyTitle}
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/70">
            {t.home.readyDesc}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/curriculums"
              className="inline-flex items-center gap-2 rounded-full bg-avanza-green px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {t.home.browseCurriculums} <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/30 px-8 py-4 text-lg font-bold text-primary-foreground transition-all duration-300 hover:border-primary-foreground/60 hover:bg-primary-foreground/8"
            >
              {t.home.viewProjects}
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  )
}

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

function FeaturedCard({
  image,
  alt,
  title,
  description,
}: {
  image: string
  alt?: string
  title: string
  description: string
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden">
        <LightboxImage
          src={image}
          alt={alt ?? title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
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
    <div className="rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <p className="text-4xl font-extrabold text-avanza-green">{number}</p>
      <p className="mt-2 text-sm font-semibold text-muted-foreground">{label}</p>
    </div>
  )
}
