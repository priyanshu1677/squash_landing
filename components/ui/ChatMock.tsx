import { IntegrationMark } from "./IntegrationMark";

// The hero product visual. Designed to communicate three things at once:
//  1. Chat-native input (prompt row at the top)
//  2. Tool-use reasoning (the "analysis complete" checkpoints)
//  3. Grounded output (metric tiles + chart + cited source)
//
// Built with pure SVG + divs so it looks crisp at every resolution and
// carries no runtime cost.
export function ChatMock() {
  return (
    <div className="relative rounded-[20px] bg-white border border-[color:var(--color-border)] shadow-[0_30px_80px_-30px_rgba(26,26,26,0.18)] overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[color:var(--color-border-light)] bg-[color:var(--color-background-tertiary)]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f44336]/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffc107]/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#4caf50]/60" />
        </div>
        <span className="text-[11px] font-mono text-[color:var(--color-foreground-muted)]">
          squash.ai / checkout-analysis
        </span>
        <div className="w-10" />
      </div>

      <div className="p-5 sm:p-6 flex flex-col gap-4">
        {/* Prompt row */}
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-full bg-[color:var(--color-background-secondary)] flex-shrink-0" />
          <div className="flex-1 pt-1">
            <p className="font-mono text-[13px] text-[color:var(--color-foreground)] leading-relaxed">
              Why is checkout conversion down on Android this week? Synthesize the
              tickets and draft a Jira.
              <span className="caret inline-block w-[2px] h-[14px] bg-[color:var(--color-primary)] align-middle ml-0.5" />
            </p>
          </div>
        </div>

        {/* Tool use checkpoints */}
        <div className="ml-10 border border-[color:var(--color-border)] rounded-lg overflow-hidden">
          <div className="px-3.5 py-2.5 bg-[color:var(--color-primary-subtle)] border-b border-[color:var(--color-primary-subtle-border)] flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[color:var(--color-primary)]" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-[12px] font-medium text-[color:var(--color-foreground)]">
              Analysis complete · 4 tools used
            </span>
          </div>
          {[
            { label: "Querying BigQuery · checkout_events", done: true },
            { label: "Clustering 412 Zendesk tickets", done: true },
            { label: "Scanning 38 session recordings for rage clicks", done: true },
            { label: "Drafting Jira ticket SQ-519", done: true },
          ].map((row, i) => (
            <div
              key={i}
              className="px-3.5 py-2 flex items-center gap-2 border-b last:border-b-0 border-[color:var(--color-border-light)] text-[12px] text-[color:var(--color-foreground-secondary)]"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-[color:var(--color-success)]" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {row.label}
            </div>
          ))}
        </div>

        {/* Summary block */}
        <div className="ml-10 p-3.5 rounded-lg bg-[color:var(--color-primary-subtle)] border border-[color:var(--color-primary-subtle-border)]">
          <p className="text-[13px] leading-relaxed text-[color:var(--color-foreground)]">
            Android checkout conversion dropped to 2.1% (↓0.9 pts) this week. Root
            cause: payment-step crash on Android 14 after the 4.2.1 release — 38% of
            affected users rage-clicked the Pay button 3+ times before exiting.
          </p>
        </div>

        {/* Metric tiles */}
        <div className="ml-10 grid grid-cols-3 gap-2">
          {[
            { label: "Android CVR", value: "2.1%", delta: "−0.9 pts", down: true },
            { label: "Rage clicks", value: "38%", delta: "+24 pts", down: true },
            { label: "Tickets", value: "412", delta: "3× normal", down: true },
          ].map((m) => (
            <div key={m.label} className="border border-[color:var(--color-border)] rounded-lg p-2.5">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-[color:var(--color-foreground-muted)]">
                {m.label}
              </p>
              <p className="mt-1 text-[18px] font-semibold text-[color:var(--color-foreground)]">
                {m.value}
              </p>
              <p className="text-[10px] text-[color:var(--color-error)]">▼ {m.delta}</p>
            </div>
          ))}
        </div>

        {/* Mini chart (SVG, no JS) */}
        <div className="ml-10 border border-[color:var(--color-border)] rounded-lg p-3.5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-semibold text-[color:var(--color-foreground)]">
              Daily conversion · last 14 days
            </p>
            <span className="text-[9px] font-mono text-[color:var(--color-foreground-muted)]">
              BigQuery
            </span>
          </div>
          <svg viewBox="0 0 400 80" className="w-full h-16" aria-label="Daily conversion chart">
            <defs>
              <linearGradient id="heroChart" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E8640F" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#E8640F" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 20, 40, 60].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="400"
                y2={y}
                stroke="#EFECE5"
                strokeWidth="1"
              />
            ))}
            <path
              d="M0,20 L29,15 L57,25 L86,10 L114,22 L143,30 L171,28 L200,38 L229,35 L257,48 L286,55 L314,45 L343,60 L371,50 L400,62 L400,80 L0,80 Z"
              fill="url(#heroChart)"
            />
            <path
              d="M0,20 L29,15 L57,25 L86,10 L114,22 L143,30 L171,28 L200,38 L229,35 L257,48 L286,55 L314,45 L343,60 L371,50 L400,62"
              fill="none"
              stroke="#E8640F"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Action card — drafted Jira */}
        <div className="ml-10 border border-[color:var(--color-border)] rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-[color:var(--color-border-light)]">
            <div className="flex items-center gap-2">
              <IntegrationMark name="Jira" color="#0052CC" size={16} />
              <span className="text-[11px] font-semibold text-[color:var(--color-foreground-muted)]">
                Jira · Draft
              </span>
            </div>
            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-[color:var(--color-success-subtle)] text-[color:var(--color-success)] uppercase tracking-wider">
              Ready
            </span>
          </div>
          <div className="px-3.5 py-2.5">
            <p className="text-[12px] font-semibold text-[color:var(--color-foreground)] leading-snug">
              [P1] Android 14 payment-step crash after 4.2.1 release
            </p>
            <p className="mt-1 text-[11px] text-[color:var(--color-foreground-muted)]">
              SQ-519 · Squash Web · Linked: 412 tickets · 38 sessions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
