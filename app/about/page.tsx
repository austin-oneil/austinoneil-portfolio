import Image from "next/image";
import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { breadcrumbSchema, personSchema } from "@/lib/schema";
import { BLUR_DATA_URL, PORTRAIT_IMAGE } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Austin O'Neil is a developer and technical SEO specialist in Denver. Twelve years in hospitality and sales before software, homeschooled and self-taught, now Senior SEO Specialist at Prospecta Marketing and an independent developer through Tangent Apps.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About - Austin O'Neil",
    description:
      "Developer and technical SEO in Denver. The long version, including the twelve years before the code.",
    url: "/about",
    type: "profile",
  },
};

/**
 * Technical roles. Tangent Apps runs alongside full-time work rather than
 * between jobs, and the timeline says so, so overlapping dates never read as
 * job-hopping.
 */
const technical = [
  {
    period: "Feb 2024 - present",
    role: "Senior SEO Specialist and Account Executive",
    org: "Prospecta Marketing",
    body: "A fully remote digital marketing agency serving more than 100 clients. The title says SEO. The day job is front-end development, WordPress and Webflow CMS architecture, custom plugin development, internal tooling and serverless automation. I am the main technical point of contact for 30-plus accounts at a time. Small team, almost no formal onboarding, which meant figuring it out was the job description from week one.",
    marks: ["Promoted twice in two years", "CTO succession track"],
  },
  {
    period: "Mar 2021 - present",
    role: "Full-stack developer",
    org: "Tangent Apps",
    body: "My own consulting company. Vocation Action Network, Lacroix Hockey and Drill House Sports Center, Ahead of the Curve Media, DNVR and PHNX. I run these alongside full-time work, not between jobs, which is why the dates overlap everything else on this page.",
    marks: ["Concurrent with full-time work"],
  },
  {
    period: "2021 - 2022",
    role: "Front-end developer",
    org: "All City Media",
    body: "Designed and built the full WordPress front end for DNVR and PHNX, a sports media startup, including their first build outside the home market. Then spent the 48 hours before launch working directly with the CEO to diagnose why the infrastructure had gone dark.",
  },
];

/**
 * The twelve customer-facing years. Deliberately given the same visual weight
 * as the technical roles rather than tucked into a footnote: this is the half
 * of the background that explains how he works, not a gap to apologize for.
 */
const hospitality = [
  {
    period: "2022 - 2024",
    role: "Bartender",
    org: "El Five, Denver",
    body: "Front bar and service bar. Best-selling cocktail award, Q4 2022 and Q3 2023.",
  },
  {
    period: "2021 - 2022",
    role: "Bartender",
    org: "The DNVR Bar, Denver",
    body: "High-volume sports bar. Helped the GM with operations and inventory, and supported the DNVR media team with digital content.",
  },
  {
    period: "2020 - 2021",
    role: "Bartender and interim manager",
    org: "TAG Restaurant Group, Denver",
    body: "Two locations. Interim shift management across front and back of house, plus inventory and data entry.",
  },
  {
    period: "2019 - 2020",
    role: "Bartender",
    org: "Renaissance Hotel Downtown, Denver",
    body: "Craft cocktail bar. Collaborated on the quarterly beverage menu.",
  },
  {
    period: "2018 - 2019",
    role: "Server",
    org: "The Kitchen Bistro, Denver",
    body: "High-level service at a four-star farm-to-table restaurant. Where I learned that most of hospitality is anticipating the thing before anyone asks for it.",
  },
  {
    period: "2017 - 2018",
    role: "Online sales and leasing consultant",
    org: "Asbury Automotive Group",
    body: "I lasted a couple of months on the showroom floor before moving into online sales, which the industry had barely started doing. The job was handling a stranger's objections over the phone well enough that they arrived already decided. Top salesperson in the Honda and Acura department every month I was there, closing 13.5 percent of fresh leads against a 12 percent target, whether I closed the deal on the phone or handed off a qualified buyer to the floor. I got there by breaking the script the sales managers wanted read: listening first, and taking the customer's side when those two things conflicted.",
  },
  {
    period: "2012 - 2017",
    role: "Training director",
    org: "Chick-fil-A",
    body: "Shift management and daily operations at a franchise clearing more than $3M in annual net income. Built a growth template that let people move from cashier to director on a defined path.",
  },
];

const skills = [
  {
    heading: "Languages and frameworks",
    items: [
      "TypeScript",
      "JavaScript",
      "PHP",
      "Python",
      "SQL",
      "React",
      "Next.js",
      "Astro",
      "Node.js",
      "Express",
      "Tailwind CSS",
    ],
  },
  {
    heading: "Platforms and infrastructure",
    items: [
      "AWS Lambda",
      "DynamoDB",
      "S3",
      "EC2",
      "Vercel",
      "Cloudflare",
      "WP Engine",
      "WordPress",
      "Webflow",
      "Docker",
      "Git",
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
      "GA4",
      "Search Console",
    ],
  },
];

const certifications = [
  {
    name: "B.S. Computer Science, Western Governors University",
    status: "February 2026",
  },
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
              I spent twelve years talking to people before I got paid to write
              code
            </h1>
            <div className="mt-6 max-w-[62ch] space-y-5 text-lg leading-relaxed text-text-muted">
              <p>
                Restaurants, a car dealership, and six years behind a bar. Then
                software. Most people read that as a career change. I read it as
                the reason I am good at this one.
              </p>
              <p>
                Here is what twelve years of customer-facing work actually teaches
                you: how to explain something complicated to a person who did
                not ask for a lecture, how to tell what someone needs when they
                have described it badly, and how to stay level when four things
                break at once and everybody is looking at you. That is not a
                soft skill. That is most of the job when you are the technical
                point of contact for thirty accounts.
              </p>
              <p>
                The other half of it is that I get to new things early, and I
                would rather advocate for the person in front of me than follow
                a process that is not serving them. At the dealership that meant
                moving into online sales before most of the industry took it
                seriously, then ignoring the script I was handed and leading
                with actual questions instead. It made the sales managers
                uncomfortable. It also made me the top salesperson in my
                department every month I was there. I have not found a reason to
                work differently since.
              </p>
              <p>
                I was homeschooled from seventh grade on, which mostly meant
                nobody was coming to teach me, so I learned how to learn things.
                That habit is why I can be handed an unfamiliar stack on a
                deadline and come back with an answer instead of an excuse.
              </p>
              <p>
                I genuinely like building things and taking puzzles apart. I am
                honest to a fault. I would rather walk down the hall and ask the
                question than guess and ship it wrong.
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
              src={PORTRAIT_IMAGE}
              alt={`${site.name}, ${site.role}`}
              width={1000}
              height={1250}
              priority
              fetchPriority="high"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              sizes="(min-width: 768px) 20rem, 100vw"
              className="aspect-[4/5] w-full rounded-[--radius] border border-border object-cover"
            />
          </div>
        </div>
      </div>

      <Section>
        <SectionHeading>How the two halves met</SectionHeading>
        <div className="max-w-[68ch] space-y-5 leading-relaxed text-text-muted">
          <p>
            In 2021 I was working the bar at The DNVR Bar, a high-volume sports
            bar in Denver, helping their media team with digital content when
            they needed it. By 2022 I had designed and built the full WordPress
            front end for DNVR and PHNX, both properties, from scratch.
          </p>
          <p>
            Then, 48 hours before the PHNX launch, the site came off AWS and the
            developer who owned that infrastructure stopped answering. I was the
            front-end guy. I was not on call for any of it. I learned enough AWS
            under deadline to describe exactly what was broken, took it straight
            to the CEO, and found and oriented a replacement developer in time
            to launch with hours to spare.
          </p>
          <p>
            That is the clearest version of what I actually do. The technical
            work and the people work were the same job, and neither half would
            have gotten there alone.
          </p>
          {/*
            TODO(austin): if the bar work is what led to the DNVR/PHNX
            engagement, say so outright, it is a better story told straight.
            I have kept the two facts adjacent without claiming the causal link,
            since background.md does not state it.
          */}
        </div>
      </Section>

      <Section bordered>
        <SectionHeading>Technical work</SectionHeading>
        <ol className="border-t border-border">
          {technical.map((entry) => (
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
                {entry.marks ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {entry.marks.map((mark) => (
                      <Tag key={mark} tone="accent">
                        {mark}
                      </Tag>
                    ))}
                  </div>
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
        <SectionHeading>The twelve years before</SectionHeading>
        <p className="mb-8 max-w-[64ch] leading-relaxed text-text-muted">
          Listed properly rather than buried, because it is half of why I work
          the way I do. Every one of these was a job where being good at it
          meant being good with people under pressure.
        </p>
        <ol className="border-t border-border">
          {hospitality.map((entry) => (
            <li
              key={`${entry.org}-${entry.period}`}
              className="grid gap-1 border-b border-border py-6 md:grid-cols-12 md:gap-8"
            >
              <div className="md:col-span-4">
                <p className="font-mono text-xs text-text-subtle">
                  {entry.period}
                </p>
                <h3 className="mt-2 font-semibold tracking-tight text-text">
                  {entry.org}
                </h3>
                <p className="mt-1 text-sm text-text-muted">{entry.role}</p>
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
        <p className="mt-8 max-w-[64ch] rounded-[--radius] border border-border bg-surface-2 p-4 text-sm leading-relaxed text-text-muted">
          One calibration I would rather state than have you find out: I am
          genuinely proficient in Next.js and TypeScript, and no employer has
          paid me for either. The evidence is an interview take-home, and it is
          labelled as one. Everything else on this page is production work
          somebody paid for.
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
