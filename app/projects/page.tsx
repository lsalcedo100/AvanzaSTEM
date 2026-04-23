"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, Star, ListChecks, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { LightboxImage } from "@/components/ui/lightbox-image"
import { getProjectGuides } from "@/features/projects/data"

type ProjectCategory = "engineering" | "science" | "coding" | "robotics"
type FilterTag = "all" | ProjectCategory

const projectTagColors: Record<string, string> = {
  "popsicle-stick-bridge": "bg-avanza-purple",
  "lego-robot-builder": "bg-avanza-green",
  "coke-mentos-experiment": "bg-avanza-orange",
  "my-first-python-program": "bg-avanza-teal",
  "baking-soda-volcano": "bg-avanza-orange",
  "simple-circuit-light": "bg-avanza-purple",
}

export default function ProjectsPage() {
  const { language, t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState<FilterTag>("all")

  const projects = getProjectGuides(language).map((project) => ({
    ...project,
    category: project.categoryKey as ProjectCategory,
    tagColor: projectTagColors[project.slug] ?? "bg-avanza-green",
  }))

  const filterTags: { key: FilterTag; label: string }[] = [
    { key: "all", label: t.projectsPage.all },
    { key: "engineering", label: t.projectsPage.engineering },
    { key: "science", label: t.projectsPage.science },
    { key: "coding", label: t.projectsPage.coding },
    { key: "robotics", label: t.projectsPage.robotics },
  ]
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter)

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-avanza-purple to-[#e74c8b] py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">
            {t.projectsPage.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/85">
            {t.projectsPage.description}
          </p>
        </div>
      </section>

      {/* Filter Tags */}
      <section className="border-b border-border bg-background py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-6">
          {filterTags.map((tag) => (
            <button
              key={tag.key}
              type="button"
              aria-pressed={activeFilter === tag.key}
              onClick={() => setActiveFilter(tag.key)}
              className={`cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                activeFilter === tag.key
                  ? "bg-avanza-green text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-avanza-green/10"
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} translations={t.projectsPage} />
            ))}
          </div>
        </div>
      </section>

      {/* Safety Note */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="rounded-2xl border-2 border-avanza-orange/30 bg-card p-8">
            <h2 className="text-2xl font-extrabold text-foreground">{t.projectsPage.safetyFirst}</h2>
            <p className="mt-4 text-muted-foreground">
              {t.projectsPage.safetyText}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-avanza-dark py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground">
            {t.projectsPage.haveIdea}
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/70">
            {t.projectsPage.haveIdeaDesc}
          </p>
          <a
            href="mailto:liam@avanzastem.org"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-avanza-green px-8 py-4 text-lg font-bold text-primary-foreground transition-transform hover:scale-105"
          >
            {t.projectsPage.shareIdea} <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </>
  )
}

function ProjectCard({
  title,
  slug,
  difficulty,
  time,
  image,
  description,
  materials,
  steps,
  tagColor,
  translations,
}: {
  title: string
  slug: string
  difficulty: string
  time: string
  image: string
  description: string
  materials: string[]
  steps: string[]
  tagColor: string
  translations: {
    whatYouNeed: string
    steps: string
    moreItems: string
    moreSteps: string
    viewFullProject: string
  }
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <LightboxImage
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-card-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5" /> {difficulty}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {time}
          </span>
        </div>

        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{translations.whatYouNeed}</p>
          <ul className="mt-2 space-y-1">
            {materials.slice(0, 3).map((material) => (
              <li key={material} className="text-xs text-muted-foreground">
                {"- " + material}
              </li>
            ))}
            {materials.length > 3 && (
              <li className="text-xs font-medium text-avanza-green">{"+ " + (materials.length - 3) + " " + translations.moreItems}</li>
            )}
          </ul>
        </div>

        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{translations.steps}</p>
          <ol className="mt-2 space-y-1">
            {steps.slice(0, 3).map((step, i) => (
              <li key={step} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-avanza-green/20 text-[10px] font-bold text-avanza-green">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
            {steps.length > 3 && (
              <li className="text-xs font-medium text-avanza-green">
                <ListChecks className="mr-1 inline h-3 w-3" />
                {"+ " + (steps.length - 3) + " " + translations.moreSteps}
              </li>
            )}
          </ol>
        </div>

        <Link
          href={`/projects/${slug}`}
          className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full ${tagColor} px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]`}
        >
          {translations.viewFullProject} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
