import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { burst } from "../lib/glitch";

gsap.registerPlugin(useGSAP);

const WORDS = ["NFS", "NIFRAS", "DARK ROOM"];
const META = [
  "SYSTEM INITIALIZING",
  "CREATIVE ENGINE",
  "BUILD 2026",
  "PORTFOLIO.EXE",
  "LOADING EXPERIENCE...",
  "RENDERING IDENTITY",
  "CALIBRATING MOTION",
  "SYNCING SYSTEMS",
];

interface Props {
  onReveal: () => void;
  onGone: () => void;
}

export default function Preloader({ onReveal, onGone }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLDivElement>(null);
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
      const wordEl = word.current;
      const rootEl = root.current;
      if (!wordEl || !rootEl) return;

      const state = { v: 0 };
      const total = reduced ? 0.25 : seen.current ? 0.6 : 2.1;
      const metaEls = rootEl.querySelectorAll<HTMLElement>("[data-meta]");

      const metaId = window.setInterval(() => {
        metaEls.forEach(
          (el) => (el.textContent = META[(Math.random() * META.length) | 0])
        );
      }, 110);

      const tl = gsap.timeline();
      tl.to(state, {
        v: 100,
        duration: total,
        ease: "power2.inOut",
        onUpdate: () => {
          const p = state.v;
          if (num.current)
            num.current.textContent = String(Math.round(p)).padStart(3, "0");
          if (bar.current)
            bar.current.style.transform = `scaleX(${p / 100})`;
          const w = p < 35 ? 0 : p < 72 ? 1 : 2;
          if (wordEl.textContent !== WORDS[w]) wordEl.textContent = WORDS[w];
          wordEl.classList.toggle("scan-x", p >= 20 && p < 60);
          wordEl.classList.toggle("frag", p >= 60 && p < 90);
          if (p >= 90 && p < 100) burst(wordEl, 300);
        },
      });
      tl.call(() => burst(wordEl, 300));
      tl.set("[data-pl-text]", { autoAlpha: 0 }, "+=0.12");
      tl.to({}, { duration: 0.12 });
      tl.add(() => onReveal());
      tl.to(rootEl, { autoAlpha: 0, duration: 0.12, ease: "none" });
      tl.call(() => {
        window.clearInterval(metaId);
        onGone();
      });
    },
    { dependencies: [reduced] }
  );

  return (
    <div ref={root} className="fixed inset-0 z-[100] bg-[#050505]">
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

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-9">
        <div
          ref={word}
          data-pl-text
          className="font-display text-[clamp(3rem,11vw,10rem)] uppercase leading-none"
        >
          NFS
        </div>
        <div data-pl-text className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--accent)]">
            Loading
          </span>
          <span ref={num} className="font-mono text-[11px] tracking-[0.3em]">
            000
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--muted2)]">
            / 100%
          </span>
        </div>
        <div
          data-pl-text
          className="h-px w-52 overflow-hidden bg-[var(--line)]"
        >
          <div
            ref={bar}
            className="h-full w-full origin-left bg-[var(--accent)]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
