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
  status: "active" | "placeholder"
}

/**
 * Workshop venues. `active` entries are confirmed partner libraries with a real
 * name and address; `placeholder` entries are planning areas, not venues, and
 * are labelled as such on the page. Exported so app/find-a-workshop/page.tsx
 * can build Place structured data from the confirmed venues only.
 */
export const LIBRARIES: Library[] = [
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
