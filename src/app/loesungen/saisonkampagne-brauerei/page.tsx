import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KI Saisonkampagne für Brauereien | EvGlab",
  description:
    "Saisonale Kampagnen für Brauereien mit KI-gestützten Produktbildern, Event-Motiven und Social-Content - schnell und markenkonstant umgesetzt.",
};

export default function SaisonkampagneBrauereiPage() {
  return (
    <main className="relative z-20 mx-auto max-w-4xl px-4 py-16 text-zinc-900">
      <h1 className="text-3xl font-bold sm:text-4xl">KI Saisonkampagnen für Brauereien</h1>
      <p className="mt-4 text-zinc-700">
        Von Frühlingsbier bis Winteredition: Mit einem klaren KI-Workflow entstehen Kampagnenmotive,
        Story-Varianten und Posting-Serien in deinem Markenstil.
      </p>
      <ul className="mt-6 space-y-2 text-zinc-700">
        <li>• Kampagnenmotive für mehrere Formate (Feed, Story, Ads)</li>
        <li>• Fester Produktionsrhythmus mit kurzen Feedback-Schleifen</li>
        <li>• Konsistente Bildsprache über die gesamte Saison hinweg</li>
      </ul>
      <Link href="/#pakete-preise" className="mt-8 inline-flex text-sm font-semibold text-[#c65a20] hover:underline">
        Passendes Paket ansehen
      </Link>
    </main>
  );
}
