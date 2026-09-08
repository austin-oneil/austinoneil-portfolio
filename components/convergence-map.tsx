/**
 * The trades on the left, the specialty on the right, drawn in the site's own
 * transit language: five lines running in and meeting at one interchange.
 *
 * The shape is the argument. Breadth is real and it is on the page, but it all
 * runs toward one destination rather than sitting in a flat list of equal
 * skills, which is what "a lot of trades, one I went deep on" actually looks
 * like when you draw it.
 *
 * Real SVG with real text rather than an exported image, so it scales, follows
 * the theme, stays selectable and costs no network request. Server component,
 * no JavaScript.
 *
 * Below md the curves would compress the labels past reading, so the same
 * content renders as grouped lists instead. Neither version is decorative.
 */

const TRADES = [
  "Bartending",
  "Hospitality management",
  "Training and leadership",
  "B2B and B2C sales",
  "Technology consulting",
] as const;

const SPECIALTY = [
  "Full-stack development",
  "Technical SEO",
  "AI automation",
] as const;

export function ConvergenceMap() {
  const rowY = [46, 118, 190, 262, 334];
  const dotX = 322;
  const hubX = 600;
  const hubY = 190;

  return (
    <>
      <svg
        viewBox="0 0 780 420"
        className="hidden h-auto w-full md:block"
        role="img"
        aria-labelledby="convergence-title convergence-desc"
      >
        <title id="convergence-title">
          Five trades converging on one specialty
        </title>
        <desc id="convergence-desc">
          {`${TRADES.join(", ")} all lead to ${SPECIALTY.join(", ")}.`}
        </desc>

        {rowY.map((y, i) => (
          <path
            key={TRADES[i]}
            d={`M ${dotX} ${y} C ${dotX + 130} ${y}, ${hubX - 140} ${hubY}, ${hubX} ${hubY}`}
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth={2}
          />
        ))}

        {rowY.map((y, i) => (
          <g key={TRADES[i]}>
            <text
              x={dotX - 22}
              y={y + 6}
              textAnchor="end"
              className="fill-text-muted font-mono"
              style={{ fontSize: 19 }}
            >
              {TRADES[i]}
            </text>
            <circle
              cx={dotX}
              cy={y}
              r={6}
              fill="var(--bg)"
              stroke="var(--border-strong)"
              strokeWidth={2}
            />
          </g>
        ))}

        {/* The interchange. Filled, because this is the one node everything
            else is running toward. */}
        <circle cx={hubX} cy={hubY} r={15} fill="var(--bg)" stroke="var(--accent)" strokeWidth={2} />
        <circle cx={hubX} cy={hubY} r={7} fill="var(--accent)" />

        {SPECIALTY.map((line, i) => (
          <text
            key={line}
            x={hubX}
            y={hubY + 48 + i * 28}
            textAnchor="middle"
            className="fill-text font-mono font-semibold"
            style={{ fontSize: 19 }}
          >
            {line}
          </text>
        ))}
      </svg>

      <div className="space-y-3 md:hidden">
        <ul className="flex flex-wrap gap-2">
          {TRADES.map((trade) => (
            <li
              key={trade}
              className="rounded-[--radius] border border-border bg-surface px-3 py-2 font-mono text-xs text-text-muted"
            >
              {trade}
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap gap-2">
          {SPECIALTY.map((line) => (
            <li
              key={line}
              className="rounded-[--radius] border border-accent-border bg-accent-faint px-3 py-2 font-mono text-xs font-semibold text-accent"
            >
              {line}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
