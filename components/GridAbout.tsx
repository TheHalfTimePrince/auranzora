'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const GridAbout = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div 
      ref={ref}
      className={`p-6 md:p-8 flex flex-col justify-center h-full min-h-[300px] md:min-h-[400px] transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
        About
      </h2>
      <p className="text-sm md:text-base text-white/60 leading-relaxed">
        A web design and marketing studio focused on crafting beautiful, 
        conversion-focused websites that help brands stand out in the digital landscape.
      </p>
    </div>
  );
};

