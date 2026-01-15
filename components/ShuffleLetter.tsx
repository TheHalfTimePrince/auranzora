'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ShuffleLetterProps {
  children: string;
  className?: string;
  shuffleDirection?: 'right' | 'left' | 'up' | 'down';
  duration?: number;
  delay?: number;
  triggerOnHover?: boolean;
}

export const ShuffleLetter = ({ 
  children, 
  className = '',
  shuffleDirection = 'right',
  duration = 0.35,
  delay = 0,
  triggerOnHover = true
}: ShuffleLetterProps) => {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const hasShuffledRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Generate random delay for each letter (0 to 0.5 seconds)
  const randomDelay = useRef(Math.random() * 0.5);
  // Generate random repeat interval (2 to 5 seconds)
  const randomRepeatInterval = useRef(2000 + Math.random() * 3000);

  useEffect(() => {
    if (!wrapperRef.current || !innerRef.current || children.length !== 1) return;

    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    const char = children;
    let st: ScrollTrigger | null = null;
    let hoverHandler: (() => void) | null = null;
    
    // Wait for layout to calculate dimensions
    const measureChar = () => {
      const rect = wrapper.getBoundingClientRect();
      const charWidth = rect.width;
      const charHeight = rect.height;
      
      if (!charWidth || charWidth === 0) {
        requestAnimationFrame(measureChar);
        return;
      }
      
      setupShuffle(wrapper, inner, char, charWidth, charHeight);
    };
    
    const setupShuffle = (
      wrapper: HTMLSpanElement,
      inner: HTMLSpanElement,
      char: string,
      charWidth: number,
      charHeight: number
    ) => {

    // Create wrapper for overflow
    wrapper.className = `inline-block overflow-hidden align-baseline ${className}`;
    wrapper.style.width = `${charWidth}px`;
    wrapper.style.height = shuffleDirection === 'up' || shuffleDirection === 'down' ? `${charHeight}px` : 'auto';

    // Create inner container
    inner.className = `inline-block will-change-transform ${shuffleDirection === 'up' || shuffleDirection === 'down' ? 'whitespace-normal' : 'whitespace-nowrap'}`;

    // Create shuffled characters
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    const shuffleCount = 5;

    // Create original character
    const original = document.createElement('span');
    original.textContent = char;
    original.className = `text-center ${shuffleDirection === 'up' || shuffleDirection === 'down' ? 'block' : 'inline-block'}`;
    original.style.width = `${charWidth}px`;

    // Create shuffled characters
    const shuffled: HTMLSpanElement[] = [];
    for (let i = 0; i < shuffleCount; i++) {
      const span = document.createElement('span');
      span.textContent = charset.charAt(Math.floor(Math.random() * charset.length));
      span.className = `text-center ${shuffleDirection === 'up' || shuffleDirection === 'down' ? 'block' : 'inline-block'}`;
      span.style.width = `${charWidth}px`;
      shuffled.push(span);
    }

    // Add original at the end
    shuffled.push(original);

    // Append all to inner
    shuffled.forEach(s => inner.appendChild(s));

    // Set initial position
    let startX = 0, finalX = 0, startY = 0, finalY = 0;
    const steps = shuffleCount + 1;

    if (shuffleDirection === 'right') {
      startX = -steps * charWidth;
      finalX = 0;
    } else if (shuffleDirection === 'left') {
      startX = 0;
      finalX = -steps * charWidth;
    } else if (shuffleDirection === 'down') {
      startY = -steps * charHeight;
      finalY = 0;
    } else if (shuffleDirection === 'up') {
      startY = 0;
      finalY = -steps * charHeight;
    }

    if (shuffleDirection === 'left' || shuffleDirection === 'right') {
      gsap.set(inner, { x: startX, y: 0, force3D: true });
    } else {
      gsap.set(inner, { x: 0, y: startY, force3D: true });
    }

    const playShuffle = (isRepeat = false) => {
      // Rebuild shuffled characters if this is a repeat
      if (isRepeat && inner.children.length === 1) {
        shuffled.forEach(s => inner.appendChild(s));
        inner.className = inner.className.replace('will-change-auto', 'will-change-transform');
        if (shuffleDirection === 'left' || shuffleDirection === 'right') {
          gsap.set(inner, { x: startX, y: 0, force3D: true });
        } else {
          gsap.set(inner, { x: 0, y: startY, force3D: true });
        }
      }

      // Randomize shuffled characters
      shuffled.slice(0, -1).forEach(span => {
        span.textContent = charset.charAt(Math.floor(Math.random() * charset.length));
      });

      // Use random delay + provided delay
      const totalDelay = delay + randomDelay.current;
      
      if (shuffleDirection === 'left' || shuffleDirection === 'right') {
        gsap.set(inner, { x: startX });
        gsap.to(inner, {
          x: finalX,
          duration,
          delay: totalDelay,
          ease: 'power3.out',
          force3D: true,
          onComplete: () => {
            // Clean up - keep only original
            inner.replaceChildren(original);
            inner.className = inner.className.replace('will-change-transform', 'will-change-auto');
            
            // Schedule next shuffle with new random interval
            timeoutRef.current = setTimeout(() => {
              randomRepeatInterval.current = 2000 + Math.random() * 3000;
              playShuffle(true);
            }, randomRepeatInterval.current);
          }
        });
      } else {
        gsap.set(inner, { y: startY });
        gsap.to(inner, {
          y: finalY,
          duration,
          delay: totalDelay,
          ease: 'power3.out',
          force3D: true,
          onComplete: () => {
            inner.replaceChildren(original);
            inner.className = inner.className.replace('will-change-transform', 'will-change-auto');
            
            // Schedule next shuffle with new random interval
            timeoutRef.current = setTimeout(() => {
              randomRepeatInterval.current = 2000 + Math.random() * 3000;
              playShuffle(true);
            }, randomRepeatInterval.current);
          }
        });
      }
      
      if (!isRepeat) {
        hasShuffledRef.current = true;
      }
    };

      // Scroll trigger
      st = ScrollTrigger.create({
        trigger: wrapper,
        start: 'top 80%',
        once: true,
        onEnter: () => playShuffle(false)
      });

      // Hover trigger
      if (triggerOnHover) {
        hoverHandler = () => {
          playShuffle();
        };
        wrapper.addEventListener('mouseenter', hoverHandler);
      }
    };
    
    requestAnimationFrame(measureChar);
    
    return () => {
      if (st) st.kill();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (hoverHandler && wrapper) {
        wrapper.removeEventListener('mouseenter', hoverHandler);
      }
    };
  }, [children, shuffleDirection, duration, delay, triggerOnHover]);

  return (
    <span ref={wrapperRef} className={`inline-block  overflow-y-visible overflow-x-hidden ${className}`}>
      <span ref={innerRef} className="inline-block will-change-transform">
        {children}
      </span>
    </span>
  );
};
