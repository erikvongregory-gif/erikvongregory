"use client";

import { ParloThemeProvider } from "@/components/neu/parlo/ParloTheme";
import { MotionChrome } from "@/components/neu-motion/MotionChrome";
import "@/components/neu/parlo/ParloTheme.css";
import "@/components/neu-motion/neu-motion.css";

export function ParloSiteFrame({
  children,
  perlage = "cta",
}: {
  children: React.ReactNode;
  perlage?: "hero" | "cta";
}) {
  return (
    <ParloThemeProvider>
      <MotionChrome perlage={perlage}>{children}</MotionChrome>
    </ParloThemeProvider>
  );
}
