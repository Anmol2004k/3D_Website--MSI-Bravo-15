import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

type SmoothScrollProps = {
  children: React.ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: true,
      // Tuned for "premium" inertia.
      lerp: 0.08,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.0,
    });

    window.__lenis = lenis;

    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onLenisScroll);

    let rafId: number | null = null;
    const raf = (time: number) => {
      // Lenis expects rAF time in milliseconds.
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Ensure all triggers are measured after Lenis takes over.
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      lenis.off('scroll', onLenisScroll);
      if (rafId != null) cancelAnimationFrame(rafId);
      rafId = null;
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
      ScrollTrigger.refresh();
    };
  }, []);

  return <>{children}</>;
}

