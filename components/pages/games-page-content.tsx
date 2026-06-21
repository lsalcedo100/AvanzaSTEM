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

type Activity = {
  id: string
  name: string
  tagline: string
}

type Group = {
  id: string
  name: string
  description: string
  activities: Activity[]
}

export function GamesPageContent() {
  const { t } = useLanguage()

  const groups: Group[] = [
    {
      id: "group-code",
      name: t.gamesPage.groupCodeName,
      description: t.gamesPage.groupCodeDesc,
      activities: [
        { id: "python", name: t.gamesPage.pythonName, tagline: t.gamesPage.pythonTagline },
        { id: "robot", name: t.gamesPage.robotName, tagline: t.gamesPage.robotTagline },
        { id: "logic", name: t.gamesPage.logicName, tagline: t.gamesPage.logicTagline },
        { id: "sort", name: t.gamesPage.sortName, tagline: t.gamesPage.sortTagline },
      ],
    },
    {
      id: "group-build",
      name: t.gamesPage.groupBuildName,
      description: t.gamesPage.groupBuildDesc,
      activities: [
        { id: "bridge", name: t.gamesPage.bridgeName, tagline: t.gamesPage.bridgeTagline },
        { id: "tower", name: t.gamesPage.towerName, tagline: t.gamesPage.towerTagline },
        { id: "catapult", name: t.gamesPage.catapultName, tagline: t.gamesPage.catapultTagline },
        { id: "marble", name: t.gamesPage.marbleName, tagline: t.gamesPage.marbleTagline },
      ],
    },
    {
      id: "group-science",
      name: t.gamesPage.groupScienceName,
      description: t.gamesPage.groupScienceDesc,
      activities: [
        { id: "atom", name: t.gamesPage.atomName, tagline: t.gamesPage.atomTagline },
        { id: "circuit", name: t.gamesPage.circuitName, tagline: t.gamesPage.circuitTagline },
        { id: "density", name: t.gamesPage.densityName, tagline: t.gamesPage.densityTagline },
        { id: "gravity", name: t.gamesPage.gravityName, tagline: t.gamesPage.gravityTagline },
      ],
    },
  ]

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
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
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
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
              {t.gamesPage.tocTitle}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {t.gamesPage.tocDesc}
            </p>
          </FadeIn>
          <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-8">
            {groups.map((group, i) => (
              <FadeIn key={group.id} delay={i * 80}>
                <div
                  className={`h-1.5 w-12 rounded-full ${
                    group.id === "group-code"
                      ? "bg-avanza-purple"
                      : group.id === "group-build"
                        ? "bg-avanza-orange"
                        : "bg-avanza-teal"
                  }`}
                />
                <h3 className="mt-4 text-2xl font-extrabold leading-tight text-foreground md:text-3xl">
                  {group.name}
                </h3>
                <ul className="mt-5 space-y-4">
                  {group.activities.map((activity) => (
                    <li key={activity.id}>
                      <a href={`#${activity.id}`} className="group block">
                        <span className="font-bold text-foreground transition-colors group-hover:text-avanza-purple">
                          {activity.name}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
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
        description={t.gamesPage.groupCodeDesc}
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
        description={t.gamesPage.groupBuildDesc}
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
        description={t.gamesPage.groupScienceDesc}
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
  description,
}: {
  id: string
  accent: string
  name: string
  description: string
}) {
  return (
    <div id={id} style={{ scrollMarginTop: 96 }} className="bg-[#fcfaf3] py-14 md:py-16">
      <FadeIn className="mx-auto max-w-3xl px-6 text-center">
        <div className={`mx-auto h-1.5 w-14 rounded-full ${accent}`} />
        <h2 className="mt-5 text-balance text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
          {name}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      </FadeIn>
    </div>
  )
}
