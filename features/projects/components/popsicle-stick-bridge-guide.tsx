"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight, PlayCircle } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { getProjectGuide, type ProjectGuide } from "@/features/projects/data"

const VIDEO_EMBED = "https://www.youtube-nocookie.com/embed/V2duNLaNyDE?rel=0"

const RESOURCE_LINKS = [
  {
    href: "https://www.wikihow.com/Build-a-Bridge-with-Popsicle-Sticks",
    icon: ArrowUpRight,
  },
  {
    href: "https://makezine.com/projects/make-warren-truss-bridge-popsicle-sticks/",
    icon: ArrowUpRight,
  },
  {
    href: "https://www.youtube.com/watch?v=V2duNLaNyDE",
    icon: PlayCircle,
  },
]

export function PopsicleStickBridgeGuide({ project }: { project: ProjectGuide }) {
  const { language, t } = useLanguage()
  const guide = getProjectGuide(project.slug, language) ?? project

  const backLabel = t.projectsPage.backToProjects
  const materialsLabel = t.projectsPage.materialsList
  const safetyLabel = t.projectsPage.safetyFirst
  const challengeLabel = t.projectsPage.challengeMode

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
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

        {/* YouTube video */}
        <div className="mt-8">
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            {t.projectsPage.buildAlongVideo}
          </p>
          <div className="relative overflow-hidden rounded-lg border border-border" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={VIDEO_EMBED}
              title={t.projectsPage.bridgeVideoTitle}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{t.projectsPage.bridgeVideoTitle}</p>
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
                  {t.projectsPage.bridgeBuildStepsTitle}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t.projectsPage.bridgeBuildStepsDesc}
                </p>
                <ol className="mt-5 space-y-6">
                  {t.projectsPage.bridgeBuildSteps.map((step, index) => (
                    <li key={step.title} className="flex items-start gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-sm font-bold text-foreground">
                        {index + 1}
                      </span>
                      <div className="pt-0.5">
                        <p className="font-semibold text-foreground">{step.title}</p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Bridge anatomy */}
              <section>
                <h2 className="text-xl font-bold text-foreground">
                  {t.projectsPage.bridgePartsTitle}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t.projectsPage.bridgePartsDesc}
                </p>
                <dl className="mt-5 space-y-5">
                  {t.projectsPage.bridgeAnatomyTerms.map((term) => (
                    <div key={term.term} className="border-t border-border pt-5">
                      <dt className="font-semibold text-foreground">{term.term}</dt>
                      <dd className="mt-1 text-sm leading-6 text-muted-foreground">
                        {term.definition}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-10">
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
                  {materialsLabel}
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
                  {t.projectsPage.resources}
                </h2>
                <ul className="mt-4 space-y-3">
                  {RESOURCE_LINKS.map((link, index) => {
                    const Icon = link.icon
                    return (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                        >
                          <Icon className="h-3.5 w-3.5 shrink-0" />
                          {t.projectsPage.bridgeResourceLabels[index]}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </section>

              <section className="border-t border-border pt-8">
                <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
                  {safetyLabel}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.safety}</p>
              </section>

              <section className="border-t border-border pt-8">
                <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
                  {challengeLabel}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.challenge}</p>
                <div className="mt-5 border-t border-border pt-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {t.projectsPage.or}
                  </p>
                  <a
                    href="https://www.youtube.com/watch?v=s3HZievz_3Y"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-start gap-1.5 text-sm leading-6 text-muted-foreground underline underline-offset-4 hover:text-foreground"
                  >
                    <PlayCircle className="mt-1 h-3.5 w-3.5 shrink-0" />
                    {t.projectsPage.strongerBridgeVideo}
                  </a>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
