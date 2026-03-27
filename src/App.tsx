import React, { useState } from 'react';
import { BackgroundShader } from './components/BackgroundShader';
import { Footer } from './components/Footer';
import { SmoothScroll } from './components/SmoothScroll';
import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';
import { HeroSection } from './sections/HeroSection';
import { SpecsSection } from './sections/SpecsSection';
import { SectionOutro } from './sections/SectionOutro';

export default function App() {
  const [progress, setProgress] = useState(0);

  return (
    <SmoothScroll>
      <main className="relative bg-[#050505] w-full overflow-x-hidden">
        <BackgroundShader />

        <HeroSection onProgress={setProgress} />
        <AboutSection />
        <SpecsSection />
        <ContactSection />
        <SectionOutro />
        <Footer />

        {/* Optional: keep this for debugging/authoring. */}
        <div className="fixed right-6 bottom-6 z-20 text-white/30 font-mono text-[10px] tracking-[0.25em] uppercase pointer-events-none">
          Progress {(progress * 100).toFixed(0)}%
        </div>
      </main>
    </SmoothScroll>
  );
}
