"use client";

const KPI_ITEMS = [
  { before: "1 Post / Woche", after: "4-6 Posts / Woche", label: "Content-Frequenz" },
  { before: "8-12 Std / Woche", after: "2-3 Std / Woche", label: "Zeitaufwand intern" },
  { before: "Unregelmäßige Qualität", after: "Markenkonstant", label: "Visuelle Konsistenz" },
] as const;

const CASES = [
  {
    name: "Brauerei A (regional)",
    result: "+42% Reichweite in 8 Wochen",
    detail: "Durch planbare Kampagnenmotive und klare Themenstruktur pro Woche.",
  },
  {
    name: "Brauerei B (Eventfokus)",
    result: "+31% mehr Anfragen pro Event",
    detail: "Durch visuell konsistente Vorab- und Reminder-Kampagnen für Ausschanktage.",
  },
] as const;

const METHOD = [
  { title: "Capture", text: "Markenstil, Produkte und Angebotslogik werden einmal sauber definiert." },
  { title: "Generate", text: "KI erstellt visuelle Assets für Kampagnen, Social und Website in deinem Stil." },
  { title: "Publish", text: "Ausspielung nach Plan mit klaren Themen, Formaten und messbarer Wirkung." },
] as const;

export function ProofSection() {
  return (
    <section id="proof-section" className="relative z-20 px-4 py-8 sm:py-10 md:py-12">
      <div className="mx-auto max-w-6xl rounded-3xl border border-black/10 bg-gradient-to-br from-black/5 to-black/0 p-6 backdrop-blur-[14px] md:p-8">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(224,122,64,0.35)] bg-[rgba(224,122,64,0.14)] px-4 py-1.5 text-sm font-medium text-[#c65a20]">
            <span aria-hidden>✦</span>
            Ergebnisbeweise
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Was sich mit EvGlab messbar verändert
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {KPI_ITEMS.map((item) => (
            <article className="rounded-2xl border border-black/10 bg-gradient-to-br from-black/5 to-black/0 p-4 backdrop-blur-[14px]" key={item.label}>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">{item.label}</p>
              <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500">
                <span>{item.before}</span>
                <span aria-hidden>→</span>
                <span className="font-semibold text-[#c65a20]">{item.after}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {CASES.map((item) => (
            <article className="rounded-2xl border border-black/10 bg-gradient-to-br from-black/5 to-black/0 p-5 backdrop-blur-[14px]" key={item.name}>
              <p className="text-sm font-semibold text-zinc-900">{item.name}</p>
              <p className="mt-1 text-base font-semibold text-[#c65a20]">{item.result}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.detail}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-black/10 bg-gradient-to-br from-black/5 to-black/0 p-5 backdrop-blur-[14px]">
          <p className="text-sm font-semibold text-zinc-900">Methodik in 3 Schritten</p>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {METHOD.map((item) => (
              <div className="rounded-xl border border-black/10 bg-gradient-to-br from-black/5 to-black/0 p-3 backdrop-blur-[14px]" key={item.title}>
                <p className="text-sm font-semibold text-zinc-900">{item.title}</p>
                <p className="mt-1 text-sm text-zinc-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
