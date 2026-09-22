import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL } from "@/lib/legal";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung – BrewAI, KI für Brauereien & Gastronomie. Informationen zur Verarbeitung personenbezogener Daten und Cookies.",
  alternates: { canonical: `${SITE.baseUrl}/datenschutz` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Datenschutzerklärung | BrewAI",
    description: "Informationen zur Verarbeitung personenbezogener Daten bei BrewAI.",
    url: `${SITE.baseUrl}/datenschutz`,
    type: "article",
    images: SITE.ogImage ? [{ url: SITE.ogImage, width: 1200, height: 630, alt: "Datenschutz BrewAI" }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "Datenschutzerklärung | BrewAI",
    description: "Datenschutzinformationen und Betroffenenrechte bei BrewAI.",
    images: SITE.ogImage ? [SITE.ogImage] : undefined,
  },
};

const linkAccent =
  "text-emerald-300 underline decoration-emerald-300/55 underline-offset-2 transition-colors hover:text-emerald-200 md:text-[#c65a20] md:decoration-[#c65a20]/45 md:hover:text-[#d46830]";

const footerNavLink =
  "text-sm font-medium text-emerald-300/95 transition-colors hover:text-emerald-200 md:text-[#c65a20] md:hover:text-[#d46830]";

export default function DatenschutzPage() {
  return (
    <main className="legal-page relative z-10 min-h-screen px-4 pb-20 pt-[calc(68px+3rem)] sm:px-6 sm:pb-28 md:pb-32">
      <article className="legal-article mx-auto max-w-3xl md:rounded-2xl md:border md:border-zinc-200/70 md:bg-white/85 md:px-8 md:py-10 md:shadow-lg md:backdrop-blur-sm">
        <Link
          href="/"
          className={`legal-back mb-8 inline-flex items-center gap-2 rounded text-sm font-medium text-emerald-300/95 transition-colors hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f14] md:text-[#c65a20] md:hover:text-[#d46830] md:focus-visible:ring-[#c65a20]/50 md:focus-visible:ring-offset-white`}
        >
          <span aria-hidden>←</span> Zurück zur Startseite
        </Link>

        <h1 className="mb-10 text-2xl font-bold text-white sm:text-3xl md:text-4xl md:text-zinc-900">
          Datenschutzerklärung
        </h1>

        <div className="legal-content space-y-10 text-base leading-relaxed text-white/90 sm:text-[15px] md:text-zinc-700">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-white md:text-zinc-900">1. Verantwortlicher</h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p className="mt-2">
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
                className={linkAccent}
              >
                {LEGAL.email}
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white md:text-zinc-900">
              2. Allgemeines zur Datenverarbeitung
            </h2>
            <p>
              Der Schutz Ihrer persönlichen Daten ist uns wichtig. Wir behandeln Ihre
              personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <p className="mt-3">
              Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten
              möglich. Soweit auf unseren Seiten personenbezogene Daten (z. B. Name, Anschrift oder
              E-Mail-Adressen) erhoben werden, erfolgt dies stets auf freiwilliger Basis.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white md:text-zinc-900">
              3. Datenerfassung auf dieser Website
            </h2>

            <h3 className="mb-2 mt-5 text-base font-medium text-white md:text-zinc-900">Server-Logfiles</h3>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in
              sogenannten Server-Logfiles, die Ihr Browser automatisch an uns übermittelt. Dies
              sind:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse (anonymisiert oder gekürzt, soweit technisch möglich)</li>
            </ul>
            <p className="mt-3">
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
              Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
              Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien
              Darstellung und der Optimierung seiner Website.
            </p>

            <h3 className="mb-2 mt-5 text-base font-medium text-white md:text-zinc-900">
              Hosting / Content Delivery
            </h3>
            <p>
              Diese Website wird bei externen Dienstleistern gehostet (z. B. Vercel). Die
              personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf Servern
              der Hosting-Partner gespeichert. Je nach technischer Auslieferung kann eine
              Verarbeitung auch außerhalb der Europäischen Union bzw. des Europäischen
              Wirtschaftsraums erfolgen.
            </p>

            <h3 className="mb-2 mt-5 text-base font-medium text-white md:text-zinc-900">
              Externe Schriftarten (Google Fonts)
            </h3>
            <p>
              Diese Seite lädt Schriftarten von Google Fonts (fonts.googleapis.com). Beim Aufruf
              einer Seite wird eine Verbindung zu Servern von Google hergestellt. Dabei kann
              Google Ihre IP-Adresse erfassen. Weitere Informationen finden Sie in der
              Datenschutzerklärung von Google:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className={linkAccent}
              >
                policies.google.com/privacy
              </a>
              . <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse an einer einheitlichen Darstellung der Schriftarten).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white md:text-zinc-900">4. Cookies und lokale Speicherung</h2>
            <p>
              Über das Cookie-Banner können Sie auswählen, welche Kategorien Sie zulassen:
              notwendige Speicherung Ihrer Einstellung, optional Statistik sowie optional
              Marketing. Ihre Auswahl wird lokal im Browser (localStorage) in strukturierter
              Form gespeichert, damit sie bei weiteren Besuchen erhalten bleibt.
            </p>
            <p className="mt-3">
              <strong>Rechtsgrundlage:</strong> Für notwendige Speicherung Ihrer Präferenz: Art.
              6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der funktionsfähigen
              Einstellungsverwaltung). Für Statistik und Marketing, sofern eingesetzt: Art. 6
              Abs. 1 lit. a DSGVO (Einwilligung über das Banner), die Sie mit Wirkung für die
              Zukunft widerrufen können (z. B. über den Footer-Link „Cookie-Einstellungen“ oder
              durch Löschen der lokalen Speicherung im Browser).
            </p>
            <p className="mt-3">
              Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies
              informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies
              für bestimmte Fälle oder generell ausschließen. Bei der Deaktivierung von Cookies
              kann die Funktionalität dieser Website eingeschränkt sein.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white md:text-zinc-900">5. Kontaktformular</h2>
            <p>
              Über das Kontaktformular auf dieser Website können Sie uns eine Nachricht senden.
              Dabei werden folgende Angaben erhoben: Name, E-Mail-Adresse und optional Ihre
              Nachricht. Die Daten werden über den Dienst FormSubmit (FormSubmit.co) an uns
              übermittelt und anschließend per E-Mail an uns weitergeleitet.
            </p>
            <p className="mt-3">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung
              bzw. Vertragserfüllung) oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
              der Bearbeitung Ihrer Anfrage).
            </p>
            <p className="mt-3">
              Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer
              Erhebung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten
              entgegenstehen. Weitere Informationen zum Datenschutz bei FormSubmit finden Sie
              unter{" "}
              <a
                href="https://formsubmit.co/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className={linkAccent}
              >
                formsubmit.co/privacy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white md:text-zinc-900">
              5a. Branchenumfrage (Brauerei-Marketing-Barometer)
            </h2>
            <p>
              Über die Seite /umfrage können Sie an unserer anonymisierten Branchenumfrage
              teilnehmen. Dabei werden Ihre Antworten zu Marketingprozessen in Brauereien
              erhoben und in unserer Datenbank (Supabase) gespeichert. Optional können Sie
              eine E-Mail-Adresse und den Unternehmensnamen angeben, um die Auswertung zu
              erhalten oder eine persönliche Einschätzung anzufordern. Zusätzlich kann eine
              Benachrichtigung über FormSubmit an umfrage@brewai.de weitergeleitet.
            </p>
            <p className="mt-3">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse an Marktforschung und Produktentwicklung) sowie – bei Angabe von
              Kontaktdaten – Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) bzw. Art. 6 Abs. 1 lit. b
              DSGVO (vorvertragliche Maßnahmen auf Ihre Anfrage).
            </p>
            <p className="mt-3">
              Die Auswertung erfolgt grundsätzlich anonymisiert und zusammengefasst. Personenbezogene
              Kontaktdaten werden nur für die Zusendung der Ergebnisse bzw. die von Ihnen
              gewünschte Nachfolgekommunikation genutzt und gelöscht, sobald der Zweck entfällt
              und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white md:text-zinc-900">6. Kontaktaufnahme per E-Mail</h2>
            <p>
              Wenn Sie uns direkt per E-Mail kontaktieren, werden Ihre Angaben (E-Mail-Adresse,
              Nachrichtentext, ggf. Name) zum Zwecke der Bearbeitung Ihrer Anfrage bei uns
              gespeichert.
            </p>
            <p className="mt-3">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung
              bzw. Vertragserfüllung) oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
              der Bearbeitung Ihrer Anfrage).
            </p>
            <p className="mt-3">
              Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer
              Erhebung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten
              entgegenstehen.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white md:text-zinc-900">7. Konto, Login und Dashboard (Supabase)</h2>
            <p>
              Für Registrierung, Anmeldung, Sitzungsverwaltung und den Zugriff auf das Dashboard
              (app.brewai.de) nutzen wir Supabase als Auftragsverarbeiter. Dabei verarbeiten wir insbesondere
              Kontaktdaten (z. B. E-Mail), Authentifizierungsdaten, technische Session-Daten sowie
              nutzungsbezogene Kontodaten (z. B. Brauereiname, Onboarding-Status).
            </p>
            <p className="mt-3">
              <strong>Google-Login:</strong> Wenn Sie „Mit Google anmelden“ nutzen, werden Sie zu Google
              weitergeleitet. Google übermittelt uns nach Ihrer Freigabe insbesondere Ihre E-Mail-Adresse
              und grundlegende Profilangaben. Die Anmeldung erfolgt über unsere Auth-Domain
              (auth.brewai.de) bzw. Supabase. Details zur Datenverarbeitung durch Google finden Sie unter{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className={linkAccent}
              >
                policies.google.com/privacy
              </a>
              .
            </p>
            <p className="mt-3">
              <strong>Team-Einladungen:</strong> Wenn Sie Teammitglieder einladen, verarbeiten wir die
              eingeladene E-Mail-Adresse, Einladungstoken, Status und Zeitstempel, um den Zugang zum
              gemeinsamen Workspace freizuschalten.
            </p>
            <p className="mt-3">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung bzw.
              Durchführung vorvertraglicher Maßnahmen) sowie Art. 6 Abs. 1 lit. f DSGVO
              (Betriebssicherheit, Missbrauchsprävention).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white md:text-zinc-900">8. Abrechnung, Abos und Zahlungen (Stripe)</h2>
            <p>
              Für die Abwicklung von Abonnements, Token-Käufen, Zahlungsbestätigungen und
              Rechnungs-/Portalprozessen setzen wir Stripe ein. Dabei können insbesondere
              Vertrags-, Transaktions-, Kunden- und Zahlungsmetadaten verarbeitet werden
              (z. B. Kundennummer, Abo-Status, Zahlungsreferenzen).
            </p>
            <p className="mt-3">
              Zahlungsdaten werden nicht vollständig auf unseren Servern gespeichert, sondern durch
              Stripe verarbeitet. Wir speichern nur die für Vertrag und Abrechnung erforderlichen
              Referenzdaten (z. B. Stripe Customer ID, Subscription ID, Status).
            </p>
            <p className="mt-3">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung),
              Art. 6 Abs. 1 lit. c DSGVO (gesetzliche Aufbewahrungspflichten), Art. 6 Abs. 1 lit.
              f DSGVO (Betrugsprävention und sichere Zahlungsabwicklung).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white md:text-zinc-900">9. KI-Services, Medien und Integrationen</h2>
            <p>
              Für die Erstellung von Prompts, Texten und Bildern nutzen wir externe KI- und
              Mediendienste. Dabei werden Eingaben aus dem Briefing, Prompt-Inhalte sowie optional
              hochgeladene oder gescannte Referenzbilder an die jeweiligen Dienstleister übermittelt,
              soweit dies zur Leistungserbringung erforderlich ist. Derzeit eingesetzte Anbieter
              umfassen insbesondere:
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1">
              <li>
                <strong>OpenAI</strong> – Bild- und Textgenerierung / Modellaufrufe
              </li>
              <li>
                <strong>Anthropic</strong> – Prompt-/Textunterstützung
              </li>
              <li>
                <strong>Kie.ai</strong> (u. a. Nano Banana, Seedance) – Bild- und Videogenerierung
              </li>
            </ul>
            <p className="mt-3">
              <strong>Instagram-Anbindung:</strong> Wenn Sie Instagram verbinden, verarbeiten wir
              Verbindungsdaten (z. B. Account-Kennungen, Tokens, Scanzeiten) und öffentlich abrufbare
              Profil-/Medienmetadaten, soweit Sie die Funktion aktiv nutzen. Tokens können erneuert
              oder widerrufen werden; bei Ablauf bitten wir um erneute Verbindung.
            </p>
            <p className="mt-3">
              <strong>E-Mail-Versand (Resend):</strong> Transaktionsmails (z. B. Sicherheitscodes,
              Passwort-Reset, Team-Einladungen) versenden wir über Resend. Dabei werden Empfängeradresse,
              Betreff und erforderliche Metadaten verarbeitet.
            </p>
            <p className="mt-3">
              Bitte laden Sie keine unnötigen sensiblen personenbezogenen Daten in Prompts oder
              Referenzbilder hoch. Inhalte können bei Drittanbietern gemäß deren
              Sicherheits-/Aufbewahrungsrichtlinien verarbeitet werden.
            </p>
            <p className="mt-3">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (vertraglich
              angeforderte Leistung) sowie Art. 6 Abs. 1 lit. f DSGVO (technischer Betrieb und
              Qualitätssicherung).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white md:text-zinc-900">10. Empfänger, Drittlandtransfer und Speicherdauer</h2>
            <p>
              Empfänger bzw. Auftragsverarbeiter können insbesondere Hosting-Anbieter (z. B. Vercel),
              Supabase, Stripe, OpenAI, Anthropic, Kie.ai, Google (Login/Fonts), Resend sowie
              Form-/Support-Dienstleister sein. Eine Verarbeitung kann dabei auch in den USA oder
              anderen Drittländern außerhalb der EU/des EWR stattfinden.
            </p>
            <p className="mt-3">
              Soweit Drittlandübermittlungen erfolgen, stützen wir uns – abhängig vom jeweiligen
              Anbieter – insbesondere auf{" "}
              <strong>Standardvertragsklauseln (SCC) der Europäischen Kommission</strong> gemäß
              Art. 46 Abs. 2 lit. c DSGVO und ergänzende technische/organisatorische Maßnahmen. Eine
              Kopie der maßgeblichen Garantien können Sie unter{" "}
              <a href={`mailto:${LEGAL.email}`} className={linkAccent}>
                {LEGAL.email}
              </a>{" "}
              anfordern. Einzelne Anbieter können zusätzlich Zertifizierungen bzw. Rahmenwerke
              (soweit anerkannt) nutzen; der konkrete Mechanismus richtet sich nach dem jeweils
              aktuellen Anbietervertrag.
            </p>
            <p className="mt-3">
              <strong>Speicherdauer:</strong> Kontodaten speichern wir grundsätzlich für die Dauer der
              Vertragsbeziehung und danach nur, soweit gesetzliche Aufbewahrungspflichten bestehen.
              Abrechnungs- und steuerrelevante Daten speichern wir entsprechend gesetzlicher Fristen
              (regelmäßig bis zu 10 Jahre). Prompts, Referenzbilder und KI-Ergebnisse speichern wir in
              Ihrem Workspace/Mediathek, solange Ihr Konto aktiv ist bzw. Sie die Inhalte nicht
              löschen; nach Kontolöschung entfernen wir diese Daten, soweit keine gesetzlichen
              Pflichten oder berechtigten Interessen (z. B. Abwehr von Rechtsansprüchen) entgegenstehen.
              Technische Logs und Support-/Anfragedaten werden gelöscht, sobald der Zweck entfällt.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white md:text-zinc-900">11. Ihre Rechte</h2>
            <p>
              Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden
              personenbezogenen Daten:
            </p>
            <ul className="mt-3 space-y-2">
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
            <p className="mt-3">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an die oben genannte E-Mail-Adresse.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white md:text-zinc-900">12. SSL- bzw. TLS-Verschlüsselung</h2>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
              vertraulicher Inhalte (z. B. Anfragen, die Sie an uns senden) eine SSL- bzw.
              TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die
              Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem
              Schloss-Symbol in Ihrer Browserzeile.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white md:text-zinc-900">13. Änderungen dieser Datenschutzerklärung</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte
              Rechtslagen oder bei Änderungen des Dienstes sowie der Datenverarbeitung
              anzupassen. Die jeweils aktuelle Version finden Sie stets auf dieser Seite.
            </p>
            <p className="mt-3">
              <strong>Stand:</strong> April 2026
            </p>
          </section>
        </div>

        <nav className="mt-12 flex flex-wrap gap-4 border-t border-white/15 pt-8 md:border-zinc-200">
          <Link href="/impressum" className={footerNavLink}>
            Impressum
          </Link>
          <Link href="/agb" className={footerNavLink}>
            AGB
          </Link>
          <Link href="/" className={footerNavLink}>
            Startseite
          </Link>
        </nav>
      </article>
    </main>
  );
}
