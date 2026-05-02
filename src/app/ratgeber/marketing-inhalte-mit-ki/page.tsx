import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Marketing-Inhalte mit KI planen: Anleitung für Brauereien | EvGlab",
  description:
    "Schritt für Schritt: Wie Brauereien in DACH mit KI Werbebilder, Social-Posts und Bewertungs-Workflows planen — Briefing, Markenprofil, Freigabe und Veröffentlichung.",
  alternates: { canonical: `${SITE.baseUrl}/ratgeber/marketing-inhalte-mit-ki` },
  openGraph: {
    title: "Marketing-Inhalte mit KI planen | EvGlab",
    description:
      "How-to für Brauereien: KI-Inhalte von der Idee bis zum Post — strukturiert und praxisnah.",
    url: `${SITE.baseUrl}/ratgeber/marketing-inhalte-mit-ki`,
    locale: "de_DE",
    type: "article",
  },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Marketing-Inhalte mit KI für eine Brauerei planen und umsetzen",
  description:
    "Ablauf für Brauereien in Deutschland, Österreich und der Schweiz: Ziele festlegen, Markenprofil hinterlegen, KI-Inhalte erzeugen, prüfen und veröffentlichen.",
  totalTime: "P3D",
  supply: [{ "@type": "HowToSupply", name: "Logo, Markenfarben, Tonalität, Beispielbilder" }],
  tool: [{ "@type": "HowToTool", name: "EvGlab Dashboard oder Premium-Lieferung" }],
  step: [
    {
      "@type": "HowToStep",
      name: "Ziele und Kanäle festlegen",
      text: "Definiere, ob du vor allem Instagram, Facebook, die Website oder saisonale Kampagnen bedienst. Lege fest, ob du fertig beliefert werden willst (Paket) oder im Dashboard selbst generierst.",
    },
    {
      "@type": "HowToStep",
      name: "Markenprofil und Briefing bündeln",
      text: "Sammle Logo, erlaubte Farben, Tonality (du/ Sie), typische Bierstile und No-Gos. Je präziser das Briefing, desto konsistenter sind KI-Bilder und Texte.",
    },
    {
      "@type": "HowToStep",
      name: "KI-Inhalte erzeugen und kuratieren",
      text: "Erzeuge Motive und Texte in mehreren Varianten. Wähle die Varianten, die zu deiner Marke passen, und passe Details (Zutaten, Location, Saison) manuell nach.",
    },
    {
      "@type": "HowToStep",
      name: "Freigabe und Veröffentlichung",
      text: "Nutze ein einfaches Freigabe-Ritual (Marketing + Geschäftsführung). Plane Veröffentlichung und optional Ads — gleiche Botschaft über alle Touchpoints.",
    },
    {
      "@type": "HowToStep",
      name: "Bewertungen und Nachsteuern",
      text: "Achte auf Google-Bewertungen: schnelle, markenkonforme Antworten reduzieren Reibung. Werte aus, welche Motive Anfragen oder Reichweite bringen, und iteriere.",
    },
  ],
};

export default function RatgeberMarketingKiPage() {
  return (
    <article className="min-h-screen bg-white text-zinc-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <nav className="mb-8 text-sm text-zinc-600">
          <Link href="/" className="text-[#b45309] hover:underline">
            Start
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span className="text-zinc-800">Ratgeber</span>
        </nav>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Marketing-Inhalte mit KI: So gehst du als Brauerei vor</h1>
        <p className="mt-4 text-lg text-zinc-600">
          Praxisnaher Ablauf für <strong>Brauereien und Getränkemarken in DACH</strong> — unabhängig davon, ob du EvGlab
          im Paket oder im Dashboard nutzt.
        </p>

        <div className="prose prose-zinc mt-10 max-w-none prose-p:text-zinc-700 prose-p:leading-relaxed prose-headings:scroll-mt-24">
          <h2>1. Ziele und Kanäle schärfen</h2>
          <p>
            Bevor du Prompts schreibst, solltest du wissen, welches Problem KI lösen soll: fehlende Produktfotos,
            unregelmäßige Social-Posts oder hoher Aufwand bei Bewertungen. In Deutschland und Österreich entscheidet
            sich die Tonalität oft nach Gastro- und Endkundenkultur — skizziere drei wiederkehrende Themen (Saisonbier,
            Brauereibesuch, Festbier), damit Inhalte nicht beliebig wirken.
          </p>
          <h2>2. Markenprofil statt Einzel-Prompt</h2>
          <p>
            KI wirkt dann „markentreu“, wenn Farben, Logo-Einsatz, Sprache und verbotene Motive festliegen. Ein
            zentrales Markenprofil spart Zeit, weil du nicht bei jedem Bild neu erklären musst, wie deine Brauerei
            klingt und aussieht.
          </p>
          <h2>3. Varianten erzeugen und auswählen</h2>
          <p>
            Generiere mehrere Varianten für Bild und Text. Die erste Variante ist selten die beste — vergleiche
            Komposition, Lesbarkeit auf dem Smartphone und ob Text und Bild dieselbe Story erzählen. Für die Schweiz
            kannst du z. B. mehrsprachige Varianten planen, falls du parallel DE/FR brauchst.
          </p>
          <h2>4. Freigabe und Veröffentlichung</h2>
          <p>
            Ein kurzes Freigabe-Template (Checkliste: Marken-OK, rechtliche Hinweise, Alkoholwerbung) reduziert
            Rückfragen. Nach der Veröffentlichung: einmalig Performance checken (Reichweite, Saves, Klicks) und
            daraus die nächste Batch planen.
          </p>
          <h2>5. Premium vs. Selbstbedienung</h2>
          <p>
            Wenn du unsicher bist, ob du lieber liefern lässt oder intern produzierst, hilft der{" "}
            <Link href="/vergleich/premium-vs-dashboard-abo-brauerei" className="text-[#b45309] hover:underline">
              Vergleich Premium vs. Dashboard-Abo
            </Link>
            . Zurück zur{" "}
            <Link href="/" className="text-[#b45309] hover:underline">
              EvGlab-Startseite
            </Link>
            .
          </p>
        </div>
      </div>
    </article>
  );
}
