import { SOLUTION_PILLARS } from "@/lib/constants";

// Four-pillar solution. Alternates text/visual for rhythm. Each pillar
// has an eyebrow verb (Synthesize, Analyze, Detect, Ship) that lines up
// with a specific PM workflow. Visuals are inline SVG — zero JS cost.
export function Solution() {
  return (
    <section
      id="solution"
      aria-labelledby="solution-heading"
      className="py-24 md:py-32 bg-[color:var(--color-surface)] border-y border-[color:var(--color-border)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-primary)]">
            The solution
          </p>
          <h2
            id="solution-heading"
            className="mt-3 text-[36px] md:text-[48px] leading-[1.08] tracking-[-0.02em] text-[color:var(--color-foreground)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            One chat. Your whole product stack.
            <span className="text-[color:var(--color-foreground-muted)]"> Answers grounded in real signal.</span>
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[color:var(--color-foreground-secondary)] max-w-2xl">
            Squash is a Cursor-like interface for Product Managers. Ask anything
            — from "cluster last week's tickets" to "draft the PRD for the
            refund retry flow" — and Squash does the work across every tool you
            already use.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {SOLUTION_PILLARS.map((pillar, i) => (
            <article
              key={pillar.eyebrow}
              id={pillar.href.slice(1)}
              className="card-hover p-7 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background-tertiary)] flex flex-col"
            >
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-[color:var(--color-foreground-muted)]">
                  0{i + 1}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--color-primary)]">
                  {pillar.eyebrow}
                </span>
              </div>
              <h3
                className="mt-4 text-[24px] leading-[1.15] tracking-[-0.01em] text-[color:var(--color-foreground)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {pillar.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-[color:var(--color-foreground-secondary)] flex-1">
                {pillar.body}
              </p>

              {/* Tiny illustration per pillar */}
              <div className="mt-6 rounded-lg border border-[color:var(--color-border)] bg-white p-4">
                <PillarVisual index={i} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Four mini-visuals, one per pillar. Each is a focused representation of
// the concrete output a PM would see in that workflow.
function PillarVisual({ index }: { index: number }) {
  if (index === 0) {
    // Synthesize — ticket clusters
    return (
      <div className="space-y-1.5">
        {[
          { label: "Checkout crash on Android 14", count: 142, pct: 85 },
          { label: "Promo code drops on retry", count: 78, pct: 48 },
          { label: "Refund stuck > 72h", count: 41, pct: 25 },
        ].map((row) => (
          <div key={row.label} className="flex items-center gap-2">
            <span className="text-[11px] text-[color:var(--color-foreground-secondary)] flex-1 truncate">
              {row.label}
            </span>
            <span className="text-[10px] text-[color:var(--color-foreground-muted)] font-mono">
              {row.count}
            </span>
            <div className="w-16 h-1.5 rounded-full bg-[color:var(--color-background-secondary)] overflow-hidden">
              <div
                className="h-full bg-[color:var(--color-primary)]"
                style={{ width: `${row.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (index === 1) {
    // Analyze — natural language to SQL
    return (
      <div className="space-y-2">
        <p className="text-[11px] font-mono text-[color:var(--color-foreground)]">
          &gt; conversion by channel, last 30 days, Android only
        </p>
        <div className="text-[10px] font-mono text-[color:var(--color-foreground-muted)] bg-[color:var(--color-background-tertiary)] border border-[color:var(--color-border-light)] rounded p-2">
          SELECT channel, COUNT(*) AS sessions,<br />
          AVG(converted::int) AS cvr<br />
          FROM events WHERE device = 'android'...
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[color:var(--color-success)]">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          ran in 1.4s · chart ready
        </div>
      </div>
    );
  }
  if (index === 2) {
    // Detect — alert card
    return (
      <div className="flex items-start gap-2.5">
        <div className="w-6 h-6 rounded bg-[color:var(--color-error-subtle)] flex items-center justify-center flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f44336" strokeWidth="2.5" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-[color:var(--color-foreground)]">
            Rage clicks spiking on Pay button
          </p>
          <p className="text-[10px] text-[color:var(--color-foreground-muted)] mt-0.5">
            #payments-oncall · 4 min ago · 38 sessions affected
          </p>
        </div>
      </div>
    );
  }
  // Ship — PRD preview
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-semibold text-[color:var(--color-foreground)]">
        PRD · Android 14 payment-step crash
      </p>
      <div className="space-y-1">
        {["Problem", "User impact", "Proposed fix", "Acceptance criteria"].map(
          (line) => (
            <div key={line} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[color:var(--color-primary)]" />
              <span className="text-[10px] text-[color:var(--color-foreground-secondary)]">
                {line}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
