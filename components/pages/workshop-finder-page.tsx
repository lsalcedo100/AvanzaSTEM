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
  ChevronRight,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"

type Library = {
  id: string
  name: string
  city: string
  zip: string
  lat: number
  lng: number
  status: "active" | "placeholder"
}

const LIBRARIES: Library[] = [
  {
    id: "clifton-main",
    name: "Clifton Public Library",
    city: "Clifton",
    zip: "07011",
    lat: 40.866,
    lng: -74.163,
    status: "active",
  },
  {
    id: "allwood",
    name: "Allwood Branch Library",
    city: "Clifton",
    zip: "07012",
    lat: 40.881,
    lng: -74.181,
    status: "active",
  },
  {
    id: "chathams",
    name: "Library of the Chathams",
    city: "Chatham",
    zip: "07928",
    lat: 40.741,
    lng: -74.384,
    status: "active",
  },
  {
    id: "roseland",
    name: "Roseland Free Public Library",
    city: "Roseland",
    zip: "07068",
    lat: 40.82,
    lng: -74.309,
    status: "active",
  },
  {
    id: "newark",
    name: "Newark area",
    city: "Newark",
    zip: "07102",
    lat: 40.738,
    lng: -74.172,
    status: "placeholder",
  },
  {
    id: "jersey-city",
    name: "Jersey City area",
    city: "Jersey City",
    zip: "07302",
    lat: 40.717,
    lng: -74.043,
    status: "placeholder",
  },
  {
    id: "paterson",
    name: "Paterson area",
    city: "Paterson",
    zip: "07505",
    lat: 40.916,
    lng: -74.171,
    status: "placeholder",
  },
  {
    id: "edison",
    name: "Edison area",
    city: "Edison",
    zip: "08820",
    lat: 40.518,
    lng: -74.412,
    status: "placeholder",
  },
  {
    id: "trenton",
    name: "Trenton area",
    city: "Trenton",
    zip: "08608",
    lat: 40.220,
    lng: -74.760,
    status: "placeholder",
  },
  {
    id: "atlantic-city",
    name: "Atlantic City area",
    city: "Atlantic City",
    zip: "08401",
    lat: 39.364,
    lng: -74.423,
    status: "placeholder",
  },
]

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

export function WorkshopFinderPage() {
  const { t } = useLanguage()
  const [stage, setStage] = useState<"prompt" | "map">("prompt")
  const [zip, setZip] = useState("")
  const [submittedZip, setSubmittedZip] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (stage === "prompt") inputRef.current?.focus()
  }, [stage])

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
    setStage("map")
  }

  const skip = () => {
    setError(null)
    setSubmittedZip(null)
    setStage("map")
  }

  const tryAnother = () => {
    setStage("prompt")
    setActiveId(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const active = sortedLibraries.find((l) => l.id === activeId) ?? null

  return (
    <>
      {stage === "prompt" ? (
        <PromptHero
          t={t}
          zip={zip}
          error={error}
          onZipChange={(v) => {
            const digits = v.replace(/\D/g, "").slice(0, 5)
            setZip(digits)
            if (error) setError(null)
          }}
          onSubmit={onSubmit}
          onSkip={skip}
          inputRef={inputRef}
        />
      ) : (
        <MapView
          t={t}
          libraries={sortedLibraries}
          userLatLng={userLatLng}
          submittedZip={submittedZip}
          activeId={activeId}
          active={active}
          onSelect={setActiveId}
          onTryAnother={tryAnother}
        />
      )}
    </>
  )
}

function PromptHero({
  t,
  zip,
  error,
  onZipChange,
  onSubmit,
  onSkip,
  inputRef,
}: {
  t: ReturnType<typeof useLanguage>["t"]
  zip: string
  error: string | null
  onZipChange: (v: string) => void
  onSubmit: (e: React.FormEvent) => void
  onSkip: () => void
  inputRef: React.RefObject<HTMLInputElement | null>
}) {
  const currentSites = LIBRARIES.filter((lib) => lib.status === "active")

  return (
    <section className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden bg-gradient-to-br from-avanza-teal via-[#1da085] to-avanza-green py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 20%, rgba(255,255,255,0.55) 0 5px, transparent 6px), radial-gradient(circle at 86% 28%, rgba(255,255,255,0.45) 0 4px, transparent 5px), radial-gradient(circle at 22% 78%, rgba(255,255,255,0.4) 0 4px, transparent 5px), radial-gradient(circle at 76% 84%, rgba(255,255,255,0.5) 0 5px, transparent 6px), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0 6px, transparent 7px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto w-full max-w-3xl px-6 text-center">
        <FadeIn>
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-1.5 rounded-full bg-white/25 px-3.5 py-1.5 text-xs font-bold text-avanza-dark backdrop-blur-sm transition-colors hover:bg-white/35"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t.home.finderBackToHome}
          </Link>

          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/35 bg-white/25 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-avanza-dark backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5" />
            {t.home.finderEyebrow}
          </span>

          <h1 className="mt-7 text-balance text-5xl font-extrabold leading-[1.02] text-avanza-dark italic md:text-7xl">
            {t.home.finderHeadline}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-avanza-dark/80 md:text-xl">
            {t.home.finderSubhead}
          </p>

          <p className="mx-auto mt-5 max-w-xl rounded-2xl border border-avanza-dark/20 bg-white/25 px-4 py-3 text-sm font-semibold leading-relaxed text-avanza-dark/80 shadow-[0_12px_35px_-25px_rgba(26,26,46,0.55)] backdrop-blur-sm">
            {t.home.finderCurrentNote}
          </p>

          <p className="mx-auto mt-4 max-w-xl text-sm font-semibold leading-relaxed text-avanza-dark/75">
            Looking for free STEM workshops in New Jersey? Current Avanza STEM library locations
            include Clifton Public Library, Allwood Branch Library, Library of the Chathams,
            and Roseland Free Public Library. Public dates are not scheduled right now, but
            families can check locations here and try{" "}
            <Link href="/projects" className="underline underline-offset-4">
              STEM projects for kids
            </Link>{" "}
            while waiting for the next workshop series.
          </p>

          <form onSubmit={onSubmit} className="mt-10">
            <label htmlFor="finder-zip" className="sr-only">
              {t.home.finderZipLabel}
            </label>
            <div className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-avanza-dark/40"
                />
                <input
                  ref={inputRef}
                  id="finder-zip"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder={t.home.finderZipPlaceholder}
                  value={zip}
                  onChange={(e) => onZipChange(e.target.value)}
                  className="w-full rounded-full bg-white px-14 py-5 text-center text-2xl font-extrabold tracking-[0.4em] text-avanza-dark shadow-[0_18px_50px_-15px_rgba(26,26,46,0.5)] ring-4 ring-white/30 transition-all duration-200 placeholder:tracking-normal placeholder:text-avanza-dark/30 focus:outline-none focus:ring-8 focus:ring-white/40 sm:text-3xl"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "finder-zip-error" : undefined}
                />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-avanza-dark px-8 py-5 text-base font-extrabold text-primary-foreground shadow-[0_18px_50px_-15px_rgba(26,26,46,0.65)] transition-all duration-200 hover:scale-[1.03] hover:bg-foreground sm:text-lg"
              >
                {t.home.finderSubmit}
                <ChevronRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
            {error && (
              <p
                id="finder-zip-error"
                role="alert"
                className="mt-4 text-sm font-bold text-white"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-avanza-orange px-3 py-1 shadow-md">
                  {error}
                </span>
              </p>
            )}
          </form>

          <button
            type="button"
            onClick={onSkip}
            className="mt-8 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/80 transition-colors hover:text-primary-foreground"
          >
            {t.home.finderSkip}
            <ChevronRight className="h-3 w-3" />
          </button>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.16em] text-primary-foreground/75">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" />
              {currentSites.length} {t.home.finderCurrentCount} · New Jersey
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-primary-foreground/40 sm:inline-block" />
            <span>Free, always</span>
            <span className="hidden h-1 w-1 rounded-full bg-primary-foreground/40 sm:inline-block" />
            <span>{t.home.finderLanguageNote}</span>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function MapView({
  t,
  libraries,
  userLatLng,
  submittedZip,
  activeId,
  active,
  onSelect,
  onTryAnother,
}: {
  t: ReturnType<typeof useLanguage>["t"]
  libraries: (Library & { miles?: number })[]
  userLatLng: { lat: number; lng: number } | null
  submittedZip: string | null
  activeId: string | null
  active: (Library & { miles?: number }) | null
  onSelect: (id: string | null) => void
  onTryAnother: () => void
}) {
  const currentSites = libraries.filter((lib) => lib.status === "active")
  const planningAreas = libraries.filter((lib) => lib.status === "placeholder")

  return (
    <>
      {/* Compact context bar */}
      <section className="bg-avanza-dark py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 text-primary-foreground">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-avanza-green/20 text-avanza-green">
              <MapPin className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary-foreground/60">
                {submittedZip ? t.home.finderShowingFor : t.home.finderShowingAll}
              </p>
              <p className="text-lg font-extrabold tracking-tight">
                {submittedZip ? `ZIP ${submittedZip}` : "New Jersey"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onTryAnother}
              className="rounded-full border border-primary-foreground/25 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground/85 transition-colors hover:border-primary-foreground/55 hover:bg-primary-foreground/8"
            >
              {t.home.finderTryAnother}
            </button>
            <Link
              href="/"
              className="rounded-full bg-primary-foreground/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground/85 transition-colors hover:bg-primary-foreground/20"
            >
              {t.home.finderBackToHome}
            </Link>
          </div>
        </div>
      </section>

      {/* Map + side panel */}
      <section className="bg-[#fcfaf3]">
        <div className="grid gap-0 lg:grid-cols-[1.55fr_1fr]">
          <LeafletMap
            libraries={libraries}
            userLatLng={userLatLng}
            activeId={activeId}
            onSelect={onSelect}
            ariaLabel={t.home.finderMapAria}
            loadingLabel={t.home.finderMapLoading}
            errorLabel={t.home.finderMapError}
            legend={{
              active: t.home.finderLegendActive,
              coming: t.home.finderLegendComing,
              you: t.home.finderLegendYou,
            }}
            labels={{
              noUpcomingDate: t.home.finderNoUpcomingDate,
              planningArea: t.home.finderPlanningArea,
              notScheduled: t.home.finderNotScheduled,
            }}
          />

          <div className="flex flex-col gap-4 bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-avanza-green">
                {submittedZip ? t.home.finderResultsTitle : t.home.finderShowingAll}
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {currentSites.length} {t.home.finderCurrentCount} · {planningAreas.length} {t.home.finderPlanningCount}
              </p>
            </div>

            <p className="text-xs text-muted-foreground">
              {t.home.finderSelectMarker}
            </p>
            <p className="text-xs text-avanza-green/80 font-semibold">
              {t.home.finderListNote}
            </p>

            <div className="space-y-6">
              <LocationSection
                title={t.home.finderCurrentSites}
                libraries={currentSites}
                activeId={activeId}
                submittedZip={submittedZip}
                onSelect={onSelect}
                t={t}
              />

              <LocationSection
                title={t.home.finderInterestSites}
                libraries={planningAreas}
                activeId={activeId}
                submittedZip={submittedZip}
                onSelect={onSelect}
                t={t}
              />
            </div>

            <a
              href="mailto:liam@avanzastem.org?subject=Bring%20Avanza%20STEM%20to%20our%20library"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 px-5 py-3 text-sm font-bold text-avanza-dark transition-all duration-200 hover:border-avanza-dark/50 hover:bg-avanza-dark/5"
            >
              {t.home.finderRequestVisit}
              <ArrowUpRight className="h-4 w-4" />
            </a>

            {active && (
              <div className="rounded-2xl bg-avanza-dark p-5 text-primary-foreground shadow-md">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-avanza-green">
                  {active.city}
                </p>
                <p className="mt-1 text-base font-extrabold leading-snug">
                  {active.name}
                </p>
                <p className="mt-1 text-xs text-primary-foreground/70">
                  {t.home.finderZipShort} {active.zip}
                </p>
                {active.status === "active" ? (
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
          </div>
        </div>
      </section>
    </>
  )
}

function LocationSection({
  title,
  libraries,
  activeId,
  submittedZip,
  onSelect,
  t,
}: {
  title: string
  libraries: (Library & { miles?: number })[]
  activeId: string | null
  submittedZip: string | null
  onSelect: (id: string | null) => void
  t: ReturnType<typeof useLanguage>["t"]
}) {
  return (
    <section aria-labelledby={`finder-${title.replace(/\s+/g, "-").toLowerCase()}`}>
      <h2
        id={`finder-${title.replace(/\s+/g, "-").toLowerCase()}`}
        className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-avanza-dark/70"
      >
        {title}
      </h2>

      <ul className="mt-3 space-y-3" aria-label={title}>
        {libraries.map((lib, i) => {
          const isActive = lib.id === activeId
          const isClosest = submittedZip !== null && i === 0
          const isCurrentSite = lib.status === "active"

          return (
            <li key={lib.id}>
              <button
                type="button"
                onClick={() => onSelect(lib.id)}
                aria-pressed={isActive}
                className={`group flex w-full items-start gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
                  isActive
                    ? "border-avanza-green bg-avanza-green/8 shadow-[0_8px_24px_-12px_rgba(46,204,113,0.45)]"
                    : "border-avanza-dark/10 bg-white hover:border-avanza-dark/25 hover:bg-secondary"
                }`}
              >
                <span
                  className={`mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                    isClosest
                      ? "bg-avanza-green text-avanza-dark"
                      : isCurrentSite
                        ? "bg-avanza-orange/15 text-avanza-orange"
                        : "bg-avanza-dark/10 text-avanza-dark/60"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-extrabold leading-snug text-foreground">
                    {lib.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {lib.city}, NJ · {t.home.finderZipShort} {lib.zip}
                  </p>
                  {isCurrentSite ? (
                    <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-avanza-green/10 px-2 py-0.5 text-[11px] font-bold text-avanza-green">
                      <CalendarDays className="h-3 w-3" />
                      {t.home.finderNoUpcomingDate}
                    </p>
                  ) : (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-avanza-dark/5 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-avanza-dark/70">
                        {t.home.finderPlanningArea}
                      </span>
                      <span className="rounded-full bg-avanza-green/10 px-2 py-0.5 text-[11px] font-bold text-avanza-green">
                        {t.home.finderHelpBring}
                      </span>
                    </div>
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

/**
 * Loads Leaflet (JS + CSS) lazily from CDN on mount and renders an
 * interactive OSM map with custom DivIcon library pins. No npm dependency.
 */
function LeafletMap({
  libraries,
  userLatLng,
  activeId,
  onSelect,
  ariaLabel,
  loadingLabel,
  errorLabel,
  legend,
  labels,
}: {
  libraries: (Library & { miles?: number })[]
  userLatLng: { lat: number; lng: number } | null
  activeId: string | null
  onSelect: (id: string | null) => void
  ariaLabel: string
  loadingLabel: string
  errorLabel: string
  legend: { active: string; coming: string; you: string }
  labels: { noUpcomingDate: string; planningArea: string; notScheduled: string }
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<unknown>(null)
  const leafletRef = useRef<unknown>(null)
  const markersRef = useRef<Map<string, unknown>>(new Map())
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
          "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
          {
            attribution:
              '&copy; <a href="https://openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: "abcd",
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

    // Wipe previous markers
    markersRef.current.forEach((m) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(m as any).remove()
    })
    markersRef.current.clear()

    libraries.forEach((lib) => {
      const isActive = lib.id === activeId
      const tone =
        lib.status === "active" ? "#f97316" : "#1a1a2e"
      const html = `
        <div class="afz-pin ${isActive ? "afz-pin--active" : ""}" style="--pin-tone:${tone}">
          <div class="afz-pin__shadow"></div>
          <div class="afz-pin__head">
            <span></span>
          </div>
        </div>`
      const icon = L.divIcon({
        className: "",
        html,
        iconSize: [32, 42],
        iconAnchor: [16, 38],
        popupAnchor: [0, -32],
      })
      const marker = L.marker([lib.lat, lib.lng], {
        icon,
        keyboard: true,
        title: lib.name,
        riseOnHover: true,
      }).addTo(map)
      marker.on("click", () => onSelectRef.current(lib.id))
      marker.on("keypress", (e: { originalEvent: KeyboardEvent }) => {
        if (e.originalEvent.key === "Enter" || e.originalEvent.key === " ") {
          onSelectRef.current(lib.id)
        }
      })
      const popupHtml = `
        <div style="min-width:180px;font-family:inherit">
          <p style="margin:0;font-weight:800;font-size:13px;color:#1a1a2e">${escapeHtml(lib.name)}</p>
          <p style="margin:2px 0 0;font-size:11px;color:#6b7280">${escapeHtml(lib.city)}, NJ &middot; ZIP ${escapeHtml(lib.zip)}</p>
          <p style="margin:6px 0 0;font-size:11px;font-weight:700;color:${lib.status === "active" ? "#2ecc71" : "#1a1a2e"}">${escapeHtml(lib.status === "active" ? labels.noUpcomingDate : labels.planningArea)}</p>
          ${lib.status === "placeholder" ? `<p style="margin:2px 0 0;font-size:11px;color:#6b7280">${escapeHtml(labels.notScheduled)}</p>` : ""}
        </div>`
      marker.bindPopup(popupHtml, {
        closeButton: false,
        offset: [0, -4],
      })
      markersRef.current.set(lib.id, marker)
    })

    // User pin (separate, never selected)
    if (userLatLng) {
      const userIcon = L.divIcon({
        className: "",
        html: `<div class="afz-userpin"><span></span></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      })
      const userMarker = L.marker([userLatLng.lat, userLatLng.lng], {
        icon: userIcon,
        interactive: false,
        keyboard: false,
      }).addTo(map)
      markersRef.current.set("__user", userMarker)
    }

    // Auto-frame: prioritize user → first 3 libs, else fit all
    const targets =
      userLatLng !== null
        ? [userLatLng, ...libraries.slice(0, 3).map((l) => ({ lat: l.lat, lng: l.lng }))]
        : libraries.map((l) => ({ lat: l.lat, lng: l.lng }))
    if (targets.length > 0) {
      const bounds = L.latLngBounds(targets.map((p) => [p.lat, p.lng]))
      map.flyToBounds(bounds, {
        padding: [40, 40],
        maxZoom: userLatLng ? 11 : 9,
        duration: 0.8,
      })
    }
  }, [libraries, userLatLng, activeId, status, labels])

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
      className="afz-map-wrap relative h-[60vh] min-h-[420px] overflow-hidden lg:h-[calc(100vh-80px-72px)]"
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
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-avanza-orange" />
          {legend.active}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-avanza-dark" />
          {legend.coming}
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
