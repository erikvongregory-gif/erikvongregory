"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MobileSiteHeader } from "@/components/MobileSiteHeader";
import { WaveMark } from "@/components/desktop/WaveMark";
import { useSiteNavTheme } from "@/components/useSiteNavTheme";
import { SITE_NAV_LINKS } from "@/content/site-nav";
import { APP_LOGIN_URL, navigateToAppDashboard } from "@/lib/appLoginUrl";
import { scrollToSection } from "@/lib/scrollToSection";
import { cn } from "@/lib/utils";

const HOME_HASH_LINKS: string[] = SITE_NAV_LINKS.filter((l) => l.href.startsWith("#") && l.href !== "#contact").map(
  (l) => l.href,
);

function linkIsActive(pathname: string, href: string): boolean {
  if (href === "/ueber-uns") return pathname === "/ueber-uns";
  if (href === "/ratgeber") return pathname === "/ratgeber" || pathname.startsWith("/ratgeber/");
  if (href.startsWith("/") && !href.startsWith("/#") && href.length > 1) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  return false;
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const isDark = useSiteNavTheme();

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  const handleNavClick = (href: string) => {
    if (href.startsWith("/ueber-uns")) {
      const target = href.includes("#") ? href : "/ueber-uns#ueber-intro";
      if (pathname === "/ueber-uns") {
        document.getElementById("ueber-intro")?.scrollIntoView({ behavior: "smooth", block: "start" });
        try {
          window.history.replaceState(null, "", target);
        } catch {
          /* noop */
        }
      } else {
        router.push(target);
      }
      return;
    }

    if (href.startsWith("/") && href.length > 1 && !href.startsWith("/#")) {
      router.push(href);
      return;
    }

    if (href === "#contact") {
      if (pathname === "/") {
        scrollToSection("#contact");
      } else {
        router.push("/#contact");
        window.setTimeout(() => scrollToSection("#contact"), 120);
      }
      return;
    }

    if (pathname !== "/" && HOME_HASH_LINKS.includes(href)) {
      void router.push(`/${href}`);
      window.setTimeout(() => scrollToSection(href), 80);
      return;
    }

    scrollToSection(href);
  };

  const navLinkClass = (href: string, active?: boolean) =>
    cn(
      "rounded-lg px-3.5 py-2 font-sans-tight text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber",
      active
        ? isDark
          ? "bg-[rgba(244,239,230,0.08)] text-paper"
          : "bg-ink/5 text-ink"
        : isDark
          ? "text-[#A89B83] hover:bg-[rgba(244,239,230,0.06)] hover:text-paper"
          : "text-ink3 hover:bg-ink/5 hover:text-ink",
    );

  return (
    <>
      <MobileSiteHeader />

      <header
        className={cn(
          "site-header fixed inset-x-0 top-0 z-[100] hidden border-b backdrop-blur transition-[background-color,border-color] duration-[250ms] ease-out lg:block",
          isDark ? "border-[rgba(244,239,230,0.08)] bg-[#15110C]/90" : "border-ink/10 bg-paper/90",
        )}
        aria-label="Hauptnavigation"
      >
        <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-12">
          <Link
            href="/"
            className={cn(
              "inline-flex shrink-0 items-center gap-2.5 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber",
              isDark ? "text-paper" : "text-ink",
            )}
          >
            <WaveMark className={cn("h-6 w-6 shrink-0", isDark ? "text-amber2" : "text-amber")} />
            <span className="font-serif-hero text-[20px] font-medium tracking-[-0.4px] sm:text-[22px]">EvGlab</span>
          </Link>

          <nav className="flex items-center" aria-label="Seitenbereiche">
            {SITE_NAV_LINKS.map((link) => {
              const active = linkIsActive(pathname ?? "", link.href);
              if (link.href.startsWith("#")) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={navLinkClass(link.href, active)}
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <Link key={link.href} href={link.href} className={navLinkClass(link.href, active)} aria-current={active ? "page" : undefined}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={APP_LOGIN_URL}
              className={cn(
                "font-sans-tight text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber",
                isDark ? "text-[#A89B83] hover:text-paper" : "text-ink3 hover:text-ink",
              )}
            >
              Login
            </a>
            <button
              type="button"
              onClick={() => navigateToAppDashboard()}
              className="inline-flex items-center rounded-[10px] bg-amber px-4 py-2.5 font-sans-tight text-[13.5px] font-semibold text-[#15110C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber"
            >
              3 Bilder kostenlos
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
