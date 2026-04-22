import type { Metadata } from "next";
import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ─────────────────────────────────────────────────────────────
// FONTS — distinctive editorial pairing
//   Instrument Serif:  hero display, section headings (Cambria-like)
//   Geist Sans:        body text (more character than Inter)
//   Geist Mono:        chat prompts and code
// ─────────────────────────────────────────────────────────────
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// ─────────────────────────────────────────────────────────────
// SEO METADATA — optimized for "AI for product managers" intent
// ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://heysquash.com"),
  title: {
    default: "Squash · AI for Product Managers | Stop building on gut",
    template: "%s | Squash",
  },
  description:
    "Squash is the decision layer for Product Managers. Synthesize tickets, sessions, and analytics in plain English. Ship PRDs, dashboards, and specs backed by real user signal.",
  keywords: [
    "AI for product managers",
    "product management AI",
    "user feedback synthesis",
    "product analytics AI",
    "PM copilot",
    "AI PRD generator",
    "session replay analysis",
    "product decision intelligence",
    "Jira AI",
    "Linear AI",
  ],
  authors: [{ name: "Squash" }],
  creator: "Squash",
  publisher: "Squash",
  alternates: { canonical: "https://heysquash.com" },
  openGraph: {
    type: "website",
    url: "https://heysquash.com",
    siteName: "Squash",
    title: "Squash · AI for Product Managers",
    description:
      "The decision layer for PMs. Turn tickets, sessions, and analytics into a prioritized roadmap.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Squash · AI for Product Managers",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Squash · AI for Product Managers",
    description:
      "Stop building on gut. Ship products your users actually want, backed by real signal.",
    images: ["/og-image.png"],
    creator: "@squash",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  category: "technology",
};

// ─────────────────────────────────────────────────────────────
// JSON-LD STRUCTURED DATA
//   - SoftwareApplication: signals product category to Google & LLMs
//   - Organization:        author/publisher knowledge graph
//   - FAQPage:             powers rich results + AI answer quoting
// ─────────────────────────────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Squash",
  url: "https://heysquash.com",
  logo: "https://heysquash.com/logo.png",
  description:
    "Squash is the decision layer for Product Managers, synthesizing user feedback, analytics, and sessions into actionable product decisions.",
  sameAs: [
    "https://twitter.com/squash",
    "https://linkedin.com/company/squash",
    "https://github.com/squash",
  ],
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Squash",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Decision-making interface for Product Managers. Synthesize user feedback, generate analytics in natural language, detect bugs in real sessions, and draft PRDs based on your product context.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free tier available. Paid plans start at $29/user/month.",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "127",
  },
  featureList: [
    "User feedback synthesis across Zendesk, Intercom, Salesforce",
    "Natural language analytics over BigQuery, PostgreSQL, Mixpanel, PostHog",
    "Automatic bug and friction detection from session recordings",
    "AI-generated PRDs, specs, and user stories",
    "Integration with Jira, Linear, Notion, Confluence, Slack",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Squash?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Squash is a decision-making interface built for Product Managers. It connects to your tools (tickets, session replays, analytics warehouses, docs) and turns them into prioritized insights, charts, PRDs, and specs on demand.",
      },
    },
    {
      "@type": "Question",
      name: "Who is Squash for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Squash is built for Product Managers, Heads of Product, and product decision makers at SaaS and consumer tech companies. Product Ops and early-stage founders who wear the PM hat also use it to move faster without hiring analysts or research teams.",
      },
    },
    {
      "@type": "Question",
      name: "How does Squash replace data analysts and product ops?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Squash runs SQL against your warehouse, builds charts, and clusters support tickets in minutes. That's work that previously required a data analyst or a product ops team. PMs ask in plain English; Squash writes the query, builds the visualization, and summarizes the result.",
      },
    },
    {
      "@type": "Question",
      name: "What tools does Squash integrate with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Squash integrates with Jira, Linear, Zendesk, Intercom, Salesforce, Mixpanel, PostHog, Google Analytics, BigQuery, PostgreSQL, Metabase, Notion, Confluence, Slack, Gmail, Google Calendar, Google Docs, Google Drive, Firecrawl, Granola, and SigNoz. You can also bring your own OpenAI or Anthropic API keys.",
      },
    },
    {
      "@type": "Question",
      name: "How is Squash different from ChatGPT or Claude?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "General-purpose AI doesn't know your users. Squash works inside your product context: your tickets, your sessions, your data warehouse, your Jira backlog. Answers cite real tickets, real users, and real queries, not generic patterns.",
      },
    },
    {
      "@type": "Question",
      name: "Does Squash write PRDs and specs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Squash drafts PRDs, user stories, feature specs, and competitive analyses based on your actual product context and user feedback. Every claim links back to the source ticket, session, or data query.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your data stays in your workspace. We never train models on your data, and all integrations use least-privilege OAuth scopes with read-only access by default.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to set up?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most teams are running their first query within 10 minutes. Connect one integration, ask a question, get an answer. Full coverage across your stack typically takes a week.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
