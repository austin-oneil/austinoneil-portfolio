import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

/**
 * Generated, never hand-written.
 *
 * getAllPosts() already excludes drafts in a production build, so a draft
 * cannot reach the sitemap by way of this file. That is deliberate: one
 * visibility rule, applied in the loader, shared by the index, the feed and
 * this route.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/projects`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${site.url}/uses`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${site.url}/colophon`, changeFrequency: "yearly", priority: 0.4 },
  ];

  const projects: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    changeFrequency: "yearly",
    priority: project.featured ? 0.9 : 0.7,
  }));

  const posts: MetadataRoute.Sitemap = getAllPosts()
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "yearly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...projects, ...posts];
}
