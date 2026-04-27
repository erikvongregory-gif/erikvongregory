import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Händler- und Gastro-Promotion für Brauereien | EvGlab",
  description:
    "Co-Branding-Content für Händler und Gastronomie: KI-Visuals in deinem Markenstil für Aktionen, Menüs und lokale Promotions.",
  keywords: [
    "Händler Promotion Brauerei",
    "Gastro Promotion Brauerei",
    "Co-Branding Content Brauerei",
    "KI Visuals Gastronomie",
  ],
  alternates: {
    canonical: `${SITE.baseUrl}/loesungen/haendler-gastro-promotion`,
  },
  openGraph: {
    title: "Händler- und Gastro-Promotion für Brauereien | EvGlab",
    description:
      "Co-Branding-Content für Handel und Gastro: KI-Visuals im Markenstil für Aktionen, Menüs und lokale Promotions.",
    type: "article",
    url: `${SITE.baseUrl}/loesungen/haendler-gastro-promotion`,
    images: SITE.ogImage ? [{ url: SITE.ogImage, width: 1200, height: 630, alt: "Händler- und Gastro-Promotion für Brauereien" }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "Händler- und Gastro-Promotion für Brauereien | EvGlab",
    description: "KI-gestützte Promotion-Visuals für Handel und Gastronomie im einheitlichen Markenlook.",
    images: SITE.ogImage ? [SITE.ogImage] : undefined,
  },
};

export default function HaendlerGastroPromotionPage() {
  const pageUrl = `${SITE.baseUrl}/loesungen/haendler-gastro-promotion`;
  const businessId = `${SITE.baseUrl}/#business`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Händler- und Gastro-Promotion mit KI-Content",
    serviceType: "Promotion-Content für Brauereien und Partner",
    provider: { "@id": businessId },
    areaServed: ["DE", "AT", "CH"],
    url: pageUrl,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: SITE.baseUrl },
      { "@type": "ListItem", position: 2, name: "Lösungen", item: `${SITE.baseUrl}/#loesungen` },
      { "@type": "ListItem", position: 3, name: "Händler und Gastro Promotion", item: pageUrl },
    ],
  };

  return (
    <main className="relative z-20 mx-auto max-w-4xl px-4 py-16 text-zinc-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <h1 className="text-3xl font-bold sm:text-4xl">Händler- & Gastro-Promotion mit KI-Content</h1>
      <p className="mt-4 text-zinc-700">
        Mit markenkonsistenten Co-Branding-Motiven unterstützt du Handel und Gastro-Partner bei Aktionen,
        Monatsangeboten und regionalen Schwerpunkten.
      </p>
      <ul className="mt-6 space-y-2 text-zinc-700">
        <li>• Promo-Visuals für POS, Social und Speisekarten</li>
        <li>• Einheitlicher Markenlook über alle Partner hinweg</li>
        <li>• Schneller Rollout neuer Aktionen in mehreren Varianten</li>
      </ul>
      <Link href="/#pakete-preise" className="mt-8 inline-flex text-sm font-semibold text-[#c65a20] hover:underline">
        Geeignetes Paket auswählen
      </Link>
    </main>
  );
}
