"use client";

import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TRESENGESPRAECH_FAQS } from "@/lib/tresengespraechFaqs";

const FAQ_ITEMS = TRESENGESPRAECH_FAQS.map((faq, index) => ({
  id: `item-${index + 1}`,
  question: faq.q,
  answer: faq.a,
}));

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
