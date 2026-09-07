"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/types/content";

/**
 * Sticky in-page navigation.
 *
 * Active section tracking uses IntersectionObserver, never a scroll listener:
 * the callback fires only when a heading crosses the band, instead of running
 * work on every scroll frame. The rootMargin pins the trigger line just under
 * the sticky header so the highlighted entry matches what is actually in view.
 */
export function Toc({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(
    entries[0]?.id ?? null,
  );

  useEffect(() => {
    if (entries.length === 0) return;

    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (records) => {
        const onScreen = records
          .filter((r) => r.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (onScreen[0]) setActiveId(onScreen[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 font-semibold tracking-tight text-text">
        On this page
      </p>
      <ul className="space-y-1 border-l border-border">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              aria-current={activeId === entry.id ? "location" : undefined}
              className={`-ml-px block border-l-2 py-1 leading-snug transition-colors duration-150 ${
                entry.depth === 3 ? "pl-6" : "pl-4"
              } ${
                activeId === entry.id
                  ? "border-accent font-medium text-accent"
                  : "border-transparent text-text-muted hover:border-border-strong hover:text-text"
              }`}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
