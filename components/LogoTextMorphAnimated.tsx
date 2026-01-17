'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { logoIconAnimation } from '@/lib/config/aboutsectionanimation';

gsap.registerPlugin(MorphSVGPlugin);

interface LogoTextMorphAnimatedProps {
  className?: string;
}

// Simple circle path for each morph (using same pattern as original ringPath)
// Format: M centerX,top A radius,radius 0 1,1 centerX,bottom A radius,radius 0 1,1 centerX,top Z
const createCircle = (cx: number, cy: number, r: number) => {
  const top = cy - r;
  const bottom = cy + r;
  return `M ${cx},${top} A ${r},${r} 0 1,1 ${cx},${bottom} A ${r},${r} 0 1,1 ${cx},${top} Z`;
};

// Create ring path (outer circle + inner circle for the hole) - same format as original
// cx, cy: center position, outerR: outer radius, innerR: inner radius
const createRing = (cx: number, cy: number, outerR: number, innerR: number) => {
  const top = cy - outerR;
  const bottom = cy + outerR;
  const innerTop = cy - innerR;
  const innerBottom = cy + innerR;
  return `M ${cx},${top} A ${outerR},${outerR} 0 1,1 ${cx},${bottom} A ${outerR},${outerR} 0 1,1 ${cx},${top} Z M ${cx},${innerTop} A ${innerR},${innerR} 0 1,0 ${cx},${innerBottom} A ${innerR},${innerR} 0 1,0 ${cx},${innerTop} Z`;
};

// Icon paths from Logo.svg (combined into single path)
const iconPath = 'M18.6,29.1c-3.8,0-7.3.8-10.7,1.9-3.9,1.3-8,4.4-8,4.4,0,0,.2,1,3.3,1s7.3-1,9.1-1c18.5,0,33.4,15,33.4,33.4s-2.6,14.5-6.9,20.2c8-6.1,11.8-15.6,11.8-26.4s-6.3-19-11.2-24c-4.9-5-13.5-9.4-20.9-9.4Z M11,22.6C5.5,27.2.9,31.9,0,35.4c.9-.3,3.2-1.2,4.9-1.9l1.5-1.2s.3-.6.3-.7c.2-.6,1.7-4.1,4.2-9Z M34.4,0c-3,0-8,1.1-15,9.2-3.2,3.7-6.2,8.8-8.5,13.4,5-4.3,10.7-8.4,15-11.4,8.9-6.3,18.6-7.4,31.8-1.9,13.2,5.4,23.4,16.1,23.6,22.7.2,6.6-25.6,18.5-26.6,33.1-.3,5.1,2.5,9.2,6.1,12.6-2.1-3.1-3.4-6.5-3.2-10.5,1.2-17.9,37.6-22.9,29.6-39.4C80.4,13.3,55.5-.3,34.4,0Z';

// Letter paths from Logo.svg (AURANZORA) - using the shadow paths (cls-1) which are positioned correctly
const letterPaths = [
  // A
  'M125.5,54.5c2.8,3,6.4,4.5,10.8,4.5s3.6-.4,4.9-1.2c1.3-.8,1.9-1.9,1.9-3.3s-.4-2.2-1.1-2.7c-.8-.5-1.8-.8-3.1-.8l-6.1-.5c-2.9-.3-5.2-1.3-7-3-1.8-1.7-2.8-4-2.8-7,0-3.6,1.3-6.3,3.7-8.2,2.4-1.8,5.4-2.7,9-2.7s3,.1,4.2.3c1.3.2,2.4.5,3.5,1,2.1.9,4,2.1,5.7,3.6l-4.3,5.1c-1.3-1-2.7-1.8-4.2-2.4-1.5-.6-3.1-.9-5-.9s-3.7.4-4.5,1.2c-.9.8-1.4,1.8-1.4,3.1,0,.8.3,1.5,1,2.1.7.7,1.8,1.1,3.5,1.3l5.7.4c3.6.3,6.1,1.4,7.7,3.3,1.5,1.9,2.2,4.3,2.2,7.2,0,3.4-1.4,6.1-4,7.9-2.6,1.9-6,2.9-10.1,2.9-5.6,0-10.6-2.1-15-6.3l4.8-4.9Z',
  // U
  'M157.9,30h6.9v21c0,2.4.6,4.2,1.9,5.6,1.3,1.3,2.9,2,4.9,2s3.6-.7,4.8-2c1.3-1.3,1.9-3.2,1.9-5.6v-21h6.9v35.3h-6.9v-3.8h-.1c-2.3,2.8-5.2,4.2-8.8,4.2-2.8,0-5.4-1.1-7.7-3.2-2.5-2-3.7-5-3.8-9v-23.5Z',
  // R
  'M195.3,15.7h6.9v18c1.2-1.2,2.6-2.3,4.1-3.1,1.4-.7,2.9-1.1,4.7-1.1,4.2.1,7.2,1.7,9.2,4.6.9,1.1,1.6,2.6,1.9,4.4.3,1.8.5,4.8.5,9s-.2,7.2-.5,9c-.4,1.9-1,3.4-1.9,4.5-.9,1.4-2.2,2.4-3.7,3.3-1.5.8-3.3,1.3-5.5,1.3-3.6,0-6.5-1.5-8.8-4.1v3.7h-6.9V15.7ZM208.9,36.6c-1.5,0-2.8.3-3.7,1-.9.7-1.6,1.5-2.1,2.6-.4,1.1-.7,2.2-.8,3.5-.1,1.2-.2,2.6-.2,3.9s0,2.5.2,3.8c.1,1.3.4,2.5.8,3.6.4,1.1,1.1,1.9,2.1,2.6.9.7,2.1,1,3.7,1s2.9-.3,3.9-1c.9-.7,1.6-1.5,2-2.5.4-1.1.7-2.3.9-3.6,0-1.3,0-2.6,0-3.9s0-2.8,0-4.1c-.2-1.2-.5-2.4-.9-3.5-.4-1.1-1.1-1.9-2-2.5-.9-.6-2.2-.9-3.9-.9Z',
  // A (second)
  'M231.4,15.7h6.9v40.5c0,1.6.9,2.4,2.6,2.4h2.4v6.7h-3.1c-2.5,0-4.6-.6-6.2-1.9-1.7-1.3-2.6-3.5-2.6-6.6V15.7Z',
  // N
  'M249.5,15.7h6.9v7.1h-6.9v-7.1ZM249.5,30h6.9v35.3h-6.9V30Z',
  // Z
  'M265.7,30h6.9v3.7h.1c2.3-2.8,5.4-4.2,9.2-4.2,2.4,0,4.4.5,5.9,1.3,1.5.9,2.8,2,4,3.4,2.8-3.1,6.5-4.7,11.1-4.6,2.9,0,5.6,1,8,3.1,2.4,2.1,3.6,5.1,3.7,9.2v23.4h-6.9v-21c0-2.5-.7-4.4-2-5.6-1.3-1.3-3-2-5.1-2s-3.8.7-5.1,2c-1.4,1.3-2,3.2-2,5.6v21h-6.9v-21c0-2.5-.7-4.4-2-5.6-1.3-1.3-3-2-5.1-2s-3.8.7-5.1,2c-1.4,1.3-2.1,3.2-2.1,5.6v21h-6.9V30Z',
  // O
  'M325.5,15.7h6.9v7.1h-6.9v-7.1ZM325.5,30h6.9v35.3h-6.9V30Z',
  // R (second)
  'M342,30h6.9v3.7h.1c2.3-2.8,5.2-4.2,8.9-4.2s5.4,1,7.8,3.1c2.3,2.1,3.5,5.1,3.7,9.2v23.4h-6.9v-21c0-2.5-.6-4.4-1.9-5.6-1.3-1.3-2.9-2-4.8-2s-3.6.7-4.9,2c-1.3,1.3-1.9,3.2-1.9,5.6v21h-6.9V30Z',
  // A (third)
  'M397.3,62.1h-.1c-.6,1.2-1.6,2.1-3,2.6-1.3.6-3.1.9-5.5.9-3.8,0-6.8-1.1-8.8-3.1-2.2-2-3.3-4.5-3.3-7.6s.9-5.4,2.8-7.4c1.9-2,4.6-3,8.3-3.1h9.5v-3.7c0-3.1-2.3-4.6-7-4.5-1.7,0-3.1.2-4,.5-1,.4-1.8,1.2-2.4,2.2l-5.4-4.3c2.6-3.5,6.5-5.2,11.5-5.1,4.3,0,7.7.8,10.3,2.5,2.6,1.8,3.9,4.8,3.9,9.1v24.1h-6.9v-3.1ZM397.3,50.3h-8.2c-4,0-6,1.5-5.9,4.3,0,1.2.5,2.2,1.5,3.1,1,.9,2.6,1.4,4.9,1.4,2.9,0,4.9-.3,6.1-1.1,1.1-.7,1.6-2.4,1.6-5.1v-2.6Z',
  // L (last letter)
  'M414.1,15.7h6.9v40.5c0,1.6.9,2.4,2.6,2.4h2.4v6.7h-3.1c-2.5,0-4.6-.6-6.2-1.9-1.7-1.3-2.6-3.5-2.6-6.6V15.7Z',
];

// Calculate equidistant positions for all circles (icon + 10 letters = 11 total)
// Using Logo.svg viewBox: 0 0 425.9 88.9
const viewBoxWidth = 425.9;
const totalCircles = 11; // 1 icon + 10 letters (A-U-R-A-N-Z-O-R-A-L)
const spacing = viewBoxWidth / (totalCircles + 1); // +1 to add padding on both sides
const circleRadius = 15; // Same size for all circles

// Icon position (centered vertically at 44.45)
const iconPosition = { cx: spacing, cy: 44.45 };

// Letter positions (equidistant, centered vertically for text at ~44.45)
const letterPositions = Array.from({ length: 10 }, (_, index) => ({
  cx: spacing * (index + 2), // Start after icon
  cy: 44.45, // Same vertical center as icon
}));

export const LogoTextMorphAnimated = ({ className = '' }: LogoTextMorphAnimatedProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const morphDuration = logoIconAnimation.morph.duration;
    const morphEase = logoIconAnimation.morph.ease;

    const tl = gsap
      .timeline({
        delay: logoIconAnimation.timeline.delay,
        defaults: { ease: logoIconAnimation.timeline.defaultEase },
      });

    // Step 1: Morph icon circle to ring
    tl.to('#morph-icon-circle', {
      morphSVG: '#icon-ring-path',
      duration: morphDuration / 2,
      ease: morphEase,
    }, 0);

    // Step 1: Morph each letter circle to ring
    letterPaths.forEach((path, index) => {
      tl.to(`#morph-letter-${index}`, {
        morphSVG: `#letter-${index}-ring-path`,
        duration: morphDuration / 2,
        ease: morphEase,
      }, 0);
    });

    // Step 2: Morph icon ring to icon
    tl.to('#morph-icon-circle', {
      morphSVG: '#icon-path',
      duration: morphDuration / 2,
      ease: morphEase,
    }, morphDuration / 2);

    // Step 2: Morph each letter ring to its letter
    letterPaths.forEach((path, index) => {
      tl.to(`#morph-letter-${index}`, {
        morphSVG: `#letter-${index}-path`,
        duration: morphDuration / 2,
        ease: morphEase,
      }, morphDuration / 2);
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <span className={`inline-block ${className}`}>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 425.9 88.9"
        className="max-w-[1200px] w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <style>{'.cls-1 { fill: #333; stroke-width: 0px; }'}</style>
        </defs>
        
        {/* Icon circle - same size as letters */}
        <path
          id="morph-icon-circle"
          className="cls-1"
          d={createCircle(iconPosition.cx, iconPosition.cy, circleRadius)}
        />
        
        {/* Letter circles */}
        {letterPositions.map((pos, index) => (
          <path
            key={index}
            id={`morph-letter-${index}`}
            className="cls-1"
            d={createCircle(pos.cx, pos.cy, circleRadius)}
          />
        ))}
        
        {/* Icon ring path target (hidden) */}
        <path
          id="icon-ring-path"
          className="cls-1"
          d={createRing(iconPosition.cx, iconPosition.cy, circleRadius, circleRadius * 0.8)}
          style={{ display: 'none' }}
        />
        
        {/* Icon path target (hidden) */}
        <path
          id="icon-path"
          className="cls-1"
          d={iconPath}
          style={{ display: 'none' }}
        />
        
        {/* Letter ring path targets (hidden) */}
        {letterPositions.map((pos, index) => (
          <path
            key={`ring-${index}`}
            id={`letter-${index}-ring-path`}
            className="cls-1"
            d={createRing(pos.cx, pos.cy, circleRadius, circleRadius * 0.8)}
            style={{ display: 'none' }}
          />
        ))}
        
        {/* Letter path targets (hidden) */}
        {letterPaths.map((path, index) => (
          <path
            key={index}
            id={`letter-${index}-path`}
            className="cls-1"
            d={path}
            style={{ display: 'none' }}
          />
        ))}
      </svg>
    </span>
  );
};
