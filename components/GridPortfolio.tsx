'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const projects = [
  {
    title: 'Project One',
    category: 'Web Design',
    description: 'A modern e-commerce platform with seamless user experience',
  },
  {
    title: 'Project Two',
    category: 'Brand Identity',
    description: 'Complete rebrand for a tech startup',
  },
  {
    title: 'Project Three',
    category: 'Digital Marketing',
    description: 'Multi-channel campaign that increased conversions by 300%',
  },
  {
    title: 'Project Four',
    category: 'Web Design',
    description: 'Portfolio website for a creative agency',
  },
];

export const GridPortfolio = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div 
      id="work"
      ref={ref}
      className="p-8 md:p-12 border-t border-white/10"
    >
      <div className={`mb-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
          Selected Work
        </h2>
        <p className="text-sm md:text-base text-white/60">
          A showcase of our recent projects
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`group cursor-pointer transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${(index + 1) * 100}ms` }}
          >
            <div className="aspect-[4/3] bg-white/5 rounded-lg mb-4 overflow-hidden border border-white/10 group-hover:border-white/30 transition-all duration-500 group-hover:scale-[1.02] relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-full h-full flex items-center justify-center text-white/20 group-hover:text-white/60 transition-all duration-500 group-hover:scale-110">
                <svg className="w-16 h-16 md:w-24 md:h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="text-xs md:text-sm text-white/40 mb-2 group-hover:text-white/60 transition-colors">
              {project.category}
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

