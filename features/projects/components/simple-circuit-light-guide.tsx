"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { getProjectGuide, type ProjectGuide } from "@/features/projects/data"

const COMPONENT_NOTES = [
  {
    name: "Battery",
    detail:
      "The power source. Electricity flows from the positive terminal (+) through the circuit and back into the negative terminal (−). A 9V battery or a small AA battery pack both work.",
  },
  {
    name: "LED",
    detail:
      "Light-emitting diode. It only works in one direction: the long leg connects to positive, the short leg to negative. Flip it around if it does not light up.",
  },
  {
    name: "Wires",
    detail:
      "The pathway electricity travels through. Insulated wire keeps the current going in one direction and prevents short circuits.",
  },
  {
    name: "Switch",
    detail:
      "Opens or closes the circuit. When the switch is open, electricity cannot flow and the light goes out. When it is closed, the path is complete and the light turns on.",
  },
]

const TROUBLESHOOTING = [
  { problem: "LED does not light", fix: "Flip the LED around. Polarity is wrong." },
  { problem: "LED lights but is very dim", fix: "Check all wire connections. A loose contact reduces current." },
  { problem: "Nothing happens at all", fix: "Check the battery has charge and both wires are connected firmly." },
  { problem: "LED burns out quickly", fix: "Add a resistor between the battery and LED to limit current." },
]

export function SimpleCircuitLightGuide({ project }: { project: ProjectGuide }) {
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

              {/* Component notes */}
              {language === "en" && (
                <section>
                  <h2 className="text-xl font-bold text-foreground">What each part does</h2>
                  <dl className="mt-5 space-y-5">
                    {COMPONENT_NOTES.map((c) => (
                      <div key={c.name} className="border-t border-border pt-5">
                        <dt className="font-semibold text-foreground">{c.name}</dt>
                        <dd className="mt-1 text-sm leading-6 text-muted-foreground">{c.detail}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {/* Troubleshooting */}
              {language === "en" && (
                <section>
                  <h2 className="text-xl font-bold text-foreground">Troubleshooting</h2>
                  <table className="mt-5 w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="pb-3 font-semibold text-foreground">Problem</th>
                        <th className="pb-3 font-semibold text-foreground">Fix</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TROUBLESHOOTING.map((row) => (
                        <tr key={row.problem} className="border-b border-border">
                          <td className="py-3 pr-6 text-muted-foreground">{row.problem}</td>
                          <td className="py-3 text-foreground">{row.fix}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
