'use client';

import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollTitleProps {
  text: string;
  scrollTween: gsap.core.Tween | null;
}

export const HorizontalScrollTitle = ({ text, scrollTween }: HorizontalScrollTitleProps) => {
  const titleTextRef = useRef<HTMLHeadingElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const animationsRef = useRef<gsap.core.Tween[]>([]);

  // Split title text into characters with stable random values
  const titleChars = useMemo(() => {
    return text.split('').map((char, i) => ({
      char,
      key: i,
      // More dramatic random values like the original
      yPercent: Math.random() * 400 - 200, // -200 to 200
      rotation: Math.random() * 40 - 20,   // -20 to 20
    }));
  }, [text]);

  useEffect(() => {
    if (!scrollTween || !titleTextRef.current) return;

    // Kill any existing animations
    animationsRef.current.forEach(anim => anim.kill());
    animationsRef.current = [];

    // Animate each character with containerAnimation
    charRefs.current.forEach((charEl, index) => {
      if (!charEl) return;
      const charData = titleChars[index];

      // Set initial state
      gsap.set(charEl, {
        yPercent: charData.yPercent,
        rotation: charData.rotation,
      });

      const anim = gsap.to(charEl, {
        yPercent: 0,
        rotation: 0,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: charEl,
          containerAnimation: scrollTween,
          start: 'left 100%',
          end: 'left 30%',
          scrub: 1,
        },
      });

      animationsRef.current.push(anim);
    });

    return () => {
      animationsRef.current.forEach(anim => anim.kill());
      animationsRef.current = [];
    };
  }, [scrollTween, titleChars]);

  return (
    <div className="horizontal-title-wrapper">
      <h3 ref={titleTextRef} className="horizontal-title-text ">
        {titleChars.map((charData) => (
          <span
            key={charData.key}
            ref={(el) => { charRefs.current[charData.key] = el; }}
            className="horizontal-title-char uppercase text-9xl"
          >
            {charData.char === ' ' ? '\u00A0' : charData.char}
          </span>
        ))}
      </h3>
    </div>
  );
};
