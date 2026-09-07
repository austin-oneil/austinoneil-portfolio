import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Tag } from "@/components/ui/tag";
import { BLUR_DATA_URL, projectImage } from "@/lib/images";
import type { Project } from "@/types/content";

/**
 * Bento grid of every case study.
 *
 * Cell sizes come from the project's own weight rather than from a repeating
 * pattern: featured work gets the wide cells with imagery, the rest get half
 * cells that lead with the title. Eight projects, eight cells, no filler tile.
 *
 * All hover motion is CSS on transform and color, so the grid ships no
 * JavaScript and the whole thing stays on the compositor.
 */

type Span = "wide" | "narrow" | "half";

const SPAN_CLASS: Record<Span, string> = {
  wide: "md:col-span-7",
  narrow: "md:col-span-5",
  half: "md:col-span-6",
};

/** Alternates wide and narrow through the first four, then pairs the rest. */
function spanFor(index: number): Span {
  if (index >= 4) return "half";
  return index % 2 === 0 ? "wide" : "narrow";
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid gap-5 md:grid-cols-12">
      {projects.map((project, i) => {
        const span = spanFor(i);
        return (
          <li key={project.slug} className={SPAN_CLASS[span]}>
            <ProjectCell
              project={project}
              withImage={span !== "half"}
              priority={i === 0}
            />
          </li>
        );
      })}
    </ul>
  );
}

function ProjectCell({
  project,
  withImage,
  priority,
}: {
  project: Project;
  withImage: boolean;
  priority: boolean;
}) {
  return (
    <article
      data-tunnel
      className="group relative flex h-full flex-col overflow-hidden rounded-[--radius] border border-border bg-surface transition-[border-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-accent-border focus-within:border-accent"
    >
      {withImage ? (
        <div className="overflow-hidden">
          <Image
            src={projectImage(project.slug)}
            alt=""
            width={1600}
            height={900}
            priority={priority}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes="(min-width: 768px) 34rem, 100vw"
            className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-xs text-text-subtle">
          {project.client} <span aria-hidden>·</span> {project.period}
        </p>

        <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-text transition-colors duration-150 group-hover:text-accent">
          <Link
            href={`/projects/${project.slug}`}
            className="rounded-[--radius-sm] outline-none"
          >
            <span className="absolute inset-0" />
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-text-muted">
          {project.summary}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {project.tags.slice(0, 2).map((tag) => (
            <Tag key={tag} tone="accent">
              {tag}
            </Tag>
          ))}
          <Tag>{project.context}</Tag>
          <ArrowRight
            size={15}
            aria-hidden
            className="ml-auto text-text-subtle transition-[transform,color] duration-200 ease-out group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>
      </div>
    </article>
  );
}
