"use client"

import { cn } from "@/lib/utils"

const TONE_CLASSES = {
  green: "hover:border-avanza-green hover:text-avanza-green focus-visible:ring-avanza-green",
  purple: "hover:border-avanza-purple hover:text-avanza-purple focus-visible:ring-avanza-purple",
  orange: "hover:border-avanza-orange hover:text-avanza-orange-dark focus-visible:ring-avanza-orange",
} as const

/**
 * Triggers the browser's print dialog. Hidden in the printed output itself via
 * the `.print-hidden` utility so it never appears on the handout. `tone` picks
 * the hover/focus accent so it can match the surrounding curriculum's color.
 */
export function PrintButton({
  label = "Print this page",
  tone = "green",
  className,
}: {
  label?: string
  tone?: keyof typeof TONE_CLASSES
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={cn(
        "print-hidden inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        TONE_CLASSES[tone],
        className,
      )}
    >
      {label}
    </button>
  )
}
