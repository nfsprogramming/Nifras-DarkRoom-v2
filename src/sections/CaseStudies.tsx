import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ChapterHeader from "../components/ChapterHeader";
import SectionWipe from "../components/SectionWipe";
import StoryImage from "../components/StoryImage";
import type { LightboxItem } from "../components/Lightbox";
import { caseStudyIds, projects, type Project } from "../data/content";
import { scrollToTarget } from "../lib/scroll";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function TextBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--accent)]">
        {label}
      </p>
      <p className="mt-5 text-lg leading-relaxed md:text-xl">{children}</p>
    </div>
  );
}

function Diagram({ steps }: { steps: string[] }) {
  return (
    <div className="relative border border-[var(--line)] p-8 md:p-12">
      <span className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted2)]">
        [ DIAGRAM ]
      </span>
      <div className="mt-8 flex flex-col">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-col">
            <span className="font-display text-[clamp(1.1rem,2.4vw,1.9rem)] uppercase leading-none">
              {s}
            </span>
            {i < steps.length - 1 && (
              <span className="my-4 pl-1 font-mono text-[var(--accent)]">â†“</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface Props {
  onImage: (items: LightboxItem[], index: number, origin?: DOMRect) => void;
}

export default function CaseStudies({ onImage }: Props) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const cases = caseStudyIds
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => !!p);

  useGSAP(
    () => {
      if (reduced) return;
      gsap.utils.toArray<HTMLElement>("[data-story-block]").forEach((block) => {
        gsap.fromTo(
          block,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: block, start: "top 82%", once: true },
          }
        );
      });
    },
    { scope: root, dependencies: [reduced] }
  );

  const figItems = (p: Project): LightboxItem[] =>
    (p.figures ?? []).map((cap, i) => ({
      fig: `FIG. ${String(i + 1).padStart(2, "0")}`,
      label: `[ PROJECT / ${p.tag} ]`,
      caption: cap,
      meta: p.title,
    }));

  return (
    <section ref={root} id="stories" className="relative">
      <SectionWipe label="CHAPTER 04 â€” THE STORIES" />

      {cases.map((p, i) => {
        const next = cases[i + 1];
        const figs = figItems(p);
        return (
          <article
            key={p.id}
            id={`story-${p.id}`}
            data-story-block
            className="border-t border-[var(--line)] px-5 py-32 md:px-10 md:py-48"
          >
            <ChapterHeader
              chapter="04"
              label={`PROJECT ${p.index} â€” ${p.title}`}
              meta={`${p.status} â€” ${p.year}`}
            />

            <h2 className="font-display text-[clamp(2.6rem,9vw,8.5rem)] uppercase leading-[0.9]">
              {p.title}
            </h2>
            <p className="mt-6 max-w-2xl font-serif text-[clamp(1.15rem,2.6vw,2rem)] italic leading-snug text-[var(--muted)]">
              "{p.idea}"
            </p>

            <div className="mt-24 grid items-end gap-10 md:grid-cols-12">
              <div className="md:col-span-8">
                <StoryImage
                  fig="FIG. 01"
                  label={`[ PROJECT / ${p.tag} ]`}
                  caption={p.figures?.[0]}
                  meta={p.year}
                  onOpen={(r) => onImage(figs, 0, r)}
                />
              </div>
              <div className="md:col-span-4">
                <TextBlock label="THE PROBLEM">{p.challenge}</TextBlock>
              </div>
            </div>

            <div className="mt-28 grid gap-10 md:grid-cols-12">
              <div className="md:col-span-5 md:col-start-2">
                <TextBlock label="THE IDEA">{p.summary}</TextBlock>
              </div>
            </div>

            <div className="mt-28">
              <StoryImage
                fig="FIG. 02"
                label={`[ PROJECT / ${p.tag} ]`}
                caption={p.figures?.[1]}
                meta={p.year}
                ratio="aspect-[21/9]"
                onOpen={(r) => onImage(figs, 1, r)}
              />
            </div>

            <div className="mt-28 grid items-start gap-10 md:grid-cols-12">
              <div className="md:col-span-5">
                <TextBlock label="THE BUILD">{p.solution}</TextBlock>
                <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--muted2)]">
                  {p.stack.join(" â†’ ")}
                </p>
              </div>
              <div className="md:col-span-6 md:col-start-7">
                <Diagram steps={p.arch ?? []} />
              </div>
            </div>

            <div className="mt-28 grid items-center gap-10 md:grid-cols-12">
              <div className="md:col-span-7">
                <StoryImage
                  fig="FIG. 03"
                  label={`[ PROJECT / ${p.tag} ]`}
                  caption={p.figures?.[2]}
                  meta={p.year}
                  ratio="aspect-[16/10]"
                  onOpen={(r) => onImage(figs, 2, r)}
                />
              </div>
              <div className="md:col-span-4 md:col-start-9">
                <TextBlock label="THE RESULT">{p.result}</TextBlock>
              </div>
            </div>

            <button
              data-cursor
              onClick={() =>
                scrollToTarget(next ? `#story-${next.id}` : "#archive")
              }
              className="group mt-36 flex w-full items-center justify-between gap-6 border-t border-[var(--line)] pt-10 text-left"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
                {next ? "THE STORY CONTINUES" : "SMALLER SYSTEMS"}
              </span>
              <span className="text-right font-display text-[clamp(1.5rem,4vw,3.2rem)] uppercase leading-none transition-colors duration-300 group-hover:text-[var(--accent)]">
                {next ? next.title : "THE ARCHIVE"} â†’
              </span>
            </button>
          </article>
        );
      })}
    </section>
  );
}
