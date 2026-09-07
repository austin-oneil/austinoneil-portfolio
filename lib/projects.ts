import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Project, ProjectFrontmatter, ProjectTag } from "@/types/content";
import { PROJECT_TAGS } from "@/types/content";

const DIR = path.join(process.cwd(), "content", "projects");

function parse(filename: string): Project {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const fm = data as ProjectFrontmatter;

  // Fail the build on a bad tag rather than shipping a filter that silently
  // drops the project.
  for (const tag of fm.tags ?? []) {
    if (!PROJECT_TAGS.includes(tag)) {
      throw new Error(
        `Unknown tag "${tag}" in content/projects/${filename}. Allowed: ${PROJECT_TAGS.join(", ")}`,
      );
    }
  }

  return { ...fm, slug, body: content };
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(parse)
    .sort((a, b) => b.order - a.order);
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

/** Tags actually in use, in the canonical order, for the index filter. */
export function getProjectTags(): ProjectTag[] {
  const used = new Set(getAllProjects().flatMap((p) => p.tags));
  return PROJECT_TAGS.filter((t) => used.has(t));
}
