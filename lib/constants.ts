// ─────────────────────────────────────────────────────────────
// Shared constants and content for the landing page.
// Keeping copy in one place makes it easy for marketing to iterate.
// ─────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Product", href: "#solution" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Integrations", href: "#integrations" },
  { label: "FAQ", href: "#faq" },
];

// Every integration shown in the Squash product (per the screenshot).
// Grouped by category so we can render labeled sections if needed.
export const INTEGRATIONS = [
  { name: "Mixpanel", category: "Analytics", color: "#7856FF" },
  { name: "PostHog", category: "Analytics", color: "#1D4AFF" },
  { name: "Google Analytics", category: "Analytics", color: "#E37400" },
  { name: "Zendesk", category: "Support", color: "#03363D" },
  { name: "Intercom", category: "Support", color: "#1F8DED" },
  { name: "Salesforce", category: "CRM", color: "#00A1E0" },
  { name: "Jira", category: "Issues", color: "#0052CC" },
  { name: "Linear", category: "Issues", color: "#5E6AD2" },
  { name: "Notion", category: "Docs", color: "#191919" },
  { name: "Confluence", category: "Docs", color: "#0052CC" },
  { name: "Slack", category: "Comms", color: "#4A154B" },
  { name: "Gmail", category: "Comms", color: "#EA4335" },
  { name: "Google Calendar", category: "Comms", color: "#4285F4" },
  { name: "Google Docs", category: "Docs", color: "#1A73E8" },
  { name: "Google Sheets", category: "Data", color: "#0F9D58" },
  { name: "Google Drive", category: "Docs", color: "#4285F4" },
  { name: "BigQuery", category: "Data", color: "#4285F4" },
  { name: "PostgreSQL", category: "Data", color: "#336791" },
  { name: "Metabase", category: "Data", color: "#509EE3" },
  { name: "Firecrawl", category: "Research", color: "#FF6B35" },
  { name: "Granola", category: "Meetings", color: "#F4A340" },
  { name: "SigNoz", category: "Observability", color: "#E75B36" },
  { name: "OpenAI", category: "Model", color: "#10A37F" },
  { name: "Anthropic", category: "Model", color: "#D97706" },
];

// Four pillars — map to the solution bullets in the brief.
export const SOLUTION_PILLARS = [
  {
    eyebrow: "Synthesize",
    title: "Read every ticket. Surface the pattern.",
    body: "Squash processes your entire support inbox, session recordings, and NPS data — and tells you the top three things hurting retention this week, with every claim traced to the source.",
    href: "#feature-synthesize",
  },
  {
    eyebrow: "Analyze",
    title: "Ask your data in plain English.",
    body: "No more waiting on analysts. Type 'conversion by channel last 30 days, Android only' and Squash writes the SQL, runs it against BigQuery or Postgres, and hands you the chart.",
    href: "#feature-analyze",
  },
  {
    eyebrow: "Detect",
    title: "Bugs and friction, before they escalate.",
    body: "Squash watches real sessions and flags regressions, rage clicks, and dead ends the moment they appear. Your team gets a Slack ping — not a Monday-morning fire drill.",
    href: "#feature-detect",
  },
  {
    eyebrow: "Ship",
    title: "Draft PRDs grounded in real signal.",
    body: "Turn a synthesized insight into a PRD, user story, or competitive analysis in one click. Every spec links to the tickets and data that justify it.",
    href: "#feature-ship",
  },
];

export const FEATURES = [
  {
    title: "Feedback synthesis",
    body: "Cluster 500 tickets into 5 themes ranked by revenue impact, churn signal, and urgency. Traces back to every source ticket.",
    tag: "Zendesk · Intercom · Salesforce",
  },
  {
    title: "Natural-language analytics",
    body: "Ask questions, get charts. Squash runs SQL against your warehouse, builds funnels in Mixpanel, and summarizes the result.",
    tag: "BigQuery · Postgres · Mixpanel · PostHog",
  },
  {
    title: "Session intelligence",
    body: "Automatic detection of rage clicks, dead ends, and user-reported bugs in real sessions. Slack and email alerts the same hour.",
    tag: "Session replay · Anomaly detection",
  },
  {
    title: "PRD + spec drafting",
    body: "Generate PRDs, user stories, acceptance criteria, and competitive teardowns grounded in your product context.",
    tag: "Notion · Confluence · Google Docs",
  },
  {
    title: "Action layer",
    body: "Squash doesn't just suggest — it files the Jira, updates the Linear cycle, schedules the sync, and drafts the customer email.",
    tag: "Jira · Linear · Gmail · Slack",
  },
  {
    title: "Grounded citations",
    body: "Every answer cites the source: ticket #, session ID, SQL query, Notion doc. Investors and execs can audit your decisions.",
    tag: "Trust · Auditability",
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Connect your stack",
    body: "OAuth into your tickets, analytics warehouse, session replay, and docs. Squash respects least-privilege scopes — read-only by default.",
  },
  {
    step: "02",
    title: "Ask in plain English",
    body: "One chat interface across your entire product stack. 'Why is Android conversion down?' or 'Draft a PRD for the refund retry flow.' Squash handles the rest.",
  },
  {
    step: "03",
    title: "Ship with confidence",
    body: "Get synthesized insights, charts, and drafts — grounded in real user signal. File the Jira, schedule the review, move the roadmap.",
  },
];

export const USE_CASES = [
  {
    persona: "For PMs",
    title: "Weekly synthesis in 10 minutes",
    body: "Monday morning: 'What are the top three pain points from last week's tickets?' Squash returns a ranked list, with ticket links and a draft Slack update for the team.",
  },
  {
    persona: "For Heads of Product",
    title: "Investor-ready roadmap updates",
    body: "Pull the evidence behind every bet in your roadmap. Every feature links to the tickets, queries, and sessions that justified it.",
  },
  {
    persona: "For Founders",
    title: "Your first analyst, product ops, and researcher",
    body: "Pre-series-A teams use Squash instead of hiring three specialists. Ask once, get the SQL, the chart, the synthesis, and the follow-up ticket.",
  },
  {
    persona: "For Product Ops",
    title: "Close the loop on every feature request",
    body: "When Squash ships a feature from a ticket cluster, it auto-drafts the 'we heard you' email to every customer in the cluster.",
  },
];

export const FAQS = [
  {
    q: "What is Squash?",
    a: "Squash is an AI decision-making interface built for Product Managers. It connects to your tools — tickets, session replays, analytics warehouses, and docs — and synthesizes them into prioritized insights, charts, PRDs, and specs on demand.",
  },
  {
    q: "Who is Squash for?",
    a: "Squash is built for Product Managers, Heads of Product, and product decision makers at SaaS and consumer tech companies. Product Ops and early-stage founders who wear the PM hat also use it to move faster without hiring analysts or research teams.",
  },
  {
    q: "How does Squash replace data analysts and product ops?",
    a: "Squash runs SQL against your warehouse, builds charts, and synthesizes support tickets in minutes — work that previously required a data analyst or a product ops team. PMs ask in plain English; Squash writes the query, builds the visualization, and summarizes the signal.",
  },
  {
    q: "What tools does Squash integrate with?",
    a: "Squash integrates with 24+ tools including Jira, Linear, Zendesk, Intercom, Salesforce, Mixpanel, PostHog, Google Analytics, BigQuery, PostgreSQL, Metabase, Notion, Confluence, Slack, Gmail, Google Calendar, Google Docs, Google Drive, Firecrawl, Granola, and SigNoz. You can also bring your own OpenAI or Anthropic API keys.",
  },
  {
    q: "How is Squash different from ChatGPT or Claude?",
    a: "General-purpose AI doesn't know your users. Squash is grounded in your product context — your tickets, your sessions, your data warehouse, your Jira backlog. Answers cite real tickets, real users, and real queries, not generic patterns.",
  },
  {
    q: "Does Squash write PRDs and specs?",
    a: "Yes. Squash drafts PRDs, user stories, feature specs, and competitive analyses grounded in your actual product context and user feedback. Every claim links back to the source ticket, session, or data query.",
  },
  {
    q: "Is my data secure?",
    a: "Squash is SOC 2 Type II compliant. Your data stays in your workspace — we never train models on your data, and all integrations use least-privilege OAuth scopes with read-only access by default.",
  },
  {
    q: "How long does it take to set up?",
    a: "Most teams are running their first query within 10 minutes. Connect one integration, ask a question, get an answer. Full coverage across your stack typically takes a week.",
  },
];
