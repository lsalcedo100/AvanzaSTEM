"use client"

import { useEffect, useState } from "react"

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

const FAILURE_OPTIONS: FailureOption[] = [
  {
    key: "middle-bent",
    label: "The middle bent",
    suggestions: [
      "Add a support underneath the middle.",
      "Shorten the span so there is less distance to hold up.",
      "Fold or layer the material to make it stiffer.",
      "Move the weight closer to the supports.",
    ],
  },
  {
    key: "side-collapsed",
    label: "A side collapsed",
    suggestions: [
      "Brace the sides with triangles.",
      "Connect the two sides so they move together.",
      "Use a stiffer material or a second layer on the side that failed.",
      "Widen the base so the sides are less likely to fold.",
    ],
  },
  {
    key: "tape-loose",
    label: "The tape came loose",
    suggestions: [
      "Use less force on the joint.",
      "Add more surface area for the tape to hold.",
      "Support the joint with another piece behind it.",
      "Test with smaller weights first, then add more slowly.",
    ],
  },
  {
    key: "base-tipped",
    label: "The base tipped over",
    suggestions: [
      "Widen the base so it covers more ground.",
      "Lower the heavy parts closer to the bottom.",
      "Add a little weight to the base to hold it down.",
      "Spread the feet or supports farther apart.",
    ],
  },
  {
    key: "object-slipped",
    label: "The object slipped",
    suggestions: [
      "Add texture or a hook to the grip.",
      "Make the grip close tighter around the object.",
      "Use a deeper cup or pocket to hold it.",
      "Slow down as you lift and move it.",
    ],
  },
  {
    key: "too-heavy",
    label: "It was too heavy",
    suggestions: [
      "Remove any material you do not really need.",
      "Use lighter materials where you can.",
      "Keep the heavy parts low and small.",
      "Replace solid parts with an open frame.",
    ],
  },
  {
    key: "unbalanced",
    label: "It was unbalanced",
    suggestions: [
      "Widen the base.",
      "Move the weight toward the center.",
      "Make both sides more even.",
      "Test slowly before adding more weight.",
    ],
  },
  {
    key: "no-smooth-motion",
    label: "It did not move smoothly",
    suggestions: [
      "Loosen a joint that is pinched too tight.",
      "Tighten a joint that is too loose and floppy.",
      "Reduce rubbing where two parts drag on each other.",
      "Check that the pivot lines up straight.",
    ],
  },
]

export function FailurePointSelector() {
  const [selected, setSelected] = useState<string | null>(null)
  const active = FAILURE_OPTIONS.find((option) => option.key === selected) ?? null

  return (
    <div>
      <p className="text-sm text-muted-foreground">
        What failed first when you tested it? Pick one to see ways to fix it.
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
              Ways to fix &ldquo;{active.label.toLowerCase()}&rdquo;
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
              Change one thing, then test again to see if it helped.
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

const JOURNAL_FIELDS: { key: keyof JournalNotes; label: string; placeholder: string }[] = [
  { key: "firstIdea", label: "My first idea", placeholder: "What was your plan before you built it?" },
  {
    key: "testing",
    label: "What happened during testing",
    placeholder: "What did you see when you tested it?",
  },
  { key: "changed", label: "What I changed", placeholder: "What did you change after testing, and why?" },
  { key: "learned", label: "What I learned", placeholder: "What do you know now that you did not before?" },
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
    if (window.confirm("Clear your notes for this lesson? This cannot be undone.")) {
      setNotes(emptyNotes())
    }
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground">
        Jot down your thinking as you work. Your notes are saved on this device only - they are
        optional and private to you.
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
          {loaded ? "Saved on this device" : "Loading your notes…"}
        </p>
        {loaded && !isEmpty && (
          <button
            type="button"
            onClick={handleClear}
            className="text-xs font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-purple focus-visible:ring-offset-2"
          >
            Clear notes
          </button>
        )}
      </div>
    </div>
  )
}
