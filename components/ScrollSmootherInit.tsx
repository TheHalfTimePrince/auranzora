'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const ScrollSmootherInit = () => {
  useEffect(() => {
    // Create ScrollSmoother BEFORE ScrollTriggers are created
    // This ensures proper initialization order
    const smoother = ScrollSmoother.create({
      smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
      effects: true, // looks for data-speed and data-lag attributes on elements
      smoothTouch: 0.1, // much shorter smoothing time on touch devices
      normalizeScroll: true, // helps with mobile address bar and scroll synchronization
    });

    // Refresh ScrollTrigger after ScrollSmoother is ready
    // This ensures all ScrollTriggers recalculate with ScrollSmoother in mind
    ScrollTrigger.refresh();

    return () => {
      // Cleanup
      if (smoother) {
        smoother.kill();
      }
      ScrollTrigger.refresh();
    };
  }, []);

  return null;
};
