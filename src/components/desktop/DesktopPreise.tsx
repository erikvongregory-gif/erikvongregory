"use client";

import { useCallback, useState } from "react";
import type { SubscriptionPlanKey } from "@/lib/billing/tokenState";
import { PREIS_MODE_COPY, PREIS_PLAENE, type PricingTier } from "@/content/desktop-home";
import { DesktopContainer } from "@/components/desktop/DesktopContainer";
import { DesktopRevealItem, DesktopRevealStagger } from "@/components/desktop/DesktopReveal";
import { scrollToContactPaket } from "@/lib/contactPaket";
import { cn } from "@/lib/utils";

type PriceMode = "premium" | "self";

async function startPlanCheckout(plan: SubscriptionPlanKey) {
  const response = await fetch("/api/billing/checkout", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ plan }),
    credentials: "include",
  });
  const payload = (await response.json().catch(() => null)) as { url?: string; error?: string } | null;
  if (!response.ok || !payload?.url) throw new Error(payload?.error || "Checkout konnte nicht gestartet werden.");
  window.location.assign(payload.url);
}

function TierCard({
  tier,
  mode,
  busy,
  onCheckout,
}: {
  tier: PricingTier;
  mode: PriceMode;
  busy: boolean;
  onCheckout: (plan: SubscriptionPlanKey) => void;
}) {
  const highlight = Boolean(tier.highlight);

  const handleCta = () => {
    if (tier.checkoutPlanKey) {
      if (busy) return;
      onCheckout(tier.checkoutPlanKey);
      return;
    }
    scrollToContactPaket(tier.contactPaket ?? tier.name);
  };

  return (
    <article
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
      <div className="mt-4 flex items-end gap-1 border-b border-current/15 pb-4">
        <span className="font-serif-hero text-[64px] font-medium leading-none tracking-[-2px]">{tier.price}</span>
        <span className="mb-2 text-[28px]">€</span>
        <span className="mb-2 ml-auto font-mono-hero text-[10px] uppercase tracking-wider opacity-70">{tier.modality}</span>
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
  const [checkoutBusy, setCheckoutBusy] = useState<SubscriptionPlanKey | null>(null);
  const copy = PREIS_MODE_COPY[mode];
  const tiers = PREIS_PLAENE[mode];

  const onCheckout = useCallback(async (plan: SubscriptionPlanKey) => {
    setCheckoutBusy(plan);
    try {
      await startPlanCheckout(plan);
    } catch {
      setCheckoutBusy(null);
    }
  }, []);

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

        <DesktopRevealStagger className="grid grid-cols-3 gap-5" staggerMs={110} key={mode}>
          {tiers.map((tier) => (
            <DesktopRevealItem key={`${mode}-${tier.name}`}>
              <TierCard tier={tier} mode={mode} busy={checkoutBusy !== null} onCheckout={onCheckout} />
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
