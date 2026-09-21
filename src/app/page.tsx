import type { Metadata } from "next";
import { ResponsiveHomeLayout } from "@/components/ResponsiveHomeLayout";
import { HomeMobileOnlySections } from "@/components/HomeMobileOnlySections";
import { SITE } from "@/lib/siteConfig";
import { TRESENGESPRAECH_FAQS } from "@/lib/tresengespraechFaqs";

export const metadata: Metadata = {
  title: "KI-Marketing für Brauereien: Bilder, Posts & Bewertungen | BrewAI",
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
  alternates: { canonical: SITE.baseUrl },
  openGraph: {
    title: "KI-Marketing für Brauereien | BrewAI",
    description:
      "KI-Bilder, Posts und Bewertungen für Brauereien — ab 79 €/Monat. Selbst im Dashboard oder fertig geliefert.",
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
    description: "KI-Bilder, Posts und Bewertungen für Brauereien — ab 79 €/Monat.",
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
    sameAs: [SITE.linkedinUrl],
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
        url: `${SITE.baseUrl}/#warum`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "Ablauf",
        url: `${SITE.baseUrl}/#prozess`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 3,
        name: "Leistungen",
        url: `${SITE.baseUrl}/#loesungen`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 4,
        name: "Preise",
        url: `${SITE.baseUrl}/#pakete`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 5,
        name: "Fragen",
        url: `${SITE.baseUrl}/#fragen`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 6,
        name: "Praxis",
        url: `${SITE.baseUrl}/#beispiele`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 7,
        name: "Ratgeber Wissenscheck",
        url: `${SITE.baseUrl}/ratgeber`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 8,
        name: "Über uns",
        url: `${SITE.baseUrl}/ueber-uns`,
      },
    ],
  };

  return (
    <>
      {/* LCP: Mobile-Hero-Poster (Video folgt nach LCP). Desktop lädt DesktopHero. */}
      <link
        rel="preload"
        as="image"
        href="/optimized/hero-poster-reel.webp"
        type="image/webp"
        fetchPriority="high"
        media="(max-width: 1023px)"
      />
      <h1 className="sr-only">
        KI-Marketing für Brauereien in Deutschland, Österreich und der Schweiz — Werbebilder, Social Media und
        Bewertungen mit {SITE.name}
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
      <HomeMobileOnlySections />
    </>
  );
}
