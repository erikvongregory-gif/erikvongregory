"use client";

import { useCallback, useState } from "react";
import { usePricingDeepLink } from "@/hooks/usePricingDeepLink";
import { pricingPlanElementId, type PricingDeepLinkPayload } from "@/lib/pricingDeepLink";
import type { SubscriptionPlanKey } from "@/lib/billing/tokenState";
import { PREIS_MODE_COPY, PREIS_PLAENE, type PricingTier } from "@/content/desktop-home";
import { MOBILE_PRICING_TRACKS, WERKSTATT_PROMO_BADGE } from "@/lib/mobilePricingTiers";
import { WerkstattYearlyBillingToggle } from "@/components/pricing/WerkstattYearlyBillingToggle";
import { trackEvent } from "@/lib/analytics";
import {
  getWerkstattTierDisplay,
  WERKSTATT_DEFAULT_BILLING_INTERVAL,
  type WerkstattBillingInterval,
} from "@/lib/werkstattBilling";
import { DesktopContainer } from "@/components/desktop/DesktopContainer";
import { DesktopRevealItem, DesktopRevealStagger } from "@/components/desktop/DesktopReveal";
import { scrollToContactPaket } from "@/lib/contactPaket";
import { cn } from "@/lib/utils";

type PriceMode = "premium" | "self";

function TierCard({
  tier,
  mode,
  billingInterval,
  busy,
  onCheckout,
}: {
  tier: PricingTier;
  mode: PriceMode;
  billingInterval: WerkstattBillingInterval;
  busy: boolean;
  onCheckout: (plan: SubscriptionPlanKey, interval: WerkstattBillingInterval) => void;
}) {
  const highlight = Boolean(tier.highlight);
  const werkstattSource = MOBILE_PRICING_TRACKS.werkstatt.find((t) => t.checkoutPlanKey === tier.checkoutPlanKey);
  const display =
    mode === "self" && werkstattSource ? getWerkstattTierDisplay(werkstattSource, billingInterval) : null;

  const handleCta = () => {
    if (tier.checkoutPlanKey) {
      if (busy) return;
      onCheckout(tier.checkoutPlanKey, billingInterval);
      return;
    }
    scrollToContactPaket(tier.contactPaket ?? tier.name);
  };

  return (
    <article
      id={tier.checkoutPlanKey ? pricingPlanElementId(tier.checkoutPlanKey) : undefined}
      className={cn(
        "relative flex flex-col rounded-[18px] p-8",
        highlight
          ? "bg-ink text-paper shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)]"
          : "border border-ink/12 bg-white shadow-[0_8px_30px_-16px_rgba(24,20,15,0.12)]",
      )}
    >
      {highlight ? (
        <span className="absolute -top-3.5 left-7 rounded-full bg-amber px-3 py-1 font-mono-hero text-[10.5px] font-semibold uppercase tracking-wider text-[#15110C]">
          Empfohlen
        </span>
      ) : null}
      <p className={cn("font-mono-hero text-[11px] uppercase tracking-wider", highlight ? "text-amber2" : "text-amber")}>
        {tier.forLabel}
      </p>
      <h3 className="mt-2 font-serif-hero text-[28px] font-medium">{tier.name}</h3>
      {display?.showPromo ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-amber/15 px-2 py-0.5 font-mono-hero text-[10px] font-semibold uppercase tracking-wider text-amber">
            {WERKSTATT_PROMO_BADGE}
          </span>
          <span className="font-sans-tight text-[12px] text-ink3">{display.savingsLabel} inklusive</span>
        </div>
      ) : null}
      <div className="mt-4 flex flex-wrap items-end gap-x-3 gap-y-1 border-b border-current/15 pb-4">
        <div className="flex items-end gap-1">
          <span className="font-serif-hero text-[64px] font-medium leading-none tracking-[-2px]">{display?.price ?? tier.price}</span>
          <span className="mb-2 text-[28px]">€</span>
        </div>
        {display?.compareAtPrice ? (
          <span
            className={cn(
              "mb-3 font-sans-tight text-[18px] line-through decoration-current/35",
              highlight ? "text-[#E8DFCB]/55" : "text-ink3",
            )}
            aria-label={`Regulärpreis ${display.compareAtPrice} Euro`}
          >
            statt {display.compareAtPrice}&nbsp;€
          </span>
        ) : null}
        <span className="mb-2 ml-auto font-mono-hero text-[10px] uppercase tracking-wider opacity-70">
          {display?.cadenceLabel ?? tier.modality}
        </span>
      </div>
      <ul className="my-6 flex-1 space-y-2.5">
        {tier.deliverables.map(([qty, label]) => (
          <li key={label} className="grid grid-cols-[76px_1fr] gap-2 text-[14px]">
            <span className={cn("font-mono-hero text-[11px]", highlight ? "text-amber2" : "text-amber")}>{qty}</span>
            <span className={highlight ? "text-[#E8DFCB]" : "text-ink2"}>{label}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        disabled={busy}
        onClick={handleCta}
        className={cn(
          "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 font-sans-tight text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber",
          highlight ? "bg-amber text-[#15110C] hover:brightness-105" : "bg-ink text-paper hover:bg-ink/90",
        )}
      >
        {tier.cta} →
      </button>
    </article>
  );
}

export function DesktopPreise() {
  const [mode, setMode] = useState<PriceMode>("premium");
  const [billingInterval, setBillingInterval] = useState<WerkstattBillingInterval>(WERKSTATT_DEFAULT_BILLING_INTERVAL);
  const [checkoutBusy, setCheckoutBusy] = useState<SubscriptionPlanKey | null>(null);
  const copy = PREIS_MODE_COPY[mode];
  const tiers = PREIS_PLAENE[mode];

  const onCheckout = useCallback(async (plan: SubscriptionPlanKey, interval: WerkstattBillingInterval) => {
    setCheckoutBusy(plan);
    try {
      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ plan, interval }),
        credentials: "include",
      });
      const payload = (await response.json().catch(() => null)) as { url?: string; error?: string } | null;
      if (!response.ok || !payload?.url) throw new Error(payload?.error || "Checkout konnte nicht gestartet werden.");
      window.location.assign(payload.url);
    } catch {
      setCheckoutBusy(null);
    }
  }, []);

  const applyDeepLink = useCallback((payload: PricingDeepLinkPayload) => {
    setMode(payload.track === "werkstatt" ? "self" : "premium");
  }, []);

  usePricingDeepLink(applyDeepLink);

  return (
    <section id="pakete-preise" aria-labelledby="desktop-preise-heading" className="scroll-mt-24 border-t border-ink/10 bg-paper py-20 lg:py-[120px]">
      <div id="preise" className="scroll-mt-24" aria-hidden />
      <div id="pakete" className="scroll-mt-24" aria-hidden />
      <DesktopContainer>
        <DesktopRevealStagger className="mx-auto max-w-[760px] text-center" softEntrance>
          <DesktopRevealItem>
            <p className="mb-6 flex items-center justify-center gap-4 font-mono-hero text-[11px] uppercase tracking-[1.4px] text-amber">
              <span className="h-px w-12 bg-amber/40" aria-hidden />
              Zwei Wege mit EvGlab
              <span className="h-px w-12 bg-amber/40" aria-hidden />
            </p>
          </DesktopRevealItem>
          <DesktopRevealItem>
            <h2 id="desktop-preise-heading" className="font-serif-hero text-[72px] font-normal leading-[0.98] tracking-[-2px] text-ink">
              Du entscheidest:
              <br />
              Premium oder <em className="italic text-amber">Selbstbedienung</em>.
            </h2>
          </DesktopRevealItem>
        </DesktopRevealStagger>

        <DesktopRevealStagger className="mx-auto mb-16 mt-10 flex w-fit justify-center">
          <DesktopRevealItem>
            <div className="flex rounded-[14px] border border-ink/12 bg-white p-1.5">
              {(["premium", "self"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={mode === m}
                  onClick={() => setMode(m)}
                  className={cn(
                    "rounded-[10px] px-6 py-3.5 font-sans-tight text-sm font-medium transition duration-200",
                    mode === m ? "bg-ink text-paper" : "text-ink2 hover:text-ink",
                  )}
                >
                  {PREIS_MODE_COPY[m].toggle}
                </button>
              ))}
            </div>
          </DesktopRevealItem>
        </DesktopRevealStagger>

        <DesktopRevealStagger className="mx-auto mb-16 max-w-[640px] text-center" softEntrance>
          <DesktopRevealItem>
            <p className="font-serif-hero text-[22px] italic text-ink">{copy.headline}</p>
          </DesktopRevealItem>
          <DesktopRevealItem>
            <p className="mt-3 text-[15px] leading-[1.6] text-ink2">{copy.body}</p>
          </DesktopRevealItem>
        </DesktopRevealStagger>

        {mode === "self" ? (
          <DesktopRevealStagger className="mx-auto mb-8 max-w-[640px]" softEntrance>
            <DesktopRevealItem>
              <WerkstattYearlyBillingToggle
                active={billingInterval === "year"}
                onChange={(active) => {
                  const next = active ? "year" : "month";
                  setBillingInterval(next);
                  trackEvent("pricing_billing_interval_toggled", { interval: next, track: "werkstatt" });
                }}
              />
            </DesktopRevealItem>
          </DesktopRevealStagger>
        ) : null}

        <DesktopRevealStagger className="grid grid-cols-3 gap-5" staggerMs={110} key={`${mode}-${billingInterval}`}>
          {tiers.map((tier) => (
            <DesktopRevealItem key={`${mode}-${tier.name}`}>
              <TierCard
                tier={tier}
                mode={mode}
                billingInterval={billingInterval}
                busy={checkoutBusy !== null}
                onCheckout={onCheckout}
              />
            </DesktopRevealItem>
          ))}
        </DesktopRevealStagger>

        <DesktopRevealStagger className="mt-8 text-center">
          <DesktopRevealItem>
            <p className="font-mono-hero text-[11px] uppercase tracking-wider text-ink3">{copy.disclaimer}</p>
          </DesktopRevealItem>
        </DesktopRevealStagger>
      </DesktopContainer>
    </section>
  );
}
