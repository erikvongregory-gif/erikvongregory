import type { Metadata } from "next";
import { NeuShell } from "@/components/neu/NeuShell";
import { NeuHeroStyles } from "@/components/neu/NeuHeroStyles";
import { NeuThemeProvider } from "@/components/neu/NeuTheme";
import { inter, instrumentSerif } from "@/components/neu/fonts";

export const metadata: Metadata = {
  title: "BrewAI",
  description: "Neu-Marketing Preview.",
  robots: { index: false, follow: false },
};

/** Layout für /neu Preview und Unterseiten. */
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
