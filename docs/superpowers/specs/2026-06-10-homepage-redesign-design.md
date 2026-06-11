# Avanza STEM Homepage Redesign — Design Spec

Date: 2026-06-10

## Goal

Refactor `/` (the homepage) so it reads as a real, trustworthy, youth-led STEM
organization's homepage rather than an AI-generated landing page. The page
must, within seconds, answer:

1. What is Avanza STEM?
2. Who is it for?
3. What do students actually do?
4. How can students, parents, schools, or supporters get involved?

## Problems with the current homepage

- 11 sections + a newsletter block — too long, repetitive, several sections
  cover the same ground (stats appear twice, "find a workshop" CTA appears
  five times).
- Pills/badges/eyebrow tags everywhere: `HeroBadge` sticker badges, dashed
  eyebrow pills, "Week N" tilted badges on workshop cards, "133 Photos" pill.
- Generic decoration that doesn't add meaning: confetti-dot backgrounds,
  dotted grid backgrounds, hand-drawn rotated photo frames, bouncy
  spin/tap/bounce hover animations on icons.
- Two dead components already exist and aren't imported anywhere:
  `components/pages/home/HomeLabs.tsx` and
  `components/pages/home/TrustBand.tsx`.
- Copy is generic ("Ready to Start Your STEM Journey?") instead of using the
  real, specific facts the org already has (founder, libraries, real student
  counts, real workshop topics).

## Real facts to use (already in the codebase / translations)

- Youth-led, founded by Liam Salcedo (`aboutPage` translations have the full
  origin story: folding table, popsicle sticks, library).
- Currently active at **Clifton Public Library** and **Allwood Branch
  Library**, Clifton, NJ.
- Open to grades 2+ (roughly ages 7–14).
- Always free. Workshops taught in English & Spanish; site supports English,
  Spanish, and Chinese.
- 70+ students reached, 2 completed library workshop series, 133 real
  workshop photos ("As of June 2026").
- Three real workshop topics taught: Engineering/Building, Coding (Python),
  Artificial Intelligence.
- Real images available:
  - `/images/home/hero.avif`
  - `/images/workshops/Building Workshop Description.jpeg`
  - `/images/workshops/Coding Workshop Description.png`
  - `/images/workshops/AI Workshop Description.JPG`
  - `/images/workshops/past-science.jpg` (used on About page)
  - `/images/home/featured-bridge.jpg`
  - `/images/home/featured-python.jpg`
  - `/images/home/coke-mentos-science-experiment-kids.png`
  - `galleryImages` from `components/ui/gallery` (133 photos, used for
    gallery teaser grid)

## New page structure (6 sections)

Replaces the current `app/page.tsx` (`HeroSection`, `ValuesStrip`,
`OfferCards`, `WorkshopShowcase`, `MissionSection`, `ImpactSection`,
`GalleryTeaserSection`, `FeaturedActivities`, `InteractiveLabTeasers`,
`NewsletterSignup`, `FinalCTASection`).

### 1. Hero (`HeroSection.tsx`, rewritten)

- Two-column layout retained (text left / photo right on desktop, stacked on
  mobile).
- **Remove**: confetti-dot background pattern, dashed-border eyebrow pill,
  the three `HeroBadge` sticker badges, the rotated hand-drawn photo frame.
- **Background**: keep a soft flat tint (current `#edffd6` is fine), no
  decorative pattern.
- **Photo**: `/images/home/hero.avif`, simple rounded corners + soft shadow,
  no rotation/frame.
- **Copy (EN)**:
  - Headline: "Free, hands-on STEM workshops for kids — taught by students."
  - Subhead: "Avanza STEM brings free engineering, coding, and AI workshops
    to public libraries in Clifton, NJ, for students in 2nd grade and up. No
    experience needed — just curiosity."
  - Primary CTA: "Find a Workshop Near You" → `/find-a-workshop`
  - Secondary CTA: "Browse DIY Projects" → `/projects`
  - Trust line (plain text, no pills): "Always free · Grades 2+ · English &
    Spanish · Clifton, NJ"

### 2. Why We Exist (new component, e.g. `WhyWeExistSection.tsx`)

Replaces `MissionSection` + `ValuesStrip`.

- Two-column layout: text on one side, real photo (`past-science.jpg`) on
  the other.
- Below: a 3-column row of values as plain text blocks, each with a small
  colored top accent bar (no icon circles, no pills).
- **Copy (EN)**:
  - Heading: "Why Avanza STEM Exists"
  - Paragraph 1 (origin): "Avanza STEM started with a folding table, a box
    of popsicle sticks, and a few kids at a local library who'd never built
    anything before. Three hours later, they had bridges strong enough to
    hold textbooks — and they were already asking when the next workshop
    was."
  - Paragraph 2 (mission): "We started Avanza STEM because too many STEM
    programs are expensive, far away, or not offered in Spanish — and that
    shuts kids out, including in our own community. Avanza STEM is
    youth-led, free, and focused on reaching Hispanic and underrepresented
    students in Clifton, NJ."
  - Values row:
    - Access for All — "No cost, no application, no barriers."
    - Curiosity First — "We hand kids materials and let them build, test,
      and fail until it works."
    - Community Rooted — "We show up at the libraries families already
      visit."
  - Link: "Read our full story →" → `/about`

### 3. What Students Do (new component, e.g. `WhatStudentsDoSection.tsx`)

Replaces `WorkshopShowcase` + `FeaturedActivities`.

- Heading + intro, then 3 program cards in a row with real workshop photos.
  No "Week N" sticker badges.
- Below: smaller "try this at home" row of 3 project cards.
- **Copy (EN)**:
  - Heading: "What Students Actually Do"
  - Subhead: "Every workshop is hands-on. Here's what a typical series looks
    like — and a few projects anyone can try at home."
  - Program cards (image / title / description):
    1. `Building Workshop Description.jpeg` — "Engineering & Building" —
       "From mechanical to civil to chemical engineering, kids learn what
       each type of engineer actually does, then build something with their
       own hands."
    2. `Coding Workshop Description.png` — "Coding" — "Every student leaves
       with a working Python game they wrote themselves. No experience
       required."
    3. `AI Workshop Description.JPG` — "Artificial Intelligence" — "How AI
       actually works, why apps recommend what they do, and how to use it
       without depending on it."
  - CTA: "See upcoming workshops" → `/workshops`
  - Try-at-home cards (image / title / href), reuse existing
    `featuredBridge`/`featuredCoding`/`featuredMentos` copy:
    - `featured-bridge.jpg` — Build a Popsicle Stick Bridge →
      `/projects/popsicle-stick-bridge`
    - `featured-python.jpg` — Intro to Python Coding →
      `/projects/my-first-python-program`
    - `coke-mentos-science-experiment-kids.png` — Coke & Mentos Experiment →
      `/blog/5-easy-science-experiments`
  - CTA: "Browse all projects" → `/projects`

### 4. Try It Yourself (`InteractiveLabTeasers.tsx`, rewritten)

- Keep the 4-card grid and the existing `StaticPreview` graphics (code
  editor preview, bridge SVG, block tower, atom model) — these are real
  content previews and stay.
- **Remove**: dashed-border "Interactive STEM labs" eyebrow pill, dotted
  grid background pattern.
- Section gets a plain, slightly tinted flat background (e.g. `#fff8e7`
  without the grid overlay) for contrast with the section above.
- **Copy (EN)**:
  - Heading: "Try It Yourself — Right Now"
  - Subhead: "These are the same kinds of activities from our workshops. No
    login, no install — just click and try."
  - Per-card small uppercase labels and "Open" tags stay as-is (functional,
    not decorative).
  - CTA: "Explore all interactive labs" → `/games`

### 5. Who It's For (new component, e.g. `WhoItsForSection.tsx`)

Replaces `ImpactSection` + `GalleryTeaserSection` + dead `TrustBand`.

- Intro paragraph answering "who is this for", then 3 plain stat blocks (big
  number + label, no card chrome/icons), then a smaller photo grid (6-8
  images from `galleryImages`) linking to `/gallery`.
- **Copy (EN)**:
  - Heading: "Who It's For"
  - Intro: "Avanza STEM is open to any student in 2nd grade and up (roughly
    ages 7–14). Workshops are always free, taught in English and Spanish,
    and held at public libraries in Clifton, NJ — open to families, schools,
    and community groups."
  - Stats (with small "As of June 2026" note):
    - 70+ — Students reached
    - 2 — Library workshop series (Clifton Public Library & Allwood Branch
      Library)
    - 133 — Real workshop photos
  - Gallery teaser: 6-8 photos, "See more photos →" → `/gallery`

### 6. Get Involved (new component, e.g. `GetInvolvedSection.tsx`)

Replaces `OfferCards` + `FinalCTASection`. `NewsletterSignup` is reused
(existing shared component, supports `heading`/`description` props) as the
closing element.

- Heading + subhead, then two side-by-side cards for the two main
  audiences, then `NewsletterSignup`.
- **Copy (EN)**:
  - Heading: "Get Involved"
  - Subhead: "Whether you're a student, a parent, or a teacher — there's a
    way to be part of Avanza STEM."
  - Card 1 — Students & Families: "Want to join a workshop? They run at
    Clifton Public Library and Allwood Branch Library — find one near you
    and sign up, free." → CTA "Find a Workshop Near You" →
    `/find-a-workshop`
  - Card 2 — Schools, Teachers & Libraries: "Want Avanza STEM at your school
    or library? We bring the materials, lesson plans, and instructors — you
    bring the students." → CTA "Host a Workshop" → `/host`
  - `NewsletterSignup` props: heading "Stay in the Loop", description "Get
    notified about new workshops, projects, and resources as they launch."

## Visual style guidelines

- Keep the brand palette (`avanza-green`, `avanza-teal`, `avanza-purple`,
  `avanza-orange`, `avanza-dark`) as section accents, used more sparingly.
- Remove: confetti-dot backgrounds, dotted/grid backgrounds, rotated
  hand-drawn photo frames, sticker/pill badges and eyebrow tags, "Week N"
  tilted labels, spin/tap/bounce hover animations on icons.
- Keep: rounded corners on cards/images, real photography, `FadeIn`
  scroll-in animations, simple hover lift (`-translate-y-*`) on cards/links.
- Section backgrounds should alternate (background / secondary / dark /
  tinted) for rhythm without every section needing a gradient.

## Component changes

**Rewritten in place:**
- `components/pages/home/HeroSection.tsx`
- `components/pages/home/InteractiveLabTeasers.tsx`

**New components** (in `components/pages/home/`):
- `WhyWeExistSection.tsx`
- `WhatStudentsDoSection.tsx`
- `WhoItsForSection.tsx`
- `GetInvolvedSection.tsx`

**Deleted:**
- `components/pages/home/ValuesStrip.tsx`
- `components/pages/home/OfferCards.tsx`
- `components/pages/home/WorkshopShowcase.tsx`
- `components/pages/home/MissionSection.tsx`
- `components/pages/home/ImpactSection.tsx`
- `components/pages/home/GalleryTeaserSection.tsx`
- `components/pages/home/FeaturedActivities.tsx`
- `components/pages/home/FinalCTASection.tsx`
- `components/pages/home/HomeLabs.tsx` (dead code, unused)
- `components/pages/home/TrustBand.tsx` (dead code, unused)

**`app/page.tsx`** updated to render the 6 new sections in order, with
`NewsletterSignup` embedded inside `GetInvolvedSection` (no longer rendered
separately at the page level).

## Translations

All new/changed copy needs entries in `i18n/translations.ts` for English,
Spanish, and Chinese (`home` namespace). Existing keys that are reused as-is
(e.g. `featuredBridge`, `realWorkshopBuilding`, stats values) should be kept;
new keys added for new headings/paragraphs/CTAs. Keys for sections being
removed entirely (and not reused) can be left in place if reused elsewhere,
or removed if exclusively used by deleted components — verify with a repo
search before deleting any translation key.

## Verification plan

- `npm run build` / `npm run lint` (or project equivalent) to confirm no
  type errors from removed/added components.
- Run dev server, view homepage at desktop and mobile widths, confirm:
  - No pills/badges/eyebrows remain.
  - All 6 sections render with real images and correct links.
  - Language switcher (EN/ES/ZH) shows translated copy without falling back
    to English/missing keys.
  - Responsive layout holds at mobile widths (cards stack, text remains
    readable).
