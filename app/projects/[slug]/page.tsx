import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "@/components/json-ld";
import { Toc } from "@/components/toc";
import { Tag } from "@/components/ui/tag";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { getAllProjects, getProject } from "@/lib/projects";
import { buildToc, mdxOptions } from "@/lib/mdx";
import { breadcrumbSchema, projectSchema } from "@/lib/schema";
import { BLUR_DATA_URL, projectImage } from "@/lib/images";

/** Fully static: every case study is known at build time. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const url = `/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    keywords: [...project.tags, ...project.stack],
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  // The stack list is rendered by this template rather than authored in MDX,
  // so it is appended to the TOC by hand instead of being picked up from the
  // source.
  const toc = [
    ...buildToc(project.body),
    { id: "stack", text: "Stack", depth: 2 as const },
  ];

  return (
    <>
      <JsonLd
        data={[
          projectSchema(project),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/projects" },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
        ]}
      />

      <div className="container-page py-10 md:py-14">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 rounded-[--radius-sm] text-sm text-text-muted transition-colors duration-150 hover:text-text"
        >
          <ArrowLeft size={14} aria-hidden />
          All work
        </Link>

        <header className="mt-8 max-w-4xl">
          <p className="font-mono text-xs text-text-subtle">
            {project.client} <span aria-hidden>·</span> {project.period}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-text md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-text-muted">
            {project.summary}
          </p>

          {project.note ? (
            <p className="mt-5 max-w-[62ch] rounded-[--radius] border border-border bg-surface-2 p-4 text-sm leading-relaxed text-text-muted">
              {project.note}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag} tone="accent">
                {tag}
              </Tag>
            ))}
            <Tag>{project.context}</Tag>
            {project.url ? (
              <a
                href={project.url}
                rel="noopener noreferrer"
                className="ml-1 inline-flex items-center gap-1 rounded-[--radius-sm] text-sm font-medium text-accent underline decoration-accent-border underline-offset-4 transition-colors duration-150 hover:decoration-accent"
              >
                Visit the site
                <ArrowUpRight size={13} aria-hidden />
              </a>
            ) : null}
          </div>
        </header>

        <Image
          src={projectImage(project.slug)}
          alt=""
          width={1600}
          height={900}
          priority
          fetchPriority="high"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="(min-width: 1024px) 64rem, 100vw"
          className="mt-10 aspect-video w-full rounded-[--radius] border border-border object-cover"
        />

        <div className="mt-12 gap-12 lg:grid lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-24">
              <Toc entries={toc} />
            </div>
          </aside>

          <article className="lg:col-span-9 lg:max-w-[46rem]">
            <MDXRemote
              source={project.body}
              components={mdxComponents}
              options={mdxOptions}
            />

            <section className="mt-16 border-t border-border pt-8">
              <h2
                id="stack"
                className="scroll-mt-28 text-lg font-semibold tracking-tight text-text"
              >
                Stack
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
