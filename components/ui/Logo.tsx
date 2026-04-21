// Squash wordmark. The accent dot echoes the brand orange and
// doubles as a subtle "signal" visual metaphor.
export function Logo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-full w-auto" aria-hidden="true">
        <defs>
          <linearGradient id="squash-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E8640F" />
            <stop offset="100%" stopColor="#FFA07A" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="url(#squash-grad)" />
        <path
          d="M10 12c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v1h-3v-1h-6v4h6v-1h3v1a2 2 0 0 1-2 2h-3v4h3a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-1h3v1h6v-4h-6a2 2 0 0 1-2-2v-6z"
          fill="white"
        />
      </svg>
      <span
        className="font-medium text-[17px] tracking-tight text-[color:var(--color-foreground)]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Squash
      </span>
    </div>
  );
}
