'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const GridHeroText = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div 
      ref={ref}
      className={`p-8 md:p-12 lg:p-16 flex flex-col justify-center h-full min-h-[400px] md:min-h-[500px] transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 leading-tight">
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
    </div>
  );
};

