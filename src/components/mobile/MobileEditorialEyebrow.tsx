type MobileEditorialEyebrowProps = {
  children: React.ReactNode;
};

export function MobileEditorialEyebrow({ children }: MobileEditorialEyebrowProps) {
  return (
    <div className="mb-3.5 flex items-center gap-2.5">
      <span className="h-px w-7 shrink-0 bg-amber" aria-hidden />
      <p className="m-0 font-mono-hero text-[11px] uppercase tracking-[1.4px] text-amber">{children}</p>
    </div>
  );
}
