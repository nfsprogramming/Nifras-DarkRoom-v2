import { useEffect, useRef } from "react";
import { cn } from "../lib/utils";
import { getDirection, getVelocity } from "../lib/scroll";
import { useReducedMotion } from "../hooks/useReducedMotion";

const COPIES = 3;

interface Props {
  words: string[];
  className?: string;
  speed?: number;
}

export default function Marquee({ words, className, speed = 90 }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    const tr = track.current;
    if (!el || !tr) return;

    let raf = 0;
    let last = performance.now();
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(el);

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      if (!visible) return;
      if (!reduced) {
        const boost = 1 + Math.min(Math.abs(getVelocity()) / 80, 3);
        pos.current += speed * boost * dt * (getDirection() === 1 ? 1 : -1);
      }
      const w = tr.scrollWidth / COPIES;
      if (w > 0) {
        const p = ((pos.current % w) + w) % w;
        tr.style.transform = `translate3d(${-p}px,0,0)`;
      }
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [reduced, speed]);

  const row = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center whitespace-nowrap">
          <span className="px-8">{w}</span>
          <span className="text-[var(--accent)]">—</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={root}
      className={cn("relative overflow-hidden border-y border-[var(--line)] py-5 md:py-7", className)}
      aria-hidden
    >
      <div ref={track} className="flex w-max will-change-transform">
        {Array.from({ length: COPIES }).map((_, i) => row(i > 0))}
      </div>
    </div>
  );
}
