'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const GridHero = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div 
      ref={ref}
      className={`p-8 md:p-12 flex flex-col justify-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
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
      <p className={`text-base md:text-lg text-white/60 mb-8 transition-all duration-700 delay-500 ${
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
          className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all hover:scale-105 text-sm md:text-base"
        >
          View Our Work
        </a>
        <a
          href="#contact"
          className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-all hover:scale-105 text-sm md:text-base"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
};

