import type { Metadata } from "next"
import { CurriculumsPageContent } from "@/components/pages/curriculums-page-content"
import { generateCurriculumsMetadata } from "@/features/curriculums/metadata"
import { getCourseListJsonLd } from "@/features/curriculums/structured-data"
import { siteConfig } from "@/lib/site-config"

export function generateMetadata(): Metadata {
  return generateCurriculumsMetadata("en")
}

// These live on the index page rather than in a layout: a layout would also
// apply them to /curriculums/intro-to-python and its eight week pages, which
// would have every lesson page claim to be the curriculum index.
const curriculumsJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Free STEM Curriculum Paths for Kids",
  description:
    "Free STEM curriculum paths for kids with available project guides in Python, engineering, science, robotics, math, and AI.",
  url: `${siteConfig.url}/curriculums`,
  inLanguage: "en",
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  publisher: { "@id": `${siteConfig.url}/#organization` },
}

// The six courses the page lists, as Course nodes. This is what makes the
// index eligible for the course list carousel; the previous bare WebPage node
// described the page but none of the courses on it.
const courseListJsonLd = getCourseListJsonLd()

export default function CurriculumsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(curriculumsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListJsonLd) }}
      />
      <CurriculumsPageContent />
    </>
  )
}
