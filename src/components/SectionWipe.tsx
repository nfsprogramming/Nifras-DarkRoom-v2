import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SectionWipe({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (reduced) {
        gsap.set(el, { yPercent: -112 });
        return;
      }
      gsap.fromTo(
        el,
        { yPercent: 0, skewY: 0 },
        {
          yPercent: -112,
          skewY: -5,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement as HTMLElement,
            start: "top bottom",
            end: "top 10%",
            scrub: 0.6,
          },
        }
      );
    },
    { dependencies: [reduced] }
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[105vh] will-change-transform"
    >
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-x-0 bottom-1.5 h-px bg-[var(--accent)]" />
      <span className="absolute bottom-4 right-6 font-mono text-[9px] uppercase tracking-[0.35em] text-[var(--muted2)]">
        {label}
      </span>
    </div>
  );
}
