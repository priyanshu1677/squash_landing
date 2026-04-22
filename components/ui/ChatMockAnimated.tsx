"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IntegrationMark } from "./IntegrationMark";
import { USE_CASES, type ChartSpec, type UseCase } from "./chatMockData";

const STEP_DONE = 9;
const PROMPT_TYPE_MS = 1300;

const SCHEDULE: Array<[step: number, at: number]> = [
  [2, 1400],
  [3, 1800],
  [4, 2200],
  [5, 2600],
  [6, 3200],
  [7, 4000],
  [8, 4800],
  [9, 6000],
];

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ChatMockAnimated() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [phase, setPhase] = useState<number>(STEP_DONE);
  const [charCount, setCharCount] = useState<number>(USE_CASES[0].prompt.length);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const rafRef = useRef<number | null>(null);
  const hasPlayedRef = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const useCase = USE_CASES[activeIdx];

  const clearAll = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const playSequence = useCallback(
    (uc: UseCase) => {
      clearAll();
      if (prefersReducedMotion()) {
        setPhase(STEP_DONE);
        setCharCount(uc.prompt.length);
        return;
      }
      setPhase(1);
      setCharCount(0);

      // Prompt typing via rAF
      const start = performance.now();
      const total = uc.prompt.length;
      const tick = (now: number) => {
        const elapsed = now - start;
        const count = Math.min(total, Math.ceil((elapsed / PROMPT_TYPE_MS) * total));
        setCharCount(count);
        if (count < total) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          rafRef.current = null;
        }
      };
      rafRef.current = requestAnimationFrame(tick);

      // Stagger the rest
      SCHEDULE.forEach(([step, at]) => {
        timersRef.current.push(setTimeout(() => setPhase(step), at));
      });
    },
    [clearAll]
  );

  // First-view autoplay via IntersectionObserver
  useEffect(() => {
    if (prefersReducedMotion()) {
      setPhase(STEP_DONE);
      setCharCount(USE_CASES[0].prompt.length);
      return;
    }
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasPlayedRef.current) {
            hasPlayedRef.current = true;
            playSequence(USE_CASES[0]);
            io.disconnect();
          }
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearAll();
    };
  }, [clearAll, playSequence]);

  const handleTabClick = (i: number) => {
    if (i === activeIdx) return;
    clearAll();
    setActiveIdx(i);
    hasPlayedRef.current = true;
    if (prefersReducedMotion()) {
      setPhase(STEP_DONE);
      setCharCount(USE_CASES[i].prompt.length);
      return;
    }
    // Rewind synchronously so the new tab's content never flashes fully revealed
    setPhase(0);
    setCharCount(0);
    // Defer sequence kickoff to next microtask so state settles
    queueMicrotask(() => playSequence(USE_CASES[i]));
  };

  const show = {
    prompt: phase >= 1,
    tool1: phase >= 2,
    tool2: phase >= 3,
    tool3: phase >= 4,
    tool4: phase >= 5,
    allToolsDone: phase >= 5,
    summary: phase >= 6,
    metrics: phase >= 7,
    chart: phase >= 8,
    output: phase >= 9,
  };

  const toolRevealed = [show.tool1, show.tool2, show.tool3, show.tool4];

  return (
    <div ref={rootRef}>
      {/* Tabs */}
      <div role="tablist" aria-label="Squash demo scenarios" className="flex flex-wrap gap-2 mb-3">
        {USE_CASES.map((uc, i) => {
          const active = i === activeIdx;
          return (
            <button
              key={uc.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => handleTabClick(i)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium border transition-colors ${
                active
                  ? "bg-[color:var(--color-primary)] text-white border-[color:var(--color-primary)]"
                  : "bg-white text-[color:var(--color-foreground-secondary)] border-[color:var(--color-border)] hover:border-[color:var(--color-foreground)] hover:text-[color:var(--color-foreground)]"
              }`}
            >
              {uc.tabLabel}
            </button>
          );
        })}
      </div>

      {/* Mock window */}
      <div className="relative rounded-[20px] bg-white border border-[color:var(--color-border)] shadow-[0_30px_80px_-30px_rgba(26,26,26,0.18)] overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[color:var(--color-border-light)] bg-[color:var(--color-background-tertiary)]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f44336]/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffc107]/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#4caf50]/60" />
          </div>
          <span className="text-[11px] font-mono text-[color:var(--color-foreground-muted)]">
            {useCase.sessionPath}
          </span>
          <div className="w-10" />
        </div>

        <div className="p-5 sm:p-6 flex flex-col gap-4">
          {/* Prompt row — right-aligned bubble, mirroring the real chat UI */}
          <div className="flex justify-end min-h-[60px]">
            <div className="max-w-[85%] bg-[color:var(--color-background-secondary)] border border-[color:var(--color-border)] rounded-2xl rounded-tr-md px-4 py-2.5 text-[13px] leading-relaxed text-[color:var(--color-foreground)] whitespace-pre-wrap text-left">
              {useCase.prompt.slice(0, charCount)}
              {show.prompt && (
                <span className="caret inline-block w-[2px] h-[14px] bg-[color:var(--color-primary)] align-middle ml-0.5" />
              )}
            </div>
          </div>

          {/* Tool use checkpoints */}
          <div
            className={`border border-[color:var(--color-border)] rounded-lg overflow-hidden transition-opacity duration-300 ${
              show.tool1 ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`px-3.5 py-2.5 flex items-center gap-2 border-b transition-colors duration-300 ${
                show.allToolsDone
                  ? "bg-[color:var(--color-primary-subtle)] border-[color:var(--color-primary-subtle-border)]"
                  : "bg-[color:var(--color-background-tertiary)] border-[color:var(--color-border-light)]"
              }`}
            >
              {show.allToolsDone ? (
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-[color:var(--color-primary)]"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-[color:var(--color-foreground-muted)] animate-spin"
                  aria-hidden="true"
                >
                  <path d="M21 12a9 9 0 1 1-6.22-8.56" />
                </svg>
              )}
              <span className="text-[12px] font-medium text-[color:var(--color-foreground)]">
                {show.allToolsDone
                  ? "Analysis complete · 4 tools used"
                  : useCase.analyzingLabel}
              </span>
            </div>
            {useCase.steps.map((label, i) => (
              <div
                key={`${useCase.id}-step-${i}`}
                className={`px-3.5 py-2 flex items-center gap-2 border-b last:border-b-0 border-[color:var(--color-border-light)] text-[12px] text-[color:var(--color-foreground-secondary)] transition-opacity duration-300 ${
                  toolRevealed[i] ? "opacity-100" : "opacity-0"
                }`}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-[color:var(--color-success)]"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {label}
              </div>
            ))}
          </div>

          {/* Summary block */}
          <div
            className="p-3.5 rounded-lg bg-[color:var(--color-primary-subtle)] border border-[color:var(--color-primary-subtle-border)]"
            style={{
              opacity: show.summary ? 1 : 0,
              transform: show.summary ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 400ms ease, transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <p className="text-[13px] leading-relaxed text-[color:var(--color-foreground)]">
              {useCase.summaryText}
            </p>
          </div>

          {/* Metric tiles */}
          <div className="grid grid-cols-3 gap-2">
            {useCase.metrics.map((m, i) => (
              <div
                key={`${useCase.id}-metric-${m.label}`}
                className="border border-[color:var(--color-border)] rounded-lg p-2.5"
                style={{
                  opacity: show.metrics ? 1 : 0,
                  transform: show.metrics ? "translateY(0)" : "translateY(6px)",
                  transition: `opacity 400ms ease ${i * 80}ms, transform 400ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms`,
                }}
              >
                <p className="text-[9px] font-semibold uppercase tracking-wider text-[color:var(--color-foreground-muted)]">
                  {m.label}
                </p>
                <p className="mt-1 text-[18px] font-semibold text-[color:var(--color-foreground)]">
                  {m.value}
                </p>
                <p
                  className="text-[10px]"
                  style={{
                    color: m.down ? "var(--color-error)" : "var(--color-success)",
                  }}
                >
                  {m.down ? "▼" : "▲"} {m.delta}
                </p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <ChartPanel useCaseId={useCase.id} chart={useCase.chart} reveal={show.chart} />

          {/* Output card */}
          <div
            className="border border-[color:var(--color-border)] rounded-lg overflow-hidden"
            style={{
              opacity: show.output ? 1 : 0,
              transform: show.output ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 500ms ease, transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="flex items-center justify-between px-3.5 py-2 border-b border-[color:var(--color-border-light)]">
              <div className="flex items-center gap-2">
                <IntegrationMark
                  name={useCase.output.toolName}
                  color={useCase.output.toolColor}
                  slug={useCase.output.toolSlug}
                  size={16}
                />
                <span className="text-[11px] font-semibold text-[color:var(--color-foreground-muted)]">
                  {useCase.output.toolName} · {useCase.output.kindLabel}
                </span>
              </div>
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-[color:var(--color-success-subtle)] text-[color:var(--color-success)] uppercase tracking-wider">
                {useCase.output.badge}
              </span>
            </div>
            <div className="px-3.5 py-2.5">
              <p className="text-[12px] font-semibold text-[color:var(--color-foreground)] leading-snug">
                {useCase.output.title}
              </p>
              <p className="mt-1 text-[11px] text-[color:var(--color-foreground-muted)]">
                {useCase.output.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartPanel({
  useCaseId,
  chart,
  reveal,
}: {
  useCaseId: string;
  chart: ChartSpec;
  reveal: boolean;
}) {
  return (
    <div
      className="border border-[color:var(--color-border)] rounded-lg p-3.5"
      style={{
        opacity: reveal ? 1 : 0,
        transition: "opacity 300ms ease",
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] font-semibold text-[color:var(--color-foreground)]">
          {chart.title}
        </p>
        <span className="text-[9px] font-mono text-[color:var(--color-foreground-muted)]">
          {chart.source}
        </span>
      </div>
      {chart.kind === "bars" ? (
        <BarsChart bars={chart.bars} reveal={reveal} />
      ) : (
        <LineChart
          gradientId={`heroChart-${useCaseId}`}
          linePath={chart.linePath}
          reveal={reveal}
        />
      )}
    </div>
  );
}

function LineChart({
  gradientId,
  linePath,
  reveal,
}: {
  gradientId: string;
  linePath: string;
  reveal: boolean;
}) {
  const areaPath = `${linePath} L400,80 L0,80 Z`;
  return (
    <svg viewBox="0 0 400 80" className="w-full h-16" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8640F" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#E8640F" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 20, 40, 60].map((y) => (
        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#EFECE5" strokeWidth="1" />
      ))}
      <path
        d={areaPath}
        fill={`url(#${gradientId})`}
        style={{
          opacity: reveal ? 1 : 0,
          transition: "opacity 500ms ease 300ms",
        }}
      />
      <path
        d={linePath}
        fill="none"
        stroke="#E8640F"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 1000,
          strokeDashoffset: reveal ? 0 : 1000,
          transition: "stroke-dashoffset 800ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </svg>
  );
}

function BarsChart({
  bars,
  reveal,
}: {
  bars: { label: string; value: number }[];
  reveal: boolean;
}) {
  return (
    <div className="h-16 flex flex-col justify-center gap-1.5">
      {bars.map((b, i) => (
        <div key={b.label} className="flex items-center gap-2">
          <span className="text-[10px] text-[color:var(--color-foreground-secondary)] w-24 shrink-0 truncate">
            {b.label}
          </span>
          <div className="flex-1 h-3 rounded-sm bg-[color:var(--color-background-tertiary)] overflow-hidden">
            <div
              className="h-full bg-[color:var(--color-primary)]"
              style={{
                width: reveal ? `${b.value}%` : "0%",
                transition: `width 700ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms`,
              }}
            />
          </div>
          <span className="text-[10px] font-mono text-[color:var(--color-foreground-muted)] w-6 text-right">
            {b.value}
          </span>
        </div>
      ))}
    </div>
  );
}
