"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { MoveRight, PhoneCall, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
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

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setTitleNumber((n) =>
        n === ROTATING_WORDS.length - 1 ? 0 : n + 1,
      );
    }, 2000);
    return () => window.clearTimeout(timeoutId);
  }, [titleNumber]);

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
          <div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-zinc-300/80 bg-white/85 text-zinc-800 shadow-sm hover:bg-white"
              asChild
            >
              <Link href="#section-4">
                <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
                Meine Angebote
                <MoveRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
            </Button>
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

            <p className="mx-auto max-w-2xl text-center text-base leading-relaxed tracking-tight text-zinc-600 sm:text-lg">
              KI-Marketing für Brauereien und Getränke: starke Produktbilder,
              Videos und Social-Content – ohne klassisches Grafikstudio.
            </p>
          </div>

          <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row sm:justify-center sm:gap-3">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-zinc-300/80 bg-white/90 text-zinc-900 hover:bg-white"
              asChild
            >
              <Link href="#contact">
                <PhoneCall className="h-4 w-4 shrink-0" aria-hidden />
                Erstgespräch
              </Link>
            </Button>
            <Button size="lg" className="gap-2" asChild>
              <Link
                href="#echte-beispiele-aus-der-praxis"
                scroll={false}
                onClick={scrollToEchteBeispiele}
              >
                So funktioniert&apos;s
                <MoveRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
