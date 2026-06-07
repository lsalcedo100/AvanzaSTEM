"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { getProjectGuide, type ProjectGuide } from "@/features/projects/data"

const WHAT_YOU_LEARN = [
  "How batteries create electricity",
  "Chemical energy and electrical energy",
  "Basic circuits",
  "Conductors and electrolytes",
  "Why different metals create voltage",
]

const CHALLENGE_PROMPTS = [
  "Can you power an LED with more than one lemon?",
  "What happens if you use more lemons?",
  "What happens if you try a potato, orange, or apple instead?",
  "Which fruit produces the most voltage?",
  "What happens if the metals are closer together or farther apart?",
  "Can your team build the strongest fruit battery?",
]

const SCIENCE_TERMS = [
  {
    term: "Electrolyte",
    definition:
      "A liquid that conducts electricity by allowing charged particles to move through it. Lemon juice is an electrolyte because of the citric acid it contains.",
  },
  {
    term: "Electrode",
    definition:
      "A solid conductor that electricity enters or leaves through. In this project, the zinc nail and copper piece are your two electrodes.",
  },
  {
    term: "Voltage",
    definition:
      "The force that pushes electrons through a circuit. More lemons in a chain means more voltage, which is why extra lemons can power bigger devices.",
  },
  {
    term: "Chemical energy",
    definition:
      "Energy stored in the bonds between atoms. The acid in the lemon reacts with the metals and releases some of that stored energy as electricity.",
  },
]

export function LemonPoweredBatteriesGuide({ project }: { project: ProjectGuide }) {
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

              {language === "en" && (
                <section>
                  <h2 className="text-xl font-bold text-foreground">What You&apos;ll Learn</h2>
                  <ul className="mt-5 space-y-3">
                    {WHAT_YOU_LEARN.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                        <p className="text-base leading-7 text-muted-foreground">{item}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section>
                <h2 className="text-xl font-bold text-foreground">
                  {language === "en" ? "How It Works" : t.projectsPage.theWhy}
                </h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">{guide.why}</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground">
                  {t.projectsPage.stepByStepInstructions}
                </h2>
                {language === "en" && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Tip: lightly sand the zinc nails before you start so the metal surface is clean and the reaction works properly.
                  </p>
                )}
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

              {language === "en" && (
                <section>
                  <h2 className="text-xl font-bold text-foreground">Science vocabulary</h2>
                  <dl className="mt-5 space-y-5">
                    {SCIENCE_TERMS.map((term) => (
                      <div key={term.term} className="border-t border-border pt-5">
                        <dt className="font-semibold text-foreground">{term.term}</dt>
                        <dd className="mt-1 text-sm leading-6 text-muted-foreground">
                          {term.definition}
                        </dd>
                      </div>
                    ))}
                  </dl>
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

              <section className="border-t border-border pt-8">
                <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
                  {t.projectsPage.safetyFirst}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.safety}</p>
              </section>

              <section className="border-t border-border pt-8">
                <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
                  {language === "en" ? "Try This!" : t.projectsPage.challengeMode}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.challenge}</p>
                {language === "en" && (
                  <ul className="mt-4 space-y-2">
                    {CHALLENGE_PROMPTS.map((prompt) => (
                      <li
                        key={prompt}
                        className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                        {prompt}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
