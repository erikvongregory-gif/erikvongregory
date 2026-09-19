const NEU_HERO_CSS = `
html {
  scroll-behavior: smooth;
}

[data-neu-theme="dark"] {
  --neu-bg: #000000;
  --neu-bg-elevated: #050505;
  --neu-card: hsl(0 0% 6%);
  --neu-card-soft: hsl(0 0% 8%);
  --neu-fg: #ffffff;
  --neu-muted: rgba(255, 255, 255, 0.55);
  --neu-faint: rgba(255, 255, 255, 0.45);
  --neu-subtle: rgba(255, 255, 255, 0.5);
  --neu-border: rgba(255, 255, 255, 0.1);
  --neu-border-strong: rgba(255, 255, 255, 0.2);
  --neu-chip-active-bg: #ffffff;
  --neu-chip-active-fg: #000000;
  --neu-progress-track: rgba(255, 255, 255, 0.15);
  --neu-progress-fill: #ffffff;
  --neu-header-bg: rgba(0, 0, 0, 0.9);
  --neu-cookie-bg: rgba(0, 0, 0, 0.8);
  --neu-liquid-fg: #ffffff;
  --neu-liquid-bg: rgba(255, 255, 255, 0.01);
  --neu-liquid-inset: rgba(255, 255, 255, 0.1);
  --neu-liquid-edge: rgba(255, 255, 255, 0.45);
  --neu-liquid-mid: rgba(255, 255, 255, 0.15);
  color-scheme: dark;
}

[data-neu-theme="light"] {
  --neu-bg: #ffffff;
  --neu-bg-elevated: #f6f5f2;
  --neu-card: #f0eeea;
  --neu-card-soft: #e8e6e1;
  --neu-fg: #0a0a0a;
  --neu-muted: rgba(10, 10, 10, 0.55);
  --neu-faint: rgba(10, 10, 10, 0.45);
  --neu-subtle: rgba(10, 10, 10, 0.5);
  --neu-border: rgba(10, 10, 10, 0.1);
  --neu-border-strong: rgba(10, 10, 10, 0.18);
  --neu-chip-active-bg: #0a0a0a;
  --neu-chip-active-fg: #ffffff;
  --neu-progress-track: rgba(10, 10, 10, 0.12);
  --neu-progress-fill: #0a0a0a;
  --neu-header-bg: rgba(255, 255, 255, 0.92);
  --neu-cookie-bg: rgba(255, 255, 255, 0.92);
  --neu-liquid-fg: #0a0a0a;
  --neu-liquid-bg: rgba(0, 0, 0, 0.03);
  --neu-liquid-inset: rgba(0, 0, 0, 0.08);
  --neu-liquid-edge: rgba(0, 0, 0, 0.28);
  --neu-liquid-mid: rgba(0, 0, 0, 0.1);
  color-scheme: light;
}

.neu-bg { background-color: var(--neu-bg); color: var(--neu-fg); }
.neu-bg-elevated { background-color: var(--neu-bg-elevated); }
.neu-card { background-color: var(--neu-card); }
.neu-card-soft { background-color: var(--neu-card-soft); }
.neu-fg { color: var(--neu-fg); }
.neu-muted { color: var(--neu-muted); }
.neu-faint { color: var(--neu-faint); }
.neu-subtle { color: var(--neu-subtle); }
.neu-border { border-color: var(--neu-border); }
.neu-border-strong { border-color: var(--neu-border-strong); }

.neu-liquid-glass {
  background: var(--neu-liquid-bg);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px var(--neu-liquid-inset);
  position: relative;
  overflow: hidden;
  color: var(--neu-liquid-fg);
}
.neu-liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(
    180deg,
    var(--neu-liquid-edge) 0%,
    var(--neu-liquid-mid) 20%,
    transparent 40%,
    transparent 60%,
    var(--neu-liquid-mid) 80%,
    var(--neu-liquid-edge) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* Text/Buttons über Video bleiben immer hell lesbar */
.neu-on-media,
.neu-on-media .neu-liquid-glass {
  --neu-liquid-fg: #ffffff;
  --neu-liquid-bg: rgba(255, 255, 255, 0.01);
  --neu-liquid-inset: rgba(255, 255, 255, 0.1);
  --neu-liquid-edge: rgba(255, 255, 255, 0.45);
  --neu-liquid-mid: rgba(255, 255, 255, 0.15);
  color: #ffffff;
}

.neu-fade-rise,
.neu-fade-rise-delay,
.neu-fade-rise-delay-2 {
  animation: neu-fade-rise 0.8s ease-out both;
}
.neu-fade-rise-delay { animation-delay: 0.2s; }
.neu-fade-rise-delay-2 { animation-delay: 0.4s; }
@keyframes neu-fade-rise {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .neu-fade-rise,
  .neu-fade-rise-delay,
  .neu-fade-rise-delay-2 { animation: none; }
}
`;

export function NeuHeroStyles() {
  return <style dangerouslySetInnerHTML={{ __html: NEU_HERO_CSS }} />;
}
