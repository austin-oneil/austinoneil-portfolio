import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/json-ld";
import {
  CompactProjectCard,
  FeaturedProjectCard,
} from "@/components/project-card";
import { PostRow } from "@/components/post-row";
import { getFeaturedProjects } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";
import { personSchema, websiteSchema } from "@/lib/schema";
import { BLUR_DATA_URL, placeholder } from "@/lib/images";
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
    body: "Production web software. Custom WordPress plugins in PHP with their own tables, endpoints and admin dashboards. Serverless pipelines in Python on AWS. Full-stack JavaScript with real payment flows. Front ends I designed and built from scratch.",
  },
  {
    heading: "What does the SEO half mean?",
    body: "Technical SEO and answer engine optimization across a book of more than 100 clients: crawlability, rendering, structured data, site speed, CMS architecture and the conversion paths that sit on top of them. It is engineering work that happens to be measured in search.",
  },
  {
    heading: "Why does the combination matter?",
    body: "Most developer portfolios are search-illiterate and most SEO portfolios contain no code. Sitting in both means I can tell you why a rendering decision costs indexation, and then go change it.",
  },
];

export default function HomePage() {
  const featured = getFeaturedProjects();
  const [lead, ...rest] = featured;
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <JsonLd data={[personSchema(), websiteSchema()]} />

      {/* Hero: asymmetric split. Three text elements, nothing below the CTAs. */}
      <section className="border-b border-border">
        <div className="container-page grid gap-10 pt-16 pb-16 md:grid-cols-12 md:items-center md:gap-12 md:pt-24 md:pb-24">
          <div className="md:col-span-7">
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-text md:text-5xl lg:text-6xl">
              I build the site and I make it rank.
            </h1>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-text-muted">
              {site.role} in Denver. I write the code and own the search surface.
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
              src={placeholder("austin-oneil-portrait", 1000, 1250)}
              alt={`${site.name}, ${site.role}`}
              width={1000}
              height={1250}
              priority
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              sizes="(min-width: 768px) 24rem, 100vw"
              className="aspect-[4/5] w-full rounded-[--radius] border border-border object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured work: one lead split, then a grid, so the block does not read
          as three stacked image-and-text rows. */}
      <Section>
        <SectionHeading
          action={
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 rounded-[--radius-sm] text-sm font-semibold text-accent transition-colors duration-150 hover:text-accent-hover"
            >
              All work
              <ArrowRight size={14} aria-hidden />
            </Link>
          }
        >
          Selected work
        </SectionHeading>

        {lead ? (
          <Reveal>
            <div className="relative">
              <FeaturedProjectCard project={lead} />
            </div>
          </Reveal>
        ) : null}

        {rest.length > 0 ? (
          <div className="mt-14 grid gap-10 border-t border-border pt-14 md:grid-cols-2 md:gap-8">
            {rest.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.05}>
                <CompactProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        ) : null}
      </Section>

      {/* Positioning: definition-list rhythm, label left and answer right. */}
      <Section bordered>
        <SectionHeading>The combination is the point</SectionHeading>
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
      </Section>

      {posts.length > 0 ? (
        <Section bordered>
          <SectionHeading
            action={
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 rounded-[--radius-sm] text-sm font-semibold text-accent transition-colors duration-150 hover:text-accent-hover"
              >
                All writing
                <ArrowRight size={14} aria-hidden />
              </Link>
            }
          >
            Recent writing
          </SectionHeading>
          <div className="border-t border-border">
            {posts.map((post) => (
              <PostRow key={post.slug} post={post} as="h3" />
            ))}
          </div>
        </Section>
      ) : null}

      <Section bordered>
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
            Currently looking for my next role
          </h2>
          <p className="mt-4 leading-relaxed text-text-muted">
            I am open to full-time engineering and technical SEO roles, and to
            relocating to Seattle or the West Coast. The fastest way to reach me
            is email.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink href={`mailto:${site.email}`}>Get in touch</ButtonLink>
            <a
              href={`tel:${site.phone.replace(/-/g, "")}`}
              className="rounded-[--radius-sm] font-mono text-sm text-text-muted transition-colors duration-150 hover:text-text"
            >
              {site.phone}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
