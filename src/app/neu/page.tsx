import type { Metadata } from "next";
import { NeuHero } from "@/components/neu/NeuHero";
import { NeuTagline } from "@/components/neu/NeuTagline";
import { NeuFeature } from "@/components/neu/NeuFeature";
import { NeuStatement } from "@/components/neu/NeuStatement";
import { NeuDashboardGallery } from "@/components/neu/NeuDashboardGallery";
import { NeuMarkenprofil } from "@/components/neu/NeuMarkenprofil";
import { NeuPricing } from "@/components/neu/NeuPricing";
import { NeuCta } from "@/components/neu/NeuCta";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "BrewAI lässt Brauereien wachsen | KI-Content-System",
  description:
    "BrewAI ist das KI-Content-System für Brauereien: planbare Produktbilder und Social-Content für mehr Sichtbarkeit und klare Marken.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.baseUrl}/neu` },
  openGraph: {
    title: "BrewAI lässt Brauereien wachsen | KI-Content-System",
    description:
      "Planbare Produktbilder und Social-Content für Brauereien — mehr Sichtbarkeit, klare Marke, weniger Aufwand.",
    url: `${SITE.baseUrl}/neu`,
    type: "website",
    locale: "de_DE",
    images: SITE.ogImage
      ? [{ url: SITE.ogImage, width: 1200, height: 630, alt: "BrewAI" }]
      : undefined,
  },
};

export default function NeuHomePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/neu/hero-poster.webp"
        type="image/webp"
        fetchPriority="high"
      />
      <NeuHero />
      <NeuTagline />
      <NeuFeature />
      <NeuStatement />
      <NeuDashboardGallery />
      <NeuMarkenprofil />
      <NeuPricing />
      <NeuCta />
    </>
  );
}
