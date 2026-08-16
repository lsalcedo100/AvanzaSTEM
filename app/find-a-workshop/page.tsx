import type { Metadata } from "next"
import { translations } from "@/i18n/translations"
import { WorkshopFinderPage } from "@/components/pages/workshop-finder-page"
import { LIBRARIES } from "@/features/workshops/locations"
import { getLanguage } from "@/lib/get-language"
import { enOnlyAlternates } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"

export async function generateMetadata(): Promise<Metadata> {
  const language = await getLanguage()
  const t = translations[language].home
  const title = t.finderMetaTitle
  const description = t.finderMetaDesc
  return {
    title,
    description,
    alternates: {
      canonical: "/find-a-workshop",
      languages: enOnlyAlternates("/find-a-workshop"),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/find-a-workshop`,
      siteName: siteConfig.name,
      type: "website",
      images: [
        { url: "/images/og-default-en.png", width: 1200, height: 630, alt: "Avanza STEM" },
      ],
    },
  }
}

/**
 * Confirmed workshop venues as Place nodes.
 *
 * This page carries local intent in Search Console ("free stem programs near
 * me", "free stem workshops", "reverse engineering classes near me") at 271
 * impressions and average position 3.15, but shipped no structured data at all.
 *
 * Only `active` libraries are described. The six `placeholder` entries are
 * planning areas rather than venues ("Newark area"), and the page labels them
 * that way; emitting them as Places would assert locations that do not exist.
 * The libraries are third-party public venues, so they are modelled as Place,
 * not as a LocalBusiness belonging to Avanza STEM.
 */
const workshopLocationsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Avanza STEM workshop locations",
  description:
    "Public libraries in New Jersey where Avanza STEM currently runs free hands-on STEM workshops.",
  url: `${siteConfig.url}/find-a-workshop`,
  numberOfItems: LIBRARIES.filter((library) => library.status === "active").length,
  itemListElement: LIBRARIES.filter((library) => library.status === "active").map(
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
