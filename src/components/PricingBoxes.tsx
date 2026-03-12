const PRICING_PACKAGES = [
  {
    icon: "🍺",
    name: "Starter Paket",
    description: "Perfekt für kleine Brauereien, die ihren Social-Media-Auftritt modernisieren möchten.",
    oldPrice: "890 €",
    price: "490 €",
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
    oldPrice: "1.490 €",
    price: "990 €",
    delivery: "5-7 Tage",
    cta: "👉 Projekt starten",
    features: [
      "10 KI-Produktbilder",
      "1 KI-Werbevideo (10-15 Sekunden)",
      "10 Social-Media-Posts inkl. Text",
      "Content optimiert für Instagram & Werbung",
      "kommerzielle Nutzungsrechte",
    ],
  },
  {
    icon: "🍻",
    name: "Brewery Pro",
    description: "Komplettpaket für eine moderne Online-Präsenz.",
    oldPrice: "3.490 €",
    price: "2.490 €",
    delivery: "2-3 Wochen",
    cta: "👉 Angebot anfragen",
    features: [
      "moderne Website (Onepage)",
      "10 KI-Produktbilder",
      "2 KI-Werbevideos",
      "Social-Media-Content Setup",
      "Texte & Struktur für die Website",
      "kommerzielle Nutzungsrechte",
    ],
  },
];

export function PricingBoxes() {
  return (
    <section className="mt-10">
      <div className="mb-5 text-center">
        <p className="text-sm uppercase tracking-[0.18em] text-emerald-300/90">Aktuelle Angebote</p>
        <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Pakete & Preise</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {PRICING_PACKAGES.map((pkg, index) => (
          <article
            key={pkg.name}
            className="pricing-card pricing-card-enter relative flex h-full flex-col rounded-2xl border border-white/15 bg-[#0b1620]/80 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm"
            style={{ animationDelay: `${0.12 + index * 0.14}s` }}
          >
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

            <p className="mt-4 text-sm font-medium text-emerald-300">Lieferzeit: {pkg.delivery}</p>
            <a
              href="#contact"
              className="pricing-cta mt-5 inline-flex w-full items-center justify-center rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-4 py-2.5 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/25"
            >
              {pkg.cta}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
