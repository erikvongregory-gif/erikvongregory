"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { BlurText } from "@/components/ui/blur-text-animation";
import { cn } from "@/lib/utils";

/** Inhalt für die drei Säulen auf „Über uns“ (nummerierte Karten). */
export const UEBER_UNS_FEATURE_PILLARS = [
  {
    step: "01",
    title: "Wie wir denken",
    description:
      "KI spart Zeit — sie ersetzt aber kein Briefing. Wir arbeiten mit klaren Annahmen, eurem Markenlook und wiederholbaren Outputs, damit Qualität planbar bleibt.",
  },
  {
    step: "02",
    title: "Für wen wir bauen",
    description:
      "Brauereien und Getränkemarken in DACH — Teams, die wenig interne Design-Kapazität haben, aber professionelle Motive für Web, Social und Kampagnen brauchen.",
  },
  {
    step: "03",
    title: "Wohin es geht",
    description:
      "Mehr Anfragen und Wiedererkennung durch konsistente Bildsprache — ohne dass jedes Motiv ein Einzelprojekt wird. Dafür gibt es Premium-Pakete und das Token-Abo.",
  },
] as const;

export type FeaturePillarItem = (typeof UEBER_UNS_FEATURE_PILLARS)[number];

export type FeatureCardPillarProps = {
  variant: "pillar";
  step: string;
  title: string;
  description: string;
  className?: string;
};

export type FeatureCardIconProps = {
  variant?: "icon";
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
};

export type FeatureCardProps = FeatureCardPillarProps | FeatureCardIconProps;

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Liquid/Glass wie „Zwei Wege mit EvGlab“ / HowItWorks (`sharedGlassInfoBoxClass`). */
const glassPillarCardClass =
  "evg-clean-hover border border-black/12 bg-gradient-to-br from-black/5 to-black/0 shadow-[0_10px_22px_-18px_rgba(24,24,27,0.28)] backdrop-blur-[14px] ring-1 ring-black/[0.04] transition-[border-color,box-shadow,ring-color] duration-200 hover:border-[#c65a20]/55 hover:ring-[#c65a20]/25 hover:shadow-[0_16px_34px_-20px_rgba(198,90,32,0.24)]";

/**
 * Karten-Komponente: nummerierte Säule (Editorial + linker Akzent) oder Icon-Feature (zentriert).
 */
export function FeatureCard(props: FeatureCardProps) {
  if (props.variant === "pillar") {
    const { step, title, description, className } = props;
    return (
      <article
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-2xl pl-6 pr-7 pb-9 pt-8 text-left sm:pl-7 sm:pr-8 sm:pb-10 sm:pt-9",
          glassPillarCardClass,
          className,
        )}
      >
        {/* Linker Akzent — unterscheidet sich klar von der alten „nur weiße Kachel“-Optik */}
        <span
          className={cn(
            "pointer-events-none absolute bottom-8 left-0 top-8 w-[3px] rounded-full",
            "bg-gradient-to-b from-[#e07a40] via-[#c65a20] to-[#d97706]/70",
            "opacity-90 transition-opacity duration-500 group-hover:opacity-100",
          )}
          aria-hidden
        />
        <div className="relative pl-3 sm:pl-4">
          <span
            className={cn(
              "font-display block text-[clamp(2.85rem,5.2vw,3.6rem)] font-light tabular-nums leading-[0.95] tracking-tight",
              "text-[#c65a20]/22 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "group-hover:text-[#c65a20]/32 motion-reduce:transition-none",
            )}
            aria-hidden
          >
            {step}.
          </span>
          <h3 className="mt-5 font-display text-[1.0625rem] font-semibold leading-snug tracking-tight text-zinc-900 sm:text-lg">
            <BlurText text={title} tone="onLight" />
          </h3>
          <span
            className="mt-3 block h-px w-10 rounded-full bg-gradient-to-r from-[#c65a20]/50 to-transparent opacity-80 transition-all duration-500 group-hover:w-14 group-hover:opacity-100"
            aria-hidden
          />
          <p className="mt-4 text-pretty font-sans text-[0.8125rem] leading-relaxed text-zinc-600 sm:text-[0.9375rem] sm:leading-[1.65]">
            <BlurText text={description} tone="onLight" />
          </p>
        </div>
      </article>
    );
  }

  const { icon, title, description, className } = props;
  return (
    <div
      className={cn(
        "group flex flex-col items-center rounded-xl p-8 text-center text-zinc-900",
        glassPillarCardClass,
        className,
      )}
    >
      <div className="mb-6 rounded-full border border-black/8 bg-gradient-to-br from-white/55 to-white/20 p-4 text-zinc-800 shadow-[0_6px_14px_-12px_rgba(24,24,27,0.35)] backdrop-blur-sm ring-1 ring-white/40 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">{description}</p>
    </div>
  );
}

const pillarContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

/** Nur Opacity — kein vertikales Verschieben, damit Hover nicht „doppelt“ wirkt */
const pillarItem = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.42, ease: easeOut },
  },
};

export function FeaturePillars({
  items = UEBER_UNS_FEATURE_PILLARS,
  className,
}: {
  items?: readonly FeaturePillarItem[];
  className?: string;
}) {
  return (
    <motion.div
      className={cn("grid gap-6 sm:gap-7 md:grid-cols-3 md:gap-6", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={pillarContainer}
    >
      {items.map((item) => (
        <motion.div key={item.step} variants={pillarItem} className="h-full">
          <FeatureCard variant="pillar" step={item.step} title={item.title} description={item.description} />
        </motion.div>
      ))}
    </motion.div>
  );
}
