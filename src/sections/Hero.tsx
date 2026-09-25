import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroCanvas from "../components/HeroCanvas";
import NMonogram from "../components/NMonogram";
import SplitWave from "../components/SplitWave";
import TypeOn from "../components/TypeOn";
import { profile } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Props {
  active: boolean;
}

export default function Hero({ active }: Props) {
  const root = useRef<HTMLElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const exitRef = useRef({ p: 0 });
  const reduced = useReducedMotion();

  const onMove = (e: ReactMouseEvent<HTMLElement>) => {
    const el = root.current;
    if (!el || reduced) return;
    const layers = el.querySelectorAll<HTMLElement>("[data-depth]");
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    layers.forEach((layer) => {
      const d = parseFloat(layer.dataset.depth || "0");
      gsap.to(layer, {
        x: nx * d * 50,
        y: ny * d * 30,
        duration: 0.9,
        ease: "power3.out",
        overwrite: "auto",
      });
    });
  };

  useGSAP(
    () => {
      if (!active) return;
      if (reduced) {
        gsap.set("[data-hero]", { autoAlpha: 1, y: 0, yPercent: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        "[data-hero='name']",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3 },
        0.1
      );
      tl.fromTo(
        "[data-hero-line]",
        { yPercent: 115 },
        { yPercent: 0, duration: 1, stagger: 0.13 },
        0.55
      );
      tl.fromTo(
        "[data-hero='role']",
        { yPercent: 120 },
        { yPercent: 0, duration: 0.8, stagger: 0.09 },
        1.35
      );
      tl.fromTo(
        "[data-hero='strip']",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.7 },
        1.7
      );
      tl.fromTo(
        hintRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.6 },
        2.0
      );

      gsap.to("[data-hero-out]", {
        yPercent: -14,
        autoAlpha: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom 25%",
        onUpdate: (self) => {
          exitRef.current.p = self.progress;
        },
      });
    },
    { scope: root, dependencies: [active, reduced] }
  );

  useGSAP(
    () => {
      if (reduced) return;
      ScrollTrigger.create({
        start: 30,
        end: "max",
        onEnter: () =>
          gsap.to(hintRef.current, { autoAlpha: 0, y: 16, duration: 0.35 }),
        onLeaveBack: () =>
          gsap.to(hintRef.current, { autoAlpha: 1, y: 0, duration: 0.35 }),
      });
    },
    { dependencies: [reduced] }
  );

  return (
    <section
      ref={root}
      id="top"
      onMouseMove={onMove}
      className="relative flex min-h-screen flex-col overflow-hidden px-5 pb-8 pt-28 md:px-10"
    >
      <HeroCanvas boost={exitRef} />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40 md:left-auto md:right-0 md:w-[46%] md:opacity-100">
        <NMonogram active={active} triggerRef={root} />
      </div>

      <div data-hero-out className="relative z-10 my-auto max-w-[60rem]">
        <p
          data-hero="name"
          className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.45em] text-[var(--muted)] opacity-0"
        >
          <span className="h-1.5 w-1.5 bg-[var(--accent)]" />
          <TypeOn text="MOHAMED NIFRAS" delay={400} />
        </p>

        <h1 className="font-display uppercase">
          {profile.statement.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.05em]">
              <span
                data-hero-line
                className="vel-skew block text-[clamp(2.2rem,5.4vw,5.4rem)] leading-[0.98] will-change-transform"
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-[clamp(1rem,2.4vw,1.9rem)] uppercase">
          {profile.discipline.map((d, i) => (
            <span key={d} className="flex items-center gap-6">
              <span className="inline-block overflow-hidden">
                <span data-hero="role" className="inline-block will-change-transform">
                  <SplitWave text={d} />
                </span>
              </span>
              {i < profile.discipline.length - 1 && (
                <span className="text-[var(--accent)]">/</span>
              )}
            </span>
          ))}
        </div>
      </div>

      <div
        data-hero="strip"
        data-depth="0.5"
        data-hero-out
        className="absolute bottom-6 left-5 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted)] opacity-0 md:left-10"
      >
        <p>{profile.role}</p>
        <p className="mt-1.5 text-[var(--muted2)]">{profile.location}</p>
      </div>

      <div
        ref={hintRef}
        data-depth="0.5"
        data-hero-out
        className="absolute bottom-6 right-5 flex flex-col items-end gap-3 opacity-0 md:right-10"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-[var(--muted)]">
          SCROLL TO ENTER
        </span>
        <span className="relative block h-14 w-px overflow-hidden bg-[var(--line)]">
          <span className="stretch-line absolute left-0 top-0 h-full w-full bg-[var(--accent)]" />
        </span>
      </div>
    </section>
  );
}
