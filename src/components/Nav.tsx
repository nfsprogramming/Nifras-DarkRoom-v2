import { useRef } from "react";
import { scrollToTarget } from "../lib/scroll";
import { burst } from "../lib/glitch";

export const MENU_LINKS = [
  { n: "01", label: "WORK", href: "#work" },
  { n: "02", label: "ABOUT", href: "#about" },
  { n: "03", label: "STACK", href: "#stack" },
  { n: "04", label: "CONTACT", href: "#contact" },
];

interface Props {
  menuOpen: boolean;
  onToggleMenu: () => void;
}

export default function Nav({ menuOpen, onToggleMenu }: Props) {
  const logoRef = useRef<HTMLButtonElement>(null);

  return (
    <header className="fixed inset-x-0 top-0 z-[90] mix-blend-difference">
      <nav className="flex items-center justify-between px-5 py-5 text-white md:px-10">
        <button
          ref={logoRef}
          onClick={() => scrollToTarget(0)}
          data-cursor
          onMouseEnter={() => burst(logoRef.current)}
          className="font-mono text-sm font-medium tracking-[0.3em]"
        >
          NFS<span className="align-super text-[0.6em]">®</span>
        </button>
        <ul className="hidden items-center gap-8 lg:flex">
          {MENU_LINKS.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => scrollToTarget(l.href)}
                data-cursor
                className="u-link font-mono text-[11px] tracking-[0.25em] text-white/75 transition-colors hover:text-white"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onToggleMenu}
          data-cursor
          aria-expanded={menuOpen}
          className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em]"
        >
          <span className="hidden sm:inline">{menuOpen ? "CLOSE" : "MENU"}</span>
          <span className="flex flex-col gap-1.5">
            <span
              className={`h-px w-7 bg-white transition-transform duration-300 ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-7 bg-white transition-transform duration-300 ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>
    </header>
  );
}
