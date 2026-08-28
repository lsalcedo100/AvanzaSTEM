import type { Metadata } from "next"

import { generateSitePageMetadata } from "@/features/site/page-metadata"
import { WorkshopFinderPage } from "@/components/pages/workshop-finder-page"
import { LIBRARIES } from "@/features/workshops/locations"
import { siteConfig } from "@/lib/site-config"

export function generateMetadata(): Metadata {
  return generateSitePageMetadata("findAWorkshop", "en")
}

/**
 * Confirmed workshop venues as Place nodes.
 *
 * This page carries local intent in Search Console ("free stem programs near
 * me", "free stem workshops", "reverse engineering classes near me") at 271
 * impressions and average position 3.15, but shipped no structured data at all.
 *
 * Only real venues are described: `upcoming` libraries with scheduled sessions
 * and `active` libraries we have already run at. The `placeholder` entries are
 * planning areas rather than venues ("Newark area"), and the page labels them
 * that way; emitting them as Places would assert locations that do not exist.
 * The libraries are third-party public venues, so they are modelled as Place,
 * not as a LocalBusiness belonging to Avanza STEM.
 */
const describedLibraries = LIBRARIES.filter(
  (library) => library.status !== "placeholder",
)

const workshopLocationsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Avanza STEM workshop locations",
  description:
    "Public libraries in New Jersey where Avanza STEM runs free hands-on STEM workshops.",
  url: `${siteConfig.url}/find-a-workshop`,
  numberOfItems: describedLibraries.length,
  itemListElement: describedLibraries.map(
    (library, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Place",
        name: library.name,
        address: {
          "@type": "PostalAddress",
          addressLocality: library.city,
          addressRegion: "NJ",
          postalCode: library.zip,
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: library.lat,
          longitude: library.lng,
        },
      },
    }),
  ),
}

export default function FindAWorkshopRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workshopLocationsJsonLd) }}
      />
      <WorkshopFinderPage />
    </>
  )
}
