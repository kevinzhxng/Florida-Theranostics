"use client";

import { useRef, useEffect, ReactNode } from "react";

export default function FooterReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const animationRef = useRef<{ kill: () => void } | null>(null);

  useEffect(() => {
    const el = ref.current;
    const grid = el?.firstElementChild as HTMLElement | null;
    const columns = grid?.children;
    if (!columns?.length) return;

    void (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      animationRef.current = gsap.fromTo(
        columns,
        { y: 24, opacity: 0.92 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: grid,
            start: "top 98%",
            end: "top 50%",
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
          if (t.trigger === grid) t.kill();
        });
      });
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
