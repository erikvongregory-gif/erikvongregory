"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HelpCircle, Layers, Mail, Package, Sparkles } from "lucide-react";
import { MenuBar, type GlowMenuItem } from "@/components/ui/glow-menu";
import { scrollToSection } from "@/lib/scrollToSection";

const GLOW_NAV_ITEMS: GlowMenuItem[] = [
  {
    icon: HelpCircle,
    label: "Warum",
    href: "#section-2",
    gradient:
      "radial-gradient(circle, rgba(198,90,32,0.2) 0%, rgba(212,104,48,0.09) 50%, rgba(198,90,32,0) 100%)",
    iconColor: "text-[#c65a20]",
    iconHoverClass: "group-hover:text-[#c65a20]",
  },
  {
    icon: Layers,
    label: "Lösungen",
    href: "#section-4",
    gradient:
      "radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(37,99,235,0.07) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-600",
    iconHoverClass: "group-hover:text-blue-600",
  },
  {
    icon: Package,
    label: "Pakete",
    href: "#pakete-preise",
    gradient:
      "radial-gradient(circle, rgba(34,197,94,0.18) 0%, rgba(22,163,74,0.07) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "text-emerald-600",
    iconHoverClass: "group-hover:text-emerald-600",
  },
  {
    icon: Sparkles,
    label: "Beispiele",
    href: "#section-7",
    gradient:
      "radial-gradient(circle, rgba(168,85,247,0.18) 0%, rgba(147,51,234,0.07) 50%, rgba(126,34,206,0) 100%)",
    iconColor: "text-violet-600",
    iconHoverClass: "group-hover:text-violet-600",
  },
  {
    icon: Mail,
    label: "Kontakt",
    href: "#contact",
    gradient:
      "radial-gradient(circle, rgba(239,68,68,0.16) 0%, rgba(220,38,38,0.07) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "text-red-600",
    iconHoverClass: "group-hover:text-red-600",
  },
];

export function ScrollHeader() {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

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

  const headerPaddingTop = isMobile ? 16 : 24;

  useEffect(() => {
    const sectionIds = GLOW_NAV_ITEMS.map((item) => item.href.replace(/^#/, ""));

    const getEl = (id: string): HTMLElement | null => {
      const isDesktopView = window.matchMedia("(min-width: 768px)").matches;
      const wrapper = document.getElementById(isDesktopView ? "desktop-content" : "mobile-content");
      return (wrapper?.querySelector(`#${CSS.escape(id)}`) ?? document.getElementById(id)) as HTMLElement | null;
    };

    // Welche Sections sind gerade sichtbar – letzter Treffer in DOM-Reihenfolge gewinnt
    const visible = new Set<string>();
    const pick = () => {
      let active = "";
      for (const id of sectionIds) {
        if (visible.has(id)) active = `#${id}`;
      }
      setActiveSection(active);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        });
        pick();
      },
      // Section gilt als aktiv sobald sie die obere 55% des Viewports betritt
      { rootMargin: "0px 0px -45% 0px", threshold: 0 }
    );

    sectionIds.forEach(id => {
      const el = getEl(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  const handleNavClick = (hash: string) => {
    scrollToSection(hash);
    setMenuOpen(false);
  };

  const activeGlowLabel =
    GLOW_NAV_ITEMS.find((item) => item.href === activeSection)?.label ?? "";

  /** Wie Desktop: gleicher SiteGradientBackdrop – heller Header auch auf Mobile. */
  const shouldUseHeaderLightTheme = true;

  const headerLogo = (
    <div className="flex flex-col items-start gap-px">
      <Link
        href="/"
        className="premium-header-logo rounded text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:text-2xl"
      >
        EvG<span className="font-light italic font-austera-green-fade">lab</span>
      </Link>
      {isMobile ? (
        <span
          className="text-[10px] font-medium leading-none tracking-wider text-orange-500"
          style={{
            textShadow: "0 0 8px rgba(224, 122, 64, 0.3)",
          }}
        >
          KI für Brauereien
        </span>
      ) : null}
    </div>
  );

  const hamburgerButton = (
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
  );

  return (
    <>
    <header
      className={`premium-header ${shouldUseHeaderLightTheme ? "header-light-theme" : ""}`}
      style={{
        paddingTop: `${headerPaddingTop}px`,
      }}
    >
      <div className="premium-header-container">
        <div className="premium-header-inner mx-auto max-w-full !gap-0 !rounded-none !border-0 !bg-transparent !p-0 !shadow-none">
          {isMobile && menuOpen ? (
            <>
              <div
                className="fixed inset-0 z-[9997] bg-black/50"
                onClick={() => setMenuOpen(false)}
                aria-hidden
              />
              <div
                className="fixed right-4 top-[5rem] z-[9998] flex min-w-[10rem] flex-col gap-0.5 rounded-xl border border-white/15 bg-[#0a0f14] py-2 shadow-xl"
                role="menu"
              >
                {GLOW_NAV_ITEMS.map(({ href, label }) => {
                  const isActive = activeSection === href;
                  return (
                    <a
                      key={href}
                      href={href}
                      role="menuitem"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(href);
                      }}
                      className="premium-header-link whitespace-nowrap px-5 py-2.5 text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-inset"
                      style={isActive ? { color: "#c65a20", fontWeight: 600, opacity: 1 } : undefined}
                    >
                      {label}
                    </a>
                  );
                })}
              </div>
            </>
          ) : null}
          <div className="flex w-full min-w-0 justify-center">
            <div className="min-w-0 max-w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <MenuBar
                className="w-full max-w-full sm:w-max sm:max-w-none"
                logo={headerLogo}
                items={isDesktop ? GLOW_NAV_ITEMS : []}
                endSlot={isMobile ? hamburgerButton : undefined}
                activeItem={activeGlowLabel}
                headerLight={shouldUseHeaderLightTheme}
                onItemClick={(label) => {
                  const item = GLOW_NAV_ITEMS.find((i) => i.label === label);
                  if (item) handleNavClick(item.href);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
