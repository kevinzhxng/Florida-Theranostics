"use client";

import { useRef, useEffect, ReactNode } from "react";

export interface ScrollRevealProps {
  children: ReactNode;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Direction for slide: "up" | "down" | "left" | "right" */
  direction?: "up" | "down" | "left" | "right";
  /** Distance to travel (px) */
  distance?: number;
  /** Duration in seconds */
  duration?: number;
  /** Ease string */
  ease?: string;
  /** Start when element is this far into view (0–1) */
  start?: string;
  /** Stagger children by this amount (seconds); set to 0 to disable */
  stagger?: number;
  /** Opacity start (0–1) */
  opacityFrom?: number;
  /** Optional className for wrapper */
  className?: string;
  /** Tag for wrapper element */
  as?: "div" | "section" | "article";
}

const directionToVars = (
  direction: ScrollRevealProps["direction"],
  distance: number
) => {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return { y: distance };
  }
};

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 48,
  duration = 0.8,
  ease = "power3.out",
  start = "top 85%",
  stagger = 0,
  opacityFrom = 0,
  className = "",
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const animationRef = useRef<{ kill: () => void } | null>(null);
  const vars = directionToVars(direction, distance);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    void (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const hasStagger = stagger > 0;
      const targets = hasStagger ? el.children : el;

      animationRef.current = gsap.fromTo(
        targets,
        {
          ...vars,
          opacity: opacityFrom,
        },
        {
          ...vars,
          x: 0,
          y: 0,
          opacity: 1,
          ease: "none",
          stagger: hasStagger ? stagger : undefined,
          scrollTrigger: {
            trigger: el,
            start: start,
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    })();

    return () => {
      animationRef.current?.kill();
      animationRef.current = null;
      void import("gsap/ScrollTrigger").then(({ ScrollTrigger: ST }) => {
        ST.getAll().forEach((t) => {
          if (t.trigger === el) t.kill();
        });
      });
    };
  // vars is derived from direction + distance (both in deps)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, direction, distance, duration, ease, start, stagger, opacityFrom]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
