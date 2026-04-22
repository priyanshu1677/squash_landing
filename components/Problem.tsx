// Names the pain in the PM's own voice. Three cards = three hires the
// org won't need once Squash is in place. Copy is first-person to make
// it scan as testimonial-adjacent — a confidence move, not bragging.
const PROBLEMS = [
  {
    label: "The signal is right there",
    title: "The answer is already in your tools. Nobody has time to read it.",
    body: "Rage clicks in session recordings. Tickets naming the same bug. Feature requests from accounts about to churn. The signal is right there, just sitting in tools and never pulled into a single conversation.",
  },
  {
    label: "Scattered context",
    title: "Your product context is scattered across your stack.",
    body: "Session replays in PostHog. Tickets in Zendesk. ARR in Salesforce. Experiments in Mixpanel. Specs in Notion. The story that should decide your roadmap lives in the seams between them, and nobody keeps seven tabs open to piece it together.",
  },
  {
    label: "Waiting on the analyst",
    title: "Every chart waits on the analyst. Every RCA waits on you.",
    body: "Need conversion cut by platform? File a request, wait a week for SQL. Need to know why a metric moved? Block your afternoon, start clicking through dashboards and session replays. The decision ships on gut before the evidence catches up.",
  },
];

export function Problem() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="py-16 sm:py-20 md:py-32 bg-[color:var(--color-background)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-primary)]">
            The problem
          </p>
          <h2
            id="problem-heading"
            className="mt-3 text-[30px] sm:text-[36px] md:text-[48px] leading-[1.1] tracking-[-0.02em] text-[color:var(--color-foreground)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your customers are already telling you what to build.
            <span className="text-[color:var(--color-foreground-muted)]"> You just don't have time to listen.</span>
          </h2>
        </div>

        <div className="mt-10 md:mt-12 grid md:grid-cols-3 gap-4 sm:gap-5">
          {PROBLEMS.map((p) => (
            <article
              key={p.title}
              className="card-hover p-6 sm:p-7 rounded-xl bg-[color:var(--color-surface)] border border-[color:var(--color-border)]"
            >
              <div
                className="text-[26px] sm:text-[32px] leading-[1.1] text-[color:var(--color-primary)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {p.label}
              </div>
              <h3 className="mt-4 sm:mt-5 text-[16px] sm:text-[17px] font-semibold text-[color:var(--color-foreground)] leading-snug">
                {p.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] sm:text-[14px] leading-relaxed text-[color:var(--color-foreground-secondary)]">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
