'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { LogoTextAnimated } from './LogoTextAnimated';

// Fast, snappy animation configurations for each word
const wordAnimations = [
  // "We" - quick drop with bounce
  { 
    from: { y: -40, opacity: 0 },
    to: { y: 0, opacity: 1, ease: 'back.out(2)', duration: 0.4 }
  },
  // "create" - letters slide in from left
  { 
    from: { x: -30, opacity: 0, skewX: 20 },
    to: { x: 0, opacity: 1, skewX: 0, ease: 'power3.out', duration: 0.3 },
    isLetterAnimation: true,
    stagger: 0.025
  },
  // "digital" - quick scale pop
  { 
    from: { scale: 0.5, opacity: 0 },
    to: { scale: 1, opacity: 1, ease: 'back.out(3)', duration: 0.35 }
  },
  // "experiences" - letters rise up with slight rotation
  { 
    from: { y: 25, opacity: 0, rotationZ: 5 },
    to: { y: 0, opacity: 1, rotationZ: 0, ease: 'power2.out', duration: 0.25 },
    isLetterAnimation: true,
    stagger: 0.02
  },
  // "that" - flip in horizontally
  { 
    from: { rotateY: 90, opacity: 0 },
    to: { rotateY: 0, opacity: 1, ease: 'power2.out', duration: 0.35 }
  },
  // "matter" - letters pop with scale
  { 
    from: { scale: 0, opacity: 0 },
    to: { scale: 1, opacity: 1, ease: 'back.out(2.5)', duration: 0.3 },
    isLetterAnimation: true,
    stagger: 0.03
  }
];

const heroWords = [
  { text: 'We', line: 1, color: 'text-black' },
  { text: 'create', line: 1, color: 'text-black' },
  { text: 'digital', line: 2, color: 'text-black/60' },
  { text: 'experiences', line: 2, color: 'text-black/60' },
  { text: 'that', line: 3, color: 'text-black' },
  { text: 'matter', line: 3, color: 'text-black' },
];

interface AnimatedWordProps {
  word: string;
  animation: typeof wordAnimations[0];
  delay: number;
  color: string;
  isVisible: boolean;
}

const AnimatedWord = ({ word, animation, delay, color, isVisible }: AnimatedWordProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || !isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const elements = containerRef.current.querySelectorAll('.animate-char');
    
    gsap.set(elements, animation.from);
    
    gsap.to(elements, {
      ...animation.to,
      delay,
      stagger: animation.isLetterAnimation ? animation.stagger : 0,
    });
  }, [isVisible, animation, delay]);

  if (animation.isLetterAnimation) {
    return (
      <span ref={containerRef} className={`inline-block ${color}`} style={{ perspective: '600px' }}>
        {word.split('').map((letter, i) => (
          <span
            key={i}
            className="animate-char inline-block opacity-0"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {letter}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span ref={containerRef} className={`inline-block ${color}`} style={{ perspective: '600px' }}>
      <span 
        className="animate-char inline-block opacity-0"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {word}
      </span>
    </span>
  );
};

export const Hero = () => {
  const { ref, isVisible } = useScrollAnimation();

  // Calculate delays - faster, more overlapping
  const getWordDelay = (index: number) => {
    let delay = 0.1; // Start quickly
    for (let i = 0; i < index; i++) {
      const anim = wordAnimations[i];
      const word = heroWords[i].text;
      if (anim.isLetterAnimation) {
        const staggerValue = typeof anim.stagger === 'number' ? anim.stagger : 0.02;
        delay += (anim.to.duration || 0.3) * 0.5 + (word.length * staggerValue * 0.5);
      } else {
        delay += (anim.to.duration || 0.3) * 0.4;
      }
    }
    return delay;
  };

  // Group words by line
  const line1 = heroWords.filter(w => w.line === 1);
  const line2 = heroWords.filter(w => w.line === 2);
  const line3 = heroWords.filter(w => w.line === 3);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8 pt-24 md:pt-32 bg-white overflow-hidden relative">
      {/* Gradient background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/25 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/25 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/25 via-blue-500/25 to-pink-500/25 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div 
          ref={ref}
          className="text-center md:text-left"
        >
          {/* Logo Section - gradient hover effect on text */}
          <div className="flex items-center gap-4 mb-8 md:mb-12 justify-center md:justify-start">
            <Image
              src="/logo-icon.svg"
              alt="Subliminal Icon"
              width={60}
              height={60}
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <LogoTextAnimated className="h-8 md:h-12 text-black" />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-black mb-6 md:mb-8 leading-tight tracking-tight uppercase">
            {/* Line 1: We create */}
            <span className="block">
              {line1.map((word, i) => {
                const globalIndex = heroWords.findIndex(w => w === word);
                return (
                  <span key={word.text}>
                    <AnimatedWord
                      word={word.text}
                      animation={wordAnimations[globalIndex]}
                      delay={getWordDelay(globalIndex)}
                      color={word.color}
                      isVisible={isVisible}
                    />
                    {i < line1.length - 1 && <span className="inline-block w-[0.3em]" />}
                  </span>
                );
              })}
            </span>
            
            {/* Line 2: digital experiences */}
            <span className="block">
              {line2.map((word, i) => {
                const globalIndex = heroWords.findIndex(w => w === word);
                return (
                  <span key={word.text}>
                    <AnimatedWord
                      word={word.text}
                      animation={wordAnimations[globalIndex]}
                      delay={getWordDelay(globalIndex)}
                      color={word.color}
                      isVisible={isVisible}
                    />
                    {i < line2.length - 1 && <span className="inline-block w-[0.3em]" />}
                  </span>
                );
              })}
            </span>
            
            {/* Line 3: that matter */}
            <span className="block">
              {line3.map((word, i) => {
                const globalIndex = heroWords.findIndex(w => w === word);
                return (
                  <span key={word.text}>
                    <AnimatedWord
                      word={word.text}
                      animation={wordAnimations[globalIndex]}
                      delay={getWordDelay(globalIndex)}
                      color={word.color}
                      isVisible={isVisible}
                    />
                    {i < line3.length - 1 && <span className="inline-block w-[0.3em]" />}
                  </span>
                );
              })}
            </span>
          </h1>
{/*           
          <p className="text-lg md:text-xl text-black/60 max-w-2xl mb-8 md:mb-12">
            A web design and marketing studio focused on crafting beautiful, 
            conversion-focused websites that help brands stand out.
          </p> */}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#work"
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-black/90 transition-all hover:scale-105"
            >
              View Our Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-black/20 text-black font-semibold rounded-lg hover:bg-black/5 transition-all hover:scale-105"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

