"use client";

import { useRef, useState, type ReactNode } from "react";
import { Check, Copy } from "@phosphor-icons/react";

/**
 * Wraps a highlighted code block and copies its text.
 *
 * Reads textContent off the rendered <pre> rather than threading the raw source
 * through props, so what gets copied is exactly what is on screen.
 */
export function CodeBlock({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  async function copy() {
    const text = ref.current?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setFailed(false);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied outright (insecure context, permission
      // policy). Say so instead of showing a success state that did nothing.
      setFailed(true);
      setTimeout(() => setFailed(false), 2500);
    }
  }

  return (
    <div className="group relative my-6 overflow-hidden rounded-(--radius) border border-border bg-surface-2">
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute top-2.5 right-2.5 z-10 inline-flex h-8 items-center gap-1.5 rounded-(--radius-sm) border border-border bg-surface px-2.5 font-mono text-[0.6875rem] text-text-muted opacity-0 transition-opacity duration-150 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {copied ? (
          <Check size={13} aria-hidden />
        ) : (
          <Copy size={13} aria-hidden />
        )}
        {failed ? "Blocked" : copied ? "Copied" : "Copy"}
      </button>
      <pre ref={ref}>{children}</pre>
    </div>
  );
}
