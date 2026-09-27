"use client";

import { APP_URL, CTA_ICONS } from "./data";
import { ParloSnakeDivider, ParloWaveCanvas } from "./ParloEffects";
import { useParloTheme } from "./ParloTheme";
import { ParloPillButton, ParloStarButton } from "./ParloUi";

export function ParloCta() {
  const { theme } = useParloTheme();
  const waveBg = theme === "light" ? "#fafafa" : "#0a0a0a";
  const waveLine =
    theme === "light" ? "rgb(120, 120, 120)" : "rgb(190, 190, 190)";

  return (
    <section className="relative overflow-hidden">
      <ParloSnakeDivider />

      <div className="mx-[30px] border-x border-border">
        <div className="relative isolate overflow-hidden bg-background px-6 py-20 md:py-[120px]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-35"
          >
            <ParloWaveCanvas
              key={theme}
              backgroundColor={waveBg}
              glow={42}
              lineColor={waveLine}
              lineCount={28}
              speed={1.5}
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 z-[1]"
            style={{ background: "var(--cta-overlay)" }}
          />

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="relative mb-10 flex h-16 w-full max-w-md items-center justify-center overflow-hidden">
              <div className="cta-model-marquee absolute inset-y-0 flex items-center gap-6 opacity-50">
                {[...CTA_ICONS, ...CTA_ICONS].map((icon, i) => (
                  <span
                    key={`${icon.alt}-${i}`}
                    className="shrink-0 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
                  >
                    {icon.label}
                  </span>
                ))}
              </div>
            </div>

            <h2 className="text-balance text-3xl font-medium tracking-tight text-foreground md:text-5xl">
              Erste Motive heute im Dashboard.
            </h2>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ParloStarButton href={APP_URL} aria-label="Dashboard öffnen">
                Dashboard öffnen
              </ParloStarButton>
              <ParloPillButton
                href="#pricing"
                variant="outline"
                className="h-11 px-5"
              >
                Preise ansehen
              </ParloPillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
