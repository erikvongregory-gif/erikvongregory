import Link from "next/link";

const PAGES = [
  {
    href: "/loesungen/saisonkampagne-brauerei",
    title: "Saisonkampagnen für Brauereien",
    text: "Wie du Frühlings-, Sommer- oder Winteraktionen mit KI-Content schneller veröffentlichst.",
  },
  {
    href: "/loesungen/biergarten-event-marketing",
    title: "Biergarten- & Event-Marketing",
    text: "Planbarer Content für Verkostungen, Ausschanktage und lokale Events.",
  },
  {
    href: "/loesungen/haendler-gastro-promotion",
    title: "Händler- & Gastro-Promotion",
    text: "Co-Branding-Visuals für Partnerbetriebe mit konsistentem Markenauftritt.",
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
            Vertiefe genau den Bereich, der für dein Wachstum gerade am wichtigsten ist.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {PAGES.map((page) => (
            <article
              key={page.href}
              className="evg-clean-hover rounded-2xl border border-white/55 bg-white/42 p-4 shadow-[0_14px_30px_-20px_rgba(24,24,27,0.26)] backdrop-blur-xl hover:border-[#e07a40]/35 hover:shadow-[0_16px_34px_-20px_rgba(198,90,32,0.24)]"
            >
              <h3 className="text-base font-semibold text-zinc-900">{page.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{page.text}</p>
              <Link
                href={page.href}
                className="mt-3 inline-flex text-sm font-medium text-[#c65a20] transition hover:text-[#d46830] hover:underline"
              >
                Seite ansehen
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
