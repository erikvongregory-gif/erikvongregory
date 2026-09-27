import type { Metadata } from "next";
import { Geist_Mono, Syne } from "next/font/google";
import { ParloThemeProvider } from "@/components/neu/parlo/ParloTheme";
import "@/components/neu/parlo/ParloTheme.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-parlo-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-parlo-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BrewAI — KI-Content für Brauereien",
  description:
    "Markenprofil, Produktbilder und Social-Motive im Dashboard — Tokens, Mediathek und BrewAI-Chat für Brauereien in DACH.",
  robots: { index: false, follow: false },
};

export default function NeuLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${syne.variable} ${geistMono.variable}`}>
      <ParloThemeProvider>{children}</ParloThemeProvider>
    </div>
  );
}
