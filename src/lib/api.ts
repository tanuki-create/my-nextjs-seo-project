import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

export const getArticleData = (slug: string) => {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // 画像URLを抽出
  const imageMatch = content.match(/<img src="([^"]+)" alt="image"/);
  const imageUrl = imageMatch ? imageMatch[1] : '';

  return {
    ...data,
    content,
    tags: data.tags ? data.tags.split(',').map((tag: string) => tag.trim()) : [], // Ensure tags is always an array
    slug, // Add slug to the returned object
    image: imageUrl, // 画像URLを追加
  };
};

export const getAllArticleSlugs = () => {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames.map((fileName) => {
    return fileName.replace('.md', '');
  });
};

export const getAllArticles = () => {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames.map((fileName) => {
    const slug = fileName.replace('.md', '');
    return getArticleData(slug);
  });
};

export const getArticleBySlug = (slug: string) => {
  const articles = getAllArticles();
  return articles.find((article) => article.slug === slug);
};