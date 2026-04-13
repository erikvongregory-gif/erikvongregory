"use client";

import Link from "next/link";
import { useCallback } from "react";
import { motion } from "motion/react";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import { TextRotate } from "@/components/ui/text-rotate";
import { KI_BEISPIELE } from "@/lib/kiBeispiele";
import { cn } from "@/lib/utils";

/** Parallax-Positionen + Größen pro Index (gleiche Assets wie Section „Echte Beispiele“). */
const HERO_FLOAT_LAYOUT = [
  {
    depth: 0.5 as const,
    className: "left-[2%] top-[15%] md:left-[5%] md:top-[25%]",
    imgClass:
      "h-12 w-16 -rotate-[3deg] sm:h-16 sm:w-24 md:h-20 md:w-28 lg:h-24 lg:w-32",
    delay: 0.5,
  },
  {
    depth: 1 as const,
    className: "left-[8%] top-0 md:left-[11%] md:top-[6%]",
    imgClass:
      "h-28 w-40 -rotate-12 sm:h-36 sm:w-48 md:h-44 md:w-56 lg:h-48 lg:w-60",
    delay: 0.7,
  },
  {
    depth: 4 as const,
    className: "left-[6%] top-[90%] md:left-[8%] md:top-[80%]",
    imgClass:
      "h-40 w-40 -rotate-[4deg] sm:h-48 sm:w-48 md:h-60 md:w-60 lg:h-64 lg:w-64",
    delay: 0.9,
  },
  {
    depth: 2 as const,
    className: "left-[87%] top-0 md:left-[83%] md:top-[2%]",
    imgClass:
      "h-36 w-40 rotate-[6deg] sm:h-44 sm:w-48 md:h-52 md:w-60 lg:h-56 lg:w-64",
    delay: 1.1,
  },
  {
    depth: 1 as const,
    className: "left-[83%] top-[78%] md:left-[83%] md:top-[68%]",
    imgClass:
      "h-44 w-44 rotate-[19deg] sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80",
    delay: 1.3,
  },
] as const;

/**
 * Kurze zweite Hero-Zeile (wenig Layout-Sprung); Fokus auf KI-Bilder.
 */
const HERO_ROTATE_TEXTS = [
  "Mit KI-Fotos ins Licht",
  "Mit KI-Bildern im Feed",
  "Mit KI-Visuals groß raus",
  "Mit KI-Bildern sichtbar",
  "Mit KI-Assets online",
  "Mit KI-Grafik auffällig",
  "Mit KI-Spots regional",
  "Mit KI-Visuals im Feed",
  "Mit KI-Bildideen nah dran",
  "Mit KI-Medien frisch",
  "Mit KI-Assets klar",
  "Mit KI-Spot stark",
] as const;

export type DesktopHeroVariant = "desktop" | "mobile";

/** Hero: Parallax-Bilder + zweizeilige Headline + TextRotate. `mobile` = kompaktere Typo und CTAs für schmale Viewports. */
export function DesktopHero({ variant = "desktop" }: { variant?: DesktopHeroVariant }) {
  const isMobile = variant === "mobile";
  const scrollToEchteBeispiele = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
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
    <section
      className={cn(
        "relative z-20 flex w-full flex-col items-center justify-center px-3 pt-12 sm:px-6 sm:pt-16",
        /* Mobile: kein overflow-hidden unten – vermeidet harten „Schnitt“ zum nächsten Block */
        isMobile
          ? "max-md:overflow-x-clip max-md:overflow-y-visible pb-10 md:overflow-visible"
          : "h-screen min-h-[600px] overflow-hidden pb-8 pt-16 md:overflow-visible sm:pb-12",
      )}
    >
      {!isMobile ? (
        <Floating
          sensitivity={-0.5}
          className="pointer-events-none z-[15] h-full min-h-full"
          aria-hidden
        >
          {HERO_FLOAT_LAYOUT.map((slot, i) => {
            const imgIndex = i < KI_BEISPIELE.length ? i : 1;
            const img = KI_BEISPIELE[imgIndex];
            return (
              <FloatingElement
                key={`hero-float-${i}-${img.src}`}
                depth={slot.depth}
                className={slot.className}
              >
                <motion.img
                  src={img.src}
                  alt=""
                  className={`cursor-default rounded-xl object-cover shadow-2xl duration-200 blur-[2px] sm:blur-[3px] md:blur-[4px] ${slot.imgClass}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: slot.delay }}
                />
              </FloatingElement>
            );
          })}
        </Floating>
      ) : null}

      <div
        className={cn(
          "pointer-events-auto relative z-50 flex w-[min(100%,700px)] flex-col items-center justify-center sm:w-[min(100%,760px)] md:w-[min(100%,820px)] lg:w-[min(100%,900px)]",
          isMobile && "w-full max-w-lg px-3 sm:max-w-none sm:px-0",
        )}
      >
        <motion.h1
          className={cn(
            "flex w-full max-w-full flex-col items-center justify-center gap-2 text-center font-bold leading-tight tracking-tight text-neutral-900 md:gap-4",
          )}
          style={{ fontFamily: "var(--font-main), ui-sans-serif, system-ui, sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
        >
          {/* Zeile 1: Hauptbotschaft – w-full + text-balance für echte Mitte auf schmalen Screens */}
          <span
            className={cn(
              "block w-full text-balance text-center leading-[1.2]",
              /* Mobile-Layout nur unter md-Breakpoint */
              isMobile
                ? "text-[1.4375rem] sm:text-[1.625rem] sm:leading-tight"
                : "text-3xl sm:text-5xl md:text-7xl lg:text-8xl",
            )}
          >
            Bringe deine Brauerei
          </span>
          {/* Zeile 2: rotierender Zusatz (kleiner, eine Zeile) */}
          <span
            className={cn(
              "flex w-full max-w-full min-w-0 flex-nowrap items-baseline justify-center text-center leading-tight",
              isMobile
                ? "text-base sm:text-2xl md:text-4xl md:leading-tight lg:text-5xl"
                : "text-xl sm:text-2xl md:text-4xl md:leading-tight lg:text-5xl",
            )}
          >
            <TextRotate
              nowrap
              texts={[...HERO_ROTATE_TEXTS]}
              mainClassName={cn(
                "font-display min-w-0 justify-center overflow-visible py-0 pb-1 text-[#c65a20] sm:pb-2 md:pb-3",
                isMobile && "text-[0.95rem] leading-snug sm:text-2xl md:text-4xl",
              )}
              staggerDuration={0.03}
              staggerFrom="last"
              rotationInterval={3000}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              animatePresenceMode="wait"
              elementLevelClassName="font-semibold md:font-bold"
            />
          </span>
        </motion.h1>

        <div
          className={cn(
            "flex flex-wrap items-center justify-center sm:mt-16 md:mt-20 lg:mt-20",
            isMobile
              ? "mt-5 flex-col gap-2 sm:mt-10"
              : "mt-8 flex-row gap-3 sm:gap-3 md:gap-3",
          )}
        >
          <motion.a
            href="#contact"
            className={cn(
              "z-20 inline-flex items-center justify-center rounded-full bg-neutral-900 font-medium tracking-tight text-white",
              isMobile
                ? "max-w-[min(100%,17rem)] px-2.5 py-1 text-[10px] leading-tight shadow-sm sm:px-3 sm:py-1.5 sm:text-xs"
                : "px-4 py-2 text-xs font-semibold shadow-2xl sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg lg:px-8 lg:py-3 lg:text-xl",
            )}
            style={{ fontFamily: "var(--font-main), ui-sans-serif, system-ui, sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              delay: 0.7,
              scale: { duration: 0.2 },
            }}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", damping: 30, stiffness: 400 },
            }}
          >
            <span className="text-center">
              Kontakt aufnehmen{" "}
              <span className={cn("font-serif", isMobile ? "ml-0.5" : "ml-1")} aria-hidden>
                →
              </span>
            </span>
          </motion.a>
          <motion.div className={cn(isMobile && "flex justify-center")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              delay: 0.7,
              scale: { duration: 0.2 },
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
                isMobile
                  ? "max-w-[min(100%,17rem)] gap-1.5 px-2.5 py-1 text-[10px] leading-tight shadow-sm sm:px-3 sm:py-1.5 sm:text-xs sm:shadow-md"
                  : "gap-2 px-4 py-2 text-xs font-semibold shadow-xl sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg lg:px-8 lg:py-3 lg:text-xl",
              )}
              style={{ fontFamily: "var(--font-main), ui-sans-serif, system-ui, sans-serif" }}
            >
              <span
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-full bg-neutral-100",
                  isMobile ? "h-5 w-5" : "h-8 w-8",
                )}
              >
                <svg
                  className={cn("ml-0.5", isMobile ? "h-2.5 w-2.5" : "h-3.5 w-3.5")}
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

        {!isMobile ? (
        <div className="hero-trust-pills mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2 px-1 sm:mt-12 sm:gap-3">
          {[
            {
              label: "KI-Produktfotos",
              icon: (
                <svg
                  className="h-4 w-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                </svg>
              ),
            },
            {
              label: "Bildkampagnen",
              icon: (
                <svg
                  className="h-4 w-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              ),
            },
            {
              label: "Social Media",
              icon: (
                <svg
                  className="h-4 w-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              ),
            },
            {
              label: "Automatisiert",
              icon: (
                <svg
                  className="h-4 w-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                  <path d="M16 21h5v-5" />
                </svg>
              ),
            },
          ].map((item, i) => (
            <span
              key={item.label}
              className={cn(
                `hero-trust-pill hero-trust-pill-${i + 1} inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-neutral-100/80 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:border-orange-300 hover:bg-orange-50/80 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm`,
              )}
              style={{ fontFamily: "var(--font-main), ui-sans-serif, system-ui, sans-serif" }}
            >
              <span className="hero-trust-pill-icon text-neutral-600">
                {item.icon}
              </span>
              {item.label}
            </span>
          ))}
        </div>
        ) : null}
      </div>
    </section>
  );
}
