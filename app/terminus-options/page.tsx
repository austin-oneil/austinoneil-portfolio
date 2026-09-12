import { TerminusDemo } from "@/components/terminus-demo";

/**
 * The terminus arrival next to its baseline, animated, so any future change
 * is judged against motion. Development only; blocked in production by the
 * same middleware that hides /design-system. Two rejected candidates, an
 * accent outline drawing round the slab and an accent flood, were compared
 * here in September 2026 and deleted so their CSS does not ship.
 *
 * The rail's own arrival ping (the ring that expands out of the last station)
 * is common to every candidate and is not shown here because the rail does
 * not run on this page.
 */
export const dynamic = "force-dynamic";

const CANDIDATES = [
  {
    key: "T0",
    name: "Baseline",
    variant: undefined,
    says: "The base arrival on its own: slab lifts to the raised surface, gains a hairline and shadow, grows two percent, one ring pulses off the button.",
  },
  {
    key: "T3",
    name: "Headlight (chosen, live on the home page)",
    variant: "headlight",
    says: "The train's light sweeps across the slab and out the other side, and a short accent mark draws under the heading like a platform edge. Same light vocabulary as the tunnel glows. Outline and Flood were compared here and removed.",
  },
];

export default function TerminusOptionsPage() {
  return (
    <div className="container-page py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-text md:text-4xl">
        Terminus options
      </h1>
      <p className="mt-4 max-w-[62ch] leading-relaxed text-text-muted">
        Scroll slowly. Each candidate arrives when it is most of the way into
        view, and can be replayed with the button beneath it. Every one is
        additive: nothing is hidden before the train gets there.
      </p>
      <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-text-subtle">
        Development only. This route returns 404 in production.
      </p>

      {CANDIDATES.map((c) => (
        <section key={c.key} className="mt-24 border-t border-border pt-10">
          <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h2 className="text-xl font-semibold tracking-tight text-text">
              {c.key}. {c.name}
            </h2>
            <p className="max-w-[70ch] text-sm text-text-muted">{c.says}</p>
          </div>
          <div className="rail-indent">
            <TerminusDemo variant={c.variant} />
          </div>
          <div className="h-[40vh]" aria-hidden />
        </section>
      ))}
    </div>
  );
}
