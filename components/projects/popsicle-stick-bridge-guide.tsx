"use client"

import Image from "next/image"
import Link from "next/link"
import QRCode from "qrcode"
import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  Layers3,
  Package,
  QrCode,
  Ruler,
  Scale,
  Sparkles,
  Star,
  Triangle,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { ProjectGuide } from "@/lib/project-guides"

type ResourceLink = {
  title: string
  subtitle: string
  href: string
  icon: LucideIcon
}

type AnatomyTerm = {
  term: string
  definition: string
  clue: string
}

type SubAssembly = {
  title: string
  subtitle: string
  description: string
  icon: LucideIcon
  accent: string
}

type BuildStep = {
  id: string
  stage: string
  title: string
  summary: string
  why: string
  proTip: string
  checks: string[]
  tags: string[]
  diagram: "template" | "truss" | "gusset" | "assembly" | "bracing" | "load"
}

const videoUrl = "https://www.youtube.com/watch?v=QheSSHUbPeE"
const printableTemplateUrl = "/bridge-template.svg"

const resourceLinks: ResourceLink[] = [
  {
    title: "Printable Template",
    subtitle: "Open the truss layout and print at 100%",
    href: printableTemplateUrl,
    icon: Download,
  },
  {
    title: "Engineering Reference",
    subtitle: "Make: Warren truss article",
    href: "https://makezine.com/projects/make-warren-truss-bridge-popsicle-sticks/",
    icon: BookOpen,
  },
  {
    title: "Video Walk-Through",
    subtitle: "Bridge tutorial with a real YouTube embed",
    href: "https://woodworkingchallenge.com/building-a-truss-bridge-with-popsicle-sticks/",
    icon: ArrowUpRight,
  },
]

const anatomyTerms: AnatomyTerm[] = [
  {
    term: "Top Chord",
    definition: "The long top beam of each truss. It usually feels compression when the bridge is loaded.",
    clue: "Compression means the member is getting squished or pushed.",
  },
  {
    term: "Bottom Chord",
    definition: "The long bottom beam of each truss. It often handles tension during a load test.",
    clue: "Tension means the member is being pulled apart.",
  },
  {
    term: "Diagonals and Verticals",
    definition: "The inside members of the truss. In a classroom bridge they are often just called web members, and they help move force between the chords.",
    clue: "These are the triangle-makers and support posts that keep the truss from folding.",
  },
  {
    term: "Deck and Floor Beams",
    definition: "The deck is the road surface, and the floor beams support it from below. Together they help deliver the load into the trusses.",
    clue: "Books or weights press on the deck first, then the rest of the bridge shares the force.",
  },
  {
    term: "Top Lateral Bracing",
    definition: "The members across the top of the bridge that tie the two sides together and resist twisting.",
    clue: "Without top bracing, the side walls can lean like floppy picture frames.",
  },
]

const subAssemblies: SubAssembly[] = [
  {
    title: "The Two Trusses",
    subtitle: "The side walls",
    description: "These matching triangle frames do the heavy structural work. If they are not identical, the deck can twist and the bridge can fail early.",
    icon: Triangle,
    accent: "from-[#dff1ff] to-[#a7d5ff]",
  },
  {
    title: "The Deck",
    subtitle: "The road surface",
    description: "The deck spreads weight into both side trusses instead of dumping it into one weak point.",
    icon: Package,
    accent: "from-[#fff3cc] to-[#ffd77f]",
  },
  {
    title: "The Lateral Bracing",
    subtitle: "The top connectors",
    description: "These sticks tie the two trusses together and keep the bridge square while the load pushes down.",
    icon: Layers3,
    accent: "from-[#e6defd] to-[#c9b7ff]",
  },
]

const buildSteps: BuildStep[] = [
  {
    id: "bridge-step-1",
    stage: "Template Prep",
    title: "Print or trace the truss template first",
    summary:
      "Open the printable guide, print it at 100%, and cover it with wax paper so glue will not trap your bridge on the page. If you cannot print, trace the lines onto paper with a ruler.",
    why:
      "Real prototyping gets easier when you build on a guide. A template keeps the two side trusses the same size, which makes the whole bridge straighter and stronger.",
    proTip:
      "Use the 1-inch check bar on the printable template. If that bar is not exactly 1 inch long, your printer changed the scale.",
    checks: [
      "Template is covered with wax paper or plastic wrap",
      "You checked the 1-inch scale bar before building",
      "Your work surface is flat and clean",
    ],
    tags: ["template", "accuracy"],
    diagram: "template",
  },
  {
    id: "bridge-step-2",
    stage: "Truss 1",
    title: "Build the first side truss right on top of the guide",
    summary:
      "Lay the sticks directly over the template lines to make one side wall. Keep the triangles neat and make the glue joints small instead of blobby.",
    why:
      "Tiny, tidy triangles are the secret. This is where the force path gets built, so crooked joints or shifting sticks make the whole bridge weaker later.",
    proTip:
      "A little glue is enough. Too much adds weight and can make joints rubbery instead of crisp and strong.",
    checks: [
      "All triangle points line up with the template",
      "The truss lies flat without rocking",
      "Glue is at the joints, not spread across the whole stick",
    ],
    tags: ["triangles", "glue control"],
    diagram: "truss",
  },
  {
    id: "bridge-step-3",
    stage: "Joint Reinforcement",
    title: "Flip the truss and strengthen the weak points",
    summary:
      "Once the first side sets, flip it over and reinforce the joints from the back. Double up the center parts of the top and bottom chords or add simple gusset-style reinforcements at the busiest joints.",
    why:
      "Overlapping joints are usually the weakest spots. Reinforcing the joints helps the load move through the truss instead of snapping one connection and starting a chain reaction.",
    proTip:
      "This is the gusset plate trick. Think of it like adding a seatbelt to the connection so the sticks cannot peel apart as easily.",
    checks: [
      "Reinforcements sit flat against the first layer",
      "The center of the bridge has extra support",
      "The truss is still straight after you flip it back over",
    ],
    tags: ["gussets", "double strength"],
    diagram: "gusset",
  },
  {
    id: "bridge-step-4",
    stage: "Truss 2",
    title: "Make a second truss that matches the first one",
    summary:
      "Use the same template again so the second side wall matches the first. Let both pieces dry enough that they hold their shape before you stand them up.",
    why:
      "A bridge is happiest when both trusses share the work evenly. If one side is taller, shorter, or leaner, the deck starts pushing unevenly and twisting the whole build.",
    proTip:
      "Stack the finished trusses on top of each other for a quick symmetry check. Their corners should line up almost exactly.",
    checks: [
      "Both trusses are the same length and height",
      "Neither truss bows inward or outward",
      "Glue is dry enough to handle without flexing",
    ],
    tags: ["symmetry", "matching parts"],
    diagram: "assembly",
  },
  {
    id: "bridge-step-5",
    stage: "Full Assembly",
    title: "Add the deck and the lateral bracing",
    summary:
      "Stand the trusses upright, connect them with deck sticks across the bottom or middle, and then add lateral bracing across the top to lock the shape in place.",
    why:
      "This is where the project becomes a bridge instead of two flat frames. The deck brings the load in, and the top bracing stops the side walls from leaning like open gates.",
    proTip:
      "Use scrap blocks, books, or boxes to hold the trusses vertical while the deck and bracing dry. A tiny lean now becomes a big weakness later.",
    checks: [
      "Both trusses are vertical and parallel",
      "The deck reaches cleanly from one side to the other",
      "Top bracing keeps the bridge square instead of twisty",
    ],
    tags: ["deck", "lateral bracing"],
    diagram: "bracing",
  },
  {
    id: "bridge-step-6",
    stage: "Load Test",
    title: "Dry completely and test the bridge slowly",
    summary:
      "Place the bridge between two supports and add weight a little at a time. Watch which parts bend, listen for cracking, and stop before anything falls hard.",
    why:
      "Testing tells you how the structure really behaves. You can often see the top chord compress, the bottom chord stretch, and the web members redirect the force before failure happens.",
    proTip:
      "Record the load and where the bridge started to sag. That turns the build into engineering instead of just a craft challenge.",
    checks: [
      "Bridge sits flat on both test supports",
      "Weights are added slowly, not dropped",
      "You wrote down what bent first and where",
    ],
    tags: ["compression", "tension"],
    diagram: "load",
  },
]

export function PopsicleStickBridgeGuide({ project }: { project: ProjectGuide }) {
  const [activeStep, setActiveStep] = useState(0)
  const [videoQr, setVideoQr] = useState("")

  useEffect(() => {
    const updateActiveStep = () => {
      let current = 0

      buildSteps.forEach((step, index) => {
        const element = document.getElementById(step.id)

        if (element && element.getBoundingClientRect().top <= window.innerHeight * 0.38) {
          current = index
        }
      })

      setActiveStep(current)
    }

    updateActiveStep()
    window.addEventListener("scroll", updateActiveStep, { passive: true })

    return () => window.removeEventListener("scroll", updateActiveStep)
  }, [])

  useEffect(() => {
    void QRCode.toDataURL(videoUrl, {
      width: 224,
      margin: 1,
      color: {
        dark: "#102847",
        light: "#0000",
      },
    }).then(setVideoQr)
  }, [])

  const progress = ((activeStep + 1) / buildSteps.length) * 100

  return (
    <div className="bg-[#eff4f7] text-slate-900">
      <section className="relative overflow-hidden bg-[#08182a] text-white">
        <div
          className="absolute inset-0 opacity-28"
          style={{
            backgroundImage:
              "linear-gradient(rgba(171,205,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(171,205,255,0.12) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 18% 18%, rgba(120,177,255,0.22), transparent 20%), radial-gradient(circle at 82% 15%, rgba(255,221,153,0.14), transparent 18%), linear-gradient(135deg, rgba(8,24,42,0.98), rgba(10,38,68,0.95) 56%, rgba(7,24,42,0.98))",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/12"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.98fr]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#c9f0dd] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-[#12392e]">
                Truss Lab
              </div>
              <h1 className="mt-5 text-5xl font-black tracking-tight text-white md:text-6xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/82">
                Build a real truss bridge, not just a pile of craft sticks. This page shows the
                force paths, the bridge anatomy, and the sub-assemblies so the project feels like
                structural engineering instead of mystery glue.
              </p>

              <div className="mt-7 flex flex-wrap gap-3 text-sm text-white/90">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2">
                  <Star className="h-4 w-4 text-[#ffe37c]" />
                  {project.difficulty}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2">
                  <Clock className="h-4 w-4 text-[#8ecfff]" />
                  {project.time}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2 font-mono">
                  <Scale className="h-4 w-4 text-[#bff4df]" />
                  compression + tension
                </span>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <HeroInfoCard
                  icon={Triangle}
                  title="What you'll build"
                  description="A truss bridge with two side walls, a deck, and top bracing."
                />
                <HeroInfoCard
                  icon={Scale}
                  title="Physics words"
                  description="Compression, tension, load paths, and weight distribution."
                />
                <HeroInfoCard
                  icon={Ruler}
                  title="Builder trick"
                  description="Use a printable template so the two trusses actually match."
                />
              </div>

              <BridgeNote title="Science Secret" tone="yellow" className="mt-8 max-w-md lg:ml-8">
                Triangles matter because they lock the shape. Squares can lean into diamonds, but a
                triangle keeps its geometry unless a member actually bends or breaks.
              </BridgeNote>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-[#0d2238]/88 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.34)] backdrop-blur">
                <div className="flex items-center justify-between rounded-[1.4rem] border border-white/8 bg-[#0b1c31] px-4 py-3">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#8ecfff]">
                    Finished Bridge
                  </span>
                  <span className="rounded-full bg-white/8 px-3 py-1 font-mono text-[11px] text-white/64">
                    final build preview
                  </span>
                </div>

                <div className="mt-4 rounded-[1.7rem] bg-[linear-gradient(180deg,#07121f_0%,#0b1828_100%)] p-4">
                  <div className="relative h-[360px] overflow-hidden rounded-[1.4rem] border border-white/8">
                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08182a] via-transparent to-transparent" />
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {resourceLinks.map((link) => {
                  const Icon = link.icon

                  return (
                    <a
                      key={link.title}
                      href={link.href}
                      target={link.href.startsWith("/") ? undefined : "_blank"}
                      rel={link.href.startsWith("/") ? undefined : "noreferrer"}
                      className="group rounded-[1.5rem] border border-white/10 bg-white/8 p-4 transition-colors hover:bg-white/12"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#bff4df]">
                          <Icon className="h-5 w-5" />
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-white/55 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                      <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-white">
                        {link.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/70">{link.subtitle}</p>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f6efe5]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 xl:grid-cols-[0.98fr_1.02fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#132f4e] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-white">
                Anatomy of a Bridge
              </div>
              <h2 className="mt-5 text-4xl font-black tracking-tight text-[#102847]">
                Use a real bridge reference image, then shrink the ideas down to your model.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-[#52667f]">
                This labeled diagram shows a full-size through-truss bridge, so it includes some
                vocabulary that is fancier than your popsicle-stick version. That is helpful,
                because you can learn the real engineering names and then focus on the few parts
                that matter most for your classroom build.
              </p>

              <div className="mt-8 space-y-4">
                {anatomyTerms.map((item) => (
                  <div
                    key={item.term}
                    className="rounded-[1.7rem] border border-[#d8ddd2] bg-white px-5 py-5 shadow-[0_16px_40px_rgba(16,40,71,0.05)]"
                  >
                    <p className="font-mono text-sm font-bold text-[#102847]">{item.term}</p>
                    <p className="mt-2 text-sm leading-7 text-[#52667f]">{item.definition}</p>
                    <p className="mt-2 text-xs leading-6 text-[#7a8898]">{item.clue}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-[#cfd9e5] bg-white p-5 shadow-[0_20px_60px_rgba(16,40,71,0.08)]">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2f6ca6]">
                  Real bridge reference diagram
                </p>
                <div className="mt-4 rounded-[1.6rem] bg-[#eef4fa] p-4">
                  <img
                    src="/Labeled%20Truss%20Bridge%20Diagram.png"
                    alt="Labeled truss bridge reference diagram showing top lateral bracing, top chord, diagonals, verticals, floor beams, deck, and bottom chord."
                    className="w-full rounded-[1.2rem] border border-[#dbe6f2] bg-white"
                  />
                </div>
                <div className="mt-4 rounded-[1.5rem] bg-[#eef6ff] px-5 py-4 text-[#163d61]">
                  <p className="text-xs font-black uppercase tracking-[0.18em]">How to use it</p>
                  <p className="mt-2 text-sm leading-7">
                    Your popsicle-stick bridge will be a simpler version of this kind of structure.
                    The most important labels for your model are the top chord, bottom chord,
                    diagonals, deck, and top lateral bracing.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {subAssemblies.map((assembly) => {
                  const Icon = assembly.icon

                  return (
                    <div
                      key={assembly.title}
                      className={`rounded-[1.8rem] bg-gradient-to-br ${assembly.accent} p-5 shadow-[0_16px_40px_rgba(16,40,71,0.06)]`}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/60 text-[#143b61] shadow-sm">
                        <Icon className="h-6 w-6" />
                      </div>
                      <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[#305b81]">
                        {assembly.subtitle}
                      </p>
                      <h3 className="mt-2 text-xl font-black text-[#102847]">{assembly.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#45607b]">{assembly.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#09192d] text-white">
        <div
          className="absolute inset-0 opacity-18"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6 backdrop-blur">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#8ecfff]/12 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#8ecfff]">
                  The Build
                </div>
                <h2 className="mt-4 text-3xl font-black">Progress Tracker</h2>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  Each step below has the action, the engineering reason, and a pro-builder trick
                  so the bridge never feels like &quot;draw the rest of the owl.&quot;
                </p>

                <div className="mt-5">
                  <Progress
                    value={progress}
                    className="h-3 bg-white/10 [&_[data-slot=progress-indicator]]:bg-[#bff4df]"
                  />
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white/58">
                    Step {activeStep + 1} of {buildSteps.length}
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  {buildSteps.map((step, index) => (
                    <a
                      key={step.id}
                      href={`#${step.id}`}
                      className={`block rounded-2xl px-4 py-4 transition-colors ${
                        index === activeStep
                          ? "bg-[#8ecfff]/14 text-white"
                          : "bg-white/5 text-white/72 hover:bg-white/8"
                      }`}
                    >
                      <span className="block text-xs font-black uppercase tracking-[0.18em] text-white/55">
                        {step.stage}
                      </span>
                      <span className="mt-2 block text-sm font-semibold leading-6">
                        {step.title}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-[2rem] border border-white/10 bg-white p-5 text-[#102847] shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
                <div className="flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-[#2f6ca6]" />
                  <p className="text-sm font-black uppercase tracking-[0.18em]">Template Toolkit</p>
                </div>

                <div className="mt-4 overflow-hidden rounded-[1.2rem] border border-[#d8e2ec] bg-[#eef4fa]">
                  <img src={printableTemplateUrl} alt="Printable bridge template preview" className="h-44 w-full object-cover" />
                </div>

                <a
                  href={printableTemplateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#102847] px-5 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                >
                  <Download className="h-4 w-4" />
                  Open printable template
                </a>

                <p className="mt-4 text-sm leading-7 text-[#52667f]">
                  Build the trusses on top of the template, then check the 1-inch ruler before you
                  trust the print scale.
                </p>
              </div>

              <div className="mt-6 rounded-[2rem] border border-white/10 bg-[#fff4b8] p-5 text-[#503a02] shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
                <div className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  <p className="text-sm font-black uppercase tracking-[0.18em]">Video Upgrade</p>
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-white/80">
                    {videoQr ? (
                      <img src={videoQr} alt="QR code for bridge build video" className="h-full w-full" />
                    ) : (
                      <span className="text-xs font-bold uppercase tracking-[0.16em]">Loading QR</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Scan for the video walk-through</p>
                    <p className="mt-2 text-xs leading-6">
                      Best for glue amount, deck placement, and seeing how the road connects to the
                      side walls.
                    </p>
                  </div>
                </div>

                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#102847] px-5 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                >
                  Watch on YouTube
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <BridgeNote title="Safety + glue" tone="mint" className="mt-6">
                {project.safety}
              </BridgeNote>
            </aside>

            <div className="relative space-y-8 before:absolute before:left-7 before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-gradient-to-b before:from-[#8ecfff] before:via-[#bff4df]/50 before:to-transparent">
              {buildSteps.map((step, index) => {
                const diagramFirst = index % 2 === 0

                return (
                  <article
                    key={step.id}
                    id={step.id}
                    className="scroll-mt-28 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.08))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur"
                  >
                    <div className="flex items-start gap-4">
                      <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#bff4df] text-[#062235] shadow-lg">
                        <span className="text-lg font-black">{index + 1}</span>
                      </span>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8ecfff]">
                          {step.stage}
                        </p>
                        <h3 className="mt-2 text-3xl font-black text-white">{step.title}</h3>
                        <p className="mt-3 max-w-3xl text-base leading-8 text-white/80">
                          {step.summary}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 grid gap-6 lg:grid-cols-2">
                      <div className={diagramFirst ? "" : "lg:order-2"}>
                        <div className="rounded-[1.8rem] border border-white/10 bg-[#091829] p-5">
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8ecfff]">
                            Assembly view
                          </p>
                          <div className="mt-4 rounded-[1.5rem] bg-[#10213a] p-4">
                            <BridgeStepDiagram variant={step.diagram} />
                          </div>
                        </div>
                      </div>

                      <div className={diagramFirst ? "" : "lg:order-1"}>
                        <div className="space-y-4">
                          <DetailPanel title="Why this step matters" tone="navy">
                            {step.why}
                          </DetailPanel>
                          <DetailPanel title="Pro tip" tone="yellow">
                            {step.proTip}
                          </DetailPanel>

                          <div className="rounded-[1.6rem] bg-white/8 p-5">
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#bff4df]">
                              Builder checklist
                            </p>
                            <div className="mt-4 space-y-3">
                              {step.checks.map((check) => (
                                <div
                                  key={check}
                                  className="flex items-start gap-3 rounded-2xl bg-white/6 px-4 py-4"
                                >
                                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#bff4df]" />
                                  <p className="text-sm leading-7 text-white/78">{check}</p>
                                </div>
                              ))}
                            </div>

                            <div className="mt-5 flex flex-wrap gap-2">
                              {step.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full border border-white/12 bg-white/6 px-3 py-2 font-mono text-xs text-white/76"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#dcecff]">
        <div
          className="absolute inset-0 opacity-32"
          style={{
            backgroundImage:
              "linear-gradient(rgba(18,48,78,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(18,48,78,0.08) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#102847] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-white">
              Level Up
            </div>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-[#102847]">
              Bonus missions for bridge engineers who want more.
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#52667f]">
              Once the first bridge works, start thinking like a design team. Make it lighter,
              longer, or more efficient without losing strength.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <UpgradeCard
              title="Span Challenge"
              subtitle="Go longer without more sticks"
              accent="from-[#fff3cc] to-[#ffd77f]"
            >
              Stretch the bridge span and see whether your triangles still keep the structure stiff.
            </UpgradeCard>
            <UpgradeCard
              title="Center Chord Test"
              subtitle="Reinforce only the busiest spots"
              accent="from-[#dff1ff] to-[#a7d5ff]"
            >
              Add extra sticks only near the center top and bottom chords. Did smart placement help
              more than just adding random material everywhere?
            </UpgradeCard>
            <UpgradeCard
              title="Strength-to-Weight"
              subtitle="Chase the best ratio"
              accent="from-[#e6defd] to-[#c9b7ff]"
            >
              Weigh your bridge first, then divide the supported load by the bridge weight. That is
              a much cooler engineering score than &quot;it held a lot.&quot;
            </UpgradeCard>
          </div>

          <div className="mt-10 rounded-[2rem] bg-white px-6 py-5 shadow-[0_18px_50px_rgba(16,40,71,0.08)]">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 text-[#f59e0b]" />
              <p className="text-sm leading-7 text-[#52667f]">
                Biggest win: try the same bridge twice, once with sloppy glue joints and once with
                careful neat joints. That experiment teaches why craftsmanship changes engineering
                performance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function HeroInfoCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <div className="rounded-[1.6rem] bg-white/8 p-5 backdrop-blur">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-[#bff4df]">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-xl font-black text-white">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-white/76">{description}</p>
    </div>
  )
}

function BridgeNote({
  title,
  tone,
  className = "",
  children,
}: {
  title: string
  tone: "yellow" | "mint"
  className?: string
  children: ReactNode
}) {
  const tones = {
    yellow: "bg-[#fff1a8] text-[#3d2f00]",
    mint: "bg-[#bff4df] text-[#124436]",
  }

  return (
    <div
      className={`relative rotate-[-2deg] rounded-[1.5rem] px-5 py-5 shadow-[0_18px_45px_rgba(0,0,0,0.12)] ${tones[tone]} ${className}`}
    >
      <div className="absolute left-1/2 top-0 h-4 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/55" />
      <p className="text-xs font-black uppercase tracking-[0.18em]">{title}</p>
      <div className="mt-3 text-sm leading-7">{children}</div>
    </div>
  )
}

function DetailPanel({
  title,
  tone,
  children,
}: {
  title: string
  tone: "navy" | "yellow"
  children: ReactNode
}) {
  const tones = {
    navy: "bg-[#eaf3ff] text-[#143b61]",
    yellow: "bg-[#fff4b8] text-[#5a4104]",
  }

  return (
    <div className={`rounded-[1.6rem] px-5 py-5 ${tones[tone]}`}>
      <p className="text-xs font-black uppercase tracking-[0.18em]">{title}</p>
      <p className="mt-3 text-sm leading-7">{children}</p>
    </div>
  )
}

function UpgradeCard({
  title,
  subtitle,
  accent,
  children,
}: {
  title: string
  subtitle: string
  accent: string
  children: ReactNode
}) {
  return (
    <div className={`rounded-[2rem] bg-gradient-to-br ${accent} p-6 shadow-[0_20px_60px_rgba(16,40,71,0.10)]`}>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4d2e17]">Bonus mission</p>
      <h3 className="mt-3 text-2xl font-black text-[#1d2242]">{title}</h3>
      <p className="mt-2 font-semibold text-[#52667f]">{subtitle}</p>
      <p className="mt-4 text-sm leading-7 text-[#42556f]">{children}</p>
    </div>
  )
}

function BridgeStepDiagram({ variant }: { variant: BuildStep["diagram"] }) {
  const boardClassName =
    "relative h-[220px] overflow-hidden rounded-[1.4rem] border border-white/8 bg-[linear-gradient(180deg,#091829_0%,#10213a_100%)]"

  if (variant === "template") {
    return (
      <div className={boardClassName}>
        <div className="absolute inset-4 rounded-[1rem] border border-[#8ecfff]/20 bg-[#08111d]" />
        <div className="absolute left-8 top-8 rounded-full bg-[#10243a] px-3 py-1 font-mono text-xs text-[#8ecfff]">
          print at 100%
        </div>
        <div className="absolute left-10 top-20 h-px w-56 border-t border-dashed border-[#8ecfff]" />
        <div className="absolute left-10 top-28 h-px w-56 border-t border-dashed border-[#8ecfff]" />
        <div className="absolute left-10 top-28 h-1 w-20 rotate-[45deg] rounded-full bg-[#bfe6ff]" />
        <div className="absolute left-20 top-20 h-1 w-20 -rotate-[45deg] rounded-full bg-[#bfe6ff]" />
        <div className="absolute left-[7.5rem] top-28 h-1 w-20 rotate-[45deg] rounded-full bg-[#bfe6ff]" />
        <div className="absolute right-10 bottom-8 rounded-full bg-[#fff4b8] px-3 py-1 font-mono text-xs text-[#5a4104]">
          1 in check bar
        </div>
      </div>
    )
  }

  if (variant === "truss") {
    return (
      <div className={boardClassName}>
        <div className="absolute bottom-14 left-12 right-12 h-3 rounded-full bg-[#7dd0ff]" />
        <div className="absolute bottom-[7.5rem] left-12 right-12 h-3 rounded-full bg-[#ffb87d]" />
        <div className="absolute bottom-[5.7rem] left-[4.5rem] h-24 w-1 rotate-[58deg] rounded-full bg-[#d7edff]" />
        <div className="absolute bottom-[5.9rem] left-[11.8rem] h-24 w-1 -rotate-[58deg] rounded-full bg-[#d7edff]" />
        <div className="absolute bottom-[5.9rem] left-[19rem] h-24 w-1 rotate-[58deg] rounded-full bg-[#d7edff]" />
        <div className="absolute bottom-[5.9rem] left-[26.2rem] h-24 w-1 -rotate-[58deg] rounded-full bg-[#d7edff]" />
      </div>
    )
  }

  if (variant === "gusset") {
    return (
      <div className={boardClassName}>
        <div className="absolute bottom-14 left-12 right-12 h-3 rounded-full bg-[#7dd0ff]" />
        <div className="absolute bottom-[7.5rem] left-12 right-12 h-3 rounded-full bg-[#ffb87d]" />
        <div className="absolute bottom-[5.7rem] left-[4.5rem] h-24 w-1 rotate-[58deg] rounded-full bg-[#d7edff]" />
        <div className="absolute bottom-[5.9rem] left-[11.8rem] h-24 w-1 -rotate-[58deg] rounded-full bg-[#d7edff]" />
        <div className="absolute bottom-[5.9rem] left-[19rem] h-24 w-1 rotate-[58deg] rounded-full bg-[#d7edff]" />
        <div className="absolute bottom-[5.9rem] left-[26.2rem] h-24 w-1 -rotate-[58deg] rounded-full bg-[#d7edff]" />
        <div className="absolute bottom-[4.7rem] left-[10.7rem] h-8 w-8 rotate-45 bg-[#fff4b8]" />
        <div className="absolute bottom-[4.7rem] left-[25rem] h-8 w-8 rotate-45 bg-[#fff4b8]" />
      </div>
    )
  }

  if (variant === "assembly") {
    return (
      <div className={boardClassName}>
        <div className="absolute left-8 top-10 h-28 w-20 rounded-[1rem] border border-[#8ecfff]/25 bg-[#14314f]" />
        <div className="absolute left-14 top-16 h-1 w-12 rotate-[54deg] rounded-full bg-[#bfe6ff]" />
        <div className="absolute left-14 top-28 h-1 w-12 -rotate-[54deg] rounded-full bg-[#bfe6ff]" />
        <div className="absolute right-8 top-10 h-28 w-20 rounded-[1rem] border border-[#8ecfff]/25 bg-[#14314f]" />
        <div className="absolute right-14 top-16 h-1 w-12 rotate-[54deg] rounded-full bg-[#bfe6ff]" />
        <div className="absolute right-14 top-28 h-1 w-12 -rotate-[54deg] rounded-full bg-[#bfe6ff]" />
        <div className="absolute left-[32%] top-20 h-px w-14 border-t border-dashed border-white/30" />
        <div className="absolute right-[32%] top-20 h-px w-14 border-t border-dashed border-white/30" />
      </div>
    )
  }

  if (variant === "bracing") {
    return (
      <div className={boardClassName}>
        <div className="absolute bottom-[4.5rem] left-10 right-10 h-3 rounded-full bg-[#ffe08c]" />
        <div className="absolute top-16 left-[22%] h-2 w-14 rounded-full bg-[#c9b7ff]" />
        <div className="absolute top-16 left-[42%] h-2 w-14 rounded-full bg-[#c9b7ff]" />
        <div className="absolute top-16 left-[62%] h-2 w-14 rounded-full bg-[#c9b7ff]" />
        <div className="absolute left-12 top-[5.5rem] h-24 w-4 rounded-full bg-[#7dd0ff]" />
        <div className="absolute right-12 top-[5.5rem] h-24 w-4 rounded-full bg-[#7dd0ff]" />
      </div>
    )
  }

  return (
    <div className={boardClassName}>
      <div className="absolute bottom-14 left-12 right-12 h-3 rounded-full bg-[#7dd0ff]" />
      <div className="absolute bottom-[7.5rem] left-12 right-12 h-3 rounded-full bg-[#ffb87d]" />
      <div className="absolute left-1/2 top-10 -translate-x-1/2 text-[#ffe08c]">
        <p className="text-xs font-black uppercase tracking-[0.18em]">weight</p>
        <p className="text-center text-2xl">↓</p>
      </div>
      <div className="absolute left-8 bottom-6 rounded-full bg-[#10243a] px-3 py-1 font-mono text-xs text-[#8ecfff]">
        watch the top squash
      </div>
      <div className="absolute right-8 bottom-6 rounded-full bg-[#10243a] px-3 py-1 font-mono text-xs text-[#8ecfff]">
        watch the bottom stretch
      </div>
    </div>
  )
}
