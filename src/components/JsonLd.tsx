import { LEGAL } from "@/lib/legal";
import { SITE } from "@/lib/siteConfig";

/** JSON-LD Structured Data für bessere Google-Snippets (BrewAI / brewai.de) */
export function JsonLd() {
  const businessId = `${SITE.baseUrl}/#business`;
  const websiteId = `${SITE.baseUrl}/#website`;
  const serviceId = `${SITE.baseUrl}/#service`;
  const softwareId = `${SITE.baseUrl}/#software`;

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: LEGAL.name,
    url: `${SITE.baseUrl}/ueber-uns`,
    email: LEGAL.email,
    jobTitle: `Gründer ${SITE.name}`,
    description: SITE.defaultDescription,
    worksFor: { "@id": businessId },
    sameAs: [SITE.linkedinUrl],
    knowsAbout: [
      "KI Marketing",
      "Brauerei Marketing",
      "Content Marketing",
      "KI Bildgenerierung",
      "Automatisierung",
    ],
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": businessId,
    name: SITE.name,
    legalName: LEGAL.name,
    description: SITE.defaultDescription,
    url: SITE.baseUrl,
    logo: {
      "@type": "ImageObject",
      url: SITE.brandLogoUrl,
    },
    image: SITE.brandLogoUrl,
    email: LEGAL.email,
    telephone: SITE.contactPhoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: LEGAL.street,
      addressLocality: "Fuchstal",
      postalCode: "86925",
      addressCountry: "DE",
    },
    areaServed: [
      { "@type": "Country", name: "Deutschland" },
      { "@type": "Country", name: "Österreich" },
      { "@type": "Country", name: "Schweiz" },
    ],
    sameAs: [SITE.linkedinUrl],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: LEGAL.email,
      telephone: SITE.contactPhoneDisplay,
      availableLanguage: ["German"],
      areaServed: ["DE", "AT", "CH"],
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: SITE.name,
    alternateName: SITE.productName,
    description: SITE.defaultDescription,
    url: SITE.baseUrl,
    publisher: { "@id": businessId },
    inLanguage: "de-DE",
  };

  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": softwareId,
    name: SITE.productName,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Marketing Automation",
    operatingSystem: "Web",
    url: SITE.baseUrl,
    description: SITE.defaultDescription,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: "79",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: `${SITE.baseUrl}/#pakete`,
    },
    provider: { "@id": businessId },
    featureList: [
      "KI-Produktfotos für Bier und Getränke",
      "Social-Media-Content für Brauereien",
      "Token-basiertes Dashboard-Abo",
      "Premium-Einmallieferung",
    ],
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId,
    name: `KI-Marketing für Brauereien | ${SITE.productName}`,
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
          itemOffered: { "@type": "Service", name: "KI-Bildkampagnen für Social Media" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Automatisiertes Social-Media-Marketing" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Saisonkampagnen für Brauereien" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Biergarten- und Event-Marketing" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Händler- und Gastro-Promotion mit KI-Content" },
        },
      ],
    },
  };

  const siteNavigation = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      { "@type": "SiteNavigationElement", position: 1, name: "Startseite", url: SITE.baseUrl },
      { "@type": "SiteNavigationElement", position: 2, name: "Warum", url: `${SITE.baseUrl}/#warum` },
      { "@type": "SiteNavigationElement", position: 3, name: "Ablauf", url: `${SITE.baseUrl}/#prozess` },
      { "@type": "SiteNavigationElement", position: 4, name: "Leistungen", url: `${SITE.baseUrl}/#loesungen` },
      { "@type": "SiteNavigationElement", position: 5, name: "Preise", url: `${SITE.baseUrl}/#pakete` },
      { "@type": "SiteNavigationElement", position: 6, name: "Fragen", url: `${SITE.baseUrl}/#fragen` },
      { "@type": "SiteNavigationElement", position: 7, name: "Praxis", url: `${SITE.baseUrl}/#beispiele` },
      { "@type": "SiteNavigationElement", position: 8, name: "Kontakt", url: `${SITE.baseUrl}/#contact` },
      { "@type": "SiteNavigationElement", position: 9, name: "Lösungen", url: `${SITE.baseUrl}/loesungen` },
      { "@type": "SiteNavigationElement", position: 10, name: "Ratgeber", url: `${SITE.baseUrl}/ratgeber` },
      { "@type": "SiteNavigationElement", position: 11, name: "Über uns", url: `${SITE.baseUrl}/ueber-uns` },
    ],
  };

  const safeJson = (obj: object) =>
    JSON.stringify(obj).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(person) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(website) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(software) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(siteNavigation) }} />
    </>
  );
}
