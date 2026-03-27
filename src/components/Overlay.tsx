import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface OverlayProps {
  progress: number;
}

const Hotspot = ({ 
  label, 
  description, 
  active, 
  className 
}: { 
  label: string; 
  description: string; 
  active: boolean; 
  className?: string;
}) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0 }}
    className={cn("absolute flex items-center gap-4 pointer-events-auto", className)}
  >
    <div className="relative flex h-4 w-4">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
    </div>
    <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-lg">
      <h4 className="text-white font-mono text-xs uppercase tracking-widest mb-1">{label}</h4>
      <p className="text-white/60 text-[10px] uppercase tracking-wider">{description}</p>
    </div>
  </motion.div>
);

export const Overlay: React.FC<OverlayProps> = ({ progress }) => {
  const headlines = [
    { text: "Engineering, Unbound.", start: 0.1, end: 0.3 },
    { text: "The Architecture of Dominance.", start: 0.4, end: 0.6 },
    { text: "Cooling Under Pressure.", start: 0.7, end: 0.9 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-between p-12">
      {/* Top Navigation HUD */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <span className="text-white font-mono text-[10px] tracking-[0.2em] uppercase opacity-50">Model</span>
          <span className="text-white font-bold text-xl tracking-tighter uppercase">Bravo 15</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-white font-mono text-[10px] tracking-[0.2em] uppercase opacity-50">Status</span>
          <span className="text-green-400 font-mono text-[10px] tracking-widest uppercase animate-pulse">System Active</span>
        </div>
      </div>

      {/* Scrollytelling Headlines */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {headlines.map((h, i) => (
            progress >= h.start && progress <= h.end && (
              <motion.h2
                key={i}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                className="text-white text-6xl md:text-8xl font-black tracking-tighter uppercase text-center max-w-4xl"
              >
                {h.text}
              </motion.h2>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Hotspots */}
      <div className="absolute inset-0">
        <Hotspot 
          label="Ryzen™ 7000" 
          description="Next-Gen Performance" 
          active={progress > 0.4 && progress < 0.7}
          className="top-[45%] left-[45%]"
        />
        <Hotspot 
          label="144Hz IPS" 
          description="Fluid Motion" 
          active={progress > 0.1 && progress < 0.4}
          className="top-[25%] left-[55%]"
        />
        <Hotspot 
          label="Cooler Boost 5" 
          description="Thermal Mastery" 
          active={progress > 0.7}
          className="bottom-[35%] left-[40%]"
        />
      </div>

      {/* Bottom Progress HUD */}
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-4">
          <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-red-600 origin-left"
              style={{ scaleX: progress }}
            />
          </div>
          <span className="text-white font-mono text-[10px] tracking-[0.2em] uppercase opacity-50">
            Scroll to Deconstruct
          </span>
        </div>
        <div className="text-white font-mono text-[10px] tracking-[0.2em] uppercase opacity-50">
          © 2026 MSI BRAVO SERIES
        </div>
      </div>
    </div>
  );
};
