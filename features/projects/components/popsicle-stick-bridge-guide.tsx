"use client"

import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Clock,
  Download,
  Layers3,
  Package,
  Ruler,
  Scale,
  Sparkles,
  Star,
  Triangle,
} from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { getProjectGuide, type ProjectGuide } from "@/features/projects/data"

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

type VideoBuildStep = {
  title: string
  description: string
}

type BuildHighlight = {
  title: string
  description: string
}

const printableTemplateUrl = "/images/projects/popsicle-stick-bridge/template.svg"
const videoGuide = {
  title: "Easy Popsicle Stick Bridge",
  creator: "Physics Burns (Raymond Burns)",
  watchUrl: "https://www.youtube.com/watch?v=s3HZievz_3Y",
  embedUrl: "https://www.youtube-nocookie.com/embed/s3HZievz_3Y?rel=0",
}

const bridgeLabels = {
  es: {
    "Truss Lab": "Laboratorio de Cerchas",
    "compression + tension": "compresion + tension",
    "What you'll build": "Lo que construiras",
    "Physics words": "Palabras de fisica",
    "Builder trick": "Truco del constructor",
    "Science Secret": "Secreto cientifico",
    "Finished Bridge": "Puente terminado",
    "final build preview": "vista previa final",
    "Build Along": "Construye paso a paso",
    "Follow the the video to build your very own truss bridge!":
      "Sigue el video para construir tu propio puente de cercha!",
    "Materials In This Build": "Materiales de esta construccion",
    "Video Glue Tip": "Consejo de pegamento del video",
    Safety: "Seguridad",
    "Video step": "Paso del video",
    "Anatomy of a Bridge": "Anatomia de un puente",
    "Real bridge reference diagram": "Diagrama de referencia de un puente real",
    "How to use it": "Como usarlo",
    "Level Up": "Nivel superior",
    "Bonus missions for bridge engineers who want more.":
      "Misiones extra para ingenieros de puentes que quieren mas.",
    "Bonus mission": "Mision extra",
  },
  zh: {
    "Truss Lab": "桁架实验室",
    "compression + tension": "压缩 + 拉伸",
    "What you'll build": "你将建造的内容",
    "Physics words": "物理词汇",
    "Builder trick": "搭建技巧",
    "Science Secret": "科学小秘密",
    "Finished Bridge": "完成的桥",
    "final build preview": "成品预览",
    "Build Along": "跟着一起搭建",
    "Follow the the video to build your very own truss bridge!":
      "跟着视频搭建你自己的桁架桥！",
    "Materials In This Build": "本次搭建材料",
    "Video Glue Tip": "视频热胶提示",
    Safety: "安全",
    "Video step": "视频步骤",
    "Anatomy of a Bridge": "桥梁结构",
    "Real bridge reference diagram": "真实桥梁参考图",
    "How to use it": "如何使用",
    "Level Up": "进阶挑战",
    "Bonus missions for bridge engineers who want more.": "给想继续挑战的桥梁工程师的额外任务。",
    "Bonus mission": "额外任务",
  },
} as const

const resourceLinks: ResourceLink[] = [
  {
    title: "Printable Template",
    subtitle: "Optional extra if you want a traced layout",
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
    subtitle: "Physics Burns guide used for the steps below",
    href: videoGuide.watchUrl,
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

const buildHighlights: BuildHighlight[] = [
  {
    title: "Hot glue timing",
    description: "The video stresses placing the next stick right away, then pressing for a few seconds so the joint grabs firmly.",
  },
  {
    title: "Two drying pauses",
    description: "There is a hardening break after the two side trusses and another one after the full bridge is assembled.",
  },
  {
    title: "Triangles first",
    description: "The build gets its strength from staggered triangle panels and diagonal braces, not from random extra sticks.",
  },
]

const videoBuildSteps: VideoBuildStep[] = [
  {
    title: "Mark the alignment sticks and cut the splice pieces",
    description:
      "Mark about 16 popsicle sticks at the quarter points. Then cut 4 of those sticks in half so you have short pieces ready for overlapping the long joints.",
  },
  {
    title: "Glue two long rails",
    description:
      "Use the quarter marks to line up the joints, then splice whole sticks together into 2 long rails. Each finished rail ends up about 4 stick lengths long, or roughly 18 inches.",
  },
  {
    title: "Build the first side with 4 triangle panels",
    description:
      "Lay one rail flat and glue 4 upright triangles onto it in a row. Keep the spacing even because this first side becomes the pattern for the whole bridge.",
  },
  {
    title: "Add 3 staggered triangles between them",
    description:
      "Fill the gaps with 3 more triangles so the side turns into a staggered crisscross truss instead of a simple row of separate shapes.",
  },
  {
    title: "Cap the truss and sandwich it with a second layer",
    description:
      "Flip the side, glue on the top rail to connect the triangle tips, then flip again and add another layer of sticks over the triangle faces so the truss is sandwiched and stiffer.",
  },
  {
    title: "Repeat the same pattern to make the second side",
    description:
      "Build a second matching truss the same way. The creator also shows extra half pieces added at the ends so both side walls match the finished example.",
  },
  {
    title: "Let the sides harden, then connect them squarely",
    description:
      "Wait about 15 minutes, stand the two trusses upright, and glue cross pieces between them. Keep the sides perpendicular to the connectors, and leave a little overhang where the video shows it for later bracing.",
  },
  {
    title: "Add top, bottom, and diagonal braces",
    description:
      "Glue the rest of the cross pieces so the top and bottom connectors tie directly into the side trusses, then add the diagonal supports inside the bridge and along the outer faces.",
  },
  {
    title: "Reinforce, let it harden again, and test carefully",
    description:
      "Add extra glue anywhere a joint looks weak, give the full bridge another hardening break, and then test it slowly between two supports with weight added a little at a time.",
  },
]

export function PopsicleStickBridgeGuide({ project }: { project: ProjectGuide }) {
  const { language, t } = useLanguage()
  const guideProject = getProjectGuide(project.slug, language) ?? project
  const activeLabels = language === "es" || language === "zh" ? bridgeLabels[language] : undefined
  const translate = (text: string) => activeLabels?.[text as keyof typeof activeLabels] ?? text

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
            {t.projectsPage.backToProjects}
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.98fr]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#c9f0dd] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-[#12392e]">
                {translate("Truss Lab")}
              </div>
              <h1 className="mt-5 text-5xl font-black tracking-tight text-white md:text-6xl">
                {guideProject.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/82">
                {language === "en"
                  ? "Build a real truss bridge, not just a pile of craft sticks. This page shows the force paths, the bridge anatomy, and the sub-assemblies so the project feels like structural engineering instead of mystery glue."
                  : guideProject.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-3 text-sm text-white/90">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2">
                  <Star className="h-4 w-4 text-[#ffe37c]" />
                  {guideProject.difficulty}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2">
                  <Clock className="h-4 w-4 text-[#8ecfff]" />
                  {guideProject.time}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2 font-mono">
                  <Scale className="h-4 w-4 text-[#bff4df]" />
                  {translate("compression + tension")}
                </span>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <HeroInfoCard
                  icon={Triangle}
                  title={translate("What you'll build")}
                  description={
                    language === "en"
                      ? "A truss bridge with two side walls, a deck, and top bracing."
                      : guideProject.introduction[0]
                  }
                />
                <HeroInfoCard
                  icon={Scale}
                  title={translate("Physics words")}
                  description={
                    language === "en"
                      ? "Compression, tension, load paths, and weight distribution."
                      : guideProject.why
                  }
                />
                <HeroInfoCard
                  icon={Ruler}
                  title={translate("Builder trick")}
                  description={
                    language === "en"
                      ? "Mark quarter points first so the rails line up and the trusses stay consistent."
                      : guideProject.challenge
                  }
                />
              </div>

              <BridgeNote title={translate("Science Secret")} tone="yellow" className="mt-8 max-w-md lg:ml-8">
                {language === "en"
                  ? "Triangles matter because they lock the shape. Squares can lean into diamonds, but a triangle keeps its geometry unless a member actually bends or breaks."
                  : guideProject.why}
              </BridgeNote>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-[#0d2238]/88 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.34)] backdrop-blur">
                <div className="flex items-center justify-between rounded-[1.4rem] border border-white/8 bg-[#0b1c31] px-4 py-3">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#8ecfff]">
                    {translate("Finished Bridge")}
                  </span>
                  <span className="rounded-full bg-white/8 px-3 py-1 font-mono text-[11px] text-white/64">
                    {translate("final build preview")}
                  </span>
                </div>

                <div className="mt-4 rounded-[1.7rem] bg-[linear-gradient(180deg,#07121f_0%,#0b1828_100%)] p-4">
                  <div className="relative h-[360px] overflow-hidden rounded-[1.4rem] border border-white/8">
                    <Image src={guideProject.image} alt={guideProject.title} fill className="object-cover" />
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

      <section className="relative overflow-hidden bg-[#edf4df]">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(rgba(16,40,71,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(16,40,71,0.06) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 xl:grid-cols-[1.02fr_0.98fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#102847] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-white">
                {translate("Build Along")}
              </div>
              <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-[#102847]">
                {translate("Follow the the video to build your very own truss bridge!")}
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[#52667f]">
                The guide below follows the video sequence closely, but in cleaner written steps so
                students can pause, check where they are, and keep building without guessing what
                comes next.
              </p>

              <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#cfd9e5] bg-white shadow-[0_20px_60px_rgba(16,40,71,0.08)]">
                <div className="aspect-video w-full bg-[#08182a]">
                  <iframe
                    src={videoGuide.embedUrl}
                    title={`${videoGuide.title} by ${videoGuide.creator}`}
                    className="h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-[#52667f]">
                Video source:{" "}
                <a
                  href={videoGuide.watchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[#102847] underline decoration-[#7eb8ff] underline-offset-4"
                >
                  {videoGuide.title}
                </a>{" "}
                by {videoGuide.creator}.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {buildHighlights.map((highlight) => (
                  <div
                    key={highlight.title}
                    className="rounded-[1.7rem] border border-[#cdd8c7] bg-white px-5 py-5 shadow-[0_16px_40px_rgba(16,40,71,0.05)]"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2f6ca6]">
                      {highlight.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#52667f]">{highlight.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[2rem] border border-[#cfd9e5] bg-white p-6 shadow-[0_20px_60px_rgba(16,40,71,0.08)]">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2f6ca6]">
                  {translate("Materials In This Build")}
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {guideProject.materials.map((material) => (
                    <div
                      key={material}
                      className="rounded-[1.3rem] bg-[#eef6ff] px-4 py-4 text-sm leading-6 text-[#163d61]"
                    >
                      {material}
                    </div>
                  ))}
                </div>
              </div>

              <BridgeNote title={translate("Video Glue Tip")} tone="mint">
                {language === "en"
                  ? "The creator works with hot glue, so treat each joint like a race against cooling: place the stick right away and press it together for a few seconds before moving on."
                  : guideProject.introduction[1]}
              </BridgeNote>

              <BridgeNote title={translate("Safety")} tone="yellow">
                {guideProject.safety}
              </BridgeNote>
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {videoBuildSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-[1.9rem] border border-[#cfd9e5] bg-white px-6 py-6 shadow-[0_16px_40px_rgba(16,40,71,0.06)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#102847] text-lg font-black text-white">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2f6ca6]">
                      {translate("Video step")}
                    </p>
                    <h3 className="mt-2 text-2xl font-black text-[#102847]">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#52667f]">{step.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f6efe5]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 xl:grid-cols-[0.98fr_1.02fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#132f4e] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-white">
                {translate("Anatomy of a Bridge")}
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
                  {translate("Real bridge reference diagram")}
                </p>
                <div className="mt-4 rounded-[1.6rem] bg-[#eef4fa] p-4">
                  <img
                    src="/images/projects/popsicle-stick-bridge/diagram.png"
                    alt="Labeled truss bridge reference diagram showing top lateral bracing, top chord, diagonals, verticals, floor beams, deck, and bottom chord."
                    className="w-full rounded-[1.2rem] border border-[#dbe6f2] bg-white"
                  />
                </div>
                <div className="mt-4 rounded-[1.5rem] bg-[#eef6ff] px-5 py-4 text-[#163d61]">
                  <p className="text-xs font-black uppercase tracking-[0.18em]">{translate("How to use it")}</p>
                  <p className="mt-2 text-sm leading-7">
                    {language === "en"
                      ? "Your popsicle-stick bridge will be a simpler version of this kind of structure. The most important labels for your model are the top chord, bottom chord, diagonals, deck, and top lateral bracing."
                      : guideProject.introduction[0]}
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
              {translate("Level Up")}
              </div>
              <h2 className="mt-5 text-4xl font-black tracking-tight text-[#102847]">
              {translate("Bonus missions for bridge engineers who want more.")}
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
