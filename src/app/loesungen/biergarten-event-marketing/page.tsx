import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Biergarten- und Event-Marketing mit KI | EvGlab",
  description:
    "Mehr Besucher für Ausschanktage, Verkostungen und Biergarten-Events durch planbare Kampagnenmotive und Social-Content speziell für Brauereien.",
};

export default function BiergartenEventMarketingPage() {
  return (
    <main className="relative z-20 mx-auto max-w-4xl px-4 py-16 text-zinc-900">
      <h1 className="text-3xl font-bold sm:text-4xl">Biergarten- & Event-Marketing für Brauereien</h1>
      <p className="mt-4 text-zinc-700">
        Für Events zählt Timing. EvGlab liefert die passenden Visuals für Ankündigung, Reminder und Nachbereitung -
        ohne Design-Stau im Tagesgeschäft.
      </p>
      <ul className="mt-6 space-y-2 text-zinc-700">
        <li>• Event-Visuals für Social, Website und Partnerkanäle</li>
        <li>• Reminder-Serien für bessere Besucherquote</li>
        <li>• Wiederverwendbare Vorlagen für kommende Veranstaltungen</li>
      </ul>
      <Link href="/#contact" className="mt-8 inline-flex text-sm font-semibold text-[#c65a20] hover:underline">
        Event-Kampagne anfragen
      </Link>
    </main>
  );
}
