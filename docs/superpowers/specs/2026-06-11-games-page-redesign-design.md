# Games / Activities Page Redesign — Design Spec

Date: 2026-06-11

## Goal

Refactor `/games` (`components/pages/games-page-content.tsx` + the 13
activity components it renders) so it reads as a real, useful STEM activity
hub rather than a grid of generic AI-generated cards. This mirrors the
[2026-06-10 homepage redesign](./2026-06-10-homepage-redesign-design.md):
remove pill/badge/eyebrow-tag decoration, tighten copy, improve structure.

This spec covers **Phase 1: page shell**. Per-game content rewrites, bug
fixes, and graphic improvements for the 12 interactive activities are handled
in three follow-up phases (one per subject group, scoped separately once
Phase 1 lands):

- **Phase 2 — Code & Logic**: Python Playground, Code-the-Path Robot, Logic
  Gate Puzzle, Sorting Race
- **Phase 3 — Build & Test**: Bridge Load Lab, Block Tower Physics, Catapult
  Lab, Marble Run
- **Phase 4 — Science Lab**: Atom Builder, Circuit Builder, Density Tower,
  Gravity Sandbox

## Problems with the current page

- Hero has 3 pill/badge elements: a "Back to home" pill (unique to this page,
  not used anywhere else on the site), a dashed-border "Interactive labs"
  eyebrow pill with a `Play` icon, and a bottom "13 interactive activities"
  pill with a `Sparkles` icon.
- "Jump to an activity" is a grid of 13 tilted, color-coded, icon-badged cards
  — the exact sticker/pill aesthetic the homepage redesign already removed
  elsewhere.
- **Every one of the 12 games repeats the same two AI-card patterns**:
  1. A dashed-border `rounded-full` "eyebrow" pill with an icon above the
     section title (e.g. "Computer Science", "Electricity", "Did you know").
  2. Inside each game's "what you learn" callout, a tiny all-caps
     `tracking-[0.2em]` micro-label ("Did you know", "Physics minute",
     "Stargazer fact", "Engineering fact") before the real content.
- **Workshop Finder** is listed as a 13th "activity" card linking to
  `/find-a-workshop`, but it's not a game — it's already linked from the
  homepage hero, the homepage "Get Involved" section, the footer, and the
  `/workshops` page. It doesn't belong on this page.
- **Curiosity Compass** ("how do you like to learn?") recommends one of 4
  external `/projects` pages. It doesn't teach a STEM concept itself and its
  recommendations point away from this page's actual content.

## New page structure

1. **Hero** (rewritten)
2. **"Not sure where to start?"** (Curiosity Compass, repurposed)
3. **"What's here"** — grouped table of contents (replaces the 13-card grid)
4. **Activity sections**, reordered into 3 subject groups, each with a group
   intro header
5. **Closing CTA** (unchanged)

### 1. Hero

Match the established sub-page hero pattern (see
`workshops-page-content.tsx`: plain-text eyebrow, no pill chrome).

- Remove the "Back to home" pill entirely (the navbar already provides Home
  navigation; no other page on the site has this link).
- Remove the dashed-border eyebrow pill and its `Play` icon. Replace with
  plain text, matching `workshopsPage.seriesEyebrow` styling:
  `text-sm font-bold uppercase tracking-wider text-primary-foreground/80`.
- Remove the bottom "13 interactive activities" pill and `Sparkles` icon.
- New copy (`gamesPage`, EN — ES/ZH added to match during implementation,
  following the existing tone of those translation blocks):
  - `eyebrow`: "Interactive Labs" (replaces current `eyebrow: "Interactive
    labs"` value used by the pill — same key, new rendering)
  - `title`: keep "Explore interactive STEM labs"
  - `description`: "Every activity below teaches something real — physics,
    code, chemistry, or engineering. They run right in your browser, they're
    always free, and there's nothing to install or sign in to."
  - Remove `countLabel`, `cardOpen`, `backToHome`, `jumpTo` (superseded by
    new copy below — verify no other usages before deleting).

### 2. "Not sure where to start?" (repurposed Curiosity Compass)

Placed directly below the hero. Keeps the pick-one-of-several interaction
that makes Curiosity Compass fun, but:

- Drops the 4 `build/code/discover/invent` paths and their links to
  `/projects/*`.
- Offers **3 options, one per subject group below**, each leading to that
  group's first activity on this same page.
- Visual treatment: plain selectable cards with a colored left accent bar
  (group color), no icon badges, no pills — consistent with the homepage
  redesign's "small colored accent bar, no icon circles" pattern for the
  values row.

New copy (`gamesPage`, EN):

- `startHereTitle`: "Not sure where to start?"
- `startHereDesc`: "Pick whichever sounds the most fun — we'll jump you to a
  good first activity."
- Three options (label + one-line hint + target anchor + group color):
  - `startHereCodeLabel`: "Coding & logic" /
    `startHereCodeHint`: "I like figuring out puzzles and telling computers
    what to do." → links to `#python` (first activity in Code & Logic),
    accent `avanza-purple`
  - `startHereBuildLabel`: "Building & testing" /
    `startHereBuildHint`: "I like building things and seeing how much they
    can take." → `#bridge`, accent `avanza-orange`
  - `startHereScienceLabel`: "Science experiments" /
    `startHereScienceHint`: "I like mixing things, wiring things up, and
    watching what happens." → `#atom`, accent `avanza-teal`
- After picking: "Great choice — start with **{activity name}**" plus a link
  to jump to that activity, and a smaller "see all {group name} activities"
  link to that group's section. A "pick again" reset link/button.
- `startHereGo`: "Start here" / `startHereSeeGroup`: "See all {group}
  activities" / `startHereReset`: "Pick again"

Implementation notes:
- The component (`components/ui/curiosity-compass.tsx`) is rewritten in
  place with this new content/logic. Given the scope of the rewrite, it may
  be renamed to something like `components/ui/start-here.tsx` for clarity —
  implementer's call, update the import in `games-page-content.tsx`
  accordingly.
- Old `home.compass*` translation keys are used **only** by this component
  (verified via repo search) — remove them once the rewrite lands, across
  en/es/zh.
- Anchor id changes from `compass` to `start-here` (or similar) — it's no
  longer one of the "activities," so it shouldn't appear in the grouped TOC.

### 3. "What's here" — grouped table of contents

Replaces the `cards` array + `GameCard` grid entirely. Plain, grouped list:

- Section heading, e.g. "What's here" with a one-line subhead: "12 activities,
  grouped by subject. Jump to any of them, or scroll through in order."
- Layout: 3 columns on desktop (`lg:grid-cols-3`), one per subject group,
  stacking on mobile. Each column:
  - Group name (e.g. "Code & Logic") as a heading
  - Group's one-line description (see groups below)
  - A simple list (`<ul>`) of that group's activities — each item is a link
    (`<a href="#id">`) with the activity name (bold) and its existing
    one-line tagline as plain text underneath. No icons, no cards, no pill
    backgrounds. A subtle hover state (e.g. text color shift / underline) is
    enough.

### 4. Subject groups & reordering

Reorder the `<div id="...">` activity sections in
`games-page-content.tsx` into 3 groups. Before each group's first activity,
insert a **group intro header**: a centered text block (small uppercase
group-color label, `h2` group name, 1-2 sentence description) on a neutral
background, giving the page rhythm/hierarchy.

**Code & Logic** (`avanza-purple`)
> "Write real code, program a robot to solve a maze, and see how computers
> make decisions using logic and sorting."
- Python Playground (`#python`)
- Code-the-Path Robot (`#robot`)
- Logic Gate Puzzle (`#logic`)
- Sorting Race (`#sort`)

**Build & Test** (`avanza-orange`)
> "Design a bridge, stack a tower, aim a catapult, and build a marble run —
> then see what happens when you push them to the limit."
- Bridge Load Lab (`#bridge`)
- Block Tower Physics (`#tower`)
- Catapult Lab (`#catapult`)
- Marble Run (`#marble`)

**Science Lab** (`avanza-teal`)
> "Build atoms, wire up circuits, stack liquids by density, and watch gravity
> pull planets into orbit."
- Atom Builder (`#atom`)
- Circuit Builder (`#circuit`)
- Density Tower (`#density`)
- Gravity Sandbox (`#gravity`)

New translation keys needed (EN, `gamesPage`): `groupCodeName`/`groupCodeDesc`,
`groupBuildName`/`groupBuildDesc`, `groupScienceName`/`groupScienceDesc` (+
ES/ZH equivalents).

### 5. Per-game pattern sweep (mechanical, all 12 activities)

Two find-and-replace style transformations applied to each of the 12 game
components. Content/copy is **not** rewritten in this phase (that's Phase
2-4) — only the markup/styling changes.

**(a) Top eyebrow pill → plain text label**

Before (current pattern, repeated in all 12 files):
```tsx
<span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-avanza-dark">
  <Bot className="h-3.5 w-3.5 text-avanza-purple" />
  {t.gamesPage.robotEyebrow}
</span>
```

After:
```tsx
<p className="text-sm font-bold uppercase tracking-wider text-avanza-purple">
  {t.gamesPage.robotEyebrow}
</p>
```

- Drop the icon entirely (no icon import needed just for this label).
- Pick the text color to match the activity's existing accent (`tone`/icon
  color already used elsewhere in that file — e.g. circuit → `avanza-orange`,
  gravity → `avanza-teal`, etc.)
- For `gravity-sandbox.tsx`, whose section has a dark background, use
  `text-white/70` instead.
- Existing eyebrow translation values are reused as-is (no copy changes):
  `robotEyebrow` "Computer Science", `circuitEyebrow` "Electricity",
  `catapultEyebrow` "Projectile motion", `gravityEyebrow` "Astronomy",
  `logicEyebrow` "Boolean logic", `densityEyebrow` "Chemistry", `sortEyebrow`
  "Algorithms", `marbleEyebrow` "Engineering", and the shared `home.pyEyebrow`
  "Try it yourself", `home.bridgeEyebrow`/`home.jengaEyebrow` "Engineering
  Lab", `home.atomEyebrow` "Chemistry Bench" (these last four are also used by
  `InteractiveLabTeasers.tsx` on the homepage — keep the translation
  values unchanged, only change how this page renders them).

**(b) "Did you know"-style micro-label → normal heading**

Before (e.g. `circuit-builder.tsx`):
```tsx
<p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-avanza-orange">
  {t.gamesPage.circuitFactEyebrow}
</p>
<p className="mt-2 text-lg font-extrabold text-foreground">
  {t.gamesPage.circuitFactTitle}
</p>
<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
  {t.gamesPage.circuitFactBody}
</p>
```

After — drop the generic micro-label line ("Did you know", "Physics minute",
"Stargazer fact", "Engineering fact") and let the real title be the heading:
```tsx
<p className="text-lg font-extrabold text-foreground">
  {t.gamesPage.circuitFactTitle}
</p>
<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
  {t.gamesPage.circuitFactBody}
</p>
```

Per-file handling (check each file's actual current structure — these are
the known cases from the codebase scan):
- `circuit-builder.tsx`, `catapult-lab.tsx`, `gravity-sandbox.tsx`,
  `marble-run.tsx`: drop `*FactEyebrow` ("Did you know" / "Physics minute" /
  "Stargazer fact" / "Engineering fact"), keep `*FactTitle` + `*FactBody` as
  heading + body.
- `density-tower.tsx`: `densityFactEyebrow` is "Why it works" with no
  separate title — promote that text itself to be the heading (drop the
  micro-label styling, keep the words).
- `code-path-robot.tsx`: `robotLessonTitle` ("What you learn") is currently
  styled as the micro-label with no separate title — promote it to a normal
  heading the same way.
- `jenga-tower.tsx`: `jengaLessonTitle` ("Why this works") — same treatment.
- `sorting-race.tsx`: check actual structure around `sortFactEyebrow` during
  implementation and apply the same rule (promote to heading, drop generic
  micro-label if a separate title exists).
- `logic-gate-puzzle.tsx`, `python-playground.tsx`, `bridge-load-demo.tsx`,
  `atom-builder.tsx`: only have the top eyebrow pill (a) — no fact/lesson
  micro-label to fix, confirm during implementation.

The "what you learn" panel **container** (background tint, border/ring,
padding) is kept as-is — it's a legitimate content callout, not decorative
chrome.

## Workshop Finder removal

- Remove the `finder` entry from the `cards` array in
  `games-page-content.tsx` (and the `cards`/`GameCard`/`GameCard` function
  itself, superseded by the new TOC in section 3).
- Remove now-unused imports (`MapPin`, and any other icons only used by the
  removed card grid).
- `gamesPage.finderName` / `gamesPage.finderTagline` (en/es/zh) — verify
  unused elsewhere, then remove.
- No replacement link is added; `/find-a-workshop` remains reachable via
  hero, footer, and `/workshops` (per user decision).

## Code cleanup checklist

- Delete `GameCard` component, `GameCard` type, and `cards` array from
  `games-page-content.tsx`.
- Remove now-unused icon imports (`MapPin`, `Sparkles`, `Play`, `ArrowLeft`,
  `Bot`/etc. per-file if only used by removed eyebrow icons — check each
  file).
- Remove unused translation keys after confirming via repo-wide search
  (en/es/zh): `gamesPage.countLabel`, `cardOpen`, `backToHome`, `jumpTo`,
  `finderName`, `finderTagline`, `home.compass*` (~14 keys × 3 languages).
- Add new translation keys (en/es/zh): hero `eyebrow`/`description` updates,
  `startHere*` (≈10 keys), `group*Name`/`group*Desc` (6 keys).

## Verification plan

- `npm run lint` (eslint + `tsc --noEmit`) — no type errors from
  removed/added code or translation keys.
- `npm run dev`, view `/games` at desktop and mobile widths in EN, ES, and ZH:
  - No pills, badges, chips, or eyebrow tags remain anywhere on the page.
  - Hero renders cleanly with new copy.
  - "Not sure where to start?" picks correctly jump to `#python`/`#bridge`/
    `#atom` and the "see all" links scroll to the right group.
  - Grouped TOC links all resolve to the correct `#anchor` sections.
  - All 12 activity sections appear in the new group order with group intro
    headers between groups.
  - Workshop Finder no longer appears anywhere on `/games`.
  - No console errors, no broken anchors/links.
