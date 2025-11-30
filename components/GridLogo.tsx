'use client';

import { Logo } from './Logo';

// Grid Logo - uses the original Logo component, just wrapped for grid layout
export const GridLogo = () => {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[200px] md:min-h-[250px]">
      <Logo />
    </div>
  );
};

