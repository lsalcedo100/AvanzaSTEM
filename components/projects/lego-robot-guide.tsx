"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import {
  ArrowLeft,
  ArrowUpRight,
  BatteryCharging,
  BookOpen,
  Bot,
  Brain,
  Cable,
  CheckCircle2,
  CircuitBoard,
  Clock,
  Code2,
  Lightbulb,
  Package,
  Play,
  Scale,
  Sparkles,
  Star,
  Wrench,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { ProjectGuide } from "@/lib/project-guides"

type ResourceLink = {
  title: string
  subtitle: string
  href: string
  icon: LucideIcon
}

type SpecCard = {
  label: string
  value: string
  helper: string
}

type PartCard = {
  name: string
  amount: string
  note: string
  icon: LucideIcon
  accent: string
}

type PrincipleId = "stability" | "motion" | "logic"

type PrincipleCard = {
  id: PrincipleId
  eyebrow: string
  title: string
  summary: string
  bullets: string[]
  caption: string
}

type BuildStep = {
  id: string
  stage: string
  title: string
  summary: string
  engineering: string
  official: string
  checkpoints: string[]
  focus: string[]
  diagram: "prep" | "base" | "arm" | "grabber" | "code" | "test"
}

type TestObject = {
  id: string
  name: string
  challenge: string
  question: string
  insight: string
}

type CodeTokenKind = "keyword" | "function" | "string" | "comment" | "plain" | "number"

type CodeToken = {
  text: string
  kind?: CodeTokenKind
}

type CodeView = {
  id: "blocks" | "python"
  label: string
  eyebrow: string
  description: string
  lines: CodeToken[][]
}

const resourceLinks: ResourceLink[] = [
  {
    title: "Official lesson",
    subtitle: "LEGO Education Super Cleanup",
    href: "https://education.lego.com/en-us/lessons/prime-invention-squad/super-cleanup/",
    icon: BookOpen,
  },
  {
    title: "Build Book 1",
    subtitle: "Piece-by-piece assembly PDF",
    href: "https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt56a81c75560c9a81/5f8802cbf71916144453a493/supercleaup-bi-pdf-book1of3.pdf?locale=en-us",
    icon: Wrench,
  },
  {
    title: "Build Book 2",
    subtitle: "More official assembly steps",
    href: "https://assets.education.lego.com/v3/assets/blt293eea581807678a/bltb5e585f94cb4e72b/5f8802e5a302dc0d859a734d/supercleaup-bi-pdf-book2of3.pdf?locale=en-us",
    icon: Package,
  },
  {
    title: "Python lesson",
    subtitle: "Clean Up with Multiple Functions",
    href: "https://education.lego.com/en-us/lessons/spike-python-u7-impacting-the-environment-with-functions/spike-python-u7l2-clean-up-with-multiple-functions/",
    icon: Code2,
  },
]

const specCards: SpecCard[] = [
  {
    label: "Build focus",
    value: "Grabber robot",
    helper: "A wheeled robot that reaches out and picks objects up.",
  },
  {
    label: "Logic type",
    value: "Programmed",
    helper: "Built for the SPIKE Prime hub with a motor routine.",
  },
  {
    label: "Sensors",
    value: "Force sensor",
    helper: "Useful for detecting contact and testing the grabber.",
  },
  {
    label: "Difficulty",
    value: "3/5 gears",
    helper: "Not a first snap-together toy, but very doable with patience.",
  },
  {
    label: "Optimized for",
    value: "Set #45678",
    helper: "LEGO Education SPIKE Prime set.",
  },
  {
    label: "Big idea",
    value: "Mechanics + code",
    helper: "Balance, motion transfer, sensors, and functions all work together.",
  },
]

const partCards: PartCard[] = [
  {
    name: "SPIKE Prime Hub",
    amount: "1 controller brick",
    note: "This is the robot brain. It runs the program and powers the mission.",
    icon: CircuitBoard,
    accent: "from-[#d8edff] to-[#a9d4ff]",
  },
  {
    name: "Large Angular Motor",
    amount: "1 motor",
    note: "This supplies the spinning force that the grabber turns into jaw motion.",
    icon: BatteryCharging,
    accent: "from-[#d8f7ef] to-[#97e7cf]",
  },
  {
    name: "Force Sensor",
    amount: "1 sensor",
    note: "A touch-style sensor that helps the robot notice presses and contact.",
    icon: Lightbulb,
    accent: "from-[#fff2c8] to-[#ffd67b]",
  },
  {
    name: "Technic Beams",
    amount: "Assorted liftarms",
    note: "These are the skeleton of the robot. They keep the frame strong and aligned.",
    icon: Wrench,
    accent: "from-[#e6defd] to-[#c7b3ff]",
  },
  {
    name: "Pins and Axles",
    amount: "Lots of connectors",
    note: "Tiny but important. These let beams pivot, lock, and transfer force.",
    icon: Cable,
    accent: "from-[#ffe0d0] to-[#ffb18e]",
  },
  {
    name: "Wheels and Grabber Pieces",
    amount: "Drive and claw parts",
    note: "The wheels make it mobile and the front end does the actual cleanup job.",
    icon: Bot,
    accent: "from-[#d9ecff] to-[#9ecbff]",
  },
]

const principles: PrincipleCard[] = [
  {
    id: "stability",
    eyebrow: "Physics of stability",
    title: "A wide base fights tipping.",
    summary:
      "When the grabber reaches forward, the robot's weight shifts. A low, wide base gives the center of gravity more room to stay above the wheels instead of falling outside them.",
    bullets: [
      "Wide wheel spacing gives the robot a bigger support area.",
      "Heavy parts mounted low make tipping less likely.",
      "If the claw sticks way out front, the base has to work harder to stay balanced.",
    ],
    caption: "Think of it like leaning forward with a backpack. If your feet are too close together, you wobble.",
  },
  {
    id: "motion",
    eyebrow: "Mechanical principle",
    title: "A spinning motor can become a grabbing arm.",
    summary:
      "The motor spins in circles, but the beams and joints redirect that circular motion into a claw that opens and closes around an object.",
    bullets: [
      "Rotational motion starts in the motor.",
      "Pins and pivots guide that motion into the arm linkage.",
      "The jaw shape decides whether the object gets trapped or slips out.",
    ],
    caption: "This is the same idea engineers use in cranes, doors, and factory grippers.",
  },
  {
    id: "logic",
    eyebrow: "Programming idea",
    title: "Small functions make big behaviors easier to control.",
    summary:
      "Instead of one giant command blob, good robot programs split the job into smaller actions like grab, drive, and release. That is easier to test and fix.",
    bullets: [
      "One function can close the grabber.",
      "Another function can drive to the drop zone.",
      "Mixing mechanical design with simple code creates a robot that feels intentional, not random.",
    ],
    caption: "This is why the official Python lesson focuses on multiple functions instead of one long script.",
  },
]

const buildSteps: BuildStep[] = [
  {
    id: "lego-step-1",
    stage: "Mission Prep",
    title: "Open the official guides and sort the key parts",
    summary:
      "Start with the official LEGO Education lesson and build books open in another tab. Then lay out the hub, motor, force sensor, wheels, beams, axles, and pins so you can see the system before you snap it together.",
    engineering:
      "Sorting parts is not busywork. It helps you notice which pieces belong to the chassis, the arm, and the control system, which makes the whole robot feel less mysterious.",
    official:
      "The exact piece placement lives in LEGO Education's build PDFs. This page is your engineering coach beside those official instructions, not a replacement for them.",
    checkpoints: [
      "Hub, motor, and sensor are easy to reach",
      "You can tell beams, axles, and pins apart",
      "Official lesson plus Build Books 1 and 2 are open",
    ],
    focus: ["part ID", "system map"],
    diagram: "prep",
  },
  {
    id: "lego-step-2",
    stage: "Chassis",
    title: "Build a wide rolling base first",
    summary:
      "Assemble the low frame that holds the wheels and gives the robot a strong platform. Keep the footprint broad so the robot can reach forward without becoming tippy.",
    engineering:
      "This is the center-of-gravity step. A narrow base might look sleek, but a wider one is much more stable once the grabber arm swings out.",
    official:
      "In the official build flow, this is where the robot stops being a pile of parts and becomes a stable machine body.",
    checkpoints: [
      "Base sits flat on the table",
      "Both wheels turn without rubbing",
      "There is room for the hub to sit low and centered",
    ],
    focus: ["stability", "center of gravity"],
    diagram: "base",
  },
  {
    id: "lego-step-3",
    stage: "Structure",
    title: "Raise the front tower and arm support",
    summary:
      "Add the upright structure that gives the grabber a place to pivot. This tower is what lets the robot reach outward instead of only pushing objects.",
    engineering:
      "Tall structures can wobble if they are not braced well. The trick is giving the arm enough reach while keeping the frame stiff and connected back into the base.",
    official:
      "Watch how the official build uses Technic geometry to lock the tower into the chassis instead of balancing it on a single weak point.",
    checkpoints: [
      "Tower does not twist when you press it gently",
      "Pivot point feels deliberate, not floppy",
      "Arm support lines up with the front of the base",
    ],
    focus: ["triangulation", "reach"],
    diagram: "arm",
  },
  {
    id: "lego-step-4",
    stage: "Grabber",
    title: "Mount the motor, sensor, and front jaws",
    summary:
      "This is the exciting part. Add the pieces that actually pinch, hold, and respond during cleanup tests, then connect them to the hub with tidy cable routing.",
    engineering:
      "The motor supplies rotational motion. The linkage and jaws decide how that motion becomes a squeeze, while the sensor helps the robot react instead of guessing.",
    official:
      "The official Super Cleanup lesson is about comparing grabber designs, so pay close attention to jaw shape, spacing, and how well the front end traps each object.",
    checkpoints: [
      "Motor cable reaches the hub comfortably",
      "Grabber opens and closes without scraping the frame",
      "Sensor is mounted firmly and easy to trigger",
    ],
    focus: ["motion transfer", "sensor feedback"],
    diagram: "grabber",
  },
  {
    id: "lego-step-5",
    stage: "Control Logic",
    title: "Load a simple cleanup routine",
    summary:
      "Program the robot in short chunks like drive, grab, and release. That keeps the code easier to understand and matches the official Python lesson's focus on multiple functions.",
    engineering:
      "Robotics feels less overwhelming when you separate jobs. If the robot grabs badly, you can fix the grab step without rewriting the whole mission.",
    official:
      "LEGO Education's Python lesson uses a grabber cleanup challenge to show why splitting code into multiple functions is powerful.",
    checkpoints: [
      "The hub is connected and ready to run code",
      "Each movement has one clear job",
      "You can test one function at a time",
    ],
    focus: ["functions", "debugging"],
    diagram: "code",
  },
  {
    id: "lego-step-6",
    stage: "Fair Test",
    title: "Run cleanup trials and compare what works",
    summary:
      "Now test the robot with different objects and notice which shapes are easy or tricky. The real goal is not only making the robot move. It is learning why one design works better than another.",
    engineering:
      "Engineers do not just say, 'It worked once.' They create test criteria, compare results, and then adjust only one variable at a time.",
    official:
      "The official Super Cleanup lesson specifically asks students to test grabber designs and judge efficiency using clear criteria.",
    checkpoints: [
      "You have at least two kinds of test objects",
      "You are recording observations, not guessing",
      "You can explain one thing you would improve next",
    ],
    focus: ["fair testing", "iteration"],
    diagram: "test",
  },
]

const testObjects: TestObject[] = [
  {
    id: "paper",
    name: "Crumpled paper",
    challenge: "Light, squishy, and easy to push away by accident.",
    question: "Do the jaws trap the paper, or do they shove it forward instead of holding it?",
    insight: "This is a great object for checking claw shape and closing speed.",
  },
  {
    id: "apple",
    name: "Apple or round ball",
    challenge: "Round and slippery, so weak jaw geometry shows up fast.",
    question: "Can the robot center the object before squeezing, or does it slide off to one side?",
    insight: "Round objects reveal whether the base stays balanced during a forward reach.",
  },
  {
    id: "brick",
    name: "LEGO brick or small block",
    challenge: "Hard edges and very little squish.",
    question: "Can the grabber pick up a rigid shape cleanly without the object twisting out?",
    insight: "Rigid objects are excellent for checking jaw alignment and grip spacing.",
  },
]

const codeViews: CodeView[] = [
  {
    id: "blocks",
    label: "Block logic",
    eyebrow: "Drag-and-drop thinking",
    description:
      "This is the mission broken into robot-sized jobs. The names are simple on purpose so you can see the logic before you worry about syntax.",
    lines: [
      [{ text: "when program starts", kind: "keyword" }],
      [{ text: "drive_to_trash()", kind: "function" }],
      [{ text: "close_grabber()", kind: "function" }],
      [{ text: "drive_to_bin()", kind: "function" }],
      [{ text: "open_grabber()", kind: "function" }],
    ],
  },
  {
    id: "python",
    label: "Python functions",
    eyebrow: "Text-based control sketch",
    description:
      "This mini example is inspired by LEGO Education's Python cleanup lesson. The exact classroom code may look different, but the structure is the important part.",
    lines: [
      [{ text: "# concept sketch inspired by the official lesson", kind: "comment" }],
      [
        { text: "def", kind: "keyword" },
        { text: " grab", kind: "function" },
        { text: "():", kind: "plain" },
      ],
      [{ text: "    motor.run_for_degrees(180)", kind: "function" }],
      [
        { text: "def", kind: "keyword" },
        { text: " release", kind: "function" },
        { text: "():", kind: "plain" },
      ],
      [{ text: "    motor.run_for_degrees(-180)", kind: "function" }],
      [
        { text: "def", kind: "keyword" },
        { text: " clean_up", kind: "function" },
        { text: "():", kind: "plain" },
      ],
      [{ text: "    grab()", kind: "function" }],
      [{ text: "    release()", kind: "function" }],
    ],
  },
]

const codeToneClasses: Record<CodeTokenKind, string> = {
  keyword: "text-[#8ed0ff]",
  function: "text-[#a8f0c8]",
  string: "text-[#ffe08c]",
  comment: "text-slate-400 italic",
  plain: "text-white",
  number: "text-[#ffb87d]",
}

export function LegoRobotGuide({ project }: { project: ProjectGuide }) {
  const [activeStep, setActiveStep] = useState(0)
  const [selectedPrinciple, setSelectedPrinciple] = useState<PrincipleId>("stability")
  const [selectedObject, setSelectedObject] = useState<TestObject["id"]>("paper")
  const [selectedCodeView, setSelectedCodeView] = useState<CodeView["id"]>("blocks")

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
  const activePrinciple = principles.find((principle) => principle.id === selectedPrinciple) ?? principles[0]
  const activeObject = testObjects.find((object) => object.id === selectedObject) ?? testObjects[0]
  const activeCodeView = codeViews.find((view) => view.id === selectedCodeView) ?? codeViews[0]

  return (
    <div className="bg-[#edf3f8] text-slate-900">
      <section className="relative overflow-hidden bg-[#07192d] text-white">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(rgba(164,201,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(164,201,255,0.12) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 18% 20%, rgba(58,145,255,0.26), transparent 22%), radial-gradient(circle at 80% 18%, rgba(109,255,197,0.16), transparent 18%), linear-gradient(135deg, rgba(7,25,45,0.98), rgba(10,40,68,0.96) 56%, rgba(6,19,30,0.98))",
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

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.04fr_0.96fr]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#b8f2d7] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-[#10392c]">
                Official LEGO Education Build
              </div>
              <h1 className="mt-5 text-5xl font-black tracking-tight text-white md:text-6xl">
                Super Cleanup Grabber Robot
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/82">
                This page is built around LEGO Education&apos;s official SPIKE Prime{" "}
                <span className="font-semibold text-white">Super Cleanup</span> lesson. Instead of
                a vague robot teaser, you get a specific grabber mission, real source links, and a
                clear explanation of why the robot stays balanced, grabs objects, and responds to
                code.
              </p>

              <div className="mt-7 flex flex-wrap gap-3 text-sm text-white/90">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2">
                  <Star className="h-4 w-4 text-[#ffe37c]" />
                  {project.difficulty}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2">
                  <Clock className="h-4 w-4 text-[#8ed0ff]" />
                  {project.time}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2 font-mono">
                  <Bot className="h-4 w-4 text-[#a8f0c8]" />
                  SPIKE Prime Set #45678
                </span>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {specCards.map((card) => (
                  <div
                    key={card.label}
                    className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8ed0ff]">
                      {card.label}
                    </p>
                    <p className="mt-3 font-mono text-lg font-bold text-white">{card.value}</p>
                    <p className="mt-2 text-sm leading-6 text-white/72">{card.helper}</p>
                  </div>
                ))}
              </div>

              <BlueprintNote title="Source-backed, not made up" tone="mint" className="mt-8 max-w-lg lg:ml-10">
                The official build books contain the exact snapping order. This page acts like the
                engineering coach beside them, showing what each subsystem is doing and why the
                design choices matter.
              </BlueprintNote>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-[#0d2238]/85 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.34)] backdrop-blur">
                <div className="flex items-center justify-between rounded-[1.4rem] border border-white/8 bg-[#0b1b30] px-4 py-3">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#8ed0ff]">
                    Mission Preview
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
                    <Play className="h-3.5 w-3.5" />
                    animated concept view
                  </span>
                </div>

                <div className="mt-4 rounded-[1.7rem] bg-[linear-gradient(180deg,#07121f_0%,#0b1828_100%)] p-4">
                  <RobotMotionPreview />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {resourceLinks.map((link) => {
                  const Icon = link.icon

                  return (
                    <a
                      key={link.title}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-[1.5rem] border border-white/10 bg-white/8 p-4 transition-colors hover:bg-white/12"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#a8f0c8]">
                          <Icon className="h-5 w-5" />
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-white/55 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                      <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-white">
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

      <section className="relative overflow-hidden bg-[#eff4f8]">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(32,74,123,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(32,74,123,0.05) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0c243d] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-white">
              Part Catalog
            </div>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-[#0f2439]">
              The exact pieces you should be thinking about.
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#4a6178]">
              &quot;LEGO bricks&quot; is too fuzzy for a robot project. This build makes the most sense
              when you think in subsystems: brain, motor, sensor, frame, connectors, and grabber.
            </p>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_310px]">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {partCards.map((part) => {
                const Icon = part.icon

                return (
                  <div
                    key={part.name}
                    className={`rounded-[1.8rem] bg-gradient-to-br ${part.accent} p-6 shadow-[0_20px_60px_rgba(15,36,57,0.08)]`}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/60 text-[#143453] shadow-sm">
                      <Icon className="h-7 w-7" />
                    </div>
                    <p className="mt-5 font-mono text-xs font-black uppercase tracking-[0.18em] text-[#21415f]">
                      {part.name}
                    </p>
                    <p className="mt-2 font-mono text-sm font-bold text-[#163451]">{part.amount}</p>
                    <p className="mt-3 text-sm leading-7 text-[#38536d]">{part.note}</p>
                  </div>
                )
              })}
            </div>

            <aside className="rounded-[2rem] border border-[#bdd3e8] bg-white p-6 shadow-[0_22px_60px_rgba(15,36,57,0.08)]">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#e6f2ff] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#17446b]">
                Alternative Path
              </div>
              <h3 className="mt-4 text-2xl font-black text-[#102847]">Don&apos;t have a motor?</h3>
              <p className="mt-3 text-sm leading-7 text-[#4f667d]">
                Build a rubber-band-powered claw on a wheeled base. It will not match the official
                SPIKE Prime robot, but it still teaches claw geometry, balance, and motion transfer
                in a simpler way.
              </p>

              <div className="mt-5 rounded-[1.6rem] bg-[#fff3c4] px-5 py-5 text-[#684a02]">
                <p className="text-xs font-black uppercase tracking-[0.18em]">Home remix idea</p>
                <p className="mt-3 text-sm leading-7">
                  Use beams to make the jaws, add a stretched rubber band to pull them shut, and
                  open the claw by hand for each test. You still get the engineering lesson even
                  without the programmed motion.
                </p>
              </div>

              <div className="mt-5 rounded-[1.6rem] bg-[#eaf7ef] px-5 py-5 text-[#1a4a34]">
                <p className="text-xs font-black uppercase tracking-[0.18em]">Inside the box</p>
                <p className="mt-3 text-sm leading-7">
                  This guide is optimized for the official LEGO Education SPIKE Prime set
                  <span className="font-mono font-bold"> #45678</span>.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0b1e35] text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(161,201,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(161,201,255,0.12) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[0.96fr_1.04fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#8ed0ff]/12 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-[#8ed0ff]">
                How It Works
              </div>
              <h2 className="mt-5 text-4xl font-black tracking-tight">
                The robot feels smarter when you can see the hidden engineering.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/76">
                A good robotics guide should not stop at &quot;attach the arm.&quot; Pick a lens below to
                see how balance, motion, and code work together in this specific grabber build.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {principles.map((principle) => (
                  <button
                    key={principle.id}
                    type="button"
                    onClick={() => setSelectedPrinciple(principle.id)}
                    className={`rounded-full px-5 py-3 text-sm font-bold transition-colors ${
                      selectedPrinciple === principle.id
                        ? "bg-[#8ed0ff] text-[#09213d]"
                        : "bg-white/8 text-white hover:bg-white/12"
                    }`}
                  >
                    {principle.title}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-[1.8rem] bg-white/8 p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a8f0c8]">
                  {activePrinciple.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-black">{activePrinciple.title}</h3>
                <p className="mt-4 text-base leading-8 text-white/82">{activePrinciple.summary}</p>

                <div className="mt-6 space-y-3">
                  {activePrinciple.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-3 rounded-2xl bg-white/6 px-4 py-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#a8f0c8]" />
                      <p className="text-sm leading-7 text-white/78">{bullet}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[1.6rem] bg-[#fff4b8] px-5 py-4 text-[#503a02] shadow-sm">
                  <p className="text-xs font-black uppercase tracking-[0.18em]">Engineering clue</p>
                  <p className="mt-2 text-sm leading-7">{activePrinciple.caption}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#091829] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.28)]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8ed0ff]">
                Ghosted Diagram
              </p>
              <div className="mt-4 rounded-[1.6rem] bg-[#0d2034] p-4">
                <PrincipleBoard principle={selectedPrinciple} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#08111d] text-white">
        <div
          className="absolute inset-0 opacity-20"
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
                <div className="inline-flex items-center gap-2 rounded-full bg-[#8ed0ff]/12 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#8ed0ff]">
                  Build Sequence
                </div>
                <h2 className="mt-4 text-3xl font-black">Progress Tracker</h2>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  Use the official build books for the exact clicks and connections. Use this
                  tracker to understand what each stage is trying to achieve.
                </p>

                <div className="mt-5">
                  <Progress
                    value={progress}
                    className="h-3 bg-white/10 [&_[data-slot=progress-indicator]]:bg-[#a8f0c8]"
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
                          ? "bg-[#8ed0ff]/14 text-white"
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

                <div className="mt-6 rounded-[1.6rem] bg-[#fff4b8] px-4 py-4 text-[#503a02] shadow-sm">
                  <p className="text-xs font-black uppercase tracking-[0.18em]">Key promise</p>
                  <p className="mt-2 text-sm leading-7">
                    Every step here is tied to the official LEGO Education lesson or build books, so
                    the page stays specific instead of turning into a made-up robot fantasy.
                  </p>
                </div>
              </div>
            </aside>

            <div className="relative space-y-8 before:absolute before:left-7 before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-gradient-to-b before:from-[#8ed0ff] before:via-[#a8f0c8]/50 before:to-transparent">
              {buildSteps.map((step, index) => {
                const diagramFirst = index % 2 === 0

                return (
                  <article
                    key={step.id}
                    id={step.id}
                    className="scroll-mt-28 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.08))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur"
                  >
                    <div className="flex items-start gap-4">
                      <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#a8f0c8] text-[#062235] shadow-lg">
                        <span className="text-lg font-black">{index + 1}</span>
                      </span>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8ed0ff]">
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
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8ed0ff]">
                            Blueprint view
                          </p>
                          <div className="mt-4 rounded-[1.5rem] bg-[#10213a] p-4">
                            <SubsystemDiagram variant={step.diagram} />
                          </div>
                        </div>
                      </div>

                      <div className={diagramFirst ? "" : "lg:order-1"}>
                        <div className="space-y-4">
                          <InfoPanel title="Why this stage matters" tone="navy">
                            {step.engineering}
                          </InfoPanel>
                          <InfoPanel title="Official source note" tone="yellow">
                            {step.official}
                          </InfoPanel>

                          <div className="rounded-[1.6rem] bg-white/8 p-5">
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a8f0c8]">
                              Checkpoints
                            </p>
                            <div className="mt-4 space-y-3">
                              {step.checkpoints.map((checkpoint) => (
                                <div
                                  key={checkpoint}
                                  className="flex items-start gap-3 rounded-2xl bg-white/6 px-4 py-4"
                                >
                                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#a8f0c8]" />
                                  <p className="text-sm leading-7 text-white/78">{checkpoint}</p>
                                </div>
                              ))}
                            </div>

                            <div className="mt-5 flex flex-wrap gap-2">
                              {step.focus.map((tag) => (
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

      <section className="relative overflow-hidden bg-[#f7f3ea]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 xl:grid-cols-[1.02fr_0.98fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#12304e] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-white">
                Control Logic
              </div>
              <h2 className="mt-5 text-4xl font-black tracking-tight text-[#102847]">
                Code is easier when the mission is split into small jobs.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-[#4f667d]">
                The official Python lesson focuses on multiple functions for this cleanup robot.
                That is the right instinct: one job for grabbing, one for moving, one for
                releasing.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {codeViews.map((view) => (
                  <button
                    key={view.id}
                    type="button"
                    onClick={() => setSelectedCodeView(view.id)}
                    className={`rounded-full px-5 py-3 text-sm font-bold transition-colors ${
                      selectedCodeView === view.id
                        ? "bg-[#102847] text-white"
                        : "bg-white text-[#173a5a] hover:bg-[#e8eff7]"
                    }`}
                  >
                    {view.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-[2rem] border border-[#d4deea] bg-[#0f1d31] p-5 shadow-[0_18px_50px_rgba(16,40,71,0.08)]">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8ed0ff]">
                  {activeCodeView.eyebrow}
                </p>
                <div className="mt-4 rounded-[1.6rem] bg-[#07111d] p-5 font-mono text-sm shadow-inner">
                  {activeCodeView.lines.map((line, index) => (
                    <p key={`${activeCodeView.id}-${index}`} className="leading-8">
                      {line.map((token) => (
                        <span
                          key={`${activeCodeView.id}-${index}-${token.text}`}
                          className={codeToneClasses[token.kind ?? "plain"]}
                        >
                          {token.text}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-7 text-white/78">{activeCodeView.description}</p>
              </div>

              <div className="mt-6 rounded-[1.8rem] bg-[#fff4b8] px-5 py-5 text-[#5a4104] shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.18em]">Deep dive</p>
                <p className="mt-3 text-sm leading-7">
                  A force sensor gives your program a way to react to the world. Without sensing,
                  the robot just hopes the object is in the right spot. With sensing, it can check
                  before it grabs or after it bumps into something.
                </p>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#12304e] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-white">
                Test Lab
              </div>
              <h2 className="mt-5 text-4xl font-black tracking-tight text-[#102847]">
                Choose a test object and think like an engineer.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-[#4f667d]">
                The official lesson is about comparing grabber designs using test criteria. Pick an
                object below and let it tell you what the robot is good at or still needs to fix.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {testObjects.map((object) => (
                  <button
                    key={object.id}
                    type="button"
                    onClick={() => setSelectedObject(object.id)}
                    className={`rounded-full px-5 py-3 text-sm font-bold transition-colors ${
                      selectedObject === object.id
                        ? "bg-[#102847] text-white"
                        : "bg-white text-[#173a5a] hover:bg-[#e8eff7]"
                    }`}
                  >
                    {object.name}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-[2rem] border border-[#d4deea] bg-white p-6 shadow-[0_18px_50px_rgba(16,40,71,0.08)]">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2f6ca6]">
                  Selected object
                </p>
                <h3 className="mt-3 text-2xl font-black text-[#102847]">{activeObject.name}</h3>
                <p className="mt-4 text-sm leading-7 text-[#4f667d]">
                  <span className="font-semibold text-[#102847]">Challenge:</span>{" "}
                  {activeObject.challenge}
                </p>
                <p className="mt-3 text-sm leading-7 text-[#4f667d]">
                  <span className="font-semibold text-[#102847]">Engineer question:</span>{" "}
                  {activeObject.question}
                </p>
                <div className="mt-5 rounded-[1.5rem] bg-[#eef6ff] px-5 py-4 text-[#163d61]">
                  <p className="text-xs font-black uppercase tracking-[0.18em]">What this test reveals</p>
                  <p className="mt-2 text-sm leading-7">{activeObject.insight}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <InfoPanel title="Fair-test rule" tone="mint">
                  Change only one thing at a time. If you change the claw shape, object, and code
                  all at once, you will not know what caused the result.
                </InfoPanel>
                <InfoPanel title="Score sheet idea" tone="navy">
                  Track success, speed, and whether the object slipped out. Real robot testing is
                  about evidence, not just vibes.
                </InfoPanel>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#dfeeff]">
        <div
          className="absolute inset-0 opacity-35"
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
              Bonus missions that feel like real robotics upgrades.
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#4f667d]">
              Once the official build is working, do not stop at &quot;cool, it moves.&quot; Upgrade the
              mission by making your tests fairer, your mechanics smarter, or your code more
              modular.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <UpgradeCard
              title="Grabber Showdown"
              subtitle="Compare two jaw shapes"
              accent="from-[#fff2c8] to-[#ffd77a]"
            >
              Build a slightly wider or narrower front jaw and test both versions on the same
              objects. Which one is best for round items? Which one wins on rigid blocks?
            </UpgradeCard>
            <UpgradeCard
              title="No-Motor Remix"
              subtitle="Mechanical-only challenge"
              accent="from-[#d8f7ef] to-[#9fe9d2]"
            >
              Rebuild the claw so a rubber band supplies the closing force. You lose the automatic
              motion, but you gain a cleaner look at linkages and spring energy.
            </UpgradeCard>
            <UpgradeCard
              title="Going Pro"
              subtitle="Make the code modular"
              accent="from-[#e6defd] to-[#c8b7ff]"
            >
              Add separate functions for <span className="font-mono">grab()</span>,{" "}
              <span className="font-mono">drive()</span>, and{" "}
              <span className="font-mono">release()</span>, then test each one alone before you run
              the full cleanup mission.
            </UpgradeCard>
          </div>

          <div className="mt-10 rounded-[2rem] bg-white px-6 py-5 shadow-[0_18px_50px_rgba(16,40,71,0.08)]">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 text-[#f59e0b]" />
              <p className="text-sm leading-7 text-[#4f667d]">
                Want the shortest version of the mission? Build the official robot first, test it
                on two different objects, then explain one mechanical change and one coding change
                you would try next. That answer proves you are thinking like a roboticist.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes lego-arm-swing {
          0%,
          100% {
            transform: rotate(-14deg);
          }

          50% {
            transform: rotate(10deg);
          }
        }

        @keyframes lego-object-bob {
          0%,
          100% {
            transform: translate(0px, 0px);
          }

          50% {
            transform: translate(18px, -10px);
          }
        }

        @keyframes lego-pulse {
          0%,
          100% {
            opacity: 0.28;
          }

          50% {
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  )
}

function BlueprintNote({
  title,
  tone,
  className = "",
  children,
}: {
  title: string
  tone: "mint" | "yellow"
  className?: string
  children: ReactNode
}) {
  const tones = {
    mint: "bg-[#bff4df] text-[#124436]",
    yellow: "bg-[#fff1a8] text-[#3d2f00]",
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

function InfoPanel({
  title,
  tone,
  children,
}: {
  title: string
  tone: "navy" | "yellow" | "mint"
  children: ReactNode
}) {
  const tones = {
    navy: "bg-[#eaf3ff] text-[#143b61]",
    yellow: "bg-[#fff4b8] text-[#5a4104]",
    mint: "bg-[#dff7ed] text-[#1a4a34]",
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
      <p className="mt-2 font-semibold text-[#4f667d]">{subtitle}</p>
      <p className="mt-4 text-sm leading-7 text-[#42556f]">{children}</p>
    </div>
  )
}

function RobotMotionPreview() {
  return (
    <div className="relative h-[360px] overflow-hidden rounded-[1.5rem] border border-white/8 bg-[radial-gradient(circle_at_50%_15%,rgba(142,208,255,0.18),transparent_25%),linear-gradient(180deg,#091524_0%,#07111d_100%)]">
      <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(10,24,40,0),rgba(20,46,73,0.95))]" />
      <div className="absolute left-8 top-7 rounded-full border border-[#8ed0ff]/30 bg-[#0e2338] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8ed0ff]">
        cleanup lane
      </div>

      <div className="absolute bottom-14 left-10 right-10 h-px bg-[#8ed0ff]/20" />

      <div className="absolute bottom-16 left-14 h-16 w-40 rounded-[1.6rem] border border-[#8ed0ff]/25 bg-[#1a3552] shadow-[0_18px_30px_rgba(0,0,0,0.25)]" />
      <div className="absolute bottom-[5.3rem] left-28 h-14 w-16 rounded-[1rem] border border-[#a8f0c8]/25 bg-[#264969]" />
      <div className="absolute bottom-12 left-16 h-9 w-9 rounded-full border-4 border-[#0d1e33] bg-[#ffce6d]" />
      <div className="absolute bottom-12 left-40 h-9 w-9 rounded-full border-4 border-[#0d1e33] bg-[#ffce6d]" />

      <div
        className="absolute bottom-[8.4rem] left-[10.8rem] h-3 w-32 origin-left rounded-full bg-[#8ed0ff] shadow-[0_0_18px_rgba(142,208,255,0.35)]"
        style={{ animation: "lego-arm-swing 3.8s ease-in-out infinite" }}
      >
        <div className="absolute right-2 top-[-0.15rem] h-8 w-2 rounded-full bg-[#bff4df]" />
        <div className="absolute right-5 top-[-0.2rem] h-9 w-2 rounded-full bg-[#bff4df]" />
      </div>

      <div className="absolute left-[13.6rem] bottom-[9.4rem] h-12 w-12 rounded-full border border-[#a8f0c8]/25 bg-[#18314e]" />
      <div className="absolute left-[14.1rem] bottom-[9.9rem] h-2 w-2 rounded-full bg-[#a8f0c8]" />

      <div
        className="absolute bottom-[5.9rem] left-[20rem] h-7 w-7 rounded-lg bg-[#ffb87d] shadow-[0_0_22px_rgba(255,184,125,0.35)]"
        style={{ animation: "lego-object-bob 3.8s ease-in-out infinite" }}
      />

      <div className="absolute right-9 top-10 rounded-[1.2rem] border border-white/8 bg-[#0d1e33]/90 px-4 py-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a8f0c8]">Spec</p>
        <div className="mt-3 space-y-2 font-mono text-xs text-white/78">
          <p>mode = programmed grabber</p>
          <p>sensor = force sensor</p>
          <p>goal = pick, carry, release</p>
        </div>
      </div>

      <div
        className="absolute right-10 top-36 h-24 w-24 rounded-full border border-[#8ed0ff]/20"
        style={{ animation: "lego-pulse 2.3s ease-in-out infinite" }}
      />
      <div
        className="absolute right-16 top-42 h-12 w-12 rounded-full border border-[#8ed0ff]/20"
        style={{ animation: "lego-pulse 2.3s ease-in-out infinite 0.35s" }}
      />
    </div>
  )
}

function PrincipleBoard({ principle }: { principle: PrincipleId }) {
  if (principle === "stability") {
    return (
      <div className="relative h-[300px] overflow-hidden rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,#081322_0%,#0c1a2c_100%)]">
        <div className="absolute bottom-16 left-12 right-12 h-4 rounded-full bg-[#1b3656]" />
        <div className="absolute bottom-20 left-16 h-10 w-12 rounded-full border-4 border-[#0d1e33] bg-[#ffce6d]" />
        <div className="absolute bottom-20 right-16 h-10 w-12 rounded-full border-4 border-[#0d1e33] bg-[#ffce6d]" />
        <div className="absolute bottom-24 left-24 right-24 h-16 rounded-[1.4rem] border border-[#8ed0ff]/20 bg-[#20405f]" />
        <div className="absolute bottom-40 left-[44%] h-14 w-14 rounded-full border border-[#a8f0c8]/30 bg-[#1d3754]" />
        <div className="absolute bottom-[11.2rem] left-[47.5%] h-4 w-4 rounded-full bg-[#a8f0c8]" />
        <div className="absolute bottom-16 left-1/2 h-28 w-px -translate-x-1/2 border-l border-dashed border-[#a8f0c8]" />
        <div className="absolute left-10 top-8 rounded-full bg-[#10243a] px-3 py-1 font-mono text-xs text-[#8ed0ff]">
          center of gravity stays between the wheels
        </div>
      </div>
    )
  }

  if (principle === "motion") {
    return (
      <div className="relative h-[300px] overflow-hidden rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,#081322_0%,#0c1a2c_100%)]">
        <div className="absolute bottom-16 left-14 h-14 w-14 rounded-full border border-[#a8f0c8]/30 bg-[#19314b]" />
        <div className="absolute bottom-[5.7rem] left-[5.2rem] h-4 w-4 rounded-full bg-[#a8f0c8]" />
        <div className="absolute bottom-24 left-24 h-3 w-36 rounded-full bg-[#8ed0ff]" />
        <div className="absolute bottom-[6.4rem] left-[19rem] h-12 w-2 rounded-full bg-[#bff4df]" />
        <div className="absolute bottom-[6.1rem] left-[18rem] h-10 w-2 rotate-[18deg] rounded-full bg-[#bff4df]" />
        <div className="absolute bottom-[6.1rem] left-[20rem] h-10 w-2 -rotate-[18deg] rounded-full bg-[#bff4df]" />
        <div className="absolute bottom-14 left-[22rem] h-7 w-7 rounded-lg bg-[#ffb87d]" />
        <div className="absolute left-10 top-8 rounded-full bg-[#10243a] px-3 py-1 font-mono text-xs text-[#8ed0ff]">
          motor spin -&gt; linkage -&gt; grabbing motion
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-[300px] overflow-hidden rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,#081322_0%,#0c1a2c_100%)]">
      <div className="absolute left-10 top-10 rounded-[1.4rem] border border-[#8ed0ff]/25 bg-[#17314d] px-5 py-4">
        <p className="font-mono text-sm font-bold text-white">Force Sensor</p>
      </div>
      <div className="absolute left-[11rem] top-[4.5rem] h-px w-20 border-t border-dashed border-[#8ed0ff]" />
      <div className="absolute left-[16rem] top-10 rounded-[1.4rem] border border-[#a8f0c8]/25 bg-[#20405f] px-5 py-4">
        <p className="font-mono text-sm font-bold text-white">SPIKE Hub</p>
      </div>
      <div className="absolute left-[23rem] top-[4.5rem] h-px w-20 border-t border-dashed border-[#8ed0ff]" />
      <div className="absolute left-[28rem] top-10 rounded-[1.4rem] border border-[#ffe08c]/25 bg-[#3f3a1f] px-5 py-4">
        <p className="font-mono text-sm font-bold text-white">Motor</p>
      </div>
      <div className="absolute left-[17.5rem] top-[9rem] rounded-full bg-[#fff4b8] px-3 py-1 font-mono text-xs text-[#5a4104]">
        if pressed -&gt; grab
      </div>
      <div className="absolute left-10 top-8 rounded-full bg-[#10243a] px-3 py-1 font-mono text-xs text-[#8ed0ff]">
        sensor input -&gt; code decision -&gt; motor action
      </div>
    </div>
  )
}

function SubsystemDiagram({ variant }: { variant: BuildStep["diagram"] }) {
  const boardClassName =
    "relative h-[220px] overflow-hidden rounded-[1.4rem] border border-white/8 bg-[linear-gradient(180deg,#091829_0%,#10213a_100%)]"

  if (variant === "prep") {
    return (
      <div className={boardClassName}>
        <div className="absolute left-8 top-8 rounded-[1rem] border border-[#8ed0ff]/25 bg-[#17314d] px-5 py-4 font-mono text-sm text-white">
          Lesson
        </div>
        <div className="absolute left-36 top-8 rounded-[1rem] border border-[#8ed0ff]/25 bg-[#17314d] px-5 py-4 font-mono text-sm text-white">
          Book 1
        </div>
        <div className="absolute left-64 top-8 rounded-[1rem] border border-[#8ed0ff]/25 bg-[#17314d] px-5 py-4 font-mono text-sm text-white">
          Book 2
        </div>
        <div className="absolute left-12 top-28 h-12 w-16 rounded-xl bg-[#a8f0c8]" />
        <div className="absolute left-36 top-28 h-12 w-16 rounded-xl bg-[#ffce6d]" />
        <div className="absolute left-60 top-28 h-12 w-16 rounded-xl bg-[#ffb87d]" />
        <div className="absolute left-84 top-28 h-12 w-16 rounded-xl bg-[#c8b7ff]" />
      </div>
    )
  }

  if (variant === "base") {
    return (
      <div className={boardClassName}>
        <div className="absolute bottom-14 left-12 right-12 h-6 rounded-[1.2rem] bg-[#20405f]" />
        <div className="absolute bottom-20 left-24 right-24 h-16 rounded-[1.3rem] border border-[#8ed0ff]/25 bg-[#17314d]" />
        <div className="absolute bottom-10 left-16 h-10 w-10 rounded-full border-4 border-[#0d1e33] bg-[#ffce6d]" />
        <div className="absolute bottom-10 right-16 h-10 w-10 rounded-full border-4 border-[#0d1e33] bg-[#ffce6d]" />
        <div className="absolute left-8 top-8 rounded-full bg-[#10243a] px-3 py-1 font-mono text-xs text-[#8ed0ff]">
          keep the heavy parts low
        </div>
      </div>
    )
  }

  if (variant === "arm") {
    return (
      <div className={boardClassName}>
        <div className="absolute bottom-16 left-12 right-12 h-5 rounded-[1rem] bg-[#20405f]" />
        <div className="absolute bottom-20 left-28 h-20 w-5 rounded-full bg-[#8ed0ff]" />
        <div className="absolute bottom-[7.5rem] left-32 h-3 w-32 -rotate-[18deg] rounded-full bg-[#a8f0c8]" />
        <div className="absolute left-8 top-8 rounded-full bg-[#10243a] px-3 py-1 font-mono text-xs text-[#8ed0ff]">
          pivot point for reach
        </div>
      </div>
    )
  }

  if (variant === "grabber") {
    return (
      <div className={boardClassName}>
        <div className="absolute bottom-16 left-12 right-16 h-5 rounded-[1rem] bg-[#20405f]" />
        <div className="absolute bottom-20 left-28 h-20 w-5 rounded-full bg-[#8ed0ff]" />
        <div className="absolute bottom-[7.5rem] left-32 h-3 w-28 -rotate-[18deg] rounded-full bg-[#a8f0c8]" />
        <div className="absolute bottom-[6.8rem] left-[16.5rem] h-11 w-2 rotate-[18deg] rounded-full bg-[#bff4df]" />
        <div className="absolute bottom-[6.8rem] left-[18rem] h-11 w-2 -rotate-[18deg] rounded-full bg-[#bff4df]" />
        <div className="absolute bottom-[5.9rem] left-[20rem] h-7 w-7 rounded-lg bg-[#ffb87d]" />
        <div className="absolute left-8 top-8 rounded-full bg-[#10243a] px-3 py-1 font-mono text-xs text-[#8ed0ff]">
          jaw shape decides the grip
        </div>
      </div>
    )
  }

  if (variant === "code") {
    return (
      <div className={boardClassName}>
        <div className="absolute left-10 top-8 rounded-[1rem] border border-[#a8f0c8]/25 bg-[#17314d] px-4 py-3 font-mono text-sm text-white">
          grab()
        </div>
        <div className="absolute left-10 top-20 rounded-[1rem] border border-[#8ed0ff]/25 bg-[#17314d] px-4 py-3 font-mono text-sm text-white">
          drive()
        </div>
        <div className="absolute left-10 top-32 rounded-[1rem] border border-[#ffe08c]/25 bg-[#17314d] px-4 py-3 font-mono text-sm text-white">
          release()
        </div>
        <div className="absolute left-48 top-20 rounded-[1.2rem] border border-[#8ed0ff]/25 bg-[#20405f] px-5 py-4 font-mono text-sm text-white">
          cleanup mission
        </div>
      </div>
    )
  }

  return (
    <div className={boardClassName}>
      <div className="absolute left-10 top-8 rounded-[1rem] border border-[#8ed0ff]/25 bg-[#17314d] px-4 py-3 font-mono text-sm text-white">
        object
      </div>
      <div className="absolute left-10 top-20 rounded-[1rem] border border-[#a8f0c8]/25 bg-[#17314d] px-4 py-3 font-mono text-sm text-white">
        success?
      </div>
      <div className="absolute left-10 top-32 rounded-[1rem] border border-[#ffe08c]/25 bg-[#17314d] px-4 py-3 font-mono text-sm text-white">
        notes
      </div>
      <div className="absolute left-52 top-16 rounded-[1.2rem] border border-[#8ed0ff]/25 bg-[#20405f] px-5 py-4 font-mono text-sm text-white">
        compare results
      </div>
    </div>
  )
}
