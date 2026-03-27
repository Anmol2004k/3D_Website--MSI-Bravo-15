import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SPECS = [
  { k: 'CPU', v: 'AMD Ryzen™ 7000 Series' },
  { k: 'GPU', v: 'GeForce RTX™ Class Graphics' },
  { k: 'Display', v: '144Hz IPS-level Panel' },
  { k: 'Memory', v: 'DDR5 High-Bandwidth RAM' },
  { k: 'Storage', v: 'NVMe SSD' },
  { k: 'Cooling', v: 'Cooler Boost 5 Thermal Design' },
];

export function SpecsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-spec-card]'));

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 26, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 20%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 min-h-[140vh] px-6 md:px-14 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-8">
          <div>
            <span className="text-white/60 font-mono text-[10px] tracking-[0.35em] uppercase">
              Tech Specs
            </span>
            <h2 className="mt-3 text-4xl md:text-6xl font-black tracking-tight uppercase">
              Built to flex under load.
            </h2>
          </div>
          <div className="hidden md:block text-white/40 font-mono text-[10px] tracking-[0.35em] uppercase">
            02 / 04
          </div>
        </div>

        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SPECS.map((s) => (
            <div
              key={s.k}
              data-spec-card
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-lg"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-red-500/15 via-transparent to-green-400/10" />
              <div className="relative p-7">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-white font-mono text-[11px] tracking-[0.35em] uppercase">
                    {s.k}
                  </div>
                  <div className="h-[1px] w-10 bg-white/15" />
                </div>
                <div className="mt-4 text-white/80 text-base leading-snug">{s.v}</div>
                <div className="mt-6 text-white/40 text-[11px] tracking-wide">
                  Scroll-tied reveal · premium motion
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

