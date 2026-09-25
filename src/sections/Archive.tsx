import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ChapterHeader from "../components/ChapterHeader";
import ProjectVisual from "../components/ProjectVisual";
import { archiveExtra, caseStudyIds, projects, type Project } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { cn } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Props {
  onOpen: (p: Project, rect: DOMRect | null) => void;
}

export default function Archive({ onOpen }: Props) {
  const root = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<Project | null>(null);
  const reduced = useReducedMotion();
  const minors = projects.filter((p) => !caseStudyIds.includes(p.id));

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    gsap.set(el, { xPercent: 0, yPercent: -50 });
  }, []);

  useGSAP(
    () => {
      if (reduced) return;
      gsap.utils.toArray<HTMLElement>("[data-arch-row]").forEach((row, i) => {
        gsap.fromTo(
          row,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.04,
            scrollTrigger: { trigger: row, start: "top 88%", once: true },
          }
        );
      });
    },
    { scope: root, dependencies: [reduced] }
  );

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = previewRef.current;
    if (!el) return;
    gsap.to(el, {
      x: e.clientX + 28,
      y: e.clientY,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const showPreview = (p: Project) => {
    setPreview(p);
    const el = previewRef.current;
    if (el) {
      gsap.fromTo(
        el,
        { scale: 0.95 },
        { scale: 1, duration: 0.45, ease: "power3.out" }
      );
    }
  };

  return (
    <section
      ref={root}
      id="archive"
      onMouseMove={onMove}
      className="relative overflow-hidden px-5 py-32 md:px-10 md:py-48"
    >
      <ChapterHeader chapter="04" label="THE ARCHIVE" meta="SMALLER SYSTEMS — 2024/26" />

      <h2 className="mb-20 font-display text-[clamp(2.2rem,6vw,5.5rem)] uppercase leading-[0.95]">
        NOT EVERYTHING
        <br />
        <span className="text-[var(--accent)]">GETS A CHAPTER.</span>
      </h2>

      <div
        className="relative"
        onMouseLeave={() => setPreview(null)}
      >
        <ul>
          {minors.map((p, i) => (
            <li key={p.id} data-arch-row>
              <button
                onClick={() => onOpen(p, null)}
                onMouseEnter={() => showPreview(p)}
                data-cursor="view"
                className="group flex w-full flex-wrap items-baseline justify-between gap-x-10 gap-y-2 border-t border-[var(--line)] py-6 text-left transition-colors last:border-b hover:bg-[#080808] md:py-8"
              >
                <span className="flex items-baseline gap-6 md:gap-12">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--muted2)] transition-colors group-hover:text-[var(--accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[clamp(1.4rem,3.4vw,2.8rem)] uppercase leading-none transition-transform duration-300 group-hover:translate-x-3">
                    {p.title}
                  </span>
                </span>
                <span className="flex items-baseline gap-6 font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--muted)] md:gap-10 md:text-[10px]">
                  <span className="hidden md:inline">{p.tag}</span>
                  <span>{p.year}</span>
                  <span
                    className={cn(
                      p.status === "LIVE"
                        ? "text-[var(--accent)]"
                        : "text-[var(--muted2)]"
                    )}
                  >
                    {p.status}
                  </span>
                  <span className="font-display text-base transition-transform duration-300 group-hover:rotate-45 group-hover:text-[var(--accent)]">
                    →
                  </span>
                </span>
              </button>
            </li>
          ))}
          {archiveExtra.map((a, i) => (
            <li
              key={a.name}
              data-arch-row
              className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2 border-t border-[var(--line)] py-6 last:border-b md:py-8"
            >
              <span className="flex items-baseline gap-6 md:gap-12">
                <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--muted2)]">
                  {String(minors.length + i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[clamp(1.4rem,3.4vw,2.8rem)] uppercase leading-none text-[var(--muted)]">
                  {a.name}
                </span>
              </span>
              <span className="flex items-baseline gap-6 font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--muted2)] md:gap-10 md:text-[10px]">
                <span className="hidden md:inline">{a.category}</span>
                <span>{a.year}</span>
                <span>{a.status}</span>
              </span>
            </li>
          ))}
        </ul>

        <div
          ref={previewRef}
          aria-hidden
          className={cn(
            "pointer-events-none fixed left-0 top-0 z-30 hidden w-80 opacity-0 transition-opacity duration-300 lg:block",
            preview && "opacity-100"
          )}
        >
          {preview && <ProjectVisual p={preview} className="aspect-video" />}
        </div>
      </div>
    </section>
  );
}
