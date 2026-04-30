"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { getProjectGuide, type ProjectGuide } from "@/features/projects/data"

const SCIENCE_TERMS = [
  {
    term: "Nucleation",
    definition:
      "When dissolved gas finds a rough surface to escape from. The tiny bumps on Mentos candy do the same thing — they give gas many escape points at once.",
  },
  {
    term: "Carbon dioxide (CO₂)",
    definition:
      "The gas produced when baking soda and vinegar react. It expands rapidly and pushes the liquid upward.",
  },
  {
    term: "Surface tension",
    definition:
      "Dish soap lowers the surface tension of the liquid, which lets the CO₂ form more stable bubbles. That is why the foam is thick instead of thin and quick.",
  },
  {
    term: "Endothermic reaction",
    definition:
      "The mixture often feels slightly cooler after the reaction. That is because the chemical process absorbs heat from the surroundings.",
  },
]

export function BakingSodaVolcanoGuide({ project }: { project: ProjectGuide }) {
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

              {/* Chemical equation — shown in English only */}
              {language === "en" && (
                <section>
                  <h2 className="text-xl font-bold text-foreground">The reaction in full</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    The eruption is actually two steps happening very fast.
                  </p>
                  <div className="mt-5 space-y-5">
                    <div className="border-t border-border pt-5">
                      <p className="font-semibold text-foreground">
                        Step 1 — Acid-base exchange
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Acetic acid (vinegar) meets sodium bicarbonate (baking soda). They trade
                        parts and produce sodium acetate and carbonic acid.
                      </p>
                    </div>
                    <div className="border-t border-border pt-5">
                      <p className="font-semibold text-foreground">Step 2 — Decomposition</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Carbonic acid is unstable, so it immediately breaks apart into water and
                        carbon dioxide gas. That is the CO₂ you see rushing out as foam.
                      </p>
                    </div>
                    <div className="overflow-x-auto rounded-md border border-border bg-secondary/40 px-5 py-4">
                      <p className="font-mono text-sm text-foreground">
                        NaHCO₃&nbsp;+&nbsp;CH₃COOH&nbsp;→&nbsp;CH₃COONa&nbsp;+&nbsp;H₂O&nbsp;+&nbsp;CO₂
                      </p>
                    </div>
                  </div>
                </section>
              )}

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

              {/* Science vocab */}
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
                  {t.projectsPage.challengeMode}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.challenge}</p>
              </section>

              {language === "en" && (
                <section className="border-t border-border pt-8">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
                    Turn it into an experiment
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Change only one thing at a time — vinegar amount, baking soda amount, or soap — and
                    measure the eruption height each trial. That is the difference between a cool
                    demo and a real experiment.
                  </p>
                </section>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
