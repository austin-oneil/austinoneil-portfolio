import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Tag } from "@/components/ui/tag";
import { BLUR_DATA_URL, projectImage } from "@/lib/images";
import type { Project } from "@/types/content";

/**
 * Large card for a featured case study. Image on one side, content on the
 * other, sides alternating so a run of them does not read as a stack of rows.
 */
export function FeaturedProjectCard({
  project,
  flip = false,
  priority = false,
}: {
  project: Project;
  flip?: boolean;
  priority?: boolean;
}) {
  return (
    <article className="group grid gap-6 md:grid-cols-12 md:items-center md:gap-10">
      <div
        className={`md:col-span-5 ${flip ? "md:order-2 md:col-start-8" : ""}`}
      >
        <Image
          src={projectImage(project.slug)}
          alt=""
          width={1600}
          height={900}
          priority={priority}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="(min-width: 768px) 26rem, 100vw"
          className="aspect-[4/3] w-full rounded-[--radius] border border-border object-cover"
        />
      </div>

      <div className={`md:col-span-7 ${flip ? "md:order-1 md:row-start-1" : ""}`}>
        <p className="font-mono text-xs text-text-subtle">
          {project.client} <span aria-hidden>·</span> {project.period}
        </p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-text md:text-2xl">
          <Link
            href={`/projects/${project.slug}`}
            className="rounded-[--radius-sm] transition-colors duration-150 group-hover:text-accent"
          >
            <span className="absolute inset-0" />
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 max-w-[60ch] leading-relaxed text-text-muted">
          {project.summary}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          Read the case study
          <ArrowRight
            size={14}
            aria-hidden
            className="transition-transform duration-150 group-hover:translate-x-0.5"
          />
        </p>
      </div>
    </article>
  );
}

/**
 * Index row. The projects index is a reading list, so entries are separated by
 * a hairline rather than boxed, and the image stays small and secondary.
 */
export function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="group relative grid gap-4 border-b border-border py-8 sm:grid-cols-12 sm:gap-6">
      <div className="sm:col-span-3">
        <Image
          src={projectImage(project.slug)}
          alt=""
          width={1600}
          height={900}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="(min-width: 640px) 14rem, 100vw"
          className="aspect-[4/3] w-full rounded-[--radius] border border-border object-cover"
        />
      </div>
      <div className="sm:col-span-9">
        <p className="font-mono text-xs text-text-subtle">
          {project.client} <span aria-hidden>·</span> {project.period}
        </p>
        <h2 className="mt-2 text-lg font-semibold tracking-tight text-text">
          <Link
            href={`/projects/${project.slug}`}
            className="rounded-[--radius-sm] transition-colors duration-150 group-hover:text-accent"
          >
            <span className="absolute inset-0" />
            {project.title}
          </Link>
        </h2>
        <p className="mt-2 max-w-[62ch] text-[0.9375rem] leading-relaxed text-text-muted">
          {project.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag} tone="accent">
              {tag}
            </Tag>
          ))}
          <Tag>{project.context}</Tag>
        </div>
      </div>
    </article>
  );
}

/**
 * Vertical card. Used in a grid alongside the lead featured story so the block
 * does not become three image-and-text splits stacked on top of each other.
 */
export function CompactProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col">
      <Image
        src={projectImage(project.slug)}
        alt=""
        width={1600}
        height={900}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        sizes="(min-width: 768px) 22rem, 100vw"
        className="aspect-[3/2] w-full rounded-[--radius] border border-border object-cover"
      />
      <p className="mt-5 font-mono text-xs text-text-subtle">
        {project.client} <span aria-hidden>·</span> {project.period}
      </p>
      <h3 className="mt-2 text-lg font-semibold tracking-tight text-text">
        <Link
          href={`/projects/${project.slug}`}
          className="rounded-[--radius-sm] transition-colors duration-150 group-hover:text-accent"
        >
          <span className="absolute inset-0" />
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-text-muted">
        {project.summary}
      </p>
    </article>
  );
}
