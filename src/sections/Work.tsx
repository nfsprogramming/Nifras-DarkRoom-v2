import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProjectVisual from "../components/ProjectVisual";
import Scramble from "../components/Scramble";
import SectionWipe from "../components/SectionWipe";
import { projects, type Project } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useIsMobile } from "../hooks/useIsMobile";
import { cn } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EXTRA_VH = 78;

interface Props {
  onOpen: (p: Project, rect: DOMRect | null) => void;
}

function Panel({
  p,
  vertical,
  onOpen,
}: {
  p: Project;
  vertical: boolean;
  onOpen: (p: Project, rect: DOMRect | null) => void;
}) {
  const onMove = (e: ReactMouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--px", x.toFixed(3));
    el.style.setProperty("--py", y.toFixed(3));
  };

  const open = (e: ReactMouseEvent<HTMLElement>) => {
    const visual = e.currentTarget.querySelector("[data-visual]");
    onOpen(p, visual ? visual.getBoundingClientRect() : null);
  };

  const rows: [string, string][] = [
    ["ROLE", p.role],
    ["STACK", p.stack.join(" / ")],
    ["STATUS", p.status],
    ["YEAR", p.year],
  ];

  return (
    <article
      data-panel
      data-cursor="view"
      onMouseMove={onMove}
      onClick={open}
      className={cn(
        "group relative flex shrink-0 select-none flex-col justify-between gap-6 py-2",
        vertical
          ? "w-full border-t border-[var(--line)] pt-8"
          : "h-[78vh] w-[min(72vw,1080px)]"
      )}
    >
      <div className="flex items-start justify-between gap-8" data-pinfo>
        <div>
          <p className="font-mono text-[11px] tracking-[0.35em] text-[var(--accent)] transition-transform duration-500 group-hover:translate-x-2">
            {p.index} /
          </p>
          <h3 className="mt-3 overflow-hidden">
            <span
              data-ptitle
              className="block font-display text-[clamp(2.2rem,5.2vw,5rem)] uppercase leading-[0.92] will-change-transform"
              style={{
                transform:
                  "translate(calc(var(--px, 0) * 12px), calc(var(--py, 0) * 7px))",
              }}
            >
              {p.title}
            </span>
          </h3>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
            {p.subtitle}
          </p>
        </div>
        <dl className="hidden w-52 shrink-0 md:block">
          {rows.map(([k, v]) => (
            <div
              key={k}
              data-pmeta
              className="flex items-baseline justify-between gap-4 border-t border-[var(--line)] py-2"
            >
              <dt className="font-mono text-[8px] uppercase tracking-[0.3em] text-[var(--muted2)]">
                {k}
              </dt>
              <dd className="text-right font-mono text-[9px] uppercase tracking-[0.1em]">
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div data-pv-para className="vel-skew will-change-transform">
        <ProjectVisual
          p={p}
          className="aspect-[16/8] w-full brightness-90 transition-[filter] duration-500 ease-out group-hover:brightness-110"
        />
      </div>
    </article>
  );
}

export default function Work({ onOpen }: Props) {
  const root = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const pinned = !reduced && !isMobile;

  useGSAP(
    () => {
      if (!pinned) return;
      const amount = () =>
        Math.max(1, (track.current?.scrollWidth ?? 0) - window.innerWidth);
      const tween = gsap.to(track.current, {
        x: () => -amount(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current)
              bar.current.style.transform = `scaleX(${self.progress})`;
            if (count.current) {
              const idx = Math.min(
                projects.length,
                Math.floor(self.progress * projects.length) + 1
              );
              count.current.textContent = String(idx).padStart(2, "0");
            }
          },
        },
      });
      gsap.utils
        .toArray<HTMLElement>("[data-panel]", track.current as HTMLElement)
        .forEach((panel) => {
          const visual = panel.querySelector("[data-visual]");
          if (visual) {
            gsap.fromTo(
              visual,
              { scale: 1.06 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: tween,
                  start: "left 90%",
                  end: "center 55%",
                  scrub: 0.6,
                },
              }
            );
          }
          const info = panel.querySelector("[data-pinfo]");
          if (info) {
            gsap.fromTo(
              info,
              { xPercent: 5, autoAlpha: 0.55 },
              {
                xPercent: 0,
                autoAlpha: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: tween,
                  start: "left 85%",
                  end: "center 50%",
                  scrub: 0.6,
                },
              }
            );
          }
        });
    },
    { dependencies: [pinned] }
  );

  useGSAP(
    () => {
      if (pinned) return;
      gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((panel) => {
        const q = gsap.utils.selector(panel);
        gsap.fromTo(
          q("[data-visual]"),
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1,
            ease: "power4.inOut",
            scrollTrigger: { trigger: panel, start: "top 78%", once: true },
          }
        );
        gsap.fromTo(
          q("[data-ptitle]"),
          { yPercent: 112 },
          {
            yPercent: 0,
            duration: 0.85,
            ease: "power4.out",
            scrollTrigger: { trigger: panel, start: "top 78%", once: true },
          }
        );
        gsap.fromTo(
          q("[data-pv-para]"),
          { yPercent: 6 },
          {
            yPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });
    },
    { scope: root, dependencies: [pinned] }
  );

  return (
    <section ref={root} id="work" className="relative">
      <SectionWipe label="CHAPTER 04 — SELECTED WORK" />
      <div ref={wrap} style={{ height: pinned ? `calc(100vh + ${projects.length * EXTRA_VH}vh)` : undefined }}>
        <div
          className={cn(
            pinned
              ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden"
              : "flex flex-col gap-16 px-5 py-28 md:px-10"
          )}
        >
          <div
            className={cn(
              "font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]",
              pinned
                ? "pointer-events-none absolute inset-x-5 top-20 z-10 md:inset-x-10"
                : "mb-6"
            )}
          >
            <div className="flex items-center justify-between">
              <Scramble text="[ CHAPTER 04 — THE WORK ]" trigger="view" />
              <div className="flex items-center gap-5">
                <span>
                  <span ref={count}>01</span>
                  {" / "}
                  {String(projects.length).padStart(2, "0")}
                </span>
                {pinned && (
                  <span className="hidden h-px w-40 bg-[var(--line)] md:block">
                    <div
                      ref={bar}
                      className="h-full w-full origin-left bg-[var(--accent)]"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </span>
                )}
              </div>
            </div>
          </div>

          {pinned ? (
            <div
              ref={track}
              className="work-track flex w-max items-center gap-[10vw] px-[10vw] will-change-transform"
            >
              {projects.map((p) => (
                <Panel key={p.id} p={p} vertical={false} onOpen={onOpen} />
              ))}
              <div className="flex h-[78vh] w-[40vw] shrink-0 flex-col justify-center gap-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--muted2)]">
                  END OF SELECTED WORK
                </p>
                <p className="font-display text-[clamp(1.8rem,4vw,3.4rem)] uppercase leading-[0.95]">
                  KEEP SCROLLING
                  <br />
                  <span className="text-[var(--accent)]">INTO THE LAB →</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-16">
              {projects.map((p) => (
                <Panel key={p.id} p={p} vertical={true} onOpen={onOpen} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
