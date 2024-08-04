import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Header from '../../components/header';

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
  const fullPath = path.join(articlesDirectory, `${params?.slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    props: {
      data,
      content,
    },
  };
};

const ArticlePage: React.FC<{ data: any; content: string }> = ({ data, content }) => {
  return (
    <div>
      <Header />
      <article className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </div>
  );
};

export default ArticlePage;