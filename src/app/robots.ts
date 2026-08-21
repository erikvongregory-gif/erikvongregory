import type { MetadataRoute } from "next";
import { SITE } from "@/lib/siteConfig";

export const dynamic = "force-static";

/** Pfade, die nicht indexiert werden sollen (App, Auth, intern). */
const disallow = [
  "/api/",
  "/_next/",
  "/dashboard",
  "/admin",
  "/invite/",
  "/anmelden",
  "/registrieren",
  "/auth/",
] as const;

const defaultRule = {
  allow: "/" as const,
  disallow: [...disallow],
};

/**
 * Explizite Regeln für KI-Crawler (AEO).
 * Zusätzlich: /llms.txt für LLM-Übersicht.
 */
const aiUserAgents = [
  "GPTBot",
  "ChatGPT-User",
  "Google-Extended",
  "PerplexityBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Applebot-Extended",
  "Bytespider",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", ...defaultRule },
      ...aiUserAgents.map((userAgent) => ({ userAgent, ...defaultRule })),
    ],
    sitemap: `${SITE.baseUrl}/sitemap.xml`,
    /** Host-Direktive: nur Hostname, ohne Protokoll */
    host: SITE.marketingHost,
  };
}
