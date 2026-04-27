import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Biergarten- und Event-Marketing mit KI | EvGlab",
  description:
    "Mehr Besucher für Ausschanktage, Verkostungen und Biergarten-Events durch planbare Kampagnenmotive und Social-Content speziell für Brauereien.",
  keywords: [
    "Biergarten Marketing Brauerei",
    "Event Marketing Brauerei",
    "KI Event Kampagnen Bier",
    "Brauerei Event Visuals",
  ],
  alternates: {
    canonical: `${SITE.baseUrl}/loesungen/biergarten-event-marketing`,
  },
  openGraph: {
    title: "Biergarten- und Event-Marketing mit KI | EvGlab",
    description:
      "Planbare Event-Visuals für Brauereien: Ankündigung, Reminder und Nachbereitung für mehr Besucher bei Ausschank und Verkostung.",
    type: "article",
    url: `${SITE.baseUrl}/loesungen/biergarten-event-marketing`,
    images: SITE.ogImage ? [{ url: SITE.ogImage, width: 1200, height: 630, alt: "Biergarten- und Event-Marketing mit KI" }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "Biergarten- und Event-Marketing mit KI | EvGlab",
    description: "Mehr Besucher für Brauerei-Events mit planbaren KI-Kampagnenmotiven.",
    images: SITE.ogImage ? [SITE.ogImage] : undefined,
  },
};

export default function BiergartenEventMarketingPage() {
  const pageUrl = `${SITE.baseUrl}/loesungen/biergarten-event-marketing`;
  const businessId = `${SITE.baseUrl}/#business`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Biergarten- und Event-Marketing mit KI",
    serviceType: "Event-Marketing Content für Brauereien",
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
      { "@type": "ListItem", position: 3, name: "Biergarten und Event Marketing", item: pageUrl },
    ],
  };

  return (
    <main className="relative z-20 mx-auto max-w-4xl px-4 py-16 text-zinc-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <h1 className="text-3xl font-bold sm:text-4xl">Biergarten- & Event-Marketing für Brauereien</h1>
      <p className="mt-4 text-zinc-700">
        Für Events zählt Timing. EvGlab liefert die passenden Visuals für Ankündigung, Reminder und Nachbereitung -
        ohne Design-Stau im Tagesgeschäft.
      </p>
      <ul className="mt-6 space-y-2 text-zinc-700">
        <li>• Event-Visuals für Social, Website und Partnerkanäle</li>
        <li>• Reminder-Serien für bessere Besucherquote</li>
        <li>• Wiederverwendbare Vorlagen für kommende Veranstaltungen</li>
      </ul>
      <Link href="/#contact" className="mt-8 inline-flex text-sm font-semibold text-[#c65a20] hover:underline">
        Event-Kampagne anfragen
      </Link>
    </main>
  );
}
