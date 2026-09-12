"use client";

import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

/**
 * Development only. Renders the terminus section with the same markup as the
 * home page, so the arrival treatment can be judged against motion rather
 * than a still. The rail does not run on this page, so arrival is triggered
 * when the section is most of the way into view, and can be replayed.
 *
 * Every candidate is additive: the heading, body and CTA are fully visible
 * before, during and after the arrival. Nothing here is a from-state that
 * hides content.
 */
export function TerminusDemo({ variant }: { variant?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArrived(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const replay = () => {
    setArrived(false);
    window.setTimeout(() => setArrived(true), 120);
  };

  return (
    <div>
      <section
        ref={ref}
        data-terminus
        data-variant={variant}
        className={`relative py-12 ${arrived ? "arrived" : ""}`}
      >
        <div className="arrival-platform max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
            One conversation is worth fifty resume screens
          </h2>
          <p className="mt-4 leading-relaxed text-text-muted">
            I&apos;m looking for my next role, ideally one where I build the
            marketing infrastructure and explain it to the people who depend
            on it. I&apos;m open to relocating, with Seattle, San Francisco and
            the rest of the West Coast at the top of the list, and to remote
            roles anywhere. Email is the fastest way to reach me, and I answer
            all of them.
          </p>
          <div className="arrival-cta mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink href={`mailto:${site.email}`}>Get in touch</ButtonLink>
            <a
              href={`mailto:${site.email}`}
              className="rounded-(--radius-sm) font-mono text-sm text-text-muted transition-colors duration-150 hover:text-text"
            >
              {site.email}
            </a>
          </div>
        </div>
      </section>
      <button
        type="button"
        onClick={replay}
        className="rounded-(--radius) border border-border-strong px-3.5 py-2 font-mono text-xs text-text-muted transition-colors duration-150 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Replay arrival
      </button>
    </div>
  );
}
