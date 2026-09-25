import { useEffect, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface Props {
  text: string;
  className?: string;
  delay?: number;
}

export default function TypeOn({ text, className, delay = 0 }: Props) {
  const [out, setOut] = useState("");
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setOut(text);
      return;
    }
    setOut("");
    let i = 0;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length && interval) window.clearInterval(interval);
      }, 34);
    }, delay);
    return () => {
      window.clearTimeout(start);
      if (interval) window.clearInterval(interval);
    };
  }, [text, delay, reduced]);

  return (
    <span className={className}>
      {out}
      {!reduced && <span className="caret" aria-hidden />}
    </span>
  );
}
