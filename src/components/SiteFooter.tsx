"use client";

import Link from "next/link";
import { useFreeTrialDemo } from "@/context/FreeTrialDemoContext";
import { DesktopContainer } from "@/components/desktop/DesktopContainer";
import { DesktopRevealItem, DesktopRevealStagger } from "@/components/desktop/DesktopReveal";
import { WaveMark } from "@/components/desktop/WaveMark";
import { openCookieSettings } from "@/lib/cookieConsent";
import { SITE } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

type FooterRow = {
  key: string;
  value: string;
  href?: string;
  external?: boolean;
};

const FOOTER_COLS: { title: string; rows: FooterRow[] }[] = [
  {
    title: "Direkt",
    rows: [
      { key: "E-Mail", value: SITE.contactEmail, href: SITE.contactMailto },
      {
        key: "Anruf",
        value: SITE.contactPhoneDisplay,
        href: SITE.whatsappUrl,
        external: true,
      },
    ],
  },
  {
    title: "Social",
    rows: [
      {
        key: "LinkedIn",
        value: "Profil",
        href: SITE.linkedinUrl,
        external: true,
      },
      {
        key: "WhatsApp",
        value: SITE.contactPhoneDisplay,
        href: SITE.whatsappUrl,
        external: true,
      },
    ],
  },
  {
    title: "Sitz",
    rows: [
      { key: "Land", value: "Deutschland" },
      { key: "Hosting", value: "DSGVO · DE" },
    ],
  },
  {
    title: "Mehr",
    rows: [
      { key: "Lösungen", value: "/loesungen", href: "/loesungen" },
      { key: "Wissens-Quiz", value: "/ratgeber", href: "/ratgeber" },
      { key: "Über uns", value: "/ueber-uns", href: "/ueber-uns" },
    ],
  },
];

const LEGAL_NAV_LINK =
  "inline-flex items-center border-0 bg-transparent p-0 font-inherit text-inherit uppercase tracking-wider hover:text-paper";

type SiteFooterProps = {
  className?: string;
  footerId?: string;
};

export function SiteFooter({ className, footerId = "site-footer" }: SiteFooterProps) {
  const { open: openFreeTrialDemo } = useFreeTrialDemo();

  return (
    <>
      <div id="contact" className="scroll-mt-24" aria-hidden />
      <footer
        id={footerId}
        className={cn("scroll-mt-24 bg-[#0F0C08] py-12 text-paper sm:py-16 lg:py-20", className)}
      >
        <DesktopContainer>
          <DesktopRevealStagger className="grid gap-10 border-b border-[rgba(244,239,230,0.08)] pb-10 sm:gap-12 sm:pb-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:pb-16" softEntrance>
            <DesktopRevealItem>
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
                  onClick={() => openFreeTrialDemo()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber px-6 py-3.5 font-sans-tight text-sm font-semibold text-[#15110C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber sm:w-auto"
                >
                  3 Bilder kostenlos generieren →
                </button>
                <a
                  href={SITE.contactMailto}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-[rgba(244,239,230,0.18)] px-6 py-3.5 font-sans-tight text-sm font-medium text-paper transition hover:bg-[rgba(244,239,230,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber sm:w-auto"
                >
                  E-Mail schreiben
                </a>
              </div>
            </div>
            </DesktopRevealItem>
            <DesktopRevealItem>
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              {FOOTER_COLS.map((col) => (
                <div key={col.title}>
                  <p className="mb-3 font-mono-hero text-[10px] uppercase tracking-wider text-[#8C7E68] sm:mb-4">
                    {col.title}
                  </p>
                  <ul className="space-y-2">
                    {col.rows.map((row) => (
                      <li key={row.key} className="flex justify-between gap-3 text-[12px] sm:gap-4 sm:text-[13px]">
                        <span className="font-mono-hero text-[#8C7E68]">{row.key}</span>
                        {row.href ? (
                          row.href.startsWith("/") ? (
                            <Link href={row.href} className="shrink-0 text-[#E8DFCB] hover:text-amber2">
                              {row.href === "/ratgeber" ? "→ Quiz" : "→ Seite"}
                            </Link>
                          ) : (
                            <a
                              href={row.href}
                              className="shrink-0 text-right font-mono-hero text-[#E8DFCB] transition hover:text-amber2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
                              {...(row.external
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : {})}
                              {...(row.href === SITE.whatsappUrl
                                ? { "aria-label": `WhatsApp: ${SITE.contactPhoneDisplay}` }
                                : row.href === SITE.linkedinUrl
                                  ? { "aria-label": "LinkedIn-Profil von Erik von Gregory" }
                                  : {})}
                            >
                              {row.value}
                            </a>
                          )
                        ) : (
                          <span className="text-right font-mono-hero text-[#E8DFCB]">{row.value}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            </DesktopRevealItem>
          </DesktopRevealStagger>

          <DesktopRevealStagger className="flex flex-col gap-5 pt-6 font-mono-hero text-[10px] uppercase tracking-wider text-[#8C7E68] sm:flex-row sm:items-center sm:justify-between sm:pt-7 sm:text-[11px]" staggerMs={70}>
            <DesktopRevealItem>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[#C8BFAD]">
              <WaveMark className="h-5 w-5 shrink-0" />
              <span>© 2026 BrewAI · Alle Rechte vorbehalten</span>
              <span className="text-[#8C7E68]" aria-hidden>
                ·
              </span>
              <a
                href={SITE.agencyBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8C7E68] transition hover:text-amber2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
              >
                EvGlab Webdesign → {SITE.agencyHost}
              </a>
            </p>
            </DesktopRevealItem>
            <DesktopRevealItem>
            <nav
              className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-6"
              aria-label="Rechtliches"
            >
              <Link href="/impressum" className={LEGAL_NAV_LINK}>
                Impressum
              </Link>
              <Link href="/datenschutz" className={LEGAL_NAV_LINK}>
                Datenschutz
              </Link>
              <Link href="/agb" className={LEGAL_NAV_LINK}>
                AGB
              </Link>
              <button type="button" onClick={() => openCookieSettings()} className={LEGAL_NAV_LINK}>
                Cookies
              </button>
            </nav>
            </DesktopRevealItem>
          </DesktopRevealStagger>
        </DesktopContainer>
      </footer>
    </>
  );
}
