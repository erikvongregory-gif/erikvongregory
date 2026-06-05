"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { WaveMark } from "@/components/desktop/WaveMark";
import { usePathname, useRouter } from "next/navigation";
import { APP_LOGIN_URL } from "@/lib/appLoginUrl";
import { useFreeTrialDemo } from "@/context/FreeTrialDemoContext";
import { scrollToSection } from "@/lib/scrollToSection";
import { openCookieSettings } from "@/lib/cookieConsent";
import { SITE } from "@/lib/siteConfig";
import { useLoading } from "@/context/LoadingContext";
import { useSiteNavTheme } from "@/components/useSiteNavTheme";
import { cn } from "@/lib/utils";
import { GLOW_NAV_ITEMS, SECTION_SPY_ELEMENT_ID } from "@/lib/mobileNav";
import { scheduleAfterPaint } from "@/lib/scheduleAfterPaint";
import drawerStyles from "@/components/mobile-drawer-nav.module.css";

/** Längste Exit-Animation (Drawer-Slide) + Puffer */
const DRAWER_EXIT_MS = 420;

const MOBILE_DRAWER_NAV = [
  { label: "Start", tag: "Home", href: "#start" },
  { label: "Warum", tag: "Vorteile", href: "#warum" },
  { label: "Ablauf", tag: "Prozess", href: "#prozess" },
  { label: "Leistungen", tag: "Services", href: "#loesungen" },
  { label: "Preise", tag: "Pakete", href: "#pakete" },
  { label: "Praxis", tag: "Beispiele", href: "#beispiele" },
  { label: "Über uns", tag: "Team", href: "/ueber-uns#ueber-intro" },
  { label: "Kontakt", tag: "Schreib uns", href: "#contact" },
] as const;

export function MobileSiteHeader() {
  const { open: openFreeTrialDemo } = useFreeTrialDemo();
  const pathname = usePathname();
  const router = useRouter();
  const { isLoadComplete } = useLoading();
  const navThemeDark = useSiteNavTheme();
  /** Über-uns Mobile: immer heller Header (dunkler Hero). Ratgeber: nur auf dunklem Ergebnis-Block. */
  const isDark = pathname === "/ratgeber" && navThemeDark;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  /** Portal gemountet – Drawer zunächst ohne Enter-Klasse */
  const [drawerShown, setDrawerShown] = useState(false);
  /** Triggert CSS-Keyframes beim Öffnen */
  const [drawerEnter, setDrawerEnter] = useState(false);
  /** Triggert CSS-Keyframes beim Schließen */
  const [drawerExit, setDrawerExit] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const contactLinkRef = useRef<HTMLAnchorElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (dropdownOpen) {
      setDrawerExit(false);
      setDrawerShown(true);
      setDrawerEnter(false);
      return;
    }

    if (!drawerShown || drawerExit) return;

    const reduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDrawerEnter(false);
      setDrawerExit(false);
      setDrawerShown(false);
      return;
    }

    setDrawerEnter(false);
    const el = drawerRef.current;
    if (el) void el.getBoundingClientRect();
    setDrawerExit(true);
  }, [dropdownOpen, drawerShown, drawerExit]);

  useLayoutEffect(() => {
    if (!dropdownOpen || !drawerShown || drawerEnter || drawerExit) return;

    const reduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDrawerEnter(true);
      return;
    }

    const el = drawerRef.current;
    if (el) void el.getBoundingClientRect();

    return scheduleAfterPaint(() => setDrawerEnter(true));
  }, [dropdownOpen, drawerShown, drawerEnter, drawerExit]);

  useEffect(() => {
    if (!drawerExit) return;
    const t = window.setTimeout(() => {
      setDrawerShown(false);
      setDrawerExit(false);
    }, DRAWER_EXIT_MS);
    return () => window.clearTimeout(t);
  }, [drawerExit]);

  useEffect(() => {
    setDropdownOpen(false);
  }, [pathname]);

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
    if (!drawerShown) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [drawerShown]);

  useEffect(() => {
    const navIds = GLOW_NAV_ITEMS.filter((item) => item.href.startsWith("#")).map((item) => item.href.replace(/^#/, ""));

    const getEl = (id: string): HTMLElement | null => {
      const wrapper = document.getElementById("mobile-content");
      return (wrapper?.querySelector(`#${CSS.escape(id)}`) ?? document.getElementById(id)) as HTMLElement | null;
    };

    const visibleNavIds = new Set<string>();
    const pick = () => {
      let active = "";
      for (const navId of navIds) {
        if (visibleNavIds.has(navId)) active = `#${navId}`;
      }
      setActiveSection(active);
    };

    let obs: IntersectionObserver | null = null;

    const attach = () => {
      if (obs) {
        obs.disconnect();
        obs = null;
      }
      visibleNavIds.clear();

      const observedElToNavId = new Map<HTMLElement, string>();
      for (const navId of navIds) {
        const domId = SECTION_SPY_ELEMENT_ID[navId] ?? navId;
        const el = getEl(domId);
        if (el) observedElToNavId.set(el, navId);
      }

      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const navId = observedElToNavId.get(e.target as HTMLElement);
            if (!navId) return;
            if (e.isIntersecting) visibleNavIds.add(navId);
            else visibleNavIds.delete(navId);
          });
          pick();
        },
        { rootMargin: "0px 0px -45% 0px", threshold: 0 },
      );

      for (const el of observedElToNavId.keys()) obs.observe(el);
      pick();
    };

    attach();
    return () => {
      if (obs) obs.disconnect();
    };
  }, [pathname, isLoadComplete]);

  const homeScrollHashes = MOBILE_DRAWER_NAV.filter(
    (item) => item.href.startsWith("#") && item.href !== "#contact",
  ).map((item) => item.href);

  const handleNavClick = (href: string) => {
    if (href.startsWith("/ueber-uns")) {
      const target = href.includes("#") ? href : "/ueber-uns#ueber-intro";
      if (pathname === "/ueber-uns") {
        const el = document.getElementById("ueber-intro");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        try {
          window.history.replaceState(null, "", target);
        } catch {
          /* noop */
        }
      } else {
        router.push(target);
        if (target.includes("#ueber-intro")) {
          window.setTimeout(() => {
            document.getElementById("ueber-intro")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 120);
        }
      }
      setDropdownOpen(false);
      return;
    }
    if (href.startsWith("/") && href.length > 1 && !href.startsWith("/#")) {
      router.push(href);
      setDropdownOpen(false);
      return;
    }
    if (href === "#contact") {
      contactLinkRef.current?.click();
      setDropdownOpen(false);
      return;
    }
    if (pathname != null && pathname !== "/" && (homeScrollHashes as readonly string[]).includes(href)) {
      void router.push(`/${href}`);
      window.setTimeout(() => scrollToSection(href), 80);
      setDropdownOpen(false);
      return;
    }
    scrollToSection(href);
    setDropdownOpen(false);
  };

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header
      className={cn(
        "mobile-top-header pointer-events-none fixed inset-x-0 top-0 z-[100] box-border flex items-center justify-between gap-3 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(0.35rem,env(safe-area-inset-top))] pb-1 transition-[background-color,box-shadow] duration-[250ms] ease-out lg:hidden",
        isDark
          ? "mobile-top-header--on-dark border-b border-[rgba(244,239,230,0.08)] bg-[#15110C]/88 backdrop-blur-md"
          : "mobile-top-header--editorial border-b border-ink/[0.08] bg-paper/90 shadow-[0_1px_0_color-mix(in_srgb,var(--color-ink)_6%,transparent)] backdrop-blur-md",
      )}
      aria-label="Seitennavigation"
    >
      <a ref={contactLinkRef} href="#contact" tabIndex={-1} className="sr-only" aria-hidden>
        Kontakt
      </a>

      <div className="pointer-events-auto min-w-0 shrink px-1 py-0.5">
        <Link
          href="/"
          className={cn(
            "inline-flex min-w-0 items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber/50 focus-visible:ring-offset-transparent",
            isDark ? "text-paper" : "text-ink",
          )}
          aria-label={SITE.brandLogoAlt}
        >
          <WaveMark className="h-7 w-7 shrink-0" />
          <span className="truncate font-serif-hero text-[20px] font-medium leading-none tracking-[-0.4px]">
            {SITE.name}
          </span>
        </Link>
      </div>

      {mounted && drawerShown
        ? createPortal(
            <>
              <button
                type="button"
                tabIndex={-1}
                aria-hidden
                className={cn(
                  drawerStyles.backdrop,
                  drawerEnter && drawerStyles.backdropEnter,
                  drawerExit && drawerStyles.backdropExit,
                )}
                onClick={() => setDropdownOpen(false)}
              />
              <nav
                ref={drawerRef}
                id="mobile-header-menu"
                role="menu"
                aria-label="Hauptnavigation"
                className={cn(
                  drawerStyles.drawer,
                  drawerEnter && drawerStyles.drawerEnter,
                  drawerExit && drawerStyles.drawerExit,
                )}
              >
                <button
                  type="button"
                  className={drawerStyles.drawerClose}
                  aria-label="Menü schließen"
                  onClick={() => setDropdownOpen(false)}
                >
                  <span className={drawerStyles.drawerCloseIcon} aria-hidden />
                </button>
                <ul className={drawerStyles.navList}>
                  {MOBILE_DRAWER_NAV.map(({ href, label, tag }) => {
                    const isActive =
                      (href.startsWith("#") && activeSection === href) ||
                      (pathname === "/ueber-uns" && href.startsWith("/ueber-uns"));
                    return (
                      <li key={href} className={drawerStyles.navItem} role="none">
                        <a
                          href={href}
                          role="menuitem"
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(href);
                          }}
                          className={cn(drawerStyles.navLink, isActive && drawerStyles.navLinkActive)}
                        >
                          <span className={drawerStyles.navLinkText}>{label}</span>
                          <span className={drawerStyles.navLinkTag}>{tag}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <div className={drawerStyles.drawerFooter}>
                  <button
                    type="button"
                    className={drawerStyles.ctaDrawer}
                    onClick={() => {
                      setDropdownOpen(false);
                      openFreeTrialDemo();
                    }}
                  >
                    3 Bilder kostenlos generieren
                  </button>
                  <a
                    href={APP_LOGIN_URL}
                    className={drawerStyles.loginLink}
                    onClick={() => setDropdownOpen(false)}
                  >
                    Bereits Konto? Anmelden →
                  </a>
                  <div className={drawerStyles.drawerLegal} role="group" aria-label="Rechtliches">
                    <button
                      type="button"
                      className={drawerStyles.drawerLegalBtn}
                      onClick={() => {
                        setDropdownOpen(false);
                        openCookieSettings();
                      }}
                    >
                      Cookie-Einstellungen
                    </button>
                  </div>
                </div>
              </nav>
            </>,
            document.body,
          )
        : null}

      <div
        className={cn(
          "pointer-events-auto relative shrink-0",
          dropdownOpen || drawerExit ? "z-[201]" : "z-[102]",
        )}
      >
        <button
          type="button"
          className={cn(
            drawerStyles.burger,
            dropdownOpen && drawerStyles.burgerOpen,
            "inline-flex h-14 w-14 min-h-14 min-w-14 items-center justify-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            isDark
              ? "text-paper focus-visible:ring-amber/50 focus-visible:ring-offset-[#15110C]"
              : "text-ink focus-visible:ring-amber/40 focus-visible:ring-offset-paper",
          )}
          aria-expanded={dropdownOpen}
          aria-controls="mobile-header-menu"
          aria-haspopup="menu"
          aria-label={dropdownOpen ? "Menü schließen" : "Menü öffnen"}
          onClick={() => setDropdownOpen((o) => !o)}
        >
          <span className={drawerStyles.burgerLine} aria-hidden />
          <span className={drawerStyles.burgerLine} aria-hidden />
          <span className={drawerStyles.burgerLine} aria-hidden />
        </button>
      </div>
    </header>
  );
}
