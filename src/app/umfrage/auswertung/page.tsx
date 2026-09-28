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
    <main id="main" className="relative z-20 min-h-[100dvh] pt-20">
      <div className="relative mx-auto flex min-h-[calc(100dvh-5rem)] max-w-xl flex-col justify-center px-5 pb-16 pt-12 sm:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[1.5px] text-muted-foreground sm:text-[11px]">
          {UMFRAGE_META.reportName}
        </p>
        <h1 className="mt-4 text-[2.2rem] font-medium leading-[1.08] tracking-tight text-foreground sm:text-[2.6rem]">
          Die Auswertung kommt bald.
        </h1>
        <p className="mt-5 text-[16px] leading-relaxed text-foreground/80">
          Wir werten die Antworten anonymisiert aus. Sobald genug Brauereien
          teilgenommen haben, steht der Branchenreport hier – und alle, die die
          Auswertung angefordert haben, bekommen den Link per E-Mail.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/umfrage"
            className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Zur Umfrage
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </main>
  );
}
