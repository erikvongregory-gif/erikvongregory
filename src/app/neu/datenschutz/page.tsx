import type { Metadata } from "next";
import { LEGAL } from "@/lib/legal";
import {
  NeuLegalPage,
  neuLegalH2,
  neuLegalH3,
  neuLegalLink,
} from "@/components/neu/NeuLegalPage";

export const metadata: Metadata = {
  title: "Datenschutz · Preview",
  robots: { index: false, follow: false },
};

export default function NeuDatenschutzPage() {
  return (
    <NeuLegalPage
      title="Datenschutzerklärung"
      related={[
        { href: "/impressum", label: "Impressum" },
        { href: "/agb", label: "AGB" },
      ]}
    >
      <section>
        <h2 className={neuLegalH2}>1. Verantwortlicher</h2>
        <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
        <p className="mt-2">
          {LEGAL.name}
          <br />
          {LEGAL.street}
          <br />
          {LEGAL.city}
          <br />
          <br />
          E-Mail:{" "}
          <a href={`mailto:${LEGAL.email}`} className={neuLegalLink}>
            {LEGAL.email}
          </a>
        </p>
      </section>

      <section>
        <h2 className={neuLegalH2}>2. Allgemeines zur Datenverarbeitung</h2>
        <p>
          Der Schutz Ihrer persönlichen Daten ist uns wichtig. Wir behandeln Ihre personenbezogenen
          Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser
          Datenschutzerklärung.
        </p>
        <p className="mt-3">
          Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich.
          Soweit auf unseren Seiten personenbezogene Daten (z. B. Name, Anschrift oder E-Mail-Adressen)
          erhoben werden, erfolgt dies stets auf freiwilliger Basis.
        </p>
      </section>

      <section>
        <h2 className={neuLegalH2}>3. Datenerfassung auf dieser Website</h2>

        <h3 className={neuLegalH3}>Server-Logfiles</h3>
        <p>
          Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten
          Server-Logfiles, die Ihr Browser automatisch an uns übermittelt. Dies sind:
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
          Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die
          Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der
          Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und
          der Optimierung seiner Website.
        </p>

        <h3 className={neuLegalH3}>Hosting / Content Delivery</h3>
        <p>
          Diese Website wird bei externen Dienstleistern gehostet (z. B. Vercel). Die
          personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf Servern der
          Hosting-Partner gespeichert. Je nach technischer Auslieferung kann eine Verarbeitung auch
          außerhalb der Europäischen Union bzw. des Europäischen Wirtschaftsraums erfolgen.
        </p>

        <h3 className={neuLegalH3}>Externe Schriftarten (Google Fonts)</h3>
        <p>
          Diese Seite lädt Schriftarten von Google Fonts (fonts.googleapis.com). Beim Aufruf einer Seite
          wird eine Verbindung zu Servern von Google hergestellt. Dabei kann Google Ihre IP-Adresse
          erfassen. Weitere Informationen finden Sie in der Datenschutzerklärung von Google:{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className={neuLegalLink}
          >
            policies.google.com/privacy
          </a>
          . <strong className="neu-fg opacity-90">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
          (berechtigtes Interesse an einer einheitlichen Darstellung der Schriftarten).
        </p>
      </section>

      <section>
        <h2 className={neuLegalH2}>4. Cookies und lokale Speicherung</h2>
        <p>
          Über das Cookie-Banner können Sie auswählen, welche Kategorien Sie zulassen: notwendige
          Speicherung Ihrer Einstellung, optional Statistik sowie optional Marketing. Ihre Auswahl wird
          lokal im Browser (localStorage) in strukturierter Form gespeichert, damit sie bei weiteren
          Besuchen erhalten bleibt.
        </p>
        <p className="mt-3">
          <strong className="neu-fg opacity-90">Rechtsgrundlage:</strong> Für notwendige Speicherung Ihrer
          Präferenz: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der funktionsfähigen
          Einstellungsverwaltung). Für Statistik und Marketing, sofern eingesetzt: Art. 6 Abs. 1 lit. a
          DSGVO (Einwilligung über das Banner), die Sie mit Wirkung für die Zukunft widerrufen können
          (z. B. über den Footer-Link „Cookies“ oder durch Löschen der lokalen Speicherung im Browser).
        </p>
        <p className="mt-3">
          Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden
          und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder
          generell ausschließen. Bei der Deaktivierung von Cookies kann die Funktionalität dieser
          Website eingeschränkt sein.
        </p>
      </section>

      <section>
        <h2 className={neuLegalH2}>5. Kontaktformular</h2>
        <p>
          Über das Kontaktformular auf dieser Website können Sie uns eine Nachricht senden. Dabei werden
          folgende Angaben erhoben: Name, E-Mail-Adresse und optional Ihre Nachricht. Die Daten werden
          über den Dienst FormSubmit (FormSubmit.co) an uns übermittelt und anschließend per E-Mail an
          uns weitergeleitet.
        </p>
        <p className="mt-3">
          <strong className="neu-fg opacity-90">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
          (Vertragsanbahnung bzw. Vertragserfüllung) oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
          Interesse an der Bearbeitung Ihrer Anfrage).
        </p>
        <p className="mt-3">
          Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr
          erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Weitere
          Informationen zum Datenschutz bei FormSubmit finden Sie unter{" "}
          <a
            href="https://formsubmit.co/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className={neuLegalLink}
          >
            formsubmit.co/privacy
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className={neuLegalH2}>6. Kontaktaufnahme per E-Mail</h2>
        <p>
          Wenn Sie uns direkt per E-Mail kontaktieren, werden Ihre Angaben (E-Mail-Adresse,
          Nachrichtentext, ggf. Name) zum Zwecke der Bearbeitung Ihrer Anfrage bei uns gespeichert.
        </p>
        <p className="mt-3">
          <strong className="neu-fg opacity-90">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
          (Vertragsanbahnung bzw. Vertragserfüllung) oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
          Interesse an der Bearbeitung Ihrer Anfrage).
        </p>
        <p className="mt-3">
          Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr
          erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>
      </section>

      <section>
        <h2 className={neuLegalH2}>7. Konto, Login und Dashboard (Supabase)</h2>
        <p>
          Für Registrierung, Anmeldung, Sitzungsverwaltung und den Zugriff auf das Dashboard
          (app.brewai.de) nutzen wir Supabase als Auftragsverarbeiter. Dabei verarbeiten wir
          insbesondere Kontaktdaten (z. B. E-Mail), Authentifizierungsdaten, technische Session-Daten
          sowie nutzungsbezogene Kontodaten (z. B. Brauereiname, Onboarding-Status).
        </p>
        <p className="mt-3">
          <strong className="neu-fg opacity-90">Google-Login:</strong> Wenn Sie „Mit Google anmelden“ nutzen,
          werden Sie zu Google weitergeleitet. Google übermittelt uns nach Ihrer Freigabe insbesondere
          Ihre E-Mail-Adresse und grundlegende Profilangaben. Die Anmeldung erfolgt über unsere
          Auth-Domain (auth.brewai.de) bzw. Supabase. Details zur Datenverarbeitung durch Google finden
          Sie unter{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className={neuLegalLink}
          >
            policies.google.com/privacy
          </a>
          .
        </p>
        <p className="mt-3">
          <strong className="neu-fg opacity-90">Team-Einladungen:</strong> Wenn Sie Teammitglieder einladen,
          verarbeiten wir die eingeladene E-Mail-Adresse, Einladungstoken, Status und Zeitstempel, um
          den Zugang zum gemeinsamen Workspace freizuschalten.
        </p>
        <p className="mt-3">
          <strong className="neu-fg opacity-90">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
          (Vertragserfüllung bzw. Durchführung vorvertraglicher Maßnahmen) sowie Art. 6 Abs. 1 lit. f
          DSGVO (Betriebssicherheit, Missbrauchsprävention).
        </p>
      </section>

      <section>
        <h2 className={neuLegalH2}>8. Abrechnung, Abos und Zahlungen (Stripe)</h2>
        <p>
          Für die Abwicklung von Abonnements, Token-Käufen, Zahlungsbestätigungen und
          Rechnungs-/Portalprozessen setzen wir Stripe ein. Dabei können insbesondere Vertrags-,
          Transaktions-, Kunden- und Zahlungsmetadaten verarbeitet werden (z. B. Kundennummer,
          Abo-Status, Zahlungsreferenzen).
        </p>
        <p className="mt-3">
          Zahlungsdaten werden nicht vollständig auf unseren Servern gespeichert, sondern durch Stripe
          verarbeitet. Wir speichern nur die für Vertrag und Abrechnung erforderlichen Referenzdaten
          (z. B. Stripe Customer ID, Subscription ID, Status).
        </p>
        <p className="mt-3">
          <strong className="neu-fg opacity-90">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
          (Vertragserfüllung), Art. 6 Abs. 1 lit. c DSGVO (gesetzliche Aufbewahrungspflichten), Art. 6
          Abs. 1 lit. f DSGVO (Betrugsprävention und sichere Zahlungsabwicklung).
        </p>
      </section>

      <section>
        <h2 className={neuLegalH2}>9. KI-Services, Medien und Integrationen</h2>
        <p>
          Für die Erstellung von Prompts, Texten und Bildern nutzen wir externe KI- und Mediendienste.
          Dabei werden Eingaben aus dem Briefing, Prompt-Inhalte sowie optional hochgeladene oder
          gescannte Referenzbilder an die jeweiligen Dienstleister übermittelt, soweit dies zur
          Leistungserbringung erforderlich ist. Derzeit eingesetzte Anbieter umfassen insbesondere:
        </p>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>
            <strong className="neu-fg opacity-90">OpenAI</strong> – Bild- und Textgenerierung / Modellaufrufe
          </li>
          <li>
            <strong className="neu-fg opacity-90">Anthropic</strong> – Prompt-/Textunterstützung
          </li>
          <li>
            <strong className="neu-fg opacity-90">Kie.ai</strong> (u. a. Nano Banana, Seedance) – Bild- und
            Videogenerierung
          </li>
        </ul>
        <p className="mt-3">
          <strong className="neu-fg opacity-90">Instagram-Anbindung:</strong> Wenn Sie Instagram verbinden,
          verarbeiten wir Verbindungsdaten (z. B. Account-Kennungen, Tokens, Scanzeiten) und öffentlich
          abrufbare Profil-/Medienmetadaten, soweit Sie die Funktion aktiv nutzen. Tokens können erneuert
          oder widerrufen werden; bei Ablauf bitten wir um erneute Verbindung.
        </p>
        <p className="mt-3">
          <strong className="neu-fg opacity-90">E-Mail-Versand (Resend):</strong> Transaktionsmails (z. B.
          Sicherheitscodes, Passwort-Reset, Team-Einladungen) versenden wir über Resend. Dabei werden
          Empfängeradresse, Betreff und erforderliche Metadaten verarbeitet.
        </p>
        <p className="mt-3">
          Bitte laden Sie keine unnötigen sensiblen personenbezogenen Daten in Prompts oder
          Referenzbilder hoch. Inhalte können bei Drittanbietern gemäß deren
          Sicherheits-/Aufbewahrungsrichtlinien verarbeitet werden.
        </p>
        <p className="mt-3">
          <strong className="neu-fg opacity-90">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
          (vertraglich angeforderte Leistung) sowie Art. 6 Abs. 1 lit. f DSGVO (technischer Betrieb und
          Qualitätssicherung).
        </p>
      </section>

      <section>
        <h2 className={neuLegalH2}>10. Empfänger, Drittlandtransfer und Speicherdauer</h2>
        <p>
          Empfänger bzw. Auftragsverarbeiter können insbesondere Hosting-Anbieter (z. B. Vercel),
          Supabase, Stripe, OpenAI, Anthropic, Kie.ai, Google (Login/Fonts), Resend sowie
          Form-/Support-Dienstleister sein. Eine Verarbeitung kann dabei auch in den USA oder anderen
          Drittländern außerhalb der EU/des EWR stattfinden.
        </p>
        <p className="mt-3">
          Soweit Drittlandübermittlungen erfolgen, stützen wir uns – abhängig vom jeweiligen Anbieter –
          insbesondere auf{" "}
          <strong className="neu-fg opacity-90">Standardvertragsklauseln (SCC) der Europäischen Kommission</strong>{" "}
          gemäß Art. 46 Abs. 2 lit. c DSGVO und ergänzende technische/organisatorische Maßnahmen. Eine
          Kopie der maßgeblichen Garantien können Sie unter{" "}
          <a href={`mailto:${LEGAL.email}`} className={neuLegalLink}>
            {LEGAL.email}
          </a>{" "}
          anfordern.
        </p>
        <p className="mt-3">
          <strong className="neu-fg opacity-90">Speicherdauer:</strong> Kontodaten speichern wir grundsätzlich
          für die Dauer der Vertragsbeziehung und danach nur, soweit gesetzliche Aufbewahrungspflichten
          bestehen. Abrechnungs- und steuerrelevante Daten speichern wir entsprechend gesetzlicher
          Fristen (regelmäßig bis zu 10 Jahre). Prompts, Referenzbilder und KI-Ergebnisse speichern wir
          in Ihrem Workspace/Mediathek, solange Ihr Konto aktiv ist bzw. Sie die Inhalte nicht löschen;
          nach Kontolöschung entfernen wir diese Daten, soweit keine gesetzlichen Pflichten oder
          berechtigten Interessen entgegenstehen. Technische Logs und Support-/Anfragedaten werden
          gelöscht, sobald der Zweck entfällt.
        </p>
      </section>

      <section>
        <h2 className={neuLegalH2}>11. Ihre Rechte</h2>
        <p>
          Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen
          Daten:
        </p>
        <ul className="mt-3 space-y-2">
          <li>
            <strong className="neu-fg opacity-90">Recht auf Auskunft</strong> (Art. 15 DSGVO)
          </li>
          <li>
            <strong className="neu-fg opacity-90">Recht auf Berichtigung</strong> (Art. 16 DSGVO)
          </li>
          <li>
            <strong className="neu-fg opacity-90">Recht auf Löschung</strong> (Art. 17 DSGVO)
          </li>
          <li>
            <strong className="neu-fg opacity-90">Recht auf Einschränkung der Verarbeitung</strong> (Art. 18
            DSGVO)
          </li>
          <li>
            <strong className="neu-fg opacity-90">Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO)
          </li>
          <li>
            <strong className="neu-fg opacity-90">Widerspruchsrecht</strong> (Art. 21 DSGVO)
          </li>
          <li>
            <strong className="neu-fg opacity-90">Widerruf einer Einwilligung</strong> (Art. 7 Abs. 3 DSGVO)
          </li>
          <li>
            <strong className="neu-fg opacity-90">Beschwerderecht bei einer Aufsichtsbehörde</strong>
          </li>
        </ul>
        <p className="mt-3">
          Zur Ausübung Ihrer Rechte wenden Sie sich bitte an die oben genannte E-Mail-Adresse.
        </p>
      </section>

      <section>
        <h2 className={neuLegalH2}>12. SSL- bzw. TLS-Verschlüsselung</h2>
        <p>
          Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte
          eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie am Wechsel von
          „http://“ auf „https://“ und am Schloss-Symbol in der Browserzeile.
        </p>
      </section>

      <section>
        <h2 className={neuLegalH2}>13. Änderungen dieser Datenschutzerklärung</h2>
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte Rechtslagen
          oder bei Änderungen des Dienstes sowie der Datenverarbeitung anzupassen. Die jeweils aktuelle
          Version finden Sie stets auf dieser Seite.
        </p>
        <p className="mt-3">
          <strong className="neu-fg opacity-90">Stand:</strong> April 2026
        </p>
      </section>
    </NeuLegalPage>
  );
}
