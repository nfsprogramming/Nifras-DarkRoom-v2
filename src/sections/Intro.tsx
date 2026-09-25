import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ChapterHeader from "../components/ChapterHeader";
import RevealText from "../components/RevealText";
import SectionWipe from "../components/SectionWipe";
import StoryImage from "../components/StoryImage";
import { introStory, profile } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Intro() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) {
        gsap.set("[data-intro]", { autoAlpha: 1, y: 0, yPercent: 0 });
        return;
      }
      gsap.fromTo(
        "[data-intro-body]",
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-intro-grid]", start: "top 75%", once: true },
        }
      );
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section
      ref={root}
      id="intro"
      className="relative overflow-hidden px-5 py-36 md:px-10 md:py-56"
    >
      <SectionWipe label="CHAPTER 01" />
      <ChapterHeader chapter="01" label="WHO I AM" meta="THE HUMAN BEHIND THE ROOM" />

      <RevealText
        lines={[
          <span key="a" className="text-[var(--muted)]">BEFORE THE PROJECTS,</span>,
          <>
            THERE WAS{" "}
            <span className="text-[var(--accent)]">CURIOSITY.</span>
          </>,
        ]}
        className="text-[clamp(2.6rem,7.5vw,7rem)] leading-[0.98]"
      />

      <div data-intro-grid className="mt-24 grid items-start gap-14 md:grid-cols-12 md:gap-10">
        <div data-intro-body className="md:col-span-5">
          <StoryImage
            fig="FIG. 01"
            label="[ IMAGE / 001 ]"
            caption="MOHAMED NIFRAS S.S."
            meta="2026"
            ratio="aspect-[3/4]"
          />
        </div>

        <div className="md:col-span-6 md:col-start-8">
          <p data-intro-body className="font-mono text-[11px] uppercase tracking-[0.35em] text-[var(--fg)]">
            {profile.name}
          </p>
          <p
            data-intro-body
            className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]"
          >
            {profile.role} — DEVELOPER / BUILDER
          </p>
          <p
            data-intro-body
            className="mt-12 max-w-xl text-lg leading-relaxed text-[var(--muted)] md:text-xl"
          >
            {introStory}
          </p>

          <div data-intro-body className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {profile.aboutDetails.slice(0, 4).map((d) => (
              <div key={d.label}>
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--accent)]">
                  {d.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {d.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
