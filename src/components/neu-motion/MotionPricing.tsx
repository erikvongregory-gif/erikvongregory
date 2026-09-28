"use client";

import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { APP_URL, type BillingPeriod, PLANS } from "@/components/neu/parlo/data";
import { CheckIcon, ParloPillButton, ParloStarButton } from "@/components/neu/parlo/ParloUi";
import { cn } from "@/lib/utils";
import { EASE, cssEase } from "./motion-utils";

/** Bewusst minimal: Karten und Features blenden ein, Preisziffern rollen beim Umschalten. */
export function MotionPricing() {
  const [period, setPeriod] = useState<BillingPeriod>("annual");

  const toggle = (value: BillingPeriod, label: React.ReactNode) => {
    const on = period === value;
    return (
      <button
        type="button"
        onClick={() => setPeriod(value)}
        className={cn(
          "relative rounded-full px-3 py-1.5 text-sm transition-colors duration-200",
          on ? "text-background" : "text-muted-foreground hover:text-foreground",
        )}
      >
        {on ? (
          <motion.span
            layoutId="nm-period-pill"
            className="absolute inset-0 rounded-full bg-foreground"
            transition={{ duration: 0.3, ease: EASE.micro }}
          />
        ) : null}
        <span className="relative">{label}</span>
      </button>
    );
  };

  return (
    <section id="pricing" className="scroll-mt-24">
      <div className="mx-[30px] border-x border-border py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE.rise }}
            className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          >
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
              {toggle("monthly", "Monatlich")}
              {toggle(
                "annual",
                <>
                  Jährlich <span className="opacity-70">günstiger</span>
                </>,
              )}
            </div>
          </motion.div>

          <div className="mt-12 grid gap-1.5 border border-border max-lg:mx-auto max-lg:max-w-sm lg:mt-20 lg:grid-cols-4 [&>*]:p-6">
            {PLANS.map((plan, idx) => {
              const price = period === "annual" ? plan.monthly : plan.compareAtMonthly;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease: EASE.rise, delay: idx * 0.06 }}
                  className={cn(
                    "flex flex-col gap-8 transition-colors duration-150",
                    plan.featured ? "bg-card" : "hover:bg-foreground/[0.02]",
                    idx < PLANS.length - 1 && "max-lg:border-b lg:border-r",
                    plan.featured && "max-lg:border-y lg:border-x",
                  )}
                >
                  <div>
                    <p className="text-lg font-medium text-foreground">{plan.name}</p>
                    <p className="text-sm font-medium text-muted-foreground">{plan.tagline}</p>
                    <div className="my-8 block text-4xl font-medium tracking-tight text-foreground">
                      <NumberFlow
                        value={price}
                        locales="de-DE"
                        suffix=" €"
                        spinTiming={{ duration: 300, easing: cssEase(EASE.micro) }}
                        transformTiming={{ duration: 300, easing: cssEase(EASE.micro) }}
                      />
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
                    {plan.features.map((f, fi) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.4, delay: 0.15 + idx * 0.06 + fi * 0.03 }}
                        className="flex items-center gap-3 text-sm"
                      >
                        <CheckIcon className="size-3 shrink-0 text-muted-foreground" />
                        {f}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
