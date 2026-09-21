import { useEffect, useRef, type MouseEvent as ReactMouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroCanvas from "../components/HeroCanvas";
import { profile } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useIsMobile } from "../hooks/useIsMobile";
import { burst } from "../lib/glitch";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const NAME = "NIFRAS.";

interface Props {
  active: boolean;
}

export default function Hero({ active }: Props) {
  const root = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  const settersRef = useRef<
    Array<{ depth: number; x: (v: number) => void; y: (v: number) => void }>
  >([]);

  const onMove = (e: ReactMouseEvent<HTMLElement>) => {
    const el = root.current;
    if (!el || reduced) return;
    if (settersRef.current.length === 0) {
      settersRef.current = Array.from(
        el.querySelectorAll<HTMLElement>("[data-depth]")
      ).map((layer) => ({
        depth: parseFloat(layer.dataset.depth || "0"),
        x: gsap.quickTo(layer, "x", { duration: 0.9, ease: "power3.out" }),
        y: gsap.quickTo(layer, "y", { duration: 0.9, ease: "power3.out" }),
      }));
    }
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    settersRef.current.forEach((s) => {
      s.x(nx * s.depth * 60);
      s.y(ny * s.depth * 40);
    });
  };

  useGSAP(
    () => {
      if (!active) return;
      const chars = nameRef.current?.querySelectorAll<HTMLElement>("[data-hero-char]") ?? [];
      const rand = (a: number, b: number) => a + Math.random() * (b - a);

      if (reduced) {
        gsap.set("[data-hero]", { autoAlpha: 1, y: 0, yPercent: 0, scale: 1 });
        return;
      }

      chars.forEach((c) => {
        gsap.set(c, {
          opacity: 0,
          filter: "blur(14px)",
          x: rand(-70, 70),
          y: rand(-34, 34),
          rotation: rand(-9, 9),
        });
      });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        "[data-hero='hello']",
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.7 },
        0.1
      );
      tl.to(
        chars,
        {
          opacity: 1,
          filter: "blur(0px)",
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.85,
          stagger: 0.05,
          ease: "back.out(1.4)",
        },
        0.35
      );
      tl.add(
        () => chars.forEach((c) => c.classList.add("rgb-split")),
        1.02
      );
      tl.add(
        () => chars.forEach((c) => c.classList.remove("rgb-split")),
        1.18
      );
      tl.fromTo(
        chars,
        { scale: 1.08 },
        { scale: 1, duration: 0.7, ease: "elastic.out(1, 0.35)" },
        1.12
      );
      tl.add(() => burst(nameRef.current), 1.5);

      tl.fromTo(
        "[data-hero='role']",
        { yPercent: 120 },
        { yPercent: 0, duration: 0.8, stagger: 0.09 },
        1.9
      );
      tl.fromTo(
        "[data-hero='line']",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: "power3.inOut" },
        2.2
      );
      tl.fromTo(
        "[data-hero='strip'], [data-hero='side']",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12 },
        2.45
      );
      tl.fromTo(
        hintRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.6 },
        2.8
      );

      gsap.to("[data-hero-out]", {
        yPercent: -14,
        autoAlpha: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: 1,
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

  useEffect(() => {
    if (reduced) return;
    let alive = true;
    const schedule = () => {
      if (!alive) return;
      window.setTimeout(
        () => {
          if (!alive) return;
          if (document.visibilityState === "visible") burst(nameRef.current);
          schedule();
        },
        5000 + Math.random() * 5000
      );
    };
    const id = window.setTimeout(schedule, 4000);
    return () => {
      alive = false;
      window.clearTimeout(id);
    };
  }, [reduced]);

  return (
    <section
      ref={root}
      id="top"
      onMouseMove={onMove}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 pt-20 md:px-10"
    >
      {!isMobile && !reduced ? (
        <HeroCanvas />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 72% 22%, rgba(182,255,46,0.05), transparent 70%)",
          }}
        />
      )}

      <span
        data-hero="side"
        data-depth="0.5"
        data-hero-out
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.45em] text-[var(--muted)] md:block"
        style={{ writingMode: "vertical-rl" }}
      >
        NFS / 2026
      </span>

      <div data-hero-out className="relative z-10">
        <p
          data-hero="hello"
          className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.4em] text-[var(--muted)] opacity-0"
        >
          <span className="h-1.5 w-1.5 bg-[var(--accent)]" />
          HELLO, I'M
        </p>

        <div className="vel-stretch">
          <h1
            ref={nameRef}
            data-depth="0.12"
            className="font-display text-[clamp(5rem,19vw,21rem)] uppercase leading-[0.85] tracking-[-0.01em]"
          >
            {NAME.split("").map((c, i) => (
              <span
                key={i}
                data-hero-char
                className="inline-block will-change-transform"
              >
                {c === "." ? <span className="text-[var(--accent)]">.</span> : c}
              </span>
            ))}
          </h1>
        </div>

        <div
          data-depth="0.28"
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-[clamp(1.1rem,3vw,2.2rem)] uppercase"
        >
          {profile.discipline.map((d, i) => (
            <span key={d} className="flex items-center gap-6">
              <span className="inline-block overflow-hidden">
                <span data-hero="role" className="inline-block will-change-transform">
                  {d}
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
        data-hero="line"
        data-depth="0.4"
        data-hero-out
        className="absolute bottom-[16vh] left-5 h-px w-[32vw] origin-left bg-[var(--accent)] md:left-10"
        style={{ transform: "scaleX(0)" }}
      />

      <div
        data-hero="strip"
        data-depth="0.6"
        data-hero-out
        className="absolute inset-x-5 bottom-6 flex items-end justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted)] opacity-0 md:inset-x-10"
      >
        <span>{profile.location}</span>
        <span className="hidden md:inline">{profile.role}</span>
        <span>BUILDING DIGITAL SYSTEMS</span>
      </div>

      <div
        ref={hintRef}
        data-hero-out
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 opacity-0"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-[var(--muted)]">
          SCROLL TO ENTER
        </span>
        <span className="relative block h-16 w-px overflow-hidden bg-[var(--line)]">
          <span className="stretch-line absolute left-0 top-0 h-full w-full bg-[var(--accent)]" />
        </span>
      </div>
    </section>
  );
}
