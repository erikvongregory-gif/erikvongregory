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

/**
 * Nach LCP (sonst konkurriert Hero-Video mit dem Poster), dann idle.
 * Fallback, falls PerformanceObserver keine LCP-Entries liefert.
 */
export function scheduleAfterLcp(callback: () => void, fallbackMs = 2200): () => void {
  let cancelled = false;
  let done = false;
  let idleId: number | null = null;
  let fallbackId: ReturnType<typeof setTimeout> | null = null;
  let po: PerformanceObserver | null = null;

  const finish = () => {
    if (cancelled || done) return;
    done = true;
    po?.disconnect();
    if (idleId != null) window.cancelIdleCallback?.(idleId);
    if (fallbackId != null) clearTimeout(fallbackId);
    callback();
  };

  const afterIdle = () => {
    if (cancelled || done) return;
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(finish, { timeout: 800 });
    } else {
      finish();
    }
  };

  try {
    po = new PerformanceObserver((list) => {
      if (list.getEntries().length > 0) afterIdle();
    });
    po.observe({ type: "largest-contentful-paint", buffered: true });
  } catch {
    afterIdle();
  }

  fallbackId = setTimeout(afterIdle, fallbackMs);

  return () => {
    cancelled = true;
    po?.disconnect();
    if (idleId != null) window.cancelIdleCallback?.(idleId);
    if (fallbackId != null) clearTimeout(fallbackId);
  };
}
