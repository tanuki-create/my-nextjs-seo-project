import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Header from '../../components/header';
import Footer from '../../components/footer';
import SEO from '../../components/SEO';
import Link from 'next/link'; // Next.js の Link コンポーネントをインポート

interface Article {
  title: string;
  excerpt: string;
  image: string;
  tags: string[];
  author: string;
  date: string;
  slug: string;
  content: string;
}

interface ArticlePageProps {
  data: any;
  content: string;
  allArticles: Article[];
}

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = fs.readdirSync(articlesDirectory);
  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, '') },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // すべての記事を取得
  const filenames = fs.readdirSync(articlesDirectory);
  const allArticles: Article[] = filenames.map((filename) => {
    const filePath = path.join(articlesDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: articleData, content: articleContent } = matter(fileContent);
    return {
      title: articleData.title || 'タイトル未設定', // タイトルが未設定の場合のデフォルト値
      excerpt: articleData.excerpt || '', // excerptが未設定の場合は空文字列を設定
      image: articleData.image || '/default-image.jpg', // 画像が未設定の場合のデフォルト画像
      tags: articleData.tags || [], // タグが未設定の場合は空配列
      author: articleData.author || '著者不明', // 著者が未設定の場合のデフォルト値
      date: articleData.date || new Date().toISOString(), // 日付が未設定の場合のデフォルト値
      content: articleContent,
      slug: filename.replace(/\.md$/, ''),
    };
  });

  return {
    props: {
      data: { ...data, slug }, // 現在の記事の slug をデータに追加
      content,
      allArticles,
    },
  };
};

const ArticlePage: React.FC<ArticlePageProps> = ({ data, content, allArticles }) => {
  // 現在の記事を除いた他の記事を取得
  const relatedArticles = allArticles.filter(article => article.slug !== data.slug).slice(0, 3); // 上位3記事を表示

  // ページのトップにスクロールする関数
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // スムーズにスクロール
  };

  return (
    <div>
      <SEO title={data.title} description={data.excerpt || content.slice(0, 150)} image={data.image} />
      <Header />
      <article className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />

        {/* 関連記事セクションの追加 */}
        <div className="related-articles mt-12">
          <h2 className="text-2xl font-semibold mb-6">他の記事</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <Link 
                key={relatedArticle.slug}
                href={`/articles/${relatedArticle.slug}`} 
                className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${relatedArticle.image})` }}>
                  {/* 画像を背景として設定 */}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{relatedArticle.title}</h3>
                  <p className="text-sm text-gray-600">{relatedArticle.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
      <Footer />

      {/* トップに戻るボタンの追加 */}
      <button 
        onClick={scrollToTop} 
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
        style={{ zIndex: 1000 }} // z-indexを追加して他の要素の上に表示
      >
        トップに戻る
      </button>
    </div>
  );
};

export default ArticlePage;
