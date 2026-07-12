"use client"

import { useMemo, useState } from "react"
import { introToAiCourse } from "@/features/curriculums/intro-to-ai"
import type { VocabularyTerm } from "@/features/curriculums/intro-to-ai-types"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type Grouping = "week" | "alpha"

/**
 * Course vocabulary reference, built entirely from the typed curriculum data
 * (definitions are read from the lessons, never re-authored here). Terms can be
 * grouped by week or listed alphabetically. Uses the existing Radix accordion, so
 * it is keyboard-navigable and works without hover; fully responsive.
 */
export function IntroToAiVocabulary() {
  const [grouping, setGrouping] = useState<Grouping>("week")

  const byWeek = useMemo(
    () =>
      introToAiCourse.weeks.map((w) => ({
        id: w.id,
        label: `Week ${w.week}: ${w.title}`,
        terms: dedupe(w.lessons.flatMap((l) => l.vocabulary)),
      })),
    [],
  )

  const alpha = useMemo(() => {
    const all = dedupe(introToAiCourse.weeks.flatMap((w) => w.lessons.flatMap((l) => l.vocabulary)))
    return [...all].sort((a, b) => a.term.localeCompare(b.term))
  }, [])

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground">Group by:</span>
        <div className="inline-flex rounded-md border border-border p-0.5" role="group" aria-label="Group vocabulary by">
          <ToggleButton active={grouping === "week"} onClick={() => setGrouping("week")}>
            Week
          </ToggleButton>
          <ToggleButton active={grouping === "alpha"} onClick={() => setGrouping("alpha")}>
            A–Z
          </ToggleButton>
        </div>
      </div>

      {grouping === "week" ? (
        <Accordion type="multiple" className="mt-4">
          {byWeek.map((group) => (
            <AccordionItem key={group.id} value={group.id}>
              <AccordionTrigger>
                {group.label} <span className="ml-2 text-xs font-normal text-muted-foreground">({group.terms.length} terms)</span>
              </AccordionTrigger>
              <AccordionContent>
                <TermList terms={group.terms} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="mt-4">
          <TermList terms={alpha} />
        </div>
      )}
    </div>
  )
}

function TermList({ terms }: { terms: VocabularyTerm[] }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {terms.map((t) => (
        <div key={t.id} className="rounded-md border border-border bg-card p-4">
          <dt className="text-sm font-bold text-foreground">{t.term}</dt>
          <dd className="mt-1 text-sm text-muted-foreground">{t.definition}</dd>
        </div>
      ))}
    </dl>
  )
}

function ToggleButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${
        active ? "bg-avanza-green/15 text-avanza-green-dark" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  )
}

/** Keep the first occurrence of each term id (terms are unique per lesson). */
function dedupe(terms: VocabularyTerm[]): VocabularyTerm[] {
  const seen = new Set<string>()
  const out: VocabularyTerm[] = []
  for (const t of terms) {
    if (seen.has(t.id)) continue
    seen.add(t.id)
    out.push(t)
  }
  return out
}
