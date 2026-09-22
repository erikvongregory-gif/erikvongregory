import type { Metadata } from "next";
import { UmfragePage } from "@/components/umfrage/UmfragePage";
import { UMFRAGE_META } from "@/content/umfrage";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `${UMFRAGE_META.title} | ${SITE.name}`,
  description:
    "Kurze Branchenumfrage: Wo verlieren Brauereien heute Zeit, Geld und Sichtbarkeit im Marketing? Ca. 3–4 Minuten. Ergebnisse anonymisiert als Barometer 2026.",
  alternates: { canonical: `${SITE.baseUrl}/umfrage` },
  openGraph: {
    title: UMFRAGE_META.title,
    description: UMFRAGE_META.subtitle,
    url: `${SITE.baseUrl}/umfrage`,
    locale: "de_DE",
    type: "website",
  },
};

const umfrageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: UMFRAGE_META.title,
  description: UMFRAGE_META.subtitle,
  url: `${SITE.baseUrl}/umfrage`,
  isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.baseUrl },
};

export default function UmfrageRoutePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(umfrageJsonLd) }}
      />
      <UmfragePage />
    </>
  );
}
