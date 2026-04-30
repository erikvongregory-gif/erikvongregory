import Link from "next/link";

const PAGES = [
  {
    href: "/loesungen",
    title: "Saisonkampagnen für Brauereien",
    summary:
      "Von Frühlingsbier bis Winteraktion: Kampagnenmotive, Angebotsvisuals und Social-Posts in einem klaren Ablauf.",
    fitsFor: "Ideal für Brauereien mit saisonalen Peaks und wechselnden Aktionen.",
    deliverables: [
      "Kampagnen-Keyvisual + Varianten",
      "Social-Post-Set für 2-4 Wochen",
      "Aktionsmotive für Händler/Gastro",
    ],
    impact: "Schneller live gehen, ohne Qualitätsverlust bei jeder Saison.",
  },
  {
    href: "/loesungen",
    title: "Biergarten- & Event-Marketing",
    summary:
      "Content für Ausschanktage, Verkostungen und Eventwochen: planbar vorbereitet statt kurz vor knapp.",
    fitsFor: "Perfekt für Betriebe mit regionalen Events und wechselndem Wochenprogramm.",
    deliverables: [
      "Event-Visuals in Serienlogik",
      "Story-/Reel-Assets für Vor-Ort-Kommunikation",
      "Promo-Motive für Wochenaktionen",
    ],
    impact: "Mehr Sichtbarkeit rund ums Event und weniger Last-Minute-Stress.",
  },
  {
    href: "/loesungen",
    title: "Händler- & Gastro-Promotion",
    summary:
      "Co-Branding-Visuals für Getränkemärkte, Gastro und Handelspartner - mit konsistenter Markenführung.",
    fitsFor: "Wenn mehrere Partner mit deiner Marke arbeiten und einheitlich auftreten sollen.",
    deliverables: [
      "Partner-spezifische Promo-Motive",
      "Vorlagen für Händler und Gastro",
      "Markenkonforme Varianten pro Standort",
    ],
    impact: "Wiedererkennung über alle Partnerkanäle statt Flickenteppich.",
  },
] as const;

export function UseCaseClusterLinks() {
  return (
    <section className="relative z-[70] px-4 py-10 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(224,122,64,0.35)] bg-[rgba(224,122,64,0.14)] px-4 py-1.5 text-sm font-medium text-[#c65a20]">
            <span aria-hidden>✦</span>
            Brauerei-Szenarien
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Lösungen für konkrete Brauerei-Szenarien
          </h2>
          <p className="max-w-2xl text-sm text-zinc-600 sm:text-base">
            Wähle das Szenario, das bei dir gerade Priorität hat, und sieh direkt, welche Assets, Abläufe und Ergebnisse dazugehören.
          </p>
        </div>
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/55 bg-white/40 px-4 py-3 text-center backdrop-blur-xl">
            <p className="text-[11px] uppercase tracking-[0.08em] text-zinc-500">Fokus</p>
            <p className="mt-1 text-sm font-semibold text-zinc-900">Nur Brauerei-Use-Cases</p>
          </div>
          <div className="rounded-xl border border-white/55 bg-white/40 px-4 py-3 text-center backdrop-blur-xl">
            <p className="text-[11px] uppercase tracking-[0.08em] text-zinc-500">Output</p>
            <p className="mt-1 text-sm font-semibold text-zinc-900">Konkrete Assets statt Theorie</p>
          </div>
          <div className="rounded-xl border border-white/55 bg-white/40 px-4 py-3 text-center backdrop-blur-xl">
            <p className="text-[11px] uppercase tracking-[0.08em] text-zinc-500">Nutzen</p>
            <p className="mt-1 text-sm font-semibold text-zinc-900">Schneller veröffentlichen</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {PAGES.map((page) => (
            <article
              key={page.href}
              className="evg-clean-hover rounded-2xl border border-white/55 bg-white/42 p-4 shadow-[0_14px_30px_-20px_rgba(24,24,27,0.26)] backdrop-blur-xl hover:border-[#e07a40]/35 hover:shadow-[0_16px_34px_-20px_rgba(198,90,32,0.24)]"
            >
              <h3 className="text-base font-semibold text-zinc-900">{page.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{page.summary}</p>
              <p className="mt-3 text-xs font-medium text-zinc-500">{page.fitsFor}</p>
              <ul className="mt-3 space-y-1.5">
                {page.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-700">
                    <span className="mt-[2px] text-[#c65a20]" aria-hidden>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 rounded-lg border border-[rgba(224,122,64,0.22)] bg-[rgba(224,122,64,0.08)] px-3 py-2 text-xs font-medium text-[#b45309]">
                Ergebnis: {page.impact}
              </p>
              <Link
                href={page.href}
                className="mt-3 inline-flex text-sm font-medium text-[#c65a20] transition hover:text-[#d46830] hover:underline"
              >
                Im Überblick ansehen
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
