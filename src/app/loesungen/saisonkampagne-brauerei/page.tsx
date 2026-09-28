import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LoesungArticle } from "@/components/loesungen/LoesungViews";
import { loesungBySlug } from "@/content/loesungen";
import { SITE } from "@/lib/siteConfig";

const SLUG = "saisonkampagne-brauerei";
const loesung = loesungBySlug(SLUG);

export const metadata: Metadata = {
  title: loesung ? `${loesung.title} | BrewAI` : "Saisonkampagne",
  description: loesung?.summary,
  alternates: { canonical: `${SITE.baseUrl}${loesung?.href ?? ""}` },
};

export default function SaisonkampagneBrauereiPage() {
  if (!loesung) notFound();
  return <LoesungArticle loesung={loesung} />;
}
