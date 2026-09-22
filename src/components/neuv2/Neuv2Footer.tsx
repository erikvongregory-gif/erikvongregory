import Link from "next/link";
import { SITE } from "@/lib/siteConfig";

export function Neuv2Footer() {
  return (
    <footer className="w-full bg-[var(--background)] px-4 py-12">
      <div className="nv-container">
        <div className="grid grid-cols-2 gap-8 border-b border-[color-mix(in_oklch,var(--border)_10%,transparent)] pb-10 md:grid-cols-4">
          <div className="col-span-2 flex items-center gap-2 md:col-span-1">
            <img src={SITE.brandLogoPath} alt="" width={24} height={24} />
            <span className="text-xl font-bold">{SITE.name}</span>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="pt-1 font-semibold">Produkt</h3>
            <a href="#features" className="text-sm text-[var(--muted-foreground)]">
              Funktionen
            </a>
            <a href="#pricing" className="text-sm text-[var(--muted-foreground)]">
              Preise
            </a>
            <Link href={SITE.appBaseUrl} className="text-sm text-[var(--muted-foreground)]">
              Dashboard
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="pt-1 font-semibold">Vergleich</h3>
            <Link href="/" className="text-sm text-[var(--muted-foreground)]">
              Live (/)
            </Link>
            <Link href="/alt" className="text-sm text-[var(--muted-foreground)]">
              Archiv (/alt)
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="pt-1 font-semibold">Legal</h3>
            <Link href="/impressum" className="text-sm text-[var(--muted-foreground)]">
              Impressum
            </Link>
            <Link href="/datenschutz" className="text-sm text-[var(--muted-foreground)]">
              Datenschutz
            </Link>
            <Link href="/agb" className="text-sm text-[var(--muted-foreground)]">
              AGB
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-6 text-xs text-[var(--muted-foreground)] sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {SITE.name} · Preview nach{" "}
            <a
              href="https://github.com/launch-ui/launch-ui"
              className="underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              Launch UI
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
