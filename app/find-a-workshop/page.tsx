import type { Metadata } from "next"
import { translations } from "@/i18n/translations"
import { WorkshopFinderPage } from "@/components/pages/workshop-finder-page"
import { getLanguage } from "@/lib/get-language"

export async function generateMetadata(): Promise<Metadata> {
  const language = await getLanguage()
  const t = translations[language].home
  return {
    title: t.finderMetaTitle,
    description: t.finderMetaDesc,
    alternates: { canonical: "/find-a-workshop" },
  }
}

export default function FindAWorkshopRoute() {
  return <WorkshopFinderPage />
}
