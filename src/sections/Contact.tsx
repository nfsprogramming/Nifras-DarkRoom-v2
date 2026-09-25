import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Magnetic from "../components/Magnetic";
import RevealText from "../components/RevealText";
import Scramble from "../components/Scramble";
import SectionWipe from "../components/SectionWipe";
import { profile } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        "[data-c-fade]",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.55,
          scrollTrigger: { trigger: "[data-c-cta]", start: "top 85%", once: true },
        }
      );
      gsap.fromTo(
        "[data-cta-scale]",
        { scale: 0.94 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-cta-scale]",
            start: "top 92%",
            end: "top 45%",
            scrub: 0.8,
          },
        }
      );
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section
      ref={root}
      id="contact"
      className="relative flex min-h-screen flex-col justify-center px-5 py-32 md:px-10"
    >
      <SectionWipe label="CHAPTER 11" />

      <div className="mb-24 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]">
        <Scramble text="[ CHAPTER 11 — LET'S BUILD ]" trigger="view" />
        <span className="hidden md:inline">THE ENDING</span>
      </div>

      <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.4em] text-[var(--muted)]">
        HAVE AN IDEA?
      </p>

      <RevealText
        lines={[
          "LET'S",
          "BUILD",
          "SOMETHING",
          <span
            key="s"
            className="float-soft font-serif normal-case italic text-[var(--accent)]"
          >
            strange.
          </span>,
        ]}
        className="text-[clamp(3rem,10vw,9rem)] leading-[0.94]"
        stagger={0.16}
        start="top 85%"
      />

      <div data-c-cta data-cta-scale className="mt-16 flex flex-wrap items-center gap-10 will-change-transform">
        <Magnetic strength={0.25}>
          <a
            href={`mailto:${profile.email}`}
            data-cursor="cta"
            className="group relative inline-block select-none"
          >
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-[var(--accent)] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100" />
            <span className="relative flex items-center gap-5 px-5 py-3 font-display text-[clamp(2.2rem,7vw,6rem)] uppercase leading-none transition-colors duration-300 group-hover:text-[#050505]">
              GET IN TOUCH
              <span className="inline-block transition-transform duration-500 group-hover:rotate-45">
                →
              </span>
            </span>
          </a>
        </Magnetic>
      </div>

      <div
        data-c-fade
        className="mt-14 flex flex-wrap items-center gap-x-12 gap-y-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]"
      >
        <span>Open for freelance & full-time</span>
        <a href={`mailto:${profile.email}`} data-cursor="link" className="u-link">
          {profile.email}
        </a>
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noreferrer"
          data-cursor="link"
          className="u-link"
        >
          GitHub
        </a>
        <a
          href={profile.socials.linkedin}
          target="_blank"
          rel="noreferrer"
          data-cursor="link"
          className="u-link"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}
