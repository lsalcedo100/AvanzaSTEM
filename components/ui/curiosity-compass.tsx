"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Hammer, Code2, Microscope, Rocket, RotateCcw, Sparkles } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"

type CompassPath = "build" | "code" | "discover" | "invent"

type Path = {
  id: CompassPath
  icon: LucideIcon
  label: string
  hint: string
  project: string
  projectDesc: string
  href: string
  /** Tailwind classes that paint the card's playful identity. */
  base: string
  baseHover: string
  badge: string
  ring: string
  shadow: string
  lift: string
  /** Slight tilt to feel sticker-like — alternates left/right. */
  tilt: string
}

export function CuriosityCompass() {
  const { t } = useLanguage()
  const [picked, setPicked] = useState<CompassPath | null>(null)

  const paths: Path[] = [
    {
      id: "build",
      icon: Hammer,
      label: t.home.compassBuildLabel,
      hint: t.home.compassBuildHint,
      project: t.home.compassBuildProject,
      projectDesc: t.home.compassBuildProjectDesc,
      href: t.home.compassBuildHref,
      base: "bg-avanza-orange/12 ring-avanza-orange/30",
      baseHover: "hover:bg-avanza-orange/22 hover:ring-avanza-orange/55",
      badge: "bg-avanza-orange text-white",
      ring: "ring-avanza-orange",
      shadow: "shadow-[0_24px_60px_-22px_rgba(249,115,22,0.55)]",
      lift: "from-avanza-orange/30",
      tilt: "-rotate-[1.2deg] hover:rotate-0",
    },
    {
      id: "code",
      icon: Code2,
      label: t.home.compassCodeLabel,
      hint: t.home.compassCodeHint,
      project: t.home.compassCodeProject,
      projectDesc: t.home.compassCodeProjectDesc,
      href: t.home.compassCodeHref,
      base: "bg-avanza-green/12 ring-avanza-green/30",
      baseHover: "hover:bg-avanza-green/22 hover:ring-avanza-green/60",
      badge: "bg-avanza-green text-white",
      ring: "ring-avanza-green",
      shadow: "shadow-[0_24px_60px_-22px_rgba(46,204,113,0.55)]",
      lift: "from-avanza-green/30",
      tilt: "rotate-[1deg] hover:rotate-0",
    },
    {
      id: "discover",
      icon: Microscope,
      label: t.home.compassDiscoverLabel,
      hint: t.home.compassDiscoverHint,
      project: t.home.compassDiscoverProject,
      projectDesc: t.home.compassDiscoverProjectDesc,
      href: t.home.compassDiscoverHref,
      base: "bg-avanza-teal/12 ring-avanza-teal/30",
      baseHover: "hover:bg-avanza-teal/22 hover:ring-avanza-teal/55",
      badge: "bg-avanza-teal text-white",
      ring: "ring-avanza-teal",
      shadow: "shadow-[0_24px_60px_-22px_rgba(26,188,156,0.55)]",
      lift: "from-avanza-teal/30",
      tilt: "rotate-[0.6deg] hover:rotate-0",
    },
    {
      id: "invent",
      icon: Rocket,
      label: t.home.compassInventLabel,
      hint: t.home.compassInventHint,
      project: t.home.compassInventProject,
      projectDesc: t.home.compassInventProjectDesc,
      href: t.home.compassInventHref,
      base: "bg-avanza-purple/12 ring-avanza-purple/30",
      baseHover: "hover:bg-avanza-purple/22 hover:ring-avanza-purple/55",
      badge: "bg-avanza-purple text-white",
      ring: "ring-avanza-purple",
      shadow: "shadow-[0_24px_60px_-22px_rgba(139,92,246,0.55)]",
      lift: "from-avanza-purple/30",
      tilt: "-rotate-[0.8deg] hover:rotate-0",
    },
  ]

  const pickedPath = paths.find((p) => p.id === picked) ?? null
  const PickedIcon = pickedPath?.icon

  return (
    <section className="relative overflow-hidden bg-[#fcfaf3] py-20 md:py-28">
      {/* Subtle graph-paper texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(26,26,46,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,46,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Hand-drawn pencil sparkle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 top-10 hidden h-40 w-40 rotate-[-18deg] text-avanza-orange/35 md:block"
      >
        <Sparkles className="h-full w-full" strokeWidth={1.2} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-avanza-dark">
            <Sparkles className="h-3.5 w-3.5 text-avanza-orange" />
            {t.home.compassEyebrow}
          </span>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            {t.home.compassTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.home.compassDesc}
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {paths.map((path, i) => {
            const Icon = path.icon
            const isPicked = picked === path.id
            const isMuted = picked !== null && !isPicked
            return (
              <FadeIn key={path.id} delay={i * 70}>
                <button
                  type="button"
                  onClick={() => setPicked(path.id)}
                  aria-pressed={isPicked}
                  className={[
                    "group relative flex h-full w-full flex-col items-start gap-4 rounded-3xl bg-white p-6 text-left ring-1 transition-all duration-300",
                    path.tilt,
                    path.base,
                    path.baseHover,
                    isPicked
                      ? `ring-2 ${path.ring} ${path.shadow} -translate-y-1.5`
                      : "ring-avanza-dark/10 hover:-translate-y-1",
                    isMuted ? "opacity-55 blur-[0.5px]" : "opacity-100",
                  ].join(" ")}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br ${path.lift} via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${path.badge} shadow-md`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2.4} />
                  </div>
                  <div className="relative">
                    <h3 className="text-xl font-extrabold leading-snug text-foreground">
                      {path.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {path.hint}
                    </p>
                  </div>
                  {isPicked && (
                    <span className="relative inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-avanza-dark/70">
                      <span className="inline-block h-2 w-2 animate-ping rounded-full bg-avanza-green" />
                      {t.home.compassYouPicked}
                    </span>
                  )}
                </button>
              </FadeIn>
            )
          })}
        </div>

        <div className="mt-10">
          {pickedPath ? (
            <FadeIn key={pickedPath.id}>
              <div
                className={`relative overflow-hidden rounded-3xl border border-avanza-dark/10 bg-white p-8 shadow-[0_24px_60px_-30px_rgba(26,26,46,0.35)] md:p-10`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute -right-12 -top-12 h-44 w-44 rounded-full ${pickedPath.badge.replace(
                    "text-white",
                    "",
                  )} opacity-25 blur-3xl`}
                />
                <div className="relative grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
                  <div
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${pickedPath.badge} shadow-lg`}
                  >
                    {PickedIcon && <PickedIcon className="h-7 w-7" strokeWidth={2.4} />}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      {t.home.compassYouPicked} · {pickedPath.label}
                    </p>
                    <h3 className="mt-2 text-2xl font-extrabold text-foreground md:text-3xl">
                      {pickedPath.project}
                    </h3>
                    <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
                      {pickedPath.projectDesc}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 md:items-end">
                    <Link
                      href={pickedPath.href}
                      className="inline-flex items-center gap-2 rounded-full bg-avanza-dark px-6 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all duration-200 hover:scale-[1.03] hover:bg-foreground"
                    >
                      {t.home.compassStartHere}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setPicked(null)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      {t.home.compassReset}
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>
          ) : (
            <p className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span className="inline-block animate-pulse text-avanza-green">
                ↓
              </span>{" "}
              {t.home.compassPickPrompt}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
