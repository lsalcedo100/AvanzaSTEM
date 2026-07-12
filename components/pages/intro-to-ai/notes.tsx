"use client"

import { useEffect, useRef, useState } from "react"
import type { useIntroToAiProgress } from "@/components/ui/useIntroToAiProgress"
import { SaveState } from "@/components/pages/intro-to-ai/ui"

const NOTE_KEY = "course-notebook"
const DEBOUNCE_MS = 700

/**
 * Course notebook. Plain-text notes saved locally (debounced) with a clear
 * saving/saved/error state and a privacy warning. Nothing is sent anywhere.
 * Takes the shared progress hook so it stays in sync with resets elsewhere.
 */
export function IntroToAiNotes({ progress }: { progress: ReturnType<typeof useIntroToAiProgress> }) {
  const [pending, setPending] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Flush any pending save on unmount.
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  const scheduleSave = (value: string) => {
    setPending(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      progress.setNote(NOTE_KEY, value)
      setPending(false)
    }, DEBOUNCE_MS)
  }

  const saved = progress.progress.notes[NOTE_KEY] ?? ""

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <label htmlFor="course-notebook" className="text-sm font-bold text-foreground">
          Your notebook
        </label>
        {pending ? (
          <span className="text-xs text-muted-foreground" aria-live="polite">
            Saving…
          </span>
        ) : (
          <SaveState status={progress.saveStatus} idleHint="Notes save automatically on this device" />
        )}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Jot down ideas as you go. Please don&apos;t enter your full name, address, passwords, or other private information — notes are
        stored only in this browser on this device and are never sent anywhere.
      </p>
      <textarea
        id="course-notebook"
        key={`notebook:${progress.loaded}`}
        defaultValue={saved}
        disabled={!progress.loaded}
        onChange={(e) => scheduleSave(e.target.value)}
        onBlur={(e) => {
          if (timer.current) clearTimeout(timer.current)
          progress.setNote(NOTE_KEY, e.target.value)
          setPending(false)
        }}
        rows={6}
        className="mt-2 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green disabled:opacity-50"
        placeholder="Type your notes here…"
      />
    </div>
  )
}
