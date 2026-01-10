'use client';

import { Logo } from './Logo';

// Grid Logo - uses the original Logo component, just wrapped for grid layout
export const GridLogo = () => {
  return (
    <div className="flex items-center justify-center w-full h-full ">
      <Logo />
    </div>
  );
};

