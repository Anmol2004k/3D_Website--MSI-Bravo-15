import React from 'react';

declare global {
  interface Window {
    __lenis?: import('lenis').default;
  }
}

const SOCIALS = [
  { label: 'GitHub', href: '#' },
  { label: 'X', href: '#' },
  { label: 'YouTube', href: '#' },
];

export function Footer() {
  const onBackToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.4 });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6 md:px-14 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          <div>
            <div className="text-white font-black tracking-tight uppercase text-xl">Bravo 15</div>
            <div className="mt-2 text-white/50 text-sm max-w-md">
              Dark, cinematic, scroll-tied product storytelling with premium motion.
            </div>
          </div>

          <div className="flex items-center gap-8 flex-wrap">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-white/55 hover:text-white transition-colors font-mono text-[10px] tracking-[0.35em] uppercase"
              >
                {s.label}
              </a>
            ))}

            <button
              type="button"
              onClick={onBackToTop}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 text-white font-mono text-[10px] tracking-[0.35em] uppercase hover:bg-white/[0.10] transition-colors"
            >
              Back to top
            </button>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between flex-wrap gap-4">
          <div className="text-white/40 font-mono text-[10px] tracking-[0.35em] uppercase">
            © 2026 MSI BRAVO SERIES
          </div>
          <div className="text-white/35 text-[11px] tracking-wide">Vite · GSAP · Lenis · R3F</div>
        </div>
      </div>
    </footer>
  );
}

