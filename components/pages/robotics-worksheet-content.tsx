import Link from "next/link"
import { roboticsLessonPath, type RoboticsModule } from "@/features/curriculums/robotics"
import { PrintButton } from "@/components/ui/print-button"

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"] as const

/** A blank space for students to write an answer by hand. */
function WriteSpace({ className = "h-16" }: { className?: string }) {
  return <div className={`mt-2 rounded-md border border-border ${className}`} />
}

/**
 * A printable student worksheet for one robotics week (/courses/robotics/[lesson]/worksheet).
 *
 * This is a server component: it renders a plain, print-friendly classroom handout from the
 * passed `RoboticsModule`. It never reveals knowledge-check answers, and everything a student
 * writes is a blank ruled box they fill in by hand. The on-screen toolbar (print button + back
 * link) lives in a `print-hidden` container so it stays off the printout.
 */
export function RoboticsWorksheetContent({ module }: { module: RoboticsModule }) {
  const label = module.isFinal ? "Final project" : `Week ${module.week}`

  return (
    <article className="bg-background">
      <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
        {/* On-screen toolbar (kept off the printed handout) */}
        <div className="print-hidden mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <Link
            href={roboticsLessonPath(module.slug)}
            className="text-sm font-semibold text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
          >
            ← Back to the lesson
          </Link>
          <PrintButton tone="green" />
        </div>

        {/* Name / date line for students */}
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-foreground">
          <p>Name: ______________________________</p>
          <p>Date: ____________________</p>
        </div>

        {/* Header */}
        <header className="mt-6 border-b border-border pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
          <h1 className="mt-2 text-3xl font-extrabold text-foreground">{module.title}</h1>
          <p className="mt-3 text-base leading-relaxed text-foreground/90">{module.subtitle}</p>
          <p className="mt-3 text-sm font-medium text-foreground">{module.estimatedTime}</p>
        </header>

        {/* Key ideas */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-foreground">Key ideas</h2>
          <div className="mt-4 space-y-4">
            {module.concepts.map((concept) => (
              <div key={concept.id}>
                <h3 className="font-bold text-foreground">{concept.title}</h3>
                {concept.body[0] && (
                  <p className="mt-1 text-sm leading-relaxed text-foreground/90">{concept.body[0]}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Words to know */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-foreground">Words to know</h2>
          <dl className="mt-4 space-y-3">
            {module.vocabulary.map((term) => (
              <div key={term.term} className="text-sm leading-relaxed">
                <dt className="inline font-semibold text-foreground">{term.term}: </dt>
                <dd className="inline text-foreground/90">{term.definition}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Your activity */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-foreground">Your activity</h2>
          <div className="mt-4 space-y-8">
            {module.activities.map((activity) => (
              <div key={activity.id}>
                <h3 className="font-bold text-foreground">{activity.title}</h3>
                <p className="mt-1 text-sm text-foreground/90">
                  <span className="font-semibold text-foreground">Goal: </span>
                  {activity.goal}
                </p>
                {activity.shared.length > 0 && (
                  <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/90">
                    {activity.shared.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                )}
                <p className="mt-4 text-sm font-semibold text-foreground">Write what happened:</p>
                <WriteSpace className="h-24" />
              </div>
            ))}
          </div>
        </section>

        {/* Predict */}
        {module.predictionPrompts.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-foreground">Predict</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Write your guess before you test.
            </p>
            <div className="mt-4 space-y-6">
              {module.predictionPrompts.map((prompt) => (
                <div key={prompt.id}>
                  <p className="text-sm font-semibold text-foreground">{prompt.prompt}</p>
                  <WriteSpace />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Test and record */}
        {module.testRecords.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-foreground">Test and record</h2>
            <div className="mt-4 space-y-6">
              {module.testRecords.map((record) => (
                <div key={record.id}>
                  <h3 className="font-bold text-foreground">{record.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{record.instructions}</p>
                  <p className="mt-2 text-sm text-foreground/90">
                    <span className="font-semibold text-foreground">Record: </span>
                    {record.measure}
                  </p>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr>
                          {record.columns.map((col) => (
                            <th
                              key={col}
                              className="border border-border bg-secondary px-3 py-2 text-left font-semibold text-foreground"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: record.rows }).map((_, r) => (
                          <tr key={r}>
                            {record.columns.map((col) => (
                              <td key={col} className="border border-border px-3 py-4">
                                &nbsp;
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Knowledge check */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-foreground">Knowledge check</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Answer each question. For choice questions, circle the best answer.
          </p>
          <ol className="mt-4 list-decimal space-y-5 pl-5">
            {module.knowledgeCheck.questions.map((question) => (
              <li key={question.id} className="text-sm leading-relaxed">
                <p className="font-semibold text-foreground">{question.prompt}</p>
                {"scenario" in question && (
                  <p className="mt-1 rounded-md border border-border bg-secondary px-3 py-2 text-muted-foreground">
                    {question.scenario}
                  </p>
                )}
                {"statement" in question && (
                  <p className="mt-1 text-foreground/90">&ldquo;{question.statement}&rdquo;</p>
                )}
                {"program" in question && (
                  <pre className="mt-1 overflow-x-auto rounded-md border border-border bg-secondary px-3 py-2 font-mono text-xs text-foreground">
                    {question.program.join("\n")}
                  </pre>
                )}

                {"options" in question && (
                  <ul className="mt-2 space-y-1.5">
                    {question.kind === "multiple" && (
                      <li className="text-xs text-muted-foreground">(Circle all that apply.)</li>
                    )}
                    {question.options.map((option, i) => (
                      <li key={option.id} className="flex gap-2 text-foreground/90">
                        <span className="font-semibold text-foreground">{OPTION_LETTERS[i]}.</span>
                        <span>{option.text}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {question.kind === "true-false" && (
                  <p className="mt-2 text-foreground/90">Circle one: &nbsp; True &nbsp; / &nbsp; False</p>
                )}

                {question.kind === "ordering" && (
                  <ul className="mt-2 space-y-1.5">
                    <li className="text-xs text-muted-foreground">(Number these from 1 to {question.items.length}.)</li>
                    {question.items.map((item) => (
                      <li key={item.id} className="flex gap-2 text-foreground/90">
                        <span aria-hidden className="inline-block w-6 border-b border-border">&nbsp;</span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {question.kind === "matching" && (
                  <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1.5">
                    <div>
                      {question.pairs.map((pair) => (
                        <p key={pair.id} className="text-foreground/90">{pair.left}</p>
                      ))}
                    </div>
                    <div>
                      {question.pairs.map((pair) => (
                        <p key={pair.id} className="text-muted-foreground">{pair.right}</p>
                      ))}
                    </div>
                    <p className="col-span-2 text-xs text-muted-foreground">(Draw a line from each item on the left to its match on the right.)</p>
                  </div>
                )}

                {question.kind === "short" && (
                  <div className="mt-2 space-y-2" aria-hidden>
                    <div className="h-6 border-b border-border" />
                    <div className="h-6 border-b border-border" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* Reflect */}
        {module.reflection.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-foreground">Reflect</h2>
            <div className="mt-4 space-y-6">
              {module.reflection.map((prompt) => (
                <div key={prompt.id}>
                  <p className="text-sm font-semibold text-foreground">{prompt.prompt}</p>
                  <WriteSpace />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}
