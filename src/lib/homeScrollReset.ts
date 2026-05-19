/** Scroll auf Startseite oben halten — vor Paint (useLayoutEffect), ohne <script> im Layout. */
export function applyHomeScrollReset(): () => void {
  try {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const shouldReset = window.location.pathname === "/" && !window.location.hash;

    function forceTop() {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    let releaseStyle: (() => void) | undefined;

    if (shouldReset) {
      const style = document.createElement("style");
      style.setAttribute("data-scroll-reset-style", "1");
      style.textContent = "html{scroll-behavior:auto !important;}";
      document.head.appendChild(style);

      let released = false;
      releaseStyle = () => {
        if (released) return;
        released = true;
        style.parentNode?.removeChild(style);
      };

      forceTop();

      let frames = 0;
      const tick = () => {
        forceTop();
        frames += 1;
        if (frames < 28) {
          requestAnimationFrame(tick);
        } else {
          releaseStyle?.();
        }
      };
      requestAnimationFrame(tick);
      window.setTimeout(() => releaseStyle?.(), 1400);
    }

    const onPageShow = () => {
      if (window.location.pathname === "/" && !window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    };

    window.addEventListener("pageshow", onPageShow, { passive: true });

    return () => {
      window.removeEventListener("pageshow", onPageShow);
      releaseStyle?.();
    };
  } catch {
    return () => {};
  }
}
