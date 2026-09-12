import Image from "next/image";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import { CodeBlock } from "./copy-button";
import { Callout } from "./callout";

/**
 * Element overrides for every MDX body on the site.
 *
 * Headings get their ids from rehype-slug and are wrapped in an anchor by
 * rehype-autolink-headings, so the styling here is what makes that anchor
 * behave like a heading rather than a link.
 */
export const mdxComponents: MDXComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-14 scroll-mt-28 text-xl font-semibold tracking-tight text-text md:text-2xl [&_a]:text-inherit [&_a]:no-underline"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-10 scroll-mt-28 text-lg font-semibold tracking-tight text-text [&_a]:text-inherit [&_a]:no-underline"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-5 leading-[1.75] text-text-muted" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="mt-5 space-y-2.5 pl-5 leading-[1.75] text-text-muted marker:text-text-subtle [list-style:disc]"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mt-5 space-y-2.5 pl-5 leading-[1.75] text-text-muted marker:text-text-subtle [list-style:decimal]"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="pl-1.5" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-text" {...props} />
  ),
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
    const internal = href.startsWith("/") || href.startsWith("#");
    const className =
      "rounded-(--radius-sm) font-medium text-accent underline decoration-accent-border underline-offset-[3px] transition-colors duration-150 hover:decoration-accent";
    return internal ? (
      <Link href={href} className={className} {...props} />
    ) : (
      <a href={href} className={className} rel="noopener noreferrer" {...props} />
    );
  },
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-6 border-l-2 border-accent pl-5 text-text-muted italic"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-border" />,
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded-(--radius-sm) border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-text [figure_&]:border-0 [figure_&]:bg-transparent [figure_&]:p-0"
      {...props}
    />
  ),
  pre: ({ children }: ComponentPropsWithoutRef<"pre">) => (
    <CodeBlock>{children}</CodeBlock>
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto rounded-(--radius) border border-border">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border-b border-border bg-surface-2 px-4 py-2.5 font-semibold whitespace-nowrap text-text"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td
      className="border-b border-border px-4 py-2.5 text-text-muted"
      {...props}
    />
  ),
  // width and height are dropped from the incoming props on purpose: markdown
  // cannot supply them, and next/image needs a fixed intrinsic ratio to reserve
  // space and avoid layout shift.
  img: ({
    src,
    alt,
    width: _width,
    height: _height,
    ...props
  }: ComponentPropsWithoutRef<"img">) => (
    <Image
      src={typeof src === "string" ? src : ""}
      alt={alt ?? ""}
      width={1600}
      height={900}
      className="my-8 h-auto w-full rounded-(--radius) border border-border"
      sizes="(min-width: 768px) 45rem, 100vw"
      {...props}
    />
  ),
  Callout,
};
