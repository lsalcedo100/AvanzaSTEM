"use client"

import { useEffect, useId, useRef } from "react"
import { AlertTriangle, Check, CircleAlert } from "lucide-react"
import type { SaveStatus } from "@/components/ui/useIntroToAiProgress"

/**
 * A restrained save-state indicator. Text-first (never color-only), with a small
 * icon from the existing icon set and a polite live region so screen readers hear
 * the result. No spinners or distracting animation.
 */
export function SaveState({ status, idleHint }: { status: SaveStatus; idleHint?: string }) {
  return (
    <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground" aria-live="polite">
      {status === "saved" && (
        <>
          <Check className="h-3.5 w-3.5 text-avanza-green-dark" aria-hidden /> Saved on this device
        </>
      )}
      {status === "error" && (
        <>
          <CircleAlert className="h-3.5 w-3.5 text-avanza-orange-dark" aria-hidden />
          <span className="text-avanza-orange-dark">Couldn&apos;t save — your browser may be blocking storage</span>
        </>
      )}
      {status === "idle" && (idleHint ?? "Saved automatically on this device")}
    </p>
  )
}

/**
 * Accessible confirmation dialog. Traps focus, restores focus to the trigger on
 * close, closes on Escape or backdrop click, and is labelled/described for screen
 * readers. Rendered only when `open`.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
  onCancel,
}: {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  const titleId = useId()
  const descId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    previouslyFocused.current = document.activeElement as HTMLElement | null
    // Focus the cancel (least destructive) button when the dialog opens.
    const id = window.setTimeout(() => cancelRef.current?.focus(), 0)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onCancel()
        return
      }
      if (e.key !== "Tab") return
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    const { overflow } = document.body.style
    document.body.style.overflow = "hidden"
    return () => {
      window.clearTimeout(id)
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = overflow
      previouslyFocused.current?.focus?.()
    }
  }, [open, onCancel])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-avanza-dark/40" onClick={onCancel} aria-hidden />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-xl"
      >
        <div className="flex items-start gap-3">
          {destructive && <AlertTriangle className="mt-0.5 h-5 w-5 flex-none text-avanza-orange-dark" aria-hidden />}
          <div>
            <h2 id={titleId} className="text-lg font-bold text-foreground">
              {title}
            </h2>
            <p id={descId} className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-avanza-green/60 hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={
              destructive
                ? "inline-flex items-center rounded-md bg-avanza-orange px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-avanza-orange-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-orange focus-visible:ring-offset-2"
                : "inline-flex items-center rounded-md bg-avanza-green px-4 py-2 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
            }
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
