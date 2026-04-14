import type { Metadata } from "next";
import { ResponsiveHomeLayout } from "@/components/ResponsiveHomeLayout";
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
      <ResponsiveHomeLayout />
      <PricingSection />
      <Section7AIDemo />
    </>
  );
}
