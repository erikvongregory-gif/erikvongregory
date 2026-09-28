"use client";

import NumberFlow from "@number-flow/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { BENEFITS } from "@/components/neu/parlo/data";
import { ParloPixelCanvas } from "@/components/neu/parlo/ParloEffects";
import { ParloStarButton } from "@/components/neu/parlo/ParloUi";
import { SITE } from "@/lib/siteConfig";
import { MotionDashboardPreview } from "./MotionDashboardPreview";
import { EASE, cssEase, useInViewOnce, useMotionTier } from "./motion-utils";

const BENEFIT_PIXEL = ["#fecdd3", "#fda4af", "#e11d48"];
const REVEAL = { type: "tween" as const, duration: 0.8, ease: EASE.rise };

function BenefitCard({
  benefit,
  index,
}: {
  benefit: (typeof BENEFITS)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInViewOnce(ref, { threshold: 0.4 });
  const n = Number.parseInt(benefit.n, 10);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...REVEAL, delay: 0.1 + 0.08 * index }}
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
        {/* Mono-Nummer rollt von 00 auf ihren Wert */}
        <p className="font-mono text-xs tracking-wider text-muted-foreground">
          <NumberFlow
            value={seen ? n : 0}
            format={{ minimumIntegerDigits: 2 }}
            className="font-mono"
            spinTiming={{ duration: 900, easing: cssEase(EASE.count) }}
            transformTiming={{ duration: 600, easing: cssEase(EASE.count) }}
          />
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

/** Dashboard-Mockup: Desktop scroll-gekoppelt (40 px → 0, 0.98 → 1), sonst einfacher Reveal. */
function DashboardStage({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const tier = useMotionTier();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 35%"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
  const linked = tier.ready && !tier.mobile && !tier.reduced;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={REVEAL}
      className="relative mx-auto mt-12 max-w-5xl pb-16"
    >
      <motion.div style={linked ? { y, scale } : undefined}>{children}</motion.div>
    </motion.div>
  );
}

export function MotionProduct() {
  const titleLines = ["Marke einmal setzen,", "Motive planbar erzeugen."] as const;

  return (
    <section id="product" className="scroll-mt-24 pt-20 pb-0">
      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={REVEAL}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-balance text-4xl font-semibold text-foreground md:text-5xl">
            {titleLines.map((line, i) => (
              <span
                key={line}
                className={i === titleLines.length - 1 ? "block text-muted-foreground" : "block"}
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

        <DashboardStage>
          <MotionDashboardPreview />
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Interaktive Vorschau — keine echten Daten, kein Login nötig.
          </p>
        </DashboardStage>
      </div>

      <div className="grid grid-cols-2 border-y border-foreground/[0.06] lg:grid-cols-4">
        {BENEFITS.map((b, i) => (
          <BenefitCard key={b.n} benefit={b} index={i} />
        ))}
      </div>
    </section>
  );
}
