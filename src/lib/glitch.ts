export function burst(el: HTMLElement | null, duration = 360) {
  if (!el) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  el.setAttribute("data-text", el.textContent ?? "");
  el.classList.remove("glitch-burst");
  void el.offsetWidth;
  el.classList.add("glitch-burst");
  window.setTimeout(() => el.classList.remove("glitch-burst"), duration);
}
