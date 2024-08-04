import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => (
  <header className="bg-white shadow-md">
    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <img
            src="/logo-no-background.png"
            alt="Main Logo"
            className="h-8 mr-2"
          />
          <h1 className="text-2xl font-bold text-custom-color">警備情報ネット</h1>
        </Link>
      </div>
    </div>
  </header>
);

export default Header;