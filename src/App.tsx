import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import Cursor from "./components/Cursor";
import Grain from "./components/Grain";
import Spotlight from "./components/Spotlight";
import ScrollProgress from "./components/ScrollProgress";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import MenuOverlay from "./components/MenuOverlay";
import Marquee from "./components/Marquee";
import ProjectTransition from "./components/ProjectTransition";
import ProjectOverlay from "./components/ProjectOverlay";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Stack from "./sections/Stack";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import { setLenis, markScroll, getVelocity, scrollToTarget } from "./lib/scroll";
import { marqueeWords, type Project } from "./data/content";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useIsMobile } from "./hooks/useIsMobile";

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
  const lenisRef = useRef<Lenis | null>(null);
  const smRef = useRef(0);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
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
      if (phase === "loading" || menuOpen || active) {
        lenis.stop();
      } else {
        lenis.start();
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    },
    { dependencies: [phase, menuOpen, active] }
  );

  const openProject = (p: Project, rect: DOMRect | null) => {
    if (menuOpen) setMenuOpen(false);
    if (!rect) {
      setActive(p);
      return;
    }
    setTransition({ p, rect });
  };

  const handleMenuSelect = (href: string) => {
    setMenuOpen(false);
    window.setTimeout(() => scrollToTarget(href), 520);
  };

  return (
    <div className="relative min-h-screen">
      <Spotlight />
      <Cursor />
      <Grain />
      <div className="scanlines" aria-hidden />
      <ScrollProgress />
      {phase !== "ready" && (
        <Preloader
          onReveal={() => setPhase("reveal")}
          onGone={() => setPhase("ready")}
        />
      )}
      <Nav menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />
      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelect={handleMenuSelect}
      />

      <main className="relative z-[2]">
        <Hero active={phase !== "loading"} />
        <About />
        <Stack />
        <Projects onOpen={openProject} />
        <Marquee words={marqueeWords} className="font-display uppercase" />
        <Contact />
      </main>

      {transition && (
        <ProjectTransition
          p={transition.p}
          rect={transition.rect}
          onDone={(p) => setActive(p)}
          onGone={() => setTransition(null)}
        />
      )}
      {active && (
        <ProjectOverlay
          key={active.id}
          project={active}
          onClose={() => setActive(null)}
          onOpen={openProject}
        />
      )}
    </div>
  );
}
