# Games Page Redesign — Phase 1 (Page Shell) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the `/games` page shell — hero, "Not sure where to start?", grouped table of contents, 3 reordered subject-group sections, and a mechanical pill/badge cleanup sweep across all 12 activity components — per `docs/superpowers/specs/2026-06-11-games-page-redesign-design.md`.

**Architecture:** `components/pages/games-page-content.tsx` is rewritten to remove the `cards`/`GameCard` grid and the 3 hero pills, add a grouped table-of-contents and 3 group-intro headers, and reorder the 12 activity `<div id="...">` sections into Code & Logic / Build & Test / Science Lab. `components/ui/curiosity-compass.tsx` is replaced by a new `components/ui/start-here.tsx` that recommends one of the 3 on-page groups. Each of the 12 activity components gets two mechanical markup edits: the dashed-pill eyebrow becomes plain text, and "Did you know"-style micro-labels are dropped in favor of plain headings. New translation keys are added (and dead ones removed) across `en`/`es`/`zh` in `i18n/translations.ts`.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript, lucide-react, existing `useLanguage()` i18n hook, `FadeIn` animation component.

---

### Task 1: Translation updates (en / es / zh)

**Files:**
- Modify: `i18n/translations.ts`

This task rewrites the `gamesPage` header block (hero copy + new TOC/group/start-here keys, removing dead keys) and removes the unused `home.compass*` block, in all three languages.

- [ ] **Step 1: EN — rewrite `gamesPage` header block**

In `i18n/translations.ts`, find this block (around line 537):

```ts
    metaTitle: "Interactive STEM Labs | Avanza STEM",
    metaDesc: "Explore browser-based STEM activities, including real Python, a physics-driven block tower, an interactive bridge load test, an atom builder, and more.",
    eyebrow: "Interactive labs",
    title: "Explore interactive STEM labs",
    description: "Every activity on this page teaches something real: physics, code, chemistry, engineering. They all run right in your browser, no install, no login.",
    countLabel: "interactive activities",
    jumpTo: "Jump to an activity",
    backToHome: "Back to home",
    cardOpen: "Open lab",
    pythonName: "Python Playground",
    pythonTagline: "Write 10 lines of real Python and run it instantly. No install.",
    bridgeName: "Bridge Load Lab",
    bridgeTagline: "Drag a weight onto a truss bridge and watch it sag, stress, and snap.",
    towerName: "Block Tower Physics",
    towerTagline: "Pull blocks, stack them on top, and try not to topple the tower.",
    atomName: "Atom Builder",
    atomTagline: "Add protons, neutrons, electrons. Watch the element change in real time.",
    compassName: "Curiosity Compass",
    compassTagline: "Tell us how you like to learn. We'll point you to your first project.",
    finderName: "Workshop Finder",
    finderTagline: "Enter your ZIP code to see confirmed sites and planning areas.",
```

Replace it with:

```ts
    metaTitle: "Interactive STEM Labs | Avanza STEM",
    metaDesc: "Explore browser-based STEM activities, including real Python, a physics-driven block tower, an interactive bridge load test, an atom builder, and more.",
    eyebrow: "Interactive labs",
    title: "Explore interactive STEM labs",
    description: "Every activity below teaches something real — physics, code, chemistry, or engineering. They run right in your browser, they're always free, and there's nothing to install or sign in to.",
    pythonName: "Python Playground",
    pythonTagline: "Write 10 lines of real Python and run it instantly. No install.",
    bridgeName: "Bridge Load Lab",
    bridgeTagline: "Drag a weight onto a truss bridge and watch it sag, stress, and snap.",
    towerName: "Block Tower Physics",
    towerTagline: "Pull blocks, stack them on top, and try not to topple the tower.",
    atomName: "Atom Builder",
    atomTagline: "Add protons, neutrons, electrons. Watch the element change in real time.",
    tocTitle: "What's here",
    tocDesc: "12 activities, grouped by subject. Jump to any of them, or scroll through in order.",
    groupCodeName: "Code & Logic",
    groupCodeDesc: "Write real code, program a robot to solve a maze, and see how computers make decisions using logic and sorting.",
    groupBuildName: "Build & Test",
    groupBuildDesc: "Design a bridge, stack a tower, aim a catapult, and build a marble run — then see what happens when you push them to the limit.",
    groupScienceName: "Science Lab",
    groupScienceDesc: "Build atoms, wire up circuits, stack liquids by density, and watch gravity pull planets into orbit.",
    startHereTitle: "Not sure where to start?",
    startHereDesc: "Pick whichever sounds the most fun — we'll jump you to a good first activity.",
    startHereCodeLabel: "Coding & logic",
    startHereCodeHint: "I like figuring out puzzles and telling computers what to do.",
    startHereBuildLabel: "Building & testing",
    startHereBuildHint: "I like building things and seeing how much they can take.",
    startHereScienceLabel: "Science experiments",
    startHereScienceHint: "I like mixing things, wiring things up, and watching what happens.",
    startHereResultCode: "Great choice — start with Python Playground.",
    startHereResultBuild: "Great choice — start with the Bridge Load Lab.",
    startHereResultScience: "Great choice — start with Atom Builder.",
    startHereGo: "Start here",
    startHereSeeCode: "See all Code & Logic activities",
    startHereSeeBuild: "See all Build & Test activities",
    startHereSeeScience: "See all Science Lab activities",
    startHereReset: "Pick again",
```

- [ ] **Step 2: EN — remove `home.compass*` block**

Find this block (around line 114-143):

```ts
    browseCurriculums: "Explore Projects",
    // Curiosity Compass interactive
    compassEyebrow: "Find your spark",
    compassTitle: "What kind of STEM kid are you?",
    compassDesc: "There's no wrong answer. Pick the one that sounds the most like you and we'll show you a great place to start.",
    compassPickPrompt: "Tap a card to see your starter project",
    compassYouPicked: "You picked",
    compassStartHere: "Start here",
    compassReset: "Pick again",
    compassBuildLabel: "I love to build things",
    compassBuildHint: "Towers, bridges, gadgets that actually hold weight.",
    compassBuildProject: "Build a Popsicle Stick Bridge",
    compassBuildProjectDesc: "Engineer a truss, then load it with books until it groans.",
    compassBuildHref: "/projects/popsicle-stick-bridge",
    compassCodeLabel: "I love computers",
    compassCodeHint: "Games, apps, anything that talks back when I type.",
    compassCodeProject: "Write Your First Python Program",
    compassCodeProjectDesc: "Make a quiz game from scratch in fewer than 20 lines of code.",
    compassCodeHref: "/projects/my-first-python-program",
    compassDiscoverLabel: "I love to ask why",
    compassDiscoverHint: "What makes things tick, fizz, or erupt, safely.",
    compassDiscoverProject: "Run the Volcano Experiment",
    compassDiscoverProjectDesc: "Watch a chemical reaction up close and figure out what's happening.",
    compassDiscoverHref: "/projects/baking-soda-volcano",
    compassInventLabel: "I love new ideas",
    compassInventHint: "Robots, AI, the future-y kind of stuff.",
    compassInventProject: "Program a LEGO Grabber Robot",
    compassInventProjectDesc: "Make a robot that drives, grabs, and cleans up after itself.",
    compassInventHref: "/projects/lego-robot-builder",
    // Workshop Finder (interactive map)
```

Replace it with:

```ts
    browseCurriculums: "Explore Projects",
    // Workshop Finder (interactive map)
```

- [ ] **Step 3: ES — rewrite `gamesPage` header block**

Find this block (around line 1492):

```ts
    metaTitle: "Laboratorios STEM Interactivos | Avanza STEM",
    metaDesc: "Explora actividades STEM en el navegador, con Python real, una torre con fisica, un puente que se carga, un constructor de atomos y mas.",
    eyebrow: "Laboratorios interactivos",
    title: "Explora laboratorios STEM interactivos",
    description: "Cada actividad en esta pagina enseña algo real: fisica, programacion, quimica, ingenieria. Todo corre en tu navegador, sin instalar ni iniciar sesion.",
    countLabel: "actividades interactivas",
    jumpTo: "Ir a una actividad",
    backToHome: "Volver al inicio",
    cardOpen: "Abrir laboratorio",
    pythonName: "Laboratorio de Python",
    pythonTagline: "Escribe 10 lineas de Python real y ejecutalo al instante.",
    bridgeName: "Laboratorio de cargas",
    bridgeTagline: "Pon peso sobre un puente y mira como se deforma o se rompe.",
    towerName: "Torre de bloques",
    towerTagline: "Saca bloques, apilalos arriba y trata de no tumbar la torre.",
    atomName: "Constructor de atomos",
    atomTagline: "Agrega protones, neutrones y electrones. El elemento cambia en vivo.",
    compassName: "Brujula de curiosidad",
    compassTagline: "Dinos como te gusta aprender y te recomendamos un proyecto.",
    finderName: "Buscador de talleres",
    finderTagline: "Escribe tu codigo postal para ver sedes confirmadas y zonas en planificacion.",
```

Replace it with:

```ts
    metaTitle: "Laboratorios STEM Interactivos | Avanza STEM",
    metaDesc: "Explora actividades STEM en el navegador, con Python real, una torre con fisica, un puente que se carga, un constructor de atomos y mas.",
    eyebrow: "Laboratorios interactivos",
    title: "Explora laboratorios STEM interactivos",
    description: "Cada actividad de esta pagina enseña algo real: fisica, codigo, quimica o ingenieria. Todo corre en tu navegador, siempre es gratis y no necesitas instalar nada ni iniciar sesion.",
    pythonName: "Laboratorio de Python",
    pythonTagline: "Escribe 10 lineas de Python real y ejecutalo al instante.",
    bridgeName: "Laboratorio de cargas",
    bridgeTagline: "Pon peso sobre un puente y mira como se deforma o se rompe.",
    towerName: "Torre de bloques",
    towerTagline: "Saca bloques, apilalos arriba y trata de no tumbar la torre.",
    atomName: "Constructor de atomos",
    atomTagline: "Agrega protones, neutrones y electrones. El elemento cambia en vivo.",
    tocTitle: "Que hay aqui",
    tocDesc: "12 actividades, agrupadas por tema. Salta a cualquiera o recorrelas en orden.",
    groupCodeName: "Codigo y Logica",
    groupCodeDesc: "Escribe codigo real, programa un robot para resolver un laberinto y descubre como las computadoras toman decisiones con logica y ordenamiento.",
    groupBuildName: "Construir y Probar",
    groupBuildDesc: "Diseña un puente, apila una torre, apunta una catapulta y arma un circuito de canicas, y mira que pasa cuando los llevas al limite.",
    groupScienceName: "Laboratorio de Ciencias",
    groupScienceDesc: "Arma atomos, conecta circuitos, apila liquidos por densidad y mira como la gravedad pone planetas en orbita.",
    startHereTitle: "No sabes por donde empezar?",
    startHereDesc: "Elige lo que mas te llame la atencion y te llevamos directo a una buena primera actividad.",
    startHereCodeLabel: "Programacion y logica",
    startHereCodeHint: "Me gusta resolver acertijos y decirle a la computadora que hacer.",
    startHereBuildLabel: "Construir y probar",
    startHereBuildHint: "Me gusta construir cosas y ver cuanto aguantan.",
    startHereScienceLabel: "Experimentos de ciencia",
    startHereScienceHint: "Me gusta mezclar cosas, conectar cables y ver que pasa.",
    startHereResultCode: "Buena eleccion: empieza con el Laboratorio de Python.",
    startHereResultBuild: "Buena eleccion: empieza con el Laboratorio de cargas.",
    startHereResultScience: "Buena eleccion: empieza con el Constructor de atomos.",
    startHereGo: "Empezar aqui",
    startHereSeeCode: "Ver todas las actividades de Codigo y Logica",
    startHereSeeBuild: "Ver todas las actividades de Construir y Probar",
    startHereSeeScience: "Ver todas las actividades del Laboratorio de Ciencias",
    startHereReset: "Elegir otra vez",
```

- [ ] **Step 4: ES — remove `home.compass*` block**

Find this block (around line 1081-1109):

```ts
    browseCurriculums: "Explorar Proyectos",
    compassEyebrow: "Encuentra tu chispa",
    compassTitle: "Que tipo de niño STEM eres?",
    compassDesc: "No hay respuesta incorrecta. Elige la opcion que mas se parezca a ti y te mostraremos un buen punto de partida.",
    compassPickPrompt: "Toca una tarjeta para ver tu proyecto inicial",
    compassYouPicked: "Elegiste",
    compassStartHere: "Empieza aqui",
    compassReset: "Elegir otra vez",
    compassBuildLabel: "Me encanta construir",
    compassBuildHint: "Torres, puentes y artefactos que de verdad aguantan peso.",
    compassBuildProject: "Construye un puente de palitos",
    compassBuildProjectDesc: "Diseña una celosia y cargale libros hasta que cruja.",
    compassBuildHref: "/projects/popsicle-stick-bridge",
    compassCodeLabel: "Me encantan las computadoras",
    compassCodeHint: "Juegos, apps y todo lo que responde cuando escribo.",
    compassCodeProject: "Escribe tu primer programa en Python",
    compassCodeProjectDesc: "Crea un juego de preguntas en menos de 20 lineas de codigo.",
    compassCodeHref: "/projects/my-first-python-program",
    compassDiscoverLabel: "Me encanta preguntar por que",
    compassDiscoverHint: "Que hace que las cosas funcionen, burbujeen o erupcionen, con seguridad.",
    compassDiscoverProject: "Haz el experimento del volcan",
    compassDiscoverProjectDesc: "Mira una reaccion quimica de cerca y descubre que esta pasando.",
    compassDiscoverHref: "/projects/baking-soda-volcano",
    compassInventLabel: "Me encantan las ideas nuevas",
    compassInventHint: "Robots, IA, ese tipo de cosas del futuro.",
    compassInventProject: "Programa un robot LEGO con garra",
    compassInventProjectDesc: "Haz un robot que se mueve, agarra y ordena por si solo.",
    compassInventHref: "/projects/lego-robot-builder",
    finderEyebrow: "Talleres cerca de ti",
```

Replace it with:

```ts
    browseCurriculums: "Explorar Proyectos",
    finderEyebrow: "Talleres cerca de ti",
```

- [ ] **Step 5: ZH — rewrite `gamesPage` header block**

Find this block (around line 2444):

```ts
    metaTitle: "互动 STEM 实验室 | Avanza STEM",
    metaDesc: "在浏览器中探索 STEM 活动，包括真实 Python、有物理效果的积木塔、桥梁载荷实验、原子搭建器等。",
    eyebrow: "互动实验室",
    title: "探索互动 STEM 实验室",
    description: "这里的每个活动都教你一些真实的东西：物理、编程、化学、工程。全部直接在浏览器里运行，无需安装、无需登录。",
    countLabel: "个互动活动",
    jumpTo: "跳到一个活动",
    backToHome: "返回首页",
    cardOpen: "打开实验室",
    pythonName: "Python 实验台",
    pythonTagline: "在浏览器里写 10 行真实的 Python 代码并立即运行。",
    bridgeName: "桥梁载荷实验",
    bridgeTagline: "把重物拖到桥上，看看它怎么弯、怎么变形、什么时候塌。",
    towerName: "物理积木塔",
    towerTagline: "抽出积木，再叠到塔顶，小心别让塔倒。",
    atomName: "原子搭建器",
    atomTagline: "添加质子、中子和电子，看元素实时变化。",
    compassName: "好奇罗盘",
    compassTagline: "告诉我们你怎么学习，我们给你推荐第一个项目。",
    finderName: "工作坊查找",
    finderTagline: "输入邮编，查看确认地点和规划区域。",
```

Replace it with:

```ts
    metaTitle: "互动 STEM 实验室 | Avanza STEM",
    metaDesc: "在浏览器中探索 STEM 活动，包括真实 Python、有物理效果的积木塔、桥梁载荷实验、原子搭建器等。",
    eyebrow: "互动实验室",
    title: "探索互动 STEM 实验室",
    description: "下面的每个活动都教你一些真实的东西——物理、编程、化学或工程。它们都直接在浏览器里运行，完全免费，无需安装，也无需登录。",
    pythonName: "Python 实验台",
    pythonTagline: "在浏览器里写 10 行真实的 Python 代码并立即运行。",
    bridgeName: "桥梁载荷实验",
    bridgeTagline: "把重物拖到桥上，看看它怎么弯、怎么变形、什么时候塌。",
    towerName: "物理积木塔",
    towerTagline: "抽出积木，再叠到塔顶，小心别让塔倒。",
    atomName: "原子搭建器",
    atomTagline: "添加质子、中子和电子，看元素实时变化。",
    tocTitle: "活动一览",
    tocDesc: "12 个活动，按主题分组。可以直接跳转，也可以按顺序往下看。",
    groupCodeName: "编程与逻辑",
    groupCodeDesc: "编写真实代码，给机器人编程走出迷宫，看看计算机如何用逻辑和排序做决定。",
    groupBuildName: "搭建与测试",
    groupBuildDesc: "设计一座桥、搭一座塔、瞄准投石机、搭建弹珠轨道——然后看看把它们推到极限会发生什么。",
    groupScienceName: "科学实验室",
    groupScienceDesc: "搭建原子、连接电路、按密度堆叠液体，看看引力如何让行星进入轨道。",
    startHereTitle: "不知道从哪里开始？",
    startHereDesc: "选一个你觉得最好玩的，我们会带你跳到一个适合入门的活动。",
    startHereCodeLabel: "编程与逻辑",
    startHereCodeHint: "我喜欢解谜题，告诉计算机该做什么。",
    startHereBuildLabel: "搭建与测试",
    startHereBuildHint: "我喜欢动手搭东西，看看它们能承受多少。",
    startHereScienceLabel: "科学实验",
    startHereScienceHint: "我喜欢混合材料、接电路，看看会发生什么。",
    startHereResultCode: "不错的选择——从 Python 实验台开始吧。",
    startHereResultBuild: "不错的选择——从桥梁载荷实验开始吧。",
    startHereResultScience: "不错的选择——从原子搭建器开始吧。",
    startHereGo: "立即开始",
    startHereSeeCode: "查看全部编程与逻辑活动",
    startHereSeeBuild: "查看全部搭建与测试活动",
    startHereSeeScience: "查看全部科学实验室活动",
    startHereReset: "重新选择",
```

- [ ] **Step 6: ZH — remove `home.compass*` block**

Find this block (around line 2033-2061):

```ts
    browseCurriculums: "探索项目",
    compassEyebrow: "找到你的兴趣点",
    compassTitle: "你是哪种 STEM 小孩?",
    compassDesc: "没有错的答案。挑一张最像你的卡片，我们就告诉你最适合先动手的项目。",
    compassPickPrompt: "点一张卡片，看看属于你的入门项目",
    compassYouPicked: "你选了",
    compassStartHere: "从这里开始",
    compassReset: "再选一次",
    compassBuildLabel: "我喜欢动手做东西",
    compassBuildHint: "塔、桥、能真正承重的小机关。",
    compassBuildProject: "搭一座冰棒棍桥",
    compassBuildProjectDesc: "做一座桁架桥，然后压上一摞书看它会不会响。",
    compassBuildHref: "/projects/popsicle-stick-bridge",
    compassCodeLabel: "我喜欢电脑",
    compassCodeHint: "游戏、应用，会回应我输入的东西。",
    compassCodeProject: "写出你的第一个 Python 程序",
    compassCodeProjectDesc: "用不到 20 行代码做一个问答游戏。",
    compassCodeHref: "/projects/my-first-python-program",
    compassDiscoverLabel: "我喜欢问为什么",
    compassDiscoverHint: "想知道东西为什么会动、会冒泡、会喷发(安全的那种)。",
    compassDiscoverProject: "做火山实验",
    compassDiscoverProjectDesc: "近距离看一场化学反应，并自己分析背后的原理。",
    compassDiscoverHref: "/projects/baking-soda-volcano",
    compassInventLabel: "我喜欢新点子",
    compassInventHint: "机器人、AI，未来感十足的东西。",
    compassInventProject: "搭一个乐高抓手机器人",
    compassInventProjectDesc: "做一个能开、能抓、能自己收拾的机器人。",
    compassInventHref: "/projects/lego-robot-builder",
    finderEyebrow: "你附近的工作坊",
```

Replace it with:

```ts
    browseCurriculums: "探索项目",
    finderEyebrow: "你附近的工作坊",
```

- [ ] **Step 7: Verify**

Run: `npm run lint`

Expected: This will currently FAIL with errors about `t.gamesPage.countLabel`, `cardOpen`, `backToHome`, `jumpTo`, `compassName`, `compassTagline`, `finderName`, `finderTagline`, and `t.home.compass*` being used in `games-page-content.tsx` and `curiosity-compass.tsx` (Property does not exist on type). That's expected — those files are rewritten in Tasks 2-3. Confirm the errors are ONLY in those two files (no other file references the removed keys).

- [ ] **Step 8: Commit**

```bash
git add i18n/translations.ts
git commit -m "Update games page translations: new hero/TOC/start-here copy, remove dead compass/finder keys"
```

---

### Task 2: Create `StartHere` component, remove `CuriosityCompass`

**Files:**
- Create: `components/ui/start-here.tsx`
- Delete: `components/ui/curiosity-compass.tsx`

- [ ] **Step 1: Create `components/ui/start-here.tsx`**

```tsx
"use client"

import { useState } from "react"
import { ArrowRight, RotateCcw } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"

type PathId = "code" | "build" | "science"

type Path = {
  id: PathId
  label: string
  hint: string
  accent: string
  result: string
  targetHref: string
  seeGroupLabel: string
  seeGroupHref: string
}

export function StartHere() {
  const { t } = useLanguage()
  const [picked, setPicked] = useState<PathId | null>(null)

  const paths: Path[] = [
    {
      id: "code",
      label: t.gamesPage.startHereCodeLabel,
      hint: t.gamesPage.startHereCodeHint,
      accent: "border-avanza-purple",
      result: t.gamesPage.startHereResultCode,
      targetHref: "#python",
      seeGroupLabel: t.gamesPage.startHereSeeCode,
      seeGroupHref: "#group-code",
    },
    {
      id: "build",
      label: t.gamesPage.startHereBuildLabel,
      hint: t.gamesPage.startHereBuildHint,
      accent: "border-avanza-orange",
      result: t.gamesPage.startHereResultBuild,
      targetHref: "#bridge",
      seeGroupLabel: t.gamesPage.startHereSeeBuild,
      seeGroupHref: "#group-build",
    },
    {
      id: "science",
      label: t.gamesPage.startHereScienceLabel,
      hint: t.gamesPage.startHereScienceHint,
      accent: "border-avanza-teal",
      result: t.gamesPage.startHereResultScience,
      targetHref: "#atom",
      seeGroupLabel: t.gamesPage.startHereSeeScience,
      seeGroupHref: "#group-science",
    },
  ]

  const pickedPath = paths.find((p) => p.id === picked) ?? null

  return (
    <section className="bg-[#fcfaf3] py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
            {t.gamesPage.startHereTitle}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {t.gamesPage.startHereDesc}
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {paths.map((path, i) => {
            const isPicked = picked === path.id
            return (
              <FadeIn key={path.id} delay={i * 70}>
                <button
                  type="button"
                  onClick={() => setPicked(path.id)}
                  aria-pressed={isPicked}
                  className={[
                    "block w-full rounded-2xl border-l-4 bg-white p-5 text-left shadow-sm ring-1 ring-avanza-dark/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                    path.accent,
                    isPicked ? "ring-2 ring-avanza-dark/20" : "",
                  ].join(" ")}
                >
                  <p className="font-extrabold text-foreground">{path.label}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {path.hint}
                  </p>
                </button>
              </FadeIn>
            )
          })}
        </div>

        {pickedPath && (
          <FadeIn key={pickedPath.id} className="mt-8">
            <div className="rounded-2xl bg-white p-6 text-center ring-1 ring-avanza-dark/5 md:p-8">
              <p className="text-base font-bold text-foreground md:text-lg">
                {pickedPath.result}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={pickedPath.targetHref}
                  className="inline-flex items-center gap-2 rounded-full bg-avanza-dark px-6 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all duration-200 hover:scale-[1.03] hover:bg-foreground"
                >
                  {t.gamesPage.startHereGo}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={pickedPath.seeGroupHref}
                  className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  {pickedPath.seeGroupLabel}
                </a>
              </div>
              <button
                type="button"
                onClick={() => setPicked(null)}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {t.gamesPage.startHereReset}
              </button>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Delete `components/ui/curiosity-compass.tsx`**

```bash
rm components/ui/curiosity-compass.tsx
```

- [ ] **Step 3: Verify**

Run: `npm run lint`

Expected: `curiosity-compass.tsx` errors disappear. `games-page-content.tsx` will now additionally fail to resolve `CuriosityCompass` import (expected — fixed in Task 3).

- [ ] **Step 4: Commit**

```bash
git add components/ui/start-here.tsx
git rm components/ui/curiosity-compass.tsx
git commit -m "Replace Curiosity Compass with games-page Start Here component"
```

---

### Task 3: Rewrite `games-page-content.tsx` (hero, TOC, groups, reordering)

**Files:**
- Modify: `components/pages/games-page-content.tsx` (full rewrite)

This task removes the 3 hero pills, the `cards`/`GameCard` grid (including Workshop Finder), adds the grouped table-of-contents and 3 group-intro headers, wires in `StartHere`, and reorders the 12 activity sections into Code & Logic / Build & Test / Science Lab.

- [ ] **Step 1: Replace the entire contents of `components/pages/games-page-content.tsx`**

```tsx
"use client"

import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { PythonPlayground } from "@/components/ui/python-playground"
import { BridgeLoadDemo } from "@/components/ui/bridge-load-demo"
import { JengaTower } from "@/components/ui/jenga-tower"
import { AtomBuilder } from "@/components/ui/atom-builder"
import { StartHere } from "@/components/ui/start-here"
import { CodePathRobot } from "@/components/ui/code-path-robot"
import { CircuitBuilder } from "@/components/ui/circuit-builder"
import { CatapultLab } from "@/components/ui/catapult-lab"
import { GravitySandbox } from "@/components/ui/gravity-sandbox"
import { LogicGatePuzzle } from "@/components/ui/logic-gate-puzzle"
import { DensityTower } from "@/components/ui/density-tower"
import { SortingRace } from "@/components/ui/sorting-race"
import { MarbleRun } from "@/components/ui/marble-run"

type Activity = {
  id: string
  name: string
  tagline: string
}

type Group = {
  id: string
  name: string
  description: string
  accent: string
  activities: Activity[]
}

export function GamesPageContent() {
  const { t } = useLanguage()

  const groups: Group[] = [
    {
      id: "group-code",
      name: t.gamesPage.groupCodeName,
      description: t.gamesPage.groupCodeDesc,
      accent: "bg-avanza-purple",
      activities: [
        { id: "python", name: t.gamesPage.pythonName, tagline: t.gamesPage.pythonTagline },
        { id: "robot", name: t.gamesPage.robotName, tagline: t.gamesPage.robotTagline },
        { id: "logic", name: t.gamesPage.logicName, tagline: t.gamesPage.logicTagline },
        { id: "sort", name: t.gamesPage.sortName, tagline: t.gamesPage.sortTagline },
      ],
    },
    {
      id: "group-build",
      name: t.gamesPage.groupBuildName,
      description: t.gamesPage.groupBuildDesc,
      accent: "bg-avanza-orange",
      activities: [
        { id: "bridge", name: t.gamesPage.bridgeName, tagline: t.gamesPage.bridgeTagline },
        { id: "tower", name: t.gamesPage.towerName, tagline: t.gamesPage.towerTagline },
        { id: "catapult", name: t.gamesPage.catapultName, tagline: t.gamesPage.catapultTagline },
        { id: "marble", name: t.gamesPage.marbleName, tagline: t.gamesPage.marbleTagline },
      ],
    },
    {
      id: "group-science",
      name: t.gamesPage.groupScienceName,
      description: t.gamesPage.groupScienceDesc,
      accent: "bg-avanza-teal",
      activities: [
        { id: "atom", name: t.gamesPage.atomName, tagline: t.gamesPage.atomTagline },
        { id: "circuit", name: t.gamesPage.circuitName, tagline: t.gamesPage.circuitTagline },
        { id: "density", name: t.gamesPage.densityName, tagline: t.gamesPage.densityTagline },
        { id: "gravity", name: t.gamesPage.gravityName, tagline: t.gamesPage.gravityTagline },
      ],
    },
  ]

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
            <p className="text-sm font-bold uppercase tracking-wider text-primary-foreground/80">
              {t.gamesPage.eyebrow}
            </p>
            <h1 className="mt-4 text-balance text-5xl font-extrabold leading-[1.04] text-primary-foreground italic md:text-7xl">
              {t.gamesPage.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
              {t.gamesPage.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* NOT SURE WHERE TO START */}
      <StartHere />

      {/* WHAT'S HERE: grouped table of contents */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
              {t.gamesPage.tocTitle}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {t.gamesPage.tocDesc}
            </p>
          </FadeIn>
          <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-8">
            {groups.map((group, i) => (
              <FadeIn key={group.id} delay={i * 80}>
                <h3 className="text-lg font-extrabold text-foreground">{group.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {group.description}
                </p>
                <ul className="mt-5 space-y-4">
                  {group.activities.map((activity) => (
                    <li key={activity.id}>
                      <a href={`#${activity.id}`} className="group block">
                        <span className="font-bold text-foreground transition-colors group-hover:text-avanza-purple">
                          {activity.name}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                          {activity.tagline}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CODE & LOGIC */}
      <GroupIntro
        id="group-code"
        accent="bg-avanza-purple"
        name={t.gamesPage.groupCodeName}
        description={t.gamesPage.groupCodeDesc}
      />
      <div id="python" style={{ scrollMarginTop: 96 }}>
        <PythonPlayground />
      </div>
      <div id="robot" style={{ scrollMarginTop: 96 }}>
        <CodePathRobot />
      </div>
      <div id="logic" style={{ scrollMarginTop: 96 }}>
        <LogicGatePuzzle />
      </div>
      <div id="sort" style={{ scrollMarginTop: 96 }}>
        <SortingRace />
      </div>

      {/* BUILD & TEST */}
      <GroupIntro
        id="group-build"
        accent="bg-avanza-orange"
        name={t.gamesPage.groupBuildName}
        description={t.gamesPage.groupBuildDesc}
      />
      <div id="bridge" style={{ scrollMarginTop: 96 }}>
        <BridgeLoadDemo />
      </div>
      <div id="tower" style={{ scrollMarginTop: 96 }}>
        <JengaTower />
      </div>
      <div id="catapult" style={{ scrollMarginTop: 96 }}>
        <CatapultLab />
      </div>
      <div id="marble" style={{ scrollMarginTop: 96 }}>
        <MarbleRun />
      </div>

      {/* SCIENCE LAB */}
      <GroupIntro
        id="group-science"
        accent="bg-avanza-teal"
        name={t.gamesPage.groupScienceName}
        description={t.gamesPage.groupScienceDesc}
      />
      <div id="atom" style={{ scrollMarginTop: 96 }}>
        <AtomBuilder />
      </div>
      <div id="circuit" style={{ scrollMarginTop: 96 }}>
        <CircuitBuilder />
      </div>
      <div id="density" style={{ scrollMarginTop: 96 }}>
        <DensityTower />
      </div>
      <div id="gravity" style={{ scrollMarginTop: 96 }}>
        <GravitySandbox />
      </div>

      {/* CLOSING CTA */}
      <section className="bg-avanza-dark py-16 md:py-20">
        <FadeIn className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground md:text-4xl">
            More games coming soon.
          </h2>
          <p className="mt-4 text-base text-primary-foreground/70">
            Have an idea for a STEM game we should build? Tell us, we love new ideas.
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

function GroupIntro({
  id,
  accent,
  name,
  description,
}: {
  id: string
  accent: string
  name: string
  description: string
}) {
  return (
    <div id={id} style={{ scrollMarginTop: 96 }} className="bg-[#fcfaf3] py-14 md:py-16">
      <FadeIn className="mx-auto max-w-3xl px-6 text-center">
        <div className={`mx-auto h-1.5 w-14 rounded-full ${accent}`} />
        <h2 className="mt-5 text-balance text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
          {name}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      </FadeIn>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint`

Expected: PASS with no errors (all dead translation keys and the `CuriosityCompass`/`GameCard`/icon imports are gone).

Run: `npm run build`

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/pages/games-page-content.tsx
git commit -m "Rewrite games page shell: new hero, grouped TOC, reordered activity groups, remove Workshop Finder"
```

---

### Task 4: Code & Logic sweep — eyebrow/fact-box cleanup

**Files:**
- Modify: `components/ui/python-playground.tsx`
- Modify: `components/ui/code-path-robot.tsx`
- Modify: `components/ui/logic-gate-puzzle.tsx`
- Modify: `components/ui/sorting-race.tsx`

Each file gets its dashed-pill eyebrow replaced with a plain uppercase label, and (for robot/sorting) its "Did you know"-style micro-label promoted to a normal heading. Unused icon imports are removed.

- [ ] **Step 1: `python-playground.tsx` — eyebrow (around line 214)**

Replace:

```tsx
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-avanza-dark">
            <Sparkles className="h-3.5 w-3.5 text-avanza-orange" />
            {t.home.pyEyebrow}
          </span>
```

with:

```tsx
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-green">
            {t.home.pyEyebrow}
          </p>
```

- [ ] **Step 2: `python-playground.tsx` — remove unused `Sparkles` import (line 4)**

Replace:

```tsx
import { Play, Sparkles, Terminal, Loader2, RotateCcw } from "lucide-react"
```

with:

```tsx
import { Play, Terminal, Loader2, RotateCcw } from "lucide-react"
```

- [ ] **Step 3: `code-path-robot.tsx` — eyebrow (around line 207)**

Replace:

```tsx
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-avanza-dark">
            <Bot className="h-3.5 w-3.5 text-avanza-purple" />
            {t.gamesPage.robotEyebrow}
          </span>
```

with:

```tsx
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-purple">
            {t.gamesPage.robotEyebrow}
          </p>
```

- [ ] **Step 4: `code-path-robot.tsx` — promote "What you learn" lesson box (around line 390)**

Replace:

```tsx
                <div className="mt-auto rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-avanza-green">
                    {t.gamesPage.robotLessonTitle}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/80">
                    {t.gamesPage.robotLessonText}
                  </p>
                </div>
```

with:

```tsx
                <div className="mt-auto rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <p className="text-base font-extrabold text-white">
                    {t.gamesPage.robotLessonTitle}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/80">
                    {t.gamesPage.robotLessonText}
                  </p>
                </div>
```

- [ ] **Step 5: `code-path-robot.tsx` — remove unused `Bot` import (line 4)**

Replace:

```tsx
import { Bot, Play, RotateCcw, Sparkles, Trash2, Undo2 } from "lucide-react"
```

with:

```tsx
import { Play, RotateCcw, Sparkles, Trash2, Undo2 } from "lucide-react"
```

- [ ] **Step 6: `logic-gate-puzzle.tsx` — eyebrow (around line 230)**

Replace:

```tsx
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-avanza-dark">
            <Cpu className="h-3.5 w-3.5 text-avanza-purple" />
            {t.gamesPage.logicEyebrow}
          </span>
```

with:

```tsx
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-purple">
            {t.gamesPage.logicEyebrow}
          </p>
```

- [ ] **Step 7: `logic-gate-puzzle.tsx` — remove unused `Cpu` import (line 4)**

Replace:

```tsx
import { Cpu, RotateCcw, Sparkles } from "lucide-react"
```

with:

```tsx
import { RotateCcw, Sparkles } from "lucide-react"
```

- [ ] **Step 8: `sorting-race.tsx` — eyebrow (around line 326)**

Replace:

```tsx
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-avanza-dark">
            <BarChart3 className="h-3.5 w-3.5 text-avanza-orange" />
            {t.gamesPage.sortEyebrow}
          </span>
```

with:

```tsx
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-orange">
            {t.gamesPage.sortEyebrow}
          </p>
```

- [ ] **Step 9: `sorting-race.tsx` — promote algorithm-fact micro-label (around line 398)**

Replace:

```tsx
            <div className="rounded-2xl bg-avanza-dark p-6 text-primary-foreground">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-avanza-green">
                {t.gamesPage.sortFactEyebrow}
              </p>
              <p className="mt-2 text-base leading-relaxed text-white/85">
                {allDone ? t.gamesPage.sortFactAfter : t.gamesPage.sortFactBefore}
              </p>
            </div>
```

with:

```tsx
            <div className="rounded-2xl bg-avanza-dark p-6 text-primary-foreground">
              <p className="text-lg font-extrabold text-white">
                {t.gamesPage.sortFactEyebrow}
              </p>
              <p className="mt-2 text-base leading-relaxed text-white/85">
                {allDone ? t.gamesPage.sortFactAfter : t.gamesPage.sortFactBefore}
              </p>
            </div>
```

- [ ] **Step 10: `sorting-race.tsx` — remove unused `BarChart3` import (line 4)**

Replace:

```tsx
import { ArrowDown, BarChart3, Pause, Play, RotateCcw, Sparkles } from "lucide-react"
```

with:

```tsx
import { ArrowDown, Pause, Play, RotateCcw, Sparkles } from "lucide-react"
```

- [ ] **Step 11: Verify**

Run: `npm run lint`

Expected: PASS with no errors.

- [ ] **Step 12: Commit**

```bash
git add components/ui/python-playground.tsx components/ui/code-path-robot.tsx components/ui/logic-gate-puzzle.tsx components/ui/sorting-race.tsx
git commit -m "Clean up eyebrow pills and fact labels in Code & Logic activities"
```

---

### Task 5: Build & Test sweep — eyebrow/fact-box cleanup

**Files:**
- Modify: `components/ui/bridge-load-demo.tsx`
- Modify: `components/ui/jenga-tower.tsx`
- Modify: `components/ui/catapult-lab.tsx`
- Modify: `components/ui/marble-run.tsx`

- [ ] **Step 1: `bridge-load-demo.tsx` — eyebrow (around line 56)**

Replace:

```tsx
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-avanza-dark">
            <Hammer className="h-3.5 w-3.5 text-avanza-orange" />
            {t.home.bridgeEyebrow}
          </span>
```

with:

```tsx
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-orange">
            {t.home.bridgeEyebrow}
          </p>
```

- [ ] **Step 2: `bridge-load-demo.tsx` — remove unused `Hammer` import (line 4)**

Replace:

```tsx
import { Hammer, RotateCcw } from "lucide-react"
```

with:

```tsx
import { RotateCcw } from "lucide-react"
```

- [ ] **Step 3: `jenga-tower.tsx` — eyebrow (around line 237)**

Replace:

```tsx
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-avanza-dark">
            <Hammer className="h-3.5 w-3.5 text-avanza-orange" />
            {t.home.jengaEyebrow}
          </span>
```

with:

```tsx
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-purple">
            {t.home.jengaEyebrow}
          </p>
```

- [ ] **Step 4: `jenga-tower.tsx` — promote "Why this works" lesson box (around line 380)**

Replace:

```tsx
            <div className="rounded-2xl bg-avanza-dark p-5 text-primary-foreground">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-avanza-green">
                {t.home.jengaLessonTitle}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">
                {t.home.jengaLessonText}
              </p>
            </div>
```

with:

```tsx
            <div className="rounded-2xl bg-avanza-dark p-5 text-primary-foreground">
              <p className="text-lg font-extrabold text-white">
                {t.home.jengaLessonTitle}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">
                {t.home.jengaLessonText}
              </p>
            </div>
```

- [ ] **Step 5: `jenga-tower.tsx` — remove unused `Hammer` import (line 4)**

Replace:

```tsx
import { Hammer, Play, RotateCcw, Sparkles } from "lucide-react"
```

with:

```tsx
import { Play, RotateCcw, Sparkles } from "lucide-react"
```

- [ ] **Step 6: `catapult-lab.tsx` — eyebrow (around line 166)**

Replace:

```tsx
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-avanza-dark">
            <Crosshair className="h-3.5 w-3.5 text-avanza-orange" />
            {t.gamesPage.catapultEyebrow}
          </span>
```

with:

```tsx
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-green">
            {t.gamesPage.catapultEyebrow}
          </p>
```

- [ ] **Step 7: `catapult-lab.tsx` — drop "Physics minute" micro-label (around line 381)**

Replace:

```tsx
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white/85">
                  <Sparkles className="h-3.5 w-3.5 text-avanza-green" />
                  {t.gamesPage.catapultFactEyebrow}
                </div>
                <h3 className="text-2xl font-extrabold leading-tight md:text-3xl">
                  {t.gamesPage.catapultFactTitle}
                </h3>
                <p className="text-base leading-relaxed text-white/80">
                  {t.gamesPage.catapultFactBody}
                </p>
```

with:

```tsx
                <h3 className="text-2xl font-extrabold leading-tight md:text-3xl">
                  {t.gamesPage.catapultFactTitle}
                </h3>
                <p className="text-base leading-relaxed text-white/80">
                  {t.gamesPage.catapultFactBody}
                </p>
```

- [ ] **Step 8: `catapult-lab.tsx` — remove unused `Crosshair` and `Sparkles` imports (line 4)**

Replace:

```tsx
import { Crosshair, Play, RotateCcw, Sparkles, Target } from "lucide-react"
```

with:

```tsx
import { Play, RotateCcw, Target } from "lucide-react"
```

- [ ] **Step 9: `marble-run.tsx` — eyebrow (around line 231)**

Replace:

```tsx
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-avanza-dark">
            <Wrench className="h-3.5 w-3.5 text-avanza-orange" />
            {t.gamesPage.marbleEyebrow}
          </span>
```

with:

```tsx
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-orange">
            {t.gamesPage.marbleEyebrow}
          </p>
```

- [ ] **Step 10: `marble-run.tsx` — drop "Engineering fact" micro-label (around line 385)**

Replace:

```tsx
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white/85">
                  <Sparkles className="h-3.5 w-3.5 text-avanza-green" />
                  {t.gamesPage.marbleFactEyebrow}
                </div>
                <h3 className="text-2xl font-extrabold leading-tight md:text-3xl">
                  {t.gamesPage.marbleFactTitle}
                </h3>
                <p className="text-base leading-relaxed text-white/80">
                  {t.gamesPage.marbleFactBody}
                </p>
```

with:

```tsx
                <h3 className="text-2xl font-extrabold leading-tight md:text-3xl">
                  {t.gamesPage.marbleFactTitle}
                </h3>
                <p className="text-base leading-relaxed text-white/80">
                  {t.gamesPage.marbleFactBody}
                </p>
```

- [ ] **Step 11: `marble-run.tsx` — remove unused `Wrench` import (line 4)**

`Sparkles` is used elsewhere in this file, so it stays. Replace:

```tsx
import { Eraser, Play, RotateCcw, Sparkles, Wrench } from "lucide-react"
```

with:

```tsx
import { Eraser, Play, RotateCcw, Sparkles } from "lucide-react"
```

- [ ] **Step 12: Verify**

Run: `npm run lint`

Expected: PASS with no errors.

- [ ] **Step 13: Commit**

```bash
git add components/ui/bridge-load-demo.tsx components/ui/jenga-tower.tsx components/ui/catapult-lab.tsx components/ui/marble-run.tsx
git commit -m "Clean up eyebrow pills and fact labels in Build & Test activities"
```

---

### Task 6: Science Lab sweep — eyebrow/fact-box cleanup

**Files:**
- Modify: `components/ui/atom-builder.tsx`
- Modify: `components/ui/circuit-builder.tsx`
- Modify: `components/ui/density-tower.tsx`
- Modify: `components/ui/gravity-sandbox.tsx`

- [ ] **Step 1: `atom-builder.tsx` — eyebrow (around line 94)**

Replace:

```tsx
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-avanza-dark">
            <Atom className="h-3.5 w-3.5 text-avanza-purple" />
            {t.home.atomEyebrow}
          </span>
```

with:

```tsx
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-teal">
            {t.home.atomEyebrow}
          </p>
```

`Atom` is used elsewhere in this file, so its import is unchanged.

- [ ] **Step 2: `circuit-builder.tsx` — eyebrow (around line 293)**

Replace:

```tsx
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-avanza-dark">
            <Zap className="h-3.5 w-3.5 text-avanza-orange" />
            {t.gamesPage.circuitEyebrow}
          </span>
```

with:

```tsx
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-orange">
            {t.gamesPage.circuitEyebrow}
          </p>
```

- [ ] **Step 3: `circuit-builder.tsx` — drop "Did you know" micro-label (around line 425)**

Replace:

```tsx
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white/85">
                  <Sparkles className="h-3.5 w-3.5 text-avanza-green" />
                  {t.gamesPage.circuitFactEyebrow}
                </div>
                <h3 className="text-2xl font-extrabold leading-tight md:text-3xl">
                  {t.gamesPage.circuitFactTitle}
                </h3>
                <p className="text-base leading-relaxed text-white/80">
                  {t.gamesPage.circuitFactBody}
                </p>
```

with:

```tsx
                <h3 className="text-2xl font-extrabold leading-tight md:text-3xl">
                  {t.gamesPage.circuitFactTitle}
                </h3>
                <p className="text-base leading-relaxed text-white/80">
                  {t.gamesPage.circuitFactBody}
                </p>
```

- [ ] **Step 4: `circuit-builder.tsx` — remove unused `Sparkles` and `Zap` imports (lines 4-12)**

Replace:

```tsx
import {
  Eraser,
  Lightbulb,
  Power,
  RotateCcw,
  Sparkles,
  ToggleRight,
  Zap,
} from "lucide-react"
```

with:

```tsx
import {
  Eraser,
  Lightbulb,
  Power,
  RotateCcw,
  ToggleRight,
} from "lucide-react"
```

- [ ] **Step 5: `density-tower.tsx` — eyebrow (around line 192)**

Replace:

```tsx
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-avanza-dark">
            <Beaker className="h-3.5 w-3.5 text-avanza-teal" />
            {t.gamesPage.densityEyebrow}
          </span>
```

with:

```tsx
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-teal">
            {t.gamesPage.densityEyebrow}
          </p>
```

`Beaker` is used elsewhere in this file, so its import is unchanged.

- [ ] **Step 6: `density-tower.tsx` — promote "Why it works" micro-label (around line 394)**

Replace:

```tsx
                <div className="mt-auto rounded-2xl bg-white/5 p-3 text-sm leading-relaxed text-white/80 ring-1 ring-white/10">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-avanza-green">
                    {t.gamesPage.densityFactEyebrow}
                  </p>
                  <p className="mt-1.5">{t.gamesPage.densityFactBody}</p>
                </div>
```

with:

```tsx
                <div className="mt-auto rounded-2xl bg-white/5 p-3 text-sm leading-relaxed text-white/80 ring-1 ring-white/10">
                  <p className="text-base font-extrabold text-white">
                    {t.gamesPage.densityFactEyebrow}
                  </p>
                  <p className="mt-1.5">{t.gamesPage.densityFactBody}</p>
                </div>
```

- [ ] **Step 7: `gravity-sandbox.tsx` — eyebrow (around line 327)**

This section has a dark background, so the plain-text label uses `text-white/70` per the design spec. Replace:

```tsx
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-white/30 bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            <Globe2 className="h-3.5 w-3.5 text-avanza-teal" />
            {t.gamesPage.gravityEyebrow}
          </span>
```

with:

```tsx
          <p className="text-sm font-bold uppercase tracking-wider text-white/70">
            {t.gamesPage.gravityEyebrow}
          </p>
```

- [ ] **Step 8: `gravity-sandbox.tsx` — drop "Stargazer fact" micro-label (around line 409)**

Replace:

```tsx
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-avanza-teal/30 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">
                  <Sparkles className="h-3.5 w-3.5 text-avanza-teal" />
                  {t.gamesPage.gravityFactEyebrow}
                </div>
                <h3 className="text-2xl font-extrabold leading-tight md:text-3xl">
                  {t.gamesPage.gravityFactTitle}
                </h3>
                <p className="text-base leading-relaxed text-white/80">
                  {t.gamesPage.gravityFactBody}
                </p>
```

with:

```tsx
                <h3 className="text-2xl font-extrabold leading-tight md:text-3xl">
                  {t.gamesPage.gravityFactTitle}
                </h3>
                <p className="text-base leading-relaxed text-white/80">
                  {t.gamesPage.gravityFactBody}
                </p>
```

- [ ] **Step 9: `gravity-sandbox.tsx` — remove unused `Globe2` and `Sparkles` imports (line 4)**

Replace:

```tsx
import { Globe2, Pause, Play, RotateCcw, Sparkles, Trash2 } from "lucide-react"
```

with:

```tsx
import { Pause, Play, RotateCcw, Trash2 } from "lucide-react"
```

- [ ] **Step 10: Verify**

Run: `npm run lint`

Expected: PASS with no errors.

- [ ] **Step 11: Commit**

```bash
git add components/ui/atom-builder.tsx components/ui/circuit-builder.tsx components/ui/density-tower.tsx components/ui/gravity-sandbox.tsx
git commit -m "Clean up eyebrow pills and fact labels in Science Lab activities"
```

---

### Task 7: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Full lint + type check**

Run: `npm run lint`

Expected: PASS with zero errors/warnings.

- [ ] **Step 2: Production build**

Run: `npm run build`

Expected: Build succeeds with no errors.

- [ ] **Step 3: Manual dev-server walkthrough**

Run: `npm run dev` and open `/games` in a browser.

Check, in EN, ES, and ZH (use the language switcher), at both desktop and mobile widths:

- Hero shows the plain-text "Interactive labs" eyebrow (no pill), the title, and the new description — no "Back to home" pill, no count pill.
- "Not sure where to start?" appears directly below the hero. Picking each of the 3 options shows a result message + "Start here" link + "See all … activities" link + "Pick again". The "Start here" links jump to `#python` / `#bridge` / `#atom`, and "See all" links jump to `#group-code` / `#group-build` / `#group-science`.
- "What's here" shows a 3-column (desktop) / stacked (mobile) table of contents grouped into Code & Logic, Build & Test, and Science Lab, each activity name + tagline linking to its `#anchor`.
- Activities appear in this order with a group-intro header before each group: Python Playground, Code-the-Path Robot, Logic Gate Puzzle, Sorting Race — Bridge Load Lab, Block Tower Physics, Catapult Lab, Marble Run — Atom Builder, Circuit Builder, Density Tower, Gravity Sandbox.
- No dashed-border pills, badges, chips, or "Did you know"/"Physics minute"/"Stargazer fact"/"Engineering fact"/"Algorithm fact" micro-labels remain anywhere on the page.
- Workshop Finder does not appear anywhere on `/games`.
- No console errors in the browser dev tools.

- [ ] **Step 4: Confirm no remaining references to removed code**

Run: `grep -rn "GameCard\|CuriosityCompass\|curiosity-compass\|find-a-workshop" components/pages/games-page-content.tsx`

Expected: no output (empty).

Run: `grep -rn "compassName\|compassTagline\|finderName\|finderTagline\|countLabel\|cardOpen\|backToHome\|jumpTo" i18n/translations.ts components/`

Expected: no output (empty) — confirms dead translation keys were fully removed and nothing else referenced them.
