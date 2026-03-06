"use client"

import Image from "next/image"
import { Calendar, User, ArrowRight, Clock } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function BlogPage() {
  const { t } = useLanguage()

  const featuredPost = {
    title: t.blogPage.featuredTitle,
    excerpt: t.blogPage.featuredExcerpt,
    image: "/images/coding.jpg",
    author: "Liam Salcedo",
    date: "February 20, 2026",
    readTime: "5 min",
    category: "Coding",
  }

  const blogPosts = [
    {
      title: t.blogPage.post1Title,
      excerpt: t.blogPage.post1Excerpt,
      image: "/images/eggy in water.jpg",
      author: "Liam Salcedo",
      date: "February 15, 2026",
      readTime: "4 min",
      category: "Science",
      color: "bg-avanza-orange",
    },
    {
      title: t.blogPage.post2Title,
      excerpt: t.blogPage.post2Excerpt,
      image: "/images/kids with bridge-EDIT.jpg",
      author: "Liam Salcedo",
      date: "February 10, 2026",
      readTime: "6 min",
      category: "Engineering",
      color: "bg-avanza-purple",
    },
    {
      title: t.blogPage.post3Title,
      excerpt: t.blogPage.post3Excerpt,
      image: "/images/lego robotics.jpeg",
      author: "Liam Salcedo",
      date: "February 5, 2026",
      readTime: "5 min",
      category: "Robotics",
      color: "bg-avanza-green",
    },
    {
      title: t.blogPage.post4Title,
      excerpt: t.blogPage.post4Excerpt,
      image: "/images/workshop-ai.jpg",
      author: "Liam Salcedo",
      date: "January 28, 2026",
      readTime: "4 min",
      category: "AI",
      color: "bg-avanza-teal",
    },
    {
      title: t.blogPage.post5Title,
      excerpt: t.blogPage.post5Excerpt,
      image: "/images/abacus.jpg",
      author: "Liam Salcedo",
      date: "January 20, 2026",
      readTime: "3 min",
      category: "Math",
      color: "bg-avanza-orange",
    },
    {
      title: t.blogPage.post6Title,
      excerpt: t.blogPage.post6Excerpt,
      image: "/images/people from workshop-EDIT.jpg",
      author: "Liam Salcedo",
      date: "January 12, 2026",
      readTime: "7 min",
      category: "Community",
      color: "bg-avanza-purple",
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-avanza-orange to-[#e74c8b] py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">
            {t.blogPage.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/85">
            {t.blogPage.description}
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-all hover:shadow-xl md:flex">
            <div className="relative min-h-[300px] md:w-1/2">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-avanza-green px-3 py-1 text-xs font-bold text-primary-foreground">
                {t.blogPage.featured}
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 md:w-1/2">
              <span className="inline-block w-fit rounded-full bg-avanza-green/10 px-3 py-1 text-xs font-bold text-avanza-green">
                {featuredPost.category}
              </span>
              <h2 className="mt-4 text-2xl font-extrabold text-card-foreground md:text-3xl">
                {featuredPost.title}
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {featuredPost.excerpt}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <User className="h-4 w-4" /> {featuredPost.author}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> {featuredPost.date}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {featuredPost.readTime}
                </span>
              </div>
              <button className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-avanza-green px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-105">
                {t.blogPage.readArticle} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-extrabold text-foreground">{t.blogPage.latestPosts}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.title} {...post} readMore={t.blogPage.readMore} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-br from-avanza-teal to-avanza-green py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground">
            {t.blogPage.stayUpdated}
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/85">
            {t.blogPage.stayUpdatedDesc}
          </p>
          <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder={t.blogPage.enterEmail}
              className="flex-1 rounded-full border-2 border-primary-foreground/20 bg-primary-foreground/10 px-6 py-3 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground/40 focus:outline-none"
            />
            <button className="rounded-full bg-primary-foreground px-8 py-3 font-bold text-avanza-green transition-transform hover:scale-105">
              {t.blogPage.subscribe}
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

function BlogCard({
  title,
  excerpt,
  image,
  author,
  date,
  readTime,
  category,
  color,
  readMore,
}: {
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  readTime: string
  category: string
  color: string
  readMore: string
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className={`absolute left-4 top-4 rounded-full ${color} px-3 py-1 text-xs font-bold text-primary-foreground`}>
          {category}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold leading-snug text-card-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{excerpt}</p>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <User className="h-3 w-3" /> {author}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {date}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {readTime}
          </span>
        </div>

        <button className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-avanza-green transition-colors hover:text-avanza-teal">
          {readMore} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  )
}
