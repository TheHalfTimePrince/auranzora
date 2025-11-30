'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const services = [
  {
    title: 'Web Design',
    description: 'Custom, responsive websites that look stunning and perform flawlessly.',
  },
  {
    title: 'Brand Identity',
    description: 'Complete brand identity packages including logos and guidelines.',
  },
  {
    title: 'Digital Marketing',
    description: 'Strategic campaigns that drive traffic and conversions.',
  },
  {
    title: 'E-commerce',
    description: 'Full-featured online stores optimized for sales.',
  },
];

export const GridServices = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div 
      id="services"
      ref={ref}
      className="p-8 md:p-12 border-t border-white/10"
    >
      <div className={`mb-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
          What We Do
        </h2>
        <p className="text-sm md:text-base text-white/60">
          Comprehensive digital solutions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className={`p-6 border border-white/10 rounded-lg hover:border-white/20 transition-all duration-500 bg-white/5 hover:bg-white/10 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${(index + 1) * 100}ms` }}
          >
            <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
            <p className="text-sm text-white/60 leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

