import Image from "next/image";
import Link from "next/link";
import { LOESUNG_CTA_HREF, type Loesung, LOESUNGEN } from "@/content/loesungen";

export function LoesungArticle({ loesung }: { loesung: Loesung }) {
  return (
    <main id="main" className="relative z-20 px-5 pb-20 pt-24 sm:px-6">
      <article className="mx-auto max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[1.4px] text-muted-foreground">
          {loesung.eyebrow}
        </p>
        <h1 className="mt-4 text-[2.15rem] font-medium leading-[1.08] tracking-tight text-foreground sm:text-[2.75rem]">
          {loesung.title}
        </h1>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-foreground/80 sm:text-[17px]">
          {loesung.summary}
        </p>

        <div className="relative mt-10 overflow-hidden rounded-2xl border border-border bg-card">
          <Image
            src={loesung.motif}
            alt={loesung.motifAlt}
            width={1200}
            height={900}
            className="h-auto w-full object-cover"
            priority
          />
        </div>

        <div className="mt-10 space-y-5 text-[15px] leading-relaxed text-foreground/80">
          {loesung.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <ul className="mt-8 space-y-2.5">
          {loesung.bullets.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-border bg-card/70 px-4 py-3.5 text-[15px] text-foreground/85"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={LOESUNG_CTA_HREF}
            className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Dashboard öffnen
          </a>
          <Link
            href="/loesungen"
            className="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Alle Lösungen
          </Link>
        </div>
      </article>
    </main>
  );
}

export function LoesungenIndex() {
  return (
    <main id="main" className="relative z-20 px-5 pb-20 pt-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-[11px] uppercase tracking-[1.4px] text-muted-foreground">
          Lösungen
        </p>
        <h1 className="mt-4 max-w-3xl text-[2.15rem] font-medium leading-[1.08] tracking-tight text-foreground sm:text-[2.75rem]">
          Saison, Event, Handel — aus demselben Markenprofil.
        </h1>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-foreground/80 sm:text-[17px]">
          Drei Szenarien, die Brauereien ständig brauchen. Motive folgen dem
          Markenlook, nicht einer Vorlage.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {LOESUNGEN.map((page) => (
            <Link
              key={page.slug}
              href={page.href}
              className="group overflow-hidden rounded-2xl border border-border bg-card/70 transition-colors hover:border-foreground/25 hover:bg-card"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={page.motif}
                  alt={page.motifAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-[1.3px] text-muted-foreground">
                  {page.eyebrow}
                </p>
                <h2 className="mt-2 text-lg font-medium tracking-tight text-foreground">
                  {page.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {page.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
