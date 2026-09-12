import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { Section, SectionHeading } from "@/components/ui/section";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "How this site is built",
  description:
    "The stack, the search surface, and the performance and accessibility decisions behind austinoneil.me. Every claim on this page can be checked in the page source.",
  alternates: { canonical: "/colophon" },
  openGraph: {
    title: "How this site is built - Austin O'Neil",
    description:
      "Stack, structured data, generated sitemap and feed, zero-flash theme, zero third-party scripts.",
    url: "/colophon",
    type: "website",
  },
};

/**
 * The site as evidence. Every line here maps to a file in the repository, and
 * nothing is stated that a reader cannot confirm by viewing source or fetching
 * the route named. No scores or measurements: those drift, and a claim that
 * drifts is worse than no claim.
 */
const groups = [
  {
    heading: "What is it built with?",
    items: [
      [
        "Framework",
        "Next.js 16 on the App Router, React 19, TypeScript in strict mode. Every page is rendered at build time",
      ],
      [
        "Styling",
        "Tailwind CSS v4. Every colour, radius and font is a CSS custom property, so both themes share one stylesheet and one set of tokens",
      ],
      [
        "Content",
        "Case studies and posts are MDX files with typed loaders. Adding a project means adding one file, never editing a component",
      ],
      [
        "Motion",
        "Scroll reveals are CSS scroll-driven timelines, which cost no JavaScript. The one scroll-coupled component, the rail on the home page, uses Motion to read scroll position and writes straight to the DOM",
      ],
      ["Hosting", "Vercel, deploying from the main branch"],
    ],
  },
  {
    heading: "What does the search surface look like?",
    items: [
      [
        "Metadata",
        "Every page sets its own title, description and canonical URL, derived from the content file rather than typed twice",
      ],
      [
        "Structured data",
        "JSON-LD on every page. Person and WebSite on the home page. Each case study and post carries its own graph, with breadcrumbs",
      ],
      [
        "Social previews",
        "Open Graph images are generated per page at build time from the page's own title and summary",
      ],
      [
        "Generated files",
        "sitemap.xml, robots.txt and the RSS feed are built from the content at deploy time and never hand-edited. Draft posts are excluded from the index, the sitemap and the feed by one rule in the loader, so a draft cannot leak into any of them",
      ],
      [
        "Answer engines",
        "An llms.txt at the root summarises the site in plain text for retrieval agents, generated from the same files as the pages. The AI crawlers that would read it are named and allowed explicitly in robots.txt",
      ],
      [
        "Real 404s",
        "The development-only reference pages return a 404 status from middleware in production, not a 200 with a loading skeleton. A soft 404 is the kind of thing this site exists to say I notice",
      ],
    ],
  },
  {
    heading: "Why is it fast?",
    items: [
      [
        "Fonts",
        "Plus Jakarta Sans and JetBrains Mono are self-hosted through next/font with fallback metrics, so the swap causes no layout shift",
      ],
      [
        "Images",
        "The hero portrait is the only priority asset. Everything else lazy-loads with a blur placeholder and explicit dimensions",
      ],
      [
        "Scroll",
        "A scroll from the top of the home page to the bottom causes zero React re-renders. The rail's dash offset, station states and tunnel lighting are written directly to the DOM",
      ],
      [
        "Third parties",
        "None. No analytics script, no tag manager, no consent banner, no external font or icon requests. Brand marks are inline SVG from a package",
      ],
    ],
  },
  {
    heading: "Is it accessible?",
    items: [
      [
        "Contrast",
        "Verified to WCAG 2.1 AA in both themes, with the ratios recorded next to each colour token in the stylesheet",
      ],
      [
        "Keyboard",
        "Skip link, correct landmarks, visible focus rings, and every interaction reachable without a mouse",
      ],
      [
        "Theme",
        "An inline script stamps the theme on the root element before first paint, so there is no flash. A manual choice persists over the OS setting",
      ],
      [
        "Motion",
        "Reduced motion collapses every animation and transition. Nothing on the site is hidden until an animation runs, so content never depends on one",
      ],
    ],
  },
];

export default function ColophonPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "How this site is built", path: "/colophon" },
        ])}
      />

      <div className="container-page border-b border-border py-16 md:py-20">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance text-text md:text-5xl">
          How this site is built
        </h1>
        <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-text-muted">
          A portfolio for someone who does technical SEO should hold up to the
          same audit I would run on a client. This is what is under it.
          Everything here can be checked by viewing the source of any page or
          fetching the route named. The repository is public:{" "}
          <a
            href="https://github.com/austin-oneil/austinoneil-portfolio"
            rel="noopener noreferrer"
            className="rounded-(--radius-sm) font-medium text-accent underline decoration-accent-border underline-offset-4 transition-colors duration-150 hover:decoration-accent"
          >
            austin-oneil/austinoneil-portfolio
          </a>
          .
        </p>
      </div>

      {groups.map((group, i) => (
        <Section key={group.heading} bordered={i > 0}>
          <SectionHeading>{group.heading}</SectionHeading>
          <dl className="max-w-3xl border-t border-border">
            {group.items.map(([term, detail]) => (
              <div
                key={term}
                className="grid gap-1 border-b border-border py-5 md:grid-cols-12 md:gap-8"
              >
                <dt className="font-mono text-[0.8125rem] text-text-subtle md:col-span-3">
                  {term}
                </dt>
                <dd className="leading-relaxed text-text-muted md:col-span-9">
                  {detail}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      ))}
    </>
  );
}
