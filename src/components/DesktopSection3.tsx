"use client";

/** Statische Section 3 – Bist du bereit? */
export function DesktopSection3() {
  return (
    <section className="relative z-20 flex min-h-screen items-center justify-center py-12 sm:py-16 md:py-24">
      <div className="section3-card mx-auto max-w-3xl px-4 text-center antialiased lg:px-6">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-emerald-400/90">
          Dein nächster Schritt
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
          Bist du{" "}
          <a
            href="#contact"
            className="section3-cta-link pointer-events-auto relative inline-block transition-all duration-300 hover:scale-105"
          >
            <span
              className="section3-bereit-glow relative z-10"
              style={{
                fontFamily: "var(--font-austera)",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              bereit
            </span>
          </a>
          ?
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Sprich mit mir über deine Brauerei – unverbindlich & direkt.
        </p>
      </div>
    </section>
  );
}
