import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import { ScrollHeader } from "@/components/ScrollHeader";
import { CookieBanner } from "@/components/CookieBanner";
import { LoadingScreen } from "@/components/LoadingScreen";
import { LegalPageTheme } from "@/components/LegalPageTheme";
import "./globals.css";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0f14",
};

export const metadata: Metadata = {
  title: "Erik von Gregory | KI für Brauereien & Gastronomie",
  robots: { index: false, follow: false },
  description:
    "Erik von Gregory – bündig, direkt. KI für Brauereien, Gastronomie und Getränkehersteller. Automatisierte Marketing, Content & Verkauf.",
  openGraph: {
    title: "Erik von Gregory | KI für Brauereien & Gastronomie",
    description:
      "KI für Brauereien, Gastronomie und Getränkehersteller. Automatisierte Marketing, Content & Verkauf.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className={`${redHatDisplay.className} overflow-x-hidden bg-[#0a0f14] text-neutral-900 antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#14532d] focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          Zum Inhalt springen
        </a>
        <LoadingScreen />
        <CookieBanner />
        <LegalPageTheme />
        <ScrollHeader />
        {children}
        <footer id="contact" className="relative border-t border-white/15 bg-transparent py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="font-bold text-white">Erik von Gregory</p>
                <p className="mt-1 text-sm font-medium text-emerald-200/80">
                  KI für Brauereien & Gastronomie
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  Bündig. Direkt. Fokussiert auf Automatisierung von Marketing, Content und Verkauf.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Social</p>
                <div className="mt-2 flex gap-4">
                  <a
                    href="#"
                    className="text-sm text-white/70 transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="text-sm text-white/70 transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
                  >
                    X
                  </a>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Kontakt</p>
                <p className="mt-2 text-sm text-white/75">
                  Kostenloses Erstgespräch – unverbindlich & direkt.
                </p>
                <a
                  href="mailto:kontakt@erikvongregory.de"
                  className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#14532d] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#166534] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05100d]"
                >
                  E-Mail schreiben
                </a>
              </div>
              <div>
                <a
                  href="/impressum"
                  className="text-sm text-white/70 transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
                >
                  Impressum
                </a>
                <span className="mx-2 text-white/40">·</span>
                <a
                  href="/datenschutz"
                  className="text-sm text-white/70 transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
                >
                  Datenschutz
                </a>
              </div>
            </div>
            <p className="mt-8 text-center text-sm text-white/60 sm:mt-12">© Erik von Gregory</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
