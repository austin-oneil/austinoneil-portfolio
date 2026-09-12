import type { ReactNode } from "react";

/**
 * Small classification chip. Used for project tags, stack items and post tags.
 * Never overlaid on an image — always sits in the flow beneath or beside content.
 */
export function Tag({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent";
}) {
  const tones = {
    neutral: "border-border bg-surface-2 text-text-muted",
    accent: "border-accent-border bg-accent-faint text-accent",
  };
  return (
    <span
      className={`inline-flex items-center rounded-(--radius-sm) border px-2 py-0.5 font-mono text-[0.6875rem] leading-5 tracking-tight ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
