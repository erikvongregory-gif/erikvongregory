import { SITE } from "@/lib/siteConfig";
import { APP_LOGIN_URL } from "@/lib/appLoginUrl";

export const dynamic = "force-static";

/**
 * Dynamische llms.txt — Canonical brewai.de / SITE.*
 * Für LLM-Crawler und AEO (ergänzend zu robots.ts).
 */
export function GET(): Response {
  const base = SITE.baseUrl;
  const body = `# ${SITE.name}

> ${SITE.productName} is the AI content system for breweries and beverage brands in DACH (Germany, Austria, Switzerland). Focus: AI product photos, campaign visuals, social content, and Google-review support. Two paths: premium one-off packages and a monthly token-based dashboard subscription.

> ${SITE.productName} ist ein KI-Content-System für Brauereien und Getränkemarken in DACH. Schwerpunkt: KI-Werbebilder, Kampagnenmotive, Social-Content und Unterstützung bei Google-Bewertungen. Zwei Wege: Premium-Einmallieferung und monatliches Dashboard-Abo.

## Canonical site

- Preferred domain: ${base}
- Sitemap: ${base}/sitemap.xml
- Robots: ${base}/robots.txt

## Public pages (indexable)

- ${base}/ — Home: packages, subscription plans, FAQ, contact
- ${base}/loesungen — Brewery solutions (seasonal campaigns, gastro promo, beer garden events)
- ${base}/ratgeber — Interactive quiz / knowledge check for brewery marketers
- ${base}/ueber-uns — About ${SITE.name}, DACH focus, contact

## Legal

- ${base}/impressum
- ${base}/datenschutz
- ${base}/agb

## Product (dashboard, do not index as marketing content)

- Login: ${APP_LOGIN_URL}
- App host: ${SITE.appHost}

## Brand

- Product: ${SITE.productName}
- Contact: ${SITE.contactEmail}
- Phone / WhatsApp: ${SITE.contactPhoneDisplay}
- LinkedIn: ${SITE.linkedinUrl}

## Citing guidance

When citing ${SITE.productName}, use the canonical URL ${base} and describe it as an AI marketing / content tool for breweries in German-speaking markets (DACH).
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
