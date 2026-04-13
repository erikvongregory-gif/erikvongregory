"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { LucideIcon } from "lucide-react";
import {
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  Layers,
  MessageSquareText,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
  CONTAINED_SHADER_BG,
  PricingCard,
  ShaderCanvas,
  type PricingCardProps,
} from "@/components/ui/animated-glassy-pricing";
import FAQsComponent from "@/components/ui/faqs-component";
import type { SubscriptionPlanKey } from "@/lib/billing/tokenState";

type PricingPackageDef = {
  planIcon: LucideIcon;
  name: string;
  fit: string;
  outcome: string;
  startIn: string;
  description: string;
  oldPrice?: string;
  price: string;
  delivery?: string;
  cta: string;
  priceSubtext?: string;
  features: string[];
  highlight?: boolean;
  checkoutPlanKey?: SubscriptionPlanKey;
};

type AddonRow = {
  planIcon: LucideIcon;
  name: string;
  tagline: string;
  features: string[];
  price: string;
  priceSubtext: string;
};

function trackEvent(event: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("evglab-analytics-event", { detail: { event, ...payload } }));
  const w = window as typeof window & { dataLayer?: Array<Record<string, unknown>> };
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event, ...payload });
  }
}

const PRICING_PACKAGES: PricingPackageDef[] = [
  {
    planIcon: Sparkles,
    name: "Starter Paket",
    fit: "Für kleine Brauereien mit wenig Zeit",
    outcome: "Schneller sichtbar mit konstantem Basis-Content",
    startIn: "Start in 48h",
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
    name: "Wachstumspaket",
    fit: "Für Brauereien mit aktiven Kampagnen",
    outcome: "Mehr Reichweite und planbare Themenwochen",
    startIn: "Start in 72h",
    description:
      "Für Brauereien, die regelmäßig hochwertigen Content benötigen.",
    oldPrice: "2.490 €",
    price: "1.690 €",
    delivery: "5-7 Tage",
    cta: "👉 Angebot anfragen",
    features: [
      "10 KI-Produktbilder",
      "10 Social-Media-Posts inkl. Text",
      "Bildposts für Instagram & Ads",
      "Content für Instagram, Facebook & Ads",
      "kommerzielle Nutzungsrechte",
    ],
  },
  {
    planIcon: Layers,
    name: "Brauerei Premium",
    fit: "Für Marken mit Premium-Anspruch",
    outcome: "Kompletter Auftritt mit Website und Content-System",
    startIn: "Kickoff in 5 Tagen",
    description: "Komplettpaket für eine moderne Online-Präsenz.",
    oldPrice: "5.490 €",
    price: "3.990 €",
    delivery: "2-3 Wochen",
    cta: "👉 Angebot anfragen",
    highlight: true,
    features: [
      "Website-Setup (Onepager oder kompakte Seite)",
      "10 KI-Produktbilder",
      "Social-Media-Content Setup",
      "Texte & Struktur für die Website",
      "KI-Bewertungsmanagement (Google)",
      "Komplexe Webprojekte im erweiterten Preissegment",
      "kommerzielle Nutzungsrechte",
    ],
  },
];

const DASHBOARD_SUBSCRIPTION_PACKAGES: PricingPackageDef[] = [
  {
    planIcon: Sparkles,
    name: "Brauerei Start",
    fit: "Für kleine Teams",
    outcome: "Regelmäßiger Content statt Lücken",
    startIn: "Sofort nach Checkout",
    description: "Für kleine Teams, die regelmäßig Content planen und posten.",
    price: "79 €",
    priceSubtext: "pro Monat",
    cta: "Plan wählen",
    checkoutPlanKey: "start",
    features: [
      "1.200 Tokens / Monat",
      "ca. 60-120 Bilder",
      "1 Teammitglied inklusive",
      "E-Mail-Support",
      "Nicht genutzte Tokens: 30 Tage übertragbar",
    ],
  },
  {
    planIcon: TrendingUp,
    name: "Brauerei Wachstum",
    fit: "Für aktive Brauereien",
    outcome: "Mehr Kampagnen ohne Produktionsstau",
    startIn: "Sofort nach Checkout",
    description: "Für aktive Brauereien mit regelmäßigen Kampagnen und Saisonaktionen.",
    price: "149 €",
    priceSubtext: "pro Monat",
    cta: "Plan wählen",
    checkoutPlanKey: "growth",
    features: [
      "3.000 Tokens / Monat",
      "ca. 150-300 Bilder",
      "3 Teammitglieder inklusive",
      "Priorisierter Support",
      "Nicht genutzte Tokens: 60 Tage übertragbar",
    ],
  },
  {
    planIcon: Layers,
    name: "Brauerei Pro",
    fit: "Für Marken mit hohem Volumen",
    outcome: "Schnelle Produktion auf mehreren Kanälen",
    startIn: "Sofort nach Checkout",
    description: "Für Marken mit hohem Content-Bedarf und mehreren Kanälen.",
    price: "299 €",
    priceSubtext: "pro Monat",
    cta: "Plan wählen",
    checkoutPlanKey: "pro",
    highlight: true,
    features: [
      "7.500 Tokens / Monat",
      "ca. 375-750 Bilder",
      "10 Teammitglieder inklusive",
      "Fast-Lane Rendering + Premium-Support",
      "Nicht genutzte Tokens: 90 Tage übertragbar",
    ],
  },
];

/** Desktop: von günstig nach teuer (teuerste Karte rechts) — Mobile: Reihenfolge im Array. */
const PRICING_DESKTOP_ORDER = [0, 1, 2] as const;
/** Desktop: von günstig nach teuer (teuerste Karte rechts) — Mobile: Reihenfolge im Array. */
const DASHBOARD_DESKTOP_ORDER = [0, 1, 2] as const;

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
    planIcon: Sparkles,
    name: "KI-Visual-Kampagnen",
    tagline: "Saisonale Kampagnen als Bildserie für Social und Website.",
    features: ["Regelmäßige Motive", "Für Social & Website"],
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
/** Desktop: von günstig nach teuer (teuerste Karte rechts). */
const ADDONS_DESKTOP_ORDER = [0, 2, 1] as const;

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

async function startSubscriptionCheckout(plan: SubscriptionPlanKey) {
  const res = await fetch("/api/billing/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan }),
  });

  if (res.status === 401) {
    trackEvent("auth_required_for_checkout", { plan });
    window.dispatchEvent(
      new CustomEvent("evglab-open-auth-modal", {
        detail: { mode: "signin" },
      }),
    );
    return;
  }

  const data = (await res.json()) as { url?: string; error?: string };
  if (!res.ok || !data.url) {
    throw new Error(data.error ?? "Checkout konnte nicht gestartet werden.");
  }
  trackEvent("checkout_started", { plan });
  window.location.href = data.url;
}

function toPricingCardProps(pkg: PricingPackageDef): PricingCardProps {
  const isStarter = pkg.name === "Starter Paket";
  const isGrowth = pkg.name === "Wachstumspaket";
  const isDashboardPlan = Boolean(pkg.checkoutPlanKey);
  const isDashboardPro = pkg.checkoutPlanKey === "pro";
  const highlighted = !!pkg.highlight;
  return {
    planName: pkg.name,
    planIcon: pkg.planIcon,
    description: pkg.oldPrice ? `${pkg.description} (statt ${pkg.oldPrice})` : pkg.description,
    price: pkg.price,
    currencyPrefix: "",
    priceSubtext: pkg.priceSubtext ?? (pkg.oldPrice ? "einmalig" : "pro Monat"),
    features: pkg.delivery ? [...pkg.features, `Lieferzeit: ${pkg.delivery}`] : [...pkg.features],
    buttonText: pkg.cta.replace(/👉\s*/, "").trim(),
    isPopular: highlighted,
    buttonVariant: isDashboardPlan
      ? isDashboardPro
        ? "primary"
        : "secondary"
      : highlighted
        ? "primary"
        : isStarter || isGrowth
          ? "secondary"
          : "primary",
    popularLabel: "Beliebteste Wahl",
    onCtaClick: () => {
      trackEvent("plan_selected", { planName: pkg.name, checkoutPlanKey: pkg.checkoutPlanKey ?? null });
      if (pkg.checkoutPlanKey) {
        void startSubscriptionCheckout(pkg.checkoutPlanKey);
        return;
      }
      scrollToContactPaket(pkg.name);
    },
    "data-paket": pkg.name,
  };
}

/** Mobile: horizontal wischen oder Punkte / Pfeile – ein Paket pro „Folie“. */
function MobilePricingSnapCarousel({
  ariaLabel,
  dotsNavLabel,
  slideKeys,
  renderSlide,
}: {
  ariaLabel: string;
  /** Kurzbeschreibung für die Punkt-Navigation (Screenreader). */
  dotsNavLabel?: string;
  slideKeys: readonly string[];
  renderSlide: (index: number) => ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = slideKeys.length;

  const updateActive = useCallback(() => {
    const track = trackRef.current;
    if (!track || n === 0) return;
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < n; i++) {
      const ch = track.children[i] as HTMLElement | undefined;
      if (!ch) continue;
      const c = ch.offsetLeft + ch.offsetWidth / 2;
      const d = Math.abs(c - mid);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    setActive(best);
  }, [n]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
    const ro = new ResizeObserver(() => updateActive());
    ro.observe(track);
    return () => {
      track.removeEventListener("scroll", updateActive);
      ro.disconnect();
    };
  }, [updateActive]);

  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      const slide = track?.children[i] as HTMLElement | undefined;
      if (!track || !slide) return;
      const target =
        slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
      track.scrollTo({
        left: Math.max(0, target),
        behavior: "smooth",
      });
    },
    [],
  );

  const prev = () => goTo(Math.max(0, active - 1));
  const next = () => goTo(Math.min(n - 1, active + 1));

  if (n === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="Karussell"
      aria-label={ariaLabel}
      className="relative w-full"
    >
      <div className="relative">
        <button
          type="button"
          className="absolute top-1/2 left-0 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200/90 bg-white/95 text-zinc-800 shadow-md backdrop-blur-sm disabled:pointer-events-none disabled:opacity-25"
          aria-label="Vorheriges Angebot"
          disabled={active <= 0}
          onClick={prev}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          className="absolute top-1/2 right-0 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200/90 bg-white/95 text-zinc-800 shadow-md backdrop-blur-sm disabled:pointer-events-none disabled:opacity-25"
          aria-label="Nächstes Angebot"
          disabled={active >= n - 1}
          onClick={next}
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>

        <div
          ref={trackRef}
          className={cn(
            "flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-visible scroll-smooth px-11 py-2 pb-8",
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          )}
        >
          {slideKeys.map((key, i) => (
            <div
              key={key}
              className="w-[min(22rem,calc(100vw-5.5rem))] max-w-sm shrink-0 snap-center py-1"
            >
              {renderSlide(i)}
            </div>
          ))}
        </div>
      </div>

      <nav
        className="mt-4 flex justify-center gap-2"
        aria-label={dotsNavLabel ?? "Folienposition"}
      >
        {slideKeys.map((key, i) => (
          <button
            key={key}
            type="button"
            aria-current={i === active ? "true" : undefined}
            aria-label={`${i + 1} von ${n}: ${key}`}
            className={cn(
              "h-2 rounded-full transition-[width,background-color] duration-200",
              i === active
                ? "w-7 bg-[#c65a20]"
                : "w-2 bg-zinc-400/70 hover:bg-zinc-500/80",
            )}
            onClick={() => goTo(i)}
          >
          </button>
        ))}
      </nav>
    </div>
  );
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
      <div className="pricing-loop-stack-root relative isolate z-0 rounded-3xl max-md:overflow-visible md:overflow-hidden">
        <div
          className="pricing-loop-shader-backdrop pointer-events-none absolute inset-x-0 top-0 h-[860px] -z-10 overflow-hidden rounded-3xl md:h-[980px]"
          aria-hidden
        >
          <ShaderCanvas
            mode="contained"
            backgroundRgb={
              isDesktop ? CONTAINED_SHADER_BG.desktopLight : CONTAINED_SHADER_BG.mobileDark
            }
          />
        </div>
        <div className="pricing-loop-content-stack relative z-20 transform-gpu px-1 py-4 sm:px-2 md:py-8">
          <div className="evg-clean-hover mb-8 rounded-2xl border border-black/10 bg-gradient-to-br from-black/5 to-black/0 p-4 shadow-[0_14px_30px_-20px_rgba(24,24,27,0.26)] backdrop-blur-[14px] hover:border-[#e07a40]/35 hover:shadow-[0_16px_34px_-20px_rgba(198,90,32,0.24)] md:mb-10 md:p-5">
            <div className="mb-4 flex flex-col items-center gap-2 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(224,122,64,0.35)] bg-[rgba(224,122,64,0.14)] px-4 py-1.5 text-sm font-medium text-[#c65a20]">
                <span aria-hidden>✦</span>
                Zwei Wege mit EvGlab
              </span>
              <h3 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
                Du entscheidest: Premium-Umsetzung oder Selbstbedienung
              </h3>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <article className="evg-clean-hover rounded-xl border border-black/10 bg-gradient-to-br from-black/5 to-black/0 p-4 backdrop-blur-[14px] hover:border-[#e07a40]/35 hover:shadow-[0_16px_34px_-20px_rgba(198,90,32,0.24)]">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">Option 1</p>
                <h4 className="mt-1 text-base font-semibold text-zinc-900">Ich mache es für dich</h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  Höherpreisige Premium-Umsetzung mit maximaler Qualität. Du bekommst fertige Ergebnisse, ich übernehme Strategie,
                  Gestaltung und saubere Ausspielung.
                </p>
              </article>
              <article className="evg-clean-hover rounded-xl border border-black/10 bg-gradient-to-br from-black/5 to-black/0 p-4 backdrop-blur-[14px] hover:border-[#e07a40]/35 hover:shadow-[0_16px_34px_-20px_rgba(198,90,32,0.24)]">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">Option 2</p>
                <h4 className="mt-1 text-base font-semibold text-zinc-900">Du nutzt mein Abo-Tool</h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  Günstiger und flexibel. Du generierst Bilder selbst im Dashboard, bleibst schnell handlungsfähig und steuerst deinen
                  Output eigenständig.
                </p>
              </article>
            </div>
          </div>

          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <span className="pricing-section-badge section7-badge section7-badge-pulse inline-flex items-center gap-2 rounded-full border border-[rgba(224,122,64,0.35)] bg-[rgba(224,122,64,0.15)] px-4 py-1.5 text-sm font-medium text-[#c65a20] pricing-slide-in">
              <span aria-hidden>✦</span>
              Aktuelle Angebote
            </span>
            <h3 className="pricing-slide-in pricing-slide-in-delay-1 text-2xl font-bold text-zinc-800 sm:text-3xl md:text-zinc-900">
              Pakete & Preise
            </h3>
          </div>

          <div className="mb-6 grid gap-2 md:mb-7 md:grid-cols-3 md:gap-3">
            {PRICING_DESKTOP_ORDER.map((pkgIndex) => {
              const pkg = PRICING_PACKAGES[pkgIndex]!;
              return (
                <article
                  key={`fit-${pkg.name}`}
                  className={cn(
                    "rounded-lg border border-black/10 bg-gradient-to-br from-black/5 to-black/0 p-2.5 text-left shadow-[0_10px_22px_-18px_rgba(24,24,27,0.28)] backdrop-blur-[14px] md:rounded-xl",
                    "md:p-3",
                    "evg-clean-hover hover:border-[#e07a40]/35 hover:shadow-[0_16px_34px_-20px_rgba(198,90,32,0.24)]",
                  )}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-500">{pkg.name}</p>
                  <p className="mt-1 text-xs font-medium leading-snug text-zinc-800">
                    Für wen: {pkg.fit}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-zinc-600">
                    Ergebnis: {pkg.outcome}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-[#c65a20]">{pkg.startIn}</p>
                </article>
              );
            })}
          </div>

          <div className="md:hidden">
            <MobilePricingSnapCarousel
              ariaLabel="Pakete durchblättern"
              dotsNavLabel="Paket wählen"
              slideKeys={PRICING_PACKAGES.map((p) => p.name)}
              renderSlide={(index) => {
                const pkg = PRICING_PACKAGES[index]!;
                return (
                  <PricingCard
                    {...toPricingCardProps(pkg)}
                    className={`pricing-card-slide-${index} w-full max-w-sm`}
                  />
                );
              }}
            />
          </div>

          <div className="hidden flex-col items-center justify-center gap-8 py-6 md:flex md:flex-row md:items-stretch md:gap-6">
            {PRICING_DESKTOP_ORDER.map((pkgIndex, position) => {
              const pkg = PRICING_PACKAGES[pkgIndex];
              return (
                <PricingCard
                  key={pkg.name}
                  {...toPricingCardProps(pkg)}
                  className={`pricing-card-slide-${position} h-full md:scale-100`}
                />
              );
            })}
          </div>

          <div className="relative mt-10 overflow-hidden rounded-3xl pt-2">
            <div
              className="pointer-events-none absolute inset-0 -z-10 opacity-95"
              aria-hidden
            >
              <ShaderCanvas
                mode="contained"
                shape="loop"
                backgroundRgb={
                  isDesktop ? CONTAINED_SHADER_BG.desktopLight : CONTAINED_SHADER_BG.mobileDark
                }
              />
            </div>

            <div className="mb-8 flex flex-col items-center gap-3 text-center">
              <span className="section7-badge section7-badge-pulse inline-flex items-center gap-2 rounded-full border border-[rgba(224,122,64,0.35)] bg-[rgba(224,122,64,0.15)] px-4 py-1.5 text-sm font-medium text-[#c65a20]">
                <span aria-hidden>✦</span>
                Neue Abo-Pläne
              </span>
              <h3 className="text-2xl font-bold text-zinc-800 sm:text-3xl md:text-zinc-900">
                Dashboard Abos
              </h3>
            </div>

            <div className="md:hidden">
              <MobilePricingSnapCarousel
                ariaLabel="Dashboard-Abos durchblättern"
                dotsNavLabel="Abo wählen"
                slideKeys={DASHBOARD_SUBSCRIPTION_PACKAGES.map((p) => p.name)}
                renderSlide={(index) => {
                  const pkg = DASHBOARD_SUBSCRIPTION_PACKAGES[index]!;
                  return (
                    <PricingCard
                      {...toPricingCardProps(pkg)}
                      className={`pricing-card-slide-sub-${index} w-full max-w-sm`}
                    />
                  );
                }}
              />
            </div>

            <div className="hidden flex-col items-center justify-center gap-8 py-2 md:flex md:flex-row md:items-stretch md:gap-6">
              {DASHBOARD_DESKTOP_ORDER.map((pkgIndex, index) => {
                const pkg = DASHBOARD_SUBSCRIPTION_PACKAGES[pkgIndex]!;
                return (
                <PricingCard
                  key={pkg.name}
                  {...toPricingCardProps(pkg)}
                  className={`pricing-card-slide-sub-${index} h-full md:scale-100`}
                />
                );
              })}
            </div>
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

            <div className="md:hidden">
              <MobilePricingSnapCarousel
                ariaLabel="Add-ons durchblättern"
                dotsNavLabel="Add-on wählen"
                slideKeys={ADDONS.map((a) => a.name)}
                renderSlide={(index) => {
                  const addon = ADDONS[index]!;
                  return (
                    <PricingCard
                      {...toAddonPricingCardProps(addon, index)}
                      className={`pricing-card-slide-addon-${index} evg-clean-hover w-full max-w-[300px]`}
                    />
                  );
                }}
              />
            </div>

            <div className="hidden flex-col items-center justify-center gap-5 py-2 md:flex md:flex-row md:flex-wrap md:gap-5">
              {ADDONS_DESKTOP_ORDER.map((addonIndex, index) => {
                const addon = ADDONS[addonIndex]!;
                return (
                  <PricingCard
                    key={addon.name}
                    {...toAddonPricingCardProps(addon, addonIndex)}
                    className={`pricing-card-slide-addon-${index} evg-clean-hover`}
                  />
                );
              })}
            </div>
          </div>

          <div className="evg-clean-hover mt-8 rounded-2xl border border-zinc-200/70 bg-transparent p-2 hover:border-[#e07a40]/35 hover:shadow-[0_16px_34px_-20px_rgba(198,90,32,0.24)] md:p-3">
            <FAQsComponent />
          </div>
        </div>
      </div>
    </section>
  );
}
