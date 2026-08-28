import {
  getProjectsIndexBreadcrumbJsonLd,
  getProjectsIndexJsonLd,
} from "@/features/projects/structured-data"
import { ProjectsPageContent } from "@/components/pages/projects-page-content"

// On the index page rather than in app/projects/layout.tsx: a layout would also
// emit these on every /projects/<slug> guide, where each guide already carries
// its own HowTo and BreadcrumbList.
const collectionJsonLd = getProjectsIndexJsonLd("en")
const breadcrumbJsonLd = getProjectsIndexBreadcrumbJsonLd("en")

export default function ProjectsPage() {
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
      <ProjectsPageContent />
    </>
  )
}
