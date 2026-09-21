import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function Spotlight() {
  const reduced = useReducedMotion();
  const active = useRef(false);

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    active.current = true;
    const cur = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
    const target = { ...cur };
    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      cur.x += (target.x - cur.x) * 0.07;
      cur.y += (target.y - cur.y) * 0.07;
      document.documentElement.style.setProperty("--mx", `${cur.x}px`);
      document.documentElement.style.setProperty("--my", `${cur.y}px`);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reduced]);

  if (reduced) return null;
  return <div className="spotlight" aria-hidden />;
}
