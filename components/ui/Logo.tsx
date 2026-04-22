export function Logo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <img src="/favicon.svg" alt="" aria-hidden="true" className="h-full w-auto" />
      <span
        className="font-medium text-[17px] tracking-tight text-[color:var(--color-foreground)]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Squash
      </span>
    </div>
  );
}
