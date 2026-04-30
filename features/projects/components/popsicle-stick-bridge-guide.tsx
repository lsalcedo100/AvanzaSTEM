"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight, PlayCircle } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { getProjectGuide, type ProjectGuide } from "@/features/projects/data"

const VIDEO_EMBED = "https://www.youtube-nocookie.com/embed/V2duNLaNyDE?rel=0"
const VIDEO_TITLE = "Popsicle Stick Bridge Build Video"

const RESOURCE_LINKS = [
  {
    label: "WikiHow bridge guide",
    href: "https://www.wikihow.com/Build-a-Bridge-with-Popsicle-Sticks",
    icon: ArrowUpRight,
  },
  {
    label: "Make: Warren truss article",
    href: "https://makezine.com/projects/make-warren-truss-bridge-popsicle-sticks/",
    icon: ArrowUpRight,
  },
  {
    label: "YouTube build video",
    href: "https://www.youtube.com/watch?v=V2duNLaNyDE",
    icon: PlayCircle,
  },
]

const ANATOMY_TERMS = [
  {
    term: "Top Chord",
    definition:
      "The long top beam of each truss. It usually feels compression when the bridge is loaded — meaning it gets squeezed.",
  },
  {
    term: "Bottom Chord",
    definition:
      "The long bottom beam. It typically handles tension — meaning it gets pulled apart when weight presses down.",
  },
  {
    term: "Web Members",
    definition:
      "The diagonal and vertical sticks inside the truss. They transfer force between the two chords and keep the triangles from collapsing.",
  },
  {
    term: "Deck",
    definition:
      "The road surface of the bridge. When you add weight, the deck is what receives it first and spreads it into the trusses.",
  },
  {
    term: "Top Lateral Bracing",
    definition:
      "The sticks across the top that tie both side trusses together. Without them, the sides can lean inward like floppy picture frames.",
  },
]

const BUILD_STEPS = [
  {
    title: "Mark 16 sticks and cut splice pieces",
    detail:
      "Mark about 16 popsicle sticks at the quarter points. Then cut 4 of them in half so you have short pieces ready for overlapping the long rail joints.",
  },
  {
    title: "Glue two long rails",
    detail:
      "Line up the quarter marks and splice whole sticks together into 2 long rails, each about 4 stick lengths (roughly 18 inches). These become the top and bottom chords.",
  },
  {
    title: "Build the first side with 4 triangle panels",
    detail:
      "Lay one rail flat and glue 4 upright triangles onto it in a row. Keep spacing even — this first side is the template for the whole bridge.",
  },
  {
    title: "Add 3 staggered triangles between them",
    detail:
      "Fill the gaps with 3 more triangles so the side becomes a staggered crisscross truss instead of just a row of separate shapes.",
  },
  {
    title: "Cap the truss and sandwich it",
    detail:
      "Flip the side, glue on the top rail to connect the triangle tips, then add another layer of sticks over the faces to make the truss stiffer.",
  },
  {
    title: "Repeat to build the second side",
    detail:
      "Build a matching second truss the same way. Both sides must be identical or the deck will twist during the load test.",
  },
  {
    title: "Let sides harden, then connect them squarely",
    detail:
      "Wait about 15 minutes. Stand both trusses upright, glue cross pieces between them keeping the sides perpendicular, and leave small overhangs where the video shows.",
  },
  {
    title: "Add top, bottom, and diagonal braces",
    detail:
      "Glue the remaining cross pieces so both top and bottom connectors tie into the side trusses. Add diagonal supports inside and along the outer faces.",
  },
  {
    title: "Reinforce, cure again, and load test carefully",
    detail:
      "Reinforce any weak joints, let the full bridge harden again, then test slowly between two supports — add weight a little at a time.",
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
            Build along with this video guide:
          </p>
          <div className="relative overflow-hidden rounded-lg border border-border" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={VIDEO_EMBED}
              title={VIDEO_TITLE}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{VIDEO_TITLE}</p>
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
                  {language === "es"
                    ? "Pasos de construcción"
                    : language === "zh"
                      ? "搭建步骤"
                      : "Build steps"}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {language === "es"
                    ? "Sigue el video mientras completas cada paso."
                    : language === "zh"
                      ? "跟着视频完成每一步。"
                      : "Follow along with the video as you complete each step."}
                </p>
                <ol className="mt-5 space-y-6">
                  {BUILD_STEPS.map((step, index) => (
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
                  {language === "es"
                    ? "Partes del puente"
                    : language === "zh"
                      ? "桥梁结构"
                      : "Parts of a truss bridge"}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {language === "es"
                    ? "Aprende los nombres de cada parte para entender las fuerzas que actúan en tu puente."
                    : language === "zh"
                      ? "了解每个部件的名称，有助于理解桥梁中的受力情况。"
                      : "Knowing the names helps you understand what forces are acting on each part of your bridge."}
                </p>
                <dl className="mt-5 space-y-5">
                  {ANATOMY_TERMS.map((term) => (
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
                  {language === "es" ? "Recursos" : language === "zh" ? "参考资料" : "Resources"}
                </h2>
                <ul className="mt-4 space-y-3">
                  {RESOURCE_LINKS.map((link) => {
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
                          {link.label}
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
                    OR
                  </p>
                  <a
                    href="https://www.youtube.com/watch?v=s3HZievz_3Y"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-start gap-1.5 text-sm leading-6 text-muted-foreground underline underline-offset-4 hover:text-foreground"
                  >
                    <PlayCircle className="mt-1 h-3.5 w-3.5 shrink-0" />
                    Build a stronger, slightly more complex version with this video.
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
