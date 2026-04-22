import Link from "next/link";

// Final CTA — one-line promise, one primary button, minimal secondary.
// Set against a warm gradient so it visually "resolves" after the FAQ.
export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-32 bg-[color:var(--color-background)]">
      <div className="absolute inset-0 hero-gradient" aria-hidden="true" />
      <div className="absolute inset-0 dot-bg opacity-30" aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2
          className="text-[32px] sm:text-[40px] md:text-[56px] leading-[1.08] tracking-[-0.02em] text-[color:var(--color-foreground)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Your next decision deserves
          <br />
          <span className="italic text-[color:var(--color-primary)]">
            better than a gut feel.
          </span>
        </h2>
        <p className="mt-5 sm:mt-6 text-[15px] sm:text-[17px] leading-relaxed text-[color:var(--color-foreground-secondary)] max-w-2xl mx-auto">
          Connect one tool, ask one question, get one answer. That's how every
          Squash journey starts. No credit card, no consultant kickoff call.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-full bg-[color:var(--color-primary)] text-white font-medium text-sm hover:bg-[color:var(--color-primary-hover)] transition-colors"
          >
            Start free
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <a
            href="https://cal.com/heysquash/squash-onboarding"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white border border-[color:var(--color-border)] text-[color:var(--color-foreground)] font-medium text-sm hover:border-[color:var(--color-foreground)] transition-colors"
          >
            Book a demo
          </a>
        </div>
      </div>
    </section>
  );
}
