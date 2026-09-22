"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TRESENGESPRAECH_FAQS } from "@/lib/tresengespraechFaqs";

export function Neuv2Faq() {
  return (
    <section id="faq" className="nv-section">
      <div className="nv-container flex flex-col items-center gap-8">
        <h2 className="text-center text-3xl font-semibold sm:text-5xl">Fragen und Antworten</h2>
        <Accordion type="single" collapsible className="w-full max-w-[800px]">
          {TRESENGESPRAECH_FAQS.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              value={`faq-${i}`}
              className="border-[color-mix(in_oklch,var(--border)_10%,transparent)]"
            >
              <AccordionTrigger className="text-left text-[var(--foreground)] hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[var(--muted-foreground)]">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
