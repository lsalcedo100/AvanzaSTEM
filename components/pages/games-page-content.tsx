"use client"

import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  BarChart3,
  Beaker,
  Bot,
  Compass,
  Code2,
  Cpu,
  Crosshair,
  Globe2,
  Hammer,
  MapPin,
  Play,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { PythonPlayground } from "@/components/ui/python-playground"
import { BridgeLoadDemo } from "@/components/ui/bridge-load-demo"
import { JengaTower } from "@/components/ui/jenga-tower"
import { AtomBuilder } from "@/components/ui/atom-builder"
import { CuriosityCompass } from "@/components/ui/curiosity-compass"
import { CodePathRobot } from "@/components/ui/code-path-robot"
import { CircuitBuilder } from "@/components/ui/circuit-builder"
import { CatapultLab } from "@/components/ui/catapult-lab"
import { GravitySandbox } from "@/components/ui/gravity-sandbox"
import { LogicGatePuzzle } from "@/components/ui/logic-gate-puzzle"
import { DensityTower } from "@/components/ui/density-tower"
import { SortingRace } from "@/components/ui/sorting-race"
import { MarbleRun } from "@/components/ui/marble-run"

type GameCard = {
  id: string
  icon: LucideIcon
  name: string
  tagline: string
  tone: string
  ring: string
  shadow: string
  href?: string
  external?: boolean
  tilt: string
}

export function GamesPageContent() {
  const { t } = useLanguage()
  const cards: GameCard[] = [
    {
      id: "python",
      icon: Code2,
      name: t.gamesPage.pythonName,
      tagline: t.gamesPage.pythonTagline,
      tone: "bg-avanza-green",
      ring: "ring-avanza-green/40",
      shadow: "shadow-[0_22px_50px_-25px_rgba(46,204,113,0.5)]",
      tilt: "-rotate-[0.8deg] hover:rotate-0",
    },
    {
      id: "bridge",
      icon: Wrench,
      name: t.gamesPage.bridgeName,
      tagline: t.gamesPage.bridgeTagline,
      tone: "bg-avanza-orange",
      ring: "ring-avanza-orange/40",
      shadow: "shadow-[0_22px_50px_-25px_rgba(249,115,22,0.5)]",
      tilt: "rotate-[0.6deg] hover:rotate-0",
    },
    {
      id: "tower",
      icon: Hammer,
      name: t.gamesPage.towerName,
      tagline: t.gamesPage.towerTagline,
      tone: "bg-avanza-purple",
      ring: "ring-avanza-purple/40",
      shadow: "shadow-[0_22px_50px_-25px_rgba(139,92,246,0.5)]",
      tilt: "-rotate-[0.6deg] hover:rotate-0",
    },
    {
      id: "atom",
      icon: Atom,
      name: t.gamesPage.atomName,
      tagline: t.gamesPage.atomTagline,
      tone: "bg-avanza-teal",
      ring: "ring-avanza-teal/40",
      shadow: "shadow-[0_22px_50px_-25px_rgba(26,188,156,0.5)]",
      tilt: "rotate-[0.8deg] hover:rotate-0",
    },
    {
      id: "compass",
      icon: Compass,
      name: t.gamesPage.compassName,
      tagline: t.gamesPage.compassTagline,
      tone: "bg-avanza-orange",
      ring: "ring-avanza-orange/40",
      shadow: "shadow-[0_22px_50px_-25px_rgba(249,115,22,0.5)]",
      tilt: "-rotate-[0.4deg] hover:rotate-0",
    },
    {
      id: "robot",
      icon: Bot,
      name: t.gamesPage.robotName,
      tagline: t.gamesPage.robotTagline,
      tone: "bg-avanza-purple",
      ring: "ring-avanza-purple/40",
      shadow: "shadow-[0_22px_50px_-25px_rgba(139,92,246,0.5)]",
      tilt: "rotate-[0.6deg] hover:rotate-0",
    },
    {
      id: "circuit",
      icon: Zap,
      name: t.gamesPage.circuitName,
      tagline: t.gamesPage.circuitTagline,
      tone: "bg-avanza-orange",
      ring: "ring-avanza-orange/40",
      shadow: "shadow-[0_22px_50px_-25px_rgba(249,115,22,0.5)]",
      tilt: "-rotate-[0.7deg] hover:rotate-0",
    },
    {
      id: "catapult",
      icon: Crosshair,
      name: t.gamesPage.catapultName,
      tagline: t.gamesPage.catapultTagline,
      tone: "bg-avanza-green",
      ring: "ring-avanza-green/40",
      shadow: "shadow-[0_22px_50px_-25px_rgba(46,204,113,0.5)]",
      tilt: "rotate-[0.5deg] hover:rotate-0",
    },
    {
      id: "gravity",
      icon: Globe2,
      name: t.gamesPage.gravityName,
      tagline: t.gamesPage.gravityTagline,
      tone: "bg-avanza-teal",
      ring: "ring-avanza-teal/40",
      shadow: "shadow-[0_22px_50px_-25px_rgba(26,188,156,0.5)]",
      tilt: "-rotate-[0.5deg] hover:rotate-0",
    },
    {
      id: "logic",
      icon: Cpu,
      name: t.gamesPage.logicName,
      tagline: t.gamesPage.logicTagline,
      tone: "bg-avanza-purple",
      ring: "ring-avanza-purple/40",
      shadow: "shadow-[0_22px_50px_-25px_rgba(139,92,246,0.5)]",
      tilt: "rotate-[0.4deg] hover:rotate-0",
    },
    {
      id: "density",
      icon: Beaker,
      name: t.gamesPage.densityName,
      tagline: t.gamesPage.densityTagline,
      tone: "bg-avanza-teal",
      ring: "ring-avanza-teal/40",
      shadow: "shadow-[0_22px_50px_-25px_rgba(26,188,156,0.5)]",
      tilt: "-rotate-[0.6deg] hover:rotate-0",
    },
    {
      id: "sort",
      icon: BarChart3,
      name: t.gamesPage.sortName,
      tagline: t.gamesPage.sortTagline,
      tone: "bg-avanza-orange",
      ring: "ring-avanza-orange/40",
      shadow: "shadow-[0_22px_50px_-25px_rgba(249,115,22,0.5)]",
      tilt: "rotate-[0.7deg] hover:rotate-0",
    },
    {
      id: "marble",
      icon: Wrench,
      name: t.gamesPage.marbleName,
      tagline: t.gamesPage.marbleTagline,
      tone: "bg-avanza-orange",
      ring: "ring-avanza-orange/40",
      shadow: "shadow-[0_22px_50px_-25px_rgba(249,115,22,0.5)]",
      tilt: "-rotate-[0.4deg] hover:rotate-0",
    },
    {
      id: "finder",
      icon: MapPin,
      name: t.gamesPage.finderName,
      tagline: t.gamesPage.finderTagline,
      tone: "bg-avanza-green",
      ring: "ring-avanza-green/40",
      shadow: "shadow-[0_22px_50px_-25px_rgba(46,204,113,0.5)]",
      href: "/find-a-workshop",
      external: true,
      tilt: "rotate-[0.5deg] hover:rotate-0",
    },
  ]

  const playableCount = cards.length

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
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold text-primary-foreground/90 backdrop-blur-sm transition-colors hover:bg-white/25"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {t.gamesPage.backToHome}
            </Link>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-white/45 bg-white/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-primary-foreground backdrop-blur-sm">
              <Play className="h-3.5 w-3.5" />
              {t.gamesPage.eyebrow}
            </span>
            <h1 className="mt-6 text-balance text-5xl font-extrabold leading-[1.04] text-primary-foreground italic md:text-7xl">
              {t.gamesPage.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
              {t.gamesPage.description}
            </p>
            <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-1.5 text-sm font-bold text-primary-foreground backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              {playableCount} {t.gamesPage.countLabel}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* GAME CARD GRID — anchor-jumps to each section */}
      <section className="bg-[#fcfaf3] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-8 text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-avanza-purple">
              {t.gamesPage.jumpTo}
            </p>
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, i) => (
              <FadeIn key={card.id} delay={i * 60} className="h-full">
                <GameCard card={card} cta={t.gamesPage.cardOpen} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* GAME SECTIONS — anchored, scroll-margin top so navbar doesn't cover */}
      <div id="python" style={{ scrollMarginTop: 96 }}>
        <PythonPlayground />
      </div>
      <div id="bridge" style={{ scrollMarginTop: 96 }}>
        <BridgeLoadDemo />
      </div>
      <div id="tower" style={{ scrollMarginTop: 96 }}>
        <JengaTower />
      </div>
      <div id="atom" style={{ scrollMarginTop: 96 }}>
        <AtomBuilder />
      </div>
      <div id="compass" style={{ scrollMarginTop: 96 }}>
        <CuriosityCompass />
      </div>
      <div id="robot" style={{ scrollMarginTop: 96 }}>
        <CodePathRobot />
      </div>
      <div id="circuit" style={{ scrollMarginTop: 96 }}>
        <CircuitBuilder />
      </div>
      <div id="catapult" style={{ scrollMarginTop: 96 }}>
        <CatapultLab />
      </div>
      <div id="gravity" style={{ scrollMarginTop: 96 }}>
        <GravitySandbox />
      </div>
      <div id="logic" style={{ scrollMarginTop: 96 }}>
        <LogicGatePuzzle />
      </div>
      <div id="density" style={{ scrollMarginTop: 96 }}>
        <DensityTower />
      </div>
      <div id="sort" style={{ scrollMarginTop: 96 }}>
        <SortingRace />
      </div>
      <div id="marble" style={{ scrollMarginTop: 96 }}>
        <MarbleRun />
      </div>

      {/* CLOSING CTA */}
      <section className="bg-avanza-dark py-16 md:py-20">
        <FadeIn className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground md:text-4xl">
            More games coming soon.
          </h2>
          <p className="mt-4 text-base text-primary-foreground/70">
            Have an idea for a STEM game we should build? Tell us — we love new ideas.
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

function GameCard({
  card,
  cta,
}: {
  card: GameCard
  cta: string
}) {
  const Icon = card.icon
  const inner = (
    <div
      className={`group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl bg-white p-6 ring-1 ${card.ring} ${card.shadow} transition-all duration-300 hover:-translate-y-1.5 ${card.tilt}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="flex items-start justify-between gap-3">
        <div
          className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${card.tone} text-white shadow-md`}
        >
          <Icon className="h-6 w-6" strokeWidth={2.4} />
        </div>
        {card.external && (
          <span className="rounded-full bg-avanza-dark/8 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-avanza-dark/70">
            New page
          </span>
        )}
      </div>
      <div className="relative">
        <h3 className="text-lg font-extrabold leading-snug text-foreground">
          {card.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {card.tagline}
        </p>
      </div>
      <span className="relative mt-auto inline-flex items-center gap-1 text-sm font-extrabold text-avanza-dark transition-all duration-200 group-hover:gap-2">
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </div>
  )

  if (card.external && card.href) {
    return (
      <Link href={card.href} className="block h-full">
        {inner}
      </Link>
    )
  }
  return (
    <a href={`#${card.id}`} className="block h-full">
      {inner}
    </a>
  )
}
