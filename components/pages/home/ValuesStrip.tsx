"use client"

import type { ComponentType } from "react"
import { Globe2, HandHeart, Hammer, MapPin } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

function ValueChip({
  icon: Icon,
  title,
  note,
  hoverAnim = "thump",
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  note: string
  hoverAnim?: "thump" | "spin" | "tap" | "bounce"
}) {
  const iconAnimClass =
    hoverAnim === "spin"
      ? "transition-transform duration-700 ease-out group-hover:rotate-[360deg]"
      : hoverAnim === "tap"
        ? "transition-transform duration-200 group-hover:[animation:value-tap_0.6s_ease-in-out]"
        : hoverAnim === "bounce"
          ? "transition-transform duration-200 group-hover:[animation:value-bounce_0.7s_cubic-bezier(0.34,1.56,0.64,1)]"
          : "transition-transform duration-200 group-hover:[animation:value-thump_0.7s_ease-in-out]"
  return (
    <div className="group flex cursor-default items-start gap-4">
      <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-avanza-green/15 text-avanza-green ring-1 ring-avanza-green/30 transition-all duration-200 group-hover:scale-105 group-hover:bg-avanza-green/25 group-hover:ring-avanza-green/50">
        <Icon className={`h-5 w-5 ${iconAnimClass}`} />
      </div>
      <div>
        <p className="text-sm font-extrabold uppercase tracking-wider text-primary-foreground transition-colors group-hover:text-avanza-green">
          {title}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-primary-foreground/65">
          {note}
        </p>
      </div>
      <style>{`
        @keyframes value-thump {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.18); }
          45% { transform: scale(0.92); }
          70% { transform: scale(1.08); }
        }
        @keyframes value-tap {
          0%, 100% { transform: rotate(0deg); }
          30% { transform: rotate(-22deg); }
          55% { transform: rotate(8deg); }
          80% { transform: rotate(-4deg); }
        }
        @keyframes value-bounce {
          0%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
          70% { transform: translateY(-2px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .group:hover [class*="value-"],
          .group:hover [class*="rotate-\\[360deg\\]"] {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export function ValuesStrip() {
  const { t } = useLanguage()
  return (
    <section className="bg-avanza-dark py-12">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 md:grid-cols-4">
        <ValueChip icon={HandHeart} title={t.home.valueFree} note={t.home.valueFreeNote} hoverAnim="thump" />
        <ValueChip icon={Globe2} title={t.home.valueBilingual} note={t.home.valueBilingualNote} hoverAnim="spin" />
        <ValueChip icon={Hammer} title={t.home.valueHandsOn} note={t.home.valueHandsOnNote} hoverAnim="tap" />
        <ValueChip icon={MapPin} title={t.home.valueCommunity} note={t.home.valueCommunityNote} hoverAnim="bounce" />
      </div>
    </section>
  )
}
