"use client"

import { useState } from "react"
import Image from "next/image"
import type { ReactNode } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import type { Language, Translations } from "@/i18n/translations"
import { FadeIn } from "@/components/ui/animate"
import { SocialProof } from "@/components/ui/social-proof"
import {
  CourseActions,
  CourseButton,
  CourseShell,
  CourseTextLink,
  PhotoBand,
  StepFlow,
  type CourseTheme,
} from "@/components/pages/courses/course-ui"
import {
  INTERNATIONAL_PARTNERS,
  LIBRARIES,
  type InternationalPartner,
  type PartnerCountry,
} from "@/features/workshops/locations"
import { cn } from "@/lib/utils"

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
const CONTACT_EMAIL = "liam@avanzastem.org"
const CONTACT_MAILTO_HREF = `mailto:${CONTACT_EMAIL}`
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type ContactFields = {
  name: string
  email: string
  venue: string
  message: string
  website: string
}

function getContactFields(form: HTMLFormElement): ContactFields {
  const formData = new FormData(form)

  return {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    venue: String(formData.get("venue") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
    website: String(formData.get("hp_field") ?? ""),
  }
}

function isValidContactSubmission({ name, email, venue, message }: ContactFields) {
  return (
    Boolean(name) &&
    name.length <= MAX_NAME_LENGTH &&
    EMAIL_PATTERN.test(email) &&
    email.length <= MAX_EMAIL_LENGTH &&
    Boolean(venue) &&
    venue.length <= MAX_VENUE_LENGTH &&
    Boolean(message) &&
    message.length <= MAX_MESSAGE_LENGTH
  )
}

function buildMailtoHref({ name, email, venue, message }: ContactFields, h: Translations["hostPage"]) {
  const subject = `${h.mailSubject} ${name || h.mailAnonymous}`
  const body = [
    h.mailGreeting,
    "",
    h.mailIntro,
    "",
    `${h.mailName} ${name}`,
    `${h.mailEmail} ${email}`,
    `${h.mailVenue} ${venue}`,
    "",
    h.mailMessage,
    message,
  ].join("\n")

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/**
 * The page palette: Avanza green on the site's own soft-green surface (the
 * same `--secondary` the rest of the site uses), so the page reads as part of
 * the site rather than as a seventh course hub.
 */
const hostTheme: CourseTheme = {
  accent: "#2ecc71",
  accentDark: "#1b7e44",
  band: "#f0faf4",
  tint: "#f0faf4",
  soft: "#d5f5e0",
  line: "#a8e6c0",
}

/** BCP 47 tags for month names on the calendar. "pt" is Brazilian Portuguese sitewide. */
const DATE_LOCALES: Record<Language, string> = {
  en: "en-US",
  es: "es",
  zh: "zh-CN",
  pt: "pt-BR",
}

// The rosters below are the same module the workshop finder reads, so a venue
// never has to be added in two places. They are pure data, grouped once here.
const HOSTED_LIBRARIES = LIBRARIES.filter((library) => library.status === "active")
const UPCOMING_LIBRARIES = LIBRARIES.filter((library) => library.status === "upcoming")
const HOSTED_ABROAD = groupByCountry(
  INTERNATIONAL_PARTNERS.filter((partner) => partner.status === "hosted"),
)
const SCHEDULED_ABROAD = groupByCountry(
  INTERNATIONAL_PARTNERS.filter((partner) => partner.status === "scheduled"),
)

/** Groups partners by country, keeping the data file's order of first appearance. */
function groupByCountry(
  partners: InternationalPartner[],
): [PartnerCountry, InternationalPartner[]][] {
  const groups = new Map<PartnerCountry, InternationalPartner[]>()
  for (const partner of partners) {
    const group = groups.get(partner.country)
    if (group) group.push(partner)
    else groups.set(partner.country, [partner])
  }
  return [...groups.entries()]
}

/** "September 2026", or "September 2026 – October 2026" when a series spans months. */
function formatSessionMonths(sessions: string[], language: Language) {
  const format = new Intl.DateTimeFormat(DATE_LOCALES[language], {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
  const label = (iso: string) => format.format(new Date(`${iso}T00:00:00Z`))
  const first = label(sessions[0])
  const last = label(sessions[sessions.length - 1])
  return first === last ? first : `${first} – ${last}`
}

const inputClass =
  "w-full rounded-md border border-white/20 bg-white/8 px-4 py-3 text-white placeholder:text-white/40 focus-visible:border-[var(--c-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-avanza-dark disabled:opacity-60"

const labelClass = "text-sm font-bold text-white/80"

/**
 * The hosting page (/host): what a library, school, or community center gets,
 * what it needs to provide, where the series has already run, and the request
 * form. Laid out like a program one-sheet a librarian can forward: facts and
 * rosters on ruled rows, one real photo per section, one solid button.
 */
export function HostPageContent() {
  const { t, language } = useLanguage()
  const h = t.hostPage

  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [fallbackHref, setFallbackHref] = useState("")
  const [emailNotice, setEmailNotice] = useState("")
  const [fields, setFields] = useState({ name: "", email: "", venue: "", message: "" })

  const workshopNumbers = [t.workshopsPage.week1, t.workshopsPage.week2, t.workshopsPage.week3]

  const steps = [
    { title: h.step1Title, description: h.step1Body },
    { title: h.step2Title, description: h.step2Body },
    { title: h.step3Title, description: h.step3Body },
    { title: h.step4Title, description: h.step4Body },
  ]

  // Real sessions only. The Shanghai venues do not allow photography during a
  // program, so Lanyu Books is shown as the room, with a caption saying so.
  const photos = [
    {
      src: "/images/workshops/past-engineering.jpg",
      alt: t.workshopsPage.buildingImageAlt,
      caption: h.photoEngineering,
    },
    {
      src: "/images/workshops/wayne-public-library.png",
      alt: t.workshopsPage.wayneImageAlt,
      caption: h.photoWayne,
    },
    {
      src: "/images/workshops/Lanyu Books.jpeg",
      alt: t.workshopsPage.lanyuImageAlt,
      caption: h.photoLanyu,
    },
  ]

  const countryName: Record<PartnerCountry, string> = {
    CN: t.home.finderCountryChina,
    EC: t.home.finderCountryEcuador,
    PE: t.home.finderCountryPeru,
    CO: t.home.finderCountryColombia,
    PA: t.home.finderCountryPanama,
    CL: t.home.finderCountryChile,
  }
  const localityLabel = { minhang: t.home.finderLocalityMinhang }

  function getContactErrorMessage(code: ContactErrorCode | string) {
    if (code === "validation_error") {
      return t.hostPage.formErrorValidation
    }

    if (code === "provider_not_configured" || code === "sender_domain_not_verified") {
      return t.hostPage.formEmailSetup
    }

    return t.hostPage.formErrorGeneral
  }

  function handleDirectEmailClick() {
    setEmailNotice(t.hostPage.emailLinkFallback)

    const copyEmail = navigator.clipboard?.writeText(CONTACT_EMAIL)

    if (!copyEmail) {
      return
    }

    void copyEmail
      .then(() => setEmailNotice(t.hostPage.emailCopiedNotice))
      .catch(() => setEmailNotice(t.hostPage.emailLinkFallback))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const contactFields = getContactFields(e.currentTarget)

    if (!isValidContactSubmission(contactFields)) {
      setFallbackHref("")
      setErrorMessage(t.hostPage.formErrorValidation)
      setStatus("error")
      return
    }

    setStatus("submitting")
    setErrorMessage("")
    setFallbackHref("")

    function openEmailDraft() {
      const mailtoHref = buildMailtoHref(contactFields, t.hostPage)
      setFallbackHref(mailtoHref)
      setErrorMessage(t.hostPage.formMailtoFallback)
      setStatus("error")
      window.location.assign(mailtoHref)
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactFields),
      })

      if (res.ok) {
        setStatus("success")
        setFallbackHref("")
        setFields({ name: "", email: "", venue: "", message: "" })
      } else {
        const data = (await res.json().catch(() => null)) as { code?: ContactErrorCode } | null
        const code = data?.code ?? "request_failed"

        if (code !== "validation_error" && res.status >= 500) {
          openEmailDraft()
          return
        }

        setErrorMessage(getContactErrorMessage(code))
        setStatus("error")
      }
    } catch {
      openEmailDraft()
    }
  }

  return (
    <CourseShell theme={hostTheme}>
      {/* Cover: one real session across the full width, with the ask set in a
          panel that overlaps the photo's lower edge. Deliberately not the
          course cover (a color band with a side photo and a facts grid) or
          the home cover (a band with a carousel): this page opens on the room
          a host is being asked to lend. */}
      <section className="bg-background">
        <div className="relative aspect-4/3 w-full overflow-hidden bg-[var(--c-band)] sm:aspect-16/7 sm:max-h-[600px]">
          <Image
            src="/images/workshops/roseland-free-public-library-coding.jpeg"
            alt={t.workshopsPage.roselandImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {/* flow-root keeps the panel's negative margin from collapsing through
            this wrapper, so the wrapper (and the caption pinned to its top)
            starts at the photo's bottom edge while the panel rises over it. */}
        <div className="relative mx-auto flow-root max-w-6xl px-6">
          <div className="-mx-6 -mt-16 max-w-2xl border-t-4 border-[var(--c-accent)] bg-background px-6 pt-7 sm:-mt-24 sm:mr-0 md:-ml-10 md:px-10 md:pt-9 lg:-mt-32">
            <p className="text-sm font-bold text-[var(--c-accent-dark)]">{h.eyebrow}</p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold leading-[1.05] text-avanza-dark sm:text-5xl">
              {h.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-avanza-dark/75">{h.description}</p>
            {/* Facts from the program description: cost, ages, group size,
                languages, materials. */}
            <p className="mt-5 text-base font-semibold leading-relaxed text-avanza-dark">
              {h.factsLine}
            </p>
            <div className="mt-8">
              <CourseActions>
                <CourseButton href="#request">{h.requestButton}</CourseButton>
                <CourseTextLink href="/find-a-workshop">{h.finderLink}</CourseTextLink>
              </CourseActions>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-avanza-dark/60 md:absolute md:right-6 md:top-4 md:mt-0 md:max-w-xs md:text-right">
            {h.heroPhotoCaption}
          </p>
        </div>
      </section>

      {/* The three workshops as a syllabus: per session, what is said, what is
          built, what students leave with, and what the room needs. */}
      <Section
        id="workshops"
        tone="tint"
        eyebrow={h.workshopsEyebrow}
        title={h.workshopsTitle}
        lead={h.workshopsLead}
      >
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-3">
          {h.workshops.map((workshop, i) => (
            <article key={workshop.name}>
              <div className="flex items-baseline justify-between gap-4 border-b-2 border-[var(--c-accent)] pb-3">
                <div>
                  <p className="text-sm font-bold text-[var(--c-accent-dark)]">{workshopNumbers[i]}</p>
                  <h3 className="mt-1 text-xl font-extrabold text-avanza-dark">{workshop.name}</h3>
                  <p className="text-base text-avanza-dark/70">{workshop.session}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-avanza-dark/60">{workshop.length}</p>
              </div>
              <dl>
                {[
                  [h.talkLabel, workshop.talk],
                  [h.activityLabel, workshop.activity],
                  [h.takeawayLabel, workshop.takeaway],
                  [h.roomLabel, workshop.room],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-avanza-dark/10 py-3">
                    <dt className="text-xs font-semibold text-avanza-dark/50">{label}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-avanza-dark/85">{value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </Section>

      {/* The split of responsibilities, as two ruled lists. */}
      <Section eyebrow={h.bringEyebrow} title={h.bringTitle} lead={h.bringLead}>
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          <div>
            <GroupHeading>{h.weBring}</GroupHeading>
            <ul>
              {h.weBringItems.map((item) => (
                <li
                  key={item}
                  className="border-b border-avanza-dark/10 py-3.5 text-base leading-relaxed text-avanza-dark/85"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <GroupHeading>{h.youProvide}</GroupHeading>
            <ul>
              {h.youProvideItems.map((item) => (
                <li
                  key={item}
                  className="border-b border-avanza-dark/10 py-3.5 text-base leading-relaxed text-avanza-dark/85"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="tint" eyebrow={h.howEyebrow} title={h.howTitle}>
        <StepFlow steps={steps} columns={2} />
      </Section>

      {/* Past venues: three real photos, then the roster by region. */}
      <Section
        id="venues"
        eyebrow={h.venuesEyebrow}
        title={h.venuesTitle}
        lead={h.venuesLead}
        aside={<CourseTextLink href="/workshops">{h.venuesLink}</CourseTextLink>}
      >
        <PhotoBand photos={photos} />
        <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <GroupHeading>{h.regionNewJersey}</GroupHeading>
            <ul className="sm:grid sm:grid-cols-2 sm:gap-x-12">
              {HOSTED_LIBRARIES.map((library) => (
                <VenueRow key={library.id} name={library.name} detail={`${library.city}, NJ`} />
              ))}
            </ul>
          </div>
          {HOSTED_ABROAD.map(([country, partners]) => (
            <div key={country}>
              <GroupHeading>{countryName[country]}</GroupHeading>
              <ul>
                {partners.map((partner) => {
                  const showLocalFirst = language === "zh" && Boolean(partner.localName)
                  return (
                    <VenueRow
                      key={partner.id}
                      name={showLocalFirst ? partner.localName! : partner.name}
                      secondaryName={showLocalFirst ? partner.name : partner.localName}
                      meta={partner.localityKey ? localityLabel[partner.localityKey] : undefined}
                    />
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Venues with sessions scheduled, grouped the way the finder groups them. */}
      <Section
        id="calendar"
        tone="tint"
        eyebrow={h.calendarEyebrow}
        title={h.calendarTitle}
        lead={h.calendarLead}
        aside={<CourseTextLink href="/find-a-workshop">{h.calendarLink}</CourseTextLink>}
      >
        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {UPCOMING_LIBRARIES.length > 0 && (
            <div>
              <GroupHeading>{h.regionNewJersey}</GroupHeading>
              <ul>
                {UPCOMING_LIBRARIES.map((library) => (
                  <VenueRow
                    key={library.id}
                    name={library.name}
                    detail={
                      library.sessions
                        ? formatSessionMonths(library.sessions, language)
                        : `${library.city}, NJ`
                    }
                    note={library.tentative ? h.datesPending : undefined}
                  />
                ))}
              </ul>
            </div>
          )}
          {SCHEDULED_ABROAD.map(([country, partners]) => (
            <div key={country}>
              <GroupHeading>{countryName[country]}</GroupHeading>
              <ul>
                {partners.map((partner) => (
                  <VenueRow key={partner.id} name={partner.name} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <SocialProof />

      {/* The request. Left: what to include and the direct address. Right: the form. */}
      <section id="request" className="scroll-mt-24 bg-avanza-dark">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                {h.readyTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/70">{h.requestLead}</p>

              <p className="mt-8 border-b-2 border-[var(--c-accent)] pb-2 text-base font-extrabold text-white">
                {h.includeTitle}
              </p>
              <ul>
                {h.includeItems.map((item) => (
                  <li
                    key={item}
                    className="border-b border-white/15 py-3 text-base leading-relaxed text-white/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-sm text-white/60">
                {h.preferEmail}{" "}
                <a
                  href={CONTACT_MAILTO_HREF}
                  onClick={handleDirectEmailClick}
                  className="font-bold text-white underline decoration-[var(--c-accent)] decoration-2 underline-offset-[6px] transition-all hover:decoration-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-avanza-dark"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
              {emailNotice && (
                <p className="mt-3 text-sm font-semibold text-white/70" aria-live="polite">
                  {emailNotice}
                </p>
              )}
            </div>

            <div>
              <div aria-live="polite" aria-atomic="true">
                {status === "success" && (
                  <div className="rounded-md border-l-2 border-[var(--c-accent)] bg-white/8 px-5 py-4 text-sm font-semibold text-white">
                    {t.hostPage.formSuccess}
                  </div>
                )}
                {status === "error" && errorMessage && (
                  <div className="mb-4 rounded-md border-l-2 border-red-400 bg-red-500/15 px-5 py-4 text-sm font-semibold text-red-200">
                    <p>{errorMessage}</p>
                    {fallbackHref && (
                      <a
                        href={fallbackHref}
                        className="mt-2 inline-flex rounded-md border border-red-300/50 px-4 py-2 text-red-100 transition-colors hover:border-white hover:text-white"
                      >
                        {t.hostPage.formOpenEmailDraft}
                      </a>
                    )}
                  </div>
                )}
              </div>

              {status !== "success" && (
                <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
                  <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
                    <label htmlFor="host-hp-field">{t.hostPage.leaveBlank}</label>
                    <input
                      id="host-hp-field"
                      type="text"
                      name="hp_field"
                      tabIndex={-1}
                      autoComplete="off"
                      data-1p-ignore="true"
                      data-lpignore="true"
                      data-bwignore="true"
                      data-form-type="other"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="host-name" className={labelClass}>
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
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="host-email" className={labelClass}>
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
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label htmlFor="host-venue" className={labelClass}>
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
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label htmlFor="host-message" className={labelClass}>
                      {t.hostPage.messagePlaceholder}
                    </label>
                    <textarea
                      id="host-message"
                      name="message"
                      value={fields.message}
                      onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
                      rows={5}
                      placeholder={t.hostPage.messagePlaceholder}
                      required
                      aria-required="true"
                      maxLength={MAX_MESSAGE_LENGTH}
                      disabled={status === "submitting"}
                      className={cn(inputClass, "resize-none")}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex items-center rounded-md bg-[var(--c-accent)] px-7 py-3.5 text-base font-bold text-avanza-dark transition-colors duration-150 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-avanza-dark disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "submitting" ? t.hostPage.sendingMessage : t.hostPage.sendMessage}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </CourseShell>
  )
}

/* ---------------------------- page-local kit ---------------------------- */

/**
 * A section with a left-aligned heading and one reveal for its body. Tighter
 * than the course kit's CourseSection (py-12/16 and a max-w-6xl column) because
 * this page is a one-sheet, not a course hub.
 */
function Section({
  id,
  tone = "plain",
  eyebrow,
  title,
  lead,
  aside,
  children,
}: {
  id?: string
  tone?: "plain" | "tint"
  eyebrow?: string
  title: string
  lead?: string
  /** Optional link beside the heading, for the page that has the full story. */
  aside?: ReactNode
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24", tone === "tint" ? "bg-[var(--c-tint)]" : "bg-background")}
    >
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div className="max-w-2xl">
            {eyebrow ? (
              <p className="text-sm font-bold text-[var(--c-accent-dark)]">{eyebrow}</p>
            ) : null}
            <h2
              className={cn(
                "text-2xl font-extrabold tracking-tight text-avanza-dark md:text-3xl",
                eyebrow && "mt-2",
              )}
            >
              {title}
            </h2>
            {lead ? (
              <p className="mt-3 text-base leading-relaxed text-avanza-dark/70">{lead}</p>
            ) : null}
          </div>
          {aside ? <div className="shrink-0">{aside}</div> : null}
        </div>
        <FadeIn className="mt-8">{children}</FadeIn>
      </div>
    </section>
  )
}

/** A ruled heading for one group of rows (a region, a column of a list). */
function GroupHeading({ children }: { children: ReactNode }) {
  return (
    <p className="border-b-2 border-[var(--c-accent)] pb-2 text-base font-extrabold text-avanza-dark">
      {children}
    </p>
  )
}

/**
 * One venue on a ruled row. Short facts (a town, a month) sit on the right;
 * longer ones (a district, a name in another script) go under the name so a
 * long venue name is not squeezed into a third of the row.
 */
function VenueRow({
  name,
  secondaryName,
  meta,
  detail,
  note,
}: {
  name: string
  /** The venue's name in its other script, when it has one. */
  secondaryName?: string
  /** A locality line under the name. */
  meta?: string
  detail?: string
  /** A short qualifier under the detail, e.g. that dates are not confirmed. */
  note?: string
}) {
  return (
    <li className="flex items-baseline justify-between gap-6 border-b border-avanza-dark/10 py-3">
      <span className="min-w-0">
        <span className="block font-bold leading-snug text-avanza-dark">{name}</span>
        {secondaryName ? (
          <span className="block text-sm text-avanza-dark/60">{secondaryName}</span>
        ) : null}
        {meta ? <span className="block text-sm text-avanza-dark/60">{meta}</span> : null}
      </span>
      {detail ? (
        <span className="shrink-0 text-right text-sm text-avanza-dark/60">
          {detail}
          {note ? (
            <span className="block text-xs font-semibold text-[var(--c-accent-dark)]">{note}</span>
          ) : null}
        </span>
      ) : null}
    </li>
  )
}
