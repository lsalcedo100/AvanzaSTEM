"use client"

import { useMemo, useState } from "react"
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
  type Library,
  type PartnerCountry,
} from "@/features/workshops/locations"
import {
  formatSessionDate,
  nextSession,
  partnerPrimaryName,
  partnerSecondLine,
} from "@/features/workshops/format"
import { regionOfSite, type MapView } from "@/features/workshops/regions"
import { WorkshopFinderMap } from "@/components/pages/workshop-finder-map"


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

export function WorkshopFinderPage() {
  const { t, language } = useLanguage()
  const [zip, setZip] = useState("")
  const [submittedZip, setSubmittedZip] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  /**
   * Which cluster the map is framing. Starts on the inset grid of all three, so
   * the page opens on the full reach rather than on New Jersey alone, and jumps
   * to the relevant cluster as soon as the reader shows local intent.
   */
  const [view, setView] = useState<MapView>("world")

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
    setView("nj")
  }

  const clearZip = () => {
    setZip("")
    setSubmittedZip(null)
    setError(null)
    setActiveId(null)
  }

  /**
   * Picking a venue from the sidebar also frames its cluster: choosing a Lima
   * library should not leave the reader staring at New Jersey. Clicking a pin on
   * the map only selects, since the pin is already in view.
   */
  const selectFromList = (id: string | null) => {
    setActiveId(id)
    if (id) setView(regionOfSite(id))
  }

  const upcomingSites = sortedLibraries.filter((lib) => lib.status === "upcoming")
  const currentSites = sortedLibraries.filter((lib) => lib.status === "active")
  const planningAreas = sortedLibraries.filter((lib) => lib.status === "placeholder")
  const active = sortedLibraries.find((l) => l.id === activeId) ?? null

  /**
   * The map rebuilds its markers when these change, so they are memoised on the
   * translation bundle rather than rebuilt as fresh objects every render.
   */
  const countryNames = useMemo<Record<PartnerCountry, string>>(
    () => ({
      CN: t.home.finderCountryChina,
      EC: t.home.finderCountryEcuador,
      PE: t.home.finderCountryPeru,
      CO: t.home.finderCountryColombia,
      PA: t.home.finderCountryPanama,
      CL: t.home.finderCountryChile,
    }),
    [t],
  )

  const mapLegend = useMemo(
    () => ({
      upcoming: t.home.finderLegendUpcoming,
      active: t.home.finderLegendActive,
      coming: t.home.finderLegendComing,
      scheduled: t.home.finderScheduledBadge,
      you: t.home.finderLegendYou,
    }),
    [t],
  )

  const mapLabels = useMemo(
    () => ({
      noUpcomingDate: t.home.finderNoUpcomingDate,
      planningArea: t.home.finderPlanningArea,
      notScheduled: t.home.finderNotScheduled,
      nextSession: t.home.finderNextSession,
      tentative: t.home.finderTentative,
      scheduled: t.home.finderScheduledBadge,
      hosted: t.home.finderHostedBadge,
      minhang: t.home.finderLocalityMinhang,
    }),
    [t],
  )

  const regionLabels = useMemo(
    () => ({
      world: t.home.finderRegionWorld,
      nj: t.home.finderRegionNewJersey,
      latam: t.home.finderRegionLatinAmerica,
      china: t.home.finderRegionChina,
      tablistAria: t.home.finderRegionTablistAria,
      sites: t.home.finderRegionSites,
      expand: t.home.finderRegionExpand,
    }),
    [t],
  )

  const reachLabels = useMemo(
    () => ({
      countries: t.home.finderReachCountries,
      continents: t.home.finderReachContinents,
      venues: t.home.finderReachVenues,
      planned: t.home.finderReachPlanned,
    }),
    [t],
  )

  // Nearest real venue (upcoming or already-hosted), used for the result chip.
  const nearest = submittedZip
    ? sortedLibraries.find((lib) => lib.status !== "placeholder") ?? null
    : null

  return (
    <div className="bg-avanza-dark">
      {/* Tool header: bold brand band with inline search */}
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
                      aria-label={t.home.wfClearZip}
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

      {/* Tool body: map + results, always visible together */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr]">
        <WorkshopFinderMap
          libraries={sortedLibraries}
          internationalPartners={INTERNATIONAL_PARTNERS}
          userLatLng={userLatLng}
          activeId={activeId}
          onSelect={setActiveId}
          view={view}
          onViewChange={setView}
          language={language}
          ariaLabel={t.home.finderMapAria}
          loadingLabel={t.home.finderMapLoading}
          errorLabel={t.home.finderMapError}
          legend={mapLegend}
          labels={mapLabels}
          countryNames={countryNames}
          regionLabels={regionLabels}
          reachLabels={reachLabels}
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
              onSelect={selectFromList}
              t={t}
              language={language}
            />

            <LocationSection
              title={t.home.finderCurrentSites}
              libraries={currentSites}
              activeId={activeId}
              submittedZip={submittedZip}
              onSelect={selectFromList}
              t={t}
              language={language}
            />

            <LocationSection
              title={t.home.finderInterestSites}
              libraries={planningAreas}
              activeId={activeId}
              submittedZip={submittedZip}
              onSelect={selectFromList}
              t={t}
              language={language}
            />

            <InternationalSection
              t={t}
              language={language}
              activeId={activeId}
              onSelect={selectFromList}
            />
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

const COUNTRY_ORDER: PartnerCountry[] = ["CN", "EC", "PE", "CO", "PA", "CL"]

/**
 * Partner libraries abroad, grouped by country: venues we have already run at
 * are badged as hosted, the rest as scheduled.
 */
function InternationalSection({
  t,
  language,
  activeId,
  onSelect,
}: {
  t: ReturnType<typeof useLanguage>["t"]
  language: string
  activeId: string | null
  onSelect: (id: string | null) => void
}) {
  const countryName: Record<PartnerCountry, string> = {
    CN: t.home.finderCountryChina,
    EC: t.home.finderCountryEcuador,
    PE: t.home.finderCountryPeru,
    CO: t.home.finderCountryColombia,
    PA: t.home.finderCountryPanama,
    CL: t.home.finderCountryChile,
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
                <li key={partner.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(partner.id === activeId ? null : partner.id)}
                    aria-pressed={partner.id === activeId}
                    className={`flex w-full items-start justify-between gap-3 rounded-2xl border-2 p-3.5 text-left transition-all duration-200 ${
                      partner.id === activeId
                        ? "border-avanza-teal bg-avanza-teal/8 shadow-[0_8px_24px_-14px_rgba(20,156,129,0.55)]"
                        : "border-transparent bg-white shadow-[0_1px_0_rgba(26,26,46,0.06)] hover:border-avanza-dark/15 hover:bg-secondary"
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-bold leading-snug text-foreground">
                        {partnerPrimaryName(partner, language)}
                      </span>
                      {partnerSecondLine(partner, language, localityLabel) && (
                        <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
                          {partnerSecondLine(partner, language, localityLabel)}
                        </span>
                      )}
                    </span>
                    <span
                      className={`mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                        partner.status === "hosted"
                          ? "bg-avanza-orange/10 text-avanza-orange"
                          : "bg-avanza-teal/10 text-avanza-teal-dark"
                      }`}
                    >
                      {partner.status === "hosted"
                        ? t.home.finderHostedBadge
                        : t.home.finderScheduledBadge}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
