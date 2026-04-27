import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "KI Saisonkampagne für Brauereien | EvGlab",
  description:
    "Saisonale Kampagnen für Brauereien mit KI-gestützten Produktbildern, Event-Motiven und Social-Content - schnell und markenkonstant umgesetzt.",
  keywords: [
    "KI Saisonkampagne Brauerei",
    "Saisonales Brauerei Marketing",
    "KI Kampagnenmotive Bier",
    "Brauerei Social Content",
  ],
  alternates: {
    canonical: `${SITE.baseUrl}/loesungen/saisonkampagne-brauerei`,
  },
  openGraph: {
    title: "KI Saisonkampagne für Brauereien | EvGlab",
    description:
      "Saisonale Kampagnenmotive für Brauereien: von Frühlingsbier bis Winteredition mit konsistenter Bildsprache und planbarer Umsetzung.",
    type: "article",
    url: `${SITE.baseUrl}/loesungen/saisonkampagne-brauerei`,
    images: SITE.ogImage ? [{ url: SITE.ogImage, width: 1200, height: 630, alt: "KI Saisonkampagne für Brauereien" }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "KI Saisonkampagne für Brauereien | EvGlab",
    description: "Planbare KI-Saisonkampagnen für Brauereien mit Premium-Visuals im Markenstil.",
    images: SITE.ogImage ? [SITE.ogImage] : undefined,
  },
};

export default function SaisonkampagneBrauereiPage() {
  const pageUrl = `${SITE.baseUrl}/loesungen/saisonkampagne-brauerei`;
  const businessId = `${SITE.baseUrl}/#business`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "KI Saisonkampagne für Brauereien",
    serviceType: "Saisonkampagnen-Content für Brauereien",
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
      { "@type": "ListItem", position: 3, name: "Saisonkampagne Brauerei", item: pageUrl },
    ],
  };

  return (
    <main className="relative z-20 mx-auto max-w-4xl px-4 py-16 text-zinc-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <h1 className="text-3xl font-bold sm:text-4xl">KI Saisonkampagnen für Brauereien</h1>
      <p className="mt-4 text-zinc-700">
        Von Frühlingsbier bis Winteredition: Mit einem klaren KI-Workflow entstehen Kampagnenmotive,
        Story-Varianten und Posting-Serien in deinem Markenstil.
      </p>
      <ul className="mt-6 space-y-2 text-zinc-700">
        <li>• Kampagnenmotive für mehrere Formate (Feed, Story, Ads)</li>
        <li>• Fester Produktionsrhythmus mit kurzen Feedback-Schleifen</li>
        <li>• Konsistente Bildsprache über die gesamte Saison hinweg</li>
      </ul>
      <Link href="/#pakete-preise" className="mt-8 inline-flex text-sm font-semibold text-[#c65a20] hover:underline">
        Passendes Paket ansehen
      </Link>
    </main>
  );
}
