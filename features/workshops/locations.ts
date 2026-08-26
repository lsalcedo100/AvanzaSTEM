/**
 * Workshop venues, in a plain module so both the client-side finder UI and the
 * server-rendered route can read them.
 *
 * This lived inside components/pages/workshop-finder-page.tsx, which is a
 * "use client" module: importing a value out of one from a server component
 * yields a client reference proxy rather than the array, so the route could
 * not build Place structured data from it.
 */
export type Library = {
  id: string
  name: string
  city: string
  zip: string
  lat: number
  lng: number
  status: "upcoming" | "active" | "placeholder"
  /**
   * ISO date strings (YYYY-MM-DD) for scheduled Maker Mindset Series sessions,
   * earliest first. Present only on `upcoming` venues with confirmed dates.
   */
  sessions?: string[]
  /** Dates are penciled in but not yet confirmed with the venue. */
  tentative?: boolean
}

/**
 * Workshop venues. `upcoming` entries are confirmed (or, when `tentative`,
 * penciled-in) partner libraries with scheduled Maker Mindset Series sessions;
 * `active` entries are partner libraries we have already run at with no session
 * currently on the calendar; `placeholder` entries are planning areas, not
 * venues, and are labelled as such on the page. Exported so
 * app/find-a-workshop/page.tsx can build Place structured data from the real
 * venues only (everything except `placeholder`).
 */
export const LIBRARIES: Library[] = [
  {
    id: "west-orange",
    name: "West Orange Public Library",
    city: "West Orange",
    zip: "07052",
    lat: 40.797,
    lng: -74.2545,
    status: "upcoming",
    sessions: ["2026-09-01", "2026-09-08", "2026-09-15"],
  },
  {
    id: "cedar-grove",
    name: "Cedar Grove Public Library",
    city: "Cedar Grove",
    zip: "07009",
    lat: 40.8513,
    lng: -74.2277,
    status: "upcoming",
    sessions: ["2026-09-04", "2026-09-11", "2026-09-18"],
    tentative: true,
  },
  {
    id: "berkeley-heights",
    name: "Berkeley Heights Public Library",
    city: "Berkeley Heights",
    zip: "07922",
    lat: 40.6815,
    lng: -74.4438,
    status: "upcoming",
    sessions: ["2026-09-14", "2026-09-21", "2026-09-28"],
  },
  {
    id: "caldwell",
    name: "Caldwell Public Library",
    city: "Caldwell",
    zip: "07006",
    lat: 40.8386,
    lng: -74.2744,
    status: "upcoming",
    sessions: ["2026-10-06", "2026-10-13", "2026-10-20"],
  },
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
    id: "wayne",
    name: "Wayne Public Library",
    city: "Wayne",
    zip: "07470",
    lat: 40.9286,
    lng: -74.232,
    status: "active",
  },
  {
    id: "verona",
    name: "Verona Public Library",
    city: "Verona",
    zip: "07044",
    lat: 40.8329,
    lng: -74.2464,
    status: "active",
  },
  {
    id: "little-falls",
    name: "Little Falls Public Library",
    city: "Little Falls",
    zip: "07424",
    lat: 40.8807,
    lng: -74.2298,
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

/** Country codes used to group and localise international partner names. */
export type PartnerCountry = "EC" | "PE" | "CO"

export type InternationalPartner = {
  id: string
  name: string
  country: PartnerCountry
}

/**
 * Libraries and cultural institutions abroad that are in planning conversations
 * to run the Maker Mindset Series in their communities. These are not New
 * Jersey venues and carry no coordinates: the finder lists them in a dedicated
 * "international partners" section and never plots them on the NJ map or ranks
 * them by ZIP distance. Ordered strongest-interest first within each country.
 */
export const INTERNATIONAL_PARTNERS: InternationalPartner[] = [
  {
    id: "llano-grande",
    name: "Biblioteca Municipal de Llano Grande",
    country: "EC",
  },
  {
    id: "bnp-gestion-cultural",
    name: "Biblioteca Nacional del Perú – Gestión Cultural",
    country: "PE",
  },
  {
    id: "san-isidro-infantil",
    name: "Biblioteca Infantil de San Isidro",
    country: "PE",
  },
  {
    id: "carmen-checa-la-victoria",
    name: "Estación de Biblioteca Pública “Carmen Checa de Silva” – La Victoria",
    country: "PE",
  },
  {
    id: "rimac",
    name: "Estación Biblioteca Pública Rímac",
    country: "PE",
  },
  {
    id: "red-nacional-colombia",
    name: "Red Nacional de Bibliotecas Públicas de Colombia",
    country: "CO",
  },
]
