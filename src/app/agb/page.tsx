import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL } from "@/lib/legal";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen (AGB)",
  description:
    "AGB von EvGlab – Erik Freiherr von Gregory: KI-Marketing, Web und Content für Brauereien und die Getränkewirtschaft.",
  alternates: { canonical: `${SITE.baseUrl}/agb` },
  robots: { index: true, follow: true },
};

const linkAccent =
  "text-emerald-300 underline decoration-emerald-300/55 underline-offset-2 transition-colors hover:text-emerald-200 md:text-[#c65a20] md:decoration-[#c65a20]/45 md:hover:text-[#d46830]";

const footerNavLink =
  "text-sm font-medium text-emerald-300/95 transition-colors hover:text-emerald-200 md:text-[#c65a20] md:hover:text-[#d46830]";

export default function AgbPage() {
  return (
    <main className="legal-page relative z-10 min-h-screen px-4 py-20 sm:px-6 sm:py-28 md:py-32">
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

        <p className="mb-10 rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm leading-relaxed text-amber-100/95 md:border-amber-400/45 md:bg-amber-50 md:text-amber-950">
          <strong className="text-amber-50 md:text-amber-900">Hinweis:</strong> Diese AGB sind als Orientierungsvorlage erstellt. Ob sie
          dein konkretes Geschäftsmodell vollständig abdecken (z.&nbsp;B. B2B vs. Verbraucher, KI-generierte Inhalte,
          Plattformen Dritter), solltest du mit einer Rechtsanwältin bzw. einem Rechtsanwalt klären und den Text ggf.
          anpassen lassen.
        </p>

        <p className="mb-10 text-sm text-white/70 md:text-zinc-600">
          Stand: April 2026 · Anbieter: {LEGAL.name}, {LEGAL.street}, {LEGAL.city} (
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
              {LEGAL.name} (nachfolgend „Anbieter“) und seinen Kunden über die Erbringung von Leistungen im Bereich
              digitales Marketing, Web, Beratung sowie die Erstellung und Aufbereitung von Inhalten (Texte, Bilder,
              Videos), einschließlich der Nutzung von KI-gestützten Werkzeugen, soweit vereinbart.
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
              (1) Die Vergütung richtet sich nach Angebot oder Vereinbarung. Alle Preise verstehen sich, soweit
              gesetzlich schuldig, zuzüglich der jeweils gültigen Umsatzsteuer.
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
              Abonnement (monatlich), sofern im konkreten Angebot nichts Abweichendes geregelt ist.
            </p>
            <p className="mt-3">
              (2) Das Abo verlängert sich jeweils um die vereinbarte Laufzeit, wenn es nicht vor
              Beginn des nächsten Abrechnungszeitraums gekündigt wird. Die Kündigung kann über das
              bereitgestellte Kundenportal oder in Textform erfolgen.
            </p>
            <p className="mt-3">
              (3) Bereits gezahlte Entgelte für laufende Abrechnungszeiträume werden grundsätzlich
              nicht anteilig erstattet, soweit keine zwingenden gesetzlichen Regelungen entgegenstehen.
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
              (z. B. Prompt-/Bildgenerierung). Zusatzkontingente können als einmalige Token-Pakete
              erworben werden.
            </p>
            <p className="mt-3">
              (3) Nicht genutzte Tokens sind nur im ausdrücklich kommunizierten Umfang übertragbar.
              Nach Ablauf der jeweiligen Übertragungsfrist verfallen sie.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">§ 5c Preis- und Leistungsänderungen</h2>
            <p className="text-white/90">
              (1) Der Anbieter kann Preise und Leistungsumfang für zukünftige Abrechnungszeiträume
              mit angemessener Vorankündigung anpassen, soweit dies aus sachlichen Gründen erforderlich ist
              (z. B. Kostensteigerungen bei Infrastruktur-/Drittanbietern).
            </p>
            <p className="mt-3">
              (2) Bei wesentlichen Änderungen wird der Kunde rechtzeitig informiert. Sofern ein
              Sonderkündigungsrecht gesetzlich oder vertraglich besteht, bleibt dieses unberührt.
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
              (1) Soweit nichts Abweichendes vereinbart ist, räumt der Anbieter dem Kunden an den geschaffenen
              Arbeitsergebnissen ein einfaches, zeitlich und räumlich auf den vereinbarten Nutzungszweck beschränktes
              Nutzungsrecht ein. Eine Weitergabe an Dritte außerhalb des Vereinbarten bedarf der vorherigen
              Zustimmung.
            </p>
            <p className="mt-3">
              (2) Quell- und Entwurfsdateien werden nur geliefert, wenn dies vertraglich vereinbart ist. Der Anbieter
              behält sich vor, nicht vereinbarte Arbeitsschritte und Zwischenprodukte nicht herauszugeben.
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
            <h2 className="mb-3 text-lg font-semibold text-white">§ 10 Widerruf für Verbraucher</h2>
            <p className="text-white/90">
              Erfolgt ein Auftrag ausschließlich gegenüber Unternehmern im Sinne von § 14 BGB, besteht kein
              gesetzliches Widerrufsrecht nach den Fernabsatzvorschriften. Handelt der Kunde als Verbraucher, gilt ein
              etwaiges Widerrufsrecht nur im gesetzlich vorgesehenen Umfang; insbesondere kann es bei digitalen Inhalten
              vorzeitig erlöschen, wenn der Kunde zugestimmt hat, dass mit der Ausführung vor Ende der Widerrufsfrist
              begonnen wird. Ein separates Widerrufsinformationsblatt wird auf Anfrage zur Verfügung gestellt.
            </p>
            <p className="mt-3">
              Bei abonnementbasierten digitalen Leistungen bleibt die Zahlungspflicht für bereits
              erbrachte Leistungszeiträume bestehen. Gesetzliche Verbraucherrechte bleiben hiervon
              unberührt.
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
