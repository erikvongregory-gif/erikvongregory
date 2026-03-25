/** Desktop: keine Transition für die statischen Blobs */
const DESKTOP_BLOB_TRANSITION = "none";

/** Gleicher Verlauf wie `body` auf Mobile (`--home-bg-gradient-blue`); #section-7 bleibt durchsichtig für einen nahtlosen Übergang */
const MOBILE_HOME_GRADIENT =
  "linear-gradient(165deg, #0a0f14 0%, #0f172a 35%, #0c1222 70%, #05100d 100%)";

/**
 * Hintergrund: Mobile nur flacher blaugrauer Verlauf (wie Abschnitt „Echte Beispiele“),
 * Desktop hell #cbcbcb mit Pfirsich-Blobs und leichten Overlays.
 */
export function LiquidBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 md:hidden" style={{ background: MOBILE_HOME_GRADIENT }} />
      <div className="absolute inset-0 hidden bg-[#cbcbcb] md:block" />
      <div
        className="liquid-scroll-layer absolute inset-0 hidden scale-150 md:block"
        style={{ transformOrigin: "center center" }}
      >
        <div
          className="liquid-blob liquid-blob-1 absolute h-[70vh] w-[70vh] -left-[15%] top-[10%]"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 220, 190, 0.15) 0%, rgba(255, 235, 205, 0.08) 40%, transparent 100%)",
            transform: "translate3d(0,0,0)",
            transition: DESKTOP_BLOB_TRANSITION,
          }}
        />
        <div
          className="liquid-blob liquid-blob-2 absolute h-[60vh] w-[60vh] -right-[10%] bottom-[5%]"
          style={{
            background:
              "linear-gradient(225deg, rgba(255, 220, 190, 0.1) 0%, rgba(255, 235, 205, 0.06) 50%, transparent 100%)",
            transform: "translate3d(0,0,0)",
            transition: DESKTOP_BLOB_TRANSITION,
          }}
        />
        <div
          className="liquid-blob liquid-blob-3 absolute h-[50vh] w-[50vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 235, 205, 0.06) 0%, transparent 50%)",
            transform: "translate3d(-50%, -50%, 0)",
            transition: DESKTOP_BLOB_TRANSITION,
          }}
        />
      </div>
      {/* Vignette & Pfirsich nur Desktop – auf Mobile Extra-Overlays wie #section-7 vermeiden */}
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 40%, rgba(0,0,0,0.03) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            "radial-gradient(ellipse 180% 220% at 85% 30%, rgba(255, 200, 160, 0.25) 0%, rgba(255, 220, 190, 0.08) 6%, rgba(255, 235, 205, 0.02) 14%, transparent 22%)",
        }}
      />
    </div>
  );
}
