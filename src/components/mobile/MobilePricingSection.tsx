"use client";

import Link from "next/link";
import { memo, useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { SubscriptionPlanKey } from "@/lib/billing/tokenState";
import { trackEvent } from "@/lib/analytics";
import { scrollToContactPaket } from "@/lib/contactPaket";
import {
  MOBILE_PRICING_TRACK_OPTIONS,
  MOBILE_PRICING_TRACKS,
  tierContactPaket,
  tierDisplayName,
  WERKSTATT_PROMO_BADGE,
  type PricingTrack,
  type Tier,
} from "@/lib/mobilePricingTiers";
import { WerkstattYearlyBillingToggle } from "@/components/pricing/WerkstattYearlyBillingToggle";
import { usePricingDeepLink } from "@/hooks/usePricingDeepLink";
import { pricingPlanElementId, type PricingDeepLinkPayload } from "@/lib/pricingDeepLink";
import {
  getWerkstattTierDisplay,
  WERKSTATT_DEFAULT_BILLING_INTERVAL,
  type WerkstattBillingInterval,
} from "@/lib/werkstattBilling";
import { cn } from "@/lib/utils";

function FeatureCheckIcon() {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden className="mt-1 shrink-0">
      <path
        d="M1 5 L4.5 8.5 L11 1.5"
        stroke="#C7691E"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CtaArrowIcon({ featured }: { featured: boolean }) {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden className="shrink-0">
      <path
        d="M1 5 H12 M8 1 L12 5 L8 9"
        stroke={featured ? "#E89259" : "#18140F"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CompareArrowIcon() {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden className="shrink-0">
      <path
        d="M1 5 H10 M6.5 1 L10 5 L6.5 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type TierCardProps = {
  tier: Tier;
  index: number;
  track: PricingTrack;
  billingInterval: WerkstattBillingInterval;
  animate: boolean;
  checkoutBusyPlan: SubscriptionPlanKey | null;
  onCheckoutPlan: (plan: SubscriptionPlanKey, interval: WerkstattBillingInterval) => void;
};

const TierCard = memo(function TierCard({
  tier,
  index,
  track,
  billingInterval,
  animate,
  checkoutBusyPlan,
  onCheckoutPlan,
}: TierCardProps) {
  const tierNo = String(index + 1).padStart(2, "0");
  const featured = Boolean(tier.featured);
  const nameId = `tier-${track}-${index}-name`;
  const busy = tier.checkoutPlanKey && checkoutBusyPlan === tier.checkoutPlanKey;
  const display = track === "werkstatt" ? getWerkstattTierDisplay(tier, billingInterval) : null;

  const handleCta = () => {
    trackEvent("pricing_cta_clicked", {
      track,
      tier: tier.tier,
      cta: tier.cta,
    });
    if (tier.checkoutPlanKey) {
      if (checkoutBusyPlan) return;
      trackEvent("pricing_redirect_checkout", {
        plan: tier.checkoutPlanKey,
        source: "mobile_pricing_stack",
      });
      onCheckoutPlan(tier.checkoutPlanKey, billingInterval);
      return;
    }
    scrollToContactPaket(tierContactPaket(tier.tier));
  };

  return (
    <article
      key={`${track}-${index}`}
      id={tier.checkoutPlanKey ? pricingPlanElementId(tier.checkoutPlanKey) : undefined}
      aria-labelledby={nameId}
      className={cn(
        "mobile-pricing-tier-card relative rounded-[14px] bg-white p-5 pb-5",
        featured
          ? "border-[1.5px] border-amber shadow-[0_1px_0_#fff_inset,_0_14px_30px_-18px_rgba(199,105,30,0.28)]"
          : "border border-ink/[0.12] shadow-[0_1px_0_#fff_inset,_0_6px_16px_-10px_rgba(40,28,12,0.10)]",
        animate && "mobile-pricing-tier-card--enter",
      )}
    >
      {featured ? (
        <span
          className="absolute -top-2.5 left-5 rounded-sm bg-amber px-2.5 py-1 font-mono-hero text-[9.5px] font-medium tracking-[1.2px] text-paper uppercase"
          aria-label="Beliebteste Wahl"
        >
          Beliebteste Wahl
        </span>
      ) : null}

      <div className="mb-1 flex items-baseline gap-2.5">
        <span className="font-serif-hero text-[18px] leading-none font-normal tracking-[-0.2px] text-amber italic">
          {tierNo}
        </span>
        <h3 id={nameId} className="m-0 font-serif-hero text-[22px] leading-[1.1] font-medium tracking-[-0.5px] text-ink">
          {tierDisplayName(tier.tier)}
        </h3>
      </div>

      <p className="m-0 mb-4 pl-7 font-sans-tight text-[13px] leading-[1.4] text-ink2">{tier.tagline}</p>

      <div className="mb-4 border-b border-dashed border-ink/[0.12] pb-4 pl-7">
        {display?.showPromo ? (
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-sm bg-amber/12 px-2 py-0.5 font-mono-hero text-[9.5px] font-semibold tracking-[1px] text-amber uppercase">
              {WERKSTATT_PROMO_BADGE}
            </span>
            <span className="font-sans-tight text-[11px] text-ink3">{display.savingsLabel} inklusive</span>
          </div>
        ) : null}
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <p className="m-0 font-serif-hero text-[38px] leading-none font-medium tracking-[-1.2px] text-ink">
            {display?.price ?? tier.price}
            {"\u00A0"}€
          </p>
          {display?.compareAtPrice ? (
            <p
              className="m-0 font-sans-tight text-[13px] text-ink3 line-through decoration-ink3/50"
              aria-label={`Regulärpreis ${display.compareAtPrice} Euro`}
            >
              statt {display.compareAtPrice}
              {"\u00A0"}€
            </p>
          ) : null}
        </div>
        <p
          className={cn(
            "mt-1.5 font-mono-hero text-[10.5px] font-medium tracking-[1.2px] uppercase",
            (display?.cadenceLabel ?? tier.cadence) === "pro Monat" ? "text-[#A85614]" : "text-ink",
          )}
        >
          {display?.cadenceLabel ?? tier.cadence}
        </p>
      </div>

      <ul className="m-0 flex list-none flex-col gap-2 pl-7">
        {tier.features.map((feature) => (
          <li key={feature} className="grid grid-cols-[14px_1fr] items-baseline gap-2.5">
            <FeatureCheckIcon />
            <span className="font-sans-tight text-[13.5px] leading-[1.4] text-ink">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={handleCta}
        disabled={Boolean(busy)}
        className={cn(
          "mt-5 flex w-full cursor-pointer items-center justify-between rounded-full px-[18px] py-3.5 font-sans-tight text-sm font-semibold transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-white",
          featured
            ? "border-0 bg-ink text-paper"
            : "border border-ink/30 bg-transparent text-ink",
        )}
      >
        <span>{busy ? "Weiterleitung…" : tier.cta}</span>
        <CtaArrowIcon featured={featured} />
      </button>
    </article>
  );
});

type MobilePricingSectionProps = {
  checkoutBusyPlan: SubscriptionPlanKey | null;
  onCheckoutPlan: (plan: SubscriptionPlanKey, interval?: WerkstattBillingInterval) => void;
};

export function MobilePricingSection({ checkoutBusyPlan, onCheckoutPlan }: MobilePricingSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [track, setTrack] = useState<PricingTrack>("manufaktur");
  const [billingInterval, setBillingInterval] = useState<WerkstattBillingInterval>(WERKSTATT_DEFAULT_BILLING_INTERVAL);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sectionViewed, setSectionViewed] = useState(false);
  const tiers = MOBILE_PRICING_TRACKS[track];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || sectionViewed) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setSectionViewed(true);
        trackEvent("pricing_section_viewed", { track });
        observer.disconnect();
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionViewed, track]);

  const setTrackWithAnalytics = useCallback(
    (next: PricingTrack) => {
      setTrack((prev) => {
        if (prev === next) return prev;
        trackEvent("pricing_track_toggled", { from: prev, to: next });
        return next;
      });
    },
    [],
  );

  const applyDeepLink = useCallback(
    (payload: PricingDeepLinkPayload) => {
      setTrackWithAnalytics(payload.track);
    },
    [setTrackWithAnalytics],
  );

  usePricingDeepLink(applyDeepLink);

  const handleTabKeyDown = (index: number, e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const nextIndex =
      e.key === "ArrowRight"
        ? (index + 1) % MOBILE_PRICING_TRACK_OPTIONS.length
        : (index - 1 + MOBILE_PRICING_TRACK_OPTIONS.length) % MOBILE_PRICING_TRACK_OPTIONS.length;
    const next = MOBILE_PRICING_TRACK_OPTIONS[nextIndex]!.key;
    setTrackWithAnalytics(next);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="preise-heading"
      className="mobile-pricing-section w-full bg-paper pt-10 pb-9 font-sans-tight text-ink"
    >
      <div className="px-5 pb-6">
        <div className="mb-3.5 flex items-center gap-2.5">
          <span className="h-px w-7 shrink-0 bg-amber" aria-hidden />
          <p className="m-0 font-mono-hero text-[11px] tracking-[1.4px] text-amber uppercase">
            PREISE · 06 PAKETE
          </p>
        </div>
        <h2
          id="preise-heading"
          className="m-0 font-serif-hero text-[36px] leading-[1.02] font-normal tracking-[-1px] text-ink"
        >
          Zwei Wege.
          <br />
          Ein <em className="font-medium text-amber italic">Ergebnis</em>.
        </h2>
        <p className="mt-3.5 mb-0 max-w-[340px] font-sans-tight text-sm leading-[1.5] text-ink2">
          Du beauftragst — oder du arbeitest selbst im Dashboard. Selbe Bildqualität, andere Aufwandsverteilung.
        </p>
      </div>

      <div className="px-5 pb-6">
        <div
          role="tablist"
          aria-label="Geschäftsmodell wählen"
          className="grid grid-cols-2 gap-0 rounded-full border border-ink/10 bg-ink/5 p-1"
        >
          {MOBILE_PRICING_TRACK_OPTIONS.map((opt, index) => {
            const active = track === opt.key;
            return (
              <button
                key={opt.key}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="preise-tiers"
                id={`preise-tab-${opt.key}`}
                onClick={() => setTrackWithAnalytics(opt.key)}
                onKeyDown={(e) => handleTabKeyDown(index, e)}
                className={cn(
                  "flex min-h-12 cursor-pointer flex-col items-center rounded-full border-0 px-3.5 py-2.5 transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
                  active ? "bg-ink text-paper" : "bg-transparent text-ink2",
                )}
              >
                <span className="font-sans-tight text-[13px] font-semibold">{opt.label}</span>
                <span
                  className={cn(
                    "mt-0.5 font-mono-hero text-[9px] font-normal tracking-[0.8px] uppercase",
                    active ? "text-amber2" : "text-ink3",
                  )}
                >
                  {opt.sublabel}
                </span>
              </button>
            );
          })}
        </div>
        {track === "werkstatt" ? (
          <div className="mt-4">
            <WerkstattYearlyBillingToggle
              active={billingInterval === "year"}
              onChange={(active) => {
                const next = active ? "year" : "month";
                setBillingInterval(next);
                trackEvent("pricing_billing_interval_toggled", { interval: next, track });
              }}
            />
          </div>
        ) : null}
      </div>

      <div id="preise-tiers" role="tabpanel" aria-labelledby={`preise-tab-${track}`} className="flex flex-col gap-3 px-4">
        {tiers.map((tier, index) => (
          <TierCard
            key={`${track}-${tier.tier}`}
            tier={tier}
            index={index}
            track={track}
            billingInterval={billingInterval}
            animate={!reducedMotion}
            checkoutBusyPlan={checkoutBusyPlan}
            onCheckoutPlan={onCheckoutPlan}
          />
        ))}
      </div>

      <footer className="px-5 pt-6">
        <p className="m-0 mb-4 text-center font-mono-hero text-[10px] tracking-[0.6px] text-[#6B5F4E] uppercase">
          Alle Preise zzgl. § 19 UStG · keine Umsatzsteuer · kommerz. Nutzungsrechte inklusive
        </p>
        <div className="flex justify-center">
          <Link
            href="/preise/vergleich"
            onClick={() => trackEvent("pricing_compare_opened")}
            className="inline-flex items-center gap-2 border-b border-ink/20 pb-0.5 font-sans-tight text-sm font-semibold text-ink no-underline"
          >
            Alle 6 Pakete im Vergleich
            <CompareArrowIcon />
          </Link>
        </div>
      </footer>
    </section>
  );
}
