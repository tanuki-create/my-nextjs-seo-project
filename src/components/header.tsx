import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

const Header: React.FC = () => (
  <>
    <Head>
      <title>警備info - 警備総合情報サイト</title>
      <meta name="description" content="警備infoは、最新のお役立ち警備情報を提供するサイトです。" />
      <meta name="keywords" content="警備, 安全, セキュリティ, 情報, 役立つ" />
      <link rel="icon" href="/favicon.ico" />
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
    <style jsx>{`
      .container {
        width: 100%;
        max-width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
        box-sizing: border-box;
      }
      .h-8 {
        height: 2rem;
      }
      .text-2xl {
        font-size: 1.5rem;
      }
      header {
        width: 100vw;
        overflow-x: hidden;
      }
    `}</style>
  </>
);

export default Header;