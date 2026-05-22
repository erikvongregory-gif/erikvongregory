export function WaveMark({ className }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M2 18 Q7 6 14 14 T26 10"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M4 22 Q10 12 16 20 T24 16"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.45"
        fill="none"
      />
    </svg>
  );
}
