// Je definis les presets d'animation GSAP reutilisables

"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Je m'assure que ScrollTrigger est enregistre cote client uniquement
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Je cree un preset pour le fade-in depuis le bas avec scroll trigger
export function fadeInUp(
  elements: string | Element | Element[],
  options?: gsap.TweenVars
) {
  return gsap.from(elements, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    ...options,
  });
}

// Je cree un preset pour le stagger reveal (elements en cascade)
export function staggerReveal(
  elements: string | Element | Element[],
  options?: gsap.TweenVars
) {
  return gsap.from(elements, {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power3.out",
    ...options,
  });
}

// Je cree un scroll trigger reutilisable
export function withScrollTrigger(
  trigger: string | Element,
  animation: gsap.core.Tween,
  start = "top 85%"
) {
  ScrollTrigger.create({
    trigger,
    animation,
    start,
    toggleActions: "play none none none",
  });
  return animation;
}
