import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

const Header: React.FC = () => (
  <>
    <Head>
      <title>警備info - あなたの安全を守る情報サイト</title>
      <meta name="description" content="警備infoは、最新の警備情報と安全対策を提供するサイトです。" />
      <meta name="keywords" content="警備, 安全, セキュリティ, 情報" />
    </Head>
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img
              src="/logo-no-background.png"
              alt="Main Logo"
              className="h-8 mr-2"
            />
            <h1 className="text-2xl font-bold text-custom-color">警備info</h1>
          </Link>
        </div>
      </div>
    </header>
  </>
);

export default Header;