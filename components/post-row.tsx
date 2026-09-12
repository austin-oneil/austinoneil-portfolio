import Link from "next/link";
import { formatDate } from "@/lib/blog";
import { Tag } from "@/components/ui/tag";
import type { Post } from "@/types/content";

/**
 * One entry in a post list. Draft posts are only ever reachable in development
 * or a preview build, and are marked so it is obvious which is which.
 */
export function PostRow({
  post,
  as: Heading = "h2",
}: {
  post: Post;
  /** Set to "h3" when the list sits under a section heading. */
  as?: "h2" | "h3";
}) {
  return (
    <article className="group relative border-b border-border py-7">
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

      <Heading className="mt-2.5 text-lg font-semibold tracking-tight text-text">
        <Link
          href={`/blog/${post.slug}`}
          className="rounded-(--radius-sm) transition-colors duration-150 group-hover:text-accent"
        >
          <span className="absolute inset-0" />
          {post.title}
        </Link>
      </Heading>

      <p className="mt-2 max-w-[62ch] text-[0.9375rem] leading-relaxed text-text-muted">
        {post.excerpt}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </article>
  );
}
