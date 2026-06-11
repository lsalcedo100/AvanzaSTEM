"use client"

import { useState } from "react"
import { ArrowRight, RotateCcw } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"

type PathId = "code" | "build" | "science"

type Path = {
  id: PathId
  label: string
  hint: string
  accent: string
  result: string
  targetHref: string
  seeGroupLabel: string
  seeGroupHref: string
}

export function StartHere() {
  const { t } = useLanguage()
  const [picked, setPicked] = useState<PathId | null>(null)

  const paths: Path[] = [
    {
      id: "code",
      label: t.gamesPage.startHereCodeLabel,
      hint: t.gamesPage.startHereCodeHint,
      accent: "border-avanza-purple",
      result: t.gamesPage.startHereResultCode,
      targetHref: "#python",
      seeGroupLabel: t.gamesPage.startHereSeeCode,
      seeGroupHref: "#group-code",
    },
    {
      id: "build",
      label: t.gamesPage.startHereBuildLabel,
      hint: t.gamesPage.startHereBuildHint,
      accent: "border-avanza-orange",
      result: t.gamesPage.startHereResultBuild,
      targetHref: "#bridge",
      seeGroupLabel: t.gamesPage.startHereSeeBuild,
      seeGroupHref: "#group-build",
    },
    {
      id: "science",
      label: t.gamesPage.startHereScienceLabel,
      hint: t.gamesPage.startHereScienceHint,
      accent: "border-avanza-teal",
      result: t.gamesPage.startHereResultScience,
      targetHref: "#atom",
      seeGroupLabel: t.gamesPage.startHereSeeScience,
      seeGroupHref: "#group-science",
    },
  ]

  const pickedPath = paths.find((p) => p.id === picked) ?? null

  return (
    <section className="bg-[#fcfaf3] py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
            {t.gamesPage.startHereTitle}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {t.gamesPage.startHereDesc}
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {paths.map((path, i) => {
            const isPicked = picked === path.id
            return (
              <FadeIn key={path.id} delay={i * 70}>
                <button
                  type="button"
                  onClick={() => setPicked(path.id)}
                  aria-pressed={isPicked}
                  className={[
                    "block w-full rounded-2xl border-l-4 bg-white p-5 text-left shadow-sm ring-1 ring-avanza-dark/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                    path.accent,
                    isPicked ? "ring-2 ring-avanza-dark/20" : "",
                  ].join(" ")}
                >
                  <p className="font-extrabold text-foreground">{path.label}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {path.hint}
                  </p>
                </button>
              </FadeIn>
            )
          })}
        </div>

        {pickedPath && (
          <FadeIn key={pickedPath.id} className="mt-8">
            <div className="rounded-2xl bg-white p-6 text-center ring-1 ring-avanza-dark/5 md:p-8">
              <p className="text-base font-bold text-foreground md:text-lg">
                {pickedPath.result}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={pickedPath.targetHref}
                  className="inline-flex items-center gap-2 rounded-full bg-avanza-dark px-6 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all duration-200 hover:scale-[1.03] hover:bg-foreground"
                >
                  {t.gamesPage.startHereGo}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={pickedPath.seeGroupHref}
                  className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  {pickedPath.seeGroupLabel}
                </a>
              </div>
              <button
                type="button"
                onClick={() => setPicked(null)}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {t.gamesPage.startHereReset}
              </button>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  )
}
