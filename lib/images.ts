/**
 * Placeholder imagery.
 *
 * Every image on the site currently resolves to a seeded Picsum photo at the
 * right aspect ratio, so layout, cropping and loading behaviour are all real
 * while the actual assets are outstanding. The seed is derived from the slug,
 * so a given project keeps the same placeholder between builds instead of
 * reshuffling on every request.
 *
 * TODO(austin): replace with real assets. The full list of what is needed is
 * in README.md under "Assets still needed".
 */
export function placeholder(seed: string, width: number, height: number) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}

/** 1x1 neutral pixel used as the blur placeholder so nothing flashes white. */
export const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyIDIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiM3MTcxN2EiLz48L3N2Zz4=";
