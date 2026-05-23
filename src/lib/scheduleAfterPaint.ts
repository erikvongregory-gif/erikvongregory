/** Zwei rAFs — Animationen/Transitions starten zuverlässig nach erstem Paint (Hydration). */
export function scheduleAfterPaint(callback: () => void): () => void {
  let raf2 = 0;
  const raf1 = requestAnimationFrame(() => {
    raf2 = requestAnimationFrame(callback);
  });
  return () => {
    cancelAnimationFrame(raf1);
    cancelAnimationFrame(raf2);
  };
}
