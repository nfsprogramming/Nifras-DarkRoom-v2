import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "../lib/utils";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(useGSAP);

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

export interface LightboxItem {
  fig?: string;
  label?: string;
  caption?: string;
  meta?: string;
  src?: string;
}

interface Props {
  items: LightboxItem[];
  index: number;
  origin?: DOMRect | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}

export default function Lightbox({ items, index, origin, onClose, onIndex }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const item = items[index];
  const touchX = useRef(0);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const frameEl = frameRef.current;
      const rootEl = root.current;
      if (!frameEl || !rootEl) return;
      gsap.fromTo(rootEl, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "power2.out" });
      if (origin && !reduced) {
        const r = frameEl.getBoundingClientRect();
        gsap.fromTo(
          frameEl,
          {
            x: origin.left - r.left,
            y: origin.top - r.top,
            scaleX: origin.width / r.width,
            scaleY: origin.height / r.height,
          },
          { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.55, ease: "power3.inOut" }
        );
      }
    },
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % items.length);
      if (e.key === "ArrowLeft")
        onIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const requestClose = () => {
    const frameEl = frameRef.current;
    const rootEl = root.current;
    if (!rootEl) {
      onClose();
      return;
    }
    if (origin && frameEl && !reduced) {
      const r = frameEl.getBoundingClientRect();
      gsap.to(frameEl, {
        x: origin.left - r.left,
        y: origin.top - r.top,
        scaleX: origin.width / r.width,
        scaleY: origin.height / r.height,
        duration: 0.45,
        ease: "power3.inOut",
      });
      gsap.to(rootEl, {
        autoAlpha: 0,
        duration: 0.4,
        delay: 0.08,
        ease: "power2.in",
        onComplete: onClose,
      });
    } else {
      gsap.to(rootEl, { autoAlpha: 0, duration: 0.3, ease: "power2.in", onComplete: onClose });
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    touchX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = e.clientX - touchX.current;
    if (d < -50) onIndex((index + 1) % items.length);
    if (d > 50) onIndex((index - 1 + items.length) % items.length);
  };

  if (!item) return null;

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={item.caption ?? "Image viewer"}
      className="fixed inset-0 z-[96] flex flex-col bg-[#000000f4] opacity-0"
    >
      <div className="flex items-center justify-between px-5 py-5 md:px-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
          {item.fig ?? "FIGURE"}
        </span>
        <button
          onClick={requestClose}
          data-cursor
          className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
        >
          CLOSE <span aria-hidden>✕</span>
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-5"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <button
          onClick={() => onIndex((index - 1 + items.length) % items.length)}
          data-cursor
          aria-label="Previous image"
          className="absolute left-3 z-10 font-display text-3xl text-[var(--muted)] transition-colors hover:text-[var(--accent)] md:left-8"
        >
          ‹
        </button>
        <div
          ref={frameRef}
          className="relative aspect-[16/10] max-h-full w-full max-w-[1000px] border border-[var(--line)] bg-[#080808] will-change-transform"
        >
          {item.src ? (
            <img
              src={item.src}
              alt={item.caption ?? ""}
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <>
              <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: NOISE }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="px-6 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--muted2)]">
                  {item.label ?? item.caption ?? "[ IMAGE ]"}
                </span>
              </div>
            </>
          )}
        </div>
        <button
          onClick={() => onIndex((index + 1) % items.length)}
          data-cursor
          aria-label="Next image"
          className="absolute right-3 z-10 font-display text-3xl text-[var(--muted)] transition-colors hover:text-[var(--accent)] md:right-8"
        >
          ›
        </button>
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 px-5 py-6 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted2)] md:px-10">
        <span className={cn("text-[var(--muted)]")}>
          {item.caption ?? item.label}
        </span>
        <span>
          {item.meta} — {String(index + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
