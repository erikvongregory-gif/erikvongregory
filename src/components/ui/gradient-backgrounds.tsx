import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

/** Ein einziger, klarer Seitenhintergrund (kein Blur, keine zweite Schicht) – wie von dir vorgegeben. */
const ORANGE_RADIAL_PAGE_BG: CSSProperties = {
  backgroundImage:
    "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #f59e0b 100%)",
  backgroundSize: "100% 100%",
};

export interface SiteGradientBackdropProps {
  className?: string;
}

/**
 * Fixierter Vollflächen-Hintergrund unter dem Inhalt (`z-0`).
 * Überall derselbe Orange-/Weiß-Radial; Shader-Ringe liegen in den Sections darüber.
 */
export function SiteGradientBackdrop({ className }: SiteGradientBackdropProps) {
  return (
    <div className={cn("fixed inset-0 z-0 overflow-hidden", className)} aria-hidden>
      <div className="absolute inset-0" style={ORANGE_RADIAL_PAGE_BG} />
    </div>
  );
}
