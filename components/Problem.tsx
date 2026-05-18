"use client";

import { motion, useReducedMotion } from "framer-motion";
import { IntegrationMark } from "./ui/IntegrationMark";
import { INTEGRATIONS } from "@/lib/constants";

// Problem section — recreates the pitch deck's "scattered tools" visual.
// Six tool cards float on a faint dashed-line constellation, conveying
// the core pain: every signal exists, none of it is stitched together.

type ToolCard = {
  name: string;
  label: string;
  // Position on a 1000x520 SVG canvas (desktop only — mobile falls to grid)
  x: number;
  y: number;
  rotation: number;
};

const TOOL_CARDS: ToolCard[] = [
  { name: "Zendesk", label: "Support tickets", x: 60, y: 60, rotation: -2 },
  { name: "Hotjar", label: "Session replays", x: 580, y: 30, rotation: 1 },
  { name: "Mixpanel", label: "Event analytics", x: 760, y: 320, rotation: -1 },
  { name: "Dynatrace", label: "Observability", x: 100, y: 340, rotation: 1.5 },
  { name: "Greylabs AI", label: "Customer calls", x: 340, y: 180, rotation: 0 },
  { name: "BigQuery", label: "Business data", x: 600, y: 340, rotation: -1 },
];

// Dashed connector lines between scattered cards — visualises the gap
// nobody has time to bridge.
const CONNECTORS: Array<[number, number]> = [
  [0, 1], [0, 4], [1, 2], [1, 4], [2, 5], [3, 4], [4, 5], [3, 0], [2, 4],
];

export function Problem() {
  const reduce = useReducedMotion();

  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="relative py-16 sm:py-20 md:py-32 bg-[color:var(--color-background)] overflow-hidden"
    >
      <div className="absolute inset-0 dot-bg opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-primary)]">
            The problem
          </p>
          <h2
            id="problem-heading"
            className="mt-3 text-[30px] sm:text-[36px] md:text-[48px] leading-[1.1] tracking-[-0.02em] text-[color:var(--color-foreground)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Insight is scattered across
            <span className="italic text-[color:var(--color-primary)]"> multiple tools.</span>
            <br />
            Nobody has time to{" "}
            <span className="italic text-[color:var(--color-primary)]">stitch it together.</span>
          </h2>
        </div>

        {/* Scattered tools constellation (desktop) */}
        <div className="hidden md:block relative mt-14 mx-auto" style={{ maxWidth: 1000 }}>
          <div className="relative" style={{ paddingBottom: "52%" }}>
            {/* Connector lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1000 520"
              fill="none"
              aria-hidden="true"
            >
              {CONNECTORS.map(([a, b], i) => {
                const ax = TOOL_CARDS[a].x + 110;
                const ay = TOOL_CARDS[a].y + 40;
                const bx = TOOL_CARDS[b].x + 110;
                const by = TOOL_CARDS[b].y + 40;
                return (
                  <motion.line
                    key={`${a}-${b}`}
                    x1={ax}
                    y1={ay}
                    x2={bx}
                    y2={by}
                    stroke="#1a1a1a"
                    strokeOpacity="0.12"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                    initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.7 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.9,
                      delay: 0.1 + i * 0.08,
                      ease: "easeOut",
                    }}
                  />
                );
              })}
            </svg>

            {/* Tool cards */}
            {TOOL_CARDS.map((card, i) => {
              const integ = INTEGRATIONS.find((it) => it.name === card.name);
              return (
                <motion.div
                  key={card.name}
                  initial={reduce ? false : { opacity: 0, y: 16, rotate: 0 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotate: card.rotation,
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.55,
                    delay: 0.15 + i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute"
                  style={{
                    left: `${(card.x / 1000) * 100}%`,
                    top: `${(card.y / 520) * 100}%`,
                    width: "220px",
                  }}
                >
                  <ToolPreviewCard
                    name={card.name}
                    label={card.label}
                    color={integ?.color ?? "#7a7873"}
                    slug={integ?.slug}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile fallback — simple grid */}
        <div className="md:hidden mt-10 grid grid-cols-2 gap-3">
          {TOOL_CARDS.map((card) => {
            const integ = INTEGRATIONS.find((it) => it.name === card.name);
            return (
              <ToolPreviewCard
                key={card.name}
                name={card.name}
                label={card.label}
                color={integ?.color ?? "#7a7873"}
                slug={integ?.slug}
              />
            );
          })}
        </div>

        {/* Three stats */}
        <div className="mt-14 md:mt-16 grid md:grid-cols-3 gap-4 sm:gap-5">
          {[
            {
              stat: "30–40%",
              body: "of a PM's week disappears into manual data work: clicking through dashboards, watching replays, pulling reports.",
            },
            {
              stat: "Tuesday → Friday",
              body: "A funnel breaks on Tuesday. The team notices on Friday. The fix ships next sprint. The signal was always there.",
            },
            {
              stat: "< 1%",
              body: "of the user data sitting in your product stack ever gets reviewed by a human. The rest is invisible.",
            },
          ].map((s, i) => (
            <motion.article
              key={i}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-hover p-6 sm:p-7 rounded-xl bg-[color:var(--color-surface)] border border-[color:var(--color-border)]"
            >
              <div
                className="text-[26px] sm:text-[32px] leading-[1.05] text-[color:var(--color-primary)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.stat}
              </div>
              <p className="mt-3 text-[14px] sm:text-[14.5px] leading-relaxed text-[color:var(--color-foreground-secondary)]">
                {s.body}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Closing italic line — the core insight */}
        <p
          className="mt-12 md:mt-16 text-center text-[20px] sm:text-[24px] md:text-[30px] leading-snug text-[color:var(--color-foreground)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          We fix the{" "}
          <span className="italic text-[color:var(--color-primary)]">
            attention problem
          </span>
          , not the data problem.
        </p>
      </div>
    </section>
  );
}

// Tool card used both in the constellation and the mobile fallback grid.
// Includes a tiny abstract preview to convey "this tool contains real signal".
function ToolPreviewCard({
  name,
  label,
  color,
  slug,
}: {
  name: string;
  label: string;
  color: string;
  slug?: string | null;
}) {
  return (
    <div className="rounded-xl border border-[color:var(--color-border)] bg-white p-3.5 shadow-[0_8px_24px_-16px_rgba(26,26,26,0.16)]">
      <div className="flex items-center gap-2.5">
        <IntegrationMark name={name} color={color} slug={slug} size={28} />
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-[color:var(--color-foreground)] truncate">
            {name}
          </p>
          <p className="text-[10.5px] uppercase tracking-[0.08em] text-[color:var(--color-foreground-muted)] font-semibold">
            {label}
          </p>
        </div>
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="h-1.5 w-full rounded-full bg-[color:var(--color-background-secondary)] overflow-hidden">
          <div className="h-full w-2/3 bg-[color:var(--color-border)] rounded-full" />
        </div>
        <div className="h-1.5 w-3/4 rounded-full bg-[color:var(--color-background-secondary)]" />
        <div className="h-1.5 w-1/2 rounded-full bg-[color:var(--color-background-secondary)]" />
      </div>
    </div>
  );
}
