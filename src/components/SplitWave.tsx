import type { CSSProperties } from "react";
import { cn } from "../lib/utils";

interface Props {
  text: string;
  className?: string;
}

export default function SplitWave({ text, className }: Props) {
  return (
    <span className={cn("wave", className)} aria-label={text}>
      {text.split("").map((c, i) => (
        <span
          key={i}
          aria-hidden
          className="w-ch"
          style={{ "--i": i } as CSSProperties}
        >
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </span>
  );
}
