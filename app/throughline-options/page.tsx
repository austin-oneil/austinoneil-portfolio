import { notFound } from "next/navigation";
import {
  VariantConvergence,
  VariantStrata,
  VariantGrid,
  VariantWeight,
  VariantLedger,
} from "@/components/throughline/variants";

/**
 * Side-by-side comparison of the throughline treatments, animated, so the
 * choice is made against motion and rhythm rather than against stills.
 *
 * Development only, and blocked in production by the same middleware that
 * hides /design-system. Each variant sits in its own card with a lot of space
 * above it, so scrolling in triggers each one's reveal independently rather
 * than firing them all at once.
 */
export const dynamic = "force-dynamic";

const VARIANTS = [
  {
    key: "A",
    name: "Convergence",
    says: "Breadth. Lots of different rooms, one destination.",
    node: <VariantConvergence />,
  },
  {
    key: "D",
    name: "Strata",
    says: "Foundation. The trades are underneath the specialty, not beside it.",
    node: <VariantStrata />,
  },
  {
    key: "E",
    name: "Grid",
    says: "Inventory. No lines at all; the three that matter are simply lit.",
    node: <VariantGrid />,
  },
  {
    key: "F",
    name: "Accumulation",
    says: "Momentum. One line that gains weight as it goes, and turns accent where the depth starts.",
    node: <VariantWeight />,
  },
  {
    key: "G",
    name: "Ledger",
    says: "No diagram. Type doing the work, which may beat any picture here.",
    node: <VariantLedger />,
  },
];

export default function ThroughlineOptionsPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="container-page py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-text md:text-4xl">
        Throughline options
      </h1>
      <p className="mt-4 max-w-[62ch] leading-relaxed text-text-muted">
        Scroll slowly. Each one animates as it enters. All of it is CSS
        scroll-driven, so none of these cost any JavaScript, and every one
        renders finished rather than blank in a browser that does not support
        scroll timelines.
      </p>
      <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-text-subtle">
        Development only. This route returns 404 in production.
      </p>

      {VARIANTS.map((variant) => (
        <section key={variant.key} className="mt-24 border-t border-border pt-10">
          <div className="mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h2 className="text-xl font-semibold tracking-tight text-text">
              {variant.key}. {variant.name}
            </h2>
            <p className="text-sm text-text-muted">{variant.says}</p>
          </div>
          <div className="rounded-[--radius] border border-border bg-surface p-6 md:p-10">
            {variant.node}
          </div>
          {/* Space so the next variant is well clear of the viewport and
              animates on its own rather than with this one. */}
          <div className="h-[45vh]" aria-hidden />
        </section>
      ))}
    </div>
  );
}
