"use client"

import { type FormEvent, useState } from "react"
import { useLanguage } from "@/components/providers/language-provider"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_EMAIL_LENGTH = 254

/**
 * Compact newsletter signup for the bottom of the Curriculums page — a modest
 * secondary action, deliberately smaller than the course catalog and not an
 * oversized gradient callout.
 *
 * It reuses the shared `POST /api/subscribe` endpoint (and the same honeypot +
 * label strings) rather than the large shared `NewsletterSignup` section, so no
 * shared component or behaviour used on other pages is changed. Submits via JS
 * with inline `aria-live` feedback; a no-JS form post still reaches the API.
 */
export function CurriculumNewsletter({
  sectionId,
  heading,
  description,
}: {
  sectionId: string
  heading: string
  description: string
}) {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const headingId = `${sectionId}-heading`
  const emailId = `${sectionId}-email`
  const websiteId = `${sectionId}-website`

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "pending") return

    const formData = new FormData(event.currentTarget)
    const normalizedEmail = String(formData.get("email") ?? "").trim().toLowerCase()
    const website = String(formData.get("website") ?? "")

    if (!EMAIL_PATTERN.test(normalizedEmail) || normalizedEmail.length > MAX_EMAIL_LENGTH) {
      setStatus("error")
      setMessage(t.blogPage.invalidEmail)
      return
    }

    setStatus("pending")
    setMessage("")

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, website }),
      })

      if (!response.ok) {
        setStatus("error")
        setMessage(t.blogPage.subscribeError)
        return
      }

      setEmail("")
      setStatus("success")
      setMessage(t.blogPage.subscribeSuccess)
    } catch {
      setStatus("error")
      setMessage(t.blogPage.subscribeError)
    }
  }

  return (
    <section id={sectionId} className="border-t border-border bg-background py-12 sm:py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <h2 id={headingId} className="text-xl font-bold text-foreground">
            {heading}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>

          <form
            action="/api/subscribe"
            method="post"
            noValidate
            onSubmit={(event) => void onSubmit(event)}
            aria-labelledby={headingId}
            className="mt-5 flex flex-col gap-3 sm:flex-row"
          >
            {/* Honeypot — hidden from users, checked server-side. */}
            <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
              <label htmlFor={websiteId}>{t.blogPage.websiteField}</label>
              <input id={websiteId} name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <label htmlFor={emailId} className="sr-only">
              {t.blogPage.enterEmail}
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                if (status !== "idle") setStatus("idle")
              }}
              placeholder={t.blogPage.enterEmail}
              autoComplete="email"
              inputMode="email"
              maxLength={MAX_EMAIL_LENGTH}
              disabled={status === "pending"}
              className="min-w-0 flex-1 rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-avanza-green focus:outline-none focus:ring-2 focus:ring-avanza-green focus:ring-offset-2 disabled:opacity-70"
            />
            <button
              type="submit"
              disabled={status === "pending"}
              className="inline-flex justify-center rounded-md bg-avanza-green px-5 py-2.5 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 disabled:opacity-70"
            >
              {status === "pending" ? t.blogPage.subscribing : t.blogPage.subscribe}
            </button>
          </form>

          <p aria-live="polite" className="mt-3 min-h-5 text-sm font-medium text-foreground">
            {message}
          </p>
        </div>
      </div>
    </section>
  )
}
