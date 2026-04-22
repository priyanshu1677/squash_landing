"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CodeBlock } from "./CodeBlock";
import { IntegrationMark } from "./IntegrationMark";
import { InteractiveChart } from "./InteractiveChart";
import type { UseCase } from "./chatMockData";

const STEP_DONE = 9;
const PROMPT_TYPE_MS = 700;

const SCHEDULE: Array<[step: number, at: number]> = [
  [2, 900],
  [3, 1200],
  [4, 1500],
  [5, 1800],
  [6, 2200],
  [7, 2700],
  [8, 3200],
  [9, 3900],
];

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function InteractiveUseCaseMock({ useCase }: { useCase: UseCase }) {
  const [phase, setPhase] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);
  const [expandedTool, setExpandedTool] = useState<number | null>(null);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const rafRef = useRef<number | null>(null);
  const hasPlayedRef = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const clearAll = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    clearAll();
    setExpandedTool(null);

    if (prefersReducedMotion()) {
      setPhase(STEP_DONE);
      setCharCount(useCase.prompt.length);
      return;
    }

    setPhase(1);
    setCharCount(0);

    const start = performance.now();
    const total = useCase.prompt.length;
    const tick = (now: number) => {
      const elapsed = now - start;
      const count = Math.min(
        total,
        Math.ceil((elapsed / PROMPT_TYPE_MS) * total)
      );
      setCharCount(count);
      if (count < total) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    SCHEDULE.forEach(([step, at]) => {
      timersRef.current.push(setTimeout(() => setPhase(step), at));
    });
  }, [clearAll, useCase.prompt.length]);

  // Autoplay the first time this mock enters the viewport.
  useEffect(() => {
    if (prefersReducedMotion()) {
      setPhase(STEP_DONE);
      setCharCount(useCase.prompt.length);
      return;
    }
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasPlayedRef.current) {
            hasPlayedRef.current = true;
            play();
            io.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearAll();
    };
  }, [clearAll, play, useCase.prompt.length]);

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
    <div ref={rootRef} className="relative">
      <div className="relative rounded-[20px] bg-white border border-[color:var(--color-border)] shadow-[0_30px_80px_-30px_rgba(26,26,26,0.22)] overflow-hidden">
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
          <button
            onClick={play}
            className="text-[11px] text-[color:var(--color-foreground-muted)] hover:text-[color:var(--color-primary)] transition-colors inline-flex items-center gap-1"
            aria-label="Replay demo"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            Replay
          </button>
        </div>

        <div className="p-5 sm:p-6 flex flex-col gap-4">
          {/* Prompt row — right-aligned bubble, mirroring the real chat UI */}
          <div className="flex justify-end min-h-[60px]">
            <div className="max-w-[85%] bg-[color:var(--color-background-secondary)] border border-[color:var(--color-border)] rounded-2xl rounded-tr-md px-4 py-2.5 text-[13px] leading-relaxed text-[color:var(--color-foreground)] whitespace-pre-wrap text-left">
              {useCase.prompt.slice(0, charCount)}
              {show.prompt && charCount < useCase.prompt.length && (
                <span className="caret inline-block w-[2px] h-[14px] bg-[color:var(--color-primary)] align-middle ml-0.5" />
              )}
            </div>
          </div>

          {/* Tool use checkpoints (expandable) */}
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

            {useCase.toolCalls.map((tool, i) => {
              const revealed = toolRevealed[i];
              const isExpanded = expandedTool === i;
              const isDone = phase >= 6 || phase > i + 1;
              return (
                <div
                  key={`${useCase.id}-tool-${i}`}
                  className={`border-b last:border-b-0 border-[color:var(--color-border-light)] transition-opacity duration-300 ${
                    revealed ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <button
                    type="button"
                    disabled={!isDone}
                    onClick={() => setExpandedTool(isExpanded ? null : i)}
                    className={`w-full px-3.5 py-2 flex items-center gap-2.5 text-left transition-colors ${
                      isDone
                        ? "hover:bg-[color:var(--color-background-tertiary)] cursor-pointer"
                        : "cursor-default"
                    }`}
                    aria-expanded={isExpanded}
                  >
                    {isDone ? (
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-[color:var(--color-success)] shrink-0"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="text-[color:var(--color-foreground-muted)] animate-spin shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M21 12a9 9 0 1 1-6.22-8.56" />
                      </svg>
                    )}
                    <IntegrationMark
                      name={tool.integration}
                      color={tool.integrationColor}
                      slug={tool.integrationSlug}
                      size={16}
                    />
                    <span className="text-[12px] text-[color:var(--color-foreground-secondary)] flex-1 truncate">
                      {tool.title}
                    </span>
                    {isDone && (
                      <>
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-[color:var(--color-success-subtle)] text-[color:var(--color-success)] uppercase tracking-wider">
                          Result
                        </span>
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className={`text-[color:var(--color-foreground-muted)] transition-transform duration-150 shrink-0 ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                          aria-hidden="true"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </>
                    )}
                  </button>

                  {isExpanded && isDone && (
                    <div className="border-t border-[color:var(--color-border-light)] bg-[color:var(--color-background-tertiary)]">
                      <div className="px-3.5 py-1.5 border-b border-[color:var(--color-border-light)] bg-[color:var(--color-background-secondary)]">
                        <span className="text-[10px] font-semibold text-[color:var(--color-foreground-muted)] uppercase tracking-wider">
                          Request
                        </span>
                      </div>
                      <div className="px-3.5 py-2 max-h-[180px] overflow-y-auto">
                        <CodeBlock code={tool.request} />
                      </div>
                      <div className="px-3.5 py-1.5 border-y border-[color:var(--color-border-light)] bg-[color:var(--color-background-secondary)]">
                        <span className="text-[10px] font-semibold text-[color:var(--color-foreground-muted)] uppercase tracking-wider">
                          Response
                        </span>
                      </div>
                      <div className="px-3.5 py-2 max-h-[200px] overflow-y-auto">
                        <CodeBlock code={tool.response} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Summary block */}
          <div
            className="p-3.5 rounded-lg bg-[color:var(--color-primary-subtle)] border border-[color:var(--color-primary-subtle-border)]"
            style={{
              opacity: show.summary ? 1 : 0,
              transform: show.summary ? "translateY(0)" : "translateY(8px)",
              transition:
                "opacity 400ms ease, transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
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
                  transition: `opacity 400ms ease ${
                    i * 80
                  }ms, transform 400ms cubic-bezier(0.16, 1, 0.3, 1) ${
                    i * 80
                  }ms`,
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
                    color: m.down
                      ? "var(--color-error)"
                      : "var(--color-success)",
                  }}
                >
                  {m.down ? "▼" : "▲"} {m.delta}
                </p>
              </div>
            ))}
          </div>

          {/* Chart (interactive with hover tooltips) */}
          <div
            style={{
              opacity: show.chart ? 1 : 0,
              transform: show.chart ? "translateY(0)" : "translateY(6px)",
              transition:
                "opacity 400ms ease, transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <InteractiveChart
              id={`uc-${useCase.id}`}
              spec={useCase.chart}
              reveal={show.chart}
            />
          </div>

          {/* Output card */}
          <div
            className="border border-[color:var(--color-border)] rounded-lg overflow-hidden"
            style={{
              opacity: show.output ? 1 : 0,
              transform: show.output ? "translateY(0)" : "translateY(8px)",
              transition:
                "opacity 500ms ease, transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
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
