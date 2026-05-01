"use client"

import { Package, Users, Star } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"

export function HostPageContent() {
  const { t } = useLanguage()

  const benefitCards = [
    {
      icon: Package,
      title: t.hostPage.materialsTitle,
      body: t.hostPage.materialsBody,
    },
    {
      icon: Users,
      title: t.hostPage.bilingualTitle,
      body: t.hostPage.bilingualBody,
    },
    {
      icon: Star,
      title: t.hostPage.noCostTitle,
      body: t.hostPage.noCostBody,
    },
  ]

  const steps = [
    { step: "1", title: t.hostPage.step1Title, body: t.hostPage.step1Body },
    { step: "2", title: t.hostPage.step2Title, body: t.hostPage.step2Body },
    { step: "3", title: t.hostPage.step3Title, body: t.hostPage.step3Body },
    { step: "4", title: t.hostPage.step4Title, body: t.hostPage.step4Body },
  ]

  const venues = [
    {
      name: t.workshopsPage.cliftonLibrary,
      description: t.hostPage.cliftonDescription,
    },
    {
      name: t.workshopsPage.allwoodLibrary,
      description: t.hostPage.allwoodDescription,
    },
  ]

  return (
    <>
      <section className="bg-gradient-to-br from-avanza-teal to-avanza-green py-20">
        <FadeIn className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary-foreground/70">
            {t.hostPage.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-primary-foreground md:text-5xl">
            {t.hostPage.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/90">
            {t.hostPage.description}
          </p>
        </FadeIn>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {t.hostPage.whatYouGet}
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {benefitCards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 100}>
                <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-avanza-green/10">
                    <card.icon className="h-6 w-6 text-avanza-green" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-card-foreground">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {t.hostPage.howTitle}
            </h2>
          </FadeIn>
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-4">
            {steps.map((s, i) => (
              <FadeIn key={s.step} delay={i * 80}>
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-avanza-teal text-xl font-extrabold text-primary-foreground shadow-md">
                    {s.step}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {t.hostPage.trustedBy}
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {venues.map((venue, i) => (
              <FadeIn key={venue.name} delay={i * 100}>
                <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-bold text-card-foreground">{venue.name}</h3>
                    <span className="shrink-0 rounded-full bg-avanza-green/10 px-3 py-1 text-xs font-bold text-avanza-green">
                      {t.hostPage.completed}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{venue.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-avanza-dark py-20">
        <div className="mx-auto max-w-2xl px-6">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-extrabold text-primary-foreground md:text-4xl">
              {t.hostPage.readyTitle}
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/70">
              {t.hostPage.readyDescPrefix}{" "}
              <a href="mailto:liam@avanzastem.org" className="text-avanza-green transition-colors hover:text-avanza-teal">
                liam@avanzastem.org
              </a>
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <form
              action="mailto:liam@avanzastem.org"
              method="POST"
              encType="text/plain"
              className="mt-10 flex flex-col gap-4"
            >
              <input
                type="text"
                name="name"
                placeholder={t.hostPage.namePlaceholder}
                required
                className="w-full rounded-xl border border-primary-foreground/20 bg-primary-foreground/8 px-5 py-3.5 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-avanza-green focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder={t.hostPage.emailPlaceholder}
                required
                className="w-full rounded-xl border border-primary-foreground/20 bg-primary-foreground/8 px-5 py-3.5 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-avanza-green focus:outline-none"
              />
              <input
                type="text"
                name="venue"
                placeholder={t.hostPage.venuePlaceholder}
                className="w-full rounded-xl border border-primary-foreground/20 bg-primary-foreground/8 px-5 py-3.5 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-avanza-green focus:outline-none"
              />
              <textarea
                name="message"
                rows={4}
                placeholder={t.hostPage.messagePlaceholder}
                className="w-full resize-none rounded-xl border border-primary-foreground/20 bg-primary-foreground/8 px-5 py-3.5 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-avanza-green focus:outline-none"
              />
              <button
                type="submit"
                className="mt-2 rounded-full bg-avanza-green px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {t.hostPage.sendMessage}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-primary-foreground/50">
              {t.hostPage.preferEmail}{" "}
              <a href="mailto:liam@avanzastem.org" className="text-avanza-green transition-colors hover:text-avanza-teal">
                liam@avanzastem.org
              </a>
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
