const STATS = [
  { label: "ab", value: "79", suffix: "€", description: "pro Monat für Brauerei Start" },
  { label: "bis zu", value: "42", suffix: "s", description: "bis zum ersten Motiv" },
  { label: "inkl.", value: "DE", description: "Hosting & DSGVO-Fokus" },
  { label: "1", value: "Ort", description: "für Bilder, Posts & Bewertungen" },
] as const;

export function Neuv2Stats() {
  return (
    <section className="nv-section">
      <div className="mx-auto max-w-[960px]">
        <div className="grid grid-cols-2 gap-12 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.description} className="flex flex-col items-start gap-3 text-left">
              <div className="text-sm font-semibold text-[var(--muted-foreground)]">{s.label}</div>
              <div className="flex items-baseline gap-2">
                <div
                  className="bg-gradient-to-r from-[var(--foreground)] to-[var(--brand)] bg-clip-text text-4xl font-medium text-transparent sm:text-5xl md:text-6xl"
                  style={{ filter: "drop-shadow(2px 1px 24px var(--brand-foreground))" }}
                >
                  {s.value}
                </div>
                {"suffix" in s && s.suffix ? (
                  <div className="text-2xl font-semibold text-[var(--brand)]">{s.suffix}</div>
                ) : null}
              </div>
              <div className="text-sm font-semibold text-pretty text-[var(--muted-foreground)]">
                {s.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
