import { HOW_IT_WORKS } from "@/lib/constants";

// Three-step flow. On desktop, a subtle horizontal line connects the
// step numbers — reads as a path from setup to outcome. On mobile,
// stacks vertically with a left-side rail.
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="py-16 sm:py-20 md:py-32 bg-[color:var(--color-surface)] border-y border-[color:var(--color-border)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-primary)]">
            How it works
          </p>
          <h2
            id="how-heading"
            className="mt-3 text-[30px] sm:text-[36px] md:text-[48px] leading-[1.1] tracking-[-0.02em] text-[color:var(--color-foreground)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            From zero to your first insight
            <span className="text-[color:var(--color-foreground-muted)]"> in under ten minutes.</span>
          </h2>
        </div>

        <div className="mt-12 md:mt-16 relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-6 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-[color:var(--color-border)] to-transparent"
            aria-hidden="true"
          />

          <ol className="grid md:grid-cols-3 gap-8 md:gap-8 relative">
            {HOW_IT_WORKS.map((step) => (
              <li key={step.step} className="relative flex flex-col items-start">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[color:var(--color-primary)] text-white flex items-center justify-center font-mono text-[13px] font-semibold relative z-10">
                  {step.step}
                </div>
                <h3
                  className="mt-5 sm:mt-6 text-[20px] sm:text-[22px] leading-[1.2] tracking-[-0.01em] text-[color:var(--color-foreground)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[14px] sm:text-[14.5px] leading-relaxed text-[color:var(--color-foreground-secondary)]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
