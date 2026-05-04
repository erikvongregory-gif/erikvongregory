"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";

export type ConnectLink = {
  href: string;
  label: string;
  /** Kurzbeschreibung für Screenreader */
  description: string;
  icon: "linkedin" | "whatsapp" | "mail";
};

const DEFAULT_LINKS: ConnectLink[] = [
  {
    href: "https://www.linkedin.com/in/erik-freiherr-von-gregory-22852b329",
    label: "LinkedIn",
    description: "EvGlab auf LinkedIn — Updates und Kontakt",
    icon: "linkedin",
  },
  {
    href: "https://wa.me/4915565602176",
    label: "WhatsApp",
    description: "Direktnachricht über WhatsApp",
    icon: "whatsapp",
  },
  {
    href: "mailto:kontakt@evglab.com",
    label: "E-Mail",
    description: "E-Mail an kontakt@evglab.com",
    icon: "mail",
  },
];

function NetworkIcon({ icon, className }: { icon: ConnectLink["icon"]; className?: string }) {
  const c = cn("h-8 w-8", className);
  if (icon === "linkedin") return <FaLinkedin className={c} aria-hidden />;
  if (icon === "mail") return <Mail className={c} aria-hidden />;
  return <FaWhatsapp className={c} aria-hidden />;
}

export type ConnectWithUsProps = {
  className?: string;
  /** Wenn leer, werden die EvGlab-Standardlinks genutzt */
  links?: ConnectLink[];
  /** Überschrift (Deutsch) */
  title?: ReactNode;
  /** Untertitel */
  subtitle?: string;
  /**
   * `true`: kein Karten-Rahmen — nur Typo + Icons auf dem Seitenhintergrund.
   * `false` (Standard): bisherige Kachel mit Rand, Verlauf und Schatten.
   */
  plain?: boolean;
};

/**
 * Social-/Kontakt-Kacheln im EvGlab-Stil (ohne styled-jsx, nur Tailwind).
 * Für „Über uns“, Footer-Bereich oder Landing-Sektionen.
 */
export function ConnectWithUs({
  className,
  links = DEFAULT_LINKS,
  title = (
    <>
      Mit uns <span className="text-[#c65a20]">in Kontakt</span> treten
    </>
  ),
  subtitle = "Schreib uns auf LinkedIn oder WhatsApp — oder klassisch per E-Mail. Wir melden uns schnell und unkompliziert.",
  plain = false,
}: ConnectWithUsProps) {
  return (
    <section
      className={cn(
        "relative w-full",
        plain
          ? "px-0 py-0"
          : "isolate overflow-hidden rounded-3xl border border-zinc-200/90 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 px-6 py-10 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.35)] sm:px-10 sm:py-12",
        className,
      )}
      aria-labelledby="connect-with-us-heading"
    >
      {!plain && (
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#c65a20]/10 blur-3xl"
          aria-hidden
        />
      )}
      <div className={cn("mx-auto max-w-2xl text-center", !plain && "relative")}>
        <h2
          id="connect-with-us-heading"
          className="font-display text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl"
        >
          {title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">{subtitle}</p>
      </div>

      <div className={cn("mx-auto mt-10 flex max-w-xl flex-wrap justify-center gap-6 sm:gap-8", !plain && "relative")}>
        {links.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target={item.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            className={cn(
              "group flex w-[7.5rem] flex-col items-center gap-3 text-center no-underline outline-none transition duration-300",
              "rounded-2xl focus-visible:ring-2 focus-visible:ring-[#c65a20]/50 focus-visible:ring-offset-2",
              plain ? "focus-visible:ring-offset-white" : "focus-visible:ring-offset-zinc-50",
            )}
            aria-label={item.description}
          >
            <span
              className={cn(
                "inline-flex min-h-[3rem] min-w-[3rem] items-center justify-center text-zinc-800 transition duration-300",
                "group-hover:-translate-y-0.5 group-hover:scale-105",
                item.icon === "linkedin" && "group-hover:text-[#0a66c2]",
                item.icon === "whatsapp" && "group-hover:text-[#25D366]",
                item.icon === "mail" && "group-hover:text-[#c65a20]",
              )}
            >
              <NetworkIcon icon={item.icon} />
            </span>
            <span className="text-sm font-medium text-zinc-700 transition group-hover:text-zinc-900">{item.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
