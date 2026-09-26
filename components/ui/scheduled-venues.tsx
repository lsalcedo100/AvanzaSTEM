"use client"

import type { ReactNode } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import { formatSessionDate, formatSessionMonths } from "@/features/workshops/format"
import type { Language } from "@/i18n/translations"
import type { PartnerCountry } from "@/features/workshops/locations"
import {
  SCHEDULED_ABROAD,
  UPCOMING_LIBRARIES,
  UPCOMING_NJ_SESSIONS,
} from "@/features/workshops/schedule"

/**
 * Venues with sessions scheduled, as a ruled schedule: one full-width row per
 * region, the region on a left rail and its venues on the right. Shown on the
 * Host page and the workshops page from the same data the finder reads. The
 * page around it supplies the heading and the link to the finder.
 */
export function ScheduledVenues() {
  const { t, language } = useLanguage()
  const h = t.hostPage
  const countryName: Record<PartnerCountry, string> = {
    CN: t.home.finderCountryChina,
    EC: t.home.finderCountryEcuador,
    PE: t.home.finderCountryPeru,
    CO: t.home.finderCountryColombia,
    PA: t.home.finderCountryPanama,
    CL: t.home.finderCountryChile,
  }
  const workshopNames = h.workshops.map((workshop) => workshop.name)

  return (
    <div>
      {UPCOMING_LIBRARIES.length > 0 && (
        <CalendarRegion
          label={h.regionNewJersey}
          status={
            UPCOMING_NJ_SESSIONS.length > 0
              ? formatSessionMonths(UPCOMING_NJ_SESSIONS, language)
              : undefined
          }
        >
          <ul>
            {UPCOMING_LIBRARIES.map((library) => (
              <li
                key={library.id}
                className="border-b border-avanza-dark/10 py-3 md:flex md:items-start md:justify-between md:gap-8"
              >
                <div className="min-w-0">
                  <p className="font-bold leading-snug text-avanza-dark">{library.name}</p>
                  <p className="text-sm text-avanza-dark/60">{library.city}, NJ</p>
                </div>
                {library.sessions ? (
                  <SessionDates
                    sessions={library.sessions}
                    workshopNames={workshopNames}
                    pending={library.tentative ? h.datesPending : undefined}
                    language={language}
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </CalendarRegion>
      )}
      {SCHEDULED_ABROAD.map(([country, partners]) => (
        <CalendarRegion key={country} label={countryName[country]} status={h.datesPending}>
          <ul className="sm:grid sm:grid-cols-2 sm:gap-x-12">
            {partners.map((partner) => (
              <li
                key={partner.id}
                className="border-b border-avanza-dark/10 py-3 font-bold leading-snug text-avanza-dark"
              >
                {partner.name}
              </li>
            ))}
          </ul>
        </CalendarRegion>
      ))}
    </div>
  )
}

/**
 * One region of the schedule: its name (and a status line) on a left rail,
 * its venues on the right, under a full-width accent rule.
 */
function CalendarRegion({
  label,
  status,
  children,
}: {
  label: string
  /** A line under the region name: the months scheduled, or that dates are pending. */
  status?: string
  children: ReactNode
}) {
  return (
    <div className="grid gap-x-10 border-t-2 border-avanza-green pb-6 md:grid-cols-[10rem_1fr] lg:grid-cols-[12rem_1fr]">
      <div className="pt-3">
        <p className="text-base font-extrabold text-avanza-dark">{label}</p>
        {status ? <p className="mt-0.5 text-sm text-avanza-dark/60">{status}</p> : null}
      </div>
      <div>{children}</div>
    </div>
  )
}

/**
 * The dates of one scheduled series. When the venue has exactly one date per
 * workshop, each date is labelled with the workshop it hosts, in series order.
 */
function SessionDates({
  sessions,
  workshopNames,
  pending,
  language,
}: {
  sessions: string[]
  workshopNames: string[]
  /** Shown under the dates when they are not yet confirmed with the venue. */
  pending?: string
  language: Language
}) {
  const labelled = sessions.length === workshopNames.length
  return (
    <div className="mt-2 shrink-0 md:mt-0 md:text-right">
      <ol className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
        {sessions.map((iso, i) => (
          <li key={iso}>
            <span className="block text-sm font-bold text-avanza-dark">
              {formatSessionDate(iso, language)}
            </span>
            {labelled ? (
              <span className="block text-xs text-avanza-dark/60">{workshopNames[i]}</span>
            ) : null}
          </li>
        ))}
      </ol>
      {pending ? (
        <p className="mt-1 text-xs font-semibold text-avanza-green-dark">{pending}</p>
      ) : null}
    </div>
  )
}
