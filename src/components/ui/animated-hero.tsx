"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { MoveRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scrollToSection";
import { cn } from "@/lib/utils";

/** Zweite Zeile unter „Bringe deine Brauerei“ – liest sich als gemeinsame Headline */
const ROTATING_WORDS = [
  "ins Rampenlicht",
  "mit KI nach vorn",
  "sichtbar im Feed",
  "mit Bild & Video",
  "in Social & Ads",
] as const;

export interface AnimatedHeroProps {
  className?: string;
}

/**
 * Hero mit wechselndem Schlagwort – nur Mobile (`md:hidden` am Root).
 * Desktop nutzt weiterhin {@link DesktopHero}.
 */
export function AnimatedHero({ className }: AnimatedHeroProps) {
  const [titleNumber, setTitleNumber] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setTitleNumber((n) =>
        n === ROTATING_WORDS.length - 1 ? 0 : n + 1,
      );
    }, 2000);
    return () => window.clearTimeout(timeoutId);
  }, [titleNumber]);

  const goAngebote = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection("#section-4");
  }, []);

  const scrollToEchteBeispiele = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
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
    },
    [],
  );

  return (
    <div className={cn("w-full md:hidden", className)}>
      <div className="container mx-auto max-w-lg px-4">
        <div className="flex flex-col items-center justify-center gap-6 py-12 sm:gap-8 sm:py-16">
          <div className="flex justify-center">
            <motion.div
              className="inline-flex rounded-full"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, -5, 0],
                      boxShadow: [
                        "0 1px 3px rgba(0,0,0,0.08)",
                        "0 6px 22px rgba(198, 90, 32, 0.26)",
                        "0 1px 3px rgba(0,0,0,0.08)",
                      ],
                    }
              }
              transition={{
                duration: 2.85,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="gap-2 rounded-full border-zinc-300/80 bg-white/90 px-4 text-zinc-800 shadow-sm ring-1 ring-black/[0.04] hover:bg-white hover:ring-[#c65a20]/25"
                asChild
              >
                <Link href="#section-4" scroll={false} onClick={goAngebote}>
                  <motion.span
                    className="inline-flex shrink-0"
                    aria-hidden
                    animate={
                      reduceMotion
                        ? undefined
                        : { rotate: [0, -8, 8, 0] }
                    }
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles className="h-4 w-4 text-[#c65a20]" />
                  </motion.span>
                  Meine Angebote
                  <MoveRight className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                </Link>
              </Button>
            </motion.div>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            <h1
              className="max-w-2xl text-center text-4xl leading-tight font-bold tracking-tighter text-neutral-900 sm:text-5xl"
              style={{
                fontFamily: "var(--font-main), ui-sans-serif, system-ui, sans-serif",
              }}
            >
              {/* Zwei Zeilen erzwingen – auf schmalen Screens sonst oft „Bringe deine Brauerei“ in einer Zeile */}
              <span className="flex flex-col items-center gap-0 leading-tight">
                <span className="block text-balance">Bringe deine</span>
                <span className="block text-balance">Brauerei</span>
              </span>
              <span className="relative mt-1 flex min-h-[2.65rem] w-full justify-center overflow-hidden text-center sm:mt-2 sm:min-h-[3rem]">
                {ROTATING_WORDS.map((title, index) => (
                  <motion.span
                    key={title}
                    className="font-display absolute inset-x-0 top-0 px-1 text-center text-[1.35rem] leading-snug font-semibold text-[#c65a20] text-balance sm:text-3xl sm:leading-tight"
                    initial={{ opacity: 0, y: "-100%" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-balance text-center text-base leading-relaxed tracking-tight text-zinc-600 sm:text-lg">
              <span className="font-medium text-zinc-700">
                KI-Marketing für Brauereien und Getränke:
              </span>{" "}
              <span className="hero-mobile-subtitle-shine">
                starke Produktbilder, Videos und Social-Content
              </span>{" "}
              <span className="text-zinc-600">
                – ohne klassisches Grafikstudio.
              </span>
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <motion.a
              href="#contact"
              className={cn(
                "z-20 inline-flex items-center justify-center rounded-full bg-neutral-900 font-medium tracking-tight text-white",
                "px-4 py-2 text-xs font-semibold shadow-2xl sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg lg:px-8 lg:py-3 lg:text-xl",
              )}
              style={{
                fontFamily: "var(--font-main), ui-sans-serif, system-ui, sans-serif",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
                delay: 0.7,
              }}
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", damping: 30, stiffness: 400 },
              }}
            >
              <span className="text-center">
                Kostenloses Erstgespräch{" "}
                <span className="ml-1 font-serif" aria-hidden>
                  →
                </span>
              </span>
            </motion.a>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
                delay: 0.7,
              }}
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", damping: 30, stiffness: 400 },
              }}
            >
              <Link
                href="#echte-beispiele-aus-der-praxis"
                scroll={false}
                onClick={scrollToEchteBeispiele}
                className={cn(
                  "z-20 inline-flex items-center justify-center rounded-full border border-[rgb(255,200,160)] bg-white/90 font-medium tracking-tight text-neutral-900 backdrop-blur-sm",
                  "gap-2 px-4 py-2 text-xs font-semibold shadow-xl sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg lg:px-8 lg:py-3 lg:text-xl",
                )}
                style={{
                  fontFamily: "var(--font-main), ui-sans-serif, system-ui, sans-serif",
                }}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                  <svg
                    className="ml-0.5 h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
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
