/**
 * Candidate treatments for the throughline graphic, all animated with CSS
 * scroll-driven timelines so none of them cost any JavaScript: no observer, no
 * listener, no library.
 *
 * Shared vocabulary: TRADES is the breadth, muted. SPECIALTY is the depth,
 * accent. Every variant makes the same argument, differently.
 *
 * Where a variant hides something before it animates, the from-state lives
 * inside an @supports guard in globals.css, so a browser without scroll-driven
 * timelines renders the finished state rather than an empty box.
 */

export const TRADES = [
  "Bartending",
  "Hospitality management",
  "Training and leadership",
  "B2B and B2C sales",
  "Technology consulting",
] as const;

export const SPECIALTY = [
  "Full-stack development",
  "Technical SEO",
  "AI automation",
] as const;

/** Stagger by shifting each element's slice of the scroll range. */
function range(i: number, span = 6): React.CSSProperties {
  return { animationRange: `entry ${10 + i * span}% cover ${45 + i * span}%` };
}

/* ---- A. Convergence ---------------------------------------------------- */
export function VariantConvergence() {
  const ys = [46, 118, 190, 262, 334];
  const dotX = 322;
  const hubX = 600;
  const hubY = 190;
  return (
    <svg
      viewBox="0 0 780 420"
      className="h-auto w-full"
      role="img"
      aria-label="Five trades converging on one specialty"
    >
      {ys.map((y, i) => (
        <path
          key={i}
          pathLength={1}
          className="tl-draw"
          style={range(i, 5)}
          d={`M ${dotX} ${y} C ${dotX + 130} ${y}, ${hubX - 140} ${hubY}, ${hubX} ${hubY}`}
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth={2}
        />
      ))}
      {ys.map((y, i) => (
        <g key={i} className="tl-rise" style={range(i, 5)}>
          <text
            x={dotX - 22}
            y={y + 6}
            textAnchor="end"
            className="fill-text-muted font-mono"
            style={{ fontSize: 19 }}
          >
            {TRADES[i]}
          </text>
          <circle cx={dotX} cy={y} r={6} fill="var(--bg)" stroke="var(--border-strong)" strokeWidth={2} />
        </g>
      ))}
      <g className="tl-pop">
        <circle cx={hubX} cy={hubY} r={15} fill="var(--bg)" stroke="var(--accent)" strokeWidth={2} />
        <circle cx={hubX} cy={hubY} r={7} fill="var(--accent)" />
      </g>
      {SPECIALTY.map((line, i) => (
        <text
          key={line}
          className="tl-rise fill-text font-mono font-semibold"
          style={{ fontSize: 19, ...range(i + 4, 6) }}
          x={hubX}
          y={hubY + 48 + i * 28}
          textAnchor="middle"
        >
          {line}
        </text>
      ))}
    </svg>
  );
}

/* ---- D. Strata: the specialty sits on top of the foundation ------------- */
export function VariantStrata() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 font-mono text-[0.6875rem] tracking-[0.18em] text-accent uppercase">
          What I do now
        </p>
        <ul className="space-y-2">
          {SPECIALTY.map((line, i) => (
            <li
              key={line}
              className="tl-rise rounded-[--radius] border border-accent bg-surface px-4 py-3 font-mono text-[0.9375rem] font-semibold text-text"
              style={range(i, 5)}
            >
              {line}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-3 font-mono text-[0.6875rem] tracking-[0.18em] text-text-subtle uppercase">
          Built on twelve years of
        </p>
        <ul className="space-y-1.5">
          {TRADES.map((trade, i) => (
            <li
              key={trade}
              className="tl-rise rounded-[--radius-sm] border border-border px-4 py-2 font-mono text-[0.8125rem] text-text-muted"
              style={range(i + 3, 4)}
            >
              {trade}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---- E. Grid: no connecting lines at all -------------------------------- */
export function VariantGrid() {
  const all = [...TRADES, ...SPECIALTY];
  return (
    <ul className="grid grid-cols-2 gap-3">
      {all.map((item, i) => {
        const hot = (SPECIALTY as readonly string[]).includes(item);
        return (
          <li
            key={item}
            style={range(i, 3)}
            className={`tl-rise flex items-center justify-between gap-3 rounded-[--radius] border px-4 py-4 font-mono text-[0.8125rem] ${
              hot
                ? "border-accent bg-surface font-semibold text-text"
                : "border-border text-text-muted"
            }`}
          >
            {item}
            {hot ? (
              <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent" />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

/* ---- F. One line gaining weight ---------------------------------------- */
export function VariantWeight() {
  const y = 150;
  const x0 = 70;
  const x1 = 660;
  return (
    <svg
      viewBox="0 0 780 300"
      className="h-auto w-full"
      role="img"
      aria-label="A single line gaining weight from twelve years of trades into one specialty"
    >
      <defs>
        <linearGradient id="tl-weight" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--border-strong)" />
          <stop offset="66%" stopColor="var(--border-strong)" />
          <stop offset="74%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
        <clipPath id="tl-wedge">
          <path d={`M ${x0} ${y - 1.5} L ${x1} ${y - 9} L ${x1} ${y + 9} L ${x0} ${y + 1.5} Z`} />
        </clipPath>
      </defs>
      <g clipPath="url(#tl-wedge)">
        <rect className="tl-grow" x={x0} y={y - 14} width={x1 - x0} height={28} fill="url(#tl-weight)" />
      </g>
      {TRADES.map((t, i) => {
        const x = x0 + (x1 - x0) * (0.04 + i * 0.17);
        return (
          <g key={t} className="tl-rise" style={range(i, 6)}>
            <line x1={x} y1={y - 16} x2={x} y2={y - 36} stroke="var(--border-strong)" strokeWidth={1} />
            <text
              x={x}
              y={y - 46}
              textAnchor="middle"
              className="fill-text-muted font-mono"
              style={{ fontSize: 15 }}
            >
              {t.split(" ")[0]}
            </text>
          </g>
        );
      })}
      {SPECIALTY.map((line, i) => (
        <text
          key={line}
          className="tl-rise fill-text font-mono font-semibold"
          style={{ fontSize: 18, ...range(i + 3, 6) }}
          x={x1 + 90}
          y={y + 44 + i * 26}
          textAnchor="end"
        >
          {line}
        </text>
      ))}
    </svg>
  );
}

/* ---- G. No diagram, a typographic ledger -------------------------------- */
export function VariantLedger() {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.18em] text-text-subtle uppercase">
          Twelve years of
        </p>
        <ul className="space-y-2.5">
          {TRADES.map((t, i) => (
            <li key={t} className="tl-rise font-mono text-[0.9375rem] text-text-muted" style={range(i, 4)}>
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="sm:border-l sm:border-border sm:pl-8">
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.18em] text-accent uppercase">
          So that now
        </p>
        <ul className="space-y-3">
          {SPECIALTY.map((t, i) => (
            <li
              key={t}
              className="tl-rise text-lg font-semibold tracking-tight text-text"
              style={range(i + 2, 5)}
            >
              {t}
            </li>
          ))}
        </ul>
        <p className="tl-rise mt-5 max-w-[34ch] text-sm leading-relaxed text-text-muted" style={range(5, 5)}>
          And the judgement to know which one a problem actually needs.
        </p>
      </div>
    </div>
  );
}
