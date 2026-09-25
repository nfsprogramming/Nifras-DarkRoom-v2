import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ChapterHeader from "../components/ChapterHeader";
import SectionWipe from "../components/SectionWipe";
import StoryImage from "../components/StoryImage";
import type { LightboxItem } from "../components/Lightbox";
import { wallItems } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const RATIOS = [
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-[16/10]",
  "aspect-square",
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-[16/10]",
  "aspect-square",
];

interface Props {
  onImage: (items: LightboxItem[], index: number, origin?: DOMRect) => void;
}

export default function ImageWall({ onImage }: Props) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const items: LightboxItem[] = wallItems.map((w) => ({
    fig: w.fig,
    label: w.label,
    caption: w.caption,
    meta: w.meta,
  }));

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        "[data-wall-item]",
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
        }
      );
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section
      ref={root}
      id="wall"
      className="relative overflow-hidden px-5 py-36 md:px-10 md:py-56"
    >
      <SectionWipe label="THE VISUAL MEMORY" />
      <ChapterHeader chapter="11" label="THE IMAGE WALL" meta="EVERYTHING SO FAR â€” AT A GLANCE" />

      <h2 className="mb-20 max-w-4xl font-display text-[clamp(2.2rem,6vw,5.5rem)] uppercase leading-[0.95]">
        THE VISUAL MEMORY
        <br />
        <span className="text-[var(--accent)]">OF THE ROOM.</span>
      </h2>

      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
        {wallItems.map((w, i) => (
          <div key={w.label} data-wall-item className="break-inside-avoid">
            <StoryImage
              fig={w.fig}
              label={w.label}
              caption={w.caption}
              meta={w.meta}
              ratio={RATIOS[i % RATIOS.length]}
              onOpen={(r) => onImage(items, i, r)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
