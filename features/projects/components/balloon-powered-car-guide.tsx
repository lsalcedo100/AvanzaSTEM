"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { getProjectGuide, type ProjectGuide } from "@/features/projects/data"
import { ProjectStepPhoto } from "@/features/projects/components/step-photo"

const WHAT_YOU_LEARN = [
  "Newton's Third Law of Motion",
  "Potential and kinetic energy",
  "Basic engineering design",
  "How small changes in wheels, axles, weight, and airflow affect performance",
]

const CHALLENGE_PROMPTS = [
  "Can your car travel farther?",
  "What happens if you use bigger wheels?",
  "What happens if the car body is lighter?",
  "Can you make the balloon connection more airtight?",
  "Can you race against another team?",
]

export function BalloonPoweredCarGuide({ project }: { project: ProjectGuide }) {
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
                <ol className="mt-5 space-y-5">
                  {guide.steps.map((step, index) => {
                    const stepImage = guide.stepImages?.find((image) => image.step === index + 1)
                    return (
                      <li key={step} className="flex items-start gap-4">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-sm font-bold text-foreground">
                          {index + 1}
                        </span>
                        <div className="flex-1 space-y-3">
                          <p className="pt-0.5 text-base leading-7 text-foreground">{step}</p>
                          {stepImage ? <ProjectStepPhoto stepImage={stepImage} /> : null}
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </section>
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
