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
  Video,
} from "lucide-react";

import { cn } from "@/lib/utils";

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
          className="pricing-loop-shader-backdrop pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl"
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
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <span className="pricing-section-badge section7-badge section7-badge-pulse inline-flex items-center gap-2 rounded-full border border-[rgba(224,122,64,0.35)] bg-[rgba(224,122,64,0.15)] px-4 py-1.5 text-sm font-medium text-[#c65a20] pricing-slide-in">
              <span aria-hidden>✦</span>
              Aktuelle Angebote
            </span>
            <h3 className="pricing-slide-in pricing-slide-in-delay-1 text-2xl font-bold text-zinc-800 sm:text-3xl md:text-zinc-900">
              Pakete & Preise
            </h3>
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
                      className={`pricing-card-slide-addon-${index} w-full max-w-[300px]`}
                    />
                  );
                }}
              />
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
