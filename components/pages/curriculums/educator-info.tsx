import type { Translations } from "@/i18n/translations"

/**
 * Section 2 — "For parents and educators".
 *
 * A compact, practical Q&A. Every answer is grounded in real site behaviour:
 * no login/account exists, progress is saved in the browser via localStorage
 * hooks, technology paths run in the browser while hands-on paths use common
 * materials, and the site UI ships in English/Spanish/Chinese (lesson content
 * is English). Rendered as a semantic definition list, no interactive controls.
 */
export function EducatorInfo({
  c,
}: {
  c: Translations["curriculumsPage"]
}) {
  const s = c.sections

  return (
    <>
      <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {s.faqItems.map((item) => (
          <div key={item.q} className="border-l-2 border-avanza-green/40 pl-4">
            <dt className="font-bold text-foreground">{item.q}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.a}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 text-sm italic text-muted-foreground">{s.faqNote}</p>
    </>
  )
}
