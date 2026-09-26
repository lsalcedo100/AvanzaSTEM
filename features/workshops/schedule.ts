/**
 * Venue rosters derived from locations.ts, grouped once here so the Host page,
 * the workshops page, and the finder never have to add a venue in two places.
 */
import {
  INTERNATIONAL_PARTNERS,
  LIBRARIES,
  type InternationalPartner,
  type PartnerCountry,
} from "./locations"

/** Groups partners by country, keeping the data file's order of first appearance. */
export function groupByCountry(
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

/** New Jersey libraries with a series on the calendar. */
export const UPCOMING_LIBRARIES = LIBRARIES.filter((library) => library.status === "upcoming")

/** Every scheduled New Jersey date, earliest first, for a region-level month label. */
export const UPCOMING_NJ_SESSIONS = UPCOMING_LIBRARIES.flatMap(
  (library) => library.sessions ?? [],
).sort()

/** Partner venues abroad with sessions on the way, grouped by country. */
export const SCHEDULED_ABROAD = groupByCountry(
  INTERNATIONAL_PARTNERS.filter((partner) => partner.status === "scheduled"),
)
