import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/json-ld";
import { SubwayLine } from "@/components/subway-line";
import { ProjectGrid } from "@/components/project-grid";
import { StackCapsules } from "@/components/stack-capsules";
import { PostRow } from "@/components/post-row";
import { getAllProjects } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";
import { personSchema, websiteSchema } from "@/lib/schema";
import { BLUR_DATA_URL, PORTRAIT_IMAGE } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Each entry answers a question a hiring manager is already asking. Written as
 * self-contained statements so a passage can be quoted without the surrounding
 * page, which is what makes it citable by an answer engine.
 */
const capabilities = [
  {
    heading: "What do I actually build?",
    body: "Production software. Custom WordPress plugins in PHP with their own tables, endpoints and admin dashboards. A serverless AI agent in Python on AWS that runs every day. Full-stack JavaScript with real money moving through it. Front ends I designed and built from scratch, not themes I recolored.",
  },
  {
    heading: "What does the SEO half mean?",
    body: "I run technical SEO and answer engine optimization across a book of more than 100 clients. Crawlability, rendering, structured data, site speed, CMS architecture, and the conversion paths sitting on top of them. It is engineering work. It just gets measured in search.",
  },
  {
    heading: "Why does the combination matter?",
    body: "Most developers treat search as somebody else's department. Most SEOs stop at the point where the fix needs a pull request. I can tell you why a rendering decision is costing you indexation, and then go change the rendering.",
  },
  {
    heading: "Where does the bartending come in?",
    body: "Twelve years of hospitality and sales before this, six of them behind a bar. You learn to read a room, explain something complicated to someone who did not ask for a lecture, and stay calm when everything is on fire at once. That turns out to be most of what a technical point of contact does.",
  },
];

/**
 * Section heading used inside the subway sections. Kept local because these
 * headings sit inside the rail indent rather than in the shared Section shell.
 */
function Heading({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
      <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
        {children}
      </h2>
      {action}
    </div>
  );
}

function MoreLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-[--radius-sm] text-sm font-semibold text-accent transition-colors duration-150 hover:text-accent-hover"
    >
      {children}
      <ArrowRight size={14} aria-hidden />
    </Link>
  );
}

export default function HomePage() {
  const projects = getAllProjects();
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="relative">
      <JsonLd data={[personSchema(), websiteSchema()]} />
      <SubwayLine />

      {/* Stop 1. Hero: asymmetric split, three text elements, nothing below
          the CTAs. */}
      <section
        data-stop
        data-stop-fx="0.012"
        data-stop-dy="132"
        className="relative border-b border-border"
      >
        <div className="container-page rail-indent grid gap-10 pt-16 pb-16 md:grid-cols-12 md:items-center md:gap-12 md:pt-24 md:pb-24">
          <div className="md:col-span-7">
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-text md:text-5xl lg:text-6xl">
              I build the site and I make it rank.
            </h1>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-text-muted">
              Developer and technical SEO in Denver. Twelve years behind a bar
              and a counter taught me the other half of the job.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/projects">See the work</ButtonLink>
              <ButtonLink href={`mailto:${site.email}`} variant="outline">
                Get in touch
              </ButtonLink>
            </div>
          </div>

          <div className="md:col-span-5">
            <Image
              src={PORTRAIT_IMAGE}
              alt={`${site.name}, ${site.role}`}
              width={1000}
              height={1250}
              priority
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              sizes="(min-width: 768px) 24rem, 100vw"
              // object-[center_32%] only bites at 16:9, where the square
              // source overflows vertically: it keeps the crop above his
              // shoulders instead of slicing the top of his head. At 4:5 there
              // is no vertical overflow, so it changes nothing on desktop.
              className="aspect-video w-full rounded-[--radius] border border-border object-cover object-[center_32%] md:aspect-[4/5]"
            />
          </div>
        </div>
      </section>

      {/* Stop 2. The work, as a bento grid the line runs behind. */}
      <section
        id="work"
        data-stop
        data-stop-fx="0.045"
        data-stop-dy="104"
        className="relative py-16 md:py-24"
      >
        {/* No rail-indent: the grid keeps the full container width so the
            track runs underneath the left-hand column of cards. */}
        <div className="container-page">
          <Heading action={<MoreLink href="/projects">All work</MoreLink>}>
            Work I am proud of
          </Heading>
          <Reveal>
            <ProjectGrid projects={projects} />
          </Reveal>
        </div>
      </section>

      {/* Stop 3. Toolkit. */}
      <section
        id="stack"
        data-stop
        data-stop-fx="0.045"
        data-stop-dy="104"
        className="relative border-t border-border py-16 md:py-24"
      >
        {/* No rail-indent: the track runs under the toolkit card. */}
        <div className="container-page">
          <Heading>The stack I actually ship with</Heading>
          <Reveal>
            <div
              data-tunnel
              className="rounded-[--radius] border border-border bg-surface p-6 md:p-8"
            >
              <StackCapsules />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stop 4. Positioning, as a definition list. */}
      <section
        data-stop
        data-stop-fx="0.022"
        data-stop-dy="104"
        className="relative border-t border-border py-16 md:py-24"
      >
        <div className="container-page rail-indent">
          <Heading>Two careers, one skill set</Heading>
          <dl className="border-t border-border">
            {capabilities.map((item) => (
              <div
                key={item.heading}
                className="grid gap-2 border-b border-border py-7 md:grid-cols-12 md:gap-8"
              >
                <dt className="text-base font-semibold tracking-tight text-text md:col-span-4">
                  {item.heading}
                </dt>
                <dd className="max-w-[62ch] leading-relaxed text-text-muted md:col-span-8">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Stop 5. Writing. */}
      {posts.length > 0 ? (
        <section
          data-stop
          data-stop-fx="0.036"
          data-stop-dy="104"
          className="relative border-t border-border py-16 md:py-24"
        >
          <div className="container-page rail-indent">
            <Heading action={<MoreLink href="/blog">All writing</MoreLink>}>
              Recent writing
            </Heading>
            <div className="border-t border-border">
              {posts.map((post) => (
                <PostRow key={post.slug} post={post} as="h3" />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Stop 6. Terminus. */}
      <section
        id="contact"
        data-stop
        data-stop-fx="0.015"
        data-stop-dy="104"
        className="relative border-t border-border py-16 md:py-24"
      >
        <div className="container-page rail-indent">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
              One conversation is worth fifty resume screens
            </h2>
            <p className="mt-4 leading-relaxed text-text-muted">
              I am looking for my next role, ideally the kind where somebody has
              to build the marketing infrastructure and also explain it to the
              people who depend on it. Open to relocating to Seattle or
              elsewhere on the West Coast. Email is the fastest way to reach me,
              and I answer all of them.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <ButtonLink href={`mailto:${site.email}`}>Get in touch</ButtonLink>
              <a
                href={`mailto:${site.email}`}
                className="rounded-[--radius-sm] font-mono text-sm text-text-muted transition-colors duration-150 hover:text-text"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
