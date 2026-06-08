"use client"

import { useState } from "react"
import { Package, Users, Star } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"

type FormStatus = "idle" | "submitting" | "success" | "error"
type ContactErrorCode =
  | "validation_error"
  | "provider_not_configured"
  | "sender_domain_not_verified"
  | "upstream_error"
  | "request_failed"

const MAX_NAME_LENGTH = 100
const MAX_EMAIL_LENGTH = 254
const MAX_VENUE_LENGTH = 140
const MAX_MESSAGE_LENGTH = 2000

export function HostPageContent() {
  const { t } = useLanguage()

  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [fields, setFields] = useState({ name: "", email: "", venue: "", message: "" })

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

  function getContactErrorMessage(code: ContactErrorCode | string) {
    if (code === "validation_error") {
      return t.hostPage.formErrorValidation
    }

    if (code === "provider_not_configured" || code === "sender_domain_not_verified") {
      return t.hostPage.formEmailSetup
    }

    return t.hostPage.formErrorGeneral
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setStatus("submitting")
    setErrorMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          venue: String(formData.get("venue") ?? ""),
          message: String(formData.get("message") ?? ""),
          website: String(formData.get("website") ?? ""),
        }),
      })

      if (res.ok) {
        setStatus("success")
        setFields({ name: "", email: "", venue: "", message: "" })
      } else {
        const data = (await res.json().catch(() => null)) as { code?: ContactErrorCode } | null
        const code = data?.code ?? "request_failed"
        setErrorMessage(getContactErrorMessage(code))
        setStatus("error")
      }
    } catch {
      setErrorMessage(t.hostPage.formErrorGeneral)
      setStatus("error")
    }
  }

  return (
    <>
      <section className="bg-gradient-to-br from-avanza-teal to-avanza-green py-20">
        <FadeIn className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-avanza-dark/70">
            {t.hostPage.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-avanza-dark md:text-5xl">
            {t.hostPage.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-avanza-dark/80">
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
            <div aria-live="polite" aria-atomic="true" className="mt-6">
              {status === "success" && (
                <div className="rounded-xl bg-avanza-green/20 px-5 py-4 text-center text-sm font-semibold text-avanza-green">
                  {t.hostPage.formSuccess}
                </div>
              )}
              {status === "error" && errorMessage && (
                <div className="rounded-xl bg-red-500/20 px-5 py-4 text-center text-sm font-semibold text-red-400">
                  {errorMessage}
                </div>
              )}
            </div>

            {status !== "success" && (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-4 flex flex-col gap-4"
              >
                <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
                  <label htmlFor="host-website">Website</label>
                  <input
                    id="host-website"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="host-name" className="text-sm font-bold text-primary-foreground/80">
                    {t.hostPage.namePlaceholder}
                  </label>
                  <input
                    id="host-name"
                    type="text"
                    name="name"
                    value={fields.name}
                    onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
                    placeholder={t.hostPage.namePlaceholder}
                    required
                    aria-required="true"
                    maxLength={MAX_NAME_LENGTH}
                    disabled={status === "submitting"}
                    className="w-full rounded-xl border border-primary-foreground/20 bg-primary-foreground/8 px-5 py-3.5 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:border-avanza-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 focus-visible:ring-offset-avanza-dark disabled:opacity-60"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="host-email" className="text-sm font-bold text-primary-foreground/80">
                    {t.hostPage.emailPlaceholder}
                  </label>
                  <input
                    id="host-email"
                    type="email"
                    name="email"
                    value={fields.email}
                    onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
                    placeholder={t.hostPage.emailPlaceholder}
                    required
                    aria-required="true"
                    maxLength={MAX_EMAIL_LENGTH}
                    disabled={status === "submitting"}
                    className="w-full rounded-xl border border-primary-foreground/20 bg-primary-foreground/8 px-5 py-3.5 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:border-avanza-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 focus-visible:ring-offset-avanza-dark disabled:opacity-60"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="host-venue" className="text-sm font-bold text-primary-foreground/80">
                    {t.hostPage.venuePlaceholder}
                  </label>
                  <input
                    id="host-venue"
                    type="text"
                    name="venue"
                    value={fields.venue}
                    onChange={(e) => setFields((f) => ({ ...f, venue: e.target.value }))}
                    placeholder={t.hostPage.venuePlaceholder}
                    required
                    aria-required="true"
                    maxLength={MAX_VENUE_LENGTH}
                    disabled={status === "submitting"}
                    className="w-full rounded-xl border border-primary-foreground/20 bg-primary-foreground/8 px-5 py-3.5 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:border-avanza-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 focus-visible:ring-offset-avanza-dark disabled:opacity-60"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="host-message" className="text-sm font-bold text-primary-foreground/80">
                    {t.hostPage.messagePlaceholder}
                  </label>
                  <textarea
                    id="host-message"
                    name="message"
                    value={fields.message}
                    onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
                    rows={4}
                    placeholder={t.hostPage.messagePlaceholder}
                    required
                    aria-required="true"
                    maxLength={MAX_MESSAGE_LENGTH}
                    disabled={status === "submitting"}
                    className="w-full resize-none rounded-xl border border-primary-foreground/20 bg-primary-foreground/8 px-5 py-3.5 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:border-avanza-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 focus-visible:ring-offset-avanza-dark disabled:opacity-60"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-2 rounded-full bg-avanza-green px-8 py-4 text-lg font-bold text-avanza-dark shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-avanza-green disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                >
                  {status === "submitting" ? t.hostPage.sendingMessage : t.hostPage.sendMessage}
                </button>
              </form>
            )}

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
