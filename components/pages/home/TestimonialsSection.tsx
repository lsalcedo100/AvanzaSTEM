"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"

function TestimonialCard({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <div className="relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-8 shadow-sm">
      <span aria-hidden="true" className="pointer-events-none absolute left-6 top-4 text-6xl font-black leading-none text-avanza-green/20">
        &ldquo;
      </span>
      <p className="text-base leading-relaxed text-muted-foreground">{quote}</p>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-avanza-green/15 text-sm font-bold text-avanza-green">
          {name[0]}
        </div>
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const { t } = useLanguage()
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="text-center">
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
            {t.home.testimonialsTitle}
          </h2>
        </FadeIn>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            { quote: t.home.testimonial1Quote, name: t.home.testimonial1Name, role: t.home.testimonial1Role },
            { quote: t.home.testimonial2Quote, name: t.home.testimonial2Name, role: t.home.testimonial2Role },
            { quote: t.home.testimonial3Quote, name: t.home.testimonial3Name, role: t.home.testimonial3Role },
          ].map((testimonial, i) => (
            <FadeIn key={testimonial.name} delay={i * 100}>
              <TestimonialCard {...testimonial} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
