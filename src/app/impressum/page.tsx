import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL } from "@/lib/legal";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum und rechtliche Angaben – EvGlab, KI für Brauereien & Gastronomie. Fuchstal.",
  alternates: { canonical: `${SITE.baseUrl}/impressum` },
  robots: { index: true, follow: true },
};

const linkAccent =
  "text-emerald-300 underline decoration-emerald-300/55 underline-offset-2 transition-colors hover:text-emerald-200 md:text-[#c65a20] md:decoration-[#c65a20]/45 md:hover:text-[#d46830]";

const footerNavLink =
  "text-sm font-medium text-emerald-300/95 transition-colors hover:text-emerald-200 md:text-[#c65a20] md:hover:text-[#d46830]";

export default function ImpressumPage() {
  return (
    <main className="legal-page relative z-10 min-h-screen px-4 py-20 sm:px-6 sm:py-28 md:py-32">
      <article className="legal-article mx-auto max-w-3xl md:rounded-2xl md:border md:border-zinc-200/70 md:bg-white/85 md:px-8 md:py-10 md:shadow-lg md:backdrop-blur-sm">
        <Link
          href="/"
          className={`legal-back mb-8 inline-flex items-center gap-2 rounded text-sm font-medium text-emerald-300/95 transition-colors hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f14] md:text-[#c65a20] md:hover:text-[#d46830] md:focus-visible:ring-[#c65a20]/50 md:focus-visible:ring-offset-white`}
        >
          <span aria-hidden>←</span> Zurück zur Startseite
        </Link>

        <h1 className="mb-10 text-2xl font-bold text-white sm:text-3xl md:text-4xl md:text-zinc-900">
          Impressum
        </h1>

        <div className="legal-content space-y-10 text-base leading-relaxed text-white/90 sm:text-[15px] md:text-zinc-700">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-white md:text-zinc-900">
              Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)
            </h2>
            <p>
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
            <h2 className="mb-3 text-lg font-semibold text-white md:text-zinc-900">Kontakt</h2>
            <p className="space-y-1">
              <span>E-Mail: </span>
              <a
                href={`mailto:${LEGAL.email}`}
                className={linkAccent}
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
            <h2 className="mb-3 text-lg font-semibold text-white md:text-zinc-900">
              Umsatzsteuer-Identifikationsnummer
            </h2>
            <p>{LEGAL.ustId}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white md:text-zinc-900">
              Verantwortlich für den Inhalt nach § 5 Abs. 2 DDG
            </h2>
            <p>
              {LEGAL.name}
              <br />
              {LEGAL.street}
              <br />
              {LEGAL.city}
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white md:text-zinc-900">EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
              bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkAccent}
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              <br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
            <p className="mt-3">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white md:text-zinc-900">Haftungsausschluss</h2>

            <h3 className="mb-2 mt-5 text-base font-medium text-white md:text-zinc-900">Haftung für Inhalte</h3>
            <p>
              Als Diensteanbieter sind wir gemäß § 6 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 6 bis 10 DDG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
              Tätigkeit hinweisen.
            </p>
            <p className="mt-3">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
              allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
              erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
              Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte
              umgehend entfernen.
            </p>

            <h3 className="mb-2 mt-5 text-base font-medium text-white md:text-zinc-900">Haftung für Links</h3>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
              übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt
              der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
              Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
            <p className="mt-3">
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
              Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>

            <h3 className="mb-2 mt-5 text-base font-medium text-white md:text-zinc-900">Urheberrecht</h3>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
              dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede
              Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien
              dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
            <p className="mt-3">
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
              Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
              gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam
              werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </section>
        </div>

        <nav className="mt-12 flex flex-wrap gap-4 border-t border-white/15 pt-8 md:border-zinc-200">
          <Link href="/agb" className={footerNavLink}>
            AGB
          </Link>
          <Link href="/datenschutz" className={footerNavLink}>
            Datenschutzerklärung
          </Link>
          <Link href="/" className={footerNavLink}>
            Startseite
          </Link>
        </nav>
      </article>
    </main>
  );
}
