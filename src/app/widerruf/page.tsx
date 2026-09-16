import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL } from "@/lib/legal";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Widerruf",
  description:
    "Widerrufsbelehrung und Muster-Widerrufsformular für Verbraucher bei BrewAI.",
  alternates: { canonical: `${SITE.baseUrl}/widerruf` },
  robots: { index: true, follow: true },
};

const linkAccent =
  "text-emerald-300 underline decoration-emerald-300/55 underline-offset-2 transition-colors hover:text-emerald-200 md:text-[#c65a20] md:decoration-[#c65a20]/45 md:hover:text-[#d46830]";

const footerNavLink =
  "text-sm font-medium text-emerald-300/95 transition-colors hover:text-emerald-200 md:text-[#c65a20] md:hover:text-[#d46830]";

const mailtoHref = `mailto:${LEGAL.email}?subject=${encodeURIComponent("Widerruf BrewAI")}&body=${encodeURIComponent(
  `Hiermit widerrufe ich den von mir abgeschlossenen Vertrag.\n\nBestellt am: \nName: \nAnschrift: \nE-Mail: \n\nDatum: \n`,
)}`;

export default function WiderrufPage() {
  return (
    <main className="legal-page relative z-10 min-h-screen px-4 pb-20 pt-[calc(68px+3rem)] sm:px-6 sm:pb-28 md:pb-32">
      <article className="legal-article mx-auto max-w-3xl md:rounded-2xl md:border md:border-zinc-200/70 md:bg-white/85 md:px-8 md:py-10 md:shadow-lg md:backdrop-blur-sm">
        <Link
          href="/"
          className="legal-back mb-8 inline-flex items-center gap-2 rounded text-sm font-medium text-emerald-300/95 transition-colors hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f14] md:text-[#c65a20] md:hover:text-[#d46830] md:focus-visible:ring-[#c65a20]/50 md:focus-visible:ring-offset-white"
        >
          <span aria-hidden>←</span> Zurück zur Startseite
        </Link>

        <h1 className="mb-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl md:text-zinc-900">
          Widerruf für Verbraucher
        </h1>
        <p className="mb-10 text-sm text-white/70 md:text-zinc-600">Stand: September 2026</p>

        <div className="legal-content space-y-8 text-base leading-relaxed text-white/90 sm:text-[15px] md:text-zinc-700">
          <section>
            <p>
              Verbraucher können Verträge mit BrewAI innerhalb von 14 Tagen widerrufen. Die
              vollständige Belehrung steht in den{" "}
              <Link href="/agb" className={linkAccent}>
                AGB § 10
              </Link>
              .
            </p>
            <p className="mt-3">
              Elektronisch können Sie den Widerruf per E-Mail erklären oder das Musterformular
              unten nutzen. Für die Kündigung eines laufenden Abos nach Ablauf der Widerrufsfrist
              nutzen Sie bitte das Kundenportal in der App unter „Abonnement“.
            </p>
            <p className="mt-4">
              <a
                href={mailtoHref}
                className="inline-flex rounded-lg bg-[#c65a20] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#b14f1c]"
              >
                Widerruf per E-Mail senden
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white md:text-zinc-900">
              Muster-Widerrufsformular
            </h2>
            <p className="mb-3 text-sm text-white/70 md:text-zinc-600">
              (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und
              senden Sie es zurück.)
            </p>
            <div className="rounded-xl border border-white/15 bg-black/20 p-4 text-sm md:border-zinc-200 md:bg-zinc-50 md:text-zinc-800">
              <p>
                An {LEGAL.name}, {LEGAL.street}, {LEGAL.city}, E-Mail: {LEGAL.email}
              </p>
              <p className="mt-4">
                Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den
                Kauf der folgenden Waren (*)/die Erbringung der folgenden Dienstleistung (*)
              </p>
              <p className="mt-4">Bestellt am (*)/erhalten am (*)</p>
              <p className="mt-4">Name des/der Verbraucher(s)</p>
              <p className="mt-4">Anschrift des/der Verbraucher(s)</p>
              <p className="mt-4">Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)</p>
              <p className="mt-4">Datum</p>
              <p className="mt-6 text-xs text-white/60 md:text-zinc-500">(*) Unzutreffendes streichen.</p>
            </div>
          </section>
        </div>

        <nav className="mt-12 flex flex-wrap gap-4 border-t border-white/10 pt-6 md:border-zinc-200">
          <Link href="/agb" className={footerNavLink}>
            AGB
          </Link>
          <Link href="/impressum" className={footerNavLink}>
            Impressum
          </Link>
          <Link href="/datenschutz" className={footerNavLink}>
            Datenschutz
          </Link>
        </nav>
      </article>
    </main>
  );
}
