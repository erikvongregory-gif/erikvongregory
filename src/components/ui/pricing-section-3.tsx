"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { NeuRevealText } from "@/components/neu/NeuRevealText";
import { cn } from "@/lib/utils";
import {
  getNeuPlanAnnualSavingsVsList,
  getNeuPlanDisplayMonthlyPrice,
  NEU_STUDIO_PLANS,
} from "@/lib/neu/studioPlans";
import { SITE } from "@/lib/siteConfig";
import NumberFlow from "@number-flow/react";
import { CheckCheck } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";

const PricingSwitch = ({
  onSwitch,
  className,
}: {
  onSwitch: (value: string) => void;
  className?: string;
}) => {
  const [selected, setSelected] = useState("1");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className={cn("flex justify-center", className)}>
      <div className="relative z-10 mx-auto flex w-fit rounded-full border border-gray-200 bg-neutral-50 p-1 text-black">
        <button
          type="button"
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 h-10 w-fit cursor-pointer rounded-full px-3 py-1 font-medium transition-colors sm:h-12 sm:px-6 sm:py-2",
            selected === "0" ? "text-black" : "text-neutral-600 hover:text-black",
          )}
        >
          {selected === "0" ? (
            <motion.span
              layoutId="neu-pricing-switch"
              className="absolute top-0 left-0 h-10 w-full rounded-full border-4 border-neutral-300 bg-gradient-to-t from-neutral-100 via-neutral-200 to-neutral-300 shadow-sm shadow-neutral-300 sm:h-12"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          ) : null}
          <span className="relative text-inherit">Monatlich</span>
        </button>

        <button
          type="button"
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 flex h-10 w-fit flex-shrink-0 cursor-pointer items-center rounded-full px-3 py-1 font-medium transition-colors sm:h-12 sm:px-6 sm:py-2",
            selected === "1" ? "text-black" : "text-neutral-600 hover:text-black",
          )}
        >
          {selected === "1" ? (
            <motion.span
              layoutId="neu-pricing-switch"
              className="absolute top-0 left-0 h-10 w-full rounded-full border-4 border-neutral-300 bg-gradient-to-t from-neutral-100 via-neutral-200 to-neutral-300 shadow-sm shadow-neutral-300 sm:h-12"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          ) : null}
          <span className="relative flex items-center gap-2 text-inherit">
            Jährlich
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-black">
              Sparen
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

/** Pricing wie im Dashboard (gleiche Pläne, Preise, Toggle-Logik). */
export function PricingSection3() {
  const [isYearly, setIsYearly] = useState(true);
  const pricingRef = useRef<HTMLDivElement>(null);
  const checkoutHref = `${SITE.appBaseUrl}/dashboard/pricing`;

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const togglePricingPeriod = (value: string) =>
    setIsYearly(Number.parseInt(value, 10) === 1);

  return (
    <div className="relative mx-auto max-w-7xl px-4 pt-8 pb-4" ref={pricingRef}>
      <article className="flex flex-col items-start justify-between pb-4 sm:flex-row sm:items-center sm:pb-0">
        <div className="mb-6 text-left">
          <h2 className="neu-fg mb-4 text-4xl font-medium leading-[130%]">
            <NeuRevealText text="Pläne & Preise für Brauereien" />
          </h2>

          <TimelineContent
            as="p"
            animationNum={0}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="neu-muted w-full sm:w-[80%]"
          >
            <NeuRevealText
              wordOffset={5}
              text="Dieselben Tarife wie im BrewAI-Dashboard: Tokens für Bilder und Videos, Teamplätze und Support — wähle den Plan, der zu deiner Brauerei passt."
            />
          </TimelineContent>
        </div>

        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={pricingRef}
          customVariants={revealVariants}
        >
          <PricingSwitch onSwitch={togglePricingPeriod} className="shrink-0" />
        </TimelineContent>
      </article>

      <TimelineContent
        as="div"
        animationNum={2}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="mx-auto grid gap-4 rounded-lg bg-gradient-to-b from-neutral-100 to-neutral-200 sm:p-3 md:grid-cols-3"
      >
        {NEU_STUDIO_PLANS.map((plan, index) => {
          const price = getNeuPlanDisplayMonthlyPrice(plan, isYearly);
          const popular = Boolean(plan.recommended);

          return (
            <TimelineContent
              as="div"
              key={plan.id}
              animationNum={index + 3}
              timelineRef={pricingRef}
              customVariants={revealVariants}
              className={cn(popular && "md:z-10 md:py-2")}
            >
              <Card
                className={cn(
                  "relative flex h-full flex-col justify-between",
                  popular
                    ? "bg-gradient-to-t from-black to-neutral-900 text-white ring-2 ring-neutral-900 md:scale-[1.03]"
                    : "border-none bg-transparent pt-4 text-gray-900 shadow-none",
                )}
              >
                <CardContent className="pt-0">
                  <div className="space-y-2 pb-3">
                    {popular ? (
                      <div className="pt-4">
                        <span className="rounded-full bg-neutral-600 px-3 py-1 text-xs font-medium text-white">
                          Empfohlen
                        </span>
                      </div>
                    ) : (
                      <div className="h-6 pt-4" aria-hidden />
                    )}

                    <div className="flex items-baseline">
                      <span className="text-4xl font-semibold tabular-nums">
                        <NumberFlow
                          value={price}
                          locales="de-DE"
                          format={{
                            style: "currency",
                            currency: "EUR",
                            maximumFractionDigits: 0,
                          }}
                          className="text-4xl font-semibold"
                        />
                      </span>
                      <span className={cn("ml-1", popular ? "text-neutral-200" : "text-gray-600")}>
                        /Monat
                      </span>
                    </div>

                    <p
                      className={cn(
                        "min-h-[2.5rem] text-xs leading-relaxed",
                        popular ? "text-neutral-300" : "text-gray-500",
                      )}
                    >
                      {isYearly
                        ? `${(price * 12).toLocaleString("de-DE")} € jährlich · ${getNeuPlanAnnualSavingsVsList(plan).toLocaleString("de-DE")} € Ersparnis gegenüber monatlicher Zahlung`
                        : "Monatliche Abrechnung · monatlich kündbar"}
                    </p>
                  </div>

                  <h3 className="mb-2 text-3xl font-semibold">{plan.name}</h3>
                  <p className={cn("mb-4 text-sm", popular ? "text-neutral-200" : "text-gray-600")}>
                    {plan.tag}
                  </p>

                  <div className="space-y-3 border-t border-neutral-200 pt-4">
                    <h4 className="mb-3 text-base font-medium">Im Plan enthalten:</h4>
                    <ul className="space-y-2 font-semibold">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <span
                            className={cn(
                              "mt-0.5 mr-3 grid h-6 w-6 flex-shrink-0 place-content-center rounded-full border",
                              popular
                                ? "border-neutral-500 bg-neutral-600 text-white"
                                : "border-black bg-white text-black",
                            )}
                          >
                            <CheckCheck className="h-4 w-4" aria-hidden />
                          </span>
                          <span
                            className={cn(
                              "text-sm font-medium",
                              popular ? "text-neutral-100" : "text-gray-600",
                            )}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href={checkoutHref}
                    className={cn(
                      "mb-6 block w-full rounded-xl p-4 text-center text-xl",
                      popular
                        ? "border border-neutral-400 bg-gradient-to-t from-neutral-100 to-neutral-300 font-semibold text-black shadow-lg shadow-neutral-500"
                        : "border border-neutral-700 bg-gradient-to-t from-neutral-900 to-neutral-600 text-white shadow-lg shadow-neutral-900",
                    )}
                  >
                    Plan wählen
                  </Link>
                </CardFooter>
              </Card>
            </TimelineContent>
          );
        })}
      </TimelineContent>
    </div>
  );
}

export default PricingSection3;
