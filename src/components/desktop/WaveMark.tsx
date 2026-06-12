/** Markenlogo — zwei terrakotta Wellen, transparenter Hintergrund. */
export function WaveMark({ className }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden className={className}>
      <path
        d="M4 22 Q10 12 16 20 T24 16"
        stroke="#7D5136"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M2 18 Q7 6 14 14 T26 10"
        stroke="#C8712B"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
