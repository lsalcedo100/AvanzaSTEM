import type { Metadata } from "next"
import { ProjectsPageContent } from "@/components/pages/projects-page-content"
import { generateProjectsIndexMetadata } from "@/features/projects/metadata"
import {
  getProjectsIndexBreadcrumbJsonLd,
  getProjectsIndexJsonLd,
} from "@/features/projects/structured-data"
import type { Language } from "@/i18n/translations"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return generateProjectsIndexMetadata(locale as Language)
}

export default async function LocaleProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const language = locale as Language

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getProjectsIndexJsonLd(language)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getProjectsIndexBreadcrumbJsonLd(language)),
        }}
      />
      <ProjectsPageContent />
    </>
  )
}
