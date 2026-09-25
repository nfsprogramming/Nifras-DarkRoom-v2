import { createElement, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "../lib/utils";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Props {
  lines: ReactNode[];
  className?: string;
  as?: string;
  delay?: number;
  stagger?: number;
  start?: string;
}

export default function RevealText({
  lines,
  className,
  as = "h2",
  delay = 0,
  stagger = 0.12,
  start = "top 82%",
}: Props) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const ls = el.querySelectorAll<HTMLElement>("[data-rt]");
      if (reduced) {
        gsap.set(ls, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        return;
      }
      gsap.fromTo(
        ls,
        { y: 44, autoAlpha: 0, filter: "blur(8px)" },
        {
          y: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 1.15,
          ease: "power3.out",
          stagger,
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    },
    { dependencies: [reduced, delay, stagger] }
  );

  const nodes = lines.map((l, i) =>
    createElement(
      "span",
      { key: i, "data-rt": true, className: "block will-change-[transform,filter,opacity]" },
      l
    )
  );

  return createElement(
    as as string,
    { ref: root, className: cn("font-display uppercase", className) },
    nodes
  );
}
