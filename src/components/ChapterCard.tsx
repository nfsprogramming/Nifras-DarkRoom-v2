import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useIsMobile } from "../hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CARDS = [
  { n: "02", label: "WHY I BUILD", target: "#story" },
  { n: "04", label: "THE WORK", target: "#work" },
  { n: "05", label: "HOW I BUILD", target: "#process" },
  { n: "07", label: "THE FAILURES", target: "#failures" },
  { n: "09", label: "RIGHT NOW", target: "#building" },
  { n: "11", label: "LET'S BUILD", target: "#contact" },
];

export default function ChapterCard() {
  const [card, setCard] = useState<{ n: string; label: string } | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const busy = useRef(false);

  useEffect(() => {
    if (reduced || isMobile) return;
    const triggers = CARDS.map((c) =>
      ScrollTrigger.create({
        trigger: c.target,
        start: "top 62%",
        once: true,
        onEnter: () => {
          if (busy.current) return;
          busy.current = true;
          setCard({ n: c.n, label: c.label });
        },
      })
    );
    return () => triggers.forEach((t) => t.kill());
  }, [reduced, isMobile]);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !card) return;
      const q = gsap.utils.selector(el);
      const tl = gsap.timeline({
        onComplete: () => {
          busy.current = false;
          setCard(null);
        },
      });
      tl.fromTo(
        el,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35, ease: "power2.out" }
      );
      tl.fromTo(
        q("[data-card-inner]"),
        { autoAlpha: 0, y: 26, filter: "blur(6px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: "power3.out" },
        "-=0.15"
      );
      tl.to({}, { duration: 0.7 });
      tl.to(q("[data-card-inner]"), {
        autoAlpha: 0,
        y: -18,
        duration: 0.4,
        ease: "power2.in",
      });
      tl.to(el, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, "-=0.1");
    },
    { dependencies: [card] }
  );

  if (!card) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[55] flex items-center justify-center opacity-0"
    >
      <div className="absolute inset-0 bg-[#050505]/70" />
      <div
        data-card-inner
        className="relative flex flex-col items-center gap-6 will-change-[transform,filter,opacity]"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.55em] text-[var(--accent)]">
          CHAPTER {card.n}
        </span>
        <span className="font-display text-[clamp(2.2rem,7vw,6rem)] uppercase leading-none">
          {card.label}
        </span>
      </div>
    </div>
  );
}
