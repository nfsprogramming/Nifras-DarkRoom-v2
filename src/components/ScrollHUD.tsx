import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { chapters } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollHUD() {
  const [active, setActive] = useState(0);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const triggers = chapters.map((c, i) =>
      ScrollTrigger.create({
        trigger: `#${c.id}`,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => {
          if (self.isActive) setActive(i);
        },
        onUpdate: (self) => {
          const line = lineRefs.current[i];
          if (line) line.style.transform = `scaleX(${self.progress})`;
        },
      })
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed right-6 top-1/2 z-[60] hidden -translate-y-1/2 flex-col items-end gap-2.5 xl:flex"
      >
        {chapters.map((c, i) => (
          <div key={c.id} className="flex flex-col items-end gap-1">
            <div
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                i === active ? "opacity-100" : "opacity-40"
              }`}
            >
              <span
                className={`font-mono text-[9px] uppercase tracking-[0.3em] transition-colors duration-300 ${
                  i === active ? "text-[var(--accent)]" : "text-transparent"
                }`}
              >
                {c.label}
              </span>
              <span
                className={`font-mono text-[10px] tracking-[0.2em] transition-colors duration-300 ${
                  i === active ? "text-[var(--fg)]" : "text-[var(--muted2)]"
                }`}
              >
                {c.n}
              </span>
            </div>
            <span
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className={`h-px w-14 origin-right bg-[var(--accent)] transition-opacity duration-300 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        ))}
      </div>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-4 bottom-3 z-[60] flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted2)] xl:hidden"
      >
        <span>
          CH. {chapters[active].n} / 11 —{" "}
          <span className="text-[var(--accent)]">{chapters[active].label}</span>
        </span>
        <span>NFS</span>
      </div>
    </>
  );
}
