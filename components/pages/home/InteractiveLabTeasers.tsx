"use client"

import Link from "next/link"
import { type ComponentType, type ReactNode, useEffect, useRef, useState } from "react"
import { Atom, Code2, Hammer, Loader2, Play, Wrench } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { cn } from "@/lib/utils"

type LabLoader = () => Promise<ComponentType>

const loadPythonPlayground: LabLoader = () =>
  import("@/components/ui/python-playground").then((mod) => mod.PythonPlayground)

const loadBridgeLoadDemo: LabLoader = () =>
  import("@/components/ui/bridge-load-demo").then((mod) => mod.BridgeLoadDemo)

export function InteractiveLabTeasers() {
  const { t } = useLanguage()

  return (
    <>
      <LazyLab
        loader={loadPythonPlayground}
        fallback={
          <LabPlaceholder
            eyebrow={t.home.pyEyebrow}
            title={t.home.pyTitle}
            description={t.home.pyDesc}
            cta={t.home.pyRun}
            icon={Code2}
            tone="green"
            preview="code"
          />
        }
      />

      <LazyLab
        loader={loadBridgeLoadDemo}
        fallback={
          <LabPlaceholder
            eyebrow={t.home.bridgeEyebrow}
            title={t.home.bridgeTitle}
            description={t.home.bridgeDesc}
            cta={t.gamesPage.cardOpen}
            icon={Wrench}
            tone="orange"
            preview="bridge"
          />
        }
      />

      <section className="relative overflow-hidden bg-[#fff8e7] py-16 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(26,26,46,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,46,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-2">
          <GameTeaser
            href="/games#tower"
            icon={Hammer}
            eyebrow={t.home.jengaEyebrow}
            title={t.home.jengaTitle}
            description={t.home.jengaDesc}
            cta={t.gamesPage.cardOpen}
            tone="purple"
          />
          <GameTeaser
            href="/games#atom"
            icon={Atom}
            eyebrow={t.home.atomEyebrow}
            title={t.home.atomTitle}
            description={t.home.atomDesc}
            cta={t.gamesPage.cardOpen}
            tone="teal"
          />
        </div>
      </section>
    </>
  )
}

function LazyLab({
  fallback,
  loader,
}: {
  fallback: ReactNode
  loader: LabLoader
}) {
  const ref = useRef<HTMLElement>(null)
  const [Component, setComponent] = useState<ComponentType | null>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (shouldLoad || Component) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: "520px 0px", threshold: 0.01 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [Component, shouldLoad])

  useEffect(() => {
    if (!shouldLoad || Component) return
    let cancelled = false

    loader().then((Loaded) => {
      if (!cancelled) setComponent(() => Loaded)
    })

    return () => {
      cancelled = true
    }
  }, [Component, loader, shouldLoad])

  return (
    <section ref={ref} className="contents">
      {Component ? (
        <Component />
      ) : (
        <button
          type="button"
          onClick={() => setShouldLoad(true)}
          className="block w-full text-left"
        >
          {fallback}
        </button>
      )}
    </section>
  )
}

function LabPlaceholder({
  cta,
  description,
  eyebrow,
  icon: Icon,
  preview,
  title,
  tone,
}: {
  cta: string
  description: string
  eyebrow: string
  icon: LucideIcon
  preview: "bridge" | "code"
  title: string
  tone: "green" | "orange"
}) {
  const toneClasses = {
    green: "bg-avanza-green text-avanza-dark",
    orange: "bg-avanza-orange text-avanza-dark",
  }[tone]

  return (
    <section
      className={cn(
        "relative overflow-hidden py-20 md:py-24",
        preview === "code" ? "bg-[#fff8e8]" : "bg-[#f1fff7]",
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.42]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(26,26,46,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,46,0.05) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-avanza-dark">
            <Icon className="h-3.5 w-3.5 text-avanza-orange" />
            {eyebrow}
          </span>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
          <span className={cn("mt-7 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-extrabold shadow-md", toneClasses)}>
            <Play className="h-4 w-4 fill-white" />
            {cta}
          </span>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-white p-4 shadow-[0_28px_64px_-30px_rgba(26,26,46,0.35)] ring-1 ring-avanza-dark/10">
          {preview === "code" ? <CodePreview /> : <BridgePreview />}
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-avanza-dark px-4 py-2 text-sm font-extrabold text-primary-foreground">
              <Loader2 className="h-4 w-4" />
              {cta}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function CodePreview() {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#0f1024]">
      <div className="flex gap-2 border-b border-white/10 bg-[#16172e] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
      </div>
      <div className="space-y-3 p-5 font-mono text-sm text-emerald-200">
        <p>{'print("Hello, scientist!")'}</p>
        <p>for idea in range(3):</p>
        <p className="pl-6">{'print("try", idea + 1)'}</p>
        <p className="text-white/35"># Pyodide loads only when code runs</p>
      </div>
    </div>
  )
}

function BridgePreview() {
  return (
    <svg viewBox="0 0 720 360" className="aspect-[16/9] w-full rounded-2xl bg-[#fafff5]" role="img" aria-label="Truss bridge preview">
      <rect x="0" y="292" width="720" height="68" fill="#dff5dc" />
      <rect x="120" y="286" width="80" height="74" fill="#1a1a2e" />
      <rect x="520" y="286" width="80" height="74" fill="#1a1a2e" />
      <g fill="none" stroke="#1a1a2e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10">
        <path d="M155 230 L600 230" />
        <path d="M175 145 L580 145" />
        <path d="M175 145 L155 230 L275 145 L360 230 L455 145 L600 230 L580 145" />
        <path d="M275 145 L240 230 M455 145 L485 230 M360 230 L360 145" />
      </g>
      <rect x="330" y="180" width="70" height="48" rx="8" fill="#f97316" />
      <text x="365" y="211" textAnchor="middle" fill="white" fontFamily="sans-serif" fontSize="18" fontWeight="800">
        kg
      </text>
    </svg>
  )
}

function GameTeaser({
  cta,
  description,
  eyebrow,
  href,
  icon: Icon,
  title,
  tone,
}: {
  cta: string
  description: string
  eyebrow: string
  href: string
  icon: LucideIcon
  title: string
  tone: "purple" | "teal"
}) {
  const toneClasses = {
    purple: "bg-avanza-purple text-white ring-avanza-purple/30",
    teal: "bg-avanza-teal text-white ring-avanza-teal/30",
  }[tone]

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-3xl bg-white p-6 shadow-[0_24px_60px_-32px_rgba(26,26,46,0.45)] ring-1 ring-avanza-dark/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-34px_rgba(26,26,46,0.55)]"
    >
      <div className="flex items-start justify-between gap-4">
        <span className={cn("inline-flex h-12 w-12 items-center justify-center rounded-2xl shadow-md ring-4", toneClasses)}>
          <Icon className="h-6 w-6" />
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-avanza-dark px-4 py-2 text-sm font-extrabold text-primary-foreground">
          {cta}
          <Play className="h-3.5 w-3.5 fill-white transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
      <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.18em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-extrabold leading-tight text-foreground md:text-3xl">
        {title}
      </h2>
      <p className="mt-4 line-clamp-4 text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
    </Link>
  )
}
