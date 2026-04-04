"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Beer, Clock, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { scrollToSection } from "@/lib/scrollToSection";
import { cn } from "@/lib/utils";

/** shadcn Insurance-Card Prompt: helle Karte, Zinc-Typo, Header/Footer muted */
const cardShell =
  "insurance-card-ui w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white text-zinc-900 shadow-lg";

const headerShell =
  "border-b border-zinc-200 bg-zinc-100/80 p-6";

const footerShell = "border-t border-zinc-200 bg-zinc-100/80 p-6";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-zinc-500">{label}</span>
      <span className="text-sm font-semibold leading-snug text-zinc-900">
        {value}
      </span>
    </div>
  );
}

type Layout = "grid" | "stack";

const easeOutSoft: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Langsamer Zoom nur auf Desktop (≥768px + echtes Hover, feine Zeiger) */
const section2CardHoverDesktop = { scale: 1.035, y: -5 };

const section2CardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 as const },
  transition: {
    opacity: { duration: 0.5, ease: easeOutSoft },
    y: { duration: 0.5, ease: easeOutSoft },
    scale: { type: "tween" as const, duration: 1.05, ease: easeOutSoft },
  },
  whileTap: { scale: 0.992 },
};

function useDesktopHoverZoom() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine)",
    );
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return enabled;
}

export function Section2BreweryCards({
  layout = "grid",
  className,
}: {
  layout?: Layout;
  className?: string;
}) {
  const desktopHoverZoom = useDesktopHoverZoom();

  const gridClass =
    layout === "grid"
      ? "mx-auto grid w-full max-w-7xl grid-cols-1 justify-items-center gap-6 px-4 lg:grid-cols-2 lg:gap-8 lg:px-6"
      : "mx-auto flex w-full max-w-md flex-col items-center gap-6 px-4";

  return (
    <div className={cn(gridClass, className)}>
      <motion.div
        {...section2CardMotion}
        whileHover={desktopHoverZoom ? section2CardHoverDesktop : undefined}
        className="section2-box-slide section2-box-left flex min-w-0 origin-center justify-center transform-gpu will-change-transform"
      >
        <Card className={cn(cardShell, "border-zinc-900/10")}>
          <CardHeader
            className={cn(headerShell, "flex flex-row items-start gap-3")}
          >
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white bg-zinc-200 text-zinc-600 shadow-sm"
              aria-hidden
            >
              <Beer className="h-7 w-7" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-zinc-500">
                <Clock className="h-4 w-4 shrink-0" aria-hidden />
                <span className="text-xs font-medium">Marktlage</span>
              </div>
              <p className="mt-1 text-base font-bold text-zinc-950">
                Biermarkt{" "}
                <span className="text-orange-600">−6&nbsp;%</span>
              </p>
              <p className="text-xs text-zinc-500">
                Sichtbarkeit entscheidet.
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              <InfoRow label="Thema" value="Online kaum sichtbar" />
              <InfoRow label="Social" value="Zu wenig aktiv" />
              <InfoRow label="Werbung" value="Teuer, wenig Wirkung" />
              <InfoRow label="Content" value="Keine Kapazität" />
              <InfoRow label="Website" value="Wirkt veraltet" />
              <InfoRow label="KI-Hebel" value="Fotos · Video · Posts" />
            </div>
            <div className="border-t border-zinc-200 pt-4">
              <InfoRow
                label="Chance"
                value="Regelmäßig sichtbar ohne Vollzeit-Marketing"
              />
            </div>
          </CardContent>

          <CardFooter className={footerShell}>
            <Button asChild variant="neutral" className="w-full rounded-md">
              <Link
                href="#section-4"
                scroll={false}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#section-4");
                }}
              >
                Wie funktioniert es?
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div
        {...section2CardMotion}
        whileHover={desktopHoverZoom ? section2CardHoverDesktop : undefined}
        transition={{
          ...section2CardMotion.transition,
          opacity: { ...section2CardMotion.transition.opacity, delay: 0.06 },
          y: { ...section2CardMotion.transition.y, delay: 0.06 },
        }}
        className="section2-box-slide section2-box-right flex min-w-0 origin-center justify-center transform-gpu will-change-transform"
      >
        <Card className={cardShell}>
          <CardHeader
            className={cn(headerShell, "flex flex-row items-start gap-3")}
          >
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white bg-zinc-200 text-zinc-600 shadow-sm"
              aria-hidden
            >
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-zinc-500">
                <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
                <span className="text-xs font-medium">Ansprechpartner</span>
              </div>
              <p className="mt-1 text-base font-bold text-zinc-950">
                EvGlab – Marketing für Brauereien
              </p>
              <p className="text-xs text-zinc-500">
                Brauerei- und Gastro-Hintergrund, heute mit KI im Alltag.
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              <InfoRow label="Herkunft" value="Brauerei & Gastronomie" />
              <InfoRow label="Schwerpunkt" value="Sichtbarkeit & Anfragen" />
              <InfoRow label="Verständnis" value="Bier, Gäste, Handel" />
              <InfoRow label="Ansatz" value="KI nur wo es wirklich hilft" />
              <InfoRow label="Technik" value="Hosting in Deutschland" />
              <InfoRow label="Datenschutz" value="DSGVO-konform" />
            </div>
            <div className="border-t border-zinc-200 pt-4">
              <InfoRow
                label="Versprechen"
                value="Konkrete Schritte statt Folien-Show"
              />
            </div>
          </CardContent>

          <CardFooter className={footerShell}>
            <Button asChild variant="neutral" className="w-full rounded-md">
              <Link href="#contact">Erstgespräch starten</Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
