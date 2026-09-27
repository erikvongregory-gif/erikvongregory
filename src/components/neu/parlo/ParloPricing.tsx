"use client";

import { useState } from "react";
import { APP_URL, BillingPeriod, PLANS, planPrice } from "./data";
import { CheckIcon, ParloPillButton, ParloStarButton } from "./ParloUi";
import { cn } from "@/lib/utils";

export function ParloPricing() {
  const [period, setPeriod] = useState<BillingPeriod>("annual");

  return (
    <section id="pricing" className="scroll-mt-24">
      <div className="mx-[30px] border-x border-border py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-md space-y-6">
              <h2 className="text-balance text-4xl font-medium tracking-tight text-muted-foreground">
                <span className="text-foreground">Pläne</span> für echte Brauereien
              </h2>
              <p className="text-sm text-muted-foreground">
                Werkstatt-Abos mit Tokens — dieselben Tarife wie im Dashboard.
              </p>
            </div>
            <div
              className="inline-flex w-fit rounded-full border border-border bg-surface p-1"
              aria-label="Abrechnungszeitraum"
            >
              <button
                type="button"
                onClick={() => setPeriod("monthly")}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors",
                  period === "monthly"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Monatlich
              </button>
              <button
                type="button"
                onClick={() => setPeriod("annual")}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors",
                  period === "annual"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Jährlich <span className="opacity-70">günstiger</span>
              </button>
            </div>
          </div>

          <div className="mt-12 grid gap-1.5 border border-border max-lg:mx-auto max-lg:max-w-sm lg:mt-20 lg:grid-cols-4 [&>*]:p-6">
            {PLANS.map((plan, idx) => (
              <div
                key={plan.id}
                className={cn(
                  "flex flex-col gap-8",
                  plan.featured && "bg-card",
                  idx < PLANS.length - 1 && "max-lg:border-b lg:border-r",
                  plan.featured && "max-lg:border-y lg:border-x",
                )}
              >
                <div>
                  <p className="text-lg font-medium text-foreground">{plan.name}</p>
                  <p className="text-sm font-medium text-muted-foreground">{plan.tagline}</p>
                  <div className="my-8 block text-4xl font-medium tracking-tight text-foreground">
                    {planPrice(plan.monthly, plan.compareAtMonthly, period)}
                    <span className="text-lg text-muted-foreground"> / Monat</span>
                  </div>
                  {plan.featured ? (
                    <ParloStarButton href={APP_URL} fullWidth>
                      {plan.cta}
                    </ParloStarButton>
                  ) : (
                    <ParloPillButton href={APP_URL} variant="ghost" className="h-9 w-full">
                      {plan.cta}
                    </ParloPillButton>
                  )}
                </div>
                <ul className="list-outside space-y-3 text-muted-foreground">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <CheckIcon className="size-3 shrink-0 text-muted-foreground" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
