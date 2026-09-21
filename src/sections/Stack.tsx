import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Scramble from "../components/Scramble";
import { stackRows } from "../data/content";
import { getVelocity } from "../lib/scroll";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COPIES = 3;

export default function Stack() {
  const root = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const state = useRef({
    dragging: false,
    startX: 0,
    startPos: [0, 0],
    pos: [0, 0],
  });
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];

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
      if (!visible || rows.length === 0) return;
      const boost = 1 + Math.min(Math.abs(getVelocity()) / 70, 2.5);
      rows.forEach((row, i) => {
        const dir = i === 0 ? 1 : -1;
        if (!state.current.dragging && !reduced) {
          state.current.pos[i] += 34 * dir * boost * dt;
        }
        const w = row.scrollWidth / COPIES;
        if (w > 0) {
          const p = ((state.current.pos[i] % w) + w) % w;
          row.style.transform = `translate3d(${-p}px,0,0)`;
        }
      });
    };
    raf = requestAnimationFrame(loop);

    const onDown = (e: PointerEvent) => {
      state.current.dragging = true;
      state.current.startX = e.clientX;
      state.current.startPos = [...state.current.pos];
    };
    const onMove = (e: PointerEvent) => {
      if (!state.current.dragging) return;
      const dx = e.clientX - state.current.startX;
      state.current.pos = [
        state.current.startPos[0] - dx,
        state.current.startPos[1] - dx,
      ];
    };
    const onUp = () => {
      state.current.dragging = false;
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [reduced]);

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        ".wall-item",
        { scale: 1.25, filter: "blur(8px)", opacity: 0 },
        {
          scale: 1,
          filter: "blur(0px)",
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.045,
          clearProps: "all",
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        }
      );
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section
      ref={root}
      id="stack"
      data-cursor="drag"
      className="relative overflow-hidden py-28 md:py-40"
      style={{ touchAction: "pan-y" }}
    >
      <div className="mb-16 flex items-center justify-between px-5 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--muted)] md:px-10">
        <Scramble text="[02] — STACK" trigger="view" />
        <span className="hidden md:inline">DRAG TO EXPLORE ——</span>
      </div>

      <div className="wall select-none space-y-6 md:space-y-10">
        {stackRows.map((row, ri) => (
          <div key={ri} className="overflow-hidden">
            <div
              ref={(el) => {
                rowRefs.current[ri] = el;
              }}
              className="flex w-max items-center will-change-transform"
            >
              {Array.from({ length: COPIES }).map((_, copy) => (
                <div
                  key={copy}
                  aria-hidden={copy > 0 || undefined}
                  className="flex shrink-0 items-center"
                >
                  {row.map((t) => (
                    <span
                      key={t}
                      className="wall-item flex items-center whitespace-nowrap px-7 font-display text-[clamp(2.2rem,5.5vw,5rem)] uppercase leading-none"
                    >
                      {t}
                      <span className="ml-7 h-2 w-2 rotate-45 bg-[var(--accent)] opacity-40" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
