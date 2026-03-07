import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum | Erik von Gregory",
  description: "Impressum und rechtliche Angaben – Erik von Gregory, KI für Brauereien & Gastronomie.",
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1f0f] to-[#0d2818] px-4 py-24 sm:px-6 sm:py-32">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-emerald-400/90 transition-colors hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1f0f] rounded"
        >
          ← Zurück
        </Link>
        <h1 className="mb-8 text-2xl font-bold text-white sm:text-3xl">Impressum</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-sm leading-relaxed text-white/85 prose-headings:text-white prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:text-emerald-300">
          <section>
            <h2 className="text-base font-semibold text-white">Angaben gemäß § 5 TMG</h2>
            <p className="mt-2">
              Erik von Gregory
              <br />
              [Straße und Hausnummer]
              <br />
              [PLZ und Ort]
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white">Kontakt</h2>
            <p className="mt-2">
              E-Mail:{" "}
              <a href="mailto:kontakt@erikvongregory.de">kontakt@erikvongregory.de</a>
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white">Verantwortlich für den Inhalt</h2>
            <p className="mt-2">
              Erik von Gregory
              <br />
              [Adresse wie oben]
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white">Haftungsausschluss</h2>
            <h3 className="mt-4 text-sm font-medium">Haftung für Inhalte</h3>
            <p className="mt-2">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
            <h3 className="mt-4 text-sm font-medium">Haftung für Links</h3>
            <p className="mt-2">
              Unser Angebot enthält Links zu externen Webseiten. Für die Inhalte der verlinkten
              Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
