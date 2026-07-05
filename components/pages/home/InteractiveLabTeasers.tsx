"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"

type LabCard = {
  href: string
  eyebrow: string
  title: string
  description: string
  tone: string
  preview: "code" | "bridge" | "tower" | "atom"
}

export function InteractiveLabTeasers() {
  const { t } = useLanguage()
  const labs: LabCard[] = [
    {
      href: "/games#python",
      eyebrow: t.home.pyEyebrow,
      title: t.home.pyTitle,
      description: t.home.pyDesc,
      tone: "bg-avanza-green text-avanza-dark",
      preview: "code",
    },
    {
      href: "/games#bridge",
      eyebrow: t.home.bridgeEyebrow,
      title: t.home.bridgeTitle,
      description: t.home.bridgeDesc,
      tone: "bg-avanza-orange text-avanza-dark",
      preview: "bridge",
    },
    {
      href: "/games#tower",
      eyebrow: t.home.jengaEyebrow,
      title: t.home.jengaTitle,
      description: t.home.jengaDesc,
      tone: "bg-avanza-purple text-white",
      preview: "tower",
    },
    {
      href: "/games#atom",
      eyebrow: t.home.atomEyebrow,
      title: t.home.atomTitle,
      description: t.home.atomDesc,
      tone: "bg-avanza-teal text-avanza-dark",
      preview: "atom",
    },
  ]

  return (
    <section className="bg-[#fff8e7] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
            {t.home.labsTeaserTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.home.labsTeaserDesc}
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {labs.map((lab, index) => (
            <FadeIn key={lab.href} delay={index * 70} className="h-full">
              <LabCard lab={lab} cta={t.gamesPage.cardOpen} />
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10 flex justify-center">
          <Link
            href="/games"
            className="group inline-flex items-center gap-2 rounded-lg bg-avanza-dark px-7 py-3.5 text-base font-extrabold text-primary-foreground shadow-[0_16px_36px_-18px_rgba(26,26,46,0.65)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_20px_44px_-18px_rgba(26,26,46,0.75)]"
          >
            {t.home.labsTeaserCta}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}

function LabCard({ lab, cta }: { lab: LabCard; cta: string }) {
  return (
    <Link
      href={lab.href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_20px_48px_-30px_rgba(26,26,46,0.42)] ring-1 ring-avanza-dark/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_58px_-30px_rgba(26,26,46,0.5)]"
    >
      <StaticPreview type={lab.preview} tone={lab.tone} />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted-foreground">
          {lab.eyebrow}
        </p>
        <h3 className="mt-2 text-xl font-extrabold leading-snug text-foreground">
          {lab.title}
        </h3>
        <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {lab.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-extrabold text-avanza-green transition-all duration-200 group-hover:gap-2.5">
          {cta}
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

function StaticPreview({ type, tone }: { type: LabCard["preview"]; tone: string }) {
  return (
    <div className="relative h-40 overflow-hidden bg-[#f6fff1]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(26,26,46,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(26,26,46,0.06)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="relative flex h-full items-center justify-center p-5">
        {type === "code" && <CodePreview />}
        {type === "bridge" && <BridgePreview />}
        {type === "tower" && <TowerPreview />}
        {type === "atom" && <AtomPreview />}
      </div>
      <span className={`absolute right-4 top-4 h-3 w-3 rounded-full ${tone}`} />
    </div>
  )
}

function CodePreview() {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-[#101226] shadow-lg">
      <div className="flex gap-1.5 border-b border-white/10 bg-[#171932] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
      </div>
      <div className="space-y-2 p-4 font-mono text-xs text-emerald-200">
        <p>{'print("hello")'}</p>
        <p>for idea in range(3):</p>
        <p className="pl-5 text-white/70">try_again()</p>
      </div>
    </div>
  )
}

function BridgePreview() {
  return (
    <svg viewBox="0 0 320 150" className="w-full" role="img" aria-label="Bridge lab preview">
      <rect x="0" y="122" width="320" height="28" rx="10" fill="#dff5dc" />
      <g fill="none" stroke="#1a1a2e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7">
        <path d="M36 100h248" />
        <path d="M56 48h208" />
        <path d="M56 48 36 100 112 48 160 100 212 48 284 100 264 48" />
        <path d="M112 48 92 100M212 48l20 52M160 100V48" />
      </g>
      <rect x="140" y="73" width="40" height="28" rx="7" fill="#f97316" />
    </svg>
  )
}

function TowerPreview() {
  return (
    <div className="flex h-full items-end justify-center gap-1">
      {[0, 1, 2].map((column) => (
        <div key={column} className="flex flex-col-reverse gap-1">
          {[0, 1, 2, 3].map((row) => (
            <span
              key={row}
              className="block h-8 w-14 rounded-md bg-avanza-purple shadow-sm"
              style={{ transform: `translateY(${column % 2 === 0 ? 0 : 6}px) rotate(${row % 2 === 0 ? -1 : 1}deg)` }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

function AtomPreview() {
  return (
    <div className="relative h-28 w-28">
      <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-avanza-teal shadow-lg" />
      <span className="absolute inset-4 rounded-full border-2 border-avanza-dark/35" />
      <span className="absolute inset-x-1 top-1/2 h-10 -translate-y-1/2 rounded-[50%] border-2 border-avanza-purple/70" />
      <span className="absolute inset-y-1 left-1/2 w-10 -translate-x-1/2 rounded-[50%] border-2 border-avanza-orange/75" />
      <span className="absolute right-5 top-6 h-4 w-4 rounded-full bg-avanza-orange shadow-md" />
      <span className="absolute bottom-4 left-8 h-3.5 w-3.5 rounded-full bg-avanza-purple shadow-md" />
    </div>
  )
}
