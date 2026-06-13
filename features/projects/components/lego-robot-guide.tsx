"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { getProjectGuide, type ProjectGuide } from "@/features/projects/data"
import { projectFaqs } from "@/features/projects/structured-data"
import { ProjectStepPhoto } from "@/features/projects/components/step-photo"

const RESOURCE_LINKS = [
  {
    href: "https://education.lego.com/en-us/lessons/prime-invention-squad/super-cleanup/",
  },
  {
    href: "https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt56a81c75560c9a81/5f8802cbf71916144453a493/supercleaup-bi-pdf-book1of3.pdf?locale=en-us",
  },
  {
    href: "https://assets.education.lego.com/v3/assets/blt293eea581807678a/bltb5e585f94cb4e72b/5f8802e5a302dc0d859a734d/supercleaup-bi-pdf-book2of3.pdf?locale=en-us",
  },
  {
    href: "https://education.lego.com/en-us/lessons/spike-python-u7-impacting-the-environment-with-functions/spike-python-u7l2-clean-up-with-multiple-functions/",
  },
]

const PSEUDOCODE = `def grab():
    close_claw_until_object_is_held()

def drive_to_drop_zone():
    drive_forward_for_seconds(2)
    turn_toward_drop_area()

def release():
    open_claw()
    back_up_safely()

grab()
drive_to_drop_zone()
release()`

const TROUBLESHOOTING = [
  {
    problem: "Robot tips forward",
    fix: "Move heavy parts lower, widen the base, or reduce how far the grabber reaches before lifting.",
  },
  {
    problem: "Claw does not grip",
    fix: "Check the motor cable, reduce friction in the jaw, and test smaller objects before heavier ones.",
  },
  {
    problem: "Robot drives crooked",
    fix: "Make sure both wheels are attached firmly and use the same speed value for the left and right motors.",
  },
  {
    problem: "Code runs in the wrong order",
    fix: "Split the mission into named functions such as grab, drive, and release, then test one function at a time.",
  },
]

export function LegoRobotGuide({ project }: { project: ProjectGuide }) {
  const { language, t } = useLanguage()
  const guide = getProjectGuide(project.slug, language) ?? project
  const faqs = projectFaqs[language]?.["lego-robot-builder"] ?? projectFaqs.en["lego-robot-builder"] ?? []

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
            {guide.difficulty} · {guide.time} · {t.projectsPage.legoSet}
          </p>
        </div>

        {/* Hero image */}
        <div className="mt-8 overflow-hidden rounded-lg border border-border">
          <div className="relative h-80">
            <Image
              src={guide.image}
              alt={guide.title}
              fill
              sizes="(min-width: 1024px) 896px, calc(100vw - 48px)"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Official sources note */}
        <div className="mt-6 rounded-md border border-border bg-secondary/40 px-5 py-4">
          <p className="text-sm text-foreground">
            <span className="font-semibold">
              {t.projectsPage.legoOfficialNote}
            </span>{" "}
            {t.projectsPage.legoBuildBooksNote}
          </p>
        </div>

        {/* LEGO trademark disclaimer */}
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          {t.projectsPage.legoTrademarkDisclaimer}
        </p>
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
                  {guide.steps.map((step, index) => {
                    const stepImage = guide.stepImages?.find((image) => image.step === index + 1)
                    return (
                      <li key={step} className="flex items-start gap-4">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-sm font-bold text-foreground">
                          {index + 1}
                        </span>
                        <div className="flex-1 space-y-3">
                          <p className="pt-0.5 text-base leading-7 text-foreground">{step}</p>
                          {stepImage ? <ProjectStepPhoto stepImage={stepImage} /> : null}
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </section>

              {language === "en" && (
                <section>
                  <h2 className="text-xl font-bold text-foreground">Setup checklist</h2>
                  <ul className="mt-5 space-y-3">
                    {[
                      "Charge the SPIKE Prime hub before class or testing time.",
                      "Update the SPIKE app or web app so the hub, motor, and sensor connect reliably.",
                      "Pair the hub, then test the motor by turning it slowly before attaching the claw.",
                      "Place three test objects nearby: one light, one round, and one awkwardly shaped.",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                        <p className="text-base leading-7 text-muted-foreground">{item}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Engineering notes */}
              <section>
                <h2 className="text-xl font-bold text-foreground">
                  {t.projectsPage.legoHowWorksTitle}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t.projectsPage.legoHowWorksDesc}
                </p>
                <dl className="mt-5 space-y-6">
                  {t.projectsPage.legoEngineeringNotes.map((note) => (
                    <div key={note.title} className="border-t border-border pt-5">
                      <dt className="font-semibold text-foreground">{note.title}</dt>
                      <dd className="mt-2 text-sm leading-6 text-muted-foreground">{note.body}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              {language === "en" && (
                <section>
                  <h2 className="text-xl font-bold text-foreground">Code plan or pseudocode</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    The exact blocks or Python commands depend on your SPIKE setup, but the robot
                    should follow this logic: grab, drive, release, then reset for another test.
                  </p>
                  <pre className="mt-4 overflow-x-auto rounded-md border border-border bg-secondary/40 px-5 py-4 font-mono text-sm leading-7 text-foreground">
                    {PSEUDOCODE}
                  </pre>
                </section>
              )}

              {language === "en" && (
                <section>
                  <h2 className="text-xl font-bold text-foreground">Troubleshooting</h2>
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

              {faqs.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-foreground">{t.faqPage.title}</h2>
                  <dl className="mt-5 space-y-5">
                    {faqs.map((faq) => (
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
                    Related Projects for Kids
                  </h2>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    Once the robot can grab, drive, and release on command, try writing your{" "}
                    <Link
                      href="/projects/my-first-python-program"
                      className="font-semibold text-foreground underline underline-offset-4"
                    >
                      first Python program
                    </Link>{" "}
                    to practice the same step-by-step thinking with text instead of blocks, or
                    follow the full{" "}
                    <Link
                      href="/curriculums"
                      className="font-semibold text-foreground underline underline-offset-4"
                    >
                      robotics curriculum path
                    </Link>{" "}
                    for what to build next.
                  </p>
                </section>
              )}
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
                  {t.projectsPage.officialSources}
                </h2>
                <ul className="mt-4 space-y-3">
                  {RESOURCE_LINKS.map((link, index) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-start gap-1.5 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                      >
                        <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        {t.projectsPage.legoResourceLabels[index]}
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
