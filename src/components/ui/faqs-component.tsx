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
      "Nach dem Briefing starten wir meist innerhalb von 48 Stunden. Erste verwertbare Assets kommen in der Regel in den ersten 3 bis 7 Tagen.",
  },
  {
    id: "item-2",
    question: "Ist das Risiko gering, wenn ich starte?",
    answer:
      "Ja. Du startest mit einem klaren Paket, festen Deliverables und transparenten Zeitfenstern - ohne lange Vertragsbindung.",
  },
  {
    id: "item-3",
    question: "Wie viel Aufwand habe ich intern wirklich?",
    answer:
      "Der Prozess ist bewusst schlank: kurzes Briefing, schnelle Feedback-Schleifen, dann erhältst du einsatzbereiten Content für deine Kanäle.",
  },
  {
    id: "item-4",
    question: "Kann ich später hoch- oder runterwechseln?",
    answer:
      "Ja, bei den Dashboard-Abos kannst du flexibel wechseln. So passt du den Umfang an Saison, Aktionen und Teamgröße an.",
  },
  {
    id: "item-5",
    question: "Sind die Inhalte wirklich in meinem Markenstil?",
    answer:
      "Genau darauf ist der Prozess aufgebaut: deine Marke wird zuerst definiert, danach entstehen Assets konsistent in deinem Look statt generischer KI-Optik.",
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
