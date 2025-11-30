'use client';

import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black py-8 md:py-12 px-8 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-white font-bold mb-4">AURANZORA</h3>
          <p className="text-white/60 text-sm">
            A web design and marketing studio creating digital experiences that matter.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#work" className="text-white/60 hover:text-white text-sm transition-colors">
                Work
              </Link>
            </li>
            <li>
              <Link href="#services" className="text-white/60 hover:text-white text-sm transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="#contact" className="text-white/60 hover:text-white text-sm transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Connect</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/10 text-center text-white/40 text-sm">
        <p>© {new Date().getFullYear()} AURANZORA. All rights reserved.</p>
      </div>
    </footer>
  );
};

