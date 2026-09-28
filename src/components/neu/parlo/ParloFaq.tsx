"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "./data";
import { cn } from "@/lib/utils";

export function ParloFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faqs" className="scroll-mt-24">
      <div className="md:mx-[30px] md:border-x border-border py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-center text-sm text-muted-foreground">Fragen & Antworten</p>
          <h2 className="mt-3 text-balance text-center text-3xl font-medium tracking-tight text-foreground md:text-5xl">
            Was ihr zum Dashboard wissen müsst.
          </h2>

          <div className="mt-12 divide-y divide-border border-y border-border">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q} data-slot="accordion-item">
                  <button
                    type="button"
                    data-slot="accordion-trigger"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-base font-medium text-foreground md:text-lg">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-4 shrink-0 text-muted-foreground transition-transform",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <div
                    data-slot="accordion-content"
                    className={cn(
                      "overflow-hidden transition-all",
                      isOpen ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
