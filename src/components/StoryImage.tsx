import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "../lib/utils";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

interface Props {
  fig?: string;
  label?: string;
  caption?: string;
  meta?: string;
  src?: string;
  className?: string;
  ratio?: string;
  speed?: number;
  onOpen?: (rect: DOMRect) => void;
  interactive?: boolean;
}

export default function StoryImage({
  fig,
  label,
  caption,
  meta,
  src,
  className,
  ratio = "aspect-[16/10]",
  speed = 1,
  onOpen,
  interactive = true,
}: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const parallax = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = frame.current;
      if (!el) return;
      if (reduced) return;

      gsap.fromTo(
        el,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        }
      );
      gsap.fromTo(
        inner.current,
        { yPercent: 10, scale: 1.05 },
        {
          yPercent: 0,
          scale: 1,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        }
      );
      if (capRef.current) {
        gsap.fromTo(
          capRef.current,
          { autoAlpha: 0, y: 8 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            delay: 0.45,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          }
        );
      }
      gsap.fromTo(
        parallax.current,
        { yPercent: 4 * speed },
        {
          yPercent: -4 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    },
    { dependencies: [reduced, speed] }
  );

  return (
    <figure className={cn("group w-full", className)}>
      <div
        ref={frame}
        onClick={() => onOpen?.(frame.current!.getBoundingClientRect())}
        data-cursor={interactive ? "explore" : undefined}
        className={cn(
          "relative w-full overflow-hidden border border-[var(--line)] bg-[#080808] transition-[border-color] duration-500",
          ratio,
          interactive && "hover:border-[rgba(245,245,245,0.3)]"
        )}
      >
        <div ref={parallax} className="absolute inset-[-8%] will-change-transform">
          <div ref={inner} className="absolute inset-0 will-change-transform">
            {src ? (
              <img
                src={src}
                alt={caption ?? ""}
                loading="lazy"
                decoding="async"
                onLoad={() => setLoaded(true)}
                className={cn(
                  "h-full w-full object-cover transition-opacity duration-700",
                  loaded ? "opacity-100" : "opacity-0"
                )}
              />
            ) : (
              <>
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{ backgroundImage: NOISE }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="px-4 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--muted2)]">
                    {label ?? "[ IMAGE ]"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        {fig && (
          <span className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
            {fig}
          </span>
        )}
        {meta && (
          <span className="absolute right-3 top-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
            {meta}
          </span>
        )}
      </div>
      {(caption || label) && (
        <figcaption
          ref={capRef}
          className="mt-3 flex flex-wrap items-baseline justify-between gap-x-8 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted2)] transition-transform duration-500 group-hover:-translate-y-0.5"
        >
          <span>{label}</span>
          <span>{caption}</span>
        </figcaption>
      )}
    </figure>
  );
}
