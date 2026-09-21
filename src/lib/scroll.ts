import type Lenis from "lenis";

let lenis: Lenis | null = null;
let dir = 1;
let vel = 0;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
  if (!instance) {
    vel = 0;
  }
}

export function markScroll(instance: Lenis) {
  vel = instance.velocity;
  dir = instance.direction === 1 ? 1 : -1;
}

export function getVelocity() {
  return vel;
}

export function getDirection() {
  return dir;
}

export function scrollToTarget(target: string | number) {
  if (lenis) {
    lenis.scrollTo(target as never, { duration: 1.4 });
    return;
  }
  if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: target, behavior: "smooth" });
  }
}
