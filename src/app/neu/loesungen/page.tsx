import type { Metadata } from "next";
import Link from "next/link";
import { NeuPageStub } from "@/components/neu/NeuPageStub";

export const metadata: Metadata = {
  title: "Lösungen · Preview",
  robots: { index: false, follow: false },
};

const LINKS = [
  {
    href: "/neu/loesungen/saisonkampagne-brauerei",
    title: "Saisonkampagnen",
  },
  {
    href: "/neu/loesungen/biergarten-event-marketing",
    title: "Biergarten & Events",
  },
  {
    href: "/neu/loesungen/haendler-gastro-promotion",
    title: "Händler & Gastro",
  },
] as const;

export default function NeuLoesungenPage() {
  return (
    <>
      <NeuPageStub
        title="Lösungen für Brauereien"
        description="Übersicht der BrewAI-Szenarien — Redesign folgt hier unter /neu/loesungen."
      />
      <ul className="mx-auto mt-[-3rem] grid max-w-3xl gap-3 px-4 pb-20">
        {LINKS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-xl border border-neutral-900/10 bg-white/70 px-4 py-3 hover:bg-white"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
