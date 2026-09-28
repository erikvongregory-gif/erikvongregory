import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LoesungArticle } from "@/components/loesungen/LoesungViews";
import { loesungBySlug } from "@/content/loesungen";
import { SITE } from "@/lib/siteConfig";

const SLUG = "haendler-gastro-promotion";
const loesung = loesungBySlug(SLUG);

export const metadata: Metadata = {
  title: loesung ? `${loesung.title} | BrewAI` : "Händler & Gastro",
  description: loesung?.summary,
  alternates: { canonical: `${SITE.baseUrl}${loesung?.href ?? ""}` },
};

export default function HaendlerGastroPromotionPage() {
  if (!loesung) notFound();
  return <LoesungArticle loesung={loesung} />;
}
