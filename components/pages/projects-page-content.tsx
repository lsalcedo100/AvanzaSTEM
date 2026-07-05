"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronDown } from "lucide-react"
import { FadeIn } from "@/components/ui/animate"
import { getProjectGuides } from "@/features/projects/data"
import { useLanguage } from "@/components/providers/language-provider"

type ProjectCategory = "engineering" | "science" | "coding" | "robotics"
type FilterTag = "all" | ProjectCategory

export function ProjectsPageContent() {
  const { language, t } = useLanguage()
  const projects = getProjectGuides(language)
  const [activeFilter, setActiveFilter] = useState<FilterTag>("all")
  const [isStemProjectOpen, setIsStemProjectOpen] = useState(false)

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
      <section className="border-b border-blue-300 bg-gradient-to-br from-[#edf8ff] via-sky-300 to-blue-700 py-16">
        <FadeIn className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {t.projectsPage.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t.projectsPage.description}
          </p>

          <div className="mt-10 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground">{t.projectsPage.stemProjectTitle}</h2>

            <p
              aria-hidden={isStemProjectOpen}
              className={`text-base leading-7 text-muted-foreground transition-all duration-300 ease-in-out ${
                isStemProjectOpen
                  ? "mt-0 max-h-0 overflow-hidden opacity-0"
                  : "mt-4 max-h-32 opacity-100"
              }`}
            >
              {t.projectsPage.stemProjectPreview}{" "}
              <button
                type="button"
                aria-expanded={isStemProjectOpen}
                aria-controls="stem-project-details"
                onClick={() => setIsStemProjectOpen((open) => !open)}
                className="inline-flex items-center gap-1 font-semibold text-foreground underline underline-offset-4 outline-none transition-colors hover:text-avanza-green-dark focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {t.projectsPage.stemProjectReadMore}
                <ChevronDown className="h-4 w-4 transition-transform duration-300" aria-hidden="true" />
              </button>
            </p>

            <div
              id="stem-project-details"
              aria-hidden={!isStemProjectOpen}
              inert={!isStemProjectOpen || undefined}
              className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                isStemProjectOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div
                className={`overflow-hidden transition-opacity duration-500 ease-in-out ${
                  isStemProjectOpen ? "opacity-100 delay-100" : "opacity-0"
                }`}
              >
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  {t.projectsPage.stemProjectP1}
                </p>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  {t.projectsPage.stemProjectP2}
                </p>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  {t.projectsPage.stemProjectP3Start}{" "}
                  <Link
                    href="/curriculums"
                    className="font-semibold text-foreground underline underline-offset-4"
                  >
                    {t.projectsPage.stemProjectCurriculumLink}
                  </Link>{" "}
                  {t.projectsPage.stemProjectOr}{" "}
                  <Link
                    href="/workshops"
                    className="font-semibold text-foreground underline underline-offset-4"
                  >
                    {t.projectsPage.stemProjectWorkshopLink}
                  </Link>
                  {language === "zh"
                    ? t.projectsPage.stemProjectP3End
                    : ` ${t.projectsPage.stemProjectP3End}`}
                </p>
                <button
                  type="button"
                  aria-expanded={isStemProjectOpen}
                  aria-controls="stem-project-details"
                  onClick={() => setIsStemProjectOpen(false)}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground underline underline-offset-4 outline-none transition-colors hover:text-avanza-green-dark focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t.projectsPage.stemProjectShowLess}
                  <ChevronDown className="h-4 w-4 rotate-180 transition-transform duration-300" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
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

      <section className="bg-background py-14">
        <FadeIn className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-xl font-bold text-foreground">{t.projectsPage.safetyFirst}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
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
