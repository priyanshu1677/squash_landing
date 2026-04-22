import Link from "next/link";
import { ChatMockAnimated } from "./ui/ChatMockAnimated";

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

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-8 md:pt-10 pb-10 md:pb-12 lg:min-h-[calc(100svh-4rem)]">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start w-full lg:pt-2">
          {/* Text column */}
          <div className="lg:col-span-6 flex flex-col items-start lg:mt-[6svh] xl:mt-[8svh]">
            <h1
              className="fade-up text-[38px] sm:text-[48px] lg:text-[48px] xl:text-[56px] 2xl:text-[60px] leading-[1.05] tracking-[-0.02em] text-[color:var(--color-foreground)]"
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
              className="fade-up mt-4 text-[16px] lg:text-[17px] leading-relaxed text-[color:var(--color-foreground-secondary)] max-w-xl"
              style={{ animationDelay: "180ms" }}
            >
              Your sharpest PM teammate, wired into analytics, sessions,
              tickets, and your backlog. Ask anything, get the assistance of
              someone who's read everything.
            </p>

            <div
              className="fade-up mt-6 flex flex-col sm:flex-row gap-3"
              style={{ animationDelay: "280ms" }}
            >
              <a
                href="https://app.heysquash.com"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-[color:var(--color-primary)] text-white font-medium text-sm hover:bg-[color:var(--color-primary-hover)] transition-colors"
              >
                Get started for free
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
              className="fade-up mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-[color:var(--color-foreground-muted)]"
              style={{ animationDelay: "380ms" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[color:var(--color-success)]" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Setup in minutes, not weeks
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[color:var(--color-success)]" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Connect your stack in a few clicks
              </span>
            </div>
          </div>

          {/* Visual column */}
          <div
            className="lg:col-span-6 fade-up"
            style={{ animationDelay: "460ms" }}
          >
            <ChatMockAnimated />
          </div>
        </div>
      </div>
    </section>
  );
}
