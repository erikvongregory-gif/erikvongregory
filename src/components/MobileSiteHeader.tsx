"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { WaveMark } from "@/components/desktop/WaveMark";
import { usePathname, useRouter } from "next/navigation";
import { APP_LOGIN_URL } from "@/lib/appLoginUrl";
import { scrollToSection } from "@/lib/scrollToSection";
import { SITE } from "@/lib/siteConfig";
import { useLoading } from "@/context/LoadingContext";
import { useSiteNavTheme } from "@/components/useSiteNavTheme";
import { cn } from "@/lib/utils";
import { GLOW_NAV_ITEMS, navItemsForMenu, SECTION_SPY_ELEMENT_ID } from "@/lib/mobileNav";

export function MobileSiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoadComplete } = useLoading();
  const navThemeDark = useSiteNavTheme();
  /** Über-uns Mobile: immer heller Header (dunkler Hero). Ratgeber: nur auf dunklem Ergebnis-Block. */
  const isDark = pathname === "/ratgeber" && navThemeDark;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileAuthDialogOpen, setMobileAuthDialogOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const contactLinkRef = useRef<HTMLAnchorElement>(null);

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
    if (!dropdownOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [dropdownOpen]);

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

  const homeScrollHashes = GLOW_NAV_ITEMS.filter(
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
    if (pathname != null && pathname !== "/" && homeScrollHashes.includes(href)) {
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

      {dropdownOpen ? (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          className="pointer-events-auto fixed inset-0 z-[99] bg-black/20 backdrop-blur-[2px]"
          onClick={() => setDropdownOpen(false)}
        />
      ) : null}

      <div ref={mobileNavRef} className="pointer-events-auto relative z-[101] shrink-0">
        <button
          type="button"
          className={cn(
            "inline-flex h-14 w-14 min-h-14 min-w-14 items-center justify-center rounded-xl bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
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
          {dropdownOpen ? (
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {dropdownOpen ? (
          <div
            id="mobile-header-menu"
            role="menu"
            className={cn(
              "mobile-header-menu-panel mobile-header-menu-panel--open absolute right-0 top-full z-[110] mt-1.5 min-w-[14.5rem] origin-top-right overflow-hidden rounded-2xl py-2 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.28)] backdrop-blur-xl",
              isDark
                ? "border border-[rgba(244,239,230,0.12)] bg-[#15110C]/96"
                : "border border-ink/10 bg-paper/95",
            )}
          >
            {navItemsForMenu(true).map(({ href, label }) => {
              const isActive =
                (href.startsWith("#") && activeSection === href) ||
                (pathname === "/ueber-uns" && href.startsWith("/ueber-uns"));
              return (
                <a
                  key={href}
                  href={href}
                  role="menuitem"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(href);
                  }}
                  className={cn(
                    "block rounded-xl px-4 py-2.5 font-sans-tight text-[15px] transition focus-visible:outline-none",
                    isDark
                      ? "text-[#A89B83] hover:bg-[rgba(244,239,230,0.06)] hover:text-paper focus-visible:bg-[rgba(244,239,230,0.06)]"
                      : "text-ink2 hover:bg-ink/5 hover:text-ink focus-visible:bg-ink/5",
                    isActive &&
                      (isDark
                        ? "bg-[rgba(244,239,230,0.08)] font-semibold text-paper"
                        : "bg-ink/5 font-semibold text-ink"),
                  )}
                >
                  {label}
                </a>
              );
            })}
            <div
              className={cn(
                "mt-2 border-t px-3 pb-1 pt-3",
                isDark ? "border-[rgba(244,239,230,0.08)]" : "border-ink/10",
              )}
            >
              <a
                href={APP_LOGIN_URL}
                className={cn(
                  "inline-flex h-10 w-full items-center justify-center rounded-[10px] px-4 font-sans-tight text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber",
                  isDark
                    ? "border border-[rgba(244,239,230,0.12)] text-[#A89B83] hover:border-[rgba(244,239,230,0.2)] hover:text-paper"
                    : "border border-ink/10 text-ink3 hover:text-ink",
                )}
              >
                Anmelden
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
