import Head from 'next/head';

// SEOPropsインターフェースを定義
interface SEOProps {
  title: string; // ページのタイトル
  description: string; // ページの説明
  image?: string; // オプションの画像URL
}

// SEOコンポーネントを定義
const SEO: React.FC<SEOProps> = ({ title, description, image }) => (
  <Head>
    <title>{title}</title> {/* タイトルを設定 */}
    <meta name="description" content={description} /> {/* 説明を設定 */}
    <meta property="og:title" content={title} /> {/* Open Graphのタイトルを設定 */}
    <meta property="og:description" content={description} /> {/* Open Graphの説明を設定 */}
    <meta property="og:image" content={image || '/logo-no-background.png'} /> {/* Open Graphの画像を設定 */}
    <meta name="twitter:card" content="summary_large_image" /> {/* Twitterカードのタイプを設定 */}
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "警備info", // サイト名を設定
        "url": "https://keibi.org", // サイトのURLを設定
        "description": "警備infoは、最新のお役立ち警備情報を提供するサイトです。", // サイトの説明を設定
        "image": image || '/logo-no-background.png' // サイトの画像を設定
      })}
    </script>
  </Head>
);

export default SEO; // SEOコンポーネントをエクスポート
