/**
 * Geographic regions for the workshop finder map.
 *
 * The venues sit in three clusters (northern New Jersey, Latin America from
 * Panama down to southern Chile, and one district of Shanghai) separated by two
 * oceans. Framing all of them in a single Web Mercator view means ~200° of
 * longitude, which at the map column's portrait aspect ratio is mostly empty
 * water: the reach reads as three specks rather than as three continents.
 *
 * So the finder frames one cluster at a time, and its "worldwide" view lays the
 * three clusters out as inset panels side by side (the device a US map uses for
 * Alaska and Hawaii). Bounds are derived from the coordinates rather than
 * hard-coded so they stay correct as venues are added.
 */
import {
  INTERNATIONAL_PARTNERS,
  LIBRARIES,
  type PartnerCountry,
} from "./locations"

export type MapRegionId = "nj" | "latam" | "china"

/** What the map is currently showing: one cluster, or the inset grid of all. */
export type MapView = MapRegionId | "world"

export type LatLngBounds = {
  south: number
  west: number
  north: number
  east: number
}

type Point = { lat: number; lng: number }

/**
 * A box around `points`, grown by `pad` on each side and never narrower than
 * `minSpan` degrees. The minimum matters for Shanghai, whose two venues are
 * ~5km apart: without it the fit would land at street level with no context.
 */
function boundsOf(
  points: Point[],
  { pad = 0.18, minSpan = 0.3 }: { pad?: number; minSpan?: number } = {},
): LatLngBounds {
  const grow = (lo: number, hi: number): [number, number] => {
    const target = Math.max((hi - lo) * (1 + pad * 2), minSpan)
    const mid = (lo + hi) / 2
    return [mid - target / 2, mid + target / 2]
  }
  const [south, north] = grow(
    Math.min(...points.map((p) => p.lat)),
    Math.max(...points.map((p) => p.lat)),
  )
  const [west, east] = grow(
    Math.min(...points.map((p) => p.lng)),
    Math.max(...points.map((p) => p.lng)),
  )
  return { south, west, north, east }
}

const LATAM_COUNTRIES: PartnerCountry[] = ["EC", "PE", "CO", "PA", "CL"]

const njPoints = LIBRARIES.map((l) => ({ lat: l.lat, lng: l.lng }))
const latamPoints = INTERNATIONAL_PARTNERS.filter((p) =>
  LATAM_COUNTRIES.includes(p.country),
).map((p) => ({ lat: p.lat, lng: p.lng }))
const chinaPoints = INTERNATIONAL_PARTNERS.filter(
  (p) => p.country === "CN",
).map((p) => ({ lat: p.lat, lng: p.lng }))

export type MapRegion = {
  id: MapRegionId
  bounds: LatLngBounds
  /** Every pin plotted in this region, planning areas included. */
  siteCount: number
  /** Venues that have hosted, or have a session on the calendar. */
  venueCount: number
  /**
   * How tight a zoom the region is allowed to reach when it fills the map. New
   * Jersey can go to street level; the two overseas clusters stop at a city
   * view so the surrounding country stays legible.
   */
  maxZoom: number
}

/** Ordered as the tabs read: home turf first, then the reach outward. */
export const MAP_REGIONS: MapRegion[] = [
  {
    id: "nj",
    bounds: boundsOf(njPoints),
    siteCount: LIBRARIES.length,
    venueCount: LIBRARIES.filter((l) => l.status !== "placeholder").length,
    maxZoom: 12,
  },
  {
    id: "latam",
    bounds: boundsOf(latamPoints),
    siteCount: latamPoints.length,
    venueCount: latamPoints.length,
    maxZoom: 9,
  },
  {
    id: "china",
    bounds: boundsOf(chinaPoints),
    siteCount: chinaPoints.length,
    venueCount: INTERNATIONAL_PARTNERS.filter(
      (p) => p.country === "CN" && p.status === "hosted",
    ).length,
    maxZoom: 12,
  },
]

/** Which cluster a library or partner id belongs to, for tab syncing. */
export function regionOfSite(id: string): MapRegionId {
  if (LIBRARIES.some((l) => l.id === id)) return "nj"
  const partner = INTERNATIONAL_PARTNERS.find((p) => p.id === id)
  if (partner && partner.country === "CN") return "china"
  return "latam"
}

const CONTINENT_BY_COUNTRY: Record<PartnerCountry | "US", string> = {
  US: "north-america",
  CN: "asia",
  EC: "south-america",
  PE: "south-america",
  CO: "south-america",
  PA: "north-america",
  CL: "south-america",
}

const reachCountries = new Set<PartnerCountry | "US">([
  "US",
  ...INTERNATIONAL_PARTNERS.map((p) => p.country),
])

/**
 * Headline numbers for the reach strip under the map. A "venue" has hosted a
 * program or has a session scheduled (every partner abroad is one or the
 * other); the New Jersey `placeholder` areas are not venues yet and are counted
 * separately as planned.
 */
export const REACH = {
  countries: reachCountries.size,
  continents: new Set(
    [...reachCountries].map((code) => CONTINENT_BY_COUNTRY[code]),
  ).size,
  venues:
    LIBRARIES.filter((l) => l.status !== "placeholder").length +
    INTERNATIONAL_PARTNERS.length,
  planned: LIBRARIES.filter((l) => l.status === "placeholder").length,
}
