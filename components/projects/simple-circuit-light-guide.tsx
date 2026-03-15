"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import {
  ArrowLeft,
  BatteryFull,
  BookOpen,
  Cable,
  CheckCircle2,
  CircleHelp,
  CircuitBoard,
  Clock,
  Lightbulb,
  Sparkles,
  Star,
  ToggleLeft,
  Wrench,
  Zap,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ProjectGuide } from "@/lib/project-guides"

type Material = {
  name: string
  detail: string
  icon: LucideIcon
  tone: string
}

type BuildStep = {
  id: string
  title: string
  instruction: string
  why: string
  science: string
  troubleshoot: string[]
}

type ComponentFact = {
  id: string
  name: string
  icon: LucideIcon
  summary: string
  deepDive: string
}

type QuizQuestion = {
  id: string
  question: string
  options: {
    id: string
    label: string
    explanation: string
    correct: boolean
  }[]
}

const learnTopics = [
  "Polarity",
  "Continuity",
  "Electron flow",
  "LED basics",
  "Troubleshooting",
]

const labMaterials: Material[] = [
  {
    name: "LED Light",
    detail: "The star of the build. It glows only when polarity is correct.",
    icon: Lightbulb,
    tone: "from-[#fff2a8] to-[#ffd96b]",
  },
  {
    name: "Battery",
    detail: "Your energy source. It gives the circuit its electric push.",
    icon: BatteryFull,
    tone: "from-[#bfdcff] to-[#76a8ff]",
  },
  {
    name: "Wires",
    detail: "Metal pathways that help electrons travel around the loop.",
    icon: Cable,
    tone: "from-[#b2f2e5] to-[#48d2b4]",
  },
  {
    name: "Switch",
    detail: "Opens and closes the path so you can control the light.",
    icon: ToggleLeft,
    tone: "from-[#e7d3ff] to-[#b88cff]",
  },
  {
    name: "Tape",
    detail: "Keeps the metal parts touching so continuity stays strong.",
    icon: Wrench,
    tone: "from-[#ffd8c2] to-[#ff9961]",
  },
  {
    name: "Resistor",
    detail: "Optional for beginners, but it protects LEDs in stronger circuits.",
    icon: Zap,
    tone: "from-[#ffd4de] to-[#ff7f9f]",
  },
]

const buildSteps: BuildStep[] = [
  {
    id: "step-1",
    title: "Inspect your circuit parts",
    instruction:
      "Place your battery, wires, LED, and switch on the table. Find the plus and minus ends on the battery and the long and short legs on the LED.",
    why:
      "You are making a map before you build. Knowing which side is which keeps your circuit from getting mixed up.",
    science:
      "LED stands for Light Emitting Diode. A diode is like a one-way gate, so electricity can only move through it in the correct direction.",
    troubleshoot: [
      "If the LED legs look the same, compare them in bright light. The longer leg is usually the positive anode.",
      "If your battery does not have a clear label, ask an adult to help you spot the positive and negative terminals before connecting anything.",
    ],
  },
  {
    id: "step-2",
    title: "Connect the high-pressure side",
    instruction:
      "Attach one wire from the positive side of the battery to the long leg of the LED.",
    why:
      "This creates the high-pressure side of your circuit. Just like water flowing downhill, electricity wants to move from high pressure to low pressure.",
    science:
      "A battery creates voltage, which is a difference in electrical pressure. That pressure is what pushes charge through the circuit once the loop closes.",
    troubleshoot: [
      "If the wire slips off, wrap tape around the connection so the metal parts keep touching.",
      "If the LED still will not light later, this is the first place to recheck. Make sure the long leg is really on the positive side.",
    ],
  },
  {
    id: "step-3",
    title: "Complete the loop",
    instruction:
      "Connect a second wire from the short leg of the LED back to the negative side of the battery.",
    why:
      "Now you are giving the electrons a full path home. No complete loop means no light.",
    science:
      "A complete path is called continuity. When continuity is broken by a loose wire or gap, the electrons cannot keep moving around the circuit.",
    troubleshoot: [
      "If the light flickers when you wiggle a wire, the metal is not making a strong connection.",
      "If nothing happens at all, look for a hidden gap where tape is covering the metal instead of holding it together.",
    ],
  },
  {
    id: "step-4",
    title: "Secure your connections",
    instruction:
      "Tape the wires gently so the LED legs and battery terminals stay connected without bending too much.",
    why:
      "Strong connections stop your circuit from breaking when you move it. Engineers call this making the build more reliable.",
    science:
      "Electricity travels best when metal touches metal. If a connection is loose, the path adds extra resistance and the LED may dim or shut off.",
    troubleshoot: [
      "Do not wrap tape over the whole LED bulb. Only tape the metal legs and wire ends.",
      "If you bent an LED leg too much, it may stop making good contact. Straighten it carefully or try a fresh LED.",
    ],
  },
  {
    id: "step-5",
    title: "Check the polarity",
    instruction:
      "If the LED does not light, flip the LED around so the long and short legs switch sides.",
    why:
      "LEDs are picky on purpose. They only work when their positive and negative ends face the right direction.",
    science:
      "Inside the LED, electrons and tiny particles called holes meet in a special material. When they meet, the LED releases energy as light.",
    troubleshoot: [
      "If the LED got hot or flashed once and stopped working, it may have burned out and need replacing.",
      "If you flip the LED and it still stays dark, go back to step 2 and step 3 to check every connection point.",
    ],
  },
  {
    id: "step-6",
    title: "Add a switch for control",
    instruction:
      "Break one wire connection and place your switch in that spot so you can open and close the path.",
    why:
      "A switch makes the mission feel real. Instead of taking the circuit apart, you decide when the loop is open or closed.",
    science:
      "A closed switch lets the charges move. An open switch creates a gap, and even a tiny gap is enough to stop the flow.",
    troubleshoot: [
      "If the light works before the switch but not after, the switch terminals may not be touching the metal parts.",
      "If you are using a paper-clip style switch, make sure the clip actually touches both metal contacts when it closes.",
    ],
  },
  {
    id: "step-7",
    title: "Test like an engineer",
    instruction:
      "Flip the switch on and off, explain the path of the electrons out loud, and show someone how your circuit works.",
    why:
      "Testing is part of engineering. You are proving that your design works and that you understand why it works.",
    science:
      "Electron flow goes from the negative terminal, through the wires and LED, and back to the positive terminal. Engineers often draw current the other way, so this is a great science secret to remember.",
    troubleshoot: [
      "If the light only works for a second, the battery may be low or a wire may be loose.",
      "If the switch feels confusing, trace the loop with your finger and say each part in order: battery, wire, LED, wire, switch, battery.",
    ],
  },
]

const componentFacts: ComponentFact[] = [
  {
    id: "battery",
    name: "Battery",
    icon: BatteryFull,
    summary: "The battery is the energy source. It gives the circuit its electric push.",
    deepDive:
      "The positive and negative ends have different electrical pressure. That difference is called voltage, and it is what gets the charges moving.",
  },
  {
    id: "led",
    name: "LED",
    icon: Lightbulb,
    summary:
      "The long leg is the positive anode and the short leg is the negative cathode. That is polarity.",
    deepDive:
      "LED means Light Emitting Diode. If you reverse it, the one-way path blocks the flow. If you skip resistance in a stronger circuit, the LED can burn out.",
  },
  {
    id: "wires",
    name: "Wires",
    icon: Cable,
    summary: "Wires are the road that electrons travel on. Metal inside the wire carries charge.",
    deepDive:
      "The plastic around the wire is an insulator. It protects you and keeps the electricity on the metal path instead of letting it escape into your fingers or table.",
  },
  {
    id: "switch",
    name: "Switch",
    icon: ToggleLeft,
    summary: "The switch is the traffic gate. Open means stop. Closed means go.",
    deepDive:
      "A switch is just a controlled gap. The tiny break matters because even a small gap can stop continuity and shut the whole circuit down.",
  },
  {
    id: "resistor",
    name: "Resistor",
    icon: Zap,
    summary: "A resistor is a bodyguard for your LED. It slows the current down.",
    deepDive:
      "With stronger batteries or bigger circuits, current can be too strong for an LED. A resistor adds safe resistance so the LED keeps glowing instead of burning out.",
  },
]

const troubleshootingQuestions: QuizQuestion[] = [
  {
    id: "quiz-1",
    question: "Your LED is dark, but the battery is new. What should you try first?",
    options: [
      {
        id: "flip-led",
        label: "Flip the LED around",
        explanation:
          "Correct. LEDs care about polarity, so swapping the long and short legs is the fastest first check.",
        correct: true,
      },
      {
        id: "add-more-tape",
        label: "Wrap the whole LED in tape",
        explanation:
          "Not quite. Too much tape can hide the metal parts instead of helping them touch.",
        correct: false,
      },
      {
        id: "remove-battery",
        label: "Take the battery away",
        explanation:
          "That stops the circuit even more. Try checking polarity and connections before removing the battery.",
        correct: false,
      },
    ],
  },
  {
    id: "quiz-2",
    question: "The light flickers when you move one wire. What went wrong?",
    options: [
      {
        id: "wire-loose",
        label: "The connection is loose",
        explanation:
          "Correct. Flickering usually means continuity is breaking for a moment because the metal parts are not touching well.",
        correct: true,
      },
      {
        id: "too-much-light",
        label: "The room is too bright",
        explanation:
          "The room brightness does not change the circuit. The problem is almost always at the connection point.",
        correct: false,
      },
      {
        id: "switch-backwards",
        label: "The switch is upside down",
        explanation:
          "The direction of the switch usually matters less than whether its metal contacts are actually closing the gap.",
        correct: false,
      },
    ],
  },
  {
    id: "quiz-3",
    question: "An LED flashed once and then stayed off in a stronger circuit. Why?",
    options: [
      {
        id: "burned-out",
        label: "It may have burned out without enough resistance",
        explanation:
          "Correct. Stronger circuits often need a resistor so the LED does not get too much current.",
        correct: true,
      },
      {
        id: "wants-water",
        label: "It needs water to cool off",
        explanation:
          "Nope. Water and circuits do not mix. Use a resistor instead of adding water.",
        correct: false,
      },
      {
        id: "too-many-wires",
        label: "It had too many colors of wire",
        explanation:
          "Wire color does not cause the LED to burn out. Current that is too strong is the bigger danger.",
        correct: false,
      },
    ],
  },
]

const flowDots = [
  { x: 138, y: 222 },
  { x: 192, y: 222 },
  { x: 248, y: 222 },
  { x: 305, y: 222 },
  { x: 362, y: 222 },
  { x: 380, y: 172 },
  { x: 380, y: 122 },
  { x: 333, y: 95 },
  { x: 275, y: 95 },
  { x: 217, y: 95 },
  { x: 160, y: 95 },
  { x: 130, y: 150 },
]

export function SimpleCircuitLightGuide({ project }: { project: ProjectGuide }) {
  const [activeStep, setActiveStep] = useState(0)
  const [flowIndex, setFlowIndex] = useState(0)
  const [selectedComponent, setSelectedComponent] = useState("led")
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [levelChoice, setLevelChoice] = useState<string | null>(null)

  useEffect(() => {
    const updateActiveStep = () => {
      let current = 0

      buildSteps.forEach((step, index) => {
        const element = document.getElementById(step.id)

        if (element && element.getBoundingClientRect().top <= window.innerHeight * 0.35) {
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
    const timer = window.setInterval(() => {
      setFlowIndex((current) => (current + 1) % flowDots.length)
    }, 260)

    return () => window.clearInterval(timer)
  }, [])

  const selectedFact =
    componentFacts.find((fact) => fact.id === selectedComponent) ?? componentFacts[0]
  const answeredCount = Object.keys(quizAnswers).length
  const correctAnswers = troubleshootingQuestions.filter((question) => {
    const picked = question.options.find((option) => option.id === quizAnswers[question.id])
    return picked?.correct
  }).length
  const progress = ((activeStep + 1) / buildSteps.length) * 100

  return (
    <div className="bg-[#f8fbff] text-slate-900">
      <section className="relative overflow-hidden bg-[#0b1730] text-white">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(95,209,249,0.28), transparent 28%), radial-gradient(circle at 85% 15%, rgba(255,202,88,0.24), transparent 22%), linear-gradient(135deg, rgba(11,23,48,0.98), rgba(13,56,105,0.92) 55%, rgba(27,132,145,0.9))",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/15"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.92fr]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#ffe37c] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-[#13284e]">
                The Mission
              </div>
              <h1 className="mt-5 text-5xl font-black tracking-tight text-white md:text-6xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/82">
                Build your first glowing circuit and think like a real electrical engineer. This
                page turns the project into a mini mission with clues, checkpoints, and lab tools
                you can explore as you go.
              </p>

              <div className="mt-7 flex flex-wrap gap-3 text-sm text-white/90">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                  <Star className="h-4 w-4 text-[#ffe37c]" />
                  {project.difficulty}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                  <Clock className="h-4 w-4 text-[#95f0ff]" />
                  {project.time}
                </span>
              </div>

              <div className="mt-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-bold text-white">
                  <BookOpen className="h-4 w-4 text-[#95f0ff]" />
                  What you&apos;ll learn
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {learnTopics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <PostIt
                title="Science Secret"
                color="yellow"
                className="mt-8 max-w-sm lg:ml-6"
              >
                Did you know? LED stands for <strong>Light Emitting Diode</strong>. That is a fancy
                way of saying it is a tiny light that only lets electricity move through one way.
              </PostIt>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-white/10 bg-white/8 p-3 shadow-2xl backdrop-blur">
                <Tabs defaultValue="photo" className="gap-4">
                  <TabsList className="w-full justify-start bg-white/10 p-1">
                    <TabsTrigger value="photo" className="px-4 py-2 text-white data-[state=active]:text-slate-900">
                      Photo View
                    </TabsTrigger>
                    <TabsTrigger value="schematic" className="px-4 py-2 text-white data-[state=active]:text-slate-900">
                      Schematic
                    </TabsTrigger>
                    <TabsTrigger value="xray" className="px-4 py-2 text-white data-[state=active]:text-slate-900">
                      X-Ray Flow
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="photo">
                    <div className="relative h-[360px] overflow-hidden rounded-[1.6rem] bg-[#0b1730]">
                      <Image src={project.image} alt={project.title} fill className="object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#09111f] via-[#09111f]/85 to-transparent p-5 text-sm text-white/88">
                        Photo View: This is what the finished mission can look like on your table.
                      </div>
                      <div className="absolute left-4 top-4 rounded-full bg-[#0b1730]/80 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ffe37c]">
                        Real Build
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="schematic">
                    <CircuitExplorerBoard
                      mode="schematic"
                      selectedComponent={selectedComponent}
                      setSelectedComponent={setSelectedComponent}
                    />
                  </TabsContent>

                  <TabsContent value="xray">
                    <CircuitExplorerBoard
                      mode="xray"
                      selectedComponent={selectedComponent}
                      setSelectedComponent={setSelectedComponent}
                      flowIndex={flowIndex}
                    />
                  </TabsContent>
                </Tabs>
              </div>

              <PostIt title="Engineer Note" color="mint" className="mt-6 max-w-xs lg:ml-auto">
                A schematic is a <strong>map</strong> of the circuit, not a picture. Engineers use
                it to understand how everything connects.
              </PostIt>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#fff7e8]">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10px 10px, rgba(16,24,40,0.08) 1.6px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#13284e] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-white">
                The Lab Bench
              </div>
              <h2 className="mt-5 text-4xl font-black tracking-tight text-[#13284e]">
                Gather your parts like a real inventor.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-[#30425f]">
                Instead of a plain checklist, think of this as your lab tray. Each part has a job,
                and knowing that job makes the build much easier.
              </p>
            </div>

            <div className="rounded-[2rem] bg-[#13284e] p-6 text-white shadow-[0_30px_70px_rgba(19,40,78,0.18)]">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ffe37c]">
                Safety Check
              </p>
              <p className="mt-3 text-sm leading-7 text-white/82">
                Use only small batteries. Never plug your project into a wall outlet, and ask an
                adult to help if you want to add a resistor or a breadboard kit.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {labMaterials.map((material, index) => {
              const Icon = material.icon

              return (
                <div
                  key={material.name}
                  className={`relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br ${material.tone} p-6 shadow-[0_20px_50px_rgba(22,32,55,0.12)] ${
                    index % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]"
                  } transition-transform hover:-translate-y-1 hover:rotate-0`}
                >
                  <div className="absolute right-5 top-5 rounded-full bg-white/55 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-700">
                    Ready
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/55 text-slate-800 shadow-sm">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-2xl font-black text-slate-900">{material.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-800/88">{material.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#071429] text-white">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148, 163, 184, 0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.16) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6 backdrop-blur">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#95f0ff]/12 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#95f0ff]">
                  The Build
                </div>
                <h2 className="mt-4 text-3xl font-black">Progress Tracker</h2>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  One step at a time. Follow the loop, and watch your mission bar fill up.
                </p>

                <div className="mt-5">
                  <Progress value={progress} className="h-3 bg-white/10 [&_[data-slot=progress-indicator]]:bg-[#95f0ff]" />
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white/58">
                    Step {activeStep + 1} of {buildSteps.length}
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  {buildSteps.map((step, index) => (
                    <a
                      key={step.id}
                      href={`#${step.id}`}
                      className={`flex items-start gap-3 rounded-2xl px-3 py-3 transition-colors ${
                        index === activeStep
                          ? "bg-[#95f0ff]/15 text-white"
                          : "bg-white/5 text-white/72 hover:bg-white/8"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                          index <= activeStep
                            ? "bg-[#95f0ff] text-[#071429]"
                            : "bg-white/10 text-white/70"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="text-sm font-semibold leading-6">{step.title}</span>
                    </a>
                  ))}
                </div>
              </div>

              <PostIt title="Pro Tip" color="pink" className="mt-6 max-w-[250px]">
                If your light does not turn on, flip the LED before rebuilding the whole project.
                Polarity is often the sneaky problem.
              </PostIt>
            </aside>

            <div className="space-y-8">
              {buildSteps.map((step, index) => (
                <article
                  key={step.id}
                  id={step.id}
                  className="scroll-mt-28 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.08))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#95f0ff] text-lg font-black text-[#071429]">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#95f0ff]">
                          Mission Step
                        </p>
                        <h3 className="mt-2 text-2xl font-black text-white">{step.title}</h3>
                      </div>
                    </div>
                    <div className="rounded-full border border-[#ffe37c]/20 bg-[#ffe37c]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#ffe37c]">
                      Build checkpoint
                    </div>
                  </div>

                  <p className="mt-6 text-lg leading-8 text-white/86">{step.instruction}</p>

                  <div className="mt-6 rounded-[1.6rem] bg-[#fff1a8] px-5 py-4 text-slate-900 shadow-sm">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7a5200]">
                      Why are we doing this?
                    </p>
                    <p className="mt-2 text-sm leading-7">{step.why}</p>
                  </div>

                  <Accordion type="multiple" className="mt-6">
                    <AccordionItem value={`${step.id}-science`} className="border-white/10">
                      <AccordionTrigger className="text-base font-bold text-white hover:no-underline">
                        <span className="inline-flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-[#95f0ff]" />
                          Science Behind the Step
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-base leading-7 text-white/75">
                        {step.science}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value={`${step.id}-troubleshoot`} className="border-white/10">
                      <AccordionTrigger className="text-base font-bold text-white hover:no-underline">
                        <span className="inline-flex items-center gap-2">
                          <CircleHelp className="h-4 w-4 text-[#ffe37c]" />
                          Troubleshoot This Step
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-3 text-sm leading-7 text-white/75">
                          {step.troubleshoot.map((tip) => (
                            <li key={tip} className="flex items-start gap-3">
                              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#95f0ff]" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#edf8ff_0%,#f9fcff_100%)]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#13284e] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-white">
                The Deep Dive
              </div>
              <h2 className="mt-5 text-4xl font-black tracking-tight text-[#13284e]">
                See the invisible science happening inside your circuit.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-[#30425f]">
                Flip between the schematic and the X-ray view, then explore each component. Hover
                or tap the parts on the diagram to see what they do.
              </p>

              <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_25px_70px_rgba(37,99,235,0.08)]">
                <CircuitExplorerBoard
                  mode="xray"
                  selectedComponent={selectedComponent}
                  setSelectedComponent={setSelectedComponent}
                  flowIndex={flowIndex}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] bg-[#13284e] p-7 text-white shadow-[0_25px_70px_rgba(19,40,78,0.18)]">
                <div className="flex items-center gap-3">
                  <CircuitBoard className="h-6 w-6 text-[#95f0ff]" />
                  <h3 className="text-2xl font-black">Meet the Components</h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-white/76">
                  Hover or tap each button to change the sidebar. Start with the LED and then check
                  the resistor to learn why protection matters.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {componentFacts.map((fact) => {
                    const Icon = fact.icon
                    const active = selectedComponent === fact.id

                    return (
                      <button
                        key={fact.id}
                        type="button"
                        onMouseEnter={() => setSelectedComponent(fact.id)}
                        onFocus={() => setSelectedComponent(fact.id)}
                        onClick={() => setSelectedComponent(fact.id)}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold transition-colors ${
                          active
                            ? "bg-[#95f0ff] text-[#071429]"
                            : "bg-white/10 text-white hover:bg-white/15"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {fact.name}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-6 rounded-[1.6rem] bg-white/10 p-5">
                  {(() => {
                    const SelectedFactIcon = selectedFact.icon

                    return (
                      <div className="flex items-center gap-3">
                        <SelectedFactIcon className="h-6 w-6 text-[#ffe37c]" />
                        <h4 className="text-xl font-black">{selectedFact.name}</h4>
                      </div>
                    )
                  })()}
                  <p className="mt-3 text-sm leading-7 text-white/82">{selectedFact.summary}</p>
                  <p className="mt-4 rounded-[1.4rem] bg-[#071429]/35 px-4 py-4 text-sm leading-7 text-white/78">
                    {selectedFact.deepDive}
                  </p>
                </div>
              </div>

              <PostIt title="Science Secret" color="blue">
                Electron flow travels from the <strong>negative</strong> terminal back to the{" "}
                <strong>positive</strong> terminal. Many diagrams show conventional current the
                opposite way, so scientists and engineers have two ways to describe the same loop.
              </PostIt>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#fff1d8]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#ef7d1a] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-white">
                Troubleshooting Lab
              </div>
              <h2 className="mt-5 text-4xl font-black tracking-tight text-[#4b2f15]">
                What went wrong?
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-[#6d4d2d]">
                Real engineers do not panic when something fails. They test ideas, check clues, and
                learn from every mistake.
              </p>
            </div>

            <div className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#4b2f15] shadow-sm">
              Score: {correctAnswers} / {troubleshootingQuestions.length}
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {troubleshootingQuestions.map((question) => {
              const picked = question.options.find((option) => option.id === quizAnswers[question.id])

              return (
                <article
                  key={question.id}
                  className="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(103,67,35,0.12)]"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ef7d1a]">
                    Circuit Case File
                  </p>
                  <h3 className="mt-3 text-2xl font-black leading-tight text-[#4b2f15]">
                    {question.question}
                  </h3>

                  <div className="mt-6 space-y-3">
                    {question.options.map((option) => {
                      const chosen = quizAnswers[question.id] === option.id

                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() =>
                            setQuizAnswers((current) => ({
                              ...current,
                              [question.id]: option.id,
                            }))
                          }
                          className={`w-full rounded-2xl border px-4 py-4 text-left text-sm font-semibold transition-colors ${
                            chosen
                              ? option.correct
                                ? "border-[#2ecc71] bg-[#eafff2] text-[#155535]"
                                : "border-[#f97316] bg-[#fff2e9] text-[#7b3f16]"
                              : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {option.label}
                        </button>
                      )
                    })}
                  </div>

                  {picked ? (
                    <div
                      className={`mt-5 rounded-[1.5rem] px-4 py-4 text-sm leading-7 ${
                        picked.correct
                          ? "bg-[#eafff2] text-[#155535]"
                          : "bg-[#fff2e9] text-[#7b3f16]"
                      }`}
                    >
                      {picked.explanation}
                    </div>
                  ) : (
                    <div className="mt-5 rounded-[1.5rem] bg-[#fff8ef] px-4 py-4 text-sm leading-7 text-[#7b5b33]">
                      Pick an answer to reveal the lab note.
                    </div>
                  )}
                </article>
              )
            })}
          </div>

          {answeredCount === troubleshootingQuestions.length ? (
            <div className="mt-8 rounded-[2rem] bg-[#13284e] px-6 py-5 text-white shadow-[0_20px_60px_rgba(19,40,78,0.16)]">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#95f0ff]">
                Mission Debrief
              </p>
              <p className="mt-3 text-base leading-7 text-white/82">
                You solved {correctAnswers} out of {troubleshootingQuestions.length} cases. That is
                exactly how engineers improve designs: build, test, notice clues, and try again.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1b1538] text-white">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background:
              "radial-gradient(circle at 18% 22%, rgba(120,140,255,0.28), transparent 18%), radial-gradient(circle at 80% 18%, rgba(255,184,92,0.22), transparent 15%), linear-gradient(180deg, rgba(27,21,56,0.98), rgba(54,35,110,0.98))",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-[#ffcf75]">
              Level Up
            </div>
            <h2 className="mt-5 text-4xl font-black tracking-tight">
              Series vs. parallel and the path to going pro.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/78">
              Ready for the next level? Compare two ways to add more lights, then peek at how a
              breadboard helps engineers build bigger circuits without tape.
            </p>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6 backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffcf75]">
                  Series Circuit
                </p>
                <SeriesCircuitDiagram />
                <p className="mt-4 text-sm leading-7 text-white/74">
                  One lane, two lights. The bulbs share the battery&apos;s push, so each light can
                  look dimmer.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6 backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#95f0ff]">
                  Parallel Circuit
                </p>
                <ParallelCircuitDiagram />
                <p className="mt-4 text-sm leading-7 text-white/74">
                  Two lanes, two lights. Each branch gets its own path, so the bulbs can stay
                  brighter.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] bg-white/8 p-6 backdrop-blur">
                <h3 className="text-2xl font-black">Which one is brighter?</h3>
                <p className="mt-3 text-sm leading-7 text-white/74">
                  Make your prediction before you peek at the explanation.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setLevelChoice("series")}
                    className={`rounded-full px-5 py-3 text-sm font-bold transition-colors ${
                      levelChoice === "series"
                        ? "bg-[#ffcf75] text-[#221b47]"
                        : "bg-white/10 text-white hover:bg-white/15"
                    }`}
                  >
                    Series
                  </button>
                  <button
                    type="button"
                    onClick={() => setLevelChoice("parallel")}
                    className={`rounded-full px-5 py-3 text-sm font-bold transition-colors ${
                      levelChoice === "parallel"
                        ? "bg-[#95f0ff] text-[#071429]"
                        : "bg-white/10 text-white hover:bg-white/15"
                    }`}
                  >
                    Parallel
                  </button>
                </div>

                <div className="mt-5 rounded-[1.5rem] bg-[#0d0a22] px-5 py-5 text-sm leading-7 text-white/78">
                  {levelChoice === "parallel" ? (
                    <p>
                      Nice job. Parallel is brighter because each light gets its own path to the
                      battery instead of sharing the same narrow lane.
                    </p>
                  ) : levelChoice === "series" ? (
                    <p>
                      Good guess, but parallel is usually brighter. In series, the lights share the
                      battery&apos;s push, so each one gets less energy to shine with.
                    </p>
                  ) : (
                    <p>
                      Choose an answer to reveal the explanation. Hint: think about whether the two
                      bulbs are sharing one path or getting separate lanes.
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-[2rem] bg-[#ffefae] p-6 text-[#3d2f00] shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7a5200]">
                  Going Pro: Breadboard Path
                </p>
                <h3 className="mt-3 text-2xl font-black">Build cleaner, faster, and bigger.</h3>
                <p className="mt-3 text-sm leading-7">
                  A breadboard is a reusable building board with hidden metal strips inside. It lets
                  you test more complex circuits without tape and makes upgrades much easier.
                </p>

                <div className="mt-5 rounded-[1.6rem] bg-white/65 p-4">
                  <BreadboardPreview />
                </div>

                <div className="mt-5 space-y-3 text-sm leading-7">
                  <p>
                    <strong>1.</strong> Power rails carry the battery along the sides.
                  </p>
                  <p>
                    <strong>2.</strong> Rows connect nearby holes so parts can share the same path.
                  </p>
                  <p>
                    <strong>3.</strong> Place the LED and resistor across the center gap for a safer,
                    more advanced build.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function PostIt({
  title,
  color,
  className = "",
  children,
}: {
  title: string
  color: "yellow" | "mint" | "pink" | "blue"
  className?: string
  children: ReactNode
}) {
  const palette = {
    yellow: "bg-[#fff1a8] text-[#3d2f00]",
    mint: "bg-[#bff4df] text-[#124436]",
    pink: "bg-[#ffd7e4] text-[#6c1c39]",
    blue: "bg-[#d8ecff] text-[#163758]",
  }

  return (
    <div
      className={`relative rotate-[-2deg] rounded-[1.5rem] ${palette[color]} px-5 py-5 shadow-[0_18px_45px_rgba(0,0,0,0.12)] ${className}`}
    >
      <div className="absolute left-1/2 top-0 h-4 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/55" />
      <p className="text-xs font-black uppercase tracking-[0.18em]">{title}</p>
      <div className="mt-3 text-sm leading-7">{children}</div>
    </div>
  )
}

function CircuitExplorerBoard({
  mode,
  selectedComponent,
  setSelectedComponent,
  flowIndex = 0,
}: {
  mode: "schematic" | "xray"
  selectedComponent: string
  setSelectedComponent: (component: string) => void
  flowIndex?: number
}) {
  const componentHotspots = [
    { id: "battery", label: "Battery", left: "8%", top: "47%" },
    { id: "wires", label: "Wire Path", left: "73%", top: "56%" },
    { id: "led", label: "LED", left: "58%", top: "19%" },
    { id: "switch", label: "Switch", left: "46%", top: "72%" },
    { id: "resistor", label: "Resistor", left: "74%", top: "20%" },
  ]

  return (
    <div className="rounded-[1.8rem] bg-[#09162c] p-4 text-white">
      <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,#0f2345_0%,#07111f_100%)] p-4">
        <svg viewBox="0 0 520 300" className="h-[320px] w-full">
          <defs>
            <linearGradient id="wireGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7ff5ff" />
              <stop offset="100%" stopColor="#ffd874" />
            </linearGradient>
          </defs>

          <rect x="8" y="8" width="504" height="284" rx="26" fill="rgba(255,255,255,0.02)" />

          <path
            d="M135 95 H295 M350 95 H380 V235 H290 M220 235 H130 M130 95 V138 M130 192 V235"
            stroke={mode === "xray" ? "url(#wireGlow)" : "#90cdf4"}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          <line x1="100" y1="145" x2="160" y2="145" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          <line x1="112" y1="180" x2="148" y2="180" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          <text x="165" y="150" fontSize="14" fill="#ffe37c" fontWeight="800">
            +
          </text>
          <text x="154" y="185" fontSize="14" fill="#95f0ff" fontWeight="800">
            -
          </text>

          <line x1="220" y1="235" x2="260" y2="210" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          <circle cx="220" cy="235" r="7" fill="#ffffff" />
          <circle cx="290" cy="235" r="7" fill="#ffffff" />

          <line x1="295" y1="95" x2="315" y2="95" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          <polygon points="315,70 315,120 348,95" fill="#ffe37c" />
          <line x1="350" y1="68" x2="350" y2="122" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          <line x1="325" y1="62" x2="338" y2="44" stroke="#95f0ff" strokeWidth="4" strokeLinecap="round" />
          <line x1="338" y1="44" x2="343" y2="57" stroke="#95f0ff" strokeWidth="4" strokeLinecap="round" />
          <line x1="340" y1="66" x2="353" y2="48" stroke="#95f0ff" strokeWidth="4" strokeLinecap="round" />
          <line x1="353" y1="48" x2="358" y2="61" stroke="#95f0ff" strokeWidth="4" strokeLinecap="round" />
          <text x="287" y="58" fontSize="15" fill="#ffffff" fontWeight="700">
            LED
          </text>

          <polyline
            points="380,120 392,105 404,120 416,105 428,120 440,105 452,120"
            fill="none"
            stroke="#ff9d76"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={mode === "xray" ? "0" : "0"}
          />
          <text x="382" y="92" fontSize="15" fill="#ffcf75" fontWeight="700">
            resistor
          </text>

          <text x="52" y="255" fontSize="16" fill="#ffffff" fontWeight="800">
            Battery
          </text>
          <text x="192" y="270" fontSize="16" fill="#ffffff" fontWeight="800">
            Switch
          </text>

          {mode === "xray"
            ? flowDots.map((dot, index) => {
                const distance = (index - flowIndex + flowDots.length) % flowDots.length
                const active = distance < 3
                return (
                  <circle
                    key={`${dot.x}-${dot.y}`}
                    cx={dot.x}
                    cy={dot.y}
                    r={active ? 7 : 4}
                    fill={active ? "#95f0ff" : "rgba(149,240,255,0.35)"}
                  />
                )
              })
            : null}
        </svg>

        {componentHotspots.map((hotspot) => (
          <button
            key={hotspot.id}
            type="button"
            onMouseEnter={() => setSelectedComponent(hotspot.id)}
            onFocus={() => setSelectedComponent(hotspot.id)}
            onClick={() => setSelectedComponent(hotspot.id)}
            className={`absolute rounded-full border px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors ${
              selectedComponent === hotspot.id
                ? "border-[#95f0ff] bg-[#95f0ff] text-[#071429]"
                : "border-white/18 bg-[#071429]/75 text-white hover:bg-[#0c1f3c]"
            }`}
            style={{ left: hotspot.left, top: hotspot.top }}
          >
            {hotspot.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.16em] text-white/65">
        <span className="rounded-full bg-white/10 px-3 py-2">
          {mode === "xray" ? "Electron flow view" : "Starter schematic view"}
        </span>
        <span className="rounded-full bg-white/10 px-3 py-2">
          Hover labels to explore the parts
        </span>
      </div>
    </div>
  )
}

function SeriesCircuitDiagram() {
  return (
    <svg viewBox="0 0 320 170" className="mt-5 h-40 w-full">
      <path
        d="M50 130 H120 M200 130 H270 V45 H50 V130 M120 130 H145 M175 130 H200"
        stroke="#d7deff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="50" y1="65" x2="78" y2="65" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      <line x1="58" y1="95" x2="74" y2="95" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      <circle cx="145" cy="130" r="18" fill="#ffe37c" opacity="0.75" />
      <circle cx="175" cy="130" r="18" fill="#ffe37c" opacity="0.55" />
      <circle cx="145" cy="130" r="10" fill="#fff4b9" />
      <circle cx="175" cy="130" r="10" fill="#fff4b9" />
    </svg>
  )
}

function ParallelCircuitDiagram() {
  return (
    <svg viewBox="0 0 320 170" className="mt-5 h-40 w-full">
      <path
        d="M50 130 H90 V45 H250 V130 H270 M50 130 V45 M270 130 V45"
        stroke="#d7deff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M90 85 H145 V130" stroke="#d7deff" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M250 85 H195 V130" stroke="#d7deff" strokeWidth="6" strokeLinecap="round" fill="none" />
      <line x1="50" y1="65" x2="78" y2="65" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      <line x1="58" y1="95" x2="74" y2="95" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      <circle cx="145" cy="85" r="18" fill="#95f0ff" opacity="0.95" />
      <circle cx="195" cy="85" r="18" fill="#95f0ff" opacity="0.95" />
      <circle cx="145" cy="85" r="10" fill="#dbfcff" />
      <circle cx="195" cy="85" r="10" fill="#dbfcff" />
    </svg>
  )
}

function BreadboardPreview() {
  const rows = Array.from({ length: 5 }, (_, row) => row)
  const cols = Array.from({ length: 16 }, (_, col) => col)

  return (
    <div className="rounded-[1.3rem] bg-white p-4 shadow-inner">
      <div className="rounded-[1.1rem] bg-[#f4f4f4] p-4">
        <div className="mb-3 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
          <span>Power rail</span>
          <span>Center gap</span>
        </div>
        <div className="space-y-3">
          {rows.map((row) => (
            <div key={row} className="grid gap-2" style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}>
              {cols.map((col) => (
                <span
                  key={`${row}-${col}`}
                  className={`h-2.5 w-2.5 rounded-full ${
                    col === 7 || col === 8
                      ? "bg-transparent"
                      : row === 1 && (col === 4 || col === 12)
                        ? "bg-[#f97316]"
                        : row === 3 && col === 10
                          ? "bg-[#2ecc71]"
                          : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
