"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Scroll-entry reveal. Fires once, never re-animates on a second scroll pass.
 *
 * Motivation (skill: "motion must be motivated"): sections carry a reading
 * order, and an 8px lift on entry marks where the eye should land next as the
 * page assembles. It is opacity + transform only, so it stays on the compositor.
 * Under prefers-reduced-motion the element renders in its final state with no
 * animation at all.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.25, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
