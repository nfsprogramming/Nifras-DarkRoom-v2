import { cn } from "../lib/utils";
import type { Project } from "../data/content";

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

export function visualGradient(p: Project) {
  return `radial-gradient(120% 140% at 15% 10%, ${p.accent}26 0%, transparent 55%), radial-gradient(110% 130% at 88% 92%, ${p.accent}40 0%, transparent 60%), linear-gradient(165deg, #0d0d0d 0%, #050505 100%)`;
}

interface Props {
  p: Project;
  className?: string;
}

export default function ProjectVisual({ p, className }: Props) {
  return (
    <div
      data-visual
      className={cn(
        "group relative overflow-hidden border border-[var(--line)] bg-[#080808] [--s:1] group-hover:[--s:1.06]",
        className
      )}
    >
      <div
        className="pv-idle absolute inset-[-8%] will-change-transform"
        style={{ background: visualGradient(p) }}
      />
      <div
        className="absolute inset-[-6%] opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-40"
        style={{
          background: `radial-gradient(110% 130% at 85% 90%, ${p.accent} 0%, transparent 60%)`,
          transform:
            "translate(calc(var(--px, 0) * 16px + 6px), calc(var(--py, 0) * 12px)) scale(var(--s, 1))",
        }}
      />
      <div
        className="absolute inset-[-6%] opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-30"
        style={{
          background:
            "radial-gradient(110% 130% at 85% 90%, #ff2e2e 0%, transparent 60%)",
          transform:
            "translate(calc(var(--px, 0) * 16px - 6px), calc(var(--py, 0) * 12px)) scale(var(--s, 1))",
        }}
      />
      <div
        className="absolute inset-[-6%] transition-transform duration-300 ease-out"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,245,245,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,245,245,0.5) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          transform:
            "translate(calc(var(--px, 0) * 16px), calc(var(--py, 0) * 12px)) scale(var(--s, 1))",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-3 right-4 select-none font-display text-[clamp(3rem,8vw,7.5rem)] uppercase leading-none text-transparent"
        style={{ WebkitTextStroke: "1px rgba(245,245,245,0.22)" }}
      >
        {p.tag}
      </span>
      <div
        className="absolute inset-0 opacity-[0.05] transition-opacity duration-500 group-hover:opacity-[0.14]"
        style={{ backgroundImage: NOISE }}
      />
      <span className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
        SYS.{p.index}
      </span>
      <span
        className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.3em]"
        style={{ color: p.accent }}
      >
        {p.status}
      </span>
    </div>
  );
}
