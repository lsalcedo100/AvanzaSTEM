import type { Translations } from "@/i18n/translations"

/**
 * "For parents and educators" — the shared learning model that ships with every
 * path: facilitator guides, printable worksheets, offline/unplugged options, and
 * local-only progress. Every claim is real and derivable from the course data
 * (`facilitator`, worksheet/teacher-guide routes, `format[]`, and the
 * localStorage progress hooks). No headcounts, testimonials, or partner claims.
 */
export function EducatorInfo({
  c,
}: {
  c: Translations["curriculumsPage"]
}) {
  const items = c.sections.educatorItems

  return (
    <dl className="mt-8 grid gap-6 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="border-l-2 border-avanza-green/40 pl-4">
          <dt className="font-bold text-foreground">{item.title}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</dd>
        </div>
      ))}
    </dl>
  )
}
