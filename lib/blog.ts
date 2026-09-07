import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, PostFrontmatter } from "@/types/content";

const DIR = path.join(process.cwd(), "content", "blog");

/**
 * Drafts render in development so posts can be previewed in place, and are
 * excluded from every production surface: the index, the sitemap and the feed.
 *
 * SHOW_DRAFTS=1 forces them on in a production build. Use it for a Vercel
 * preview deployment when a draft needs review on the real infrastructure.
 * Never set it on the production environment.
 */
const SHOW_DRAFTS =
  process.env.NODE_ENV === "development" || process.env.SHOW_DRAFTS === "1";

function parse(filename: string): Post {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;

  return {
    ...fm,
    slug,
    body: content,
    readingTime: readingTime(content).text,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(parse)
    .filter((p) => SHOW_DRAFTS || !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostTags(): string[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
}

/** Related posts by shared tag, most overlap first, capped at `limit`. */
export function getRelatedPosts(slug: string, limit = 2): Post[] {
  const post = getPost(slug);
  if (!post) return [];

  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      shared: p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .filter((x) => x.shared > 0)
    .sort(
      (a, b) =>
        b.shared - a.shared ||
        +new Date(b.post.date) - +new Date(a.post.date),
    )
    .slice(0, limit)
    .map((x) => x.post);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
