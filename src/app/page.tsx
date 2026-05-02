import type { Metadata } from "next";
import { AeoContentSection } from "@/components/AeoContentSection";
import { ResponsiveHomeLayout } from "@/components/ResponsiveHomeLayout";
import { PricingSection } from "@/components/PricingSection";
import { Section7AIDemo } from "@/components/Section7AIDemo";

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
  alternates: { canonical: "https://evglab.com" },
  openGraph: {
    title: "KI-Marketing für Brauereien | EvGlab",
    description:
      "KI-Bilder, Posts und Bewertungen für Brauereien — ab 79 €/Monat. Selbst im Dashboard oder fertig geliefert.",
    url: "https://evglab.com",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "https://evglab.com/og/evglab-og.jpg",
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
    images: ["https://evglab.com/og/evglab-og.jpg"],
  },
};

export default function Home() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "EvGlab",
    url: "https://evglab.com",
    logo: "https://evglab.com/logo.svg",
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
    mainEntity: [
      {
        "@type": "Question",
        name: "Wie schnell sehe ich erste Ergebnisse?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Erste fertige Bilder und Posts innerhalb von 3–5 Tagen nach Bestellung. Im Dashboard-Abo sofort nach dem Login.",
        },
      },
      {
        "@type": "Question",
        name: "Ist das Risiko gering, wenn ich starte?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja. Pakete sind einmalig ohne Abo-Bindung. Das Dashboard-Abo ist monatlich kündbar. Kein Vertrag, kein Kleingedrucktes.",
        },
      },
      {
        "@type": "Question",
        name: "Wie viel Aufwand habe ich intern wirklich?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bei Paketen fast null — du schickst Logo und Briefing, wir liefern. Im Dashboard ca. 5–15 Minuten pro Post.",
        },
      },
      {
        "@type": "Question",
        name: "Kann ich später hoch- oder runterwechseln?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, jederzeit zum Monatsende. Kein Aufpreis, kein Prozess.",
        },
      },
      {
        "@type": "Question",
        name: "Sind die Inhalte wirklich in meinem Markenstil?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja. Du hinterlegst einmal dein Markenprofil (Logo, Tonalität, Farbschema) — alle Bilder und Texte werden konsistent in deinem Stil ausgespielt.",
        },
      },
    ],
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
        name: "Lösungen",
        url: "https://www.evglab.com/#loesungen",
      },
      {
        "@type": "SiteNavigationElement",
        position: 3,
        name: "Pakete",
        url: "https://www.evglab.com/#pakete",
      },
      {
        "@type": "SiteNavigationElement",
        position: 4,
        name: "Beispiele",
        url: "https://www.evglab.com/#beispiele",
      },
      {
        "@type": "SiteNavigationElement",
        position: 5,
        name: "Ratgeber KI-Marketing",
        url: "https://www.evglab.com/ratgeber/marketing-inhalte-mit-ki",
      },
      {
        "@type": "SiteNavigationElement",
        position: 6,
        name: "Premium vs. Dashboard-Abo",
        url: "https://www.evglab.com/vergleich/premium-vs-dashboard-abo-brauerei",
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
      <ResponsiveHomeLayout />
      <PricingSection />
      <Section7AIDemo />
      <AeoContentSection />
    </>
  );
}
