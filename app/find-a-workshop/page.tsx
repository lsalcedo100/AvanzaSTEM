import type { Metadata } from "next"
import { translations } from "@/i18n/translations"
import { WorkshopFinderPage } from "@/components/pages/workshop-finder-page"
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
    },
  }
}

export default function FindAWorkshopRoute() {
  return <WorkshopFinderPage />
}
