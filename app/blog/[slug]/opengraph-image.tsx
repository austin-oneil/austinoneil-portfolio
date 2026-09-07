import { notFound } from "next/navigation";
import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { getAllPosts, getPost } from "@/lib/blog";

export const alt = "Post";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return ogImage({ title: post.title, kicker: "Writing", tags: post.tags });
}
