"use client";

import Link from "next/link";
import { APP_LOGIN_URL } from "@/lib/appLoginUrl";
import { SITE } from "@/lib/siteConfig";
import { useFreeTrialDemo } from "@/context/FreeTrialDemoContext";
import { useAboutNavTheme } from "@/components/ueber-uns/useAboutNavTheme";
import { WaveMark } from "@/components/desktop/WaveMark";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Start", href: "/" },
  { label: "Über uns", href: "/ueber-uns", current: true },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "Kontakt", href: "#about-closing" },
] as const;

export function AboutDesktopNav() {
  const isDark = useAboutNavTheme();
  const { open: openFreeTrialDemo } = useFreeTrialDemo();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100] hidden border-b backdrop-blur transition-[background-color,border-color] duration-[250ms] ease-out lg:block",
        isDark
          ? "border-[rgba(244,239,230,0.08)] bg-[#15110C]/85"
          : "border-ink/10 bg-paper/85",
      )}
      aria-label="Hauptnavigation"
    >
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between gap-6 px-12">
        <Link
          href="/"
          className={cn(
            "inline-flex items-center gap-2.5 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber",
            isDark ? "text-paper" : "text-ink",
          )}
        >
          <WaveMark />
          <span className="font-serif-hero text-[22px] font-medium tracking-[-0.4px]">{SITE.name}</span>
        </Link>
        <nav className="flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3.5 py-2 font-sans-tight text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber",
                "current" in item && item.current
                  ? isDark
                    ? "bg-[rgba(244,239,230,0.08)] text-paper"
                    : "bg-ink/5 text-ink"
                  : isDark
                    ? "text-[#A89B83] hover:bg-[rgba(244,239,230,0.06)] hover:text-paper"
                    : "text-ink3 hover:bg-ink/5 hover:text-ink",
              )}
              aria-current={"current" in item && item.current ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a
            href={APP_LOGIN_URL}
            className={cn(
              "font-sans-tight text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber",
              isDark ? "text-[#A89B83] hover:text-paper" : "text-ink3 hover:text-ink",
            )}
          >
            Login
          </a>
          <button
            type="button"
            onClick={() => openFreeTrialDemo()}
            className="inline-flex items-center gap-2 rounded-[10px] bg-amber px-4 py-2.5 font-sans-tight text-[13.5px] font-semibold text-[#15110C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber"
          >
            3 Bilder kostenlos →
          </button>
        </div>
      </div>
    </header>
  );
}
