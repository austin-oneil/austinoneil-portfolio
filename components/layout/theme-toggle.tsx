"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";

type Theme = "light" | "dark";

/**
 * Manual override on top of prefers-color-scheme. The choice persists to
 * localStorage; ThemeScript replays it before paint on the next visit.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing or blocked storage: the toggle still works for this
      // page view, it just will not be remembered.
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      // Before hydration reads the real value, the label is generic rather
      // than wrong.
      aria-label={
        theme ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Switch theme"
      }
      className="inline-flex h-9 w-9 items-center justify-center rounded-[--radius] border border-border text-text-muted transition-colors duration-150 hover:border-border-strong hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {theme === "dark" ? (
        <Moon size={17} weight="regular" aria-hidden />
      ) : (
        <Sun size={17} weight="regular" aria-hidden />
      )}
    </button>
  );
}
