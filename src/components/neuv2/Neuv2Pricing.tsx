import Link from "next/link";
import { CircleCheckBig } from "lucide-react";
import { NEU_STUDIO_PLANS } from "@/lib/neu/studioPlans";
import { SITE } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

export function Neuv2Pricing() {
  return (
    <section id="pricing" className="nv-section">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-4 px-4 text-center sm:gap-8">
          <h2 className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
            Pläne für echte Brauereien
          </h2>
          <p className="max-w-[600px] text-base font-medium text-[var(--muted-foreground)] sm:text-xl">
            Dieselben Tarife wie im Dashboard. Tokens für Bilder und Videos — ohne Überraschungen.
          </p>
        </div>

        <div className="nv-container grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {NEU_STUDIO_PLANS.map((plan) => {
            const featured = Boolean(plan.recommended);
            return (
              <div
                key={plan.id}
                className={cn(
                  "relative flex flex-col gap-6 overflow-hidden rounded-2xl p-8 shadow-xl",
                  featured ? "nv-glass-strong" : "nv-glass",
                )}
              >
                {featured ? (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-32 left-1/2 h-32 w-full max-w-[960px] -translate-x-1/2 rounded-[50%] blur-[72px]"
                    style={{ background: "color-mix(in oklch, var(--brand-foreground) 70%, transparent)" }}
                  />
                ) : (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-32 left-1/2 h-32 w-full max-w-[960px] -translate-x-1/2 rounded-[50%] bg-[color-mix(in_oklch,var(--foreground)_30%,transparent)] blur-[72px]"
                  />
                )}
                <hr
                  className={cn(
                    "absolute top-0 left-[10%] h-px w-[80%] border-0 bg-gradient-to-r from-transparent via-[color-mix(in_oklch,var(--foreground)_60%,transparent)] to-transparent",
                    featured && "via-[var(--brand)]",
                  )}
                />

                <div className="relative flex flex-col gap-7">
                  <header className="flex flex-col gap-2">
                    <h3 className="font-bold">{plan.name}</h3>
                    <p className="max-w-[220px] text-sm text-[var(--muted-foreground)]">{plan.tag}</p>
                  </header>

                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[var(--muted-foreground)]">€</span>
                    <span className="text-6xl font-bold">{plan.monthly}</span>
                    <span className="ml-2 text-sm text-[var(--muted-foreground)]">/ Monat</span>
                  </div>
                  <p className="min-h-[40px] max-w-[220px] text-sm text-[var(--muted-foreground)]">
                    statt {plan.compareAtMonthly} € bei monatlicher Zahlung
                  </p>

                  <Link
                    href={`${SITE.appBaseUrl}/dashboard/pricing`}
                    className={cn("nv-btn !h-10 w-full", featured ? "nv-btn-primary" : "nv-btn-glow")}
                  >
                    Plan wählen
                  </Link>

                  <hr className="border-[color-mix(in_oklch,var(--border)_15%,transparent)]" />

                  <ul className="flex flex-col gap-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CircleCheckBig className="mt-0.5 size-4 shrink-0 text-[var(--muted-foreground)]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
