"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import { PrintButton } from "@/components/ui/print-button"

const STORAGE_KEY = "avanza-science-experiments-journal-v1"

/** One lesson's saved journal: prompt id -> the child's text. */
type JournalEntry = Record<string, string>
/** All lessons' journals, keyed by lesson slug. */
type JournalStore = Record<string, JournalEntry>

/**
 * The six writing prompts, in the order of the course loop, so the journal
 * reinforces Ask -> Predict -> Test -> Observe -> Explain -> Improve.
 *
 * Only the ids are fixed here: they key the saved entries, so they must stay
 * stable and language-independent or a student switching language would lose
 * their notes. The stage, label, and hint come from `t.courseUi.science.prompts`
 * in the same order.
 */
const PROMPT_IDS = ["question", "prediction", "changed", "noticed", "why", "improve"] as const

function loadStore(): JournalStore {
  if (typeof window === "undefined") return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as JournalStore) : {}
  } catch {
    // localStorage can be blocked or corrupt in private/restricted contexts.
    return {}
  }
}

function persistStore(store: JournalStore) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    // The journal still works in the current session if saving is unavailable.
  }
}

/**
 * A per-lesson lab journal. Six prompts (one per loop stage) plus a drawing box,
 * styled like notebook pages. Typed notes are saved to localStorage, keyed by
 * lesson slug, and debounced so we do not write on every keystroke. Nothing is
 * sent to a server. SSR-safe: textareas start empty on the server and the first
 * client render, then fill in from localStorage after mount (no hydration
 * mismatch). The whole lesson - including these boxes - can be printed for kids
 * who would rather write and draw by hand.
 */
export function ScienceLabJournal({ slug }: { slug: string }) {
  const { t } = useLanguage()
  const ui = t.courseUi.science
  const shared = t.courseUi.shared
  const [entry, setEntry] = useState<JournalEntry>({})
  const [loaded, setLoaded] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const store = loadStore()
    setEntry(store[slug] ?? {})
    setLoaded(true)
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [slug])

  const scheduleSave = useCallback(
    (next: JournalEntry) => {
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        const store = loadStore()
        const hasText = Object.values(next).some((value) => value.trim().length > 0)
        if (hasText) {
          store[slug] = next
        } else {
          delete store[slug]
        }
        persistStore(store)
      }, 400)
    },
    [slug],
  )

  const handleChange = (id: string, value: string) => {
    setEntry((prev) => {
      const next = { ...prev, [id]: value }
      scheduleSave(next)
      return next
    })
  }

  const handleClear = () => {
    if (!window.confirm(ui.journalConfirmClear)) return
    if (timer.current) clearTimeout(timer.current)
    setEntry({})
    const store = loadStore()
    delete store[slug]
    persistStore(store)
  }

  const hasNotes = loaded && Object.values(entry).some((value) => value.trim().length > 0)

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">{ui.journalTitle}</h2>
          <PrintButton label={shared.printLesson} tone="orange" />
        </div>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{ui.journalIntro}</p>

        <div className="mt-8 space-y-6">
          {PROMPT_IDS.map((id, index) => {
            const prompt = ui.prompts[index]
            return (
              <div key={id} className="notebook-grid rounded-lg border border-border bg-card p-5">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-avanza-orange-dark">
                    {prompt.stage}
                  </span>
                  <label
                    htmlFor={`journal-${slug}-${id}`}
                    className="text-sm font-bold text-foreground"
                  >
                    {prompt.label}
                  </label>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{prompt.hint}</p>
                <textarea
                  id={`journal-${slug}-${id}`}
                  value={entry[id] ?? ""}
                  onChange={(event) => handleChange(id, event.target.value)}
                  rows={3}
                  spellCheck
                  placeholder={shared.writeHere}
                  className="mt-3 block w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-orange"
                />
              </div>
            )
          })}

          {/* Drawing box - meant for the printout, but also a clear space on screen. */}
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-avanza-orange-dark">
                {ui.drawStage}
              </span>
              <p className="text-sm font-bold text-foreground">{ui.drawTitle}</p>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{ui.drawHint}</p>
            <div
              aria-hidden
              className="mt-3 h-44 rounded-md border border-dashed border-border bg-background"
            />
          </div>
        </div>

        {hasNotes && (
          <button
            type="button"
            onClick={handleClear}
            className="print-hidden mt-6 text-sm font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-orange focus-visible:ring-offset-2"
          >
            {ui.journalClear}
          </button>
        )}
      </div>
    </section>
  )
}
