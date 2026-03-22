"use client";

type AppleStyleButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
};

export function AppleStyleButton({
  href = "#contact",
  children,
  className = "",
}: AppleStyleButtonProps) {
  return (
    <a
      href={href ?? "#contact"}
      className={`hero-cta-btn cta-orange relative z-10 inline-block rounded-full px-6 py-2.5 text-sm font-semibold transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${className}`}
      style={{
        background: "linear-gradient(135deg, #c65a20 0%, #d46830 100%)",
        color: "#fff",
      }}
    >
      <span className="relative z-[1]">{children}</span>
    </a>
  );
}
