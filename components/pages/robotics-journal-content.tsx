"use client"

import Link from "next/link"
import {
  roboticsCurriculum,
  roboticsLessonPath,
  roboticsPath,
  type JournalPrompt,
  type RoboticsModule,
} from "@/features/curriculums/robotics"
import { PrintButton } from "@/components/ui/print-button"
import { useRoboticsProgress } from "@/components/ui/useRoboticsProgress"

/** A short hint describing what a prompt captures. */
function captureHint(captures: JournalPrompt["captures"]): string {
  switch (captures) {
    case "sketch":
      return "Describe or note your sketch."
    case "number":
      return "Enter a number."
    case "checklist":
      return "List each item on its own line."
    default:
      return "Write your answer."
  }
}

const inputClass =
  "mt-2 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green disabled:opacity-50"

/**
 * The Design journal: one page collecting every week's journal prompts. Entries
 * are saved on this device (via `useRoboticsProgress`) as the student leaves
 * each field. Because saved values load only after hydration, each input is
 * keyed on `loaded` so it re-mounts with its saved `defaultValue` and avoids a
 * server/client mismatch.
 */
export function RoboticsJournalContent() {
  const { loaded, progress, saveJournalEntry } = useRoboticsProgress()

  const modules = [...roboticsCurriculum.modules]
    .filter((m) => m.journalPrompts.length > 0)
    .sort((a, b) => a.week - b.week)

  const sectionTitle = (module: RoboticsModule) =>
    module.isFinal ? "Final project" : `Week ${module.week}: ${module.title}`

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="print-hidden flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href={roboticsPath}
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-avanza-green"
          >
            &larr; Back to Robotics &amp; Automation
          </Link>
          <h1 className="mt-3 text-2xl font-bold text-foreground">Design journal</h1>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Every week&apos;s journal prompts in one place. Return here to record your sketches,
            tests, and decisions as you build.
          </p>
        </div>
        <PrintButton tone="green" />
      </div>

      <div className="mt-10 space-y-10">
        {modules.map((module) => (
          <section key={module.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-bold text-foreground">{sectionTitle(module)}</h2>
              <Link
                href={roboticsLessonPath(module.slug)}
                className="print-hidden text-sm font-semibold text-muted-foreground transition-colors hover:text-avanza-green"
              >
                Go to lesson
              </Link>
            </div>

            <div className="mt-4 space-y-6">
              {module.journalPrompts.map((prompt) => {
                const key = `${module.id}:${prompt.id}`
                const saved = progress.journal[key]?.value ?? ""
                const inputId = `journal-${module.id}-${prompt.id}`
                return (
                  <div key={prompt.id}>
                    <label htmlFor={inputId} className="block text-sm font-semibold text-foreground">
                      {prompt.prompt}
                    </label>
                    <p className="mt-1 text-xs text-muted-foreground">{captureHint(prompt.captures)}</p>
                    {prompt.captures === "number" ? (
                      <input
                        id={inputId}
                        key={`${key}:${loaded}`}
                        type="number"
                        defaultValue={saved}
                        onBlur={(e) => saveJournalEntry(module.id, prompt.id, e.target.value)}
                        disabled={!loaded}
                        placeholder="Enter a number..."
                        className={inputClass}
                      />
                    ) : (
                      <textarea
                        id={inputId}
                        key={`${key}:${loaded}`}
                        defaultValue={saved}
                        onBlur={(e) => saveJournalEntry(module.id, prompt.id, e.target.value)}
                        disabled={!loaded}
                        rows={prompt.captures === "checklist" ? 4 : 3}
                        placeholder="Write your answer..."
                        className={inputClass}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-10 text-xs text-muted-foreground">
        Your entries are saved automatically on this device as you finish each field.
      </p>
    </div>
  )
}
