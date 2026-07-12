"use client"

import { useMemo, useState } from "react"
import type { KnowledgeCheckQuestion } from "@/features/curriculums/intro-to-ai-types"
import {
  allAnswered,
  answeredCount,
  encodeList,
  isCorrect,
  parseList,
  scoreCheck,
} from "@/features/curriculums/intro-to-ai-quiz"
import { VisualBlock } from "@/components/pages/intro-to-ai/shared"

const optionBase =
  "block w-full rounded-md border px-4 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"

const primaryButton =
  "inline-flex items-center rounded-md bg-avanza-green px-5 py-2.5 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"

const outlineButton =
  "inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-avanza-green-dark transition-colors hover:border-avanza-green hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"

/**
 * Reusable, accessible knowledge check. One renderer handles every question kind
 * (single, multiple, true-false, scenario, ordering). It grades locally with
 * `intro-to-ai-quiz` and shows real per-choice feedback. Nothing is sent
 * anywhere. `onSave` records the attempt (answers + score, keyed by stable ids);
 * used by both lesson checks and the final assessment.
 */
export function IntroToAiKnowledgeCheck({
  instructions,
  questions,
  passThreshold,
  loaded = true,
  savedAnswers,
  saveLabel = "Save my score",
  onSave,
}: {
  instructions: string
  questions: KnowledgeCheckQuestion[]
  passThreshold: number
  loaded?: boolean
  savedAnswers?: Record<string, string>
  saveLabel?: string
  onSave?: (answers: Record<string, string>, score: number, total: number) => void
}) {
  const [answers, setAnswers] = useState<Record<string, string>>(savedAnswers ?? {})
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const setAnswer = (id: string, value: string) => setAnswers((prev) => ({ ...prev, [id]: value }))
  const reveal = (id: string) => setRevealed((prev) => ({ ...prev, [id]: true }))
  const unreveal = (id: string) => {
    setRevealed((prev) => ({ ...prev, [id]: false }))
    setSubmitted(false)
  }

  const answered = answeredCount(questions, answers)
  const everyAnswered = allAnswered(questions, answers)
  const { score, total } = useMemo(() => scoreCheck(questions, answers), [questions, answers])
  const passed = score >= passThreshold

  const submit = () => {
    if (!everyAnswered) {
      setError("Answer every question before saving your score.")
      return
    }
    setError("")
    onSave?.(answers, score, total)
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
      <p className="text-sm text-muted-foreground">{instructions}</p>

      <ol className="mt-6 space-y-6">
        {questions.map((q, qi) => (
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
          <button type="button" onClick={submit} disabled={!loaded} className={primaryButton}>
            {saveLabel}
          </button>
        ) : (
          <button type="button" onClick={retry} className={outlineButton}>
            Try the check again
          </button>
        )}

        <p className="text-sm text-muted-foreground" aria-live="polite">
          {submitted
            ? `${score} of ${total} correct${passed ? " — passed" : " — review the ones you missed and try again"}`
            : `${answered} of ${total} answered`}
        </p>
      </div>

      {error && (
        <p className="mt-3 text-sm font-medium text-avanza-orange-dark" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

function QuestionBody({
  question,
  index,
  answer,
  revealed,
  loaded,
  onAnswer,
  onReveal,
  onChange,
}: {
  question: KnowledgeCheckQuestion
  index: number
  answer: string
  revealed: boolean
  loaded: boolean
  onAnswer: (value: string) => void
  onReveal: () => void
  onChange: () => void
}) {
  const heading = (
    <p className="text-sm font-bold text-foreground">
      <span className="text-muted-foreground">Question {index + 1}. </span>
      {question.prompt}
    </p>
  )

  return (
    <div role="group" aria-label={`Question ${index + 1}`}>
      {heading}

      {question.context && (
        <div className="mt-3">
          <VisualBlock visual={question.context} />
        </div>
      )}

      <div className="mt-4">
        {question.kind === "single" || question.kind === "scenario" ? (
          <ChoiceQuestion
            question={question}
            answer={answer}
            revealed={revealed}
            multiple={false}
            onAnswer={onAnswer}
            onReveal={onReveal}
            onChange={onChange}
          />
        ) : question.kind === "multiple" ? (
          <ChoiceQuestion
            question={question}
            answer={answer}
            revealed={revealed}
            multiple
            onAnswer={onAnswer}
            onReveal={onReveal}
            onChange={onChange}
          />
        ) : question.kind === "true-false" ? (
          <TrueFalse question={question} answer={answer} revealed={revealed} onAnswer={onAnswer} onReveal={onReveal} onChange={onChange} />
        ) : (
          <Ordering question={question} answer={answer} onAnswer={onAnswer} />
        )}
      </div>

      {revealed && (
        <p className="mt-4 rounded-md bg-secondary px-4 py-3 text-sm text-secondary-foreground" aria-live="polite">
          {question.explanation}
        </p>
      )}

      {question.kind !== "ordering" && (
        <ResetHint revealed={revealed} loaded={loaded} onChange={onChange} onReveal={onReveal} answered={answer !== ""} />
      )}
      {question.kind === "ordering" && (
        <OrderingCheck question={question} answer={answer} revealed={revealed} loaded={loaded} onReveal={onReveal} onChange={onChange} />
      )}
    </div>
  )
}

function ResetHint({
  revealed,
  loaded,
  answered,
  onReveal,
  onChange,
}: {
  revealed: boolean
  loaded: boolean
  answered: boolean
  onReveal: () => void
  onChange: () => void
}) {
  return (
    <div className="mt-3">
      {!revealed ? (
        <button
          type="button"
          onClick={onReveal}
          disabled={!loaded || !answered}
          className="text-xs font-semibold text-avanza-green-dark underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground disabled:no-underline"
        >
          Check my answer
        </button>
      ) : (
        <button type="button" onClick={onChange} className="text-xs font-semibold text-muted-foreground underline-offset-2 hover:underline">
          Change my answer
        </button>
      )}
    </div>
  )
}

function ChoiceQuestion({
  question,
  answer,
  revealed,
  multiple,
  onAnswer,
  onReveal,
  onChange,
}: {
  question: Extract<KnowledgeCheckQuestion, { kind: "single" | "scenario" | "multiple" }>
  answer: string
  revealed: boolean
  multiple: boolean
  onAnswer: (value: string) => void
  onReveal: () => void
  onChange: () => void
}) {
  const selected = new Set(multiple ? parseList(answer) : answer ? [answer] : [])

  const toggle = (id: string) => {
    if (revealed) onChange()
    if (multiple) {
      const next = new Set(selected)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      onAnswer(encodeList([...next].sort()))
    } else {
      onAnswer(id)
    }
  }

  return (
    <div className="space-y-4">
      {"scenario" in question && question.kind === "scenario" && (
        <p className="rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground">{question.scenario}</p>
      )}
      <div className="space-y-2" role={multiple ? "group" : "radiogroup"}>
        {question.choices.map((choice) => {
          const isSelected = selected.has(choice.id)
          const showState = revealed && isSelected
          const stateClass = showState
            ? choice.correct
              ? "border-avanza-green bg-avanza-green/10"
              : "border-avanza-orange bg-avanza-orange/10"
            : isSelected
              ? "border-avanza-green bg-avanza-green/5"
              : "border-border hover:border-avanza-green/50 hover:bg-avanza-green/5"
          return (
            <div key={choice.id}>
              <button
                type="button"
                onClick={() => toggle(choice.id)}
                aria-pressed={isSelected}
                className={`${optionBase} ${stateClass}`}
              >
                {choice.text}
              </button>
              {showState && (
                <p className="mt-1 px-1 text-xs text-muted-foreground" aria-live="polite">
                  {choice.explanation}
                </p>
              )}
            </div>
          )
        })}
      </div>
      {multiple && <p className="text-xs text-muted-foreground">Select all that apply.</p>}
      <ResetHint revealed={revealed} loaded onReveal={onReveal} onChange={onChange} answered={selected.size > 0} />
    </div>
  )
}

function TrueFalse({
  question,
  answer,
  revealed,
  onAnswer,
  onReveal,
  onChange,
}: {
  question: Extract<KnowledgeCheckQuestion, { kind: "true-false" }>
  answer: string
  revealed: boolean
  onAnswer: (value: string) => void
  onReveal: () => void
  onChange: () => void
}) {
  const pick = (value: "true" | "false") => {
    if (revealed) onChange()
    onAnswer(value)
  }
  const options: ("true" | "false")[] = ["true", "false"]
  return (
    <div className="space-y-4">
      <p className="rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground">{question.statement}</p>
      <div className="flex gap-2" role="radiogroup">
        {options.map((value) => {
          const isSelected = answer === value
          const correct = (value === "true") === question.answer
          const showState = revealed && isSelected
          const stateClass = showState
            ? correct
              ? "border-avanza-green bg-avanza-green/10"
              : "border-avanza-orange bg-avanza-orange/10"
            : isSelected
              ? "border-avanza-green bg-avanza-green/5"
              : "border-border hover:border-avanza-green/50 hover:bg-avanza-green/5"
          return (
            <button
              key={value}
              type="button"
              onClick={() => pick(value)}
              aria-pressed={isSelected}
              className={`inline-flex flex-1 items-center justify-center rounded-md border px-4 py-2.5 text-sm font-semibold capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 ${stateClass}`}
            >
              {value}
            </button>
          )
        })}
      </div>
      <ResetHint revealed={revealed} loaded onReveal={onReveal} onChange={onChange} answered={answer !== ""} />
    </div>
  )
}

function Ordering({
  question,
  answer,
  onAnswer,
}: {
  question: Extract<KnowledgeCheckQuestion, { kind: "ordering" }>
  answer: string
  onAnswer: (value: string) => void
}) {
  // Start from the learner's saved order, else the given order.
  const current = answer ? parseList(answer) : question.items.map((i) => i.id)
  const label = (id: string) => question.items.find((i) => i.id === id)?.text ?? id

  const move = (index: number, delta: number) => {
    const next = [...current]
    const target = index + delta
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    onAnswer(encodeList(next))
  }

  return (
    <ol className="space-y-2">
      {current.map((id, i) => (
        <li key={id} className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2">
          <span className="text-sm font-semibold text-muted-foreground">{i + 1}.</span>
          <span className="flex-1 text-sm text-foreground">{label(id)}</span>
          <span className="flex gap-1">
            <button
              type="button"
              onClick={() => move(i, -1)}
              disabled={i === 0}
              aria-label={`Move "${label(id)}" up`}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-xs font-semibold text-foreground transition-colors hover:border-avanza-green/60 hover:bg-avanza-green/5 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => move(i, 1)}
              disabled={i === current.length - 1}
              aria-label={`Move "${label(id)}" down`}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-xs font-semibold text-foreground transition-colors hover:border-avanza-green/60 hover:bg-avanza-green/5 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1"
            >
              ↓
            </button>
          </span>
        </li>
      ))}
    </ol>
  )
}

function OrderingCheck({
  question,
  answer,
  revealed,
  loaded,
  onReveal,
  onChange,
}: {
  question: Extract<KnowledgeCheckQuestion, { kind: "ordering" }>
  answer: string
  revealed: boolean
  loaded: boolean
  onReveal: () => void
  onChange: () => void
}) {
  const answered = parseList(answer || question.items.map((i) => i.id).join(","))
  const correct = revealed && isCorrect(question, encodeList(answered))
  return (
    <div className="mt-3 space-y-2">
      {!revealed ? (
        <button
          type="button"
          onClick={onReveal}
          disabled={!loaded}
          className="text-xs font-semibold text-avanza-green-dark underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground disabled:no-underline"
        >
          Check my order
        </button>
      ) : (
        <>
          <p className={`text-xs font-semibold ${correct ? "text-avanza-green-dark" : "text-avanza-orange-dark"}`} aria-live="polite">
            {correct ? "That order is correct." : "Not quite — use the arrows to rearrange and check again."}
          </p>
          <button type="button" onClick={onChange} className="text-xs font-semibold text-muted-foreground underline-offset-2 hover:underline">
            Keep rearranging
          </button>
        </>
      )}
    </div>
  )
}
