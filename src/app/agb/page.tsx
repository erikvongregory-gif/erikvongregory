import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL } from "@/lib/legal";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen (AGB)",
  description:
    "AGB von BrewAI – Erik Freiherr von Gregory: KI-Marketing, Web und Content für Brauereien und die Getränkewirtschaft.",
  alternates: { canonical: `${SITE.baseUrl}/agb` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AGB | BrewAI",
    description: "Allgemeine Geschäftsbedingungen von BrewAI für Leistungen und SaaS-Angebote.",
    url: `${SITE.baseUrl}/agb`,
    type: "article",
    images: SITE.ogImage ? [{ url: SITE.ogImage, width: 1200, height: 630, alt: "AGB BrewAI" }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "AGB | BrewAI",
    description: "Vertragsbedingungen für BrewAI-Leistungen und Abonnements.",
    images: SITE.ogImage ? [SITE.ogImage] : undefined,
  },
};

const linkAccent =
  "text-emerald-300 underline decoration-emerald-300/55 underline-offset-2 transition-colors hover:text-emerald-200 md:text-[#c65a20] md:decoration-[#c65a20]/45 md:hover:text-[#d46830]";

const footerNavLink =
  "text-sm font-medium text-emerald-300/95 transition-colors hover:text-emerald-200 md:text-[#c65a20] md:hover:text-[#d46830]";

export default function AgbPage() {
  return (
    <main className="legal-page relative z-10 min-h-screen px-4 pb-20 pt-[calc(68px+3rem)] sm:px-6 sm:pb-28 md:pb-32">
      <article className="legal-article mx-auto max-w-3xl md:rounded-2xl md:border md:border-zinc-200/70 md:bg-white/85 md:px-8 md:py-10 md:shadow-lg md:backdrop-blur-sm">
        <Link
          href="/"
          className={`legal-back mb-8 inline-flex items-center gap-2 rounded text-sm font-medium text-emerald-300/95 transition-colors hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f14] md:text-[#c65a20] md:hover:text-[#d46830] md:focus-visible:ring-[#c65a20]/50 md:focus-visible:ring-offset-white`}
        >
          <span aria-hidden>←</span> Zurück zur Startseite
        </Link>

        <h1 className="mb-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl md:text-zinc-900">
          Allgemeine Geschäftsbedingungen (AGB)
        </h1>

        <p className="mb-10 text-sm text-white/70 md:text-zinc-600">
          Stand: September 2026 · Anbieter: {LEGAL.name}, {LEGAL.street}, {LEGAL.city} (
          <a
            href={`mailto:${LEGAL.email}`}
            className={linkAccent}
          >
            {LEGAL.email}
          </a>
          )
        </p>

        <div className="legal-content space-y-10 text-base leading-relaxed text-white/90 sm:text-[15px] md:text-zinc-700">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">§ 1 Geltungsbereich</h2>
            <p className="text-white/90">
              (1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB“) gelten für alle Verträge zwischen{" "}
              {LEGAL.name} (nachfolgend „Anbieter“) und seinen Kunden – einschließlich Verbrauchern im Sinne von
              § 13 BGB und Unternehmern im Sinne von § 14 BGB – über die Erbringung von Leistungen im Bereich
              digitales Marketing, Web, Beratung sowie die Erstellung und Aufbereitung von Inhalten (Texte, Bilder,
              Videos), einschließlich der Nutzung von KI-gestützten Werkzeugen und des BrewAI-Dashboards
              (SaaS), soweit vereinbart.
            </p>
            <p className="mt-3">
              (2) Abweichende, entgegenstehende oder ergänzende Allgemeine Geschäftsbedingungen des Kunden werden nicht
              Vertragsbestandteil, es sei denn, ihrer Geltung wird ausdrücklich schriftlich zugestimmt.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">§ 2 Vertragsschluss</h2>
            <p className="text-white/90">
              (1) Darstellungen auf der Website ({SITE.baseUrl}), in Unterlagen oder Angeboten sind – soweit nicht
              ausdrücklich als bindend gekennzeichnet – freibleibend und unverbindlich.
            </p>
            <p className="mt-3">
              (2) Ein Vertrag kommt erst zustande, wenn der Anbieter ein schriftliches oder in Textform abgegebenes
              Angebot annimmt oder durch Ausführung der Leistung die Annahme erklärt, oder wenn die Parteien ein
              separates Leistungs-/Projektvereinbarung unterzeichnen.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">§ 3 Leistungsumfang</h2>
            <p className="text-white/90">
              (1) Der konkrete Leistungsumfang ergibt sich aus Angebot, Leistungsbeschreibung oder individueller
              Vereinbarung (Projektplan). Leistungen sind Dienstleistungen; ein Erfolg (z.&nbsp;B. bestimmte
              Reichweite, Umsatz oder Platzierungen) wird nur geschuldet, wenn dies ausdrücklich und schriftlich
              vereinbart ist.
            </p>
            <p className="mt-3">
              (2) Soweit KI-gestützte Systeme eingesetzt werden, liefert der Anbieter die vereinbarte Bearbeitung,
              Bereitstellung oder Einrichtung im Rahmen des zum Zeitpunkt der Leistung üblichen technischen Stands.
              Der Kunde bleibt verantwortlich für die sachliche Richtigkeit freigegebener Inhalte und für die
              Einhaltung von Kennzeichnungspflichten (z.&nbsp;B. Werbung, Sponsoring, Plattformregeln).
            </p>
            <p className="mt-3">
              (3) Nachträge oder Erweiterungen bedürfen der gesonderten Vereinbarung; der Anbieter kann angemessene
              Mehrkosten und Terminverschiebungen geltend machen.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">§ 4 Mitwirkung des Kunden</h2>
            <p className="text-white/90">
              (1) Der Kunde stellt rechtzeitig alle für die Leistung erforderlichen Informationen, Zugänge,
              Freigaben, Bild-, Text- und Markenmaterialien zur Verfügung und benennt Ansprechpartnerinnen bzw.
              Ansprechpartner.
            </p>
            <p className="mt-3">
              (2) Der Kunde versichert, über die erforderlichen Rechte an bereitgestellten Inhalten zu verfügen und
              den Anbieter von Ansprüchen Dritter freizustellen, soweit diese auf von ihm geliefertem Material
              beruhen.
            </p>
            <p className="mt-3">
              (3) Verzögerungen aufgrund verspäteter oder unvollständiger Mitwirkung gehen nicht zu Lasten des
              Anbieters und können zu Terminverschiebungen und zusätzlichen Kosten führen.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">§ 5 Vergütung, Aufrechnung</h2>
            <p className="text-white/90">
              (1) Die Vergütung richtet sich nach Angebot oder Vereinbarung. Als Kleinunternehmer gemäß § 19 UStG wird
              derzeit keine Umsatzsteuer ausgewiesen und berechnet.
            </p>
            <p className="mt-3">
              (2) Rechnungen sind – sofern nicht anders vereinbart – innerhalb von 14 Tagen nach Rechnungsdatum ohne
              Abzug fällig.
            </p>
            <p className="mt-3">
              (3) Der Kunde kann nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen aufrechnen.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">§ 5a SaaS-Abo, Laufzeit und Kündigung</h2>
            <p className="text-white/90">
              (1) Soweit ein Dashboard-Abo vereinbart ist, erfolgt die Abrechnung als wiederkehrendes
              Abonnement monatlich oder jährlich, je nach bei Vertragsschluss gewählter Option.
            </p>
            <p className="mt-3">
              (2) Das Abo verlängert sich jeweils um die vereinbarte Laufzeit (Monat bzw. Jahr), wenn es nicht
              rechtzeitig zum Ende des laufenden Abrechnungszeitraums gekündigt wird. Die Kündigung kann über das
              Stripe-Kundenportal im Dashboard (Bereich Abonnement), per E-Mail an {LEGAL.email} oder – für
              Verbraucher – zusätzlich über die Widerrufswege unter{" "}
              <Link href="/widerruf" className={linkAccent}>
                /widerruf
              </Link>{" "}
              erklärt werden.
            </p>
            <p className="mt-3">
              (3) Bereits gezahlte Entgelte für laufende Abrechnungszeiträume werden grundsätzlich
              nicht anteilig erstattet, soweit keine zwingenden gesetzlichen Regelungen (insbesondere
              Widerrufsrecht) entgegenstehen.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">§ 5b Token-Logik und Zusatzkäufe</h2>
            <p className="text-white/90">
              (1) Je nach Plan steht ein monatliches Token-Kontingent zur Verfügung. Die konkrete
              Höhe ergibt sich aus der aktuellen Leistungsbeschreibung.
            </p>
            <p className="mt-3">
              (2) Token-Verbrauch entsteht insbesondere bei der Nutzung von KI-Funktionen
              (z. B. Prompt-/Bild-/Videogenerierung). Zusatzkontingente können als einmalige Token-Pakete
              erworben werden.
            </p>
            <p className="mt-3">
              (3) Nicht genutzte Abo-Tokens sind nur im ausdrücklich kommunizierten Umfang übertragbar.
              Nach Ablauf der jeweiligen Übertragungsfrist verfallen sie. Separat gekaufte Token-Pakete
              bleiben nach Kündigung des Abos nutzbar, solange das Nutzerkonto besteht, und verfallen
              spätestens 12 Monate nach Kauf, sofern nicht anders ausgewiesen. Ein Anspruch auf
              Auszahlung oder Übertragung auf Dritte besteht nicht.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">§ 5c Preis- und Leistungsänderungen</h2>
            <p className="text-white/90">
              (1) Der Anbieter kann Preise und Leistungsumfang für zukünftige Abrechnungszeiträume
              mit einer Vorankündigung von mindestens 30 Tagen anpassen, soweit dies aus sachlichen Gründen
              erforderlich ist (z. B. Kostensteigerungen bei Infrastruktur-/Drittanbietern).
            </p>
            <p className="mt-3">
              (2) Bei wesentlichen Änderungen wird der Kunde rechtzeitig informiert und kann das Abo
              zum Wirksamkeitszeitpunkt der Änderung außerordentlich kündigen. Zwingende
              Verbraucherrechte bei Produktänderungen bleiben unberührt.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">§ 6 Termine, Lieferung</h2>
            <p className="text-white/90">
              (1) Genannte Fristen sind, sofern nicht ausdrücklich als verbindlich bezeichnet,
              voraussichtliche Zieltermine.
            </p>
            <p className="mt-3">
              (2) Höhere Gewalt und andere vom Anbieter nicht zu vertretende Umstände verlängern Fristen angemessen.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">§ 7 Nutzungsrechte</h2>
            <p className="text-white/90">
              (1) An Ergebnissen aus individuellen Projektleistungen (Agentur-/Beratungsaufträge)
              räumt der Anbieter dem Kunden – soweit nichts Abweichendes vereinbart ist – ein einfaches,
              zeitlich und räumlich auf den vereinbarten Nutzungszweck beschränktes Nutzungsrecht ein.
              Eine Weitergabe an Dritte außerhalb des Vereinbarten bedarf der vorherigen Zustimmung.
            </p>
            <p className="mt-3">
              (2) Für Inhalte, die der Kunde selbst über das BrewAI-Dashboard (SaaS) erzeugt
              (z. B. Marketingbilder, Texte, Videos), räumt der Anbieter dem Kunden mit vollständiger
              Zahlung der hierfür erforderlichen Entgelte/Token ein einfaches, zeitlich unbefristetes,
              weltweit geltendes Nutzungsrecht für eigene kommerzielle Marketingzwecke ein. Das umfasst
              insbesondere Bearbeitung, Nutzung in bezahlten Anzeigen sowie Weitergabe an Agenturen,
              Händler, Druckereien und Plattformen, soweit dies der Vermarktung eigener Produkte/Marken
              des Kunden dient. Das Recht bleibt nach Abo-Ende für bereits erzeugte und rechtmäßig
              heruntergeladene Inhalte bestehen; ein Anspruch auf weitere Generierung ohne gültiges
              Entgelt/Token besteht nicht.
            </p>
            <p className="mt-3">
              (3) Rechte Dritter (z. B. Marken, Personenrechte, Musik) sowie Plattformregeln bleiben
              unberührt. Quell- und Entwurfsdateien aus Projektleistungen werden nur geliefert, wenn
              dies vertraglich vereinbart ist.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">§ 8 Annahme, Abnahme</h2>
            <p className="text-white/90">
              (1) Liefert der Anbieter ein vereinbartes Arbeitsergebnis, gilt es als angenommen, wenn der Kunde nicht
              innerhalb von 14 Tagen unter Darlegung konkreter, begründeter Mängel widerspricht.
            </p>
            <p className="mt-3">
              (2) Gewährleistungsansprüche bestehen im gesetzlichen Rahmen; die Verjährung richtet sich nach § 634a BGB,
              soweit Werkvertragsrecht Anwendung findet. Bei reinen Dienstleistungen ohne Werkcharakter gelten die
              gesetzlichen Regelungen entsprechend dem Vertragstyp.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">§ 9 Haftung</h2>
            <p className="text-white/90">
              (1) Der Anbieter haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung von
              Leben, Körper und Gesundheit.
            </p>
            <p className="mt-3">
              (2) Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung der Höhe nach
              begrenzt auf den vertragstypischen, vorhersehbaren Schaden.
            </p>
            <p className="mt-3">
              (3) Im Übrigen ist die Haftung ausgeschlossen, soweit gesetzlich zulässig. Dies gilt nicht für
              zwingendes Haftungsrecht.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">§ 10 Widerrufsbelehrung für Verbraucher</h2>
            <p className="text-white/90">
              Verbrauchern steht ein gesetzliches Widerrufsrecht zu. Unternehmer im Sinne von § 14 BGB haben kein
              Widerrufsrecht nach den Fernabsatzvorschriften.
            </p>
            <h3 className="mb-2 mt-5 text-base font-medium text-white">Widerrufsrecht</h3>
            <p className="text-white/90">
              Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
              Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses. Um Ihr Widerrufsrecht
              auszuüben, müssen Sie uns ({LEGAL.name}, {LEGAL.street}, {LEGAL.city}, E-Mail: {LEGAL.email}) mittels
              einer eindeutigen Erklärung (z. B. per E-Mail oder über{" "}
              <Link href="/widerruf" className={linkAccent}>
                brewai.de/widerruf
              </Link>
              ) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Zur Wahrung der Widerrufsfrist
              reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der
              Widerrufsfrist absenden.
            </p>
            <h3 className="mb-2 mt-5 text-base font-medium text-white">Folgen des Widerrufs</h3>
            <p className="text-white/90">
              Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben,
              unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung
              über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir
              dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn,
              mit Ihnen wurde ausdrücklich etwas anderes vereinbart.
            </p>
            <h3 className="mb-2 mt-5 text-base font-medium text-white">Vorzeitiges Erlöschen</h3>
            <p className="text-white/90">
              Das Widerrufsrecht erlischt bei einem Vertrag zur Lieferung von nicht auf einem körperlichen
              Datenträger befindlichen digitalen Inhalten vorzeitig, wenn wir mit der Ausführung des Vertrags
              begonnen haben, nachdem Sie ausdrücklich zugestimmt haben, dass wir mit der Ausführung vor Ende
              der Widerrufsfrist beginnen, und Sie Ihre Kenntnis davon bestätigt haben, dass Sie durch Ihre
              Zustimmung mit Beginn der Ausführung des Vertrags Ihr Widerrufsrecht verlieren (§ 356 Abs. 5 BGB).
            </p>
            <p className="mt-3">
              Bei Verträgen über die Erbringung von Dienstleistungen erlischt das Widerrufsrecht, wenn wir die
              Dienstleistung vollständig erbracht haben und mit der Ausführung erst begonnen haben, nachdem Sie
              dazu Ihre ausdrückliche Zustimmung gegeben und zugleich Ihre Kenntnis bestätigt haben, dass Sie Ihr
              Widerrufsrecht bei vollständiger Vertragserfüllung durch uns verlieren (§ 356 Abs. 4 BGB). Bei
              laufenden Abonnements bleibt die Zahlungspflicht für bereits erbrachte Leistungszeiträume nach
              Maßgabe der gesetzlichen Regeln bestehen.
            </p>
            <p className="mt-3">
              Ein Muster-Widerrufsformular finden Sie unter{" "}
              <Link href="/widerruf" className={linkAccent}>
                /widerruf
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">§ 11 Vertraulichkeit</h2>
            <p className="text-white/90">
              Beide Parteien behandeln vertrauliche Informationen der anderen Partei streng vertraulich und nutzen
              sie nur zur Vertragsdurchführung, sofern keine gesetzliche Offenlegungspflicht entgegensteht.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">§ 12 Schlussbestimmungen</h2>
            <p className="text-white/90">
              (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
            </p>
            <p className="mt-3">
              (2) Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches
              Sondervermögen, ist Gerichtsstand für alle Streitigkeiten aus diesem Vertrag der Sitz des Anbieters,
              soweit zulässig.
            </p>
            <p className="mt-3">
              (3) Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen
              Bestimmungen unberührt.
            </p>
          </section>
        </div>

        <nav className="mt-12 flex flex-wrap gap-4 border-t border-white/15 pt-8 md:border-zinc-200">
          <Link href="/impressum" className={footerNavLink}>
            Impressum
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
