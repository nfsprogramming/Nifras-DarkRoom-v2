import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProjectVisual from "../components/ProjectVisual";
import Scramble from "../components/Scramble";
import { projects, type Project } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Props {
  onOpen: (p: Project, rect: DOMRect | null) => void;
}

export default function Projects({ onOpen }: Props) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: ReactMouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--px", x.toFixed(3));
    el.style.setProperty("--py", y.toFixed(3));
  };

  useGSAP(
    () => {
      if (reduced) return;
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
      panels.forEach((panel) => {
        const q = gsap.utils.selector(panel);
        const tl = gsap.timeline({
          scrollTrigger: { trigger: panel, start: "top 72%", once: true },
        });
        tl.fromTo(
          q("[data-visual]"),
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power4.inOut" }
        );
        tl.fromTo(
          q("[data-ptitle]"),
          { yPercent: 112 },
          { yPercent: 0, duration: 0.85, ease: "power4.out" },
          "+=0.15"
        );
        tl.fromTo(
          q("[data-pmeta]"),
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.06,
            ease: "power3.out",
          },
          "+=0.1"
        );
      });
    },
    { scope: root, dependencies: [reduced] }
  );

  const open = (p: Project) => (e: ReactMouseEvent<HTMLElement>) => {
    const visual = e.currentTarget.querySelector("[data-visual]");
    onOpen(p, visual ? visual.getBoundingClientRect() : null);
  };

  return (
    <section ref={root} id="work" className="relative py-28 md:py-40">
      <div className="mb-20 flex items-center justify-between px-5 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--muted)] md:px-10">
        <Scramble text="[03] — WORK" trigger="view" />
        <span className="hidden md:inline">06 SYSTEMS — 2024/26</span>
      </div>

      {projects.map((p, i) => {
        const rows: [string, string][] = [
          ["STACK", p.stack.join(" · ")],
          ["ROLE", p.role],
          ["STATUS", p.status],
          ["YEAR", p.year],
        ];
        return (
          <article
            key={p.id}
            data-panel
            data-cursor="open"
            onMouseMove={onMove}
            onClick={open(p)}
            className="group relative flex min-h-[92vh] flex-col justify-center gap-10 border-t border-[var(--line)] px-5 py-20 md:px-10 lg:flex-row lg:items-center lg:gap-16"
          >
            <div className="relative z-10 lg:w-[40%]">
              <p className="font-mono text-[11px] tracking-[0.35em] text-[var(--accent)]">
                {p.index} /
              </p>
              <h3 className="mt-4 overflow-hidden">
                <span
                  data-ptitle
                  className="block font-display text-[clamp(2.4rem,6vw,5.6rem)] uppercase leading-[0.9] will-change-transform"
                  style={{
                    transform:
                      "translate(calc(var(--px, 0) * 12px), calc(var(--py, 0) * 8px))",
                  }}
                >
                  {p.title}
                </span>
              </h3>
              <p className="mt-4 max-w-md font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-[var(--muted)]">
                {p.subtitle}
              </p>
              <div className="mt-8 h-px w-24 origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 group-hover:scale-x-100" />
              <dl className="mt-8">
                {rows.map(([k, v]) => (
                  <div
                    key={k}
                    data-pmeta
                    className="flex items-baseline justify-between gap-6 border-t border-[var(--line)] py-2.5"
                  >
                    <dt className="shrink-0 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted2)]">
                      {k}
                    </dt>
                    <dd className="text-right font-mono text-[10px] uppercase tracking-[0.12em]">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="vel-skew lg:w-[60%]">
              <ProjectVisual
                p={p}
                className="aspect-[16/10] w-full brightness-90 transition-[filter] duration-500 ease-out group-hover:brightness-110"
              />
            </div>
            {i === projects.length - 1 && (
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-6 right-5 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted2)] md:right-10"
              >
                END OF ARCHIVE
              </span>
            )}
          </article>
        );
      })}
    </section>
  );
}
