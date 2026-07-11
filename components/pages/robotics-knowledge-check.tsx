"use client"

import { useMemo, useState } from "react"
import type {
  KnowledgeCheck,
  KnowledgeCheckQuestion,
  MatchingQuestion,
  MultipleChoiceQuestion,
  OptionQuestion,
  OrderingQuestion,
  ShortResponseQuestion,
  TrueFalseQuestion,
} from "@/features/curriculums/robotics"
import {
  allAnswered,
  answeredCount,
  isAnswerCorrect,
  scoreQuiz,
} from "@/features/curriculums/robotics-quiz"
import { useRoboticsProgress } from "@/components/ui/useRoboticsProgress"

/** Deterministically rotate a list by one, so ordering/matching don't start solved. */
function rotate<T>(list: T[]): T[] {
  return list.length < 2 ? list : [...list.slice(1), list[0]]
}

const optionBase =
  "block w-full rounded-md border px-4 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"

/**
 * The reusable end-of-week knowledge check. One renderer handles every question
 * kind (single/multiple choice, true-false, ordering, matching, short response,
 * program tracing, scenario diagnosis). Each question gives immediate feedback
 * with real reasoning; students can change an answer and try again before saving.
 * Saving records the attempt (score + answers, keyed by stable ids) to progress.
 * No points, streaks, or badges - just the reasoning and the score.
 */
export function RoboticsKnowledgeCheck({ check }: { check: KnowledgeCheck }) {
  const { loaded, saveQuizAttempt, progress } = useRoboticsProgress()
  const saved = progress.knowledgeChecks[check.id]

  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const setAnswer = (id: string, value: string) => setAnswers((prev) => ({ ...prev, [id]: value }))
  const reveal = (id: string) => setRevealed((prev) => ({ ...prev, [id]: true }))
  const unreveal = (id: string) => {
    setRevealed((prev) => ({ ...prev, [id]: false }))
    setSubmitted(false)
  }

  const answered = answeredCount(check.questions, answers)
  const everyAnswered = allAnswered(check.questions, answers)
  const { score, total } = useMemo(() => scoreQuiz(check.questions, answers), [check.questions, answers])
  const passed = score >= check.passThreshold

  const submit = () => {
    if (!everyAnswered) {
      setError("Answer every question before saving your score.")
      return
    }
    setError("")
    saveQuizAttempt(check.id, answers, score, total)
    setSubmitted(true)
  }

  const retry = () => {
    setAnswers({})
    setRevealed({})
    setSubmitted(false)
    setError("")
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground">{check.instructions}</p>

      <ol className="mt-6 space-y-6">
        {check.questions.map((q, qi) => (
          <li key={q.id} className="rounded-lg border border-border p-5">
            <QuestionBody
              question={q}
              index={qi}
              answer={answers[q.id] ?? ""}
              revealed={!!revealed[q.id]}
              loaded={loaded}
              onAnswer={(value) => setAnswer(q.id, value)}
              onReveal={() => reveal(q.id)}
              onChange={() => unreveal(q.id)}
            />
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        {!submitted ? (
          <button
            type="button"
            onClick={submit}
            disabled={!loaded}
            className="inline-flex items-center rounded-md bg-avanza-green px-5 py-2.5 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
          >
            Save my score
          </button>
        ) : (
          <button
            type="button"
            onClick={retry}
            className="inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-avanza-green-dark transition-colors hover:border-avanza-green hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
          >
            Try the check again
          </button>
        )}

        <p className="text-sm text-muted-foreground" aria-live="polite">
          {submitted
            ? `${score} of ${total} correct${passed ? " - passed" : " - review the ones you missed and try again"}`
            : `${answered} of ${total} answered`}
        </p>
      </div>

      {error && (
        <p className="mt-2 text-sm font-medium text-avanza-orange-dark" role="alert">
          {error}
        </p>
      )}

      {loaded && saved && !submitted && (
        <p className="mt-2 text-xs text-muted-foreground">
          Last saved score: {saved.score} of {saved.total || total} (attempt {saved.attempts}).
        </p>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Per-question rendering                                                     */
/* -------------------------------------------------------------------------- */

type QuestionProps = {
  question: KnowledgeCheckQuestion
  index: number
  answer: string
  revealed: boolean
  loaded: boolean
  onAnswer: (value: string) => void
  onReveal: () => void
  onChange: () => void
}

function QuestionBody(props: QuestionProps) {
  const { question, index } = props
  return (
    <div>
      <p className="font-semibold text-foreground">
        <span className="font-mono text-sm text-muted-foreground">{index + 1}. </span>
        {question.prompt}
      </p>

      {question.kind === "scenario" && (
        <p className="mt-2 rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground/90">
          {question.scenario}
        </p>
      )}
      {question.kind === "trace" && (
        <pre className="mt-2 overflow-x-auto rounded-md border border-border bg-secondary px-3 py-2 font-mono text-xs text-foreground">
          {question.program.join("\n")}
        </pre>
      )}

      <div className="mt-3">
        {(question.kind === "single" || question.kind === "trace" || question.kind === "scenario") && (
          <SingleChoice {...props} question={question} />
        )}
        {question.kind === "multiple" && <MultipleChoice {...props} question={question} />}
        {question.kind === "true-false" && <TrueFalse {...props} question={question} />}
        {question.kind === "ordering" && <Ordering {...props} question={question} />}
        {question.kind === "matching" && <Matching {...props} question={question} />}
        {question.kind === "short" && <ShortResponse {...props} question={question} />}
      </div>

      <Explanation {...props} />
    </div>
  )
}

/** The shared answer explanation shown once a question is revealed. */
function Explanation({ question, answer, revealed }: QuestionProps) {
  if (!revealed) return null
  const correct = isAnswerCorrect(question, answer)
  return (
    <div className="mt-3 rounded-md bg-secondary px-3 py-2 text-sm" aria-live="polite">
      <p className={correct ? "font-semibold text-avanza-green-dark" : "font-semibold text-avanza-orange-dark"}>
        {correct ? "Correct" : "Not quite"}
      </p>
      <p className="mt-1 text-foreground/90">{question.explanation}</p>
      {question.kind === "short" && (
        <p className="mt-2 text-muted-foreground">
          <span className="font-semibold text-foreground">A strong answer: </span>
          {question.sampleAnswer}
        </p>
      )}
    </div>
  )
}

function SingleChoice({ question, answer, revealed, loaded, onAnswer, onReveal, onChange }: QuestionProps & { question: OptionQuestion }) {
  return (
    <div className="space-y-2" role="group" aria-label={question.prompt}>
      {question.options.map((opt) => {
        const chosen = answer === opt.id
        const state =
          revealed && opt.correct
            ? "border-avanza-green bg-avanza-green/10"
            : revealed && chosen && !opt.correct
              ? "border-avanza-orange bg-avanza-orange/10"
              : chosen
                ? "border-avanza-green"
                : "border-border hover:border-avanza-green/60"
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => {
              onAnswer(opt.id)
              onReveal()
            }}
            disabled={!loaded || revealed}
            aria-pressed={chosen}
            className={`${optionBase} ${state} ${revealed ? "cursor-default" : ""}`}
          >
            <span className="text-foreground/90">{opt.text}</span>
            {revealed && (opt.correct || chosen) && (
              <span className="mt-1 block text-xs text-muted-foreground">{opt.feedback}</span>
            )}
          </button>
        )
      })}
      {revealed && <ChangeButton onChange={onChange} />}
    </div>
  )
}

function MultipleChoice({ question, answer, revealed, loaded, onAnswer, onReveal, onChange }: QuestionProps & { question: MultipleChoiceQuestion }) {
  const selected = new Set(answer ? answer.split(",").filter(Boolean) : [])
  const toggle = (id: string) => {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    onAnswer([...next].join(","))
  }
  return (
    <div>
      <p className="mb-2 text-xs text-muted-foreground">Select all that apply.</p>
      <div className="space-y-2" role="group" aria-label={question.prompt}>
        {question.options.map((opt) => {
          const chosen = selected.has(opt.id)
          const state =
            revealed && opt.correct
              ? "border-avanza-green bg-avanza-green/10"
              : revealed && chosen && !opt.correct
                ? "border-avanza-orange bg-avanza-orange/10"
                : chosen
                  ? "border-avanza-green"
                  : "border-border hover:border-avanza-green/60"
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggle(opt.id)}
              disabled={!loaded || revealed}
              aria-pressed={chosen}
              className={`${optionBase} ${state} ${revealed ? "cursor-default" : ""}`}
            >
              <span className="text-foreground/90">{chosen ? "☑ " : "☐ "}{opt.text}</span>
              {revealed && (opt.correct || chosen) && (
                <span className="mt-1 block text-xs text-muted-foreground">{opt.feedback}</span>
              )}
            </button>
          )
        })}
      </div>
      {!revealed ? (
        <button
          type="button"
          onClick={onReveal}
          disabled={!loaded || selected.size === 0}
          className="mt-3 text-sm font-semibold text-avanza-green-dark underline underline-offset-2 disabled:opacity-50"
        >
          Check my answer
        </button>
      ) : (
        <ChangeButton onChange={onChange} />
      )}
    </div>
  )
}

function TrueFalse({ question, answer, revealed, loaded, onAnswer, onReveal, onChange }: QuestionProps & { question: TrueFalseQuestion }) {
  return (
    <div>
      <p className="text-sm text-foreground/90">&ldquo;{question.statement}&rdquo;</p>
      <div className="mt-2 flex gap-2">
        {[true, false].map((value) => {
          const label = value ? "True" : "False"
          const chosen = answer === String(value)
          const state =
            revealed && question.answer === value
              ? "border-avanza-green bg-avanza-green/10"
              : revealed && chosen
                ? "border-avanza-orange bg-avanza-orange/10"
                : chosen
                  ? "border-avanza-green"
                  : "border-border hover:border-avanza-green/60"
          return (
            <button
              key={label}
              type="button"
              onClick={() => {
                onAnswer(String(value))
                onReveal()
              }}
              disabled={!loaded || revealed}
              aria-pressed={chosen}
              className={`rounded-md border px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 ${state}`}
            >
              {label}
            </button>
          )
        })}
      </div>
      {revealed && <ChangeButton onChange={onChange} />}
    </div>
  )
}

function Ordering({ question, answer, revealed, loaded, onAnswer, onReveal, onChange }: QuestionProps & { question: OrderingQuestion }) {
  const current = answer ? answer.split(",").filter(Boolean) : rotate(question.items.map((i) => i.id))
  const label = (id: string) => question.items.find((i) => i.id === id)?.text ?? id
  const move = (index: number, delta: number) => {
    const next = [...current]
    const target = index + delta
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    onAnswer(next.join(","))
  }
  return (
    <div>
      <p className="mb-2 text-xs text-muted-foreground">Use the arrows to put these in order.</p>
      <ol className="space-y-2">
        {current.map((id, i) => (
          <li key={id} className="flex items-center gap-3 rounded-md border border-border px-3 py-2 text-sm">
            <span className="font-mono text-xs font-semibold text-muted-foreground">{i + 1}</span>
            <span className="flex-1 text-foreground/90">{label(id)}</span>
            {!revealed && (
              <span className="flex gap-1">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={!loaded || i === 0}
                  aria-label={`Move "${label(id)}" up`}
                  className="rounded border border-border px-2 py-0.5 text-xs disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={!loaded || i === current.length - 1}
                  aria-label={`Move "${label(id)}" down`}
                  className="rounded border border-border px-2 py-0.5 text-xs disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
                >
                  ↓
                </button>
              </span>
            )}
          </li>
        ))}
      </ol>
      {!revealed ? (
        <button
          type="button"
          onClick={() => {
            if (!answer) onAnswer(current.join(","))
            onReveal()
          }}
          disabled={!loaded}
          className="mt-3 text-sm font-semibold text-avanza-green-dark underline underline-offset-2 disabled:opacity-50"
        >
          Check my order
        </button>
      ) : (
        <ChangeButton onChange={onChange} />
      )}
    </div>
  )
}

function Matching({ question, answer, revealed, loaded, onAnswer, onReveal, onChange }: QuestionProps & { question: MatchingQuestion }) {
  const map: Record<string, string> = (() => {
    try {
      return answer ? (JSON.parse(answer) as Record<string, string>) : {}
    } catch {
      return {}
    }
  })()
  const rights = rotate(question.pairs)
  const setPair = (leftId: string, rightPairId: string) => {
    onAnswer(JSON.stringify({ ...map, [leftId]: rightPairId }))
  }
  const complete = question.pairs.every((p) => map[p.id])
  return (
    <div>
      <p className="mb-2 text-xs text-muted-foreground">Choose the match for each item.</p>
      <div className="space-y-2">
        {question.pairs.map((pair) => {
          const chosen = map[pair.id]
          const right = revealed
            ? chosen === pair.id
              ? "text-avanza-green-dark"
              : "text-avanza-orange-dark"
            : "text-foreground"
          return (
            <div key={pair.id} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
              <span className="text-sm font-medium text-foreground/90 sm:w-1/2">{pair.left}</span>
              <select
                aria-label={`Match for ${pair.left}`}
                value={chosen ?? ""}
                onChange={(e) => setPair(pair.id, e.target.value)}
                disabled={!loaded || revealed}
                className={`rounded-md border border-border bg-card px-3 py-1.5 text-sm ${right} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green disabled:opacity-70 sm:w-1/2`}
              >
                <option value="">Choose...</option>
                {rights.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.right}
                  </option>
                ))}
              </select>
            </div>
          )
        })}
      </div>
      {!revealed ? (
        <button
          type="button"
          onClick={onReveal}
          disabled={!loaded || !complete}
          className="mt-3 text-sm font-semibold text-avanza-green-dark underline underline-offset-2 disabled:opacity-50"
        >
          Check my matches
        </button>
      ) : (
        <ChangeButton onChange={onChange} />
      )}
    </div>
  )
}

function ShortResponse({ question, answer, revealed, loaded, onAnswer, onReveal, onChange }: QuestionProps & { question: ShortResponseQuestion }) {
  return (
    <div>
      <textarea
        aria-label={question.prompt}
        value={answer}
        onChange={(e) => onAnswer(e.target.value)}
        disabled={!loaded || revealed}
        rows={2}
        placeholder="Write your answer..."
        className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green disabled:opacity-70"
      />
      {!revealed ? (
        <button
          type="button"
          onClick={onReveal}
          disabled={!loaded || answer.trim().length === 0}
          className="mt-2 text-sm font-semibold text-avanza-green-dark underline underline-offset-2 disabled:opacity-50"
        >
          Check my answer
        </button>
      ) : (
        <ChangeButton onChange={onChange} />
      )}
    </div>
  )
}

/** A "Change my answer" control for retrying a revealed question. */
function ChangeButton({ onChange }: { onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="mt-3 text-sm font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
    >
      Change my answer
    </button>
  )
}


