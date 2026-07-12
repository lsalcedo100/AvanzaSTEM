"use client"

import type { ReactNode } from "react"
import { RotateCcw } from "lucide-react"
import type { ActivityDefinition } from "@/features/curriculums/intro-to-ai-types"
import type { SaveStatus } from "@/components/ui/useIntroToAiProgress"
import { SaveState } from "@/components/pages/intro-to-ai/ui"

/**
 * The generic frame every activity renders inside — both the current briefings
 * (no interactive engine yet) and the real deterministic activities added later.
 * It provides the standard slots (controls, results, feedback), a reset action,
 * a save-state line, and accessible banners for the non-ready states. Status
 * changes are announced through a polite live region.
 *
 * `briefing` is the honest default: instructional content only, no controls and
 * no reset, so nothing pretends to compute.
 */
export type ActivityFrameStatus =
  | "briefing"
  | "ready"
  | "loading"
  | "empty"
  | "invalid"
  | "error"
  | "unsupported"
  | "offline"

const STATUS_TEXT: Record<Exclude<ActivityFrameStatus, "briefing" | "ready">, string> = {
  loading: "Loading…",
  empty: "Nothing here yet — try the steps above to get started.",
  invalid: "That input can't be used. Check the instructions and try again.",
  error: "Something went wrong. You can reset and try again — your other work is saved.",
  unsupported: "This activity isn't supported in this browser. You can still follow the steps with notes.",
  offline: "You appear to be offline. This activity works on this device without a connection once loaded.",
}

export function ActivityFrame({
  title,
  purpose,
  instructions,
  status = "ready",
  statusMessage,
  controls,
  results,
  feedback,
  saveStatus,
  onReset,
  children,
}: {
  title: string
  purpose: string
  instructions?: string[]
  status?: ActivityFrameStatus
  statusMessage?: string
  controls?: ReactNode
  results?: ReactNode
  feedback?: ReactNode
  saveStatus?: SaveStatus
  onReset?: () => void
  children?: ReactNode
}) {
  const banner = status !== "briefing" && status !== "ready" ? (statusMessage ?? STATUS_TEXT[status]) : null

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        {status === "briefing" && (
          <span className="inline-flex items-center rounded border border-border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Activity briefing
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{purpose}</p>

      {instructions && instructions.length > 0 && (
        <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-foreground">
          {instructions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      )}

      {/* Non-ready state banner, announced politely. */}
      <p className="sr-only" role="status" aria-live="polite">
        {banner ?? ""}
      </p>
      {banner && (
        <p
          className={`mt-4 rounded-md border px-4 py-3 text-sm ${
            status === "error" || status === "invalid"
              ? "border-avanza-orange/40 bg-avanza-orange/10 text-avanza-orange-dark"
              : "border-border bg-secondary text-muted-foreground"
          }`}
        >
          {banner}
        </p>
      )}

      {controls && <div className="mt-4">{controls}</div>}
      {results && <div className="mt-4">{results}</div>}
      {feedback && (
        <div className="mt-4 rounded-md bg-secondary px-4 py-3 text-sm text-secondary-foreground" aria-live="polite">
          {feedback}
        </div>
      )}

      {children}

      {(onReset || saveStatus) && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          {onReset ? (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-avanza-green/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Reset activity
            </button>
          ) : (
            <span />
          )}
          {saveStatus && <SaveState status={saveStatus} idleHint="" />}
        </div>
      )}
    </div>
  )
}

/**
 * Briefing view of an activity: real instructional content (goal, steps,
 * materials, dataset, success criteria) with no controls or reset. Used until a
 * real deterministic activity component is registered for the activity's kind.
 */
export function ActivityBriefing({ activity }: { activity: ActivityDefinition }) {
  return (
    <ActivityFrame title={activity.title} purpose={activity.goal} instructions={activity.steps} status="briefing">
      <p className="mt-3 text-sm leading-relaxed text-foreground">{activity.overview}</p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">You will need</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground">
            {activity.materials.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Success looks like</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground">
            {activity.successCriteria.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      {activity.dataset && (
        <div className="mt-4 rounded-md border border-border bg-secondary/50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Built-in dataset</p>
          <p className="mt-1 text-sm font-semibold text-foreground">{activity.dataset.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{activity.dataset.description}</p>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        For now, work through this activity with the built-in materials, your notes, and discussion. An interactive version is coming in a
        later update.
      </p>
    </ActivityFrame>
  )
}
