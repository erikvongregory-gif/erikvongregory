"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import { MobileGalleryHero } from "@/components/mobile/MobileGalleryHero";
import { useLoading } from "@/context/LoadingContext";
import { navigateToAppDashboard } from "@/lib/appLoginUrl";
import { KI_BEISPIELE } from "@/lib/kiBeispiele";

const HERO_FLOAT_LAYOUT = [
  {
    depth: 0.5 as const,
    className: "left-[2%] top-[15%] md:left-[5%] md:top-[25%]",
    imgClass: "h-12 w-16 -rotate-[3deg] sm:h-16 sm:w-24 md:h-20 md:w-28 lg:h-24 lg:w-32",
    delay: 0.5,
  },
  {
    depth: 1 as const,
    className: "left-[8%] top-0 md:left-[11%] md:top-[6%]",
    imgClass: "h-28 w-40 -rotate-12 sm:h-36 sm:w-48 md:h-44 md:w-56 lg:h-48 lg:w-60",
    delay: 0.7,
  },
  {
    depth: 4 as const,
    className: "left-[6%] top-[90%] md:left-[8%] md:top-[80%]",
    imgClass: "h-40 w-40 -rotate-[4deg] sm:h-48 sm:w-48 md:h-60 md:w-60 lg:h-64 lg:w-64",
    delay: 0.9,
  },
  {
    depth: 2 as const,
    className: "left-[87%] top-0 md:left-[83%] md:top-[2%]",
    imgClass: "h-36 w-40 rotate-[6deg] sm:h-44 sm:w-48 md:h-52 md:w-60 lg:h-56 lg:w-64",
    delay: 1.1,
  },
  {
    depth: 1 as const,
    className: "left-[83%] top-[78%] md:left-[83%] md:top-[68%]",
    imgClass: "h-44 w-44 rotate-[19deg] sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80",
    delay: 1.3,
  },
] as const;

function Hero() {
  const { heroReady } = useLoading();
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["KI-gestützt", "automatisiert", "skalierbar"], []);
  const [showFloatingExamples, setShowFloatingExamples] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const enableFloating = () => setShowFloatingExamples(true);

    if ("requestIdleCallback" in window) {
      idleId = (window as Window & { requestIdleCallback: (cb: IdleRequestCallback) => number }).requestIdleCallback(
        enableFloating,
      );
    } else {
      timeoutId = globalThis.setTimeout(enableFloating, 900);
    }

    return () => {
      if (idleId !== null) {
        (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(idleId);
      }
      if (timeoutId !== null) {
        globalThis.clearTimeout(timeoutId);
      }
    };
  }, []);

  const primaryCtaLabel = "3 Bilder kostenlos generieren";

  const [ctaPending, setCtaPending] = useState(false);

  const onPrimaryCtaClick = () => {
    setCtaPending(true);
    navigateToAppDashboard();
  };

  const onGalleryOpen = () => {
    if (typeof window === "undefined") return;
    const el =
      document.getElementById("beispiele") ??
      document.getElementById("echte-beispiele-aus-der-praxis");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="relative w-full overflow-visible">
      {showFloatingExamples ? (
        <Floating sensitivity={-0.5} className="pointer-events-none absolute inset-0 z-0 hidden h-full min-h-full lg:block" aria-hidden>
          {HERO_FLOAT_LAYOUT.map((slot, i) => {
            const imgIndex = i < KI_BEISPIELE.length ? i : 1;
            const img = KI_BEISPIELE[imgIndex];
            return (
              <FloatingElement key={`hero-float-${i}-${img.src}`} depth={slot.depth} className={slot.className}>
                <BlurFade delay={slot.delay} duration={0.45} blur="8px">
                  <motion.img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className={`cursor-default rounded-xl object-cover shadow-2xl duration-200 blur-[2px] sm:blur-[3px] md:blur-[4px] ${slot.imgClass}`}
                  />
                </BlurFade>
              </FloatingElement>
            );
          })}
        </Floating>
      ) : null}
      <div className="container mx-auto max-md:max-w-none max-md:px-0">
        <div
          className={`lg:hidden transition-opacity duration-500 ease-out ${
            heroReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <MobileGalleryHero
            primaryCtaLabel={primaryCtaLabel}
            onPrimaryCtaClick={onPrimaryCtaClick}
            ctaPending={ctaPending}
            onGalleryOpen={onGalleryOpen}
          />
        </div>

        <div className="relative z-10 hidden flex-col items-center justify-center gap-8 py-20 lg:flex lg:py-40">
          <div
            className={`flex w-full flex-col items-center transition-opacity duration-500 ease-out ${
              heroReady ? "opacity-100" : "opacity-0"
            }`}
          >
              <BlurFade delay={0.04} duration={0.45}>
                <Button variant="secondary" size="sm" className="gap-4">
                  Fokus: KI-Content für Brauereien <MoveRight className="w-4 h-4" />
                </Button>
              </BlurFade>

              <BlurFade delay={0.12} duration={0.48} className="flex flex-col gap-4">
                <div
                  className="max-w-2xl text-center text-5xl font-regular tracking-tighter md:text-7xl"
                  aria-hidden
                >
                  <span className="text-spektr-cyan-50">KI-Marketing für Brauereien</span>
                  <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                    &nbsp;
                    {titles.map((title, index) => (
                      <motion.span
                        key={index}
                        className="absolute font-semibold md:text-[1.12em]"
                        initial={{ opacity: 0, y: -100 }}
                        transition={{ type: "spring", stiffness: 50 }}
                        animate={
                          titleNumber === index
                            ? { y: 0, opacity: 1 }
                            : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                        }
                      >
                        {title}
                      </motion.span>
                    ))}
                  </span>
                </div>

                <p className="max-w-2xl text-center text-lg leading-relaxed tracking-tight text-muted-foreground md:text-xl">
                  Weniger Aufwand, bessere Ergebnisse: KI-Produktfotos, Kampagnenmotive und Social-Content in
                  deinem Markenstil.
                </p>
              </BlurFade>

              <BlurFade delay={0.2} duration={0.5} className="mt-4 flex flex-row flex-wrap items-center justify-center gap-3">
                <div>
                  <LiquidMetalButton
                    label={primaryCtaLabel}
                    onClick={onPrimaryCtaClick}
                  />
                </div>
                <div>
                  <LiquidMetalButton
                    label="Beispiele ansehen"
                    onClick={onGalleryOpen}
                  />
                </div>
              </BlurFade>
          </div>
        </div>
      </div>

    </div>
  );
}

export { Hero };
