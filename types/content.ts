/** Tag vocabulary. Kept as a closed union so a typo in frontmatter fails the build. */
export const PROJECT_TAGS = ["Dev", "SEO", "AI", "Full-Stack"] as const;
export type ProjectTag = (typeof PROJECT_TAGS)[number];

/** Which entity the work was performed under. Drives the label on every card. */
export type ProjectContext =
  | "Prospecta Marketing"
  | "Tangent Apps"
  | "All City Media"
  | "Interview take-home";

export interface ProjectFrontmatter {
  title: string;
  /** One-line summary. Used for cards, meta description and OG image subtitle. */
  summary: string;
  /** Client or organization. Never a dental or healthcare client name. */
  client: string;
  /** Employment context. Rendered verbatim so freelance never reads as a job. */
  context: ProjectContext;
  /** Display string, e.g. "2025 - present". Hyphens only, never en dashes. */
  period: string;
  /** Sort key. Higher sorts first. */
  order: number;
  tags: ProjectTag[];
  stack: string[];
  featured?: boolean;
  /** Live URL. Omitted when the site is offline or the work is not public. */
  url?: string;
  /** Rendered under the title when the project needs a factual caveat. */
  note?: string;
}

export interface Project extends ProjectFrontmatter {
  slug: string;
  body: string;
}

export interface PostFrontmatter {
  title: string;
  date: string;
  updated?: string;
  excerpt: string;
  tags: string[];
  draft?: boolean;
  coverImage?: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  body: string;
  /** Computed from the body at read time, never hand-entered in frontmatter. */
  readingTime: string;
}

export interface TocEntry {
  id: string;
  text: string;
  depth: 2 | 3;
}
