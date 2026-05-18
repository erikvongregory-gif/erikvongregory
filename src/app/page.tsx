import type { Metadata } from "next";
import { ResponsiveHomeLayout } from "@/components/ResponsiveHomeLayout";
import { PricingSection } from "@/components/PricingSection";
import { Section7AIDemo } from "@/components/Section7AIDemo";
import { SITE } from "@/lib/siteConfig";
import { TRESENGESPRAECH_FAQS } from "@/lib/tresengespraechFaqs";

export const metadata: Metadata = {
  title: "KI-Marketing für Brauereien: Bilder, Posts & Bewertungen | EvGlab",
  description:
    "KI-generierte Werbebilder, Social-Media-Posts und Google-Bewertungen für Brauereien — selbst im Dashboard oder fertig geliefert. Ab 79 €/Monat. Jetzt testen.",
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
  alternates: { canonical: "https://www.evglab.com" },
  openGraph: {
    title: "KI-Marketing für Brauereien | EvGlab",
    description:
      "KI-Bilder, Posts und Bewertungen für Brauereien — ab 79 €/Monat. Selbst im Dashboard oder fertig geliefert.",
    url: "https://www.evglab.com",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "https://www.evglab.com/og/evglab-og.jpg",
        width: 1200,
        height: 630,
        alt: "KI-Marketing für Brauereien | EvGlab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KI-Marketing für Brauereien | EvGlab",
    description: "KI-Bilder, Posts und Bewertungen für Brauereien — ab 79 €/Monat.",
    images: ["https://www.evglab.com/og/evglab-og.jpg"],
  },
};

export default function Home() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "EvGlab",
    url: "https://www.evglab.com",
    logo: SITE.brandLogoUrl,
    description:
      "KI-Marketing für Brauereien: Werbebilder, Social-Media-Posts und Google-Bewertungsmanagement.",
    areaServed: ["DE", "AT", "CH"],
    knowsAbout: [
      "KI Marketing für Brauereien",
      "Social Media Marketing Brauerei",
      "Google Bewertungen Brauerei",
      "Produktfotos Bier und Getränke",
      "DACH Brauereimarketing",
    ],
    priceRange: "€€",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: "German",
    },
    sameAs: ["https://www.linkedin.com/in/erik-freiherr-von-gregory-22852b329"],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: TRESENGESPRAECH_FAQS.map((faq) => ({
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
        name: "Warum",
        url: "https://www.evglab.com/#warum",
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "Ablauf",
        url: "https://www.evglab.com/#prozess",
      },
      {
        "@type": "SiteNavigationElement",
        position: 3,
        name: "Leistungen",
        url: "https://www.evglab.com/#loesungen",
      },
      {
        "@type": "SiteNavigationElement",
        position: 4,
        name: "Preise",
        url: "https://www.evglab.com/#pakete",
      },
      {
        "@type": "SiteNavigationElement",
        position: 5,
        name: "Fragen",
        url: "https://www.evglab.com/#fragen",
      },
      {
        "@type": "SiteNavigationElement",
        position: 6,
        name: "Praxis",
        url: "https://www.evglab.com/#beispiele",
      },
      {
        "@type": "SiteNavigationElement",
        position: 7,
        name: "Ratgeber Wissenscheck",
        url: "https://www.evglab.com/ratgeber",
      },
      {
        "@type": "SiteNavigationElement",
        position: 8,
        name: "Über uns",
        url: "https://www.evglab.com/ueber-uns",
      },
    ],
  };

  return (
    <>
      <h1 className="sr-only">
        KI-Marketing für Brauereien in Deutschland, Österreich und der Schweiz — Werbebilder, Social Media und
        Bewertungen mit EvGlab
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
      {/* Eigener Hero-Band: auch wenn dynamische Layouts noch laden, bleibt #pakete unterhalb des ersten Viewports. */}
      <div className="min-h-[100dvh] w-full min-w-0">
        <ResponsiveHomeLayout />
      </div>
      <PricingSection />
      <Section7AIDemo />
    </>
  );
}
