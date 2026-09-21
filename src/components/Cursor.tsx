import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";

const STATES: Record<string, { scale: number; label: string }> = {
  hover: { scale: 1.6, label: "" },
  open: { scale: 2.6, label: "OPEN" },
  view: { scale: 2.2, label: "VIEW" },
  link: { scale: 1.9, label: "\u2197" },
  drag: { scale: 2.3, label: "DRAG" },
  cta: { scale: 3.1, label: "\u2197" },
};
const DEFAULT = { scale: 1, label: "" };

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    const dx = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });
    const rx = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });
    let current = "";

    const move = (e: MouseEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      const key = el ? el.dataset.cursor || "hover" : "";
      if (key === current) return;
      current = key;
      const cfg = key ? STATES[key] ?? STATES.hover : DEFAULT;
      gsap.to(ring, { scale: cfg.scale, duration: 0.5, ease: "elastic.out(1, 0.45)" });
      gsap.to(dot, { scale: key ? 0.4 : 1, duration: 0.3 });
      label.textContent = cfg.label;
      gsap.to(label, { autoAlpha: cfg.label ? 1 : 0, duration: 0.2 });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[120] hidden [@media(pointer:fine)]:block"
    >
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-[#f5f5f5] mix-blend-difference"
      >
        <span
          ref={labelRef}
          className="font-mono text-[7px] font-medium tracking-[0.2em] text-white opacity-0"
        >
          {"\u2197"}
        </span>
      </div>
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
      />
    </div>
  );
}
