// Names the pain in the PM's own voice. Three cards = three hires the
// org won't need once Squash is in place. Copy is first-person to make
// it scan as testimonial-adjacent — a confidence move, not bragging.
const PROBLEMS = [
  {
    stat: "500",
    unit: "tickets/week",
    title: "The signal is there. The time isn't.",
    body: "Every complaint, every rage quit, every feature request is already in your Zendesk and Intercom. But nobody reads all 500. Patterns that would actually move retention never make it into the planning doc.",
  },
  {
    stat: "2 wks",
    unit: "wait on the analyst",
    title: "The dashboard you asked for ships after the decision.",
    body: "Product Managers file a data request, the analyst writes SQL, the chart lands a week later. By then you've already shipped on vibes. The rest of the org builds its own private dashboards, and nobody agrees on the numbers.",
  },
  {
    stat: "3",
    unit: "hires per team",
    title: "Analysts, researchers, product ops — all billing for glue work.",
    body: "Orgs staff up entire functions just to turn raw signal into decisions. Most of that work is synthesis the LLM era should have collapsed by now. Budget-constrained teams just… skip it.",
  },
];

export function Problem() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="py-24 md:py-32 bg-[color:var(--color-background)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-primary)]">
            The problem
          </p>
          <h2
            id="problem-heading"
            className="mt-3 text-[36px] md:text-[48px] leading-[1.08] tracking-[-0.02em] text-[color:var(--color-foreground)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your customers are already telling you what to build.
            <span className="text-[color:var(--color-foreground-muted)]"> You just don't have time to listen.</span>
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {PROBLEMS.map((p) => (
            <article
              key={p.title}
              className="card-hover p-7 rounded-xl bg-[color:var(--color-surface)] border border-[color:var(--color-border)]"
            >
              <div className="flex items-baseline gap-2">
                <span
                  className="text-[44px] leading-none text-[color:var(--color-primary)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {p.stat}
                </span>
                <span className="text-[12px] text-[color:var(--color-foreground-muted)]">
                  {p.unit}
                </span>
              </div>
              <h3 className="mt-5 text-[17px] font-semibold text-[color:var(--color-foreground)] leading-snug">
                {p.title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-[color:var(--color-foreground-secondary)]">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
