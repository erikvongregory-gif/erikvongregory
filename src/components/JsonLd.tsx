import { LEGAL } from "@/lib/legal";
import { SITE } from "@/lib/siteConfig";

/** JSON-LD Structured Data für bessere Google-Snippets */
export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: LEGAL.name,
    url: SITE.baseUrl,
    email: LEGAL.email,
    jobTitle: "KI-Berater für Brauereien & Gastronomie",
    description: SITE.defaultDescription,
    knowsAbout: ["KI Marketing", "Brauerei Marketing", "Content Marketing", "Automatisierung"],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.baseUrl}/#business`,
    name: SITE.name,
    description: SITE.defaultDescription,
    url: SITE.baseUrl,
    email: LEGAL.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: LEGAL.street,
      addressLocality: "Fuchstal",
      postalCode: "86925",
      addressCountry: "DE",
    },
    priceRange: "€€",
    areaServed: ["Deutschland", "Österreich", "Schweiz"],
    image: `${SITE.baseUrl}/hero-portrait.svg`,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.baseUrl}/#website`,
    name: SITE.name,
    description: SITE.defaultDescription,
    url: SITE.baseUrl,
    publisher: { "@id": `${SITE.baseUrl}/#business` },
    inLanguage: "de-DE",
    potentialAction: {
      "@type": "ContactAction",
      target: { "@type": "EntryPoint", url: `${SITE.baseUrl}/#contact` },
      contactPoint: {
        "@type": "ContactPoint",
        email: LEGAL.email,
        contactType: "customer service",
        availableLanguage: "German",
      },
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Was bietet Erik von Gregory für Brauereien?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "KI-gestützte Content-Systeme, Werbevideos, automatisiertes Marketing, KI-Produktfotos und moderne Websites für Brauereien, Gastronomen und Getränkehersteller.",
        },
      },
      {
        "@type": "Question",
        name: "Wie können Brauereien KI für Marketing nutzen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mit KI-Produktfotos, automatisiertem Social Media Marketing, KI-Werbevideos und Content für Instagram, TikTok und Ads – ohne teure Agentur.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}
