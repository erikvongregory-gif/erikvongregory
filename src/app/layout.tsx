import type { Metadata } from "next";
import Script from "next/script";
import { ScrollHeader } from "@/components/ScrollHeader";
import { CookieBanner } from "@/components/CookieBanner";
import { ContactFunnel } from "@/components/ContactFunnel";
import { LoadingScreen } from "@/components/LoadingScreen";
import { LegalPageTheme } from "@/components/LegalPageTheme";
import { LoadingProvider } from "@/context/LoadingContext";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/siteConfig";
import "./globals.css";

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
    <html lang="de">
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
        <LoadingProvider>
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
        <footer id="contact" className="relative z-[70] border-t border-white/15 bg-transparent py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="font-bold text-white">{SITE.name}</p>
                <p className="mt-1 text-sm font-medium text-orange-200/90">
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
                    href="https://www.linkedin.com/in/erik-freiherr-von-gregory-22852b329"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 transition-colors hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Kontakt</p>
                <p className="mt-2 text-sm text-white/75">
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
                  className="text-sm text-white/70 transition-colors hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
                >
                  Impressum
                </a>
                <span className="mx-2 text-white/40">·</span>
                <a
                  href="/datenschutz"
                  className="text-sm text-white/70 transition-colors hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
                >
                  Datenschutz
                </a>
              </div>
            </div>
            <p className="mt-8 text-center text-sm text-white/60 sm:mt-12">© {SITE.name}</p>
          </div>
        </footer>
        </LoadingProvider>
      </body>
    </html>
  );
}
