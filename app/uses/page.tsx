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
 * TODO(austin): this page is scaffolded with the tools already evidenced in the
 * case studies and your certifications. Replace or extend it with what you
 * genuinely reach for day to day, and delete anything here you do not use.
 */
const groups = [
  {
    heading: "What do I write code in?",
    items: [
      ["Editor", "TODO(austin): VS Code, Cursor, JetBrains, something else"],
      ["Terminal", "TODO(austin)"],
      ["Languages", "TypeScript, JavaScript, PHP, Python, SQL"],
    ],
  },
  {
    heading: "What do I build with?",
    items: [
      ["Framework", "Next.js App Router, React, Express for Node services"],
      ["Styling", "Tailwind CSS"],
      ["CMS", "WordPress with custom plugins, Webflow, Wix where it fits"],
      ["Calendars", "FullCalendar for anything date-shaped in the browser"],
    ],
  },
  {
    heading: "Where does it run?",
    items: [
      ["Serverless", "AWS Lambda, DynamoDB, S3"],
      ["Servers", "EC2 when I want the whole box, with Certbot for TLS"],
      ["Managed hosting", "WP Engine for WordPress, Vercel for Next.js"],
      ["Edge and DNS", "Cloudflare"],
    ],
  },
  {
    heading: "What do I run SEO with?",
    items: [
      ["Crawling", "Screaming Frog"],
      ["Search data", "Google Search Console, Google Analytics 4"],
      ["Field data", "Chrome UX Report and Lighthouse for Core Web Vitals"],
      ["Structured data", "Schema.org JSON-LD, validated before it ships"],
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
          The tools behind the work on this site. Kept short, and updated when it
          changes rather than when it would be nice to have updated it.
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
