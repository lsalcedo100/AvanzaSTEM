"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { PythonIdeWorkspace } from "@/components/ui/python-ide-workspace"

/**
 * Standalone Python IDE page (/python-ide). A quiet, warm frame around the
 * {@link PythonIdeWorkspace} app shell, which fills most of the viewport and
 * feels like a real coding environment rather than a marketing section. The
 * editor, Run/Stop/Reset controls, terminal, and error handling all come from
 * the same shared primitives used by the home playground and lesson pages -
 * nothing is forked here.
 */
export function PythonIdePageContent() {
  const { t } = useLanguage()

  return (
    <section className="bg-[#f6f2e8] px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5">
      {/* Keep a heading for SEO/accessibility without the marketing hero. */}
      <h1 className="sr-only">{t.home.pyIdeTitle}</h1>
      <div className="mx-auto max-w-375">
        <PythonIdeWorkspace />
      </div>
    </section>
  )
}
