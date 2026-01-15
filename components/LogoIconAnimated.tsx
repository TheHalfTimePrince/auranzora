'use client';

import { useRef, useCallback } from 'react';
import gsap from 'gsap';

interface LogoIconAnimatedProps {
  className?: string;
}

// SVG path data for the shadow/back layer (used for masking the gradient)
const shadowPathData = `M18.6,29.1c-3.8,0-7.3.8-10.7,1.9-3.9,1.3-8,4.4-8,4.4,0,0,.2,1,3.3,1s7.3-1,9.1-1c18.5,0,33.4,15,33.4,33.4s-2.6,14.5-6.9,20.2c8-6.1,11.8-15.6,11.8-26.4s-6.3-19-11.2-24c-4.9-5-13.5-9.4-20.9-9.4Z M11,22.6C5.5,27.2.9,31.9,0,35.4c.9-.3,3.2-1.2,4.9-1.9l1.5-1.2s.3-.6.3-.7c.2-.6,1.7-4.1,4.2-9Z M34.4,0c-3,0-8,1.1-15,9.2-3.2,3.7-6.2,8.8-8.5,13.4,5-4.3,10.7-8.4,15-11.4,8.9-6.3,18.6-7.4,31.8-1.9,13.2,5.4,23.4,16.1,23.6,22.7.2,6.6-25.6,18.5-26.6,33.1-.3,5.1,2.5,9.2,6.1,12.6-2.1-3.1-3.4-6.5-3.2-10.5,1.2-17.9,37.6-22.9,29.6-39.4C80.4,13.3,55.5-.3,34.4,0Z`;

export const LogoIconAnimated = ({ className = '' }: LogoIconAnimatedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !spotlightRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Use GSAP for smooth spotlight following
    gsap.to(spotlightRef.current, {
      '--mouse-x': `${x}px`,
      '--mouse-y': `${y}px`,
      duration: 0.15,
      ease: 'power2.out',
    });
  }, []);

  const handleMouseEnter = () => {
    if (!gradientRef.current) return;
    gsap.to(gradientRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!gradientRef.current) return;
    gsap.to(gradientRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  // Create the SVG mask URL for shadow layer
  const svgMaskUrl = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 88.6 88.9'%3E%3Cpath d='${encodeURIComponent(shadowPathData)}'/%3E%3C/svg%3E")`;

  return (
    <div
      ref={containerRef}
      className={`relative cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Shadow layer as static dark - sits behind everything */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 88.6 88.9"
        className="h-full w-auto absolute inset-0 z-0"
      >
        <g>
          <path fill="#333" d="M18.6,29.1c-3.8,0-7.3.8-10.7,1.9-3.9,1.3-8,4.4-8,4.4,0,0,.2,1,3.3,1s7.3-1,9.1-1c18.5,0,33.4,15,33.4,33.4s-2.6,14.5-6.9,20.2c8-6.1,11.8-15.6,11.8-26.4s-6.3-19-11.2-24c-4.9-5-13.5-9.4-20.9-9.4Z"/>
          <path fill="#333" d="M11,22.6C5.5,27.2.9,31.9,0,35.4c.9-.3,3.2-1.2,4.9-1.9l1.5-1.2s.3-.6.3-.7c.2-.6,1.7-4.1,4.2-9Z"/>
          <path fill="#333" d="M34.4,0c-3,0-8,1.1-15,9.2-3.2,3.7-6.2,8.8-8.5,13.4,5-4.3,10.7-8.4,15-11.4,8.9-6.3,18.6-7.4,31.8-1.9,13.2,5.4,23.4,16.1,23.6,22.7.2,6.6-25.6,18.5-26.6,33.1-.3,5.1,2.5,9.2,6.1,12.6-2.1-3.1-3.4-6.5-3.2-10.5,1.2-17.9,37.6-22.9,29.6-39.4C80.4,13.3,55.5-.3,34.4,0Z"/>
        </g>
      </svg>

      {/* Gradient with spotlight reveal on shadow layer - sits above base shadow, below main icon */}
      <div
        ref={gradientRef}
        className="absolute inset-0 opacity-0 pointer-events-none z-5"
        style={{
          WebkitMaskImage: svgMaskUrl,
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskImage: svgMaskUrl,
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
        }}
      >
        {/* Inner spotlight layer with radial gradient that follows mouse */}
        <div
          ref={spotlightRef}
          className="absolute inset-0"
          style={{
            '--mouse-x': '50%',
            '--mouse-y': '50%',
            background: 'linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #5f27cd, #ff6b6b)',
            backgroundSize: '400% 400%',
            animation: 'gradientShift 4s ease infinite',
            WebkitMaskImage: 'radial-gradient(circle 80px at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)',
            maskImage: 'radial-gradient(circle 80px at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)',
          } as React.CSSProperties}
        />
      </div>

      {/* Main icon layer - sits on top */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 88.6 88.9"
        className="h-full w-auto relative z-10"
      >
        <g>
          <path fill="#333" d="M18.6,29.1c-3.8,0-7.3.8-10.7,1.9-3.9,1.3-8,4.4-8,4.4,0,0,.2,1,3.3,1s7.3-1,9.1-1c18.5,0,33.4,15,33.4,33.4s-2.6,14.5-6.9,20.2c8-6.1,11.8-15.6,11.8-26.4s-6.3-19-11.2-24c-4.9-5-13.5-9.4-20.9-9.4Z"/>
          <path fill="#333" d="M11,22.6C5.5,27.2.9,31.9,0,35.4c.9-.3,3.2-1.2,4.9-1.9l1.5-1.2s.3-.6.3-.7c.2-.6,1.7-4.1,4.2-9Z"/>
          <path fill="#333" d="M34.4,0c-3,0-8,1.1-15,9.2-3.2,3.7-6.2,8.8-8.5,13.4,5-4.3,10.7-8.4,15-11.4,8.9-6.3,18.6-7.4,31.8-1.9,13.2,5.4,23.4,16.1,23.6,22.7.2,6.6-25.6,18.5-26.6,33.1-.3,5.1,2.5,9.2,6.1,12.6-2.1-3.1-3.4-6.5-3.2-10.5,1.2-17.9,37.6-22.9,29.6-39.4C80.4,13.3,55.5-.3,34.4,0Z"/>
        </g>
      </svg>
    </div>
  );
};
