"use client";

import { useCallback } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { TextRotate } from "@/components/ui/text-rotate";
import { cn } from "@/lib/utils";

const HERO_ROTATE_TEXTS = [
  "Mit KI-Fotos ins Licht",
  "Mit KI-Bildern im Feed",
  "Mit KI-Visuals gross raus",
  "Mit KI-Bildern sichtbar",
  "Mit KI-Assets online",
  "Mit KI-Grafik auffaellig",
  "Mit KI-Spots regional",
  "Mit KI-Visuals im Feed",
  "Mit KI-Bildideen nah dran",
  "Mit KI-Medien frisch",
  "Mit KI-Assets klar",
  "Mit KI-Spot stark",
] as const;

export interface AnimatedHeroProps {
  className?: string;
}

export function AnimatedHeroMobile({ className }: AnimatedHeroProps) {
  const scrollToEchteBeispiele = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const id = "echte-beispiele-aus-der-praxis";
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 96;
    const targetTop = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
    window.setTimeout(() => {
      el.classList.remove("section7-slide-into");
      void el.offsetWidth;
      el.classList.add("section7-slide-into");
    }, 650);
  }, []);

  return (
    <div className={cn("w-full md:hidden", className)}>
      <div className="container mx-auto max-w-lg px-4">
        <div className="flex flex-col items-center justify-center gap-6 py-12 sm:gap-8 sm:py-16">
          <div className="flex flex-col gap-3 sm:gap-4">
            <h1
              className="max-w-2xl text-center leading-tight font-bold tracking-tight text-neutral-900"
              style={{ fontFamily: "var(--font-main), ui-sans-serif, system-ui, sans-serif" }}
            >
              <span className="block w-full text-balance text-center text-[1.4375rem] leading-[1.2] sm:text-[1.625rem] sm:leading-tight">
                Bringe deine Brauerei
              </span>
              <span className="mt-1 flex w-full min-w-0 flex-nowrap items-baseline justify-center text-center text-base leading-tight sm:text-2xl">
                <TextRotate
                  nowrap
                  texts={[...HERO_ROTATE_TEXTS]}
                  mainClassName="font-display min-w-0 justify-center overflow-visible py-0 pb-1 text-[0.95rem] leading-snug text-[#c65a20] sm:pb-2 sm:text-2xl"
                  staggerDuration={0.03}
                  staggerFrom="last"
                  rotationInterval={3000}
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-120%", opacity: 0 }}
                  animatePresenceMode="wait"
                  elementLevelClassName="font-semibold"
                />
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-balance text-center text-base leading-relaxed tracking-tight text-zinc-600 sm:text-lg">
              KI-Marketing fuer Brauereien und Getraenke: starke Produktbilder und Social-Content.
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <motion.a
              href="#contact"
              className={cn(
                "z-20 inline-flex items-center justify-center rounded-full bg-neutral-900 font-medium tracking-tight text-white",
                "px-4 py-2 text-xs font-semibold shadow-2xl sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg lg:px-8 lg:py-3 lg:text-xl",
              )}
              style={{ fontFamily: "var(--font-main), ui-sans-serif, system-ui, sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut", delay: 0.7 }}
              whileHover={{ scale: 1.05, transition: { type: "spring", damping: 30, stiffness: 400 } }}
            >
              <span className="text-center">
                Kontakt aufnehmen <span className="ml-1 font-serif" aria-hidden>→</span>
              </span>
            </motion.a>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut", delay: 0.7 }}
              whileHover={{ scale: 1.05, transition: { type: "spring", damping: 30, stiffness: 400 } }}
            >
              <Link
                href="#echte-beispiele-aus-der-praxis"
                scroll={false}
                onClick={scrollToEchteBeispiele}
                className={cn(
                  "z-20 inline-flex items-center justify-center rounded-full border border-[rgb(255,200,160)] bg-white/90 font-medium tracking-tight text-neutral-900 backdrop-blur-sm",
                  "gap-2 px-4 py-2 text-xs font-semibold shadow-xl sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg lg:px-8 lg:py-3 lg:text-xl",
                )}
                style={{ fontFamily: "var(--font-main), ui-sans-serif, system-ui, sans-serif" }}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                  <svg className="ml-0.5 h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                So funktioniert&apos;s
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
