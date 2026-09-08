import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/json-ld";
import { SubwayLine } from "@/components/subway-line";
import { StationNav } from "@/components/station-nav";
import { ProjectGrid } from "@/components/project-grid";
import { StackCapsules } from "@/components/stack-capsules";
import { PostRow } from "@/components/post-row";
import { getAllProjects } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";
import { personSchema, websiteSchema } from "@/lib/schema";
import { AVATAR_IMAGE, BLUR_DATA_URL, PORTRAIT_IMAGE } from "@/lib/images";
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

        <div className="container-page rail-indent grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-6 pb-16 md:grid-cols-12 md:gap-x-12 md:gap-y-5 md:pb-24">
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
            Developer and technical SEO in Denver. Twelve years in sales and
            hospitality first. I build things, and I build relationships.
          </p>

          <div className="col-span-2 flex flex-wrap gap-3 md:col-span-7 md:col-start-1 md:row-start-4 md:mt-3">
            <ButtonLink href="/projects">See the work</ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="outline">
              Get in touch
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Stop 2. The work, as a bento grid the line runs behind. */}
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

      {/* Stop 3. Toolkit. */}
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
              className="rounded-[--radius] border border-border bg-surface p-6 md:p-8"
            >
              <StackCapsules />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stop 4. The story teaser. No rail-indent, so the track runs under
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
            {/* Photo on the left here, mirroring the hero rather than
                repeating it. */}
            <div data-tunnel className="md:col-span-5">
              <Image
                src={PORTRAIT_IMAGE}
                alt={`${site.name} in Denver`}
                width={1000}
                height={1250}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="(min-width: 768px) 22rem, 100vw"
                className="aspect-[4/5] w-full rounded-[--radius] border border-border object-cover"
              />
            </div>

            <div className="md:col-span-7">
              <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
                I didn&apos;t start in tech
              </h2>
              <div className="mt-5 max-w-[58ch] space-y-4 leading-relaxed text-text-muted">
                <p>
                  Restaurants, a car dealership, and six years behind a bar.
                  Then software. Most people read that as a career change. I
                  read it as the reason I&apos;m good at this one.
                </p>
                <p>
                  Twelve years of talking to people for a living teaches you how
                  to explain something complicated to someone who didn&apos;t
                  ask for a lecture, and how to stay level when everything
                  breaks at once. That turned out to be most of the job.
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

      {/* Stop 5. The questions, as a definition list. */}
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

      {/* Stop 6. Writing. */}
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

      {/* Stop 7. Terminus. */}
      <section
        id="contact"
        data-terminus
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
              I&apos;m looking for my next role, ideally the kind where I can
              build the marketing infrastructure and explain it to the people
              who depend on it. Open to relocating to Seattle or elsewhere on
              the West Coast. Email is the fastest way to reach me, and I answer
              all of them.
            </p>
            <div className="arrival-cta mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
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
