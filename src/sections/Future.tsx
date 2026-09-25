import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ChapterHeader from "../components/ChapterHeader";
import RevealText from "../components/RevealText";
import SectionWipe from "../components/SectionWipe";
import { futureList } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Future() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.utils.toArray<HTMLElement>("[data-future-row]").forEach((row) => {
        gsap.fromTo(
          row,
          { autoAlpha: 0, x: 60 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 88%", once: true },
          }
        );
      });
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section
      ref={root}
      id="next"
      className="relative overflow-hidden px-5 py-36 md:px-10 md:py-56"
    >
      <SectionWipe label="CHAPTER 10" />
      <ChapterHeader chapter="10" label="WHAT'S NEXT" meta="NO FAKE CLAIMS — ONLY DIRECTION" />

      <RevealText
        lines={[
          "THINGS I WANT",
          <>
            TO <span className="text-[var(--accent)]">EXPLORE.</span>
          </>,
        ]}
        className="text-[clamp(2.6rem,8vw,7.5rem)] leading-[0.98]"
      />

      <ul className="mt-32">
        {futureList.map((f, i) => (
          <li
            key={f}
            data-future-row
            data-cursor
            className="group flex items-baseline justify-between gap-10 border-t border-[var(--line)] py-7 last:border-b md:py-9"
          >
            <span className="font-display text-[clamp(1.8rem,6vw,5.5rem)] uppercase leading-none transition-all duration-300 group-hover:translate-x-5 group-hover:text-[var(--accent)]">
              {f}
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--muted2)]">
              /{String(i + 1).padStart(2, "0")}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
