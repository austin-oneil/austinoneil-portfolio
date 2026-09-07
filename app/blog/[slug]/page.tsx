import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "@/components/json-ld";
import { Toc } from "@/components/toc";
import { Tag } from "@/components/ui/tag";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { getAllPosts, getPost, getRelatedPosts, formatDate } from "@/lib/blog";
import { buildToc, mdxOptions } from "@/lib/mdx";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    keywords: post.tags,
    // A draft that is visible at all is visible only in a preview build. Keep
    // it out of any index that happens to reach it.
    robots: post.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: ["Austin O'Neil"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const toc = buildToc(post.body);
  const related = getRelatedPosts(post.slug);

  return (
    <>
      <JsonLd
        data={[
          blogPostingSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Writing", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <div className="container-page py-10 md:py-14">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 rounded-[--radius-sm] text-sm text-text-muted transition-colors duration-150 hover:text-text"
        >
          <ArrowLeft size={14} aria-hidden />
          All writing
        </Link>

        <div className="mt-8 gap-12 lg:grid lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-24">
              <Toc entries={toc} />
            </div>
          </aside>

          <div className="lg:col-span-9 lg:max-w-[46rem]">
            <header>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <time
                  dateTime={post.date}
                  className="font-mono text-xs text-text-subtle"
                >
                  {formatDate(post.date)}
                </time>
                <span className="font-mono text-xs text-text-subtle" aria-hidden>
                  ·
                </span>
                <span className="font-mono text-xs text-text-subtle">
                  {post.readingTime}
                </span>
                {post.draft ? <Tag tone="accent">Draft</Tag> : null}
              </div>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-text md:text-4xl">
                {post.title}
              </h1>
              <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-text-muted">
                {post.excerpt}
              </p>
              {post.updated ? (
                <p className="mt-3 font-mono text-xs text-text-subtle">
                  Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </p>
              ) : null}
              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </header>

            <article className="mt-10 border-t border-border pt-2">
              <MDXRemote
                source={post.body}
                components={mdxComponents}
                options={mdxOptions}
              />
            </article>

            {related.length > 0 ? (
              <section className="mt-16 border-t border-border pt-8">
                <h2 className="text-lg font-semibold tracking-tight text-text">
                  Related
                </h2>
                <ul className="mt-4 space-y-3">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/blog/${item.slug}`}
                        className="rounded-[--radius-sm] font-medium text-accent underline decoration-accent-border underline-offset-4 transition-colors duration-150 hover:decoration-accent"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
