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
 *  rather than to decorate one.
 *
 *  Animation runs off one shared timeline declared on the list, not a separate
 *  one per row. Per-row timelines meant the lower rows were still part-way
 *  through their fade while you were reading them. Every row now resolves by
 *  the time the block has entered, so anything on screen is fully legible.
 *
 *  Within a row the order is dot, track, destination: the connection being
 *  drawn, rather than three things fading up at once.
 */
export function MappingRoutes() {
  /** Each row's slice of the block's progress.
   *
   *  Everything is capped to finish by 82% of the entry phase rather than
   *  100%. On a phone the rows stack to three lines each and the list gets
   *  close to viewport height, where "fully entered" arrives late or, for a
   *  list taller than the screen, is clamped. Finishing early means the last
   *  row is never still animating while it is being read. */
  const phase = (i: number, offset = 0) => {
    const start = 4 + i * 9 + offset;
    return { animationRange: `entry ${start}% entry ${Math.min(start + 26, 82)}%` };
  };

  return (
    <ol className="tl-scope space-y-5">
      {ROWS.map((row, i) => (
        <li
          key={row.past}
          className="grid items-center gap-x-4 gap-y-2 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,17rem)]"
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="tl-dot size-2.5 shrink-0 rounded-full border-2 border-border-strong bg-bg"
              style={phase(i)}
            />
            <span className="tl-text" style={phase(i, 2)}>
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
              className="tl-track absolute inset-x-0 top-1/2 hidden h-px bg-border-strong md:block"
              style={phase(i, 4)}
            />
            <span
              className="tl-text relative bg-surface px-3 text-[0.8125rem] leading-snug text-text-subtle italic md:mx-auto"
              style={phase(i, 8)}
            >
              {row.built}
            </span>
          </div>

          <div className="flex items-start gap-3 md:justify-self-end">
            <span
              aria-hidden
              className="tl-dot mt-1.5 size-2.5 shrink-0 rounded-full bg-accent"
              style={phase(i, 12)}
            />
            <span
              className="tl-text text-[0.875rem] leading-snug text-text"
              style={phase(i, 14)}
            >
              {row.now}
              {row.evidence ? (
                <>
                  {" "}
                  <Link
                    href={row.evidence.href}
                    className="rounded-(--radius-sm) font-mono text-[0.75rem] whitespace-nowrap text-accent underline decoration-accent-border underline-offset-2 hover:decoration-accent"
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
                    className="rounded-(--radius-sm) font-mono text-[0.75rem] whitespace-nowrap text-accent underline decoration-accent-border underline-offset-2 hover:decoration-accent"
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

/** M3. Skill first.
 *
 *  M1 gave the three parts of each claim equal weight, and the part doing the
 *  arguing (what the job built) was the quietest of the three: small, italic,
 *  subtle, sitting on a hairline. A skim read only the right-hand column and
 *  got a list of accomplishments with no connection to the left.
 *
 *  Here the transferable skill is the headline and the route beneath it is the
 *  evidence: origin station on the left, the track, and the lit destination
 *  station on the right, landing on work that is already on this site. Five
 *  headlines read on their own as the argument; the routes let a careful
 *  reader check each one.
 *
 *  Text is never animated. The only motion is the track drawing from origin to
 *  destination and the destination station lighting when it arrives, which is
 *  the one moment where movement means something: the connection being made.
 *  Everything runs off one timeline scoped to the list and finishes early in
 *  the entry phase, so nothing on screen is still moving while it is read.
 *
 *  Under 768px the route turns vertical: origin above, destination below, a
 *  short connector between them. Same three parts, same order, no reflow that
 *  changes the meaning.
 */
export function MappingSkills() {
  /** Each row's slice of the list's entry. Capped well short of 100% so the
   *  last row has resolved before it can be on screen, even on a phone where
   *  the list is taller than the viewport. */
  const phase = (i: number, offset = 0, span = 20) => {
    const start = 6 + i * 10 + offset;
    return {
      animationRange: `entry ${start}% entry ${Math.min(start + span, 84)}%`,
    };
  };

  const cols =
    "md:grid-cols-[minmax(0,13rem)_minmax(3rem,1fr)_minmax(0,32rem)]";

  return (
    <div>
      <div
        aria-hidden
        className={`hidden gap-x-4 border-b border-border pb-4 md:grid ${cols}`}
      >
        <p className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.14em] text-text-subtle uppercase">
          <span className="size-2.5 shrink-0 rounded-full border-2 border-border-strong bg-bg" />
          Where it came from
        </p>
        <span />
        <p className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.14em] text-text-subtle uppercase">
          <span className="size-2.5 shrink-0 rounded-full bg-accent" />
          Where it shows up now
        </p>
      </div>

      <ol className="tl-scope divide-y divide-border">
        {ROWS.map((row, i) => (
          <li key={row.past} className="py-5 last:pb-0 md:py-6">
            <p className="text-[1.0625rem] leading-snug font-semibold tracking-tight text-text md:text-lg">
              {row.built}
            </p>

            <div
              className={`relative mt-3 md:grid md:items-start md:gap-x-4 ${cols}`}
            >
              {/* Vertical connector, phones only. Height matches the two-line
                  origin block exactly, which is what lets it be fixed. */}
              <span
                aria-hidden
                className="tl-track-v absolute top-[15px] left-1 h-[38px] w-px bg-border-strong md:hidden"
                style={phase(i, 2)}
              />

              <p className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-[5px] size-2.5 shrink-0 rounded-full border-2 border-border-strong bg-bg"
                />
                <span className="min-w-0">
                  <span className="sr-only">From </span>
                  <span className="block font-mono text-[0.8125rem] leading-5 text-text-muted">
                    {row.past}
                  </span>
                  <span className="block font-mono text-[0.6875rem] leading-4 text-text-subtle">
                    {row.years}
                  </span>
                </span>
              </p>

              <span aria-hidden className="relative hidden md:block">
                <span
                  className="tl-track absolute inset-x-0 top-[9px] h-px bg-border-strong"
                  style={phase(i, 2)}
                />
              </span>

              <p className="mt-2.5 flex items-start gap-3 md:mt-0">
                <span
                  aria-hidden
                  className="tl-dot mt-[5px] size-2.5 shrink-0 rounded-full bg-accent"
                  style={phase(i, 14, 14)}
                />
                <span className="min-w-0 text-[0.875rem] leading-5 text-text">
                  <span className="sr-only">to </span>
                  {row.now}
                  {row.evidence ? (
                    <>
                      {" "}
                      <Link
                        href={row.evidence.href}
                        className="rounded-(--radius-sm) font-mono text-[0.75rem] whitespace-nowrap text-accent underline decoration-accent-border underline-offset-2 hover:decoration-accent"
                      >
                        {row.evidence.label}
                      </Link>
                    </>
                  ) : null}
                </span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
