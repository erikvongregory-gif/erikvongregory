/**
 * Launch UI dark tokens + glass (MIT: launch-ui/launch-ui) — scoped to .neuv2
 */
export const NEUV2_CSS = `
.neuv2 {
  --background: oklch(0.141 0.005 285.823);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.141 0.005 285.823);
  --muted: oklch(0.274 0.006 286.033);
  --muted-foreground: oklch(0.705 0.015 286.067);
  --border: oklch(0.885 0.006 286.033);
  --border-soft: color-mix(in oklch, var(--border) 10%, transparent);
  --brand: oklch(83.6% 0.1177 66.87);
  --brand-foreground: oklch(75.77% 0.159 55.91);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.21 0.006 285.885);
  --radius: 0.625rem;
  --shadow-strong: #00000088;
  color-scheme: dark;
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-neuv2-sans), ui-sans-serif, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.neuv2 * { border-color: var(--border-soft); }
.neuv2 a { color: inherit; text-decoration: none; }

.neuv2 .nv-container { width: 100%; max-width: 1280px; margin-inline: auto; }

.neuv2 .nv-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
  height: 2.5rem; padding: 0 1.25rem; border-radius: var(--radius);
  font-size: 0.875rem; font-weight: 500; transition: filter .15s, background .15s, border-color .15s;
}
.neuv2 .nv-btn-primary {
  color: var(--primary-foreground);
  background: linear-gradient(to bottom, var(--primary), color-mix(in oklch, var(--primary) 70%, transparent));
  box-shadow: 0 1px 2px #00000040;
}
.neuv2 .nv-btn-primary:hover { filter: brightness(0.95); }
.neuv2 .nv-btn-glow {
  border: 1px solid color-mix(in oklch, var(--border) 20%, transparent);
  border-top-color: color-mix(in oklch, var(--border) 30%, transparent);
  background: linear-gradient(to bottom, color-mix(in oklch, var(--primary) 15%, transparent), color-mix(in oklch, var(--primary) 5%, transparent));
  box-shadow: 0 4px 6px -1px #00000030;
}
.neuv2 .nv-btn-glow:hover {
  background: linear-gradient(to bottom, color-mix(in oklch, var(--primary) 20%, transparent), color-mix(in oklch, var(--primary) 8%, transparent));
}

.neuv2 .nv-glass {
  border: 1px solid color-mix(in oklch, var(--border) 10%, transparent);
  border-top-color: color-mix(in oklch, var(--border) 20%, transparent);
  border-bottom-color: color-mix(in oklch, var(--border) 5%, transparent);
  background: linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent);
}
.neuv2 .nv-glass-strong {
  border: 1px solid color-mix(in oklch, var(--border) 10%, transparent);
  border-top-color: color-mix(in oklch, var(--border) 30%, transparent);
  border-bottom: 0;
  background: linear-gradient(to bottom, color-mix(in oklch, var(--primary) 12%, transparent), color-mix(in oklch, var(--primary) 4%, transparent));
}

.neuv2 .nv-section {
  padding: 3rem 1rem;
  border-bottom: 1px solid color-mix(in oklch, var(--border) 10%, transparent);
}
@media (min-width: 640px) { .neuv2 .nv-section { padding: 6rem 1rem; } }
@media (min-width: 768px) { .neuv2 .nv-section { padding: 8rem 1rem; } }

.neuv2 .nv-fade-bottom {
  mask-image: linear-gradient(to top, transparent 0%, black 35%);
}

.neuv2 .nv-lines {
  pointer-events: none; position: fixed; inset: 0; z-index: 0;
}
.neuv2 .nv-lines > div {
  height: 100%; margin: 0 auto; max-width: 1280px;
  border-left: 1px dashed color-mix(in oklch, var(--border) 10%, transparent);
  border-right: 1px dashed color-mix(in oklch, var(--border) 10%, transparent);
}

@keyframes nv-appear {
  0% { opacity: 0; transform: translateY(1rem); filter: blur(0.5rem); }
  50% { filter: blur(0); }
  100% { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes nv-appear-zoom {
  0% { opacity: 0; transform: scale(0.5); }
  100% { opacity: 1; transform: scale(1); }
}
.nv-appear { animation: nv-appear 0.6s forwards ease-out; }
.nv-appear-d1 { animation: nv-appear 0.6s forwards ease-out; animation-delay: 0.1s; opacity: 0; }
.nv-appear-d2 { animation: nv-appear 0.6s forwards ease-out; animation-delay: 0.3s; opacity: 0; }
.nv-appear-d3 { animation: nv-appear 0.6s forwards ease-out; animation-delay: 0.7s; opacity: 0; }
.nv-appear-zoom { animation: nv-appear-zoom 0.6s forwards ease-out; animation-delay: 1s; opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  .nv-appear, .nv-appear-d1, .nv-appear-d2, .nv-appear-d3, .nv-appear-zoom {
    animation: none !important; opacity: 1 !important; transform: none !important; filter: none !important;
  }
}
`;
