import {
  HelpCircle,
  Home,
  Info,
  Layers,
  Mail,
  MessageCircle,
  Package,
  Route,
  Sparkles,
} from "lucide-react";
import type { GlowMenuItem } from "@/components/ui/glow-menu";

export type HomeNavItem = GlowMenuItem & { mobileOnly?: boolean };

export const GLOW_NAV_ITEMS: HomeNavItem[] = [
  {
    icon: Home,
    label: "Start",
    href: "#start",
    gradient:
      "radial-gradient(circle, rgba(20,83,45,0.16) 0%, rgba(34,197,94,0.07) 50%, rgba(34,197,94,0) 100%)",
    iconColor: "text-emerald-700",
    iconHoverClass: "group-hover:text-emerald-700",
  },
  {
    icon: HelpCircle,
    label: "Warum",
    href: "#warum",
    gradient:
      "radial-gradient(circle, rgba(198,90,32,0.2) 0%, rgba(212,104,48,0.09) 50%, rgba(198,90,32,0) 100%)",
    iconColor: "text-[#c65a20]",
    iconHoverClass: "group-hover:text-[#c65a20]",
  },
  {
    icon: Route,
    label: "Ablauf",
    href: "#prozess",
    mobileOnly: true,
    gradient:
      "radial-gradient(circle, rgba(20,120,100,0.18) 0%, rgba(16,100,80,0.08) 50%, rgba(16,100,80,0) 100%)",
    iconColor: "text-teal-700",
    iconHoverClass: "group-hover:text-teal-700",
  },
  {
    icon: Layers,
    label: "Leistungen",
    href: "#loesungen",
    gradient:
      "radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(37,99,235,0.07) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-600",
    iconHoverClass: "group-hover:text-blue-600",
  },
  {
    icon: Package,
    label: "Preise",
    href: "#pakete",
    gradient:
      "radial-gradient(circle, rgba(224,122,64,0.24) 0%, rgba(198,90,32,0.14) 50%, rgba(184,77,21,0) 100%)",
    iconColor: "text-[#c65a20]",
    iconHoverClass: "group-hover:text-[#c65a20]",
  },
  {
    icon: MessageCircle,
    label: "Fragen",
    href: "#fragen",
    gradient:
      "radial-gradient(circle, rgba(99,102,241,0.16) 0%, rgba(79,70,229,0.07) 50%, rgba(79,70,229,0) 100%)",
    iconColor: "text-indigo-600",
    iconHoverClass: "group-hover:text-indigo-600",
  },
  {
    icon: Sparkles,
    label: "Praxis",
    href: "#beispiele",
    gradient:
      "radial-gradient(circle, rgba(168,85,247,0.18) 0%, rgba(147,51,234,0.07) 50%, rgba(126,34,206,0) 100%)",
    iconColor: "text-violet-600",
    iconHoverClass: "group-hover:text-violet-600",
  },
  {
    icon: Info,
    label: "Über uns",
    href: "/ueber-uns#ueber-intro",
    gradient:
      "radial-gradient(circle, rgba(82,82,91,0.2) 0%, rgba(113,113,122,0.09) 50%, rgba(63,63,70,0) 100%)",
    iconColor: "text-zinc-600",
    iconHoverClass: "group-hover:text-zinc-800",
  },
  {
    icon: Mail,
    label: "Kontakt",
    href: "#contact",
    gradient:
      "radial-gradient(circle, rgba(239,68,68,0.16) 0%, rgba(220,38,38,0.07) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "text-red-600",
    iconHoverClass: "group-hover:text-red-600",
  },
];

/** Nav-Anchor (ohne #) → DOM-ID für Mobile-Scroll-Spy. */
export const SECTION_SPY_ELEMENT_ID: Record<string, string> = {
  start: "start",
  warum: "section-2",
  prozess: "section-3",
  loesungen: "section-4",
  pakete: "pakete-preise",
  fragen: "section-fragen",
  beispiele: "section-7",
  contact: "contact",
};

export const SECTION_SPY_DESKTOP_OVERRIDE: Partial<Record<string, string>> = {
  prozess: "desktop-prozess",
  start: "desktop-hero",
};

export function navItemsForMenu(mobile: boolean): GlowMenuItem[] {
  return GLOW_NAV_ITEMS.filter((item) => !item.mobileOnly || mobile);
}
