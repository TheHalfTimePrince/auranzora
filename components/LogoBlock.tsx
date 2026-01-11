'use client';

import React from 'react';
import { logoColors } from '@/lib/config/logo-colors';

// Component to simulate the dynamic MeshGradient / Lava Lamp Blobs using CSS
const AuroraBackground = ({ colors, style }: { colors: readonly string[]; style: React.CSSProperties }) => {
  const gradientString = `
    radial-gradient(circle at 10% 90%, ${colors[0]}d0, transparent 60%),
    radial-gradient(circle at 80% 20%, ${colors[1]}d0, transparent 55%),
    radial-gradient(circle at 40% 50%, ${colors[2]}d0, transparent 50%),
    radial-gradient(circle at 60% 75%, ${colors[3]}d0, transparent 55%)
  `;

  return (
    <>
      <style>{`
        @keyframes blobMovement {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 100%; }
        }
        
        @keyframes shimmer {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }

        .grain-overlay::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          filter: url(#noiseFilter); 
          opacity: 0.15;
          pointer-events: none;
        }

        .rain-overlay {
          background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 1px, transparent 1px, transparent 10px);
          background-size: 20px 20px;
          mix-blend-mode: overlay;
          animation: shimmer 15s linear infinite;
        }
      `}</style>
      
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

      <div
        style={{
          ...style,
          backgroundImage: gradientString,
          animation: 'blobMovement 30s ease-in-out infinite alternate', 
          backgroundSize: '500% 500%', 
          filter: 'blur(30px) brightness(1.2) contrast(1.1)',
        }}
        className="absolute inset-0"
      />
      
      <div className="absolute inset-0 rain-overlay mix-blend-exclusion hue-rotate-180 bg-red-400"></div>
    </>
  );
};

// Large Logo Block Component for Grid
export const LogoBlock = () => {
  return (
    <div className="relative w-full h-full min-h-[600px] overflow-hidden shadow-inner grain-overlay flex items-center justify-center p-8">
      <AuroraBackground 
        colors={logoColors}
        style={{ width: '100%', height: '100%' }}
      />
      
      <div className="relative z-10 text-center">
        <span className="text-black mix-blend-color-burn font-black  md:text-5xl  tracking-[0.25em] leading-none block">
          AURANZORA
        </span>
      </div>
    </div>
  );
};

