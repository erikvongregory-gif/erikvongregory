/**
 * Reiner DOM/CSS-Hintergrund statt WebGL – vermeidet falsche Compositing-Reihenfolge
 * unter Windows/Chromium (WebGL/ANGLE), wenn der Canvas über preserve-3d-Karten rutscht.
 */
export function Section4LoopCssBackdrop() {
  return (
    <div
      className="section4-css-loop-backdrop pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
      aria-hidden
    >
      <div className="section4-css-loop-ring section4-css-loop-ring--l" />
      <div className="section4-css-loop-ring section4-css-loop-ring--r" />
    </div>
  );
}
