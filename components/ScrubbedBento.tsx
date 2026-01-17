'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Flip } from 'gsap/dist/Flip';
import Image from 'next/image';
import LiquidEther from './LiquidEther';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
gsap.registerPlugin(Flip);

// Detect iOS for specific handling
const isIOS = () => {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

// Font configuration - Edit fonts here to change them throughout the component
const FONT_XANH_MONO = 'var(--font-xanh-mono)';
const FONT_SPACE_MONO = 'var(--font-space-mono)';

// Color configuration for all bento cells - Edit colors here in simple JSON format
// Format: Use Tailwind color names (e.g., 'blue-500', 'purple-600', 'neutral-600')
type BentoColorConfig = {
  gradient: { from: string; to: string; opacity: number } | null;
  imageOpacity: number;
  textColor: { default: string; hover: string };
  backgroundColor: string;
  imageFilter?: string;
  glowColors?: { purple: string; blue: string; opacity: number };
};

const bentoColors: Record<number, BentoColorConfig> = {
  0: {
    // First cell (spans 2 rows on left)
    gradient: { from: 'blue-500', to: 'purple-600', opacity: 70 },
    imageOpacity: 50,
    textColor: { default: 'neutral-600', hover: 'neutral-900' },
    backgroundColor: 'white'
  },
  1: {
    // Services highlight (top middle)
    gradient: { from: 'indigo-500', to: 'blue-600', opacity: 70 },
    imageOpacity: 50,
    textColor: { default: 'neutral-600', hover: 'neutral-900' },
    backgroundColor: 'white'
  },
  2: {
    // CENTER BLOCK - Main text (spans 2 rows middle)
    gradient: null, // No gradient overlay
    imageOpacity: 20,
    textColor: { default: 'neutral-400', hover: 'neutral-600' },
    backgroundColor: 'white',
    imageFilter: 'invert' // Special filter for center block
  },
  3: {
    // Years/Experience (spans 2 rows on right)
    gradient: { from: 'teal-500', to: 'cyan-600', opacity: 70 },
    imageOpacity: 35,
    textColor: { default: 'neutral-600', hover: 'neutral-900' },
    backgroundColor: 'white'
  },
  4: {
    // Feature highlight (middle left)
    gradient: { from: 'amber-500', to: 'orange-600', opacity: 70 },
    imageOpacity: 35,
    textColor: { default: 'neutral-700', hover: 'neutral-900' },
    backgroundColor: 'white'
  },
  5: {
    // Contact CTA (spans 2 rows bottom right)
    gradient: { from: 'purple-500', to: 'pink-600', opacity: 70 },
    imageOpacity: 25,
    textColor: { default: 'neutral-600', hover: 'neutral-900' },
    backgroundColor: 'white',
    glowColors: { purple: 'purple-500', blue: 'blue-500', opacity: 30 }
  },
  6: {
    // Clients (bottom left)
    gradient: { from: 'emerald-500', to: 'green-600', opacity: 70 },
    imageOpacity: 30,
    textColor: { default: 'neutral-600', hover: 'neutral-900' },
    backgroundColor: 'white'
  },
  7: {
    // Tagline (bottom middle)
    gradient: { from: 'violet-600', to: 'purple-700', opacity: 70 },
    imageOpacity: 35,
    textColor: { default: 'neutral-600', hover: 'neutral-900' },
    backgroundColor: 'white'
  }
};

// Words that cycle in the center (starting with Website)
const cyclingWords = ['Website', 'Branding', 'Identity', 'Idea', 'Logo', 'Strategy', 'Design', 'Business'];

// Image mapping for each bento cell
const bentoImages = [
  '/bento/alexandru-ant-qyAWIbWfvtA-unsplash.jpg', // case 0
  '/bento/fachrizal-maulana-y_uVUwodD44-unsplash.jpg', // case 1 - Services
  '/bento/hulki-okan-tabak-x3kQTL7yw30-unsplash.jpg', // case 2 - Center block
  '/bento/logan-voss-SHnGEqdWjtw-unsplash.jpg', // case 3 - Years/Experience
  '/bento/olegs-jonins-w13BMngq7JM-unsplash.jpg', // case 4 - Projects
  '/bento/qihang-fan-zbHanmcQfiw-unsplash.jpg', // case 5 - Contact CTA
  '/bento/vitaly-gariev-JOBvWZIaWNo-unsplash.jpg', // case 6 - Clients
  '/bento/alexandru-ant-qyAWIbWfvtA-unsplash.jpg', // case 7 - Tagline (reusing first image)
];

// Content for each bento cell
const BentoContent = ({ index, wordRefs, cyclingWords: words }: { 
  index: number; 
  wordRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  cyclingWords: string[];
}) => {
  // Determine if this image should be prioritized (first 3 visible ones)
  const isPriority = index <= 2;
  const imageSrc = bentoImages[index];
  const itemRef = useRef<HTMLDivElement>(null);

  const colors = bentoColors[index];
  
  // Map color config to Tailwind classes
  const getGradientClass = (grad: BentoColorConfig['gradient']) => {
    if (!grad) return '';
    const gradientMap: Record<string, Record<number, string>> = {
      'blue-500': { 70: 'from-blue-500/70' },
      'purple-600': { 70: 'to-purple-600/70' },
      'indigo-500': { 70: 'from-indigo-500/70' },
      'blue-600': { 70: 'to-blue-600/70' },
      'teal-500': { 70: 'from-teal-500/70' },
      'cyan-600': { 70: 'to-cyan-600/70' },
      'amber-500': { 70: 'from-amber-500/70' },
      'orange-600': { 70: 'to-orange-600/70' },
      'purple-500': { 70: 'from-purple-500/70' },
      'pink-600': { 70: 'to-pink-600/70' },
      'emerald-500': { 70: 'from-emerald-500/70' },
      'green-600': { 70: 'to-green-600/70' },
      'violet-600': { 70: 'from-violet-600/70' },
      'purple-700': { 70: 'to-purple-700/70' }
    };
    return `bg-gradient-to-br ${gradientMap[grad.from]?.[grad.opacity] || ''} ${gradientMap[grad.to]?.[grad.opacity] || ''}`;
  };
  
  const textColorMap: Record<string, string> = {
    'neutral-400': 'text-neutral-400',
    'neutral-600': 'text-neutral-600',
    'neutral-700': 'text-neutral-700',
    'neutral-900': 'text-neutral-900'
  };
  
  const hoverTextColorMap: Record<string, string> = {
    'neutral-600': 'group-hover:text-neutral-600',
    'neutral-900': 'group-hover:text-neutral-900'
  };
  
  const opacityMap: Record<number, string> = {
    20: 'opacity-20',
    25: 'opacity-25',
    30: 'opacity-30',
    35: 'opacity-35',
    50: 'opacity-50'
  };
  
  switch (index) {
    // First cell (spans 2 rows on left)
    case 0:
      return (
        <div 
          ref={itemRef}
          className="w-full h-full bg-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
        >
          {imageSrc && (
            <Image 
              src={imageSrc} 
              alt="Bento" 
              fill
              priority={isPriority}
              className={`${colors.imageFilter || ''} bento-image object-cover ${opacityMap[colors.imageOpacity]} grayscale`}
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          )}
          {colors.gradient && (
            <div className={`absolute inset-0 ${getGradientClass(colors.gradient)}`} />
          )}
          <span className={`relative z-10 ${textColorMap[colors.textColor.default]} text-sm tracking-widest mb-2`} style={{ fontFamily: FONT_XANH_MONO }}>what we do</span>
          <span className={`relative z-10 ${textColorMap[colors.textColor.hover]} text-xl md:text-2xl font-semibold`}>Web • Brand • Design</span>
        </div>
      );
    
    // Services highlight (top middle)
    case 1:
      return (
        <div 
          ref={itemRef}
          className={`w-full h-full bg-${colors.backgroundColor} flex flex-col items-center justify-center p-6 text-center relative overflow-hidden`}
        >
          {imageSrc && (
            <Image 
              src={imageSrc} 
              alt="Services" 
              fill
              priority={isPriority}
              className={`${colors.imageFilter || ''} bento-image object-cover opacity-${colors.imageOpacity} grayscale`}
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          )}
          {colors.gradient && (
            <div className={`absolute inset-0 bg-gradient-to-br from-${colors.gradient.from}/${colors.gradient.opacity} to-${colors.gradient.to}/${colors.gradient.opacity}`} />
          )}
          <span className={`relative z-10 text-${colors.textColor.default} text-sm tracking-widest mb-2`} style={{ fontFamily: FONT_XANH_MONO }}>what we do</span>
          <span className={`relative z-10 text-${colors.textColor.hover} text-xl md:text-2xl font-semibold`}>Web • Brand • Design</span>
        </div>
      );
    
    // CENTER BLOCK - Main text (spans 2 rows middle)
    case 2:
      return (
        <div 
          ref={itemRef}
          className={`w-full h-full bg-transparent flex flex-col items-center justify-center p-8 text-center relative overflow-hidden`}
        >
          {/* {imageSrc && (
            <img 
              src={imageSrc} 
              alt="Main" 
              className={`${colors.imageFilter || ''} bento-image absolute inset-0 w-full h-full object-cover opacity-${colors.imageOpacity} grayscale`}
            />
          )} */}
          <span className={`relative z-10 text-${colors.textColor.default} text-sm md:text-lg tracking-widest mb-4`} style={{ fontFamily: FONT_XANH_MONO }}>
            everything you need to bring your
          </span>
          <div className="relative h-16 md:h-24 w-full flex items-center justify-center">
            {words.map((word, wordIndex) => (
              <div
                key={word}
                ref={(el) => { wordRefs.current[wordIndex] = el; }}
                className="absolute flex items-center justify-center"
                style={{ perspective: '500px' }}
              >
                {word.split('').map((char, charIndex) => (
                  <span
                    key={`${word}-${charIndex}`}
                    className="flip-char text-4xl md:text-6xl font-black text-black inline-block "
                    style={{ transformStyle: 'preserve-3d', fontFamily: 'var(--font-space-mono)' }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <span className={`relative z-10 text-${colors.textColor.default} text-sm md:text-lg tracking-widest mt-4`} style={{ fontFamily: FONT_XANH_MONO }}>
            to life
          </span>
        </div>
      );
    
    // Years/Experience (spans 2 rows on right)
    case 3:
      return (
        <div 
          ref={itemRef}
          className={`w-full h-full bg-${colors.backgroundColor} flex flex-col items-center justify-center p-6 relative overflow-hidden`}
        >
          {imageSrc && (
            <img 
              src={imageSrc} 
              alt="Experience" 
              className={`${colors.imageFilter || ''} bento-image absolute inset-0 w-full h-full object-cover opacity-${colors.imageOpacity} grayscale`}
            />
          )}
          {colors.gradient && (
            <div className={`absolute inset-0 bg-gradient-to-br from-${colors.gradient.from}/${colors.gradient.opacity} to-${colors.gradient.to}/${colors.gradient.opacity}`} />
          )}
          <span className={`relative z-10 text-7xl md:text-9xl font-black text-${colors.textColor.hover}`} style={{ fontFamily: FONT_SPACE_MONO }}>10+</span>
          <span className={`relative z-10 text-${colors.textColor.default} text-sm tracking-widest mt-2`} style={{ fontFamily: FONT_XANH_MONO }}>years experience</span>
        </div>
      );
    
    // Feature highlight (middle left)
    case 4:
      return (
        <div 
          ref={itemRef}
          className={`w-full h-full bg-${colors.backgroundColor} flex flex-col items-center justify-center p-6 text-center relative overflow-hidden`}
        >
          {imageSrc && (
            <Image 
              src={imageSrc} 
              alt="Projects" 
              fill
              priority={isPriority}
              className={`${colors.imageFilter || ''} bento-image object-cover opacity-${colors.imageOpacity} grayscale`}
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          )}
          {colors.gradient && (
            <div className={`absolute inset-0 bg-gradient-to-br from-${colors.gradient.from}/${colors.gradient.opacity} to-${colors.gradient.to}/${colors.gradient.opacity}`} />
          )}
          <span className={`relative z-10 text-${colors.textColor.hover} text-3xl md:text-4xl font-bold`}>150+</span>
          <span className={`relative z-10 text-${colors.textColor.default} text-sm  tracking-wider`} style={{ fontFamily: FONT_XANH_MONO }}>projects delivered</span>
        </div>
      );
    
    // Contact CTA (spans 2 rows bottom right)
    case 5:
      return (
        <div 
          ref={itemRef}
          className={`w-full h-full bg-${colors.backgroundColor} flex flex-col items-center justify-center p-6 text-center relative overflow-hidden`}
        >
          {imageSrc && (
            <Image 
              src={imageSrc} 
              alt="Contact" 
              fill
              priority={isPriority}
              className={`${colors.imageFilter || ''} bento-image object-cover opacity-${colors.imageOpacity} grayscale`}
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          )}
          {colors.gradient && (
            <div className={`absolute inset-0 bg-gradient-to-br from-${colors.gradient.from}/${colors.gradient.opacity} to-${colors.gradient.to}/${colors.gradient.opacity}`} />
          )}
          {colors.glowColors && (
            <div className={`absolute inset-0 opacity-${colors.glowColors.opacity}`}>
              <div className={`absolute top-1/4 left-1/4 w-32 h-32 bg-${colors.glowColors.purple} rounded-full blur-3xl`} />
              <div className={`absolute bottom-1/4 right-1/4 w-32 h-32 bg-${colors.glowColors.blue} rounded-full blur-3xl`} />
            </div>
          )}
          <span className={`relative z-10 text-${colors.textColor.hover} text-2xl md:text-3xl font-bold mb-2`}>Ready to Start?</span>
          <span className={`relative z-10 text-${colors.textColor.default} text-sm tracking-widest`} style={{ fontFamily: 'var(--font-xanh-mono)' }}>let's talk</span>
        </div>
      );
    
    // Clients (bottom left)
    case 6:
      return (
        <div 
          ref={itemRef}
          className={`w-full h-full bg-${colors.backgroundColor} flex flex-col items-center justify-center p-6 text-center relative overflow-hidden`}
        >
          {imageSrc && (
            <Image 
              src={imageSrc} 
              alt="Clients" 
              fill
              priority={isPriority}
              className={`${colors.imageFilter || ''} bento-image object-cover opacity-${colors.imageOpacity} grayscale`}
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          )}
          {colors.gradient && (
            <div className={`absolute inset-0 bg-gradient-to-br from-${colors.gradient.from}/${colors.gradient.opacity} to-${colors.gradient.to}/${colors.gradient.opacity}`} />
          )}
          <span className={`relative z-10 text-${colors.textColor.hover} text-3xl md:text-4xl font-bold`} style={{ fontFamily: FONT_SPACE_MONO }}>50+</span>
          <span className={`relative z-10 text-${colors.textColor.default} text-sm tracking-wider`} style={{ fontFamily: FONT_SPACE_MONO }}>happy clients</span>
        </div>
      );
    
    // Tagline (bottom middle)
    case 7:
      return (
        <div 
          ref={itemRef}
          className={`w-full h-full bg-${colors.backgroundColor} flex flex-col items-center justify-center p-6 text-center relative overflow-hidden`}
        >
          {imageSrc && (
            <Image 
              src={imageSrc} 
              alt="Philosophy" 
              fill
              priority={isPriority}
              className={`${colors.imageFilter || ''} bento-image object-cover opacity-${colors.imageOpacity} grayscale`}
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          )}
          {colors.gradient && (
            <div className={`absolute inset-0 bg-gradient-to-br from-${colors.gradient.from}/${colors.gradient.opacity} to-${colors.gradient.to}/${colors.gradient.opacity}`} />
          )}
          <span className={`relative z-10 text-${colors.textColor.default} text-xs tracking-widest mb-1`} style={{ fontFamily: 'var(--font-xanh-mono)' }}>our philosophy</span>
          <span className={`relative z-10 text-${colors.textColor.hover} text-lg md:text-xl font-semibold`}>Design with Purpose</span>
        </div>
      );
    
    default:
      return null;
  }
};

export const ScrubbedBento = () => {
  const galleryWrapRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const flipCtxRef = useRef<gsap.Context | null>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Update word animations based on scroll progress
  const updateWords = useCallback((progress: number) => {
    const totalWords = cyclingWords.length;
    const isFirstWord = (index: number) => index === 0;
    const isLastWord = (index: number) => index === totalWords - 1;
    const transitionSize = 0.3;
    
    wordRefs.current.forEach((wordEl, index) => {
      if (!wordEl) return;
      
      const chars = wordEl.querySelectorAll('.flip-char');
      const wordStart = index / totalWords;
      const wordEnd = (index + 1) / totalWords;
      
      let localProgress: number;
      if (progress < wordStart) {
        localProgress = 0;
      } else if (progress >= wordEnd) {
        localProgress = 1;
      } else {
        localProgress = (progress - wordStart) / (wordEnd - wordStart);
      }
      
      chars.forEach((char, charIndex) => {
        const charEl = char as HTMLElement;
        const charCount = chars.length;
        const charOffset = (charIndex / charCount) * 0.15;
        const adjustedProgress = Math.max(0, Math.min(1, localProgress + charOffset));
        
        let rotationX: number;
        let opacity: number;
        
        if (isFirstWord(index)) {
          if (adjustedProgress >= (1 - transitionSize)) {
            const exitProgress = (adjustedProgress - (1 - transitionSize)) / transitionSize;
            rotationX = -90 * exitProgress;
            opacity = 1 - exitProgress;
          } else {
            rotationX = 0;
            opacity = 1;
          }
        } else if (isLastWord(index)) {
          if (adjustedProgress <= transitionSize) {
            const entryProgress = adjustedProgress / transitionSize;
            rotationX = 90 * (1 - entryProgress);
            opacity = entryProgress;
          } else {
            rotationX = 0;
            opacity = 1;
          }
        } else {
          if (adjustedProgress <= transitionSize) {
            const entryProgress = adjustedProgress / transitionSize;
            rotationX = 90 * (1 - entryProgress);
            opacity = entryProgress;
          } else if (adjustedProgress >= (1 - transitionSize)) {
            const exitProgress = (adjustedProgress - (1 - transitionSize)) / transitionSize;
            rotationX = -90 * exitProgress;
            opacity = 1 - exitProgress;
          } else {
            rotationX = 0;
            opacity = 1;
          }
        }
        
        gsap.set(charEl, { rotationX, opacity });
      });
      
      const isInRange = 
        (isFirstWord(index) && progress <= wordEnd + 0.05) ||
        (isLastWord(index) && progress >= wordStart - 0.05) ||
        (progress >= wordStart - 0.05 && progress <= wordEnd + 0.05);
      
      // Calculate scale based on visibility - scale up when fully visible
      let scale = 1;
      if (isInRange && localProgress > transitionSize && localProgress < (1 - transitionSize)) {
        // Fully visible - scale up
        scale = 1.15;
      } else if (isInRange) {
        // Transitioning - scale based on localProgress
        if (localProgress <= transitionSize) {
          // Entering - scale from 0.9 to 1.15
          const entryProgress = localProgress / transitionSize;
          scale = 0.9 + (entryProgress * 0.25);
        } else {
          // Exiting - scale from 1.15 to 0.9
          const exitProgress = (localProgress - (1 - transitionSize)) / transitionSize;
          scale = 1.15 - (exitProgress * 0.25);
        }
      } else {
        scale = 0.9;
      }
      
      gsap.set(wordEl, {
        visibility: isInRange ? 'visible' : 'hidden',
        zIndex: isInRange ? 10 : 0,
        scale: scale,
      });
    });
  }, []);

  useEffect(() => {
    if (!galleryRef.current || !galleryWrapRef.current) return;

    const galleryElement = galleryRef.current;
    const galleryItems = galleryElement.querySelectorAll('.gallery__item');
    const iOS = isIOS();

    if (iOS) {
      ScrollTrigger.normalizeScroll(true);
      ScrollTrigger.config({ 
        autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load' 
      });
    }

    const createTween = () => {
      if (flipCtxRef.current) {
        flipCtxRef.current.revert();
      }
      
      galleryElement.classList.remove('gallery--final');

      flipCtxRef.current = gsap.context(() => {
        galleryElement.classList.add('gallery--final');
        
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        galleryElement.offsetHeight;
        
        const flipState = Flip.getState(galleryItems);
        galleryElement.classList.remove('gallery--final');

        const flip = Flip.to(flipState, {
          simple: true,
          absolute: iOS,
          ease: 'expoScale(1, 5)',
        });

        // When ScrollSmoother is active, we need to use transform-based pinning
        // because ScrollSmoother applies transforms to the content wrapper
        const smoother = ScrollSmoother.get();
        const shouldUseTransformPinning = smoother ? true : (iOS ? true : false);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: galleryElement,
            start: 'center center',
            end: '+=100%',
            scrub: true,
            pin: galleryWrapRef.current,
            pinType: shouldUseTransformPinning ? 'transform' : 'fixed',
            onUpdate: (self) => {
              updateWords(self.progress);
            },
            // Ensure proper refresh when ScrollSmoother updates
            invalidateOnRefresh: true,
          },
        });
        
        tl.add(flip);
      });

      updateWords(0);

      return () => {
        gsap.set(galleryItems, { clearProps: 'all' });
      };
    };

    // Wait a bit longer to ensure ScrollSmoother is initialized first
    // ScrollSmoother should be created before ScrollTriggers
    const initTimeout = setTimeout(() => {
      createTween();
      // Refresh after ScrollSmoother has had time to initialize
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, iOS ? 400 : 200);

    const handleResize = () => {
      if (iOS) return;
      createTween();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener('resize', handleResize);
      if (iOS) {
        ScrollTrigger.normalizeScroll(false);
      }
      if (flipCtxRef.current) {
        flipCtxRef.current.revert();
        flipCtxRef.current.kill();
      }
    };
  }, [updateWords]);

  return (
    <div className="gallery-wrap" ref={galleryWrapRef} style={{ fontFamily: FONT_SPACE_MONO }}>
      <div
        className="gallery gallery--bento gallery--switch"
        id="gallery-8"
        ref={galleryRef}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="gallery__item">
            <BentoContent index={index} wordRefs={wordRefs} cyclingWords={cyclingWords} />
          </div>
        ))}
      </div>
    </div>
  );
};
