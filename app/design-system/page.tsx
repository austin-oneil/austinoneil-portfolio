import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { Section, SectionHeading } from "@/components/ui/section";

/**
 * Living reference for the design system. Development only.
 *
 * force-dynamic is load-bearing, not decoration. Statically prerendered, this
 * route called notFound() at build time and Next emitted the root loading
 * skeleton as its static output, so production served HTTP 200 with a page
 * stuck on "Loading" forever. That is a soft 404: the worst of both outcomes,
 * since a crawler sees a live page and a human sees a broken one.
 *
 * Evaluating per request makes notFound() return a real 404 status. The route
 * is dev-only, so the cost of it not being static is nothing.
 */
export const dynamic = "force-dynamic";

export default function DesignSystemPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const swatches = [
    ["bg", "Page ground"],
    ["surface", "Raised surface"],
    ["surface-2", "Inset / muted fill"],
    ["border", "Hairline"],
    ["border-strong", "Emphasised hairline"],
    ["accent", "Accent text and links"],
    ["accent-solid", "Accent fill"],
  ] as const;

  return (
    <>
      <Section>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-text md:text-5xl">
          Design system
        </h1>
        <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-text-muted">
          Tokens, type scale and primitives. Every page is assembled from these,
          so a change here moves the whole site.
        </p>
      </Section>

      <Section bordered>
        <SectionHeading>Color</SectionHeading>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {swatches.map(([token, label]) => (
            <div key={token}>
              <div
                className="h-20 rounded-(--radius) border border-border"
                style={{ backgroundColor: `var(--${token})` }}
              />
              <p className="mt-2 font-mono text-xs text-text">--{token}</p>
              <p className="text-xs text-text-subtle">{label}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-[65ch] text-sm leading-relaxed text-text-muted">
          One accent, used identically in both themes. Accent text sits at 7.2:1
          on the light ground and 8.9:1 on the dark ground; accent fills carry
          white labels at 6.4:1 and 5.2:1. All above the 4.5:1 AA floor.
        </p>
      </Section>

      <Section bordered>
        <SectionHeading>Typography</SectionHeading>
        <div className="space-y-8">
          <div>
            <p className="mb-2 font-mono text-xs text-text-subtle">
              Display / 48-60px / tracking-tight
            </p>
            <p className="text-4xl font-semibold tracking-tight md:text-6xl">
              I build the site and I make it rank.
            </p>
          </div>
          <div>
            <p className="mb-2 font-mono text-xs text-text-subtle">
              Heading / 24-30px
            </p>
            <p className="text-2xl font-semibold tracking-tight md:text-3xl">
              What I found in the theme folder
            </p>
          </div>
          <div>
            <p className="mb-2 font-mono text-xs text-text-subtle">
              Body / 16px / 1.7 / max 65ch
            </p>
            <p className="max-w-[65ch] text-base leading-relaxed text-text-muted">
              Plus Jakarta Sans for everything set in prose, JetBrains Mono for
              code, metadata and anything that should read as a machine value.
              Both self-hosted through next/font, with matched fallback metrics
              so the swap costs no layout shift.
            </p>
          </div>
          <div>
            <p className="mb-2 font-mono text-xs text-text-subtle">
              Mono / 14px
            </p>
            <p className="font-mono text-sm text-text">
              $wpdb-&gt;prepare( &quot;SELECT * FROM wp_prayer_hours&quot; )
            </p>
          </div>
        </div>
      </Section>

      <Section bordered>
        <SectionHeading>Controls</SectionHeading>
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="/design-system">Read the case study</ButtonLink>
          <ButtonLink href="/design-system" variant="outline">
            All work
          </ButtonLink>
          <ButtonLink href="/design-system" variant="ghost" size="sm">
            Back to writing
          </ButtonLink>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          <Tag tone="accent">Full-Stack</Tag>
          <Tag>Python</Tag>
          <Tag>AWS Lambda</Tag>
          <Tag>DynamoDB</Tag>
          <Tag>Claude API</Tag>
        </div>
      </Section>

      <Section bordered>
        <SectionHeading>Skeleton states</SectionHeading>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="animate-pulse space-y-3">
            <div className="h-4 w-24 rounded-(--radius-sm) bg-surface-2" />
            <div className="h-6 w-3/4 rounded-(--radius-sm) bg-surface-2" />
            <div className="h-4 w-full rounded-(--radius-sm) bg-surface-2" />
            <div className="h-4 w-5/6 rounded-(--radius-sm) bg-surface-2" />
          </div>
          <p className="max-w-[65ch] text-sm leading-relaxed text-text-muted">
            Loading placeholders match the dimensions of the content they stand
            in for, so nothing shifts when the real content lands.
          </p>
        </div>
      </Section>
    </>
  );
}
