"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

export type PythonIdeHelpPanelProps = {
  onClose: () => void
}

/**
 * A compact Help modal: short, collapsible sections (built on the shared Radix
 * {@link Accordion}) covering how to run code, what the panels do, common
 * errors, shortcuts, resetting, and where code runs. Kept brief on purpose -
 * it's reference, not a tutorial - and fully closable.
 */
export function PythonIdeHelpPanel({ onClose }: PythonIdeHelpPanelProps) {
  const { t } = useLanguage()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  const sections = [
    { id: "run", title: t.home.pyHelpRunTitle, body: t.home.pyHelpRunBody },
    { id: "panels", title: t.home.pyHelpPanelsTitle, body: t.home.pyHelpPanelsBody },
    { id: "errors", title: t.home.pyHelpErrorsTitle, body: t.home.pyHelpErrorsBody },
    { id: "shortcuts", title: t.home.pyHelpShortcutsTitle, body: t.home.pyHelpShortcutsBody },
    { id: "reset", title: t.home.pyHelpResetTitle, body: t.home.pyHelpResetBody },
    { id: "privacy", title: t.home.pyHelpPrivacyTitle, body: t.home.pyHelpPrivacyBody },
  ]

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
        aria-labelledby="py-help-title"
        className="relative flex max-h-full w-full max-w-md flex-col overflow-hidden rounded-lg border border-[#2b3042] bg-[#161927] shadow-2xl"
      >
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/10 px-4">
          <h2 id="py-help-title" className="m-0 text-sm font-semibold text-white">
            {t.home.pyIdeHelpTitle}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.home.pyClosePanel}
            title={t.home.pyClosePanel}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4">
          <Accordion type="single" collapsible defaultValue="run" className="text-white">
            {sections.map((s) => (
              <AccordionItem key={s.id} value={s.id} className="border-white/10">
                <AccordionTrigger className="text-white hover:no-underline [&>svg]:text-white/50">
                  {s.title}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-white/70">
                  {s.body}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="flex shrink-0 justify-end border-t border-white/10 p-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 items-center rounded-md bg-white/10 px-3.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
          >
            {t.home.pyIdeHelpClose}
          </button>
        </div>
      </div>
    </div>
  )
}
