'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const testimonials = [
  {
    quote: 'AURANZORA transformed our online presence. Their attention to detail and creative vision exceeded our expectations.',
    author: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
  },
  {
    quote: 'Working with AURANZORA was a game-changer. They delivered a website that perfectly captures our brand identity.',
    author: 'Michael Chen',
    role: 'Founder, Design Co.',
  },
  {
    quote: 'The team at AURANZORA understands how to create digital experiences that convert. Highly recommended!',
    author: 'Emily Rodriguez',
    role: 'Marketing Director, Growth Labs',
  },
];

export const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-20 md:py-32 px-4 md:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div 
          ref={ref}
          className={`mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            What Clients Say
          </h2>
          <p className="text-lg text-white/60 max-w-2xl">
            Trusted by forward-thinking brands
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`p-8 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-500 hover:border-white/20 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <p className="text-white/80 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              <div>
                <div className="text-white font-semibold mb-1">{testimonial.author}</div>
                <div className="text-white/40 text-sm">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

