"use client";

import { useEffect, useRef, useState } from "react";
import { USE_CASES, type ToolCall } from "./ui/chatMockData";
import { InteractiveUseCaseMock } from "./ui/InteractiveUseCaseMock";

function dedupeIntegrations(calls: ToolCall[]): ToolCall[] {
  const seen = new Set<string>();
  return calls.filter((c) => {
    if (seen.has(c.integration)) return false;
    seen.add(c.integration);
    return true;
  });
}

// UseCases — scroll-driven interactive section.
// Four sub-sections stack vertically; a chips bar sticks below the main
// header as the user scrolls and the active chip updates via an
// IntersectionObserver that tracks which use-case panel is in view.
// Clicking a chip smooth-scrolls to that panel.
const HEADER_OFFSET = 64;

export function UseCases() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [pinned, setPinned] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const topSentinelRef = useRef<HTMLDivElement>(null);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const [chipsHeight, setChipsHeight] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    panelRefs.current.forEach((el, i) => {
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveIdx(i);
            }
          }
        },
        {
          rootMargin: "-40% 0px -40% 0px",
          threshold: 0,
        }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((io) => io.disconnect());
  }, []);

  // Pin chips between the top sentinel (just above chip row) and the bottom
  // sentinel (at the end of the panels). Runs on scroll and resize.
  useEffect(() => {
    const check = () => {
      const top = topSentinelRef.current?.getBoundingClientRect().top;
      const bottom = bottomSentinelRef.current?.getBoundingClientRect().top;
      if (top === undefined || bottom === undefined) return;
      setPinned(top <= HEADER_OFFSET && bottom > HEADER_OFFSET);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  useEffect(() => {
    if (!chipsRef.current) return;
    const ro = new ResizeObserver(() => {
      if (chipsRef.current) setChipsHeight(chipsRef.current.offsetHeight);
    });
    ro.observe(chipsRef.current);
    setChipsHeight(chipsRef.current.offsetHeight);
    return () => ro.disconnect();
  }, []);

  const scrollToPanel = (i: number) => {
    const el = panelRefs.current[i];
    if (!el) return;
    const headerOffset = 64 + 56; // sticky header + chips bar
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="use-cases"
      aria-labelledby="use-cases-heading"
      className="relative bg-[color:var(--color-background)]"
    >
      {/* Intro */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-primary)]">
            Use cases
          </p>
          <h2
            id="use-cases-heading"
            className="mt-3 text-[36px] md:text-[48px] leading-[1.08] tracking-[-0.02em] text-[color:var(--color-foreground)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ask anything.
            <span className="text-[color:var(--color-foreground-muted)]">
              {" "}
              Squash figures out which tools to use and in what order.
            </span>
          </h2>
          <p className="mt-5 text-[16px] lg:text-[17px] leading-relaxed text-[color:var(--color-foreground-secondary)] max-w-2xl">
            Talk with your product stack just like developers talk with their codebase. 
            Get the insights and artifacts you need, without having to stitch together the context yourself.
          </p>
        </div>
      </div>

      {/* Sentinel: when this scrolls above the header, pin the chips. */}
      <div ref={topSentinelRef} aria-hidden="true" />

      {/* Chips row. Pinned to top-16 via `fixed` while inside the section. */}
      <div
        ref={chipsRef}
        className={`${
          pinned
            ? "fixed top-16 left-0 right-0"
            : "relative"
        } z-30 bg-[color:var(--color-background)]/85 backdrop-blur-md border-y border-[color:var(--color-border)]`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            role="tablist"
            aria-label="Use case navigation"
            className="flex gap-2 overflow-x-auto py-3 no-scrollbar"
          >
            {USE_CASES.map((uc, i) => {
              const active = i === activeIdx;
              return (
                <button
                  key={uc.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => scrollToPanel(i)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-[13px] font-medium border transition-colors ${
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
        </div>
      </div>

      {/* Spacer that reserves the chip row's height while it's pinned */}
      {pinned && <div style={{ height: chipsHeight }} aria-hidden="true" />}

      {/* Stacked use case panels */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {USE_CASES.map((uc, i) => (
          <article
            key={uc.id}
            id={`use-case-${uc.id}`}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            className="py-16 md:py-24 border-b border-[color:var(--color-border)] last:border-b-0"
            aria-labelledby={`use-case-${uc.id}-title`}
          >
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left: narrative */}
              <div className="lg:col-span-5 lg:sticky lg:top-36 self-start">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-primary)]">
                  {String(i + 1).padStart(2, "0")} · {uc.tabLabel}
                </p>
                <h3
                  id={`use-case-${uc.id}-title`}
                  className="mt-3 text-[28px] md:text-[34px] leading-[1.12] tracking-[-0.01em] text-[color:var(--color-foreground)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {headlineFor(uc.id)}
                </h3>
                <p className="mt-4 text-[15px] lg:text-[16px] leading-relaxed text-[color:var(--color-foreground-secondary)]">
                  {uc.blurb}
                </p>

                {/* Prompt preview */}
                <div className="mt-6 p-4 rounded-lg bg-[color:var(--color-background-tertiary)] border border-[color:var(--color-border)]">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[color:var(--color-foreground-muted)] mb-2">
                    The ask
                  </p>
                  <p className="font-mono text-[12px] leading-relaxed text-[color:var(--color-foreground)]">
                    {uc.prompt}
                  </p>
                </div>

                {/* Integrations used */}
                <div className="mt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[color:var(--color-foreground-muted)] mb-2.5">
                    Tools Squash reached for
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dedupeIntegrations(uc.toolCalls).map((tc) => (
                      <span
                        key={`${uc.id}-chip-${tc.integration}`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[color:var(--color-border)] text-[11px] text-[color:var(--color-foreground-secondary)]"
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: tc.integrationColor }}
                          aria-hidden="true"
                        />
                        {tc.integration}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: interactive mock */}
              <div className="lg:col-span-7">
                <InteractiveUseCaseMock useCase={uc} />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Sentinel: once this scrolls above the header, unpin the chips. */}
      <div ref={bottomSentinelRef} aria-hidden="true" />
    </section>
  );
}

function headlineFor(id: string): string {
  switch (id) {
    case "checkout":
      return "Find the root cause, file the ticket.";
    case "requests":
      return "Turn 847 requests into 3 decisions.";
    case "churn":
      return "See churn coming two weeks early.";
    case "retro":
      return "Know if the feature actually worked.";
    default:
      return "";
  }
}
