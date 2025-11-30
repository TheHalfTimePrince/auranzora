'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const services = [
  {
    title: 'Web Design',
    description: 'Custom, responsive websites that look stunning and perform flawlessly across all devices.',
  },
  {
    title: 'Brand Identity',
    description: 'Complete brand identity packages including logos, color palettes, and brand guidelines.',
  },
  {
    title: 'Digital Marketing',
    description: 'Strategic marketing campaigns that drive traffic, engagement, and conversions.',
  },
  {
    title: 'E-commerce',
    description: 'Full-featured online stores optimized for sales and customer experience.',
  },
];

export const Services = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-20 md:py-32 px-4 md:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div 
          ref={ref}
          className={`mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            What We Do
          </h2>
          <p className="text-lg text-white/60 max-w-2xl">
            Comprehensive digital solutions for modern businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-8 border border-white/10 rounded-lg hover:border-white/20 transition-all duration-500 bg-white/5 hover:bg-white/10 hover:scale-[1.02] ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-white/60 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

