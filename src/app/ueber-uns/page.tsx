import type { Metadata } from "next";
import { AboutPage } from "@/components/ueber-uns/AboutPage";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Über BrewAI — KI-Marketing für Brauereien in DACH",
  description:
    "Wer wir sind, für wen BrewAI da ist: KI-Werbebilder, Social-Content und Bewertungen für Brauereien und Getränkemarken in Deutschland, Österreich und der Schweiz.",
  alternates: { canonical: `${SITE.baseUrl}/ueber-uns` },
  openGraph: {
    title: "Über BrewAI | KI-Marketing für Brauereien",
    description:
      "Team, Ausrichtung und Kontakt — BrewAI richtet sich an Brauereien und Getränkemarken in DACH.",
    url: `${SITE.baseUrl}/ueber-uns`,
    type: "website",
    locale: "de_DE",
    images: SITE.ogImage ? [{ url: SITE.ogImage, width: 1200, height: 630, alt: "BrewAI Über uns" }] : undefined,
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Über BrewAI",
  description:
    "BrewAI bietet KI-Marketing für Brauereien und Getränkemarken in Deutschland, Österreich und der Schweiz.",
  url: `${SITE.baseUrl}/ueber-uns`,
  isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.baseUrl },
};

export default function UeberUnsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />
      <AboutPage />
    </>
  );
}
