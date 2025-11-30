'use client';

import React from 'react';
import { logoColors } from '@/lib/config/logo-colors';

// Component to simulate the dynamic MeshGradient / Lava Lamp Blobs using CSS
const AuroraBackground = ({ colors, style }: { colors: readonly string[]; style: React.CSSProperties }) => {
  // Dynamically create the radial gradient string using the defined colors
  // We use fewer, very large gradients for the blob/lava lamp effect
  const gradientString = `
    radial-gradient(circle at 10% 90%, ${colors[0]}d0, transparent 60%),
    radial-gradient(circle at 80% 20%, ${colors[1]}d0, transparent 55%),
    radial-gradient(circle at 40% 50%, ${colors[2]}d0, transparent 50%),
    radial-gradient(circle at 60% 75%, ${colors[3]}d0, transparent 55%)
  `;

  return (
    <>
      {/* Inject CSS Keyframes for animation */}
      <style>{`
        /* Animation for the smooth movement of the blobs (Lava Lamp) */
        @keyframes blobMovement {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 100%; }
        }
        
        /* Animation for the rain/shimmer overlay */
        @keyframes shimmer {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }

        /* Custom grain overlay style using noise texture (simulated via SVG filter) */
        .grain-overlay::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          /* A filter to simulate noise/grain texture */
          filter: url(#noiseFilter); 
          opacity: 0.15;
          pointer-events: none;
        }

        /* Styling for the simulated rain overlay */
        .rain-overlay {
          background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 1px, transparent 1px, transparent 10px);
          background-size: 20px 20px;
          mix-blend-mode: overlay; /* Applies a simple, bright blending mode */
          animation: shimmer 15s linear infinite;
        }
      `}</style>
      
      {/* SVG filter definition for grain effect (used by .grain-overlay::after) */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.65" 
            numOctaves="3" 
            stitchTiles="stitch"
          />
        </filter>
      </svg>

      {/* The actual gradient animated background (LAVA LAMP) */}
      <div
        style={{
          ...style,
          backgroundImage: gradientString,
          // Use the new blob movement animation
          animation: 'blobMovement 30s ease-in-out infinite alternate', 
          // Massive background size for smooth blob movement
          backgroundSize: '500% 500%', 
          filter: 'blur(30px) brightness(1.2) contrast(1.1)', // Increased blur for smooth blobs
        }}
        className="absolute inset-0"
      />
      
      {/* Simulated Rain/Shimmer Overlay */}
      <div className="absolute inset-0 rain-overlay mix-blend-exclusion hue-rotate-180 bg-red-400"></div>
    </>
  );
};

// Main Logo Component
export const Logo = () => {
  return (
    <div className="flex items-center select-none">
      {/* The Aura Rectangular Box (Simulated Gradient Component) */}
      <div 
        // Retained dimensions, but slightly increased text size will feel larger
        className="relative w-72 h-28 md:w-96 md:h-36 overflow-hidden shadow-2xl shadow-inner transition duration-300 scale-[1.02] shrink-0 grain-overlay"
      >
        
        {/* Use the self-contained Aurora Background component */}
        <AuroraBackground 
          colors={logoColors}
          style={{ width: '100%', height: '100%' }}
        />
        
        {/* The full 'AURANZORA' Text Cutout - positioned in the center */}
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black mix-blend-color-burn font-black text-2xl md:text-4xl tracking-[0.25em] leading-none z-10">
          AURANZORA
        </span>
        
      </div>
    </div>
  );
};

