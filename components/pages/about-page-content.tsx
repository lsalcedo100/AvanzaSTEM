"use client"

import Link from "next/link"
import { Heart, Lightbulb, Users, ArrowRight, HandHeart } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { LightboxImage } from "@/components/ui/lightbox-image"
import { CountUp } from "@/components/ui/count-up"

export function AboutPageContent() {
  const { t } = useLanguage()

  const values = [
    {
      icon: Heart,
      title: t.aboutPage.accessTitle,
      description: t.aboutPage.accessDesc,
      accent: "bg-avanza-green",
    },
    {
      icon: Lightbulb,
      title: t.aboutPage.curiosityTitle,
      description: t.aboutPage.curiosityDesc,
      accent: "bg-avanza-purple",
    },
    {
      icon: Users,
      title: t.aboutPage.communityTitle,
      description: t.aboutPage.communityDesc,
      accent: "bg-avanza-teal",
    },
  ]

  return (
    <>
      <section className="bg-gradient-to-br from-avanza-green to-avanza-teal py-20">
        <FadeIn className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-avanza-dark/70">
            {t.aboutPage.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-avanza-dark md:text-5xl">
            {t.aboutPage.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-avanza-dark/80">
            {t.aboutPage.description}
          </p>
        </FadeIn>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <FadeIn>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
                {t.aboutPage.whyTitle}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {t.aboutPage.whyP1}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {t.aboutPage.whyP2}
              </p>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="relative h-80 overflow-hidden rounded-2xl shadow-2xl lg:h-96">
                <LightboxImage
                  src="/images/workshops/past-science.jpg"
                  alt={t.aboutPage.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {t.aboutPage.beliefsTitle}
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {values.map((card, i) => (
              <FadeIn key={card.title} delay={i * 100}>
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                  <div className={`h-1.5 w-full ${card.accent}`} />
                  <div className="p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                      <card.icon className="h-6 w-6 text-foreground" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-card-foreground">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {t.aboutPage.teamTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t.aboutPage.teamDesc}
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="mx-auto mt-14 max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-avanza-green/20">
                <span className="text-3xl font-extrabold text-avanza-green">L</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-card-foreground">Liam Salcedo</h3>
              <p className="text-sm font-semibold text-avanza-green">{t.aboutPage.founderRole}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t.aboutPage.founderBio}
              </p>
            </div>
            <p className="mt-10 text-center text-base text-muted-foreground">
              {t.aboutPage.helpText}{" "}
              <a
                href="mailto:liam@avanzastem.org"
                className="font-semibold text-avanza-green transition-colors hover:text-avanza-teal"
              >
                liam@avanzastem.org
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* GET INVOLVED + SUPPORT */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-start gap-14 lg:grid-cols-2">
            <FadeIn>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-avanza-green">
                {t.aboutPage.getInvolvedEyebrow}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
                {t.aboutPage.getInvolvedTitle}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {t.aboutPage.getInvolvedDesc}
              </p>
              <p className="mt-6 font-semibold text-foreground">{t.aboutPage.getInvolvedWho}</p>
              <ul className="mt-3 space-y-2">
                {t.aboutPage.getInvolvedItems.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-avanza-green" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm italic text-muted-foreground">{t.aboutPage.getInvolvedCommitment}</p>
              <a
                href="mailto:liam@avanzastem.org"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-avanza-green px-6 py-3 text-sm font-bold text-avanza-dark shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <HandHeart className="h-4 w-4" />
                {t.aboutPage.getInvolvedCTA}
              </a>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="rounded-2xl border border-border bg-secondary p-8 shadow-sm">
                <h3 className="text-xl font-extrabold text-foreground">{t.aboutPage.supportTitle}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t.aboutPage.supportDesc}</p>
                <p className="mt-5 text-base text-foreground">{t.aboutPage.supportCTA}</p>
                <a
                  href="mailto:liam@avanzastem.org"
                  className="mt-3 inline-flex items-center gap-1.5 font-bold text-avanza-green transition-colors hover:text-avanza-teal"
                >
                  {t.aboutPage.supportEmail}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-avanza-dark py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 text-center md:grid-cols-4">
            {[
              { to: 70, suffix: "+", label: t.aboutPage.studentsReached },
              { to: 6, suffix: "", label: t.aboutPage.curriculumTopics },
              { to: 6, suffix: "", label: t.aboutPage.diyProjects },
              { to: 4, suffix: "", label: t.aboutPage.workshopsHosted },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 80}>
                <div className="rounded-2xl border border-primary-foreground/10 p-8">
                  <p className="text-4xl font-extrabold text-avanza-green">
                    <CountUp to={stat.to} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-sm font-semibold text-primary-foreground/70">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-avanza-purple to-avanza-teal py-16">
        <FadeIn className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground">
            {t.aboutPage.ctaTitle}
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/85">
            {t.aboutPage.ctaDesc}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/workshops"
              className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-8 py-4 text-lg font-bold text-avanza-purple shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {t.aboutPage.findWorkshop} <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="mailto:liam@avanzastem.org"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/30 px-8 py-4 text-lg font-bold text-primary-foreground transition-all duration-300 hover:border-primary-foreground/60 hover:bg-primary-foreground/8"
            >
              {t.aboutPage.contactUs}
            </a>
          </div>
        </FadeIn>
      </section>
    </>
  )
}
