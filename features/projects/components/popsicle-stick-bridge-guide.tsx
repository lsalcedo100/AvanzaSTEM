"use client"

import { useState } from "react"
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

const TRUSS_COMPARISON = [
  {
    name: "Warren truss",
    description:
      "Uses repeating triangles with diagonals that alternate direction. It is usually the best popsicle stick bridge design for beginners because the pattern is simple to copy and spreads the load evenly.",
  },
  {
    name: "Pratt truss",
    description:
      "Uses vertical members plus diagonals that mostly lean toward the center. It can be very strong, but it takes more careful spacing and joint alignment for a first build.",
  },
]

const TROUBLESHOOTING = [
  {
    problem: "The bridge twists during the load test",
    fix: "Check that the two side trusses are the same height and add top lateral bracing between them.",
  },
  {
    problem: "A joint pops apart before the sticks break",
    fix: "Use less glue, press the joint flat, and let it cure fully before testing. Thick blobs of glue can peel away.",
  },
  {
    problem: "The middle sags too much",
    fix: "Add a better deck connection so the weight is shared by both side trusses instead of one weak point.",
  },
  {
    problem: "One side fails first",
    fix: "Build the second side by tracing the first side as a template so the triangle panels match.",
  },
]

const FAQS = [
  {
    question: "What is the strongest popsicle stick bridge design for beginners?",
    answer:
      "A Warren truss bridge is a strong beginner choice because repeating triangles spread the load clearly and are easier to measure than curved or highly angled designs.",
  },
  {
    question: "How do you make a truss bridge out of popsicle sticks?",
    answer:
      "Build two matching side trusses first, connect them with cross pieces, add diagonal bracing, let every glue joint cure fully, then run a slow center load test.",
  },
  {
    question: "Why does a triangle truss make the bridge stronger?",
    answer:
      "Triangles resist changing shape. That helps the bridge move force through the sticks instead of letting the frame lean into a weak diamond shape.",
  },
  {
    question: "How can this become a science fair or classroom project?",
    answer:
      "Keep the span, materials, and testing method the same, then compare one design change at a time, such as fewer sticks, extra bracing, or a different truss pattern.",
  },
]

export function PopsicleStickBridgeGuide({ project }: { project: ProjectGuide }) {
  const { language, t } = useLanguage()
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
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
          <div
            className="relative overflow-hidden rounded-lg border border-border bg-avanza-dark"
            style={{ paddingBottom: "56.25%" }}
          >
            {isVideoLoaded ? (
              <iframe
                src={`${VIDEO_EMBED}&autoplay=1`}
                title={t.projectsPage.bridgeVideoTitle}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsVideoLoaded(true)}
                className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_center,rgba(46,204,113,0.25),transparent_58%)] px-6 text-center text-primary-foreground transition-colors hover:bg-avanza-dark/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={`Load video: ${t.projectsPage.bridgeVideoTitle}`}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-avanza-green text-avanza-dark shadow-lg">
                  <PlayCircle className="h-8 w-8" />
                </span>
                <span className="max-w-md text-base font-bold">
                  Load the build-along video only when you are ready to watch.
                </span>
                <span className="text-xs text-primary-foreground/75">
                  This avoids loading YouTube during the initial page render.
                </span>
              </button>
            )}
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

              {language === "en" && (
                <section>
                  <h2 className="text-xl font-bold text-foreground">
                    Warren Truss vs. Pratt Truss
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Both designs use triangles, but the pattern changes how forces move through the
                    sticks. For this guide, a Warren-style truss is the most beginner-friendly choice.
                  </p>
                  <dl className="mt-5 space-y-5">
                    {TRUSS_COMPARISON.map((truss) => (
                      <div key={truss.name} className="border-t border-border pt-5">
                        <dt className="font-semibold text-foreground">{truss.name}</dt>
                        <dd className="mt-1 text-sm leading-6 text-muted-foreground">
                          {truss.description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {language === "en" && (
                <section>
                  <h2 className="text-xl font-bold text-foreground">
                    Why Triangles Make Bridges Stronger
                  </h2>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    A square can lean into a diamond shape when it is pushed from the side. A triangle
                    cannot change shape unless one stick bends, snaps, or a joint fails. That is why a
                    popsicle stick triangle bridge can hold more weight than a flat ladder-style frame.
                  </p>
                </section>
              )}

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
                {language === "en" && (
                  <figure className="mb-8 overflow-hidden rounded-lg border border-border bg-white">
                    <div className="relative h-72">
                      <Image
                        src="/images/projects/popsicle-stick-bridge/diagram.png"
                        alt="Labeled popsicle stick truss bridge diagram showing triangle panels and force paths"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <figcaption className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                      Diagram of a popsicle stick truss bridge: repeating triangles help move the
                      load from the deck into the side trusses and down to the supports.
                    </figcaption>
                  </figure>
                )}
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

              {language === "en" && (
                <section>
                  <h2 className="text-xl font-bold text-foreground">
                    Best Popsicle Stick Bridge Design for Beginners
                  </h2>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    Start with two identical side trusses, four main triangle panels, top and bottom
                    chords, and cross pieces that keep the sides square. This design is easier to
                    measure than an arch, uses fewer weird angles than many advanced trusses, and
                    makes it obvious where the bridge fails during a load test.
                  </p>
                </section>
              )}

              {language === "en" && (
                <section>
                  <h2 className="text-xl font-bold text-foreground">
                    How Much Weight Can a Popsicle Stick Bridge Hold?
                  </h2>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    A careful student bridge can often hold many times its own weight, but the exact
                    number depends on stick quality, glue joints, curing time, span length, and how
                    the weight is placed. Record both the bridge weight and the maximum load so you
                    can compare strength-to-weight ratio instead of only chasing the biggest number.
                  </p>
                </section>
              )}

              {language === "en" && (
                <section>
                  <h2 className="text-xl font-bold text-foreground">
                    Common Mistakes and Troubleshooting
                  </h2>
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left">
                          <th className="pb-3 font-semibold text-foreground">Problem</th>
                          <th className="pb-3 font-semibold text-foreground">Fix</th>
                        </tr>
                      </thead>
                      <tbody>
                        {TROUBLESHOOTING.map((row) => (
                          <tr key={row.problem} className="border-b border-border">
                            <td className="py-3 pr-6 text-muted-foreground">{row.problem}</td>
                            <td className="py-3 text-foreground">{row.fix}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {language === "en" && (
                <section>
                  <h2 className="text-xl font-bold text-foreground">
                    How to Load Test Your Bridge Safely
                  </h2>
                  <ol className="mt-5 space-y-5">
                    {[
                      "Place the bridge between two sturdy supports with the same span every time.",
                      "Put a flat testing platform or cup at the center of the deck so weight is added in one controlled spot.",
                      "Add weight slowly in small amounts, then pause and watch for twisting, sagging, or joint movement.",
                      "Keep hands, feet, and faces away from the bridge while it is loaded.",
                      "Stop the test when the bridge cracks, twists sharply, or can no longer hold the next small weight safely.",
                    ].map((step, index) => (
                      <li key={step} className="flex items-start gap-4">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-sm font-bold text-foreground">
                          {index + 1}
                        </span>
                        <p className="pt-0.5 text-base leading-7 text-foreground">{step}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {language === "en" && (
                <section>
                  <h2 className="text-xl font-bold text-foreground">
                    Popsicle Stick Bridge FAQ
                  </h2>
                  <dl className="mt-5 space-y-5">
                    {FAQS.map((faq) => (
                      <div key={faq.question} className="border-t border-border pt-5">
                        <dt className="font-semibold text-foreground">{faq.question}</dt>
                        <dd className="mt-1 text-sm leading-6 text-muted-foreground">
                          {faq.answer}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {language === "en" && (
                <section>
                  <h2 className="text-xl font-bold text-foreground">
                    Related Engineering Projects for Kids
                  </h2>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    After the Warren truss bridge load test, try a{" "}
                    <Link
                      href="/projects/rubber-band-powered-car"
                      className="font-semibold text-foreground underline underline-offset-4"
                    >
                      rubber band-powered car
                    </Link>{" "}
                    to compare stored energy and motion, or build a{" "}
                    <Link
                      href="/projects/simple-circuit-light"
                      className="font-semibold text-foreground underline underline-offset-4"
                    >
                      simple circuit light
                    </Link>{" "}
                    for another classroom-friendly engineering challenge.
                  </p>
                </section>
              )}
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
