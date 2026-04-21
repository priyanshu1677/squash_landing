// Social proof. Uses generic wordmarks as placeholders — REPLACE with real
// customer logos (with written permission) before launch. Until then, use
// types of customer ("Series B SaaS", "Consumer mobile app") rather than
// fabricated names. The array below is currently generic for safety.
const COMPANY_LOGOS = [
  "Lumen",
  "Northwind",
  "Kepler",
  "Halcyon",
  "Meridian",
  "Fieldstone",
  "Silverline",
  "Observa",
];

export function LogoCloud() {
  return (
    <section
      aria-label="Teams using Squash"
      className="border-y border-[color:var(--color-border)] bg-[color:var(--color-surface)] py-10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-foreground-muted)]">
          Trusted by product teams moving fast
        </p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-6 gap-y-5 items-center">
          {COMPANY_LOGOS.map((name) => (
            <div
              key={name}
              className="text-center text-[15px] font-medium text-[color:var(--color-foreground-muted)] hover:text-[color:var(--color-foreground)] transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
