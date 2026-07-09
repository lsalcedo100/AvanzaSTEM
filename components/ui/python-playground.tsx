"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { PythonWorkspace } from "@/components/ui/python-workspace"

// localStorage key for the home-page playground. Lesson pages use their own
// per-week keys so a student's edits never collide across workspaces.
const HOME_PLAYGROUND_STORAGE_KEY = "avanza-python-playground-code"

/**
 * Home-page Python playground: the marketing section chrome (heading, notebook
 * background) wrapped around the shared {@link PythonWorkspace}. The reset
 * button clears the editor (resetTo="") to preserve the original behavior.
 */
export function PythonPlayground() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-[#fff8e8] py-20 md:py-24">
      {/* Notebook dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 22%, rgba(46,204,113,0.18) 0 5px, transparent 6px), radial-gradient(circle at 86% 18%, rgba(139,92,246,0.16) 0 4px, transparent 5px), radial-gradient(circle at 18% 82%, rgba(249,115,22,0.16) 0 4px, transparent 5px), radial-gradient(circle at 82% 86%, rgba(26,188,156,0.18) 0 5px, transparent 6px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-green">
            {t.home.pyEyebrow}
          </p>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            {t.home.pyTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.home.pyDesc}
          </p>
        </FadeIn>

        <FadeIn delay={120} className="mt-12">
          <PythonWorkspace
            starterCode={t.home.pyStarterCode}
            storageKey={HOME_PLAYGROUND_STORAGE_KEY}
            resetTo=""
            resetLabel={t.home.pyClear}
          />
        </FadeIn>
      </div>
    </section>
  )
}
