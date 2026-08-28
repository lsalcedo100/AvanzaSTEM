"use client"

import { useState } from "react"
import type { PredictionPrompt } from "@/features/curriculums/intro-to-ai/types"
import type { useIntroToAiProgress } from "@/components/ui/useIntroToAiProgress"
import { SaveState } from "@/components/pages/intro-to-ai/ui"
import { useLanguage } from "@/components/providers/language-provider"

/** The Intro to AI chrome in the reader's language. */
function useS() {
  return useLanguage().t.courseUi.ai.shared
}


/**
 * Predict-then-check. The student writes a short prediction, which is saved to
 * progress and shown back to them when they reveal how to check it. Predictions
 * are never marked right or wrong — the point is to commit to a guess first.
 * Keyboard- and touch-friendly; save failures surface via the save-state text.
 */
export function IntroToAiPrediction({
  prompt,
  progress,
}: {
  prompt: PredictionPrompt
  progress: ReturnType<typeof useIntroToAiProgress>
}) {
  const S = useS()
  const [revealed, setRevealed] = useState(false)
  const saved = progress.progress.predictions[prompt.id] ?? ""

  return (
    <section aria-label={S.makePrediction} className="rounded-lg border border-dashed border-border p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-wide text-avanza-green-dark">{S.makePrediction}</p>
        <SaveState status={progress.saveStatus} idleHint="" />
      </div>
      <p className="mt-2 text-sm font-medium text-foreground">{prompt.prompt}</p>

      <label htmlFor={`predict-${prompt.id}`} className="sr-only">
        {S.yourPrediction}
      </label>
      <textarea
        id={`predict-${prompt.id}`}
        key={`predict-${prompt.id}:${progress.loaded}`}
        defaultValue={saved}
        disabled={!progress.loaded}
        onBlur={(e) => progress.setPrediction(prompt.id, e.target.value)}
        rows={2}
        className="mt-3 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green disabled:opacity-50"
        placeholder={S.predictionPlaceholder}
      />

      <div className="mt-3">
        {!revealed ? (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="text-sm font-semibold text-avanza-green-dark underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 rounded"
          >
            {S.revealHowToCheck}
          </button>
        ) : (
          <div className="rounded-md bg-secondary px-4 py-3" aria-live="polite">
            {saved && (
              <p className="text-sm text-foreground">
                <span className="font-semibold">{S.youPredicted}</span> {saved}
              </p>
            )}
            <p className={`text-sm text-muted-foreground ${saved ? "mt-2" : ""}`}>
              <span className="font-semibold text-foreground">{S.howToCheck}</span> {prompt.howToCheck}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
