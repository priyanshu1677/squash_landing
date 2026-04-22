// ─────────────────────────────────────────────────────────────
// Shared constants and content for the landing page.
// Keeping copy in one place makes it easy for marketing to iterate.
// ─────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Product", href: "#solution" },
  { label: "Use cases", href: "#use-cases" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Integrations", href: "#integrations" },
  { label: "FAQ", href: "#faq" },
];

// Every integration shown in the Squash product (per the screenshot).
// Grouped by category so we can render labeled sections if needed.
// `slug` matches a Simple Icons brand slug (https://simpleicons.org/) when
// available; falsy means we fall back to a colored letter monogram.
export const INTEGRATIONS = [
  { name: "Mixpanel", category: "Analytics", color: "#7856FF", slug: "mixpanel" },
  { name: "PostHog", category: "Analytics", color: "#1D4AFF", slug: "posthog" },
  { name: "Google Analytics", category: "Analytics", color: "#E37400", slug: "googleanalytics" },
  { name: "Zendesk", category: "Support", color: "#03363D", slug: "zendesk" },
  { name: "Intercom", category: "Support", color: "#1F8DED", slug: "intercom" },
  { name: "Salesforce", category: "CRM", color: "#00A1E0", slug: "salesforce" },
  { name: "Jira", category: "Issues", color: "#0052CC", slug: "jira" },
  { name: "Linear", category: "Issues", color: "#5E6AD2", slug: "linear" },
  { name: "Notion", category: "Docs", color: "#191919", slug: "notion" },
  { name: "Confluence", category: "Docs", color: "#0052CC", slug: "confluence" },
  { name: "Slack", category: "Comms", color: "#4A154B", slug: "slack" },
  { name: "Gmail", category: "Comms", color: "#EA4335", slug: "gmail" },
  { name: "Google Calendar", category: "Comms", color: "#4285F4", slug: "googlecalendar" },
  { name: "Google Docs", category: "Docs", color: "#1A73E8", slug: "googledocs" },
  { name: "Google Sheets", category: "Data", color: "#0F9D58", slug: "googlesheets" },
  { name: "Google Drive", category: "Docs", color: "#4285F4", slug: "googledrive" },
  { name: "BigQuery", category: "Data", color: "#4285F4", slug: "googlebigquery" },
  { name: "PostgreSQL", category: "Data", color: "#336791", slug: "postgresql" },
  { name: "Metabase", category: "Data", color: "#509EE3", slug: "metabase" },
  { name: "Firecrawl", category: "Research", color: "#FF6B35", slug: "firecrawl" },
  { name: "Granola", category: "Meetings", color: "#F4A340", slug: "granola" },
  { name: "SigNoz", category: "Observability", color: "#E75B36", slug: "signoz" },
  { name: "OpenAI", category: "Model", color: "#10A37F", slug: "openai" },
  { name: "Anthropic", category: "Model", color: "#D97706", slug: "anthropic" },
];

// Four pillars — map to the solution bullets in the brief.
export const SOLUTION_PILLARS = [
  {
    eyebrow: "Synthesize",
    title: "Read every ticket. Surface the pattern.",
    body: "Squash processes your entire support inbox, session recordings, and NPS data, then tells you the top insights about your users. Every claim traces back to the source.",
    href: "#feature-synthesize",
  },
  {
    eyebrow: "Analyze",
    title: "Ask your data in plain English.",
    body: "No more waiting on analysts. Ask metric or pattern that you want to check and Squash writes the SQL, runs it against your data warehouse tool, and hands you with visually interactive charts and graphs.",
    href: "#feature-analyze",
  },
  {
    eyebrow: "Detect",
    title: "Bugs and friction, before they escalate.",
    body: "Squash watches real sessions and flags regressions, rage clicks, and dead ends the moment they appear. Your team gets a Slack ping instead of a Monday-morning fire drill.",
    href: "#feature-detect",
  },
  {
    eyebrow: "Ship",
    title: "Draft PRDs and tickets grounded in real signal.",
    body: "Create context aware PRDs, one-pagers and jira tickets that feels like human. Every spec links to the tickets and data that justify it.",
    href: "#feature-ship",
  },
];

export const FEATURES = [
  {
    title: "Feedback synthesis",
    body: "Cluster 500 tickets into 5 themes, ranked by what's actually hurting revenue and retention. Every theme traces back to the source tickets.",
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
    body: "Squash files the Jira, updates the Linear cycle, schedules the sync, and drafts the customer email. Not suggestions, actual work.",
    tag: "Jira · Linear · Gmail · Slack",
  },
  {
    title: "Source-cited answers",
    body: "Every answer cites the source: ticket #, session ID, SQL query, Notion doc. Investors and execs can audit your decisions.",
    tag: "Trust · Auditability",
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Connect your stack",
    body: "OAuth into your tickets, analytics warehouse, session replay, and docs. Squash uses least-privilege scopes and is read-only by default.",
  },
  {
    step: "02",
    title: "Ask like you're talking to a teammate",
    body: "One chat interface across your entire product stack. 'Why is Android conversion down?' or 'Draft a PRD for the refund retry flow.' Squash handles the rest.",
  },
  {
    step: "03",
    title: "Ship with confidence",
    body: "Get the insight, chart, or draft you need, backed by actual user signal. File the Jira, schedule the review, move the roadmap.",
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
    body: "When Squash ships a feature from a ticket cluster, it auto-drafts the follow-up email to every customer in the cluster.",
  },
];

export const FAQS = [
  {
    q: "What is Squash?",
    a: "Squash is a decision-making interface built for Product Managers. It connects to your tools (tickets, session replays, analytics warehouses, docs) and turns them into prioritized insights, charts, PRDs, and specs on demand.",
  },
  {
    q: "Who is Squash for?",
    a: "Squash is built for Product Managers, Heads of Product, and product decision makers at SaaS and consumer tech companies. Product Ops and early-stage founders who wear the PM hat also use it to move faster without hiring analysts or research teams.",
  },
  {
    q: "How does Squash replace data analysts and product ops?",
    a: "Squash runs SQL against your warehouse, builds charts, and clusters support tickets in minutes. That's work that previously required a data analyst or a product ops team. PMs ask in plain English; Squash writes the query, builds the visualization, and summarizes the result.",
  },
  {
    q: "What tools does Squash integrate with?",
    a: "Squash integrates with 24+ tools including Jira, Linear, Zendesk, Intercom, Salesforce, Mixpanel, PostHog, Google Analytics, BigQuery, PostgreSQL, Metabase, Notion, Confluence, Slack, Gmail, Google Calendar, Google Docs, Google Drive, Firecrawl, Granola, and SigNoz. You can also bring your own OpenAI or Anthropic API keys.",
  },
  {
    q: "How is Squash different from ChatGPT or Claude?",
    a: "General-purpose AI doesn't know your users. Squash works inside your product context: your tickets, your sessions, your data warehouse, your Jira backlog. Answers cite real tickets, real users, and real queries, not generic patterns.",
  },
  {
    q: "Does Squash write PRDs and specs?",
    a: "Yes. Squash drafts PRDs, user stories, feature specs, and competitive analyses based on your actual product context and user feedback. Every claim links back to the source ticket, session, or data query.",
  },
  {
    q: "Is my data secure?",
    a: "Your data stays in your workspace. We never train models on your data, and all integrations use least-privilege OAuth scopes with read-only access by default.",
  },
  {
    q: "How long does it take to set up?",
    a: "Most teams are running their first query within 10 minutes. Connect one integration, ask a question, get an answer. Full coverage across your stack typically takes a week.",
  },
];
