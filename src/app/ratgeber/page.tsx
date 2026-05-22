import type { Metadata } from "next";
import { RatgeberPage } from "@/components/ratgeber/RatgeberPage";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Ratgeber: EvGlab-Wissenscheck für Brauereien",
  description:
    "Interaktiver Ratgeber-Quiz für Brauereien: finde in fünf Fragen heraus, ob Dashboard oder Premium-Umsetzung besser zu deinem Team passt.",
  alternates: { canonical: `${SITE.baseUrl}/ratgeber` },
  openGraph: {
    title: "Ratgeber: EvGlab-Wissenscheck",
    description:
      "Klickbarer Entscheidungs-Quiz für Brauereien in DACH mit direkter Empfehlung: Dashboard, Mixed oder Premium.",
    url: `${SITE.baseUrl}/ratgeber`,
    locale: "de_DE",
    type: "website",
  },
};

const ratgeberJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "EvGlab Ratgeber — Wissenscheck",
  description:
    "Fünf Fragen zu Zeit, Workflow und Zielbild — mit Empfehlung für Dashboard oder Premium-Umsetzung.",
  url: `${SITE.baseUrl}/ratgeber`,
  isPartOf: { "@type": "WebSite", name: "EvGlab", url: SITE.baseUrl },
};

export default function RatgeberIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ratgeberJsonLd) }} />
      <RatgeberPage />
    </>
  );
}
