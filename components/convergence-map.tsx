/**
 * Career convergence, drawn in the site's own transit language: six industry
 * lines running in from the left and meeting at one interchange.
 *
 * Real SVG with real text rather than an exported image, so it scales, respects
 * the theme through currentColor and CSS variables, is selectable, and costs no
 * network request. Server component, no JavaScript.
 *
 * Below md the curves would compress the labels to an unreadable size, so the
 * same information renders as a plain list instead. Both carry identical
 * content; neither is decorative.
 */

const INDUSTRIES = [
  "Restaurants and bars",
  "Automotive sales",
  "Sports media",
  "Youth sports",
  "Nonprofit membership",
  "Healthcare marketing",
] as const;

const DESTINATION = "Software and search";

export function ConvergenceMap() {
  const rowY = [34, 96, 158, 220, 282, 344];
  const hubX = 560;
  const hubY = 189;
  const dotX = 232;

  return (
    <>
      <svg
        viewBox="0 0 760 380"
        className="hidden h-auto w-full md:block"
        role="img"
        aria-labelledby="convergence-title convergence-desc"
      >
        <title id="convergence-title">
          Six industries converging on software and search
        </title>
        <desc id="convergence-desc">
          {`Lines from ${INDUSTRIES.join(", ")} all meet at a single interchange labelled ${DESTINATION}.`}
        </desc>

        {rowY.map((y, i) => (
          <path
            key={INDUSTRIES[i]}
            d={`M ${dotX} ${y} C ${dotX + 170} ${y}, ${hubX - 150} ${hubY}, ${hubX} ${hubY}`}
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth={2}
          />
        ))}

        {rowY.map((y, i) => (
          <g key={INDUSTRIES[i]}>
            <text
              x={dotX - 20}
              y={y + 5}
              textAnchor="end"
              className="fill-text-muted font-mono"
              style={{ fontSize: 19 }}
            >
              {INDUSTRIES[i]}
            </text>
            <circle
              cx={dotX}
              cy={y}
              r={5}
              fill="var(--bg)"
              stroke="var(--border-strong)"
              strokeWidth={2}
            />
          </g>
        ))}

        {/* The interchange. Filled rather than outlined, because this is the
            one node everything else is running toward. */}
        <circle cx={hubX} cy={hubY} r={13} fill="var(--bg)" stroke="var(--accent)" strokeWidth={2} />
        <circle cx={hubX} cy={hubY} r={6} fill="var(--accent)" />
        <text
          x={hubX + 28}
          y={hubY + 6}
          className="fill-text font-semibold"
          style={{ fontSize: 22 }}
        >
          {DESTINATION}
        </text>
      </svg>

      <ul className="flex flex-wrap gap-2 md:hidden">
        {INDUSTRIES.map((industry) => (
          <li
            key={industry}
            className="rounded-[--radius] border border-border bg-surface px-3 py-2 font-mono text-xs text-text-muted"
          >
            {industry}
          </li>
        ))}
        <li className="rounded-[--radius] border border-accent-border bg-accent-faint px-3 py-2 font-mono text-xs font-semibold text-accent">
          {DESTINATION}
        </li>
      </ul>
    </>
  );
}
