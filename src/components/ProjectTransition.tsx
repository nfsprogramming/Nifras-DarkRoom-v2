import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { visualGradient } from "./ProjectVisual";
import type { Project } from "../data/content";

gsap.registerPlugin(useGSAP);

interface Props {
  p: Project;
  rect: DOMRect;
  onDone: (p: Project) => void;
  onGone: () => void;
}

export default function ProjectTransition({ p, rect, onDone, onGone }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    gsap.set(el, {
      x: rect.left,
      y: rect.top,
      width: w,
      height: h,
      scaleX: rect.width / w,
      scaleY: rect.height / h,
      transformOrigin: "0 0",
      background: visualGradient(p),
    });
    gsap.to(el, {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      duration: 0.65,
      ease: "power4.inOut",
      onComplete: () => {
        onDone(p);
        gsap.to(el, {
          autoAlpha: 0,
          duration: 0.35,
          delay: 0.15,
          ease: "power2.out",
          onComplete: onGone,
        });
      },
    });
  }, []);

  return <div ref={ref} className="fixed left-0 top-0 z-[97] bg-[#0a0a0a]" aria-hidden />;
}
