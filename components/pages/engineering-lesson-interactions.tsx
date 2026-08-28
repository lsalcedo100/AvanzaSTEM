"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import type { Translations } from "@/i18n/translations"

type InteractionStrings = Translations["courseUi"]["engineering"]["interactions"]

/** The lesson interaction copy in the reader's language. */
function useI(): InteractionStrings {
  return useLanguage().t.courseUi.engineering.interactions
}

/* ---------------------------------------------------------------------------
 * Failure point selector
 *
 * A reflection tool: the student picks what failed first on their build, and
 * the tool shows specific, practical fixes for that failure. Ephemeral - it does
 * not persist, since it is a "think about your build right now" prompt.
 * ------------------------------------------------------------------------- */

type FailureOption = {
  key: string
  label: string
  suggestions: string[]
}

const failureOptions = (I: InteractionStrings): FailureOption[] => [
  {
    key: "middle-bent",
    label: I.fMiddleBent,
    suggestions: [I.fMiddleBent1, I.fMiddleBent2, I.fMiddleBent3, I.fMiddleBent4],
  },
  {
    key: "side-collapsed",
    label: I.fSideCollapsed,
    suggestions: [I.fSideCollapsed1, I.fSideCollapsed2, I.fSideCollapsed3, I.fSideCollapsed4],
  },
  {
    key: "tape-loose",
    label: I.fTapeLoose,
    suggestions: [I.fTapeLoose1, I.fTapeLoose2, I.fTapeLoose3, I.fTapeLoose4],
  },
  {
    key: "base-tipped",
    label: I.fBaseTipped,
    suggestions: [I.fBaseTipped1, I.fBaseTipped2, I.fBaseTipped3, I.fBaseTipped4],
  },
  {
    key: "object-slipped",
    label: I.fObjectSlipped,
    suggestions: [I.fObjectSlipped1, I.fObjectSlipped2, I.fObjectSlipped3, I.fObjectSlipped4],
  },
  {
    key: "too-heavy",
    label: I.fTooHeavy,
    suggestions: [I.fTooHeavy1, I.fTooHeavy2, I.fTooHeavy3, I.fTooHeavy4],
  },
  {
    key: "unbalanced",
    label: I.fUnbalanced,
    suggestions: [I.fUnbalanced1, I.fUnbalanced2, I.fUnbalanced3, I.fUnbalanced4],
  },
  {
    key: "no-smooth-motion",
    label: I.fNoSmoothMotion,
    suggestions: [
      I.fNoSmoothMotion1,
      I.fNoSmoothMotion2,
      I.fNoSmoothMotion3,
      I.fNoSmoothMotion4,
    ],
  },
]

export function FailurePointSelector() {
  const I = useI()
  const FAILURE_OPTIONS = failureOptions(I)
  const [selected, setSelected] = useState<string | null>(null)
  const active = FAILURE_OPTIONS.find((option) => option.key === selected) ?? null

  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {I.failureIntro}
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {FAILURE_OPTIONS.map((option) => {
          const isActive = option.key === selected
          return (
            <button
              key={option.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelected(isActive ? null : option.key)}
              className={`rounded-md border px-4 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-purple focus-visible:ring-offset-2 ${
                isActive
                  ? "border-avanza-purple bg-avanza-purple/5 text-foreground"
                  : "border-border text-foreground/90 hover:border-avanza-purple/60"
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      <div aria-live="polite" className="mt-4">
        {active && (
          <div className="rounded-md border border-border bg-secondary p-5">
            <p className="text-sm font-semibold text-foreground">
              {I.waysToFix.replace("{label}", active.label.toLowerCase())}
            </p>
            <ul className="mt-3 space-y-2">
              {active.suggestions.map((suggestion) => (
                <li key={suggestion} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-purple" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              {I.changeOneThing}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------------------
 * Design journal
 *
 * Four short prompts a student can type into, saved to localStorage per lesson.
 * Optional and private to the browser: no account, no backend. SSR-safe - the
 * fields start empty (matching the server render) and load after mount.
 * ------------------------------------------------------------------------- */

type JournalNotes = {
  firstIdea: string
  testing: string
  changed: string
  learned: string
}

const journalFields = (
  I: InteractionStrings,
): { key: keyof JournalNotes; label: string; placeholder: string }[] => [
  { key: "firstIdea", label: I.jFirstIdea, placeholder: I.jFirstIdeaPh },
  { key: "testing", label: I.jTesting, placeholder: I.jTestingPh },
  { key: "changed", label: I.jChanged, placeholder: I.jChangedPh },
  { key: "learned", label: I.jLearned, placeholder: I.jLearnedPh },
]

function emptyNotes(): JournalNotes {
  return { firstIdea: "", testing: "", changed: "", learned: "" }
}

function journalKey(slug: string) {
  return `avanza-engineering-journal-${slug}-v1`
}

function loadNotes(slug: string): JournalNotes {
  if (typeof window === "undefined") return emptyNotes()
  try {
    const raw = window.localStorage.getItem(journalKey(slug))
    if (!raw) return emptyNotes()
    const parsed = JSON.parse(raw) as Partial<JournalNotes>
    return {
      firstIdea: typeof parsed.firstIdea === "string" ? parsed.firstIdea : "",
      testing: typeof parsed.testing === "string" ? parsed.testing : "",
      changed: typeof parsed.changed === "string" ? parsed.changed : "",
      learned: typeof parsed.learned === "string" ? parsed.learned : "",
    }
  } catch {
    return emptyNotes()
  }
}

export function DesignJournal({ slug }: { slug: string }) {
  const I = useI()
  const JOURNAL_FIELDS = journalFields(I)
  const [notes, setNotes] = useState<JournalNotes>(emptyNotes)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setNotes(loadNotes(slug))
    setLoaded(true)
  }, [slug])

  // Persist after load, so the empty initial state never overwrites saved notes.
  useEffect(() => {
    if (!loaded) return
    try {
      window.localStorage.setItem(journalKey(slug), JSON.stringify(notes))
    } catch {
      // Notes still work on screen if storage is unavailable.
    }
  }, [notes, loaded, slug])

  const isEmpty = Object.values(notes).every((value) => value.trim() === "")

  const handleClear = () => {
    if (window.confirm(I.clearConfirm)) {
      setNotes(emptyNotes())
    }
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {I.journalIntro}
      </p>

      <div className="mt-4 space-y-4">
        {JOURNAL_FIELDS.map((field) => (
          <div key={field.key}>
            <label
              htmlFor={`journal-${slug}-${field.key}`}
              className="text-sm font-semibold text-foreground"
            >
              {field.label}
            </label>
            <textarea
              id={`journal-${slug}-${field.key}`}
              value={notes[field.key]}
              onChange={(event) =>
                setNotes((prev) => ({ ...prev, [field.key]: event.target.value }))
              }
              disabled={!loaded}
              rows={3}
              placeholder={field.placeholder}
              className="mt-2 w-full resize-y rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-purple focus-visible:ring-offset-2 disabled:opacity-50"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4">
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {loaded ? I.savedOnDevice : I.loadingNotes}
        </p>
        {loaded && !isEmpty && (
          <button
            type="button"
            onClick={handleClear}
            className="text-xs font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-purple focus-visible:ring-offset-2"
          >
            {I.clearNotes}
          </button>
        )}
      </div>
    </div>
  )
}
