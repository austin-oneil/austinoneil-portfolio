import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { Section, SectionHeading } from "@/components/ui/section";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "The tools Austin O'Neil builds with: editor, languages, hosting, and the technical SEO stack used across a 100-plus client agency book.",
  alternates: { canonical: "/uses" },
  openGraph: {
    title: "Uses - Austin O'Neil",
    description: "Editor, stack, hosting and the technical SEO toolset.",
    url: "/uses",
    type: "website",
  },
};

/**
 * Everything here is sourced from work that appears in the case studies or in
 * background.md. Where a tool is genuinely unconfirmed it is omitted rather
 * than guessed at, and the gap is noted for Austin below rather than printed
 * on the page as a placeholder.
 *
 * TODO(austin): add your terminal, your shell setup, and anything on the
 * hardware side you want listed. I left those out instead of inventing them.
 */
const groups = [
  {
    heading: "What do I write code in?",
    items: [
      ["Editor", "Cursor, and Claude Code in the terminal for anything agentic"],
      [
        "Languages",
        "TypeScript and JavaScript, PHP, Python, SQL. Whichever one the problem is actually in",
      ],
      [
        "AI in the loop",
        "Claude and Cursor for generation, review and breaking work into pieces. I built a production agent on the Claude API, so I have a fairly grounded sense of what this is good for and what it is not",
      ],
    ],
  },
  {
    heading: "What do I build with?",
    items: [
      ["Framework", "Next.js App Router and React. Express when a Node service is the right answer"],
      ["Styling", "Tailwind, which is what this site is built in"],
      [
        "CMS",
        "WordPress with custom plugins when it needs real behaviour, Webflow when the client needs to own it, Wix when that is honestly the right call",
      ],
      ["Dates in the browser", "FullCalendar, which has yet to let me down"],
    ],
  },
  {
    heading: "Where does it run?",
    items: [
      ["Serverless", "AWS Lambda, DynamoDB and S3. This is where the Basecamp agent lives"],
      ["Servers", "EC2 when I want the whole box, with Certbot handling TLS"],
      ["Managed hosting", "WP Engine for WordPress, Vercel for Next.js"],
      ["Edge and DNS", "Cloudflare, near enough to daily"],
    ],
  },
  {
    heading: "What do I run search with?",
    items: [
      ["Crawling", "Screaming Frog, and SEO PowerSuite for tracking"],
      ["Search data", "Google Search Console, GA4, Bing Webmaster Tools"],
      ["Competitive", "Semrush and Ahrefs"],
      [
        "Behaviour",
        "Microsoft Clarity. Heatmaps and session recordings find conversion problems that no crawler will ever tell you about",
      ],
      ["Speed", "Lighthouse and CrUX field data, not just lab numbers"],
    ],
  },
];

export default function UsesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Uses", path: "/uses" },
        ])}
      />

      <div className="container-page border-b border-border py-16 md:py-20">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance text-text md:text-5xl">
          Uses
        </h1>
        <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-text-muted">
          The tools actually behind the work on this site. Kept short, and
          updated when it changes rather than when it would look good to have
          updated it.
        </p>
      </div>

      {groups.map((group, i) => (
        <Section key={group.heading} bordered={i > 0}>
          <SectionHeading>{group.heading}</SectionHeading>
          <dl className="max-w-3xl border-t border-border">
            {group.items.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-1 border-b border-border py-4 sm:grid-cols-12 sm:gap-6"
              >
                <dt className="font-mono text-xs text-text-subtle sm:col-span-3 sm:pt-1">
                  {label}
                </dt>
                <dd className="leading-relaxed text-text-muted sm:col-span-9">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      ))}
    </>
  );
}
