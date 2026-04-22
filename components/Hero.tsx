import { ChatMock } from "./ui/ChatMock";

// Hero — the primary conversion surface.
// Copy strategy:
//   H1 names the pain ("building on gut") — confrontational, memorable.
//   Subhead states the mechanism in one sentence — what we do + how.
//   Two CTAs: free-to-try (primary) + demo (secondary, for enterprise/investor audience).
//   Mini-proof below CTAs signals trust without fabricating specifics.
export function Hero() {
  return (
    <section className="relative overflow-hidden hero-gradient">
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Text column */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div
              className="fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[color:var(--color-border)] text-[11px] font-medium text-[color:var(--color-foreground-secondary)]"
              style={{ animationDelay: "0ms" }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--color-primary)] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[color:var(--color-primary)]" />
              </span>
              New · Squash 1.0 is live for early access teams
            </div>

            <h1
              className="fade-up mt-6 text-[44px] sm:text-[56px] lg:text-[64px] leading-[1.02] tracking-[-0.02em] text-[color:var(--color-foreground)]"
              style={{
                fontFamily: "var(--font-display)",
                animationDelay: "80ms",
              }}
            >
              Stop building on gut.
              <br />
              <span className="italic text-[color:var(--color-primary)]">
                Ship what users actually want.
              </span>
            </h1>

            <p
              className="fade-up mt-5 text-[17px] lg:text-[18px] leading-relaxed text-[color:var(--color-foreground-secondary)] max-w-xl"
              style={{ animationDelay: "180ms" }}
            >
              Squash is the AI decision layer for Product Managers. It reads your
              tickets, session recordings, and analytics — then hands you a
              prioritized roadmap, cited to real users. Ask anything across your
              stack in plain English.
            </p>

            <div
              className="fade-up mt-8 flex flex-col sm:flex-row gap-3"
              style={{ animationDelay: "280ms" }}
            >
              <a
                href="https://app.heysquash.com"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-[color:var(--color-primary)] text-white font-medium text-sm hover:bg-[color:var(--color-primary-hover)] transition-colors"
              >
                Get started — it's free
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href="https://app.heysquash.com"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-white border border-[color:var(--color-border)] text-[color:var(--color-foreground)] font-medium text-sm hover:border-[color:var(--color-foreground)] transition-colors"
              >
                Book a demo
              </a>
            </div>

            <div
              className="fade-up mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] text-[color:var(--color-foreground-muted)]"
              style={{ animationDelay: "380ms" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[color:var(--color-success)]" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                SOC 2 Type II
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[color:var(--color-success)]" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Your data never trains our models
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[color:var(--color-success)]" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                10-minute setup
              </span>
            </div>
          </div>

          {/* Visual column */}
          <div
            className="lg:col-span-6 fade-up"
            style={{ animationDelay: "460ms" }}
          >
            <ChatMock />
          </div>
        </div>
      </div>
    </section>
  );
}
