import type { MetadataRoute } from "next";
import { SITE } from "@/lib/siteConfig";

export const dynamic = "force-static";

type Entry = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

/** Öffentliche Index-Seiten — keine noindex-URLs (/vergleich/*, /preise/vergleich, App). */
const PAGES: Entry[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/loesungen", changeFrequency: "weekly", priority: 0.9 },
  { path: "/ueber-uns", changeFrequency: "monthly", priority: 0.85 },
  { path: "/ratgeber", changeFrequency: "weekly", priority: 0.8 },
  { path: "/impressum", changeFrequency: "yearly", priority: 0.2 },
  { path: "/datenschutz", changeFrequency: "yearly", priority: 0.2 },
  { path: "/agb", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.baseUrl;
  const lastModified = new Date();

  return PAGES.map(({ path, changeFrequency, priority }) => ({
    url: path ? `${base}${path}` : base,
    lastModified,
    changeFrequency,
    priority,
  }));
}
