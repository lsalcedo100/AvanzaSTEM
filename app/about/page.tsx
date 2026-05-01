import Link from "next/link"
import { Heart, Lightbulb, Users, ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/ui/animate"
import { LightboxImage } from "@/components/ui/lightbox-image"
import { CountUp } from "@/components/ui/count-up"

export const metadata = {
  title: "About | Avanza STEM",
  description: "Learn about Avanza STEM — a free STEM education initiative for young Hispanic students, founded in New Jersey.",
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-avanza-green to-avanza-teal py-20">
        <FadeIn className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary-foreground/70">
            Our Story
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-primary-foreground md:text-5xl">
            About Avanza STEM
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/90">
            We're a community-driven initiative bringing free, high-quality STEM education to Hispanic youth — one workshop, one project, and one curious student at a time.
          </p>
        </FadeIn>
      </section>

      {/* Mission & Origin Story */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <FadeIn>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
                Why We Started
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Avanza STEM was founded with a simple belief: every child, regardless of their zip code or background, deserves the chance to discover the joy of science and technology. We saw firsthand how few STEM resources were designed with Hispanic families in mind — materials in their language, programs in their neighborhood, faces that looked like theirs.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                So we started small. A folding table at a local library, some popsicle sticks, and a group of kids who had never built anything before. Three hours later, they had built bridges strong enough to hold textbooks, and more importantly, they believed they could do more.
              </p>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="relative h-80 overflow-hidden rounded-2xl shadow-2xl lg:h-96">
                <LightboxImage
                  src="/images/workshops/past-science.jpg"
                  alt="Students building at the Clifton Library workshop"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              What We Believe
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Heart,
                title: "Access for All",
                description: "Every child deserves access to quality STEM education, regardless of their zip code, background, or income. We remove every barrier we can — cost, language, location.",
                accent: "bg-avanza-green",
              },
              {
                icon: Lightbulb,
                title: "Curiosity First",
                description: "We don't lecture kids about STEM. We hand them popsicle sticks and see what happens. Curiosity is the engine — our job is to give it fuel.",
                accent: "bg-avanza-purple",
              },
              {
                icon: Users,
                title: "Community Rooted",
                description: "We show up where families already are — local libraries, community centers, schools. STEM education belongs in the community, not just elite institutions.",
                accent: "bg-avanza-teal",
              },
            ].map((card, i) => (
              <FadeIn key={card.title} delay={i * 100}>
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                  <div className={`h-1.5 w-full ${card.accent}`} />
                  <div className="p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                      <card.icon className="h-6 w-6 text-foreground" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-card-foreground">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* The Team */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              Who We Are
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              A small, passionate team committed to making STEM education a reality for every student.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="mx-auto mt-14 max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-avanza-green/20">
                <span className="text-3xl font-extrabold text-avanza-green">L</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-card-foreground">Liam Salcedo</h3>
              <p className="text-sm font-semibold text-avanza-green">Founder &amp; Lead Educator</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Liam started Avanza STEM after seeing the gap in STEM resources for Hispanic students in his community. He designs the curriculum, runs the workshops, and is always working on what's next.
              </p>
            </div>
            <p className="mt-10 text-center text-base text-muted-foreground">
              Want to help? We're always looking for volunteers and partners.{" "}
              <a
                href="mailto:liam@avanzastem.org"
                className="font-semibold text-avanza-green hover:text-avanza-teal transition-colors"
              >
                liam@avanzastem.org
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="bg-avanza-dark py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 text-center md:grid-cols-4">
            {[
              { to: 70, suffix: "+", label: "Students Reached" },
              { to: 6, suffix: "", label: "Curriculum Topics" },
              { to: 6, suffix: "", label: "DIY Projects" },
              { to: 4, suffix: "", label: "Workshops Hosted" },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 80}>
                <div className="rounded-2xl border border-primary-foreground/10 p-8">
                  <p className="text-4xl font-extrabold text-avanza-green">
                    <CountUp to={stat.to} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-sm font-semibold text-primary-foreground/70">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-avanza-purple to-avanza-teal py-16">
        <FadeIn className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground">
            Ready to get involved?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/85">
            Attend a workshop, share our resources, or reach out to bring Avanza STEM to your school or library.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/workshops"
              className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-8 py-4 text-lg font-bold text-avanza-purple shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Find a Workshop <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="mailto:liam@avanzastem.org"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/30 px-8 py-4 text-lg font-bold text-primary-foreground transition-all duration-300 hover:border-primary-foreground/60 hover:bg-primary-foreground/8"
            >
              Contact Us
            </a>
          </div>
        </FadeIn>
      </section>
    </>
  )
}
