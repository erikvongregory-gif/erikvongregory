import type { Metadata } from "next";
import { NeuShell } from "@/components/neu/NeuShell";
import { NeuHeroStyles } from "@/components/neu/NeuHeroStyles";
import { NeuThemeProvider } from "@/components/neu/NeuTheme";
import { inter, instrumentSerif } from "@/components/neu/fonts";

export const metadata: Metadata = {
  title: "BrewAI",
  description: "Weiterleitung zur Startseite.",
  robots: { index: false, follow: true },
};

/** Layout für /neu/* Unterseiten (Impressum etc.) — Startseite redirected. */
export default function NeuLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${inter.variable} ${instrumentSerif.variable}`}
      style={{ fontFamily: "var(--font-velorah-sans), ui-sans-serif, sans-serif" }}
    >
      <NeuHeroStyles />
      <NeuThemeProvider>
        <NeuShell>{children}</NeuShell>
      </NeuThemeProvider>
    </div>
  );
}
