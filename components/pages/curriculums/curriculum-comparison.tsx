import Link from "next/link"
import { curriculumCatalog, resolveCurriculumCopy } from "@/features/curriculums/catalog"
import type { Translations } from "@/i18n/translations"

/**
 * Side-by-side comparison of the six paths (grades, length, setting, and what
 * students build) so a parent or teacher can pick without opening every course.
 * All values come from the typed catalog + real course data — no invented stats.
 *
 * Renders as a real `<table>` on md+ and stacks into readable rows on mobile.
 */
export function CurriculumComparison({
  c,
}: {
  c: Translations["curriculumsPage"]
}) {
  const s = c.sections
  const rows = curriculumCatalog.map((entry) => ({
    entry,
    copy: resolveCurriculumCopy(entry, c),
  }))

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <caption className="sr-only">{s.compareHeading}</caption>
        <thead>
          <tr className="border-b border-border text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <th scope="col" className="py-3 pr-4 font-bold">{s.colCourse}</th>
            <th scope="col" className="py-3 pr-4 font-bold">{s.colGrades}</th>
            <th scope="col" className="py-3 pr-4 font-bold">{s.colDuration}</th>
            <th scope="col" className="py-3 pr-4 font-bold">{s.colSetting}</th>
            <th scope="col" className="py-3 font-bold">{s.colBuild}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ entry, copy }) => (
            <tr key={entry.id} className="border-b border-border/60 align-top">
              <th scope="row" className="py-4 pr-4 font-semibold text-foreground">
                <Link
                  href={entry.href}
                  className="underline-offset-2 hover:text-avanza-green-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
                >
                  {copy.title}
                </Link>
              </th>
              <td className="py-4 pr-4 text-muted-foreground">{copy.grades}</td>
              <td className="py-4 pr-4 text-muted-foreground">{copy.duration}</td>
              <td className="py-4 pr-4 text-muted-foreground">{copy.settingLabel}</td>
              <td className="py-4 text-muted-foreground">{copy.build}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
