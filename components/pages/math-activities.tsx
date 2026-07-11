"use client"

import { useState } from "react"
import { ArrowRight, Check, Info, Minus, Plus, X } from "lucide-react"
import { MathActivityVisual } from "@/components/ui/math-diagrams"
import type { MathInteractiveActivity } from "@/features/curriculums/math-adventures"

/**
 * The interactive practice area for a lesson. Routes each lesson's
 * `interactiveActivity.type` to a concept-driven widget. Weeks 1-4 have real,
 * keyboard-friendly interactions; every other type falls back to a static visual
 * plus the activity's written steps, so no lesson is ever left blank. All widgets
 * are self-contained client components using plain React state - no drag-only
 * interactions, no animation libraries, no color-only feedback.
 */
export function MathActivity({ activity }: { activity: MathInteractiveActivity }) {
  switch (activity.type) {
    case "number-line":
      return <MysteryNumberLab />
    case "card-sort":
      return <OperationSort />
    case "input-output-machine":
      return <PatternMachine />
    case "place-value-builder":
      return <PlaceValueBuilder />
    case "fraction-model":
      return <FractionShop />
    case "estimation-station":
      return <MeasurementMatch />
    case "shape-explorer":
      return <GeometryShapeHunt />
    case "money-counter":
      return <BudgetBuilder />
    case "graph-builder":
      return <GraphBuilder />
    case "city-planner":
      return <LogicMaze />
    default:
      return <ActivityFallback activity={activity} />
  }
}

/* -------------------------------------------------------------------------- */
/* Shared building blocks                                                     */
/* -------------------------------------------------------------------------- */

const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-md bg-avanza-teal px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-avanza-teal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

const outlineBtn =
  "inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-avanza-teal hover:bg-avanza-teal/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

const numberInput =
  "w-24 rounded-md border border-border bg-background px-3 py-2 text-center text-base font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-1"

type FeedbackTone = "correct" | "incorrect" | "neutral"

/**
 * A feedback panel that never relies on color alone: it always pairs a tone with
 * an icon and a bold text label, and announces itself politely to screen readers.
 */
function Feedback({
  tone,
  title,
  children,
}: {
  tone: FeedbackTone
  title: string
  children?: React.ReactNode
}) {
  const Icon = tone === "correct" ? Check : tone === "incorrect" ? X : Info
  const toneClass =
    tone === "correct"
      ? "border-avanza-teal/50 bg-avanza-teal/5"
      : tone === "incorrect"
        ? "border-avanza-orange/50 bg-avanza-orange/5"
        : "border-border bg-secondary"

  return (
    <div role="status" aria-live="polite" className={`mt-4 flex gap-3 rounded-md border p-4 ${toneClass}`}>
      <Icon aria-hidden className="mt-0.5 h-5 w-5 flex-none text-foreground" />
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        {children && <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{children}</div>}
      </div>
    </div>
  )
}

/** A number shown as a card, used for sequences and mystery numbers. */
function NumberCard({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <span
      className={
        "flex h-12 min-w-12 items-center justify-center rounded-md border px-3 font-mono text-lg font-bold " +
        (muted
          ? "border-dashed border-border text-muted-foreground"
          : "border-border bg-card text-foreground")
      }
    >
      {children}
    </span>
  )
}

type QuizQuestion = {
  prompt: string
  note?: string
  options: string[]
  correctIndex: number
  explanation: string
}

/**
 * A reusable one-question-at-a-time multiple-choice quiz with a running score,
 * per-option correct/your-pick markers (icon + text, never color alone), an
 * explanation after each answer, and a results summary. `renderOption` lets a
 * caller draw richer options (e.g. shape glyphs); by default the option string
 * is shown as text. `layout` chooses a stacked list or a two-column grid.
 */
function ChoiceQuiz({
  questions,
  renderOption,
  layout = "list",
}: {
  questions: QuizQuestion[]
  renderOption?: (option: string) => React.ReactNode
  layout?: "list" | "grid"
}) {
  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState<number | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [done, setDone] = useState(false)

  const question = questions[index]
  const isCorrect = choice === question.correctIndex

  const pick = (i: number) => {
    if (choice !== null) return
    setChoice(i)
    if (i === question.correctIndex) setCorrectCount((c) => c + 1)
  }

  const next = () => {
    if (index + 1 >= questions.length) {
      setDone(true)
      return
    }
    setIndex((i) => i + 1)
    setChoice(null)
  }

  const restart = () => {
    setIndex(0)
    setChoice(null)
    setCorrectCount(0)
    setDone(false)
  }

  if (done) {
    return (
      <div>
        <Feedback tone="correct" title={`You got ${correctCount} of ${questions.length} right.`}>
          Nice reasoning. Try again to see if you can explain every answer.
        </Feedback>
        <button type="button" onClick={restart} className={`mt-4 ${outlineBtn}`}>
          Try again
        </button>
      </div>
    )
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Question {index + 1} of {questions.length}
      </p>
      <p className="mt-3 text-base leading-relaxed text-foreground">{question.prompt}</p>
      {question.note && <p className="mt-1 text-sm text-muted-foreground">{question.note}</p>}

      <div className={layout === "grid" ? "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3" : "mt-4 space-y-2"}>
        {question.options.map((option, i) => {
          const isChosen = choice === i
          const isAnswer = choice !== null && i === question.correctIndex
          const state =
            choice === null
              ? ""
              : isAnswer
                ? " border-avanza-teal ring-2 ring-avanza-teal/40"
                : isChosen
                  ? " border-avanza-orange"
                  : " opacity-60"
          return (
            <button
              key={option}
              type="button"
              onClick={() => pick(i)}
              disabled={choice !== null}
              aria-pressed={isChosen}
              className={
                (layout === "grid"
                  ? "flex flex-col items-center gap-2 text-center"
                  : "flex w-full items-center justify-between text-left") +
                " rounded-md border border-border px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-avanza-teal hover:bg-avanza-teal/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-2 disabled:cursor-default" +
                state
              }
            >
              <span className={layout === "grid" ? "" : "flex-1"}>
                {renderOption ? renderOption(option) : option}
              </span>
              {choice !== null && isAnswer && (
                <span className="inline-flex items-center gap-1 text-xs text-avanza-teal-dark">
                  <Check aria-hidden className="h-3.5 w-3.5" /> correct
                </span>
              )}
              {choice !== null && isChosen && !isAnswer && (
                <span className="inline-flex items-center gap-1 text-xs text-avanza-orange">
                  <X aria-hidden className="h-3.5 w-3.5" /> your pick
                </span>
              )}
            </button>
          )
        })}
      </div>

      {choice !== null && (
        <>
          <Feedback tone={isCorrect ? "correct" : "incorrect"} title={isCorrect ? "Correct." : "Not quite."}>
            {question.explanation}
          </Feedback>
          <button type="button" onClick={next} className={`mt-4 ${primaryBtn}`}>
            {index + 1 >= questions.length ? "See results" : "Next question"}
          </button>
        </>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* 1. Mystery Number Lab  (Week 1: Number Detectives)                         */
/* -------------------------------------------------------------------------- */

type Clue =
  | { kind: "gt"; value: number }
  | { kind: "lt"; value: number }
  | { kind: "even" }
  | { kind: "odd" }
  | { kind: "digit"; place: "ones" | "tens" | "hundreds"; value: number }
  | { kind: "multiple"; value: number }

type Mystery = { title: string; clues: Clue[]; answer: number }

const MYSTERIES: Mystery[] = [
  {
    title: "Case #1",
    clues: [
      { kind: "gt", value: 40 },
      { kind: "lt", value: 70 },
      { kind: "digit", place: "tens", value: 5 },
      { kind: "even" },
      { kind: "digit", place: "ones", value: 0 },
    ],
    answer: 50,
  },
  {
    title: "Case #2",
    clues: [
      { kind: "gt", value: 20 },
      { kind: "lt", value: 40 },
      { kind: "odd" },
      { kind: "digit", place: "tens", value: 3 },
      { kind: "digit", place: "ones", value: 7 },
    ],
    answer: 37,
  },
  {
    title: "Case #3",
    clues: [
      { kind: "gt", value: 60 },
      { kind: "lt", value: 80 },
      { kind: "multiple", value: 5 },
      { kind: "even" },
    ],
    answer: 70,
  },
  {
    title: "Case #4",
    clues: [
      { kind: "gt", value: 100 },
      { kind: "lt", value: 150 },
      { kind: "multiple", value: 10 },
      { kind: "digit", place: "tens", value: 2 },
    ],
    answer: 120,
  },
]

function digitOf(n: number, place: "ones" | "tens" | "hundreds"): number {
  const abs = Math.abs(n)
  if (place === "ones") return abs % 10
  if (place === "tens") return Math.floor(abs / 10) % 10
  return Math.floor(abs / 100) % 10
}

function clueText(c: Clue): string {
  switch (c.kind) {
    case "gt":
      return `I am greater than ${c.value}.`
    case "lt":
      return `I am less than ${c.value}.`
    case "even":
      return "I am an even number."
    case "odd":
      return "I am an odd number."
    case "digit":
      return `I have a ${c.value} in the ${c.place} place.`
    case "multiple":
      return `I am a multiple of ${c.value}.`
  }
}

function clueTest(c: Clue, n: number): boolean {
  switch (c.kind) {
    case "gt":
      return n > c.value
    case "lt":
      return n < c.value
    case "even":
      return n % 2 === 0
    case "odd":
      return n % 2 !== 0
    case "digit":
      return digitOf(n, c.place) === c.value
    case "multiple":
      return n % c.value === 0
  }
}

function MysteryNumberLab() {
  const [index, setIndex] = useState(0)
  const [guess, setGuess] = useState("")
  const [checked, setChecked] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)

  const mystery = MYSTERIES[index]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = Number.parseInt(guess, 10)
    setChecked(Number.isNaN(value) ? null : value)
  }

  const newMystery = () => {
    setIndex((i) => (i + 1) % MYSTERIES.length)
    setGuess("")
    setChecked(null)
    setRevealed(false)
  }

  const results = checked === null ? null : mystery.clues.map((c) => clueTest(c, checked))
  const allPass = results !== null && results.every(Boolean)

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {mystery.title} &middot; find the mystery number
      </p>

      <ul className="mt-3 space-y-2">
        {mystery.clues.map((c, i) => {
          const pass = results?.[i]
          return (
            <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/90">
              {results === null ? (
                <span aria-hidden className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-avanza-teal" />
              ) : pass ? (
                <Check aria-hidden className="mt-0.5 h-4 w-4 flex-none text-avanza-teal-dark" />
              ) : (
                <X aria-hidden className="mt-0.5 h-4 w-4 flex-none text-avanza-orange" />
              )}
              <span>
                {clueText(c)}
                {results !== null && (
                  <span className="ml-1 font-semibold text-muted-foreground">
                    {pass ? "(this clue fits)" : "(this clue does not fit)"}
                  </span>
                )}
              </span>
            </li>
          )
        })}
      </ul>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-wrap items-end gap-3">
        <div>
          <label htmlFor="mystery-guess" className="block text-sm font-semibold text-foreground">
            Your answer
          </label>
          <input
            id="mystery-guess"
            type="number"
            inputMode="numeric"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className={`mt-1 ${numberInput}`}
            placeholder="?"
          />
        </div>
        <button type="submit" className={primaryBtn}>
          Check answer
        </button>
        <button type="button" onClick={newMystery} className={outlineBtn}>
          New mystery
        </button>
      </form>

      {checked === null && guess !== "" && (
        <Feedback tone="neutral" title="Enter a whole number to check it against the clues." />
      )}

      {checked !== null &&
        (allPass ? (
          <Feedback tone="correct" title={`Solved it - ${checked} fits every clue.`}>
            A good detective checks the number against all of the clues at once, not just one.
          </Feedback>
        ) : (
          <Feedback tone="incorrect" title={`${checked} does not fit yet.`}>
            Look at the clues marked with an &times;. Use them to cross out numbers until only one is
            left.
          </Feedback>
        ))}

      <div className="mt-4">
        {revealed ? (
          <p className="text-sm text-muted-foreground">
            The mystery number was{" "}
            <span className="font-semibold text-foreground">{mystery.answer}</span>.
          </p>
        ) : (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="text-sm font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-2"
          >
            Stuck? Reveal the answer
          </button>
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* 2. Operation Sort  (Week 2: Operation Quest)                               */
/* -------------------------------------------------------------------------- */

type Op = "add" | "subtract" | "multiply" | "divide"

type OpProblem = { text: string; op: Op; answer: number; why: string }

const OP_META: Record<Op, { label: string; symbol: string }> = {
  add: { label: "Add", symbol: "+" },
  subtract: { label: "Subtract", symbol: "−" },
  multiply: { label: "Multiply", symbol: "×" },
  divide: { label: "Divide", symbol: "÷" },
}

const OP_ORDER: Op[] = ["add", "subtract", "multiply", "divide"]

const OP_PROBLEMS: OpProblem[] = [
  {
    text: "A shelf has 4 rows of books with 6 books in each row. How many books in all?",
    op: "multiply",
    answer: 24,
    why: "Equal groups - rows of the same size - means multiply: 4 × 6 = 24.",
  },
  {
    text: "There are 15 apples. You give away 6. How many are left?",
    op: "subtract",
    answer: 9,
    why: "Taking some away means subtract: 15 − 6 = 9.",
  },
  {
    text: "You have 8 red marbles and 7 blue marbles. How many marbles in total?",
    op: "add",
    answer: 15,
    why: "Joining two groups means add: 8 + 7 = 15.",
  },
  {
    text: "20 stickers are shared equally among 5 friends. How many does each friend get?",
    op: "divide",
    answer: 4,
    why: "Sharing equally means divide: 20 ÷ 5 = 4.",
  },
  {
    text: "A box holds 9 crayons. How many crayons are in 3 boxes?",
    op: "multiply",
    answer: 27,
    why: "Three equal boxes of 9 means multiply: 3 × 9 = 27.",
  },
  {
    text: "A book has 40 pages. You have read 25. How many pages are left?",
    op: "subtract",
    answer: 15,
    why: "Finding what is left means subtract: 40 − 25 = 15.",
  },
  {
    text: "24 cookies are put into bags of 6. How many bags can you fill?",
    op: "divide",
    answer: 4,
    why: "Making equal groups from a total means divide: 24 ÷ 6 = 4.",
  },
  {
    text: "There are 12 boys and 13 girls in the class. How many students altogether?",
    op: "add",
    answer: 25,
    why: "“Altogether” joins the groups, so add: 12 + 13 = 25.",
  },
]

function OperationSort() {
  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState<Op | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [done, setDone] = useState(false)

  const problem = OP_PROBLEMS[index]
  const isCorrect = choice === problem.op

  const pick = (op: Op) => {
    if (choice) return
    setChoice(op)
    if (op === problem.op) setCorrectCount((c) => c + 1)
  }

  const next = () => {
    if (index + 1 >= OP_PROBLEMS.length) {
      setDone(true)
      return
    }
    setIndex((i) => i + 1)
    setChoice(null)
  }

  const restart = () => {
    setIndex(0)
    setChoice(null)
    setCorrectCount(0)
    setDone(false)
  }

  if (done) {
    return (
      <div>
        <Feedback tone="correct" title={`You matched ${correctCount} of ${OP_PROBLEMS.length} problems.`}>
          The trick is to ask what is happening in the story: joining, taking away, making equal
          groups, or sharing.
        </Feedback>
        <button type="button" onClick={restart} className={`mt-4 ${outlineBtn}`}>
          Try again
        </button>
      </div>
    )
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Problem {index + 1} of {OP_PROBLEMS.length}
      </p>

      <p className="mt-3 text-base leading-relaxed text-foreground">{problem.text}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {OP_ORDER.map((op) => {
          const meta = OP_META[op]
          const isChosen = choice === op
          const isAnswer = choice !== null && op === problem.op
          const state =
            choice === null
              ? ""
              : isAnswer
                ? " border-avanza-teal ring-2 ring-avanza-teal/40"
                : isChosen
                  ? " border-avanza-orange"
                  : " opacity-60"
          return (
            <button
              key={op}
              type="button"
              onClick={() => pick(op)}
              disabled={choice !== null}
              aria-pressed={isChosen}
              className={
                "flex flex-col items-center gap-1 rounded-md border border-border px-3 py-3 text-sm font-semibold text-foreground transition-colors hover:border-avanza-teal hover:bg-avanza-teal/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-2 disabled:cursor-default" +
                state
              }
            >
              <span aria-hidden className="font-mono text-xl">
                {meta.symbol}
              </span>
              <span>{meta.label}</span>
              {choice !== null && isAnswer && (
                <span className="inline-flex items-center gap-1 text-xs text-avanza-teal-dark">
                  <Check aria-hidden className="h-3.5 w-3.5" /> correct
                </span>
              )}
              {choice !== null && isChosen && !isAnswer && (
                <span className="inline-flex items-center gap-1 text-xs text-avanza-orange">
                  <X aria-hidden className="h-3.5 w-3.5" /> your pick
                </span>
              )}
            </button>
          )
        })}
      </div>

      {choice !== null && (
        <>
          <Feedback
            tone={isCorrect ? "correct" : "incorrect"}
            title={
              isCorrect
                ? `Yes - this is a ${OP_META[problem.op].label.toLowerCase()} problem.`
                : `Not quite - this is a ${OP_META[problem.op].label.toLowerCase()} problem.`
            }
          >
            {problem.why}
          </Feedback>
          <button type="button" onClick={next} className={`mt-4 ${primaryBtn}`}>
            {index + 1 >= OP_PROBLEMS.length ? "See results" : "Next problem"}
          </button>
        </>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* 3. Pattern Machine  (Week 3: Pattern Machine)                              */
/* -------------------------------------------------------------------------- */

type Pattern = { terms: number[]; missingIndex: number; answer: number; rule: string }

const STANDARD_PATTERNS: Pattern[] = [
  { terms: [2, 4, 6, 0, 10], missingIndex: 3, answer: 8, rule: "Add 2 each time (count by 2s)." },
  { terms: [5, 10, 15, 20, 0], missingIndex: 4, answer: 25, rule: "Add 5 each time (count by 5s)." },
  { terms: [20, 17, 14, 0, 8], missingIndex: 3, answer: 11, rule: "Subtract 3 each time." },
  { terms: [1, 2, 4, 8, 0], missingIndex: 4, answer: 16, rule: "Double the number each time." },
  { terms: [10, 20, 0, 40, 50], missingIndex: 2, answer: 30, rule: "Add 10 each time." },
]

const HARDER_PATTERNS: Pattern[] = [
  { terms: [1, 2, 4, 7, 0], missingIndex: 4, answer: 11, rule: "The gap grows by 1 each time: +1, +2, +3, +4." },
  { terms: [1, 3, 9, 0, 81], missingIndex: 3, answer: 27, rule: "Multiply by 3 each time." },
  { terms: [1, 3, 6, 10, 0], missingIndex: 4, answer: 15, rule: "Add one more each time: +2, +3, +4, +5 (triangular numbers)." },
  { terms: [1, 4, 9, 16, 0], missingIndex: 4, answer: 25, rule: "The square numbers: 1×1, 2×2, 3×3, 4×4, 5×5." },
  { terms: [2, 3, 5, 8, 0], missingIndex: 4, answer: 13, rule: "Add the two numbers before it." },
]

function PatternMachine() {
  const [harder, setHarder] = useState(false)
  const [index, setIndex] = useState(0)
  const [guess, setGuess] = useState("")
  const [checked, setChecked] = useState<number | null>(null)

  const patterns = harder ? HARDER_PATTERNS : STANDARD_PATTERNS
  const pattern = patterns[index]
  const isCorrect = checked !== null && checked === pattern.answer

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = Number.parseInt(guess, 10)
    setChecked(Number.isNaN(value) ? null : value)
  }

  const newPattern = () => {
    setIndex((i) => (i + 1) % patterns.length)
    setGuess("")
    setChecked(null)
  }

  const setMode = (nextHarder: boolean) => {
    setHarder(nextHarder)
    setIndex(0)
    setGuess("")
    setChecked(null)
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Find the missing number
        </p>
        <div className="inline-flex rounded-md border border-border p-0.5" role="group" aria-label="Difficulty">
          <button
            type="button"
            onClick={() => setMode(false)}
            aria-pressed={!harder}
            className={
              "rounded px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal " +
              (!harder ? "bg-avanza-teal text-primary-foreground" : "text-muted-foreground hover:text-foreground")
            }
          >
            Standard
          </button>
          <button
            type="button"
            onClick={() => setMode(true)}
            aria-pressed={harder}
            className={
              "rounded px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal " +
              (harder ? "bg-avanza-teal text-primary-foreground" : "text-muted-foreground hover:text-foreground")
            }
          >
            Harder
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {pattern.terms.map((term, i) =>
            i === pattern.missingIndex ? (
              <span key={i}>
                <label htmlFor="pattern-guess" className="sr-only">
                  Missing number in the sequence
                </label>
                <input
                  id="pattern-guess"
                  type="number"
                  inputMode="numeric"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  className="h-12 w-16 rounded-md border-2 border-dashed border-avanza-teal bg-background text-center font-mono text-lg font-bold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal"
                  placeholder="?"
                  aria-label="Missing number"
                />
              </span>
            ) : (
              <NumberCard key={i}>{term}</NumberCard>
            ),
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button type="submit" className={primaryBtn}>
            Check
          </button>
          <button type="button" onClick={newPattern} className={outlineBtn}>
            New pattern
          </button>
        </div>
      </form>

      {checked !== null &&
        (isCorrect ? (
          <Feedback tone="correct" title={`Right - the missing number is ${pattern.answer}.`}>
            {pattern.rule}
          </Feedback>
        ) : (
          <Feedback tone="incorrect" title={`${checked} is not the missing number.`}>
            Look at how each number changes to reach the next. {pattern.rule}
          </Feedback>
        ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* 4. Place Value Builder  (Week 4: Place Value City)                         */
/* -------------------------------------------------------------------------- */

const PV_TARGETS = [245, 130, 408, 372, 519]

function expandedForm(h: number, t: number, o: number): string {
  const parts: string[] = []
  if (h) parts.push(String(h * 100))
  if (t) parts.push(String(t * 10))
  if (o) parts.push(String(o))
  return parts.length ? parts.join(" + ") : "0"
}

function PlaceValueBuilder() {
  const [targetIndex, setTargetIndex] = useState(0)
  const [h, setH] = useState(0)
  const [t, setT] = useState(0)
  const [o, setO] = useState(0)

  const target = PV_TARGETS[targetIndex]
  const built = h * 100 + t * 10 + o
  const matches = built === target
  const symbol = built < target ? "<" : built > target ? ">" : "="
  const word = built < target ? "less than" : built > target ? "greater than" : "equal to"

  const newNumber = () => {
    setTargetIndex((i) => (i + 1) % PV_TARGETS.length)
    setH(0)
    setT(0)
    setO(0)
  }

  return (
    <div>
      <p className="text-sm text-foreground">
        Build the number{" "}
        <span className="font-mono text-lg font-bold text-avanza-teal-dark">{target}</span> using
        hundreds, tens, and ones.
      </p>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <PlaceColumn label="Hundreds" unit="hundred" value={h} onChange={setH} />
        <PlaceColumn label="Tens" unit="ten" value={t} onChange={setT} />
        <PlaceColumn label="Ones" unit="one" value={o} onChange={setO} />
      </div>

      <BaseTenBlocks h={h} t={t} o={o} />

      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-border p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Standard form
          </dt>
          <dd className="mt-1 font-mono text-2xl font-bold text-foreground">{built}</dd>
        </div>
        <div className="rounded-md border border-border p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Expanded form
          </dt>
          <dd className="mt-1 font-mono text-lg font-semibold text-foreground">
            {expandedForm(h, t, o)}
          </dd>
        </div>
      </dl>

      {matches ? (
        <Feedback tone="correct" title={`You built ${target}.`}>
          {target} is {h} hundred{h === 1 ? "" : "s"}, {t} ten{t === 1 ? "" : "s"}, and {o} one
          {o === 1 ? "" : "s"} - which is {expandedForm(h, t, o)}.
        </Feedback>
      ) : (
        <Feedback tone="neutral" title={`Keep going: ${built} ${symbol} ${target}.`}>
          Your number {built} is {word} the target {target}. Adjust the hundreds, tens, and ones to
          match.
        </Feedback>
      )}

      <button type="button" onClick={newNumber} className={`mt-4 ${outlineBtn}`}>
        New number
      </button>
    </div>
  )
}

function PlaceColumn({
  label,
  unit,
  value,
  onChange,
}: {
  label: string
  unit: string
  value: number
  onChange: (n: number) => void
}) {
  const dec = () => onChange(Math.max(0, value - 1))
  const inc = () => onChange(Math.min(9, value + 1))

  return (
    <div className="rounded-md border border-border p-3 text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p aria-live="polite" className="mt-2 font-mono text-3xl font-bold text-foreground">
        {value}
      </p>
      <div className="mt-2 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={dec}
          disabled={value === 0}
          aria-label={`Remove one ${unit}`}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-avanza-teal hover:bg-avanza-teal/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus aria-hidden className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={inc}
          disabled={value === 9}
          aria-label={`Add one ${unit}`}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-avanza-teal hover:bg-avanza-teal/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus aria-hidden className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

/**
 * Base-ten blocks: hundreds as flats (a 3x3 grid), tens as rods, ones as units.
 * Purely illustrative, so the whole strip carries one descriptive label for
 * assistive tech rather than announcing every block.
 */
function BaseTenBlocks({ h, t, o }: { h: number; t: number; o: number }) {
  if (h === 0 && t === 0 && o === 0) return null

  return (
    <div
      className="mt-4 flex flex-wrap items-end gap-4 rounded-md border border-border bg-secondary p-4"
      role="img"
      aria-label={`Base-ten blocks showing ${h} hundreds, ${t} tens, and ${o} ones.`}
    >
      {h > 0 && (
        <div className="flex flex-wrap items-end gap-1">
          {Array.from({ length: h }, (_, i) => (
            <span
              key={i}
              className="grid h-8 w-8 grid-cols-3 grid-rows-3 overflow-hidden rounded-sm border border-avanza-teal-dark"
            >
              {Array.from({ length: 9 }, (_, j) => (
                <span key={j} className="border border-avanza-teal-dark/40 bg-avanza-teal/50" />
              ))}
            </span>
          ))}
        </div>
      )}
      {t > 0 && (
        <div className="flex items-end gap-1">
          {Array.from({ length: t }, (_, i) => (
            <span key={i} className="h-8 w-2 rounded-sm border border-avanza-teal-dark bg-avanza-teal/50" />
          ))}
        </div>
      )}
      {o > 0 && (
        <div className="flex flex-wrap items-end gap-1" style={{ maxWidth: "5rem" }}>
          {Array.from({ length: o }, (_, i) => (
            <span key={i} className="h-2 w-2 rounded-sm border border-avanza-teal-dark bg-avanza-teal/50" />
          ))}
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* 5. Fraction Pizza Shop  (Week 5: Fraction Pizza Shop)                      */
/* -------------------------------------------------------------------------- */

/** A horizontal bar split into equal parts; interactive when `onToggle` is set. */
function FractionBar({
  parts,
  shaded,
  onToggle,
  ariaLabel,
}: {
  parts: number
  shaded: boolean[]
  onToggle?: (i: number) => void
  ariaLabel?: string
}) {
  return (
    <div
      className="flex w-full max-w-sm overflow-hidden rounded-md border border-border"
      role={onToggle ? undefined : "img"}
      aria-label={onToggle ? undefined : ariaLabel}
    >
      {Array.from({ length: parts }, (_, i) => {
        const fill = shaded[i] ? "bg-avanza-teal" : "bg-card"
        const base = `h-12 flex-1 border-r border-border last:border-r-0 ${fill}`
        return onToggle ? (
          <button
            key={i}
            type="button"
            aria-pressed={shaded[i]}
            aria-label={`Part ${i + 1} of ${parts}${shaded[i] ? ", shaded" : ""}`}
            onClick={() => onToggle(i)}
            className={`${base} transition-colors hover:bg-avanza-teal/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-avanza-teal`}
          />
        ) : (
          <span key={i} className={base} />
        )
      })}
    </div>
  )
}

function countArray(count: number, length: number): boolean[] {
  return Array.from({ length }, (_, i) => i < count)
}

type FractionRound =
  | { kind: "build"; parts: number; target: number; frac: string }
  | {
      kind: "compare"
      prompt: string
      left: { n: number; d: number }
      right: { n: number; d: number }
      answer: "left" | "right" | "equal"
      explanation: string
    }

const FRACTION_ROUNDS: FractionRound[] = [
  { kind: "build", parts: 2, target: 1, frac: "1/2" },
  { kind: "build", parts: 4, target: 3, frac: "3/4" },
  { kind: "build", parts: 3, target: 2, frac: "2/3" },
  { kind: "build", parts: 6, target: 4, frac: "4/6" },
  { kind: "build", parts: 8, target: 5, frac: "5/8" },
  {
    kind: "compare",
    prompt: "Which is the bigger fraction?",
    left: { n: 1, d: 2 },
    right: { n: 1, d: 4 },
    answer: "left",
    explanation:
      "1/2 is bigger. Cutting a whole into fewer parts makes each part larger, so one half is more than one fourth.",
  },
  {
    kind: "compare",
    prompt: "Are these two fractions equal?",
    left: { n: 1, d: 2 },
    right: { n: 2, d: 4 },
    answer: "equal",
    explanation:
      "They are equal. 1/2 and 2/4 shade the same amount of the bar, so they are equivalent fractions.",
  },
]

function FractionShop() {
  const [index, setIndex] = useState(0)
  const round = FRACTION_ROUNDS[index]

  const nextRound = () => setIndex((i) => (i + 1) % FRACTION_ROUNDS.length)

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Task {index + 1} of {FRACTION_ROUNDS.length}
      </p>

      <div className="mt-3">
        {round.kind === "build" ? (
          <FractionBuild key={index} parts={round.parts} target={round.target} frac={round.frac} />
        ) : (
          <FractionCompare key={index} round={round} />
        )}
      </div>

      <button type="button" onClick={nextRound} className={`mt-4 ${outlineBtn}`}>
        Next task <ArrowRight aria-hidden className="h-4 w-4" />
      </button>
    </div>
  )
}

function FractionBuild({ parts, target, frac }: { parts: number; target: number; frac: string }) {
  const [shaded, setShaded] = useState<boolean[]>(() => Array.from({ length: parts }, () => false))
  const [checked, setChecked] = useState(false)

  const count = shaded.filter(Boolean).length
  const isCorrect = count === target

  const toggle = (i: number) => {
    setChecked(false)
    setShaded((s) => s.map((v, j) => (j === i ? !v : v)))
  }

  return (
    <div>
      <p className="text-sm text-foreground">
        Shade the bar to show{" "}
        <span className="font-mono text-base font-bold text-avanza-teal-dark">{frac}</span>. Click a
        part to shade or unshade it.
      </p>

      <div className="mt-3">
        <FractionBar parts={parts} shaded={shaded} onToggle={toggle} />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Shaded: <span className="font-semibold text-foreground">{count}</span> of {parts} equal parts
      </p>

      <button type="button" onClick={() => setChecked(true)} className={`mt-3 ${primaryBtn}`}>
        Check
      </button>

      {checked &&
        (isCorrect ? (
          <Feedback tone="correct" title={`That's ${frac}.`}>
            The denominator {parts} is how many equal parts the whole is cut into; the numerator{" "}
            {target} is how many you shaded.
          </Feedback>
        ) : (
          <Feedback tone="incorrect" title={`You shaded ${count}, but ${frac} needs ${target}.`}>
            The bottom number ({parts}) is the equal parts; the top number ({target}) is how many to
            shade.
          </Feedback>
        ))}
    </div>
  )
}

function FractionCompare({ round }: { round: Extract<FractionRound, { kind: "compare" }> }) {
  const [choice, setChoice] = useState<"left" | "right" | "equal" | null>(null)
  const isCorrect = choice === round.answer

  const options: { key: "left" | "right" | "equal"; label: string }[] = [
    { key: "left", label: `${round.left.n}/${round.left.d} is bigger` },
    { key: "right", label: `${round.right.n}/${round.right.d} is bigger` },
    { key: "equal", label: "They are equal" },
  ]

  return (
    <div>
      <p className="text-sm font-medium text-foreground">{round.prompt}</p>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {[round.left, round.right].map((f, i) => (
          <div key={i}>
            <p className="text-sm font-semibold text-foreground">
              {f.n}/{f.d}
            </p>
            <div className="mt-1">
              <FractionBar
                parts={f.d}
                shaded={countArray(f.n, f.d)}
                ariaLabel={`${f.n} of ${f.d} parts shaded`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((o) => {
          const chosen = choice === o.key
          const answer = choice !== null && o.key === round.answer
          const state = answer
            ? " border-avanza-teal ring-2 ring-avanza-teal/40"
            : chosen
              ? " border-avanza-orange"
              : choice !== null
                ? " opacity-60"
                : ""
          return (
            <button
              key={o.key}
              type="button"
              onClick={() => choice === null && setChoice(o.key)}
              disabled={choice !== null}
              aria-pressed={chosen}
              className={`rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-avanza-teal hover:bg-avanza-teal/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-2 disabled:cursor-default${state}`}
            >
              {o.label}
            </button>
          )
        })}
      </div>

      {choice !== null && (
        <Feedback tone={isCorrect ? "correct" : "incorrect"} title={isCorrect ? "Correct." : "Not quite."}>
          {round.explanation}
        </Feedback>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* 6. Measurement Match  (Week 6: Measurement Mission)                        */
/* -------------------------------------------------------------------------- */

const MEASUREMENT_QUESTIONS: QuizQuestion[] = [
  {
    prompt: "About how long is a new pencil?",
    note: "Estimate first, then pick the sensible measurement.",
    options: ["18 centimeters", "18 meters", "18 kilometers"],
    correctIndex: 0,
    explanation: "Pencils are small, so we use centimeters. 18 meters is bus-length; 18 km is a long walk.",
  },
  {
    prompt: "About how tall is a classroom door?",
    options: ["2 centimeters", "2 meters", "2 kilometers"],
    correctIndex: 1,
    explanation: "A door is about 2 meters tall. 2 cm is a coin; 2 km is far too big.",
  },
  {
    prompt: "About how much does one apple weigh?",
    options: ["150 grams", "150 kilograms", "150 milliliters"],
    correctIndex: 0,
    explanation: "Light objects use grams. 150 kg is heavier than a person; milliliters measure liquid, not weight.",
  },
  {
    prompt: "About how much water does a small drink bottle hold?",
    options: ["500 milliliters", "500 liters", "500 grams"],
    correctIndex: 0,
    explanation: "Capacity of a bottle is in milliliters. 500 L would fill a bathtub many times over.",
  },
  {
    prompt: "About how long is a school bus?",
    options: ["12 meters", "12 centimeters", "12 millimeters"],
    correctIndex: 0,
    explanation: "Big objects use meters. 12 cm is the size of a phone; 12 mm is smaller than a fingernail.",
  },
  {
    prompt: "About how much does a watermelon weigh?",
    options: ["4 kilograms", "4 grams", "4 centimeters"],
    correctIndex: 0,
    explanation: "Heavy objects use kilograms. 4 g is about a paperclip; centimeters measure length, not weight.",
  },
  {
    prompt: "About how much water does a bathtub hold?",
    options: ["200 liters", "200 milliliters", "200 kilometers"],
    correctIndex: 0,
    explanation: "Large amounts of liquid use liters. 200 mL is one cup; kilometers measure distance.",
  },
  {
    prompt: "About how tall is a coffee mug?",
    options: ["10 centimeters", "10 meters", "10 kilograms"],
    correctIndex: 0,
    explanation: "A mug is a few centimeters tall. 10 m is a building; kilograms measure weight, not height.",
  },
]

function MeasurementMatch() {
  return <ChoiceQuiz questions={MEASUREMENT_QUESTIONS} />
}

/* -------------------------------------------------------------------------- */
/* 7. Geometry Shape Hunt  (Week 7: Geometry Explorer)                        */
/* -------------------------------------------------------------------------- */

type ShapeKey =
  | "triangle"
  | "square"
  | "rectangle"
  | "circle"
  | "pentagon"
  | "hexagon"
  | "cube"
  | "sphere"
  | "cylinder"
  | "square-pyramid"

const SHAPE_LABEL: Record<ShapeKey, string> = {
  triangle: "Triangle",
  square: "Square",
  rectangle: "Rectangle",
  circle: "Circle",
  pentagon: "Pentagon",
  hexagon: "Hexagon",
  cube: "Cube",
  sphere: "Sphere",
  cylinder: "Cylinder",
  "square-pyramid": "Square pyramid",
}

function ShapeGlyph({ shape }: { shape: ShapeKey }) {
  const fill = "var(--avanza-teal)"
  const common = { stroke: "currentColor", strokeWidth: 1.5, fill, fillOpacity: 0.18 }
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12 text-muted-foreground" role="img" aria-label={SHAPE_LABEL[shape]}>
      {shape === "triangle" && <polygon points="24,6 42,42 6,42" {...common} />}
      {shape === "square" && <rect x="9" y="9" width="30" height="30" {...common} />}
      {shape === "rectangle" && <rect x="6" y="15" width="36" height="18" {...common} />}
      {shape === "circle" && <circle cx="24" cy="24" r="18" {...common} />}
      {shape === "pentagon" && <polygon points="24,6 41.1,18.4 34.6,38.6 13.4,38.6 6.9,18.4" {...common} />}
      {shape === "hexagon" && <polygon points="24,6 39.6,15 39.6,33 24,42 8.4,33 8.4,15" {...common} />}
      {shape === "cube" && (
        <>
          <rect x="8" y="20" width="22" height="20" {...common} />
          <polygon points="8,20 16,12 38,12 30,20" {...common} />
          <polygon points="30,20 38,12 38,32 30,40" {...common} />
        </>
      )}
      {shape === "sphere" && (
        <>
          <circle cx="24" cy="24" r="18" {...common} />
          <ellipse cx="24" cy="24" rx="18" ry="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </>
      )}
      {shape === "cylinder" && (
        <>
          <path d="M10 14 L10 34 A14 5 0 0 0 38 34 L38 14" {...common} />
          <ellipse cx="24" cy="14" rx="14" ry="5" {...common} />
        </>
      )}
      {shape === "square-pyramid" && (
        <>
          <polygon points="24,8 10,38 38,38" {...common} />
          <polygon points="24,8 38,38 26,32" {...common} />
          <line x1="24" y1="8" x2="26" y2="32" stroke="currentColor" strokeWidth="1.5" />
        </>
      )}
    </svg>
  )
}

type ShapeQuestion = {
  prompt: string
  options: ShapeKey[]
  correctIndex: number
  explanation: string
}

const SHAPE_QUESTIONS: ShapeQuestion[] = [
  {
    prompt: "Which shape has exactly 3 sides and 3 corners?",
    options: ["triangle", "square", "circle"],
    correctIndex: 0,
    explanation: "A triangle has 3 straight sides and 3 corners. A square has 4; a circle has none.",
  },
  {
    prompt: "Which shape is a rectangle?",
    options: ["hexagon", "rectangle", "triangle"],
    correctIndex: 1,
    explanation: "A rectangle has 4 sides and 4 square corners, with opposite sides the same length.",
  },
  {
    prompt: "Which 2D shape has 6 sides?",
    options: ["pentagon", "hexagon", "square"],
    correctIndex: 1,
    explanation: "A hexagon has 6 sides. A pentagon has 5, and a square has 4.",
  },
  {
    prompt: "Which shape has 4 lines of symmetry?",
    options: ["rectangle", "square", "triangle"],
    correctIndex: 1,
    explanation: "A square folds into matching halves 4 ways. A rectangle has only 2 lines of symmetry.",
  },
  {
    prompt: "Which 3D shape has 6 square faces?",
    options: ["sphere", "cube", "cylinder"],
    correctIndex: 1,
    explanation: "A cube has 6 square faces, 12 edges, and 8 vertices.",
  },
  {
    prompt: "Which 3D shape has no flat faces and rolls in every direction?",
    options: ["sphere", "cube", "square-pyramid"],
    correctIndex: 0,
    explanation: "A sphere is perfectly round with no flat faces, so it rolls any way.",
  },
  {
    prompt: "Which 3D shape has a square base and 4 triangle faces meeting at a point?",
    options: ["cylinder", "cube", "square-pyramid"],
    correctIndex: 2,
    explanation: "A square pyramid has 5 faces: 1 square base and 4 triangles that meet at the top point.",
  },
]

function GeometryShapeHunt() {
  const questions: QuizQuestion[] = SHAPE_QUESTIONS.map((q) => ({
    prompt: q.prompt,
    options: q.options,
    correctIndex: q.correctIndex,
    explanation: q.explanation,
  }))

  return (
    <ChoiceQuiz
      questions={questions}
      layout="grid"
      renderOption={(option) => (
        <span className="flex flex-col items-center gap-2">
          <ShapeGlyph shape={option as ShapeKey} />
          <span>{SHAPE_LABEL[option as ShapeKey]}</span>
        </span>
      )}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* 8. Budget Builder  (Week 8: Time and Money Challenge)                      */
/* -------------------------------------------------------------------------- */

type BudgetItem = { name: string; price: number }

type BudgetScenario = {
  name: string
  budget: number
  items: BudgetItem[]
  time: QuizQuestion
}

const BUDGET_SCENARIOS: BudgetScenario[] = [
  {
    name: "School supplies",
    budget: 15,
    items: [
      { name: "Notebook", price: 3 },
      { name: "Pencils", price: 2 },
      { name: "Backpack", price: 9 },
      { name: "Markers", price: 5 },
      { name: "Eraser", price: 1 },
      { name: "Glue", price: 2 },
    ],
    time: {
      prompt: "The store opens at 9:00 and you shop for 45 minutes. What time do you leave?",
      options: ["9:45", "9:30", "10:15"],
      correctIndex: 0,
      explanation: "45 minutes after 9:00 is 9:45.",
    },
  },
  {
    name: "Party planning",
    budget: 20,
    items: [
      { name: "Balloons", price: 4 },
      { name: "Cake", price: 10 },
      { name: "Cups", price: 3 },
      { name: "Juice", price: 5 },
      { name: "Party hats", price: 6 },
      { name: "Banner", price: 4 },
    ],
    time: {
      prompt: "The party runs from 3:00 to 4:30. How long is it?",
      options: ["1 hour 30 minutes", "1 hour", "2 hours"],
      correctIndex: 0,
      explanation: "From 3:00 to 4:30 is one hour (to 4:00) plus 30 minutes, so 1 hour 30 minutes.",
    },
  },
  {
    name: "Amusement park snacks",
    budget: 12,
    items: [
      { name: "Popcorn", price: 5 },
      { name: "Drink", price: 3 },
      { name: "Pretzel", price: 4 },
      { name: "Cotton candy", price: 4 },
      { name: "Ice cream", price: 6 },
    ],
    time: {
      prompt: "A ride opens at 10:00 and you wait 25 minutes in line. What time do you board?",
      options: ["10:25", "10:15", "10:35"],
      correctIndex: 0,
      explanation: "25 minutes after 10:00 is 10:25.",
    },
  },
]

function BudgetBuilder() {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [selected, setSelected] = useState<number[]>([])

  const scenario = BUDGET_SCENARIOS[scenarioIndex]
  const total = selected.reduce((sum, i) => sum + scenario.items[i].price, 0)
  const remaining = scenario.budget - total
  const over = remaining < 0

  const toggle = (i: number) =>
    setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]))

  const switchScenario = (i: number) => {
    setScenarioIndex(i)
    setSelected([])
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a scenario">
        {BUDGET_SCENARIOS.map((s, i) => (
          <button
            key={s.name}
            type="button"
            onClick={() => switchScenario(i)}
            aria-pressed={i === scenarioIndex}
            className={
              "rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-1 " +
              (i === scenarioIndex
                ? "border-avanza-teal bg-avanza-teal/10 text-avanza-teal-dark"
                : "border-border text-muted-foreground hover:border-avanza-teal hover:text-foreground")
            }
          >
            {s.name}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-foreground">
        Budget: <span className="font-mono text-base font-bold text-avanza-teal-dark">${scenario.budget}</span>. Pick
        the items you want and keep the total at or under budget.
      </p>

      <ul className="mt-3 space-y-2">
        {scenario.items.map((item, i) => {
          const isSelected = selected.includes(i)
          return (
            <li key={item.name}>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={isSelected}
                className={
                  "flex w-full items-center justify-between rounded-md border px-4 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-1 " +
                  (isSelected
                    ? "border-avanza-teal bg-avanza-teal/5"
                    : "border-border hover:border-avanza-teal")
                }
              >
                <span className="flex items-center gap-3 font-medium text-foreground">
                  <span
                    aria-hidden
                    className={
                      "flex h-5 w-5 items-center justify-center rounded border " +
                      (isSelected ? "border-avanza-teal bg-avanza-teal text-primary-foreground" : "border-border")
                    }
                  >
                    {isSelected && <Check className="h-3.5 w-3.5" />}
                  </span>
                  {item.name}
                </span>
                <span className="font-mono font-semibold text-foreground">${item.price}</span>
              </button>
            </li>
          )
        })}
      </ul>

      <dl className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-md border border-border p-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Total</dt>
          <dd className="mt-1 font-mono text-xl font-bold text-foreground">${total}</dd>
        </div>
        <div className="rounded-md border border-border p-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {over ? "Over by" : "Money left"}
          </dt>
          <dd className="mt-1 font-mono text-xl font-bold text-foreground">${Math.abs(remaining)}</dd>
        </div>
      </dl>

      {selected.length === 0 ? (
        <Feedback tone="neutral" title="Pick some items to start planning.">
          Watch the total and the money left change as you add each item.
        </Feedback>
      ) : over ? (
        <Feedback tone="incorrect" title={`Over budget by $${Math.abs(remaining)}.`}>
          Your total ${total} is more than the ${scenario.budget} budget. Remove an item to fit.
        </Feedback>
      ) : (
        <Feedback tone="correct" title={`Within budget with $${remaining} to spare.`}>
          Your total is ${total}, which is at or under the ${scenario.budget} budget.
        </Feedback>
      )}

      <div className="mt-6 border-t border-border pt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Time check
        </p>
        <div className="mt-3">
          <ChoiceQuiz key={scenarioIndex} questions={[scenario.time]} />
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* 9. Graph Builder  (Week 9: Data Detective)                                 */
/* -------------------------------------------------------------------------- */

const GRAPH_CATEGORIES = ["Apple", "Banana", "Grapes", "Orange"]
const GRAPH_START = [8, 5, 4, 3]

/** Grouped tally marks for a count (a light nod to tally charts). */
function Tally({ n }: { n: number }) {
  return (
    <span className="inline-flex items-end gap-0.75" aria-hidden>
      {Array.from({ length: n }, (_, i) => (
        <span
          key={i}
          className={"h-4 w-0.5 bg-foreground" + ((i + 1) % 5 === 0 && i + 1 !== n ? " mr-2" : "")}
        />
      ))}
    </span>
  )
}

function GraphBuilder() {
  const [counts, setCounts] = useState<number[]>(GRAPH_START)

  const set = (i: number, value: number) =>
    setCounts((c) => c.map((v, j) => (j === i ? Math.max(0, Math.min(12, value)) : v)))

  const max = Math.max(1, ...counts)
  const total = counts.reduce((a, b) => a + b, 0)
  const maxIndexes = counts.map((c, i) => (c === Math.max(...counts) ? i : -1)).filter((i) => i >= 0)
  const minIndexes = counts.map((c, i) => (c === Math.min(...counts) ? i : -1)).filter((i) => i >= 0)
  const diffAppleGrapes = Math.abs(counts[0] - counts[2])

  return (
    <div>
      <p className="text-sm text-foreground">
        This survey asked, &ldquo;What is your favorite fruit?&rdquo; Adjust the votes and watch the
        bar graph update, then answer the questions from the graph.
      </p>

      {/* Editable data + live bar graph */}
      <div className="mt-4 space-y-2">
        {GRAPH_CATEGORIES.map((cat, i) => (
          <div key={cat} className="flex items-center gap-3">
            <span className="w-16 flex-none text-sm font-semibold text-foreground">{cat}</span>
            <div className="flex flex-none items-center gap-1">
              <button
                type="button"
                onClick={() => set(i, counts[i] - 1)}
                disabled={counts[i] === 0}
                aria-label={`One fewer vote for ${cat}`}
                className="flex h-9 w-9 items-center justify-center rounded border border-border text-foreground hover:border-avanza-teal hover:bg-avanza-teal/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal disabled:opacity-40"
              >
                <Minus aria-hidden className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => set(i, counts[i] + 1)}
                disabled={counts[i] === 12}
                aria-label={`One more vote for ${cat}`}
                className="flex h-9 w-9 items-center justify-center rounded border border-border text-foreground hover:border-avanza-teal hover:bg-avanza-teal/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal disabled:opacity-40"
              >
                <Plus aria-hidden className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex flex-1 items-center gap-2">
              <span
                className="h-6 rounded-sm bg-avanza-teal transition-all"
                style={{ width: `${(counts[i] / max) * 100}%`, minWidth: counts[i] ? "0.5rem" : "0" }}
                aria-hidden
              />
              <span className="font-mono text-sm font-semibold text-foreground" aria-live="polite">
                {counts[i]}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-md border border-border bg-secondary p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Same data as tally marks
        </p>
        <ul className="mt-2 space-y-1">
          {GRAPH_CATEGORIES.map((cat, i) => (
            <li key={cat} className="flex items-center gap-3 text-sm">
              <span className="w-16 flex-none font-medium text-foreground">{cat}</span>
              <Tally n={counts[i]} />
            </li>
          ))}
        </ul>
      </div>

      {/* Read-the-graph questions, checked against the live data */}
      <div className="mt-6 space-y-4 border-t border-border pt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Read the graph
        </p>
        <GraphCategoryQuestion
          prompt="Which fruit has the most votes?"
          categories={GRAPH_CATEGORIES}
          correctIndexes={maxIndexes}
        />
        <GraphCategoryQuestion
          prompt="Which fruit has the fewest votes?"
          categories={GRAPH_CATEGORIES}
          correctIndexes={minIndexes}
        />
        <GraphNumericQuestion
          prompt="How many more votes for Apple than Grapes? (the difference)"
          answer={diffAppleGrapes}
        />
        <GraphNumericQuestion prompt="What is the total number of votes?" answer={total} />
      </div>
    </div>
  )
}

function GraphCategoryQuestion({
  prompt,
  categories,
  correctIndexes,
}: {
  prompt: string
  categories: string[]
  correctIndexes: number[]
}) {
  const [choice, setChoice] = useState<number | null>(null)
  const correct = choice !== null && correctIndexes.includes(choice)

  return (
    <div className="rounded-md border border-border p-4">
      <p className="text-sm font-medium text-foreground">{prompt}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {categories.map((cat, i) => {
          const chosen = choice === i
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setChoice(i)}
              aria-pressed={chosen}
              className={
                "rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-1 " +
                (chosen ? "border-avanza-teal bg-avanza-teal/5 text-foreground" : "border-border text-foreground hover:border-avanza-teal")
              }
            >
              {cat}
            </button>
          )
        })}
      </div>
      {choice !== null && (
        <Feedback tone={correct ? "correct" : "incorrect"} title={correct ? "Correct." : "Look again."}>
          {correct
            ? "That category's bar matches the graph."
            : "Compare the bar heights and pick the one that fits."}
        </Feedback>
      )}
    </div>
  )
}

function GraphNumericQuestion({ prompt, answer }: { prompt: string; answer: number }) {
  const [value, setValue] = useState("")
  const [submitted, setSubmitted] = useState<number | null>(null)
  const correct = submitted !== null && submitted === answer

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const n = Number.parseInt(value, 10)
    setSubmitted(Number.isNaN(n) ? null : n)
  }

  return (
    <form onSubmit={submit} className="rounded-md border border-border p-4">
      <label className="text-sm font-medium text-foreground">{prompt}</label>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <input
          type="number"
          inputMode="numeric"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={numberInput}
          placeholder="?"
          aria-label={prompt}
        />
        <button type="submit" className={primaryBtn}>
          Check
        </button>
      </div>
      {submitted !== null && (
        <Feedback tone={correct ? "correct" : "incorrect"} title={correct ? "Correct." : "Not yet."}>
          {correct
            ? "That matches the current graph."
            : "Read the bars again and add or subtract carefully."}
        </Feedback>
      )}
    </form>
  )
}

/* -------------------------------------------------------------------------- */
/* Logic Maze  (Week 10 review: Build a Math City)                            */
/* -------------------------------------------------------------------------- */

type MazeStep = {
  place: string
  clue: string
  options: string[]
  correctIndex: number
  explanation: string
}

const MAZE_STEPS: MazeStep[] = [
  {
    place: "Bakery",
    clue: "The baker offers you the biggest slice. Which fraction is largest?",
    options: ["1/2", "1/4", "1/8"],
    correctIndex: 0,
    explanation: "1/2 is the largest — fewer parts means each part is bigger.",
  },
  {
    place: "Bank",
    clue: "The vault code is greater than 20, less than 30, with a 5 in the ones place.",
    options: ["25", "15", "52"],
    correctIndex: 0,
    explanation: "25 is between 20 and 30 and has a 5 in the ones place. 15 is too small; 52 is too big.",
  },
  {
    place: "Park",
    clue: "The park sign is a shape with 3 sides and 3 corners. Which shape is it?",
    options: ["Triangle", "Square", "Circle"],
    correctIndex: 0,
    explanation: "A triangle has 3 sides and 3 corners.",
  },
  {
    place: "Ticket booth",
    clue: "A ticket costs $4. You pay with a $10 bill. How much change do you get?",
    options: ["$6", "$14", "$40"],
    correctIndex: 0,
    explanation: "Change is $10 − $4 = $6.",
  },
  {
    place: "Clock tower",
    clue: "It is 3:00 now. The show starts in 45 minutes. What time does it start?",
    options: ["3:45", "3:30", "4:15"],
    correctIndex: 0,
    explanation: "45 minutes after 3:00 is 3:45.",
  },
]

function LogicMaze() {
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [done, setDone] = useState(false)

  const current = MAZE_STEPS[step]
  const correct = picked !== null && picked === current.correctIndex

  const advance = () => {
    setPicked(null)
    if (step + 1 >= MAZE_STEPS.length) setDone(true)
    else setStep((s) => s + 1)
  }

  const restart = () => {
    setStep(0)
    setPicked(null)
    setDone(false)
  }

  return (
    <div>
      {/* Path indicator */}
      <ol className="flex items-center gap-2" aria-label="Progress through Math City">
        {MAZE_STEPS.map((s, i) => {
          const state =
            done || i < step
              ? "border-avanza-teal bg-avanza-teal text-primary-foreground"
              : i === step
                ? "border-avanza-teal text-avanza-teal-dark"
                : "border-border text-muted-foreground"
          return (
            <li key={s.place} className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border font-mono text-xs font-semibold ${state}`}
                aria-current={!done && i === step ? "step" : undefined}
              >
                {i + 1}
              </span>
              {i < MAZE_STEPS.length - 1 && <span aria-hidden className="h-px w-4 bg-border" />}
            </li>
          )
        })}
      </ol>

      {done ? (
        <div className="mt-5">
          <Feedback tone="correct" title="You reached the center of Math City.">
            You used fractions, place value, shapes, money, and time to solve every clue.
          </Feedback>
          <button type="button" onClick={restart} className={`mt-4 ${outlineBtn}`}>
            Play again
          </button>
        </div>
      ) : (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {current.place}
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground">{current.clue}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {current.options.map((option, i) => {
              const isPicked = picked === i
              const isAnswer = picked !== null && i === current.correctIndex
              const state = isAnswer
                ? " border-avanza-teal ring-2 ring-avanza-teal/40"
                : isPicked
                  ? " border-avanza-orange"
                  : ""
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setPicked(i)}
                  aria-pressed={isPicked}
                  className={`rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-avanza-teal hover:bg-avanza-teal/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-2${state}`}
                >
                  {option}
                </button>
              )
            })}
          </div>

          {picked !== null &&
            (correct ? (
              <>
                <Feedback tone="correct" title="Correct - the path opens.">
                  {current.explanation}
                </Feedback>
                <button type="button" onClick={advance} className={`mt-4 ${primaryBtn}`}>
                  {step + 1 >= MAZE_STEPS.length ? "Reach the center" : "Move ahead"}{" "}
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </button>
              </>
            ) : (
              <Feedback tone="incorrect" title="That path is blocked. Try another.">
                {current.explanation}
              </Feedback>
            ))}
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Fallback for activity types without a bespoke widget yet                   */
/* -------------------------------------------------------------------------- */

function ActivityFallback({ activity }: { activity: MathInteractiveActivity }) {
  return (
    <div>
      <MathActivityVisual type={activity.type} />
      <ol className="mt-5 space-y-3">
        {activity.instructions.map((instruction, i) => (
          <li key={instruction} className="grid grid-cols-[1.75rem_1fr] gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border font-mono text-sm font-semibold text-muted-foreground">
              {i + 1}
            </span>
            <span className="self-center text-sm leading-relaxed text-foreground/90">
              {instruction}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
