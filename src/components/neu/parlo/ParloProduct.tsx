"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BENEFITS } from "./data";
import { DashboardPreview } from "./DashboardPreview";
import { ParloPixelCanvas } from "./ParloEffects";
import { ParloStarButton } from "./ParloUi";
import { SITE } from "@/lib/siteConfig";

const BENEFIT_PIXEL = ["#fecdd3", "#fda4af", "#e11d48"];
const EASE = {
  type: "tween" as const,
  duration: 0.45,
  ease: [0.215, 0.61, 0.355, 1] as const,
};

function BenefitCard({
  benefit,
  index,
}: {
  benefit: (typeof BENEFITS)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...EASE, delay: 0.2 + 0.08 * index }}
      className={[
        "relative overflow-hidden px-6 py-8",
        index % 2 !== 0 ? "border-l border-foreground/[0.06]" : "",
        index >= 2 ? "border-t border-foreground/[0.06]" : "",
        index > 0 ? "lg:border-l lg:border-foreground/[0.06]" : "",
        index >= 2 ? "lg:border-t-0" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="pointer-events-none absolute inset-0">
        <ParloPixelCanvas
          colors={BENEFIT_PIXEL}
          trigger="hover"
          active={hovered}
          appearFrom="middle"
          gap={6}
          pixelSize={2}
          speed={80}
          style={{ background: "transparent" }}
        />
      </div>
      <div className="relative z-[1]">
        <p className="font-mono text-xs tracking-wider text-muted-foreground">
          {benefit.n}
        </p>
        <h3 className="mt-3 text-lg font-medium tracking-tight text-foreground">
          {benefit.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {benefit.body}
        </p>
      </div>
    </motion.div>
  );
}

export function ParloProduct() {
  const titleLines = [
    "Marke einmal setzen,",
    "Motive planbar erzeugen.",
  ] as const;

  return (
    <section id="product" className="scroll-mt-24 pt-20 pb-0">
      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...EASE, delay: 0 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-balance text-4xl font-semibold text-foreground md:text-5xl">
            {titleLines.map((line, i) => (
              <span
                key={line}
                className={
                  i === titleLines.length - 1
                    ? "block text-muted-foreground"
                    : "block"
                }
              >
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-6 text-balance text-lg text-muted-foreground">
            BrewAI ist das KI-Content-System für Brauereien: Markenprofil,
            Produktbilder und Social-Motive aus einem Dashboard — klick dich
            durch die Vorschau.
          </p>
          <div className="mt-8 flex justify-center">
            <ParloStarButton href={SITE.appBaseUrl} className="h-[34px]">
              Dashboard öffnen
            </ParloStarButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ ...EASE, delay: 0.08 }}
          className="mx-auto mt-12 max-w-5xl pb-16"
        >
          <DashboardPreview />
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Interaktive Vorschau — keine echten Daten, kein Login nötig.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 border-y border-foreground/[0.06] lg:grid-cols-4">
        {BENEFITS.map((b, i) => (
          <BenefitCard key={b.n} benefit={b} index={i} />
        ))}
      </div>
    </section>
  );
}
