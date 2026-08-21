import type { Metadata } from "next";
import { Inter_Tight, Newsreader } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import { DeferredClientChrome } from "@/components/DeferredClientChrome";
import { SiteSmoothScroll } from "@/components/site-smooth-scroll";
import { LoadingProvider } from "@/context/LoadingContext";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/siteConfig";
import "./globals.css";

/** Weniger Fonts = weniger Render-Blocking (PSI). Mono → System-Stack. */
const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  preload: true,
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

const ICON_VERSION = "20260612a";

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
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    languages: {
      "de-DE": SITE.baseUrl,
      "x-default": SITE.baseUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.baseUrl,
    siteName: SITE.name,
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    images: SITE.ogImage
      ? [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    images: SITE.ogImage ? [SITE.ogImage] : undefined,
  },
  category: "Business",
  icons: {
    icon: [
      { url: `/favicon.ico?v=${ICON_VERSION}`, sizes: "any" },
      { url: `/icon.svg?v=${ICON_VERSION}`, type: "image/svg+xml" },
      { url: `/icon.png?v=${ICON_VERSION}`, sizes: "512x512", type: "image/png" },
    ],
    shortcut: [`/favicon.ico?v=${ICON_VERSION}`],
    apple: [{ url: `/apple-icon.png?v=${ICON_VERSION}`, sizes: "180x180", type: "image/png" }],
  },
  manifest: `/manifest.json?v=${ICON_VERSION}`,
  ...(SITE.googleSiteVerification?.trim() && {
    verification: { google: SITE.googleSiteVerification.trim() },
  }),
  ...(SITE.bingSiteVerification?.trim() && {
    other: {
      "msvalidate.01": SITE.bingSiteVerification.trim(),
    },
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${newsreader.variable} ${interTight.variable}`}
    >
      <body className="bg-paper text-neutral-900 antialiased">
        <SiteSmoothScroll />
        <JsonLd />
        <LoadingProvider>
          <AppShell>{children}</AppShell>
        </LoadingProvider>
        <DeferredClientChrome />
      </body>
    </html>
  );
}
