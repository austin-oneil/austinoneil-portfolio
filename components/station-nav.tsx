import Link from "next/link";

/**
 * The line map: a horizontal strip of stations above the hero, acting as
 * in-page navigation and as the legend that makes the vertical rail below it
 * legible rather than decorative.
 *
 * The first dot carries data-rail-origin. SubwayLine measures it and starts
 * the track there, curving down into the hero station, so the horizontal strip
 * and the vertical rail read as one continuous line.
 *
 * Labels deliberately differ from the site header's. The header navigates
 * between pages; this navigates within one. Two links called "Work" pointing
 * at different destinations is the confusion worth avoiding.
 *
 * Desktop only, matching the rail. Below 900px there is no track for it to be
 * the legend of, and it would just be a second nav.
 */
const stations = [
  { href: "#work", label: "Projects" },
  { href: "#stack", label: "Toolkit" },
  { href: "#story", label: "My story" },
  { href: "#questions", label: "Questions" },
  { href: "#contact", label: "Contact" },
];

export function StationNav() {
  return (
    <nav
      aria-label="Sections of this page"
      className="hidden pb-10 md:block"
    >
      <ol className="flex items-center">
        {stations.map((station, i) => (
          <li
            key={station.href}
            className={i === 0 ? "shrink-0" : "flex min-w-0 flex-1 items-center"}
          >
            {i > 0 ? (
              <span
                aria-hidden
                className="mx-3 h-px flex-1 bg-border-strong"
              />
            ) : null}
            <Link
              href={station.href}
              className="group inline-flex shrink-0 items-center gap-2 rounded-[--radius-sm] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <span
                {...(i === 0 ? { "data-rail-origin": "" } : {})}
                aria-hidden
                className="inline-block size-2.5 shrink-0 rounded-full border-2 border-border-strong bg-bg transition-colors duration-150 group-hover:border-accent"
              />
              <span className="font-mono text-xs whitespace-nowrap text-text-subtle transition-colors duration-150 group-hover:text-text">
                {station.label}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
