import type { Metadata } from "next"
import { ResourcesPageContent } from "@/components/pages/resources-page-content"
import { getResourceCounts } from "@/features/resources/counts"
import {
  generateResourcesMetadata,
  getResourcesBreadcrumbJsonLd,
  getResourcesJsonLd,
} from "@/features/resources/metadata"

export function generateMetadata(): Metadata {
  return generateResourcesMetadata("en")
}

const collectionJsonLd = getResourcesJsonLd("en")
const breadcrumbJsonLd = getResourcesBreadcrumbJsonLd("en")

export default function ResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ResourcesPageContent counts={getResourceCounts()} />
    </>
  )
}
