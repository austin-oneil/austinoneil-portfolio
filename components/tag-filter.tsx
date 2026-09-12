"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";

export interface FilterableItem {
  key: string;
  tags: string[];
  /** Server-rendered row. Rendering happens on the server so the full list is
   *  in the HTML payload; this component only decides what stays visible. */
  node: ReactNode;
}

/**
 * Client-side filter over a pre-rendered list.
 *
 * Every item is server-rendered into the HTML and the filter only hides rows,
 * so the complete set is in the payload for a crawler. Filtering by URL instead
 * would fragment the same content across query-string variants, which costs
 * more in indexation than it gains in shareability.
 */
export function TagFilter({
  items,
  tags,
  allLabel,
  emptyLabel,
}: {
  items: FilterableItem[];
  tags: string[];
  allLabel: string;
  emptyLabel: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  const visible = useMemo(
    () => (active ? items.filter((i) => i.tags.includes(active)) : items),
    [items, active],
  );

  return (
    <>
      <div
        role="group"
        aria-label="Filter by tag"
        className="mb-2 flex flex-wrap gap-2"
      >
        <FilterButton
          active={active === null}
          onClick={() => setActive(null)}
          count={items.length}
        >
          {allLabel}
        </FilterButton>
        {tags.map((tag) => (
          <FilterButton
            key={tag}
            active={active === tag}
            onClick={() => setActive(tag)}
            count={items.filter((i) => i.tags.includes(tag)).length}
          >
            {tag}
          </FilterButton>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="border-t border-border py-16 text-center text-text-muted">
          {emptyLabel}
        </p>
      ) : (
        <div className="border-t border-border">
          {visible.map((item) => (
            <div key={item.key}>{item.node}</div>
          ))}
        </div>
      )}
    </>
  );
}

function FilterButton({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count: number;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-(--radius) border px-3 py-1.5 text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        active
          ? "border-accent bg-accent-faint font-medium text-accent"
          : "border-border text-text-muted hover:border-border-strong hover:text-text"
      }`}
    >
      {children}
      <span className="font-mono text-xs text-text-subtle">{count}</span>
    </button>
  );
}
