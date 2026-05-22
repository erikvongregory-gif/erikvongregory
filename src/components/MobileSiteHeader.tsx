"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { APP_LOGIN_URL } from "@/lib/appLoginUrl";
import { scrollToSection } from "@/lib/scrollToSection";
import { SITE } from "@/lib/siteConfig";
import { useLoading } from "@/context/LoadingContext";
import { cn } from "@/lib/utils";
import { GLOW_NAV_ITEMS, navItemsForMenu, SECTION_SPY_ELEMENT_ID } from "@/lib/mobileNav";

export function MobileSiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoadComplete } = useLoading();
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

  const logoSizes = "h-10 w-auto sm:h-11";

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header
      className="mobile-top-header pointer-events-none fixed inset-x-0 top-0 z-[100] box-border flex items-center justify-between gap-3 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(0.35rem,env(safe-area-inset-top))] pb-1 lg:hidden"
      aria-label="Seitennavigation"
    >
      <a ref={contactLinkRef} href="#contact" tabIndex={-1} className="sr-only" aria-hidden>
        Kontakt
      </a>

      <div className="pointer-events-auto min-w-0 shrink px-1 py-0.5">
        <Link
          href="/"
          className="premium-header-logo inline-flex items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/60 focus-visible:ring-offset-transparent"
        >
          <Image
            src={SITE.brandLogoPath}
            alt={SITE.brandLogoAlt}
            width={400}
            height={400}
            priority
            unoptimized
            className={cn(logoSizes, "object-contain transition-opacity duration-200")}
          />
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
          className="inline-flex h-14 w-14 min-h-14 min-w-14 items-center justify-center rounded-xl bg-transparent text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
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
            className="mobile-header-menu-panel mobile-header-menu-panel--open absolute right-0 top-full z-[110] mt-1.5 min-w-[14.5rem] origin-top-right overflow-hidden rounded-2xl border border-black/[0.08] bg-white/95 py-2 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.2)] backdrop-blur-xl"
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
                    "block rounded-xl px-4 py-2.5 text-[15px] text-zinc-700 transition hover:bg-black/[0.04] focus-visible:bg-black/[0.04] focus-visible:outline-none",
                    isActive && "font-semibold text-[#5a7a00]",
                  )}
                >
                  {label}
                </a>
              );
            })}
            <div className="mt-2 border-t border-black/[0.06] px-3 pb-1 pt-3">
              <a
                href={APP_LOGIN_URL}
                className="inline-flex h-10 w-full items-center justify-center rounded-full border border-black/[0.08] bg-zinc-900 px-4 text-sm font-medium text-white transition hover:bg-zinc-800"
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
