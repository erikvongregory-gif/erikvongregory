"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { HelpCircle, Layers, Mail, Package, Sparkles } from "lucide-react";
import { MenuBar, type GlowMenuItem } from "@/components/ui/glow-menu";
import { scrollToSection } from "@/lib/scrollToSection";
import { cn } from "@/lib/utils";

const HeaderLogin = dynamic(() => import("@/components/HeaderLogin").then((m) => m.HeaderLogin), {
  ssr: false,
});

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
      "radial-gradient(circle, rgba(224,122,64,0.24) 0%, rgba(198,90,32,0.14) 50%, rgba(184,77,21,0) 100%)",
    iconColor: "text-[#c65a20]",
    iconHoverClass: "group-hover:text-[#c65a20]",
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
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileAuthDialogOpen, setMobileAuthDialogOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const contactLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const closeOnWide = () => {
      if (window.innerWidth >= 1024) setDropdownOpen(false);
    };
    closeOnWide();
    window.addEventListener("resize", closeOnWide);
    return () => window.removeEventListener("resize", closeOnWide);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!dropdownOpen) return;
    const onPointer = (e: MouseEvent | TouchEvent) => {
      if (mobileAuthDialogOpen) return;
      const el = mobileNavRef.current;
      if (!el) return;
      const target = e.target;
      if (target instanceof Node && !el.contains(target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [dropdownOpen, mobileAuthDialogOpen]);

  useEffect(() => {
    const onAuthDialogOpenChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ open?: boolean }>;
      setMobileAuthDialogOpen(Boolean(customEvent.detail?.open));
    };

    window.addEventListener("evglab-mobile-auth-dialog-open-change", onAuthDialogOpenChange as EventListener);
    return () => {
      window.removeEventListener("evglab-mobile-auth-dialog-open-change", onAuthDialogOpenChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const sectionIds = GLOW_NAV_ITEMS
      .filter((item) => item.href.startsWith("#"))
      .map((item) => item.href.replace(/^#/, ""));

    const getEl = (id: string): HTMLElement | null => {
      const isDesktopView = window.matchMedia("(min-width: 768px)").matches;
      const wrapper = document.getElementById(isDesktopView ? "desktop-content" : "mobile-content");
      return (wrapper?.querySelector(`#${CSS.escape(id)}`) ?? document.getElementById(id)) as HTMLElement | null;
    };

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
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        });
        pick();
      },
      { rootMargin: "0px 0px -45% 0px", threshold: 0 },
    );

    sectionIds.forEach((id) => {
      const el = getEl(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  const handleNavClick = (hash: string) => {
    if (hash === "#contact") {
      contactLinkRef.current?.click();
      setDropdownOpen(false);
      return;
    }
    scrollToSection(hash);
    setDropdownOpen(false);
  };

  const activeGlowLabel =
    GLOW_NAV_ITEMS.find((item) => item.href === activeSection)?.label ?? "";

  const shouldUseHeaderLightTheme = true;

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  const evglabWordmarkDesktop = (
    <>
      EvG<span className="font-light italic font-austera-green-fade">lab</span>
    </>
  );
  const evglabWordmarkMobile = (
    <>
      EvG
      <span
        className="font-light italic text-[#c65a20]"
        style={{ background: "none", WebkitTextFillColor: "#c65a20" }}
      >
        lab
      </span>
    </>
  );

  const logoLinkClassBase =
    "premium-header-logo rounded text-lg leading-none tracking-tight whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:text-2xl";

  const headerLogoDesktop = (
    <div className="flex flex-col items-start gap-px">
      <Link
        href="/"
        className={cn(
          logoLinkClassBase,
          "focus-visible:ring-white/60 focus-visible:ring-offset-transparent",
        )}
      >
        {evglabWordmarkDesktop}
      </Link>
    </div>
  );
  const headerLogoMobile = (
    <div className="flex flex-col items-start gap-px">
      <Link
        href="/"
        className={cn(
          logoLinkClassBase,
          "focus-visible:ring-white/60 focus-visible:ring-offset-transparent",
        )}
      >
        {evglabWordmarkMobile}
      </Link>
    </div>
  );

  return (
    <>
      {/* Mobile: kompakter Header mit Dropdown */}
      <header
        className="mobile-top-header pointer-events-none fixed left-0 right-0 top-0 z-[100] box-border flex items-center justify-between gap-3 bg-transparent pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(0.35rem,env(safe-area-inset-top))] pb-1 md:hidden"
        aria-label="Seitennavigation"
      >
        <a
          ref={contactLinkRef}
          href="#contact"
          tabIndex={-1}
          className="sr-only"
          aria-hidden
        >
          Kontakt
        </a>
        <div className="pointer-events-auto min-w-0 shrink rounded-lg border border-black/10 bg-white/88 px-2.5 py-1 shadow-[0_6px_18px_-10px_rgba(24,24,27,0.3)] backdrop-blur-sm">
          {headerLogoMobile}
        </div>

        <div ref={mobileNavRef} className="pointer-events-auto relative shrink-0">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-transparent text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
            aria-expanded={dropdownOpen}
            aria-haspopup="menu"
            aria-label={dropdownOpen ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setDropdownOpen((o) => !o)}
          >
            {dropdownOpen ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          {dropdownOpen ? (
            <div
              className="absolute right-0 top-full z-[110] mt-2 min-w-[14.5rem] overflow-hidden rounded-2xl border border-white/10 bg-[#12151b] py-2 text-white shadow-[0_24px_40px_-24px_rgba(0,0,0,0.9)]"
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
                    className="block rounded-lg px-4 py-2.5 text-[15px] text-zinc-200 transition hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none"
                    style={
                      isActive ? { color: "#c8ff26", fontWeight: 600 } : undefined
                    }
                  >
                    {label}
                  </a>
                );
              })}
              <HeaderLogin
                variant="mobile"
                className="mt-2 border-t border-white/10 bg-transparent px-3 pb-2 pt-3"
              />
            </div>
          ) : null}
        </div>
      </header>

      {/* Tablet/Desktop: Premium-Header mit Glow-Menü */}
      <header
        className={cn(
          "premium-header hidden md:block",
          shouldUseHeaderLightTheme && "header-light-theme",
        )}
      >
        <div className="premium-header-container !max-w-none">
          <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4">
            <div className="min-w-0 justify-self-start">
              {headerLogoDesktop}
            </div>
            <div className="min-w-0">
              <div className="min-w-0 max-w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <MenuBar
                  className="w-full max-w-full sm:w-max sm:max-w-none"
                  items={GLOW_NAV_ITEMS}
                  activeItem={activeGlowLabel}
                  headerLight={shouldUseHeaderLightTheme}
                  onItemClick={(label) => {
                    const item = GLOW_NAV_ITEMS.find((i) => i.label === label);
                    if (item) handleNavClick(item.href);
                  }}
                />
              </div>
            </div>
            <div className="min-w-0 justify-self-end">
              <HeaderLogin variant="desktop" className="!border-0 !pl-0" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
