import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STOPS = [
  { id: "top", x: 0, y: 0, o: 0.05, bg: "#050505" },
  { id: "work", x: 380, y: 60, o: 0.04, bg: "#070707" },
  { id: "process", x: -260, y: -40, o: 0.035, bg: "#080808" },
  { id: "lab", x: 200, y: 120, o: 0.02, bg: "#060606" },
  { id: "building", x: -200, y: 40, o: 0.04, bg: "#070707" },
  { id: "contact", x: 0, y: 0, o: 0.05, bg: "#050505" },
];

export default function Atmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;
      const triggers = STOPS.map((s) =>
        ScrollTrigger.create({
          trigger: `#${s.id}`,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (!self.isActive) return;
            gsap.to(el, {
              x: s.x,
              y: s.y,
              opacity: s.o,
              duration: 1.4,
              ease: "power2.inOut",
              overwrite: "auto",
            });
            gsap.to("body", {
              backgroundColor: s.bg,
              duration: 1.4,
              ease: "power2.inOut",
              overwrite: "auto",
            });
          },
        })
      );
      return () => triggers.forEach((t) => t.kill());
    },
    { dependencies: [reduced] }
  );

  return <div ref={ref} className="ambient" aria-hidden style={{ opacity: 0.05 }} />;
}
