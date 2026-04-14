import type { Metadata } from "next";
import { DesktopLayout } from "@/components/DesktopLayout";
import { MobileLayout } from "@/components/MobileLayout";
import { PricingSection } from "@/components/PricingSection";
import { Section7AIDemo } from "@/components/Section7AIDemo";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Das KI-Content-System für Brauereien | EvGlab",
  description:
    "EvGlab ist das KI-Content-System für Brauereien: KI-Produktfotos, Kampagnen und Social-Content mit planbarer Umsetzung für mehr Sichtbarkeit und Abschlüsse.",
  alternates: { canonical: SITE.baseUrl },
  openGraph: {
    title: "Das KI-Content-System für Brauereien | EvGlab",
    description:
      "Planbarer KI-Content für Brauereien: Produktfotos, Kampagnenmotive und Social-Content auf Premium-Niveau.",
    url: SITE.baseUrl,
    type: "website",
    images: SITE.ogImage ? [{ url: SITE.ogImage, width: 1200, height: 630, alt: "EvGlab – KI Marketing für Brauereien" }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "Das KI-Content-System für Brauereien | EvGlab",
    description:
      "Planbarer KI-Content für Brauereien mit messbarer Markenwirkung.",
    images: SITE.ogImage ? [SITE.ogImage] : undefined,
  },
};

export default function Home() {
  return (
    <>
      {/* Mobile: unter 768px – gleicher Hero wie Desktop, angepasst */}
      <div id="mobile-content" className="mobile-root block md:hidden">
        <main
          id="main"
          className="relative min-h-[100dvh] overflow-x-hidden bg-transparent pt-14 sm:pt-16"
        >
          <MobileLayout />
        </main>
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
