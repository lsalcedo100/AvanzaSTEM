"use client"

import type { ReflectionPrompt } from "@/features/curriculums/intro-to-ai-types"
import type { useIntroToAiProgress } from "@/components/ui/useIntroToAiProgress"
import { SaveState } from "@/components/pages/intro-to-ai/ui"

/**
 * Reusable reflection block. Supports one or more prompts, saves each response to
 * progress (on blur, so it debounces naturally and preserves in-progress typing),
 * allows revision at any time, shows the save state, warns against private
 * information, and never sends responses anywhere.
 */
export function IntroToAiReflection({
  prompts,
  progress,
}: {
  prompts: ReflectionPrompt[]
  progress: ReturnType<typeof useIntroToAiProgress>
}) {
  return (
    <section aria-label="Reflection">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-bold text-foreground">Reflection</h2>
        <SaveState status={progress.saveStatus} idleHint="Saved on this device as you type" />
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Please don&apos;t include private information. Your answers are saved only in this browser and are never sent anywhere.
      </p>
      <div className="mt-4 space-y-4">
        {prompts.map((r) => (
          <div key={r.id}>
            <label htmlFor={`reflect-${r.id}`} className="block text-sm font-medium text-foreground">
              {r.prompt}
            </label>
            <textarea
              id={`reflect-${r.id}`}
              key={`reflect-${r.id}:${progress.loaded}`}
              defaultValue={progress.progress.reflections[r.id] ?? ""}
              disabled={!progress.loaded}
              onBlur={(e) => progress.setReflection(r.id, e.target.value)}
              rows={3}
              className="mt-2 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green disabled:opacity-50"
              placeholder="Write your thoughts here. You can revise this any time."
            />
          </div>
        ))}
      </div>
    </section>
  )
}
