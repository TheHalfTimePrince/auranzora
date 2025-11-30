'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const GridContact = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div 
      id="contact"
      ref={ref}
      className="p-8 md:p-12 border-t border-white/10"
    >
      <div className={`mb-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
          Let's Work Together
        </h2>
        <p className="text-sm md:text-base text-white/60">
          Ready to bring your vision to life? Get in touch.
        </p>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-xs md:text-sm font-medium text-white/80 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors text-sm"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs md:text-sm font-medium text-white/80 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors text-sm"
              placeholder="your@email.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-xs md:text-sm font-medium text-white/80 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors resize-none text-sm"
            placeholder="Tell us about your project..."
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-auto px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all hover:scale-105 text-sm md:text-base"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

