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

  const introLinks = [
    { href: "/projects/popsicle-stick-bridge", label: "popsicle stick truss bridge" },
    { href: "/projects/simple-circuit-light", label: "simple circuits" },
    { href: "/projects/my-first-python-program", label: "first Python quiz game" },
    { href: "/projects/baking-soda-volcano", label: "baking soda volcano" },
    { href: "/projects/lemon-powered-batteries", label: "lemon battery" },
    { href: "/projects/balloon-powered-car", label: "balloon powered car" },
  ]

  const learningPaths = [
    {
      title: "Engineering projects for kids",
      copy:
        "Build structures and machines, then test how design choices change strength, distance, or stability.",
      href: "/projects/popsicle-stick-bridge",
      link: "Warren truss bridge",
    },
    {
      title: "Coding projects",
      copy:
        "Write beginner-friendly programs with visible outcomes, including a quiz students can run and customize right away.",
      href: "/projects/my-first-python-program",
      link: "Python quiz game for kids",
    },
    {
      title: "Robotics projects for kids",
      copy:
        "Snap together a LEGO build, then write the pseudocode that tells it what to do step by step.",
      href: "/projects/lego-robot-builder",
      link: "LEGO robot builder",
    },
    {
      title: "Science fair projects",
      copy:
        "Turn exciting demos into real investigations with variables, data tables, hypotheses, and comparison trials.",
      href: "/projects/coke-mentos-experiment",
      link: "mentos and soda science project",
    },
  ]

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
          <div className="mt-6 flex max-w-3xl flex-wrap gap-2">
            {introLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-avanza-green hover:text-avanza-green-dark"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </FadeIn>
      </section>

      {language === "en" && (
        <section className="border-b border-border bg-background py-14">
          <FadeIn className="mx-auto max-w-4xl px-6">
            <h2 className="text-2xl font-bold text-foreground">What Is a STEM Project?</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              A STEM project is a hands-on activity where kids design, build, test, or
              investigate something themselves, instead of just reading about how it works.
              Science, technology, engineering, and math show up together: a bridge build
              uses engineering and math, a quiz game uses coding and logic, and a kitchen
              experiment uses the scientific method from start to finish.
            </p>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              The best beginner STEM projects give kids a clear goal - build a bridge that
              holds weight, write a program that asks questions, grow crystals overnight -
              and then let them test their first attempt, see what happens, and improve it.
            </p>
            <h3 className="mt-8 text-lg font-bold text-foreground">
              Popular STEM project examples
            </h3>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Try a{" "}
              <Link
                href="/projects/popsicle-stick-bridge"
                className="font-semibold text-foreground underline underline-offset-4"
              >
                popsicle stick truss bridge
              </Link>{" "}
              for an engineering challenge, build the{" "}
              <Link
                href="/projects/lego-robot-builder"
                className="font-semibold text-foreground underline underline-offset-4"
              >
                LEGO robot builder
              </Link>{" "}
              for robotics, write your{" "}
              <Link
                href="/projects/my-first-python-program"
                className="font-semibold text-foreground underline underline-offset-4"
              >
                first Python program
              </Link>{" "}
              for coding, or run the{" "}
              <Link
                href="/projects/baking-soda-volcano"
                className="font-semibold text-foreground underline underline-offset-4"
              >
                baking soda volcano
              </Link>{" "}
              experiment for a science fair-style investigation.
            </p>
            <h3 className="mt-8 text-lg font-bold text-foreground">
              How to choose a STEM project
            </h3>
            <ul className="mt-3 space-y-2">
              {[
                "Pick a category you're curious about - engineering, coding, robotics, or a science experiment - using the filters below.",
                "Check how much time you have. Most projects on this site list a difficulty level and an estimated time so you can plan a single session or a multi-day build.",
                "Look at the materials list first. Several projects use things you likely already have at home, like cardboard, tape, or baking soda.",
                "If you want a guided sequence instead of picking one at a time, follow one of our free curriculum paths.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                  <p className="text-base leading-7 text-muted-foreground">{item}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Want a structured plan instead?{" "}
              <Link
                href="/curriculums"
                className="font-semibold text-foreground underline underline-offset-4"
              >
                Browse our free curriculum paths
              </Link>{" "}
              or{" "}
              <Link
                href="/workshops"
                className="font-semibold text-foreground underline underline-offset-4"
              >
                find an in-person STEM workshop
              </Link>{" "}
              near you.
            </p>
          </FadeIn>
        </section>
      )}

      <section className="border-b border-border bg-secondary/40 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-2 lg:grid-cols-4">
          {learningPaths.map((path, i) => (
            <FadeIn key={path.title} delay={i * 60}>
              <article className="h-full rounded-md border border-border bg-background p-5">
                <h2 className="text-base font-bold text-foreground">{path.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{path.copy}</p>
                <Link
                  href={path.href}
                  className="mt-4 inline-flex text-sm font-semibold text-avanza-green-dark underline underline-offset-4"
                >
                  {path.link}
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
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
