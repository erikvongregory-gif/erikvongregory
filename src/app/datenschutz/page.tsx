import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutz | Erik von Gregory",
  description: "Datenschutzerklärung – Erik von Gregory, KI für Brauereien & Gastronomie.",
};

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1f0f] to-[#0d2818] px-4 py-24 sm:px-6 sm:py-32">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-emerald-400/90 transition-colors hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1f0f] rounded"
        >
          ← Zurück
        </Link>
        <h1 className="mb-8 text-2xl font-bold text-white sm:text-3xl">Datenschutzerklärung</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-sm leading-relaxed text-white/85 prose-headings:text-white prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:text-emerald-300">
          <section>
            <h2 className="text-base font-semibold text-white">1. Verantwortlicher</h2>
            <p className="mt-2">
              Erik von Gregory
              <br />
              [Straße und Hausnummer]
              <br />
              [PLZ und Ort]
              <br />
              E-Mail: <a href="mailto:kontakt@erikvongregory.de">kontakt@erikvongregory.de</a>
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white">2. Erhebung und Speicherung personenbezogener Daten</h2>
            <p className="mt-2">
              Beim Aufruf dieser Website werden durch den Browser Ihres Endgeräts automatisch
              Informationen an den Server gesendet. Diese werden temporär in einem sogenannten
              Logfile gespeichert (z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs, angeforderte
              Datei, Übertragungsmenge, Browsertyp).
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white">3. Cookies</h2>
            <p className="mt-2">
              Diese Website nutzt Cookies, um die Cookie-Einstellungen zu speichern. Die Cookies
              werden nur nach Ihrer Einwilligung gesetzt. Weitere Details finden Sie im Cookie-Banner
              auf dieser Website.
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white">4. Ihre Rechte</h2>
            <p className="mt-2">
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der
              Verarbeitung Ihrer personenbezogenen Daten sowie auf Datenübertragbarkeit. Sie haben
              außerdem das Recht, sich bei einer Aufsichtsbehörde zu beschweren. Für Anfragen nutzen
              Sie bitte die oben angegebene E-Mail-Adresse.
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white">5. Änderungen</h2>
            <p className="mt-2">
              Diese Datenschutzerklärung wird bei Bedarf aktualisiert, um Änderungen der Website
              oder der Rechtslage zu berücksichtigen.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
