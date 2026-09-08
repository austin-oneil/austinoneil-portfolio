"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

/**
 * The full-page subway line.
 *
 * One SVG path measured from the real positions of every [data-stop] section:
 * a vertical run at each section's own rail position, an S-curve interchange
 * between them, and a station that lights as the line reaches it. Cards marked
 * [data-tunnel] get headlight and taillight glows positioned exactly where the
 * track crosses them, so the train reads as passing behind the content.
 *
 * Per-section tuning through data attributes:
 *   data-stop            marks a section as a station
 *   data-stop-fx="0.03"  rail x as a fraction of the container width
 *   data-stop-dy="104"   station y offset from the section top
 *   data-tunnel          a card the line passes behind
 *
 * Scroll is read through Motion's useScroll rather than a scroll listener, and
 * nothing in the scroll path touches React state: the dash offset, the station
 * classes and the tunnel opacities are all written straight to the DOM. A
 * scroll from the top of the page to the bottom causes zero re-renders.
 *
 * Desktop only. Under 900px there is no gutter to put a rail in, so nothing
 * renders. Under prefers-reduced-motion the line draws complete with every
 * station lit and no scroll coupling at all.
 */

interface Stop {
  x: number;
  y: number;
  /** Bottom of the section's content. Curves may not begin above this. */
  floor: number;
}

interface Geometry {
  d: string;
  width: number;
  height: number;
  stops: Stop[];
}

interface Tunnel {
  el: HTMLElement;
  top: number;
  bottom: number;
}

/** Builds the path and the tunnel table from the live DOM. */
function measure(): { geometry: Geometry; tunnels: Tunnel[] } | null {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>("[data-stop]"),
  );
  if (sections.length < 2) return null;

  // The SVG is absolutely positioned inside [data-rail-host], so its
  // coordinate space starts at that element, not at the document. Everything
  // below is measured against the document, so the host's own offset has to
  // come back out or the whole rail is drawn one header-height too low. That
  // was silently true for a while: the stations still lined up with their
  // sections because the per-section dy values had been tuned around the
  // error, and it only became visible once the track had to meet a specific
  // point rather than just run down the page.
  const host = document.querySelector<HTMLElement>("[data-rail-host]");
  const hostRect = host?.getBoundingClientRect();
  const originX = hostRect ? hostRect.left + window.scrollX : 0;
  const originY = hostRect ? hostRect.top + window.scrollY : 0;
  const toLocalX = (x: number) => Math.round(x - originX);
  const toLocalY = (y: number) => Math.round(y - originY);

  const stops: Stop[] = sections.map((section) => {
    const container =
      section.querySelector<HTMLElement>(".container-page") ?? section;
    const rect = container.getBoundingClientRect();
    const fx = Number.parseFloat(section.dataset.stopFx ?? "0.03");
    const dy = Number.parseFloat(section.dataset.stopDy ?? "104");
    return {
      x: toLocalX(rect.left + window.scrollX + rect.width * fx),
      y: toLocalY(section.getBoundingClientRect().top + window.scrollY + dy),
      floor: toLocalY(rect.bottom + window.scrollY),
    };
  });

  // The line map above the hero marks the start of the route. When it is on
  // screen the track begins at its first dot and curves down into the hero
  // station, so the horizontal strip and the vertical rail read as one line
  // rather than two unrelated decorations. Without it, the track just starts
  // a little above the first station as before.
  const origin = document.querySelector<HTMLElement>("[data-rail-origin]");
  let d: string;
  if (origin) {
    const r = origin.getBoundingClientRect();
    const ox = toLocalX(r.left + window.scrollX + r.width / 2);
    const oy = toLocalY(r.top + window.scrollY + r.height / 2);
    const midY = (oy + stops[0].y) / 2;
    d = `M ${ox} ${oy} C ${ox} ${midY}, ${stops[0].x} ${midY}, ${stops[0].x} ${stops[0].y}`;
  } else {
    d = `M ${stops[0].x} ${Math.max(stops[0].y - 140, 0)}`;
  }
  for (let i = 0; i < stops.length; i++) {
    const p = stops[i];
    if (!(i === 0 && origin)) d += ` L ${p.x} ${p.y}`;
    const n = stops[i + 1];
    if (!n) {
      d += ` L ${p.x} ${p.y + 44}`; // short tail past the terminus
      continue;
    }
    // The curve window scales with lateral distance so a big sideways jump
    // stays gentle instead of kinking.
    const span = Math.min(190 + Math.abs(n.x - p.x) * 0.55, 560);
    const curveTop = Math.max(n.y - span, p.y + 40, p.floor + 28);
    const curveEnd = n.y - 44;
    const midY = (curveTop + curveEnd) / 2;
    d += ` L ${p.x} ${curveTop}`;
    d += ` C ${p.x} ${midY}, ${n.x} ${midY}, ${n.x} ${curveEnd}`;
  }

  const tunnels = Array.from(
    document.querySelectorAll<HTMLElement>("[data-tunnel]"),
  ).flatMap<Tunnel>((el) => {
    const section = el.closest<HTMLElement>("[data-stop]");
    if (!section) return [];
    const index = sections.indexOf(section);
    if (index === -1) return [];

    const rect = el.getBoundingClientRect();
    const left = rect.left + window.scrollX;
    const localLeft = toLocalX(left);
    const railX = stops[index].x;

    // A card is only a tunnel if the rail genuinely runs underneath it. In a
    // grid the track passes through the left-hand column and misses the rest,
    // and a glow on a card the line never entered reads as a stray light.
    // Marking a card [data-tunnel] is a request, not a guarantee.
    if (railX < localLeft || railX > localLeft + rect.width) {
      el.style.setProperty("--head-o", "0");
      el.style.setProperty("--tail-o", "0");
      return [];
    }

    // Park the glows at the exact x where the track crosses this card.
    el.style.setProperty("--tunnel-x", `${railX - left}px`);
    return [
      {
        el,
        top: toLocalY(rect.top + window.scrollY),
        bottom: toLocalY(rect.bottom + window.scrollY),
      },
    ];
  });

  return {
    geometry: {
      d,
      width: Math.round(hostRect?.width ?? document.documentElement.scrollWidth),
      height: Math.round(host?.scrollHeight ?? document.documentElement.scrollHeight),
      stops,
    },
    tunnels,
  };
}

export function SubwayLine() {
  const progressRef = useRef<SVGPathElement>(null);
  const stationRefs = useRef<(SVGGElement | null)[]>([]);
  const tunnelsRef = useRef<Tunnel[]>([]);
  const samplesRef = useRef<{ y: number; len: number }[]>([]);
  const lengthRef = useRef(0);
  const litRef = useRef(-1);

  const [geometry, setGeometry] = useState<Geometry | null>(null);

  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  /** Re-measure the page. Deferred out of the effect body by its callers. */
  const build = useCallback(() => {
    if (window.innerWidth < 900) {
      setGeometry(null);
      return;
    }
    const result = measure();
    if (!result) {
      setGeometry(null);
      return;
    }
    tunnelsRef.current = result.tunnels;
    litRef.current = -1;
    setGeometry(result.geometry);
  }, []);

  useEffect(() => {
    // Deferred to the next frame so the measurement runs after paint, and the
    // state update is not synchronous inside the effect body.
    const first = requestAnimationFrame(build);
    // Re-measure once images and fonts have settled and the page has its
    // final height.
    const settle = window.setTimeout(build, 600);
    window.addEventListener("resize", build);
    return () => {
      cancelAnimationFrame(first);
      window.clearTimeout(settle);
      window.removeEventListener("resize", build);
    };
  }, [build]);

  /**
   * Position the train for a scroll offset. Pure DOM writes, so it is safe to
   * call from the scroll subscription and from the mount effect alike.
   */
  const update = useCallback(
    (y: number) => {
      const path = progressRef.current;
      const stops = geometry?.stops;
      if (!path || !stops || reduce) return;

      // The train sits 60% down the viewport: far enough in that the line has
      // arrived before you read a section, not so far that it lags behind. At
      // the very bottom there is no scroll left to give, so the pen runs past
      // everything and the terminus lights.
      const atBottom =
        y + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const hostTop =
        document.querySelector<HTMLElement>("[data-rail-host]")
          ?.getBoundingClientRect().top ?? 0;
      const hostOffset = hostTop + window.scrollY;
      const penY = atBottom
        ? Number.POSITIVE_INFINITY
        : y + window.innerHeight * 0.6 - hostOffset;

      const samples = samplesRef.current;
      let len = 0;
      for (let i = samples.length - 1; i >= 0; i--) {
        if (samples[i].y <= penY) {
          len = samples[i].len;
          break;
        }
      }
      path.style.strokeDashoffset = `${Math.max(lengthRef.current - len, 0)}`;

      let lit = 0;
      for (const stop of stops) if (stop.y <= penY) lit++;
      if (litRef.current !== lit) {
        litRef.current = lit;
        stationRefs.current.forEach((node, i) => {
          node?.classList.toggle("lit", i < lit);
        });
      }

      for (const tunnel of tunnelsRef.current) {
        const p = (penY - tunnel.top) / (tunnel.bottom - tunnel.top);
        if (p > 0 && p < 1) {
          // Headlight ramps quadratically toward the exit: dim at the entry,
          // blazing at the portal. Taillight fades as the train goes deep.
          tunnel.el.style.setProperty(
            "--head-o",
            (0.12 + 0.88 * p * p).toFixed(3),
          );
          tunnel.el.style.setProperty("--tail-o", (0.9 - p * 0.6).toFixed(3));
        } else {
          tunnel.el.style.setProperty("--head-o", "0");
          tunnel.el.style.setProperty("--tail-o", "0");
        }
      }
    },
    [geometry, reduce],
  );

  /** Sample the path, then paint the position the page is already at. */
  useEffect(() => {
    const path = progressRef.current;
    if (!path || !geometry) return;

    const total = path.getTotalLength();
    lengthRef.current = total;
    path.style.strokeDasharray = `${total}`;

    const samples: { y: number; len: number }[] = [];
    const steps = 240;
    for (let i = 0; i <= steps; i++) {
      const len = (total * i) / steps;
      samples.push({ y: path.getPointAtLength(len).y, len });
    }
    samplesRef.current = samples;

    if (reduce) {
      path.style.strokeDashoffset = "0";
      litRef.current = geometry.stops.length;
      for (const node of stationRefs.current) node?.classList.add("lit");
      for (const tunnel of tunnelsRef.current) {
        tunnel.el.style.setProperty("--head-o", "0");
        tunnel.el.style.setProperty("--tail-o", "0");
      }
      return;
    }

    // Without this the rail stays blank until the first scroll event, which
    // looks broken on a page loaded already scrolled, or where the first
    // station is behind the train from the start.
    path.style.strokeDashoffset = `${total}`;
    update(window.scrollY);
  }, [geometry, reduce, update]);

  useMotionValueEvent(scrollY, "change", update);

  if (!geometry) return null;

  const terminus = geometry.stops.length - 1;

  return (
    <svg
      className="subway"
      width={geometry.width}
      height={geometry.height}
      aria-hidden="true"
      focusable="false"
    >
      <path d={geometry.d} className="subway-track" />
      <path ref={progressRef} d={geometry.d} className="subway-progress" />
      {geometry.stops.map((stop, i) => (
        <g
          key={i}
          ref={(node) => {
            stationRefs.current[i] = node;
          }}
          className="station"
        >
          {i === terminus ? (
            <circle
              cx={stop.x}
              cy={stop.y}
              r={12}
              className="station-terminus"
            />
          ) : null}
          <circle cx={stop.x} cy={stop.y} r={7} className="station-outer" />
          <circle cx={stop.x} cy={stop.y} r={3} className="station-inner" />
        </g>
      ))}
    </svg>
  );
}
