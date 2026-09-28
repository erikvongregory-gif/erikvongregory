"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { APP_URL, CTA_ICONS } from "@/components/neu/parlo/data";
import { useParloTheme } from "@/components/neu/parlo/ParloTheme";
import { ParloPillButton, ParloStarButton } from "@/components/neu/parlo/ParloUi";
import { cn } from "@/lib/utils";
import { MotionWaveCanvas } from "./MotionWaveCanvas";
import { PerlageField } from "./PerlageField";
import { ScanDivider } from "./ScanDivider";
import { EASE } from "./motion-utils";

/**
 * ParloCta — Strahlen zeichnen sich vom Horizont und atmen danach langsam.
 * Die Perlage aus dem Hero kehrt dezent zurück und kommt unter der Headline zur Ruhe.
 */
export function MotionCta() {
  const { theme } = useParloTheme();
  const waveBg = theme === "light" ? "#fafafa" : "#0a0a0a";
  const waveLine = theme === "light" ? "rgb(120, 120, 120)" : "rgb(190, 190, 190)";
  const guardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [introDone, setIntroDone] = useState(false);

  return (
    <section id="contact" className="relative overflow-hidden">
      <ScanDivider />

      <div className="md:mx-[30px] md:border-x border-border">
        <div className="relative isolate overflow-hidden bg-background px-6 py-20 md:py-[120px]">
          <div
            aria-hidden
            className={cn("nm-rays pointer-events-none absolute inset-0 z-0", introDone && "is-on")}
          >
            <MotionWaveCanvas
              key={theme}
              backgroundColor={waveBg}
              lineColor={waveLine}
              glow={42}
              lineCount={28}
              speed={1.5}
              onIntro={() => window.setTimeout(() => setIntroDone(true), 1200)}
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 z-[1]"
            style={{ background: "var(--cta-overlay)" }}
          />
          <PerlageField
            variant="cta"
            guardRef={guardRef}
            restRef={headlineRef}
            className="z-[2]"
          />

          <div
            ref={guardRef}
            className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
          >
            <div className="relative mb-10 flex h-16 w-full max-w-md items-center justify-center overflow-hidden">
              <div className="cta-model-marquee absolute inset-y-0 flex items-center gap-6 opacity-50">
                {[...CTA_ICONS, ...CTA_ICONS].map((icon, i) => (
                  <span
                    key={`${icon.alt}-${i}`}
                    className="shrink-0 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
                  >
                    {icon.label}
                  </span>
                ))}
              </div>
            </div>

            <motion.h2
              ref={headlineRef}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE.rise, delay: 0.2 }}
              className="text-balance text-3xl font-medium tracking-tight text-foreground md:text-5xl"
            >
              Erste Motive heute im Dashboard.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE.rise, delay: 0.32 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <ParloStarButton href={APP_URL} aria-label="Dashboard öffnen">
                Dashboard öffnen
              </ParloStarButton>
              <ParloPillButton href="#pricing" variant="outline" className="h-11 px-5">
                Preise ansehen
              </ParloPillButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
