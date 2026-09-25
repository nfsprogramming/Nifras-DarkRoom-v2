import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ChapterHeader from "../components/ChapterHeader";
import RevealText from "../components/RevealText";
import SectionWipe from "../components/SectionWipe";
import { failureStatements } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Failures() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.utils.toArray<HTMLElement>("[data-failure]").forEach((line) => {
        gsap.fromTo(
          line,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: line, start: "top 85%", once: true },
          }
        );
      });
      gsap.fromTo(
        "[data-iteration]",
        { autoAlpha: 0, scale: 0.96 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: "[data-iteration]", start: "top 82%", once: true },
        }
      );
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section
      ref={root}
      id="failures"
      className="relative overflow-hidden px-5 py-36 md:px-10 md:py-56"
    >
      <SectionWipe label="CHAPTER 07" />
      <ChapterHeader chapter="07" label="THE FAILURES" meta="LESSONS — NOT LOSSES" />

      <RevealText
        lines={[
          "NOT EVERYTHING",
          <span key="b" className="text-[var(--accent)]">WORKED.</span>,
        ]}
        className="text-[clamp(2.4rem,7vw,6.5rem)] leading-[0.98]"
      />

      <div className="mt-32 space-y-14 md:space-y-20">
        {failureStatements.map((s) => (
          <p
            key={s}
            data-failure
            className="max-w-4xl font-display text-[clamp(1.4rem,4vw,3.2rem)] uppercase leading-[1.05] text-[var(--muted)] will-change-transform"
          >
            {s}
          </p>
        ))}
      </div>

      <div data-iteration className="mt-40 border-t border-[var(--line)] pt-16">
        <p className="font-display text-[clamp(2rem,6.5vw,6rem)] uppercase leading-[0.95]">
          BUILDING IS <span className="text-[var(--accent)]">ITERATION.</span>
        </p>
      </div>
    </section>
  );
}
