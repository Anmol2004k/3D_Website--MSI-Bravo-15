import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type LaptopSceneProps = {
  onProgress?: (progress: number) => void;
};

function padFrame(n: number) {
  return String(n).padStart(3, '0');
}

export const LaptopScene: React.FC<LaptopSceneProps> = ({ onProgress }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const frameCount = 240;
  const frameUrls = useMemo(
    () =>
      Array.from({ length: frameCount }, (_, i) => `/Frames/ezgif-frame-${padFrame(i + 1)}.jpg`),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const preload = async () => {
      const cache: HTMLImageElement[] = new Array(frameUrls.length);
      let loaded = 0;

      await Promise.all(
        frameUrls.map(
          (src, idx) =>
            new Promise<void>((resolve) => {
              const img = new Image();
              img.decoding = 'async';
              img.onload = () => {
                loaded += 1;
                cache[idx] = img;
                if (!cancelled) setLoadProgress(Math.round((loaded / frameUrls.length) * 100));
                resolve();
              };
              img.onerror = () => {
                loaded += 1;
                if (!cancelled) setLoadProgress(Math.round((loaded / frameUrls.length) * 100));
                resolve();
              };
              img.src = src;
            })
        )
      );

      if (cancelled) return;
      imagesRef.current = cache.filter(Boolean);
      setIsLoaded(true);
    };

    preload();
    return () => {
      cancelled = true;
    };
  }, [frameUrls]);

  useEffect(() => {
    if (!isLoaded) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawFrame = (frameIndex: number) => {
      const img = imagesRef.current[frameIndex];
      if (!img) return;

      const cw = window.innerWidth;
      const ch = window.innerHeight;

      ctx.clearRect(0, 0, cw, ch);

      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;
      if (!iw || !ih) return;

      const scale = Math.min(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const state = { frame: 0 };

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const nextFrame = Math.min(
          frameCount - 1,
          Math.max(0, Math.floor(self.progress * (frameCount - 1)))
        );
        state.frame = nextFrame;
        onProgress?.(self.progress);

        if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(state.frame));
      },
    });

    drawFrame(0);

    return () => {
      trigger.kill();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [frameCount, isLoaded, onProgress]);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#050505]">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-screen h-screen z-0 pointer-events-none select-none"
      />

      {!isLoaded && (
        <div className="fixed inset-0 z-20 flex items-center justify-center text-white font-mono text-xs tracking-[0.4em] uppercase">
          Loading {loadProgress}%
        </div>
      )}
    </div>
  );
};
