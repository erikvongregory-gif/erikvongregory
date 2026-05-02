import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Premium vs. Dashboard-Abo: Was passt zu deiner Brauerei? | EvGlab",
  description:
    "Vergleich für Brauereien in DACH: fertig gelieferte Premium-Pakete vs. monatliches KI-Dashboard mit Tokens — Aufwand, Kosten, Geschwindigkeit und Qualität.",
  alternates: { canonical: `${SITE.baseUrl}/vergleich/premium-vs-dashboard-abo-brauerei` },
  openGraph: {
    title: "Premium vs. Dashboard-Abo | EvGlab",
    description: "Entscheidungshilfe für Brauereien: Premium-Lieferung oder Self-Service mit Tokens.",
    url: `${SITE.baseUrl}/vergleich/premium-vs-dashboard-abo-brauerei`,
    locale: "de_DE",
    type: "article",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wann lohnt sich ein Premium-Paket statt Dashboard-Abo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Premium-Pakete eignen sich, wenn du wenig interne Kapazität hast, klare Liefertermine brauchst und ein definiertes Ergebnis (z. B. Paket an Bildern und Posts) willst. Das Abo lohnt sich bei regelmäßigem Bedarf und Team, das aktiv im Tool arbeitet.",
      },
    },
    {
      "@type": "Question",
      name: "Kann ich später vom Paket zum Abo wechseln?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, viele Teams starten mit einer einmaligen Lieferung und wechseln danach ins Dashboard, sobald sie intern Routinen für Content haben. Die genaue Kombination hängt von Kampagnenrhythmus und Personal ab.",
      },
    },
    {
      "@type": "Question",
      name: "Für welche Region ist EvGlab gedacht?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EvGlab richtet sich an Brauereien und Getränkemarken in Deutschland, Österreich und der Schweiz (DACH). Inhalte und Angebote sind auf diese Märkte und deutschsprachige Kommunikation ausgelegt.",
      },
    },
  ],
};

export default function VergleichPremiumDashboardPage() {
  return (
    <article className="min-h-screen bg-white text-zinc-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <nav className="mb-8 text-sm text-zinc-600">
          <Link href="/" className="text-[#b45309] hover:underline">
            Start
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span className="text-zinc-800">Vergleich</span>
        </nav>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Premium-Umsetzung vs. Dashboard-Abo für Brauereien</h1>
        <p className="mt-4 text-lg text-zinc-600">
          Kurzentscheidung für <strong>Teams in DACH</strong>: maximale Entlastung durch Lieferung oder Kontrolle und
          Tempo im Self-Service.
        </p>

        <div className="mt-10 space-y-10 text-zinc-700">
          <section aria-labelledby="premium-heading">
            <h2 id="premium-heading" className="text-xl font-semibold text-zinc-900">
              Premium-Pakete (Einmallieferung)
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">
              <li>
                <strong>Vorteil:</strong> Du bekommst fertige Bilder und Texte nach Briefing — ideal, wenn niemand
                intern „Prompten“ soll.
              </li>
              <li>
                <strong>Typischer Einsatz:</strong> Relaunch einer Saisonkampagne, neues Sortiment, oder schneller
                Social-Refresh ohne Tool-Schulung.
              </li>
              <li>
                <strong>Trade-off:</strong> Weniger spontane Iteration zwischen zwei Meetings; Änderungen laufen über
                Abstimmung.
              </li>
            </ul>
          </section>

          <section aria-labelledby="abo-heading">
            <h2 id="abo-heading" className="text-xl font-semibold text-zinc-900">
              Dashboard-Abo (Tokens, Self-Service)
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">
              <li>
                <strong>Vorteil:</strong> Du erzeugst Motive und Texte in Eigenregie — schnell, wenn z. B. ein
                Event-Termin kurzfristig kommt.
              </li>
              <li>
                <strong>Typischer Einsatz:</strong> Brauereien mit Marketing-Person oder Agentur, die wöchentlich
                mehrere Beiträge spielt.
              </li>
              <li>
                <strong>Trade-off:</strong> Interne Zeit für Kuratierung und Freigabe bleibt nötig; Qualität skaliert
                mit Disziplin im Markenprofil.
              </li>
            </ul>
          </section>

          <section aria-labelledby="fazit-heading">
            <h2 id="fazit-heading" className="text-xl font-semibold text-zinc-900">
              Fazit
            </h2>
            <p className="mt-4 leading-relaxed">
              Wenn du <strong>maximale Ruhe und klare Lieferobjekte</strong> willst, starte mit Premium. Wenn du{" "}
              <strong>laufend</strong> viele Varianten brauchst und ein Team hast, das gerne im Dashboard arbeitet, ist
              das Abo die effizientere Basis. Technische Details und aktuelle Pakete findest du auf der{" "}
              <Link href="/#pakete" className="text-[#b45309] hover:underline">
                Startseite unter Pakete &amp; Abos
              </Link>
              . Eine Schritt-für-Schritt-Anleitung für KI-Inhalte steht im{" "}
              <Link href="/ratgeber/marketing-inhalte-mit-ki" className="text-[#b45309] hover:underline">
                Ratgeber Marketing mit KI
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
