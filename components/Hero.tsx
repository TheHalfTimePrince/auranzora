'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const Hero = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8 pt-24 md:pt-32">
      <div className="container mx-auto max-w-6xl">
        <div 
          ref={ref}
          className={`text-center md:text-left transition-all duration-1000 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 md:mb-8 leading-tight">
            <span className={`inline-block transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              We create
            </span>
            <br />
            <span className={`inline-block text-white/60 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              digital experiences
            </span>
            <br />
            <span className={`inline-block transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              that matter
            </span>
          </h1>
          <p className={`text-lg md:text-xl text-white/60 max-w-2xl mb-8 md:mb-12 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            A web design and marketing studio focused on crafting beautiful, 
            conversion-focused websites that help brands stand out.
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <a
              href="#work"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all hover:scale-105"
            >
              View Our Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-all hover:scale-105"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

