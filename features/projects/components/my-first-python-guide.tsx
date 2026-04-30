"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { getProjectGuide, type ProjectGuide } from "@/features/projects/data"

const PYTHON_CONCEPTS = [
  {
    name: "print()",
    description:
      'Shows text on screen. Try: print("Hello!") — the computer displays exactly what is inside the quotes.',
    example: 'print("Welcome to my quiz!")',
  },
  {
    name: "input()",
    description:
      "Pauses the program and waits for the user to type something. The answer is stored in a variable so you can check it later.",
    example: 'answer = input("What is 2 + 2? ")',
  },
  {
    name: "variables",
    description:
      "A named container that holds a value. You can change what is inside it during the program — perfect for keeping score.",
    example: "score = 0",
  },
  {
    name: "if statements",
    description:
      "Lets the program make a decision. If a condition is true, run one block of code. If not, skip it or do something else.",
    example: 'if answer == "4":\n    score = score + 1',
  },
]

const CODE_EXAMPLE = `score = 0

print("Welcome to my quiz!")

answer = input("What is the capital of France? ")
if answer.lower() == "paris":
    score = score + 1
    print("Correct!")
else:
    print("Not quite — it's Paris.")

print("Your score:", score, "out of 1")`

export function MyFirstPythonGuide({ project }: { project: ProjectGuide }) {
  const { language, t } = useLanguage()
  const guide = getProjectGuide(project.slug, language) ?? project

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.projectsPage.backToProjects}
        </Link>

        <div className="mt-8">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {guide.category}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground">
            {guide.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{guide.description}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            {guide.difficulty} · {guide.time}
          </p>
        </div>

        {/* Hero image */}
        <div className="mt-8 overflow-hidden rounded-lg border border-border">
          <div className="relative h-80">
            <Image
              src={guide.image}
              alt={guide.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="grid gap-16 lg:grid-cols-[1fr_260px]">
            {/* Main */}
            <div className="space-y-10">
              <section>
                <h2 className="text-xl font-bold text-foreground">
                  {t.projectsPage.introduction}
                </h2>
                <div className="mt-4 space-y-3 text-base leading-7 text-muted-foreground">
                  {guide.introduction.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground">{t.projectsPage.theWhy}</h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">{guide.why}</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground">
                  {t.projectsPage.stepByStepInstructions}
                </h2>
                <ol className="mt-5 space-y-5">
                  {guide.steps.map((step, index) => (
                    <li key={step} className="flex items-start gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-sm font-bold text-foreground">
                        {index + 1}
                      </span>
                      <p className="pt-0.5 text-base leading-7 text-foreground">{step}</p>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Python concepts */}
              {language === "en" && (
                <section>
                  <h2 className="text-xl font-bold text-foreground">The four building blocks</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    These are the only Python commands you need to build a working quiz game.
                  </p>
                  <dl className="mt-5 space-y-6">
                    {PYTHON_CONCEPTS.map((concept) => (
                      <div key={concept.name} className="border-t border-border pt-5">
                        <dt className="font-mono font-bold text-foreground">{concept.name}</dt>
                        <dd className="mt-2 text-sm leading-6 text-muted-foreground">
                          {concept.description}
                        </dd>
                        <dd className="mt-3">
                          <pre className="overflow-x-auto rounded-md border border-border bg-secondary/40 px-4 py-3 font-mono text-xs text-foreground">
                            {concept.example}
                          </pre>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {/* Full code example */}
              {language === "en" && (
                <section>
                  <h2 className="text-xl font-bold text-foreground">A complete example</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Copy this into Replit or Trinket and run it. Then modify the question to make it
                    your own.
                  </p>
                  <pre className="mt-4 overflow-x-auto rounded-md border border-border bg-secondary/40 px-5 py-4 font-mono text-sm leading-7 text-foreground">
                    {CODE_EXAMPLE}
                  </pre>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-10">
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
                  {t.projectsPage.materialsList}
                </h2>
                <ul className="mt-4 space-y-2">
                  {guide.materials.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-relaxed text-foreground"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {language === "en" && (
                <section className="border-t border-border pt-8">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
                    Where to write code
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {["Replit (replit.com)", "Trinket (trinket.io)", "Python.org online shell"].map(
                      (site) => (
                        <li
                          key={site}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                          {site}
                        </li>
                      ),
                    )}
                  </ul>
                </section>
              )}

              <section className="border-t border-border pt-8">
                <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
                  {t.projectsPage.safetyFirst}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.safety}</p>
              </section>

              <section className="border-t border-border pt-8">
                <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
                  {t.projectsPage.challengeMode}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.challenge}</p>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
