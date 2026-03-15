import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, Lightbulb, ListChecks, ShieldAlert, Star } from "lucide-react"
import { getProjectGuide, projectGuides } from "@/lib/project-guides"

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
  const project = getProjectGuide(slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <section className="bg-gradient-to-br from-avanza-purple to-[#e74c8b] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/20"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="mt-8 grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="inline-block rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground">
                {project.category}
              </span>
              <h1 className="mt-4 text-4xl font-extrabold text-primary-foreground md:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-primary-foreground/85">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-primary-foreground/90">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2">
                  <Star className="h-4 w-4" />
                  {project.difficulty}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2">
                  <Clock className="h-4 w-4" />
                  {project.time}
                </span>
              </div>
            </div>

            <div className="relative h-72 overflow-hidden rounded-3xl border border-primary-foreground/15 shadow-2xl">
              <Image src={project.image} alt={project.title} fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-8">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <h2 className="text-2xl font-extrabold text-card-foreground">Introduction</h2>
              <div className="mt-4 space-y-3 text-base leading-7 text-muted-foreground">
                {project.introduction.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-avanza-orange" />
                <h2 className="text-2xl font-extrabold text-card-foreground">The Why</h2>
              </div>
              <p className="mt-4 text-base leading-7 text-muted-foreground">{project.why}</p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <ListChecks className="h-6 w-6 text-avanza-green" />
                <h2 className="text-2xl font-extrabold text-card-foreground">
                  Step-by-Step Instructions
                </h2>
              </div>
              <ol className="mt-6 space-y-4">
                {project.steps.map((step, index) => (
                  <li key={step} className="flex items-start gap-4 rounded-2xl bg-secondary/60 p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-avanza-green text-sm font-extrabold text-primary-foreground">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-base leading-7 text-foreground">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <h2 className="text-2xl font-extrabold text-card-foreground">Materials List</h2>
              <ul className="mt-4 space-y-3">
                {project.materials.map((material) => (
                  <li key={material} className="rounded-2xl bg-secondary/60 px-4 py-3 text-sm text-foreground">
                    {material}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border-2 border-avanza-orange/30 bg-avanza-orange/5 p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <ShieldAlert className="h-6 w-6 text-avanza-orange" />
                <h2 className="text-2xl font-extrabold text-card-foreground">Safety First</h2>
              </div>
              <p className="mt-4 text-base leading-7 text-muted-foreground">{project.safety}</p>
            </div>

            <div className="rounded-3xl border border-avanza-purple/20 bg-avanza-purple/5 p-8 shadow-sm">
              <h2 className="text-2xl font-extrabold text-card-foreground">Challenge Mode</h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">{project.challenge}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
