import type { Metadata } from "next";
import Link from "next/link";
import { QuizSection } from "@/components/ui/quiz-section";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Ratgeber: EvGlab-Wissenscheck für Brauereien | EvGlab",
  description:
    "Interaktives Quiz zu EvGlab, Premium-Paketen und dem Token-Dashboard — mit Auswertung und Links zum Vergleich und Ratgeber-Artikel.",
  alternates: { canonical: `${SITE.baseUrl}/ratgeber` },
  openGraph: {
    title: "Ratgeber: EvGlab-Wissenscheck | EvGlab",
    description:
      "Kurzes Wissensquiz für Brauereien in DACH — inklusive Auswertung und nächsten Schritten.",
    url: `${SITE.baseUrl}/ratgeber`,
    locale: "de_DE",
    type: "website",
  },
};

export default function RatgeberIndexPage() {
  return (
    <article className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <nav className="mb-8 text-sm text-zinc-600">
          <Link href="/" className="text-[#b45309] hover:underline">
            Start
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span className="text-zinc-800">Ratgeber</span>
        </nav>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Ratgeber: EvGlab-Wissenscheck</h1>
        <p className="mt-4 text-lg text-zinc-600">
          Fünf Fragen zu <strong>Angebot, Tokens und Markenprofil</strong> — mit direkter Auswertung. Für den Ablauf
          mit KI lies anschließend den{" "}
          <Link href="/ratgeber/marketing-inhalte-mit-ki" className="font-semibold text-[#b45309] hover:underline">
            Ratgeber-Artikel
          </Link>
          .
        </p>
        <QuizSection embedded className="mt-10" />
      </div>
    </article>
  );
}
