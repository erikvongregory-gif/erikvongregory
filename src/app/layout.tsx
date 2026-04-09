import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import { LoadingProvider } from "@/context/LoadingContext";
import { JsonLd } from "@/components/JsonLd";
import { FaviconReminder } from "@/components/FaviconReminder";
import { SITE } from "@/lib/siteConfig";
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
        <AppShell>{children}</AppShell>
        </LoadingProvider>
      </body>
    </html>
  );
}
