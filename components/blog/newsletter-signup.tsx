"use client"

import { type FormEvent, useState, useTransition } from "react"
import { useLanguage } from "@/components/providers/language-provider"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Feedback =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null

export function NewsletterSignup() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedEmail = email.trim().toLowerCase()
    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setFeedback({ type: "error", message: t.blogPage.invalidEmail })
      return
    }

    setFeedback(null)

    startTransition(async () => {
      try {
        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: normalizedEmail }),
        })

        const data = (await response.json().catch(() => null)) as
          | { code?: string }
          | null

        if (!response.ok) {
          const message =
            data?.code === "invalid_email"
              ? t.blogPage.invalidEmail
              : t.blogPage.subscribeError

          setFeedback({ type: "error", message })
          return
        }

        setEmail("")
        setFeedback({ type: "success", message: t.blogPage.subscribeSuccess })
      } catch {
        setFeedback({ type: "error", message: t.blogPage.subscribeError })
      }
    })
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-avanza-teal via-[#24c7a4] to-avanza-green py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-4xl font-extrabold tracking-[0.12em] text-primary-foreground sm:text-5xl">
          {t.blogPage.stayUpdated}
        </h2>
        <p className="mx-auto mt-5 max-w-4xl text-lg leading-relaxed text-primary-foreground/85 sm:text-xl">
          {t.blogPage.stayUpdatedDesc}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            {t.blogPage.enterEmail}
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t.blogPage.enterEmail}
            autoComplete="email"
            inputMode="email"
            disabled={isPending}
            className="min-w-0 flex-1 rounded-full border-2 border-primary-foreground/20 bg-primary-foreground/12 px-7 py-4 text-lg text-primary-foreground placeholder:text-primary-foreground/55 backdrop-blur-sm transition-colors focus:border-primary-foreground/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-80"
          />
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex justify-center rounded-full bg-primary-foreground px-10 py-4 text-lg font-bold text-avanza-green shadow-lg transition-transform duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:scale-100"
          >
            {isPending ? t.blogPage.subscribing : t.blogPage.subscribe}
          </button>
        </form>

        <div aria-live="polite" className="mt-4 min-h-6">
          {feedback ? (
            <p
              className={`text-sm font-semibold ${
                feedback.type === "success"
                  ? "text-primary-foreground"
                  : "text-primary-foreground/90"
              }`}
            >
              {feedback.message}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
