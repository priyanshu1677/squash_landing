import { SOLUTION_PILLARS } from "@/lib/constants";

// Four-pillar solution. Alternates text/visual for rhythm. Each pillar
// has an eyebrow verb (Synthesize, Analyze, Detect, Ship) that lines up
// with a specific PM workflow. Visuals are inline SVG — zero JS cost.
export function Solution() {
  return (
    <section
      id="solution"
      aria-labelledby="solution-heading"
      className="py-16 sm:py-20 md:py-32 bg-[color:var(--color-surface)] border-y border-[color:var(--color-border)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-primary)]">
            The solution
          </p>
          <h2
            id="solution-heading"
            className="mt-3 text-[30px] sm:text-[36px] md:text-[48px] leading-[1.1] tracking-[-0.02em] text-[color:var(--color-foreground)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            One chat. Your whole product stack.
            <span className="text-[color:var(--color-foreground-muted)]"> Real answers from real data.</span>
          </h2>
          <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-foreground-secondary)] max-w-2xl">
            Squash is a Cursor-like interface for Product Managers. Ask
            anything, from "fetch insights last week's tickets" to "draft the PRD for
            the refund retry flow", and Squash does the work across every tool
            you already use.
          </p>
        </div>

        <div className="mt-10 sm:mt-12 md:mt-14 grid md:grid-cols-2 gap-4 sm:gap-5">
          {SOLUTION_PILLARS.map((pillar, i) => (
            <article
              key={pillar.eyebrow}
              id={pillar.href.slice(1)}
              className="card-hover p-6 sm:p-7 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background-tertiary)] flex flex-col"
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
                className="mt-4 text-[22px] sm:text-[24px] leading-[1.15] tracking-[-0.01em] text-[color:var(--color-foreground)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {pillar.title}
              </h3>
              <p className="mt-3 text-[14px] sm:text-[14.5px] leading-relaxed text-[color:var(--color-foreground-secondary)] flex-1">
                {pillar.body}
              </p>

              {/* Tiny illustration per pillar */}
              <div className="mt-5 sm:mt-6 rounded-lg border border-[color:var(--color-border)] bg-white p-3.5 sm:p-4 overflow-hidden">
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
// the concrete output a PM would see in that workflow — framed like a
// product artifact (dashboard row, chart, alert, draft) rather than
// an abstract decoration.
function PillarVisual({ index }: { index: number }) {
  if (index === 0) return <SynthesizeVisual />;
  if (index === 1) return <AnalyzeVisual />;
  if (index === 2) return <DetectVisual />;
  return <ShipVisual />;
}

// Source-color map so provenance dots read as "this theme came from
// multiple tools" without needing a legend.
const SRC = {
  zendesk: "#03363D",
  intercom: "#1F8DED",
  salesforce: "#00A1E0",
  mixpanel: "#7856FF",
  posthog: "#1D4AFF",
} as const;

function SourceDots({ colors }: { colors: string[] }) {
  return (
    <div className="flex -space-x-1" aria-hidden="true">
      {colors.map((c, i) => (
        <span
          key={i}
          className="w-3 h-3 rounded-full ring-2 ring-white"
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
  );
}

function SynthesizeVisual() {
  const themes = [
    {
      label: "Checkout crash on Android 14",
      count: 142,
      pct: 92,
      sources: [SRC.zendesk, SRC.intercom, SRC.posthog],
      delta: "+34%",
      up: true,
    },
    {
      label: "Promo code drops on retry",
      count: 78,
      pct: 52,
      sources: [SRC.zendesk, SRC.mixpanel],
      delta: "+12%",
      up: true,
    },
    {
      label: "Refund stuck > 72h",
      count: 41,
      pct: 28,
      sources: [SRC.intercom, SRC.salesforce],
      delta: "−6%",
      up: false,
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-between pb-2 border-b border-[color:var(--color-border-light)]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[color:var(--color-foreground-muted)]">
          Top themes · last 7 days
        </p>
        <span className="text-[10px] font-mono text-[color:var(--color-foreground-muted)] tabular-nums">
          261 tickets
        </span>
      </div>
      <div className="mt-2.5 space-y-2">
        {themes.map((t) => (
          <div key={t.label} className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[11px] text-[color:var(--color-foreground-secondary)] flex-1 min-w-0 truncate">
              {t.label}
            </span>
            <SourceDots colors={t.sources} />
            <span
              className={`shrink-0 text-[10px] font-mono tabular-nums w-8 sm:w-9 text-right ${
                t.up
                  ? "text-[color:var(--color-foreground-muted)]"
                  : "text-[color:var(--color-success)]"
              }`}
            >
              {t.delta}
            </span>
            <div className="shrink-0 w-10 sm:w-14 h-1.5 rounded-full bg-[color:var(--color-background-secondary)] overflow-hidden">
              <div
                className="h-full bg-[color:var(--color-primary)]"
                style={{ width: `${t.pct}%` }}
              />
            </div>
            <span className="shrink-0 text-[10px] font-mono tabular-nums text-[color:var(--color-foreground)] w-7 text-right">
              {t.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyzeVisual() {
  const channels = [
    { label: "Organic", pct: 18.2, width: 88 },
    { label: "Paid", pct: 12.4, width: 60 },
    { label: "Referral", pct: 8.1, width: 39 },
    { label: "Direct", pct: 5.7, width: 27 },
  ];
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-1.5 min-w-0">
        <span className="text-[11px] font-mono text-[color:var(--color-primary)] shrink-0">&gt;</span>
        <p className="text-[11px] font-mono text-[color:var(--color-foreground)] truncate min-w-0">
          conversion by channel · 30d · android
        </p>
      </div>
      <div className="space-y-1.5">
        {channels.map((c) => (
          <div key={c.label} className="flex items-center gap-2">
            <span className="text-[10px] text-[color:var(--color-foreground-secondary)] w-14 shrink-0">
              {c.label}
            </span>
            <div className="flex-1 h-2 rounded-full bg-[color:var(--color-background-secondary)] overflow-hidden">
              <div
                className="h-full bg-[color:var(--color-primary)] rounded-full"
                style={{ width: `${c.width}%` }}
              />
            </div>
            <span className="text-[10px] font-mono tabular-nums text-[color:var(--color-foreground)] w-10 text-right">
              {c.pct}%
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-[color:var(--color-border-light)]">
        <div className="flex items-center gap-1.5 text-[10px] text-[color:var(--color-success)]">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          ran in 1.4s
        </div>
        <span className="text-[10px] font-mono text-[color:var(--color-foreground-muted)]">
          bigquery · 18,402 rows
        </span>
      </div>
    </div>
  );
}

function DetectVisual() {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="relative flex w-1.5 h-1.5" aria-hidden="true">
            <span className="absolute inline-flex w-full h-full rounded-full bg-[color:var(--color-error)] opacity-60 animate-ping" />
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[color:var(--color-error)]" />
          </span>
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[color:var(--color-foreground-muted)]">
            Live · rage clicks · 60m
          </p>
        </div>
        <span className="text-[10px] font-mono tabular-nums text-[color:var(--color-error)]">
          +312% vs avg
        </span>
      </div>
      <svg
        viewBox="0 0 160 34"
        className="w-full h-8"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="detect-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f44336" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#f44336" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,28 L10,27 L20,26 L30,28 L40,25 L50,26 L60,24 L70,22 L80,23 L90,19 L100,16 L110,13 L120,9 L130,5 L140,3 L150,2 L160,4 L160,34 L0,34 Z"
          fill="url(#detect-grad)"
        />
        <path
          d="M0,28 L10,27 L20,26 L30,28 L40,25 L50,26 L60,24 L70,22 L80,23 L90,19 L100,16 L110,13 L120,9 L130,5 L140,3 L150,2 L160,4"
          fill="none"
          stroke="#f44336"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="150" cy="2" r="2" fill="#f44336" />
      </svg>
      <div className="flex items-start gap-2 p-2 rounded-md bg-[color:var(--color-error-subtle)] border border-[color:var(--color-border-light)]">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f44336"
          strokeWidth="2.5"
          aria-hidden="true"
          className="mt-0.5 flex-shrink-0"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-[color:var(--color-foreground)]">
            Rage clicks spiking on Pay button
          </p>
          <p className="text-[10px] text-[color:var(--color-foreground-muted)] mt-0.5">
            #payments-oncall · 4m ago · 38 sessions
          </p>
        </div>
      </div>
    </div>
  );
}

function ShipVisual() {
  const sections = [
    { label: "Problem", done: true },
    { label: "User impact", done: true },
    { label: "Proposed fix", done: true },
    { label: "Acceptance criteria", done: false },
  ];
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-semibold text-[color:var(--color-foreground)] truncate">
          PRD · Android 14 payment crash
        </p>
        <span className="text-[9px] font-semibold uppercase tracking-[0.08em] px-1.5 py-0.5 rounded bg-[color:var(--color-primary-subtle)] text-[color:var(--color-primary)] border border-[color:var(--color-primary-subtle-border)] shrink-0">
          Draft
        </span>
      </div>
      <div className="space-y-1">
        {sections.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            {s.done ? (
              <div className="w-3 h-3 rounded-full bg-[color:var(--color-primary)] flex items-center justify-center shrink-0">
                <svg
                  width="7"
                  height="7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            ) : (
              <div className="w-3 h-3 rounded-full border border-dashed border-[color:var(--color-foreground-muted)] shrink-0" />
            )}
            <span
              className={`text-[11px] ${
                s.done
                  ? "text-[color:var(--color-foreground-secondary)]"
                  : "text-[color:var(--color-foreground-muted)] italic"
              }`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 pt-2 border-t border-[color:var(--color-border-light)]">
        <span className="text-[10px] text-[color:var(--color-foreground-muted)] shrink-0">
          Cites
        </span>
        {["T-4821", "S-912", "Q-88"].map((t) => (
          <span
            key={t}
            className="text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded bg-[color:var(--color-background-tertiary)] border border-[color:var(--color-border-light)] text-[color:var(--color-foreground-secondary)]"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
