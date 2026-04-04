"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  CalendarRange,
  Layers,
  MessageSquareText,
  Sparkles,
  TrendingUp,
  Video,
} from "lucide-react";

import {
  CONTAINED_SHADER_BG,
  PricingCard,
  ShaderCanvas,
  type PricingCardProps,
} from "@/components/ui/animated-glassy-pricing";

type PricingPackageDef = {
  planIcon: LucideIcon;
  name: string;
  description: string;
  oldPrice: string;
  price: string;
  delivery: string;
  cta: string;
  features: string[];
  highlight?: boolean;
};

type AddonRow = {
  planIcon: LucideIcon;
  name: string;
  tagline: string;
  features: string[];
  price: string;
  priceSubtext: string;
};

const PRICING_PACKAGES: PricingPackageDef[] = [
  {
    planIcon: Sparkles,
    name: "Starter Paket",
    description:
      "Perfekt für kleine Brauereien, die ihren Social-Media-Auftritt modernisieren möchten.",
    oldPrice: "1.290 €",
    price: "890 €",
    delivery: "3-5 Tage",
    cta: "👉 Angebot anfragen",
    features: [
      "5 KI-Produktbilder (Flasche / Glas / Biergarten)",
      "5 Social-Media-Posts inkl. Text",
      "optimiert für Instagram & Facebook",
      "kommerzielle Nutzungsrechte",
    ],
  },
  {
    planIcon: TrendingUp,
    name: "Growth Paket",
    description:
      "Für Brauereien, die regelmäßig hochwertigen Content benötigen.",
    oldPrice: "2.490 €",
    price: "1.690 €",
    delivery: "5-7 Tage",
    cta: "👉 Angebot anfragen",
    features: [
      "10 KI-Produktbilder",
      "1 KI-Werbevideo (10-15 Sekunden)",
      "10 Social-Media-Posts inkl. Text",
      "Reels & TikTok-optimiert",
      "Content für Instagram, Facebook & Ads",
      "kommerzielle Nutzungsrechte",
    ],
  },
  {
    planIcon: Layers,
    name: "Brewery Pro",
    description: "Komplettpaket für eine moderne Online-Präsenz.",
    oldPrice: "5.490 €",
    price: "3.990 €",
    delivery: "2-3 Wochen",
    cta: "👉 Angebot anfragen",
    highlight: true,
    features: [
      "Website-Setup (Onepager oder kompakte Seite)",
      "10 KI-Produktbilder",
      "2 KI-Werbevideos",
      "Social-Media-Content Setup",
      "Texte & Struktur für die Website",
      "KI-Bewertungsmanagement (Google)",
      "Komplexe Webprojekte im erweiterten Preissegment",
      "kommerzielle Nutzungsrechte",
    ],
  },
];

/** Desktop: Starter | Brewery Pro (Mitte) | Growth — Mobile: Reihenfolge im Array. */
const PRICING_DESKTOP_ORDER = [0, 2, 1] as const;

const ADDONS: AddonRow[] = [
  {
    planIcon: MessageSquareText,
    name: "KI-Bewertungsmanagement",
    tagline: "Google-Bewertungen markengetreu beantworten.",
    features: ["Automatische Antworten", "Weniger Aufwand im Alltag"],
    price: "ab 149 €",
    priceSubtext: "pro Monat",
  },
  {
    planIcon: Video,
    name: "KI-Markenbotschafter",
    tagline: "Neuigkeiten aus der Brauerei als Video.",
    features: ["Regelmäßige Clips", "Für Social & Website"],
    price: "ab 299 €",
    priceSubtext: "pro Monat",
  },
  {
    planIcon: CalendarRange,
    name: "KI-Event-Marketing",
    tagline: "Feste & Verkostungen rechtzeitig bewerben.",
    features: ["Ankündigungen & Reminder", "Zu jedem Paket dazu"],
    price: "ab 199 €",
    priceSubtext: "pro Event",
  },
];

/** Öffnet den ContactFunnel wie ein Klick auf `a[href="#contact"][data-paket]`. */
function scrollToContactPaket(paketName: string) {
  if (typeof window === "undefined") return;
  const a = document.createElement("a");
  a.href = "#contact";
  a.setAttribute("data-paket", paketName);
  a.style.cssText = "position:fixed;left:-9999px;opacity:0;pointer-events:none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function toPricingCardProps(pkg: PricingPackageDef): PricingCardProps {
  const isStarter = pkg.name === "Starter Paket";
  const highlighted = !!pkg.highlight;
  return {
    planName: pkg.name,
    planIcon: pkg.planIcon,
    description: `${pkg.description} (statt ${pkg.oldPrice})`,
    price: pkg.price,
    currencyPrefix: "",
    priceSubtext: "einmalig",
    features: [...pkg.features, `Lieferzeit: ${pkg.delivery}`],
    buttonText: pkg.cta.replace(/👉\s*/, "").trim(),
    isPopular: highlighted,
    buttonVariant: highlighted ? "primary" : isStarter ? "secondary" : "primary",
    popularLabel: "Beliebteste Wahl",
    onCtaClick: () => scrollToContactPaket(pkg.name),
    "data-paket": pkg.name,
  };
}

function toAddonPricingCardProps(addon: AddonRow, index: number): PricingCardProps {
  return {
    planName: addon.name,
    planIcon: addon.planIcon,
    description: addon.tagline,
    price: addon.price,
    currencyPrefix: "",
    priceSubtext: addon.priceSubtext,
    features: [...addon.features],
    buttonText: "Anfragen",
    isPopular: false,
    buttonVariant: index === 1 ? "primary" : "secondary",
    onCtaClick: () => scrollToContactPaket(addon.name),
    "data-paket": addon.name,
    compact: true,
  };
}

export function PricingBoxes() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const q = () => setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    q();
    window.addEventListener("resize", q);
    return () => window.removeEventListener("resize", q);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold: 0.1, rootMargin: "50px 0px 0px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`mt-10 ${inView ? "pricing-in-view" : ""}`}>
      <div className="relative isolate overflow-hidden rounded-3xl">
        <ShaderCanvas
          mode="contained"
          backgroundRgb={
            isDesktop ? CONTAINED_SHADER_BG.desktopLight : CONTAINED_SHADER_BG.mobileDark
          }
        />
        <div className="relative z-20 transform-gpu px-1 py-4 sm:px-2 md:py-8">
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <span className="pricing-section-badge section7-badge section7-badge-pulse inline-flex items-center gap-2 rounded-full border border-[rgba(224,122,64,0.35)] bg-[rgba(224,122,64,0.15)] px-4 py-1.5 text-sm font-medium text-[#c65a20] pricing-slide-in">
              <span aria-hidden>✦</span>
              Aktuelle Angebote
            </span>
            <h3 className="pricing-slide-in pricing-slide-in-delay-1 text-2xl font-bold text-zinc-800 sm:text-3xl md:text-zinc-900">
              Pakete & Preise
            </h3>
          </div>

          <div className="flex flex-col items-center gap-8 md:hidden">
            {PRICING_PACKAGES.map((pkg, index) => (
              <PricingCard
                key={pkg.name}
                {...toPricingCardProps(pkg)}
                className={`pricing-card-slide-${index} w-full max-w-sm`}
              />
            ))}
          </div>

          <div className="hidden flex-col items-center justify-center gap-8 py-6 md:flex md:flex-row md:gap-6">
            {PRICING_DESKTOP_ORDER.map((pkgIndex, position) => {
              const pkg = PRICING_PACKAGES[pkgIndex];
              return (
                <PricingCard
                  key={pkg.name}
                  {...toPricingCardProps(pkg)}
                  className={`pricing-card-slide-${position}`}
                />
              );
            })}
          </div>

          <div className="mt-10 pt-2">
            <div className="mb-8 flex flex-col items-center gap-3 text-center">
              <span className="section7-badge section7-badge-pulse inline-flex items-center gap-2 rounded-full border border-[rgba(224,122,64,0.35)] bg-[rgba(224,122,64,0.15)] px-4 py-1.5 text-sm font-medium text-[#c65a20]">
                <span aria-hidden>✦</span>
                Erweiterungen
              </span>
              <h3 className="text-2xl font-bold text-zinc-800 sm:text-3xl md:text-zinc-900">
                Add-ons &amp; Upsells
              </h3>
              <p className="max-w-xl text-sm text-zinc-600">
                Kombinierbar mit jedem Paket – für mehr Wirkung.
              </p>
            </div>

            <div className="flex flex-col items-center gap-6 md:hidden">
              {ADDONS.map((addon, index) => (
                <PricingCard
                  key={addon.name}
                  {...toAddonPricingCardProps(addon, index)}
                  className={`pricing-card-slide-addon-${index} w-full max-w-[300px]`}
                />
              ))}
            </div>

            <div className="hidden flex-col items-center justify-center gap-5 py-2 md:flex md:flex-row md:flex-wrap md:gap-5">
              {ADDONS.map((addon, index) => (
                <PricingCard
                  key={addon.name}
                  {...toAddonPricingCardProps(addon, index)}
                  className={`pricing-card-slide-addon-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
