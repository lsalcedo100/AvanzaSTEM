"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { LightboxImage } from "@/components/ui/lightbox-image"
import { FadeIn } from "@/components/ui/animate"
import { preExpansionGalleryImages } from "@/components/ui/gallery"

function ProgramCard({
  image,
  alt,
  title,
  description,
}: {
  image: string
  alt: string
  title: string
  description: string
}) {
  return (
    <Link
      href="/workshops"
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
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="text-xl font-extrabold leading-snug text-card-foreground">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </Link>
  )
}

function ProjectCard({
  image,
  alt,
  title,
  description,
  href,
  cta,
}: {
  image: string
  alt?: string
  title: string
  description: string
  href: string
  cta: string
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <LightboxImage
          src={image}
          alt={alt ?? title}
          fill
          buttonClassName="z-20"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="pointer-events-none relative z-20 flex flex-1 flex-col p-5">
        <h3 className="text-lg font-extrabold leading-snug text-card-foreground">
          {title}
        </h3>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-avanza-green transition-all duration-200 group-hover:gap-2.5">
          {cta} <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

export function WhatStudentsDoSection() {
  const { t } = useLanguage()

  const programs = [
    {
      image: preExpansionGalleryImages[0].full,
      title: t.home.realWorkshopBuilding,
      description: t.home.realWorkshopBuildingShort,
    },
    {
      image: "/images/workshops/Coding Workshop Description.png",
      title: t.home.realWorkshopCoding,
      description: t.home.realWorkshopCodingShort,
    },
    {
      image: "/images/workshops/AI Workshop Description.JPG",
      title: t.home.realWorkshopAi,
      description: t.home.realWorkshopAiShort,
    },
  ]

  const projects = [
    {
      image: "/images/home/featured-bridge.jpg",
      title: t.home.featuredBridge,
      description: t.home.featuredBridgeDesc,
      href: "/projects/popsicle-stick-bridge",
    },
    {
      image: "/images/home/featured-python.jpg",
      title: t.home.featuredCoding,
      description: t.home.featuredCodingDesc,
      href: "/projects/my-first-python-program",
    },
    {
      image: "/images/home/coke-mentos-science-experiment-kids.jpg",
      alt: t.home.mentosImageAlt,
      title: t.home.featuredMentos,
      description: t.home.featuredMentosDesc,
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

        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {programs.map((program, i) => (
            <FadeIn key={program.title} delay={i * 90} className="h-full">
              <ProgramCard
                image={program.image}
                alt={`${t.home.realWorkshopBannerAlt} – ${program.title}`}
                title={program.title}
                description={program.description}
              />
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10 flex justify-center">
          <Link
            href="/workshops"
            className="inline-flex items-center gap-2 rounded-full border-2 border-avanza-dark/15 bg-background px-6 py-3 text-sm font-bold text-avanza-dark transition-all duration-200 hover:border-avanza-dark/35 hover:bg-avanza-dark/5"
          >
            {t.home.studentsDoWorkshopsCta}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </FadeIn>

        <div className="mt-20 border-t border-border pt-14">
          <FadeIn>
            <p className="text-center text-sm font-bold uppercase tracking-wider text-avanza-green">
              {t.home.studentsDoTryAtHome}
            </p>
          </FadeIn>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {projects.map((project, i) => (
              <FadeIn key={project.title} delay={i * 90} className="h-full">
                <ProjectCard {...project} cta={t.home.learnMore} />
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-8 flex justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-bold text-avanza-green transition-colors duration-200 hover:text-avanza-teal"
            >
              {t.home.viewProjects}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
