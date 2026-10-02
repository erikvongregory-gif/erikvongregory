import type { Metadata } from "next";
import { MotionPage } from "@/components/neu-motion/MotionPage";
import { FAQS } from "@/components/neu/parlo/data";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: {
    absolute: "KI-Marketing für Brauereien: Bilder & Social-Content | BrewAI",
  },
  description:
    "KI-generierte Werbebilder und Social-Content für Brauereien — selbst im Dashboard oder fertig geliefert. Ab 79 €/Monat. Jetzt testen.",
  keywords: [
    "KI Marketing für Brauereien",
    "KI Marketing Agentur",
    "KI Content für Brauereien",
    "Brauerei Marketing",
    "Social Media Marketing Brauerei",
    "KI Produktfotos Bier",
    "KI Bilder für Brauerei Werbung",
    "Marketing Automatisierung Brauerei",
  ],
  alternates: { canonical: SITE.baseUrl },
  openGraph: {
    title: "KI-Marketing für Brauereien | BrewAI",
    description:
      "KI-Bilder und Social-Content für Brauereien — ab 79 €/Monat. Selbst im Dashboard oder fertig geliefert.",
    url: SITE.baseUrl,
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: `${SITE.baseUrl}${SITE.ogImage}`,
        width: 1200,
        height: 630,
        alt: "KI-Marketing für Brauereien | BrewAI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KI-Marketing für Brauereien | BrewAI",
    description: "KI-Bilder und Social-Content für Brauereien — ab 79 €/Monat.",
    images: [`${SITE.baseUrl}${SITE.ogImage}`],
  },
};

export default function Home() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    url: SITE.baseUrl,
    logo: SITE.brandLogoUrl,
    description:
      "KI-Marketing für Brauereien: Werbebilder, Social-Content und Markenprofil im Dashboard.",
    areaServed: ["DE", "AT", "CH"],
    knowsAbout: [
      "KI Marketing für Brauereien",
      "Social Media Marketing Brauerei",
      "KI Produktfotos Bier",
      "Produktfotos Bier und Getränke",
      "DACH Brauereimarketing",
    ],
    priceRange: "€€",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: "German",
    },
    sameAs: [SITE.linkedinUrl],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const siteNavigationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "SiteNavigationElement",
        position: 1,
        name: "Produkt",
        url: `${SITE.baseUrl}/#product`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "So funktioniert’s",
        url: `${SITE.baseUrl}/#how-it-works`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 3,
        name: "Motive",
        url: `${SITE.baseUrl}/#formats`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 4,
        name: "Funktionen",
        url: `${SITE.baseUrl}/#features`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 5,
        name: "Preise",
        url: `${SITE.baseUrl}/#pricing`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 6,
        name: "FAQ",
        url: `${SITE.baseUrl}/#faqs`,
      },
    ],
  };

  return (
    <>
      <h1 className="sr-only">
        KI-Marketing für Brauereien in Deutschland, Österreich und der Schweiz — Werbebilder und Social-Content
        mit {SITE.name}
      </h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationJsonLd) }}
      />
      <MotionPage />
    </>
  );
}
