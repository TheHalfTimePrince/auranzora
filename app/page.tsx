import { GridLogo } from '@/components/GridLogo';
import { ScrubbedBento } from '@/components/ScrubbedBento';
import { HorizontalImageTiles } from '@/components/HorizontalImageTiles';
import LiquidEther from '@/components/LiquidEther';
import { Hero } from '@/components/Hero';
import { AboutSection } from '@/components/AboutSection';

export default function Home() {
  return (
    <main className="bg-white relative z-10 text-white min-h-screen">
      {/* Fixed Liquid Ether Background */}
      {/* <Hero /> */}
      <div className="fixed inset-0 z-0">
        <LiquidEther 
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={10}
          cursorSize={100}
          autoDemo={false}
          autoSpeed={0.15}
          autoIntensity={2.2}
          resolution={0.2}
        />
      </div>
      {/* About Section */}
      <AboutSection />
    
      {/* Scrubbed Bento Gallery - MUST be outside z-index containers for iOS ScrollTrigger pinning */}

      <ScrubbedBento />

      {/* Horizontal Image Tiles Gallery - also outside for consistent pinning */}
    
      <HorizontalImageTiles />


      {/* Page Content - Above Background */}
      <div className="relative z-10">
        {/* Grid Layout - 12 columns */}
        {/* <div className="grid grid-cols-12 gap-4 md:gap-6 p-4 md:p-6">
          <div className="col-span-12 max-h-32">
            <GridLogo />
          </div>
        </div> */}

        {/* Content Section */}
        <div className="section">
          <h2>Here is some content</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </main>
  );
}
