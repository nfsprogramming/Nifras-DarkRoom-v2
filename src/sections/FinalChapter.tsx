import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ChapterHeader from "../components/ChapterHeader";
import RevealText from "../components/RevealText";
import { finalNote } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function FinalChapter() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        "[data-final-note]",
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-final-note]", start: "top 88%", once: true },
        }
      );
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section
      ref={root}
      id="end"
      className="relative overflow-hidden px-5 py-40 md:px-10 md:py-64"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 select-none font-display text-[26vw] uppercase leading-none text-transparent opacity-[0.04] md:block"
        style={{ WebkitTextStroke: "1px #f5f5f5" }}
      >
        NEXT
      </span>

      <ChapterHeader chapter="11" label="THE NEXT BUILD" meta="TO BE CONTINUED" />

      <RevealText
        lines={["THE STORY", "IS STILL", <span key="c" className="text-[var(--accent)]">BEING BUILT.</span>]}
        className="text-[clamp(2.8rem,10vw,9.5rem)] leading-[0.94]"
        stagger={0.14}
      />

      <p
        data-final-note
        className="mt-20 max-w-xl text-lg leading-relaxed text-[var(--muted)] md:text-xl"
      >
        {finalNote}
      </p>
    </section>
  );
}
