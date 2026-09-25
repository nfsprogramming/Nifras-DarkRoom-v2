import Scramble from "./Scramble";
import { cn } from "../lib/utils";

interface Props {
  chapter: string;
  label: string;
  meta?: string;
  className?: string;
}

export default function ChapterHeader({ chapter, label, meta, className }: Props) {
  return (
    <div
      className={cn(
        "mb-20 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]",
        className
      )}
    >
      <Scramble text={`[ CHAPTER ${chapter} — ${label} ]`} trigger="view" />
      {meta && <span className="hidden md:inline">{meta}</span>}
    </div>
  );
}
