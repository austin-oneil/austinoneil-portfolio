import type { ReactNode } from "react";

/**
 * Section shell. Owns vertical rhythm so no page hand-rolls its own padding.
 * `bordered` draws a single hairline above the section — the site groups with
 * rules and whitespace rather than wrapping everything in cards.
 */
export function Section({
  children,
  id,
  bordered = false,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  bordered?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`${bordered ? "border-t border-border" : ""} py-16 md:py-24 ${className}`}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

/**
 * Section heading. Deliberately has NO eyebrow slot — the position of a section
 * on the page already says what it is, and stamping a small uppercase label
 * above every headline is the single most templated pattern in generated sites.
 */
export function SectionHeading({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-12">
      <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
        {children}
      </h2>
      {action}
    </div>
  );
}
