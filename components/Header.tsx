// components/Header.tsx
'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full py-4 px-6 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-blue-500">
            DataTrace
          </h1>
          <nav className="flex space-x-6">
            <Link 
              href="/" 
              className={`text-lg ${pathname === '/' ? 'text-blue-500 font-medium' : 'text-gray-600 hover:text-blue-500'}`}
            >
              USA 
            </Link>
            {/* <Link 
              href="/world" 
              className={`text-lg ${pathname === '/world' ? 'text-blue-500 font-medium' : 'text-gray-600 hover:text-blue-500'}`}
            >
              World 
            </Link> */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;