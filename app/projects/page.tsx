import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ProjectRow } from "@/components/project-card";
import { TagFilter } from "@/components/tag-filter";
import { getAllProjects, getProjectTags } from "@/lib/projects";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from Austin O'Neil: a serverless AI agent on AWS, WordPress plugin engineering for an organization with millions of members, a launch recovered 48 hours out, and agency CMS architecture.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Work - Austin O'Neil",
    description:
      "Eight case studies covering development, technical SEO and AI, with the decisions behind each one.",
    url: "/projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const tags = getProjectTags();

  const items = projects.map((project) => ({
    key: project.slug,
    tags: project.tags as string[],
    node: <ProjectRow project={project} />,
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/projects" },
        ])}
      />

      <div className="container-page border-b border-border py-16 md:py-20">
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance text-text md:text-5xl">
          Eight projects, and the decisions behind them
        </h1>
        <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-text-muted">
          Each of these is written as problem, constraints, what I built, and
          what I decided. The decisions are the part worth reading.
        </p>
      </div>

      <div className="container-page py-12 md:py-16">
        <TagFilter
          items={items}
          tags={tags}
          allLabel="Everything"
          emptyLabel="No projects carry that tag yet."
        />
      </div>
    </>
  );
}
