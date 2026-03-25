"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { smoothStep } from "@/lib/scrollConstants";

/** Scrollt zum sichtbaren Abschnitt (behebt Duplikat-IDs bei Mobile/Desktop) */
function scrollToSection(hash: string) {
  const id = hash.replace(/^#/, "");
  if (!id) return;
  const isDesktop = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
  const wrapper = document.getElementById(isDesktop ? "desktop-content" : "mobile-content");
  const target = wrapper?.querySelector(`#${CSS.escape(id)}`) ?? document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", hash ? `#${id}` : window.location.pathname);
  }
}

/** Scroll-Distanz bis Header-Effekt vollständig */
const HEADER_TRANSITION_END = 80;
const PROGRESS_STEP = 0.04; /* Nur State-Update wenn Progress sich merklich ändert – flüssigeres Scroll */

const NAV_ITEMS = [
  { href: "#section-2", label: "Warum" },
  { href: "#section-4", label: "Lösungen" },
  { href: "#pakete-preise", label: "Pakete" },
  { href: "#section-7", label: "Beispiele" },
  { href: "#contact", label: "Kontakt" },
] as const;

export function ScrollHeader() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastProgressRef = useRef(0);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsDesktop(!mobile);
      if (!mobile) setMenuOpen(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (menuOpen && isMobile) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [menuOpen, isMobile]);

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const raw = Math.min(1, scrollY / HEADER_TRANSITION_END);
        const p = smoothStep(raw);
        if (Math.abs(p - lastProgressRef.current) >= PROGRESS_STEP) {
          lastProgressRef.current = p;
          setProgress(p);
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Interpolate values: progress 0 = top state, progress 1 = section 3 state
  // Auf Mobile: kleinere Werte, damit Logo & Nav sichtbar bleiben
  const headerPaddingTop = isMobile ? 16 : 24 - progress * 12;
  const innerGap = isMobile ? 16 : 48 - progress * 28;
  const innerPaddingV = isMobile ? 10 : 12 - progress * 4;
  const innerPaddingH = isMobile ? 16 : 32 - progress * 8;
  const innerPaddingLeft = isMobile ? 16 : 16 + progress * 8;
  const inwardShift = isMobile ? 0 : progress * 64;
  const barShrink = isMobile ? 0 : progress * 0.28;
  const borderOpacity = progress;
  const borderRadius = isMobile ? 9999 : 9999 - progress * (9999 - 16);
  const logoFontSize = isMobile ? 18 : 24 - progress * 4;

  const handleNavClick = (hash: string) => {
    scrollToSection(hash);
    setMenuOpen(false);
  };

  const shouldUseHeaderLightTheme = isDesktop;

  return (
    <header
      className={`premium-header premium-header-progress ${shouldUseHeaderLightTheme ? "header-light-theme" : ""}`}
      style={{
        paddingTop: `${headerPaddingTop}px`,
      }}
    >
      <div className="premium-header-container">
        <div
          className="premium-header-inner"
          style={{
            gap: `${innerGap}px`,
            paddingTop: `${innerPaddingV}px`,
            paddingRight: `${innerPaddingH + inwardShift}px`,
            paddingBottom: `${innerPaddingV}px`,
            paddingLeft: `${innerPaddingLeft + inwardShift}px`,
            width: `${(1 - barShrink) * 100}%`,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: `${borderRadius}px`,
            borderColor: "transparent",
            backgroundColor: progress > 0
              ? (shouldUseHeaderLightTheme ? "rgba(255, 255, 255, 0.65)" : "rgba(10, 15, 20, 0.7)")
              : "transparent",
            backdropFilter: progress > 0 ? "blur(12px)" : "none",
            WebkitBackdropFilter: progress > 0 ? "blur(12px)" : "none",
            boxShadow: "none",
          }}
        >
          <div className="flex flex-col items-start gap-px">
            <Link
              href="/"
              className="premium-header-logo rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              style={{ fontSize: `${logoFontSize}px` }}
            >
              EvG<span className="font-light italic font-austera-green-fade">lab</span>
            </Link>
            {isMobile && (
              <span
                className="text-[10px] font-medium leading-none tracking-wider text-orange-500"
                style={{
                  textShadow: "0 0 8px rgba(224, 122, 64, 0.3)",
                }}
              >
                KI für Brauereien
              </span>
            )}
          </div>
          <nav className="premium-header-nav flex items-center justify-end gap-x-3 sm:gap-x-5">
            {/* Mobile: Hamburger-Menü */}
            {isMobile ? (
              <>
                <button
                  type="button"
                  onClick={() => setMenuOpen((o) => !o)}
                  className="premium-header-link flex h-9 w-9 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
                  aria-expanded={menuOpen}
                >
                  {menuOpen ? (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                  )}
                </button>
                {menuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[9997] bg-black/50"
                      onClick={() => setMenuOpen(false)}
                      aria-hidden
                    />
                    <div
                      className="fixed right-4 top-[5rem] z-[9998] flex min-w-[10rem] flex-col gap-0.5 rounded-xl border border-white/15 bg-[#0a0f14]/95 py-2 shadow-xl backdrop-blur-xl"
                      role="menu"
                    >
                      {NAV_ITEMS.map(({ href, label }) => (
                        <a
                          key={href}
                          href={href}
                          role="menuitem"
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(href);
                          }}
                          className="premium-header-link whitespace-nowrap px-5 py-2.5 text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-inset"
                        >
                          {label}
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              /* Desktop: Inline-Nav */
              NAV_ITEMS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(href); }}
                  className="premium-header-link rounded text-[13px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:text-[0.9375rem]"
                >
                  {label}
                </a>
              ))
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
