"use client";

import { useMemo, useState } from "react";
import type { ChartSpec } from "./chatMockData";

// Interactive chart — mirrors the hero mock's visual language but adds
// hover tooltips with real data values. SVG-based so we don't pull in
// a chart library for four static datasets.
export function InteractiveChart({
  spec,
  reveal,
  id,
}: {
  spec: ChartSpec;
  reveal: boolean;
  id: string;
}) {
  return (
    <div
      className="border border-[color:var(--color-border)] rounded-lg p-4 bg-white"
      style={{ opacity: reveal ? 1 : 0, transition: "opacity 300ms ease" }}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-[12px] font-semibold text-[color:var(--color-foreground)]">
          {spec.title}
        </p>
        <span className="text-[10px] font-mono text-[color:var(--color-foreground-muted)]">
          {spec.source}
        </span>
      </div>
      {spec.kind === "bars" ? (
        <InteractiveBars bars={spec.bars} reveal={reveal} />
      ) : (
        <InteractiveLine
          id={id}
          linePath={spec.linePath}
          points={spec.points}
          unit={spec.yAxis.unit}
          reveal={reveal}
        />
      )}
    </div>
  );
}

function InteractiveLine({
  id,
  linePath,
  points,
  unit,
  reveal,
}: {
  id: string;
  linePath: string;
  points: { x: string; y: string }[];
  unit: string;
  reveal: boolean;
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  // Parse SVG coordinates out of the path so hover points align exactly
  // with the visual line instead of having to maintain two datasets.
  const coords = useMemo(() => {
    const matches = Array.from(linePath.matchAll(/[ML]\s*([\d.]+),([\d.]+)/g));
    return matches.map((m) => ({ x: Number(m[1]), y: Number(m[2]) }));
  }, [linePath]);

  const count = Math.min(coords.length, points.length);
  const areaPath = `${linePath} L400,80 L0,80 Z`;

  return (
    <div className="relative">
      <svg
        viewBox="0 0 400 90"
        className="w-full h-36"
        preserveAspectRatio="none"
        onMouseLeave={() => setHoverIdx(null)}
        role="img"
        aria-label="Interactive line chart"
      >
        <defs>
          <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8640F" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#E8640F" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {[0, 20, 40, 60].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="400"
            y2={y}
            stroke="#EFECE5"
            strokeWidth="1"
          />
        ))}

        {/* Area */}
        <path
          d={areaPath}
          fill={`url(#grad-${id})`}
          style={{
            opacity: reveal ? 1 : 0,
            transition: "opacity 500ms ease 300ms",
          }}
        />

        {/* Line */}
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

        {/* Hover crosshair */}
        {hoverIdx !== null && coords[hoverIdx] && (
          <g>
            <line
              x1={coords[hoverIdx].x}
              y1={0}
              x2={coords[hoverIdx].x}
              y2={80}
              stroke="#E8640F"
              strokeWidth="1"
              strokeDasharray="2 2"
              opacity="0.5"
            />
            <circle
              cx={coords[hoverIdx].x}
              cy={coords[hoverIdx].y}
              r="3.5"
              fill="white"
              stroke="#E8640F"
              strokeWidth="2"
            />
          </g>
        )}

        {/* Hit targets */}
        {reveal &&
          coords.slice(0, count).map((c, i) => {
            const prevX = i === 0 ? 0 : (coords[i - 1].x + c.x) / 2;
            const nextX =
              i === count - 1 ? 400 : (coords[i + 1].x + c.x) / 2;
            return (
              <rect
                key={i}
                x={prevX}
                y={0}
                width={nextX - prevX}
                height={80}
                fill="transparent"
                onMouseEnter={() => setHoverIdx(i)}
                style={{ cursor: "crosshair" }}
              />
            );
          })}
      </svg>

      {/* Tooltip */}
      {hoverIdx !== null && points[hoverIdx] && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full whitespace-nowrap px-2.5 py-1.5 rounded-md bg-[color:var(--color-foreground)] text-white text-[11px] shadow-lg"
          style={{
            left: `${(coords[hoverIdx].x / 400) * 100}%`,
            top: `${(coords[hoverIdx].y / 90) * 100}%`,
            marginTop: "-6px",
          }}
        >
          <span className="text-[color:var(--color-background)]/70 mr-1.5">
            {points[hoverIdx].x}
          </span>
          <span className="font-semibold">
            {points[hoverIdx].y}
            {unit}
          </span>
        </div>
      )}

      {/* X-axis labels (first, middle, last) */}
      <div className="mt-1 flex justify-between text-[10px] font-mono text-[color:var(--color-foreground-muted)]">
        <span>{points[0]?.x}</span>
        <span>{points[Math.floor(points.length / 2)]?.x}</span>
        <span>{points[points.length - 1]?.x}</span>
      </div>
    </div>
  );
}

function InteractiveBars({
  bars,
  reveal,
}: {
  bars: { label: string; value: number }[];
  reveal: boolean;
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2.5">
      {bars.map((b, i) => {
        const active = hoverIdx === i;
        return (
          <div
            key={b.label}
            className="flex items-center gap-3"
            onMouseEnter={() => setHoverIdx(i)}
            onMouseLeave={() => setHoverIdx(null)}
          >
            <span
              className={`text-[11px] w-28 shrink-0 truncate transition-colors ${
                active
                  ? "text-[color:var(--color-foreground)]"
                  : "text-[color:var(--color-foreground-secondary)]"
              }`}
            >
              {b.label}
            </span>
            <div className="flex-1 h-4 rounded bg-[color:var(--color-background-tertiary)] overflow-hidden relative">
              <div
                className="h-full transition-colors"
                style={{
                  width: reveal ? `${b.value}%` : "0%",
                  backgroundColor: active
                    ? "var(--color-primary-hover)"
                    : "var(--color-primary)",
                  transition: `width 700ms cubic-bezier(0.16, 1, 0.3, 1) ${
                    i * 120
                  }ms, background-color 120ms ease`,
                }}
              />
            </div>
            <span
              className={`text-[11px] font-mono w-10 text-right tabular-nums transition-colors ${
                active
                  ? "text-[color:var(--color-foreground)]"
                  : "text-[color:var(--color-foreground-muted)]"
              }`}
            >
              {b.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
