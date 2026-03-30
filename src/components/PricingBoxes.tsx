"use client";

import { useRef, useEffect, useState } from "react";

const PRICING_PACKAGES = [
  {
    icon: "🍺",
    name: "Starter Paket",
    description: "Perfekt für kleine Brauereien, die ihren Social-Media-Auftritt modernisieren möchten.",
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
    icon: "🚀",
    name: "Growth Paket",
    description: "Für Brauereien, die regelmäßig hochwertigen Content benötigen.",
    oldPrice: "2.490 €",
    price: "1.690 €",
    delivery: "5-7 Tage",
    cta: "👉 Projekt starten",
    highlight: true,
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
    icon: "🍻",
    name: "Brewery Pro",
    description: "Komplettpaket für eine moderne Online-Präsenz.",
    oldPrice: "5.490 €",
    price: "3.990 €",
    delivery: "2-3 Wochen",
    cta: "👉 Angebot anfragen",
    features: [
      "moderne Website (Onepage)",
      "10 KI-Produktbilder",
      "2 KI-Werbevideos",
      "Social-Media-Content Setup",
      "Texte & Struktur für die Website",
      "KI-Bewertungsmanagement (Google)",
      "kommerzielle Nutzungsrechte",
    ],
  },
];

const ADDONS = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    name: "KI-Bewertungsmanagement",
    description: "Google-Rezensionen automatisch & markengetreu beantworten – ohne Zeitaufwand für den Inhaber.",
    price: "ab 149 €/Monat",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M20 21a8 8 0 1 0-16 0" />
      </svg>
    ),
    name: "KI-Markenbotschafter",
    description: "Ein digitaler Braumeister, der regelmäßig Neuigkeiten aus deiner Brauerei als Video präsentiert.",
    price: "ab 299 €/Monat",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    name: "KI-Event-Marketing",
    description: "Automatisierte Kampagnen für Brauereifeste, Bockbieranstiche und Verkostungen – rechtzeitig und ohne Aufwand.",
    price: "ab 199 €/Event",
  },
];

const TRUST_ITEMS = [
  { icon: "🇩🇪", label: "Hosting in Deutschland" },
  { icon: "🔒", label: "DSGVO-konform" },
  { icon: "✓", label: "Kommerzielle Nutzungsrechte" },
  { icon: "📞", label: "Persönliche Betreuung" },
];

export function PricingBoxes() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "50px 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`mt-10 ${inView ? "pricing-in-view" : ""}`}>
      <div className="mb-8 flex flex-col items-center gap-4 text-center">
        <span className="pricing-section-badge section4-badge-pulse inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-1.5 text-sm font-medium text-orange-300 pricing-slide-in">
          <span aria-hidden>✦</span>
          Aktuelle Angebote
        </span>
        <h3 className="pricing-slide-in pricing-slide-in-delay-1 text-2xl font-bold text-white sm:text-3xl">
          Pakete & Preise
        </h3>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {PRICING_PACKAGES.map((pkg, index) => (
          <article
            key={pkg.name}
            className={`pricing-card pricing-card-slide-${index} relative flex h-full flex-col rounded-2xl border p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35),0_0_40px_rgba(224,122,64,0.12)] backdrop-blur-sm ${
              pkg.highlight
                ? "border-orange-400/40 bg-[#0b1620]/90 ring-1 ring-orange-400/20"
                : "border-white/15 bg-[#0b1620]/80"
            }`}
          >
            {pkg.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-orange-400/40 bg-orange-500/20 px-3 py-1 text-[11px] font-semibold tracking-wide text-orange-300">
                Beliebteste Wahl
              </span>
            )}
            <span className="pricing-sale-badge absolute right-3 top-3 rounded-full border border-red-400/50 bg-red-500/20 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-red-300">
              SALE
            </span>

            <p className="text-sm text-white/85">{pkg.icon} {pkg.name}</p>
            <p className="mt-2 min-h-[42px] text-sm leading-relaxed text-white/75">{pkg.description}</p>

            <div className="mt-4 flex items-end gap-2">
              <span className="text-sm text-white/45 line-through">{pkg.oldPrice}</span>
              <span className="pricing-sale-price text-3xl font-extrabold leading-none text-red-400">{pkg.price}</span>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-white/85">
              {pkg.features.map((feature) => (
                <li key={feature} className="leading-relaxed">
                  {"\u2714"} {feature}
                </li>
              ))}
            </ul>

            <p className="mt-4 text-sm font-medium text-orange-300">Lieferzeit: {pkg.delivery}</p>
            <a
              href="#contact"
              data-paket={pkg.name}
              className={`pricing-cta mt-5 inline-flex w-full items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                pkg.highlight
                  ? "border-orange-400/60 bg-orange-500/25 text-orange-200 hover:bg-orange-500/35"
                  : "border-orange-400/40 bg-orange-500/15 text-orange-200 hover:bg-orange-500/25"
              }`}
            >
              {pkg.cta}
            </a>
          </article>
        ))}
      </div>

      {/* Trust Bar */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-xl border border-white/12 bg-white/6 px-4 py-3 backdrop-blur-sm">
        {TRUST_ITEMS.map((item) => (
          <span key={item.label} className="flex items-center gap-1.5 text-xs font-medium text-white/70">
            <span aria-hidden className="text-sm">{item.icon}</span>
            {item.label}
          </span>
        ))}
      </div>

      {/* Add-ons */}
      <div className="mt-14">
        <div className="mb-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-300">
            Erweiterungen
          </span>
          <h4 className="mt-3 text-xl font-bold text-white sm:text-2xl">Add-ons & Upsells</h4>
          <p className="mt-2 text-sm text-white/65">Kombinierbar mit jedem Paket – für mehr Wirkung.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {ADDONS.map((addon) => (
            <div
              key={addon.name}
              className="relative flex flex-col rounded-2xl border border-white/12 bg-[#0b1620]/70 p-5 shadow-[0_8px_28px_rgba(0,0,0,0.25)] backdrop-blur-sm"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-400/25 bg-orange-400/10 text-orange-300">
                  {addon.icon}
                </span>
                <p className="text-sm font-semibold text-white/95">{addon.name}</p>
              </div>
              <p className="flex-1 text-sm leading-relaxed text-white/70">{addon.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-orange-300">{addon.price}</p>
                <a
                  href="#contact"
                  data-paket={addon.name}
                  className="inline-flex items-center gap-1 rounded-lg border border-orange-400/30 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-200 transition hover:bg-orange-500/20"
                >
                  Anfragen →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
