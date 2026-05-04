"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type HoverPreviewEntry = {
  image: string;
  title: string;
  subtitle: string;
};

/** Vorschau-Kacheln für die Über-uns-Story (lokale Assets unter /public). */
export const EVGLAB_HOVER_PREVIEWS: Record<string, HoverPreviewEntry> = {
  kiBilder: {
    image: "/ki-beispiel-hafen.webp",
    title: "KI-Werbebilder",
    subtitle: "Motivation für Flasche, Gastro und Saison — in deinem Markenlook",
  },
  premium: {
    image: "/hero-brauerei-live-bg.png",
    title: "Premium-Pakete",
    subtitle: "Fertige Bilder & Texte nach Briefing — wenig interner Aufwand",
  },
  dashboard: {
    image: "/onboarding/dashboard-overview.svg",
    title: "Dashboard & Tokens",
    subtitle: "Selbst generieren, planen und wiederverwenden — monatlich skalierbar",
  },
};

function HoverLink({
  previewKey,
  children,
  light,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
}: {
  previewKey: keyof typeof EVGLAB_HOVER_PREVIEWS;
  children: ReactNode;
  light: boolean;
  onHoverStart: (key: keyof typeof EVGLAB_HOVER_PREVIEWS, e: React.MouseEvent) => void;
  onHoverMove: (e: React.MouseEvent) => void;
  onHoverEnd: () => void;
}) {
  return (
    <span
      className={cn(
        "relative inline cursor-default font-semibold underline-offset-4 transition-colors",
        "after:pointer-events-none after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full",
        "after:bg-gradient-to-r after:from-[#e07a40] after:via-[#c65a20] after:to-amber-500 after:transition-all after:duration-300",
        light
          ? "text-[#b45309] after:opacity-100 hover:text-[#9a3412] hover:after:w-full"
          : "text-white hover:text-[#fde68a] hover:after:w-full",
      )}
      onMouseEnter={(e) => onHoverStart(previewKey, e)}
      onMouseMove={onHoverMove}
      onMouseLeave={onHoverEnd}
    >
      {children}
    </span>
  );
}

function PreviewCard({
  data,
  position,
  isVisible,
  cardRef,
  light,
}: {
  data: HoverPreviewEntry | null;
  position: { x: number; y: number };
  isVisible: boolean;
  cardRef: React.RefObject<HTMLDivElement | null>;
  light: boolean;
}) {
  if (!data) return null;

  return (
    <div
      ref={cardRef}
      className={cn(
        "pointer-events-none fixed z-[200] w-[min(92vw,280px)] transition-[opacity,transform] duration-200 ease-out",
        isVisible ? "opacity-100 translate-y-0 scale-100" : "pointer-events-none opacity-0 translate-y-2 scale-95",
      )}
      style={{ left: position.x, top: position.y }}
      aria-hidden
    >
      <div
        className={cn(
          "overflow-hidden rounded-2xl p-2 shadow-xl backdrop-blur-md",
          light
            ? "border border-zinc-200/90 bg-white/95 shadow-zinc-400/25"
            : "border border-white/10 bg-zinc-900/95 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.06),0_0_48px_rgba(198,90,32,0.12)]",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- schwebende Vorschau, feste Maße */}
        <img src={data.image} alt="" width={280} height={180} className="h-auto w-full rounded-lg object-cover" />
        <p className={cn("px-2 pt-2 text-sm font-semibold", light ? "text-zinc-900" : "text-white")}>{data.title}</p>
        <p className={cn("px-2 pb-2 pt-0.5 text-xs leading-snug", light ? "text-zinc-600" : "text-zinc-400")}>
          {data.subtitle}
        </p>
      </div>
    </div>
  );
}

export type HoverPreviewProps = {
  className?: string;
  /** Weniger Mindesthöhe — sinnvoll, wenn die Komponente in eine längere Seite eingebettet ist. */
  compact?: boolean;
  /** Helles Layout (z. B. Über-uns-Seite) — Standard bleibt dunkel für andere Einsätze. */
  theme?: "dark" | "light";
  /** Fließtext: zentriert oder links (z. B. zweispaltig mit Globus). */
  contentAlign?: "center" | "start";
  /** Ohne Karten-Rahmen (kein Rand, kein eigener Hintergrund) — z. B. neben Globus. */
  plain?: boolean;
};

/**
 * Erzählblock mit Hover-Vorschaukarten — EvGlab-Stil, nur Tailwind.
 */
export function HoverPreview({
  className,
  compact,
  theme = "dark",
  contentAlign = "center",
  plain,
}: HoverPreviewProps) {
  const light = theme === "light";
  const alignStart = contentAlign === "start";
  const plainSurface = plain === true;
  const [activePreview, setActivePreview] = useState<HoverPreviewEntry | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Object.values(EVGLAB_HOVER_PREVIEWS).forEach((d) => {
      const img = new Image();
      img.src = d.image;
    });
  }, []);

  const updatePosition = useCallback((e: React.MouseEvent | MouseEvent) => {
    const cardWidth = 300;
    const cardHeight = 260;
    const offsetY = 20;
    let x = e.clientX - cardWidth / 2;
    let y = e.clientY - cardHeight - offsetY;
    if (x + cardWidth > window.innerWidth - 16) x = window.innerWidth - cardWidth - 16;
    if (x < 16) x = 16;
    if (y < 16) y = e.clientY + offsetY;
    setPosition({ x, y });
  }, []);

  const handleHoverStart = useCallback(
    (key: keyof typeof EVGLAB_HOVER_PREVIEWS, e: React.MouseEvent) => {
      setActivePreview(EVGLAB_HOVER_PREVIEWS[key]);
      setIsVisible(true);
      updatePosition(e);
    },
    [updatePosition],
  );

  const handleHoverMove = useCallback(
    (e: React.MouseEvent) => {
      if (isVisible) updatePosition(e);
    },
    [isVisible, updatePosition],
  );

  const handleHoverEnd = useCallback(() => {
    setIsVisible(false);
  }, []);

  const pMotion = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div
      className={cn(
        "relative isolate",
        plainSurface
          ? cn(compact ? "min-h-0 py-0" : "min-h-0 py-14 sm:py-16")
          : cn(
              "overflow-hidden rounded-3xl border px-6 sm:px-10",
              light
                ? "border-zinc-200/90 bg-gradient-to-b from-white to-zinc-50/90 shadow-[0_20px_50px_-36px_rgba(15,23,42,0.12)]"
                : "border-zinc-800/80 bg-[#0a0f14]",
              compact ? "min-h-0 py-10 sm:py-12" : "min-h-[min(78vh,640px)] py-14 sm:py-16",
            ),
        className,
      )}
    >
      {!plainSurface && (
        <>
          <div
            className={cn("pointer-events-none absolute inset-0", light ? "opacity-[0.025]" : "opacity-[0.04]")}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
            aria-hidden
          />
          <div
            className={cn(
              "pointer-events-none absolute left-1/2 top-1/2 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full motion-safe:animate-[evg-hoverpulse_8s_ease-in-out_infinite]",
              light
                ? "bg-[radial-gradient(circle,rgba(198,90,32,0.07)_0%,transparent_68%)]"
                : "bg-[radial-gradient(circle,rgba(198,90,32,0.14)_0%,transparent_68%)]",
            )}
            aria-hidden
          />
        </>
      )}

      <div className={cn("relative mx-auto max-w-[40rem]", light && !alignStart && "text-center")}>
        <div
          className={cn(
            "font-sans text-[clamp(1.15rem,3.6vw,1.65rem)] font-normal leading-relaxed tracking-tight",
            light ? "text-zinc-600" : "text-zinc-400",
          )}
        >
          <motion.p {...pMotion} transition={{ duration: 0.55, delay: 0.08 }} className="mb-8">
            EvGlab unterstützt{" "}
            <strong className={cn("font-medium", light ? "text-zinc-900" : "text-zinc-200")}>
              Brauereien und Getränkemarken
            </strong>{" "}
            in{" "}
            <strong className={cn("font-medium", light ? "text-zinc-900" : "text-zinc-200")}>
              Deutschland, Österreich und der Schweiz
            </strong>{" "}
            — mit{" "}
            <HoverLink
              light={light}
              previewKey="kiBilder"
              onHoverStart={handleHoverStart}
              onHoverMove={handleHoverMove}
              onHoverEnd={handleHoverEnd}
            >
              KI-Werbebildern
            </HoverLink>
            , die zu Flasche, Gastro und Saison passen, ohne dass du jedes Motiv Pixel für Pixel selbst bauen musst.
          </motion.p>

          <motion.p {...pMotion} transition={{ duration: 0.55, delay: 0.2 }} className="mb-8">
            Wenn du <strong className={cn("font-medium", light ? "text-zinc-900" : "text-zinc-200")}>wenig interne Zeit</strong>{" "}
            hast und klare Lieferobjekte willst, sind unsere{" "}
            <HoverLink
              light={light}
              previewKey="premium"
              onHoverStart={handleHoverStart}
              onHoverMove={handleHoverMove}
              onHoverEnd={handleHoverEnd}
            >
              Premium-Pakete
            </HoverLink>{" "}
            der ruhige Weg: Briefing, Umsetzung, fertige Assets.
          </motion.p>

          <motion.p {...pMotion} transition={{ duration: 0.55, delay: 0.32 }} className="mb-2">
            Teams mit regelmäßigem Output steigen ins{" "}
            <HoverLink
              light={light}
              previewKey="dashboard"
              onHoverStart={handleHoverStart}
              onHoverMove={handleHoverMove}
              onHoverEnd={handleHoverEnd}
            >
              Dashboard mit Token-Abo
            </HoverLink>{" "}
            — schnell, planbar, mit Markenprofil im Hintergrund. Details zum Ablauf:{" "}
            <a
              href="/ratgeber"
              className={cn(
                "font-medium underline underline-offset-2",
                light
                  ? "text-[#b45309] decoration-[#c65a20]/50 hover:text-[#9a3412]"
                  : "text-[#fbbf24] decoration-[#c65a20]/60 hover:text-amber-200",
              )}
            >
              Ratgeber-Quiz
            </a>
            , Entscheidungshilfe:{" "}
            <a
              href="/vergleich/premium-vs-dashboard-abo-brauerei"
              className={cn(
                "font-medium underline underline-offset-2",
                light
                  ? "text-[#b45309] decoration-[#c65a20]/50 hover:text-[#9a3412]"
                  : "text-[#fbbf24] decoration-[#c65a20]/60 hover:text-amber-200",
              )}
            >
              Premium vs. Abo
            </a>
            .
          </motion.p>
        </div>
      </div>

      <PreviewCard
        light={light}
        data={activePreview}
        position={position}
        isVisible={isVisible}
        cardRef={cardRef}
      />
    </div>
  );
}
