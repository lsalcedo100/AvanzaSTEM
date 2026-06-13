"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/ui/animate"
import { getProjectGuides } from "@/features/projects/data"
import { useLanguage } from "@/components/providers/language-provider"

type ProjectCategory = "engineering" | "science" | "coding" | "robotics"
type FilterTag = "all" | ProjectCategory

export function ProjectsPageContent() {
  const { language, t } = useLanguage()
  const projects = getProjectGuides(language)
  const [activeFilter, setActiveFilter] = useState<FilterTag>("all")

  const filterTags: { key: FilterTag; label: string }[] = [
    { key: "all", label: t.projectsPage.all },
    { key: "engineering", label: t.projectsPage.engineering },
    { key: "science", label: t.projectsPage.science },
    { key: "coding", label: t.projectsPage.coding },
    { key: "robotics", label: t.projectsPage.robotics },
  ]

  const taggedProjects = projects.map((project) => ({
    ...project,
    category: project.categoryKey as ProjectCategory,
  }))

  const filteredProjects =
    activeFilter === "all"
      ? taggedProjects
      : taggedProjects.filter((p) => p.category === activeFilter)

  return (
    <>
      <section className="border-b border-border bg-background py-16">
        <FadeIn className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {t.projectsPage.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t.projectsPage.description}
          </p>
        </FadeIn>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap gap-1">
            {filterTags.map((tag) => (
              <button
                key={tag.key}
                type="button"
                aria-pressed={activeFilter === tag.key}
                onClick={() => setActiveFilter(tag.key)}
                className={`-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeFilter === tag.key
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 70}>
                <ProjectCard
                  slug={project.slug}
                  title={project.title}
                  category={project.category}
                  difficulty={project.difficulty}
                  time={project.time}
                  image={project.image}
                  description={project.description}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background py-14">
        <FadeIn className="mx-auto max-w-4xl px-6">
          <h2 className="text-base font-bold text-foreground">{t.projectsPage.safetyFirst}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t.projectsPage.safetyText}
          </p>
        </FadeIn>
      </section>

      <section className="border-t border-border bg-background py-14">
        <FadeIn className="mx-auto max-w-4xl px-6" rootMargin="0px 0px -30px 0px">
          <h2 className="text-xl font-bold text-foreground">{t.projectsPage.haveIdea}</h2>
          <p className="mt-2 text-muted-foreground">{t.projectsPage.haveIdeaDesc}</p>
          <a
            href="mailto:liam@avanzastem.org"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline underline-offset-4"
          >
            {t.projectsPage.shareIdea} <ArrowRight className="h-4 w-4" />
          </a>
        </FadeIn>
      </section>
    </>
  )
}

function ProjectCard({
  title,
  slug,
  category,
  difficulty,
  time,
  image,
  description,
}: {
  title: string
  slug: string
  category: string
  difficulty: string
  time: string
  image: string
  description: string
}) {
  return (
    <Link href={`/projects/${slug}`} className="group block">
      <div className="overflow-hidden rounded-md border border-border">
        <div className="relative h-52">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {category}
        </p>
        <h3 className="mt-1 text-xl font-bold text-foreground group-hover:underline group-hover:underline-offset-2">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          {difficulty} · {time}
        </p>
      </div>
    </Link>
  )
}
