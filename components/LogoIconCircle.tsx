'use client';

interface LogoIconCircleProps {
  className?: string;
}

// Ring path (outer circle + inner circle for the hole)
// Center: (44.3, 44.45), outer radius: 44.3, inner radius: 38 (thinner ring)
const ringPath = 'M 44.3,0.15 A 44.3,44.3 0 1,1 44.3,88.75 A 44.3,44.3 0 1,1 44.3,0.15 Z M 44.3,6.45 A 38,38 0 1,0 44.3,82.45 A 38,38 0 1,0 44.3,6.45 Z';

export const LogoIconCircle = ({ className = '' }: LogoIconCircleProps) => {
  return (
    <span className={`inline-block overflow-visible ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 88.6 88.9"
        className="max-w-[1200px] overflow-visible"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <style>{'.cls-1 { fill: #333; stroke-width: 0px; }'}</style>
        </defs>
        
        {/* Ring - static, no animation */}
        <path
          className="cls-1"
          d={ringPath}
        />
      </svg>
    </span>
  );
};
