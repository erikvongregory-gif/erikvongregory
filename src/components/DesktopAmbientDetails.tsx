/**
 * Sehr dezente Hintergrund-Details nur für Desktop (md+).
 * Wird nur im DesktopLayout montiert – Mobile bleibt unberührt.
 */
export function DesktopAmbientDetails() {
  return (
    <div
      className="desktop-ambient pointer-events-none fixed inset-0 z-0 hidden overflow-hidden md:block"
      aria-hidden
    >
      <div className="desktop-ambient-dots absolute inset-0" />
      <div className="desktop-ambient-sheen absolute left-1/2 top-[-20%] h-[140%] w-[120%] -translate-x-1/2" />
      <div className="desktop-ambient-orb desktop-ambient-orb--tr" />
      <div className="desktop-ambient-orb desktop-ambient-orb--bl" />
      <div className="desktop-ambient-hairline desktop-ambient-hairline--tl" />
      <div className="desktop-ambient-hairline desktop-ambient-hairline--br" />
    </div>
  );
}
