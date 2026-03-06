"use client"

import Image from "next/image"
import { Calendar, MapPin, Clock, Users, ArrowRight, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function WorkshopsPage() {
  const { t } = useLanguage()

  const upcomingWorkshops = [
    {
      title: t.workshopsPage.bridgeTitle,
      topic: t.projectsPage.engineering,
      description: t.workshopsPage.bridgeDesc,
      image: "/images/kids with truss bridge-EDIT.jpg",
      date: "March 15, 2026",
      time: "10:00 AM - 1:00 PM",
      location: "Community Center, Main St.",
      ageRange: "Grades 2-5",
      spots: "20 " + t.workshopsPage.spotsAvailable,
      color: "bg-avanza-purple",
    },
    {
      title: t.workshopsPage.codingTitle,
      topic: t.projectsPage.coding,
      description: t.workshopsPage.codingDesc,
      image: "/images/coding day-EDIT.jpg",
      date: "March 22, 2026",
      time: "10:00 AM - 12:30 PM",
      location: "Public Library, Tech Lab",
      ageRange: "Grades 3-6",
      spots: "15 " + t.workshopsPage.spotsAvailable,
      color: "bg-avanza-green",
    },
    {
      title: t.workshopsPage.aiTitle,
      topic: "AI",
      description: t.workshopsPage.aiDesc,
      image: "/images/workshop-ai.jpg",
      date: "April 5, 2026",
      time: "10:00 AM - 1:00 PM",
      location: "Community Center, Main St.",
      ageRange: "Grades 5-8",
      spots: "15 " + t.workshopsPage.spotsAvailable,
      color: "bg-avanza-teal",
    },
    {
      title: t.workshopsPage.roboticsTitle,
      topic: t.projectsPage.robotics,
      description: t.workshopsPage.roboticsDesc,
      image: "/images/kids working on robotics.jpg",
      date: "April 19, 2026",
      time: "10:00 AM - 2:00 PM",
      location: "Community Center, Main St.",
      ageRange: "Grades 4-6",
      spots: "12 " + t.workshopsPage.spotsAvailable,
      color: "bg-avanza-orange",
    },
  ]

  const pastWorkshops = [
    {
      title: t.workshopsPage.pastScience,
      topic: t.projectsPage.science,
      date: "January 18, 2026",
      attendees: "25 students",
      image: "/images/experiment-science.jpg",
    },
    {
      title: t.workshopsPage.pastEngineering,
      topic: t.projectsPage.engineering,
      date: "December 7, 2025",
      attendees: "18 students",
      image: "/images/workshop-engineering.jpg",
    },
    {
      title: t.workshopsPage.pastCoding,
      topic: t.projectsPage.coding,
      date: "November 15, 2025",
      attendees: "20 students",
      image: "/images/curriculum-coding.jpg",
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-avanza-teal to-avanza-green py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">
            {t.workshopsPage.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/85">
            {t.workshopsPage.description}
          </p>
        </div>
      </section>

      {/* Upcoming Workshops */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-extrabold text-foreground">{t.workshopsPage.upcoming}</h2>
          <p className="mt-2 text-lg text-muted-foreground">
            {t.workshopsPage.upcomingDesc}
          </p>

          <div className="mt-10 space-y-8">
            {upcomingWorkshops.map((workshop) => (
              <WorkshopCard key={workshop.title} {...workshop} registerNow={t.workshopsPage.registerNow} />
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-extrabold text-foreground md:text-4xl">
            {t.workshopsPage.whatToExpect}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
            {t.workshopsPage.whatToExpectDesc}
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <ExpectCard title={t.workshopsPage.freeForAll} description={t.workshopsPage.freeForAllDesc} />
            <ExpectCard title={t.workshopsPage.smallGroups} description={t.workshopsPage.smallGroupsDesc} />
            <ExpectCard title={t.workshopsPage.handsOnLearning} description={t.workshopsPage.handsOnLearningDesc} />
            <ExpectCard title={t.workshopsPage.takeItHome} description={t.workshopsPage.takeItHomeDesc} />
          </div>
        </div>
      </section>

      {/* Past Workshops */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-extrabold text-foreground">{t.workshopsPage.pastWorkshops}</h2>
          <p className="mt-2 text-lg text-muted-foreground">
            {t.workshopsPage.pastWorkshopsDesc}
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {pastWorkshops.map((workshop) => (
              <div
                key={workshop.title}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={workshop.image}
                    alt={workshop.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-avanza-dark/40" />
                  <div className="absolute bottom-4 left-4 text-primary-foreground">
                    <p className="text-xs font-bold text-avanza-green">{workshop.topic}</p>
                    <h3 className="text-lg font-bold">{workshop.title}</h3>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <span className="text-sm text-muted-foreground">{workshop.date}</span>
                  <span className="text-sm font-semibold text-avanza-green">{workshop.attendees}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-avanza-purple to-avanza-teal py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground md:text-4xl">
            {t.workshopsPage.wantToHost}
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/85">
            {t.workshopsPage.wantToHostDesc}
          </p>
          <a
            href="mailto:hello@avanzastem.org"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-8 py-4 text-lg font-bold text-avanza-purple transition-transform hover:scale-105"
          >
            {t.workshopsPage.contactUs} <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </>
  )
}

function WorkshopCard({
  title,
  topic,
  description,
  image,
  date,
  time,
  location,
  ageRange,
  spots,
  color,
  registerNow,
}: {
  title: string
  topic: string
  description: string
  image: string
  date: string
  time: string
  location: string
  ageRange: string
  spots: string
  color: string
  registerNow: string
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-lg md:flex">
      <div className="relative min-h-[250px] md:w-2/5">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className={`absolute left-4 top-4 rounded-full ${color} px-3 py-1 text-xs font-bold text-primary-foreground`}>
          {topic}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-center p-8">
        <h3 className="text-2xl font-bold text-card-foreground">{title}</h3>
        <p className="mt-2 leading-relaxed text-muted-foreground">{description}</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-avanza-green" /> {date}
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-avanza-green" /> {time}
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-avanza-green" /> {location}
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 text-avanza-green" /> {ageRange}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button className={`inline-flex items-center gap-2 rounded-full ${color} px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-105`}>
            {registerNow} <ArrowRight className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold text-avanza-green">{spots}</span>
        </div>
      </div>
    </div>
  )
}

function ExpectCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
      <CheckCircle2 className="h-10 w-10 text-avanza-green" />
      <h3 className="mt-4 text-lg font-bold text-card-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}
