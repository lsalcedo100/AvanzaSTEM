"use client"

import { cn } from "@/lib/utils"

/**
 * Triggers the browser's print dialog. Hidden in the printed output itself via
 * the `.print-hidden` utility so it never appears on the handout.
 */
export function PrintButton({
  label = "Print this page",
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={cn(
        "print-hidden inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-avanza-green hover:text-avanza-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2",
        className,
      )}
    >
      {label}
    </button>
  )
}
