import Image from "next/image"
import Link from "next/link"
import type { CSSProperties, ReactNode } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Shared design kit for the individual course pages
 * (`/curriculums/intro-to-python`, `/courses/*`).
 *
 * The audience is kids and their parents, so these pages use the full page
 * width, real photographs from Avanza workshops and projects, and a distinct
 * color identity per course.
 *
 * Deliberately absent: pill badges, capsule chips, tag clouds, icon tiles, and
 * chunky rounded buttons with trailing arrows. Structure here is carried by
 * type, hairline rules, and color - not by wrapping every short string in a
 * rounded container. Primary actions are a single squared-off solid button;
 * secondary actions are underlined text links, never a second capsule.
 *
 * Color is themed per course through CSS custom properties set once by
 * {@link CourseShell}, so one set of components covers all six courses without
 * building Tailwind class names at runtime (which Tailwind cannot extract).
 */

/**
 * The per-course palette. Every field is a concrete color so the values drop
 * straight into CSS custom properties - no runtime color math.
 */
export type CourseTheme = {
  /** Full-strength brand color for rules, numerals, and marks. */
  accent: string
  /** Darker shade that stays readable as text and as a button fill. */
  accentDark: string
  /** Hero band background - the page's "cover" color. */
  band: string
  /** Soft section background used to alternate the page rhythm. */
  tint: string
  /** Very light accent wash for highlighted panels. */
  soft: string
  /** Hairline in the accent hue, for rules that should not read as gray. */
  line: string
}

/** Named palettes, one per course, so no two hubs look alike. */
export const courseThemes = {
  python: {
    accent: "#2ecc71",
    accentDark: "#1b7e44",
    band: "#e9fbe9",
    tint: "#f2fdf4",
    soft: "#d5f5e0",
    line: "#a8e6c0",
  },
  engineering: {
    accent: "#8b5cf6",
    accentDark: "#6d28d9",
    band: "#f1ecff",
    tint: "#f8f5ff",
    soft: "#e6dcff",
    line: "#cbb8f7",
  },
  science: {
    accent: "#f97316",
    accentDark: "#c2410c",
    band: "#fff1e3",
    tint: "#fff8f1",
    soft: "#ffe3cc",
    line: "#f9c79b",
  },
  math: {
    accent: "#1abc9c",
    accentDark: "#0f766e",
    band: "#e4f8f4",
    tint: "#f1fcfa",
    soft: "#cdf1ea",
    line: "#96ded0",
  },
  /**
   * Robotics keeps the Avanza green of its many interactive components
   * (simulator, block editor, knowledge checks) and is set apart by a dark
   * cover instead of a different hue.
   */
  robotics: {
    accent: "#2ecc71",
    accentDark: "#1b7e44",
    band: "#eaf4f0",
    tint: "#f2f9f6",
    soft: "#d5f0e2",
    line: "#a5dcc3",
  },
  /**
   * Intro to AI pairs the green of its in-course components with the violet
   * used by the course's own journey diagram, so the page is unmistakably a
   * different course without recoloring the lesson UI.
   */
  ai: {
    accent: "#2ecc71",
    accentDark: "#1b7e44",
    band: "#f2ecfd",
    tint: "#faf6ff",
    soft: "#d9f5e4",
    line: "#d3bcf5",
  },
} satisfies Record<string, CourseTheme>

/**
 * Sets the course palette for everything inside it. All kit components read
 * `--c-accent` / `--c-tint` / etc., so one wrapper themes a whole page.
 */
export function CourseShell({
  theme,
  children,
}: {
  theme: CourseTheme
  children: ReactNode
}) {
  const vars = {
    "--c-accent": theme.accent,
    "--c-accent-dark": theme.accentDark,
    "--c-band": theme.band,
    "--c-tint": theme.tint,
    "--c-soft": theme.soft,
    "--c-line": theme.line,
  } as CSSProperties

  return (
    <div style={vars} className="bg-background">
      {children}
    </div>
  )
}

/* ------------------------------- type ----------------------------------- */

/**
 * The small line of accent text that sits above a heading. Plain type - not a
 * badge, not a capsule, no leading dot and no uppercase letterspacing.
 */
function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={cn(
        "text-sm font-bold",
        dark ? "text-[var(--c-accent)]" : "text-[var(--c-accent-dark)]",
      )}
    >
      {children}
    </p>
  )
}

/* ------------------------------- hero ----------------------------------- */

/** A single fact in the hero's quick-scan row ("Grades 2-5", "6 lessons"). */
export type CourseFact = { label: string; value: string }

/**
 * The course cover: a full-width color band with the title, a plain-language
 * lead for parents, quick facts, the primary action, and a real photograph (or
 * a course-specific illustration) alongside it.
 *
 * Deliberately asymmetric and full-bleed - the old hero was a centered column
 * in the middle of a lot of empty margin.
 */
export function CourseHero({
  eyebrow,
  title,
  lead,
  facts,
  media,
  mediaCaption,
  children,
  note,
  dark = false,
}: {
  eyebrow: string
  title: string
  lead: string
  facts: CourseFact[]
  /** Photo for the cover, or a custom visual for courses without one. */
  media: { src: string; alt: string } | ReactNode
  /** Caption beside the cover - says what students actually do. */
  mediaCaption?: string
  /** Primary / secondary actions. */
  children?: ReactNode
  /** One reassuring line under the actions (cost, setup, account). */
  note?: string
  /**
   * Inverts the cover to the dark navy surface. Used by courses whose subject
   * reads as "screen and machine" (Robotics) so the six covers do not all look
   * like the same pastel band.
   */
  dark?: boolean
}) {
  const isPhoto =
    typeof media === "object" && media !== null && "src" in (media as Record<string, unknown>)

  return (
    <section
      className={cn("relative overflow-hidden", dark ? "bg-avanza-dark" : "bg-[var(--c-band)]")}
    >
      {/* Soft light and graph paper: warmth without decorative clip art. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[var(--c-accent)] blur-3xl",
          dark ? "opacity-25" : "opacity-15",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-white blur-3xl",
          dark ? "opacity-10" : "opacity-40",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "notebook-grid pointer-events-none absolute inset-0",
          dark ? "opacity-10" : "opacity-40",
        )}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>

          <h1
            className={cn(
              "mt-3 text-balance text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl",
              dark ? "text-white" : "text-avanza-dark",
            )}
          >
            {title}
          </h1>

          <p
            className={cn(
              "mt-5 max-w-xl text-lg leading-relaxed md:text-xl",
              dark ? "text-white/70" : "text-avanza-dark/75",
            )}
          >
            {lead}
          </p>

          {/* Facts as a plain definition row divided by a hairline, not chips. */}
          <dl
            className={cn(
              "mt-9 grid max-w-xl grid-cols-2 gap-x-8 gap-y-5 border-t pt-6 sm:grid-cols-4",
              dark ? "border-white/15" : "border-avanza-dark/12",
            )}
          >
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt
                  className={cn(
                    "text-xs font-semibold",
                    dark ? "text-white/45" : "text-avanza-dark/50",
                  )}
                >
                  {fact.label}
                </dt>
                <dd
                  className={cn(
                    "mt-1 text-base font-bold leading-snug",
                    dark ? "text-white" : "text-avanza-dark",
                  )}
                >
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          {children ? <div className="mt-9">{children}</div> : null}

          {note ? (
            <p
              className={cn(
                "mt-6 text-sm font-medium",
                dark ? "text-white/55" : "text-avanza-dark/60",
              )}
            >
              {note}
            </p>
          ) : null}
        </div>

        <div>
          {isPhoto ? (
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-white shadow-[0_24px_60px_-28px_rgba(26,26,46,0.5)]">
              <Image
                src={(media as { src: string }).src}
                alt={(media as { alt: string }).alt}
                fill
                priority
                sizes="(min-width: 1024px) 44rem, 100vw"
                className="object-cover"
              />
            </div>
          ) : (
            (media as ReactNode)
          )}

          {mediaCaption ? (
            <p
              className={cn(
                "mt-5 border-l-2 border-[var(--c-accent)] pl-4 text-sm font-medium leading-relaxed",
                dark ? "text-white/65" : "text-avanza-dark/70",
              )}
            >
              {mediaCaption}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}

/**
 * Anchor links to the main sections of the page. A plain rule-bounded row of
 * text links - the contents line of a magazine feature, not a row of tabs.
 */
export function CourseJumpNav({
  items,
  label = "On this page",
}: {
  items: { href: string; label: string }[]
  label?: string
}) {
  return (
    <nav
      aria-label={label}
      className="border-y border-[var(--c-line)] bg-[var(--c-tint)] print:hidden"
    >
      <div className="mx-auto max-w-7xl px-6">
        <ul className="flex items-center gap-x-7 overflow-x-auto py-4">
          <li className="shrink-0 text-sm font-medium text-avanza-dark/45">{label}</li>
          {items.map((item) => (
            <li key={item.href} className="shrink-0">
              <a
                href={item.href}
                className="whitespace-nowrap text-sm font-bold text-avanza-dark underline decoration-[var(--c-accent)] decoration-2 underline-offset-[6px] transition-colors hover:text-[var(--c-accent-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] focus-visible:ring-offset-2"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

/* ---------------------------- actions ----------------------------------- */

/**
 * The one solid button on a screenful. Squared off, no icon, no lift - the
 * emphasis comes from being the only filled element around it.
 */
export function CourseButton({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center rounded-md bg-[var(--c-accent-dark)] px-7 py-3.5 text-base font-bold text-white transition-colors duration-150 hover:bg-avanza-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] focus-visible:ring-offset-2",
        className,
      )}
    >
      {children}
    </Link>
  )
}

/**
 * The secondary action: an underlined text link, never a second button. Two
 * filled shapes side by side is the pattern this page set is trying to avoid.
 */
export function CourseTextLink({
  href,
  children,
  dark = false,
  className,
}: {
  href: string
  children: ReactNode
  dark?: boolean
  className?: string
}) {
  const classes = cn(
    "text-base font-bold underline decoration-[var(--c-accent)] decoration-2 underline-offset-[6px] transition-all hover:decoration-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] focus-visible:ring-offset-2",
    dark ? "text-white" : "text-avanza-dark",
    className,
  )

  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}

/** Groups a primary button with its secondary text link. */
export function CourseActions({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-x-8 gap-y-4">{children}</div>
}

/* ---------------------------- sections ---------------------------------- */

/** Background treatment for a section, used to give the page a rhythm. */
export type SectionTone = "plain" | "tint" | "band" | "dark" | "paper"

const TONE_CLASS: Record<SectionTone, string> = {
  plain: "bg-background",
  tint: "bg-[var(--c-tint)]",
  band: "bg-[var(--c-band)]",
  dark: "bg-avanza-dark",
  paper: "notebook-grid bg-[var(--c-tint)]",
}

/**
 * A page section with a large, left-aligned heading. Sections are wide
 * (`max-w-7xl`) so content uses the page instead of sitting in a narrow strip,
 * and `tone` alternates the background so the page reads as chapters rather
 * than one long document.
 */
export function CourseSection({
  id,
  tone = "plain",
  eyebrow,
  title,
  lead,
  aside,
  children,
  className,
}: {
  id?: string
  tone?: SectionTone
  eyebrow?: string
  title?: string
  lead?: string
  /** Optional right-hand content beside the heading (a link, a stat). */
  aside?: ReactNode
  children: ReactNode
  className?: string
}) {
  const dark = tone === "dark"

  return (
    <section id={id} className={cn("scroll-mt-24", TONE_CLASS[tone], className)}>
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        {title ? (
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div className="max-w-3xl">
              {eyebrow ? <Eyebrow dark={dark}>{eyebrow}</Eyebrow> : null}
              <h2
                className={cn(
                  "text-3xl font-extrabold tracking-tight md:text-4xl",
                  eyebrow ? "mt-2" : undefined,
                  dark ? "text-white" : "text-avanza-dark",
                )}
              >
                {title}
              </h2>
              {lead ? (
                <p
                  className={cn(
                    "mt-4 text-base leading-relaxed md:text-lg",
                    dark ? "text-white/70" : "text-avanza-dark/70",
                  )}
                >
                  {lead}
                </p>
              ) : null}
            </div>
            {aside ? <div className="shrink-0">{aside}</div> : null}
          </div>
        ) : null}

        <div className={title ? "mt-10" : undefined}>{children}</div>
      </div>
    </section>
  )
}

/* ------------------------------ content --------------------------------- */

/**
 * A list of what students learn or do. Rows divided by hairlines rather than
 * boxed into cards, so a long list reads as a list instead of a wall of tiles.
 */
export function CheckGrid({
  items,
  columns = 2,
  dark = false,
}: {
  items: string[]
  columns?: 1 | 2 | 3
  dark?: boolean
}) {
  const rule = dark ? "border-white/15" : "border-avanza-dark/10"

  return (
    <ul
      className={cn(
        "grid gap-x-12 border-t",
        rule,
        columns === 1 ? "" : columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {items.map((item) => (
        <li key={item} className={cn("flex gap-4 border-b py-5", rule)}>
          <Check
            aria-hidden
            strokeWidth={3}
            className="mt-1 h-4 w-4 flex-none text-[var(--c-accent)]"
          />
          <span
            className={cn(
              "text-base leading-relaxed",
              dark ? "text-white/80" : "text-avanza-dark/85",
            )}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}

/**
 * The repeating shape of a lesson, as numbered entries with the step number set
 * large in the accent color. The numeral carries the structure, so no circled
 * step marker or badge is needed.
 */
export function StepFlow({
  steps,
  columns = 3,
  dark = false,
}: {
  steps: { title: string; description: string }[]
  columns?: 2 | 3
  dark?: boolean
}) {
  const rule = dark ? "border-white/15" : "border-avanza-dark/10"

  return (
    <ol
      className={cn(
        "grid gap-x-12 border-t",
        rule,
        columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {steps.map((step, i) => (
        <li key={step.title} className={cn("flex gap-5 border-b py-6", rule)}>
          <span
            aria-hidden
            className="font-mono text-2xl font-bold leading-none text-[var(--c-accent)]"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <p className={cn("text-lg font-extrabold", dark ? "text-white" : "text-avanza-dark")}>
              {step.title}
            </p>
            <p
              className={cn(
                "mt-1.5 text-sm leading-relaxed",
                dark ? "text-white/65" : "text-avanza-dark/70",
              )}
            >
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}

/**
 * A grouped supply list. Materials are the first thing a parent checks, so each
 * group gets its own column with a ruled heading and a plain list underneath -
 * no tag clouds.
 */
export function MaterialsGrid({
  groups,
}: {
  groups: { label: string; caption?: string; items: string[] }[]
}) {
  return (
    <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="border-b-2 border-[var(--c-accent)] pb-2 text-base font-extrabold text-avanza-dark">
            {group.label}
          </p>
          {group.caption ? (
            <p className="mt-2 text-sm font-medium text-[var(--c-accent-dark)]">{group.caption}</p>
          ) : null}
          <ul className="mt-3 space-y-1.5">
            {group.items.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-avanza-dark/75">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/** A highlighted aside - safety, reassurance, or a "you don't need X" note. */
export function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="border-l-2 border-[var(--c-accent)] bg-[var(--c-soft)]/40 px-6 py-5">
      {title ? <p className="font-extrabold text-avanza-dark">{title}</p> : null}
      <div className="mt-1 text-base leading-relaxed text-avanza-dark/75">{children}</div>
    </div>
  )
}

/** A linked resource - a guide, a worksheet set, a studio. */
export function ResourceCard({
  href,
  title,
  description,
}: {
  href: string
  title: string
  description: string
}) {
  return (
    <Link
      href={href}
      className="group block border-t-2 border-avanza-dark/10 pt-4 transition-colors hover:border-[var(--c-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] focus-visible:ring-offset-2"
    >
      <span className="block text-lg font-extrabold text-avanza-dark underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors group-hover:decoration-[var(--c-accent)]">
        {title}
      </span>
      <span className="mt-2 block text-sm leading-relaxed text-avanza-dark/70">{description}</span>
    </Link>
  )
}

/**
 * A band of real Avanza photographs. Nothing sells a hands-on course to a
 * parent like seeing the actual room and the actual builds.
 */
export function PhotoBand({
  photos,
}: {
  photos: { src: string; alt: string; caption: string }[]
}) {
  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo) => (
        <li key={photo.src}>
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-secondary">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <p className="mt-4 text-base leading-relaxed text-avanza-dark/75">{photo.caption}</p>
        </li>
      ))}
    </ul>
  )
}

/** Oversized headline numbers - a fast answer to "what is this, exactly?". */
export function StatRow({
  stats,
  dark = false,
}: {
  stats: { value: string; label: string }[]
  dark?: boolean
}) {
  return (
    <dl className="flex flex-wrap gap-x-10 gap-y-5">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dd className="text-4xl font-extrabold leading-none text-[var(--c-accent-dark)]">
            {stat.value}
          </dd>
          <dt
            className={cn(
              "mt-2 text-sm font-semibold",
              dark ? "text-white/65" : "text-avanza-dark/60",
            )}
          >
            {stat.label}
          </dt>
        </div>
      ))}
    </dl>
  )
}

/**
 * The closing block: one clear next step plus the way back to the catalog.
 * Dark, so the page ends on a deliberate note instead of trailing off.
 */
export function CourseClosing({
  title,
  description,
  children,
  backLabel = "Browse all curriculums",
}: {
  title: string
  description: string
  /** The resume / start control for this course. */
  children: ReactNode
  backLabel?: string
}) {
  return (
    <section className="relative overflow-hidden bg-avanza-dark">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[var(--c-accent)] opacity-25 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">{description}</p>
        </div>
        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          {children}
          <CourseTextLink href="/curriculums" dark>
            {backLabel}
          </CourseTextLink>
        </div>
      </div>
    </section>
  )
}
