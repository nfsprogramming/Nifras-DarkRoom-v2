import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Scramble from "../components/Scramble";
import SectionWipe from "../components/SectionWipe";
import { technologies } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Technology() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.utils.toArray<HTMLElement>("[data-tech-row]").forEach((row, i) => {
        gsap.fromTo(
          row.querySelector("[data-tech-line]"),
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power3.inOut",
            delay: i * 0.05,
            scrollTrigger: { trigger: row, start: "top 85%", once: true },
          }
        );
        gsap.fromTo(
          row.querySelector("[data-tech-inner]"),
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.05,
            scrollTrigger: { trigger: row, start: "top 85%", once: true },
          }
        );
      });
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section
      ref={root}
      id="tech"
      className="relative overflow-hidden px-5 py-32 md:px-10 md:py-44"
    >
      <SectionWipe label="CHAPTER 06" />

      <div className="mb-16 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]">
        <Scramble text="[ CHAPTER 06 — THE SYSTEMS ]" trigger="view" />
        <span className="hidden md:inline">10 CORE INSTRUMENTS</span>
      </div>

      <h2 className="mb-20 max-w-4xl font-display text-[clamp(2.2rem,6vw,5.5rem)] uppercase leading-[0.95]">
        THE INSTRUMENTS
        <br />
        I THINK IN.
      </h2>

      <ul className="tech-list">
        {technologies.map((t) => (
          <li key={t.n} data-tech-row data-cursor className="group relative">
            <span
              data-tech-line
              className="absolute inset-x-0 top-0 h-px w-full origin-left bg-[var(--line)]"
              style={{ transform: "scaleX(0)" }}
            />
            <div
              data-tech-inner
              className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2 border-b border-[var(--line)] py-6 transition-opacity duration-300 md:py-8"
            >
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="font-mono text-[11px] tracking-[0.3em] text-[var(--muted2)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                  {t.n}
                </span>
                <span className="font-display text-[clamp(1.7rem,4.5vw,4rem)] uppercase leading-none">
                  {t.name}
                </span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--muted)] md:text-[10px]">
                {t.desc}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
