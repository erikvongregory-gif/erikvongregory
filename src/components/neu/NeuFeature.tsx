"use client";

import * as React from "react";
import Link from "next/link";
import { SITE } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import { NeuRevealText } from "@/components/neu/NeuRevealText";

const FEATURE_WEBM = "/neu/feature.webm";
const FEATURE_MP4 = "/neu/feature.mp4";
const FEATURE_POSTER = "/neu/feature-poster.jpg";

const FEATURE_TABS = [
  {
    id: "bilder",
    label: "KI-Bilder",
    heading: "Werbebilder in Minuten",
    description:
      "Produktfotos und Kampagnenmotive ohne Fotostudio — Marke, Bier und Stimmung, bereit für den Feed.",
    progress: 35,
  },
  {
    id: "posts",
    label: "Social Posts",
    heading: "Content, der postet",
    description:
      "Texte und Visuals für Instagram, Facebook und Co. — planbar, wiedererkennbar, brauereitauglich.",
    progress: 60,
  },
  {
    id: "reviews",
    label: "Bewertungen",
    heading: "Google unter Kontrolle",
    description:
      "Antworten auf Bewertungen, die zu deiner Marke passen — schneller, freundlicher, konsistenter.",
    progress: 78,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    heading: "Alles an einem Ort",
    description:
      "Medienbibliothek, Workflow und Tokens — vom Motiv bis zum fertigen Post ohne Tool-Chaos.",
    progress: 52,
  },
  {
    id: "kampagnen",
    label: "Kampagnen",
    heading: "Saison & Events",
    description:
      "Frühlingsbock, Biergarten-Opening, Händleraktion — Serien, die zusammengehören und wirken.",
    progress: 90,
  },
] as const;

export function NeuFeature() {
  const [activeId, setActiveId] = React.useState<(typeof FEATURE_TABS)[number]["id"]>(
    FEATURE_TABS[0].id,
  );
  const [videoFailed, setVideoFailed] = React.useState(false);

  const active = FEATURE_TABS.find((tab) => tab.id === activeId) ?? FEATURE_TABS[0];

  return (
    <section id="funktionen" className="neu-bg scroll-mt-24 px-6 pb-16 pt-4 md:px-12 md:pb-24">
      <div className="mx-auto grid min-h-[520px] max-w-7xl gap-4 overflow-hidden rounded-2xl md:grid-cols-2">
        <div className="neu-card flex flex-col justify-between rounded-2xl p-10 md:p-14">
          <div>
            <span
              className="neu-border-strong mb-8 inline-block h-8 w-8 rounded-full border"
              aria-hidden
            />
            <h2
              className="neu-fg mb-6 text-3xl tracking-[-1px] sm:text-5xl"
              style={{ fontFamily: "var(--font-velorah-serif), ui-serif, Georgia, serif" }}
            >
              <NeuRevealText key={active.id} text={active.heading} />
            </h2>
            <p className="neu-muted max-w-sm text-sm leading-relaxed sm:text-base">
              <NeuRevealText key={`${active.id}-desc`} text={active.description} wordOffset={4} />
            </p>
          </div>

          <div>
            <div className="mb-8 flex flex-wrap gap-2">
              {FEATURE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveId(tab.id)}
                  aria-pressed={tab.id === active.id}
                  className={cn(
                    "rounded-full border px-4 py-2 text-xs transition-colors",
                    tab.id === active.id
                      ? "border-transparent bg-[var(--neu-chip-active-bg)] text-[var(--neu-chip-active-fg)]"
                      : "neu-border-strong neu-muted border hover:text-[color:var(--neu-fg)]",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div
              className="mb-6 h-0.5 w-full rounded-full"
              style={{ backgroundColor: "var(--neu-progress-track)" }}
            >
              <div
                className="h-full rounded-full transition-[width] duration-500 ease-out"
                style={{
                  width: `${active.progress}%`,
                  backgroundColor: "var(--neu-progress-fill)",
                }}
              />
            </div>

            <Link
              href={SITE.appBaseUrl}
              className="neu-liquid-glass inline-flex rounded-full px-8 py-3 text-sm transition-transform hover:scale-[1.03]"
            >
              Dashboard erkunden
            </Link>
          </div>
        </div>

        <div className="neu-card-soft relative min-h-[400px] overflow-hidden rounded-2xl">
          {videoFailed ? (
            <div
              aria-hidden
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${FEATURE_POSTER})` }}
            />
          ) : (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              poster={FEATURE_POSTER}
              autoPlay
              loop
              muted
              playsInline
              aria-hidden
              tabIndex={-1}
              onError={() => setVideoFailed(true)}
            >
              <source src={FEATURE_WEBM} type="video/webm" />
              <source src={FEATURE_MP4} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
    </section>
  );
}
