import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ChapterHeader from "../components/ChapterHeader";
import SectionWipe from "../components/SectionWipe";
import StoryImage from "../components/StoryImage";
import { processSteps, workbenchLabels, xrayLayers } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Process() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step, i) => {
        gsap.fromTo(
          step,
          { autoAlpha: 0, y: 44 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            delay: i * 0.04,
            scrollTrigger: { trigger: step, start: "top 86%", once: true },
          }
        );
      });
      gsap.fromTo(
        "[data-bench-label]",
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-workbench]", start: "top 70%", once: true },
        }
      );
      gsap.utils.toArray<HTMLElement>("[data-xray-row]").forEach((row, i) => {
        gsap.fromTo(
          row,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            delay: i * 0.05,
            scrollTrigger: { trigger: row, start: "top 86%", once: true },
          }
        );
      });
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section
      ref={root}
      id="process"
      className="relative overflow-hidden px-5 py-36 md:px-10 md:py-56"
    >
      <SectionWipe label="CHAPTER 05" />
      <ChapterHeader chapter="05" label="HOW I BUILD" meta="SEVEN MOVES — REPEATABLE" />

      <h2 className="mb-24 max-w-4xl font-display text-[clamp(2.2rem,6vw,5.5rem)] uppercase leading-[0.95]">
        A SYSTEM FOR
        <br />
        <span className="text-[var(--accent)]">MAKING THINGS.</span>
      </h2>

      <ul className="tech-list">
        {processSteps.map((s) => (
          <li key={s.n} data-step data-cursor className="group relative">
            <span className="absolute inset-x-0 top-0 h-px w-full bg-[var(--line)]" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2 border-b border-[var(--line)] py-6 transition-opacity duration-300 md:py-8">
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="font-mono text-[11px] tracking-[0.3em] text-[var(--muted2)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                  {s.n}
                </span>
                <span className="font-display text-[clamp(1.7rem,4.5vw,4rem)] uppercase leading-none">
                  {s.word}
                </span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--muted)] md:text-[10px]">
                "{s.quote}"
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div data-workbench className="relative mx-auto mt-44 max-w-5xl">
        <StoryImage
          fig="FIG. 01"
          label="[ WORKSPACE / 001 ]"
          caption="THE WORKBENCH — WHERE IT HAPPENS"
          meta="2026"
          ratio="aspect-[16/9]"
          interactive={false}
        />
        {workbenchLabels.map((l) => (
          <span
            key={l.text}
            data-bench-label
            className={`pointer-events-none absolute font-mono text-[9px] uppercase tracking-[0.35em] text-[var(--accent)] opacity-0 ${l.pos}`}
          >
            {l.text}
          </span>
        ))}
      </div>

      <div className="mt-44">
        <h3 className="font-display text-[clamp(1.8rem,4.5vw,4rem)] uppercase leading-[0.95]">
          UNDER THE SURFACE<span className="text-[var(--accent)]">.</span>
        </h3>
        <p className="mt-4 max-w-md font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted2)]">
          HOVER A LAYER — WHAT EXISTS BENEATH THE INTERFACE
        </p>

        <div className="mt-14">
          {xrayLayers.map((l, i) => (
            <div
              key={l.name}
              data-xray-row
              data-cursor
              className="group grid border-t border-[var(--line)] py-6 transition-all duration-300 last:border-b hover:border-l-[var(--accent)] hover:pl-6 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <span className="flex items-baseline gap-6 md:col-span-4">
                <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--muted2)]">
                  0{i + 1}
                </span>
                <span className="font-display text-[clamp(1.3rem,3vw,2.4rem)] uppercase leading-none transition-colors duration-300 group-hover:text-[var(--accent)]">
                  {l.name}
                </span>
              </span>
              <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--muted)] md:col-span-3 md:mt-0">
                {l.tech}
              </span>
              <span className="mt-2 text-sm text-[var(--muted)] md:col-span-4 md:mt-0">
                {l.purpose}
              </span>
              <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted2)] transition-colors duration-300 group-hover:text-[var(--fg)] md:col-span-1 md:mt-0 md:text-right">
                {l.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
