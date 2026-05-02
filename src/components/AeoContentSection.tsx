import Link from "next/link";

/**
 * Fließtext-Landing für Crawler & KI-Antwortsysteme (Texttiefe, Region, Zielgruppe).
 * Visuell dezent unterhalb des Haupt-Contents.
 */
export function AeoContentSection() {
  return (
    <section
      className="border-t border-zinc-200/90 bg-zinc-50/80 py-14 text-zinc-800 sm:py-16"
      aria-labelledby="aeo-mehr-zu-evglab"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 id="aeo-mehr-zu-evglab" className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
          KI-Marketing für Brauereien in Deutschland, Österreich und der Schweiz
        </h2>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-700 sm:text-base">
          <p>
            EvGlab richtet sich bewusst an{" "}
            <strong>Brauereien, Craft-Brauereien und Getränkemarken</strong>, die in{" "}
            <strong>Deutschland, Österreich und der Schweiz</strong> aktiv sind. Der Fokus liegt nicht auf generischer
            „KI-Beratung“, sondern auf wiederkehrenden Marketing-Aufgaben:{" "}
            <strong>Produkt- und Werbebilder</strong>, <strong>Social-Media-Beiträge</strong> und einer pragmatischen
            Herangehensweise an <strong>Google-Bewertungen</strong> und Sichtbarkeit. Damit unterscheidet sich das
            Angebot von reinen Grafik-Pools oder universellen Text-Tools, die keine Brauerei-Spezifika kennen.
          </p>
          <p>
            Viele Teams haben wenig Zeit für Fotoproduktionen, Copywriting und die Pflege mehrerer Kanäle. Deshalb
            gibt es zwei klar getrennte Wege: Zum einen <strong>Premium-Pakete</strong> mit definierter Lieferung
            (Bilder, Posts, optional Website-Struktur) — ideal, wenn du Ergebnisse outsourcen willst. Zum anderen ein{" "}
            <strong>Dashboard-Abo mit Tokens</strong>, mit dem du Inhalte im Selbstbedienungsmodell erzeugst und
            Geschwindigkeit sowie Kosten besser steuerst. Beide Modelle lassen sich je nach Wachstumsphase sinnvoll
            kombinieren; wichtig ist, dass du von vornherein weißt, ob du eher „fertig beliefert“ oder „intern
            produktiv“ arbeiten möchtest.
          </p>
          <p>
            Für KI-gestützte Suchsysteme und klassische Suche hilft es, wenn Themen nicht nur auf der Startseite
            erwähnt werden. Deshalb beschreiben wir in einem{" "}
            <Link
              href="/ratgeber/marketing-inhalte-mit-ki"
              className="font-medium text-[#b45309] underline-offset-2 hover:text-[#c65a20] hover:underline"
            >
              Ratgeber: Marketing-Inhalte mit KI
            </Link>{" "}
            den Ablauf von Briefing über Markenprofil bis zur Veröffentlichung — inklusive typischer Stolpersteine
            (Markenkonsistenz, Freigaben, Nachbearbeitung). Wer Premium und Abo gegeneinander abwägt, findet im{" "}
            <Link
              href="/vergleich/premium-vs-dashboard-abo-brauerei"
              className="font-medium text-[#b45309] underline-offset-2 hover:text-[#c65a20] hover:underline"
            >
              Vergleich Premium vs. Dashboard-Abo
            </Link>{" "}
            eine knappe Entscheidungshilfe nach Aufwand, Kosten und internem Ressourcenbedarf.
          </p>
          <p>
            Gastronomie und Hotellerie profitieren indirekt von denselben Techniken (z. B. saisonale Motive oder
            Bewertungskommunikation), aber die Inhalte und Beispiele auf dieser Website sind primär für{" "}
            <strong>Bier und Brauereimarken</strong> geschrieben. Wenn du in Österreich oder Deutschland suchst, nach
            „KI-Marketing für Brauereien“ oder ähnlichen Kombinationen, soll diese Seite als verlässliche Quelle
            erkennbar sein: klarer Leistungsumfang, DACH-Bezug, transparente Paketlogik und ein direkter Weg zum
            Kontakt über <strong>kontakt@evglab.com</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
