'use client';

import { LogoIconCircle } from './LogoIconCircle';
import { LogoTextAnimated } from './LogoTextAnimated';
import { useState, useLayoutEffect } from 'react';

export const AboutSectionSimple = () => {
  // Start with mobile-first assumption to prevent flash on mobile devices
  const [isMobile, setIsMobile] = useState(true);
  
  useLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set immediately on mount (runs synchronously before paint)
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const fontSize = isMobile ? 'text-2xl' : 'text-7xl';
  const fontSizeSmall = isMobile ? 'text-sm' : 'text-xl';

  return (
    <section className="h-screen text-black py-8 md:py-32 px-4 md:px-8 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10 h-full flex items-center overflow-visible">
        <p 
          className={` font-normal leading-tight tracking-tight overflow-visible ${fontSize}`} 
          style={{ fontFamily: 'var(--font-xanh-mono)', overflow: 'visible' }}
        >
          <span 
            className={`inline-flex items-center gap-1 md:gap-2 align-middle overflow-visible ${isMobile ? '-mt-2' : '-mt-8'}`}
          >
            <LogoIconCircle className={`${isMobile ? "h-5 w-5" : "h-10 w-10 md:h-14 md:w-14"} inline-block overflow-visible`} />
            <LogoTextAnimated className={isMobile ? "h-5 text-black inline-block" : "h-10 md:h-14 text-black inline-block"} />
          </span>
          <span className={`${fontSizeSmall}`}>{' '}is a {' '}</span>
          <span className={`${fontSize}  inline-block`}>digital</span>
          <span className={`${fontSize}`}>{' '}agency building{' '}</span>
          <span className={`${fontSize} text-purple-600`}>search-optimized websites</span>
          <span className={`${fontSizeSmall}`}>{' '}and{' '}</span>
          <span className={`${fontSize} text-blue-600`}>brand identities</span>
          <span className={`${fontSizeSmall}`}>{' '}for{' '}</span>
          <span className={`${fontSize} font-extrabold text-shadow-lg text-white text-shadow-pink-600`}>{' '}modern{' '}</span>
          <span className={`${fontSize}`}> businesses. From technical web development to complete visual systems, if you need a functional online presence that is built for{' '}</span>
          <span className={`${fontSize} text-pink-600`}>search visibility</span>
          <span className={`${fontSize}`}>{' '}and professional recognition in 2026, we can design it.</span>
        </p>
      </div>
    </section>
  );
};
