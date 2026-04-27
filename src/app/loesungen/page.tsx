import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Lösungen für Brauereien | EvGlab",
  description:
    "Alle EvGlab Lösungen für Brauereien: Saisonkampagnen, Biergarten- und Event-Marketing sowie Händler- und Gastro-Promotion.",
  alternates: {
    canonical: `${SITE.baseUrl}/loesungen`,
  },
  openGraph: {
    title: "Lösungen für Brauereien | EvGlab",
    description:
      "Entdecke die wichtigsten EvGlab-Lösungen für Brauereien und finde das passende Szenario für deine Kampagnen.",
    url: `${SITE.baseUrl}/loesungen`,
    type: "website",
    images: SITE.ogImage ? [{ url: SITE.ogImage, width: 1200, height: 630, alt: "EvGlab Lösungen für Brauereien" }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "Lösungen für Brauereien | EvGlab",
    description: "Saisonkampagnen, Event-Marketing und Händler-Promotion für Brauereien.",
    images: SITE.ogImage ? [SITE.ogImage] : undefined,
  },
};

const pages = [
  {
    href: "/loesungen/saisonkampagne-brauerei",
    title: "Saisonkampagnen für Brauereien",
    summary: "Kampagnenmotive und Serien für Frühlings-, Sommer- und Winteraktionen.",
  },
  {
    href: "/loesungen/biergarten-event-marketing",
    title: "Biergarten- & Event-Marketing",
    summary: "Planbare Visuals für Ausschanktage, Events und lokale Aktionen.",
  },
  {
    href: "/loesungen/haendler-gastro-promotion",
    title: "Händler- & Gastro-Promotion",
    summary: "Co-Branding-Motive für Handel, Gastro und Partnernetzwerke.",
  },
] as const;

export default function LoesungenPage() {
  return (
    <main className="relative z-20 mx-auto max-w-5xl px-4 py-16 text-zinc-900">
      <h1 className="text-3xl font-bold sm:text-4xl">Lösungen für Brauereien</h1>
      <p className="mt-4 max-w-3xl text-zinc-700">
        Diese Seite bündelt die wichtigsten EvGlab-Szenarien für Brauereien und verlinkt direkt auf die passenden Unterseiten.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {pages.map((page) => (
          <article key={page.href} className="rounded-xl border border-zinc-200 bg-white p-4">
            <h2 className="text-lg font-semibold text-zinc-900">{page.title}</h2>
            <p className="mt-2 text-sm text-zinc-600">{page.summary}</p>
            <Link href={page.href} className="mt-3 inline-flex text-sm font-medium text-[#c65a20] hover:underline">
              Zur Unterseite
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
