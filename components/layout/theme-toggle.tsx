"use client";

import { Moon, Sun } from "@phosphor-icons/react";

/**
 * Manual override on top of prefers-color-scheme.
 *
 * Holds no React state on purpose. The current theme already lives in one
 * place, the data-theme attribute that ThemeScript stamps before paint, so the
 * click handler reads it from there and CSS decides which icon is visible.
 * Mirroring it into state would mean the server renders one icon, the client
 * corrects it after hydration, and the toggle flickers on every page load.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing or blocked storage: the toggle still works for this
      // page view, it just will not be remembered.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-[--radius] border border-border text-text-muted transition-colors duration-150 hover:border-border-strong hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <Sun
        size={17}
        aria-hidden
        className="block dark:hidden"
      />
      <Moon
        size={17}
        aria-hidden
        className="hidden dark:block"
      />
    </button>
  );
}
