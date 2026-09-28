import type { Metadata } from "next";
import { LoesungenIndex } from "@/components/loesungen/LoesungViews";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Lösungen für Brauereien | BrewAI",
  description:
    "Alle BrewAI Lösungen für Brauereien: Saisonkampagnen, Biergarten- und Event-Marketing sowie Händler- und Gastro-Promotion.",
  alternates: {
    canonical: `${SITE.baseUrl}/loesungen`,
  },
  openGraph: {
    title: "Lösungen für Brauereien | BrewAI",
    description:
      "Entdecke die wichtigsten BrewAI-Lösungen für Brauereien und finde das passende Szenario für deine Kampagnen.",
    url: `${SITE.baseUrl}/loesungen`,
    type: "website",
    images: SITE.ogImage ? [{ url: SITE.ogImage, width: 1200, height: 630, alt: "BrewAI Lösungen für Brauereien" }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "Lösungen für Brauereien | BrewAI",
    description: "Saisonkampagnen, Event-Marketing und Händler-Promotion für Brauereien.",
    images: SITE.ogImage ? [SITE.ogImage] : undefined,
  },
};

export default function LoesungenPage() {
  return <LoesungenIndex />;
}
