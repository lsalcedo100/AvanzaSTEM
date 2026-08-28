import type { Metadata } from "next"
import { ResourcesPageContent } from "@/components/pages/resources-page-content"
import { getResourceCounts } from "@/features/resources/counts"
import {
  generateResourcesMetadata,
  getResourcesBreadcrumbJsonLd,
  getResourcesJsonLd,
} from "@/features/resources/metadata"
import type { Language } from "@/i18n/translations"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return generateResourcesMetadata(locale as Language)
}

export default async function LocaleResourcesPage({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getResourcesJsonLd(language)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getResourcesBreadcrumbJsonLd(language)),
        }}
      />
      <ResourcesPageContent counts={getResourceCounts()} />
    </>
  )
}
