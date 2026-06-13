import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getProjectGuide } from "@/features/projects/data"
import {
  getProjectBreadcrumbJsonLd,
  getProjectFaqJsonLd,
  getProjectHowToJsonLd,
} from "@/features/projects/structured-data"
import { translations, type Language } from "@/i18n/translations"

const COKE_MENTOS_COMPARISONS = [
  "Different soda types, such as Diet Coke, cola, lemon-lime soda, and sparkling water",
  "Number of Mentos candies dropped at once",
  "Soda temperature: cold, room temperature, or warm outdoor shade",
  "Bottle size, such as 16-ounce, 1-liter, and 2-liter bottles",
  "Launch height measured against a wall, meter stick, or marked poster board",
]

export function GenericProjectGuide({ slug, language }: { slug: string; language: Language }) {
  const t = translations[language]
  const project = getProjectGuide(slug, language)
  const howToJsonLd = getProjectHowToJsonLd(slug, language)
  const faqJsonLd = getProjectFaqJsonLd(slug, language)
  const breadcrumbJsonLd = getProjectBreadcrumbJsonLd(slug, language)

  if (!project) {
    notFound()
  }

  return (
    <div className="bg-background">
      {howToJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      ) : null}
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      {breadcrumbJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      ) : null}
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
            {project.category}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground">
            {project.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{project.description}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            {project.difficulty} · {project.time}
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-border">
          <div className="relative h-80">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 896px, calc(100vw - 48px)"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="grid gap-16 lg:grid-cols-[1fr_260px]">
            <div className="space-y-10">
              <section>
                <h2 className="text-xl font-bold text-foreground">
                  {t.projectsPage.introduction}
                </h2>
                <div className="mt-4 space-y-3 text-base leading-7 text-muted-foreground">
                  {project.introduction.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground">{t.projectsPage.theWhy}</h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">{project.why}</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground">
                  {t.projectsPage.stepByStepInstructions}
                </h2>
                <ol className="mt-5 space-y-5">
                  {project.steps.map((step, index) => {
                    const stepImage = project.stepImages?.find(
                      (image) => image.step === index + 1,
                    )

                    return (
                      <li key={step} className="flex items-start gap-4">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-sm font-bold text-foreground">
                          {index + 1}
                        </span>
                        <div className="flex-1 space-y-3">
                          <p className="pt-0.5 text-base leading-7 text-foreground">{step}</p>
                          {stepImage ? (
                            <div className="relative h-56 w-full overflow-hidden rounded-lg border border-border">
                              <Image
                                src={stepImage.src}
                                alt={stepImage.alt}
                                fill
                                sizes="(min-width: 1024px) 640px, calc(100vw - 88px)"
                                className="object-cover"
                              />
                            </div>
                          ) : null}
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </section>

              {slug === "coke-mentos-experiment" && (
                <section>
                  <h2 className="text-xl font-bold text-foreground">
                    Science Fair Setup: Hypothesis, Variables, and Data
                  </h2>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    Turn the Coke and Mentos geyser into a science project by changing one thing at a
                    time and measuring the result. A sample hypothesis could be: if more Mentos are
                    dropped into the soda at once, then the geyser height will increase because more
                    carbon dioxide bubbles can form quickly.
                  </p>
                  <dl className="mt-5 space-y-5">
                    {[
                      {
                        term: "Independent variable",
                        definition: "The one thing you change, such as soda type, candy count, temperature, or bottle size.",
                      },
                      {
                        term: "Dependent variable",
                        definition: "What you measure, usually geyser height, launch time, or how much soda remains.",
                      },
                      {
                        term: "Controlled variables",
                        definition: "Everything you keep the same, such as the drop method, outdoor location, starting soda amount, and measurement tool.",
                      },
                    ].map((item) => (
                      <div key={item.term} className="border-t border-border pt-5">
                        <dt className="font-semibold text-foreground">{item.term}</dt>
                        <dd className="mt-1 text-sm leading-6 text-muted-foreground">
                          {item.definition}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <h3 className="mt-8 text-lg font-bold text-foreground">
                    Comparison tests to try
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {COKE_MENTOS_COMPARISONS.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                        <p className="text-base leading-7 text-muted-foreground">{item}</p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left">
                          <th className="pb-3 font-semibold text-foreground">Trial</th>
                          <th className="pb-3 font-semibold text-foreground">Variable tested</th>
                          <th className="pb-3 font-semibold text-foreground">Geyser height</th>
                          <th className="pb-3 font-semibold text-foreground">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3].map((trial) => (
                          <tr key={trial} className="border-b border-border">
                            <td className="py-3 text-muted-foreground">{trial}</td>
                            <td className="py-3 text-muted-foreground">_____</td>
                            <td className="py-3 text-muted-foreground">_____</td>
                            <td className="py-3 text-muted-foreground">_____</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    Safety note: run every trial outdoors, wear goggles, stand back immediately, and
                    never point the bottle toward people, windows, cars, or pets.
                  </p>
                </section>
              )}
            </div>

            <aside className="space-y-10">
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
                  {t.projectsPage.materialsList}
                </h2>
                <ul className="mt-4 space-y-2">
                  {project.materials.map((material) => (
                    <li
                      key={material}
                      className="flex items-start gap-2 text-sm leading-relaxed text-foreground"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                      {material}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="border-t border-border pt-8">
                <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
                  {t.projectsPage.safetyFirst}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.safety}</p>
              </section>

              <section className="border-t border-border pt-8">
                <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
                  {t.projectsPage.challengeMode}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.challenge}</p>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
