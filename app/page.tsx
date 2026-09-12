import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/json-ld";
import { SubwayLine } from "@/components/subway-line";
import { StationNav } from "@/components/station-nav";
import { MappingSkills } from "@/components/throughline/mapping";
import { ProjectGrid } from "@/components/project-grid";
import { StackCapsules } from "@/components/stack-capsules";
import { PostRow } from "@/components/post-row";
import { getAllProjects } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";
import { personSchema, websiteSchema } from "@/lib/schema";
import { AVATAR_IMAGE, BLUR_DATA_URL, STORY_IMAGE } from "@/lib/images";
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
    body: "Production software. Custom WordPress plugins in PHP with their own tables, endpoints, and admin dashboards. A serverless AI agent in Python on AWS that runs every day. Full-stack JavaScript applications with real money moving through them. Front ends I designed and built myself, not themes I recolored.",
  },
  {
    heading: "Where does SEO fit in?",
    body: "I handle technical SEO and answer engine optimization across a book of 100+ clients. Crawlability, rendering, structured data, site speed, CMS architecture, analytics, and the conversion paths sitting on top of them. When the problem is technical, I can explain it and fix it.",
  },
  {
    heading: "How did I end up doing both?",
    body: "I didn't really plan it that way. I spent 12 years working directly with people before I got into tech, including six years bartending and time in sales. Then I started building websites, and development and SEO kept overlapping more and more. Now I can figure out what needs to change, explain it to the people involved, and make the change myself.",
  },
  {
    heading: "Does bartending actually matter?",
    body: "More than you'd think. You learn to read a room, build relationships quickly, explain something complicated without giving someone a lecture, and stay calm when five things go wrong at once. Those skills turned out to be pretty useful when I became the technical person clients and coworkers came to when something needed figuring out.",
  },
];

/**
 * Results under the hero. Every figure is verified in the background document
 * and carries its own window. The two search figures are the ones that
 * document allows as headlines: a funnel result benchmarked against the
 * client's own target, and a traffic change over a stated period. Visibility
 * index deltas are deliberately absent; they mean nothing to a reader who does
 * not know the tool that produces them. Dental and healthcare clients are
 * never named.
 */
const results = [
  {
    value: "6.3%",
    label:
      "of organic visitors became leads for one dental practice over six months, against the client's own 2 to 3% target",
  },
  {
    value: "110%",
    label:
      "more traffic in six months for a consulting firm, on an SEO strategy I wrote and carried out myself",
  },
  {
    value: "$600 to $25",
    label:
      "a month for a hockey organization's booking and payments, after I replaced the platform with custom JavaScript",
    evidence: { href: "/projects/lacroix-drill-house", label: "Case study" },
  },
  {
    value: "60%+",
    label:
      "of the time my repetitive agency tasks used to take, now handled by an AI agent I built and run in production",
    evidence: { href: "/projects/basecamp-ai-agent", label: "Case study" },
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
      className="inline-flex items-center gap-1.5 rounded-(--radius-sm) text-sm font-semibold text-accent transition-colors duration-150 hover:text-accent-hover"
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
    <div data-rail-host className="relative">
      <JsonLd data={[personSchema(), websiteSchema()]} />
      <SubwayLine />

      {/* Stop 1. Hero.
          Two layouts from one image element, no duplicate <Image> hidden at a
          breakpoint (a hidden one still downloads, and this is the LCP asset).

          Under md the grid is [auto 1fr]: headline spans both columns, then the
          avatar and the subtext share a single row, then the CTAs span both.
          From md up it becomes the 12-column split, with the avatar occupying
          its own column across all three rows. */}
      <section
        data-stop
        data-stop-fx="0.032"
        data-stop-dy="150"
        className="relative border-b border-border"
      >
        <div className="container-page pt-16 md:pt-24">
          <StationNav />
        </div>

        <div className="container-page rail-indent grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-6 pb-12 md:grid-cols-12 md:gap-x-12 md:gap-y-5 md:pb-16">
          <h1 className="col-span-2 text-4xl font-semibold tracking-tight text-balance text-text md:col-span-7 md:col-start-1 md:row-start-2 md:self-end md:text-5xl lg:text-6xl">
            I build the site and I make it rank.
          </h1>

          <div className="md:col-span-4 md:col-start-9 md:row-span-3 md:row-start-2 md:self-center">
            <Image
              src={AVATAR_IMAGE}
              alt={`${site.name}, ${site.role}`}
              width={720}
              height={720}
              priority
              fetchPriority="high"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              sizes="(min-width: 768px) 224px, 80px"
              // border-strong rather than border: the shirt is black and the
              // dark page ground is near-black, so a faint ring lets the lower
              // half of the circle dissolve into the background and the crop
              // reads as a floating head. The stronger ring keeps the disc
              // legible in both themes.
              className="size-20 rounded-full border border-border-strong object-cover md:mx-auto md:size-56"
            />
          </div>

          <p className="max-w-[46ch] text-base leading-relaxed text-text-muted md:col-span-7 md:col-start-1 md:row-start-3 md:text-lg">
            Full-stack developer and technical SEO in Denver. Twelve years in
            sales and hospitality first. I build things, and I build
            relationships.
          </p>

          <div className="col-span-2 flex flex-wrap gap-3 md:col-span-7 md:col-start-1 md:row-start-4 md:mt-3">
            <ButtonLink href="/projects">See the work</ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="outline">
              Get in touch
            </ButtonLink>
          </div>

          {/* Availability, stated where a recruiter looks first rather than
              only at the terminus. A status line, not an eyebrow. */}
          <p className="col-span-2 flex items-start gap-2.5 font-mono text-xs leading-relaxed text-text-muted md:col-span-7 md:col-start-1 md:row-start-5">
            <span
              aria-hidden
              className="mt-[5px] size-2 shrink-0 rounded-full bg-accent"
            />
            <span>
              Open to growth, marketing and web engineering roles, or in-house
              technical SEO. Seattle, San Francisco, the West Coast, or remote.
            </span>
          </p>
        </div>

        <div className="container-page rail-indent">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-8 border-t border-border pt-8 pb-16 md:grid-cols-4 md:pt-10 md:pb-24">
            {results.map((item) => (
              <li key={item.value}>
                <p className="font-mono text-2xl font-semibold tracking-tight text-text md:text-[1.75rem]">
                  {item.value}
                </p>
                <p className="mt-2 max-w-[26ch] text-sm leading-snug text-text-muted">
                  {item.label}
                  {item.evidence ? (
                    <>
                      {" "}
                      <Link
                        href={item.evidence.href}
                        className="rounded-(--radius-sm) font-mono text-[0.75rem] whitespace-nowrap text-accent underline decoration-accent-border underline-offset-2 hover:decoration-accent"
                      >
                        {item.evidence.label}
                      </Link>
                    </>
                  ) : null}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stop 2. The throughline. Sits above the work so the breadth is framed
          before the individual projects are read, rather than left for the
          reader to infer from eight unrelated client names. */}
      <section
        id="throughline"
        data-stop
        data-stop-fx="0.060"
        data-stop-dy="52"
        className="relative border-t border-border py-16 md:py-24"
      >
        <div className="container-page">
          <div
            data-tunnel
            className="rounded-(--radius) border border-border bg-surface p-6 md:p-8"
          >
            <div className="max-w-[62ch]">
              <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
                A lot of trades. One I went deep on.
              </h2>
              <p className="mt-4 leading-relaxed text-text-muted">
                Before I wrote code for a living I spent twelve years running
                restaurant shifts, training staff, selling cars, and tending
                bar. None of it was a detour. Each job built a skill I still
                use every week, and each row below names that skill, the job
                that built it, and the work on this site where it shows up now.
              </p>
            </div>

            <div className="mt-8 border-t border-border pt-6 md:pt-7">
              <MappingSkills />
            </div>
          </div>
        </div>
      </section>

      {/* Stop 3. The work, as a bento grid the line runs behind. */}
      <section
        id="work"
        data-stop
        data-stop-fx="0.060"
        data-stop-dy="52"
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

      {/* Stop 4. Toolkit. */}
      <section
        id="stack"
        data-stop
        data-stop-fx="0.060"
        data-stop-dy="52"
        className="relative border-t border-border py-16 md:py-24"
      >
        {/* No rail-indent: the track runs under the toolkit card. */}
        <div className="container-page">
          <Heading>What I&apos;m working with lately</Heading>
          <Reveal>
            <div
              data-tunnel
              className="rounded-(--radius) border border-border bg-surface p-6 md:p-8"
            >
              <StackCapsules />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stop 5. The story teaser. No rail-indent, so the track runs under
          the photograph the way it does under the work cards. */}
      <section
        id="story"
        data-stop
        data-stop-fx="0.060"
        data-stop-dy="52"
        className="relative border-t border-border py-16 md:py-24"
      >
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-12 md:items-center md:gap-12">
            {/* The photo is from the years the copy is about, not a second
                crop of the headshot. Its own 3:4 ratio, so nobody in it is
                cropped out. */}
            {/* The whole figure is the tunnel, so the whole figure has to be
                an opaque surface: photo flush at the top, caption inside the
                card. A caption hanging below the card left a transparent
                strip the rail showed through. The clip lives on the image
                wrapper, never on the tunnel element itself, or the glows are
                clipped with it. */}
            <figure
              data-tunnel
              className="rounded-(--radius) border border-border bg-surface md:col-span-5"
            >
              <div className="overflow-hidden rounded-t-[calc(var(--radius)-1px)]">
                <Image
                  src={STORY_IMAGE}
                  alt={`${site.name} behind the bar in Denver, arm around a coworker, both in aprons`}
                  width={1500}
                  height={2000}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  sizes="(min-width: 768px) 22rem, 100vw"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
              <figcaption className="px-4 py-3 font-mono text-xs text-text-subtle">
                Behind the bar in Denver.
              </figcaption>
            </figure>

            <div className="md:col-span-7">
              <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
                I didn&apos;t start in tech
              </h2>
              <div className="mt-5 max-w-[58ch] space-y-4 leading-relaxed text-text-muted">
                <p>
                  Most people read twelve years of hospitality and sales as a
                  career change. I read it as the reason I&apos;m good at this
                  one.
                </p>
                <p>
                  In automotive sales I moved into the online channel while most
                  of the industry still treated the internet as a place to post
                  photos, and spent that year ignoring the script I&apos;d been
                  handed in favour of actually listening. It made my managers
                  uncomfortable. It also made me top salesperson in my
                  department every month I was there.
                </p>
                <p>
                  That is the same instinct behind everything on this page: get
                  to new things early, take the side of the person in front of
                  you, and be willing to be the one who says the current way
                  isn&apos;t working.
                </p>
              </div>
              <div className="mt-7">
                <ButtonLink href="/about" variant="outline">
                  Read my story
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stop 6. The questions, as a definition list. */}
      <section
        id="questions"
        data-stop
        data-stop-fx="0.020"
        data-stop-dy="52"
        className="relative border-t border-border py-16 md:py-24"
      >
        <div className="container-page rail-indent">
          <Heading>Questions I get asked</Heading>
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

      {/* Stop 7. Writing. */}
      {posts.length > 0 ? (
        <section
          data-stop
          data-stop-fx="0.036"
          data-stop-dy="52"
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

      {/* Stop 8. Terminus. */}
      <section
        id="contact"
        data-terminus
        data-variant="headlight"
        data-stop
        data-stop-fx="0.015"
        data-stop-dy="52"
        className="relative border-t border-border py-16 md:py-24"
      >
        <div className="container-page rail-indent">
          <div className="arrival-platform max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
              One conversation is worth fifty resume screens
            </h2>
            <p className="mt-4 leading-relaxed text-text-muted">
              I&apos;m looking for my next role, ideally one where I build the
              marketing infrastructure and explain it to the people who depend
              on it. I&apos;m open to relocating, with Seattle, San Francisco
              and the rest of the West Coast at the top of the list, and to
              remote roles anywhere. Email is the fastest way to reach me, and
              I answer all of them.
            </p>
            <div className="arrival-cta mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <ButtonLink href={`mailto:${site.email}`}>Get in touch</ButtonLink>
              <a
                href={`mailto:${site.email}`}
                className="rounded-(--radius-sm) font-mono text-sm text-text-muted transition-colors duration-150 hover:text-text"
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
