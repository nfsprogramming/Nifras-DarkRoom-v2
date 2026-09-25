import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MENU_LINKS } from "./Nav";
import SplitWave from "./SplitWave";
import { profile } from "../data/content";
import { burst } from "../lib/glitch";

gsap.registerPlugin(useGSAP);

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (href: string) => void;
}

export default function MenuOverlay({ open, onClose, onSelect }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      tl.current = gsap
        .timeline({ paused: true })
        .fromTo(
          root.current,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "power4.inOut" }
        )
        .fromTo(
          q("[data-item-inner]"),
          { yPercent: 115 },
          { yPercent: 0, duration: 0.75, ease: "power4.out", stagger: 0.07 },
          "-=0.18"
        )
        .fromTo(
          q("[data-menu-meta]"),
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.06 },
          "-=0.45"
        );
      tl.current.eventCallback("onReverseComplete", () => {
          if (root.current) root.current.style.display = "none";
        });
    },
    { scope: root }
  );

  useEffect(() => {
    const el = root.current;
    const t = tl.current;
    if (!el || !t) return;
    if (open) {
      el.style.display = "block";
      t.timeScale(1).play();
    } else {
      t.timeScale(1.5).reverse();
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      tabIndex={-1}
      className="fixed inset-0 z-[85] flex flex-col justify-center bg-[#050505] px-5 md:px-14"
      style={{ display: "none" }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-6 right-5 select-none font-display text-[18vw] uppercase leading-none text-[rgba(245,245,245,0.03)] md:right-10"
      >
        MENU
      </span>

      <ul className="menu-list relative z-10 space-y-2 md:space-y-4">
        {MENU_LINKS.map((l) => (
          <li key={l.href} className="overflow-hidden">
            <button
              onClick={() => onSelect(l.href)}
              data-cursor
              aria-label={l.label}
              onMouseEnter={(e) => burst(e.currentTarget.querySelector("[data-item-inner]"))}
              className="group flex w-full items-baseline gap-5 text-left md:gap-8"
            >
              <span data-item-inner className="flex items-baseline gap-5 will-change-transform md:gap-8">
                <span className="font-mono text-[11px] tracking-[0.3em] text-[var(--accent)]">
                  {l.n}
                </span>
                <span className="font-display text-[clamp(3rem,9vw,8rem)] uppercase leading-[0.95] text-[var(--fg)] transition-all duration-500 group-hover:translate-x-5 group-hover:text-[var(--accent)]">
                  <SplitWave text={l.label} />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="relative z-10 mt-16 flex flex-wrap items-center justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
        <span data-menu-meta className="text-[var(--accent)]">
          AVAILABLE FOR BUILDING
        </span>
        <a
          data-menu-meta
          data-cursor="link"
          href={`mailto:${profile.email}`}
          className="u-link"
        >
          {profile.email}
        </a>
        <span data-menu-meta className="text-[var(--muted2)]">
          {profile.location}
        </span>
      </div>
    </div>
  );
}
