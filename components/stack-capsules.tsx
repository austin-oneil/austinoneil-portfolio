import { BrandIcon } from "@/components/brand-icon";
import { stackGroups } from "@/lib/stack";

/**
 * The toolkit, as labelled capsule rows.
 *
 * Entirely server-rendered: the marks are inline SVG and the hover states are
 * CSS, so a section with fifty logos in it ships no JavaScript at all.
 */
export function StackCapsules() {
  return (
    <div className="space-y-8">
      {stackGroups.map((group) => (
        <div key={group.label}>
          <h3 className="font-mono text-xs tracking-wide text-text-subtle uppercase">
            {group.label}
          </h3>
          <ul className="mt-3.5 flex flex-wrap gap-2">
            {group.tools.map((tool) => (
              <li
                key={tool.name}
                className="group inline-flex items-center gap-2 rounded-(--radius) border border-border bg-surface px-3 py-2 text-sm text-text-muted transition-[border-color,color,transform] duration-150 ease-out hover:-translate-y-px hover:border-border-strong hover:text-text"
              >
                <span className="text-text-subtle transition-colors duration-150 group-hover:text-accent">
                  <BrandIcon slug={tool.icon} mono={tool.mono} />
                </span>
                {tool.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
