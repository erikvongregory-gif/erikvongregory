"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import { useLoading } from "@/context/LoadingContext";
import { KI_BEISPIELE } from "@/lib/kiBeispiele";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const HERO_FLOAT_LAYOUT = [
  {
    depth: 0.5 as const,
    className: "left-[2%] top-[15%] md:left-[5%] md:top-[25%]",
    imgClass: "h-12 w-16 -rotate-[3deg] sm:h-16 sm:w-24 md:h-20 md:w-28 lg:h-24 lg:w-32",
    delay: 0.5,
  },
  {
    depth: 1 as const,
    className: "left-[8%] top-0 md:left-[11%] md:top-[6%]",
    imgClass: "h-28 w-40 -rotate-12 sm:h-36 sm:w-48 md:h-44 md:w-56 lg:h-48 lg:w-60",
    delay: 0.7,
  },
  {
    depth: 4 as const,
    className: "left-[6%] top-[90%] md:left-[8%] md:top-[80%]",
    imgClass: "h-40 w-40 -rotate-[4deg] sm:h-48 sm:w-48 md:h-60 md:w-60 lg:h-64 lg:w-64",
    delay: 0.9,
  },
  {
    depth: 2 as const,
    className: "left-[87%] top-0 md:left-[83%] md:top-[2%]",
    imgClass: "h-36 w-40 rotate-[6deg] sm:h-44 sm:w-48 md:h-52 md:w-60 lg:h-56 lg:w-64",
    delay: 1.1,
  },
  {
    depth: 1 as const,
    className: "left-[83%] top-[78%] md:left-[83%] md:top-[68%]",
    imgClass: "h-44 w-44 rotate-[19deg] sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80",
    delay: 1.3,
  },
] as const;

function Hero() {
  const { heroReady } = useLoading();
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["KI-gestützt", "automatisiert", "skalierbar"], []);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [freeTrialImageUsed, setFreeTrialImageUsed] = useState(false);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setIsAuthenticated(false);
      setFreeTrialImageUsed(false);
      setHasActiveSubscription(false);
      return;
    }

    const supabase = createSupabaseClient();
    let active = true;

    const loadHeroCtaState = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!active) return;
      const hasSession = Boolean(session?.user);
      setIsAuthenticated(hasSession);
      if (!hasSession) {
        setFreeTrialImageUsed(false);
        setHasActiveSubscription(false);
        return;
      }
      try {
        const res = await fetch("/api/billing/state", { cache: "no-store" });
        if (!active) return;
        if (!res.ok) {
          setFreeTrialImageUsed(false);
          return;
        }
        const data = (await res.json()) as {
          state?: {
            freeTrialImageUsed?: boolean;
            plan?: string | null;
            status?: string;
          };
        };
        setFreeTrialImageUsed(Boolean(data.state?.freeTrialImageUsed));
        const status = data.state?.status ?? "none";
        const plan = data.state?.plan ?? null;
        setHasActiveSubscription(Boolean(plan) && status !== "none" && status !== "canceled");
      } catch {
        if (active) {
          setFreeTrialImageUsed(false);
          setHasActiveSubscription(false);
        }
      }
    };

    void loadHeroCtaState();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setIsAuthenticated(Boolean(session?.user));
      void loadHeroCtaState();
    });

    const onBillingUpdated = () => {
      void loadHeroCtaState();
    };
    window.addEventListener("evglab-billing-updated", onBillingUpdated as EventListener);

    return () => {
      active = false;
      subscription.unsubscribe();
      window.removeEventListener("evglab-billing-updated", onBillingUpdated as EventListener);
    };
  }, []);

  const primaryCtaLabel = useMemo(() => {
    if (!isAuthenticated) return "1 Bild kostenlos generieren";
    if (hasActiveSubscription) return "Zum Dashboard";
    if (freeTrialImageUsed) return "Zu Abo & Tokens";
    return "Jetzt kostenloses Bild erstellen";
  }, [isAuthenticated, freeTrialImageUsed, hasActiveSubscription]);

  const onPrimaryCtaClick = () => {
    if (typeof window === "undefined") return;
    if (!isAuthenticated) {
      window.dispatchEvent(
        new CustomEvent("evglab-open-auth-modal", {
          detail: { mode: "signup" },
        }),
      );
      return;
    }
    window.location.assign("/dashboard");
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="relative w-full overflow-visible">
      <Floating sensitivity={-0.5} className="pointer-events-none absolute inset-0 z-0 hidden h-full min-h-full md:block" aria-hidden>
        {HERO_FLOAT_LAYOUT.map((slot, i) => {
          const imgIndex = i < KI_BEISPIELE.length ? i : 1;
          const img = KI_BEISPIELE[imgIndex];
          return (
            <FloatingElement key={`hero-float-${i}-${img.src}`} depth={slot.depth} className={slot.className}>
              {heroReady ? (
                <BlurFade delay={slot.delay} duration={0.45} blur="8px">
                  <motion.img
                    src={img.src}
                    alt=""
                    className={`cursor-default rounded-xl object-cover shadow-2xl duration-200 blur-[2px] sm:blur-[3px] md:blur-[4px] ${slot.imgClass}`}
                  />
                </BlurFade>
              ) : null}
            </FloatingElement>
          );
        })}
      </Floating>
      <div className="container mx-auto">
        <div className="relative z-10 flex flex-col items-center justify-center gap-8 py-20 max-md:gap-6 max-md:pb-12 max-md:pt-28 sm:max-md:pb-16 sm:max-md:pt-32 lg:py-40">
          {heroReady ? (
            <>
              <BlurFade delay={0.04} duration={0.45} className="hidden md:block">
                <Button variant="secondary" size="sm" className="gap-4">
                  Fokus: KI-Content für Brauereien <MoveRight className="w-4 h-4" />
                </Button>
              </BlurFade>
              <BlurFade delay={0.04} duration={0.45} className="md:hidden">
                <Button variant="secondary" size="sm" className="gap-2 text-xs">
                  Fokus: KI-Content für Brauereien <MoveRight className="h-3.5 w-3.5" />
                </Button>
              </BlurFade>

              <BlurFade delay={0.12} duration={0.48} className="flex flex-col gap-4 max-md:mx-auto max-md:w-[min(92vw,22rem)]">
                <h1 className="max-w-2xl text-center text-5xl font-regular tracking-tighter max-md:mx-auto max-md:w-full max-md:max-w-[18.5rem] max-md:text-[2rem] max-md:leading-[1.12] md:text-7xl">
                  <span className="text-spektr-cyan-50">KI-Content-System für Brauereien</span>
                  <span className="relative flex w-full justify-center overflow-hidden text-center max-md:mt-2 max-md:min-h-[2.6rem] sm:max-md:min-h-[3rem] md:min-h-0 md:pb-4 md:pt-1">
                    &nbsp;
                    {titles.map((title, index) => (
                      <motion.span
                        key={index}
                        className="absolute font-semibold max-md:px-1 max-md:text-[2rem] sm:max-md:text-[2.25rem] md:px-0 md:text-[1.12em]"
                        initial={{ opacity: 0, y: "-100" }}
                        transition={{ type: "spring", stiffness: 50 }}
                        animate={
                          titleNumber === index
                            ? { y: 0, opacity: 1 }
                            : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                        }
                      >
                        {title}
                      </motion.span>
                    ))}
                  </span>
                </h1>

                <p className="max-w-2xl text-center text-lg leading-relaxed tracking-tight text-muted-foreground max-md:mx-auto max-md:w-full max-md:max-w-[21rem] max-md:px-2 max-md:text-[1rem] max-md:leading-[1.42] sm:max-md:text-lg md:text-xl">
                  <span className="max-md:text-zinc-700">Weniger Aufwand, bessere Ergebnisse:</span>{" "}
                  <span className="hero-mobile-subtitle-shine">KI-Produktfotos, Kampagnenmotive und Social-Content</span>{" "}
                  <span className="max-md:text-zinc-600">in deinem Markenstil.</span>
                </p>
              </BlurFade>

              <BlurFade delay={0.2} duration={0.5} className="hidden flex-row flex-wrap items-center justify-center gap-3 md:flex">
                <div>
                  <LiquidMetalButton
                    label={primaryCtaLabel}
                    onClick={onPrimaryCtaClick}
                  />
                </div>
                <div>
                  <LiquidMetalButton
                    label="Beispiele ansehen"
                    onClick={() => {
                      if (typeof window === "undefined") return;
                      const el = document.getElementById("echte-beispiele-aus-der-praxis");
                      if (!el) return;
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  />
                </div>
              </BlurFade>

              <BlurFade delay={0.2} duration={0.5} className="flex w-full flex-col items-center gap-3 md:hidden">
                <div className="flex justify-center">
                  <Button
                    onClick={onPrimaryCtaClick}
                    className="h-[50px] w-[224px] rounded-[100px] bg-[#c65a20] text-[15px] font-normal text-white transition hover:bg-[#b14f1c]"
                  >
                    {primaryCtaLabel}
                  </Button>
                </div>
                <div className="flex w-[min(92vw,22rem)] justify-center">
                  <LiquidMetalButton
                    label="Beispiele ansehen"
                    size="large"
                    onClick={() => {
                      if (typeof window === "undefined") return;
                      const el = document.getElementById("echte-beispiele-aus-der-praxis");
                      if (!el) return;
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  />
                </div>
              </BlurFade>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export { Hero };
