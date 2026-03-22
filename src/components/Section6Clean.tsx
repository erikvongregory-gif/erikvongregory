import { AppleStyleButton } from "./AppleStyleButton";

const EXPERTISE_ITEMS = [
  "wie Bier verkauft wird",
  "wie Brauereien Marketing betreiben",
  "wie man Bier digital inszeniert",
];

export function Section6Clean() {
  return (
    <section className="relative z-[70] w-full px-4 py-16">
      <div className="section2-card mx-auto max-w-2xl rounded-2xl px-6 py-8 text-center sm:px-8 sm:py-10">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-50/80 px-4 py-1.5 text-sm font-medium text-orange-600">
          <span aria-hidden>✦</span>
          Aus der Praxis
        </div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-900 drop-shadow-sm sm:text-3xl md:text-4xl">
          Von der Brauerei –{" "}
          <span className="font-light italic font-austera-green-fade">
            für die Brauerei
          </span>
        </h2>
        <p className="mb-8 text-base leading-relaxed text-neutral-800 sm:text-lg">
          Ich arbeite selbst in einer Brauerei und kenne die Branche aus erster Hand.
        </p>
        <div className="mb-8 space-y-4">
          {EXPERTISE_ITEMS.map((text) => (
            <div
              key={text}
              className="section6-expertise-item flex items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white/90 px-4 py-3 text-center"
            >
              <span className="text-base font-medium text-neutral-800 sm:text-lg">{text}</span>
            </div>
          ))}
        </div>
        <p className="mb-6 text-center text-base font-medium leading-relaxed text-neutral-800 sm:text-lg">
          Brauereiwissen + moderne KI = Marketing, das funktioniert.
        </p>
        <div className="flex justify-center">
          <AppleStyleButton href="#contact" className="cta-orange">Kostenloses Erstgespraech starten</AppleStyleButton>
        </div>
      </div>
    </section>
  );
}
