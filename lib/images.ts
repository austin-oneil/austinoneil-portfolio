/**
 * Placeholder imagery.
 *
 * These are local files in /public/placeholder, committed on purpose rather
 * than fetched from a placeholder service at runtime. A portfolio whose hero
 * image depends on a third-party host is one outage away from looking broken,
 * and every cold request has to round-trip to that host before the optimizer
 * can even start work.
 *
 * They are stand-ins at the correct aspect ratios so layout, cropping and
 * loading behaviour are all real while the actual assets are outstanding.
 *
 * TODO(austin): replace these. README.md lists exactly what is needed and at
 * what dimensions. When they are all replaced, this module can go away and the
 * components can reference the real files directly.
 */

const PROJECT_IMAGES: Record<string, string> = {
  "basecamp-ai-agent": "/placeholder/basecamp-ai-agent.jpg",
  "prayer-hours-plugin": "/placeholder/prayer-hours-plugin.jpg",
  "dnvr-phnx": "/placeholder/dnvr-phnx.jpg",
  "kharon-news-app": "/placeholder/kharon-news-app.jpg",
  "van-user-dashboard": "/placeholder/van-user-dashboard.jpg",
  "lacroix-drill-house": "/placeholder/lacroix-drill-house.jpg",
  "agency-cms-architecture": "/placeholder/agency-cms-architecture.jpg",
  "ahead-of-the-curve-media": "/placeholder/ahead-of-the-curve-media.jpg",
};

/** Cover image for a case study, by slug. */
export function projectImage(slug: string): string {
  return PROJECT_IMAGES[slug] ?? "/placeholder/basecamp-ai-agent.jpg";
}

/**
 * Real asset, not a placeholder. Square source (1200x1206), which crops
 * differently in the two slots it appears in:
 *
 *   4:5  (About, and the hero from md up) scales to fill the height and crops
 *        the sides. No vertical crop happens, so object-position is a no-op.
 *   16:9 (the hero below md) scales to fill the width and crops top and bottom,
 *        keeping only the middle 56%. Centered would clip the top of his head,
 *        so the hero biases the crop upward. See app/page.tsx.
 */
export const PORTRAIT_IMAGE = "/austin-oneil.jpg";

/**
 * Square head-and-shoulders crop for the hero avatar, framed so the inscribed
 * circle reads as a portrait rather than cutting through the jaw. Square source
 * in a square box means object-cover never crops, so the framing is decided
 * here once instead of being re-tuned per breakpoint in CSS.
 */
export const AVATAR_IMAGE = "/austin-oneil-avatar.jpg";

/** Neutral 1x1 used as the blur placeholder so nothing flashes white. */
export const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyIDIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiM3MTcxN2EiLz48L3N2Zz4=";
