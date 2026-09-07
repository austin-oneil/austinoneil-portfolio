/**
 * Stamps data-theme on <html> before first paint.
 *
 * Runs synchronously in <head>, so the correct palette is already applied
 * when the browser paints — no flash of the wrong theme. Reads a persisted
 * choice first, falls back to the OS preference.
 */
const script = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (prefersDark ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
