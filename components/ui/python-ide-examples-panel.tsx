"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { cn } from "@/lib/utils"

export type IdeExample = {
  id: string
  label: string
  desc: string
  code: string
  tip: string
}

export type PythonIdeExamplesPanelProps = {
  examples: IdeExample[]
  /** The example shown in the detail column. */
  selectedId: string
  /** The example currently loaded in the editor, if any. */
  activeId: string | null
  onSelect: (id: string) => void
  onLoad: (example: IdeExample) => void
  onClose: () => void
}

/**
 * A compact modal for browsing beginner examples. Two columns on wider screens
 * (a plain title list plus a detail pane with a one-sentence explanation, a
 * read-only code preview, and a clear "Load example" action), stacking on
 * small screens. No decorative cards, badges, or per-example icons - just a
 * list. Loading routes through the workspace's "replace changed code?" guard.
 */
export function PythonIdeExamplesPanel({
  examples,
  selectedId,
  activeId,
  onSelect,
  onLoad,
  onClose,
}: PythonIdeExamplesPanelProps) {
  const { t } = useLanguage()
  const selected = examples.find((e) => e.id === selectedId) ?? examples[0]
  const loadButtonRef = useRef<HTMLButtonElement>(null)

  // Move focus into the dialog when it opens.
  useEffect(() => {
    loadButtonRef.current?.focus()
  }, [])

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-3 sm:p-4">
      <button
        type="button"
        aria-label={t.home.pyClosePanel}
        className="absolute inset-0 cursor-default bg-black/55"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="py-examples-title"
        className="relative flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-[#2b3042] bg-[#161927] shadow-2xl"
      >
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/10 px-4">
          <h2 id="py-examples-title" className="m-0 text-sm font-semibold text-white">
            {t.home.pyIdeExamples}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.home.pyClosePanel}
            title={t.home.pyClosePanel}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-rows-[auto_1fr] sm:grid-cols-[minmax(0,11rem)_1fr] sm:grid-rows-1">
          {/* Title list */}
          <nav
            aria-label={t.home.pyExChoose}
            className="min-h-0 overflow-y-auto border-b border-white/10 p-2 sm:border-b-0 sm:border-r"
          >
            <ul className="m-0 flex list-none gap-1 overflow-x-auto p-0 sm:flex-col sm:overflow-x-visible">
              {examples.map((ex) => {
                const isSelected = ex.id === selected.id
                return (
                  <li key={ex.id} className="shrink-0 sm:shrink">
                    <button
                      type="button"
                      onClick={() => onSelect(ex.id)}
                      onFocus={() => onSelect(ex.id)}
                      aria-current={isSelected ? "true" : undefined}
                      className={cn(
                        "flex w-full items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-left text-sm transition-colors sm:whitespace-normal",
                        isSelected
                          ? "bg-white/10 font-medium text-white"
                          : "text-white/70 hover:bg-white/5 hover:text-white",
                      )}
                    >
                      <span className="min-w-0 flex-1">{ex.label}</span>
                      {activeId === ex.id && (
                        <span className="shrink-0 rounded bg-avanza-green/15 px-1.5 py-0.5 text-[11px] font-medium text-avanza-green">
                          {t.home.pyExCurrent}
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Detail */}
          <div className="flex min-h-0 flex-col overflow-y-auto p-4">
            <h3 className="m-0 text-base font-semibold text-white">{selected.label}</h3>
            <p className="m-0 mt-1 text-sm leading-relaxed text-white/65">{selected.desc}</p>

            <p className="m-0 mt-3 mb-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-white/50">
              {t.home.pyExCode}
            </p>
            <pre className="m-0 max-h-56 overflow-auto rounded-md border border-white/10 bg-[#0f1120] p-3 font-mono text-[13px] leading-[1.6] text-[#d8dee9]">
              {selected.code}
            </pre>

            <div className="mt-4">
              <button
                ref={loadButtonRef}
                type="button"
                onClick={() => onLoad(selected)}
                className="inline-flex h-9 items-center rounded-md bg-avanza-green px-4 text-sm font-semibold text-avanza-dark transition-colors hover:bg-emerald-400"
              >
                {t.home.pyExLoad}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
