import type { Metadata } from "next";
import { DesktopLayout } from "@/components/DesktopLayout";
import { MobileLayout } from "@/components/MobileLayout";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { PricingSection } from "@/components/PricingSection";
import { Section7AIDemo } from "@/components/Section7AIDemo";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "KI Marketing für Brauereien, Gastronomie & Getränkehersteller",
  description:
    "KI-Marketing für Brauereien: Produktfotos, Werbevideos, Social-Media-Content und automatisierte Systeme für mehr Reichweite, Sichtbarkeit und Anfragen.",
  alternates: { canonical: SITE.baseUrl },
  openGraph: {
    title: "KI Marketing für Brauereien | EvGlab",
    description:
      "KI-Produktfotos, Werbevideos und automatisiertes Social Media Marketing für Brauereien und Getränkemarken.",
    url: SITE.baseUrl,
    type: "website",
    images: SITE.ogImage ? [{ url: SITE.ogImage, width: 1200, height: 630, alt: "EvGlab – KI Marketing für Brauereien" }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "KI Marketing für Brauereien | EvGlab",
    description:
      "KI-Produktfotos, Werbevideos und automatisiertes Social Media Marketing für Brauereien.",
    images: SITE.ogImage ? [SITE.ogImage] : undefined,
  },
};

export default function Home() {
  return (
    <>
      {/* Mobile: reines CSS (unter 768px) – portrait oben */}
      <div id="mobile-content" className="mobile-root block md:hidden">
        <main id="main" className="relative min-h-screen overflow-x-hidden pt-14 sm:pt-16">
          <MobileLayout />
        </main>
        <MobileStickyCTA />
      </div>
      {/* Desktop/Tablet: ab 768px */}
      <div id="desktop-content" className="hidden md:block">
        <DesktopLayout />
      </div>
      <PricingSection />
      <Section7AIDemo />
    </>
  );
}
