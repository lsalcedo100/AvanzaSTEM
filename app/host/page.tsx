import { Package, Users, Star } from "lucide-react"
import { FadeIn } from "@/components/ui/animate"

export const metadata = {
  title: "Host a Workshop | Avanza STEM",
  description: "Bring Avanza STEM to your school or library. Contact us to host a free STEM workshop for your community.",
}

export default function HostPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-avanza-teal to-avanza-green py-20">
        <FadeIn className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary-foreground/70">
            Partner With Us
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-primary-foreground md:text-5xl">
            Bring Avanza STEM to Your Community
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/90">
            We partner with libraries, schools, and community centers to deliver free hands-on STEM workshops wherever kids are.
          </p>
        </FadeIn>
      </section>

      {/* What We Bring */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              What You Get
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Package,
                title: "All Materials Included",
                body: "We bring everything — from popsicle sticks to laptops. You provide the space; we handle the rest.",
              },
              {
                icon: Users,
                title: "Bilingual Instruction",
                body: "Our workshops are conducted in English and Spanish, making them accessible to more students and families.",
              },
              {
                icon: Star,
                title: "No Cost to You",
                body: "Our workshops are always free for hosting organizations and attendees. We believe budget should never limit access.",
              },
            ].map((card, i) => (
              <FadeIn key={card.title} delay={i * 100}>
                <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-avanza-green/10">
                    <card.icon className="h-6 w-6 text-avanza-green" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-card-foreground">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              How to Host a Workshop
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-8 grid-cols-1 md:grid-cols-4">
            {[
              {
                step: "1",
                title: "Reach Out",
                body: "Send us an email with your venue, available dates, and expected number of students.",
              },
              {
                step: "2",
                title: "We Plan Together",
                body: "We'll coordinate on the workshop topic, format, age range, and materials needed.",
              },
              {
                step: "3",
                title: "We Show Up",
                body: "Our team arrives early to set up. We run the entire session — you just enjoy it with your students.",
              },
              {
                step: "4",
                title: "Stay Connected",
                body: "We love building ongoing relationships with partner venues. Many of our host libraries have had us back multiple times.",
              },
            ].map((s, i) => (
              <FadeIn key={s.step} delay={i * 80}>
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-avanza-teal text-xl font-extrabold text-primary-foreground shadow-md">
                    {s.step}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Past Partner Venues */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              Trusted By
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {[
              {
                name: "Clifton Public Library",
                description: "This program was hosted at the Clifton Public Library in Clifton, New Jersey, where we taught a group of 3rd–5th grade students through interactive STEM activities.",
              },
              {
                name: "Allwood Branch Library",
                description: "This program was held at the Allwood Branch Library, where we taught a group of grade school students through several fun, hands-on STEM activities.",
              },
            ].map((venue, i) => (
              <FadeIn key={venue.name} delay={i * 100}>
                <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-bold text-card-foreground">{venue.name}</h3>
                    <span className="shrink-0 rounded-full bg-avanza-green/10 px-3 py-1 text-xs font-bold text-avanza-green">
                      Completed
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{venue.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-avanza-dark py-20">
        <div className="mx-auto max-w-2xl px-6">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-extrabold text-primary-foreground md:text-4xl">
              Ready to Partner?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/70">
              Fill out the quick form below or email us directly at{" "}
              <a href="mailto:liam@avanzastem.org" className="text-avanza-green hover:text-avanza-teal transition-colors">
                liam@avanzastem.org
              </a>
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <form
              action="mailto:liam@avanzastem.org"
              method="POST"
              encType="text/plain"
              className="mt-10 flex flex-col gap-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Your name or organization"
                required
                className="w-full rounded-xl border border-primary-foreground/20 bg-primary-foreground/8 px-5 py-3.5 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-avanza-green focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                required
                className="w-full rounded-xl border border-primary-foreground/20 bg-primary-foreground/8 px-5 py-3.5 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-avanza-green focus:outline-none"
              />
              <input
                type="text"
                name="venue"
                placeholder="Venue or organization name"
                className="w-full rounded-xl border border-primary-foreground/20 bg-primary-foreground/8 px-5 py-3.5 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-avanza-green focus:outline-none"
              />
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us about your space and students"
                className="w-full rounded-xl border border-primary-foreground/20 bg-primary-foreground/8 px-5 py-3.5 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-avanza-green focus:outline-none resize-none"
              />
              <button
                type="submit"
                className="mt-2 rounded-full bg-avanza-green px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-primary-foreground/50">
              Prefer email? Reach us directly at{" "}
              <a href="mailto:liam@avanzastem.org" className="text-avanza-green hover:text-avanza-teal transition-colors">
                liam@avanzastem.org
              </a>
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
