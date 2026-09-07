import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import GithubSlugger from "github-slugger";
import type { TocEntry } from "@/types/content";

/**
 * Shared MDX pipeline for both posts and case studies.
 *
 * Shiki runs at build time through rehype-pretty-code and emits both themes
 * into CSS variables, so switching theme in the browser reskins code blocks
 * with no client-side highlighter and no extra JavaScript shipped.
 */
export const mdxOptions: MDXRemoteProps["options"] = {
  parseFrontmatter: false,
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: { light: "github-light", dark: "github-dark-dimmed" },
          keepBackground: false,
          defaultLang: "plaintext",
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: { className: ["heading-anchor"] },
        },
      ],
    ],
  },
};

/**
 * Builds a table of contents from the raw MDX source.
 *
 * Reads the source rather than the compiled tree so the TOC is available to
 * the page shell before the body renders. Fenced code blocks are stripped
 * first, otherwise a commented-out `# heading` inside a snippet becomes an
 * entry that points at nothing.
 */
export function buildToc(source: string): TocEntry[] {
  const withoutCode = source.replace(/```[\s\S]*?```/g, "");
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];

  for (const line of withoutCode.split("\n")) {
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const depth = match[1].length as 2 | 3;
    // Strip inline markdown so the TOC label matches the rendered heading text.
    const text = match[2].replace(/[*_`]/g, "").trim();
    entries.push({ id: slugger.slug(text), text, depth });
  }

  return entries;
}
