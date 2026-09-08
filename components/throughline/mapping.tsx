import Link from "next/link";

/**
 * The throughline as a mapping rather than a timeline.
 *
 * Every earlier version showed sequence: these things happened, in this order,
 * and now here we are. Sequence is not an argument. It never says why twelve
 * years of hospitality makes someone better at this job, it just puts them next
 * to each other and hopes.
 *
 * Each row here is a claim with three parts: what the work was, the specific
 * transferable thing it built, and where that shows up in the job now. The
 * third column is the load-bearing one, because it lands on real work that is
 * already on this site rather than on an adjective. A reader can click through
 * and check.
 */

interface Link_ {
  href: string;
  label: string;
}

interface Row {
  past: string;
  years: string;
  built: string;
  now: string;
  evidence?: Link_;
}

export const ROWS: Row[] = [
  {
    past: "Hospitality management",
    years: "2012 - 2017",
    built: "Building a system other people can run without me",
    now: "Conversion layouts I designed once that the whole agency now reuses",
    evidence: {
      href: "/projects/agency-cms-architecture",
      label: "Agency work",
    },
  },
  {
    past: "Training and leadership",
    years: "2012 - 2017",
    built: "Explaining a complicated thing so it actually sticks",
    now: "Main technical point of contact for 30-plus accounts, translating between engineers and owners",
  },
  {
    past: "B2B and B2C sales",
    years: "2017 - 2018",
    built: "Answering the objection before anyone has to raise it",
    now: "Account Executive work: client relationships, funnel diagnosis, and the conversion paths that come out of it",
  },
  {
    past: "Bartending",
    years: "2018 - 2024",
    built: "Staying calm and useful when four things break at once",
    now: "Diagnosing a dead launch in 48 hours, and closing a credential breach across every client in 24",
    evidence: { href: "/projects/dnvr-phnx", label: "DNVR and PHNX" },
  },
  {
    past: "Technology consulting",
    years: "2021 - now",
    built: "Owning an engagement from scoping through to still running it",
    now: "Eight client builds carried start to finish, most of them still live",
    evidence: { href: "/projects", label: "All work" },
  },
];

/** M1. Each row is a short route: past station, the reason on the track,
 *  present station. Uses the site's transit language to carry an argument
 *  rather than to decorate one. */
export function MappingRoutes() {
  return (
    <ol className="space-y-5">
      {ROWS.map((row, i) => (
        <li
          key={row.past}
          className="tl-rise grid items-center gap-x-4 gap-y-2 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,17rem)]"
          style={{ animationRange: `entry ${8 + i * 5}% cover ${42 + i * 5}%` }}
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="size-2.5 shrink-0 rounded-full border-2 border-border-strong bg-bg"
            />
            <span>
              <span className="block font-mono text-[0.8125rem] text-text-muted">
                {row.past}
              </span>
              <span className="block font-mono text-[0.6875rem] text-text-subtle">
                {row.years}
              </span>
            </span>
          </div>

          <div className="relative flex items-center py-1 pl-5 md:pl-0">
            <span
              aria-hidden
              className="absolute inset-x-0 top-1/2 hidden h-px bg-border-strong md:block"
            />
            <span className="relative bg-surface px-3 text-[0.8125rem] leading-snug text-text-subtle italic md:mx-auto">
              {row.built}
            </span>
          </div>

          <div className="flex items-start gap-3 md:justify-self-end">
            <span
              aria-hidden
              className="mt-1.5 size-2.5 shrink-0 rounded-full bg-accent"
            />
            <span className="text-[0.875rem] leading-snug text-text">
              {row.now}
              {row.evidence ? (
                <>
                  {" "}
                  <Link
                    href={row.evidence.href}
                    className="rounded-[--radius-sm] font-mono text-[0.75rem] whitespace-nowrap text-accent underline decoration-accent-border underline-offset-2 hover:decoration-accent"
                  >
                    {row.evidence.label}
                  </Link>
                </>
              ) : null}
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** M2. The same argument as a plain three-column table. No transit language,
 *  no ornament: the mapping is the whole point and the columns are labelled so
 *  nobody has to infer what they are looking at. */
export function MappingTable() {
  return (
    <div>
      <div className="hidden grid-cols-[minmax(0,14rem)_minmax(0,1fr)_minmax(0,18rem)] gap-x-6 border-b border-border pb-3 md:grid">
        {["Where it came from", "What it built", "Where it shows up now"].map(
          (h) => (
            <p
              key={h}
              className="font-mono text-[0.6875rem] tracking-[0.16em] text-text-subtle uppercase"
            >
              {h}
            </p>
          ),
        )}
      </div>
      <ol>
        {ROWS.map((row, i) => (
          <li
            key={row.past}
            className="tl-rise grid gap-x-6 gap-y-1 border-b border-border py-5 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_minmax(0,18rem)]"
            style={{ animationRange: `entry ${8 + i * 5}% cover ${42 + i * 5}%` }}
          >
            <div>
              <p className="font-mono text-[0.8125rem] text-text-muted">
                {row.past}
              </p>
              <p className="font-mono text-[0.6875rem] text-text-subtle">
                {row.years}
              </p>
            </div>
            <p className="text-[0.875rem] leading-snug text-text-subtle italic">
              {row.built}
            </p>
            <p className="text-[0.875rem] leading-snug text-text">
              {row.now}
              {row.evidence ? (
                <>
                  {" "}
                  <Link
                    href={row.evidence.href}
                    className="rounded-[--radius-sm] font-mono text-[0.75rem] whitespace-nowrap text-accent underline decoration-accent-border underline-offset-2 hover:decoration-accent"
                  >
                    {row.evidence.label}
                  </Link>
                </>
              ) : null}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
