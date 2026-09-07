import Image from "next/image";
import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { breadcrumbSchema, personSchema } from "@/lib/schema";
import { BLUR_DATA_URL, placeholder } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Austin O'Neil is a developer and technical SEO specialist in Denver. Senior SEO Specialist at Prospecta Marketing, independent full-stack developer through Tangent Apps, and a 2026 computer science graduate.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About - Austin O'Neil",
    description:
      "Developer and technical SEO specialist in Denver. The long version.",
    url: "/about",
    type: "profile",
  },
};

/**
 * Concurrent by design. Tangent Apps runs alongside full-time employment, so
 * the timeline states that explicitly rather than leaving overlapping dates to
 * be read as job-hopping.
 */
const timeline = [
  {
    period: "Feb 2024 - present",
    role: "Senior SEO Specialist and Account Executive",
    org: "Prospecta Marketing",
    body: "A fully remote digital marketing agency. The title says SEO. In practice the scope is front-end development, WordPress and Webflow CMS architecture, custom plugin development, internal tooling and serverless automation. I am the main technical point of contact for 30-plus client accounts at a time inside a book of more than 100.",
  },
  {
    period: "Mar 2021 - present",
    role: "Full-stack developer",
    org: "Tangent Apps",
    body: "My own independent consulting company, run concurrently with full-time work rather than between jobs. Client engagements include Vocation Action Network, Lacroix Hockey and Drill House Sports Center, and Ahead of the Curve Media.",
    concurrent: true,
  },
  {
    period: "2021 - 2022",
    role: "Front-end developer",
    org: "All City Media",
    body: "Designed and built the full WordPress front end for DNVR and PHNX, including the first build outside the native market, and worked directly with the CEO through an infrastructure failure 48 hours before launch.",
  },
];

const skills = [
  {
    heading: "Languages and runtimes",
    items: ["TypeScript", "JavaScript", "PHP", "Python", "SQL", "Node.js"],
  },
  {
    heading: "Frameworks and platforms",
    items: [
      "React",
      "Next.js",
      "Express",
      "WordPress",
      "Webflow",
      "Wix",
      "FullCalendar",
    ],
  },
  {
    heading: "Infrastructure",
    items: [
      "AWS Lambda",
      "EC2",
      "DynamoDB",
      "S3",
      "RDS",
      "Route 53",
      "Cloudflare",
      "WP Engine",
      "Vercel",
    ],
  },
  {
    heading: "Search",
    items: [
      "Technical SEO",
      "Answer engine optimization",
      "Structured data",
      "Core Web Vitals",
      "CMS architecture",
      "Site migrations",
    ],
  },
];

const certifications = [
  { name: "B.S. Computer Science, Western Governors University", status: "Completed February 2026" },
  { name: "Meta Front-End Developer", status: "Certified" },
  { name: "HIPAA", status: "Certified" },
  { name: "AWS Solutions Architect, Associate", status: "In progress" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          personSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      <div className="container-page border-b border-border py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:items-start md:gap-12">
          <div className="md:col-span-8">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance text-text md:text-5xl">
              A developer who does SEO, or an SEO who ships code
            </h1>
            <div className="mt-6 max-w-[62ch] space-y-5 text-lg leading-relaxed text-text-muted">
              <p>
                Both descriptions are accurate and neither is the whole thing. I
                work at a digital marketing agency where my title is Senior SEO
                Specialist, and most of what I do there is build software.
              </p>
              <p>
                That combination is unusual enough to be worth explaining. Most
                developers treat search as someone else&apos;s department, and
                most search specialists stop at the point where the fix requires
                changing code. Sitting in both means I can tell you why a
                rendering decision costs you indexation and then go change the
                rendering.
              </p>
              <p>
                I am in Denver, and open to relocating to Seattle or elsewhere on
                the West Coast.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`mailto:${site.email}`}>Get in touch</ButtonLink>
              <ButtonLink href="/projects" variant="outline">
                See the work
              </ButtonLink>
            </div>
          </div>

          <div className="md:col-span-4">
            <Image
              src={placeholder("austin-oneil-portrait", 1000, 1250)}
              alt={`${site.name}, ${site.role}`}
              width={1000}
              height={1250}
              priority
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              sizes="(min-width: 768px) 20rem, 100vw"
              className="aspect-[4/5] w-full rounded-[--radius] border border-border object-cover"
            />
          </div>
        </div>
      </div>

      <Section>
        <SectionHeading>Where I have worked</SectionHeading>
        <ol className="border-t border-border">
          {timeline.map((entry) => (
            <li
              key={`${entry.org}-${entry.period}`}
              className="grid gap-2 border-b border-border py-8 md:grid-cols-12 md:gap-8"
            >
              <div className="md:col-span-4">
                <p className="font-mono text-xs text-text-subtle">
                  {entry.period}
                </p>
                <h3 className="mt-2 font-semibold tracking-tight text-text">
                  {entry.org}
                </h3>
                <p className="mt-1 text-sm text-text-muted">{entry.role}</p>
                {entry.concurrent ? (
                  <p className="mt-3">
                    <Tag tone="accent">Concurrent with full-time work</Tag>
                  </p>
                ) : null}
              </div>
              <p className="max-w-[62ch] leading-relaxed text-text-muted md:col-span-8">
                {entry.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section bordered>
        <SectionHeading>What I work with</SectionHeading>
        <div className="grid gap-8 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group.heading}>
              <h3 className="font-semibold tracking-tight text-text">
                {group.heading}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-[62ch] rounded-[--radius] border border-border bg-surface-2 p-4 text-sm leading-relaxed text-text-muted">
          One calibration worth stating plainly: I am proficient in Next.js and
          TypeScript, and no employer has paid me for Next.js work. The strongest
          evidence I have is an interview take-home, and it is labelled as one.
        </p>
      </Section>

      <Section bordered>
        <SectionHeading>Education and certifications</SectionHeading>
        <dl className="max-w-2xl border-t border-border">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border py-4"
            >
              <dt className="text-text">{cert.name}</dt>
              <dd className="font-mono text-xs text-text-subtle">
                {cert.status}
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
