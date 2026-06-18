"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

type Accent = "green" | "orange" | "purple" | "teal"

type BlogPostLayoutProps = {
  title: string
  category: string
  categoryColor: string
  readTime: string
  image?: string
  imageAlt?: string
  imageCaption?: string
  imageFit?: "cover" | "contain"
  children: React.ReactNode
}

const categoryTextClasses: Record<string, string> = {
  "bg-avanza-green": "text-avanza-green-dark",
  "bg-avanza-orange": "text-avanza-orange-dark",
  "bg-avanza-purple": "text-avanza-purple-dark",
  "bg-avanza-teal": "text-avanza-teal-dark",
}

export function BlogPostLayout({
  title,
  category,
  categoryColor,
  readTime,
  image,
  imageAlt,
  imageCaption,
  imageFit = "cover",
  children,
}: BlogPostLayoutProps) {
  const { t } = useLanguage()
  const categoryClass = categoryTextClasses[categoryColor] ?? "text-avanza-green-dark"

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.blogPage.backToBlog}
        </Link>

        <header className="mt-8">
          <span className={`text-xs font-bold uppercase tracking-wider ${categoryClass}`}>
            {category}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight break-words text-foreground md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {readTime} {t.blogPage.readSuffix}
          </p>
        </header>

        {image && (
          <figure className="mt-8">
            <div className="relative h-64 overflow-hidden rounded-xl bg-secondary md:h-96">
              <Image
                src={image}
                alt={imageAlt ?? title}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className={imageFit === "contain" ? "object-contain" : "object-cover"}
              />
            </div>
            {imageCaption && (
              <figcaption className="mt-2 text-sm text-muted-foreground">{imageCaption}</figcaption>
            )}
          </figure>
        )}

        <article className="mt-10 max-w-prose space-y-6 text-base leading-7 text-foreground/80 md:text-[17px]">
          {children}
        </article>
      </div>
    </div>
  )
}

export function PostSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      {title.trim() !== "" && (
        <h2 className="mb-3 text-xl font-extrabold break-words text-foreground">{title}</h2>
      )}
      {children}
    </section>
  )
}

export function PostParagraph({ children }: { children: React.ReactNode }) {
  return <p className="break-words text-foreground/80">{children}</p>
}

export function PostList({ items }: { items: string[] }) {
  return (
    <ul className="ml-5 list-disc space-y-1.5 text-foreground/80">
      {items.map((item) => (
        <li key={item} className="break-words">
          {item}
        </li>
      ))}
    </ul>
  )
}

const calloutColors: Record<Accent, string> = {
  green: "border-avanza-green bg-avanza-green/8 text-avanza-green-dark",
  orange: "border-avanza-orange bg-avanza-orange/8 text-avanza-orange-dark",
  purple: "border-avanza-purple bg-avanza-purple/8 text-avanza-purple-dark",
  teal: "border-avanza-teal bg-avanza-teal/8 text-avanza-teal-dark",
}

export function PostCallout({
  title,
  children,
  accent = "green",
}: {
  title?: string
  children: React.ReactNode
  accent?: Accent
}) {
  return (
    <div className={`rounded-xl border-l-4 px-5 py-4 ${calloutColors[accent]}`}>
      {title && <p className="mb-1 text-xs font-bold uppercase tracking-wider">{title}</p>}
      <div className="text-sm leading-7 break-words text-foreground/80">{children}</div>
    </div>
  )
}

export function PostNumberedList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="space-y-4">
      {items.map((item, i) => (
        <li key={item.title} className="flex gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-avanza-green text-xs font-bold text-avanza-green-dark">
            {i + 1}
          </span>
          <div className="min-w-0">
            <p className="break-words font-bold text-foreground">{item.title}</p>
            <p className="mt-1 text-sm leading-7 break-words text-foreground/80">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function PostCode({
  title,
  code,
  accent = "green",
}: {
  title?: string
  code: string
  accent?: Accent
}) {
  return (
    <div className={`rounded-xl border-l-4 px-5 py-4 ${calloutColors[accent]}`}>
      {title && <p className="mb-1 text-xs font-bold uppercase tracking-wider">{title}</p>}
      <div className="overflow-x-auto">
        <code className="block w-max min-w-full font-mono text-sm leading-7 whitespace-pre">{code}</code>
      </div>
    </div>
  )
}

export function PostQuote({ text, attribution }: { text: string; attribution: string }) {
  return (
    <blockquote className="border-l-4 border-avanza-purple/40 pl-5">
      <p className="text-base leading-7 break-words text-foreground/80 italic">&ldquo;{text}&rdquo;</p>
      <footer className="mt-2 text-sm font-semibold break-words text-muted-foreground">
        — {attribution}
      </footer>
    </blockquote>
  )
}

export function PostImage({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption?: string
}) {
  return (
    <figure>
      <div className="relative h-64 overflow-hidden rounded-xl bg-secondary md:h-96">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  )
}

export function PostYouTube({
  videoId,
  title,
  caption,
}: {
  videoId: string
  title: string
  caption?: string
}) {
  return (
    <figure className="mx-auto max-w-sm">
      <div className="relative aspect-[9/16] overflow-hidden rounded-xl border border-border bg-secondary">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm leading-6 break-words text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export function PostCtaLink({
  title,
  text,
  linkText,
  href,
  accent = "green",
}: {
  title?: string
  text: string
  linkText: string
  href: string
  accent?: Accent
}) {
  const linkColors: Record<Accent, string> = {
    green: "text-avanza-green-dark",
    orange: "text-avanza-orange-dark",
    purple: "text-avanza-purple-dark",
    teal: "text-avanza-teal-dark",
  }
  return (
    <div className={`rounded-xl border-l-4 px-5 py-4 ${calloutColors[accent]}`}>
      {title && <p className="mb-1 text-xs font-bold uppercase tracking-wider">{title}</p>}
      <p className="text-sm leading-7 break-words text-foreground/80">{text}</p>
      <Link
        href={href}
        className={`mt-2 inline-flex items-center gap-1 text-sm font-bold underline underline-offset-4 ${linkColors[accent]}`}
      >
        {linkText}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  )
}

export function PostSummary({
  timeLabel,
  time,
  ageLabel,
  age,
  supervisionLabel,
  supervision,
  learnLabel,
  learn,
  safetyLabel,
  safety,
}: {
  timeLabel: string
  time: string
  ageLabel: string
  age: string
  supervisionLabel: string
  supervision: string
  learnLabel: string
  learn: string
  safetyLabel?: string
  safety?: string
}) {
  const rows = [
    { label: timeLabel, value: time },
    { label: ageLabel, value: age },
    { label: supervisionLabel, value: supervision },
    { label: learnLabel, value: learn },
  ]
  if (safetyLabel && safety) {
    rows.push({ label: safetyLabel, value: safety })
  }
  return (
    <dl className="grid gap-4 rounded-xl border border-border bg-secondary/40 px-5 py-4 sm:grid-cols-2">
      {rows.map((row) => (
        <div key={row.label} className="min-w-0">
          <dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{row.label}</dt>
          <dd className="mt-0.5 text-sm leading-6 break-words text-foreground/80">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function PostEndingModule({
  tryNextLabel,
  endingProject,
  endingSecondary,
  relatedLabel,
  relatedHref,
  relatedTitle,
  aboutLabel,
  authorName,
  authorRole,
  authorBio,
}: {
  tryNextLabel: string
  endingProject: { href: string; label: string }
  endingSecondary: { href: string; label: string }
  relatedLabel: string
  relatedHref: string
  relatedTitle: string
  aboutLabel: string
  authorName: string
  authorRole: string
  authorBio: string
}) {
  const { t } = useLanguage()

  return (
    <div className="mt-12 space-y-8 border-t border-border pt-8 text-base">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{tryNextLabel}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href={endingProject.href}
            className="rounded-xl border border-avanza-green bg-avanza-green/8 px-5 py-4 text-sm font-bold break-words text-avanza-green-dark transition-colors hover:bg-avanza-green/15"
          >
            {endingProject.label}
          </Link>
          <Link
            href={endingSecondary.href}
            className="rounded-xl border border-border px-5 py-4 text-sm font-bold break-words text-foreground transition-colors hover:bg-secondary"
          >
            {endingSecondary.label}
          </Link>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{relatedLabel}</p>
        <Link
          href={relatedHref}
          className="break-words font-semibold text-avanza-teal-dark underline underline-offset-4"
        >
          {relatedTitle}
        </Link>
      </div>

      <div className="rounded-xl border border-border px-5 py-4">
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">{aboutLabel}</p>
        <p className="break-words font-bold text-foreground">{authorName}</p>
        <p className="text-sm text-muted-foreground">{authorRole}</p>
        <p className="mt-2 text-sm leading-7 break-words text-foreground/80">{authorBio}</p>
      </div>

      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {t.blogPage.backToBlog}
      </Link>
    </div>
  )
}
