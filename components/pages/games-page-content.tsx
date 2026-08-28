"use client"

import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { PythonPlayground } from "@/components/ui/python-playground"
import { BridgeLoadDemo } from "@/components/ui/bridge-load-demo"
import { JengaTower } from "@/components/ui/jenga-tower"
import { AtomBuilder } from "@/components/ui/atom-builder"
import { CodePathRobot } from "@/components/ui/code-path-robot"
import { CircuitBuilder } from "@/components/ui/circuit-builder"
import { CatapultLab } from "@/components/ui/catapult-lab"
import { GravitySandbox } from "@/components/ui/gravity-sandbox"
import { BooleanLogicGame } from "@/components/ui/logic-game"
import { DensityTower } from "@/components/ui/density-tower"
import { SortingRace } from "@/components/ui/sorting-race"
import { MarbleRun } from "@/components/ui/marble-run"
import { LAB_GROUPS } from "@/features/games/labs"

type Activity = {
  id: string
  name: string
  tagline: string
}

type Group = {
  id: string
  name: string
  activities: Activity[]
}

export function GamesPageContent() {
  const { t } = useLanguage()

  // Built from the shared LAB_GROUPS data so /games and the /resources hub can
  // never disagree about which labs exist. Every lab's strings follow the
  // `<id>Name` / `<id>Tagline` convention in the dictionary.
  const GROUP_NAME: Record<(typeof LAB_GROUPS)[number]["id"], string> = {
    "group-code": t.gamesPage.groupCodeName,
    "group-build": t.gamesPage.groupBuildName,
    "group-science": t.gamesPage.groupScienceName,
  }

  const groups: Group[] = LAB_GROUPS.map((group) => ({
    id: group.id,
    name: GROUP_NAME[group.id],
    activities: group.labs.map((id) => ({
      id,
      name: t.gamesPage[`${id}Name`],
      tagline: t.gamesPage[`${id}Tagline`],
    })),
  }))

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-avanza-purple via-[#7c3aed] to-avanza-teal py-20 md:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 14% 18%, rgba(255,255,255,0.55) 0 5px, transparent 6px), radial-gradient(circle at 84% 26%, rgba(255,255,255,0.45) 0 4px, transparent 5px), radial-gradient(circle at 22% 78%, rgba(255,255,255,0.4) 0 4px, transparent 5px), radial-gradient(circle at 76% 84%, rgba(255,255,255,0.5) 0 5px, transparent 6px)",
          }}
        />
        <div className="relative mx-auto w-full max-w-5xl px-6 text-center">
          <FadeIn>
            <p className="text-sm font-bold uppercase tracking-wider text-primary-foreground/80">
              {t.gamesPage.eyebrow}
            </p>
            <h1 className="mt-4 text-balance text-5xl font-extrabold leading-[1.04] text-primary-foreground italic md:text-7xl">
              {t.gamesPage.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
              {t.gamesPage.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* WHAT'S HERE: grouped table of contents */}
      <section className="bg-white py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-2xl font-extrabold leading-tight text-foreground md:text-3xl">
              {t.gamesPage.tocTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
              {t.gamesPage.tocDesc}
            </p>
          </FadeIn>
          <div className="mt-8 grid gap-7 lg:grid-cols-3 lg:gap-8">
            {groups.map((group, i) => (
              <FadeIn key={group.id} delay={i * 80}>
                <div
                  className={`h-1 w-10 rounded-full ${
                    group.id === "group-code"
                      ? "bg-avanza-purple"
                      : group.id === "group-build"
                        ? "bg-avanza-orange"
                        : "bg-avanza-teal"
                  }`}
                />
                <h3 className="mt-3 text-xl font-extrabold leading-tight text-foreground md:text-2xl">
                  {group.name}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.activities.map((activity) => (
                    <li key={activity.id}>
                      <a href={`#${activity.id}`} className="group block">
                        <span className="text-sm font-bold text-foreground transition-colors group-hover:text-avanza-purple md:text-base">
                          {activity.name}
                        </span>
                        <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">
                          {activity.tagline}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CODE & LOGIC */}
      <GroupIntro
        id="group-code"
        accent="bg-avanza-purple"
        name={t.gamesPage.groupCodeName}
      />
      <div id="python" style={{ scrollMarginTop: 96 }}>
        <PythonPlayground />
      </div>
      <div id="robot" style={{ scrollMarginTop: 96 }}>
        <CodePathRobot />
      </div>
      <div id="logic" style={{ scrollMarginTop: 96 }}>
        <BooleanLogicGame />
      </div>
      <div id="sort" style={{ scrollMarginTop: 96 }}>
        <SortingRace />
      </div>

      {/* BUILD & TEST */}
      <GroupIntro
        id="group-build"
        accent="bg-avanza-orange"
        name={t.gamesPage.groupBuildName}
      />
      <div id="bridge" style={{ scrollMarginTop: 96 }}>
        <BridgeLoadDemo />
      </div>
      <div id="tower" style={{ scrollMarginTop: 96 }}>
        <JengaTower />
      </div>
      <div id="catapult" style={{ scrollMarginTop: 96 }}>
        <CatapultLab />
      </div>
      <div id="marble" style={{ scrollMarginTop: 96 }}>
        <MarbleRun />
      </div>

      {/* SCIENCE LAB */}
      <GroupIntro
        id="group-science"
        accent="bg-avanza-teal"
        name={t.gamesPage.groupScienceName}
      />
      <div id="atom" style={{ scrollMarginTop: 96 }}>
        <AtomBuilder />
      </div>
      <div id="circuit" style={{ scrollMarginTop: 96 }}>
        <CircuitBuilder />
      </div>
      <div id="density" style={{ scrollMarginTop: 96 }}>
        <DensityTower />
      </div>
      <div id="gravity" style={{ scrollMarginTop: 96 }}>
        <GravitySandbox />
      </div>

      {/* CLOSING CTA */}
      <section className="bg-avanza-dark py-16 md:py-20">
        <FadeIn className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground md:text-4xl">
            More games coming soon.
          </h2>
          <p className="mt-4 text-base text-primary-foreground/70">
            Have an idea for a STEM game we should build? Tell us, we love new ideas.
          </p>
          <a
            href="mailto:liam@avanzastem.org?subject=Game%20idea"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-avanza-green px-7 py-3.5 text-base font-extrabold text-avanza-dark shadow-lg transition-all duration-300 hover:scale-[1.04]"
          >
            Share an idea
            <ArrowRight className="h-4 w-4" />
          </a>
        </FadeIn>
      </section>
    </>
  )
}

function GroupIntro({
  id,
  accent,
  name,
}: {
  id: string
  accent: string
  name: string
}) {
  return (
    <div id={id} style={{ scrollMarginTop: 96 }} className="bg-[#fcfaf3] py-8 md:py-10">
      <FadeIn className="mx-auto max-w-3xl px-6 text-center">
        <div className={`mx-auto h-1.5 w-14 rounded-full ${accent}`} />
        <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
          {name}
        </h2>
      </FadeIn>
    </div>
  )
}
