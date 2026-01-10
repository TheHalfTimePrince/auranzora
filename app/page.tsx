import { GridLogo } from '@/components/GridLogo';
import { ScrubbedBento } from '@/components/ScrubbedBento';
import { HorizontalImageTiles } from '@/components/HorizontalImageTiles';
import LiquidEther from '@/components/LiquidEther';

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* Fixed Liquid Ether Background */}
  <div className="fixed inset-0 z-0 pointer-events-none">
    <LiquidEther
      colors={['#5227FF', '#FF9FFC', '#B19EEF']}
      mouseForce={20}
      cursorSize={100}
      isViscous={false}
      viscous={30}
      iterationsViscous={32}
      iterationsPoisson={32}
      resolution={0.5}
      isBounce={false}
      autoDemo={true}
      autoSpeed={0.5}
      autoIntensity={2.2}
      takeoverDuration={0.25}
      autoResumeDelay={3000}
      autoRampDuration={0.6}
      className="pointer-events-auto"
    />
  </div>
      {/* Page Content - Above Background */}
      <div className="relative z-10">
        {/* Grid Layout - 12 columns */}
        {/* <div className="grid grid-cols-12 gap-4 md:gap-6 p-4 md:p-6">
          <div className="col-span-12 max-h-32">
            <GridLogo />
          </div>
        </div> */}
        
        {/* Scrubbed Bento Gallery - Full width */}
        <ScrubbedBento />

        {/* Horizontal Image Tiles Gallery */}
        <HorizontalImageTiles />

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
