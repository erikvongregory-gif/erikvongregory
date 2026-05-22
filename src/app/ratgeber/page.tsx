import type { Metadata } from "next";
import Link from "next/link";
import { RatgeberAdvisorQuiz } from "@/components/ui/ratgeber-advisor-quiz";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Ratgeber: EvGlab-Wissenscheck für Brauereien | EvGlab",
  description:
    "Interaktiver Ratgeber-Quiz fuer Brauereien: finde heraus, ob Dashboard oder Premium-Umsetzung besser zu deinem Team passt.",
  alternates: { canonical: `${SITE.baseUrl}/ratgeber` },
  openGraph: {
    title: "Ratgeber: EvGlab-Wissenscheck | EvGlab",
    description:
      "Klickbarer Entscheidungs-Quiz fuer Brauereien in DACH mit direkter Empfehlung: Dashboard oder Premium-Umsetzung.",
    url: `${SITE.baseUrl}/ratgeber`,
    locale: "de_DE",
    type: "website",
  },
};

export default function RatgeberIndexPage() {
  return (
    <article id="ratgeber-page" className="relative z-[75] min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-3xl px-4 pb-14 pt-[calc(68px+2.5rem)] sm:px-6 sm:pb-20">
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
          Beantworte fünf kurze Fragen zu <strong>Zeit, Workflow und Zielbild</strong> und erhalte eine klare Empfehlung:
          Dashboard oder Premium-Umsetzung.
        </p>
        <RatgeberAdvisorQuiz className="mt-10" />
      </div>
    </article>
  );
}
