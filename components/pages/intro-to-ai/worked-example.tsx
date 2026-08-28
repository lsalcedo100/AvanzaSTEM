"use client"

import type { WorkedExample } from "@/features/curriculums/intro-to-ai/types"
import { useLanguage } from "@/components/providers/language-provider"

/** The Intro to AI chrome in the reader's language. */
function useS() {
  return useLanguage().t.courseUi.ai.shared
}


/**
 * Reusable worked-example presentation. Renders the process as numbered steps
 * (worked examples are inherently ordered) followed by the takeaway. No
 * animation, so it reads the same in reduced-motion mode and in print.
 */
export function IntroToAiWorkedExample({ example }: { example: WorkedExample }) {
  const S = useS()
  return (
    <section aria-label={example.title}>
      <p className="text-xs font-bold uppercase tracking-wide text-avanza-green-dark">{S.workedExample}</p>
      <h2 className="mt-1 text-xl font-bold text-foreground">{example.title}</h2>
      <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-foreground">
        {example.steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
      <p className="mt-3 rounded-md bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground">
        {S.takeaway.replace("{text}", example.takeaway)}
      </p>
    </section>
  )
}
