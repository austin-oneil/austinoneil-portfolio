import { site } from "./site";
import type { Post, Project } from "@/types/content";

/**
 * JSON-LD builders. Each returns a plain object that a route embeds through
 * <JsonLd>. Kept here so the graph is defined once and stays consistent across
 * routes rather than being re-typed per page.
 */

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: "Senior SEO Specialist and Account Executive",
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Denver",
      addressRegion: "CO",
      addressCountry: "US",
    },
    sameAs: [site.socials.github, site.socials.linkedin],
    worksFor: {
      "@type": "Organization",
      name: "Prospecta Marketing",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Western Governors University",
    },
    knowsAbout: [
      "Technical SEO",
      "Answer engine optimization",
      "Next.js",
      "TypeScript",
      "WordPress plugin development",
      "PHP",
      "Python",
      "Amazon Web Services",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: site.locale,
    publisher: { "@id": `${site.url}/#person` },
  };
}

export function blogPostingSchema(post: Post) {
  const url = `${site.url}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    keywords: post.tags,
    inLanguage: site.locale,
    image: `${site.url}/blog/${post.slug}/opengraph-image`,
    author: { "@id": `${site.url}/#person` },
    publisher: { "@id": `${site.url}/#person` },
  };
}

/**
 * Case studies use CreativeWork rather than SoftwareSourceCode: the page is a
 * written account of the work, not a published code repository. Naming the type
 * after what the page actually is keeps the markup honest.
 */
export function projectSchema(project: Project) {
  const url = `${site.url}/projects/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    name: project.title,
    headline: project.title,
    description: project.summary,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: [...project.tags, ...project.stack],
    inLanguage: site.locale,
    image: `${site.url}/projects/${project.slug}/opengraph-image`,
    author: { "@id": `${site.url}/#person` },
    creator: { "@id": `${site.url}/#person` },
    about: project.stack,
  };
}

export function breadcrumbSchema(
  trail: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path}`,
    })),
  };
}
