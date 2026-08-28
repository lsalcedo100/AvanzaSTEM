import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { PrintButton } from "@/components/ui/print-button"
import { getProjectGuide } from "@/features/projects/data"
import {
  getProjectBreadcrumbJsonLd,
  getProjectFaqJsonLd,
  getProjectHowToJsonLd,
} from "@/features/projects/structured-data"
import { translations, type Language } from "@/i18n/translations"

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
          <div className="relative h-80 bg-secondary/40">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 896px, calc(100vw - 48px)"
                className="object-cover"
                priority
              />
            ) : (
              // No authentic photo for this guide yet - restrained graph-paper
              // panel rather than a stock or AI-generated image.
              <div className="notebook-grid h-full w-full bg-secondary" aria-hidden="true" />
            )}
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

              {project.video ? (
                <section>
                  <h2 className="text-xl font-bold text-foreground">
                    {t.projectsPage.watchThis}
                  </h2>
                  <figure className="mt-4">
                    {/* youtube-nocookie + strict referrer policy, matching the
                        blog's embed: no cookie is set unless the viewer plays. */}
                    <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-secondary">
                      <iframe
                        className="absolute inset-0 h-full w-full"
                        src={`https://www.youtube-nocookie.com/embed/${project.video.videoId}?rel=0${
                          project.video.startSeconds ? `&start=${project.video.startSeconds}` : ""
                        }`}
                        title={project.video.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                    {project.video.caption ? (
                      <figcaption className="mt-3 text-sm leading-6 text-muted-foreground">
                        {project.video.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                </section>
              ) : null}

              {project.codeBlock ? (
                <section>
                  <h2 className="text-xl font-bold text-foreground">
                    {project.codeBlock.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    {project.codeBlock.intro}
                  </p>
                  <div className="mt-5 overflow-x-auto rounded-lg border border-border bg-secondary">
                    <pre className="p-5 text-sm leading-6">
                      <code className="font-mono text-foreground">{project.codeBlock.code}</code>
                    </pre>
                  </div>
                  {project.codeBlock.note ? (
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      {project.codeBlock.note}
                    </p>
                  ) : null}
                </section>
              ) : null}

              {project.recordSheet ? (
                <section>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-xl font-bold text-foreground">
                      {project.recordSheet.title}
                    </h2>
                    <PrintButton label={t.projectsPage.recordSheetPrint} />
                  </div>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    {project.recordSheet.intro}
                  </p>

                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left">
                          {project.recordSheet.columns.map((column) => (
                            <th key={column} className="pb-3 pr-4 font-semibold text-foreground">
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: project.recordSheet.rows }, (_, row) => (
                          <tr key={row} className="border-b border-border">
                            {project.recordSheet!.columns.map((column) => (
                              <td key={column} className="py-3 pr-4 text-muted-foreground">
                                <span className="sr-only">
                                  {`${t.projectsPage.recordSheetRowLabel} ${row + 1}, ${column}`}
                                </span>
                                <span aria-hidden="true">_____</span>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {project.recordSheet.footnote ? (
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      {project.recordSheet.footnote}
                    </p>
                  ) : null}
                </section>
              ) : null}

              {slug === "coke-mentos-experiment" && (
                <section>
                  <h2 className="text-xl font-bold text-foreground">
                    {t.projectsPage.mentosScienceTitle}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    {t.projectsPage.mentosScienceIntro}
                  </p>
                  <dl className="mt-5 space-y-5">
                    {t.projectsPage.mentosScienceVariables.map((item) => (
                      <div key={item.term} className="border-t border-border pt-5">
                        <dt className="font-semibold text-foreground">{item.term}</dt>
                        <dd className="mt-1 text-sm leading-6 text-muted-foreground">
                          {item.definition}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <h3 className="mt-8 text-lg font-bold text-foreground">
                    {t.projectsPage.mentosComparisonsTitle}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {t.projectsPage.mentosComparisons.map((item) => (
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
                          <th className="pb-3 font-semibold text-foreground">{t.projectsPage.mentosTableTrial}</th>
                          <th className="pb-3 font-semibold text-foreground">{t.projectsPage.mentosTableVariable}</th>
                          <th className="pb-3 font-semibold text-foreground">{t.projectsPage.mentosTableHeight}</th>
                          <th className="pb-3 font-semibold text-foreground">{t.projectsPage.mentosTableNotes}</th>
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
                    {t.projectsPage.mentosSafetyNote}
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
