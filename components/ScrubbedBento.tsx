'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/dist/Flip';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

// Creative agency themed images from Unsplash
const galleryImages = [
  'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=1000&fit=crop&q=80', // Design tools & workspace
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=1000&fit=crop&q=80', // Abstract gradient design
  'https://assets.codepen.io/16327/portrait-image-8.jpg', // Center image (original)
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=1000&fit=crop&q=80', // Abstract colorful art
  'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=1000&fit=crop&q=80', // Bold typography/design
  'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=1000&fit=crop&q=80', // Laptop creative work
  'https://images.unsplash.com/photo-1613909207039-6b173b755cc1?w=800&h=1000&fit=crop&q=80', // Abstract 3D shapes
  'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=1000&fit=crop&q=80', // UX/UI design wireframes
];

// Words that cycle in the center (starting with Website)
const cyclingWords = ['Website', 'Branding', 'Identity', 'Idea', 'Logo', 'Strategy', 'Design', 'Business'];

export const ScrubbedBento = () => {
  const galleryWrapRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const flipCtxRef = useRef<gsap.Context | null>(null);
  const wordContainerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Update word animations based on scroll progress - called directly by GSAP
  const updateWords = useCallback((progress: number) => {
    const totalWords = cyclingWords.length;
    const isFirstWord = (index: number) => index === 0;
    const isLastWord = (index: number) => index === totalWords - 1;
    
    // Transition takes 30% of each word's segment
    const transitionSize = 0.3;
    
    wordRefs.current.forEach((wordEl, index) => {
      if (!wordEl) return;
      
      const chars = wordEl.querySelectorAll('.flip-char');
      
      // Calculate the progress range for this word
      // Each word occupies 1/totalWords of the total progress
      const wordStart = index / totalWords;
      const wordEnd = (index + 1) / totalWords;
      
      // Calculate local progress within this word's range (0 to 1)
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
        // Small stagger for character cascade effect
        const charOffset = (charIndex / charCount) * 0.15;
        const adjustedProgress = Math.max(0, Math.min(1, localProgress + charOffset));
        
        let rotationX: number;
        let opacity: number;
        
        // First word: no entry animation, just visible then exits
        if (isFirstWord(index)) {
          if (adjustedProgress >= (1 - transitionSize)) {
            // Exit phase
            const exitProgress = (adjustedProgress - (1 - transitionSize)) / transitionSize;
            rotationX = -90 * exitProgress;
            opacity = 1 - exitProgress;
          } else {
            // Visible
            rotationX = 0;
            opacity = 1;
          }
        }
        // Last word: enters then stays visible, no exit
        else if (isLastWord(index)) {
          if (adjustedProgress <= transitionSize) {
            // Entry phase
            const entryProgress = adjustedProgress / transitionSize;
            rotationX = 90 * (1 - entryProgress);
            opacity = entryProgress;
          } else {
            // Visible
            rotationX = 0;
            opacity = 1;
          }
        }
        // Middle words: enter and exit
        else {
          if (adjustedProgress <= transitionSize) {
            // Entry phase
            const entryProgress = adjustedProgress / transitionSize;
            rotationX = 90 * (1 - entryProgress);
            opacity = entryProgress;
          } else if (adjustedProgress >= (1 - transitionSize)) {
            // Exit phase
            const exitProgress = (adjustedProgress - (1 - transitionSize)) / transitionSize;
            rotationX = -90 * exitProgress;
            opacity = 1 - exitProgress;
          } else {
            // Visible
            rotationX = 0;
            opacity = 1;
          }
        }
        
        gsap.set(charEl, {
          rotationX,
          opacity,
        });
      });
      
      // Show/hide the word container based on whether it's in range
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

    const createTween = () => {
      // Revert previous animation if it exists
      if (flipCtxRef.current) {
        flipCtxRef.current.revert();
      }
      
      galleryElement.classList.remove('gallery--final');

      flipCtxRef.current = gsap.context(() => {
        // Temporarily add the final class to capture the final state
        galleryElement.classList.add('gallery--final');
        const flipState = Flip.getState(galleryItems);
        galleryElement.classList.remove('gallery--final');

        const flip = Flip.to(flipState, {
          simple: true,
          ease: 'expoScale(1, 5)',
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: galleryElement,
            start: 'center center',
            end: '+=100%',
            scrub: 0.1, // Low scrub value for responsive feel
            pin: galleryWrapRef.current,
            onUpdate: (self) => {
              // Directly update word animations based on scroll progress
              updateWords(self.progress);
            },
            // markers: true // Uncomment for debugging
          },
        });
        
        tl.add(flip);
      });

      // Initial update
      updateWords(0);

      return () => {
        gsap.set(galleryItems, { clearProps: 'all' });
      };
    };

    // Small delay to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      createTween();
      ScrollTrigger.refresh();
    }, 100);

    const handleResize = () => {
      createTween();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener('resize', handleResize);
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
        {galleryImages.map((image, index) => (
          <div key={index} className="gallery__item">
            <img src={image} alt={`Gallery image ${index + 1}`} />
          </div>
        ))}
      </div>
      
      {/* Centered text overlay */}
      <div className="gallery-center-text w-screen">
        <span className="gallery-center-text__top ma">Everything you need to bring your</span>
        <div className="gallery-center-text__word-container" ref={wordContainerRef}>
          {cyclingWords.map((word, wordIndex) => (
            <div
              key={word}
              ref={(el) => { wordRefs.current[wordIndex] = el; }}
              className="gallery-center-text__word"
            >
              {word.split('').map((char, charIndex) => (
                <span
                  key={`${word}-${charIndex}`}
                  className="flip-char"
                >
                  {char}
                </span>
              ))}
            </div>
          ))}
        </div>
        <span className="gallery-center-text__bottom">to life</span>
      </div>
    </div>
  );
};
