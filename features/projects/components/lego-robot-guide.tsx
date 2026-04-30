"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { getProjectGuide, type ProjectGuide } from "@/features/projects/data"

const RESOURCE_LINKS = [
  {
    label: "Official LEGO Education lesson — Super Cleanup",
    href: "https://education.lego.com/en-us/lessons/prime-invention-squad/super-cleanup/",
  },
  {
    label: "Build Book 1 (PDF)",
    href: "https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt56a81c75560c9a81/5f8802cbf71916144453a493/supercleaup-bi-pdf-book1of3.pdf?locale=en-us",
  },
  {
    label: "Build Book 2 (PDF)",
    href: "https://assets.education.lego.com/v3/assets/blt293eea581807678a/bltb5e585f94cb4e72b/5f8802e5a302dc0d859a734d/supercleaup-bi-pdf-book2of3.pdf?locale=en-us",
  },
  {
    label: "Python lesson — Clean Up with Multiple Functions",
    href: "https://education.lego.com/en-us/lessons/spike-python-u7-impacting-the-environment-with-functions/spike-python-u7l2-clean-up-with-multiple-functions/",
  },
]

const ENGINEERING_NOTES = [
  {
    title: "Why a wide base matters",
    body: "When the grabber reaches forward, the robot's weight shifts forward too. A low, wide base keeps the center of gravity above the wheels so the robot doesn't tip over. Think of it like leaning forward with a heavy backpack — your feet need to be wide apart to stay balanced.",
  },
  {
    title: "How the motor becomes a grabber",
    body: "The motor spins in a circle, but the beams and pins redirect that circular motion into a claw that opens and closes. This is the same idea engineers use in cranes, factory grippers, and doors.",
  },
  {
    title: "Why functions make the code easier to fix",
    body: "Instead of one giant script, the official Python lesson splits the mission into small jobs: grab(), drive(), release(). If the robot grabs badly, you only need to fix that one function instead of rewriting everything.",
  },
]

export function LegoRobotGuide({ project }: { project: ProjectGuide }) {
  const { language, t } = useLanguage()
  const guide = getProjectGuide(project.slug, language) ?? project

  return (
    <div className="bg-background">
      {/* Header */}
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
            {guide.category}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground">
            {guide.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{guide.description}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            {guide.difficulty} · {guide.time} ·{" "}
            {language === "es"
              ? "Set SPIKE Prime #45678"
              : language === "zh"
                ? "SPIKE Prime 套装 #45678"
                : "SPIKE Prime Set #45678"}
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

        {/* Official sources note */}
        <div className="mt-6 rounded-md border border-border bg-secondary/40 px-5 py-4">
          <p className="text-sm text-foreground">
            <span className="font-semibold">
              {language === "es"
                ? "Esta guía está basada en la lección oficial de LEGO Education."
                : language === "zh"
                  ? "本指南基于乐高教育的官方课程。"
                  : "This guide is built around the official LEGO Education Super Cleanup lesson."}
            </span>{" "}
            {language === "es"
              ? "Los libros de construcción contienen el orden exacto de ensamblaje."
              : language === "zh"
                ? "官方搭建手册包含精确的组装步骤。"
                : "The build books below contain the exact snapping order — use them alongside these steps."}
          </p>
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
                  {t.projectsPage.stepByStepInstructions}
                </h2>
                <ol className="mt-5 space-y-5">
                  {guide.steps.map((step, index) => (
                    <li key={step} className="flex items-start gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-sm font-bold text-foreground">
                        {index + 1}
                      </span>
                      <p className="pt-0.5 text-base leading-7 text-foreground">{step}</p>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Engineering notes */}
              <section>
                <h2 className="text-xl font-bold text-foreground">
                  {language === "es"
                    ? "Por qué funciona"
                    : language === "zh"
                      ? "为什么这样设计"
                      : "How it works"}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {language === "es"
                    ? "Tres conceptos de ingeniería que explican cada parte del robot."
                    : language === "zh"
                      ? "三个工程概念，解释机器人每个部件的设计原因。"
                      : "Three engineering ideas behind why the robot is built the way it is."}
                </p>
                <dl className="mt-5 space-y-6">
                  {ENGINEERING_NOTES.map((note) => (
                    <div key={note.title} className="border-t border-border pt-5">
                      <dt className="font-semibold text-foreground">{note.title}</dt>
                      <dd className="mt-2 text-sm leading-6 text-muted-foreground">{note.body}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-10">
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
                  {t.projectsPage.materialsList}
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
                  {language === "es" ? "Fuentes oficiales" : language === "zh" ? "官方资源" : "Official sources"}
                </h2>
                <ul className="mt-4 space-y-3">
                  {RESOURCE_LINKS.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-start gap-1.5 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                      >
                        <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="border-t border-border pt-8">
                <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
                  {t.projectsPage.safetyFirst}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.safety}</p>
              </section>

              <section className="border-t border-border pt-8">
                <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
                  {t.projectsPage.challengeMode}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.challenge}</p>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
