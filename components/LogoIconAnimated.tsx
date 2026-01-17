'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { logoIconAnimation } from '@/lib/config/aboutsectionanimation';

gsap.registerPlugin(MorphSVGPlugin);

interface LogoIconAnimatedProps {
  className?: string;
  trigger?: gsap.core.Timeline | null;
  startFinished?: boolean; // If true, start in the morphed/finished state
}

// Ring path (outer circle + inner circle for the hole)
// Center: (44.3, 44.45), outer radius: 44.3, inner radius: 38 (thinner ring)
const ringPath = 'M 44.3,0.15 A 44.3,44.3 0 1,1 44.3,88.75 A 44.3,44.3 0 1,1 44.3,0.15 Z M 44.3,6.45 A 38,38 0 1,0 44.3,82.45 A 38,38 0 1,0 44.3,6.45 Z';

// Combined logo paths into a single compound path
const logoCompoundPath = 'M18.6,29.1c-3.8,0-7.3.8-10.7,1.9-3.9,1.3-8,4.4-8,4.4,0,0,.2,1,3.3,1s7.3-1,9.1-1c18.5,0,33.4,15,33.4,33.4s-2.6,14.5-6.9,20.2c8-6.1,11.8-15.6,11.8-26.4s-6.3-19-11.2-24c-4.9-5-13.5-9.4-20.9-9.4Z M11,22.6C5.5,27.2.9,31.9,0,35.4c.9-.3,3.2-1.2,4.9-1.9l1.5-1.2s.3-.6.3-.7c.2-.6,1.7-4.1,4.2-9Z M34.4,0c-3,0-8,1.1-15,9.2-3.2,3.7-6.2,8.8-8.5,13.4,5-4.3,10.7-8.4,15-11.4,8.9-6.3,18.6-7.4,31.8-1.9,13.2,5.4,23.4,16.1,23.6,22.7.2,6.6-25.6,18.5-26.6,33.1-.3,5.1,2.5,9.2,6.1,12.6-2.1-3.1-3.4-6.5-3.2-10.5,1.2-17.9,37.6-22.9,29.6-39.4C80.4,13.3,55.5-.3,34.4,0Z';

export const LogoIconAnimated = ({ className = '', trigger, startFinished = false }: LogoIconAnimatedProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const morphRingRef = useRef<SVGPathElement>(null);
  const logoCompoundRef = useRef<SVGPathElement>(null);
  const animationAddedRef = useRef(false);

  useEffect(() => {
    if (!svgRef.current || !morphRingRef.current || !logoCompoundRef.current) return;

    // If startFinished is true, set to finished state immediately
    if (startFinished) {
      gsap.set(morphRingRef.current, { morphSVG: logoCompoundRef.current });
      return;
    }

    // Ensure we start from the ring state
    gsap.set(morphRingRef.current, { morphSVG: ringPath });

    // If trigger timeline is provided, add animation to it
    // For scroll-based animations, start immediately at time 0 (no delay)
    if (trigger && !animationAddedRef.current) {
      // Clear any existing animations first
      gsap.killTweensOf(morphRingRef.current);
      // Add animation to the trigger timeline at time 0
      trigger.to(morphRingRef.current, { 
        morphSVG: logoCompoundRef.current, 
        duration: logoIconAnimation.morph.duration,
        ease: 'power2.out', // Start fast, ease out smoothly
      }, 0); // Start at time 0 for scroll-based scrubbing
      animationAddedRef.current = true;
    } else if (!trigger) {
      // Reset flag when trigger is removed
      animationAddedRef.current = false;
    }
  }, [trigger, startFinished]);

  return (
    <span className={`inline-block ${className}`}>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 88.6 88.9"
        className="max-w-[1200px]"
      >
        <defs>
          <style>{'.cls-1 { fill: #333; stroke-width: 0px; }'}</style>
        </defs>
        
        {/* Ring that will morph into logo */}
        <path
          ref={morphRingRef}
          className="cls-1"
          d={ringPath}
        />
        
        {/* Compound logo path - morph target (hidden, used only as target) */}
        <path
          ref={logoCompoundRef}
          className="cls-1"
          d={logoCompoundPath}
          style={{ display: 'none' }}
        />
      </svg>
    </span>
  );
};
