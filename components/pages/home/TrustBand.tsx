"use client"

import Link from "next/link"
import type { ComponentType } from "react"
import { HelpCircle, Mail, MapPin, School, ShieldCheck, Users } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

function TrustItem({
  icon: Icon,
  label,
  text,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  text: string
}) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-avanza-green/12 text-avanza-green ring-1 ring-avanza-green/25">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-extrabold uppercase tracking-wider text-avanza-dark/55">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-semibold leading-snug text-avanza-dark">
          {text}
        </p>
      </div>
    </div>
  )
}

export function TrustBand() {
  const { t } = useLanguage()

  return (
    <section className="border-y border-avanza-dark/10 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-7">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.15fr]">
          <TrustItem icon={Users} label={t.home.trustAgeLabel} text={t.home.trustAgeText} />
          <TrustItem icon={School} label={t.home.trustCostLabel} text={t.home.trustCostText} />
          <TrustItem icon={MapPin} label={t.home.trustLocationLabel} text={t.home.trustLocationText} />
          <TrustItem icon={ShieldCheck} label={t.home.trustSafetyLabel} text={t.home.trustSafetyText} />
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-avanza-dark/10 pt-5 md:flex-row md:items-center md:justify-between">
          <div className="grid gap-4 sm:grid-cols-2 md:flex md:items-start md:gap-6">
            <TrustItem icon={School} label={t.home.trustHostLabel} text={t.home.trustHostText} />
            <TrustItem icon={Mail} label={t.home.trustContactLabel} text={t.home.trustContactText} />
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Link
              href="/host"
              className="inline-flex items-center gap-2 rounded-full bg-avanza-dark px-4 py-2 text-sm font-bold text-primary-foreground transition-all duration-200 hover:scale-[1.03] hover:shadow-md"
            >
              <School className="h-4 w-4" />
              {t.home.trustHostCta}
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 rounded-full border border-avanza-dark/15 bg-avanza-green/8 px-4 py-2 text-sm font-bold text-avanza-dark transition-colors hover:border-avanza-dark/30 hover:bg-avanza-green/15"
            >
              <HelpCircle className="h-4 w-4" />
              {t.home.trustFaqCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
