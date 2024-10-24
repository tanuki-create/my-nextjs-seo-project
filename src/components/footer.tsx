import React from 'react';
import Link from 'next/link'; // Next.js の Link コンポーネントをインポート

const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white text-center py-6"> {/* 背景色とテキスト色を変更 */}
    <p>© 2024 警備情報ネット</p>
    <nav>
      <ul className="bg-gray-800 text-white text-center py-6"> {/* スペースを広げる */}
        <li>
          <Link href="/">ホーム</Link> {/* 通常時とホバー時のテキスト色を調整 */}
        </li>
        {/* 他のリンクを追加する場合はここにリストアイテムを追加 */}
      </ul>
    </nav>
  </footer>
);

export default Footer;
