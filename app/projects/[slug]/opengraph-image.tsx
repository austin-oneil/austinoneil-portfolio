import { notFound } from "next/navigation";
import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { getAllProjects, getProject } from "@/lib/projects";

export const alt = "Case study";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return ogImage({
    title: project.title,
    kicker: `${project.client} - ${project.period}`,
    tags: project.tags,
  });
}
