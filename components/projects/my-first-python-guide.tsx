"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import {
  ArrowLeft,
  Binary,
  Brain,
  ChevronRight,
  Clock,
  Code2,
  Keyboard,
  Lightbulb,
  MessageCircle,
  Monitor,
  Package,
  Rocket,
  Scale,
  Sparkles,
  Star,
  Terminal,
  Trophy,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { ProjectGuide } from "@/lib/project-guides"

type CodeTokenKind =
  | "keyword"
  | "string"
  | "function"
  | "variable"
  | "number"
  | "comment"
  | "plain"
  | "operator"
  | "boolean"

type CodeToken = {
  text: string
  kind?: CodeTokenKind
}

type BuildStep = {
  id: string
  title: string
  stage: string
  icon: LucideIcon
  summary: string
  why: string
  deepDiveTitle: string
  deepDive: string
  concepts: string[]
  code: CodeToken[][]
}

type ConceptCard = {
  id: string
  title: string
  icon: LucideIcon
  description: string
  miniCode: CodeToken[][]
}

type GlossaryTerm = {
  id: string
  term: string
  definition: string
  helper: string
}

type LevelUp = {
  title: string
  subtitle: string
  description: string
  accent: string
  code: CodeToken[][]
}

type TerminalFrame = {
  prompt: string
  lines: {
    text: string
    tone?: "default" | "success" | "info"
  }[]
}

const conceptCards: ConceptCard[] = [
  {
    id: "input",
    title: "Input",
    icon: Keyboard,
    description: "The player types something, and your program catches it with input().",
    miniCode: [
      [
        { text: "answer", kind: "variable" },
        { text: " = ", kind: "plain" },
        { text: "input", kind: "function" },
        { text: '("What is 2 + 2? ")', kind: "string" },
      ],
    ],
  },
  {
    id: "logic",
    title: "Logic",
    icon: Scale,
    description: "The program compares the answer and decides which path to take.",
    miniCode: [
      [
        { text: "if", kind: "keyword" },
        { text: " answer ", kind: "plain" },
        { text: "==", kind: "operator" },
        { text: ' "4"', kind: "string" },
        { text: ":", kind: "plain" },
      ],
    ],
  },
  {
    id: "output",
    title: "Output",
    icon: Monitor,
    description: "The computer talks back with print() so the player sees what happened.",
    miniCode: [
      [
        { text: "print", kind: "function" },
        { text: '("Correct!")', kind: "string" },
      ],
    ],
  },
]

const glossaryTerms: GlossaryTerm[] = [
  {
    id: "variables",
    term: "Variables",
    definition: "Variables are labeled boxes that store information for later.",
    helper: "Example: score remembers how many points the player has.",
  },
  {
    id: "strings",
    term: "Strings",
    definition: "Strings are pieces of text, like names, answers, and messages.",
    helper: 'Example: "Maya" and "Correct!" are both strings.',
  },
  {
    id: "booleans",
    term: "Booleans",
    definition: "A boolean is either True or False.",
    helper: 'Example: answer == "4" becomes True only when the player types 4.',
  },
  {
    id: "functions",
    term: "Functions",
    definition: "Functions are built-in tools that do jobs for your code.",
    helper: "Example: print() displays text and input() waits for the user.",
  },
  {
    id: "conditionals",
    term: "Conditionals",
    definition: "Conditionals choose what happens next based on a test.",
    helper: "Example: if the answer is correct, the program celebrates.",
  },
]

const buildSteps: BuildStep[] = [
  {
    id: "python-step-1",
    title: "Setting the stage",
    stage: "Warm-up",
    icon: Package,
    summary:
      "Start by welcoming the player and making a score box that begins at zero.",
    why:
      "Every game needs a starting point. This line tells the computer, 'Get ready, we are keeping track now.'",
    deepDiveTitle: "Deep Dive: Variables are memory boxes",
    deepDive:
      "When you write score = 0, Python builds a little storage spot named score. Later, you can open that box, change the number, and print the new result.",
    concepts: ["variables", "functions"],
    code: [
      [
        { text: "print", kind: "function" },
        { text: "(", kind: "plain" },
        { text: '"Welcome to the Math Quiz!"', kind: "string" },
        { text: ")", kind: "plain" },
      ],
      [
        { text: "score", kind: "variable" },
        { text: " = ", kind: "plain" },
        { text: "0", kind: "number" },
      ],
    ],
  },
  {
    id: "python-step-2",
    title: "Talking to the player",
    stage: "Input",
    icon: MessageCircle,
    summary:
      "Ask the player for their name and their answer so the game feels alive.",
    why:
      "A quiz is boring if the computer only talks and never listens. input() turns your program into a conversation.",
    deepDiveTitle: "Pro Tip: input() always gives back text",
    deepDive:
      "Even if the player types 4, Python treats it as the string '4' until you change it. That is why beginners often compare answers to text first.",
    concepts: ["strings", "functions"],
    code: [
      [
        { text: "player_name", kind: "variable" },
        { text: " = ", kind: "plain" },
        { text: "input", kind: "function" },
        { text: "(", kind: "plain" },
        { text: '"What is your name? "', kind: "string" },
        { text: ")", kind: "plain" },
      ],
      [
        { text: "answer", kind: "variable" },
        { text: " = ", kind: "plain" },
        { text: "input", kind: "function" },
        { text: "(", kind: "plain" },
        { text: '"What is 2 + 2? "', kind: "string" },
        { text: ")", kind: "plain" },
      ],
    ],
  },
  {
    id: "python-step-3",
    title: "Making a decision",
    stage: "Logic",
    icon: Scale,
    summary:
      "Use an if statement to ask, 'Did the player type the correct answer?'",
    why:
      "This is the brain of the program. Without a decision, the computer cannot tell right from wrong.",
    deepDiveTitle: "Science of code: True or False",
    deepDive:
      "The test answer == '4' creates a boolean value. If it is True, Python runs the indented lines underneath the if. If it is False, Python jumps to else instead.",
    concepts: ["booleans", "conditionals"],
    code: [
      [
        { text: "if", kind: "keyword" },
        { text: " answer ", kind: "plain" },
        { text: "==", kind: "operator" },
        { text: ' "4"', kind: "string" },
        { text: ":", kind: "plain" },
      ],
      [
        { text: "    ", kind: "plain" },
        { text: "print", kind: "function" },
        { text: "(", kind: "plain" },
        { text: '"Correct!"', kind: "string" },
        { text: ")", kind: "plain" },
      ],
      [
        { text: "else", kind: "keyword" },
        { text: ":", kind: "plain" },
      ],
      [
        { text: "    ", kind: "plain" },
        { text: "print", kind: "function" },
        { text: "(", kind: "plain" },
        { text: '"Not quite. Try again!"', kind: "string" },
        { text: ")", kind: "plain" },
      ],
    ],
  },
  {
    id: "python-step-4",
    title: "Keeping score",
    stage: "Points",
    icon: Trophy,
    summary:
      "When the answer is correct, add a point and show the player the new total.",
    why:
      "Games feel rewarding when something changes after a success. Updating score proves that variables can grow and change over time.",
    deepDiveTitle: "Deep Dive: score = score + 1",
    deepDive:
      "This line does not mean 'score is the same as score.' It means 'take the old number inside score, add 1, and store the new number back in the score box.'",
    concepts: ["variables", "functions"],
    code: [
      [
        { text: "if", kind: "keyword" },
        { text: " answer ", kind: "plain" },
        { text: "==", kind: "operator" },
        { text: ' "4"', kind: "string" },
        { text: ":", kind: "plain" },
      ],
      [
        { text: "    ", kind: "plain" },
        { text: "score", kind: "variable" },
        { text: " = ", kind: "plain" },
        { text: "score", kind: "variable" },
        { text: " + ", kind: "plain" },
        { text: "1", kind: "number" },
      ],
      [
        { text: "print", kind: "function" },
        { text: "(", kind: "plain" },
        { text: '"Your score is"', kind: "string" },
        { text: ", ", kind: "plain" },
        { text: "score", kind: "variable" },
        { text: ")", kind: "plain" },
      ],
    ],
  },
  {
    id: "python-step-5",
    title: "Finishing with style",
    stage: "Finale",
    icon: Sparkles,
    summary:
      "End the round with a personalized message so the game feels more polished.",
    why:
      "Tiny details make beginner projects feel real. Personal messages show that code can mix stored information with text to create something new.",
    deepDiveTitle: "Pro Tip: f-strings are smart text",
    deepDive:
      "An f-string lets you slide variables directly into a message using curly braces. It is one of the nicest ways to make your code sound personal.",
    concepts: ["strings", "variables"],
    code: [
      [
        { text: "print", kind: "function" },
        { text: "(", kind: "plain" },
        { text: 'f"Thanks for playing, {player_name}!"', kind: "string" },
        { text: ")", kind: "plain" },
      ],
      [
        { text: "print", kind: "function" },
        { text: "(", kind: "plain" },
        { text: '"Final score:"', kind: "string" },
        { text: ", ", kind: "plain" },
        { text: "score", kind: "variable" },
        { text: ")", kind: "plain" },
      ],
    ],
  },
]

const levelUps: LevelUp[] = [
  {
    title: "Level 1: The Time Traveler",
    subtitle: "Ask for the player's age",
    description:
      "Make the quiz feel more personal by asking how old the player is before the first question.",
    accent: "from-[#d9f5ff] to-[#9edcff]",
    code: [
      [
        { text: "age", kind: "variable" },
        { text: " = ", kind: "plain" },
        { text: "input", kind: "function" },
        { text: "(", kind: "plain" },
        { text: '"How old are you? "', kind: "string" },
        { text: ")", kind: "plain" },
      ],
    ],
  },
  {
    title: "Level 2: The Scorekeeper",
    subtitle: "Add easy and hard points",
    description:
      "Give 1 point for easy questions and 5 points for hard ones so your quiz feels more game-like.",
    accent: "from-[#ffe7b0] to-[#ffb86b]",
    code: [
      [
        { text: "score", kind: "variable" },
        { text: " = ", kind: "plain" },
        { text: "score", kind: "variable" },
        { text: " + ", kind: "plain" },
        { text: "5", kind: "number" },
      ],
    ],
  },
  {
    title: "Level 3: The Critic",
    subtitle: "Write a funny zero-point message",
    description:
      "If the player gets zero points, make the program say something dramatic or silly.",
    accent: "from-[#f3dcff] to-[#d59dff]",
    code: [
      [
        { text: "if", kind: "keyword" },
        { text: " score ", kind: "plain" },
        { text: "==", kind: "operator" },
        { text: " 0", kind: "number" },
        { text: ":", kind: "plain" },
      ],
      [
        { text: "    ", kind: "plain" },
        { text: "print", kind: "function" },
        { text: "(", kind: "plain" },
        { text: '"Even my calculator expected more."', kind: "string" },
        { text: ")", kind: "plain" },
      ],
    ],
  },
]

const terminalFrames: TerminalFrame[] = [
  {
    prompt: "python quiz_game.py",
    lines: [
      { text: "Welcome to the Math Quiz!", tone: "info" },
      { text: "What is your name? Maya" },
      { text: "Hi, Maya!" },
      { text: "What is 2 + 2? ", tone: "default" },
    ],
  },
  {
    prompt: "python quiz_game.py",
    lines: [
      { text: "Welcome to the Math Quiz!", tone: "info" },
      { text: "What is your name? Maya" },
      { text: "Hi, Maya!" },
      { text: "What is 2 + 2? 4" },
      { text: "Correct!", tone: "success" },
      { text: "Your score is 1" },
    ],
  },
  {
    prompt: "python quiz_game.py",
    lines: [
      { text: "Welcome to the Math Quiz!", tone: "info" },
      { text: "What is your name? Maya" },
      { text: "Hi, Maya!" },
      { text: "What is 2 + 2? 4" },
      { text: "Correct!", tone: "success" },
      { text: "Thanks for playing, Maya!" },
      { text: "Final score: 1" },
    ],
  },
]

const toneClasses: Record<CodeTokenKind, string> = {
  keyword: "text-[#89b4ff]",
  string: "text-[#90f3b5]",
  function: "text-[#7dd8ff]",
  variable: "text-[#d3a8ff]",
  number: "text-[#ffbf69]",
  comment: "text-slate-500 italic",
  plain: "text-slate-100",
  operator: "text-white",
  boolean: "text-[#ffd36b]",
}

export function MyFirstPythonGuide({ project }: { project: ProjectGuide }) {
  const [activeStep, setActiveStep] = useState(0)
  const [frameIndex, setFrameIndex] = useState(0)
  const [visibleLineCount, setVisibleLineCount] = useState(1)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setFrameIndex((current) => (current + 1) % terminalFrames.length)
      setVisibleLineCount(1)
    }, 3200)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const frame = terminalFrames[frameIndex]
    const reveal = window.setInterval(() => {
      setVisibleLineCount((current) => {
        if (current >= frame.lines.length) {
          window.clearInterval(reveal)
          return current
        }

        return current + 1
      })
    }, 360)

    return () => window.clearInterval(reveal)
  }, [frameIndex])

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

  const progress = ((activeStep + 1) / buildSteps.length) * 100
  const activeConcepts = buildSteps[activeStep]?.concepts ?? []
  const currentFrame = terminalFrames[frameIndex]

  return (
    <div className="bg-[#f6fbff] text-slate-900">
      <section className="relative overflow-hidden bg-[#081427] text-white">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 18% 20%, rgba(67,178,255,0.28), transparent 24%), radial-gradient(circle at 82% 18%, rgba(115,255,185,0.22), transparent 18%), linear-gradient(135deg, rgba(8,20,39,0.98), rgba(10,37,73,0.96) 58%, rgba(15,82,95,0.92))",
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

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.95fr]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#b7ffcf] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-[#08381c]">
                Code Mission
              </div>
              <h1 className="mt-5 text-5xl font-black tracking-tight text-white md:text-6xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/82">
                Build a quiz game that talks to the player, checks their answer, and keeps score.
                We are going code-first, so you can see exactly what each line does while you build
                it.
              </p>

              <div className="mt-7 flex flex-wrap gap-3 text-sm text-white/90">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                  <Star className="h-4 w-4 text-[#ffe37c]" />
                  {project.difficulty}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                  <Clock className="h-4 w-4 text-[#7dd8ff]" />
                  {project.time}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-mono">
                  <Code2 className="h-4 w-4 text-[#90f3b5]" />
                  print(), input(), and if statements
                </span>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <InfoCard
                  icon={Binary}
                  title="What you'll build"
                  description="A terminal quiz that asks a question, checks the answer, and shows the score."
                />
                <InfoCard
                  icon={Brain}
                  title="Key concepts"
                  description="Variables, strings, booleans, conditionals, and how code talks to humans."
                />
              </div>

              <NoteCard title="Net Smart" tone="yellow" className="mt-8 max-w-sm lg:ml-8">
                Use school-approved coding sites and never type private information into your
                program. Names for practice are great. Passwords are not.
              </NoteCard>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-white/10 bg-[#091528]/85 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur">
                <div className="flex items-center justify-between rounded-[1.4rem] border border-white/8 bg-[#0d1d35] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#ff6f61]" />
                    <span className="h-3 w-3 rounded-full bg-[#ffcf5c]" />
                    <span className="h-3 w-3 rounded-full bg-[#44d17b]" />
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#7dd8ff]">
                    <Terminal className="h-3.5 w-3.5" />
                    Live Terminal Preview
                  </span>
                </div>

                <div className="mt-4 rounded-[1.6rem] bg-[#050d1b] p-5 font-mono text-sm text-[#d8e8ff] shadow-inner">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#7dd8ff]">
                    <Rocket className="h-3.5 w-3.5" />
                    Running: {currentFrame.prompt}
                  </div>

                  <div className="mt-5 space-y-3">
                    {currentFrame.lines.slice(0, visibleLineCount).map((line, index) => (
                      <p
                        key={`${frameIndex}-${index}-${line.text}`}
                        className={`leading-7 ${
                          line.tone === "success"
                            ? "text-[#90f3b5]"
                            : line.tone === "info"
                              ? "text-[#7dd8ff]"
                              : "text-[#d8e8ff]"
                        }`}
                      >
                        {line.text}
                        {index === visibleLineCount - 1 ? (
                          <span className="ml-1 inline-block h-5 w-2 animate-pulse rounded-sm bg-[#90f3b5]" />
                        ) : null}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <NoteCard title="What is this?" tone="mint" className="mt-6 max-w-xs lg:ml-auto">
                 This is known as the terminal! The terminal is where your code outputs. You can use commands like input() and print() to get stuff to show up there.
              </NoteCard>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#fef7e8]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#09213d] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-white">
              The Concept
            </div>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-[#102847]">
              Anatomy of a program: Input, logic, output.
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#42556f]">
              A tiny quiz game is really a machine with three jobs. First it listens, then it
              thinks, then it responds.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {conceptCards.map((card, index) => {
              const Icon = card.icon

              return (
                <div
                  key={card.id}
                  className={`rounded-[1.9rem] bg-white p-6 shadow-[0_20px_60px_rgba(20,39,73,0.08)] ${
                    index === 1 ? "lg:translate-y-6" : ""
                  }`}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9f4ff] text-[#145aa3]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-2xl font-black text-[#102847]">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#52667f]">{card.description}</p>
                  <div className="mt-5">
                    <MiniCodeBlock lines={card.miniCode} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#061425] text-white">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.14) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6 backdrop-blur">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#7dd8ff]/12 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#7dd8ff]">
                  The Build
                </div>
                <h2 className="mt-4 text-3xl font-black">Roadmap</h2>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  Follow the logic like stepping stones. Each stage adds one important job to your
                  quiz game.
                </p>

                <div className="mt-5">
                  <Progress
                    value={progress}
                    className="h-3 bg-white/10 [&_[data-slot=progress-indicator]]:bg-[#90f3b5]"
                  />
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white/58">
                    Step {activeStep + 1} of {buildSteps.length}
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  {buildSteps.map((step, index) => {
                    const Icon = step.icon

                    return (
                      <a
                        key={step.id}
                        href={`#${step.id}`}
                        className={`flex items-start gap-3 rounded-2xl px-3 py-3 transition-colors ${
                          index === activeStep
                            ? "bg-[#7dd8ff]/14 text-white"
                            : "bg-white/5 text-white/72 hover:bg-white/8"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                            index === activeStep
                              ? "bg-[#90f3b5] text-[#062235]"
                              : "bg-white/10 text-white/70"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block text-xs font-black uppercase tracking-[0.18em] text-white/55">
                            {step.stage}
                          </span>
                          <span className="mt-1 block text-sm font-semibold leading-6">
                            {step.title}
                          </span>
                        </span>
                      </a>
                    )
                  })}
                </div>
              </div>

              <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/8 p-6 backdrop-blur">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#ffe3a3]/15 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#ffe3a3]">
                  Why It Works
                </div>
                <p className="mt-4 text-sm leading-7 text-white/72">
                  These are the coding words that matter in the current step.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {activeConcepts.map((concept) => (
                    <span
                      key={concept}
                      className="rounded-full bg-[#ffe3a3] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#4a3310]"
                    >
                      {concept}
                    </span>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  {glossaryTerms.map((term) => {
                    const active = activeConcepts.includes(term.id)

                    return (
                      <div
                        key={term.id}
                        className={`rounded-[1.4rem] px-4 py-4 transition-colors ${
                          active
                            ? "bg-[#90f3b5]/16 text-white"
                            : "bg-white/5 text-white/72"
                        }`}
                      >
                        <p className="font-mono text-sm font-bold text-white">{term.term}</p>
                        <p className="mt-2 text-sm leading-6">{term.definition}</p>
                        <p className="mt-2 text-xs leading-6 text-white/58">{term.helper}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </aside>

            <div className="relative space-y-8 before:absolute before:left-7 before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-gradient-to-b before:from-[#90f3b5] before:via-[#7dd8ff]/50 before:to-transparent">
              {buildSteps.map((step, index) => {
                const Icon = step.icon
                const codeFirst = index % 2 === 0

                return (
                  <article
                    key={step.id}
                    id={step.id}
                    className="scroll-mt-28 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.08))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur"
                  >
                    <div className="flex items-start gap-4">
                      <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#90f3b5] text-[#062235] shadow-lg">
                        <Icon className="h-6 w-6" />
                      </span>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7dd8ff]">
                          {step.stage}
                        </p>
                        <h3 className="mt-2 text-3xl font-black text-white">{step.title}</h3>
                        <p className="mt-3 max-w-3xl text-base leading-8 text-white/80">
                          {step.summary}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 grid gap-6 lg:grid-cols-2">
                      <div className={codeFirst ? "" : "lg:order-2"}>
                        <CodePanel lines={step.code} title="Code snippet" />
                      </div>

                      <div className={codeFirst ? "" : "lg:order-1"}>
                        <div className="rounded-[1.7rem] bg-white/8 p-6">
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffe3a3]">
                            Plain-English Explanation
                          </p>
                          <p className="mt-4 text-base leading-8 text-white/82">{step.why}</p>

                          <div className="mt-5 rounded-[1.5rem] bg-[#fff1a8] px-5 py-4 text-slate-900 shadow-sm">
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7a5200]">
                              {step.deepDiveTitle}
                            </p>
                            <p className="mt-2 text-sm leading-7">{step.deepDive}</p>
                          </div>

                          <div className="mt-5 flex flex-wrap gap-2">
                            {step.concepts.map((concept) => (
                              <span
                                key={concept}
                                className="rounded-full border border-white/12 bg-white/6 px-3 py-2 font-mono text-xs text-white/76"
                              >
                                {concept}
                              </span>
                            ))}
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

      <section className="relative overflow-hidden bg-[#efe8ff]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#4c2f8a] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-white">
              Level Ups
            </div>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-[#261646]">
              Bonus missions that feel like game unlocks.
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#5a4b7a]">
              Once the basic quiz works, remix it. Great coders do not stop at "it runs." They ask
              what cool thing they can add next.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {levelUps.map((level) => (
              <div
                key={level.title}
                className={`rounded-[2rem] bg-gradient-to-br ${level.accent} p-6 shadow-[0_20px_60px_rgba(57,29,95,0.12)]`}
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4d2e17]">
                  Bonus Mission
                </p>
                <h3 className="mt-3 text-2xl font-black text-[#251536]">{level.title}</h3>
                <p className="mt-2 font-semibold text-[#4a355f]">{level.subtitle}</p>
                <p className="mt-4 text-sm leading-7 text-[#4f4267]">{level.description}</p>

                <div className="mt-5">
                  <MiniCodeBlock lines={level.code} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] bg-white px-6 py-5 shadow-[0_18px_50px_rgba(38,22,70,0.08)]">
            <div className="flex items-start gap-3">
              <Lightbulb className="mt-0.5 h-5 w-5 text-[#f59e0b]" />
              <p className="text-sm leading-7 text-[#5a4b7a]">
                Want one more challenge? Add a second question and keep the same score variable
                alive all the way to the end. That is how your tiny script starts becoming a real
                game.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function InfoCard({
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
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-[#90f3b5]">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-xl font-black text-white">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-white/76">{description}</p>
    </div>
  )
}

function NoteCard({
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

function CodePanel({
  lines,
  title,
}: {
  lines: CodeToken[][]
  title: string
}) {
  return (
    <div className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#050d1b] shadow-inner">
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
        <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#7dd8ff]">
          <Terminal className="h-3.5 w-3.5" />
          {title}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-white/6 px-3 py-1 font-mono text-[11px] text-white/58">
          <ChevronRight className="h-3.5 w-3.5" />
          Python
        </span>
      </div>

      <div className="p-5">
        <pre className="overflow-x-auto font-mono text-sm leading-8">
          {lines.map((line, index) => (
            <div key={index} className="grid grid-cols-[34px_minmax(0,1fr)] gap-4">
              <span className="text-right text-xs text-slate-500">{index + 1}</span>
              <span className="whitespace-pre-wrap">
                {line.map((token, tokenIndex) => (
                  <span key={`${index}-${tokenIndex}`} className={toneClasses[token.kind ?? "plain"]}>
                    {token.text}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}

function MiniCodeBlock({ lines }: { lines: CodeToken[][] }) {
  return (
    <div className="rounded-[1.3rem] bg-[#0b1628] px-4 py-4 shadow-inner">
      <pre className="overflow-x-auto font-mono text-xs leading-7">
        {lines.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line.map((token, tokenIndex) => (
              <span key={`${index}-${tokenIndex}`} className={toneClasses[token.kind ?? "plain"]}>
                {token.text}
              </span>
            ))}
          </div>
        ))}
      </pre>
    </div>
  )
}
