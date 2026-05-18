"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { IntegrationMark } from "./ui/IntegrationMark";
import { INTEGRATIONS } from "@/lib/constants";

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const NARRATIVE_LINES = [
  "PMs spend 30–40% of their time on manual data work.",
  "Five tools open. Cross-referencing funnels. Watching recordings. Pulling reports.",
  "Conversion dropped on Tuesday. Found on Friday. Fix ships next sprint.",
  "10,000 sessions recorded. 50 reviewed. Your team acts on less than 5% of your data.",
  "The data was always there. Nobody had time to find it.",
];

const LINE_COUNT = NARRATIVE_LINES.length + 1; // +1 for punchline
const SEGMENT = 1 / LINE_COUNT;

const LINE_RANGES: [number, number][] = NARRATIVE_LINES.map((_, i) => [
  i * SEGMENT,
  (i + 1) * SEGMENT,
]);

const PUNCHLINE_RANGE: [number, number] = [
  NARRATIVE_LINES.length * SEGMENT,
  1,
];

type BGCard = {
  name: string;
  signal: string;
  detail: string;
  badge?: string;
  time: string;
  severity: "critical" | "warning" | "info";
  top: string;
  left: string;
  mobileTop?: string;
  mobileLeft?: string;
  rotation: number;
  driftDuration: number;
  driftAmount: number;
  highlightAtLines: number[];
};

const BG_CARDS: BGCard[] = [
  {
    name: "Mixpanel",
    signal: "Checkout funnel ↓19%",
    detail: "Drop at promo-apply step",
    badge: "1",
    time: "72h ago",
    severity: "critical",
    top: "8%",
    left: "2%",
    mobileTop: "2%",
    mobileLeft: "-4%",
    rotation: -3,
    driftDuration: 7,
    driftAmount: 5,
    highlightAtLines: [1, 2],
  },
  {
    name: "Sentry",
    signal: "TypeError spike — 142",
    detail: "discount.amount undefined",
    badge: "142",
    time: "72h ago",
    severity: "critical",
    top: "5%",
    left: "72%",
    mobileTop: "5%",
    mobileLeft: "62%",
    rotation: 2.5,
    driftDuration: 8,
    driftAmount: 4,
    highlightAtLines: [1, 2],
  },
  {
    name: "Zendesk",
    signal: "12 tickets — promo issue",
    detail: "Charged full price",
    badge: "12",
    time: "since Tue",
    severity: "warning",
    top: "44%",
    left: "-1%",
    mobileTop: "35%",
    mobileLeft: "-8%",
    rotation: 1.5,
    driftDuration: 9,
    driftAmount: 3,
    highlightAtLines: [1],
  },
  {
    name: "BigQuery",
    signal: "₹3.8L revenue variance",
    detail: "Totals diverging from expected",
    time: "unreviewed",
    severity: "info",
    top: "40%",
    left: "80%",
    mobileTop: "38%",
    mobileLeft: "68%",
    rotation: -1.5,
    driftDuration: 8,
    driftAmount: 4,
    highlightAtLines: [1, 3],
  },
  {
    name: "Granola",
    signal: "3 calls mention checkout",
    detail: "Enterprise flagging billing",
    badge: "3",
    time: "this week",
    severity: "info",
    top: "76%",
    left: "3%",
    mobileTop: "72%",
    mobileLeft: "-4%",
    rotation: 2,
    driftDuration: 10,
    driftAmount: 3,
    highlightAtLines: [1],
  },
  {
    name: "Hotjar",
    signal: "Rage clicks at checkout",
    detail: "47 sessions retrying promo",
    badge: "47",
    time: "3d",
    severity: "warning",
    top: "72%",
    left: "76%",
    mobileTop: "70%",
    mobileLeft: "64%",
    rotation: -2,
    driftDuration: 6,
    driftAmount: 5,
    highlightAtLines: [1, 3],
  },
];

const BG_CONNECTORS: [number, number][] = [
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [0, 1],
  [4, 5],
  [0, 3],
  [2, 5],
];

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */

function interpolateHighlight(
  progress: number,
  highlightAtLines: number[],
  base: number,
  peak: number,
) {
  const FADE = 0.02;
  for (const li of highlightAtLines) {
    if (li >= LINE_RANGES.length) continue;
    const [s, e] = LINE_RANGES[li];
    if (progress >= s + FADE && progress <= e - FADE) return peak;
    if (progress >= s && progress < s + FADE)
      return base + (peak - base) * ((progress - s) / FADE);
    if (progress > e - FADE && progress <= e)
      return peak - (peak - base) * ((progress - (e - FADE)) / FADE);
  }
  return base;
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════ */

export function Problem() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="problem" aria-labelledby="problem-heading">
      <h2 id="problem-heading" className="sr-only">
        The Problem
      </h2>

      {/* Desktop — scroll-driven narrative */}
      <div
        ref={containerRef}
        className="hidden md:block relative"
        style={reduce ? undefined : { height: "400vh" }}
      >
        {reduce ? (
          <ReducedMotionDesktop />
        ) : (
          <div className="sticky top-0 h-screen overflow-hidden">
            <DesktopBackground scrollYProgress={scrollYProgress} />
            <DesktopForeground scrollYProgress={scrollYProgress} />
          </div>
        )}
      </div>

      {/* Mobile — intersection-observer based */}
      <div className="md:hidden">
        <MobileLayout reduce={!!reduce} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DESKTOP — Background layer
   ═══════════════════════════════════════════════════════════════ */

function DesktopBackground({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/* Layered gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(232,100,15,0.04) 0%, transparent 70%)",
            "radial-gradient(ellipse 40% 40% at 15% 20%, rgba(232,100,15,0.03) 0%, transparent 60%)",
            "radial-gradient(ellipse 40% 40% at 85% 80%, rgba(255,160,122,0.03) 0%, transparent 60%)",
            "var(--color-background)",
          ].join(", "),
        }}
      />

      {/* Dot pattern */}
      <div className="absolute inset-0 dot-bg opacity-30 pointer-events-none" />

      {/* SVG connector lines with flowing animation */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="conn-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8640f" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#1a1a1a" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#e8640f" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        {BG_CONNECTORS.map(([a, b], i) => {
          const ca = BG_CARDS[a];
          const cb = BG_CARDS[b];
          const x1 = parseFloat(ca.left) + 7;
          const y1 = parseFloat(ca.top) + 4;
          const x2 = parseFloat(cb.left) + 7;
          const y2 = parseFloat(cb.top) + 4;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#conn-grad)"
              strokeWidth="0.15"
              strokeDasharray="0.6 1.8"
              style={{
                animation: `dash-flow ${10 + i * 2}s linear infinite`,
              }}
            />
          );
        })}
      </svg>

      {/* Floating tool cards */}
      {BG_CARDS.map((card, i) => (
        <FloatingBGCard
          key={card.name}
          card={card}
          index={i}
          scrollYProgress={scrollYProgress}
        />
      ))}

      {/* Center readability vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(250,249,246,0.85) 0%, rgba(250,249,246,0.4) 50%, transparent 80%)",
        }}
      />

      {/* Inline keyframes for flowing dash animation */}
      <style>{`
        @keyframes dash-flow {
          to { stroke-dashoffset: -24; }
        }
      `}</style>
    </div>
  );
}

function FloatingBGCard({
  card,
  index,
  scrollYProgress,
}: {
  card: BGCard;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const integ = INTEGRATIONS.find((it) => it.name === card.name);

  const opacity = useTransform(scrollYProgress, (p) =>
    interpolateHighlight(p, card.highlightAtLines, 0.22, 0.6),
  );

  const scale = useTransform(scrollYProgress, (p) =>
    interpolateHighlight(p, card.highlightAtLines, 1, 1.06),
  );

  return (
    <motion.div
      className="absolute w-[180px] lg:w-[210px]"
      style={{
        top: card.top,
        left: card.left,
        rotate: card.rotation,
        opacity,
        scale,
      }}
      animate={{ y: [0, -card.driftAmount, 0] }}
      transition={{
        y: {
          repeat: Infinity,
          repeatType: "mirror",
          duration: card.driftDuration,
          ease: "easeInOut",
          delay: index * 0.8,
        },
      }}
    >
      <ToolSignalCard
        name={card.name}
        signal={card.signal}
        detail={card.detail}
        badge={card.badge}
        time={card.time}
        severity={card.severity}
        color={integ?.color ?? "#7a7873"}
        slug={integ?.slug}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DESKTOP — Foreground layer (narrative text)
   ═══════════════════════════════════════════════════════════════ */

function DesktopForeground({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const labelOpacity = useTransform(
    scrollYProgress,
    [0, 0.01, PUNCHLINE_RANGE[0] - 0.02, PUNCHLINE_RANGE[0]],
    [0, 1, 1, 0],
  );

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 lg:px-8">
      <motion.p
        className="mb-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-primary)]"
        style={{ opacity: labelOpacity }}
      >
        The problem
      </motion.p>

      {/* All lines occupy the same grid cell — only one visible at a time */}
      <div
        className="w-full max-w-3xl"
        style={{ display: "grid", placeItems: "center" }}
      >
        {NARRATIVE_LINES.map((text, i) => (
          <ScrollLine
            key={i}
            text={text}
            range={LINE_RANGES[i]}
            scrollYProgress={scrollYProgress}
          />
        ))}
        <PunchlineLine scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}

function ScrollLine({
  text,
  range,
  scrollYProgress,
}: {
  text: string;
  range: [number, number];
  scrollYProgress: MotionValue<number>;
}) {
  const [start, end] = range;
  const fadeIn = 0.035;
  const fadeOut = 0.035;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + fadeIn, end - fadeOut, end],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    scrollYProgress,
    [start, start + fadeIn, end - fadeOut, end],
    [40, 0, 0, -30],
  );
  const blur = useTransform(scrollYProgress, (p) => {
    if (p < start) return "blur(4px)";
    if (p < start + fadeIn) {
      const t = (p - start) / fadeIn;
      return `blur(${4 * (1 - t)}px)`;
    }
    if (p <= end - fadeOut) return "blur(0px)";
    if (p <= end) {
      const t = (p - (end - fadeOut)) / fadeOut;
      return `blur(${4 * t}px)`;
    }
    return "blur(4px)";
  });

  return (
    <motion.p
      className="text-center text-[28px] lg:text-[40px] xl:text-[44px] leading-[1.18] tracking-[-0.02em] text-[color:var(--color-foreground)]"
      style={{
        gridRow: 1,
        gridColumn: 1,
        fontFamily: "var(--font-display)",
        opacity,
        y,
        filter: blur,
      }}
    >
      {text}
    </motion.p>
  );
}

function PunchlineLine({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const [start] = PUNCHLINE_RANGE;
  const fade = 0.045;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + fade],
    [0, 1],
  );
  const y = useTransform(scrollYProgress, [start, start + fade], [40, 0]);
  const scale = useTransform(
    scrollYProgress,
    [start, start + fade],
    [0.95, 1],
  );
  const blur = useTransform(scrollYProgress, (p) => {
    if (p < start) return "blur(6px)";
    if (p < start + fade) {
      const t = (p - start) / fade;
      return `blur(${6 * (1 - t)}px)`;
    }
    return "blur(0px)";
  });

  return (
    <motion.p
      className="text-center text-[26px] lg:text-[34px] xl:text-[38px] leading-[1.2] text-[color:var(--color-foreground)]"
      style={{
        gridRow: 1,
        gridColumn: 1,
        fontFamily: "var(--font-display)",
        opacity,
        y,
        scale,
        filter: blur,
      }}
    >
      We fix the{" "}
      <span className="italic text-[color:var(--color-primary)]">
        attention
      </span>{" "}
      problem, not the data problem.
    </motion.p>
  );
}

/* ═══════════════════════════════════════════════════════════════
   REDUCED-MOTION DESKTOP
   ═══════════════════════════════════════════════════════════════ */

function ReducedMotionDesktop() {
  return (
    <div className="py-20 md:py-32 max-w-3xl mx-auto px-6 lg:px-8">
      <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-primary)]">
        The problem
      </p>
      <div className="mt-8 space-y-8">
        {NARRATIVE_LINES.map((text, i) => (
          <p
            key={i}
            className="text-[24px] md:text-[32px] leading-[1.2] tracking-[-0.02em] text-[color:var(--color-foreground)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {text}
          </p>
        ))}
      </div>
      <p
        className="mt-14 text-center text-[24px] md:text-[30px] leading-snug text-[color:var(--color-foreground)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        We fix the{" "}
        <span className="italic text-[color:var(--color-primary)]">
          attention
        </span>{" "}
        problem, not the data problem.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE — intersection-observer, stacked lines
   ═══════════════════════════════════════════════════════════════ */

const MOBILE_CARD_INDICES = [0, 1, 4, 5];

function MobileLayout({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative py-16 sm:py-20 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(232,100,15,0.03) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 dot-bg opacity-20 pointer-events-none" />

      {/* Background cards */}
      {!reduce && (
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          {MOBILE_CARD_INDICES.map((ci, i) => {
            const card = BG_CARDS[ci];
            const integ = INTEGRATIONS.find((it) => it.name === card.name);
            return (
              <motion.div
                key={card.name}
                className="absolute w-[130px] sm:w-[150px] opacity-[0.12]"
                style={{
                  top: card.mobileTop ?? card.top,
                  left: card.mobileLeft ?? card.left,
                  rotate: card.rotation,
                }}
                animate={{ y: [0, -card.driftAmount, 0] }}
                transition={{
                  y: {
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: card.driftDuration,
                    ease: "easeInOut",
                    delay: i * 0.6,
                  },
                }}
              >
                <ToolSignalCard
                  name={card.name}
                  signal={card.signal}
                  detail={card.detail}
                  badge={card.badge}
                  time={card.time}
                  severity={card.severity}
                  color={integ?.color ?? "#7a7873"}
                  slug={integ?.slug}
                />
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="relative z-10 max-w-lg mx-auto px-6">
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-primary)] text-center"
        >
          The problem
        </motion.p>

        <div className="mt-8 space-y-10">
          {NARRATIVE_LINES.map((text, i) => (
            <motion.p
              key={i}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.65,
                delay: 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[20px] sm:text-[24px] leading-[1.25] tracking-[-0.01em] text-[color:var(--color-foreground)] text-center"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 text-center text-[18px] sm:text-[22px] leading-snug text-[color:var(--color-foreground)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          We fix the{" "}
          <span className="italic text-[color:var(--color-primary)]">
            attention
          </span>{" "}
          problem, not the data problem.
        </motion.p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SHARED — ToolSignalCard
   ═══════════════════════════════════════════════════════════════ */

function ToolSignalCard({
  name,
  signal,
  detail,
  badge,
  time,
  severity,
  color,
  slug,
}: {
  name: string;
  signal: string;
  detail: string;
  badge?: string;
  time: string;
  severity: "critical" | "warning" | "info";
  color: string;
  slug?: string | null;
}) {
  return (
    <div className="relative rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-3 shadow-[0_8px_30px_-12px_rgba(26,26,26,0.18)]">
      {badge && (
        <span
          className={`absolute -top-2 -right-2 z-10 flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-white text-[9px] font-bold tabular-nums shadow-sm ${
            severity === "critical"
              ? "bg-red-500"
              : severity === "warning"
                ? "bg-amber-500"
                : "bg-blue-500"
          }`}
        >
          {badge}
        </span>
      )}

      <div className="flex items-center gap-2">
        <IntegrationMark name={name} color={color} slug={slug} size={22} />
        <span className="text-[11.5px] font-semibold text-[color:var(--color-foreground)] truncate flex-1">
          {name}
        </span>
        <span className="text-[9px] text-[color:var(--color-foreground-muted)] font-mono shrink-0 opacity-60">
          {time}
        </span>
      </div>

      <div className="mt-2">
        <p
          className={`text-[11px] font-semibold leading-snug ${
            severity === "critical"
              ? "text-red-600"
              : severity === "warning"
                ? "text-amber-700"
                : "text-[color:var(--color-foreground-secondary)]"
          }`}
        >
          {signal}
        </p>
        <p className="mt-0.5 text-[10px] text-[color:var(--color-foreground-muted)] leading-snug line-clamp-1">
          {detail}
        </p>
      </div>
    </div>
  );
}
