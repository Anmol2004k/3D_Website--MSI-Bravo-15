import React from 'react';

export function SectionOutro() {
  return (
    <section className="relative z-10 px-6 md:px-14 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10 md:p-14">
          <span className="text-white/60 font-mono text-[10px] tracking-[0.35em] uppercase">
            Finale
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight uppercase">
            Premium motion, end to end.
          </h2>
          <p className="mt-6 text-white/70 text-base leading-relaxed max-w-2xl">
            Smooth scrolling + scroll-scrubbed animation + a lightweight shader backdrop—built for
            high-end product storytelling without the heavy GPU tax.
          </p>
        </div>
      </div>
    </section>
  );
}

