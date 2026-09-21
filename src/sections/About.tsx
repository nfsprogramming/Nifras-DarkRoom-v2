import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Scramble from "../components/Scramble";
import { profile } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>("[data-word]");

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const raw = el.dataset.count ?? "0";
        const num = parseInt(raw.replace(/\D/g, ""), 10) || 0;
        const numStr = String(num);
        const idx = raw.indexOf(numStr);
        const prefix = idx > 0 ? raw.slice(0, idx) : "";
        const suffix = raw.slice(idx + numStr.length);
        if (reduced) {
          el.textContent = raw;
          return;
        }
        const state = { v: 0 };
        gsap.to(state, {
          v: num,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = prefix + Math.round(state.v) + suffix;
          },
        });
      });

      if (reduced) {
        gsap.set(words, { xPercent: 0, yPercent: 0 });
        return;
      }

      words.forEach((w, i) => {
        const from = i % 2 === 0 ? -110 : 110;
        gsap.fromTo(
          w,
          { xPercent: from },
          {
            xPercent: 0,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: { trigger: "[data-statement]", start: "top 78%", once: true },
          }
        );
      });

      const spread = [10, -8, 12];
      words.forEach((w, i) => {
        gsap.to(w, {
          yPercent: spread[i] ?? 0,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-statement]",
            start: "top 62%",
            end: "bottom 22%",
            scrub: 1,
          },
        });
      });

      gsap.fromTo(
        "[data-support] > *",
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-support]", start: "top 82%", once: true },
        }
      );
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section
      ref={root}
      id="about"
      className="relative overflow-hidden px-5 py-32 md:px-10 md:py-48"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-5 top-8 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted2)] md:left-10"
      >
        FIG. 01 — INTENT
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute right-5 top-8 hidden font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted2)] md:right-10 md:block"
      >
        11.0165° N / 76.9558° E
      </span>

      <div className="mb-24 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]">
        <Scramble text="[01] — ABOUT" trigger="view" />
        <span className="hidden md:inline">BUILDING SINCE 2018</span>
      </div>

      <h2
        data-statement
        className="font-display uppercase leading-[0.9]"
        aria-label="I build digital systems."
      >
        {profile.statement.map((w, i) => (
          <span key={i} className="block overflow-hidden pb-[0.06em]">
            <span
              data-word
              className="block text-[clamp(3.2rem,12.5vw,11.5rem)] will-change-transform"
            >
              {w.endsWith(".") ? (
                <>
                  {w.slice(0, -1)}
                  <span className="text-[var(--accent)]">.</span>
                </>
              ) : (
                w
              )}
            </span>
          </span>
        ))}
      </h2>

      <div data-support className="mt-24 grid max-w-5xl gap-12 md:grid-cols-2">
        <p className="max-w-md text-base leading-relaxed text-[var(--muted)]">
          {profile.support}
        </p>
        <div className="grid grid-cols-2 gap-x-10 gap-y-10">
          {profile.metrics.map((m) => (
            <div key={m.label}>
              <p className="font-display text-4xl md:text-5xl">
                <span data-count={m.value}>0</span>
              </p>
              <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
