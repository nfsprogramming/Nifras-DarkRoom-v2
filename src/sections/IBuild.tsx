import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ChapterHeader from "../components/ChapterHeader";
import SectionWipe from "../components/SectionWipe";
import { buildWords } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useIsMobile } from "../hooks/useIsMobile";
import { cn } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EXTRA_VH = 70;

export default function IBuild() {
  const root = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const pinned = !reduced && !isMobile;

  useGSAP(
    () => {
      if (!pinned) {
        gsap.fromTo(
          "[data-static-word]",
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: "[data-static-words]", start: "top 82%", once: true },
          }
        );
        return;
      }
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            if (counter.current) {
              const idx = Math.min(
                buildWords.length,
                Math.floor(self.progress * buildWords.length) + 1
              );
              counter.current.textContent = String(idx).padStart(2, "0");
            }
          },
        },
      });
      buildWords.forEach((_, i) => {
        tl.fromTo(
          `[data-word='${i}']`,
          { autoAlpha: 0, scale: 0.94, filter: "blur(8px)" },
          { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.32, ease: "power2.inOut" },
          i
        );
        tl.to(
          `[data-word='${i}']`,
          { autoAlpha: 0, scale: 1.06, duration: 0.28, ease: "power2.in" },
          i + 0.68
        );
      });
    },
    { scope: root, dependencies: [pinned] }
  );

  return (
    <section ref={root} id="build" className="relative overflow-hidden">
      <SectionWipe label="CHAPTER 03" />

      <div
        ref={wrap}
        style={{ height: pinned ? `calc(100vh + ${buildWords.length * EXTRA_VH}vh)` : undefined }}
      >
        <div
          className={cn(
            pinned
              ? "sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-5"
              : "flex flex-col items-center px-5 py-36 md:py-48"
          )}
        >
          <ChapterHeader
            chapter="03"
            label="THE FIRST EXPERIMENTS"
            meta="SCROLL-DRIVEN"
            className={pinned ? "absolute inset-x-5 top-20 mb-0 md:inset-x-10" : "self-start"}
          />

          {pinned ? (
            <>
              <h2 className="font-display text-[clamp(1.6rem,4vw,3rem)] uppercase text-[var(--muted)]">
                I BUILD
              </h2>
              <div className="relative mt-6 flex h-[36vh] w-full items-center justify-center">
                {buildWords.map((w, i) => (
                  <span
                    key={w}
                    data-word={i}
                    className="absolute font-display text-[clamp(3.4rem,15vw,13rem)] uppercase leading-none opacity-0 will-change-transform"
                  >
                    {w === "AI." ? (
                      <>
                        <span className="text-[var(--accent)]">AI.</span>
                      </>
                    ) : (
                      w
                    )}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-8 left-5 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted2)] md:left-10">
                [ CHAPTER 03 ]
              </div>
              <div className="absolute bottom-8 right-5 flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-[var(--muted2)] md:right-10">
                <span ref={counter}>01</span>
                <span className="h-px w-10 bg-[var(--line)]">
                  <span className="block h-full w-1/3 bg-[var(--accent)]" />
                </span>
                <span>{String(buildWords.length).padStart(2, "0")}</span>
              </div>
            </>
          ) : (
            <>
              <h2 className="font-display text-[clamp(1.6rem,4vw,3rem)] uppercase text-[var(--muted)]">
                I BUILD
              </h2>
              <div data-static-words className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
                {buildWords.map((w) => (
                  <span
                    key={w}
                    data-static-word
                    className="font-display text-[clamp(1.8rem,7vw,4.5rem)] uppercase leading-none"
                  >
                    {w === "AI." ? <span className="text-[var(--accent)]">AI.</span> : w}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="relative flex h-[85vh] items-center justify-center">
        <h2 className="select-none font-display text-[clamp(3.5rem,12vw,10rem)] uppercase leading-none text-[var(--muted2)]">
          PAUSE.
        </h2>
        <span className="absolute bottom-8 left-5 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted2)] md:left-10">
          [ BREAK / 01 ]
        </span>
        <span className="absolute bottom-8 right-5 font-mono text-[10px] tracking-[0.3em] text-[var(--muted2)] md:right-10">
          01:37
        </span>
      </div>
    </section>
  );
}
