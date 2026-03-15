"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import {
  ArrowLeft,
  ArrowUp,
  Atom,
  ChartColumn,
  Clock,
  Droplets,
  FlaskConical,
  Mountain,
  Package,
  Scale,
  Sparkles,
  Star,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { ProjectGuide } from "@/lib/project-guides"

type LabItem = {
  name: string
  amount: string
  note: string
  icon: LucideIcon
  accent: string
}

type FieldStep = {
  id: string
  title: string
  stage: string
  icon: LucideIcon
  summary: string
  observation: string
  whyItMatters: string
}

type ScienceTerm = {
  term: string
  description: string
}

type TrialRow = {
  id: number
  vinegar: string
  height: string
  note: string
}

const labItems: LabItem[] = [
  {
    name: "baking_soda",
    amount: "2-3 spoonfuls",
    note: "Your powdered base. It brings the bicarbonate that helps make carbon dioxide gas.",
    icon: FlaskConical,
    accent: "from-[#f7f3ec] to-[#d8d1c9]",
  },
  {
    name: "vinegar",
    amount: "1/2 to 1 cup",
    note: "Your acid. Vinegar carries acetic acid into the reaction chamber.",
    icon: Droplets,
    accent: "from-[#fce8d7] to-[#f5b179]",
  },
  {
    name: "dish_soap",
    amount: "1 squirt",
    note: "The foam helper. Soap lowers surface tension so bubbles stay trapped longer.",
    icon: Sparkles,
    accent: "from-[#d8f7ef] to-[#8fe3ca]",
  },
  {
    name: "volcano_shell",
    amount: "1 clay mountain",
    note: "The outside structure. It turns the bottle into a dramatic volcano shape.",
    icon: Mountain,
    accent: "from-[#d7d3d0] to-[#8f847d]",
  },
  {
    name: "bottle_chamber",
    amount: "1 small bottle",
    note: "The reaction chamber where the liquid, gas, and foam build up together.",
    icon: Package,
    accent: "from-[#dcecff] to-[#8fb9f4]",
  },
  {
    name: "measuring_tools",
    amount: "tray + ruler",
    note: "Your scientist tools for mess control and real experiment data collection.",
    icon: ChartColumn,
    accent: "from-[#efe3ff] to-[#c59bff]",
  },
]

const fieldSteps: FieldStep[] = [
  {
    id: "volcano-step-1",
    title: "Build base camp",
    stage: "Setup",
    icon: Package,
    summary:
      "Place your bottle in the center of a tray so your eruption zone stays contained.",
    observation:
      "Before you add anything, sketch your volcano. How wide is the base and how tall is the bottle?",
    whyItMatters:
      "Controlling the mess is part of good science. A tray also makes it easier to compare eruptions later.",
  },
  {
    id: "volcano-step-2",
    title: "Shape the mountain",
    stage: "Structure",
    icon: Mountain,
    summary:
      "Wrap clay, dough, or foil around the bottle to build the volcano shell, but keep the opening clear.",
    observation:
      "Look at the cutaway shape. Where is the hidden bottle? How might that narrow opening change the lava flow?",
    whyItMatters:
      "The shell does not cause the reaction, but it channels the foam so the eruption looks taller and more focused.",
  },
  {
    id: "volcano-step-3",
    title: "Load the chamber",
    stage: "Chemicals",
    icon: FlaskConical,
    summary:
      "Add baking soda, then dish soap, then a few drops of food coloring into the bottle.",
    observation:
      "What changes right away and what stays the same? Notice that nothing erupts yet because the acid has not arrived.",
    whyItMatters:
      "This is your starting mixture. Soap is already preparing to trap gas in stretchy bubble walls.",
  },
  {
    id: "volcano-step-4",
    title: "Measure the acid",
    stage: "Control",
    icon: Scale,
    summary:
      "Choose a vinegar amount for your trial and write it down before you pour.",
    observation:
      "Predict first: will more vinegar always mean a taller eruption, or is there a limit?",
    whyItMatters:
      "A scientist changes one variable at a time. Recording the volume lets you compare trials instead of guessing.",
  },
  {
    id: "volcano-step-5",
    title: "Trigger the eruption",
    stage: "Reaction",
    icon: ArrowUp,
    summary:
      "Pour the vinegar in and watch the foam surge up and out of the crater.",
    observation:
      "Listen for fizzing, watch the foam speed, and gently touch the outside of the bottle after the eruption. Does it feel cooler?",
    whyItMatters:
      "This is where gas pressure builds fast. The mixture often feels cooler because the process absorbs heat from the surroundings.",
  },
  {
    id: "volcano-step-6",
    title: "Measure and compare",
    stage: "Data",
    icon: ChartColumn,
    summary:
      "Measure how high the foam reached and record the result in your experiment table.",
    observation:
      "Did the soap make the foam tall and puffy, or thin and quick? Compare one trial with another.",
    whyItMatters:
      "When you measure results, you stop doing a craft and start doing an experiment.",
  },
]

const scienceTerms: ScienceTerm[] = [
  {
    term: "Gas pressure",
    description:
      "Real volcanoes and this model both build pressure when gas gets trapped and pushes upward.",
  },
  {
    term: "Surface tension",
    description:
      "Soap lowers surface tension, so carbon dioxide gas gets trapped in more bubbles instead of escaping all at once.",
  },
  {
    term: "Endothermic cooling",
    description:
      "The mixture often feels colder because the reaction absorbs some heat from its surroundings.",
  },
  {
    term: "Control variable",
    description:
      "Scientists change one thing at a time, like vinegar volume, so the results actually mean something.",
  },
]

const reactionSteps = {
  step1: {
    title: "Step 1: Acid-Base Reaction",
    subtitle: "Parts get exchanged",
    description:
      "Acetic acid from vinegar and sodium bicarbonate from baking soda trade pieces. That makes sodium acetate and carbonic acid.",
    detail:
      "This is the chemistry engine switching on. The liquid acid reaches the powder, dissolves it, and starts building a new set of molecules.",
  },
  step2: {
    title: "Step 2: Decomposition",
    subtitle: "An unstable molecule falls apart",
    description:
      "Carbonic acid is unstable, so it immediately breaks into water and carbon dioxide gas.",
    detail:
      "The carbon dioxide is the dramatic part you can see. Gas expands and escapes upward, and the soap traps it into thick foamy lava.",
  },
} as const

export function BakingSodaVolcanoGuide({ project }: { project: ProjectGuide }) {
  const [activeStep, setActiveStep] = useState(0)
  const [reactionPhase, setReactionPhase] = useState<"step1" | "step2">("step1")
  const [bubbleTick, setBubbleTick] = useState(0)
  const [rows, setRows] = useState<TrialRow[]>([
    { id: 1, vinegar: "30", height: "", note: "" },
    { id: 2, vinegar: "60", height: "", note: "" },
    { id: 3, vinegar: "90", height: "", note: "" },
  ])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setBubbleTick((current) => (current + 1) % 12)
    }, 240)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const updateActiveStep = () => {
      let current = 0

      fieldSteps.forEach((step, index) => {
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

  const progress = ((activeStep + 1) / fieldSteps.length) * 100
  const activePrompt = fieldSteps[activeStep]?.observation ?? ""
  const tallestTrial = rows.reduce<TrialRow | null>((best, row) => {
    const height = Number.parseFloat(row.height)

    if (Number.isNaN(height)) {
      return best
    }

    if (!best) {
      return row
    }

    return height > Number.parseFloat(best.height) ? row : best
  }, null)

  return (
    <div className="bg-[#f3efe9] text-slate-900">
      <section className="relative overflow-hidden bg-[#0b0a0d] text-white">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,138,76,0.18), transparent 18%), radial-gradient(circle at 80% 16%, rgba(160,160,160,0.12), transparent 16%), repeating-radial-gradient(circle at 40% 30%, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.02) 2px, transparent 10px, transparent 28px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(8,8,10,0.96), rgba(24,24,28,0.95) 40%, rgba(52,29,20,0.95) 72%, rgba(96,39,16,0.88))",
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
              <div className="inline-flex items-center gap-2 rounded-full bg-[#ffb26f] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-[#351a08]">
                Geological Connection
              </div>
              <h1 className="mt-5 text-5xl font-black tracking-tight text-white md:text-6xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/82">
                Real volcanoes build pressure when gas collects inside magma. Your mini volcano does
                something similar with carbon dioxide gas, so this project lets you see a giant
                Earth science idea in a tabletop experiment.
              </p>

              <div className="mt-7 flex flex-wrap gap-3 text-sm text-white/90">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2">
                  <Star className="h-4 w-4 text-[#ffcf7a]" />
                  {project.difficulty}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2">
                  <Clock className="h-4 w-4 text-[#8dd8ff]" />
                  {project.time}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2 font-mono">
                  <Atom className="h-4 w-4 text-[#9df0c8]" />
                  CO2 pressure + foam
                </span>
              </div>

              <GeoNote title="Real-World Link" tone="lava" className="mt-8 max-w-sm lg:ml-8">
                This model is not real magma, but the pressure story is similar. Gas trapped in a
                tight space pushes upward until it can escape.
              </GeoNote>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-white/10 bg-[#151419]/85 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.4)] backdrop-blur">
                <div className="flex items-center justify-between rounded-[1.4rem] border border-white/8 bg-[#111116] px-4 py-3">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#ffb26f]">
                    Field Cross-Section
                  </span>
                  <span className="rounded-full bg-white/8 px-3 py-1 font-mono text-[11px] text-white/62">
                    bottle inside mountain
                  </span>
                </div>
                <div className="mt-4 rounded-[1.6rem] bg-[linear-gradient(180deg,#16161d_0%,#221611_100%)] p-4">
                  <VolcanoCutawayDiagram bubbleTick={bubbleTick} />
                </div>
              </div>

              <GeoNote title="Scientist Cue" tone="ash" className="mt-6 max-w-xs lg:ml-auto">
                The bottle is your hidden reaction chamber. The narrow crater helps the foam rise in
                a dramatic column instead of spilling flat right away.
              </GeoNote>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#ede6dc]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1f1d21] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-white">
              The Lab Kit
            </div>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-[#1e2128]">
              Gather your materials like a real geology lab.
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#59606b]">
              Use the monospace labels like a scientist checklist. Each material has a job in the
              reaction, in the volcano shape, or in the data collection.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {labItems.map((item, index) => {
              const Icon = item.icon

              return (
                <div
                  key={item.name}
                  className={`rounded-[1.8rem] bg-gradient-to-br ${item.accent} p-6 shadow-[0_20px_60px_rgba(24,27,31,0.10)] ${
                    index % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]"
                  } transition-transform hover:-translate-y-1 hover:rotate-0`}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/55 text-[#20252e] shadow-sm">
                    <Icon className="h-7 w-7" />
                  </div>
                  <p className="mt-5 font-mono text-xs font-black uppercase tracking-[0.18em] text-[#3a3130]">
                    {item.name}
                  </p>
                  <p className="mt-2 font-mono text-sm font-bold text-[#251b1a]">{item.amount}</p>
                  <p className="mt-3 text-sm leading-7 text-[#423e3d]">{item.note}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#121215] text-white">
        <div
          className="absolute inset-0 opacity-18"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#ffb26f]/12 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-[#ffb26f]">
                The Chemical Engine
              </div>
              <h2 className="mt-5 text-4xl font-black tracking-tight">
                The eruption is really a two-step chemistry story.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/76">
                Instead of thinking "vinegar plus baking soda makes bubbles," zoom in on the real
                sequence. First the acid and base exchange parts. Then an unstable molecule falls
                apart and releases carbon dioxide gas.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setReactionPhase("step1")}
                  className={`rounded-full px-5 py-3 text-sm font-bold transition-colors ${
                    reactionPhase === "step1"
                      ? "bg-[#ffb26f] text-[#2b1609]"
                      : "bg-white/8 text-white hover:bg-white/12"
                  }`}
                >
                  Step 1: acid-base reaction
                </button>
                <button
                  type="button"
                  onClick={() => setReactionPhase("step2")}
                  className={`rounded-full px-5 py-3 text-sm font-bold transition-colors ${
                    reactionPhase === "step2"
                      ? "bg-[#9df0c8] text-[#08281b]"
                      : "bg-white/8 text-white hover:bg-white/12"
                  }`}
                >
                  Step 2: decomposition
                </button>
              </div>

              <div className="mt-6 rounded-[1.8rem] bg-white/8 p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8dd8ff]">
                  {reactionSteps[reactionPhase].subtitle}
                </p>
                <h3 className="mt-3 text-2xl font-black">{reactionSteps[reactionPhase].title}</h3>
                <p className="mt-4 text-base leading-8 text-white/82">
                  {reactionSteps[reactionPhase].description}
                </p>
                <p className="mt-4 text-sm leading-7 text-white/64">
                  {reactionSteps[reactionPhase].detail}
                </p>
              </div>

              <div className="mt-6 rounded-[1.8rem] border border-[#ffb26f]/16 bg-[#0b0b0f] p-6 shadow-inner">
                <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-[#ffb26f]">
                  Chemical Equation
                </p>
                <div className="mt-4 overflow-x-auto">
                  <div className="min-w-max font-mono text-lg leading-8 text-white">
                    NaHCO<sub>3</sub> (s) + CH<sub>3</sub>COOH (aq) -&gt; CH<sub>3</sub>COONa
                    (aq) + H<sub>2</sub>O (l) + CO<sub>2</sub> (g)
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <GeoNote title="Bottle gets cooler" tone="ice">
                  The mixture often feels colder because the reaction absorbs some heat from its
                  surroundings. That cooling clue tells you energy is moving during the reaction.
                </GeoNote>
                <GeoNote title="The Variable Factor" tone="soap">
                  Dish soap does more than make extra bubbles. It lowers surface tension, traps more
                  CO2, and turns a quick fizz into thick foamy lava.
                </GeoNote>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-[#0d0d12] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.28)]">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9df0c8]">
                  Molecular View
                </p>
                <div className="mt-4 rounded-[1.6rem] bg-[#14141b] p-4">
                  <MolecularView phase={reactionPhase} bubbleTick={bubbleTick} />
                </div>
              </div>

              <GeoNote title="Macro to Micro" tone="ash">
                On the outside, you see foamy lava climbing the mountain. On the inside, tiny CO2
                gas molecules are breaking free from the liquid and pushing their way out.
              </GeoNote>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f6f0e5]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[2rem] border border-[#d5c8b7] bg-white/75 p-6 backdrop-blur">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#211c1b] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-white">
                  The Field Guide
                </div>
                <h2 className="mt-4 text-3xl font-black text-[#221c1a]">Observation Tracker</h2>
                <p className="mt-3 text-sm leading-7 text-[#5f5a56]">
                  This project becomes deeper when you pause and notice what the materials are doing
                  at each stage.
                </p>

                <div className="mt-5">
                  <Progress
                    value={progress}
                    className="h-3 bg-[#e7ddd0] [&_[data-slot=progress-indicator]]:bg-[#ea7d37]"
                  />
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-[#73675d]">
                    Step {activeStep + 1} of {fieldSteps.length}
                  </p>
                </div>

                <div className="mt-6 rounded-[1.6rem] bg-[#1b1a1d] p-4">
                  <VolcanoCutawayDiagram bubbleTick={bubbleTick} compact />
                </div>

                <div className="mt-6 rounded-[1.6rem] bg-[#fff1cf] px-4 py-4 text-[#5c3f09] shadow-sm">
                  <p className="text-xs font-black uppercase tracking-[0.18em]">Current prompt</p>
                  <p className="mt-2 text-sm leading-7">{activePrompt}</p>
                </div>

                <div className="mt-6 space-y-3">
                  {scienceTerms.map((term) => (
                    <div key={term.term} className="rounded-[1.4rem] bg-[#f0e7db] px-4 py-4">
                      <p className="font-mono text-sm font-bold text-[#221c1a]">{term.term}</p>
                      <p className="mt-2 text-sm leading-6 text-[#605750]">{term.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div className="relative space-y-8 before:absolute before:left-7 before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-gradient-to-b before:from-[#ea7d37] before:via-[#7b6a60]/40 before:to-transparent">
              {fieldSteps.map((step) => {
                const Icon = step.icon

                return (
                  <article
                    key={step.id}
                    id={step.id}
                    className="scroll-mt-28 rounded-[2rem] border border-[#d5c8b7] bg-white p-6 shadow-[0_20px_60px_rgba(40,35,31,0.08)]"
                  >
                    <div className="flex items-start gap-4">
                      <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#ea7d37] text-white shadow-lg">
                        <Icon className="h-6 w-6" />
                      </span>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#9a6b44]">
                          {step.stage}
                        </p>
                        <h3 className="mt-2 text-3xl font-black text-[#221c1a]">{step.title}</h3>
                        <p className="mt-3 text-base leading-8 text-[#5e5953]">{step.summary}</p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                      <div className="rounded-[1.7rem] bg-[#1a191d] p-5 text-white">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8dd8ff]">
                          Observation prompt
                        </p>
                        <p className="mt-3 text-base leading-8 text-white/82">{step.observation}</p>
                      </div>

                      <div className="rounded-[1.7rem] bg-[#fff1cf] px-5 py-5 text-[#4f3a12]">
                        <p className="text-xs font-black uppercase tracking-[0.18em]">
                          Why scientists care
                        </p>
                        <p className="mt-3 text-sm leading-7">{step.whyItMatters}</p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#120d0c] text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 15% 20%, rgba(255,128,64,0.16), transparent 15%), radial-gradient(circle at 82% 18%, rgba(255,211,141,0.14), transparent 14%), linear-gradient(180deg, rgba(18,13,12,0.98), rgba(37,19,12,0.98))",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 xl:grid-cols-[1.08fr_0.92fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#ffb26f]/12 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-[#ffb26f]">
                Challenge Mode
              </div>
              <h2 className="mt-5 text-4xl font-black tracking-tight">
                Turn it into a real experiment with a data table.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/76">
                Record vinegar volume and eruption height for each trial. Then look for patterns
                instead of just saying, "That one looked bigger."
              </p>

              <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[#1b1413] shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
                <div className="overflow-x-auto">
                  <table className="min-w-full font-mono text-sm">
                    <thead className="bg-[#241917] text-[#ffcf9e]">
                      <tr>
                        <th className="px-4 py-3 text-left">trial</th>
                        <th className="px-4 py-3 text-left">vinegar_ml</th>
                        <th className="px-4 py-3 text-left">height_cm</th>
                        <th className="px-4 py-3 text-left">notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, index) => (
                        <tr key={row.id} className="border-t border-white/8">
                          <td className="px-4 py-3 text-[#f4e9db]">{index + 1}</td>
                          <td className="px-4 py-3">
                            <input
                              value={row.vinegar}
                              onChange={(event) =>
                                setRows((current) =>
                                  current.map((entry) =>
                                    entry.id === row.id
                                      ? { ...entry, vinegar: event.target.value }
                                      : entry,
                                  ),
                                )
                              }
                              className="w-24 rounded-xl border border-white/10 bg-[#2a1f1d] px-3 py-2 text-[#f4e9db] outline-none transition-colors focus:border-[#ffb26f]"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              value={row.height}
                              onChange={(event) =>
                                setRows((current) =>
                                  current.map((entry) =>
                                    entry.id === row.id
                                      ? { ...entry, height: event.target.value }
                                      : entry,
                                  ),
                                )
                              }
                              className="w-24 rounded-xl border border-white/10 bg-[#2a1f1d] px-3 py-2 text-[#f4e9db] outline-none transition-colors focus:border-[#9df0c8]"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              value={row.note}
                              onChange={(event) =>
                                setRows((current) =>
                                  current.map((entry) =>
                                    entry.id === row.id
                                      ? { ...entry, note: event.target.value }
                                      : entry,
                                  ),
                                )
                              }
                              className="w-full min-w-40 rounded-xl border border-white/10 bg-[#2a1f1d] px-3 py-2 text-[#f4e9db] outline-none transition-colors focus:border-[#8dd8ff]"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-white/8 px-4 py-4">
                  <button
                    type="button"
                    onClick={() =>
                      setRows((current) => [
                        ...current,
                        { id: current.length + 1, vinegar: "", height: "", note: "" },
                      ])
                    }
                    className="rounded-full bg-[#ffb26f] px-5 py-3 text-sm font-bold text-[#2b1609] transition-transform hover:scale-[1.02]"
                  >
                    Add another trial
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <GeoNote title="Result spotlight" tone="lava">
                {tallestTrial ? (
                  <>
                    Tallest recorded eruption so far: <strong>{tallestTrial.height} cm</strong> with{" "}
                    <strong>{tallestTrial.vinegar} mL</strong> of vinegar.
                  </>
                ) : (
                  <>
                    Fill in your table to discover which vinegar amount made the tallest eruption.
                  </>
                )}
              </GeoNote>

              <GeoNote title="Scientist question" tone="soap">
                Which setup was brighter, taller, or slower? Was vinegar the only variable that
                changed, or did your clay shape, soap amount, and bottle size change too?
              </GeoNote>

              <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8dd8ff]">
                  Bonus comparison
                </p>
                <h3 className="mt-3 text-2xl font-black">Try one trial with no soap.</h3>
                <p className="mt-4 text-sm leading-7 text-white/76">
                  The fizz still happens, but the foam is usually shorter and less dramatic because
                  fewer gas bubbles stay trapped together. That is the surface tension story in
                  action.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function GeoNote({
  title,
  tone,
  className = "",
  children,
}: {
  title: string
  tone: "lava" | "ash" | "ice" | "soap"
  className?: string
  children: ReactNode
}) {
  const tones = {
    lava: "bg-[#ffcf9e] text-[#4a2206]",
    ash: "bg-[#d9d4d0] text-[#2f2c2b]",
    ice: "bg-[#dceeff] text-[#16354f]",
    soap: "bg-[#d8f7ef] text-[#144438]",
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

function VolcanoCutawayDiagram({
  bubbleTick,
  compact = false,
}: {
  bubbleTick: number
  compact?: boolean
}) {
  const bubbles = [
    { x: 208, y: 178 },
    { x: 222, y: 162 },
    { x: 240, y: 148 },
    { x: 252, y: 132 },
    { x: 265, y: 116 },
    { x: 278, y: 100 },
  ]

  return (
    <svg viewBox="0 0 420 280" className={compact ? "h-52 w-full" : "h-[360px] w-full"}>
      <defs>
        <linearGradient id="lavaGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffcc7a" />
          <stop offset="100%" stopColor="#ef5d20" />
        </linearGradient>
        <linearGradient id="rockFace" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3d3836" />
          <stop offset="100%" stopColor="#191618" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="420" height="280" rx="24" fill="#17171d" />
      <path
        d="M40 242 C110 175 138 88 210 44 C278 88 308 176 380 242 Z"
        fill="url(#rockFace)"
        stroke="#6e635d"
        strokeWidth="3"
      />
      <path d="M150 242 L150 100 Q150 86 164 86 L256 86 Q270 86 270 100 L270 242 Z" fill="#a0d0ff" opacity="0.45" />
      <path d="M165 242 L165 176 Q165 162 177 162 L243 162 Q255 162 255 176 L255 242 Z" fill="url(#lavaGlow)" opacity="0.92" />
      <path d="M200 58 L220 58 L234 86 L186 86 Z" fill="#1e1c20" />
      <path d="M170 70 L250 70" stroke="#8a807a" strokeWidth="5" strokeLinecap="round" />

      {bubbles.map((bubble, index) => {
        const offset = (bubbleTick + index * 2) % 12
        const y = bubble.y - offset * 2
        return (
          <circle
            key={`${bubble.x}-${bubble.y}`}
            cx={bubble.x}
            cy={y}
            r={compact ? 4 : 6}
            fill={index % 2 === 0 ? "#ffcc7a" : "#fff4d7"}
            opacity={0.75}
          />
        )
      })}

      <path
        d="M182 60 C186 20 234 20 238 60"
        fill="none"
        stroke="#ffb26f"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {!compact ? (
        <>
          <text x="38" y="46" fill="#ffcf9e" fontSize="14" fontWeight="800">
            clay shell
          </text>
          <line x1="110" y1="52" x2="144" y2="78" stroke="#ffcf9e" strokeWidth="2" />

          <text x="282" y="108" fill="#8dd8ff" fontSize="14" fontWeight="800">
            bottle chamber
          </text>
          <line x1="286" y1="114" x2="254" y2="132" stroke="#8dd8ff" strokeWidth="2" />

          <text x="278" y="168" fill="#9df0c8" fontSize="14" fontWeight="800">
            baking soda + soap
          </text>
          <line x1="278" y1="174" x2="244" y2="188" stroke="#9df0c8" strokeWidth="2" />

          <text x="56" y="198" fill="#ffcf9e" fontSize="14" fontWeight="800">
            CO2 bubbles rising
          </text>
          <line x1="152" y1="194" x2="194" y2="154" stroke="#ffcf9e" strokeWidth="2" />
        </>
      ) : null}
    </svg>
  )
}

function MolecularView({
  phase,
  bubbleTick,
}: {
  phase: "step1" | "step2"
  bubbleTick: number
}) {
  const bubbles = [
    { x: 292, y: 170 },
    { x: 308, y: 152 },
    { x: 326, y: 132 },
    { x: 340, y: 112 },
  ]

  return (
    <svg viewBox="0 0 420 260" className="h-[320px] w-full">
      <rect x="8" y="8" width="404" height="244" rx="24" fill="#101018" />

      {phase === "step1" ? (
        <>
          <MoleculeCluster x={90} y={128} label="NaHCO3" color="#8dd8ff" />
          <MoleculeCluster x={210} y={128} label="CH3COOH" color="#ffcf9e" />
          <path d="M142 128 H172" stroke="#ffffff" strokeWidth="3" strokeDasharray="6 6" />
          <text x="150" y="104" fill="#9df0c8" fontSize="14" fontWeight="800">
            swap parts
          </text>
          <path d="M246 128 H276" stroke="#9df0c8" strokeWidth="3" markerEnd="url(#arrowhead)" />
          <MoleculeCluster x={322} y={98} label="NaOAc" color="#c59bff" />
          <MoleculeCluster x={322} y={170} label="H2CO3" color="#9df0c8" />
        </>
      ) : (
        <>
          <MoleculeCluster x={118} y={132} label="H2CO3" color="#9df0c8" />
          <path d="M170 132 H206" stroke="#ffcf9e" strokeWidth="3" markerEnd="url(#arrowhead)" />
          <MoleculeCluster x={248} y={96} label="H2O" color="#8dd8ff" />
          <MoleculeCluster x={248} y={172} label="CO2" color="#ffb26f" />
          {bubbles.map((bubble, index) => {
            const y = bubble.y - ((bubbleTick + index * 3) % 10) * 2
            return (
              <circle
                key={`${bubble.x}-${bubble.y}`}
                cx={bubble.x}
                cy={y}
                r={6}
                fill="#ffe3b0"
                opacity={0.8}
              />
            )
          })}
          <text x="286" y="198" fill="#ffe3b0" fontSize="14" fontWeight="800">
            gas escapes
          </text>
        </>
      )}

      <defs>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <polygon points="0 0, 8 4, 0 8" fill="#9df0c8" />
        </marker>
      </defs>
    </svg>
  )
}

function MoleculeCluster({
  x,
  y,
  label,
  color,
}: {
  x: number
  y: number
  label: string
  color: string
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx="0" cy="0" r="26" fill={color} opacity="0.95" />
      <circle cx="-28" cy="16" r="14" fill={color} opacity="0.72" />
      <circle cx="28" cy="12" r="14" fill={color} opacity="0.72" />
      <circle cx="12" cy="-24" r="12" fill={color} opacity="0.8" />
      <text x="0" y="5" fill="#07131f" fontSize="13" fontWeight="900" textAnchor="middle">
        {label}
      </text>
    </g>
  )
}
