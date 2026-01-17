'use client';

import { useRef, useCallback } from 'react';
import gsap from 'gsap';

interface LogoTextAnimatedProps {
  className?: string;
}

// Path data from logo-text-outline.svg (separate paths)
const outlinePaths = [
  `M22.1,43c-.3.7-.8,1.3-1.6,1.8-1.3.8-.5,1.2-4.9,1.2s-7.8-1.4-10.6-4.3l2.8-2.9c2.8,3,6.4,4.5,10.8,4.5s3,0,3.5-.3ZM29.9,32c-1.6-1.9-4.1-3-7.7-3.3l-5.7-.4c-1.7-.2-2.8-.6-3.5-1.3-.7-.6-1-1.3-1-2.1s0-.9.2-1.3c-.8.2-1.4.5-1.8.9-.9.8-1.4,1.8-1.4,3.1s.3,1.5,1,2.1c.7.7,1.8,1.1,3.5,1.3l5.7.4c3.6.3,6.1,1.4,7.7,3.3,1.5,1.9,2.2,4.3,2.2,7.2s-.6,4.1-1.7,5.7c.2-.2.5-.3.7-.5,2.6-1.8,4-4.5,4-7.9s-.7-5.3-2.2-7.2ZM25.7,15.2c-1.1-.5-2.2-.8-3.5-1-1.2-.2-.6-.3-4.2-.3s-6.6.9-9,2.7c-.7.6-1.3,1.2-1.9,1.9,2.2-1.3,4.8-1.9,7.9-1.9s3,0,4.2.3c1.3.2,2.4.5,3.5,1,2.1.9,4.1,2.3,4.4,2.5l-1.9,2.2c.6.4,1.3.8,1.9,1.2l4.3-5.1c-1.7-1.5-3.6-2.7-5.7-3.6Z`,
  `M56.6,42.4c-.2.5-.6.9-.9,1.2-1.2,1.3-2.8,2-4.8,2s-3.6-.7-4.9-2c-1.3-1.4-1.9-3.2-1.9-5.6v-21h-3.9v-2.7h6.9v21c0,2.4.6,4.2,1.9,5.6,1.3,1.3,2.9,2,4.9,2s1.9-.2,2.7-.5ZM60.6,14.3v2.7h3.9v32.6h3V14.3h-6.9Z`,
  `M91.2,42.9c-1.6,0-2.8-.3-3.7-1-1-.7-1.7-1.5-2.1-2.6-.4-1.1-.7-2.3-.8-3.6-.2-1.3-.2-2.5-.2-3.8s0-2.7.2-3.9c.1-1.3.4-2.4.8-3.5,0-.2.2-.4.3-.5-.4.1-.8.4-1.2.6-.9.7-1.6,1.5-2.1,2.6-.4,1.1-.7,2.2-.8,3.5,0,1.2-.2,2.6-.2,3.9s0,2.5.2,3.8c.1,1.3.4,2.5.8,3.6.4,1.1,1.1,1.9,2.1,2.6.9.7,2.1,1,3.7,1s2.9-.3,3.9-1c.8-.6,1.4-1.3,1.8-2.1-.8.3-1.7.4-2.7.4ZM104.4,22.8c-.3-1.8-1-3.3-1.9-4.4-2-2.9-5-4.5-9.2-4.6-1.8,0-3.3.4-4.7,1.1-1.5.8-2.9,1.9-4.1,3.1V0h-6.9v2.8h3.9v18c1.2-1.2,2.6-2.3,4.1-3.1,1.4-.7,2.9-1.1,4.7-1.1,4.2,0,7.2,1.7,9.2,4.6.9,1.1,1.6,2.6,1.9,4.4.3,1.8.5,4.8.5,9s-.2,7.2-.5,9c-.4,1.9-1,3.4-1.9,4.5,0,0,0,0,0,.1,1.2-.8,2.3-1.7,3.1-2.9.9-1.1,1.5-2.6,1.9-4.5.3-1.8.5-4.8.5-9s-.2-7.2-.5-9Z`,
  `M125.6,42.9v6.7h-3v-3.9h-2.4c-1.7,0-2.6-.8-2.6-2.4V2.8h-3.9V0h6.9v40.5c0,1.6.9,2.4,2.6,2.4h2.4Z`,
  `M131.8,0v2.8h3.9v4.3h3V0h-6.9ZM131.8,14.3v2.7h3.9v32.6h3V14.3h-6.9Z`,
  `M155.6,24.4c-.7,1.2-1,2.6-1,4.2v21h-3v-18.3c0-2.4.7-4.3,2.1-5.6.6-.6,1.2-1,1.9-1.3ZM174.8,25.7c-1.4,1.3-2,3.2-2,5.6v18.3h3v-21c0-1.7.3-3.1,1-4.2-.7.3-1.4.8-2,1.3ZM193.2,17c-2.4-2.1-5.1-3.1-8-3.1-4.6-.1-8.3,1.5-11.1,4.6-1.2-1.4-2.5-2.5-4-3.4-1.5-.8-3.5-1.3-5.9-1.3-3.8,0-6.9,1.4-9.2,4.2h0v-3.7h-7.2v2.7h4.2v3.7h0c2.3-2.8,5.4-4.2,9.2-4.2s4.4.5,5.9,1.3c1.5.9,2.8,2,4,3.4,2.8-3.1,6.5-4.7,11.1-4.6,2.9,0,5.6,1,8,3.1,2.4,2.1,3.6,5.1,3.7,9.2v20.7h3v-23.4c-.1-4.1-1.3-7.1-3.7-9.2Z`,
  `M207.8,0v2.8h3.9v4.3h3V0h-6.9ZM207.8,14.3v2.7h3.9v32.6h3V14.3h-6.9Z`,
  `M230.2,25.6c.6-.6,1.3-1.1,2-1.4-.6,1.2-.9,2.6-.9,4.3v21h-3v-18.3c0-2.4.6-4.3,1.9-5.6ZM248,16.9c-2.4-2.1-4.1-3.1-7.8-3.1s-6.6,1.4-8.9,4.2h0v-3.7h-6.8v2.7h3.8v3.7h0c2.3-2.8,5.2-4.2,8.9-4.2s5.4,1,7.8,3.1c2.3,2.1,3.5,5.1,3.7,9.2v20.7h3v-23.4c-.2-4.1-1.4-7.1-3.7-9.2Z`,
  `M282.5,16.3c-2.6-1.7-6-2.5-10.3-2.5-4.9,0-8.8,1.6-11.4,4.9,2.3-1.5,5.1-2.2,8.4-2.1,4.3,0,7.7.8,10.3,2.5,2.6,1.8,3.9,4.8,3.9,9.1v21.3h3v-24.1c0-4.3-1.3-7.3-3.9-9.1ZM270,28.7c-3.7,0-6.4,1.1-8.3,3.1-.4.4-.7.8-1,1.2,1.7-1,3.8-1.5,6.3-1.5h9.5v-2.8h-6.5ZM271.9,43.4c-2.3,0-3.9-.5-4.9-1.4-1-.9-1.5-1.9-1.5-3.1,0-.5,0-.9.1-1.3-2.2.6-3.2,1.9-3.1,4,0,1.2.5,2.2,1.5,3.1s2.6,1.4,4.9,1.4,4.9-.3,6.1-1.1c.6-.4,1-1,1.3-2-1.1.3-2.6.4-4.4.4Z`,
  `M308.3,42.9v6.7h-3v-3.9h-2.4c-1.7,0-2.6-.8-2.6-2.4V2.8h-3.9V0h6.9v40.5c0,1.6.9,2.4,2.6,2.4h2.4Z`,
];

// Combined path data for mask (all paths joined)
const outlinePathData = outlinePaths.join(' ');

export const LogoTextAnimated = ({ className = '' }: LogoTextAnimatedProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const gradientRef = useRef<HTMLSpanElement>(null);
  const spotlightRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
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

  // Create the SVG mask URL for outline layer
  const svgMaskUrl = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 308.2 52.7'%3E%3Cpath d='${encodeURIComponent(outlinePathData)}'/%3E%3C/svg%3E")`;

  return (
    <span
      ref={containerRef}
      className={`inline-block relative cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Base outline SVG layer */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 308.2 52.7"
        className="h-full w-auto relative z-0"
      >
        <g>
          {outlinePaths.map((path, index) => (
            <path key={index} fill="#333" d={path} />
          ))}
        </g>
      </svg>

      {/* Gradient with spotlight reveal on outline layer */}
      <span
        ref={gradientRef}
        className="absolute inset-0 opacity-0 pointer-events-none z-5 block"
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
        <span
          ref={spotlightRef}
          className="absolute inset-0 block"
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
      </span>
    </span>
  );
};
