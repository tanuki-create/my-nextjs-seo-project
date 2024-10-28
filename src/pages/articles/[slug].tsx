import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Header from '../../components/header';
import Footer from '../../components/footer';
import SEO from '../../components/SEO';
import Link from 'next/link';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

// インターフェースの定義
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

// 定数の定義
const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

// ユーティリティ関数
const getImagePath = (imagePath: string) => {
  const defaultImage = '/images/default-article-image.jpg';
  if (!imagePath) return defaultImage;
  if (imagePath.startsWith('http')) return imagePath;
  return imagePath;
};

// 記事の日付をフォーマットする関数
const formatDate = (dateString: string): string => {
  try {
    return format(new Date(dateString), 'yyyy年MM月dd日', { locale: ja });
  } catch {
    return dateString;
  }
};

// Static Paths の生成
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

// Static Props の生成
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // タグデータの正規化
    // タグが文字列として来た場合に配列に変換する
    const normalizedTags = Array.isArray(data.tags) 
      ? data.tags 
      : data.tags ? [data.tags] : [];

    // すべての記事を取得
    const filenames = fs.readdirSync(articlesDirectory);
    const allArticles: Article[] = filenames.map((filename) => {
      const filePath = path.join(articlesDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: articleData } = matter(fileContent);
      
      // 各記事のタグも正規化
      const articleTags = Array.isArray(articleData.tags) 
        ? articleData.tags 
        : articleData.tags ? [articleData.tags] : [];

      return {
        title: articleData.title || 'タイトル未設定',
        excerpt: articleData.excerpt || '',
        image: getImagePath(articleData.image),
        tags: articleTags,
        author: articleData.author || '著者不明',
        date: articleData.date || new Date().toISOString(),
        content: content,
        slug: filename.replace(/\.md$/, ''),
      };
    });

    return {
      props: {
        data: { 
          ...data,
          slug,
          tags: normalizedTags // 正規化されたタグを使用
        },
        content,
        allArticles,
      },
    };
  } catch (error) {
    return {
      notFound: true, // 404ページを表示
    };
  }
};

// メインコンポーネント
const ArticlePage: React.FC<ArticlePageProps> = ({ data, content, allArticles }) => {
  return (
    <div className="relative w-full">
      {/* ヘッダーを固定位置に */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div>
          <Header />
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="min-h-screen flex flex-col">
        <div className="layout-container">
          <SEO 
            title={data.title} 
            description={data.excerpt || content.slice(0, 150)} 
            image={data.image}
          />
          
          <div className="h-16"></div>
          
          <main className="flex-grow">
            <article className="container py-8 max-w-4xl">
              {/* 記事ヘッダー */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <span className="mr-4">{formatDate(data.date)}</span>
                  <span className="mr-4">著者: {data.author}</span>
                </div>
                {data.tags && data.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {data.tags.map((tag: string) => (
                      <span key={tag} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 記事本文 */}
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>

              {/* 関連記事セクション */}
              <div className="mt-16">
                <h2 className="text-2xl font-semibold mb-6">関連記事</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allArticles
                    // 現在の記事を除外
                    .filter(article => article.slug !== data.slug)
                    // 最大6件まで表示
                    .slice(0, 6)
                    .map((article) => (
                      <Link 
                        key={article.slug}
                        href={`/articles/${article.slug}`} 
                        className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                      >
                        <div 
                          className="h-48 bg-cover bg-center" 
                          style={{ backgroundImage: `url(${article.image})` }}
                        />
                        <div className="p-4">
                          <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                        </div>
                      </Link>
                  ))}
                </div>
              </div>
            </article>
          </main>
        </div>
      </div>

      {/* フッター */}
      <div className="w-full bg-white">
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
