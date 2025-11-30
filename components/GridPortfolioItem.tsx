'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface PortfolioItemProps {
  title: string;
  category: string;
  description: string;
  delay?: number;
}

export const GridPortfolioItem = ({ title, category, description, delay = 0 }: PortfolioItemProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`group cursor-pointer h-full min-h-[400px] md:min-h-[500px] transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="h-full flex flex-col">
        <div className="flex-1 bg-white/5 rounded-lg mb-4 overflow-hidden border border-white/10 group-hover:border-white/30 transition-all duration-500 group-hover:scale-[1.02] relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="w-full h-full flex items-center justify-center text-white/20 group-hover:text-white/60 transition-all duration-500 group-hover:scale-110">
            <svg className="w-24 h-24 md:w-32 md:h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div className="text-xs md:text-sm text-white/40 mb-2 group-hover:text-white/60 transition-colors">
          {category}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-sm md:text-base text-white/60 group-hover:text-white/80 transition-colors">
          {description}
        </p>
      </div>
    </div>
  );
};

