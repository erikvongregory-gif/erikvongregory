"use client";

import { NeuRevealText } from "@/components/neu/NeuRevealText";

/**
 * Tagline-Block — Blur-Reveal wie EVG Lab, mit Absatz wie zuvor.
 */
export function NeuTagline() {
  return (
    <section className="neu-bg flex min-h-[70vh] items-center justify-center px-6">
      <h2
        className="neu-fg max-w-4xl text-center text-4xl leading-[1.05] tracking-[-1.5px] sm:text-6xl md:text-7xl"
        style={{ fontFamily: "var(--font-velorah-serif), ui-serif, Georgia, serif" }}
      >
        <NeuRevealText text="Damit Brauereien" />
        <br />
        <NeuRevealText wordOffset={2} text="im Feed wachsen." />
      </h2>
    </section>
  );
}
