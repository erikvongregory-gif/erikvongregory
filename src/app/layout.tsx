import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono, Newsreader, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AppShell } from "@/components/AppShell";
import { SiteSmoothScroll } from "@/components/site-smooth-scroll";
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

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-newsreader",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter-tight",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

const ICON_VERSION = "20260514a";

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
  alternates: {
    canonical: SITE.baseUrl,
    languages: {
      "de-DE": SITE.baseUrl,
      "x-default": SITE.baseUrl,
    },
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${playfair.variable} ${newsreader.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          // Run as early as possible to avoid one-frame scroll flash on "/".
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if("scrollRestoration" in window.history){window.history.scrollRestoration="manual";}var shouldReset=window.location.pathname==="/"&&!window.location.hash;function forceTop(){window.scrollTo({top:0,left:0,behavior:"auto"});if(document.documentElement){document.documentElement.scrollTop=0;}if(document.body){document.body.scrollTop=0;}}if(shouldReset){var style=document.createElement("style");style.setAttribute("data-scroll-reset-style","1");style.textContent='html{scroll-behavior:auto !important;}';document.head.appendChild(style);forceTop();var frames=0;var released=false;var release=function(){if(released)return;released=true;if(style&&style.parentNode){style.parentNode.removeChild(style);}};var tick=function(){forceTop();frames+=1;if(frames<28){requestAnimationFrame(tick);}else{release();}};requestAnimationFrame(tick);setTimeout(release,1400);}window.addEventListener("pageshow",function(){if(window.location.pathname==="/"&&!window.location.hash){window.scrollTo({top:0,left:0,behavior:"auto"});}}, { passive: true });}catch(_e){}})();`,
          }}
        />
      </head>
      <body className="bg-[#0a0f14] text-neutral-900 antialiased">
        <SiteSmoothScroll />
        <JsonLd />
        <FaviconReminder />
        <LoadingProvider>
          <AppShell>{children}</AppShell>
        </LoadingProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
