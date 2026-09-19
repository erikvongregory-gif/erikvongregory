"use client";

import { BlurText, type BlurTextProps } from "@/components/ui/blur-text-animation";
import { useNeuTheme } from "@/components/neu/NeuTheme";

type NeuRevealTextProps = Omit<BlurTextProps, "tone"> & {
  /** Erzwingt Ton (z. B. immer onDark über Video). Sonst Theme. */
  tone?: BlurTextProps["tone"];
};

/**
 * EVG-Lab-Blur-Reveal für /neu — Tone folgt Hell/Dunkel, außer überschrieben.
 */
export function NeuRevealText({ tone, ...props }: NeuRevealTextProps) {
  const { theme } = useNeuTheme();
  const resolved = tone ?? (theme === "light" ? "onLight" : "onDark");
  return <BlurText {...props} tone={resolved} />;
}
