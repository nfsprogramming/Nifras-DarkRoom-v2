import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ChapterHeader from "../components/ChapterHeader";
import RevealText from "../components/RevealText";
import SectionWipe from "../components/SectionWipe";
import StoryImage from "../components/StoryImage";
import { journey, storyChapters } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FIGS = ["FIRST SKETCHES", "THE SHIFT IN PROGRESS", "SYSTEMS OVER APPS"];

export default function Story() {
  const root = useRef<HTMLElement>(null);
  const spine = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) {
        gsap.set("[data-story]", { autoAlpha: 1, y: 0, yPercent: 0 });
        return;
      }
      gsap.utils.toArray<HTMLElement>("[data-story-block]").forEach((block) => {
        gsap.fromTo(
          block,
          { autoAlpha: 0, y: 44 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: block, start: "top 80%", once: true },
          }
        );
      });
      gsap.fromTo(
        spine.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-logs]",
            start: "top 70%",
            end: "bottom 55%",
            scrub: 0.8,
          },
        }
      );
      gsap.utils.toArray<HTMLElement>("[data-log]").forEach((log) => {
        gsap.fromTo(
          log,
          { autoAlpha: 0, y: 44 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: log, start: "top 82%", once: true },
          }
        );
      });
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section
      ref={root}
      id="story"
      className="relative overflow-hidden px-5 py-36 md:px-10 md:py-56"
    >
      <SectionWipe label="CHAPTER 02" />
      <ChapterHeader chapter="02" label="WHY I BUILD" meta="THE STORY — 01 → 03" />

      <RevealText
        lines={[
          <span key="a" className="text-[var(--muted)]">I DON'T JUST BUILD</span>,
          <>
            WEBSITES. I BUILD{" "}
            <span className="text-[var(--accent)]">SYSTEMS.</span>
          </>,
        ]}
        className="vel-stretch text-[clamp(2.4rem,7vw,6.5rem)] leading-[0.98]"
      />

      <div className="mt-44 space-y-40 md:mt-56 md:space-y-56">
        {storyChapters.map((c, i) => (
          <div key={c.n} data-story-block className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="font-mono text-[11px] tracking-[0.35em] text-[var(--accent)]">
                {c.n}
              </p>
              <h3 className="mt-4 font-display text-[clamp(1.4rem,2.6vw,2.2rem)] uppercase leading-tight">
                {c.title}
              </h3>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <p className="font-display text-[clamp(1.4rem,3.2vw,2.8rem)] uppercase leading-[1.05]">
                {c.text}
              </p>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--muted)]">
                {c.body}
              </p>
              {c.list && (
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted2)]">
                  {c.list.map((l) => (
                    <span key={l}>+ {l}</span>
                  ))}
                </div>
              )}
              <div
                className={
                  i === 1 ? "mt-14" : i === 2 ? "mt-14 w-full md:w-[55%]" : "mt-14 w-full md:w-[75%]"
                }
              >
                <StoryImage
                  fig={`FIG. 0${i + 1}`}
                  label={`[ PROCESS / 0${i + 1} ]`}
                  caption={FIGS[i]}
                  meta="2024—26"
                  ratio={i === 1 ? "aspect-[16/8]" : i === 2 ? "aspect-[4/5]" : "aspect-[16/10]"}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div data-logs className="relative mt-48 ml-2 pl-10 md:ml-6 md:pl-20">
        <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-[var(--line)]" />
        <span
          ref={spine}
          aria-hidden
          className="absolute left-0 top-0 h-full w-px origin-top bg-[var(--accent)]"
          style={{ transform: "scaleY(0)" }}
        />
        {journey.map((j, i) => (
          <div
            key={j.year}
            data-log
            className="relative border-b border-[var(--line)] py-12 md:py-16"
          >
            <span
              aria-hidden
              className="absolute -left-10 top-[3.2rem] h-2 w-2 -translate-x-1/2 rotate-45 bg-[var(--accent)] md:-left-20 md:top-[3.8rem]"
            />
            <div className="flex flex-col gap-6 md:flex-row md:items-baseline md:gap-16">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--muted2)]">
                LOG/{String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[clamp(2.2rem,6vw,5rem)] uppercase leading-none">
                {j.year}
              </h3>
              <div className="max-w-md md:ml-auto">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
                  {j.event}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                  {j.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
