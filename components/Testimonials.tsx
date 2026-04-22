// Testimonials. These are PLACEHOLDER quotes — voiced realistically but
// clearly marked in the project README as replaceable. Do not ship with
// these names until you have written permission from real customers.
const QUOTES = [
  {
    body: "I used to spend Monday mornings reading Zendesk. Now Squash has already done it and my standup starts with 'here's what users said last week, ranked by revenue impact.'",
    name: "PM, Series B SaaS",
    role: "Product Manager",
  },
  {
    body: "We killed a data analyst hire. Not because we didn't value the work, but because a PM can now ask the question in English and ship the chart in the same meeting.",
    name: "Head of Product, fintech",
    role: "Head of Product",
  },
  {
    body: "The first time Squash filed a Jira for a bug I didn't know existed, pulled from 14 tickets and 6 sessions, I stopped second-guessing what to build.",
    name: "Founding PM, consumer mobile",
    role: "Founding PM",
  },
];

export function Testimonials() {
  return (
    <section
      aria-label="Customer quotes"
      className="py-24 md:py-32 bg-[color:var(--color-background)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-primary)]">
            What teams say
          </p>
          <h2
            className="mt-3 text-[36px] md:text-[48px] leading-[1.08] tracking-[-0.02em] text-[color:var(--color-foreground)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The feedback loop
            <span className="text-[color:var(--color-foreground-muted)]"> you always wanted.</span>
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {QUOTES.map((q, i) => (
            <figure
              key={i}
              className="card-hover p-7 rounded-xl bg-[color:var(--color-surface)] border border-[color:var(--color-border)] flex flex-col"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-[color:var(--color-primary)] opacity-60"
                aria-hidden="true"
              >
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
              </svg>
              <blockquote
                className="mt-4 text-[16px] leading-relaxed text-[color:var(--color-foreground)] flex-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                &ldquo;{q.body}&rdquo;
              </blockquote>
              <figcaption className="mt-5 pt-4 border-t border-[color:var(--color-border-light)]">
                <p className="text-[13px] font-semibold text-[color:var(--color-foreground)]">
                  {q.name}
                </p>
                <p className="text-[12px] text-[color:var(--color-foreground-muted)]">
                  {q.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
