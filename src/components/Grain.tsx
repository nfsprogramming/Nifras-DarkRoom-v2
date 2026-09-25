import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const W = 160;
const H = 90;
const TILES = 4;

export default function Grain() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const tiles: ImageData[] = [];
    for (let t = 0; t < TILES; t++) {
      const img = ctx.createImageData(W, H);
      const buf = new Uint32Array(img.data.buffer);
      for (let i = 0; i < buf.length; i++) {
        const v = (Math.random() * 255) | 0;
        buf[i] = (255 << 24) | (v << 16) | (v << 8) | v;
      }
      tiles.push(img);
    }

    let raf = 0;
    let last = 0;
    let idx = 0;
    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 90) return;
      last = t;
      ctx.putImageData(tiles[idx % TILES], 0, 0);
      idx += 1;
      if (reduced) cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="grain-canvas pointer-events-none fixed inset-0 z-[110] h-full w-full mix-blend-overlay"
    />
  );
}
