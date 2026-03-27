import React from 'react';
import { LaptopScene } from '../components/LaptopScene';

type HeroSectionProps = {
  onProgress?: (progress: number) => void;
};

export function HeroSection({ onProgress }: HeroSectionProps) {
  return (
    <section className="relative">
      <LaptopScene onProgress={onProgress} />

      {/* Minimal, premium hero copy (section-based, not a global HUD). */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <div className="h-full w-full flex flex-col justify-between p-10 md:p-14">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-white/60 font-mono text-[10px] tracking-[0.35em] uppercase">
                MSI Bravo Series
              </span>
              <span className="text-white font-black tracking-tight text-xl md:text-2xl uppercase">
                Engineering, Unbound
              </span>
            </div>
            <div className="text-white/50 font-mono text-[10px] tracking-[0.35em] uppercase">
              Scroll
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div className="max-w-xl">
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                A cinematic build sequence with a dark, atmospheric backdrop—crafted for a premium
                scrollytelling experience.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3 text-white/40 font-mono text-[10px] tracking-[0.35em] uppercase">
              <span className="h-[1px] w-10 bg-white/20" />
              <span>Assemble</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

