"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { codingFeatureImage, galleryPhoto } from "@/components/ui/gallery"

const codingThumbnailImage = codingFeatureImage.full

function ProgramCard({
  image,
  alt,
  title,
  href,
  cta,
}: {
  image: string
  alt: string
  title: string
  href: string
  cta: string
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col px-6 py-5">
        <h3 className="text-xl font-extrabold leading-snug text-card-foreground">
          {title}
        </h3>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-avanza-green transition-all duration-200 group-hover:gap-2.5">
          {cta} <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

function ProjectCard({
  image,
  alt,
  title,
  href,
  cta,
}: {
  image: string
  alt?: string
  title: string
  href: string
  cta: string
}) {
  return (
    <Link
      href={href}
      className="group flex h-full min-h-24 overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative w-28 shrink-0 overflow-hidden bg-secondary">
        <Image
          src={image}
          alt={alt ?? title}
          fill
          sizes="112px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-1 px-4 py-3">
        <h3 className="font-extrabold leading-snug text-card-foreground">
          {title}
        </h3>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-avanza-green transition-all duration-200 group-hover:gap-2.5">
          {cta} <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

function GroupHeader({
  label,
  href,
  cta,
}: {
  label: string
  href: string
  cta: string
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-border pb-3">
      <p className="text-sm font-bold uppercase tracking-wider text-avanza-green">
        {label}
      </p>
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-sm font-bold text-avanza-dark transition-colors duration-200 hover:text-avanza-green"
      >
        {cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}

export function WhatStudentsDoSection() {
  const { t } = useLanguage()

  const programs = [
    {
      image: galleryPhoto(174).full,
      title: t.home.realWorkshopBuilding,
      href: "/workshops#building",
    },
    {
      image: codingThumbnailImage,
      title: t.home.realWorkshopCoding,
      href: "/workshops#coding",
    },
    {
      image: "/images/workshops/AI Workshop Description.JPG",
      title: t.home.realWorkshopAi,
      href: "/workshops#ai",
    },
  ]

  const projects = [
    {
      image: "/images/home/featured-bridge.jpg",
      title: t.home.featuredBridge,
      href: "/projects/popsicle-stick-bridge",
    },
    {
      image: "/images/home/featured-python.jpg",
      title: t.home.featuredCoding,
      href: "/projects/my-first-python-program",
    },
    {
      image: "/images/home/coke-mentos-science-experiment-kids.jpg",
      alt: t.home.mentosImageAlt,
      title: t.home.featuredMentos,
      href: "/projects/coke-mentos-experiment",
    },
  ]

  return (
    <section className="bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
            {t.home.studentsDoTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t.home.studentsDoSubhead}
          </p>
        </FadeIn>

        <FadeIn className="mt-12">
          <GroupHeader
            label={t.home.studentsDoInWorkshops}
            href="/workshops"
            cta={t.home.studentsDoWorkshopsCta}
          />
        </FadeIn>
        <div className="mt-6 grid gap-7 md:grid-cols-3">
          {programs.map((program, i) => (
            <FadeIn key={program.title} delay={i * 90} className="h-full">
              <ProgramCard
                image={program.image}
                alt={`${t.home.realWorkshopBannerAlt} – ${program.title}`}
                title={program.title}
                href={program.href}
                cta={t.home.learnMore}
              />
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-16">
          <GroupHeader
            label={t.home.studentsDoTryAtHome}
            href="/projects"
            cta={t.home.viewProjects}
          />
        </FadeIn>
        <div className="mt-6 grid gap-4 md:grid-cols-3 md:gap-7">
          {projects.map((project, i) => (
            <FadeIn key={project.title} delay={i * 90} className="h-full">
              <ProjectCard {...project} cta={t.home.learnMore} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
