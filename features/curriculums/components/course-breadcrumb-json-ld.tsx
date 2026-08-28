import { getCourseBreadcrumbJsonLd } from "../structured-data.ts"

/**
 * Emits BreadcrumbList JSON-LD for a course lesson, worksheet, teacher guide,
 * or section page.
 *
 * These routes sit three and four segments deep (e.g.
 * /courses/robotics/what-makes-something-a-robot/worksheet) and previously
 * carried no breadcrumb markup at all, so Google had no declared hierarchy for
 * roughly 120 pages. Breadcrumbs remain a live rich result and replace the
 * bare URL in the SERP.
 *
 * Renders a <script> only - no visible output.
 */
export function CourseBreadcrumbJsonLd({ path, leafName }: { path: string; leafName?: string }) {
  const jsonLd = getCourseBreadcrumbJsonLd(path, leafName)
  if (!jsonLd) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
