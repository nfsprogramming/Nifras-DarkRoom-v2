import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ChapterHeader from "../components/ChapterHeader";
import RevealText from "../components/RevealText";
import SectionWipe from "../components/SectionWipe";
import StoryImage from "../components/StoryImage";
import { building, rightNowStatements } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { cn } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function RightNow() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.utils.toArray<HTMLElement>("[data-now-line]").forEach((line) => {
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
      gsap.utils.toArray<HTMLElement>("[data-build-row]").forEach((row, i) => {
        gsap.fromTo(
          row,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.05,
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
      id="building"
      className="relative overflow-hidden px-5 py-36 md:px-10 md:py-56"
    >
      <SectionWipe label="CHAPTER 09" />
      <ChapterHeader chapter="09" label="RIGHT NOW" meta="LIVE STATUS — 2026" />

      <RevealText
        lines={["RIGHT", <span key="b" className="text-[var(--accent)]">NOW.</span>]}
        className="text-[clamp(2.6rem,8vw,7.5rem)] leading-[0.94]"
      />

      <div className="mt-24 space-y-6 md:space-y-8">
        {rightNowStatements.map((s) => (
          <p
            key={s}
            data-now-line
            className="font-display text-[clamp(1.3rem,3.6vw,3rem)] uppercase leading-none text-[var(--muted)]"
          >
            {s}
          </p>
        ))}
      </div>

      <div className="relative mx-auto mt-36 max-w-5xl">
        <StoryImage
          fig="FIG. 01"
          label="[ BUILD / IN PROGRESS ]"
          caption="THE ROOM IS BUSY RIGHT NOW"
          meta="2026"
          ratio="aspect-[16/8]"
          interactive={false}
        />
        {building.slice(0, 4).map((b, i) => {
          const corners = [
            "left-[2%] top-[18%]",
            "right-[3%] top-[38%]",
            "left-[8%] bottom-[16%]",
            "right-[6%] bottom-[26%]",
          ];
          return (
            <span
              key={b.name}
              className={`pointer-events-none absolute hidden font-mono text-[9px] uppercase tracking-[0.35em] text-[var(--muted2)] md:block ${corners[i]}`}
            >
              {b.name} — {b.status}
            </span>
          );
        })}
      </div>

      <ul className="mt-36">
        {building.map((b) => {
          const active = b.status === "BUILDING" || b.status === "LIVE";
          return (
            <li
              key={b.name}
              data-build-row
              data-cursor
              className="group flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 border-t border-[var(--line)] py-7 last:border-b md:py-9"
            >
              <div className="flex items-baseline gap-6 md:gap-12">
                <span className="font-display text-[clamp(1.4rem,3.4vw,2.8rem)] uppercase leading-none transition-colors duration-300 group-hover:text-[var(--accent)]">
                  {b.name}
                </span>
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--muted)] md:inline">
                  {b.desc}
                </span>
              </div>
              <span className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em]">
                {active && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  </span>
                )}
                <span
                  className={cn(
                    b.status === "LIVE"
                      ? "text-[var(--accent)]"
                      : b.status === "RESEARCH"
                        ? "text-[var(--muted)]"
                        : "text-[var(--fg)]"
                  )}
                >
                  {b.status}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
