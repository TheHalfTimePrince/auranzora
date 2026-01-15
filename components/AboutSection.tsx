'use client';

import { LogoTextAnimated } from './LogoTextAnimated';
import { LogoIconAnimated } from './LogoIconAnimated';

const GradientWeightText = ({ word, className }: { word: string; className: string }) => {
  const letters = word.split('');
  const length = letters.length;
  
  // Calculate scale, shadow, color, and spacing for each letter
  const getLetterStyle = (index: number) => {
    // Normalize position from 0 to 1
    const position = index / (length - 1);
    // Create a steeper curve that peaks in the middle (using a quartic function)
    // Position 0.5 (middle) = 1.0, edges = 0.0
    const curve = 1 - Math.pow((position - 0.5) * 2, 4);
    
    // Scale X-axis: edges thinner (0.6), middle wider (1.3) for dramatic effect
    const scaleX = 0.6 + curve * 0.7;
    
    // Letter spacing: more spacing in the middle for extra flare
    const letterSpacing = curve * 0.15; // 0 to 0.15em
    
    // Gradient colors: purple -> blue -> pink based on position
    const hue = 280 + (position * 60); // Purple (280) to Pink (340)
    const saturation = 60 + curve * 30; // 60% to 90%
    const lightness = 50 - curve * 10; // 50% to 40% (darker in middle)
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    // Create multiple text-shadows for boldness and glow effect
    const shadowCount = Math.max(1, Math.round(curve * 12)); // 1-12 shadows
    const shadows: string[] = [];
    const shadowSpread = curve * 0.6; // How far shadows spread
    
    // Boldness shadows
    for (let i = 0; i < shadowCount; i++) {
      const angle = (i / shadowCount) * Math.PI * 2;
      const offsetX = Math.cos(angle) * shadowSpread;
      const offsetY = Math.sin(angle) * shadowSpread * 0.3;
      shadows.push(`${offsetX}px ${offsetY}px 0 ${color}`);
    }
    
    // Glow effect shadows (more intense in middle)
    const glowIntensity = curve * 1.5;
    shadows.push(`0 0 ${glowIntensity * 8}px ${color}80`); // Soft glow
    shadows.push(`0 0 ${glowIntensity * 4}px ${color}60`); // Medium glow
    shadows.push(`0 0 ${glowIntensity * 2}px ${color}`); // Sharp glow
    
    return {
      display: 'inline-block',
      transform: `scaleX(${scaleX})`,
      textShadow: shadows.join(', '),
      transformOrigin: 'center',
      color: color,
      letterSpacing: `${letterSpacing}em`,
      filter: `brightness(${1 + curve * 0.2})`, // Slight brightness boost in middle
    };
  };

  return (
    <span className={className} style={{ letterSpacing: '0.05em' }}>
      {letters.map((letter, index) => (
        <span
          key={index}
          style={getLetterStyle(index)}
        >
          {letter}
        </span>
      ))}
    </span>
  );
};

export const AboutSection = () => {
  const fontSize = 'text-7xl';
  const fontSizeSmall = 'text-xl';
  return (
    <section className=" text-black py-32 md:py-48 px-4 md:px-8 relative overflow-hidden">
       <div className="absolute top-0 left-0 w-full h-full ">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto max-w-5xl relative z-10 ">
        <p className={` font-normal leading-tight tracking-tight ${fontSize}`} style={{ fontFamily: 'var(--font-xanh-mono)' }}>
          <span className="inline-flex items-center gap-2 align-middle -mt-8 ">
            <LogoIconAnimated className="h-10 w-10 md:h-14 md:w-14 inline-block" />
            <LogoTextAnimated className="h-10 md:h-14 text-black inline-block" />
          </span>
          <span className={`${fontSizeSmall}`}>{' '}is a {' '}</span>
          <span className={`${fontSize}`}>{' '}digital agency building{' '}</span>
          <span className={`${fontSize} text-purple-600`}>search-optimized websites</span>
          <span className={`${fontSizeSmall}`}>{' '}and{' '}</span>
          <span className={`${fontSize} text-blue-600`}>brand identities</span>
          <span className={`${fontSizeSmall}`}>{' '}for{' '}</span>
          <span className={`${fontSize} font-extrabold text-shadow-lg text-white text-shadow-pink-600`}>{' '}modern{' '}</span>
          <span className={`${fontSize}`}> businesses. From technical web development to complete visual systems, if you need a functional online presence that is built for{' '}</span>
          <span className={`${fontSize} text-pink-600`}>search visibility</span>
          <span className={`${fontSize}`}>{' '}and professional recognition in 2026, we can design it.</span>
        </p>
      </div>
    </section>
  );
};
