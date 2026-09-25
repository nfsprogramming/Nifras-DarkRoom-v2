import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Scramble from "../components/Scramble";
import SectionWipe from "../components/SectionWipe";
import { burst } from "../lib/glitch";
import { labItems, labTags } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Lab() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        "[data-lab-item]",
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-lab-grid]", start: "top 80%", once: true },
        }
      );
      gsap.fromTo(
        "[data-lab-tag]",
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.05,
          scrollTrigger: { trigger: "[data-lab-tags]", start: "top 90%", once: true },
        }
      );
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section
      ref={root}
      id="lab"
      className="relative overflow-hidden px-5 py-32 md:px-10 md:py-44"
    >
      <SectionWipe label="CHAPTER 08" />

      <span
        aria-hidden
        className="pointer-events-none absolute bottom-8 right-5 select-none font-display text-[16vw] uppercase leading-none text-transparent opacity-[0.05] md:right-10"
        style={{ WebkitTextStroke: "1px #f5f5f5" }}
      >
        LAB
      </span>

      <div className="mb-16 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]">
        <Scramble text="[ CHAPTER 08 — THE LAB ]" trigger="view" />
        <span className="hidden md:inline">NOT JUST FINISHED PRODUCTS</span>
      </div>

      <h2 className="max-w-4xl font-display text-[clamp(2.2rem,6vw,5.5rem)] uppercase leading-[0.95]">
        THE LAB NEVER
        <br />
        <span className="text-[var(--accent)]">TURNS OFF.</span>
      </h2>

      <div data-lab-grid className="mt-20 grid gap-px bg-[var(--line)] md:grid-cols-2">
        {labItems.map((item, i) => (
          <div
            key={item.code}
            data-lab-item
            data-cursor
            onMouseEnter={(e) => burst(e.currentTarget.querySelector("[data-lab-title]"))}
            className="group relative bg-[#050505] p-8 transition-colors duration-500 hover:bg-[#080808] md:p-12"
          >
            <div className="flex items-baseline justify-between gap-6">
              <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--accent)]">
                {item.code}
              </span>
              <span className="font-mono text-[9px] tracking-[0.3em] text-[var(--muted2)]">
                {String(i + 1).padStart(2, "0")} / 05
              </span>
            </div>
            <h3
              data-lab-title
              className="mt-8 font-display text-[clamp(1.8rem,4vw,3.6rem)] uppercase leading-none transition-colors duration-300 group-hover:text-[var(--accent)]"
            >
              {item.title}
            </h3>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
              {item.desc}
            </p>
            <span className="absolute right-6 top-1/2 hidden -translate-y-1/2 font-display text-2xl text-[var(--accent)] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:block">
              →
            </span>
          </div>
        ))}
      </div>

      <div
        data-lab-tags
        className="mt-12 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted2)]"
      >
        {labTags.map((t) => (
          <span key={t} data-lab-tag>
            + {t}
          </span>
        ))}
      </div>
    </section>
  );
}
