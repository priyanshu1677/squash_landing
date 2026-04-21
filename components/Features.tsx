import { FEATURES } from "@/lib/constants";

// Six features. Tighter than the solution pillars — these are specific
// capabilities, not workflows. Each tag line names the actual integrations
// or concrete category so buyers can scan for what they need.
export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="py-24 md:py-32 bg-[color:var(--color-background)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-primary)]">
            Capabilities
          </p>
          <h2
            id="features-heading"
            className="mt-3 text-[36px] md:text-[48px] leading-[1.08] tracking-[-0.02em] text-[color:var(--color-foreground)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Everything a PM actually does,
            <span className="text-[color:var(--color-foreground-muted)]"> automated with your data.</span>
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <article
              key={f.title}
              className="card-hover p-6 rounded-xl bg-[color:var(--color-surface)] border border-[color:var(--color-border)] flex flex-col"
            >
              <div className="flex items-center justify-between">
                <FeatureIcon index={i} />
                <span className="text-[10px] font-mono text-[color:var(--color-foreground-muted)]">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-[17px] font-semibold text-[color:var(--color-foreground)] leading-snug">
                {f.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[color:var(--color-foreground-secondary)] flex-1">
                {f.body}
              </p>
              <p className="mt-4 pt-3 border-t border-[color:var(--color-border-light)] text-[11px] text-[color:var(--color-foreground-muted)] font-mono">
                {f.tag}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Simple line icons — matching weight, consistent stroke. Using a palette
// index to rotate through brand-appropriate colors without feeling busy.
function FeatureIcon({ index }: { index: number }) {
  const icons = [
    // 1. Feedback synthesis — layers
    <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>,
    // 2. NL analytics — bar chart
    <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>,
    // 3. Session — eye
    <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>,
    // 4. PRD — document
    <svg key="4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="13" y2="17" />
    </svg>,
    // 5. Action — zap
    <svg key="5" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>,
    // 6. Citations — link
    <svg key="6" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>,
  ];
  return (
    <div className="w-10 h-10 rounded-lg bg-[color:var(--color-primary-subtle)] text-[color:var(--color-primary)] flex items-center justify-center">
      {icons[index]}
    </div>
  );
}
