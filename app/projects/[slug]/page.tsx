import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getProjectGuide, projectGuides } from "@/features/projects/data"
import { type Language, translations } from "@/i18n/translations"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cookieStore = await cookies()
  const cookieLanguage = cookieStore.get("avanza-lang")?.value
  const language: Language = cookieLanguage === "es" || cookieLanguage === "zh" ? cookieLanguage : "en"
  const project = getProjectGuide(slug, language)

  if (!project) return {}

  const title = `${project.title} - Avanza STEM`
  const description = project.description

  return {
    title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://avanzastem.org/projects/${slug}`,
      type: "article",
      images: [{ url: project.image, alt: project.title }],
    },
    twitter: { card: "summary_large_image", title, description },
  }
}

export function generateStaticParams() {
  return projectGuides
    .filter(
      (project) =>
        ![
          "popsicle-stick-bridge",
          "simple-circuit-light",
          "my-first-python-program",
          "baking-soda-volcano",
          "lego-robot-builder",
        ].includes(project.slug),
    )
    .map((project) => ({
      slug: project.slug,
    }))
}

export default async function ProjectGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cookieStore = await cookies()
  const cookieLanguage = cookieStore.get("avanza-lang")?.value
  const language: Language = cookieLanguage === "es" || cookieLanguage === "zh" ? cookieLanguage : "en"
  const t = translations[language]
  const project = getProjectGuide(slug, language)

  if (!project) {
    notFound()
  }

  return (
    <div className="bg-background">
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
                  {project.steps.map((step, index) => (
                    <li key={step} className="flex items-start gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-sm font-bold text-foreground">
                        {index + 1}
                      </span>
                      <p className="pt-0.5 text-base leading-7 text-foreground">{step}</p>
                    </li>
                  ))}
                </ol>
              </section>
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
