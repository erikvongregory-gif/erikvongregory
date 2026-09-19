import Link from "next/link";
import { SITE } from "@/lib/siteConfig";

type NeuLegalPageProps = {
  title: string;
  children: React.ReactNode;
  related: { href: string; label: string }[];
};

/**
 * Legal-Artikel im Neu-Look (Theme-Tokens).
 */
export function NeuLegalPage({ title, children, related }: NeuLegalPageProps) {
  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-10 md:px-8 md:pt-14">
      <Link
        href="/"
        className="neu-muted mb-10 inline-flex items-center gap-2 text-sm transition-colors hover:text-[color:var(--neu-fg)]"
      >
        <span aria-hidden>←</span> Zurück zur Startseite
      </Link>

      <h1
        className="neu-fg mb-12 text-4xl leading-tight tracking-[-1px] sm:text-5xl"
        style={{ fontFamily: "var(--font-velorah-serif), ui-serif, Georgia, serif" }}
      >
        {title}
      </h1>

      <div className="neu-legal-content neu-muted space-y-10 text-base leading-relaxed sm:text-[15px]">
        {children}
      </div>

      <nav className="neu-muted mt-14 flex flex-wrap gap-6 border-t border-[color:var(--neu-border)] pt-8 text-sm">
        {related.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="transition-colors hover:text-[color:var(--neu-fg)]"
          >
            {item.label}
          </Link>
        ))}
        <Link href="/" className="transition-colors hover:text-[color:var(--neu-fg)]">
          {SITE.name}
        </Link>
      </nav>
    </article>
  );
}

export const neuLegalLink =
  "neu-fg underline decoration-[color:var(--neu-border-strong)] underline-offset-2 transition-opacity hover:opacity-80";

export const neuLegalH2 = "neu-fg mb-3 text-lg font-medium";
export const neuLegalH3 = "neu-fg mb-2 mt-5 text-base font-medium opacity-90";
