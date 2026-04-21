import { USE_CASES } from "@/lib/constants";

// Persona cards. The "For X" eyebrow lets self-selecting visitors jump
// straight to their role — important for investor-friendly storytelling
// because it shows the product has multiple ICPs (PMs, Heads of Product,
// Founders, Product Ops) without diluting the primary user.
export function UseCases() {
  return (
    <section
      id="use-cases"
      aria-labelledby="use-cases-heading"
      className="py-24 md:py-32 bg-[color:var(--color-background)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-primary)]">
            Use cases
          </p>
          <h2
            id="use-cases-heading"
            className="mt-3 text-[36px] md:text-[48px] leading-[1.08] tracking-[-0.02em] text-[color:var(--color-foreground)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Built for every decision maker
            <span className="text-[color:var(--color-foreground-muted)]"> across the product org.</span>
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {USE_CASES.map((u) => (
            <article
              key={u.persona}
              className="card-hover p-7 rounded-xl bg-[color:var(--color-surface)] border border-[color:var(--color-border)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--color-primary)]">
                {u.persona}
              </p>
              <h3
                className="mt-3 text-[22px] leading-[1.2] tracking-[-0.01em] text-[color:var(--color-foreground)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {u.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-[color:var(--color-foreground-secondary)]">
                {u.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
