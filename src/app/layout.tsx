import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import { ScrollHeader } from "@/components/ScrollHeader";
import { CookieBanner } from "@/components/CookieBanner";
import { ContactFunnel } from "@/components/ContactFunnel";
import { LoadingScreen } from "@/components/LoadingScreen";
import { LegalPageTheme } from "@/components/LegalPageTheme";
import { LoadingProvider } from "@/context/LoadingContext";
import { JsonLd } from "@/components/JsonLd";
import { FaviconReminder } from "@/components/FaviconReminder";
import { SITE } from "@/lib/siteConfig";
import { SiteGradientBackdrop } from "@/components/ui/gradient-backgrounds";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0f14",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.baseUrl),
  title: {
    default: SITE.defaultTitle,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.defaultDescription,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE.baseUrl }],
  creator: SITE.name,
  publisher: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: SITE.baseUrl },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE.baseUrl,
    siteName: SITE.name,
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    images: SITE.ogImage ? [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    images: SITE.ogImage ? [SITE.ogImage] : undefined,
  },
  category: "Business",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
  },
  manifest: "/manifest.json",
  ...(SITE.googleSiteVerification?.trim() && {
    verification: { google: SITE.googleSiteVerification.trim() },
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preload" href="/hero-portrait.svg" as="image" />
      </head>
      <Script
        id="scroll-to-top-on-load"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `if('scrollRestoration'in history)history.scrollRestoration='manual';window.scrollTo(0,0);`,
        }}
      />
      <Script
        id="chunk-load-error-handler"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(){function isChunkError(e){var m=e&&(e.message||e.reason&&e.reason.message||'');return /Loading chunk|ChunkLoadError|Failed to load chunk|Loading CSS chunk/i.test(m)||(m&&m.indexOf('_next/static')!==-1);}function tryReload(){if(!sessionStorage.getItem('chunkReload')){sessionStorage.setItem('chunkReload','1');location.reload();}}window.addEventListener('error',function(ev){if(isChunkError(ev)){ev.preventDefault();tryReload();}},true);window.addEventListener('unhandledrejection',function(ev){if(isChunkError(ev.reason)){ev.preventDefault();tryReload();}});setTimeout(function(){sessionStorage.removeItem('chunkReload');},3000);})();`,
        }}
      />
      <body className="bg-[#0a0f14] text-neutral-900 antialiased">
        <JsonLd />
        <FaviconReminder />
        <LoadingProvider>
        <SiteGradientBackdrop />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#14532d] focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          Zum Inhalt springen
        </a>
        <LoadingScreen />
        <ContactFunnel />
        <CookieBanner />
        <LegalPageTheme />
        <ScrollHeader />
        {children}
        <footer id="contact" className="relative z-[70] border-t border-zinc-200/80 bg-transparent py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="font-bold text-zinc-900">{SITE.name}</p>
                <p className="mt-1 text-sm font-medium text-[#b45309]">
                  KI für Brauereien & Gastronomie
                </p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                  Bündig. Direkt. Fokussiert auf Automatisierung von Marketing, Content und Verkauf.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-800">Social</p>
                <div className="mt-2 flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/erik-freiherr-von-gregory-22852b329"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#b45309] transition-colors hover:text-[#c65a20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-800">Kontakt</p>
                <p className="mt-2 text-sm text-zinc-600">
                  Kostenloses Erstgespräch – unverbindlich & direkt.
                </p>
                <a
                  href="#contact"
                  className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#c65a20] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#d46830] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
                >
                  E-Mail schreiben
                </a>
              </div>
              <div>
                <a
                  href="/impressum"
                  className="text-sm text-[#b45309] transition-colors hover:text-[#c65a20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
                >
                  Impressum
                </a>
                <span className="mx-2 text-zinc-300" aria-hidden>
                  ·
                </span>
                <a
                  href="/datenschutz"
                  className="text-sm text-[#b45309] transition-colors hover:text-[#c65a20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
                >
                  Datenschutz
                </a>
              </div>
            </div>
            <p className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-zinc-500 sm:mt-12">
              <span>
                © {new Date().getFullYear()} {SITE.name}
              </span>
              <span className="text-zinc-300" aria-hidden>
                ·
              </span>
              <span>Alle Rechte vorbehalten.</span>
              <span className="text-zinc-300" aria-hidden>
                ·
              </span>
              <span className="max-w-[min(100%,42rem)] text-zinc-500">
                Texte, Bilder und sonstige Inhalte dieser Website unterliegen dem Urheberrecht;
                Vervielfältigung nur mit Zustimmung.
              </span>
            </p>
          </div>
        </footer>
        </LoadingProvider>
      </body>
    </html>
  );
}
