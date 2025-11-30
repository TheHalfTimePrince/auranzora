import { GridLogo } from '@/components/GridLogo';
import { GridAbout } from '@/components/GridAbout';
import { GridHeroText } from '@/components/GridHeroText';
import { GridPortfolioItem } from '@/components/GridPortfolioItem';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* Grid Layout - 12 columns */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 p-4 md:p-6">
        {/* Row 1: Logo (top-left) + Hero Text (right) */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3">
          <GridLogo />
        </div>
        <div className="col-span-12 md:col-span-8 lg:col-span-9">
          <GridHeroText />
        </div>

        {/* Row 2: About (left) + Services/Content (right) */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3 border-t border-white/10 pt-4 md:pt-6">
          <GridAbout />
        </div>
        <div className="col-span-12 md:col-span-8 lg:col-span-9 border-t border-white/10 pt-4 md:pt-6">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4">What We Do</h2>
            <p className="text-sm md:text-base text-white/60 mb-6">
              Comprehensive digital solutions for modern businesses
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                <h3 className="text-lg font-bold text-white mb-2">Web Design</h3>
                <p className="text-sm text-white/60">Custom, responsive websites</p>
              </div>
              <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                <h3 className="text-lg font-bold text-white mb-2">Brand Identity</h3>
                <p className="text-sm text-white/60">Complete brand packages</p>
              </div>
              <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                <h3 className="text-lg font-bold text-white mb-2">Digital Marketing</h3>
                <p className="text-sm text-white/60">Strategic campaigns</p>
              </div>
              <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                <h3 className="text-lg font-bold text-white mb-2">E-commerce</h3>
                <p className="text-sm text-white/60">Online stores optimized</p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Portfolio Items - 2 columns */}
        <div className="col-span-12 md:col-span-6 border-t border-white/10 pt-4 md:pt-6">
          <GridPortfolioItem
            title="Project One"
            category="Web Design"
            description="A modern e-commerce platform with seamless user experience"
            delay={100}
          />
        </div>
        <div className="col-span-12 md:col-span-6 border-t border-white/10 pt-4 md:pt-6">
          <GridPortfolioItem
            title="Project Two"
            category="Brand Identity"
            description="Complete rebrand for a tech startup"
            delay={200}
          />
        </div>

        {/* Row 4: Portfolio Items - 2 columns */}
        <div className="col-span-12 md:col-span-6 border-t border-white/10 pt-4 md:pt-6">
          <GridPortfolioItem
            title="Project Three"
            category="Digital Marketing"
            description="Multi-channel campaign that increased conversions by 300%"
            delay={300}
          />
        </div>
        <div className="col-span-12 md:col-span-6 border-t border-white/10 pt-4 md:pt-6">
          <GridPortfolioItem
            title="Project Four"
            category="Web Design"
            description="Portfolio website for a creative agency"
            delay={400}
          />
        </div>

        {/* Footer */}
        <div className="col-span-12 border-t border-white/10 pt-6 md:pt-8">
          <Footer />
        </div>
      </div>
    </main>
  );
}
