import type { Metadata } from "next"
import { ProjectsPageContent } from "@/components/pages/projects-page-content"
import { generateProjectsIndexMetadata } from "@/features/projects/metadata"
import type { Language } from "@/i18n/translations"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return generateProjectsIndexMetadata(locale as Language)
}

export default function LocaleProjectsPage() {
  return <ProjectsPageContent />
}
