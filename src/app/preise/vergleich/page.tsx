import Link from "next/link";
import { MOBILE_PRICING_TRACKS, tierDisplayName } from "@/lib/mobilePricingTiers";

export const metadata = {
  title: "Alle 6 Pakete im Vergleich | EvGlab",
  description: "Manufaktur und Werkstatt: Brauerei Start, Wachstum und Premium im Überblick.",
};

export default function PreiseVergleichPage() {
  return (
    <main className="min-h-[100dvh] bg-paper px-5 pb-14 pt-[calc(68px+2.5rem)] font-sans-tight text-ink">
      <p className="m-0 font-mono-hero text-[11px] tracking-[1.4px] text-amber uppercase">Preise</p>
      <h1 className="mt-3 font-serif-hero text-3xl font-normal tracking-[-1px]">Alle 6 Pakete im Vergleich</h1>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink2">
        Manufaktur (einmalig) und Werkstatt (Abo) — dieselben Tier-Namen, unterschiedliche Aufwandsverteilung.
      </p>

      {(["manufaktur", "werkstatt"] as const).map((track) => (
        <section key={track} className="mt-10">
          <h2 className="font-serif-hero text-xl font-medium capitalize">{track}</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-ink/15">
                  <th className="py-2 pr-3 font-mono-hero text-[10px] tracking-wide text-ink3 uppercase">Paket</th>
                  <th className="py-2 pr-3 font-mono-hero text-[10px] tracking-wide text-ink3 uppercase">Preis</th>
                  <th className="py-2 font-mono-hero text-[10px] tracking-wide text-ink3 uppercase">Highlights</th>
                </tr>
              </thead>
              <tbody>
                {MOBILE_PRICING_TRACKS[track].map((tier) => (
                  <tr key={tier.tier} className="border-b border-dashed border-ink/10">
                    <td className="py-3 pr-3 font-medium">{tierDisplayName(tier.tier)}</td>
                    <td className="py-3 pr-3 whitespace-nowrap">
                      {tier.price}
                      {"\u00A0"}€
                      <span className="mt-0.5 block font-mono-hero text-[10px] text-ink3 uppercase">{tier.cadence}</span>
                    </td>
                    <td className="py-3 text-ink2">{tier.features.slice(0, 3).join(" · ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <p className="mt-10 text-center">
        <Link href="/#pakete-preise" className="font-semibold text-ink underline-offset-2 hover:underline">
          Zurück zur Startseite
        </Link>
      </p>
    </main>
  );
}
