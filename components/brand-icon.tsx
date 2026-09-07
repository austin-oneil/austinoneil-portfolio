import * as simpleIcons from "simple-icons";

/**
 * Renders a brand mark from Simple Icons as inline SVG.
 *
 * Server component, so the icon set never reaches the browser and the marks
 * cost zero network requests. Paths are drawn in currentColor rather than each
 * brand's own hex: a wall of twenty brand colors would overwhelm the single
 * accent this site is built on.
 */

/** Simple Icons exposes one export per icon, keyed as si<PascalSlug>. */
type SimpleIcon = { title: string; path: string };
const icons = simpleIcons as unknown as Record<string, SimpleIcon | undefined>;

function lookup(slug: string): SimpleIcon | undefined {
  return icons[`si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`];
}

export function BrandIcon({
  slug,
  mono,
  size = 16,
}: {
  slug?: string;
  mono?: string;
  size?: number;
}) {
  const icon = slug ? lookup(slug) : undefined;

  if (!icon) {
    return (
      <span
        aria-hidden
        className="inline-flex h-4 min-w-4 items-center justify-center font-mono text-[0.625rem] leading-none font-semibold text-text-subtle"
      >
        {mono ?? "?"}
      </span>
    );
  }

  return (
    <svg
      role="img"
      aria-hidden
      focusable="false"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className="shrink-0"
    >
      <path d={icon.path} />
    </svg>
  );
}
