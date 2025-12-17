'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const currentPage = usePathname();

  return (
    <div className="flex items-center space-x-2 sm:space-x-4">
      <Link
        href="/"
        className={`px-3 py-1 rounded-md transition-colors text-sm ${
          currentPage === '/'
            ? 'text-cyan-300 bg-cyan-900/50 font-semibold'
            : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
        }`}
      >
        Projector
      </Link>
      <Link
        href="/about"
        className={`px-3 py-1 rounded-md transition-colors text-sm ${
          currentPage === '/about'
            ? 'text-cyan-300 bg-cyan-900/50 font-semibold'
            : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
        }`}
      >
        About
      </Link>

      <Link
        href="/contact"
        className={`px-3 py-1 rounded-md transition-colors text-sm ${
          currentPage === '/contact'
            ? 'text-cyan-300 bg-cyan-900/50 font-semibold'
            : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
        }`}
      >
        Contact Us
      </Link>
    </div>
  );
}
