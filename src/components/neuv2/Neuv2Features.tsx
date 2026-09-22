import {
  Images,
  MessageSquare,
  LayoutDashboard,
  Palette,
  Zap,
  Shield,
  CalendarDays,
  Sparkles,
} from "lucide-react";

const ITEMS = [
  {
    title: "KI-Bilder",
    description: "Produktfotos und Kampagnenmotive ohne Studio — in Minuten.",
    icon: Images,
  },
  {
    title: "Social Posts",
    description: "Texte und Visuals für Instagram & Co., planbar und markenstark.",
    icon: MessageSquare,
  },
  {
    title: "Bewertungen",
    description: "Google-Antworten im Ton deiner Brauerei — schnell und konsistent.",
    icon: Sparkles,
  },
  {
    title: "Markenprofil",
    description: "Website einlesen — Farben und Tonalität fließen in jedes Motiv.",
    icon: Palette,
  },
  {
    title: "Dashboard",
    description: "Medien, Workflow und Tokens an einem Ort — ohne Tool-Chaos.",
    icon: LayoutDashboard,
  },
  {
    title: "Kampagnen",
    description: "Saison, Events, Händleraktionen — Serien, die zusammengehören.",
    icon: CalendarDays,
  },
  {
    title: "Schnell live",
    description: "Erste Motive oft in unter einer Minute — bereit für den Feed.",
    icon: Zap,
  },
  {
    title: "DE & DSGVO",
    description: "Hosting und Prozesse mit Fokus auf den DACH-Markt.",
    icon: Shield,
  },
] as const;

export function Neuv2Features() {
  return (
    <section id="features" className="nv-section">
      <div className="nv-container flex flex-col items-center gap-6 sm:gap-20">
        <h2 className="max-w-[560px] text-center text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
          Alles, was deine Brauerei braucht. Nichts, was stört.
        </h2>
        <div className="grid w-full auto-rows-fr grid-cols-2 gap-0 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <div key={item.title} className="flex flex-col gap-4 p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold tracking-tight sm:text-base">
                <item.icon className="size-5 stroke-1 text-[var(--foreground)]" />
                {item.title}
              </h3>
              <p className="max-w-[240px] text-sm text-balance text-[var(--muted-foreground)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
