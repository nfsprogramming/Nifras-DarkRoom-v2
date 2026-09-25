import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ProjectVisual from "./ProjectVisual";
import { profile, projects, type Project } from "../data/content";
import { burst } from "../lib/glitch";

gsap.registerPlugin(useGSAP);

interface Props {
  project: Project;
  onClose: () => void;
  onOpen: (p: Project, rect: DOMRect | null) => void;
}

const STORY: [string, keyof Project][] = [
  ["CHALLENGE", "challenge"],
  ["SOLUTION", "solution"],
  ["RESULT", "result"],
];

export default function ProjectOverlay({ project, onClose, onOpen }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const idx = projects.findIndex((x) => x.id === project.id);
  const next = projects[(idx + 1) % projects.length];

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline();
      tl.fromTo(
        q("[data-o-title]"),
        { yPercent: 115 },
        { yPercent: 0, duration: 0.85, ease: "power4.out", delay: 0.1 }
      );
      tl.add(() => burst(titleRef.current), 0.55);
      tl.fromTo(
        q("[data-o-fade]"),
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.07,
        },
        "-=0.5"
      );
    },
    { scope: root, dependencies: [project.id] }
  );

  const requestClose = () => {
    gsap.to(root.current, {
      autoAlpha: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const meta: [string, string][] = [
    ["ROLE", project.role],
    ["STATUS", project.status],
    ["YEAR", project.year],
    ["STACK", project.stack.join(", ")],
  ];

  return (
    <div
      ref={root}
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      tabIndex={-1}
      className="fixed inset-0 z-[95] overflow-y-auto bg-[#050505]"
    >
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-5 md:px-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
          SYS.{project.index} — {project.tag}
        </span>
        <button
          onClick={requestClose}
          data-cursor
          className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
        >
          CLOSE <span aria-hidden>✕</span>
        </button>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-24 pt-28 md:px-10 md:pt-36">
        <div className="overflow-hidden">
          <h2
            ref={titleRef}
            data-o-title
            className="block font-display text-[clamp(2.6rem,8vw,8rem)] uppercase leading-[0.9] will-change-transform"
          >
            {project.title}
          </h2>
        </div>
        <p
          data-o-fade
          className="mt-5 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]"
        >
          {project.subtitle}
        </p>

        <div data-o-fade className="vel-skew mt-12">
          <ProjectVisual p={project} className="aspect-[16/10] w-full" />
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-3">
          <p
            data-o-fade
            className="text-base leading-relaxed text-[var(--muted)] md:col-span-2"
          >
            {project.summary}
          </p>
          <dl data-o-fade>
            {meta.map(([k, v]) => (
              <div
                key={k}
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

        <div className="mt-24 space-y-0">
          {STORY.map(([label, key]) => (
            <div
              key={label}
              data-o-fade
              className="grid gap-4 border-t border-[var(--line)] py-10 md:grid-cols-[200px_1fr] md:gap-12"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--accent)]">
                {label}
              </p>
              <p className="max-w-2xl text-base leading-relaxed md:text-lg">
                {project[key] as string}
              </p>
            </div>
          ))}
        </div>

        <div data-o-fade className="vel-skew mt-24">
          <ProjectVisual p={project} className="aspect-[21/9] w-full" />
        </div>

        {project.github && (
          <a
            data-o-fade
            data-cursor="link"
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="u-link mt-20 inline-block font-mono text-[11px] uppercase tracking-[0.3em]"
          >
            VIEW SOURCE ↗
          </a>
        )}

        <button
          data-o-fade
          data-cursor
          onClick={() => onOpen(next, null)}
          className="group mt-28 flex w-full items-center justify-between gap-6 border-t border-[var(--line)] pt-10 text-left"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
            NEXT SYSTEM
          </span>
          <span className="text-right font-display text-[clamp(1.5rem,4vw,3.5rem)] uppercase leading-none transition-colors duration-300 group-hover:text-[var(--accent)]">
            {next.title} ↗
          </span>
        </button>

        <p
          data-o-fade
          className="mt-20 text-center font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted2)]"
        >
          {profile.brand} — DARK ROOM / ARCHIVE {project.index}
        </p>
      </div>
    </div>
  );
}
