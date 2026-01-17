'use client';

import { LogoTextMorphAnimated } from './LogoTextMorphAnimated';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutSectionAnimation, logoIconAnimation } from '@/lib/config/aboutsectionanimation';
import { LogoIconAnimated } from './LogoIconAnimated';
import { LogoTextAnimated } from './LogoTextAnimated';
import { useIsMobile } from '@/hooks/useMediaQuery';

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);

const GradientWeightText = ({ word, className }: { word: string; className: string }) => {
  const letters = word.split('');
  const length = letters.length;
  const gradientConfig = aboutSectionAnimation.gradientText;
  
  // Calculate scale, shadow, color, and spacing for each letter
  const getLetterStyle = (index: number) => {
    // Normalize position from 0 to 1
    const position = index / (length - 1);
    // Create a steeper curve that peaks in the middle (using a quartic function)
    // Position 0.5 (middle) = 1.0, edges = 0.0
    const curve = 1 - Math.pow((position - 0.5) * 2, 4);
    
    // Scale X-axis: edges thinner, middle wider for dramatic effect
    const scaleX = gradientConfig.scale.min + curve * gradientConfig.scale.range;
    
    // Letter spacing: more spacing in the middle for extra flare
    const letterSpacing = curve * gradientConfig.letterSpacing.max;
    
    // Gradient colors: purple -> blue -> pink based on position
    const hue = gradientConfig.color.hueStart + (position * gradientConfig.color.hueRange);
    const saturation = gradientConfig.color.saturationMin + curve * gradientConfig.color.saturationRange;
    const lightness = gradientConfig.color.lightnessBase - curve * gradientConfig.color.lightnessRange;
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    // Create multiple text-shadows for boldness and glow effect
    const shadowCount = Math.max(1, Math.round(curve * gradientConfig.shadow.countMultiplier));
    const shadows: string[] = [];
    const shadowSpread = curve * gradientConfig.shadow.spreadMultiplier;
    
    // Boldness shadows
    for (let i = 0; i < shadowCount; i++) {
      const angle = (i / shadowCount) * Math.PI * 2;
      const offsetX = Math.cos(angle) * shadowSpread;
      const offsetY = Math.sin(angle) * shadowSpread * 0.3;
      shadows.push(`${offsetX}px ${offsetY}px 0 ${color}`);
    }
    
    // Glow effect shadows (more intense in middle)
    const glowIntensity = curve * gradientConfig.shadow.glowIntensityMultiplier;
    gradientConfig.shadow.glowSizes.forEach((size, idx) => {
      const opacity = gradientConfig.shadow.glowOpacities[idx];
      shadows.push(`0 0 ${glowIntensity * size}px ${color}${opacity}`);
    });
    
    return {
      display: 'inline-block',
      transform: `scaleX(${scaleX})`,
      textShadow: shadows.join(', '),
      transformOrigin: 'center',
      color: color,
      letterSpacing: `${letterSpacing}em`,
      filter: `brightness(${1 + curve * gradientConfig.brightness.boost})`, // Slight brightness boost in middle
    };
  };

  return (
    <span className={className} style={{ letterSpacing: '0.05em' }}>
      {letters.map((letter, index) => (
        <span
          key={index}
          style={getLetterStyle(index)}
        >
          {letter}
        </span>
      ))}
    </span>
  );
};

export const AboutSection = () => {
  const isMobile = useIsMobile();
  const fontSize = isMobile ? 'text-2xl' : 'text-7xl';
  const fontSizeSmall = isMobile ? 'text-sm' : 'text-xl';
  const digitalRef = useRef<HTMLSpanElement>(null);
  const digitalAlRef = useRef<HTMLSpanElement>(null);
  const fixedLogoRef = useRef<HTMLDivElement>(null);
  const textLogoRef = useRef<HTMLSpanElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [masterTimeline, setMasterTimeline] = useState<gsap.core.Timeline | null>(null);
  const [digitalText, setDigitalText] = useState('al');

  useEffect(() => {
    if (!fixedLogoRef.current || !textLogoRef.current || !paragraphRef.current || !sectionRef.current) return;

    const fixedLogo = fixedLogoRef.current;
    const textLogo = textLogoRef.current;
    const paragraph = paragraphRef.current;
    const section = sectionRef.current;

    // Initialize GSAP transforms - center the logo using xPercent and yPercent
    gsap.set(fixedLogo, {
      xPercent: aboutSectionAnimation.fixedLogo.xPercent,
      yPercent: aboutSectionAnimation.fixedLogo.yPercent,
      scale: aboutSectionAnimation.fixedLogo.initialScale,
      transformOrigin: aboutSectionAnimation.fixedLogo.transformOrigin,
    });

    // Set initial opacity to 0 for text logo and paragraph
    gsap.set([textLogo, paragraph], {
      opacity: aboutSectionAnimation.textLogo.opacity.initial,
    });

    // Function to calculate the position needed
    const calculateTransform = () => {
      // Get bounding rects - these give us viewport-relative positions
      const textRect = textLogo.getBoundingClientRect();
      const fixedRect = fixedLogo.getBoundingClientRect();
      
      // Get center positions
      const textCenterX = textRect.left + textRect.width / 2;
      const textCenterY = textRect.top + textRect.height / 2;
      const fixedCenterX = fixedRect.left + fixedRect.width / 2;
      const fixedCenterY = fixedRect.top + fixedRect.height / 2;
      
      // Calculate delta from fixed logo's current center to text logo's center
      // GSAP's x/y transforms are relative to the element's current position
      const deltaX = textCenterX - fixedCenterX;
      const deltaY = textCenterY - fixedCenterY;
      
      return { deltaX, deltaY };
    };

    // Create master timeline that will be scrubbed by ScrollTrigger
    const masterTL = gsap.timeline({ paused: aboutSectionAnimation.timeline.paused });
    
    // Calculate total timeline duration based on all animation timings
    // This is calculated dynamically from individual animation durations
    const logoIconDuration = logoIconAnimation.morph.duration;
    const overlayStartTime = logoIconDuration;
    const scaleDuration = aboutSectionAnimation.logoOverlay.scale.duration;
    const moveDuration = aboutSectionAnimation.logoOverlay.move.duration;
    const moveStartTime = overlayStartTime + scaleDuration * aboutSectionAnimation.logoOverlay.move.startOffset;
    const textFadeStartTime = overlayStartTime + scaleDuration + moveDuration + aboutSectionAnimation.textLogo.opacity.delay;
    const textFadeDuration = aboutSectionAnimation.textLogo.opacity.duration;
    
    // Calculate end times for each animation
    const logoIconEndTime = logoIconDuration;
    const scaleEndTime = overlayStartTime + scaleDuration;
    const moveEndTime = moveStartTime + moveDuration;
    const textFadeEndTime = textFadeStartTime + textFadeDuration;
    
    // Total duration is the maximum end time of all animations
    const totalDuration = Math.max(logoIconEndTime, scaleEndTime, moveEndTime, textFadeEndTime);
    
    // Calculate scroll distance based on timeline duration
    // Use viewport height as base unit for smooth scrubbing (similar to horizontal scroller using width)
    let scrollDistance: number;
    
    function refreshScrollDistance() {
      scrollDistance = typeof window !== 'undefined' 
        ? window.innerHeight * totalDuration * aboutSectionAnimation.scrollTrigger.scrollDistanceMultiplier
        : totalDuration * aboutSectionAnimation.scrollTrigger.fallbackScrollDistance;
    }
    
    refreshScrollDistance();

    // Wait for layout to stabilize, then add animations to timeline
    requestAnimationFrame(() => {
      const { deltaX, deltaY } = calculateTransform();
      
      // Add logo overlay animation to timeline
      // Scale first with bounce, then move with bounce - sequential for better effect
      
      // First: Scale animation with bounce (faster and more dynamic)
      masterTL.to(fixedLogo, {
        scale: aboutSectionAnimation.logoOverlay.targetScale,
        duration: scaleDuration,
        ease: aboutSectionAnimation.logoOverlay.scale.ease,
      }, overlayStartTime);
      
      // Then: Position animation (smooth, no bounce)
      masterTL.to(fixedLogo, {
        x: deltaX,
        y: deltaY,
        duration: moveDuration,
        ease: aboutSectionAnimation.logoOverlay.move.ease,
      }, moveStartTime);

      // Add text logo and paragraph fade-in to timeline
      // Start after scale and move animations complete, adjusted by delay
      masterTL.to([textLogo, paragraph], {
        opacity: 1,
        duration: textFadeDuration,
        ease: aboutSectionAnimation.textLogo.opacity.ease,
      }, textFadeStartTime);
    });

    // Create ScrollTrigger with pinning
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      pin: section,
      start: aboutSectionAnimation.scrollTrigger.start,
      end: () => `+=${scrollDistance}`,
      scrub: aboutSectionAnimation.scrollTrigger.scrub,
      animation: masterTL,
      invalidateOnRefresh: aboutSectionAnimation.scrollTrigger.invalidateOnRefresh,
    });
    
    // Refresh scroll distance on window resize (similar to horizontal scroller)
    ScrollTrigger.addEventListener('refreshInit', refreshScrollDistance);

    setMasterTimeline(masterTL);

    return () => {
      ScrollTrigger.removeEventListener('refreshInit', refreshScrollDistance);
      scrollTrigger.kill();
      masterTL.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="h-screen text-black py-8 md:py-32 px-4 md:px-8 relative overflow-hidden">
    
        {/* Fixed centered logo */}
        <div 
          ref={fixedLogoRef}
          className="absolute top-1/2 left-1/2  z-20 flex items-center gap-1 md:gap-2 pointer-events-none"
        >
          <LogoIconAnimated trigger={masterTimeline} className={isMobile ? "h-5 w-5 inline-block" : "h-10 w-10 md:h-14 md:w-14 inline-block"} />
          <LogoTextAnimated className={isMobile ? "h-5 text-black inline-block" : "h-10 md:h-14 text-black inline-block"} />
        </div>
        <div className="container mx-auto max-w-5xl relative z-10 h-full flex items-center">
          <p 
            ref={paragraphRef}
            className={` font-normal leading-tight tracking-tight ${fontSize}`} 
            style={{ fontFamily: 'var(--font-xanh-mono)' }}
          >
            <span 
              ref={textLogoRef}
              className={`inline-flex items-center gap-1 md:gap-2 align-middle ${isMobile ? '-mt-2' : '-mt-8'}`}
            >
              <LogoIconAnimated className={isMobile ? "h-5 w-5 inline-block" : "h-10 w-10 md:h-14 md:w-14 inline-block"} />
              <LogoTextAnimated className={isMobile ? "h-5 text-black inline-block" : "h-10 md:h-14 text-black inline-block"} />
            </span>
            <span className={`${fontSizeSmall}`}>{' '}is a {' '}</span>
            <span 
              ref={digitalRef}
              className={`${fontSize}  inline-block`}
            >digital
            </span>
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
