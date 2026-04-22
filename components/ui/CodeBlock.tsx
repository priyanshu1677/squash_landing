import { Fragment, type ReactNode } from "react";

// Lightweight syntax highlighter for JSON and SQL — no external deps.
// Tokens are colored via inline styles so we don't depend on Tailwind's JIT
// detecting dynamic classes.

type Token = { kind: string; text: string };

const JSON_COLORS: Record<string, string> = {
  key: "#0f766e",
  string: "#047857",
  number: "#c2410c",
  boolean: "#7c3aed",
  null: "#7c3aed",
  punct: "#94918a",
};

const SQL_COLORS: Record<string, string> = {
  keyword: "#7c3aed",
  function: "#0f766e",
  string: "#047857",
  number: "#c2410c",
  punct: "#94918a",
};

const SQL_KEYWORDS = new Set([
  "SELECT",
  "FROM",
  "WHERE",
  "GROUP",
  "BY",
  "ORDER",
  "AS",
  "AND",
  "OR",
  "NOT",
  "IN",
  "IS",
  "NULL",
  "LIMIT",
  "OFFSET",
  "JOIN",
  "LEFT",
  "RIGHT",
  "INNER",
  "OUTER",
  "ON",
  "HAVING",
  "UNION",
  "ALL",
  "DISTINCT",
  "CASE",
  "WHEN",
  "THEN",
  "ELSE",
  "END",
  "WITH",
  "INSERT",
  "INTO",
  "VALUES",
  "UPDATE",
  "SET",
  "DELETE",
  "CREATE",
  "TABLE",
  "VIEW",
  "INDEX",
  "DROP",
  "BETWEEN",
  "LIKE",
  "ASC",
  "DESC",
  "CURRENT_DATE",
  "CURRENT_TIMESTAMP",
  "INTERVAL",
  "DAY",
  "MONTH",
  "YEAR",
  "OVER",
  "PARTITION",
]);

function tokenizeJson(src: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === " " || c === "\t" || c === "\n" || c === "\r") {
      let j = i;
      while (j < src.length && /\s/.test(src[j])) j++;
      tokens.push({ kind: "ws", text: src.slice(i, j) });
      i = j;
      continue;
    }
    if (c === '"') {
      let j = i + 1;
      while (j < src.length && src[j] !== '"') {
        if (src[j] === "\\" && j + 1 < src.length) j += 2;
        else j++;
      }
      j = Math.min(j + 1, src.length);
      let k = j;
      while (k < src.length && /\s/.test(src[k])) k++;
      const isKey = src[k] === ":";
      tokens.push({ kind: isKey ? "key" : "string", text: src.slice(i, j) });
      i = j;
      continue;
    }
    if (c === "{" || c === "}" || c === "[" || c === "]" || c === "," || c === ":") {
      tokens.push({ kind: "punct", text: c });
      i++;
      continue;
    }
    if (c === "-" || (c >= "0" && c <= "9")) {
      const match = src.slice(i).match(/^-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/);
      if (match) {
        tokens.push({ kind: "number", text: match[0] });
        i += match[0].length;
        continue;
      }
    }
    const wordMatch = src.slice(i).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
    if (wordMatch) {
      const word = wordMatch[0];
      let kind = "text";
      if (word === "true" || word === "false") kind = "boolean";
      else if (word === "null") kind = "null";
      tokens.push({ kind, text: word });
      i += word.length;
      continue;
    }
    tokens.push({ kind: "text", text: c });
    i++;
  }
  return tokens;
}

function tokenizeSql(src: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === " " || c === "\t" || c === "\n" || c === "\r") {
      let j = i;
      while (j < src.length && /\s/.test(src[j])) j++;
      tokens.push({ kind: "ws", text: src.slice(i, j) });
      i = j;
      continue;
    }
    if (c === "'" || c === '"') {
      const quote = c;
      let j = i + 1;
      while (j < src.length && src[j] !== quote) {
        if (src[j] === "\\" && j + 1 < src.length) j += 2;
        else j++;
      }
      j = Math.min(j + 1, src.length);
      tokens.push({ kind: "string", text: src.slice(i, j) });
      i = j;
      continue;
    }
    if (c === "-" && src[i + 1] === "-") {
      let j = i;
      while (j < src.length && src[j] !== "\n") j++;
      tokens.push({ kind: "comment", text: src.slice(i, j) });
      i = j;
      continue;
    }
    if (c >= "0" && c <= "9") {
      const match = src.slice(i).match(/^\d+(?:\.\d+)?/);
      if (match) {
        tokens.push({ kind: "number", text: match[0] });
        i += match[0].length;
        continue;
      }
    }
    const wordMatch = src.slice(i).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
    if (wordMatch) {
      const word = wordMatch[0];
      const upper = word.toUpperCase();
      let kind = "ident";
      if (SQL_KEYWORDS.has(upper)) kind = "keyword";
      else if (src[i + word.length] === "(") kind = "function";
      tokens.push({ kind, text: word });
      i += word.length;
      continue;
    }
    tokens.push({ kind: "punct", text: c });
    i++;
  }
  return tokens;
}

function detectLanguage(src: string): "json" | "sql" {
  const trimmed = src.trimStart();
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) return "json";
  return "sql";
}

export function CodeBlock({
  code,
  language,
  className = "",
}: {
  code: string;
  language?: "json" | "sql";
  className?: string;
}) {
  const lang = language ?? detectLanguage(code);
  const tokens = lang === "json" ? tokenizeJson(code) : tokenizeSql(code);
  const colors = lang === "json" ? JSON_COLORS : SQL_COLORS;

  const nodes: ReactNode[] = tokens.map((t, i) => {
    if (t.kind === "ws" || t.kind === "text" || t.kind === "ident") {
      return <Fragment key={i}>{t.text}</Fragment>;
    }
    if (t.kind === "comment") {
      return (
        <span key={i} style={{ color: "#9ca3af", fontStyle: "italic" }}>
          {t.text}
        </span>
      );
    }
    const color = colors[t.kind];
    if (!color) return <Fragment key={i}>{t.text}</Fragment>;
    return (
      <span key={i} style={{ color }}>
        {t.text}
      </span>
    );
  });

  return (
    <pre
      className={`font-mono text-[11px] leading-relaxed whitespace-pre-wrap break-words text-[color:var(--color-foreground-secondary)] ${className}`}
    >
      {nodes}
    </pre>
  );
}
