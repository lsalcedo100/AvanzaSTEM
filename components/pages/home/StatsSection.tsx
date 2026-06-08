"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { CountUp } from "@/components/ui/count-up"

function StatCard({ to, suffix, label, note }: { to: number; suffix: string; label: string; note: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <p className="text-4xl font-extrabold text-avanza-green">
        <CountUp to={to} suffix={suffix} />
      </p>
      <p className="mt-2 text-sm font-semibold text-muted-foreground">{label}</p>
      <p className="mt-3 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">{note}</p>
    </div>
  )
}

export function StatsSection() {
  const { t } = useLanguage()
  return (
    <section className="bg-background pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 text-center md:grid-cols-4">
          {[
            { to: 70, suffix: "+", label: t.home.studentsReached },
            { to: 6, suffix: "", label: t.home.curriculumTopics },
            { to: 3, suffix: "", label: t.home.languagesSupported },
            { to: 4, suffix: "", label: t.home.workshopsHosted },
          ].map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 80}>
              <StatCard to={stat.to} suffix={stat.suffix} label={stat.label} note={t.home.statsAsOf} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
