import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL } from "@/lib/legal";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum und rechtliche Angaben – Erik von Gregory, KI für Brauereien & Gastronomie. Fuchstal.",
  alternates: { canonical: `${SITE.baseUrl}/impressum` },
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <main className="legal-page min-h-screen px-4 py-20 sm:px-6 sm:py-28 md:py-32">
      <article className="legal-article mx-auto max-w-3xl">
        <Link
          href="/"
          className="legal-back mb-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-400/90 transition-colors hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f14] rounded"
        >
          <span aria-hidden>←</span> Zurück zur Startseite
        </Link>

        <h1 className="mb-10 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Impressum
        </h1>

        <div className="legal-content space-y-10 text-base leading-relaxed text-white/90 sm:text-[15px]">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">
              Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)
            </h2>
            <p className="text-white/90">
              {LEGAL.name}
              <br />
              {LEGAL.street}
              <br />
              {LEGAL.city}
              <br />
              {LEGAL.legalForm}
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">Kontakt</h2>
            <p className="space-y-1 text-white/90">
              <span>E-Mail: </span>
              <a
                href={`mailto:${LEGAL.email}`}
                className="text-emerald-400 underline decoration-emerald-400/50 underline-offset-2 transition-colors hover:text-emerald-300"
              >
                {LEGAL.email}
              </a>
              {LEGAL.phone.includes("[") ? null : (
                <>
                  <br />
                  <span>Telefon: {LEGAL.phone}</span>
                </>
              )}
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">
              Umsatzsteuer-Identifikationsnummer
            </h2>
            <p className="text-white/90">{LEGAL.ustId}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">
              Verantwortlich für den Inhalt nach § 5 Abs. 2 DDG
            </h2>
            <p className="text-white/90">
              {LEGAL.name}
              <br />
              {LEGAL.street}
              <br />
              {LEGAL.city}
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">EU-Streitschlichtung</h2>
            <p className="text-white/90">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
              bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 underline decoration-emerald-400/50 underline-offset-2 transition-colors hover:text-emerald-300"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              <br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
            <p className="mt-3 text-white/90">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">Haftungsausschluss</h2>

            <h3 className="mb-2 mt-5 text-base font-medium text-white">Haftung für Inhalte</h3>
            <p className="text-white/90">
              Als Diensteanbieter sind wir gemäß § 6 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 6 bis 10 DDG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
              Tätigkeit hinweisen.
            </p>
            <p className="mt-3 text-white/90">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
              allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
              erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
              Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte
              umgehend entfernen.
            </p>

            <h3 className="mb-2 mt-5 text-base font-medium text-white">Haftung für Links</h3>
            <p className="text-white/90">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
              übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt
              der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
              Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
            <p className="mt-3 text-white/90">
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
              Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>

            <h3 className="mb-2 mt-5 text-base font-medium text-white">Urheberrecht</h3>
            <p className="text-white/90">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
              dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede
              Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien
              dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
            <p className="mt-3 text-white/90">
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
              Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
              gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam
              werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </section>
        </div>

        <nav className="mt-12 flex flex-wrap gap-4 border-t border-white/10 pt-8">
          <Link
            href="/datenschutz"
            className="text-sm font-medium text-emerald-400/90 transition-colors hover:text-emerald-300"
          >
            Datenschutzerklärung
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-emerald-400/90 transition-colors hover:text-emerald-300"
          >
            Startseite
          </Link>
        </nav>
      </article>
    </main>
  );
}
