"use client";

import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    id: "item-1",
    question: "Wie schnell sehe ich erste Ergebnisse?",
    answer:
      "Erste fertige Bilder und Posts innerhalb von 3–5 Tagen nach Bestellung. Im Dashboard-Abo sofort nach dem Login.",
  },
  {
    id: "item-2",
    question: "Ist das Risiko gering, wenn ich starte?",
    answer:
      "Ja. Pakete sind einmalig ohne Abo-Bindung. Das Dashboard-Abo ist monatlich kündbar. Kein Vertrag, kein Kleingedrucktes.",
  },
  {
    id: "item-3",
    question: "Wie viel Aufwand habe ich intern wirklich?",
    answer:
      "Bei Paketen fast null — du schickst Logo und Briefing, wir liefern. Im Dashboard ca. 5–15 Minuten pro Post.",
  },
  {
    id: "item-4",
    question: "Kann ich später hoch- oder runterwechseln?",
    answer:
      "Ja, jederzeit zum Monatsende. Kein Aufpreis, kein Prozess.",
  },
  {
    id: "item-5",
    question: "Sind die Inhalte wirklich in meinem Markenstil?",
    answer:
      "Ja. Du hinterlegst einmal dein Markenprofil (Logo, Tonalität, Farbschema) — alle Bilder und Texte werden konsistent in deinem Stil ausgespielt.",
  },
] as const;

export default function FAQsComponent() {
  return (
    <section className="bg-transparent py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="space-y-12">
          <h2 className="text-center text-4xl font-semibold text-zinc-900">
            Häufige Fragen
          </h2>

          <Accordion type="single" collapsible className="-mx-2 sm:mx-0">
            {FAQ_ITEMS.map((item) => (
              <div className="group" key={item.id}>
                <AccordionItem
                  value={item.id}
                  className="evg-clean-hover peer rounded-xl border border-transparent bg-transparent px-5 py-1 hover:border-[#e07a40]/35 hover:bg-white/35 hover:shadow-[0_16px_34px_-20px_rgba(198,90,32,0.24)] data-[state=open]:bg-transparent md:px-7"
                >
                  <AccordionTrigger className="cursor-pointer text-base text-zinc-900 hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-700">
                    <p className="text-base">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
                <hr className="mx-5 -mb-px border-zinc-300/70 group-last:hidden peer-data-[state=open]:opacity-0 md:mx-7" />
              </div>
            ))}
          </Accordion>

          <p className="text-center text-zinc-600">
            Du hast noch Fragen? Schreib mir direkt über das{" "}
            <Link href="#contact" className="font-medium text-[#c65a20] hover:underline">
              Kontaktformular
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
