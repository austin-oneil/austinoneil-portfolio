import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { PostRow } from "@/components/post-row";
import { TagFilter } from "@/components/tag-filter";
import { getAllPosts, getPostTags } from "@/lib/blog";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes from Austin O'Neil on WordPress security, AWS incidents, replacing SaaS with custom code, and technical SEO from a developer's angle.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Writing - Austin O'Neil",
    description:
      "Notes on WordPress security, AWS incidents, and technical SEO from a developer's angle.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getPostTags();

  const items = posts.map((post) => ({
    key: post.slug,
    tags: post.tags,
    node: <PostRow post={post} />,
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Writing", path: "/blog" },
        ])}
      />

      <div className="container-page border-b border-border py-16 md:py-20">
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance text-text md:text-5xl">
          Writing
        </h1>
        <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-text-muted">
          Longer accounts of the work on the case studies, plus technical SEO
          written for people who read code.
        </p>
      </div>

      <div className="container-page py-12 md:py-16">
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <TagFilter
            items={items}
            tags={tags}
            allLabel="Everything"
            emptyLabel="No posts carry that tag yet."
          />
        )}
      </div>
    </>
  );
}

/**
 * Shown when every post is still a draft. Drafts are excluded from production
 * builds, so this is the honest state of the index until the first one ships.
 */
function EmptyState() {
  return (
    <div className="max-w-[55ch] rounded-(--radius) border border-border bg-surface-2 p-8">
      <h2 className="text-lg font-semibold tracking-tight text-text">
        Nothing published yet
      </h2>
      <p className="mt-3 leading-relaxed text-text-muted">
        The first posts are drafted and not finished. They will appear here, in
        the RSS feed and in the sitemap the moment they are.
      </p>
    </div>
  );
}
