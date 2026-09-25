import { lazy, Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import Cursor from "./components/Cursor";
import Grain from "./components/Grain";
import Spotlight from "./components/Spotlight";
import Atmosphere from "./components/Atmosphere";
import ChapterCard from "./components/ChapterCard";
import ScrollProgress from "./components/ScrollProgress";
import ScrollHUD from "./components/ScrollHUD";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Marquee from "./components/Marquee";
import type { LightboxItem } from "./components/Lightbox";
import Hero from "./sections/Hero";
import Intro from "./sections/Intro";
import Story from "./sections/Story";
import IBuild from "./sections/IBuild";
import Work from "./sections/Work";
import CaseStudies from "./sections/CaseStudies";
import Archive from "./sections/Archive";
import Process from "./sections/Process";
import Technology from "./sections/Technology";
import Failures from "./sections/Failures";
import Lab from "./sections/Lab";
import RightNow from "./sections/RightNow";
import Future from "./sections/Future";
import ImageWall from "./sections/ImageWall";
import FinalChapter from "./sections/FinalChapter";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import {
  setLenis,
  markScroll,
  getVelocity,
  scrollToTarget,
} from "./lib/scroll";
import {
  caseStudyIds,
  marqueeWords,
  type Project,
} from "./data/content";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useIsMobile } from "./hooks/useIsMobile";

const MenuOverlay = lazy(() => import("./components/MenuOverlay"));
const ProjectOverlay = lazy(() => import("./components/ProjectOverlay"));
const ProjectTransition = lazy(() => import("./components/ProjectTransition"));
const Lightbox = lazy(() => import("./components/Lightbox"));

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Phase = "loading" | "reveal" | "ready";

interface TransitionState {
  p: Project;
  rect: DOMRect;
}

export default function App() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<Project | null>(null);
  const [transition, setTransition] = useState<TransitionState | null>(null);
  const [lightbox, setLightbox] = useState<{
    items: LightboxItem[];
    index: number;
    origin?: DOMRect | null;
  } | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const smRef = useRef(0);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const original = document.title;
    const onVis = () => {
      document.title = document.hidden
        ? "COME BACK TO THE ROOM — NFS"
        : original;
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      document.title = original;
    };
  }, []);

  useEffect(() => {
    const warm = () => {
      void import("./components/MenuOverlay");
      void import("./components/ProjectOverlay");
      void import("./components/ProjectTransition");
      void import("./components/Lightbox");
    };
    const id = window.setTimeout(() => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => warm());
      } else {
        warm();
      }
    }, 3000);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(".u-link");
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (e.clientX < r.left + r.width / 2) el.setAttribute("data-dir", "r");
      else el.removeAttribute("data-dir");
    };
    document.addEventListener("mouseover", onOver);
    return () => document.removeEventListener("mouseover", onOver);
  }, []);

  useGSAP(() => {
    const lenis = new Lenis({ lerp: 0.09 });
    lenisRef.current = lenis;
    setLenis(lenis);
    (window as unknown as { lenis?: Lenis }).lenis = lenis;
    lenis.on("scroll", (l: Lenis) => {
      ScrollTrigger.update();
      markScroll(l);
    });
    const raf = (time: number) => {
      lenis.raf(time * 1000);
      const gate = !reduced && !isMobile;
      const v = gate ? getVelocity() : 0;
      smRef.current += (v - smRef.current) * 0.12;
      const c = gsap.utils.clamp(-1, 1, smRef.current / 55);
      document.documentElement.style.setProperty("--vel", c.toFixed(3));
      document.documentElement.style.setProperty(
        "--vel-abs",
        Math.abs(c).toFixed(3)
      );
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
      lenisRef.current = null;
    };
  }, []);

  useGSAP(
    () => {
      const lenis = lenisRef.current;
      if (!lenis) return;
      if (phase === "loading" || menuOpen || active || lightbox) {
        lenis.stop();
      } else {
        lenis.start();
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    },
    { dependencies: [phase, menuOpen, active, lightbox] }
  );

  const openProject = (p: Project, rect: DOMRect | null) => {
    if (menuOpen) setMenuOpen(false);
    if (caseStudyIds.includes(p.id)) {
      scrollToTarget(`#story-${p.id}`);
      return;
    }
    if (!rect) {
      setActive(p);
      return;
    }
    setTransition({ p, rect });
  };

  const openLightbox = (items: LightboxItem[], index: number, origin?: DOMRect) => {
    setLightbox({ items, index, origin });
  };

  const handleMenuSelect = (href: string) => {
    setMenuOpen(false);
    window.setTimeout(() => scrollToTarget(href), 520);
  };

  return (
    <div className="relative min-h-screen">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.2em] focus:text-[#050505]"
      >
        Skip to content
      </a>
      <Atmosphere />
      <Spotlight />
      <div className="vignette" aria-hidden />
      <Cursor />
      <Grain />
      <div className="scanlines" aria-hidden />
      <ScrollProgress />
      <ScrollHUD />
      <ChapterCard />
      {phase !== "ready" && (
        <Preloader
          onReveal={() => setPhase("reveal")}
          onGone={() => setPhase("ready")}
        />
      )}
      <Nav menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />
      {menuOpen && (
        <Suspense fallback={null}>
          <MenuOverlay
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            onSelect={handleMenuSelect}
          />
        </Suspense>
      )}

      <main id="content" className="relative z-[2]">
        <Hero active={phase !== "loading"} />
        <Intro />
        <Story />
        <IBuild />
        <Work onOpen={openProject} />
        <Marquee words={marqueeWords} className="font-display uppercase" />
        <CaseStudies onImage={openLightbox} />
        <Archive onOpen={openProject} />
        <Process />
        <Technology />
        <Failures />
        <Lab />
        <RightNow />
        <Future />
        <ImageWall onImage={openLightbox} />
        <FinalChapter />
        <Contact />
        <Footer />
      </main>

      {transition && (
        <Suspense fallback={null}>
          <ProjectTransition
            p={transition.p}
            rect={transition.rect}
            onDone={(p) => setActive(p)}
            onGone={() => setTransition(null)}
          />
        </Suspense>
      )}
      {active && (
        <Suspense fallback={null}>
          <ProjectOverlay
            key={active.id}
            project={active}
            onClose={() => setActive(null)}
            onOpen={openProject}
          />
        </Suspense>
      )}
      {lightbox && (
        <Suspense fallback={null}>
          <Lightbox
            items={lightbox.items}
            index={lightbox.index}
            origin={lightbox.origin}
            onClose={() => setLightbox(null)}
            onIndex={(i) => setLightbox((s) => (s ? { ...s, index: i } : s))}
          />
        </Suspense>
      )}
    </div>
  );
}
