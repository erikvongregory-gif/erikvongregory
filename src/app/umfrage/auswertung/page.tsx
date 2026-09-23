import type { Metadata } from "next";
import Link from "next/link";
import { UMFRAGE_META } from "@/content/umfrage";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `${UMFRAGE_META.reportName} – Auswertung | ${SITE.name}`,
  description:
    "Anonymisierte Branchenauswertung des Brauerei-Marketing-Barometers 2026. Erscheint, sobald genug Brauereien teilgenommen haben.",
  alternates: { canonical: `${SITE.baseUrl}${UMFRAGE_META.resultsPath}` },
  robots: { index: false, follow: true },
};

export default function UmfrageAuswertungPage() {
  return (
    <main
      id="main"
      className="relative z-20 min-h-[100dvh] bg-paper text-ink pt-[var(--mobile-top-header-offset)] lg:pt-[var(--site-header-offset)]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(198,105,30,0.08),_transparent_55%)]"
        aria-hidden
      />
      <div className="relative mx-auto flex min-h-[calc(100dvh-var(--mobile-top-header-offset))] max-w-xl flex-col justify-center px-5 pb-16 pt-12 sm:px-6 lg:min-h-[calc(100dvh-var(--site-header-offset))]">
        <p className="font-mono-hero text-[10px] uppercase tracking-[1.5px] text-amber sm:text-[11px]">
          {UMFRAGE_META.reportName}
        </p>
        <h1 className="mt-4 font-serif-hero text-[2.2rem] font-medium leading-[1.08] tracking-[-0.045em] text-ink sm:text-[2.6rem]">
          Die Auswertung kommt bald.
        </h1>
        <p className="mt-5 text-[16px] leading-relaxed text-ink2">
          Wir werten die Antworten anonymisiert aus. Sobald genug Brauereien
          teilgenommen haben, steht der Branchenreport hier – und alle, die die
          Auswertung angefordert haben, bekommen den Link per E-Mail.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/umfrage"
            className="inline-flex items-center justify-center rounded-2xl bg-[#c65a20] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#d46830]"
          >
            Zur Umfrage
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl px-5 py-3.5 text-sm font-medium text-ink3 transition hover:text-ink"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </main>
  );
}
