import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL } from "@/lib/legal";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung – EvGlabs, KI für Brauereien & Gastronomie. Informationen zur Verarbeitung personenbezogener Daten und Cookies.",
  alternates: { canonical: `${SITE.baseUrl}/datenschutz` },
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
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
          Datenschutzerklärung
        </h1>

        <div className="legal-content space-y-10 text-base leading-relaxed text-white/90 sm:text-[15px]">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">1. Verantwortlicher</h2>
            <p className="text-white/90">
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p className="mt-2 text-white/90">
              {LEGAL.name}
              <br />
              {LEGAL.street}
              <br />
              {LEGAL.city}
              <br />
              <br />
              E-Mail:{" "}
              <a
                href={`mailto:${LEGAL.email}`}
                className="text-emerald-400 underline decoration-emerald-400/50 underline-offset-2 transition-colors hover:text-emerald-300"
              >
                {LEGAL.email}
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">
              2. Allgemeines zur Datenverarbeitung
            </h2>
            <p className="text-white/90">
              Der Schutz Ihrer persönlichen Daten ist uns wichtig. Wir behandeln Ihre
              personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <p className="mt-3 text-white/90">
              Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten
              möglich. Soweit auf unseren Seiten personenbezogene Daten (z. B. Name, Anschrift oder
              E-Mail-Adressen) erhoben werden, erfolgt dies stets auf freiwilliger Basis.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">
              3. Datenerfassung auf dieser Website
            </h2>

            <h3 className="mb-2 mt-5 text-base font-medium text-white">Server-Logfiles</h3>
            <p className="text-white/90">
              Der Provider der Seiten erhebt und speichert automatisch Informationen in
              sogenannten Server-Logfiles, die Ihr Browser automatisch an uns übermittelt. Dies
              sind:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-white/90">
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse (anonymisiert oder gekürzt, soweit technisch möglich)</li>
            </ul>
            <p className="mt-3 text-white/90">
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
              Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
              Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien
              Darstellung und der Optimierung seiner Website.
            </p>

            <h3 className="mb-2 mt-5 text-base font-medium text-white">
              Hosting / Content Delivery
            </h3>
            <p className="text-white/90">
              Diese Website wird bei externen Dienstleistern gehostet (z. B. Vercel). Die
              personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf Servern
              der Hosting-Partner gespeichert. Das Hosting erfolgt ausschließlich in der
              Europäischen Union bzw. im Europäischen Wirtschaftsraum.
            </p>

            <h3 className="mb-2 mt-5 text-base font-medium text-white">
              Externe Schriftarten (Google Fonts)
            </h3>
            <p className="text-white/90">
              Diese Seite lädt Schriftarten von Google Fonts (fonts.googleapis.com). Beim Aufruf
              einer Seite wird eine Verbindung zu Servern von Google hergestellt. Dabei kann
              Google Ihre IP-Adresse erfassen. Weitere Informationen finden Sie in der
              Datenschutzerklärung von Google:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 underline decoration-emerald-400/50 underline-offset-2 transition-colors hover:text-emerald-300"
              >
                policies.google.com/privacy
              </a>
              . <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse an einer einheitlichen Darstellung der Schriftarten).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">4. Cookies und lokale Speicherung</h2>
            <p className="text-white/90">
              Diese Website verwendet Cookies bzw. lokale Speicherung (localStorage), um Ihre
              Cookie-Einstellungen zu speichern. Dabei handelt es sich um technisch notwendige
              Cookies, die ausschließlich dazu dienen, Ihre Wahl (Akzeptanz oder Ablehnung von
              Cookies) zu merken.
            </p>
            <p className="mt-3 text-white/90">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse an der Speicherung Ihrer Präferenz) bzw. Art. 6 Abs. 1 lit. a DSGVO
              (Einwilligung, sofern Sie Cookies akzeptieren).
            </p>
            <p className="mt-3 text-white/90">
              Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies
              informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies
              für bestimmte Fälle oder generell ausschließen. Bei der Deaktivierung von Cookies
              kann die Funktionalität dieser Website eingeschränkt sein.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">5. Kontaktformular</h2>
            <p className="text-white/90">
              Über das Kontaktformular auf dieser Website können Sie uns eine Nachricht senden.
              Dabei werden folgende Angaben erhoben: Name, E-Mail-Adresse und optional Ihre
              Nachricht. Die Daten werden über den Dienst FormSubmit (FormSubmit.co) an uns
              übermittelt und anschließend per E-Mail an uns weitergeleitet.
            </p>
            <p className="mt-3 text-white/90">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung
              bzw. Vertragserfüllung) oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
              der Bearbeitung Ihrer Anfrage).
            </p>
            <p className="mt-3 text-white/90">
              Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer
              Erhebung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten
              entgegenstehen. Weitere Informationen zum Datenschutz bei FormSubmit finden Sie
              unter{" "}
              <a
                href="https://formsubmit.co/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 underline decoration-emerald-400/50 underline-offset-2 transition-colors hover:text-emerald-300"
              >
                formsubmit.co/privacy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">6. Kontaktaufnahme per E-Mail</h2>
            <p className="text-white/90">
              Wenn Sie uns direkt per E-Mail kontaktieren, werden Ihre Angaben (E-Mail-Adresse,
              Nachrichtentext, ggf. Name) zum Zwecke der Bearbeitung Ihrer Anfrage bei uns
              gespeichert.
            </p>
            <p className="mt-3 text-white/90">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung
              bzw. Vertragserfüllung) oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
              der Bearbeitung Ihrer Anfrage).
            </p>
            <p className="mt-3 text-white/90">
              Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer
              Erhebung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten
              entgegenstehen.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">7. Ihre Rechte</h2>
            <p className="text-white/90">
              Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden
              personenbezogenen Daten:
            </p>
            <ul className="mt-3 space-y-2 text-white/90">
              <li>
                <strong>Recht auf Auskunft</strong> (Art. 15 DSGVO): Sie können Auskunft über
                Ihre von uns verarbeiteten personenbezogenen Daten verlangen.
              </li>
              <li>
                <strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO): Sie können die
                unverzügliche Berichtigung unrichtiger Daten verlangen.
              </li>
              <li>
                <strong>Recht auf Löschung</strong> (Art. 17 DSGVO): Sie können die Löschung
                Ihrer bei uns gespeicherten personenbezogenen Daten verlangen.
              </li>
              <li>
                <strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO): Sie
                können die Einschränkung der Verarbeitung Ihrer Daten verlangen.
              </li>
              <li>
                <strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO): Sie können
                verlangen, dass wir Ihre Daten in einem strukturierten, gängigen und
                maschinenlesbaren Format herausgeben.
              </li>
              <li>
                <strong>Widerspruchsrecht</strong> (Art. 21 DSGVO): Sie können jederzeit gegen
                die Verarbeitung Ihrer Daten Widerspruch einlegen.
              </li>
              <li>
                <strong>Widerruf einer Einwilligung</strong> (Art. 7 Abs. 3 DSGVO): Eine
                erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft
                widerrufen.
              </li>
              <li>
                <strong>Beschwerderecht bei einer Aufsichtsbehörde</strong>: Sie haben das Recht,
                sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, z. B. bei der für
                Ihren Wohnsitz zuständigen Landesdatenschutzbehörde.
              </li>
            </ul>
            <p className="mt-3 text-white/90">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an die oben genannte E-Mail-Adresse.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">8. SSL- bzw. TLS-Verschlüsselung</h2>
            <p className="text-white/90">
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
              vertraulicher Inhalte (z. B. Anfragen, die Sie an uns senden) eine SSL- bzw.
              TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die
              Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem
              Schloss-Symbol in Ihrer Browserzeile.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">9. Änderungen dieser Datenschutzerklärung</h2>
            <p className="text-white/90">
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte
              Rechtslagen oder bei Änderungen des Dienstes sowie der Datenverarbeitung
              anzupassen. Die jeweils aktuelle Version finden Sie stets auf dieser Seite.
            </p>
            <p className="mt-3 text-white/90">
              <strong>Stand:</strong> März 2025
            </p>
          </section>
        </div>

        <nav className="mt-12 flex flex-wrap gap-4 border-t border-white/10 pt-8">
          <Link
            href="/impressum"
            className="text-sm font-medium text-emerald-400/90 transition-colors hover:text-emerald-300"
          >
            Impressum
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
