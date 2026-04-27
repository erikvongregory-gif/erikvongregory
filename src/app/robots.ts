import type { MetadataRoute } from "next";
import { SITE } from "@/lib/siteConfig";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/_next/",
        "/dashboard",
        "/admin",
        "/invite/",
        "/anmelden",
        "/registrieren",
        "/auth/",
      ],
    },
    sitemap: `${SITE.baseUrl}/sitemap.xml`,
    host: SITE.baseUrl,
  };
}
