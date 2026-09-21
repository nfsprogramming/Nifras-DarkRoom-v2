import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Magnetic from "../components/Magnetic";
import Scramble from "../components/Scramble";
import { profile } from "../data/content";
import { burst } from "../lib/glitch";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        "[data-c-line]",
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 0.75,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-c-title]", start: "top 78%", once: true },
          onStart: () => burst(titleRef.current),
        }
      );
      gsap.fromTo(
        "[data-c-fade]",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-c-cta]", start: "top 82%", once: true },
        }
      );
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section
      ref={root}
      id="contact"
      className="relative flex min-h-screen flex-col justify-between px-5 pt-32 md:px-10 md:pt-44"
    >
      <div>
        <div className="mb-20 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]">
          <Scramble text="[04] — CONTACT" trigger="view" />
          <span className="hidden md:inline">FINAL FRAME</span>
        </div>

        <div data-c-title ref={titleRef}>
          <p className="overflow-hidden">
            <span data-c-line className="block font-display text-[clamp(3.4rem,11vw,10rem)] uppercase leading-[0.92]">
              LET'S BUILD
            </span>
          </p>
          <p className="overflow-hidden">
            <span data-c-line className="block font-display text-[clamp(3.4rem,11vw,10rem)] uppercase leading-[0.92]">
              SOMETHING{" "}
              <span className="font-serif normal-case italic text-[var(--accent)]">
                strange.
              </span>
            </span>
          </p>
        </div>

        <div data-c-cta className="mt-16 flex flex-wrap items-center gap-10">
          <Magnetic strength={0.25}>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="cta"
              className="group relative inline-block select-none"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-[var(--accent)] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100" />
              <span className="relative flex items-center gap-5 px-5 py-3 font-display text-[clamp(2.4rem,8vw,7rem)] uppercase leading-none transition-colors duration-300 group-hover:text-[#050505]">
                GET IN TOUCH
                <span className="inline-block transition-transform duration-500 group-hover:rotate-45">
                  ↗
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
          <a
            href={`mailto:${profile.email}`}
            data-cursor="link"
            className="u-link"
          >
            {profile.email}
          </a>
        </div>
      </div>

      <footer className="mt-28 border-t border-[var(--line)] pb-8 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6 font-mono text-[10px] uppercase tracking-[0.25em]">
          <div>
            <p className="text-[var(--fg)]">NFS® — {profile.name}</p>
            <p className="mt-2 text-[var(--muted2)]">{profile.location}</p>
          </div>
          <div className="flex gap-8">
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
            <a
              href={profile.socials.portfolio}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              className="u-link"
            >
              Portfolio
            </a>
          </div>
          <p className="text-[var(--muted2)]">© 2026 — DARK ROOM V2</p>
        </div>
        <div className="mt-8 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--muted2)]">
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            </span>
            SYSTEM ONLINE — ALL SYSTEMS NOMINAL
          </span>
          <span>NFS / 2026</span>
        </div>
      </footer>
    </section>
  );
}
