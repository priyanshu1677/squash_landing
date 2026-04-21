"use client";

import { useState } from "react";
import { FAQS } from "@/lib/constants";

// Accessible FAQ accordion. Uses native <details>/<summary>-like semantics
// through controlled buttons with aria-expanded + aria-controls. The
// content of each answer is ALWAYS rendered in the DOM (collapsed via
// CSS height transition) so search engines and LLMs can read every
// answer without JS. This is critical for AI/SEO optimization.
export function FAQ() {
  // Allow multiple open at once — less friction for scanning.
  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-24 md:py-32 bg-[color:var(--color-surface)] border-y border-[color:var(--color-border)]"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-primary)]">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="mt-3 text-[36px] md:text-[48px] leading-[1.08] tracking-[-0.02em] text-[color:var(--color-foreground)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Questions, answered.
          </h2>
        </div>

        <div className="mt-12 divide-y divide-[color:var(--color-border)] border-y border-[color:var(--color-border)]">
          {FAQS.map((faq, i) => {
            const isOpen = open.has(i);
            return (
              <div key={i} className="py-2">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="w-full flex items-center justify-between gap-4 py-4 text-left group"
                >
                  <h3 className="text-[16px] md:text-[18px] font-medium text-[color:var(--color-foreground)] leading-snug">
                    {faq.q}
                  </h3>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={`flex-shrink-0 text-[color:var(--color-foreground-muted)] transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[color:var(--color-primary)]" : ""
                    }`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-4"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[15px] leading-relaxed text-[color:var(--color-foreground-secondary)] pr-8">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-[14px] text-[color:var(--color-foreground-muted)]">
          Still have questions?{" "}
          <a
            href="mailto:hello@squash.ai"
            className="text-[color:var(--color-primary)] font-medium hover:underline"
          >
            hello@squash.ai
          </a>
        </p>
      </div>
    </section>
  );
}
