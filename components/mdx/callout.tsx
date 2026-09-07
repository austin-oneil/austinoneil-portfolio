import type { ReactNode } from "react";
import { Info, Warning } from "@phosphor-icons/react/dist/ssr";

/**
 * Aside for a caveat or a side note inside a post or case study.
 * Server component: the icon set has an /ssr entry that ships no client JS.
 */
export function Callout({
  children,
  type = "note",
}: {
  children: ReactNode;
  type?: "note" | "warning";
}) {
  const Icon = type === "warning" ? Warning : Info;
  return (
    <aside
      className={`my-6 flex gap-3 rounded-[--radius] border p-4 ${
        type === "warning"
          ? "border-border-strong bg-surface-2"
          : "border-accent-border bg-accent-faint"
      }`}
    >
      <Icon
        size={18}
        weight="fill"
        aria-hidden
        className={`mt-0.5 shrink-0 ${
          type === "warning" ? "text-text-muted" : "text-accent"
        }`}
      />
      <div className="text-[0.9375rem] leading-relaxed text-text-muted [&>p]:m-0 [&>p+p]:mt-3">
        {children}
      </div>
    </aside>
  );
}
