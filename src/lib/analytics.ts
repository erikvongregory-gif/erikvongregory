export function trackEvent(event: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("evglab-analytics-event", { detail: { event, ...payload } }));
  const w = window as typeof window & { dataLayer?: Array<Record<string, unknown>> };
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event, ...payload });
  }
}
