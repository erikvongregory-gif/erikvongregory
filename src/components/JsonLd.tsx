import { LEGAL } from "@/lib/legal";
import { SITE } from "@/lib/siteConfig";

/** JSON-LD Structured Data für bessere Google-Snippets */
export function JsonLd() {
  const businessId = `${SITE.baseUrl}/#business`;
  const websiteId = `${SITE.baseUrl}/#website`;
  const serviceId = `${SITE.baseUrl}/#service`;

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
    "@id": businessId,
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
    "@id": websiteId,
    name: SITE.name,
    description: SITE.defaultDescription,
    url: SITE.baseUrl,
    publisher: { "@id": businessId },
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

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId,
    serviceType: "KI Marketing für Brauereien",
    provider: { "@id": businessId },
    areaServed: ["DE", "AT", "CH"],
    audience: {
      "@type": "Audience",
      audienceType: "Brauereien, Gastronomie und Getränkehersteller",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Leistungen",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "KI-Produktfotos für Bier und Getränke" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "KI-Werbevideos für Social Media" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Automatisiertes Social-Media-Marketing" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Moderne Websites mit Storytelling" },
        },
      ],
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Was bietet ${SITE.name} für Brauereien?`,
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

  const safeJson = (obj: object) =>
    JSON.stringify(obj).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJson(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJson(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJson(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJson(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJson(faq) }}
      />
    </>
  );
}
