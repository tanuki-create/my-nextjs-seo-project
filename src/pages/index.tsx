import React from 'react';
import Link from 'next/link';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/Home.module.css';
import { getAllArticles } from '../lib/api';

interface Article {
  title: string;
  excerpt: string;
  image: string;
  tags: string[];
  author: string;
  date: string;
  slug: string;
}

interface HomeProps {
  articles: Article[];
}

const Home: React.FC<HomeProps> = ({ articles }) => {
  return (
    <div className="bg-gray-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex">
          <div className="w-2/3 pr-8">
            <h2 className="text-2xl font-bold mb-4">新着記事</h2>
            <p className="text-sm text-gray-600 mb-6">
              警備業務に役立つノウハウや最先端な事例を詳しくご紹介
            </p>

            {articles.length > 0 ? (
              articles.map((article, index) => (
                <Link href={`/articles/${article.slug}`} key={index}>
                  <div className="bg-white rounded-lg shadow-md mb-6 flex p-4">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="image-resize-home" 
                    />
                    <div className="p-4 w-2/3">
                      <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          {article.tags && article.tags.length > 0 ? (
                            article.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className={`bg-orange-100 text-orange-600 text-sm px-2 py-1 rounded ${styles.tag}`} // カスタムクラスを適用
                              >
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500 text-sm">No tags</span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {article.author} {article.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>記事がありません。</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const getStaticProps = async () => {
  const articles = getAllArticles();

  return {
    props: {
      articles,
    },
  };
};

export default Home;