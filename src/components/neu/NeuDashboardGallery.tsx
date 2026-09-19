"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Safari } from "@/components/ui/safari";
import { NeuRevealText } from "@/components/neu/NeuRevealText";

export function NeuDashboardGallery() {
  return (
    <section id="dashboard" className="neu-bg relative scroll-mt-24 overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <p className="neu-faint text-xs uppercase tracking-[0.3em]">
              <NeuRevealText text="Dashboard" />
            </p>
            <h2
              className="neu-fg mt-3 text-3xl leading-tight tracking-[-1px] sm:text-5xl md:text-6xl"
              style={{ fontFamily: "var(--font-velorah-serif), ui-serif, Georgia, serif" }}
            >
              <NeuRevealText
                wordOffset={1}
                text="Alles, was deine Brauerei braucht — in einem Blick."
              />
            </h2>
          </>
        }
      >
        <Safari
          url="app.brewai.de"
          src="/neu/dashboard/dashboard-full.webp"
          className="h-auto w-full"
        />
      </ContainerScroll>
    </section>
  );
}
