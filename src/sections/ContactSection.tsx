import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    if (!section || !form) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        form,
        { opacity: 0, y: 18, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 35%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 min-h-[110vh] px-6 md:px-14 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-end justify-between gap-8">
          <div>
            <span className="text-white/60 font-mono text-[10px] tracking-[0.35em] uppercase">
              Contact
            </span>
            <h2 className="mt-3 text-4xl md:text-6xl font-black tracking-tight uppercase">
              Talk specs. Talk build.
            </h2>
          </div>
          <div className="hidden md:block text-white/40 font-mono text-[10px] tracking-[0.35em] uppercase">
            03 / 04
          </div>
        </div>

        <form
          ref={formRef}
          className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-12"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col gap-2">
              <span className="text-white/60 font-mono text-[10px] tracking-[0.35em] uppercase">
                Name
              </span>
              <input
                className="h-12 rounded-xl bg-black/30 border border-white/10 px-4 text-white/90 outline-none transition-all duration-300 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/15"
                placeholder="Your name"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white/60 font-mono text-[10px] tracking-[0.35em] uppercase">
                Email
              </span>
              <input
                className="h-12 rounded-xl bg-black/30 border border-white/10 px-4 text-white/90 outline-none transition-all duration-300 focus:border-green-400/60 focus:ring-2 focus:ring-green-400/10"
                placeholder="you@domain.com"
              />
            </label>
          </div>

          <label className="mt-6 flex flex-col gap-2">
            <span className="text-white/60 font-mono text-[10px] tracking-[0.35em] uppercase">
              Message
            </span>
            <textarea
              className="min-h-36 rounded-xl bg-black/30 border border-white/10 p-4 text-white/90 outline-none transition-all duration-300 focus:border-white/25 focus:ring-2 focus:ring-white/10"
              placeholder="What are you building?"
            />
          </label>

          <div className="mt-8 flex items-center justify-between gap-6 flex-wrap">
            <div className="text-white/45 text-[11px] tracking-wide">
              Minimal form · glow borders · premium motion
            </div>
            <button
              type="submit"
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] px-6 py-3 text-white font-mono text-[11px] tracking-[0.35em] uppercase transition-colors hover:bg-white/[0.10]"
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-red-500/20 via-transparent to-green-400/10" />
              <span className="relative">Send</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

