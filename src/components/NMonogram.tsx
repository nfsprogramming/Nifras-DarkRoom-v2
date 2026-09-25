import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LAYERS = 5;
const DEPTH = 55;

interface Props {
  active: boolean;
  triggerRef: RefObject<HTMLElement | null>;
}

export default function NMonogram({ active, triggerRef }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const box = inner.current;
    const shell = root.current;
    if (!box || !shell) return;
    const rx = gsap.quickTo(box, "rotationX", { duration: 1.1, ease: "power3.out" });
    const ry = gsap.quickTo(box, "rotationY", { duration: 1.1, ease: "power3.out" });
    const mx = gsap.quickTo(box, "x", { duration: 1.2, ease: "power3.out" });
    const my = gsap.quickTo(box, "y", { duration: 1.2, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const r = shell.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      ry(nx * 16);
      rx(-ny * 12);
      mx(nx * 22);
      my(ny * 14);
      shell.style.setProperty("--lx", `${(nx + 0.5) * 100}%`);
      shell.style.setProperty("--ly", `${(ny + 0.5) * 100}%`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  useGSAP(
    () => {
      if (!active) return;
      const layers = root.current?.querySelectorAll<HTMLElement>("[data-n-layer]") ?? [];
      if (reduced) {
        layers.forEach((l, i) =>
          gsap.set(l, { z: -i * DEPTH, autoAlpha: 1 - i * 0.16, filter: "blur(0px)" })
        );
        return;
      }
      layers.forEach((l) => gsap.set(l, { z: -600, autoAlpha: 0, filter: "blur(18px)" }));
      gsap.to(layers, {
        z: (i: number) => -i * DEPTH,
        autoAlpha: (i: number) => 1 - i * 0.16,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "power3.out",
        stagger: 0.09,
        delay: 0.25,
      });
    },
    { dependencies: [active, reduced] }
  );

  useGSAP(
    () => {
      if (reduced || !active) return;
      gsap.to(root.current, {
        rotateY: -24,
        rotateX: 9,
        scale: 0.55,
        autoAlpha: 0.04,
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom 28%",
          scrub: 1,
        },
      });
    },
    { dependencies: [active, reduced] }
  );

  return (
    <div
      ref={root}
      className="relative h-[34vh] w-[26vh] md:h-[52vh] md:w-[40vh]"
      style={{ perspective: "900px" }}
    >
      <div
        ref={inner}
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        {Array.from({ length: LAYERS }).map((_, i) => (
          <div
            key={i}
            data-n-layer
            className="absolute inset-0 flex items-center justify-center font-display text-[30vh] leading-none md:text-[46vh]"
            style={
              i === 0
                ? { color: "var(--fg)" }
                : {
                    color: "transparent",
                    WebkitTextStroke: `1px rgba(245,245,245,${0.5 - i * 0.08})`,
                  }
            }
          >
            N
          </div>
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-40"
        style={{
          background:
            "radial-gradient(52% 52% at var(--lx, 50%) var(--ly, 40%), rgba(245,245,245,0.5), transparent 70%)",
        }}
      />
    </div>
  );
}
