"use client";

import Link from "next/link";
import { navigateToAppDashboard } from "@/lib/appLoginUrl";
import { DesktopContainer } from "@/components/desktop/DesktopContainer";
import { WaveMark } from "@/components/desktop/WaveMark";
import { cn } from "@/lib/utils";

const FOOTER_COLS = [
  {
    title: "Direkt",
    rows: [
      ["E-Mail", "kontakt@evglab.com"],
      ["Anruf", "nach Termin"],
    ],
  },
  {
    title: "Social",
    rows: [
      ["LinkedIn", "evglab"],
      ["WhatsApp", "+49 …"],
    ],
  },
  {
    title: "Sitz",
    rows: [
      ["Land", "Deutschland"],
      ["Hosting", "DSGVO · DE"],
    ],
  },
  {
    title: "Mehr",
    rows: [
      ["Wissens-Quiz", "/ratgeber"],
      ["Über uns", "/ueber-uns"],
    ],
  },
] as const;

type SiteFooterProps = {
  className?: string;
  footerId?: string;
};

export function SiteFooter({ className, footerId = "site-footer" }: SiteFooterProps) {
  return (
    <>
      <div id="contact" className="scroll-mt-24" aria-hidden />
      <footer
        id={footerId}
        className={cn("scroll-mt-24 bg-[#0F0C08] py-12 text-paper sm:py-16 lg:py-20", className)}
      >
        <DesktopContainer>
          <div className="grid gap-10 border-b border-[rgba(244,239,230,0.08)] pb-10 sm:gap-12 sm:pb-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:pb-16">
            <div>
              <p className="mb-4 flex items-center gap-3 font-mono-hero text-[10px] uppercase tracking-[1.4px] text-amber2 sm:mb-6 sm:text-[11px]">
                <span className="h-px w-6 bg-amber2/50 sm:w-8" aria-hidden />
                Kontakt aufnehmen
              </p>
              <h2 className="font-serif-hero text-[clamp(2rem,8vw,3.5rem)] font-normal leading-[1.02] tracking-[-0.04em] lg:text-[56px] lg:leading-[0.98] lg:tracking-[-1.6px]">
                Bereit, deine
                <br />
                Brauerei <em className="italic text-amber2">sichtbar</em> zu machen?
              </h2>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => navigateToAppDashboard()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber px-6 py-3.5 font-sans-tight text-sm font-semibold text-[#15110C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber sm:w-auto"
                >
                  3 Bilder kostenlos generieren →
                </button>
                <a
                  href="mailto:kontakt@evglab.com"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-[rgba(244,239,230,0.18)] px-6 py-3.5 font-sans-tight text-sm font-medium text-paper transition hover:bg-[rgba(244,239,230,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber sm:w-auto"
                >
                  E-Mail schreiben
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              {FOOTER_COLS.map((col) => (
                <div key={col.title}>
                  <p className="mb-3 font-mono-hero text-[10px] uppercase tracking-wider text-[#8C7E68] sm:mb-4">
                    {col.title}
                  </p>
                  <ul className="space-y-2">
                    {col.rows.map(([key, val]) => (
                      <li key={key} className="flex justify-between gap-3 text-[12px] sm:gap-4 sm:text-[13px]">
                        <span className="font-mono-hero text-[#8C7E68]">{key}</span>
                        {val.startsWith("/") ? (
                          <Link href={val} className="shrink-0 text-[#E8DFCB] hover:text-amber2">
                            {val === "/ratgeber" ? "→ Quiz" : "→ Seite"}
                          </Link>
                        ) : (
                          <span className="text-right font-mono-hero text-[#E8DFCB]">{val}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5 pt-6 font-mono-hero text-[10px] uppercase tracking-wider text-[#8C7E68] sm:flex-row sm:items-center sm:justify-between sm:pt-7 sm:text-[11px]">
            <p className="flex items-center gap-2 text-[#C8BFAD]">
              <WaveMark className="shrink-0 text-amber2" />
              © 2026 EvGlab · Alle Rechte vorbehalten
            </p>
            <nav className="flex flex-wrap gap-x-5 gap-y-2 sm:gap-6" aria-label="Rechtliches">
              <Link href="/impressum" className="hover:text-paper">
                Impressum
              </Link>
              <Link href="/datenschutz" className="hover:text-paper">
                Datenschutz
              </Link>
              <Link href="/agb" className="hover:text-paper">
                AGB
              </Link>
              <Link href="/cookies" className="hover:text-paper">
                Cookies
              </Link>
            </nav>
          </div>
        </DesktopContainer>
      </footer>
    </>
  );
}
