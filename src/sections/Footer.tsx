import { profile } from "../data/content";

export default function Footer() {
  const links: { label: string; href: string }[] = [
    { label: "GITHUB", href: profile.socials.github },
    { label: "LINKEDIN", href: profile.socials.linkedin },
    { label: "PORTFOLIO", href: profile.socials.portfolio },
    { label: "EMAIL", href: `mailto:${profile.email}` },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-[var(--line)] px-5 pb-8 pt-24 md:px-10 md:pt-36">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-8 top-10 select-none font-display text-[24vw] uppercase leading-none text-transparent opacity-[0.04]"
        style={{ WebkitTextStroke: "1px #f5f5f5" }}
      >
        ROOM
      </span>

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--muted2)]">
          {profile.brand} — DARK ROOM
        </p>
        <h2 className="mt-6 select-none font-display text-[clamp(6rem,22vw,20rem)] uppercase leading-[0.82]">
          NFS<span className="text-[var(--accent)]">.</span>
        </h2>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--muted)]">
          {profile.role} — DEVELOPER / BUILDER
        </p>
      </div>

      <div className="relative z-10 mt-24 flex flex-wrap items-end justify-between gap-x-14 gap-y-10">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted2)]">
            BASED IN
          </p>
          <p className="mt-3 font-display text-[clamp(1.4rem,3vw,2.4rem)] uppercase">
            COIMBATORE
            <br />
            INDIA
          </p>
        </div>

        <nav className="flex flex-col items-start gap-4" aria-label="Footer">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noreferrer" : undefined}
              data-cursor="link"
              className="u-link font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--fg)]"
            >
              {l.label} ↗
            </a>
          ))}
        </nav>

        <div className="ml-auto text-right">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted2)]">
            STATUS
          </p>
          <p className="mt-3 flex items-center justify-end gap-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            </span>
            SYSTEM ONLINE
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-6 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted2)]">
        <span>© 2026 NFS</span>
        <span>END OF TRANSMISSION</span>
      </div>
    </footer>
  );
}
