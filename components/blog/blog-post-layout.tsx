"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

type BlogPostLayoutProps = {
  title: string
  category: string
  categoryColor: string
  date: string
  readTime: string
  author: string
  image?: string
  imageAlt?: string
  children: React.ReactNode
}

export function BlogPostLayout({
  title,
  category,
  categoryColor,
  date,
  readTime,
  author,
  image,
  imageAlt,
  children,
}: BlogPostLayoutProps) {
  const { t } = useLanguage()

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
          <span
            className={`inline-block rounded-full ${categoryColor} px-3 py-1 text-xs font-bold text-white`}
          >
            {category}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
            {title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" /> {author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {readTime} {t.blogPage.readSuffix}
            </span>
          </div>
        </header>

        {image && (
          <div className="relative mt-8 h-72 overflow-hidden rounded-2xl md:h-96">
            <Image src={image} alt={imageAlt ?? title} fill className="object-cover" />
          </div>
        )}

        <article className="mt-10 space-y-6 text-[15px] leading-8 text-foreground">
          {children}
        </article>
      </div>
    </div>
  )
}

export function PostSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-extrabold text-foreground">{title}</h2>
      {children}
    </section>
  )
}

export function PostParagraph({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground">{children}</p>
}

export function PostList({ items }: { items: string[] }) {
  return (
    <ul className="ml-5 list-disc space-y-1.5 text-muted-foreground">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function PostCallout({
  title,
  children,
  accent = "green",
}: {
  title?: string
  children: React.ReactNode
  accent?: "green" | "orange" | "purple" | "teal"
}) {
  const colors = {
    green: "border-avanza-green bg-avanza-green/8 text-avanza-green",
    orange: "border-avanza-orange bg-avanza-orange/8 text-avanza-orange",
    purple: "border-avanza-purple bg-avanza-purple/8 text-avanza-purple",
    teal: "border-avanza-teal bg-avanza-teal/8 text-avanza-teal",
  }
  return (
    <div className={`rounded-xl border-l-4 px-5 py-4 ${colors[accent]}`}>
      {title && <p className="mb-1 text-xs font-bold uppercase tracking-wider">{title}</p>}
      <div className="text-sm leading-7 text-foreground">{children}</div>
    </div>
  )
}

export function PostNumberedList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="space-y-4">
      {items.map((item, i) => (
        <li key={item.title} className="flex gap-4">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-avanza-green text-xs font-bold text-white">
            {i + 1}
          </span>
          <div>
            <p className="font-bold text-foreground">{item.title}</p>
            <p className="mt-1 text-sm leading-7 text-muted-foreground">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
