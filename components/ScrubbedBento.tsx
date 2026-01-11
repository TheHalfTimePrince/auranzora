'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/dist/Flip';
import { LogoBlock } from './LogoBlock';
import LiquidEther from './LiquidEther';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

// Detect iOS for specific handling
const isIOS = () => {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

// Words that cycle in the center (starting with Website)
const cyclingWords = ['Website', 'Branding', 'Identity', 'Idea', 'Logo', 'Strategy', 'Design', 'Business'];

// Content for each bento cell
const BentoContent = ({ index, wordRefs, cyclingWords: words }: { 
  index: number; 
  wordRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  cyclingWords: string[];
}) => {
  switch (index) {
    // Logo Block (spans 2 rows on left)
    case 0:
      return <LogoBlock />;
    
    // Services highlight (top middle)
    case 1:
      return (
        <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-800 flex flex-col items-center justify-center p-6 text-center">
          <span className="text-neutral-400 text-sm uppercase tracking-widest mb-2">What We Do</span>
          <span className="text-white text-xl md:text-2xl font-semibold">Web • Brand • Design</span>
        </div>
      );
    
    // CENTER BLOCK - Main text (spans 2 rows middle)
    case 2:
      return (
        <div className="w-full h-full bg-white flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
          {/* <div className="absolute inset-0 z-2 pointer-events-none opacity-25">
    <LiquidEther
      colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
      mouseForce={20}
      cursorSize={100}
      isViscous={false}
      viscous={30}
      iterationsViscous={32}
      iterationsPoisson={32}
      resolution={0.5}
      isBounce={true}
      autoDemo={true}
      autoSpeed={0.5}
      autoIntensity={2.2}
      takeoverDuration={0.25}
      autoResumeDelay={3000}
      autoRampDuration={0.6}
      className="pointer-events-auto"
      disableResize={true}
    />
  </div> */}
          <span className="text-neutral-400 text-sm md:text-lg uppercase tracking-widest mb-4 ">
            Everything you need to bring your
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
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <span className="text-neutral-400 text-sm md:text-lg uppercase tracking-widest mt-4">
            to life
          </span>
        </div>
      );
    
    // Years/Experience (spans 2 rows on right)
    case 3:
      return (
        <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex flex-col items-center justify-center p-6">
          <span className="text-7xl md:text-9xl font-black text-white">10+</span>
          <span className="text-neutral-400 text-sm uppercase tracking-widest mt-2">Years Experience</span>
        </div>
      );
    
    // Feature highlight (middle left)
    case 4:
      return (
        <div className="w-full h-full bg-gradient-to-br from-amber-500 to-orange-600 flex flex-col items-center justify-center p-6 text-center">
          <span className="text-white text-3xl md:text-4xl font-bold">150+</span>
          <span className="text-white/80 text-sm uppercase tracking-wider">Projects Delivered</span>
        </div>
      );
    
    // Contact CTA (spans 2 rows bottom right)
    case 5:
      return (
        <div className="w-full h-full bg-black flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-blue-500 rounded-full blur-3xl" />
          </div>
          <span className="relative z-10 text-white text-2xl md:text-3xl font-bold mb-2">Ready to Start?</span>
          <span className="relative z-10 text-neutral-400 text-sm uppercase tracking-widest">Let's Talk</span>
        </div>
      );
    
    // Clients (bottom left)
    case 6:
      return (
        <div className="w-full h-full bg-neutral-100 flex flex-col items-center justify-center p-6 text-center">
          <span className="text-neutral-900 text-3xl md:text-4xl font-bold">50+</span>
          <span className="text-neutral-500 text-sm uppercase tracking-wider">Happy Clients</span>
        </div>
      );
    
    // Tagline (bottom middle)
    case 7:
      return (
        <div className="w-full h-full bg-gradient-to-br from-violet-600 to-purple-700 flex flex-col items-center justify-center p-6 text-center">
          <span className="text-white/80 text-xs uppercase tracking-widest mb-1">Our Philosophy</span>
          <span className="text-white text-lg md:text-xl font-semibold">Design with Purpose</span>
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
      
      gsap.set(wordEl, {
        visibility: isInRange ? 'visible' : 'hidden',
        zIndex: isInRange ? 10 : 0,
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

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: galleryElement,
            start: 'center center',
            end: '+=100%',
            scrub: true,
            pin: galleryWrapRef.current,
            pinType: iOS ? 'transform' : 'fixed',
            onUpdate: (self) => {
              updateWords(self.progress);
            },
          },
        });
        
        tl.add(flip);
      });

      updateWords(0);

      return () => {
        gsap.set(galleryItems, { clearProps: 'all' });
      };
    };

    const initTimeout = setTimeout(() => {
      createTween();
      ScrollTrigger.refresh();
    }, iOS ? 300 : 100);

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
    <div className="gallery-wrap" ref={galleryWrapRef}>
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
