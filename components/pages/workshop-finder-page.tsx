"use client"

import "leaflet/dist/leaflet.css"
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Globe,
  MapPin,
  Search,
  X,
} from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import {
  INTERNATIONAL_PARTNERS,
  LIBRARIES,
  type InternationalPartner,
  type Library,
  type PartnerCountry,
} from "@/features/workshops/locations"


const ZIP_PREFIX_LATLNG: Record<string, { lat: number; lng: number }> = {
  "070": { lat: 40.85, lng: -74.15 },
  "071": { lat: 40.93, lng: -74.18 },
  "072": { lat: 40.83, lng: -74.05 },
  "073": { lat: 40.71, lng: -74.07 },
  "074": { lat: 40.95, lng: -74.27 },
  "075": { lat: 41.02, lng: -74.20 },
  "076": { lat: 41.0, lng: -74.05 },
  "077": { lat: 40.66, lng: -74.0 },
  "078": { lat: 40.55, lng: -74.4 },
  "079": { lat: 40.72, lng: -74.27 },
  "080": { lat: 39.9, lng: -75.07 },
  "081": { lat: 39.7, lng: -75.1 },
  "082": { lat: 39.45, lng: -75.05 },
  "083": { lat: 39.4, lng: -74.9 },
  "084": { lat: 39.4, lng: -74.5 },
  "085": { lat: 40.22, lng: -74.76 },
  "086": { lat: 40.22, lng: -74.76 },
  "087": { lat: 40.22, lng: -74.76 },
  "088": { lat: 40.35, lng: -74.07 },
  "089": { lat: 40.5, lng: -74.45 },
}

function haversineMiles(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
) {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const R = 3958.8
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return Math.round(2 * R * Math.asin(Math.sqrt(x)))
}

const NJ_BOUNDS = {
  southWest: { lat: 38.85, lng: -75.65 },
  northEast: { lat: 41.45, lng: -73.85 },
}

/**
 * Web Mercator repeats the world every 360° of longitude. Leaflet only draws a
 * marker on the primary copy, so when the user zooms out and the globe wraps,
 * we add a copy of every marker at each of these longitude offsets to fill the
 * repeated worlds on both sides (enough to cover a wide viewport at min zoom).
 */
const WORLD_COPY_OFFSETS = [-1080, -720, -360, 0, 360, 720, 1080]

const DATE_LOCALES: Record<string, string> = {
  en: "en-US",
  es: "es-ES",
  zh: "zh-CN",
  pt: "pt-BR",
}

/** Parse a YYYY-MM-DD string as local midnight (avoids UTC day-shift). */
function parseISODate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1)
}

function formatSessionDate(iso: string, language: string) {
  return parseISODate(iso).toLocaleDateString(DATE_LOCALES[language] ?? "en-US", {
    month: "short",
    day: "numeric",
  })
}

/** The first session that has not happened yet, or null once the series is done. */
function nextSession(sessions: string[] | undefined) {
  if (!sessions?.length) return null
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  return sessions.find((iso) => parseISODate(iso) >= start) ?? null
}

export function WorkshopFinderPage() {
  const { t, language } = useLanguage()
  const [zip, setZip] = useState("")
  const [submittedZip, setSubmittedZip] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sortedLibraries = useMemo(() => {
    if (!submittedZip) return LIBRARIES.map((lib) => ({ ...lib, miles: undefined as number | undefined }))
    const prefix = submittedZip.slice(0, 3)
    const center = ZIP_PREFIX_LATLNG[prefix] ?? { lat: 40.2, lng: -74.7 }
    return [...LIBRARIES]
      .map((lib) => ({
        ...lib,
        miles: haversineMiles(center, { lat: lib.lat, lng: lib.lng }),
      }))
      .sort((a, b) => (a.miles ?? 0) - (b.miles ?? 0))
  }, [submittedZip])

  const userLatLng = useMemo(() => {
    if (!submittedZip) return null
    return ZIP_PREFIX_LATLNG[submittedZip.slice(0, 3)] ?? null
  }, [submittedZip])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cleaned = zip.trim()
    if (!/^\d{5}$/.test(cleaned)) {
      setError(t.home.finderInvalidZip)
      return
    }
    setError(null)
    setSubmittedZip(cleaned)
    setActiveId(null)
  }

  const clearZip = () => {
    setZip("")
    setSubmittedZip(null)
    setError(null)
    setActiveId(null)
  }

  const upcomingSites = sortedLibraries.filter((lib) => lib.status === "upcoming")
  const currentSites = sortedLibraries.filter((lib) => lib.status === "active")
  const planningAreas = sortedLibraries.filter((lib) => lib.status === "placeholder")
  const active = sortedLibraries.find((l) => l.id === activeId) ?? null

  // Nearest real venue (upcoming or already-hosted), used for the result chip.
  const nearest = submittedZip
    ? sortedLibraries.find((lib) => lib.status !== "placeholder") ?? null
    : null

  return (
    <div className="bg-avanza-dark">
      {/* Tool header — bold brand band with inline search */}
      <header className="relative overflow-hidden bg-gradient-to-br from-avanza-teal via-[#159c81] to-avanza-green">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-avanza-dark/20 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-8 pt-8 sm:pb-10 sm:pt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-avanza-dark/70 transition-colors hover:text-avanza-dark"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t.home.finderBackToHome}
          </Link>

          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-avanza-dark/90 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-avanza-green">
                <MapPin className="h-3.5 w-3.5" />
                {t.home.finderEyebrow}
              </span>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-avanza-dark md:text-5xl">
                {t.home.finderHeadline}
              </h1>
              <p className="mt-3 max-w-md text-base leading-relaxed text-avanza-dark/75">
                {t.home.finderSubhead}
              </p>
            </div>

            {/* Search card */}
            <form
              onSubmit={onSubmit}
              className="w-full max-w-md rounded-3xl bg-white/95 p-4 shadow-[0_24px_60px_-25px_rgba(26,26,46,0.65)] ring-1 ring-white/40 backdrop-blur-sm sm:p-5"
            >
              <label
                htmlFor="finder-zip"
                className="block text-[11px] font-extrabold uppercase tracking-[0.16em] text-avanza-dark/60"
              >
                {t.home.finderZipLabel}
              </label>
              <div className="mt-2 flex gap-2">
                <div className="relative flex-1">
                  <Search
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-avanza-dark/35"
                  />
                  <input
                    id="finder-zip"
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    placeholder={t.home.finderZipPlaceholder}
                    value={zip}
                    onChange={(e) => {
                      setZip(e.target.value.replace(/\D/g, "").slice(0, 5))
                      if (error) setError(null)
                    }}
                    className="w-full rounded-2xl border-2 border-avanza-dark/10 bg-secondary py-3.5 pl-11 pr-9 text-lg font-bold tracking-[0.18em] text-avanza-dark transition-colors placeholder:tracking-normal placeholder:font-medium placeholder:text-avanza-dark/30 focus:border-avanza-teal focus:bg-white focus:outline-none"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "finder-zip-error" : undefined}
                  />
                  {zip && (
                    <button
                      type="button"
                      onClick={clearZip}
                      aria-label="Clear"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-avanza-dark/40 transition-colors hover:bg-avanza-dark/5 hover:text-avanza-dark"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="shrink-0 rounded-2xl bg-avanza-dark px-5 py-3.5 text-sm font-extrabold text-primary-foreground transition-all duration-200 hover:scale-[1.02] hover:bg-foreground"
                >
                  {t.home.finderSubmit}
                </button>
              </div>
              {error ? (
                <p
                  id="finder-zip-error"
                  role="alert"
                  className="mt-2.5 text-xs font-bold text-avanza-orange"
                >
                  {error}
                </p>
              ) : (
                <p className="mt-2.5 text-xs font-medium text-avanza-dark/55">
                  {upcomingSites.length} {t.home.finderUpcomingCount} · {currentSites.length}{" "}
                  {t.home.finderCurrentCount} · {t.home.finderFreeAlways}
                </p>
              )}
            </form>
          </div>

          {nearest && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-avanza-dark/90 px-4 py-2 text-sm font-bold text-primary-foreground">
              <span className="text-avanza-green">{t.home.finderResultsTitle}:</span>
              {nearest.name}
              {typeof nearest.miles === "number" && (
                <span className="text-primary-foreground/60">
                  · {nearest.miles} {t.home.finderMiles}
                </span>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Tool body — map + results, always visible together */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr]">
        <LeafletMap
          libraries={sortedLibraries}
          internationalPartners={INTERNATIONAL_PARTNERS}
          userLatLng={userLatLng}
          activeId={activeId}
          onSelect={setActiveId}
          language={language}
          ariaLabel={t.home.finderMapAria}
          loadingLabel={t.home.finderMapLoading}
          errorLabel={t.home.finderMapError}
          legend={{
            upcoming: t.home.finderLegendUpcoming,
            active: t.home.finderLegendActive,
            coming: t.home.finderLegendComing,
            planned: t.home.finderPlannedBadge,
            you: t.home.finderLegendYou,
          }}
          labels={{
            noUpcomingDate: t.home.finderNoUpcomingDate,
            planningArea: t.home.finderPlanningArea,
            notScheduled: t.home.finderNotScheduled,
            nextSession: t.home.finderNextSession,
            tentative: t.home.finderTentative,
            planned: t.home.finderPlannedBadge,
            hosted: t.home.finderHostedBadge,
            minhang: t.home.finderLocalityMinhang,
          }}
          countryNames={{
            CN: t.home.finderCountryChina,
            EC: t.home.finderCountryEcuador,
            PE: t.home.finderCountryPeru,
            CO: t.home.finderCountryColombia,
          }}
        />

        <aside className="flex max-h-[calc(100vh-80px)] flex-col overflow-y-auto bg-[#fcfaf3] p-6 sm:p-7">
          <p className="text-xs leading-relaxed text-avanza-dark/60">
            {t.home.finderSelectMarker}
          </p>

          <div className="mt-6 space-y-7">
            <LocationSection
              title={t.home.finderUpcomingSites}
              libraries={upcomingSites}
              activeId={activeId}
              submittedZip={submittedZip}
              onSelect={setActiveId}
              t={t}
              language={language}
            />

            <LocationSection
              title={t.home.finderCurrentSites}
              libraries={currentSites}
              activeId={activeId}
              submittedZip={submittedZip}
              onSelect={setActiveId}
              t={t}
              language={language}
            />

            <LocationSection
              title={t.home.finderInterestSites}
              libraries={planningAreas}
              activeId={activeId}
              submittedZip={submittedZip}
              onSelect={setActiveId}
              t={t}
              language={language}
            />

            <InternationalSection t={t} language={language} />
          </div>

          {active && (
            <div className="mt-6 rounded-2xl bg-avanza-dark p-5 text-primary-foreground shadow-md">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-avanza-green">
                {active.city}
              </p>
              <p className="mt-1 text-base font-extrabold leading-snug">{active.name}</p>
              <p className="mt-1 text-xs text-primary-foreground/70">
                {t.home.finderZipShort} {active.zip}
              </p>
              {active.status === "upcoming" ? (
                <div className="mt-3 space-y-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-avanza-purple/25 px-2.5 py-1 text-[11px] font-bold text-white">
                      <CalendarDays className="h-3 w-3" />
                      {t.home.finderSeriesNote}
                    </span>
                    {active.tentative && (
                      <span className="rounded-full bg-avanza-orange/25 px-2.5 py-1 text-[11px] font-bold text-white">
                        {t.home.finderTentative}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-primary-foreground/60">
                      {t.home.finderSessionsHeading}
                    </p>
                    <ul className="mt-1 flex flex-wrap gap-1.5">
                      {active.sessions?.map((iso) => {
                        const isNext = iso === nextSession(active.sessions)
                        return (
                          <li
                            key={iso}
                            className={`rounded-lg px-2 py-1 text-[11px] font-bold ${
                              isNext
                                ? "bg-avanza-green text-avanza-dark"
                                : "bg-white/10 text-primary-foreground/80"
                            }`}
                          >
                            {formatSessionDate(iso, language)}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              ) : active.status === "active" ? (
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold">
                  <CalendarDays className="h-3 w-3" />
                  {t.home.finderNoUpcomingDate}
                </p>
              ) : (
                <div className="mt-3 space-y-1.5">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-primary-foreground/70">
                    {t.home.finderPlanningArea}
                  </p>
                  <p className="text-xs text-primary-foreground/70">
                    {t.home.finderNotScheduled}
                  </p>
                </div>
              )}
              {typeof active.miles === "number" && (
                <p className="mt-3 text-xs text-primary-foreground/70">
                  {t.home.finderDistance}: {active.miles} {t.home.finderMiles}
                </p>
              )}
            </div>
          )}

          <a
            href="mailto:liam@avanzastem.org?subject=Bring%20Avanza%20STEM%20to%20our%20library"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-avanza-green px-5 py-3.5 text-sm font-extrabold text-avanza-dark transition-all duration-200 hover:scale-[1.02] hover:bg-avanza-green/90"
          >
            {t.home.finderRequestVisit}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </aside>
      </div>
    </div>
  )
}

function LocationSection({
  title,
  libraries,
  activeId,
  submittedZip,
  onSelect,
  t,
  language,
}: {
  title: string
  libraries: (Library & { miles?: number })[]
  activeId: string | null
  submittedZip: string | null
  onSelect: (id: string | null) => void
  t: ReturnType<typeof useLanguage>["t"]
  language: string
}) {
  if (libraries.length === 0) return null

  return (
    <section aria-labelledby={`finder-${title.replace(/\s+/g, "-").toLowerCase()}`}>
      <h2
        id={`finder-${title.replace(/\s+/g, "-").toLowerCase()}`}
        className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-avanza-dark/50"
      >
        {title}
      </h2>

      <ul className="mt-3 space-y-2.5" aria-label={title}>
        {libraries.map((lib, i) => {
          const isActive = lib.id === activeId
          const isClosest = submittedZip !== null && lib.status !== "placeholder" && i === 0
          const isUpcoming = lib.status === "upcoming"
          const isCurrentSite = lib.status === "active"
          const upcomingNext = isUpcoming ? nextSession(lib.sessions) : null

          return (
            <li key={lib.id}>
              <button
                type="button"
                onClick={() => onSelect(isActive ? null : lib.id)}
                aria-pressed={isActive}
                className={`group flex w-full items-start gap-3.5 rounded-2xl border-2 p-3.5 text-left transition-all duration-200 ${
                  isActive
                    ? "border-avanza-teal bg-avanza-teal/8 shadow-[0_8px_24px_-14px_rgba(20,156,129,0.55)]"
                    : "border-transparent bg-white shadow-[0_1px_0_rgba(26,26,46,0.06)] hover:border-avanza-dark/15 hover:bg-secondary"
                }`}
              >
                <span
                  className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                    isClosest
                      ? "bg-avanza-green text-avanza-dark"
                      : isUpcoming
                        ? "bg-avanza-purple/15 text-avanza-purple"
                        : isCurrentSite
                          ? "bg-avanza-orange/15 text-avanza-orange"
                          : "bg-avanza-dark/8 text-avanza-dark/55"
                  }`}
                >
                  {lib.status === "placeholder" ? "•" : i + 1}
                </span>
                <div className="flex-1">
                  <p className="flex items-center gap-2 text-sm font-extrabold leading-snug text-foreground">
                    {lib.name}
                    {isUpcoming && lib.tentative && (
                      <span className="rounded bg-avanza-orange/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-avanza-orange-dark">
                        {t.home.finderTentative}
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {lib.city}, NJ · {t.home.finderZipShort} {lib.zip}
                  </p>
                  {isUpcoming ? (
                    <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-avanza-purple/10 px-2 py-0.5 text-[11px] font-bold text-avanza-purple-dark">
                      <CalendarDays className="h-3 w-3" />
                      {upcomingNext
                        ? `${t.home.finderNextSession}: ${formatSessionDate(upcomingNext, language)}`
                        : t.home.finderSeriesNote}
                    </p>
                  ) : isCurrentSite ? (
                    <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-avanza-green/10 px-2 py-0.5 text-[11px] font-bold text-avanza-green">
                      <CalendarDays className="h-3 w-3" />
                      {t.home.finderNoUpcomingDate}
                    </p>
                  ) : (
                    <span className="mt-2 inline-block rounded-full bg-avanza-dark/5 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-avanza-dark/60">
                      {t.home.finderHelpBring}
                    </span>
                  )}
                </div>
                {typeof lib.miles === "number" && (
                  <span className="shrink-0 rounded-full bg-avanza-dark/5 px-2.5 py-1 text-[11px] font-bold text-avanza-dark">
                    {lib.miles} {t.home.finderMiles}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

const COUNTRY_ORDER: PartnerCountry[] = ["CN", "EC", "PE", "CO"]

/**
 * Venues abroad carry both an English name and one in their own script. Readers
 * of that script get the local name first; everyone else gets the English one.
 */
function partnerPrimaryName(partner: InternationalPartner, language: string) {
  return language === "zh" && partner.localName ? partner.localName : partner.name
}

/** The name not used as the headline, plus the district line, if either exists. */
function partnerSecondLine(
  partner: InternationalPartner,
  language: string,
  localityLabel: Record<"minhang", string>,
) {
  const otherName =
    language === "zh" ? partner.name : partner.localName
  const locality = partner.localityKey ? localityLabel[partner.localityKey] : null
  return [otherName, locality].filter(Boolean).join(" · ")
}

/**
 * Partner libraries abroad, grouped by country: venues we have already run at
 * are badged as hosted, the rest as planning conversations.
 */
function InternationalSection({
  t,
  language,
}: {
  t: ReturnType<typeof useLanguage>["t"]
  language: string
}) {
  const countryName: Record<PartnerCountry, string> = {
    CN: t.home.finderCountryChina,
    EC: t.home.finderCountryEcuador,
    PE: t.home.finderCountryPeru,
    CO: t.home.finderCountryColombia,
  }

  const localityLabel = { minhang: t.home.finderLocalityMinhang }

  const groups = COUNTRY_ORDER.map((code) => ({
    code,
    name: countryName[code],
    partners: INTERNATIONAL_PARTNERS.filter((p) => p.country === code),
  })).filter((g) => g.partners.length > 0)

  if (groups.length === 0) return null

  return (
    <section aria-labelledby="finder-international">
      <div className="flex items-center gap-2">
        <Globe className="h-3.5 w-3.5 text-avanza-teal" />
        <h2
          id="finder-international"
          className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-avanza-dark/50"
        >
          {t.home.finderInternationalTitle}
        </h2>
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
        {t.home.finderInternationalNote}
      </p>

      <div className="mt-3 space-y-4">
        {groups.map((group) => (
          <div key={group.code}>
            <p className="text-[11px] font-bold uppercase tracking-wide text-avanza-dark/45">
              {group.name}
            </p>
            <ul className="mt-2 space-y-2">
              {group.partners.map((partner) => (
                <li
                  key={partner.id}
                  className="flex items-start justify-between gap-3 rounded-2xl border-2 border-transparent bg-white p-3.5 shadow-[0_1px_0_rgba(26,26,46,0.06)]"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold leading-snug text-foreground">
                      {partnerPrimaryName(partner, language)}
                    </p>
                    {partnerSecondLine(partner, language, localityLabel) && (
                      <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                        {partnerSecondLine(partner, language, localityLabel)}
                      </p>
                    )}
                  </div>
                  <span
                    className={`mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                      partner.status === "hosted"
                        ? "bg-avanza-orange/10 text-avanza-orange"
                        : "bg-avanza-teal/10 text-avanza-teal-dark"
                    }`}
                  >
                    {partner.status === "hosted"
                      ? t.home.finderHostedBadge
                      : t.home.finderPlannedBadge}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

/**
 * Loads Leaflet lazily on mount and renders an interactive OpenStreetMap with
 * custom DivIcon library pins. Uses OSM's standard tiles, which need no API key
 * (the previous CARTO basemap stamped "API KEY REQUIRED" across every tile).
 */
function LeafletMap({
  libraries,
  internationalPartners,
  userLatLng,
  activeId,
  onSelect,
  language,
  ariaLabel,
  loadingLabel,
  errorLabel,
  legend,
  labels,
  countryNames,
}: {
  libraries: (Library & { miles?: number })[]
  internationalPartners: InternationalPartner[]
  userLatLng: { lat: number; lng: number } | null
  activeId: string | null
  onSelect: (id: string | null) => void
  language: string
  ariaLabel: string
  loadingLabel: string
  errorLabel: string
  legend: {
    upcoming: string
    active: string
    coming: string
    planned: string
    you: string
  }
  labels: {
    noUpcomingDate: string
    planningArea: string
    notScheduled: string
    nextSession: string
    tentative: string
    planned: string
    hosted: string
    minhang: string
  }
  countryNames: Record<PartnerCountry, string>
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<unknown>(null)
  const leafletRef = useRef<unknown>(null)
  // id -> the primary (offset 0) marker, used to open the active popup.
  const markersRef = useRef<Map<string, unknown>>(new Map())
  // Every leaflet marker currently on the map, including wrapped-world copies,
  // international pins and the user pin. Held flat so we can clear them all.
  const allMarkersRef = useRef<unknown[]>([])
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  // Stable callback for marker clicks so it sees fresh `onSelect`.
  const onSelectRef = useRef(onSelect)
  useEffect(() => {
    onSelectRef.current = onSelect
  }, [onSelect])

  // One-time Leaflet load + map init. Re-running this would tear down the map.
  useEffect(() => {
    let cancelled = false
    const markers = markersRef.current

    import("leaflet")
      .then((mod) => {
        if (cancelled || !containerRef.current) return
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Lx = mod as any
        leafletRef.current = Lx

        const map = Lx
          .map(containerRef.current, {
            center: [40.05, -74.5],
            zoom: 8,
            scrollWheelZoom: false,
            zoomSnap: 0.5,
            attributionControl: true,
          })
          .fitBounds([
            [NJ_BOUNDS.southWest.lat, NJ_BOUNDS.southWest.lng],
            [NJ_BOUNDS.northEast.lat, NJ_BOUNDS.northEast.lng],
          ], { padding: [16, 16] })

        Lx.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          },
        ).addTo(map)

        mapRef.current = map
        setStatus("ready")
      })
      .catch(() => {
        if (!cancelled) setStatus("error")
      })

    return () => {
      cancelled = true
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const m = mapRef.current as any
      if (m) {
        m.remove()
        mapRef.current = null
      }
      markers.clear()
    }
  }, [])

  // Render / re-render markers whenever the library list or selection changes.
  useEffect(() => {
    if (status !== "ready") return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const L = leafletRef.current as any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map = mapRef.current as any
    if (!L || !map) return

    // Wipe previous markers (primaries + every wrapped-world copy).
    allMarkersRef.current.forEach((m) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(m as any).remove()
    })
    allMarkersRef.current = []
    markersRef.current.clear()

    // Add a marker at every world-copy offset; return the primary (offset 0).
    const addWrapped = (
      lat: number,
      lng: number,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      icon: any,
      opts: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        markerOptions?: Record<string, any>
        onClick?: () => void
        popupHtml?: string
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): any => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let primary: any = null
      WORLD_COPY_OFFSETS.forEach((offset) => {
        const marker = L.marker([lat, lng + offset], {
          icon,
          ...opts.markerOptions,
        }).addTo(map)
        if (opts.onClick) {
          marker.on("click", opts.onClick)
          marker.on("keypress", (e: { originalEvent: KeyboardEvent }) => {
            if (e.originalEvent.key === "Enter" || e.originalEvent.key === " ") {
              opts.onClick?.()
            }
          })
        }
        if (opts.popupHtml) {
          marker.bindPopup(opts.popupHtml, { closeButton: false, offset: [0, -4] })
        }
        allMarkersRef.current.push(marker)
        if (offset === 0) primary = marker
      })
      return primary
    }

    const pinHtml = (tone: string, active: boolean) => `
        <div class="afz-pin ${active ? "afz-pin--active" : ""}" style="--pin-tone:${tone}">
          <div class="afz-pin__shadow"></div>
          <div class="afz-pin__head">
            <span></span>
          </div>
        </div>`

    libraries.forEach((lib) => {
      const isActive = lib.id === activeId
      const tone =
        lib.status === "upcoming"
          ? "#8b5cf6"
          : lib.status === "active"
            ? "#f97316"
            : "#1a1a2e"
      const icon = L.divIcon({
        className: "",
        html: pinHtml(tone, isActive),
        iconSize: [32, 42],
        iconAnchor: [16, 38],
        popupAnchor: [0, -32],
      })
      const upcomingNext = lib.status === "upcoming" ? nextSession(lib.sessions) : null
      const statusLine =
        lib.status === "upcoming"
          ? {
              color: "#6d28d9",
              text: upcomingNext
                ? `${labels.nextSession}: ${formatSessionDate(upcomingNext, language)}${lib.tentative ? ` (${labels.tentative})` : ""}`
                : labels.tentative,
            }
          : lib.status === "active"
            ? { color: "#2ecc71", text: labels.noUpcomingDate }
            : { color: "#1a1a2e", text: labels.planningArea }
      const popupHtml = `
        <div style="min-width:180px;font-family:inherit">
          <p style="margin:0;font-weight:800;font-size:13px;color:#1a1a2e">${escapeHtml(lib.name)}</p>
          <p style="margin:2px 0 0;font-size:11px;color:#6b7280">${escapeHtml(lib.city)}, NJ &middot; ZIP ${escapeHtml(lib.zip)}</p>
          <p style="margin:6px 0 0;font-size:11px;font-weight:700;color:${statusLine.color}">${escapeHtml(statusLine.text)}</p>
          ${lib.status === "placeholder" ? `<p style="margin:2px 0 0;font-size:11px;color:#6b7280">${escapeHtml(labels.notScheduled)}</p>` : ""}
        </div>`
      const primary = addWrapped(lib.lat, lib.lng, icon, {
        markerOptions: { keyboard: true, title: lib.name, riseOnHover: true },
        onClick: () => onSelectRef.current(lib.id),
        popupHtml,
      })
      markersRef.current.set(lib.id, primary)
    })

    // International partners — not part of the NJ selection flow. Hosted venues
    // share the orange tone of the NJ venues we have run at; planning
    // conversations stay teal.
    internationalPartners.forEach((partner) => {
      const hosted = partner.status === "hosted"
      const icon = L.divIcon({
        className: "",
        html: pinHtml(hosted ? "#f97316" : "#1abc9c", false),
        iconSize: [32, 42],
        iconAnchor: [16, 38],
        popupAnchor: [0, -32],
      })
      const headline = partnerPrimaryName(partner, language)
      const place = [
        partnerSecondLine(partner, language, { minhang: labels.minhang }),
        countryNames[partner.country],
      ]
        .filter(Boolean)
        .join(" · ")
      const popupHtml = `
        <div style="min-width:180px;font-family:inherit">
          <p style="margin:0;font-weight:800;font-size:13px;color:#1a1a2e">${escapeHtml(headline)}</p>
          <p style="margin:2px 0 0;font-size:11px;color:#6b7280">${escapeHtml(place)}</p>
          <p style="margin:6px 0 0;font-size:11px;font-weight:700;color:${hosted ? "#c2410c" : "#0f766e"}">${escapeHtml(hosted ? labels.hosted : labels.planned)}</p>
        </div>`
      addWrapped(partner.lat, partner.lng, icon, {
        markerOptions: { title: headline, riseOnHover: true },
        popupHtml,
      })
    })

    // User pin (separate, never selected)
    if (userLatLng) {
      const userIcon = L.divIcon({
        className: "",
        html: `<div class="afz-userpin"><span></span></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      })
      addWrapped(userLatLng.lat, userLatLng.lng, userIcon, {
        markerOptions: { interactive: false, keyboard: false },
      })
    }
  }, [
    libraries,
    internationalPartners,
    userLatLng,
    activeId,
    status,
    labels,
    language,
    countryNames,
  ])

  // Auto-frame the New Jersey venues (or the user's area). Kept separate from
  // marker rendering so selecting a pin does not yank the view back — important
  // once the user has zoomed out to see the international partners.
  useEffect(() => {
    if (status !== "ready") return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const L = leafletRef.current as any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map = mapRef.current as any
    if (!L || !map) return

    const targets =
      userLatLng !== null
        ? [userLatLng, ...libraries.slice(0, 3).map((l) => ({ lat: l.lat, lng: l.lng }))]
        : libraries.map((l) => ({ lat: l.lat, lng: l.lng }))
    if (targets.length === 0) return

    const bounds = L.latLngBounds(targets.map((p) => [p.lat, p.lng]))
    map.flyToBounds(bounds, {
      padding: [40, 40],
      maxZoom: userLatLng ? 11 : 9,
      duration: 0.8,
    })
  }, [libraries, userLatLng, status])

  // Open popup of the active marker
  useEffect(() => {
    if (status !== "ready" || !activeId) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const marker = markersRef.current.get(activeId) as any
    if (marker) {
      marker.openPopup()
    }
  }, [activeId, status])

  return (
    <div
      className="afz-map-wrap relative h-[45vh] min-h-[360px] overflow-hidden lg:h-[calc(100vh-80px)]"
      style={{ isolation: "isolate" }}
    >
      <div
        ref={containerRef}
        role="application"
        aria-label={ariaLabel}
        className="absolute inset-0 h-full w-full bg-[#e9eef2]"
      />
      {status === "loading" && <MapOverlay label={loadingLabel} />}
      {status === "error" && (
        <MapOverlay label={errorLabel} tone="error" />
      )}

      {/* Legend */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-5 flex flex-wrap items-center gap-3 rounded-full bg-white/95 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground shadow-md backdrop-blur-sm">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-avanza-purple" />
          {legend.upcoming}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-avanza-orange" />
          {legend.active}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-avanza-dark" />
          {legend.coming}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-avanza-teal" />
          {legend.planned}
        </span>
        {userLatLng && (
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-avanza-green" />
            {legend.you}
          </span>
        )}
      </div>

      {/* Custom marker styles - injected once. */}
      <PinStyles />
    </div>
  )
}

function MapOverlay({
  label,
  tone = "neutral",
}: {
  label: string
  tone?: "neutral" | "error"
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center ${
        tone === "error" ? "bg-white/95" : "bg-white/85"
      } backdrop-blur-sm`}
    >
      <div className="flex flex-col items-center gap-3 text-sm font-bold text-avanza-dark">
        {tone === "neutral" && (
          <span className="inline-flex h-3 w-3 animate-ping rounded-full bg-avanza-green" />
        )}
        {label}
      </div>
    </div>
  )
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    c === "&"
      ? "&amp;"
      : c === "<"
        ? "&lt;"
        : c === ">"
          ? "&gt;"
          : c === '"'
            ? "&quot;"
            : "&#39;",
  )
}

/** Inline style block - keeps the pin DOM markup self-contained. */
function PinStyles() {
  return (
    <style>{`
      .afz-pin {
        position: relative;
        width: 32px;
        height: 42px;
        cursor: pointer;
        transform-origin: 50% 100%;
        transition: transform 200ms ease;
      }
      .afz-pin:hover { transform: translateY(-2px) scale(1.05); }
      .afz-pin__head {
        position: absolute;
        inset: 0 0 6px 0;
        background: var(--pin-tone, #f97316);
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 4px 10px -3px rgba(26,26,46,0.5);
        border: 2.5px solid white;
      }
      .afz-pin__head span {
        position: absolute;
        top: 50%; left: 50%;
        width: 8px; height: 8px;
        border-radius: 50%;
        background: white;
        transform: translate(-50%, -50%);
      }
      .afz-pin__shadow {
        position: absolute;
        bottom: 0; left: 50%;
        width: 12px; height: 4px;
        background: rgba(26,26,46,0.25);
        border-radius: 50%;
        filter: blur(1px);
        transform: translateX(-50%);
      }
      .afz-pin--active .afz-pin__head {
        animation: afz-pulse 1.4s ease-in-out infinite;
      }
      .afz-pin--active::after {
        content: '';
        position: absolute;
        bottom: 0; left: 50%;
        width: 38px; height: 38px;
        border-radius: 50%;
        border: 2px solid var(--pin-tone, #f97316);
        opacity: 0.6;
        transform: translate(-50%, 25%);
        animation: afz-ring 1.4s ease-out infinite;
      }
      @keyframes afz-pulse {
        0%, 100% { transform: rotate(-45deg) scale(1); }
        50% { transform: rotate(-45deg) scale(1.1); }
      }
      @keyframes afz-ring {
        0% { opacity: 0.6; transform: translate(-50%, 25%) scale(0.6); }
        100% { opacity: 0; transform: translate(-50%, 25%) scale(1.4); }
      }
      .afz-userpin {
        position: relative;
        width: 22px; height: 22px;
      }
      .afz-userpin span {
        position: absolute;
        inset: 0;
        background: #2ecc71;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 0 0 0 rgba(46,204,113,0.5);
        animation: afz-user 1.6s ease-out infinite;
      }
      @keyframes afz-user {
        0% { box-shadow: 0 0 0 0 rgba(46,204,113,0.5); }
        70% { box-shadow: 0 0 0 14px rgba(46,204,113,0); }
        100% { box-shadow: 0 0 0 0 rgba(46,204,113,0); }
      }
      @media (prefers-reduced-motion: reduce) {
        .afz-pin--active .afz-pin__head,
        .afz-pin--active::after,
        .afz-userpin span { animation: none !important; }
      }
      /* Polish leaflet popup so it matches the brand */
      .afz-map-wrap .leaflet-popup-content-wrapper {
        border-radius: 12px !important;
        box-shadow: 0 18px 40px -18px rgba(26,26,46,0.4) !important;
      }
      .afz-map-wrap .leaflet-popup-tip { box-shadow: none !important; }
      /* Clamp Leaflet's stacking inside our wrapper so map panes / controls /
         popups can never escape and overlap the navbar (z-50) or page text. */
      .afz-map-wrap .leaflet-pane,
      .afz-map-wrap .leaflet-tile,
      .afz-map-wrap .leaflet-marker-icon,
      .afz-map-wrap .leaflet-marker-shadow,
      .afz-map-wrap .leaflet-tile-container,
      .afz-map-wrap .leaflet-pane > svg,
      .afz-map-wrap .leaflet-pane > canvas,
      .afz-map-wrap .leaflet-zoom-box,
      .afz-map-wrap .leaflet-image-layer,
      .afz-map-wrap .leaflet-layer { z-index: 1; }
      .afz-map-wrap .leaflet-overlay-pane,
      .afz-map-wrap .leaflet-shadow-pane { z-index: 2; }
      .afz-map-wrap .leaflet-marker-pane { z-index: 3; }
      .afz-map-wrap .leaflet-tooltip-pane { z-index: 4; }
      .afz-map-wrap .leaflet-popup-pane { z-index: 5; }
      .afz-map-wrap .leaflet-top,
      .afz-map-wrap .leaflet-bottom { z-index: 6; }
    `}</style>
  )
}
