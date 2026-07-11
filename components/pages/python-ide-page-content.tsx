"use client"

import { Terminal } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { PythonWorkspace } from "@/components/ui/python-workspace"

// Standalone IDE keeps its own saved code so a student's work here never
// collides with the home-page playground or a lesson editor.
const PYTHON_IDE_STORAGE_KEY = "avanza-python-ide-code"

/**
 * Standalone Python IDE page (/python-ide): a full-width wrapper around the
 * shared {@link PythonWorkspace}. Opens straight into the coding environment,
 * no course or project required. The editor, Run/Stop/Reset controls, terminal,
 * and error handling all come from the same component used by the home
 * playground and lesson pages - nothing is forked here.
 */
export function PythonIdePageContent() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-[#fff8e8] py-14 md:py-20">
      {/* Notebook dot grid, matching the home playground's look. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 22%, rgba(46,204,113,0.18) 0 5px, transparent 6px), radial-gradient(circle at 86% 18%, rgba(139,92,246,0.16) 0 4px, transparent 5px), radial-gradient(circle at 18% 82%, rgba(249,115,22,0.16) 0 4px, transparent 5px), radial-gradient(circle at 82% 86%, rgba(26,188,156,0.18) 0 5px, transparent 6px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-avanza-green/15 px-3 py-1 text-sm font-bold uppercase tracking-wider text-avanza-green">
            <Terminal className="h-3.5 w-3.5" />
            {t.home.pyIdeBadge}
          </p>
          <h1 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            {t.home.pyIdeTitle}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.home.pyIdeSubtitle}
          </p>
        </FadeIn>

        <FadeIn delay={120} className="mt-10 md:mt-12">
          <PythonWorkspace
            starterCode={t.home.pyStarterCode}
            storageKey={PYTHON_IDE_STORAGE_KEY}
          />
        </FadeIn>
      </div>
    </section>
  )
}
