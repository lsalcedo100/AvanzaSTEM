"use client"

import { type FormEvent, useEffect, useState } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import { type Translations } from "@/i18n/translations"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Feedback = { type: "error"; message: string } | null

function getErrorMessage(
  code: string | null | undefined,
  blogPage: Translations["blogPage"],
) {
  if (code === "invalid_email") {
    return blogPage.invalidEmail
  }

  if (code === "provider_not_configured") {
    return blogPage.subscribeUnavailable
  }

  if (code === "sender_domain_not_verified") {
    return blogPage.subscribeDomainSetup
  }

  return blogPage.subscribeError
}

export function NewsletterSignup() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [isPending, setIsPending] = useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  useEffect(() => {
    if (!isSuccessOpen) {
      return
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSuccessOpen(false)
      }
    }

    window.addEventListener("keydown", handleEscapeKey)
    return () => {
      window.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isSuccessOpen])

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const result = searchParams.get("newsletter")

    if (!result) {
      return
    }

    if (result === "success") {
      setEmail("")
      setFeedback(null)
      setIsPending(false)
      setIsSuccessOpen(true)
    } else {
      setIsSuccessOpen(false)
      setIsPending(false)
      setFeedback({
        type: "error",
        message: getErrorMessage(result, t.blogPage),
      })
    }

    searchParams.delete("newsletter")
    const nextSearch = searchParams.toString()
    const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ""}${window.location.hash}`

    window.history.replaceState(window.history.state, "", nextUrl)
  }, [t.blogPage])

  async function submitEmail(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault()

    if (isPending) {
      return
    }

    const normalizedEmail = email.trim().toLowerCase()
    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setFeedback({ type: "error", message: t.blogPage.invalidEmail })
      return
    }

    setFeedback(null)
    setIsSuccessOpen(false)
    setIsPending(true)

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
        setFeedback({
          type: "error",
          message: getErrorMessage(data?.code, t.blogPage),
        })
        return
      }

      setEmail("")
      setIsSuccessOpen(true)
    } catch {
      setFeedback({ type: "error", message: t.blogPage.subscribeError })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <>
      <section
        id="newsletter-signup"
        className="relative overflow-hidden bg-gradient-to-br from-avanza-teal via-[#24c7a4] to-avanza-green py-16 sm:py-20"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_55%)]"
        />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <h2
            id="newsletter-signup-heading"
            className="text-4xl font-extrabold tracking-[0.12em] text-primary-foreground sm:text-5xl"
          >
            {t.blogPage.stayUpdated}
          </h2>
          <p className="mx-auto mt-5 max-w-4xl text-lg leading-relaxed text-primary-foreground/85 sm:text-xl">
            {t.blogPage.stayUpdatedDesc}
          </p>

          <form
            action="/api/subscribe"
            method="post"
            onSubmit={(event) => {
              void submitEmail(event)
            }}
            aria-labelledby="newsletter-signup-heading"
            className="mx-auto mt-10 flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              {t.blogPage.enterEmail}
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
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
              <p className="text-sm font-semibold text-primary-foreground/90">
                {feedback.message}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {isSuccessOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-avanza-dark/45 px-6"
          onClick={() => setIsSuccessOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-success-title"
            aria-describedby="newsletter-success-description"
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-[2rem] bg-background p-8 text-center shadow-2xl"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-avanza-green/15 text-lg font-black tracking-[0.18em] text-avanza-green">
              yay!
            </div>
            <h3
              id="newsletter-success-title"
              className="mt-5 text-3xl font-extrabold tracking-[0.08em] text-foreground"
            >
              {t.blogPage.subscribeSuccessTitle}
            </h3>
            <p
              id="newsletter-success-description"
              className="mt-3 text-base leading-relaxed text-muted-foreground"
            >
              {t.blogPage.subscribeSuccess}
            </p>
            <button
              type="button"
              onClick={() => setIsSuccessOpen(false)}
              className="mt-6 inline-flex rounded-full bg-avanza-green px-6 py-3 text-sm font-bold text-primary-foreground transition-transform duration-200 hover:scale-[1.02]"
            >
              {t.blogPage.closeSuccessDialog}
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}
