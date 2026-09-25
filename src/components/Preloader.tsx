import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(useGSAP);

const META = [
  "SYSTEM INITIALIZING",
  "CREATIVE ENGINE",
  "BUILD 2026",
  "PORTFOLIO.EXE",
  "LOADING EXPERIENCE...",
  "CALIBRATING MOTION",
  "SYNCING SYSTEMS",
];

interface Props {
  onReveal: () => void;
  onGone: () => void;
}

export default function Preloader({ onReveal, onGone }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const wordA = useRef<HTMLSpanElement>(null);
  const wordB = useRef<HTMLSpanElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const seen = useRef(false);

  useEffect(() => {
    seen.current = sessionStorage.getItem("nfs-v2-intro") === "1";
    sessionStorage.setItem("nfs-v2-intro", "1");
  }, []);

  useGSAP(
    () => {
      const rootEl = root.current;
      const aEl = wordA.current;
      const bEl = wordB.current;
      if (!rootEl || !aEl || !bEl) return;

      const state = { v: 0 };
      const metaEls = rootEl.querySelectorAll<HTMLElement>("[data-meta]");
      const metaId = window.setInterval(() => {
        metaEls.forEach(
          (el) => (el.textContent = META[(Math.random() * META.length) | 0])
        );
      }, 180);

      const tl = gsap.timeline();
      tl.fromTo(
        aEl,
        { autoAlpha: 0, y: 26, filter: "blur(6px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power2.out" }
      );
      tl.to(
        state,
        {
          v: 100,
          duration: 1.5,
          ease: "power1.inOut",
          onUpdate: () => {
            if (num.current)
              num.current.textContent = String(Math.round(state.v)).padStart(3, "0");
            if (bar.current)
              bar.current.style.transform = `scaleX(${state.v / 100})`;
          },
        },
        0.35
      );
      tl.to(aEl, { autoAlpha: 0, y: -14, duration: 0.3, ease: "power2.in" }, 1.2);
      tl.fromTo(
        bEl,
        { autoAlpha: 0, y: 18, filter: "blur(4px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power2.out" },
        1.38
      );
      tl.to({}, { duration: 0.15 });
      tl.add(() => onReveal(), "reveal");
      tl.to(
        rootEl,
        { clipPath: "inset(0 0 100% 0)", duration: 0.85, ease: "power4.inOut" },
        "reveal"
      );
      tl.call(() => {
        window.clearInterval(metaId);
        onGone();
      });

      if (reduced) {
        tl.timeScale(8);
      } else if (seen.current) {
        tl.timeScale(2.7);
      }
    },
    { dependencies: [reduced] }
  );

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] bg-[#050505]"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <span
        data-meta
        data-pl-text
        className="absolute left-5 top-5 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted2)] md:left-8 md:top-6"
      >
        SYSTEM INITIALIZING
      </span>
      <span
        data-meta
        data-pl-text
        className="absolute right-5 top-5 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted2)] md:right-8 md:top-6"
      >
        CREATIVE ENGINE
      </span>
      <span
        data-meta
        data-pl-text
        className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted2)] md:bottom-6 md:left-8"
      >
        BUILD 2026
      </span>
      <span
        data-meta
        data-pl-text
        className="absolute bottom-5 right-5 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted2)] md:bottom-6 md:right-8"
      >
        PORTFOLIO.EXE
      </span>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-10">
        <div className="relative flex h-[1.1em] w-full items-center justify-center font-display text-[clamp(2.6rem,8vw,6.5rem)] uppercase leading-none">
          <span ref={wordA} className="absolute">
            NFS
          </span>
          <span ref={wordB} className="absolute opacity-0">
            DARK ROOM
          </span>
        </div>
        <div data-pl-text className="flex flex-col items-center gap-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--muted)]">
            INITIALIZING DARK ROOM
          </span>
          <div className="flex items-center gap-4">
            <span ref={num} className="font-mono text-[11px] tracking-[0.3em]">
              000
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--muted2)]">
              %
            </span>
          </div>
          <div className="h-px w-64 overflow-hidden bg-[var(--line)]">
            <div
              ref={bar}
              className="h-full w-full origin-left bg-[var(--accent)]"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
