"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, Star, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { LightboxImage } from "@/components/ui/lightbox-image"
import { getProjectGuides } from "@/features/projects/data"
import { FadeIn } from "@/components/ui/animate"

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
        <FadeIn className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">
            {t.projectsPage.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/85">
            {t.projectsPage.description}
          </p>
        </FadeIn>
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
              className={`cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                activeFilter === tag.key
                  ? "bg-avanza-green text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-avanza-green/10 hover:text-avanza-green"
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
            {filteredProjects.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 70}>
                <ProjectCard {...project} translations={{ viewFullProject: t.projectsPage.viewFullProject }} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Note */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeIn>
            <div className="rounded-2xl border-2 border-avanza-orange/30 bg-card p-8">
              <h2 className="text-2xl font-extrabold text-foreground">{t.projectsPage.safetyFirst}</h2>
              <p className="mt-4 text-muted-foreground">
                {t.projectsPage.safetyText}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-avanza-dark py-16">
        <FadeIn className="mx-auto max-w-4xl px-6 text-center" rootMargin="0px 0px -30px 0px">
          <h2 className="text-3xl font-extrabold text-primary-foreground">
            {t.projectsPage.haveIdea}
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/70">
            {t.projectsPage.haveIdeaDesc}
          </p>
          <a
            href="mailto:liam@avanzastem.org"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-avanza-green px-8 py-4 text-lg font-bold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            {t.projectsPage.shareIdea} <ArrowRight className="h-5 w-5" />
          </a>
        </FadeIn>
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
  tagColor,
  translations,
}: {
  title: string
  slug: string
  difficulty: string
  time: string
  image: string
  description: string
  tagColor: string
  translations: {
    viewFullProject: string
  }
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <LightboxImage
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
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

        <Link
          href={`/projects/${slug}`}
          className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full ${tagColor} px-6 py-3 text-sm font-bold text-primary-foreground transition-all duration-200 hover:scale-[1.02] hover:shadow-md`}
        >
          {translations.viewFullProject} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
