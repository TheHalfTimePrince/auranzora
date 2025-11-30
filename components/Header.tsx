'use client';

import { Logo } from './Logo';
import Link from 'next/link';
import { useScrollHeader } from '@/hooks/useScrollHeader';

export const Header = () => {
  const { isScrolled, isVisible } = useScrollHeader();

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${isScrolled ? 'shadow-lg' : ''}`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo in top left */}
          <Link href="/" className="flex items-center">
            <div className="scale-75 md:scale-100 origin-left">
              <Logo />
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="#work" 
              className="text-white/80 hover:text-white transition-colors text-sm font-medium relative group"
            >
              Work
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              href="#services" 
              className="text-white/80 hover:text-white transition-colors text-sm font-medium relative group"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              href="#about" 
              className="text-white/80 hover:text-white transition-colors text-sm font-medium relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              href="#contact" 
              className="text-white/80 hover:text-white transition-colors text-sm font-medium relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden text-white/80 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

