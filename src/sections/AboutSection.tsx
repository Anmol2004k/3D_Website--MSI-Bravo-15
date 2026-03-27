import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const title = titleRef.current;
    const body = bodyRef.current;
    if (!section || !card || !title || !body) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 24, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 35%',
            scrub: true,
          },
        }
      );

      // Text parallax: move slower than the page scroll.
      gsap.to([title, body], {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 min-h-[120vh] px-6 md:px-14 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-green-400/10" />
          <div className="relative p-10 md:p-14">
            <div className="flex items-start justify-between gap-6">
              <div>
                <span className="text-white/60 font-mono text-[10px] tracking-[0.35em] uppercase">
                  About
                </span>
                <h2
                  ref={titleRef}
                  className="mt-3 text-4xl md:text-6xl font-black tracking-tight uppercase"
                >
                  Liquid performance,
                  <br />
                  engineered silence.
                </h2>
              </div>
              <div className="hidden md:block text-white/40 font-mono text-[10px] tracking-[0.35em] uppercase">
                01 / 04
              </div>
            </div>

            <p
              ref={bodyRef}
              className="mt-8 max-w-2xl text-white/70 text-base md:text-lg leading-relaxed"
            >
              This experience is built like a premium product page: dark, atmospheric, and deeply
              scroll-tied. Motion is subtle, deliberate, and responsive—no gimmicks, just cinematic
              clarity.
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { k: 'Design', v: 'Moody, minimal, high contrast' },
                { k: 'Motion', v: 'Scroll-scrubbed, no abrupt cuts' },
                { k: 'Feel', v: 'Heavy, smooth, premium inertia' },
              ].map((item) => (
                <div
                  key={item.k}
                  className="rounded-2xl border border-white/10 bg-black/20 px-6 py-5"
                >
                  <div className="text-white font-mono text-[11px] tracking-[0.25em] uppercase">
                    {item.k}
                  </div>
                  <div className="mt-2 text-white/70 text-sm">{item.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

