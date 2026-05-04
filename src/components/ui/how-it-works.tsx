"use client";

import { cn } from "@/lib/utils";
import { Layers, Search, Zap } from "lucide-react";
import type React from "react";

interface HowItWorksProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional: eigene Schritte (z. B. für Tests); Standard = EvGlab-Ablauf */
  steps?: StepData[];
}

interface StepData {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

/** Gleiches Liquid-/Glass-Pattern wie „Zwei Wege mit EvGlab“ in `PricingBoxes` (`sharedGlassInfoBoxClass`). */
const glassStepCardClass =
  "evg-clean-hover relative rounded-2xl border border-black/12 bg-gradient-to-br from-black/5 to-black/0 p-6 text-left text-zinc-900 shadow-[0_10px_22px_-18px_rgba(24,24,27,0.28)] backdrop-blur-[14px] ring-1 ring-black/[0.04] transition-[border-color,box-shadow,ring-color] duration-200 hover:border-[#c65a20]/55 hover:ring-[#c65a20]/25 hover:shadow-[0_16px_34px_-20px_rgba(198,90,32,0.24)]";

const StepCard: React.FC<StepCardProps> = ({ icon, title, description, benefits }) => (
  <div className={glassStepCardClass}>
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 bg-gradient-to-br from-white/55 to-white/20 text-zinc-800 shadow-[0_6px_14px_-12px_rgba(24,24,27,0.35)] backdrop-blur-sm ring-1 ring-white/40 [&_svg]:stroke-[1.75]">
      {icon}
    </div>
    <h3 className="mb-2 text-xl font-semibold tracking-tight text-zinc-900">{title}</h3>
    <p className="mb-6 text-sm leading-relaxed text-zinc-600">{description}</p>
    <ul className="space-y-3">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-start gap-3 text-sm">
          <div className="mt-1.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#c65a20]/15 ring-1 ring-[#c65a20]/20">
            <div className="h-2 w-2 rounded-full bg-[#c65a20]" />
          </div>
          <span className="leading-relaxed text-zinc-600">{benefit}</span>
        </li>
      ))}
    </ul>
  </div>
);

const DEFAULT_STEPS_DE: StepData[] = [
  {
    icon: <Search className="h-6 w-6" aria-hidden />,
    title: "Briefing & Markenprofil",
    description:
      "Du legst Logo, Tonalität und No-Gos fest — kurz und praxisnah. So bleiben KI-Bilder und Texte in deinem Markenlook.",
    benefits: [
      "Klares Briefing statt endloser Runden",
      "DACH-Fokus und typische Brauerei-Szenen",
      "Wiedererkennung über alle Kanäle",
    ],
  },
  {
    icon: <Layers className="h-6 w-6" aria-hidden />,
    title: "KI erzeugt Motive & Texte",
    description:
      "Im Dashboard mit Tokens generierst du Varianten — oder du nutzt Premium-Pakete mit definierter Lieferung.",
    benefits: [
      "Werbebilder und Social-Posts aus einem Guss",
      "Varianten testen, beste behalten",
      "Planbar mit Abo oder Einmallieferung",
    ],
  },
  {
    icon: <Zap className="h-6 w-6" aria-hidden />,
    title: "Freigabe & Veröffentlichung",
    description:
      "Du gibst frei — dann gehen Motive in Feed, Ads oder auf die Website. Optional: Unterstützung bei Google-Bewertungen.",
    benefits: [
      "Schnelle Iteration bis zur Freigabe",
      "Klare Dateiformate für Meta & Co.",
      "Weniger Koordinationsaufwand im Team",
    ],
  },
];

/**
 * Drei-Schritte-Karten — ohne eigene Sektionsüberschrift; gedacht unter „Warum EvGlab“.
 */
export function HowItWorks({ className, steps = DEFAULT_STEPS_DE, ...props }: HowItWorksProps) {
  const stepsData = steps;

  return (
    <div
      role="region"
      aria-label="Ablauf in drei Schritten"
      className={cn("w-full bg-transparent", className)}
      {...props}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative mx-auto mb-6 hidden w-full max-w-4xl md:block">
          <div
            aria-hidden
            className="absolute left-[16.6667%] top-1/2 h-px w-[66.6667%] -translate-y-1/2 bg-gradient-to-r from-black/0 via-black/12 to-black/0"
          />
          <div className="relative grid grid-cols-3">
            {stepsData.map((_, index) => (
              <div
                key={index}
                className="flex h-9 w-9 items-center justify-center justify-self-center rounded-full border border-black/10 bg-gradient-to-br from-white/90 to-white/45 text-sm font-semibold text-zinc-800 shadow-[0_8px_20px_-14px_rgba(24,24,27,0.35)] backdrop-blur-[10px] ring-2 ring-white/70"
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {stepsData.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              benefits={step.benefits}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
